# Review Package — accounting-br

## Skill
accounting-br

## Purpose
Analyze Brazilian accounting recognition, measurement, accrual, provisions, assets, liabilities, equity, revenue, expenses, cost, depreciation, impairment, and statements under applicable CPC/NBC/IFRS

## Risk Ceiling
R6

## Decision Authority
KNOW, ANALYZE, RECOMMEND, DRAFT, PREPARE

## Review Scope Required
DOMAIN, ACCOUNTING, GOVERNANCE

## Key Source Hierarchy
T1-and-corporate per skills/**/accounting-br/sources.md — see its "Primary Authorities" and "Conflict Resolution" sections.

## Critical References
See `skills/**/accounting-br/references/` and the "References Loaded On Demand" section of its `sources.md`.

## Gold-Case Categories
5 cases defined, covering: BOUNDARY, FAIL_SAFE, HIGH_RISK, INSUFFICIENT_CONTEXT, NORMAL. Full cases at `evals/behavioral/critical/accounting-br/`.

## Known Gaps
- `human_review`: status is "pending", requires "approved"
- `source_freshness_alert`: sped:CHANGED_UNREVIEWED, cfc:CHANGED_UNREVIEWED, cvm:CHANGED_UNREVIEWED
- `source_verification`: none of [receita, sped, cfc, cpc, cvm, fipecafi] has ever been human-verified (last_verified is null for all)

## Known Uncertainties
- This package is machine-assembled from `skill.yaml`, `sources.md`, gold cases, and the readiness report. It has not been read end-to-end by a qualified human. Treat every section as a starting point for review, not a finished claim.

## Reviewer Questions
- [ ] Is the skill's scope correct?
- [ ] Is there any incorrect business rule?
- [ ] Is the source hierarchy appropriate?
- [ ] Are there important official sources missing?
- [ ] Are high-risk cases represented?
- [ ] Does the skill exceed its authority?
- [ ] Are there situations where it should escalate but does not?
- [ ] Are there overly absolute conclusions?
- [ ] Do the gold cases represent realistic situations?
- [ ] Is any content outdated?

## Approval Criteria
Approve only when every reviewer question above has been answered, the review scope (DOMAIN, ACCOUNTING, GOVERNANCE) has actually been exercised by someone qualified in each area, and `skills/**/accounting-br/skill.yaml`'s `human_review` block is updated with `status: approved`, `reviewed_at`, `reviewed_commit`, and non-empty `reviewers`. An AI assistant may prepare this package and run a precheck; it may never set `status: approved` itself — `npm run validate:critical-sources` hard-fails an approval without a real reviewer and timestamp.
