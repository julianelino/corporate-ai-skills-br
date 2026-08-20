import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { root, files, json } from './lib.mjs';
import { contracts } from './build-capability-registry.mjs';
import { buildReadiness } from './report-release-readiness.mjs';
import { computePlatformExecution } from './platform-execution.mjs';

// Four independent hard-gated readiness levels, never a single score, never a percentage overriding
// a missing mandatory item. Each level lists MUST checks; the level is PASS only if every one of its
// own checks is true AND every prerequisite level already passed. A check is a boolean fact about
// the repository right now — never inferred, never "probably".

function run(args) {
  try { execFileSync(process.execPath, args, { cwd: root, stdio: 'pipe' }); return { pass: true }; }
  catch (error) { return { pass: false, detail: (error.stdout?.toString() || error.stderr?.toString() || error.message).trim() }; }
}
function scriptPasses(script) { return run([join(root, 'scripts', script)]).pass; }
function fileExists(relativePath) { return existsSync(join(root, relativePath)); }

// --- shared facts, computed once ---
const allContracts = contracts();
const readiness = buildReadiness();
const carryForward = json('knowledge/registry/carry-forward.yaml');

let routerComparison = null;
if (run(['scripts/router-compare.mjs']).pass) {
  try { routerComparison = json('reports/router-v1-v2-comparison.json'); } catch { /* leave null */ }
}

function noDuplicateCriticalList() {
  // The exact regression this gate exists to catch: a second hardcoded copy of the 5-name critical
  // list, independent of lib.mjs's GOVERNANCE_CRITICAL, silently going stale (found for real: Task
  // 1b's report-routing-eval-coverage.mjs, retired at this gate — see reliability-hardening.md).
  const pattern = ["'labor-law-br',", " 'payroll-br',", " 'tax-br',", " 'accounting-br',", " 'payments'"].join('');
  const hits = files('scripts', (name) => name.endsWith('.mjs') && name !== 'final-reliability-gate.mjs').filter((path) => readFileSync(path, 'utf8').includes(pattern));
  return hits.length <= 1; // exactly lib.mjs's canonical definition
}

// ============================== 1. ARCHITECTURE COMPLETE ==============================
const architectureChecks = {
  'Core zero-runtime (no dependencies declared)': scriptPasses('validate-dependency-policy.mjs'),
  'Capability registry generated from skill.yaml, drift-checked': scriptPasses('check-registry-drift.mjs'),
  'Every active skill has routing.exposure (registry coverage)': scriptPasses('validate-registry-coverage.mjs'),
  'Router v1 and v2 both exist (v2 default, v1 baseline)': fileExists('engines/reference-routing/v1.mjs') && fileExists('engines/reference-routing/v2.mjs'),
  'Anti-triggers exist in routing-triggers.yaml': json('knowledge/registry/routing-triggers.yaml').skills.some((s) => s.anti_triggers?.length > 0),
  'Namespace registry exists and is enforced': fileExists('knowledge/registry/namespaces.yaml') && scriptPasses('validate-quality-profile.mjs'),
  'quality_profile centralized in one policy file': fileExists('knowledge/registry/quality-profiles.yaml'),
  'Human review is modeled with scope/version/commit, not a bare flag': allContracts.some((c) => c.human_review?.scope?.length > 0),
  'Coverage matrix framework exists': fileExists('scripts/report-skill-coverage.mjs'),
  'Behavioral gold-case framework exists': fileExists('scripts/validate-behavioral-gold-cases.mjs') && fileExists('evals/behavioral/critical'),
  'Adversarial framework exists': fileExists('scripts/validate-adversarial-cases.mjs') && fileExists('evals/adversarial/critical'),
  'Freshness lifecycle framework exists': fileExists('scripts/validate-source-freshness.mjs') && fileExists('scripts/check-source-freshness.mjs'),
  'Security execution framework exists': fileExists('scripts/scan-secrets.mjs') && fileExists('scripts/validate-network-targets.mjs'),
  'Source registry exists; source->skill traceable': fileExists('sources/SOURCE_REGISTRY.yaml') && fileExists('scripts/report-source-impact.mjs'),
  'Carry-forward is verifiable, not editable': fileExists('scripts/verify-carry-forward.mjs') && fileExists('knowledge/registry/carry-forward.yaml'),
  'Maturity lifecycle (EXPERIMENTAL..RETIRED) documented': readFileSync(join(root, 'ARCHITECTURE.md'), 'utf8').includes('RETIRED'),
  'No duplicate hardcoded critical-skill list remains': noDuplicateCriticalList(),
};

