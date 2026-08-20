import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { root } from './lib.mjs';
import { contracts } from './build-capability-registry.mjs';
import { buildReadiness } from './report-release-readiness.mjs';
import { validateGoldCases } from './validate-behavioral-gold-cases.mjs';

const REVIEWER_QUESTIONS = [
  "Is the skill's scope correct?",
  'Is there any incorrect business rule?',
  'Is the source hierarchy appropriate?',
  'Are there important official sources missing?',
  'Are high-risk cases represented?',
  'Does the skill exceed its authority?',
  'Are there situations where it should escalate but does not?',
  'Are there overly absolute conclusions?',
  'Do the gold cases represent realistic situations?',
  'Is any content outdated?',
];

function findSkillPath(name) {
  const contract = contracts().find((c) => c.name === name);
  return contract;
}

export function buildPackages() {
  const readiness = buildReadiness();
  const readinessBySkill = new Map(readiness.skills.map((r) => [r.skill, r]));
  const { bySkill: goldBySkill } = validateGoldCases();
  const critical = contracts().filter((c) => c.quality_profile === 'critical').sort((a, b) => a.name.localeCompare(b.name));

  const packages = critical.map((contract) => {
    const gaps = readinessBySkill.get(contract.name)?.gaps ?? [];
    const gold = goldBySkill[contract.name] ?? { defined: 0, riskClasses: [] };
    return {
      skill: contract.name,
      purpose: contract.description,
      risk_ceiling: contract.risk_ceiling,
      decision_authority: contract.decision_authority,
      freshness: contract.freshness,
      review_scope: contract.human_review?.scope ?? [],
      key_source_hierarchy: `T1-and-corporate per skills/**/${contract.name}/sources.md — see its "Primary Authorities" and "Conflict Resolution" sections.`,
      gold_case_summary: gold,
      known_gaps: gaps,
      human_review: contract.human_review,
    };
  });

  return { generated_at: new Date().toISOString(), packages };
}

function reviewMd(pkg) {
  const gapLines = pkg.known_gaps.length ? pkg.known_gaps.map((g) => `- \`${g.dimension}\`: ${g.detail}`).join('\n') : '- None currently measured.';
  const riskClassLine = pkg.gold_case_summary.riskClasses.length ? pkg.gold_case_summary.riskClasses.sort().join(', ') : 'none';
  return `# Review Package — ${pkg.skill}

## Skill
${pkg.skill}

## Purpose
${pkg.purpose}

## Risk Ceiling
${pkg.risk_ceiling}

## Decision Authority
${pkg.decision_authority.join(', ')}

## Review Scope Required
${pkg.review_scope.join(', ')}

## Key Source Hierarchy
${pkg.key_source_hierarchy}

## Critical References
See \`skills/**/${pkg.skill}/references/\` and the "References Loaded On Demand" section of its \`sources.md\`.

## Gold-Case Categories
${pkg.gold_case_summary.defined} cases defined, covering: ${riskClassLine}. Full cases at \`evals/behavioral/critical/${pkg.skill}/\`.

## Known Gaps
${gapLines}

## Known Uncertainties
- This package is machine-assembled from \`skill.yaml\`, \`sources.md\`, gold cases, and the readiness report. It has not been read end-to-end by a qualified human. Treat every section as a starting point for review, not a finished claim.

## Reviewer Questions
${REVIEWER_QUESTIONS.map((q) => `- [ ] ${q}`).join('\n')}

## Approval Criteria
Approve only when every reviewer question above has been answered, the review scope (${pkg.review_scope.join(', ')}) has actually been exercised by someone qualified in each area, and \`skills/**/${pkg.skill}/skill.yaml\`'s \`human_review\` block is updated with \`status: approved\`, \`reviewed_at\`, \`reviewed_commit\`, and non-empty \`reviewers\`. An AI assistant may prepare this package and run a precheck; it may never set \`status: approved\` itself — \`npm run validate:critical-sources\` hard-fails an approval without a real reviewer and timestamp.
`;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const { packages } = buildPackages();
  for (const pkg of packages) {
    const dir = join(root, `reviews/critical/${pkg.skill}`);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'REVIEW.md'), reviewMd(pkg));
    writeFileSync(join(dir, 'review.json'), JSON.stringify({ ...pkg, note: 'Generated snapshot for reviewer convenience. Canonical review state lives in skill.yaml human_review — do not edit status here.' }, null, 2) + '\n');
  }
  console.log(`Built ${packages.length} review packages under reviews/critical/.`);
}
