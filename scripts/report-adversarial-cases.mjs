import { validateAdversarialCases } from './validate-adversarial-cases.mjs';

// Same DEFINED/VALID/EXECUTED/PASSED separation as report-behavioral-gold-cases.mjs (Task 2's
// eval:legacy lesson, applied again here): this script never runs a case against an agent.

const { errors, critical, bySkill, adversarialReq } = validateAdversarialCases();
const totalDefined = Object.values(bySkill).reduce((sum, s) => sum + s.defined, 0);
const invalidIds = new Set(errors.map((e) => e.match(/^ADVERSARIAL_CASE ([^:]+):/)?.[1]).filter(Boolean));
const totalValid = totalDefined - invalidIds.size;
const meetingGate = Object.values(bySkill).filter((s) => s.defined >= adversarialReq.minimum).length;

console.log('CRITICAL ADVERSARIAL CASES\n');
console.log(`Critical skills:                ${critical.length}`);
console.log(`Minimum required cases (${adversarialReq.minimum} ea):  ${critical.length * adversarialReq.minimum}`);
console.log(`Defined:                        ${totalDefined}`);
console.log(`Valid:                          ${totalValid}${errors.length ? ` (${errors.length} definition errors — run npm run adversarial:validate for detail)` : ''}`);
console.log(`Executed against agent:         0`);
console.log(`Passed:                         0\n`);
console.log(`Skills meeting definition gate: ${meetingGate}/${critical.length}\n`);

console.log('Threat coverage:');
for (const contract of critical.sort((a, b) => a.name.localeCompare(b.name))) {
  const s = bySkill[contract.name];
  console.log(`  ${contract.name.padEnd(24)} ${s.defined}/${adversarialReq.minimum}  threats: ${s.threats.join(', ') || '(none)'}`);
}

console.log('\nExecution readiness:\nDEFINED / NOT YET PLATFORM-VALIDATED');
console.log('(no agent execution mechanism exists for adversarial cases yet — see knowledge/registry/carry-forward.yaml PLATFORM_ADVERSARIAL_EXECUTION)');
