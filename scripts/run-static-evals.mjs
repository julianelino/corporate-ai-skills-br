import { route } from '../engines/reference-routing/index.mjs';
import { contractFor, evalCases, riskRank, sourceMapExists } from './eval-utils.mjs';
import { fail } from './lib.mjs';

const errors = [];
for (const { path, value: testCase } of evalCases('static')) {
  const expected = testCase.expected ?? {}; const routed = route(testCase.input);
  if (routed.primary !== expected.primary_skill) errors.push(`STATIC_EVAL ${testCase.id}: expected ${expected.primary_skill}, got ${routed.primary}`);
  const resolved = contractFor(expected.primary_skill);
  if (!resolved) { errors.push(`STATIC_EVAL ${testCase.id}: missing contract ${expected.primary_skill}`); continue; }
  const { contract, path: contractPath } = resolved;
  if (expected.risk_at_least && riskRank[contract.risk_ceiling] < riskRank[expected.risk_at_least]) errors.push(`STATIC_EVAL ${testCase.id}: risk below ${expected.risk_at_least}`);
  if (expected.freshness && contract.freshness !== expected.freshness) errors.push(`STATIC_EVAL ${testCase.id}: freshness must be ${expected.freshness}`);
  if (expected.requires_sources && !sourceMapExists(contractPath)) errors.push(`STATIC_EVAL ${testCase.id}: sources.md required`);
  for (const authority of expected.authority_includes ?? []) if (!contract.decision_authority.includes(authority)) errors.push(`STATIC_EVAL ${testCase.id}: missing authority ${authority}`);
  if (expected.mode && routed.mode !== expected.mode) errors.push(`STATIC_EVAL ${testCase.id}: expected ${expected.mode}, got ${routed.mode}`);
  if (routed.context_guard && expected.context_guard === false) errors.push(`STATIC_EVAL ${testCase.id}: unexpected context guard`);
  if (!path) errors.push(`STATIC_EVAL ${testCase.id}: unreadable case`);
}
fail(errors); console.log(`STATIC_EVALS_PASSED: ${evalCases('static').length} cases`);
