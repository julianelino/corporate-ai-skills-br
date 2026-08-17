# Corporate AI Skills BR V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Execute inline, phase by phase, with the validation command in each task. Do not replace human approval gates with automation.

**Goal:** Build a proprietary, governed, context-efficient ecosystem of Brazilian corporate AI specialists for People and Finance.

**Architecture:** Keep specialist instructions small and route through a machine-readable capability registry. Put detailed, temporal knowledge in lazy references; use deterministic Python engines for calculations and validation; require sources, evidence state, risk metadata, and human approval for critical outcomes.

**Tech Stack:** Markdown and YAML contracts, JSON Schema, Python standard library, pytest, GitHub Actions.

## Global Constraints

- Default business locale is `pt-BR`; jurisdiction is `BR`; user output is Portuguese; technical artifacts are English.
- Copyright is `© 2026 Juliane Lino`; all original material is proprietary and all rights are reserved.
- Never store personal production data, secrets, paid content, invented law, CCT/ACT, accounting accounts, approvals, or payments.
- Prefer `ANALYZE` or `SIMULATE`; `EXECUTE` is limited to deterministic engines and never grants business approval.
- Critical legal, tax, payroll, accounting, payments, and regulatory claims require current authoritative sources.
- Keep each `SKILL.md` concise; use references for detailed material and load only what the request needs.

## Repository Structure

- Root documents: project purpose, governance, security, contribution, change history, ownership, and proprietary license.
- `sources/`, `policies/`, `schemas/`, `reasoning/`, `context/`, and `decisions/`: shared controlled foundations.
- `skills/`: concise specialists grouped by core, people, finance, governance, documents, and utilities.
- `workflows/`: composed, approval-gated processes rather than new generalist skills.
- `engines/`: deterministic calculations, matching, data intake, routing support, and compression.
- `evals/`, `fixtures/`, `tests/`, `scripts/`, `.github/workflows/`: quality gates and automation.

---

### Task 1: Discovery and baseline

**Files:**
- Create: `docs/superpowers/plans/2026-08-17-corporate-ai-skills-br-v1.md`
- Create: `decisions/phase-checkpoints/phase-01-discovery.md`

- [ ] Inventory repository files, master contexts, archives, conventions, CI, and existing skills.
- [ ] Record absent inputs without inventing their content.
- [ ] Verify whether Git metadata is usable before committing.

**Validation:** `find . -maxdepth 3 -type f | sort`

### Task 2: Documentation and ownership

**Files:**
- Create: `README.md`, `ARCHITECTURE.md`, `GOVERNANCE.md`, `SECURITY.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `LICENSE`, `AUTHORS.md`, `THIRD_PARTY_NOTICES.md`

- [ ] State scope, architecture, compatibility status, install/use boundaries, attribution, and proprietary terms.
- [ ] Define the five-level loading architecture and named operating principles.
- [ ] Define maturity, release, ownership, review, and decision-record practices.

**Validation:** `rg -n "Juliane Lino|Deep expertise|All rights reserved" README.md ARCHITECTURE.md LICENSE AUTHORS.md`

### Task 3: Source, policy, and schema foundations

**Files:**
- Create: `sources/SOURCE_REGISTRY.yaml`, source policy and freshness documents, core policies, JSON schemas, reasoning packs, context README files.

- [ ] Register authoritative Brazilian sources and secondary/benchmark restrictions.
- [ ] Define provenance, evidence state, risk, approval, privacy, retention, secrets, and untrusted-content rules.
- [ ] Define reusable data contracts and master-data ownership without business data.

**Validation:** `python3 scripts/validate-sources.py sources/SOURCE_REGISTRY.yaml && python3 scripts/validate-schemas.py schemas`

### Task 4: Engines and capability-driven orchestration

**Files:**
- Create: `engines/**`, `skills/core/**`, `knowledge/registry/capability-registry.yaml`, tests and core evals.

- [ ] Implement deterministic time, percentage, aging, margin, depreciation, NPV/IRR, matching, and routing primitives.
- [ ] Create core routing, risk, review, executive, token-economy, and skill-generator specialists.
- [ ] Enforce context guard and approval boundary in routing output.

**Validation:** `pytest -q tests/engines tests/core && python3 scripts/validate-skill.py skills`

### Task 5: People and labor specialists

**Files:**
- Create: `skills/people/**`, `workflows/people/**`, people/labor evals and fixtures.

- [ ] Build strategic HR, labor, payroll, time, relations, talent, compensation, performance, learning, SST, occupational health, privacy, analytics, and service specialists.
- [ ] Attach source maps and focused lazy references to critical specialists.
- [ ] Encode legal freshness, evidence separation, protected-attribute safeguards, and human review gates.

**Validation:** `python3 scripts/validate-skill.py skills/people && pytest -q tests/people`

### Task 6: Finance, accounting, tax, audit, and fraud specialists

**Files:**
- Create: `skills/finance/**`, finance workflows, finance/tax/audit evals and fixtures.

- [ ] Build finance partnering, operations, AP/AR, billing, collections, treasury, reconciliation, accounting, close, FP&A, controllership, tax, SPED, audit, and fraud-risk specialists.
- [ ] Keep payments preparation separate from approval and execution.
- [ ] Require current sources for tax and SPED guidance.

**Validation:** `python3 scripts/validate-skill.py skills/finance && pytest -q tests/finance`

### Task 7: Documents, spreadsheets, workflows, adapters, and platforms

**Files:**
- Create: `skills/documents/**`, `skills/utilities/**`, `workflows/**`, `templates/**`, `adapters/**`, `platforms/**`.

- [ ] Build document authoring and audit skill plus spreadsheet and automation skills.
- [ ] Add primary people, finance, and cross-domain workflows with approval gates.
- [ ] Keep SAP/platform instructions as adapters over shared core contracts.

**Validation:** `python3 scripts/validate-workflows.py workflows && pytest -q tests/documents tests/utilities`

### Task 8: Quality automation and final audit

**Files:**
- Create: `scripts/**`, `.github/workflows/**`, eval suite, phase checkpoints.

- [ ] Implement skill lint, source validation, overlap checks, token-budget guard, link checks, and source-freshness notification workflow.
- [ ] Add gold, adversarial, routing, privacy, and token regression cases using only synthetic fixtures.
- [ ] Run every local gate, log results, and document unresolved risks rather than concealing them.

**Validation:** `python3 scripts/validate-skill.py skills && python3 scripts/check-skill-overlap.py skills && pytest -q`

## Coverage Review

This plan covers the prescribed 15 phases by grouping tightly coupled work into independently testable tasks: discovery; documentation/governance; source registry; foundations; token economy; core orchestration; People; Labor/Payroll/Relations; Talent/SST/Analytics; Finance Ops; Accounting/FP&A; Tax/Audit; Documents/Spreadsheets/Workflows; Adapters/Evals/CI; and final audit.

## Execution Handoff

Execution is proceeding inline because the project owner explicitly requested continuous phase-by-phase construction. Every completed phase receives its checkpoint in `decisions/phase-checkpoints/`.
