# Source Map

## Source Policy

T1-and-corporate · freshness: critical. This skill returns `unknown` and does not proceed on a consequential conclusion when a required current source is missing (see `docs/adr` and `GOVERNANCE.md` "Change controls").

## Primary Authorities

Relevant T1 entries in `sources/SOURCE_REGISTRY.yaml`:

- `receita` — Receita Federal do Brasil
- `sped` — Sistema Público de Escrituração Digital
- `cfc` — Conselho Federal de Contabilidade
- `cpc` — Comitê de Pronunciamentos Contábeis
- `cvm` — Comissão de Valores Mobiliários

## Corporate Sources

Authorized corporate policy and case records, where applicable to this skill.

## Secondary Professional Sources

- `fipecafi` — FIPECAFI

## Freshness-Critical Topics

- recognition
- measurement
- accrual
- provisions
- assets
- liabilities
- equity
- revenue
- expenses
- cost
- depreciation
- impairment
- financial statements

## Conflict Resolution

When sources conflict, resolve in this order and never silently pick the more convenient reading:

1. Compare authority (T1 official/court/standards outranks T3 secondary, which outranks T4 benchmark).
2. Compare jurisdiction (federal vs. state vs. municipal vs. corporate instrument).
3. Compare effective/publication date (the current one governs; a repealed or superseded source does not).
4. Compare scope (a source may be authoritative for its own subject and silent, not authoritative, on another).
5. Check whether a case-specific corporate instrument (CCT/ACT, contract, policy) narrows or extends the general rule for this case.
6. If the conflict is material to the conclusion and cannot be resolved from available sources, report the conflict — owner, authority, freshness, evidence — and escalate; do not choose silently (per ARCHITECTURE.md "Context and data ownership").

## Source Restrictions

Do not treat a secondary source, unverified document, or stale rule as sufficient for a consequential conclusion.

## When External Verification Is Required

Always, before a consequential conclusion: this skill is `freshness: critical`. A cached or remembered rule is not sufficient; confirm against a current T1 source before recommending, drafting, or preparing.

## References Loaded On Demand

_No reference files yet. Tracked as a knowledge-coverage gap in `reports/skill-coverage.json` — not fabricated here._
