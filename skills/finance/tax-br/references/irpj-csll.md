# IRPJ and CSLL (Imposto de Renda Pessoa Jurídica e Contribuição Social sobre o Lucro Líquido)

## Topics Covered
- IRPJ
- CSLL

## Purpose
Determine the applicable tax regime (lucro real, presumido, or arbitrado) for computing IRPJ and CSLL, and the structural mechanics of each — before calculating or advising on a specific IRPJ/CSLL liability. This reference does not itself supply a current rate/threshold figure to rely on without verification (see Effective-Date Considerations).

## When to Load
Load whenever a request involves IRPJ or CSLL — regime selection, base computation, or the additional-rate mechanic — before a consequential calculation or filing-support conclusion.

## Scope
Covers Lei nº 9.249/1995 and Decreto nº 9.580/2018 (RIR — Regulamento do Imposto de Renda) structural framework for lucro real, presumido, and arbitrado regimes. Does not cover PIS/Cofins (see `pis-cofins.md`), withholding mechanics on payments to third parties (see `irrf-inss-withholding.md`), or the tax-reform transition (see `tax-reform-ibs-cbs.md` — IRPJ/CSLL are not directly replaced by IBS/CBS, which target consumption, not income, but coexistence/interaction questions should be checked there).

## Core Concepts
- **Lucro real**: IRPJ/CSLL computed on actual accounting profit adjusted by tax-specific additions and exclusions (adições e exclusões) per RIR/2018 — mandatory for entities above a revenue threshold, financial institutions, and other statutorily-designated categories; optional (and sometimes advantageous) for others depending on actual margin.
- **Lucro presumido**: a simplified regime where taxable profit is presumed as a fixed percentage of gross revenue (varying by business activity), rather than computed from actual accounting results — available only to entities below a statutory revenue ceiling and not otherwise required to use lucro real.
- **Lucro arbitrado**: applied when neither lucro real nor lucro presumido can be reliably determined (e.g., inadequate bookkeeping) — generally the least favorable regime, computed via statutorily-defined arbitration criteria.
- **IRPJ rate structure**: a base rate applied to taxable profit, plus an additional rate on the portion of profit exceeding a statutory monthly threshold (commonly cited as R$ 20.000 per month of the apuração period, per Lei 9.249/95) — verify the current base rate, additional rate, and threshold value against a current T1 source before a consequential calculation; do not assume these figures are unchanged from any prior period.
- **CSLL rate structure**: a rate applied to the CSLL-specific tax base (computed similarly to, but not identical with, the IRPJ base — CSLL has its own additions/exclusions list), with a commonly-cited differentiated rate for financial institutions and equiparated entities versus general entities — verify the current applicable rate for the specific entity type against a current T1 source.
- **Apuração period**: both taxes are computed over defined apuração periods (trimestral or, for lucro real, optionally anual with monthly estimates — "por estimativa") — the period basis affects both the additional-rate threshold calculation and payment timing.

## Decision Points
1. Is the entity required to use lucro real (revenue above the threshold, financial institution, or other statutory requirement), or does it qualify for and elect lucro presumido? `CORPORATE_CONTEXT_REQUIRED` for the entity's actual revenue and activity classification.
2. If lucro real, which apuração periodicity applies (trimestral vs. anual com estimativas), and does that affect the additional-rate calculation basis?
3. If lucro presumido, which presumption percentage applies to this entity's specific business activity? VERIFY_CURRENT_T1_SOURCE — presumption percentages vary by activity and are not uniform.
4. Does the current profit exceed the additional-rate threshold for the period, triggering the additional IRPJ rate on the excess? VERIFY_CURRENT_T1_SOURCE for the current threshold value.
5. Does the entity fall into a differentiated-CSLL-rate category (financial institutions and equiparated entities)? VERIFY_CURRENT_T1_SOURCE for the current applicable rate.

