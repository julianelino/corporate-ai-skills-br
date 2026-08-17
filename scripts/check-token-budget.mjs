import { files, fail } from './lib.mjs';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const errors = [];
for (const path of files('skills', (name) => name === 'skill.yaml')) {
  const contract = JSON.parse(readFileSync(path, 'utf8')); const words = readFileSync(join(path, '..', 'SKILL.md'), 'utf8').trim().split(/\s+/).length;
  if (words > contract.token_budget.core_tokens * 2) errors.push(`TOKEN_BUDGET: ${path}`);
}
fail(errors); console.log('TOKEN_BUDGET_PASSED');
