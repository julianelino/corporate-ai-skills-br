import { validateGoldCases } from './validate-behavioral-gold-cases.mjs';

// Reports DEFINED vs VALID vs EXECUTED vs PASSED as distinct, never-conflated states (the eval:legacy
// lesson from Task 1a: a definition-schema check is not a behavioral pass). This script never runs a
// case against an agent, so "Executed" and "Passed" are always 0 here — that is
// scripts/run-behavioral-evals.mjs's job, once a BEHAVIORAL_RESULTS_FILE/BEHAVIORAL_EVAL_COMMAND is
// actually supplied.

const RISK_CLASSES = ['NORMAL', 'BOUNDARY', 'INSUFFICIENT_CONTEXT', 'HIGH_RISK', 'FAIL_SAFE'];
const { errors, critical, bySkill, behavioralReq } = validateGoldCases();

const totalDefined = Object.values(bySkill).reduce((sum, s) => sum + s.defined, 0);
const invalidIds = new Set(errors.map((e) => e.match(/^GOLD_CASE ([^:]+):/)?.[1]).filter(Boolean));
const totalValid = totalDefined - invalidIds.size;
const meetingGate = Object.values(bySkill).filter((s) => s.defined >= behavioralReq.minimum && (behavioralReq.required_risk_classes ?? []).every((rc) => s.riskClasses.includes(rc))).length;

console.log('CRITICAL BEHAVIORAL GOLD CASES\n');
console.log(`Critical skills:                ${critical.length}`);
console.log(`Minimum required cases (${behavioralReq.minimum} ea):  ${critical.length * behavioralReq.minimum}`);
console.log(`Defined:                        ${totalDefined}`);
console.log(`Valid:                          ${totalValid}${errors.length ? ` (${errors.length} definition errors — run npm run behavioral:validate for detail)` : ''}`);
console.log(`Executed against agent:         0`);
console.log(`Passed:                         0\n`);
console.log(`Skills meeting definition gate: ${meetingGate}/${critical.length}\n`);

console.log('Risk-class coverage:');
for (const contract of critical.sort((a, b) => a.name.localeCompare(b.name))) {
  const s = bySkill[contract.name];
  const cells = RISK_CLASSES.map((rc) => (s.riskClasses.includes(rc) ? rc : `(${rc})`).padEnd(22)).join('');
  console.log(`  ${contract.name.padEnd(24)} ${cells} ${s.defined}/${behavioralReq.minimum}`);
}

console.log('\nExecution readiness:\nDEFINED / NOT YET PLATFORM-VALIDATED');
console.log('(scripts/run-behavioral-evals.mjs executes when BEHAVIORAL_RESULTS_FILE or BEHAVIORAL_EVAL_COMMAND is supplied; neither is wired into npm run check)');