## Required Facts
- Entity's gross revenue for the relevant threshold test, and its business activity classification.
- Whether the entity is a financial institution or equiparated entity (CSLL rate implications).
- The apuração period and periodicity elected/required.
- Current accounting profit (for lucro real) or gross revenue by activity (for lucro presumido).

## Required Evidence
- Financial statements supporting the accounting-profit base (lucro real) — see the `accounting-br` skill's references for the underlying recognition/measurement.
- Revenue records segmented by activity, where multiple presumption percentages could apply under lucro presumido.
- Documentation of the entity's regime election/requirement basis.

## Exceptions
- Certain entities (e.g., specific financial-sector, real-estate, or factoring activities) are statutorily required to use lucro real regardless of revenue size — do not assume revenue alone determines eligibility for lucro presumido.
- Lucro arbitrado may apply even to an entity that would otherwise qualify for lucro real or presumido, if bookkeeping is inadequate to support either — this is a fallback triggered by documentation failure, not a regime choice.

## Risk Considerations
- Applying a stale additional-rate threshold, base rate, or CSLL differentiated rate to a current-period calculation is a common, consequential error given periodic legislative/regulatory revision — always confirm current figures before a consequential calculation.
- Selecting lucro presumido without confirming the entity is not statutorily required to use lucro real (by activity type or revenue) risks a non-compliant regime election.
- Applying a single presumption percentage across an entity's mixed activities, without segmenting revenue by the applicable percentage for each activity, misstates the lucro presumido base.

## Human Escalation Conditions
Escalate for human tax review whenever: regime eligibility is genuinely ambiguous (borderline revenue, mixed activities); a lucro arbitrado trigger is identified; the additional-rate threshold or a differentiated CSLL rate calculation is material; or current rate/threshold figures cannot be confirmed against a current T1 source.

## Source IDs
`receita` (T1 — current IRPJ/CSLL rates, thresholds, and RIR/2018 regulatory text), `planalto` (T1 — Lei 9.249/1995, Decreto 9.580/2018; not independently re-fetched due to the persistent planalto.gov.br connection failure documented across this repository's labor-law references), `econet` (T3 — practical regime-comparison guidance; secondary only, never sole authority).

## Freshness Requirements
Critical. IRPJ/CSLL rates, the additional-rate threshold, presumption percentages by activity, and revenue-ceiling thresholds for lucro presumido eligibility are all subject to periodic legislative change; VERIFY_CURRENT_T1_SOURCE before any consequential calculation — this reference's cited figures (base rate, additional threshold, differentiated CSLL rate) are structural/illustrative, not asserted as currently binding without independent confirmation.

## Effective-Date Considerations
The lucro real/presumido/arbitrado structural framework (Lei 9.249/1995, Decreto 9.580/2018) is stable; the specific numeric parameters (rates, thresholds, presumption percentages) are the volatile element and are periodically revised by subsequent legislation/regulation — treat any specific number in this reference as requiring current verification, not as a fixed current fact. The tax-reform transition (`tax-reform-ibs-cbs.md`) does not directly restructure IRPJ/CSLL, which remain income-based taxes distinct from the consumption-tax reform, but monitor for any indirect interaction as the reform phases in.

## Related References
- `accounting-br` skill's references — for the accounting-profit base underlying lucro real.
- `pis-cofins.md` (this skill) — for the related but structurally distinct federal revenue-based contributions.
- `tax-reform-ibs-cbs.md` (this skill) — for the current 2026 transition context, even though IBS/CBS do not directly replace IRPJ/CSLL.

## Known Limitations
- Does not state a specific current IRPJ/CSLL rate, additional-rate threshold, or presumption percentage as a reliable current fact — per this reference's own repeated VERIFY_CURRENT_T1_SOURCE flags, always confirm against `receita` before a consequential calculation.
- Does not cover industry-specific presumption-percentage tables in full (they vary by activity code) — `CORPORATE_CONTEXT_REQUIRED`/VERIFY_CURRENT_T1_SOURCE for the entity's specific activity classification.
- Sourced from secondary summaries, not an independently re-fetched primary RIR/2018 text, in this research pass.
