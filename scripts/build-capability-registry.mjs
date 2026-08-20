import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { files, json, root } from './lib.mjs';

export const registryPath = join(root, 'knowledge/registry/capability-registry.generated.yaml');
const EXPOSED = new Set(['DIRECT', 'DELEGATED']);

export function contracts() {
  return files('skills', (name) => name === 'skill.yaml')
    .map((path) => JSON.parse(readFileSync(path, 'utf8')))
    .filter((contract) => contract.status !== 'RETIRED');
}

export function generate() {
  const triggerMap = new Map(json('knowledge/registry/routing-triggers.yaml').skills.map((entry) => [entry.skill, entry]));
  const capabilities = contracts()
    .filter((contract) => EXPOSED.has(contract.routing?.exposure))
    .map((contract) => {
      const curated = triggerMap.get(contract.name);
      return {
        skill: contract.name,
        domain: contract.domain,
        namespace: contract.routing?.namespace ?? null,
        triggers: curated?.triggers ?? [],
        anti_triggers: curated?.anti_triggers ?? [],
        handles: contract.handles,
        requires_fresh_sources: curated?.requires_fresh_sources ?? [],
        can_delegate_to: contract.routes_to,
        risk_ceiling: contract.risk_ceiling,
      };
    })
    .sort((a, b) => a.skill.localeCompare(b.skill));
  return {
    registry_version: '0.3.0',
    generated_from: 'skills/**/skill.yaml + knowledge/registry/routing-triggers.yaml via scripts/build-capability-registry.mjs',
    capabilities,
  };
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  writeFileSync(registryPath, JSON.stringify(generate(), null, 2) + '\n');
  console.log(`REGISTRY_BUILT: ${registryPath}`);
}
