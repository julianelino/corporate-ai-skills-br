import { files, fail } from './lib.mjs';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const errors = [];
for (const path of files('.', (name) => name.endsWith('.md'))) {
  for (const target of [...readFileSync(path, 'utf8').matchAll(/\[[^\]]+\]\(([^)#]+)(?:#[^)]+)?\)/g)].map((match) => match[1])) {
    if (/^(https?:|mailto:)/.test(target)) continue;
    if (!existsSync(resolve(dirname(path), target))) errors.push(`BROKEN_LINK: ${path} -> ${target}`);
  }
}
fail(errors); console.log('LINK_CHECK_PASSED');
