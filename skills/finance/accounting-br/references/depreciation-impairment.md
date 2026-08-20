# Depreciation and Impairment (Depreciação e Redução ao Valor Recuperável)

## Topics Covered
- depreciation
- impairment

## Purpose
Determine the correct depreciation treatment for a fixed asset (method, useful life, residual value) under CPC 27, and when an impairment test (CPC 01) is required and how it affects the asset's carrying amount — before recording periodic depreciation or an impairment adjustment.

## When to Load
Load whenever a request involves depreciating a fixed asset (ativo imobilizado) or assessing whether an asset's recoverable amount is below its carrying amount — before recording a depreciation entry or an impairment loss/reversal.

## Scope
Covers CPC 27 (Ativo Imobilizado) for depreciation, and CPC 01 (Redução ao Valor Recuperável de Ativos, converged with IAS 36) for impairment. Does not cover the initial recognition/measurement of the fixed asset itself (see `recognition-measurement.md`, `assets-liabilities-equity.md`) or intangible-asset-specific amortization rules (a related but distinct CPC 04 framework not detailed here).

## Core Concepts
- **Depreciação (CPC 27)**: the systematic allocation of an asset's depreciable amount (cost less residual value) over its useful life, reflecting the pattern in which the asset's future economic benefits are expected to be consumed. Multiple methods (straight-line, diminishing-balance, units-of-production) are permitted, provided the chosen method reflects that consumption pattern — not chosen merely for tax convenience.
- **Mandatory annual review**: CPC 27 requires the useful life, residual value, and depreciation method to be reviewed at least at each financial year-end; a change is accounted for prospectively as a change in accounting estimate only when current estimates differ significantly from previous ones — not retrospectively restated, and not changed merely because a different method would produce a more favorable current-period result.
- **CPC 27 and CPC 01 — complementary, not overlapping**: CPC 27 governs routine, expected value consumption (depreciation); CPC 01 is triggered when there are indications the asset's carrying amount may not be recoverable through use or sale — an exceptional, indicator-driven assessment distinct from routine depreciation. Depreciation continues even while an impairment indicator is being assessed; the two are not mutually exclusive in the same period.
- **Recoverable amount (CPC 01)**: the higher of an asset's fair value less costs of disposal and its value in use (the present value of future cash flows expected from the asset). If the carrying amount exceeds the recoverable amount, an impairment loss is recognized for the difference, reducing the asset's carrying amount (and, correspondingly, prospective depreciation charges going forward).
- **Impairment indicators**: CPC 01 requires assessing, at each reporting date, whether indications exist that an asset may be impaired (external indicators like market value decline, adverse technological/legal/economic changes; internal indicators like physical damage, obsolescence, or evidence the asset's economic performance is worse than expected) — the full recoverable-amount calculation is only required when an indicator is present (except for specific asset classes, such as goodwill, requiring an annual test regardless of indicators).
- **Reversal**: an impairment loss (other than for goodwill, which is never reversed) may be reversed in a later period if the estimates used to determine recoverable amount have changed — but the reversal is capped at the carrying amount that would have resulted (net of depreciation) had no impairment loss been recognized in prior periods.

## Decision Points
1. What depreciation method best reflects this specific asset's actual economic-benefit consumption pattern, and has it been reviewed for continued appropriateness at the most recent year-end?
2. Has the useful life or residual value estimate changed significantly enough to require a prospective adjustment?
3. Do any external or internal impairment indicators exist for this asset as of the reporting date? (For goodwill or other CPC-01-designated classes, is the mandatory annual test — indicator or not — being performed?)
4. If an indicator exists, what is the asset's recoverable amount (higher of fair value less disposal costs and value in use), and does it fall below carrying amount?
5. If a prior impairment loss exists and circumstances have changed, does a reversal apply, and is it correctly capped at the no-impairment depreciated carrying amount?

## Required Facts
- The asset's cost, useful life, residual value, and depreciation method currently applied.
- Any indicators (external or internal) suggesting a possible impairment.
- For an impairment test: fair value less disposal costs and/or value-in-use cash-flow projections and discount rate.
- Prior impairment history for the asset, relevant to a potential reversal calculation.

## Required Evidence
- Asset register/records supporting cost, accumulated depreciation, useful life, and method.
- Documentation supporting any change in useful life/residual value/method estimate.
- Valuation support (market data for fair value less disposal costs; cash-flow projections and discount-rate basis for value in use) where an impairment test is performed.

## Exceptions
- Land is generally not depreciated (indefinite useful life) unless it is subject to depletion (e.g., mining/quarry land) — do not apply a standard depreciation schedule to land without confirming this exception doesn't apply.
- Goodwill and indefinite-useful-life intangible assets require an annual impairment test regardless of whether any indicator is present, and goodwill impairment is never reversed — do not apply the general indicator-driven, reversible framework to these specific asset classes.

## Risk Considerations
- Changing a depreciation method or useful life primarily to manage reported results, rather than because the estimate genuinely changed, misstates the systematic-allocation principle CPC 27 requires.
- Failing to assess impairment indicators at each reporting date (treating impairment as a one-time event rather than an ongoing assessment obligation) risks carrying an asset above its actual recoverable amount for extended periods.
- Reversing an impairment loss above the capped no-impairment depreciated carrying amount, or reversing a goodwill impairment at all, both violate CPC 01's specific reversal restrictions.

## Human Escalation Conditions
Escalate for human accounting review whenever: a useful-life or method change is proposed and its business justification (versus a results-management motive) is unclear; an impairment indicator is identified and the recoverable-amount estimate requires material judgment (cash-flow projections, discount rate); or a goodwill/indefinite-life-intangible annual test produces a borderline result.

## Source IDs
`cpc` (T1 — CPC 27, CPC 01), `cfc` (T1 — NBC TG adopting these pronouncements), `fipecafi` (T3 — practical application guidance; secondary only, never sole authority for a depreciation/impairment conclusion).

## Freshness Requirements
Critical, specifically for impairment testing (a judgment-intensive, frequently-audited area) — re-verify the current CPC 01/CPC 27 text and any subsequent interpretive guidance against a T1 source before a consequential test or method change.

## Effective-Date Considerations
CPC 27 and CPC 01 are stable, IFRS-converged pronouncements (IAS 16 and IAS 36 respectively) within the current Brazilian CPC framework; confirm no subsequent CPC revision has altered specific mechanics (e.g., the annual review requirement, indicator lists) before relying on this reference for a consequential, high-value determination.

## Related References
- `recognition-measurement.md` (this skill) — for the initial recognition/measurement basis (generally historical cost) this reference's depreciation/impairment treatment builds on.
- `assets-liabilities-equity.md` (this skill) — for the ativo imobilizado classification this reference applies to.
- `financial-statements.md` (this skill) — for how depreciation and impairment are presented and disclosed.

## Known Limitations
- Does not cover intangible-asset-specific amortization (CPC 04) in detail, beyond noting goodwill's distinct never-reversed treatment under CPC 01.
- Sourced from secondary summaries of CPC 27 and CPC 01, not an independently re-fetched primary text in this research pass; re-verify against `cpc`/`cfc` directly for a consequential conclusion.
- Does not detail the specific cash-generating-unit (CGU) allocation mechanics required when an asset does not generate independent cash inflows — a common complexity in real impairment tests not resolved here.
