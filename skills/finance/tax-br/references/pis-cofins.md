# PIS and Cofins (Contribuição para o PIS/Pasep e Cofins)

## Topics Covered
- PIS
- Cofins

## Purpose
Determine whether the cumulative or non-cumulative regime applies to a given entity/revenue stream, and the resulting credit-eligibility implications — before calculating or advising on a PIS/Cofins liability.

## When to Load
Load whenever a request involves PIS or Cofins — regime determination, credit eligibility, or rate application — before a consequential calculation.

## Scope
Covers Lei nº 9.718/1998 (cumulative regime origin), Lei nº 10.637/2002 (PIS não-cumulativo), and Lei nº 10.833/2003 (Cofins não-cumulativo). Does not cover the tax-reform transition that will eventually replace PIS/Cofins with CBS (see `tax-reform-ibs-cbs.md`, which governs the current 2026 test-rate phase and the eventual extinction timeline) or IRPJ/CSLL (see `irpj-csll.md`).

## Core Concepts
- **Regime cumulativo (Lei 9.718/1998)**: applies generally to entities on lucro presumido (and other statutorily-designated cases), taxing gross revenue without a credit mechanism — a single rate applied directly to revenue, no offsetting input credits.
- **Regime não-cumulativo (Lei 10.637/2002 for PIS; Lei 10.833/2003 for Cofins)**: applies generally to entities on lucro real (with statutory exceptions), taxing revenue at a higher combined rate than the cumulative regime, but allowing credits on specified inputs/costs to avoid cascading taxation across the production/service chain — the credit mechanism's specific eligible-input list is itself a frequent source of dispute (e insumos generating credit vs. not) and should be checked against current Receita Federal interpretation for a specific input.
- **Regime misto**: an entity with revenue streams subject to different regimes (e.g., some revenue types statutorily cumulative even for a lucro real entity) must segregate its calculation base by regime — do not apply a single regime's treatment to an entity's entire revenue indiscriminately without checking whether specific revenue types carry their own statutory regime assignment.
- **Rate structure**: the non-cumulative regime's combined PIS+Cofins rate is materially higher than the cumulative regime's combined rate (commonly cited on the order of roughly 9.25% combined non-cumulative vs. roughly 3.65% combined cumulative, per the base rates set by Leis 10.637/10.833 and 9.718 respectively) — VERIFY_CURRENT_T1_SOURCE before relying on a specific percentage in a consequential calculation, since rates and the credit list have been subject to legislative and regulatory change over time.
- **Créditos (non-cumulative regime)**: the "insumo" concept determining credit eligibility has been the subject of significant litigation and evolving interpretation (including a landmark STJ ruling establishing an essencialidade/relevância test for what qualifies as a creditable input) — do not apply a narrow or overly broad reading of "insumo" without checking current interpretive guidance for the specific cost/input in question.

## Decision Points
1. Is the entity on lucro real or lucro presumido (see `irpj-csll.md`), and does that determine its baseline PIS/Cofins regime (non-cumulative vs. cumulative)?
2. Does any specific revenue stream carry its own statutory regime assignment independent of the entity's general IRPJ regime, requiring regime segregation (regime misto)?
3. For a non-cumulative-regime entity, does a specific cost/input qualify as a creditable "insumo" under the current essencialidade/relevância standard?
4. What are the currently-applicable PIS and Cofins rates for the entity's regime? VERIFY_CURRENT_T1_SOURCE.
5. Given the tax-reform transition (`tax-reform-ibs-cbs.md`), is the analysis for a current-period transaction, where PIS/Cofins still applies (with CBS as a parallel test-rate charge in 2026), or a future period where CBS is expected to have replaced PIS/Cofins entirely?

## Required Facts
- The entity's IRPJ regime (lucro real/presumido), as the general PIS/Cofins-regime determinant.
- Revenue composition, to identify any stream carrying its own statutory regime assignment.
- For non-cumulative-regime entities: specific costs/inputs being evaluated for credit eligibility.
- The transaction date, relative to the tax-reform transition timeline (see `tax-reform-ibs-cbs.md`).

