import { route } from '../engines/reference-routing/index.mjs';
import { contractFor, evalCases, riskRank, sourceMapExists } from './eval-utils.mjs';
import { fail } from './lib.mjs';

const errors = [];
for (const { value: testCase } of evalCases('static')) {
  const expected = testCase.expected ?? {};
  const routed = route(testCase.input);
  if (expected.status && routed.status !== expected.status) errors.push(`STATIC_EVAL ${testCase.id}: expected status ${expected.status}, got ${routed.status}`);
  if ((routed.primary ?? null) !== (expected.primary_skill ?? null)) errors.push(`STATIC_EVAL ${testCase.id}: expected primary ${expected.primary_skill ?? 'null'}, got ${routed.primary ?? 'null'}`);
  if (expected.context_guard !== undefined && routed.context_guard !== expected.context_guard) errors.push(`STATIC_EVAL ${testCase.id}: expected context_guard ${expected.context_guard}, got ${routed.context_guard}`);
  for (const forbidden of expected.must_not_include_specialist ?? []) if (routed.specialists.includes(forbidden)) errors.push(`STATIC_EVAL ${testCase.id}: must not include ${forbidden}, got specialists ${routed.specialists.join(',')}`);
  for (const required of expected.must_include_specialist ?? []) if (!routed.specialists.includes(required)) errors.push(`STATIC_EVAL ${testCase.id}: must include ${required}, got specialists ${routed.specialists.join(',')}`);
  if (!expected.primary_skill) continue; // routing-only case (NO_MATCH/AMBIGUOUS): no skill contract to check against.

  const resolved = contractFor(expected.primary_skill);
  if (!resolved) { errors.push(`STATIC_EVAL ${testCase.id}: missing contract ${expected.primary_skill}`); continue; }
  const { contract, path: contractPath } = resolved;
  if (expected.risk_at_least && riskRank[contract.risk_ceiling] < riskRank[expected.risk_at_least]) errors.push(`STATIC_EVAL ${testCase.id}: risk below ${expected.risk_at_least}`);
  if (expected.freshness && contract.freshness !== expected.freshness) errors.push(`STATIC_EVAL ${testCase.id}: freshness must be ${expected.freshness}`);
  if (expected.requires_sources && !sourceMapExists(contractPath)) errors.push(`STATIC_EVAL ${testCase.id}: sources.md required`);
  for (const authority of expected.authority_includes ?? []) if (!contract.decision_authority.includes(authority)) errors.push(`STATIC_EVAL ${testCase.id}: missing authority ${authority}`);
  if (expected.mode && routed.mode !== expected.mode) errors.push(`STATIC_EVAL ${testCase.id}: expected ${expected.mode}, got ${routed.mode}`);
  if (expected.delegate_target && !contract.routes_to.includes(expected.delegate_target)) errors.push(`STATIC_EVAL ${testCase.id}: ${expected.primary_skill} does not delegate to ${expected.delegate_target}`);
}
fail(errors); console.log(`STATIC_EVALS_PASSED: ${evalCases('static').length} cases`);
