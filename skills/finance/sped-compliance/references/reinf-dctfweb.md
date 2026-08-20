# EFD-Reinf and DCTFWeb (Retenções Federais e Declaração Consolidada)

## Topics Covered
- Reinf
- DCTFWeb

## Purpose
Determine how EFD-Reinf's withholding/services data flows into DCTFWeb's consolidated federal-tax declaration alongside eSocial and MIT data — before advising on or preparing Reinf/DCTFWeb compliance support, especially where cross-source inconsistency is a risk.

## When to Load
Load whenever a request involves withholding-related ancillary obligations (EFD-Reinf) or the consolidated federal-debt declaration (DCTFWeb) — before advising on filing scope, deadline, or a cross-source inconsistency between eSocial, EFD-Reinf, and DCTFWeb.

## Scope
Covers EFD-Reinf's role in reporting withholdings/services data and DCTFWeb's role consolidating eSocial + EFD-Reinf + MIT data into a single federal-tax declaration. Does not cover the substantive withholding rules EFD-Reinf reports on (see the `tax-br` skill's `irrf-inss-withholding.md`) or the payroll data eSocial reports (see the `payroll-br` skill's `esocial.md`).

## Core Concepts
- **EFD-Reinf's role**: reports withholdings and services-related data not captured by eSocial's payroll-centric events — including IRRF and INSS withholding on payments to third parties/vendors (see `tax-br` skill's `irrf-inss-withholding.md`), among other Reinf-specific event categories.
- **DCTFWeb's consolidating role**: DCTFWeb (Declaração de Débitos e Créditos Tributários Federais Previdenciários e de Outras Entidades e Fundos, Web version) consolidates data from three sources — eSocial (payroll and social-security contributions), EFD-Reinf (withholdings and services), and MIT (Módulo de Inclusão de Tributos, covering other federal tax obligations) — calculating consolidated liabilities and generating the corresponding payment guides (DARF).
- **Cross-source consistency is load-bearing**: because DCTFWeb's calculation depends on all three upstream sources agreeing, an inconsistency between eSocial, EFD-Reinf, and/or MIT data (e.g., a CPF, value, or incidência code mismatch) surfaces almost immediately as a DCTFWeb-level reconciliation failure — this connects directly to `payroll-br` skill's `incidences.md` and `esocial.md`: a rubric misclassification upstream in payroll can produce a downstream DCTFWeb inconsistency, not merely an eSocial-internal issue.
- **DIRF's replacement**: per this research (also noted in `payroll-br` skill's `esocial.md`), the current eSocial leiaute (S-1.3, in force since December 2024) restructured S-1210, S-2501, and S-5002 to absorb the reporting content previously carried by the now-discontinued DIRF — a materially significant structural change directly relevant to how EFD-Reinf and DCTFWeb interact with income/withholding data that used to flow through a separate annual DIRF declaration.
- **Deadline**: commonly cited as the 15th day of the month following the reference period for the periodic filings feeding DCTFWeb, with DCTFWeb itself commonly cited as due by the last business day of the following month — VERIFY_CURRENT_T1_SOURCE for the specific current deadlines, since this multi-source system has been subject to phased rollout and periodic deadline adjustment.

