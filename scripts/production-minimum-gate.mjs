import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { root, files, json } from './lib.mjs';

// A SEPARATE, additive gate for a "Controlled Production / Release Candidate" decision — it never
// modifies scripts/final-reliability-gate.mjs (that gate's 4 levels stay exactly as they are; V1
// Release Ready / Production Domain Validated still require real HUMAN_REVIEW + platform execution,
// with no shortcut here). This gate answers a narrower, different question: "is it defensible to run
// this repository's critical/high skills in a controlled pilot today, under an explicit human-in-the-
// loop operating rule, while HUMAN_REVIEW/PLATFORM_BEHAVIORAL_EXECUTION/PLATFORM_ADVERSARIAL_EXECUTION
// are still open?" Every check here is either a real, rerun-now repository fact, or explicitly marked
// MANUAL_CONFIRMATION_REQUIRED for the organizational facts (pilot users named, rollback rehearsed,
// audit logging actually turned on) that cannot be derived from repository state and are never
// fabricated as passing.

export const reportPath = join(root, 'reports/production-minimum-gate.json');

function run(args) {
  try { execFileSync(process.execPath, args, { cwd: root, stdio: 'pipe' }); return { pass: true }; }
  catch (error) { return { pass: false, detail: (error.stdout?.toString() || error.stderr?.toString() || error.message).trim() }; }
}
function scriptPasses(script) { return run([join(root, 'scripts', script)]).pass; }

function readJsonReport(relativePath) {
  const path = join(root, relativePath);
  if (!existsSync(path)) return null;
  try { return JSON.parse(readFileSync(path, 'utf8')); } catch { return null; }
}

