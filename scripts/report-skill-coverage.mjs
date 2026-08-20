import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { files, root } from './lib.mjs';
import { evalCases } from './eval-utils.mjs';
import { generate as generateRegistry } from './build-capability-registry.mjs';

// Measures reality; enforces nothing. scripts/validate-skill-coverage.mjs is the (deliberately thin,
// for now) gate. Coverage requirements per exposure/criticality tier belong to a later task, once this
// report has been read and the requirements are chosen deliberately instead of guessed.

export const reportPath = join(root, 'reports/skill-coverage.json');

function loadSkills() {
  return files('skills', (name) => name === 'skill.yaml')
    .map((path) => ({ path, contract: JSON.parse(readFileSync(path, 'utf8')) }))
    .filter(({ contract }) => contract.status !== 'RETIRED');
}

export function buildReport() {
  const skillFiles = loadSkills();
  const registry = generateRegistry();
  const registered = new Set(registry.capabilities.map((entry) => entry.skill));
  const staticCases = evalCases('static').map(({ value }) => value);
  const behavioralIds = new Set(evalCases('behavioral').map(({ value }) => value.id));

  const positiveStaticCases = (skill) => staticCases.filter((c) => c.expected?.primary_skill === skill && c.kind !== 'boundary');
  const boundaryStaticCases = (skill) => staticCases.filter((c) => c.expected?.primary_skill === skill && c.kind === 'boundary');
  const delegationCases = (skill) => staticCases.filter((c) => c.expected?.delegate_target === skill);
  // A DELEGATED skill is never itself a primary match, so its boundary evidence is a case whose
  // primary is the delegating skill but that still names this skill as delegate_target.
  const delegationBoundaryCases = (skill) => staticCases.filter((c) => c.expected?.delegate_target === skill && c.kind === 'boundary');
  const goldCases = (skill) => {
    const goldDir = join(root, `evals/behavioral/critical/${skill}`);
    return existsSync(goldDir) ? files(`evals/behavioral/critical/${skill}`, (name) => name.endsWith('.json')).map((path) => JSON.parse(readFileSync(path, 'utf8'))) : [];
  };
  const adversarialCases = (skill) => {
    const dir = join(root, `evals/adversarial/critical/${skill}`);
    return existsSync(dir) ? files(`evals/adversarial/critical/${skill}`, (name) => name.endsWith('.json')).map((path) => JSON.parse(readFileSync(path, 'utf8'))) : [];
  };
  // "Depth" = at least one case asserts something about the skill's contract beyond bare routing
  // (risk, freshness, required authority, or source-map requirement) — not just "route() finds it".
  // Two sources: (1) static cases with risk_at_least/freshness/authority_includes/requires_sources;
  // (2) Task 2's evals/behavioral/critical/<skill>/ gold cases, which always carry expected.contract.
  const hasEvalDepth = (skill) => staticCases.some((c) => c.expected?.primary_skill === skill && (c.expected.risk_at_least || c.expected.freshness || c.expected.authority_includes?.length || c.expected.requires_sources)) || goldCases(skill).length > 0;
  // Two sources of behavioral coverage: (1) flat evals/behavioral/*.json cases, attributed to a skill
  // via a same-id static case that names it as primary — every one of those was authored as a pair;
  // (2) Task 2's evals/behavioral/critical/<skill>/ gold cases, which name their skill directly.
  const behavioralCaseCount = (skill) => positiveStaticCases(skill).filter((c) => behavioralIds.has(c.id)).length + goldCases(skill).length;

  const rows = skillFiles.map(({ path, contract }) => {
    const dir = dirname(path);
    const exposure = contract.routing?.exposure ?? 'UNSET';
    const routable = exposure === 'DIRECT' || exposure === 'DELEGATED';
    const positive = positiveStaticCases(contract.name).length;
    const boundary = exposure === 'DELEGATED' ? delegationBoundaryCases(contract.name).length : boundaryStaticCases(contract.name).length;
    const behavioral = behavioralCaseCount(contract.name);
    const depth = hasEvalDepth(contract.name);
    const sources = existsSync(join(dir, 'sources.md'));
    const referencesDir = join(dir, 'references');
    const referenceCount = existsSync(referencesDir) ? files(referencesDir.slice(root.length).replace(/^[\\/]/, ''), () => true).length : 0;
    const critical = contract.quality_profile === 'critical';
    const adversarial = adversarialCases(contract.name).length;

    const delegation = delegationCases(contract.name).length;
    const dimensions = {
      registry: routable ? registered.has(contract.name) : null, // null = not applicable (INTERNAL/UTILITY)
      routing_eval: routable ? (exposure === 'DELEGATED' ? delegation > 0 : positive > 0) : null,
      eval_depth: routable ? depth : null,
      sources,
      references: referenceCount > 0,
      behavioral_eval: routable ? behavioral > 0 : null,
      // Adversarial cases exist only for critical skills (Task 6 design: 2 per critical skill) —
      // not applicable to non-critical skills, same null convention as the other routable-only dims.
      adversarial_eval: critical ? adversarial > 0 : null,
    };
    const applicable = Object.values(dimensions).filter((v) => v !== null);
    const coverage_pct = applicable.length ? Math.round((applicable.filter(Boolean).length / applicable.length) * 100) : 0;

    // Authoritative release-blocker computation lives in scripts/report-release-readiness.mjs, which
    // reads knowledge/registry/quality-profiles.yaml per skill instead of a fixed rule for "critical"
    // only. This field is kept only as a quick glance; run `npm run readiness` for the real gaps.
    return {
      skill: contract.name,
      domain: contract.domain,
      namespace: contract.routing?.namespace ?? null,
      status: contract.status,
      exposure,
      risk_ceiling: contract.risk_ceiling,
      freshness: contract.freshness,
      critical,
      coverage_pct,
      dimensions,
      routing_eval_counts: { positive, boundary, delegation },
      behavioral_eval_count: behavioral,
      adversarial_eval_count: adversarial,
    };
  }).sort((a, b) => a.skill.localeCompare(b.skill));

  const pctOf = (pred) => {
    const applicable = rows.filter((r) => pred(r) !== null);
    const count = applicable.filter((r) => pred(r)).length;
    return { count, total: applicable.length, pct: applicable.length ? +((count / applicable.length) * 100).toFixed(1) : 0 };
  };

  const criticalContracts = skillFiles.filter(({ contract }) => contract.quality_profile === 'critical').map(({ contract }) => contract);
  const of13 = (count) => ({ count, total: criticalContracts.length, pct: criticalContracts.length ? +((count / criticalContracts.length) * 100).toFixed(1) : 0 });

  const totals = {
    skills: rows.length,
    registry_accounted: pctOf((r) => r.dimensions.registry),
    routing_evaluated: pctOf((r) => r.dimensions.routing_eval),
    eval_depth: pctOf((r) => r.dimensions.eval_depth),
    sources_mapped: pctOf((r) => r.dimensions.sources),
    references_present: pctOf((r) => r.dimensions.references),
    behavioral_evaluated: pctOf((r) => r.dimensions.behavioral_eval),
    adversarial_evaluated: pctOf((r) => r.dimensions.adversarial_eval),
    // Distinct from "human_reviewed": a prepared package is not a completed review (Task 3's own rule).
    critical_source_maps: of13(criticalContracts.filter((c) => existsSync(join(dirname(skillFiles.find((s) => s.contract === c).path), 'sources.md'))).length),
    critical_review_packages_prepared: of13(criticalContracts.filter((c) => existsSync(join(root, `reviews/critical/${c.name}/REVIEW.md`))).length),
    human_review_approved: of13(criticalContracts.filter((c) => c.human_review?.status === 'approved').length),
  };

  return { generated_at: new Date().toISOString(), totals, skills: rows };
}

