# Assets, Liabilities, and Equity (Ativo, Passivo e Patrimônio Líquido)

## Topics Covered
- assets
- liabilities
- equity

## Purpose
Determine whether an item is an asset, a liability, or part of equity, and how it should be classified/grouped within the balance sheet structure — the structural foundation for every balance-sheet-facing question, distinct from the recognition/measurement question of whether and how to record it.

## When to Load
Load whenever a request involves classifying an item as an asset, a liability, or equity, or determining its balance-sheet grouping (circulante vs. não circulante; which equity sub-account) — before applying a topic-specific standard (provisions, revenue, depreciation) that assumes the element classification is already settled.

## Scope
Covers CPC 00 (R2)'s element definitions and Lei nº 6.404/1976, Art. 178 (balance sheet structure and grouping). Does not cover whether a specific item should be recognized or how it should be measured (see `recognition-measurement.md`) or how these elements roll up into the full set of financial statements (see `financial-statements.md`).

## Core Concepts
- **Ativo (asset)**: a present economic resource controlled by the entity as a result of past events, where an economic resource is a right that has the potential to produce economic benefits. Control, a past event, and future economic-benefit potential are all required — an item lacking any one of these is not an asset regardless of how it is labeled internally.
- **Passivo (liability)**: a present obligation of the entity to transfer an economic resource as a result of past events. Like assets, requires a present obligation (not merely a future intention) arising from a past event.
- **Patrimônio líquido (equity)**: the residual interest in the assets of the entity after deducting all its liabilities — a derived, not independently defined, element; equity is whatever remains after assets and liabilities are correctly determined, not a separately assessed category.
- **Balance sheet grouping (Lei 6.404/76, Art. 178)**: assets are presented in decreasing order of liquidity, grouped as ativo circulante and ativo não circulante (itself subdivided into realizável a longo prazo, investimentos, imobilizado, and intangível). Liabilities and equity are grouped as passivo circulante, passivo não circulante, and patrimônio líquido (subdivided into capital social, reservas de capital, ajustes de avaliação patrimonial, reservas de lucros, ações em tesouraria, and prejuízos acumulados).
- **Circulante vs. não circulante**: the circulante/não circulante split turns on the operating cycle and a (commonly cited) 12-month realization/settlement horizon — an asset expected to be realized, or a liability expected to be settled, within the entity's normal operating cycle or within 12 months (whichever is longer) is classified as circulante; otherwise não circulante. Verify the specific current classification criteria against CPC 26 for edge cases (e.g., a liability refinanced after the reporting date but before issuance).

## Decision Points
1. Does the item represent a present right (economic resource) under the entity's control from a past event (asset), a present obligation to transfer a resource from a past event (liability), or is it simply the residual after correctly determining assets and liabilities (equity)?
2. If an asset or liability, does it belong in circulante or não circulante, based on the operating cycle / 12-month horizon test?
3. If equity, which specific sub-account (capital social, reservas, ajustes de avaliação patrimonial, prejuízos acumulados) does it belong to, per Art. 178's structure?
4. Does the item's substance match its label, or does a superficially asset-like or liability-like item actually fail the control/obligation/past-event test (e.g., a mere future commitment with no present obligation)?

## Required Facts
- The item's substance: what right or obligation it actually represents, and from what past event it arises.
- Whether the entity has control (for an asset) or a present obligation (for a liability), as opposed to merely an expectation or intention.
- The expected realization/settlement timeframe, for the circulante/não circulante classification.
- For an equity item, which specific transaction or event it originates from (capital contribution, retained earnings, revaluation adjustment).

## Required Evidence
- Documentation establishing control (asset) or the obligating event (liability) — contracts, title documents, legal obligations, board resolutions for equity transactions.
- Evidence supporting the expected realization/settlement timeframe for circulante/não circulante classification.
- Corporate resolutions or shareholder agreements supporting equity sub-account classification (capital social changes, reserve constitution).

## Exceptions
- An item an entity merely intends to acquire or is contractually committed to acquire in the future is generally not yet an asset until the control/past-event conditions are actually met — a signed purchase commitment alone does not create a present asset for the buyer (though it may create other disclosure obligations).
- A liability refinanced on a long-term basis after the reporting period, but before the financial statements are authorized for issue, may still require classification based on conditions existing at the reporting date under specific balance-sheet-date rules — this is a recognized edge case requiring CPC 26-specific analysis, not a default classification either way.

## Risk Considerations
- Classifying an item based on its accounting label or historical treatment rather than its actual current substance (control/obligation/past-event test) is a common, consequential misclassification risk.
- Misclassifying circulante/não circulante distorts liquidity ratios and working-capital analysis derived from the balance sheet — a material misclassification can mislead financial-statement users even when total assets/liabilities are correct.
- Treating equity as an independently-assessed category, rather than the residual of correctly-determined assets and liabilities, risks compounding any upstream asset/liability misclassification into the equity figure as well.

## Human Escalation Conditions
Escalate for human accounting review whenever: an item's asset/liability/equity classification is genuinely ambiguous (e.g., a hybrid financial instrument, a complex contractual arrangement); a circulante/não circulante boundary case involves a material amount; or an equity transaction's sub-account classification affects distributable-reserves analysis.

## Source IDs
`cpc` (T1 — CPC 00 (R2) element definitions), `planalto` (T1 — Lei 6.404/1976, Art. 178; not independently re-fetched due to the persistent planalto.gov.br connection failure documented across this repository's labor-law references), `cfc` (T1 — NBC TG structure adopting these definitions), `fipecafi` (T3 — practical classification guidance; secondary only).

## Freshness Requirements
Critical for the specific circulante/não circulante boundary tests and any recent amendment to Art. 178's equity sub-account structure; standard for the core element definitions themselves, which are stable conceptual-framework content.

## Effective-Date Considerations
CPC 00 (R2)'s asset/liability definitions (control-based, "potential to produce economic benefits" framing) reflect the current conceptual framework revision; an entity or analysis relying on an older framework revision's definitions (which historically emphasized "probable future economic benefit" more directly in the definition itself, rather than in the separate recognition criteria) should confirm which revision governs before treating the two framings as interchangeable. Lei 6.404/1976 Art. 178's balance-sheet grouping structure reflects amendments through Lei 11.638/2007 and Lei 11.941/2009's IFRS-convergence changes; confirm no more recent amendment has altered the specific groupings before relying on this reference for a consequential structural question.

## Related References
- `recognition-measurement.md` (this skill) — for whether and how a classified item should actually be recognized and measured.
- `accrual-provisions.md` (this skill) — for provisions/contingencies as a specific liability/non-liability classification question.
- `financial-statements.md` (this skill) — for how these elements are presented in the full set of financial statements.
- `depreciation-impairment.md` (this skill) — for the specific measurement treatment of the imobilizado asset sub-group over time.

## Known Limitations
- Does not resolve complex hybrid-instrument classification (e.g., convertible debt with equity features) — this requires dedicated, standard-specific analysis (CPC 39/CPC 48 financial-instruments framework) not covered here.
- Sourced from secondary summaries of CPC 00 (R2) and Lei 6.404/76 Art. 178, not an independently re-fetched primary text in this research pass; re-verify against `cpc`/`cfc` directly for a consequential classification.
- Does not cover sector-specific balance-sheet presentation variations (e.g., financial institutions under Bacen's COSIF plan, which differs from the general Lei 6.404/76 structure).
