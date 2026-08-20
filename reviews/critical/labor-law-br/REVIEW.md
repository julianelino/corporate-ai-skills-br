# Review Package — labor-law-br

## Skill
labor-law-br

## Purpose
Brazilian employment-law analysis

## Risk Ceiling
R6

## Decision Authority
KNOW, ANALYZE, RECOMMEND, DRAFT

## Review Scope Required
DOMAIN, LEGAL, GOVERNANCE

## Key Source Hierarchy
T1-and-corporate per skills/**/labor-law-br/sources.md — see its "Primary Authorities" and "Conflict Resolution" sections.

## Critical References
See `skills/**/labor-law-br/references/` and the "References Loaded On Demand" section of its `sources.md`.

## Gold-Case Categories
5 cases defined, covering: BOUNDARY, FAIL_SAFE, HIGH_RISK, INSUFFICIENT_CONTEXT, NORMAL. Full cases at `evals/behavioral/critical/labor-law-br/`.

## Known Gaps
- `human_review`: status is "pending", requires "approved"
- `source_freshness_alert`: mte:CHANGED_UNREVIEWED, tst:CHANGED_UNREVIEWED, stf:UNREACHABLE
- `source_verification`: none of [planalto, econet, mte, tst, stf] has ever been human-verified (last_verified is null for all)

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
Approve only when every reviewer question above has been answered, the review scope (DOMAIN, LEGAL, GOVERNANCE) has actually been exercised by someone qualified in each area, and `skills/**/labor-law-br/skill.yaml`'s `human_review` block is updated with `status: approved`, `reviewed_at`, `reviewed_commit`, and non-empty `reviewers`. An AI assistant may prepare this package and run a precheck; it may never set `status: approved` itself — `npm run validate:critical-sources` hard-fails an approval without a real reviewer and timestamp.
