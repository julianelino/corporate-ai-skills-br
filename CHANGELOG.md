# Changelog

All notable changes to this proprietary project are documented here.

## v0.9.0 — Controlled Production / Release Candidate

Status: `CONTROLLED PRODUCTION / RELEASE CANDIDATE` — not `v1.0.0 Production Validated`. See `docs/RELEASE_CANDIDATE.md` for the full status table and `docs/PRODUCTION_SAFETY_OVERRIDE.md` for the operational rule this status requires while `HUMAN_REVIEW`, `PLATFORM_BEHAVIORAL_EXECUTION`, and `PLATFORM_ADVERSARIAL_EXECUTION` remain open.

### Added

- Reference-depth verifier (`scripts/report-reference-depth.mjs`, `npm run reference:depth`) measuring required-topic coverage per critical skill, not file count — closed `REFERENCE_DEPTH` at 82/82 (100%) via `scripts/verify-carry-forward.mjs`, confirmed by an intentional-failure test before closure.
- Evidence-backed `references/` content for all 13 critical skills across labor, payroll, employee-relations, accounting, tax, SPED, payments, financial-fraud-risk, corporate-compliance, corporate-investigation, corporate-risk, corporate-reviewer, and HR privacy/LGPD.
- `scripts/production-minimum-gate.mjs` (`npm run gate:production-minimum`) — a separate, additive gate for a controlled-pilot GO decision; never modifies `scripts/final-reliability-gate.mjs`.
- `docs/PRODUCTION_SAFETY_OVERRIDE.md` — the temporary operator-facing rule for critical/high skills during the Release Candidate period.
- `docs/RELEASE_CANDIDATE.md` — the v0.9.0 status record.

### Not yet done (tracked in `knowledge/registry/carry-forward.yaml`)

- `HUMAN_REVIEW`: 0/13 critical skills have a real qualified-human approval; packages are prepared and regenerated but no `human_review.status` has been set to `approved`.
- `PLATFORM_BEHAVIORAL_EXECUTION` / `PLATFORM_ADVERSARIAL_EXECUTION`: 65 behavioral and 26 adversarial cases are defined and valid; none has been executed against a real agent/platform.

## Unreleased

### Added

- Phase 1 discovery record and V1 implementation plan.
- Phase 2 architecture, governance, security, ownership, and contribution foundations.
- Source registry, freshness policy, schemas, reasoning packs, deterministic engines, and core orchestration.
- People and Finance specialist packs, governed workflows, synthetic fixtures, eval definitions, adapters, validation scripts, and CI workflows.
