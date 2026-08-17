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

## Decision records and audit trail

Store a decision record in `decisions/` for a material case, using the schema described in `schemas/decision-record.schema.json`. Retain requester, analyst, approver, executor, timestamps, before/after state, evidence, rationale, human decision, and observed outcome where relevant. Historical decisions are evidence, not automatic policy.

## Observability

Measure routing accuracy, specialists per request, tokens and references per request, source freshness, unsupported claims, calculation errors, human override rate, escalation accuracy, workflow success, document rework, and forecast error. Metrics improve controls; they do not replace professional judgment.

## Release gate

V1 requires documented architecture, correct ownership/license, source registry, essential policies, token economy, tested router, critical specialist source/risk/authority contracts, main workflows, synthetic gold and adversarial evals, token regression checks, functional CI definitions, and a final audit report.