// ============================== 2. REPOSITORY RELIABILITY COMPLETE ==============================
const npmCheck = (() => { try { execFileSync('npm', ['run', 'check'], { cwd: root, stdio: 'pipe' }); return { pass: true }; } catch (error) { return { pass: false, detail: (error.stdout?.toString() || '').slice(-2000) }; } })();
const reliabilityChecks = {
  'npm run check is green': npmCheck.pass,
  'Routing eval coverage complete (exposure-aware minimums)': scriptPasses('validate-routing-eval-coverage.mjs'),
  // router-compare.mjs's counts object only has keys for classifications that actually occurred —
  // a missing REGRESSION key means zero occurrences, not "unknown" — but only once we know the
  // comparison actually ran; if it didn't (routerComparison === null), that is its own failure.
  'Router v1 vs v2 comparison ran successfully': routerComparison !== null,
  'Router v1 vs v2: zero regressions': routerComparison !== null && (routerComparison.counts.REGRESSION ?? 0) === 0,
  'Router v1 vs v2: zero unverifiable cases': routerComparison !== null && (routerComparison.counts.UNVERIFIABLE ?? 0) === 0,
  'Legacy schema-only eval pipeline removed': !fileExists('scripts/run-evals.mjs'),
  'Static evals assert real route() behavior': fileExists('scripts/run-static-evals.mjs'),
  'Behavioral gold-case definitions validated': scriptPasses('validate-behavioral-gold-cases.mjs'),
  'Adversarial case definitions validated': scriptPasses('validate-adversarial-cases.mjs'),
  'quality_profile validator passes': scriptPasses('validate-quality-profile.mjs'),
  '`readiness` is not part of `npm run check`': !json('package.json').scripts.check.includes('readiness'),
  'Source registry + freshness structural validators pass': scriptPasses('validate-sources.mjs') && scriptPasses('validate-source-freshness.mjs'),
  'Operational freshness checker exists (outside Core/check)': fileExists('scripts/check-source-freshness.mjs') && !json('package.json').scripts.check.includes('freshness:check'),
  'Secret scanner passes': scriptPasses('scan-secrets.mjs'),
  'SSRF / network-target validation passes': scriptPasses('validate-network-targets.mjs'),
  'Dependency policy passes': scriptPasses('validate-dependency-policy.mjs'),
  'CI permissions pass': scriptPasses('validate-ci-permissions.mjs'),
  'Fake human-approval guard passes': scriptPasses('validate-critical-sources.mjs'),
  'Carry-forward integrity passes (no fraudulent closure)': scriptPasses('validate-critical-sources.mjs'),
  'No duplicate hardcoded critical-skill list remains': noDuplicateCriticalList(),
  'Readiness report covers every skill': readiness.skills.length === allContracts.length,
};

// ============================== 3 & 4: carry-forward-driven blockers ==============================
const openBlocking = (carryForward.items ?? []).filter((item) => item.status !== 'closed' && item.release_blocking);
const humanReviewApproved = allContracts.filter((c) => c.quality_profile === 'critical' && c.human_review?.status === 'approved').length;
const criticalCount = allContracts.filter((c) => c.quality_profile === 'critical').length;
// Single source of truth for real platform-execution evidence (never a second, independent counter
// here) — scripts/platform-execution.mjs reads reports/platform-execution/<platform>/<skill>/*.json,
// the only place a real agent's actual output and this skill's own PASS/FAIL judgment of it live.
// executed > 0 is never sufficient: PASSED must equal DEFINED (every case executed AND passed) before
// either blocker can clear, so a partial run (e.g. 5/65) stays correctly BLOCKED, not silently PASS.
const { behavioral: behavioralExecution, adversarial: adversarialExecution } = computePlatformExecution();