## Decision Points
1. Does the entity have withholding/services data (e.g., IRRF/INSS withholding on vendor payments per `tax-br`'s `irrf-inss-withholding.md`) requiring EFD-Reinf reporting, separate from payroll data already flowing through eSocial?
2. Have eSocial, EFD-Reinf, and MIT data been cross-checked for consistency (matching CPFs, values, incidência codes) before DCTFWeb's consolidation, to avoid a reconciliation failure?
3. Is any process or system still assuming a separate DIRF filing is required, when the current S-1.3 regime has absorbed that content into eSocial/Reinf events?
4. What are the exact current deadlines for the periodic Reinf filing and the consolidated DCTFWeb declaration? VERIFY_CURRENT_T1_SOURCE.
5. If a DCTFWeb inconsistency is flagged, which upstream source (eSocial, EFD-Reinf, or MIT) is the actual root cause, rather than assuming the error lies in DCTFWeb itself?

## Required Facts
- The entity's withholding/services activity requiring EFD-Reinf reporting.
- Confirmation that eSocial, EFD-Reinf, and MIT data have been reconciled before DCTFWeb consolidation.
- The reference period and corresponding current deadlines for each filing layer. VERIFY_CURRENT_T1_SOURCE.
- Whether any legacy DIRF-era process assumption still needs updating.

## Required Evidence
- EFD-Reinf event submission and acceptance records.
- DCTFWeb reconciliation output, where a cross-source inconsistency is being investigated.
- Underlying withholding documentation (see `tax-br` skill's `irrf-inss-withholding.md`) supporting the Reinf-reported amounts.

## Exceptions
- Small-scale or specific-regime entities may have reduced Reinf-event scope (e.g., no withholding events to report in a given period) — this affects filing content, not the underlying obligation to confirm and, where applicable, file a nil/negative declaration where the current rules require it. VERIFY_CURRENT_T1_SOURCE for the specific current nil-filing requirement.
- A DCTFWeb inconsistency does not always indicate an error — a genuine, correctly-reported timing difference between when an event is recognized in one source versus another can also produce a reconciliation flag requiring explanation rather than correction.

## Risk Considerations
- Treating a DCTFWeb inconsistency as a DCTFWeb-level problem, rather than tracing it to its actual upstream source (eSocial, EFD-Reinf, or MIT), wastes remediation effort and risks leaving the actual root cause unresolved.
- Continuing a legacy DIRF-filing-adjacent process or assumption after the S-1.3 transition risks both a compliance gap (relying on a discontinued mechanism) and a duplication/inconsistency risk (reporting the same data through two now-misaligned paths).
- Using stale deadline assumptions for this actively-evolving, phased multi-source system risks a late filing.

## Human Escalation Conditions
Escalate for human payroll/tax review whenever: a DCTFWeb inconsistency's root cause is unclear after checking all three upstream sources; the entity's Reinf-event scope for a specific withholding scenario is uncertain; or a legacy DIRF-era process is identified and its correct current replacement path is unclear.

## Source IDs
`sped` (T1 — EFD-Reinf's SPED-program administration and current manual), `esocial` (T1 — eSocial's leiaute version and its EFD-Reinf/DCTFWeb integration points, cross-referenced with `payroll-br` skill's `esocial.md`), `receita` (T1 — DCTFWeb's consolidation mechanics, MIT, and current deadlines), `mte` (T1 — general regulatory context for withholding-linked reporting).

## Freshness Requirements
Critical. This is an actively-evolving, multi-source integrated system (eSocial + EFD-Reinf + MIT → DCTFWeb) with a relatively recent structural change (DIRF absorption via S-1.3, effective December 2024, per this research); re-verify current deadlines and any further structural change against a current T1 source before a consequential filing or reconciliation decision.

## Effective-Date Considerations
- **CURRENT (since December 2024)**: eSocial S-1.3 leiaute, under which DIRF's former content flows through S-1210/S-2501/S-5002 rather than a separate annual declaration — directly affecting how EFD-Reinf/DCTFWeb-adjacent processes should be configured.
- **SUPERSEDED (before December 2024)**: a separate DIRF filing was required alongside the eSocial/Reinf/DCTFWeb periodic cycle.
- The general DCTFWeb consolidation model (eSocial + EFD-Reinf + MIT) is a stable structural design as of this research, but this system has undergone phased rollout historically and remains an area of active regulatory refinement — treat any specific deadline as requiring current confirmation rather than assumed stability.

## Related References
- `tax-br` skill's `irrf-inss-withholding.md` — for the substantive withholding rules EFD-Reinf reports on.
- `payroll-br` skill's `esocial.md` — for the payroll-side eSocial events feeding the same DCTFWeb consolidation, including the shared DIRF-absorption context.
- `layouts-validation.md` (this skill) — for general SPED validation mechanics applicable across these filings.
- `filing-calendar-manuals.md` (this skill) — for the broader SPED filing calendar context.

## Known Limitations
- Does not state the current-year exact deadlines for EFD-Reinf or DCTFWeb as reliable current fact without VERIFY_CURRENT_T1_SOURCE — this system's deadlines have been subject to periodic adjustment during its phased rollout.
- Does not detail MIT's (Módulo de Inclusão de Tributos) specific scope beyond its consolidating role in DCTFWeb — a more detailed treatment would require dedicated research.
- Sourced from secondary summaries, not an independently re-fetched primary Receita Federal/eSocial manual, in this research pass.
