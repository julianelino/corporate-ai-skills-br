# ICMS (Imposto sobre Circulação de Mercadorias e Serviços)

## Topics Covered
- ICMS

## Purpose
Determine the applicable state jurisdiction, fato gerador, and mechanism (regular, substituição tributária, or DIFAL) for a given ICMS-triggering operation — before calculating or advising on an ICMS liability. ICMS is fundamentally state-level, non-uniform legislation layered on a federal general-rule law (Lei Kandir); this reference cannot substitute for the specific state's own legislation.

## When to Load
Load whenever a request involves the circulation of goods or specific transport/communication services subject to ICMS — before determining the applicable state, rate, or special mechanism (ST, DIFAL) for a specific operation.

## Scope
Covers Lei Complementar nº 87/1996 ("Lei Kandir") — the federal law setting general ICMS rules that each state's own legislation implements — and EC nº 87/2015 (DIFAL for interstate sales to non-taxpayer final consumers). Does not cover the specific rate table or exemption list of any individual state (fundamentally `CORPORATE_CONTEXT_REQUIRED`/VERIFY_CURRENT_T1_SOURCE per operation) or the tax-reform transition that will eventually replace ICMS with IBS (see `tax-reform-ibs-cbs.md`).

## Core Concepts
- **Competência estadual**: ICMS is a state (and Distrito Federal) tax — each of the 27 units has its own ICMS legislation (rates, specific exemptions, procedural rules) operating within Lei Kandir's federal framework; there is no single national ICMS rate table, and a rule correct for one state cannot be generalized to another without verification.
- **Fato gerador**: broadly, the circulation of goods (including the transfer of ownership or possession in a commercial sense) and specific services (interstate/intermunicipal transport, communication) — under Lei Kandir, the fato gerador via substituição tributária can also include the entry of goods into the acquiring establishment, not only their exit from the seller.
- **Substituição tributária (ST)**: a mechanism assigning ICMS collection responsibility to a party earlier in the supply chain (typically the manufacturer/importer) for tax that would otherwise be due later in the chain (typically at retail) — Lei Kandir enables states to implement progressive ST without requiring a separate complementary law for each instance, but which products/operations are subject to ST, and the specific margin/MVA (margem de valor agregado) used to compute the presumed downstream price, are state- and product-specific and require VERIFY_CURRENT_T1_SOURCE for the specific state and product.
- **DIFAL (EC 87/2015)**: for interstate sales to a final consumer who is not an ICMS taxpayer (e.g., e-commerce to an individual consumer in another state), the tax is split between the origin and destination states via a rate differential mechanism — do not apply the pre-2015 rule (origin-state-only collection) to a current interstate consumer sale.
- **Lei Kandir's continuing validity**: Lei Kandir remains the general ICMS framework law; its structural rules (fato gerador, ST enablement, general principles) are commonly cited as remaining in force under the current legislative design through the ICMS-to-IBS transition period (commonly cited as continuing until around 2033 per the reform's general implementation schedule) — VERIFY_CURRENT_T1_SOURCE for the exact current transition milestone applicable to a specific operation's date.

## Decision Points
1. Which state(s) have jurisdiction over this specific operation — origin, destination, or both (for an interstate sale)? `CORPORATE_CONTEXT_REQUIRED`/VERIFY_CURRENT_T1_SOURCE for the specific states involved.
2. Does the product/operation fall under a substituição tributária regime in the relevant state, and if so, what is the current MVA/margin used to compute the ST base? VERIFY_CURRENT_T1_SOURCE.
3. Is this an interstate sale to a non-taxpayer final consumer, triggering DIFAL under EC 87/2015's split-collection mechanism?
4. What is the currently-applicable ICMS rate for this specific product/service and state (internal rate) or interstate rate (for cross-state operations)? VERIFY_CURRENT_T1_SOURCE — there is no single answer independent of the specific state and product.
5. Given the tax-reform transition, does the operation's date fall within the current ICMS-still-applies period, or does it require cross-checking against the CBS/IBS test-rate coexistence period (see `tax-reform-ibs-cbs.md`)?

