import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { evalCases, resultsPath } from './eval-utils.mjs';
import { fail } from './lib.mjs';

const cases = evalCases('behavioral');
const outputPath = resultsPath();
let rawResults;
if (outputPath) {
  if (!existsSync(outputPath)) fail([`BEHAVIORAL_EVALS_FAILED: results file not found: ${outputPath}`]);
  rawResults = JSON.parse(readFileSync(outputPath, 'utf8'));
} else if (process.env.BEHAVIORAL_EVAL_COMMAND) {
  const execution = spawnSync(process.env.BEHAVIORAL_EVAL_COMMAND, [], { input: JSON.stringify(cases.map(({ value }) => value)), encoding: 'utf8', timeout: 120000 });
  if (execution.status !== 0) fail([`BEHAVIORAL_EVALS_FAILED: provider exited ${execution.status}: ${execution.stderr}`]);
  try { rawResults = JSON.parse(execution.stdout); } catch { fail(['BEHAVIORAL_EVALS_FAILED: provider must emit a JSON results array']); }
} else {
  console.log('BEHAVIORAL_EVALS_SKIPPED: set BEHAVIORAL_RESULTS_FILE or BEHAVIORAL_EVAL_COMMAND');
  process.exit(0);
}
const results = new Map(rawResults.map((result) => [result.id, new Set(result.behaviors ?? [])]));
const errors = [];
for (const { value: testCase } of cases) {
  const behaviors = results.get(testCase.id);
  if (!behaviors) { errors.push(`BEHAVIORAL_EVAL ${testCase.id}: missing result`); continue; }
  for (const behavior of testCase.expected.must_include_behaviors ?? []) if (!behaviors.has(behavior)) errors.push(`BEHAVIORAL_EVAL ${testCase.id}: missing ${behavior}`);
  for (const behavior of testCase.expected.must_not ?? []) if (behaviors.has(behavior)) errors.push(`BEHAVIORAL_EVAL ${testCase.id}: prohibited ${behavior}`);
}
fail(errors); console.log(`BEHAVIORAL_EVALS_PASSED: ${cases.length} cases`);
