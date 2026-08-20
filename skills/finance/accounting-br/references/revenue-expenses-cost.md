# Revenue, Expenses, and Cost (Receita, Despesa e Custo)

## Topics Covered
- revenue
- expenses
- cost

## Purpose
Determine when and how much revenue to recognize from a contract with a customer, distinguish cost (custo, generally inventoriable/product-related) from expense (despesa, generally period-related), and apply the correct timing for each — before recording a sale, a cost of goods/services, or a period expense.

## When to Load
Load whenever a request involves recognizing revenue from a customer contract, classifying an outflow as cost vs. expense, or timing an expense's recognition — before recording the entry or advising on its accounting treatment.

## Scope
Covers CPC 47 (Receita de Contrato com Cliente, converged with IFRS 15) for revenue, and CPC 16 (Estoques) for the cost concept as it relates to inventoriable production/acquisition cost. Does not cover the general accrual-timing framework those operate within (see `accrual-provisions.md`) or the element definitions of income/expense as balance-sheet-adjacent concepts (see `assets-liabilities-equity.md`, `recognition-measurement.md`).

## Core Concepts
- **CPC 47's five-step model**: (1) identify the contract with the customer; (2) identify the performance obligations in the contract; (3) determine the transaction price; (4) allocate the transaction price to the performance obligations; (5) recognize revenue as (or when) each performance obligation is satisfied. Revenue recognition timing is driven by transfer of control of the promised good or service to the customer — not by invoicing, cash receipt, or shipment alone, which are all distinct events that may or may not coincide with control transfer.
- **Point in time vs. over time**: a performance obligation is satisfied over time if specific criteria are met (e.g., the customer simultaneously receives and consumes the benefits as the entity performs, or the entity's performance creates/enhances an asset the customer controls as it is created, or the asset has no alternative use to the entity and the entity has an enforceable right to payment for performance completed to date); otherwise, it is satisfied at a point in time — this distinction is central to construction contracts, long-term service arrangements, and license agreements, and should not be assumed either way without checking the specific criteria against the contract's actual terms.
- **Variable consideration**: transaction price may include variable elements (discounts, rebates, refunds, performance bonuses); CPC 47 requires estimating variable consideration and constraining the estimate to the amount highly probable not to result in a significant reversal — recognizing the full undiscounted variable amount without this constraint overstates revenue.
- **Custo (cost) — CPC 16 framing**: cost, in the inventoriable sense under CPC 16, comprises all costs of purchase, costs of conversion, and other costs incurred in bringing inventories to their present location and condition — this becomes an asset (inventory) until the related goods are sold, at which point it is recognized as an expense (custo dos produtos/serviços vendidos) matched against the corresponding revenue.
- **Despesa (expense) vs. custo — the matching distinction**: cost is generally associated with production/acquisition of goods or services intended for sale (capitalized as inventory until sale); expense (despesa) is generally a period cost not directly tied to producing a specific good/service for sale (e.g., administrative, selling, and general expenses) and is recognized in the period incurred rather than deferred as inventory. Misclassifying a period expense as inventoriable cost (or vice versa) distorts both the balance sheet (inventory valuation) and the income statement (timing of expense recognition).

## Decision Points
1. Does a contract with a customer exist, and what are its distinct performance obligations?
2. For each performance obligation, is control transferred over time (per the specific CPC 47 criteria) or at a point in time?
3. Does the transaction price include variable consideration, and if so, has it been estimated and constrained per CPC 47's requirement before being recognized?
4. Is a given outflow a cost (inventoriable, tied to producing a specific good/service for sale) or an expense (period-based, not tied to a specific saleable output)? This determines whether it is capitalized into inventory or expensed immediately.
5. Has revenue been recognized based on actual control transfer, rather than merely on invoicing or cash receipt timing?

## Required Facts
- The contract's terms: goods/services promised, price, and any variable-consideration elements (discounts, penalties, bonuses).
- Evidence of control transfer (delivery, acceptance, usage rights, or the specific over-time criteria being met).
- Whether a specific outflow is tied to producing/acquiring a good or service intended for sale (cost) or is a period-based operating outflow (expense).

## Required Evidence
- The customer contract and its specific performance-obligation terms.
- Documentation of control-transfer events (delivery receipts, acceptance certificates, usage logs for over-time recognition).
- Cost-accumulation records supporting inventoriable cost classification (purchase invoices, production cost records).

## Exceptions
- Contracts with multiple performance obligations may require allocating a single transaction price across obligations based on relative standalone selling prices — do not treat a bundled contract's total price as attributable entirely to a single obligation without performing this allocation.
- Long-term construction/service contracts with over-time recognition require ongoing progress measurement (input or output methods) — a point-in-time "delivery" mindset misapplied to an over-time contract materially misstates the revenue-recognition pattern.

## Risk Considerations
- Recognizing revenue at invoicing or cash receipt rather than at actual control transfer is a common, consequential timing error, particularly for advance billings or deferred-delivery arrangements.
- Recognizing full variable consideration without applying CPC 47's constraint (highly-probable-no-significant-reversal) overstates revenue in periods before the variability resolves.
- Capitalizing period expenses as inventoriable cost (or vice versa) distorts both balance-sheet inventory valuation and income-statement timing, and can mask or manufacture profitability trends.

## Human Escalation Conditions
Escalate for human accounting review whenever: a contract's performance-obligation identification or over-time-vs-point-in-time classification is genuinely ambiguous; variable consideration is material and its constraint estimate is uncertain; or a cost/expense classification materially affects reported inventory valuation or period results.

## Source IDs
`cpc` (T1 — CPC 47, CPC 16), `cfc` (T1 — NBC TG adopting these pronouncements), `fipecafi` (T3 — practical application guidance; secondary only, never sole authority for a revenue-recognition conclusion).

## Freshness Requirements
Critical. Revenue recognition is a frequently audited and disputed area; re-verify the current CPC 47 text and any subsequent interpretive guidance against a T1 source before a consequential revenue-timing conclusion, especially for complex or long-term contracts.

## Effective-Date Considerations
CPC 47 (converged with IFRS 15) represents the current revenue-recognition framework, having superseded the prior CPC 30 (Receitas) and CPC 17 (Contratos de Construção) framework — an analysis relying on the pre-CPC-47 model (which used a different, less structured recognition approach) should not be applied to a current-period contract. Confirm which framework governed a specific historical transaction if a retrospective question arises, rather than assuming CPC 47 applied throughout.

## Related References
- `accrual-provisions.md` (this skill) — for the general accrual-timing principle revenue and expense recognition both operate within.
- `recognition-measurement.md` (this skill) — for the general recognition-criteria framework CPC 47's five-step model specializes.
- `assets-liabilities-equity.md` (this skill) — for inventory's classification as an asset until the related cost is expensed.
- `financial-statements.md` (this skill) — for how revenue, cost, and expense roll up into the DRE (income statement).

## Known Limitations
- Does not cover industry-specific revenue arrangements in depth (e.g., long-term real-estate development contracts, which have specific interpretive guidance beyond the general CPC 47 model).
- Sourced from secondary summaries of CPC 47 and CPC 16, not an independently re-fetched primary text in this research pass; re-verify against `cpc`/`cfc` directly for a consequential conclusion.
- Does not resolve the specific standalone-selling-price allocation methodology for multi-element contracts — this requires case-specific valuation analysis beyond this reference's general framework.
