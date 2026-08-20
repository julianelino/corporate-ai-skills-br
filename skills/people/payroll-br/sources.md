# Source Map

## Source Policy

T1-required · freshness: critical. This skill returns `unknown` and does not proceed on a consequential conclusion when a required current source is missing (see `docs/adr` and `GOVERNANCE.md` "Change controls").

## Primary Authorities

- `planalto`, `mte`, `esocial`, `fgts-digital`, and `receita`.

Relevant T1 entries in `sources/SOURCE_REGISTRY.yaml`:

- `planalto` — Presidência da República — Legislação
- `mte` — Ministério do Trabalho e Emprego
- `esocial` — eSocial
- `fgts-digital` — FGTS Digital
- `receita` — Receita Federal do Brasil

## Corporate Sources

- Authorized payroll policy, valid CCT/ACT, approved employee inputs, and documented system parameters.

## Secondary Professional Sources

- `econet` — Econet (use for: practical-reference, topic-discovery, permitted-interpretation; never use as: sole-legal-authority, copied-paid-content)

## Freshness-Critical Topics

- payroll
- vacation
- termination-support
- incidences
- esocial

## Conflict Resolution

When sources conflict, resolve in this order and never silently pick the more convenient reading:

1. Compare authority (T1 official/court/standards outranks T3 secondary, which outranks T4 benchmark).
2. Compare jurisdiction (federal vs. state vs. municipal vs. corporate instrument).
3. Compare effective/publication date (the current one governs; a repealed or superseded source does not).
4. Compare scope (a source may be authoritative for its own subject and silent, not authoritative, on another).
5. Check whether a case-specific corporate instrument (CCT/ACT, contract, policy) narrows or extends the general rule for this case.
6. If the conflict is material to the conclusion and cannot be resolved from available sources, report the conflict — owner, authority, freshness, evidence — and escalate; do not choose silently (per ARCHITECTURE.md "Context and data ownership").

## Source Restrictions

Separate a legal rule from a corporate parameter; a calculation does not validate parameterization.

## When External Verification Is Required

Always, before a consequential conclusion: this skill is `freshness: critical`. A cached or remembered rule is not sufficient; confirm against a current T1 source before recommending, drafting, or preparing.

## References Loaded On Demand

- `references/incidences.md`
- `references/termination-support.md`
