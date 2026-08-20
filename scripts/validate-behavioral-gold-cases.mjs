import { existsSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { fail, files, json } from './lib.mjs';
import { contracts } from './build-capability-registry.mjs';
import { riskRank } from './eval-utils.mjs';

// DEFINITION-mode validator (contract mode): checks that gold case files are well-formed, cover the
// required risk classes, and are internally consistent with the skill's own contract. It never
// executes a case against an agent and never reports PASS/FAIL for behavior — that is a distinct,
// future execution mode (scripts/run-behavioral-evals.mjs already carries that separation for the
// flat evals/behavioral/*.json cases; this script is the analogous definition gate for the
// evals/behavioral/critical/<skill>/ gold cases introduced in Task 2).

const RISK_CLASSES = new Set(['NORMAL', 'BOUNDARY', 'INSUFFICIENT_CONTEXT', 'HIGH_RISK', 'FAIL_SAFE', 'CROSS_DOMAIN', 'CONFLICTING_EVIDENCE', 'STALE_SOURCE', 'HUMAN_APPROVAL']);
const ORIGIN_TYPES = new Set(['domain-risk', 'regression', 'requirement']);

export function validateGoldCases() {
  const PROFILES = json('knowledge/registry/quality-profiles.yaml').profiles;
  const behavioralReq = PROFILES.critical.evals.behavioral;
  const critical = contracts().filter((c) => c.quality_profile === 'critical');
  const errors = [];
  const allIds = new Set();
  const bySkill = {};

  for (const contract of critical) {
    const dir = `evals/behavioral/critical/${contract.name}`;
    const casePaths = existsSync(dir) ? files(dir, (name) => name.endsWith('.json')) : [];
    const cases = casePaths.map((path) => ({ path, value: JSON.parse(readFileSync(path, 'utf8')) }));
    const foundRiskClasses = new Set();

    for (const { value: c } of cases) {
      if (allIds.has(c.id)) errors.push(`GOLD_CASE: duplicate id ${c.id}`);
      allIds.add(c.id);

      if (c.skill !== contract.name) errors.push(`GOLD_CASE ${c.id}: skill field "${c.skill}" does not match directory ${contract.name}`);
      if (!RISK_CLASSES.has(c.risk_class)) errors.push(`GOLD_CASE ${c.id}: invalid risk_class ${c.risk_class}`);
      else foundRiskClasses.add(c.risk_class);
      if (!c.origin || !ORIGIN_TYPES.has(c.origin.type)) errors.push(`GOLD_CASE ${c.id}: missing or invalid origin.type`);
      if (!c.input) errors.push(`GOLD_CASE ${c.id}: missing input`);
      if (!(c.expected?.behavior?.must?.length > 0)) errors.push(`GOLD_CASE ${c.id}: expected.behavior.must must be non-empty`);
      if (!(c.expected?.behavior?.must_not?.length > 0)) errors.push(`GOLD_CASE ${c.id}: expected.behavior.must_not must be non-empty`);

      const contractExp = c.expected?.contract;
      if (!contractExp?.minimum_risk) { errors.push(`GOLD_CASE ${c.id}: missing expected.contract.minimum_risk`); continue; }
      if (riskRank[contractExp.minimum_risk] > riskRank[contract.risk_ceiling]) errors.push(`GOLD_CASE ${c.id}: minimum_risk ${contractExp.minimum_risk} exceeds ${contract.name}'s own risk_ceiling ${contract.risk_ceiling}`);
      if (contractExp.freshness_required && contract.freshness === 'static') errors.push(`GOLD_CASE ${c.id}: freshness_required but ${contract.name} is freshness: static`);
      for (const authority of contractExp.authority?.allowed ?? []) if (!contract.decision_authority.includes(authority)) errors.push(`GOLD_CASE ${c.id}: authority.allowed includes ${authority}, which ${contract.name} does not have`);
      if (!contractExp.authority?.forbidden?.includes('APPROVE')) errors.push(`GOLD_CASE ${c.id}: authority.forbidden must include APPROVE (no skill contract may claim it)`);
    }

    if (cases.length < behavioralReq.minimum) errors.push(`GOLD_CASE: ${contract.name} has ${cases.length} gold cases, needs >=${behavioralReq.minimum}`);
    for (const required of behavioralReq.required_risk_classes ?? []) if (!foundRiskClasses.has(required)) errors.push(`GOLD_CASE: ${contract.name} is missing a ${required} gold case`);

    bySkill[contract.name] = { defined: cases.length, riskClasses: [...foundRiskClasses] };
  }

  return { errors, critical, bySkill, behavioralReq };
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const { errors, critical, bySkill } = validateGoldCases();
  fail(errors);
  const total = Object.values(bySkill).reduce((sum, s) => sum + s.defined, 0);
  console.log(`BEHAVIORAL_GOLD_CASES_DEFINED: ${critical.length}/${critical.length} critical skills meet the definition minimum (${total} cases total)`);
}
