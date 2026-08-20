import { fail, json } from './lib.mjs';
import { contracts } from './build-capability-registry.mjs';
import { evalCases } from './eval-utils.mjs';

// Reads every minimum from knowledge/registry/quality-profiles.yaml (evals.routing.by_exposure) —
// never a local hardcoded number — so a DIRECT skill's positive-routing bar and a DELEGATED skill's
// delegation-case bar can be set independently without drifting apart in two files. Critical skills
// are discovered dynamically (quality_profile === 'critical'), the same way every other Task-1e/2/3
// script does; a routing.exposure this profile doesn't define a bar for gets no requirement.

const PROFILES = json('knowledge/registry/quality-profiles.yaml').profiles;
const cases = evalCases('static').map(({ value }) => value);
const positiveCases = (skill) => cases.filter((c) => c.expected?.primary_skill === skill && c.kind !== 'boundary');
const boundaryCases = (skill) => cases.filter((c) => c.expected?.primary_skill === skill && c.kind === 'boundary');
const delegationCases = (skill) => cases.filter((c) => c.expected?.delegate_target === skill);
// A DELEGATED skill is never itself a primary match, so its boundary evidence is a case whose
// primary is the delegating skill but that still names this skill as delegate_target.
const delegationBoundaryCases = (skill) => cases.filter((c) => c.expected?.delegate_target === skill && c.kind === 'boundary');

const errors = [];
for (const contract of contracts()) {
  const exposure = contract.routing?.exposure;
  const bar = PROFILES[contract.quality_profile]?.evals?.routing?.by_exposure?.[exposure];
  if (!bar) continue; // this profile sets no routing requirement for this exposure (e.g. INTERNAL, UTILITY).

  if ('positive_minimum' in bar) {
    if (positiveCases(contract.name).length < bar.positive_minimum) errors.push(`ROUTING_EVAL_COVERAGE: ${contract.name} (${contract.quality_profile}/DIRECT) has ${positiveCases(contract.name).length} positive cases, needs >=${bar.positive_minimum}`);
  }
  if ('delegation_minimum' in bar) {
    if (delegationCases(contract.name).length < bar.delegation_minimum) errors.push(`ROUTING_EVAL_COVERAGE: ${contract.name} (${contract.quality_profile}/DELEGATED) has ${delegationCases(contract.name).length} delegation cases, needs >=${bar.delegation_minimum}`);
  }
  if ('boundary_minimum' in bar) {
    const boundaryCount = exposure === 'DELEGATED' ? delegationBoundaryCases(contract.name).length : boundaryCases(contract.name).length;
    if (boundaryCount < bar.boundary_minimum) errors.push(`ROUTING_EVAL_COVERAGE: ${contract.name} (${contract.quality_profile}) has ${boundaryCount} boundary cases, needs >=${bar.boundary_minimum}`);
  }
}

fail(errors);
console.log('ROUTING_EVAL_COVERAGE_VALID');
