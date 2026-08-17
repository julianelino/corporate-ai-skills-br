import { files, fail } from './lib.mjs';
import { readFileSync } from 'node:fs';

const errors = [];
for (const path of files('schemas', (name) => name.endsWith('.schema.json'))) {
  try { const schema = JSON.parse(readFileSync(path, 'utf8')); if (schema.type !== 'object' || !schema.title) errors.push(`SCHEMA_INVALID: ${path}`); } catch { errors.push(`SCHEMA_INVALID: ${path}`); }
}
fail(errors); console.log('SCHEMA_VALID');
