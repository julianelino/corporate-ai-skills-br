# Governance

## Purpose

Govern the addition, operation, review, and retirement of corporate skills without hiding uncertainty or transferring accountable decisions to automation.

## Approval model

| Mode | Use |
| --- | --- |
| `AUTO` | Deterministic conversions, percentages, aging, and preliminary reports. |
| `REVIEW` | Suggested classifications, probable matches, and billing mirrors. |
| `APPROVAL_REQUIRED` | Warnings, salary changes, hires, terminations, and material accounting decisions. |
| `DUAL_APPROVAL` | Supplier bank changes, material payments, material write-offs, and high-risk financial actions. |

## Change controls

Critical skills are `labor-law-br`, `payroll-br`, `tax-br`, `accounting-br`, and `payments` once they reach sufficient maturity. Their changes require an authoritative source map, rationale, affected skills/workflows, evals, and a designated human reviewer. A detected source change opens a review item; it never silently changes critical guidance.

## Runtime governance

The Core is zero-runtime: skills, references, reasoning, workflows, policies, schemas, templates, sources, and controlled context must remain usable without Node.js or Python. Node.js 20+ is an optional automation layer for deterministic engines, validation, token audits, evals, and CI. Python may exist only behind an explicitly enabled advanced-analytics adapter. Any proposal that makes a runtime mandatory requires an ADR and human architectural review. See `docs/adr/0001-zero-runtime-core.md`.

## Architecture freeze

As of 2026-08-18, `npm run reliability:final` reports `Architecture Complete: PASS` and `Repository Reliability Complete: PASS` (see `docs/superpowers/plans/2026-08-17-reliability-hardening.md`, Tasks 0 through 9). From this point, changing the *mechanism* requires a demonstrated defect or an approved architectural change request — not a preference, and not as a side effect of content work. In scope for the freeze: the router (`engines/reference-routing/`) and its scoring policy, `knowledge/registry/quality-profiles.yaml`, the risk and decision-authority model (`ARCHITECTURE.md` "Risk, evidence, and authority"), the capability registry generation mechanism, eval semantics (static/behavioral/adversarial schemas and their validators), freshness-lifecycle semantics, and the security-execution gates.

Freely allowed without an architectural review, because they don't touch the mechanism: adding or deepening `references/` content, `sources.md` content, behavioral gold cases, adversarial cases, fixtures, review records (`reviews/critical/`), platform execution results, and documentation. A finding from doing that work (a missing trigger, a routing collision, a genuinely wrong risk ceiling) is still a legitimate reason to touch the mechanism — the freeze requires the defect be demonstrated (a failing eval, a real collision, a smoke test), the same evidence bar every task in the hardening effort already used, not a suspended one.

## Decision records and audit trail

Store a decision record in `decisions/` for a material case, using the schema described in `schemas/decision-record.schema.json`. Retain requester, analyst, approver, executor, timestamps, before/after state, evidence, rationale, human decision, and observed outcome where relevant. Historical decisions are evidence, not automatic policy.

## Observability

Measure routing accuracy, specialists per request, tokens and references per request, source freshness, unsupported claims, calculation errors, human override rate, escalation accuracy, workflow success, document rework, and forecast error. Metrics improve controls; they do not replace professional judgment.

## Release gate

`npm run reliability:final` (`scripts/final-reliability-gate.mjs`) is the release gate, and answers four independent, hard-gated questions — never a percentage, never one score standing in for all four:

1. **Architecture Complete** — does the system exist and cohere (zero-runtime Core, generated/drift-checked registry, Router v2 with its v1 baseline, quality profiles, gold-case/adversarial/freshness/security frameworks, verifiable carry-forward).
2. **Repository Reliability Complete** — do the gates actually catch regressions (`npm run check` green, router v1-vs-v2 shadow comparison with zero regressions, every deterministic security control passing).
3. **V1 Release Ready** — the first two, plus zero open `release_blocking: true` items in `knowledge/registry/carry-forward.yaml`.
4. **Production / Domain Validated** — all critical skills' `human_review` actually `approved` (never inferred, never AI-set — see "Change controls"), and the behavioral/adversarial cases actually executed against a real agent, not merely defined.

V1 is release-qualified only when all four report `PASS`. As of 2026-08-19, levels 1 and 2 pass; `REFERENCE_DEPTH` closed (82/82 required topics, verified via `scripts/verify-carry-forward.mjs` and an intentional-failure test — see `knowledge/registry/carry-forward.yaml`). Levels 3 and 4 remain `BLOCKED` on `HUMAN_REVIEW`, `PLATFORM_BEHAVIORAL_EXECUTION`, and `PLATFORM_ADVERSARIAL_EXECUTION` — closing those is human review and platform integration work, not an architecture task. `v0.9.0` is published as a Controlled Production / Release Candidate under `docs/PRODUCTION_SAFETY_OVERRIDE.md` while those three remain open — see `docs/RELEASE_CANDIDATE.md`.
