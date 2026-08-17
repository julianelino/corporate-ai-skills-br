import { json, fail } from './lib.mjs';

const registry = json('sources/SOURCE_REGISTRY.yaml');
const required = ['id', 'name', 'url', 'authority', 'tier', 'jurisdiction', 'domains', 'freshness', 'copyright'];
const ids = new Set(); const errors = [];
for (const source of registry.sources ?? []) {
  for (const field of required) if (!(field in source)) errors.push(`SOURCE_INVALID: ${source.id ?? '<unknown>'} missing ${field}`);
  if (ids.has(source.id)) errors.push(`SOURCE_INVALID: duplicate ${source.id}`);
  ids.add(source.id);
  if (!/^https:\/\//.test(source.url ?? '')) errors.push(`SOURCE_INVALID: ${source.id} requires HTTPS URL`);
}
if (!registry.sources?.length) errors.push('SOURCE_INVALID: registry is empty');
fail(errors); console.log(`SOURCE_VALID: ${registry.sources.length} sources`);
