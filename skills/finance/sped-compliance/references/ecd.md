# ECD (Escrituração Contábil Digital)

## Topics Covered
- ECD

## Purpose
Determine whether an entity is required to file ECD, what it must contain, and its filing deadline — before advising on or preparing ECD-related compliance support.

## When to Load
Load whenever a request involves the digital bookkeeping obligation (ECD) — its applicability, content, deadline, or its role as a feeder for ECF — before advising on filing readiness.

## Scope
Covers the ECD obligation as administered through the SPED program: what it replaces, who must file, and its deadline mechanics. Does not cover the accounting content itself (see the `accounting-br` skill's references for recognition/measurement/presentation) or ECF, which consumes ECD data (see `ecf.md`).

## Core Concepts
- **What ECD replaces**: ECD is the digital transmission of the Livro Diário (and auxiliary books), Livro Razão (and auxiliary books), and Livro Balancetes Diários/Balanços — replacing the paper-based statutory bookkeeping books with a structured digital file submitted through SPED.
- **Mandatory filers**: entities on lucro real are required to file ECD without exception based on size, revenue, or activity (per this reference's research); entities on lucro presumido and other regimes may be required depending on specific statutory criteria (e.g., distributing profits above the presumed-taxable amount without incurring additional taxation may require ECD to support that treatment) — VERIFY_CURRENT_T1_SOURCE for the complete current mandatory-filer criteria beyond the lucro real baseline.
- **Simples Nacional exemption**: entities under Simples Nacional are generally not required to file ECD (per this reference's research) — do not assume ECD applies to a Simples Nacional entity without checking current specific-regime rules.
- **Deadline**: commonly the last business day of June of the year following the calendar year the bookkeeping refers to (e.g., the 2025 calendar-year ECD would be due by the last business day of June 2026) — VERIFY_CURRENT_T1_SOURCE for the specific current year's exact date, since business-day adjustments and any ad hoc extension change the precise date year to year.
- **Feeds ECF**: ECD's accounting data is imported into ECF (see `ecf.md`) as the basis for that filing's fiscal adjustments — an error or delay in ECD directly risks a downstream ECF rejection or delay, since ECF cannot be reliably prepared from unvalidated or late ECD data.
- **Penalty for late filing**: a commonly-cited penalty structure is a percentage per day of delay calculated on gross revenue, subject to a cap (per this reference's research, illustrative figures on the order of 0.02% per day capped at 1%) — VERIFY_CURRENT_T1_SOURCE for the current exact penalty structure before citing a specific figure in a consequential communication.

## Decision Points
1. Is the entity on lucro real (mandatory ECD filer without exception), or does it fall under a different regime requiring a specific-criteria check for ECD applicability?
2. Is the entity under Simples Nacional, generally exempting it from ECD? Confirm current status rather than assuming.
3. What is the exact current-year deadline for the applicable calendar year's ECD? VERIFY_CURRENT_T1_SOURCE.
4. Has the ECD been validated (via the PVA/validador) without rejection before the deadline, given its role as ECF's data source?
5. Is there a risk of late filing, and if so, what is the current penalty structure applicable? VERIFY_CURRENT_T1_SOURCE.

## Required Facts
- The entity's tax regime (lucro real, presumido, arbitrado, Simples Nacional).
- The calendar year being reported and the corresponding current filing deadline.
- Validation status of the ECD file (accepted, rejected, pending correction).

## Required Evidence
- The entity's regime classification documentation.
- The ECD file's validation/transmission receipt (recibo de entrega) once filed.
- Underlying accounting records (see `accounting-br` skill) supporting the ECD's content.

## Exceptions
- Entities under specific simplified regimes (Simples Nacional) are generally exempt, but a change in regime mid-year, or a specific statutory carve-out, can alter this — verify the entity's regime status for the specific reporting period, not merely its current status.
- An entity may be required to file ECD even without a lucro real requirement if a specific statutory trigger applies (e.g., profit-distribution above the presumed base without extra taxation) — do not assume exemption merely because the entity is on lucro presumido without checking this specific trigger. `CORPORATE_CONTEXT_REQUIRED`.

## Risk Considerations
- Assuming ECD applicability based on a prior period's regime without confirming the current period's actual regime risks a missed or unnecessary filing.
- Filing ECD with unvalidated or inconsistent chart-of-accounts mapping risks downstream ECF rejection (see `ecf.md`), since ECF depends on ECD's data.
- Using a stale deadline (not adjusted for the current year's specific business-day calendar) risks a late filing and its associated penalty.

## Human Escalation Conditions
Escalate for human accounting/tax review whenever: the entity's ECD-filing obligation is uncertain given its specific regime and circumstances; the current-year exact deadline needs confirmation for a time-sensitive filing decision; or a validation rejection's root cause is unclear.

## Source IDs
`sped` (T1 — SPED program's ECD-specific guidance and current manual), `receita` (T1 — current filing deadlines and penalty structure), `cfc` (T1 — accounting-professional obligations related to ECD preparation), `econet` (T3 — practical deadline/obligation tracking guidance; secondary only, never sole authority).

## Freshness Requirements
Critical. The exact current-year deadline and penalty structure should be re-verified against a current T1 source before any consequential filing-readiness or deadline communication.

## Effective-Date Considerations
The ECD obligation and its lucro-real mandatory-filer baseline are stable, long-standing SPED program elements; the specific annual deadline shifts with the calendar (last business day of June of the following year, per this research) and should be recalculated, not assumed carried-forward, for each new reporting cycle.

## Related References
- `ecf.md` (this skill) — for the downstream filing that consumes ECD's data.
- `layouts-validation.md` (this skill) — for the PVA validation mechanics and common rejection causes applicable to ECD.
- `filing-calendar-manuals.md` (this skill) — for the broader SPED filing calendar context.
- `accounting-br` skill's references — for the underlying accounting content ECD digitally transmits.

## Known Limitations
- Does not state the current-year exact deadline date or penalty percentage as reliable current fact without VERIFY_CURRENT_T1_SOURCE — both are cited as illustrative/commonly-reported figures from this research pass, not independently re-confirmed against a primary Receita Federal source.
- Does not enumerate every specific-regime ECD-obligation trigger beyond the lucro real baseline and the Simples Nacional exemption — `CORPORATE_CONTEXT_REQUIRED`/VERIFY_CURRENT_T1_SOURCE for edge cases.
- Sourced from secondary summaries, not an independently re-fetched primary SPED/Receita Federal manual, in this research pass.
