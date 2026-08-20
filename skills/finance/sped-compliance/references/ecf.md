# ECF (Escrituração Contábil Fiscal)

## Topics Covered
- ECF

## Purpose
Determine whether an entity must file ECF, how it relates to and depends on ECD, and its filing deadline — before advising on or preparing ECF-related compliance support.

## When to Load
Load whenever a request involves the fiscal-bookkeeping obligation (ECF) that supports IRPJ/CSLL determination — its applicability, its dependency on ECD, or its deadline — before advising on filing readiness.

## Scope
Covers the ECF obligation: its purpose (detailing IRPJ/CSLL-relevant operations), its dependency on ECD, the e-Lalur/e-Lacs mechanism, and deadline mechanics. Does not cover the substantive IRPJ/CSLL rules ECF reports on (see the `tax-br` skill's `irpj-csll.md`) or ECD itself (see `ecd.md`).

## Core Concepts
- **Purpose**: ECF is an ancillary obligation detailing a company's operations with a specific focus on those relevant to IRPJ and CSLL determination — it integrates accounting data imported from ECD with fiscal adjustments (additions/exclusions to accounting profit required to reach the taxable base) into a single digital file, digitally signed and transmitted annually to Receita Federal.
- **Mandatory filers**: broader than ECD — entities on lucro real, lucro presumido, and lucro arbitrado must file ECF, as well as immune and isenta entities (per this reference's research) — a materially wider filer population than ECD's lucro-real-centric baseline, since ECF's purpose (documenting IRPJ/CSLL positions) applies across regimes even where ECD itself is not required.
- **e-Lalur and e-Lacs**: e-Lalur (Livro Eletrônico de Apuração do Lucro Real) records the fiscal adjustments (additions and exclusions) needed to convert accounting profit into taxable profit for IRPJ purposes; e-Lacs performs the equivalent function for the CSLL calculation base — these are the digital successors to the historical paper LALUR/LACS books, embedded within the ECF filing rather than filed separately.
- **Dependency on ECD**: ECF imports ECD's accounting data as its starting point — an unvalidated, late, or inconsistent ECD directly risks ECF preparation problems or rejection, since ECF cannot reliably proceed from incomplete upstream accounting data. For entities not required to file ECD (e.g., some lucro presumido filers), ECF still requires accounting-equivalent information through its own mechanisms — verify the specific interaction for non-ECD-filing entities. `CORPORATE_CONTEXT_REQUIRED`/VERIFY_CURRENT_T1_SOURCE.
- **Deadline**: commonly the last business day of July of the year following the calendar year being reported (one month after ECD's commonly-cited June deadline, reflecting its dependency) — VERIFY_CURRENT_T1_SOURCE for the specific current year's exact date.
- **Leiaute revisions**: ECF's technical layout (leiaute) is periodically revised — this research identified a "Leiaute 12" revision associated with the 2026 filing cycle, described as expanding validations and reducing the scope for manual correction within the Receita Federal's own program — VERIFY_CURRENT_T1_SOURCE for the currently-applicable leiaute version before preparing a filing, since using an outdated leiaute's assumptions about validation behavior risks unexpected rejections.

## Decision Points
1. Does the entity fall into ECF's broader mandatory-filer population (lucro real, presumido, arbitrado, imune, isenta) — likely a "yes" more often than for ECD specifically?
2. Has the entity's ECD (where required) been validated and finalized before ECF preparation begins, given ECF's dependency on ECD's accounting data?
3. What is the currently-applicable ECF leiaute version, and does it introduce new validation requirements relevant to this filing? VERIFY_CURRENT_T1_SOURCE.
4. Are the fiscal adjustments (e-Lalur/e-Lacs entries) correctly derived from the entity's actual current-period tax-adjustment facts (see `tax-br` skill's `irpj-csll.md`), not merely carried forward from a prior period?
5. What is the exact current-year ECF deadline, and does it allow sufficient time after ECD's deadline for review? VERIFY_CURRENT_T1_SOURCE.

## Required Facts
- The entity's tax regime, determining both ECF applicability and the specific IRPJ/CSLL rules its fiscal adjustments must reflect.
- ECD's validation/filing status, where ECD is also required.
- The currently-applicable ECF leiaute version.
- The calendar year being reported and the corresponding current filing deadline.

## Required Evidence
- ECD's transmission receipt, where ECD is a prerequisite input.
- Supporting documentation for each fiscal adjustment (addition/exclusion) recorded in e-Lalur/e-Lacs.
- The ECF file's own validation/transmission receipt once filed.

## Exceptions
- Immune and isenta entities, despite not being subject to IRPJ/CSLL in the ordinary sense, are still required to file ECF (per this reference's research) — do not assume tax-exempt status removes the ECF filing obligation.
- An entity not required to file ECD (e.g., some lucro presumido filers) still requires accounting-equivalent data for ECF's own purposes through its own specific mechanism — verify the current specific requirement for this scenario rather than assuming ECD's absence exempts the entity from providing equivalent data. `CORPORATE_CONTEXT_REQUIRED`/VERIFY_CURRENT_T1_SOURCE.

## Risk Considerations
- Preparing ECF before ECD is validated and finalized (where ECD is required) risks importing incomplete or soon-to-be-corrected accounting data, producing a downstream ECF error.
- Using a prior year's leiaute assumptions for a current filing risks unexpected rejections under a revised leiaute's expanded validations (as this research identified for the 2026 cycle's "Leiaute 12").
- Carrying forward a prior period's fiscal adjustments without re-deriving them from current-period facts risks materially misstating the taxable base.

## Human Escalation Conditions
Escalate for human accounting/tax review whenever: ECF applicability for a specific entity type (especially immune/isenta or non-ECD-filing entities) is uncertain; a fiscal adjustment's basis is unclear or disputed; a leiaute-version-related validation error's root cause is unclear; or the current-year exact deadline needs confirmation for a time-sensitive filing decision.

## Source IDs
`sped` (T1 — SPED program's ECF-specific guidance, current leiaute version, and manual), `receita` (T1 — current filing deadlines, leiaute revisions, and IRPJ/CSLL fiscal-adjustment rules), `cfc` (T1 — accounting-professional obligations related to ECF preparation), `econet` (T3 — practical deadline/obligation tracking guidance; secondary only).

## Freshness Requirements
Critical. The exact current-year deadline and the currently-applicable leiaute version (with its specific validation rules) should be re-verified against a current T1 source before any consequential filing-readiness communication or preparation activity.

## Effective-Date Considerations
- **CURRENT (2026 filing cycle, per this research)**: "Leiaute 12" applies, with expanded validations compared to prior leiautes.
- ECF's broader mandatory-filer population (compared to ECD) and its e-Lalur/e-Lacs mechanism are stable, long-standing SPED program elements; the specific annual deadline and leiaute version are the elements requiring recalculation/reconfirmation for each new reporting cycle — do not assume a prior year's leiaute or deadline carries forward unchanged.

## Related References
- `ecd.md` (this skill) — for the upstream accounting-data filing ECF depends on.
- `tax-br` skill's `irpj-csll.md` — for the substantive IRPJ/CSLL rules ECF's fiscal adjustments must correctly reflect.
- `layouts-validation.md` (this skill) — for PVA validation mechanics and common rejection causes.
- `filing-calendar-manuals.md` (this skill) — for the broader SPED filing calendar context.

## Known Limitations
- Does not state the current-year exact deadline date as reliable current fact without VERIFY_CURRENT_T1_SOURCE.
- Does not detail "Leiaute 12"'s specific new validation rules beyond noting its existence and general effect (expanded validations, reduced manual-correction scope) — VERIFY_CURRENT_T1_SOURCE for the specific rule changes before relying on this reference for a leiaute-specific preparation decision.
- Sourced from secondary summaries, not an independently re-fetched primary SPED/Receita Federal manual, in this research pass.
