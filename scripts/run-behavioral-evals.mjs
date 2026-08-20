import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { evalCases, resultsPath } from './eval-utils.mjs';
import { fail } from './lib.mjs';

// EVAL_SKILL_FILTER (optional): scope this run to one skill's cases, so real platform execution
// can be built up and reported incrementally, skill by skill — mirroring how Workstream A closed
// REFERENCE_DEPTH one skill at a time — without ever changing default (unfiltered, all-skills)
// behavior or npm run check, which does not call this script at all (only behavioral:validate,
// the definition-only gate, is wired into npm run eval). Leaving this unset preserves the exact
// original all-cases semantics.
const skillFilter = process.env.EVAL_SKILL_FILTER;
const cases = evalCases('behavioral').filter(({ value }) => !skillFilter || value.skill === skillFilter);
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
  // expected.behavior.{must,must_not} — not a top-level expected.must_include_behaviors/must_not,
  // which no gold case has ever actually used (see evals/behavioral/critical/**/*.json and
  // ARCHITECTURE.md "Critical behavioral gold cases"). The old paths were always undefined, so both
  // loops always iterated zero times and no case could ever fail here regardless of actual behavior.
  for (const behavior of testCase.expected.behavior?.must ?? []) if (!behaviors.has(behavior)) errors.push(`BEHAVIORAL_EVAL ${testCase.id}: missing ${behavior}`);
  for (const behavior of testCase.expected.behavior?.must_not ?? []) if (behaviors.has(behavior)) errors.push(`BEHAVIORAL_EVAL ${testCase.id}: prohibited ${behavior}`);
}
fail(errors); console.log(`BEHAVIORAL_EVALS_PASSED: ${cases.length} cases`);
