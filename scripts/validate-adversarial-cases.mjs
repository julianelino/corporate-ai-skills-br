import { existsSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { fail, files, json } from './lib.mjs';
import { contracts } from './build-capability-registry.mjs';
import { riskRank } from './eval-utils.mjs';

// DEFINITION-mode validator, same discipline as validate-behavioral-gold-cases.mjs: checks that
// adversarial case files are well-formed and internally consistent with the skill's own contract.
// It never executes a case against an agent and never reports PASS/FAIL for behavior.

const THREATS = new Set(json('knowledge/registry/security-policy.json').threats.map((t) => t.id));
const ORIGIN_TYPES = new Set(['domain-risk', 'regression', 'requirement']);

export function validateAdversarialCases() {
  const PROFILES = json('knowledge/registry/quality-profiles.yaml').profiles;
  const adversarialReq = PROFILES.critical.evals.adversarial;
  const critical = contracts().filter((c) => c.quality_profile === 'critical');
  const errors = [];
  const allIds = new Set();
  const bySkill = {};

  for (const contract of critical) {
    const dir = `evals/adversarial/critical/${contract.name}`;
    const casePaths = existsSync(dir) ? files(dir, (name) => name.endsWith('.json')) : [];
    const cases = casePaths.map((path) => ({ path, value: JSON.parse(readFileSync(path, 'utf8')) }));

    for (const { value: c } of cases) {
      if (allIds.has(c.id)) errors.push(`ADVERSARIAL_CASE: duplicate id ${c.id}`);
      allIds.add(c.id);

      if (c.skill !== contract.name) errors.push(`ADVERSARIAL_CASE ${c.id}: skill field "${c.skill}" does not match directory ${contract.name}`);
      if (!THREATS.has(c.threat)) errors.push(`ADVERSARIAL_CASE ${c.id}: threat "${c.threat}" is not in knowledge/registry/security-policy.json`);
      if (!c.origin || !ORIGIN_TYPES.has(c.origin.type)) errors.push(`ADVERSARIAL_CASE ${c.id}: missing or invalid origin.type`);
      if (!c.input) errors.push(`ADVERSARIAL_CASE ${c.id}: missing input`);
      if (!(c.expected?.behavior?.must?.length > 0)) errors.push(`ADVERSARIAL_CASE ${c.id}: expected.behavior.must must be non-empty`);
      if (!(c.expected?.behavior?.must_not?.length > 0)) errors.push(`ADVERSARIAL_CASE ${c.id}: expected.behavior.must_not must be non-empty`);

      const contractExp = c.expected?.contract;
      if (!contractExp?.minimum_risk) { errors.push(`ADVERSARIAL_CASE ${c.id}: missing expected.contract.minimum_risk`); continue; }
      if (riskRank[contractExp.minimum_risk] > riskRank[contract.risk_ceiling]) errors.push(`ADVERSARIAL_CASE ${c.id}: minimum_risk ${contractExp.minimum_risk} exceeds ${contract.name}'s own risk_ceiling ${contract.risk_ceiling}`);
      for (const authority of contractExp.authority?.allowed ?? []) if (!contract.decision_authority.includes(authority)) errors.push(`ADVERSARIAL_CASE ${c.id}: authority.allowed includes ${authority}, which ${contract.name} does not have`);
      if (!contractExp.authority?.forbidden?.includes('APPROVE')) errors.push(`ADVERSARIAL_CASE ${c.id}: authority.forbidden must include APPROVE`);
    }

    if (cases.length < adversarialReq.minimum) errors.push(`ADVERSARIAL_CASE: ${contract.name} has ${cases.length} adversarial cases, needs >=${adversarialReq.minimum}`);
    bySkill[contract.name] = { defined: cases.length, threats: [...new Set(cases.map(({ value }) => value.threat))] };
  }

  return { errors, critical, bySkill, adversarialReq };
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const { errors, critical, bySkill } = validateAdversarialCases();
  fail(errors);
  const total = Object.values(bySkill).reduce((sum, s) => sum + s.defined, 0);
  console.log(`ADVERSARIAL_CASES_DEFINED: ${critical.length}/${critical.length} critical skills meet the definition minimum (${total} cases total)`);
}
