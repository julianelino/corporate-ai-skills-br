import { files, fail } from './lib.mjs';
import { readFileSync } from 'node:fs';

const descriptions = new Map();
for (const path of files('skills', (name) => name === 'SKILL.md')) {
  const description = /^description: (.+)$/m.exec(readFileSync(path, 'utf8'))?.[1]?.toLowerCase();
  if (description) descriptions.set(description, [...(descriptions.get(description) ?? []), path]);
}
fail([...descriptions.values()].filter((paths) => paths.length > 1).map((paths) => `SKILL_OVERLAP: ${paths.join(', ')}`)); console.log('SKILL_OVERLAP_CHECK_PASSED');
