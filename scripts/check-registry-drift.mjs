import { readFileSync } from 'node:fs';
import { fail } from './lib.mjs';
import { generate, registryPath } from './build-capability-registry.mjs';

const committed = JSON.stringify(JSON.parse(readFileSync(registryPath, 'utf8')));
const fresh = JSON.stringify(generate());
fail(fresh === committed ? [] : ['REGISTRY_DRIFT: capability-registry.generated.yaml is out of date, run `npm run registry:build`']);
console.log('REGISTRY_DRIFT_CHECK_PASSED');