function printReport(report) {
  const { totals, skills: rows } = report;
  console.log('CORPORATE AI SKILLS — COVERAGE REPORT\n');
  console.log(`Skills: ${totals.skills}\n`);
  const line = (label, t) => console.log(`${label.padEnd(24)} ${String(t.count).padStart(3)}/${t.total} ${String(t.pct).padStart(5)}%${t.note ? `  (${t.note})` : ''}`);
  line('Registry accounted', totals.registry_accounted);
  line('Routing evaluated', totals.routing_evaluated);
  line('Eval depth (>routing)', totals.eval_depth);
  line('Sources mapped', totals.sources_mapped);
  line('References present', totals.references_present);
  line('Behavioral evaluated', totals.behavioral_evaluated);
  line('Adversarial evaluated', totals.adversarial_evaluated);
  console.log('');
  line('Critical source maps', totals.critical_source_maps);
  line('Critical review packages', totals.critical_review_packages_prepared);
  line('Human review approved', totals.human_review_approved);
  console.log('\n(a prepared review package is not an approved review — see npm run readiness for per-skill gaps and blockers)');
  console.log(`\nFull report written to ${reportPath}`);
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const report = buildReport();
  mkdirSync(join(root, 'reports'), { recursive: true });
  writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
  printReport(report);
}