## Required Evidence
- Documentation of the entity's IRPJ regime election/requirement.
- Cost/input documentation supporting a credit claim, including its connection to the entity's core revenue-generating activity (for the essencialidade/relevância test).
- Revenue-stream classification records, where regime misto applies.

## Exceptions
- Certain revenue types (e.g., specific financial-institution revenue, some export revenue) carry statutory PIS/Cofins treatment that overrides the general lucro real/presumido-linked regime assignment — do not assume the general rule applies without checking for a specific statutory carve-out for the revenue type in question.
- Export revenue is generally exempt/zero-rated for PIS/Cofins purposes under specific statutory provisions — verify the current exact scope of this treatment before applying it broadly.

## Risk Considerations
- Applying the cumulative regime's simpler no-credit calculation to a non-cumulative-regime entity (or vice versa) produces a materially wrong liability, given the significant rate and credit-mechanism differences between the two regimes.
- Claiming credits for costs that do not meet the current essencialidade/relevância "insumo" standard risks disallowance on audit; conversely, failing to claim credits for costs that do qualify overstates the liability.
- Using stale rate figures given the multi-year, still-in-progress tax-reform transition (2026 test-rate phase through 2033 full implementation) risks a materially wrong calculation if the applicable-period context is not correctly identified.

## Human Escalation Conditions
Escalate for human tax review whenever: regime classification (cumulative/non-cumulative/misto) is genuinely ambiguous for a specific revenue stream; a material credit claim's "insumo" qualification is contested or unclear; or the transaction period's treatment under the ongoing tax-reform transition is uncertain.

## Source IDs
`receita` (T1 — current PIS/Cofins rates and interpretive guidance on créditos/insumos), `planalto` (T1 — Lei 9.718/1998, Lei 10.637/2002, Lei 10.833/2003; not independently re-fetched due to the persistent planalto.gov.br connection failure documented across this repository's labor-law references), `econet` (T3 — practical regime/credit guidance; secondary only, never sole authority).

## Freshness Requirements
Critical. Rates, the eligible-insumo interpretation, and the interaction with the ongoing tax-reform transition are all actively evolving; VERIFY_CURRENT_T1_SOURCE before any consequential calculation or credit-eligibility determination.

## Effective-Date Considerations
- **CURRENT (2026, transition phase)**: PIS and Cofins continue to apply under their existing cumulative/non-cumulative framework, while CBS is simultaneously charged at 2026 test rates (per `tax-reform-ibs-cbs.md`) — the two regimes coexist during this transition period, not a simple replacement yet.
- **SUPERSEDED milestones**: the cumulative-only Lei 9.718/1998 regime was the sole framework before Leis 10.637/2002 (PIS) and 10.833/2003 (Cofins) introduced the non-cumulative option/requirement for lucro real entities.
- **FUTURE (per the reform timeline)**: PIS and Cofins are expected to be extinguished and replaced by CBS as the multi-year transition (through approximately 2033 per current legislative design) completes — verify the current phase-out schedule against `tax-reform-ibs-cbs.md`'s sourcing before assuming PIS/Cofins no longer apply to any specific future-period transaction.

## Related References
- `irpj-csll.md` (this skill) — for the regime linkage between IRPJ election and PIS/Cofins regime.
- `tax-reform-ibs-cbs.md` (this skill) — for the CBS transition currently underway and its coexistence with PIS/Cofins during 2026 and beyond.

## Known Limitations
- Does not state specific current PIS/Cofins rates as reliable current fact — VERIFY_CURRENT_T1_SOURCE per this reference's own repeated flags.
- Does not resolve the "insumo" credit-eligibility question for any specific cost category exhaustively — the essencialidade/relevância standard is fact-specific and requires case-by-case analysis against current Receita Federal/judicial interpretation.
- Sourced from secondary summaries, not an independently re-fetched primary text of Leis 9.718/1998, 10.637/2002, or 10.833/2003, in this research pass.