## Required Facts
- Origin and destination states of the operation.
- Whether the acquirer is an ICMS taxpayer (relevant to DIFAL applicability) or a non-taxpayer final consumer.
- The specific product/service and whether it falls under a state ST regime.
- The operation date, relative to both any state-specific rate changes and the broader tax-reform transition timeline.

## Required Evidence
- The specific state's current ICMS legislation/regulamento (RICMS) provisions for the product/operation in question. VERIFY_CURRENT_T1_SOURCE — this is state-specific and not embedded in this reference.
- Nota fiscal and transaction documentation establishing the operation's actual facts (parties, product, states involved).
- Current ST/MVA tables for the specific state and product, where ST applies.

## Exceptions
- Specific product categories (e.g., certain foodstuffs, medications, energy, communications) frequently carry differentiated or reduced ICMS treatment by state — do not assume the general internal rate applies without checking the specific product's state-level treatment.
- Free-trade-zone (Zona Franca de Manaus) and other special-regime jurisdictions carry materially different ICMS treatment from the general interstate framework — treat any operation involving these zones as requiring dedicated, current verification rather than the general rules in this reference.

## Risk Considerations
- Generalizing one state's ICMS rate, ST treatment, or exemption to another state's identical-seeming operation is a common, high-risk error given ICMS's fundamentally non-uniform, state-by-state legislative structure.
- Applying the pre-2015 DIFAL rule (or omitting DIFAL analysis entirely) to a current interstate sale to a non-taxpayer final consumer produces a materially wrong split-collection calculation.
- Using a stale MVA/margin figure for an ST calculation, given these are periodically revised by state-level regulation, misstates the ST tax base.

## Human Escalation Conditions
Escalate for human tax review whenever: an operation spans multiple states with potentially conflicting treatment; ST applicability or the current MVA for a specific product/state is uncertain; DIFAL's applicability to a specific buyer classification is ambiguous; or the operation date falls near a known tax-reform transition milestone with unclear current-period treatment.

## Source IDs
`sefaz` (T1 — state-specific ICMS legislation, rates, ST/MVA tables — the primary source for any specific-state question this reference itself cannot resolve), `planalto` (T1 — Lei Complementar 87/1996, EC 87/2015; not independently re-fetched due to the persistent planalto.gov.br connection failure documented across this repository's labor-law references), `econet` (T3 — practical multi-state comparison guidance; secondary only, never sole authority for a specific-state conclusion).

## Freshness Requirements
Critical, and inherently state-specific — this reference's federal-framework content is comparatively stable, but any specific rate, ST/MVA table, or exemption requires VERIFY_CURRENT_T1_SOURCE against the specific state's `sefaz` for every consequential calculation, since state-level ICMS legislation changes independently and frequently.

## Effective-Date Considerations
- **CURRENT**: DIFAL under EC 87/2015's split-collection mechanism for interstate non-taxpayer-consumer sales.
- **CURRENT (2026, transition phase)**: ICMS continues to apply under Lei Kandir's framework while IBS is simultaneously charged at 2026 test rates (see `tax-reform-ibs-cbs.md`) — coexistence, not yet replacement.
- **SUPERSEDED**: the pre-2015 rule under which an interstate sale to a non-taxpayer final consumer was taxed entirely at the origin state's internal rate, without a destination-state split.
- **FUTURE**: ICMS is expected to be extinguished and replaced by IBS as the multi-year reform transition completes — VERIFY_CURRENT_T1_SOURCE for the exact current milestone before assuming ICMS no longer applies to any specific future-period operation.

## Related References
- `tax-reform-ibs-cbs.md` (this skill) — for the IBS transition currently underway and ICMS's eventual replacement.
- `pis-cofins.md`, `irpj-csll.md` (this skill) — for the federal taxes operating alongside ICMS on the same commercial operations.

## Known Limitations
- Deliberately does not embed any specific state's rate table, ST product list, or MVA figures — ICMS's fundamentally non-uniform, 27-jurisdiction structure makes any such table certain to be incomplete or stale; always VERIFY_CURRENT_T1_SOURCE against the specific state's `sefaz`.
- Does not cover the Zona Franca de Manaus or other special-regime jurisdictions' specific rules.
- Sourced from secondary summaries of Lei Kandir and EC 87/2015, not an independently re-fetched primary text, in this research pass.
