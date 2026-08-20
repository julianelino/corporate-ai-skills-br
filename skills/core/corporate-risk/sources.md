# Source Map

## Source Policy

risk-based · freshness: conditional. This skill returns `unknown` and does not proceed on a consequential conclusion when a required current source is missing (see `docs/adr` and `GOVERNANCE.md` "Change controls").

## Primary Authorities

_No T1 registry entries map to this skill's domain; primary authority is the corporate instrument below._

## Corporate Sources

- Authorized policies, authority matrix, and segregation-of-duty configuration.

## Secondary Professional Sources

_None declared for this domain — professional secondary material is not a source of authority here._

## Freshness-Critical Topics

- risk-assessment
- approval-gates

## Conflict Resolution

When sources conflict, resolve in this order and never silently pick the more convenient reading:

1. Compare authority (T1 official/court/standards outranks T3 secondary, which outranks T4 benchmark).
2. Compare jurisdiction (federal vs. state vs. municipal vs. corporate instrument).
3. Compare effective/publication date (the current one governs; a repealed or superseded source does not).
4. Compare scope (a source may be authoritative for its own subject and silent, not authoritative, on another).
5. Check whether a case-specific corporate instrument (CCT/ACT, contract, policy) narrows or extends the general rule for this case.
6. If the conflict is material to the conclusion and cannot be resolved from available sources, report the conflict — owner, authority, freshness, evidence — and escalate; do not choose silently (per ARCHITECTURE.md "Context and data ownership").

## Source Restrictions

Risk evaluation does not replace legal, tax, payroll, or accounting source verification by the responsible specialist.

## When External Verification Is Required

When the request involves a regulated, temporal, or consequential determination; routine analytical requests may proceed on declared corporate sources alone.

## References Loaded On Demand

_No reference files yet. Tracked as a knowledge-coverage gap in `reports/skill-coverage.json` — not fabricated here._
