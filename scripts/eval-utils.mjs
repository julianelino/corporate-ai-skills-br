import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { files, root } from './lib.mjs';

export const riskRank = Object.freeze({ R0: 0, R1: 1, R2: 2, R3: 3, R4: 4, R5: 5, R6: 6 });

export function contractFor(skill) {
  const path = files('skills', (name) => name === 'skill.yaml').find((candidate) => JSON.parse(readFileSync(candidate, 'utf8')).name === skill);
  return path ? { path, contract: JSON.parse(readFileSync(path, 'utf8')) } : undefined;
}

export function sourceMapExists(contractPath) {
  return existsSync(join(contractPath, '..', 'sources.md'));
}

export function evalCases(kind) {
  return files(`evals/${kind}`, (name) => name.endsWith('.json')).map((path) => ({ path, value: JSON.parse(readFileSync(path, 'utf8')) }));
}

export const resultsPath = () => process.env.BEHAVIORAL_RESULTS_FILE ? join(root, process.env.BEHAVIORAL_RESULTS_FILE) : undefined;
