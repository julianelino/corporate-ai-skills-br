# EFD (Escrituração Fiscal Digital — ICMS/IPI e Contribuições)

## Topics Covered
- EFD

## Purpose
Determine which EFD obligation (EFD-ICMS/IPI, state-administered; or EFD-Contribuições, federal-administered for PIS/Cofins) applies to a given entity/operation, and its filing mechanics — before advising on or preparing EFD-related compliance support. EFD-Reinf, though sharing the "EFD" naming pattern, is a distinct obligation covered separately in `reinf-dctfweb.md`, given its different subject matter (withholdings/labor-adjacent data) and its integration with DCTFWeb rather than with ICMS/IPI/PIS/Cofins apuração.

## When to Load
Load whenever a request involves the digital fiscal bookkeeping obligation for goods-movement/production taxes (EFD-ICMS/IPI) or federal contribution credits (EFD-Contribuições) — before advising on filing scope, obligatoriedade, or deadline.

## Scope
Covers EFD-ICMS/IPI (state-administered, feeding ICMS/IPI apuração) and EFD-Contribuições (federal-administered, feeding PIS/Cofins non-cumulative credit/debit apuração). Does not cover the substantive ICMS/IPI/PIS/Cofins rules these filings report on (see the `tax-br` skill's `icms.md`, `ipi.md`, `pis-cofins.md`) or EFD-Reinf/DCTFWeb (see `reinf-dctfweb.md`).

## Core Concepts
- **EFD-ICMS/IPI ("SPED Fiscal")**: a purely digital document prepared by ICMS and IPI taxpayers, providing all information necessary for those taxes' apuração — replacing the historical paper-based Livro Registro de Entradas, Saídas, Inventário, and related fiscal books. Structured in blocks and registros — standardized data units, each representing a specific information category (e.g., document-level entries, inventory, apuração totals).
- **Obligatoriedade — state-determined**: unlike ECD/ECF's federal criteria, EFD-ICMS/IPI's mandatory-filer determination sits in each state's own legislation — generally covering industries, entities equiparated to industrial, and atacadistas (wholesalers), but the exact scope varies by state; VERIFY_CURRENT_T1_SOURCE against the specific `sefaz` for a specific entity's obligatoriedade, mirroring `icms.md`'s general point about ICMS's fundamentally non-uniform state-level structure.
- **Deadline**: commonly cited as the 20th calendar day of the month following the reference period, regardless of business-day status — VERIFY_CURRENT_T1_SOURCE for the specific current deadline, since state-specific variations or ad hoc extensions can occur.
- **Zero-movement filing still required**: an entity with no fiscal movement in the period is still required to transmit the EFD-ICMS/IPI file, reporting only the minimum mandatory registros with zeroed apuração blocks — "nothing happened" is not a basis for skipping the filing obligation itself.
- **EFD-Contribuições**: the federal-administered digital bookkeeping for PIS/Cofins, particularly relevant for non-cumulative-regime entities (see `tax-br` skill's `pis-cofins.md`) needing to document their credit/debit apuração — a structurally similar block/registro concept to EFD-ICMS/IPI but administered by Receita Federal for a different tax base.
- **Guia Prático / manual**: both EFD variants are governed by their own detailed "Guia Prático" manuals (periodically revised — this research identified version references like 3.0.6 and subsequent 6.x/7.x revisions for EFD-ICMS/IPI specifically) — see `filing-calendar-manuals.md` for the general manual-currency discipline this reference relies on.

## Decision Points
1. Is the entity subject to EFD-ICMS/IPI (state-determined — industrial, equiparated-to-industrial, or atacadista, per the specific state's current legislation)? VERIFY_CURRENT_T1_SOURCE against the relevant `sefaz`.
2. Is the entity on the PIS/Cofins non-cumulative regime (see `tax-br` skill's `pis-cofins.md`), making EFD-Contribuições' credit/debit documentation relevant?
3. Even with no fiscal movement in the period, has the mandatory minimum-registro filing still been prepared and transmitted?
4. What is the currently-applicable Guia Prático version for the specific EFD variant, and does it introduce registro/validation changes relevant to this filing? VERIFY_CURRENT_T1_SOURCE.
5. What is the exact current deadline (commonly the 20th of the following month for EFD-ICMS/IPI) for the specific state/obligation? VERIFY_CURRENT_T1_SOURCE.

## Required Facts
- The entity's activity classification (industrial, equiparated, atacadista, or other) relevant to state-level EFD-ICMS/IPI obligatoriedade.
- The entity's PIS/Cofins regime, relevant to EFD-Contribuições' scope.
- Whether the reference period had fiscal movement (affecting content, not the filing obligation itself).
- The currently-applicable Guia Prático version for each EFD variant. VERIFY_CURRENT_T1_SOURCE.

## Required Evidence
- The specific state's current EFD-ICMS/IPI obligatoriedade legislation for the entity's activity classification. VERIFY_CURRENT_T1_SOURCE.
- Underlying fiscal documents (notas fiscais, apuração records) supporting the EFD's registro content.
- The EFD file's own validation/transmission receipt once filed.

## Exceptions
- A state may grant specific dispensation from EFD-ICMS/IPI for certain small-scale or specific-regime taxpayers (e.g., Simples Nacional entities are commonly, though not universally, outside its scope for ICMS/IPI purposes given their unified DAS collection) — verify the current specific-regime interaction rather than assuming universal applicability. `CORPORATE_CONTEXT_REQUIRED`/VERIFY_CURRENT_T1_SOURCE.
- An entity solely on the PIS/Cofins cumulative regime (see `tax-br` skill's `pis-cofins.md`) may have reduced or different EFD-Contribuições content requirements compared to a non-cumulative-regime entity, given the absence of a credit-apuração mechanism to document.

## Risk Considerations
- Assuming a single national EFD-ICMS/IPI obligatoriedade rule, rather than checking the specific state's current legislation, is a common, high-risk error mirroring ICMS's fundamentally non-uniform structure.
- Skipping the zero-movement minimum-registro filing because "there was nothing to report" is itself a compliance failure — the filing obligation exists independent of movement.
- Using an outdated Guia Prático version's registro assumptions risks unexpected rejections under a revised manual's validation rules.

## Human Escalation Conditions
Escalate for human accounting/tax review whenever: EFD-ICMS/IPI obligatoriedade for a specific entity/state is uncertain; a validation rejection's root cause is unclear; the entity's regime interaction with either EFD variant's scope is ambiguous; or the currently-applicable manual version cannot be confirmed.

## Source IDs
`sped` (T1 — SPED program's EFD-specific Guias Práticos and current manual versions), `sefaz` (T1 — state-specific EFD-ICMS/IPI obligatoriedade and deadline rules), `receita` (T1 — EFD-Contribuições federal administration and current guidance), `econet` (T3 — practical deadline/obligation tracking guidance; secondary only).

## Freshness Requirements
Critical, and for EFD-ICMS/IPI specifically inherently state-specific — obligatoriedade and any state-level deadline nuance require VERIFY_CURRENT_T1_SOURCE against the specific `sefaz`; the Guia Prático version for either EFD variant should be re-confirmed as current before relying on its specific registro/validation assumptions.

## Effective-Date Considerations
Both EFD variants' core block/registro structural concept is stable, long-standing SPED program design; the specific Guia Prático version in force (this research identified multiple historical version references, e.g., 3.0.6 and later 6.x/7.x revisions for EFD-ICMS/IPI) is the volatile element requiring VERIFY_CURRENT_T1_SOURCE for the currently-applicable version before a consequential preparation activity.

## Related References
- `tax-br` skill's `icms.md`, `ipi.md`, `pis-cofins.md` — for the substantive tax rules these EFD filings report on.
- `reinf-dctfweb.md` (this skill) — for the distinct EFD-Reinf obligation and its DCTFWeb integration.
- `layouts-validation.md` (this skill) — for PVA validation mechanics and common rejection causes (including the illustrative J050 error pattern referenced there).
- `filing-calendar-manuals.md` (this skill) — for the broader SPED filing calendar and manual-currency discipline.

## Known Limitations
- Deliberately does not embed any specific state's EFD-ICMS/IPI obligatoriedade criteria — inherently non-uniform across 27 states; always VERIFY_CURRENT_T1_SOURCE against the specific `sefaz`.
- Does not state the current-year exact deadline as reliable current fact without VERIFY_CURRENT_T1_SOURCE.
- Sourced from secondary summaries, not an independently re-fetched primary SPED Guia Prático, in this research pass.