function level(name, checks, prerequisitesPass) {
  const failed = Object.entries(checks).filter(([, pass]) => !pass).map(([name]) => name);
  const status = prerequisitesPass && failed.length === 0 ? 'PASS' : 'BLOCKED';
  return { name, status, checks, failed };
}

const architecture = level('Architecture Complete', architectureChecks, true);
const reliability = level('Repository Reliability Complete', reliabilityChecks, architecture.status === 'PASS');

const v1Blockers = [
  ...(architecture.status !== 'PASS' ? ['ARCHITECTURE_NOT_COMPLETE'] : []),
  ...(reliability.status !== 'PASS' ? ['REPOSITORY_RELIABILITY_NOT_COMPLETE'] : []),
  ...openBlocking.map((item) => item.id),
];
const v1 = { name: 'V1 Release Ready', status: v1Blockers.length === 0 ? 'PASS' : 'BLOCKED', blockers: v1Blockers };

const prodBlockers = [];
if (humanReviewApproved < criticalCount) prodBlockers.push(`HUMAN_REVIEW (${humanReviewApproved}/${criticalCount} approved)`);
// PASSED === DEFINED required, not merely executed > 0 — a partially-executed or partially-failed
// run must never clear this blocker (see the comment above where behavioralExecution is computed).
if (behavioralExecution.passed < behavioralExecution.defined) prodBlockers.push(`BEHAVIORAL_EXECUTION (${behavioralExecution.passed}/${behavioralExecution.defined} passed, ${behavioralExecution.executed}/${behavioralExecution.defined} executed)`);
if (adversarialExecution.passed < adversarialExecution.defined) prodBlockers.push(`ADVERSARIAL_EXECUTION (${adversarialExecution.passed}/${adversarialExecution.defined} passed, ${adversarialExecution.executed}/${adversarialExecution.defined} executed)`);
const production = { name: 'Production / Domain Validated', status: prodBlockers.length === 0 ? 'PASS' : 'BLOCKED', blockers: prodBlockers };

const report = {
  generated_at: new Date().toISOString(),
  architecture_complete: { status: architecture.status, failed_checks: architecture.failed },
  repository_reliability_complete: { status: reliability.status, failed_checks: reliability.failed },
  v1_release_ready: { status: v1.status, blockers: v1.blockers },
  production_domain_validated: { status: production.status, blockers: production.blockers },
  release_blocking_carry_forward: openBlocking.map((i) => i.id),
  platform_execution: {
    behavioral: { defined: behavioralExecution.defined, executed: behavioralExecution.executed, passed: behavioralExecution.passed },
    adversarial: { defined: adversarialExecution.defined, executed: adversarialExecution.executed, passed: adversarialExecution.passed },
  },
};

mkdirSync(join(root, 'reports'), { recursive: true });
writeFileSync(join(root, 'reports/final-reliability-gate.json'), JSON.stringify(report, null, 2) + '\n');

console.log('CORPORATE AI SKILLS BR\nFINAL RELIABILITY GATE\n');
for (const lvl of [architecture, reliability]) {
  console.log(`${lvl.name}\n${lvl.status}`);
  if (lvl.failed.length) for (const f of lvl.failed) console.log(`  FAILED: ${f}`);
  console.log('');
}
console.log(`${v1.name}\n${v1.status}`);
if (v1.blockers.length) for (const b of v1.blockers) console.log(`  BLOCKER: ${b}`);
console.log(`\n${production.name}\n${production.status}`);
if (production.blockers.length) for (const b of production.blockers) console.log(`  BLOCKER: ${b}`);

console.log('\nFull report written to reports/final-reliability-gate.json');

if (architecture.status !== 'PASS' || reliability.status !== 'PASS') process.exit(1);
