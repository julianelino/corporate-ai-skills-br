import { contracts, generate } from './build-capability-registry.mjs';

const all = contracts();
const registry = generate();
const registered = new Set(registry.capabilities.map((entry) => entry.skill));
const byExposure = new Map();
for (const contract of all) {
  const exposure = contract.routing?.exposure ?? 'UNSET';
  byExposure.set(exposure, (byExposure.get(exposure) ?? 0) + 1);
}

console.log(`Skills defined:        ${all.length}`);
console.log(`Accounted in registry: ${registered.size} (${((registered.size / all.length) * 100).toFixed(1)}%)`);
console.log('By exposure:');
for (const [exposure, count] of [...byExposure.entries()].sort()) console.log(`  ${exposure.padEnd(10)} ${count}`);
console.log('Triggers:');
for (const entry of registry.capabilities) if (entry.triggers.length === 0) console.log(`  ${entry.skill}: 0 triggers (unreachable by keyword match)`);
