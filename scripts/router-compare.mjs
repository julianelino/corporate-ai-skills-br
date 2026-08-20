import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { root } from './lib.mjs';
import { evalCases } from './eval-utils.mjs';

// Task 4 gate: every static case is routed through v1 and v2 in separate child processes (so
// ROUTER_VERSION cleanly selects the engine without any import-cache trickery), then classified
// against the case's own `expected` block — never against "whatever v1 said", which would just
// canonize v1's mistakes. A case that changes outcome without an `expected.primary_skill`/`status`
// to judge it against is reported as UNVERIFIABLE, never silently folded into UNCHANGED.

function routeWith(version, input) {
  const script = `
    process.env.ROUTER_VERSION = ${JSON.stringify(version)};
    import('./engines/reference-routing/index.mjs').then(({ route }) => {
      console.log(JSON.stringify(route(${JSON.stringify(input)})));
    });
  `;
  const out = execFileSync(process.execPath, ['--input-type=module', '-e', script], { cwd: root, encoding: 'utf8' });
  return JSON.parse(out.trim().split('\n').pop());
}

function isCorrect(routed, expected) {
  if (!expected) return null; // nothing to judge against
  if (expected.status && routed.status !== expected.status) return false;
  if ('primary_skill' in expected && (routed.primary ?? null) !== (expected.primary_skill ?? null)) return false;
  if (expected.delegate_target) {
    // Static evals resolve delegate_target against the contract; here we only have the routed
    // primary, so treat "primary present and status ROUTED" as necessary, not sufficient — full
    // delegate_target validation stays run-static-evals.mjs's job.
    if (routed.status !== 'ROUTED') return false;
  }
  for (const forbidden of expected.must_not_include_specialist ?? []) if (routed.specialists.includes(forbidden)) return false;
  return true;
}

const cases = evalCases('static').map(({ value }) => value);
const rows = cases.map((c) => {
  const v1 = routeWith('v1', c.input);
  const v2 = routeWith('v2', c.input);
  const v1Correct = isCorrect(v1, c.expected);
  const v2Correct = isCorrect(v2, c.expected);
  const sameOutcome = v1.status === v2.status && v1.primary === v2.primary && JSON.stringify([...v1.specialists].sort()) === JSON.stringify([...v2.specialists].sort());

  let classification;
  if (sameOutcome) classification = 'UNCHANGED';
  else if (v1Correct === null) classification = 'UNVERIFIABLE';
  else if (v1Correct && !v2Correct) classification = 'REGRESSION';
  else if (!v1Correct && v2Correct) classification = 'IMPROVED';
  else classification = 'INTENTIONAL_CHANGE'; // outcome differs, correctness verdict unchanged (both right or both wrong)

  return { case: c.id, v1: { status: v1.status, primary: v1.primary, specialists: v1.specialists }, v2: { status: v2.status, primary: v2.primary, specialists: v2.specialists }, classification };
});

const counts = rows.reduce((acc, r) => ({ ...acc, [r.classification]: (acc[r.classification] ?? 0) + 1 }), {});
const report = { generated_at: new Date().toISOString(), cases: rows.length, counts, rows };

mkdirSync(join(root, 'reports'), { recursive: true });
writeFileSync(join(root, 'reports/router-v1-v2-comparison.json'), JSON.stringify(report, null, 2) + '\n');

console.log('ROUTER v1 vs v2 COMPARISON\n');
console.log(`Cases: ${rows.length}\n`);
for (const key of ['UNCHANGED', 'INTENTIONAL_CHANGE', 'IMPROVED', 'REGRESSION', 'UNVERIFIABLE']) console.log(`${key.padEnd(20)} ${counts[key] ?? 0}`);
if (counts.REGRESSION) {
  console.log('\nREGRESSIONS:');
  for (const r of rows.filter((r) => r.classification === 'REGRESSION')) console.log(`  ${r.case}: v1=${r.v1.primary}/${r.v1.status} -> v2=${r.v2.primary}/${r.v2.status}`);
}
if (counts.INTENTIONAL_CHANGE) {
  console.log('\nINTENTIONAL CHANGES (outcome differs, both correct or both incorrect the same way):');
  for (const r of rows.filter((r) => r.classification === 'INTENTIONAL_CHANGE')) console.log(`  ${r.case}: v1=${r.v1.primary}/${r.v1.status} -> v2=${r.v2.primary}/${r.v2.status}`);
}
console.log(`\nFull report written to reports/router-v1-v2-comparison.json`);
