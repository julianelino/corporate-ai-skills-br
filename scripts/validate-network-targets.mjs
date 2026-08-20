import { fail, json } from './lib.mjs';
import { staticUrlIsSafe } from './network-safety.mjs';

// Structural SSRF gate: no network access, just URL shape. Runs in npm run check on every source URL
// in SOURCE_REGISTRY.yaml. The operational checker (scripts/check-source-freshness.mjs) additionally
// resolves DNS for real before every request and every redirect hop — this script cannot catch a
// hostname that resolves to a private IP only at request time (DNS rebinding), that is what the
// operational guard is for.

const registry = json('sources/SOURCE_REGISTRY.yaml');
const errors = [];
for (const source of registry.sources) {
  const result = staticUrlIsSafe(source.url);
  if (!result.safe) errors.push(`NETWORK_TARGET: ${source.id} (${source.url}): ${result.reason}`);
}

fail(errors);
console.log(`NETWORK_TARGET_VALID: ${registry.sources.length} source URLs`);
