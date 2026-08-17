import { files, fail } from './lib.mjs';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const required = ['name', 'version', 'domain', 'status', 'jurisdiction', 'default_locale', 'routes_from', 'routes_to', 'handles', 'requires', 'optional_context', 'risk_ceiling', 'decision_authority', 'freshness', 'source_policy', 'token_budget', 'compatible_platforms'];
const errors = []; const skills = files('skills', (name) => name === 'SKILL.md');
for (const path of skills) {
  const body = readFileSync(path, 'utf8'); const match = /^---\nname: ([a-z0-9-]+)\ndescription: .+\n---\n/s.exec(body);
  if (!match || body.includes('TODO')) { errors.push(`SKILL_INVALID: ${path}`); continue; }
  const contractPath = join(path, '..', 'skill.yaml');
  if (!existsSync(contractPath)) { errors.push(`SKILL_INVALID: missing contract for ${path}`); continue; }
  const contract = JSON.parse(readFileSync(contractPath, 'utf8'));
  for (const field of required) if (!(field in contract)) errors.push(`SKILL_INVALID: ${contractPath} missing ${field}`);
  if (contract.name !== match[1]) errors.push(`SKILL_INVALID: name mismatch ${contractPath}`);
  if (['R5', 'R6'].includes(contract.risk_ceiling) && !existsSync(join(path, '..', 'sources.md'))) errors.push(`SKILL_INVALID: critical skill lacks sources ${path}`);
}
fail(errors); console.log(`SKILL_VALID: ${skills.length} skills`);
