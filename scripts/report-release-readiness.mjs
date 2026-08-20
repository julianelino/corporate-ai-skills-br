import { existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { fail, files, json } from './lib.mjs';
import { contracts } from './build-capability-registry.mjs';
import { buildReport as buildCoverageReport } from './report-skill-coverage.mjs';
import { evalCases } from './eval-utils.mjs';
import { buildImpactMap } from './report-source-impact.mjs';

// Consumes knowledge/registry/quality-profiles.yaml (policy) + reality (Task 1d's coverage
// dimensions) to say, per skill: what its profile requires, what it actually has, and the gap.
// This is a measurement/report by default (exit 0). Pass --release to make it a gate: exit 1 if
// any skill has an unmet requirement. Never wired into `npm run check` — a readiness gap must not
// break normal development CI, only an intentional release check.

const PROFILES = json('knowledge/registry/quality-profiles.yaml').profiles;
const staticCases = evalCases('static').map(({ value }) => value);
// "Contract" eval count = static cases asserting risk/freshness/authority/sources for this skill,
// plus Task 2's evals/behavioral/critical/<skill>/ gold cases, each of which also carries an
// expected.contract block (risk/freshness/authority) alongside its behavior assertions.
function contractEvalCount(skill) {
  const staticContractCases = staticCases.filter((c) => c.expected?.primary_skill === skill && (c.expected.risk_at_least || c.expected.freshness || c.expected.authority_includes?.length || c.expected.requires_sources)).length;
  const goldDir = `evals/behavioral/critical/${skill}`;
  const goldContractCases = existsSync(goldDir) ? evalCases(`behavioral/critical/${skill}`).filter(({ value }) => value.expected?.contract).length : 0;
  return staticContractCases + goldContractCases;
}
// Adversarial cases are DEFINED (Task 6), same as behavioral gold cases — neither has been executed
// against a real agent. The readiness requirement is satisfied by definition, same semantics as
// behavioral; PLATFORM_ADVERSARIAL_EXECUTION (carry-forward.yaml) tracks that execution separately.
function adversarialEvalCount(skill) {
  const dir = `evals/adversarial/critical/${skill}`;
  return existsSync(dir) ? files(dir, (name) => name.endsWith('.json')).length : 0;
}

// Skill -> [source ids it references], inverted from source-> [skills] (built from what skills'
// sources.md actually cite — see report-source-impact.mjs).
function skillSourceIds() {
  const bySource = buildImpactMap();
  const bySkill = new Map();
  for (const [sourceId, skills] of bySource.entries()) for (const skill of skills) (bySkill.get(skill) ?? bySkill.set(skill, []).get(skill)).push(sourceId);
  return bySkill;
}

export function buildReadiness() {
  const coverage = buildCoverageReport();
  const bySkill = new Map(coverage.skills.map((row) => [row.skill, row]));
  const sourceRegistry = json('sources/SOURCE_REGISTRY.yaml');
  const sourceById = new Map(sourceRegistry.sources.map((s) => [s.id, s]));
  const referencedSourcesBySkill = skillSourceIds();

  const rows = contracts().map((contract) => {
    const profileName = contract.quality_profile;
    const profile = PROFILES[profileName];
    const cov = bySkill.get(contract.name);
    const exposure = contract.routing?.exposure;
    const contractCount = contractEvalCount(contract.name);
    const behavioralCount = cov.behavioral_eval_count;
    const reviewStatus = contract.human_review?.status ?? 'not_required';

    const gaps = [];
    if (profile.sources.requirement === 'required' && !cov.dimensions.sources) gaps.push({ dimension: 'sources', detail: 'sources.md required, missing' });
    if (profile.references.requirement === 'required' && !cov.dimensions.references) gaps.push({ dimension: 'references', detail: 'references required, none present' });

    // Routing has its own exposure-specific bar (evals.routing.by_exposure) instead of one flat
    // minimum: a DELEGATED skill's delegation-case count is measured against its own bar, never a
    // DIRECT skill's positive-match bar.
    const routingBar = profile.evals?.routing?.by_exposure?.[exposure];
    if (routingBar) {
      if ('positive_minimum' in routingBar && cov.routing_eval_counts.positive < routingBar.positive_minimum) gaps.push({ dimension: 'routing_eval', detail: `requires >=${routingBar.positive_minimum} positive cases, has ${cov.routing_eval_counts.positive}` });
      if ('delegation_minimum' in routingBar && cov.routing_eval_counts.delegation < routingBar.delegation_minimum) gaps.push({ dimension: 'routing_eval', detail: `requires >=${routingBar.delegation_minimum} delegation cases, has ${cov.routing_eval_counts.delegation}` });
      if ('boundary_minimum' in routingBar && cov.routing_eval_counts.boundary < routingBar.boundary_minimum) gaps.push({ dimension: 'boundary_eval', detail: `requires >=${routingBar.boundary_minimum} boundary case(s), has ${cov.routing_eval_counts.boundary}` });
    }

    const adversarialCount = adversarialEvalCount(contract.name);
    for (const [type, req] of Object.entries(profile.evals ?? {})) {
      if (type === 'routing' || !req.required) continue;
      const actual = type === 'contract' ? contractCount : type === 'behavioral' ? behavioralCount : type === 'adversarial' ? adversarialCount : 0; // functional/integration: mechanism not implemented yet
      if (actual < req.minimum) gaps.push({ dimension: `${type}_eval`, detail: `requires >=${req.minimum}, has ${actual}${type === 'functional' || type === 'integration' ? ' (mechanism not implemented yet)' : ''}` });
    }
    if (profile.human_review?.requirement === 'required' && reviewStatus !== 'approved') gaps.push({ dimension: 'human_review', detail: `status is "${reviewStatus}", requires "approved"` });

    // Source freshness has two independent layers (Task 5): did an automated check reach it and find
    // it unchanged (source_freshness_alert), and separately, has a qualified human ever actually
    // verified the content at all (source_verification) — an automated CURRENT check is not that.
    if (profile.sources.requirement === 'required') {
      const referenced = (referencedSourcesBySkill.get(contract.name) ?? []).map((id) => sourceById.get(id)).filter(Boolean);
      if (referenced.length > 0) {
        const alerting = referenced.filter((s) => ['CHANGED_UNREVIEWED', 'STALE', 'UNREACHABLE'].includes(s.freshness_lifecycle?.status));
        if (alerting.length) gaps.push({ dimension: 'source_freshness_alert', detail: `${alerting.map((s) => `${s.id}:${s.freshness_lifecycle.status}`).join(', ')}` });
        const everVerified = referenced.some((s) => s.freshness_lifecycle?.last_verified);
        if (!everVerified) gaps.push({ dimension: 'source_verification', detail: `none of [${referenced.map((s) => s.id).join(', ')}] has ever been human-verified (last_verified is null for all)` });
      }
    }

    const evalGapDims = new Set(gaps.map((g) => g.dimension));
    const foundational = evalGapDims.has('sources') || evalGapDims.has('references') || evalGapDims.has('routing_eval') || evalGapDims.has('boundary_eval') || evalGapDims.has('contract_eval') || evalGapDims.has('source_freshness_alert');
    const onlyHumanReview = gaps.length > 0 && gaps.every((g) => g.dimension === 'human_review' || g.dimension === 'source_verification');
    const readiness_tier = gaps.length === 0 ? 'RELEASE_READY' : onlyHumanReview ? 'REVIEW_PENDING' : foundational ? 'STRUCTURED' : 'EVALUATED';

    return {
      skill: contract.name,
      quality_profile: profileName,
      coverage_pct: cov.coverage_pct,
      readiness_tier,
      release_status: gaps.length === 0 ? 'READY' : 'BLOCKED',
      gaps,
    };
  }).sort((a, b) => a.skill.localeCompare(b.skill));

  return { generated_at: new Date().toISOString(), skills: rows };
}

function printReadiness(report) {
  console.log('RELEASE READINESS (policy-derived)\n');
  const byProfile = {};
  for (const row of report.skills) (byProfile[row.quality_profile] ??= []).push(row);
  for (const profile of ['critical', 'high', 'standard', 'utility', 'internal']) {
    const rows = byProfile[profile] ?? [];
    if (!rows.length) continue;
    console.log(`${profile.toUpperCase()} (${rows.length})`);
    for (const r of rows) {
      const gapSummary = r.gaps.map((g) => g.dimension).join(', ') || 'none';
      console.log(`  ${r.skill.padEnd(28)} ${r.release_status.padEnd(8)} ${r.readiness_tier.padEnd(16)} coverage=${String(r.coverage_pct).padStart(3)}%  gaps=${gapSummary}`);
    }
    console.log('');
  }
  const blocked = report.skills.filter((r) => r.release_status === 'BLOCKED');
  console.log(`${report.skills.length - blocked.length}/${report.skills.length} READY, ${blocked.length}/${report.skills.length} BLOCKED`);
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const report = buildReadiness();
  printReadiness(report);
  if (process.argv.includes('--release')) {
    const blocked = report.skills.filter((r) => r.release_status === 'BLOCKED');
    fail(blocked.map((r) => `RELEASE_BLOCKED: ${r.skill} (${r.gaps.map((g) => g.dimension).join(', ')})`));
  }
}
