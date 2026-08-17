# Architecture

> **Deep expertise. Minimal activation. Dynamic verification. Deterministic calculation. Evidence-based decisions. Human accountability.**

> **Do not make experts smaller to save tokens. Make context smarter.**

> **Route minimally. Load selectively. Verify dynamically. Calculate deterministically. Decide with evidence. Escalate by risk. Keep humans accountable.**

## Design boundaries

The repository separates responsibilities deliberately:

| Component | Responsibility |
| --- | --- |
| Skill | Specialist reasoning, input/output contract, delegation, and safety boundary. |
| Workflow | Ordered multi-component process with gates and audit expectations. |
| Reasoning pack | Reusable method, never domain-specific facts. |
| Knowledge/reference | Detailed, selectively loaded material with source and temporality. |
| Engine | Platform-neutral deterministic operation specification; a runtime adapter calculates or validates, but does not decide. |
| Schema | Stable data shape and validation rules. |
| Policy | Repository-wide non-negotiable control. |
| Adapter | Platform or enterprise-system mapping; never owns business policy. |

## Loading architecture

```text
LEVEL 0  Intent detection
LEVEL 1  Primary specialist
LEVEL 2  Necessary references
LEVEL 3  Additional specialist
LEVEL 4  Fresh external source verification
LEVEL 5  Risk and reviewer
```

Routing ends as soon as a sufficient, safe answer is possible. It never imports a whole domain pack merely because the subject is broad.

## Skill contract

Each skill contains a concise `SKILL.md` with only the standard trigger frontmatter (`name`, `description`) and a companion `skill.yaml` contract. This preserves tool compatibility while satisfying the governed metadata model:

```yaml
name: example
description: Human-readable intent summary
version: 0.1.0
domain: [people]
status: BETA
jurisdiction: BR
default_locale: pt-BR
routes_from: [corporate-router]
routes_to: [corporate-risk]
handles: [example-case]
requires: []
optional_context: []
risk_ceiling: R2
decision_authority: [KNOW, ANALYZE, RECOMMEND]
freshness: conditional
source_policy: standard
token_budget:
  core_tokens: 2500
  initial_references: 0
  max_references: 4
  examples_on_demand: true
  large_sources_on_demand: true
compatible_platforms: [codex]
```

## Risk, evidence, and authority

Risk levels run from `R0` informational through `R6` critical. Tags include `LEGAL`, `PEOPLE`, `FINANCIAL`, `ACCOUNTING`, `TAX`, `PRIVACY`, `COMPLIANCE`, `FRAUD`, `REPUTATIONAL`, and `SECURITY`.

Evidence is always marked `CONFIRMED`, `CALCULATED`, `INFERRED`, `ALLEGED`, `ESTIMATED`, or `UNKNOWN`. Confidence is qualitative (`HIGH`, `MEDIUM`, `LOW`) and must name its limiting factors. A specialist may not convert an allegation or anomaly into a confirmed fact.

Decision authorities are `KNOW`, `ANALYZE`, `RECOMMEND`, `DRAFT`, `PREPARE`, `EXECUTE`, and `APPROVE`. `APPROVE` is reserved for accountable humans and does not belong to a skill contract. Execution is limited to deterministic engines after an approved workflow gate.

## Context and data ownership

Corporate context is partitioned by domain and loaded only for the use case. Master-data owners resolve conflicts: HR owns employee master data; Payroll/HR payroll data; Finance/Controllership cost centers; Accounting chart of accounts and accounting policy; FP&A budget; Treasury bank data; HR/Labor CCT; and Tax tax policy. When sources conflict, report the conflict with owner, authority, freshness, and evidence; never choose silently.

## Versioning and maturity

Repository releases use semantic versioning. Each skill has its own version and one of `EXPERIMENTAL`, `BETA`, `STABLE`, `CRITICAL`, `DEPRECATED`, or `RETIRED`. A critical skill change requires sources, rationale, impact assessment, tests, and human review.

## Runtime independence

The governed product surface is Markdown, YAML, JSON Schema, and templates. It has no mandatory local programming runtime. `engines/` describes deterministic contracts independently of language; the Python files are tested reference implementations for maintainers only. An adapter must preserve engine inputs, outputs, precision, errors, auditability, and approval boundaries when using another runtime.
