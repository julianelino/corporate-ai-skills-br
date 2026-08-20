# Accrual and Provisions (Regime de Competência e Provisões)

## Topics Covered
- accrual
- provisions

## Purpose
Determine whether a transaction should be recorded under the accrual (competência) basis rather than cash timing, and whether an uncertain obligation qualifies as a provision, a contingent liability (disclosed, not recognized), or a contingent asset (generally not recognized) — before recording a period-end adjustment or an uncertain-obligation entry.

## When to Load
Load whenever a request involves timing a transaction's recognition relative to cash flow (accrual questions), or evaluating an uncertain future obligation or potential inflow (provisions/contingencies) — before recording an accrual entry or a provision.

## Scope
Covers Lei nº 6.404/1976, Art. 177 (regime de competência) and CPC 25 (Provisões, Passivos Contingentes e Ativos Contingentes). Does not cover the general recognition/measurement framework those apply within (see `recognition-measurement.md`) or revenue-specific accrual timing under CPC 47 (see `revenue-expenses-cost.md`).

## Core Concepts
- **Regime de competência (Lei 6.404/76, Art. 177)**: Brazilian corporate bookkeeping must register patrimonial mutations under the accrual basis — transactions and events are recognized when they occur, not necessarily when cash is received or paid. This is a statutory requirement for sociedades anônimas and, by extension through CFC/CPC adoption, the general accounting standard for entities following Brazilian GAAP.
- **Provisões (CPC 25)**: a provision is a liability of uncertain timing or amount, arising from a past event, whose settlement is expected to require an outflow of resources. Recognition requires: (1) a present obligation (legal or constructive) from a past event; (2) it is probable that an outflow of resources will be required to settle it; (3) a reliable estimate of the amount can be made. All three conditions must be satisfied — failing any one means no provision should be recognized.
- **Passivos contingentes**: possible obligations arising from past events whose existence depends on the occurrence of uncertain future events not wholly within the entity's control, or present obligations that either are not probable to require an outflow or cannot be reliably measured. Contingent liabilities are not recognized in the balance sheet — they are disclosed in notes, unless the possibility of an outflow is remote.
- **Ativos contingentes**: possible assets arising from past events whose existence depends on uncertain future events. Contingent assets are not recognized in the balance sheet (to avoid recognizing income that may never be realized) — disclosed only when the inflow is probable, and recognized only when realization becomes virtually certain (at which point it is no longer, by definition, contingent).
- **Constructive obligation**: an obligation can arise not only from law/contract but from an entity's established pattern of past practice, published policies, or a sufficiently specific current statement that creates a valid expectation in other parties that it will discharge those responsibilities — relevant for provisions like restructuring costs voluntarily announced, not just legally mandated ones.

## Decision Points
1. Does the transaction/event need to be recorded in the current period under the accrual basis, even if cash has not yet moved? What period does the underlying economic event actually belong to?
2. For an uncertain obligation: is there a present obligation from a past event (not merely a future intention)?
3. Is an outflow of resources probable (not merely possible) to settle the obligation?
4. Can the amount be reliably estimated? If any of the three provision conditions fails, does the item instead qualify for contingent-liability disclosure (or no disclosure at all, if remote)?
5. For a potential inflow: is it merely possible (no recognition, and disclosure only if probable) or virtually certain (recognition as an asset, at which point it is no longer contingent)?

## Required Facts
- The underlying event/transaction and the period it economically belongs to (for accrual timing).
- Whether a present legal or constructive obligation exists, and its origin (contract, law, established practice, public commitment).
- The estimated probability of an outflow (or inflow, for contingent assets) and whether a reliable amount estimate is possible.
- Any change in circumstances since a prior period that would move an item between provision / contingent liability / no disclosure / contingent asset / recognized asset.

## Required Evidence
- Documentation supporting the obligating event (contract, legal claim, public announcement, established policy).
- The basis for the outflow/inflow probability assessment (legal opinion, historical experience, expert estimate).
- The basis for the amount estimate, where a provision is being recognized.

## Exceptions
- A provision should not be recognized for future operating losses (they do not arise from a past obligating event) — only for a present obligation to a third party, not merely an expectation of future costs from continuing operations.
- A restructuring provision requires a sufficiently detailed formal plan and a valid expectation created in those affected (e.g., through announcement) — a mere management decision or board intention without that external communication does not yet create a constructive obligation.

## Risk Considerations
- Recognizing a provision for a merely possible (not probable) obligation overstates liabilities and understates results — a common error when caution is over-applied without checking the actual probability threshold.
- Failing to recognize a provision that does meet all three CPC 25 conditions, out of excess caution about uncertainty, understates liabilities — uncertainty in amount does not by itself prevent recognition if a reliable estimate is still possible (even if only a range).
- Recognizing a contingent asset before realization is virtually certain violates CPC 25's asymmetric treatment of contingent assets vs. liabilities and overstates assets/income prematurely.

## Human Escalation Conditions
Escalate for human accounting/legal review whenever: an obligation's probability assessment is genuinely uncertain (borderline probable/possible); a restructuring or legal-claim provision involves material amounts; or a contingent item's classification could materially affect reported results and lacks clear supporting evidence.

## Source IDs
`planalto` (T1 — Lei 6.404/1976, Art. 177; not independently re-fetched due to the persistent planalto.gov.br connection failure documented across this repository's labor-law references, and not independently re-verified for this accounting-specific citation either), `cpc` (T1 — CPC 25), `cfc` (T1 — NBC TG adopting CPC 25), `fipecafi` (T3 — practical application guidance; secondary only).

## Freshness Requirements
Critical. CPC 25's probability thresholds and disclosure requirements should be re-verified against a current T1 source before a consequential provision/contingency classification, especially for material or legally-contested amounts.

## Effective-Date Considerations
Lei 6.404/1976's accrual-basis requirement (Art. 177) is a long-standing, stable statutory rule. CPC 25 itself is a stable pronouncement in the Brazilian CPC/IFRS-convergence framework (converged with IAS 37); confirm no subsequent CPC revision has altered specific thresholds before relying on this reference for a consequential, high-value classification.

## Related References
- `recognition-measurement.md` (this skill) — for the general recognition-criteria framework this reference's provision-specific conditions build on.
- `revenue-expenses-cost.md` (this skill) — for accrual timing specific to revenue and expense recognition (CPC 47, CPC 16).
- `financial-statements.md` (this skill) — for how provisions and contingencies are presented/disclosed.
- `corporate-risk` skill — for the broader risk-assessment framing of a contingent liability's likelihood/impact, distinct from its accounting classification.

## Known Limitations
- Does not independently re-verify the exact current CPC 25 text against a primary source in this research pass; sourced from secondary summaries of the pronouncement.
- Does not cover industry-specific provision guidance (e.g., insurance technical provisions, decommissioning-specific provisions) beyond the general CPC 25 framework.
- Does not resolve the probability threshold ("probable" vs. "possible" vs. "remote") with a fixed numeric percentage — CPC 25 itself does not set one, and any specific percentage cited elsewhere should be treated as a practical heuristic, not a binding rule.
