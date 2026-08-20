# Recognition and Measurement (Reconhecimento e Mensuração)

## Topics Covered
- recognition
- measurement

## Purpose
Determine whether an item qualifies for recognition in the financial statements and, if so, which measurement basis applies — the foundational analysis every other accounting-br reference (provisions, revenue, assets, depreciation, impairment) builds on.

## When to Load
Load whenever a request involves deciding whether to recognize an item at all, or which measurement basis (historical cost vs. current value) to apply — before applying any topic-specific standard (CPC 25 for provisions, CPC 47 for revenue, CPC 27 for fixed assets, etc.).

## Scope
Covers CPC 00 (R2) — Estrutura Conceitual para Relatório Financeiro — specifically its recognition criteria and measurement-basis framework. Does not cover the topic-specific recognition/measurement rules of individual standards (provisions in `accrual-provisions.md`, revenue in `revenue-expenses-cost.md`, fixed assets in `depreciation-impairment.md`) — this reference provides the general framework those apply.

## Core Concepts
- **Recognition (reconhecimento)**: the process of capturing an item for inclusion in the balance sheet or income statement/comprehensive income statement, once it meets the definition of an element (asset, liability, equity, income, or expense — see `assets-liabilities-equity.md`) and satisfies the recognition criteria. Under CPC 00 (R2), recognition is generally appropriate when it provides users with relevant information about the element and a faithful representation of it — a shift from the older "probable + reliably measurable" two-part test toward this cost-benefit/qualitative-characteristics framing; treat "probable economic benefit" language found in older secondary sources as historically accurate but not the current CPC 00 (R2) formulation.
- **Measurement (mensuração)**: the result of applying a measurement basis to an asset or liability and the corresponding income/expense.
- **Measurement bases — historical cost**: reflects, at least in part, the price of the transaction or event that gave rise to the item; does not reflect subsequent market-value changes except where impairment (see `depreciation-impairment.md`) or a specific standard requires remeasurement.
- **Measurement bases — current value**: includes fair value (the price that would be received to sell an asset or paid to transfer a liability in an orderly transaction between market participants at the measurement date), value in use / fulfilment value, and current cost. Each current-value basis answers a different question (market exit price vs. entity-specific value vs. replacement cost) and is not interchangeable with the others without a specific standard requiring that particular basis.
- **Basis selection is standard-specific, not a free choice**: CPC 00 (R2) describes the bases and the factors relevant to choosing among them, but the applicable basis for a specific asset/liability class is set by the specific standard governing that class (e.g., CPC 27 for property/plant/equipment generally uses historical cost with impairment; CPC 46/fair-value-specific standards apply fair value where required) — do not select a measurement basis from first principles when a specific CPC already prescribes one.

## Decision Points
1. Does the item meet the definition of an element (asset, liability, equity, income, expense)? If not, it cannot be recognized regardless of measurement considerations.
2. Does recognizing the item provide relevant, faithfully-representative information, per CPC 00 (R2)'s current recognition framework?
3. Does a specific standard (CPC 25, CPC 47, CPC 27, CPC 16, etc.) already prescribe the applicable measurement basis for this item's class? If so, apply that standard's basis rather than reasoning from CPC 00 (R2) alone.
4. If no specific standard directly addresses the item, which measurement basis (historical cost, fair value, value in use/fulfilment value, current cost) best serves the qualitative characteristics of relevant, faithful information for this specific item?

## Required Facts
- The nature of the item and which element definition it potentially satisfies.
- Whether a specific CPC standard already governs this item's class and prescribes its measurement basis.
- The transaction/event data needed to apply the selected measurement basis (transaction price for historical cost; market/valuation data for fair value).

## Required Evidence
- Source documentation for the underlying transaction or event.
- The specific CPC standard identified as governing this item's recognition/measurement, where one applies.
- Valuation support, where a current-value basis (fair value, value in use) is being applied.

## Exceptions
- Some items explicitly fail recognition criteria under a specific standard even though they meet a general element definition (e.g., certain internally-generated intangibles under CPC 04, contingent assets under CPC 25 — see `accrual-provisions.md`) — always check the applicable specific standard's own recognition exceptions before concluding an item should be recognized.

## Risk Considerations
- Applying an outdated two-part "probable + reliably measurable" recognition test without checking whether CPC 00 (R2)'s current framing (relevance + faithful representation) changes the analysis is a common error when relying on older secondary material.
- Selecting a measurement basis by general reasoning when a specific standard already prescribes one overrides that standard's actual requirement and produces a non-compliant measurement.
- Conflating fair value with value in use (or with current cost) — they answer different valuation questions and are not interchangeable inputs.

## Human Escalation Conditions
Escalate for human accounting review whenever: an item's recognition is genuinely ambiguous under the current CPC 00 (R2) framework; no specific standard clearly governs the item's measurement basis; or a current-value measurement requires a valuation judgment beyond what available evidence supports.

## Source IDs
`cpc` (T1 — CPC 00 (R2), Estrutura Conceitual para Relatório Financeiro), `cfc` (T1 — NBC TG structure adopting CPC pronouncements), `fipecafi` (T3 — practical application guidance; secondary only, never sole authority for a recognition/measurement conclusion).

## Freshness Requirements
Critical. CPC 00 has been revised (R2 reflects the current version referenced here); confirm the currently-applicable CPC 00 revision and any subsequent amendment before relying on this reference's recognition-criteria framing for a consequential conclusion.

## Effective-Date Considerations
CPC 00 (R2) is the current conceptual-framework revision referenced in this document's research; an entity applying an older revision (or transitioning between revisions) should confirm which version governs its reporting period before applying this reference's recognition criteria verbatim — do not assume R2's specific formulation applies retroactively to a prior-period analysis without checking which framework version was in force then.

## Related References
- `accrual-provisions.md` (this skill) — for the accrual basis and provision-specific recognition criteria (CPC 25) that build on this general framework.
- `revenue-expenses-cost.md` (this skill) — for CPC 47's specific revenue-recognition model.
- `assets-liabilities-equity.md` (this skill) — for the element definitions this recognition framework applies to.
- `depreciation-impairment.md` (this skill) — for CPC 27/CPC 01's specific measurement treatment of fixed assets.
- `financial-statements.md` (this skill) — for how recognized, measured items are presented.

## Known Limitations
- Does not reproduce CPC 00 (R2)'s full conceptual framework (qualitative characteristics, reporting entity concept, elements definitions in full) — focused specifically on the recognition/measurement sections relevant to routing other references.
- Does not resolve which specific measurement basis a not-yet-identified standard would require for a novel item class — that requires identifying the governing standard first.
- Sourced from secondary summaries of CPC 00 (R2), not an independently re-fetched primary CPC text in this research pass; re-verify against `cpc`/`cfc` directly for a consequential conclusion.
