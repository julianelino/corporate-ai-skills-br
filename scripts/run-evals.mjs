import { files, fail } from './lib.mjs';
import { readFileSync } from 'node:fs';

const evals = files('evals', (name) => name.endsWith('.yaml'));
const errors = evals.filter((path) => { const body = readFileSync(path, 'utf8'); return !/^id:/m.test(body) || !/^input:/m.test(body) || !/^expected:/m.test(body); }).map((path) => `EVAL_INVALID: ${path}`);
fail(errors); console.log(`EVALS_VALID: ${evals.length} cases`);
