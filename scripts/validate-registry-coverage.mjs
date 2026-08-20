import { fail, GOVERNANCE_CRITICAL } from './lib.mjs';
import { contracts, generate } from './build-capability-registry.mjs';

const VALID_EXPOSURE = new Set(['DIRECT', 'DELEGATED', 'INTERNAL', 'UTILITY']);

const errors = [];
const all = contracts();
const byName = new Map(all.map((contract) => [contract.name, contract]));
const registry = generate();
const registered = new Set(registry.capabilities.map((entry) => entry.skill));

for (const contract of all) {
  const routing = contract.routing;
  if (!routing || !VALID_EXPOSURE.has(routing.exposure)) {
    errors.push(`REGISTRY_COVERAGE: ${contract.name} missing a valid routing.exposure`);
    continue;
  }
  if (routing.exposure === 'DELEGATED' && !(routing.callable_by?.length > 0)) errors.push(`REGISTRY_COVERAGE: ${contract.name} is DELEGATED without callable_by`);
  if (routing.exposure === 'INTERNAL' && !routing.reason) errors.push(`REGISTRY_COVERAGE: ${contract.name} is INTERNAL without reason`);
  if (['DIRECT', 'DELEGATED'].includes(routing.exposure) && !registered.has(contract.name)) errors.push(`REGISTRY_COVERAGE: ${contract.name} is ${routing.exposure} but absent from the generated registry`);
  for (const target of contract.routes_to ?? []) if (!byName.has(target)) errors.push(`REGISTRY_COVERAGE: ${contract.name} routes_to unknown skill ${target}`);
}

for (const name of GOVERNANCE_CRITICAL) {
  const contract = byName.get(name);
  if (!contract) errors.push(`REGISTRY_COVERAGE: governance-critical skill ${name} does not exist`);
  else if (!registered.has(name)) errors.push(`REGISTRY_COVERAGE: governance-critical skill ${name} is invisible to routing (CRITICAL_SENTINEL)`);
}
for (const contract of all) if (contract.status === 'CRITICAL' && !registered.has(contract.name)) errors.push(`REGISTRY_COVERAGE: CRITICAL skill ${contract.name} is invisible to routing (CRITICAL_SENTINEL)`);

const seen = new Set();
for (const entry of registry.capabilities) {
  if (seen.has(entry.skill)) errors.push(`REGISTRY_COVERAGE: duplicate registry entry for ${entry.skill}`);
  seen.add(entry.skill);
}

fail(errors);
console.log(`REGISTRY_COVERAGE_VALID: ${registered.size}/${all.length} skills accounted for routing`);
