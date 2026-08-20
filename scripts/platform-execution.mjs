import { readFileSync } from 'node:fs';
import { files } from './lib.mjs';
import { evalCases } from './eval-utils.mjs';

// Canonical source of truth for "was this case actually executed against a real agent, and did it
// pass" — read-only, never writes. Evidence file format (one per case):
//   reports/platform-execution/<platform>/<skill>/<CASE-ID>.json
//   { id, skill, platform, model, executed_at, input, actual_output, self_assessed_behaviors: [...] }
// A case counts EXECUTED only when an evidence file with that exact case id exists. It counts PASSED
// only when self_assessed_behaviors satisfies the case's own expected.behavior.must (all present) and
// expected.behavior.must_not (none present) — the identical check scripts/run-behavioral-evals.mjs and
// scripts/run-adversarial-evals.mjs apply; duplicated here (four lines) rather than shelling out to
// those scripts per case, since this needs a structured per-case verdict, not one process exit code.

function loadEvidence() {
  const paths = files('reports/platform-execution', (name) => name.endsWith('.json'));
  const bySkillAndId = new Map(); // "skill::id" -> evidence, last one wins if duplicated
  for (const path of paths) {
    let entry;
    try { entry = JSON.parse(readFileSync(path, 'utf8')); } catch { continue; }
    if (!entry?.id || !entry?.skill || !Array.isArray(entry.self_assessed_behaviors)) continue; // not a case-evidence file (e.g. a compiled *-results.json)
    bySkillAndId.set(`${entry.skill}::${entry.id}`, entry);
  }
  return bySkillAndId;
}

function judge(testCase, behaviors) {
  const behaviorSet = new Set(behaviors);
  const missing = (testCase.expected.behavior?.must ?? []).filter((b) => !behaviorSet.has(b));
  const prohibited = (testCase.expected.behavior?.must_not ?? []).filter((b) => behaviorSet.has(b));
  return { pass: missing.length === 0 && prohibited.length === 0, missing, prohibited };
}

function computeKind(kind) {
  const evidence = loadEvidence();
  const cases = evalCases(kind)
    .map(({ value }) => value)
    .filter((c) => files('skills', (n) => n === 'skill.yaml').some((p) => JSON.parse(readFileSync(p, 'utf8')).name === c.skill && JSON.parse(readFileSync(p, 'utf8')).quality_profile === 'critical'));

  const rows = cases.map((testCase) => {
    const found = evidence.get(`${testCase.skill}::${testCase.id}`);
    if (!found) return { id: testCase.id, skill: testCase.skill, executed: false, pass: false };
    const { pass, missing, prohibited } = judge(testCase, found.self_assessed_behaviors);
    return { id: testCase.id, skill: testCase.skill, executed: true, pass, missing, prohibited, platform: found.platform, model: found.model, executed_at: found.executed_at };
  });

  const bySkill = {};
  for (const row of rows) {
    bySkill[row.skill] ??= { defined: 0, executed: 0, passed: 0 };
    bySkill[row.skill].defined += 1;
    if (row.executed) bySkill[row.skill].executed += 1;
    if (row.pass) bySkill[row.skill].passed += 1;
  }

  return {
    defined: rows.length,
    executed: rows.filter((r) => r.executed).length,
    passed: rows.filter((r) => r.pass).length,
    rows,
    bySkill,
  };
}

// Real-cost re-scan each call (cheap: a few hundred small JSON files) — never cached across calls,
// so a verifier or the final gate always sees the current on-disk evidence, never a stale snapshot.
export function computePlatformExecution() {
  return { behavioral: computeKind('behavioral/critical'), adversarial: computeKind('adversarial/critical') };
}

import { pathToFileURL } from 'node:url';
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const { behavioral, adversarial } = computePlatformExecution();
  console.log('PLATFORM EXECUTION — real evidence only\n');
  for (const [label, data] of [['Behavioral', behavioral], ['Adversarial', adversarial]]) {
    console.log(`${label}: ${data.executed}/${data.defined} executed, ${data.passed}/${data.defined} passed`);
    for (const [skill, s] of Object.entries(data.bySkill).sort()) console.log(`  ${skill.padEnd(24)} ${s.executed}/${s.defined} executed, ${s.passed}/${s.defined} passed`);
  }
}
