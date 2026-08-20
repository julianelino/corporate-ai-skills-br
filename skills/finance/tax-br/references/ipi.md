# IPI (Imposto sobre Produtos Industrializados)

## Topics Covered
- IPI

## Purpose
Determine whether a given operation involves an industrialized product subject to IPI, its fato gerador timing, and the applicable TIPI classification/rate — before calculating or advising on an IPI liability.

## When to Load
Load whenever a request involves the manufacture, import, or industrial-equivalent handling of a product potentially subject to IPI — before determining applicability, fato gerador timing, or the TIPI-based rate.

## Scope
Covers the general IPI framework (federal tax on industrialized products), its fato gerador, and the seletividade principle underlying TIPI's rate structure. Does not cover any specific product's current TIPI rate (fundamentally VERIFY_CURRENT_T1_SOURCE per product classification) or the tax-reform transition that will eventually reshape IPI's role alongside the new Imposto Seletivo (see `tax-reform-ibs-cbs.md`).

## Core Concepts
- **Fato gerador**: IPI's taxable event occurs at one of three defined moments — (1) desembaraço aduaneiro of a foreign-origin product (import clearance), (2) saída do estabelecimento industrial (or an entity equiparated to industrial) of a domestically industrialized product, or (3) arrematação (auction) of a seized/abandoned industrialized product. A product merely stored or resold without further industrialization by a non-industrial establishment generally does not itself trigger a new IPI fato gerador on resale (subject to specific equiparação rules that can extend IPI-taxpayer status to certain non-manufacturing entities).
- **Produto industrializado**: a product that has undergone a process altering its nature, function, finishing, presentation, or purpose, or improving it for consumption (per the general industrialização concept) — a purely commercial resale without any transformation is generally outside IPI's scope, but the exact boundary (e.g., simple repackaging vs. genuine transformation) is fact-specific.
- **Seletividade (essencialidade)**: IPI rates are constitutionally required to be selective based on the product's essentiality — more essential products carry lower rates (potentially zero), less essential products carry higher rates. This is a structural design principle, not merely a policy preference, and explains why IPI rates vary enormously by product category rather than following a flat rate.
- **TIPI (Tabela de Incidência do IPI)**: the official table listing products (by NCM/harmonized-system-derived classification) with their specific IPI rates — the sole authoritative source for a specific product's current rate; this reference does not embed TIPI rates, since they are numerous, product-specific, and subject to change.
- **Não-cumulatividade**: like ICMS, IPI operates on a non-cumulative basis — tax paid on inputs generates credits offsettable against tax due on the industrialized output, avoiding cascading taxation through the production chain.

## Decision Points
1. Does the operation involve one of IPI's three defined fato gerador events (import clearance, exit from an industrial/equiparated establishment, or auction)?
2. Does the product genuinely qualify as "industrializado" under the transformation-based concept, or is this a mere commercial resale outside IPI's scope? Check whether the entity is equiparated to industrial despite not itself manufacturing.
3. What is the product's specific TIPI classification (NCM code) and its current associated rate? VERIFY_CURRENT_T1_SOURCE — this reference does not supply a specific rate.
4. Does the entity have offsettable input credits from the non-cumulative mechanism, and are they correctly computed against the output tax due?
5. Given the tax-reform transition (`tax-reform-ibs-cbs.md`), is IPI expected to remain applicable to this product post-reform (IPI is generally expected to be largely phased out except for specific extrafiscal/Zona Franca de Manaus-protective uses, coexisting with a new Imposto Seletivo on specific goods), and does the operation's date matter for that determination? VERIFY_CURRENT_T1_SOURCE.

## Required Facts
- The specific product and its NCM/TIPI classification.
- The nature of the operation (import, domestic industrial exit, auction) establishing which fato gerador event applies.
- Whether the selling entity is genuinely industrial or merely equiparated/commercial.
- Input-credit documentation, for non-cumulative offsetting.

## Required Evidence
- TIPI classification documentation (NCM code) for the specific product. VERIFY_CURRENT_T1_SOURCE for the associated rate.
- Import/customs documentation, where the fato gerador is import clearance.
- Production records establishing the industrialização process, where applicability is contested.
- Input-purchase invoices supporting non-cumulative credit claims.

## Exceptions
- Products destined for the Zona Franca de Manaus or other specific incentive regimes may carry IPI exemption or reduction distinct from the general TIPI rate — verify against current specific-regime guidance rather than the general table.
- Certain equiparação rules extend industrial-taxpayer status (and therefore IPI liability on "exit") to specific non-manufacturing entities (e.g., certain importers) — do not assume only literal manufacturers are IPI taxpayers.

## Risk Considerations
- Misclassifying a product's NCM code produces a wrong TIPI rate lookup even if every other aspect of the analysis is correct — classification precision matters as much as the rate itself.
- Treating a mere commercial resale as triggering a new IPI fato gerador (when no further industrialização occurred and no equiparação rule applies) overstates the tax liability.
- Failing to account for input credits under the non-cumulative mechanism overstates the net IPI liability.

## Human Escalation Conditions
Escalate for human tax review whenever: a product's status as "industrializado" is genuinely ambiguous; NCM classification is disputed or unclear; equiparação status is uncertain; or the operation's treatment under the ongoing tax-reform transition (IPI's reduced future role, new Imposto Seletivo) is unclear for the relevant period.

## Source IDs
`receita` (T1 — current TIPI table, NCM classification guidance, and IPI regulatory interpretation), `planalto` (T1 — the general IPI statutory framework; not independently re-fetched due to the persistent planalto.gov.br connection failure documented across this repository's labor-law references), `econet` (T3 — practical classification guidance; secondary only, never sole authority).

## Freshness Requirements
Critical. TIPI rates and NCM classifications are revised periodically and are product-specific; VERIFY_CURRENT_T1_SOURCE before any consequential calculation — this reference intentionally does not embed a rate table that would go stale.

## Effective-Date Considerations
- **CURRENT**: the fato gerador and seletividade framework described here.
- **CURRENT (2026, transition phase)**: IPI continues to apply under its existing framework during the tax-reform transition, alongside the new Imposto Seletivo (IS) introduced by EC 132/2023/LC 214/2025 for specific goods (see `tax-reform-ibs-cbs.md`) — the two are designed to serve different extrafiscal purposes (IPI historically broader; IS specifically targeted at goods deemed harmful to health/environment) and should not be conflated.
- **FUTURE**: IPI's role is expected to be substantially reduced under the reform (commonly described as being maintained mainly for Zona Franca de Manaus protection purposes, with its broader revenue role absorbed by IBS/CBS/IS) — VERIFY_CURRENT_T1_SOURCE for the exact current milestone and scope before assuming IPI no longer applies to a specific future-period product.

## Related References
- `tax-reform-ibs-cbs.md` (this skill) — for the reform's Imposto Seletivo and IPI's evolving role.
- `icms.md` (this skill) — for the related but distinct state-level tax on the same industrialized-product operations.

## Known Limitations
- Deliberately does not embed a TIPI rate table — thousands of NCM-classified products each with a specific rate make any embedded table certain to be incomplete or stale; always VERIFY_CURRENT_T1_SOURCE against `receita`'s current TIPI.
- Does not resolve the "industrialização" boundary question (transformation vs. mere handling) for any specific process — this is fact-specific and may require case-specific ruling/consulta.
- Sourced from secondary summaries, not an independently re-fetched primary text, in this research pass.
