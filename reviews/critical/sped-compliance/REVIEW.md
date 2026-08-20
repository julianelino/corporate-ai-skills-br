# Review Package — sped-compliance

## Skill
sped-compliance

## Purpose
Analyze ECD, ECF, EFD, Reinf, DCTFWeb, layouts, validation, filing calendar, and technical manuals

## Risk Ceiling
R6

## Decision Authority
KNOW, ANALYZE, RECOMMEND, DRAFT, PREPARE

## Review Scope Required
DOMAIN, TAX, ACCOUNTING, GOVERNANCE

## Key Source Hierarchy
T1-and-corporate per skills/**/sped-compliance/sources.md — see its "Primary Authorities" and "Conflict Resolution" sections.

## Critical References
See `skills/**/sped-compliance/references/` and the "References Loaded On Demand" section of its `sources.md`.

## Gold-Case Categories
5 cases defined, covering: BOUNDARY, FAIL_SAFE, HIGH_RISK, INSUFFICIENT_CONTEXT, NORMAL. Full cases at `evals/behavioral/critical/sped-compliance/`.

## Known Gaps
- `human_review`: status is "pending", requires "approved"
- `source_freshness_alert`: sped:CHANGED_UNREVIEWED, cfc:CHANGED_UNREVIEWED, cvm:CHANGED_UNREVIEWED, sefaz:CHANGED_UNREVIEWED, municipal-tax:CHANGED_UNREVIEWED
- `source_verification`: none of [receita, sped, cfc, cpc, cvm, fipecafi, planalto, sefaz, municipal-tax, econet] has ever been human-verified (last_verified is null for all)

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
Approve only when every reviewer question above has been answered, the review scope (DOMAIN, TAX, ACCOUNTING, GOVERNANCE) has actually been exercised by someone qualified in each area, and `skills/**/sped-compliance/skill.yaml`'s `human_review` block is updated with `status: approved`, `reviewed_at`, `reviewed_commit`, and non-empty `reviewers`. An AI assistant may prepare this package and run a precheck; it may never set `status: approved` itself — `npm run validate:critical-sources` hard-fails an approval without a real reviewer and timestamp.
