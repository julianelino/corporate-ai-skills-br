import { files, fail } from './lib.mjs';
import { readFileSync } from 'node:fs';

const workflows = files('workflows', (name) => name.endsWith('.md'));
const errors = workflows.filter((path) => { const body = readFileSync(path, 'utf8'); return !body.includes('## Flow') || !body.includes('## Controls'); }).map((path) => `WORKFLOW_INVALID: ${path}`);
fail(errors); console.log(`WORKFLOW_VALID: ${workflows.length} workflows`);