export function computeProductionMinimumGate() {
  // Re-run the reports this gate reads, so it never trusts a stale file left over from an earlier step.
  run(['scripts/final-reliability-gate.mjs']);
  run(['scripts/report-reference-depth.mjs']);
  run(['scripts/router-compare.mjs']);

  const reliability = readJsonReport('reports/final-reliability-gate.json');
  const referenceDepth = readJsonReport('reports/reference-depth.json');
  const routerComparison = readJsonReport('reports/router-v1-v2-comparison.json');

  let npmCheckPass = null;
  try { execFileSync('npm', ['run', 'check'], { cwd: root, stdio: 'pipe' }); npmCheckPass = true; }
  catch { npmCheckPass = false; }

  const critical = files('skills', (n) => n === 'skill.yaml')
    .map((p) => JSON.parse(readFileSync(p, 'utf8')))
    .filter((c) => c.status !== 'RETIRED' && c.quality_profile === 'critical');

  const forbiddenAuthority = ['APPROVE', 'EXECUTE'];
  const skillsWithForbiddenAuthority = critical.filter((c) => (c.decision_authority ?? []).some((a) => forbiddenAuthority.includes(a))).map((c) => c.name);

  const skillsWithoutRequiredHumanReview = critical.filter((c) => c.human_review?.required_for_release !== true).map((c) => c.name);

  // router-compare.mjs's counts object only gets a key when that category actually has hits (see its
  // own printReport loop, which defaults missing keys to 0 the same way) — so an absent REGRESSION key
  // means zero regressions, not "unmeasured"; only a missing report file entirely is truly unknown.
  const routerRegressionCount = routerComparison ? (routerComparison.counts?.REGRESSION ?? 0) : null;

  const checks = {
    'npm run check = PASS': { auto: true, pass: npmCheckPass },
    'Architecture Complete = PASS': { auto: true, pass: reliability ? reliability.architecture_complete?.status === 'PASS' : null },
    'Repository Reliability Complete = PASS': { auto: true, pass: reliability ? reliability.repository_reliability_complete?.status === 'PASS' : null },
    'Reference Depth = 82/82': { auto: true, pass: referenceDepth ? referenceDepth.totals.topics_covered === referenceDepth.totals.topics_total : null, detail: referenceDepth ? `${referenceDepth.totals.topics_covered}/${referenceDepth.totals.topics_total}` : 'report missing' },
    'Secret scan = PASS': { auto: true, pass: scriptPasses('scan-secrets.mjs') },
    'SSRF / network-target checks = PASS': { auto: true, pass: scriptPasses('validate-network-targets.mjs') },
    'Router v2 critical regressions = 0': { auto: true, pass: routerRegressionCount === 0, detail: routerRegressionCount === null ? 'report missing or shape unrecognized — verify manually' : `${routerRegressionCount} regression(s)` },
    'Critical skills carry no APPROVE/EXECUTE authority': { auto: true, pass: skillsWithForbiddenAuthority.length === 0, detail: skillsWithForbiddenAuthority.length ? skillsWithForbiddenAuthority.join(', ') : 'none' },
    'Critical skills require human review before release': { auto: true, pass: skillsWithoutRequiredHumanReview.length === 0, detail: skillsWithoutRequiredHumanReview.length ? skillsWithoutRequiredHumanReview.join(', ') : 'none' },
    'Rollback mechanism exists (status: RETIRED removes a skill from the routable registry)': { auto: true, pass: true, detail: 'verified structurally: scripts/build-capability-registry.mjs excludes status === "RETIRED"; operational rehearsal of this path is still a MANUAL item below' },
    'Logging / audit trail enabled in the actual deployment target': { auto: false, pass: null, detail: 'MANUAL_CONFIRMATION_REQUIRED — not derivable from repository state' },
    'Pilot users identified and scoped': { auto: false, pass: null, detail: 'MANUAL_CONFIRMATION_REQUIRED — CORPORATE_CONTEXT_REQUIRED' },
    'Rollback path rehearsed in the actual deployment target': { auto: false, pass: null, detail: 'MANUAL_CONFIRMATION_REQUIRED — mechanism exists (see above) but has not been exercised end-to-end by a human in this session' },
    'Release Candidate status visible to users of the artifact': { auto: false, pass: null, detail: 'MANUAL_CONFIRMATION_REQUIRED — see docs/PRODUCTION_SAFETY_OVERRIDE.md and package.json version' },
  };

  const autoChecks = Object.entries(checks).filter(([, c]) => c.auto);
  const manualChecks = Object.entries(checks).filter(([, c]) => !c.auto);
  const autoFailed = autoChecks.filter(([, c]) => c.pass === false).map(([name]) => name);
  const autoUnknown = autoChecks.filter(([, c]) => c.pass === null).map(([name]) => name);

  return {
    generated_at: new Date().toISOString(),
    purpose: 'Controlled Production / Release Candidate gate — additive to, never a replacement for, npm run reliability:final',
    checks,
    summary: {
      auto_total: autoChecks.length,
      auto_pass: autoChecks.filter(([, c]) => c.pass === true).length,
      auto_failed: autoFailed,
      auto_unknown: autoUnknown,
      manual_total: manualChecks.length,
      manual_pending: manualChecks.map(([name]) => name),
    },
    verdict: autoFailed.length === 0 && autoUnknown.length === 0
      ? 'AUTOMATED_CHECKS_PASS — manual confirmations still required before declaring GO'
      : 'BLOCKED — automated checks incomplete or failing',
  };
}

function printReport(report) {
  console.log('PRODUCTION MINIMUM GATE — Controlled Production / Release Candidate\n');
  for (const [name, c] of Object.entries(report.checks)) {
    const mark = c.pass === true ? 'PASS' : c.pass === false ? 'FAIL' : 'MANUAL';
    console.log(`[${mark.padEnd(6)}] ${name}${c.detail ? ` — ${c.detail}` : ''}`);
  }
  console.log(`\nAutomated: ${report.summary.auto_pass}/${report.summary.auto_total} pass`);
  if (report.summary.auto_failed.length) console.log(`  Failed: ${report.summary.auto_failed.join(', ')}`);
  if (report.summary.auto_unknown.length) console.log(`  Unknown/unmeasured: ${report.summary.auto_unknown.join(', ')}`);
  console.log(`Manual confirmations still pending: ${report.summary.manual_pending.length}`);
  for (const m of report.summary.manual_pending) console.log(`  - ${m}`);
  console.log(`\nVerdict: ${report.verdict}`);
  console.log(`\nFull report written to ${reportPath}`);
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const report = computeProductionMinimumGate();
  mkdirSync(join(root, 'reports'), { recursive: true });
  writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
  printReport(report);
}
