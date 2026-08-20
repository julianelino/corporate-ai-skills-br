import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { evalCases } from './eval-utils.mjs';
import { fail, root } from './lib.mjs';

// Adversarial's sibling to run-behavioral-evals.mjs — same DEFINED/VALID/EXECUTED/PASSED discipline,
// same expected.behavior.{must,must_not} schema (adversarial cases carry the identical shape, just
// under evals/adversarial/ with a `threat` field instead of a `risk_class`). Deliberately not merged
// into run-behavioral-evals.mjs: the two are triggered by separate carry-forward items
// (PLATFORM_BEHAVIORAL_EXECUTION / PLATFORM_ADVERSARIAL_EXECUTION) and may in practice be wired to
// different provider commands or result files at different times — keeping them as two small,
// independently-runnable scripts avoids one's env vars silently gating the other.

// EVAL_SKILL_FILTER: same optional, additive scoping as run-behavioral-evals.mjs — unset preserves
// the original all-cases behavior; this script is likewise not called by npm run check.
const skillFilter = process.env.EVAL_SKILL_FILTER;
const cases = evalCases('adversarial').filter(({ value }) => !skillFilter || value.skill === skillFilter);
const resultsFile = process.env.ADVERSARIAL_RESULTS_FILE ? join(root, process.env.ADVERSARIAL_RESULTS_FILE) : undefined;
let rawResults;
if (resultsFile) {
  if (!existsSync(resultsFile)) fail([`ADVERSARIAL_EVALS_FAILED: results file not found: ${resultsFile}`]);
  rawResults = JSON.parse(readFileSync(resultsFile, 'utf8'));
} else if (process.env.ADVERSARIAL_EVAL_COMMAND) {
  const execution = spawnSync(process.env.ADVERSARIAL_EVAL_COMMAND, [], { input: JSON.stringify(cases.map(({ value }) => value)), encoding: 'utf8', timeout: 120000 });
  if (execution.status !== 0) fail([`ADVERSARIAL_EVALS_FAILED: provider exited ${execution.status}: ${execution.stderr}`]);
  try { rawResults = JSON.parse(execution.stdout); } catch { fail(['ADVERSARIAL_EVALS_FAILED: provider must emit a JSON results array']); }
} else {
  console.log('ADVERSARIAL_EVALS_SKIPPED: set ADVERSARIAL_RESULTS_FILE or ADVERSARIAL_EVAL_COMMAND');
  process.exit(0);
}
const results = new Map(rawResults.map((result) => [result.id, new Set(result.behaviors ?? [])]));
const errors = [];
for (const { value: testCase } of cases) {
  const behaviors = results.get(testCase.id);
  if (!behaviors) { errors.push(`ADVERSARIAL_EVAL ${testCase.id}: missing result`); continue; }
  for (const behavior of testCase.expected.behavior?.must ?? []) if (!behaviors.has(behavior)) errors.push(`ADVERSARIAL_EVAL ${testCase.id}: missing ${behavior}`);
  for (const behavior of testCase.expected.behavior?.must_not ?? []) if (behaviors.has(behavior)) errors.push(`ADVERSARIAL_EVAL ${testCase.id}: prohibited ${behavior}`);
}
fail(errors); console.log(`ADVERSARIAL_EVALS_PASSED: ${cases.length} cases`);
