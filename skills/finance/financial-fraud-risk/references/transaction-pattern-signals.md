# Transaction Pattern Signals (Split Payments, Manual Entries, Round Amounts)

## Topics Covered
- split payments
- manual entries
- round amounts

## Purpose
Establish how to triage three related transaction-structure signals — split payments (fatiamento), manual entries, and round amounts — each of which can indicate deliberate control evasion but each of which also has substantial benign explanation, requiring case-specific evaluation rather than automatic escalation.

## When to Load
Load whenever a request involves a payment/transaction split across multiple smaller amounts, a manually-entered (non-system-generated) transaction, or a transaction with a suspiciously round amount, flagged as a risk signal — before characterizing the pattern or recommending any action.

## Scope
Covers the risk-signal triage discipline for these three transaction-structure patterns. Does not cover supplier/bank-detail-specific signals (see `duplicate-signals.md`, `bank-changes.md`) or user/timing-behavioral signals (see `behavioral-signals.md`), though all frequently co-occur and should be cross-checked.

## Core Concepts
- **Split payments (fatiamento)**: dividing what should logically be a single transaction into multiple smaller ones — the fraud-relevant version of this pattern is structuring specifically to fall under an approval threshold (e.g., three payments of an amount each individually below a required dual-approval limit, summing to an amount that would have required it) — this is a deliberate control-evasion pattern when it occurs. However, genuinely separate transactions (multiple distinct invoices from the same vendor in the same period, a legitimately phased delivery/milestone-based contract) can produce a similar-looking pattern without any evasive intent — the distinguishing question is whether the split corresponds to genuinely separate obligations or artificially divides one.
- **Manual entries**: a transaction entered directly (bypassing the normal system-generated workflow from an approved invoice/PO) is inherently higher-risk because it skips the standard controls embedded in the normal workflow — but manual entries also have entirely legitimate uses (correcting a system error, recording an unusual one-off transaction the standard workflow doesn't accommodate, period-end adjustments per the `accounting-br` skill's `accrual-provisions.md` framework). The distinguishing question is whether the manual entry has its own documented justification and independent review, substituting for the bypassed standard controls, or whether it was made without any compensating control.
- **Round amounts**: a transaction for a suspiciously round figure (e.g., exactly R$ 10.000,00) is a recognized fraud-examination heuristic, since genuine commercial transactions (with taxes, discounts, quantities) rarely produce perfectly round totals, while a fabricated or estimated fraudulent transaction often does — but round amounts also occur legitimately (a genuinely round-number service fee, a deliberately-set contractual round figure, an advance/retainer payment) — this signal alone is weak and should essentially never be escalated in isolation; it functions best as a weight added to another, more substantive signal.
- **Combining signals changes the analysis**: any one of these three patterns alone is a weak-to-moderate signal with substantial benign-explanation likelihood; two or more co-occurring (e.g., a round-amount, manually-entered transaction split into three payments under a threshold) meaningfully raises the pattern from anomaly toward indicator — the triage discipline should explicitly check for this co-occurrence rather than evaluating each pattern in isolation.

## Decision Points
1. For a split-payment pattern: does each component correspond to a genuinely separate obligation (distinct invoice, distinct milestone), or does the total suspiciously align with just-under an approval threshold?
2. For a manual entry: does it carry its own documented justification and independent review compensating for the bypassed standard workflow controls?
3. For a round amount: is this an isolated occurrence, or does it co-occur with another signal (split payment, manual entry, unusual user, weekend timing)?
4. Across all three: has a plausible, checkable benign explanation been identified and either confirmed or ruled out before elevating the pattern?
5. Does the combination of signals present here meet the threshold this skill's policy sets for escalation, or does it remain at anomaly level pending further, low-key monitoring?

## Required Facts
- For split payments: the underlying obligations each component corresponds to, and the applicable approval threshold.
- For manual entries: the documented justification and reviewer, if any.
- For round amounts: whether the amount reflects a genuine contractual/fee structure or an estimate/fabrication.
- Any co-occurrence among these three signals or with signals from other references in this skill.

## Required Evidence
- Underlying invoice/contract/milestone documentation for split-payment components.
- The manual entry's justification note and approval/review record, if any.
- Contract or fee-schedule documentation supporting a round-amount transaction's legitimacy.

## Exceptions
- A split payment corresponding to genuinely separate, independently-arising obligations (not one obligation artificially divided) is not a control-evasion pattern regardless of how the totals happen to align with a threshold — coincidental alignment is not itself evidence of intent, though it still warrants the basic check.
- A manual entry with clear, contemporaneous, independently-reviewed documentation (e.g., a documented period-end accrual per the `accounting-br` skill's framework) is a properly-controlled exception to the standard workflow, not an unmitigated risk.
- A round amount matching a documented contractual fee or retainer structure is fully explained and should not be escalated on that basis alone.

## Risk Considerations
- Escalating every manual entry, split payment, or round amount in isolation, without checking for benign explanation or genuine co-occurrence, produces high false-positive volume and risks alert fatigue that causes genuinely concerning combinations to be missed.
- Failing to check whether a split payment's components correspond to genuinely separate obligations misses the actual distinguishing fact between legitimate and evasive splitting.
- Treating a manual entry as low-risk merely because it "happens all the time" in a specific department ignores that manual entries are inherently higher-risk precisely because they bypass standard controls — frequency does not reduce the need for compensating review.

## Human Escalation Conditions
Escalate to the accountable function whenever: a split-payment pattern shows components artificially divided to align with an approval threshold; a manual entry lacks documented justification/review; two or more signals from this reference (or in combination with `duplicate-signals.md`, `bank-changes.md`, `behavioral-signals.md`) co-occur; or a benign explanation cannot be confirmed after reasonable checking.

## Source IDs
`bacen`/`cvm` (T1 — general financial-control and market-integrity context, not pattern-specific), corporate policy (Corporate Source — the entity's own approval thresholds, manual-entry authorization policy, and fee/contract structures relevant to round-amount evaluation; `CORPORATE_CONTEXT_REQUIRED`).

## Freshness Requirements
Standard — these are stable, well-recognized fraud-examination heuristics not tied to a specific regulatory text requiring frequent re-verification; `CORPORATE_CONTEXT_REQUIRED` for the entity's specific current approval thresholds, which do require periodic reconfirmation as company policy evolves.

## Effective-Date Considerations
These three signal patterns are long-standing, generally-recognized fraud-examination heuristics (structuring/threshold-evasion, control-bypass via manual entry, and round-number anomaly detection) not tied to a specific statutory effective date or subject to the kind of rapid regulatory change seen elsewhere in this repository's Brazil-specific references.

## Related References
- `duplicate-signals.md`, `bank-changes.md`, `behavioral-signals.md`, `reversals.md` (this skill) — for the other signal categories these patterns should be cross-checked against for co-occurrence.
- `payments` skill's `vendor-payments-controls.md` and `batch-cnab.md` — for the approval-threshold and SoD controls a split-payment or manual-entry pattern may be evading.
- `accounting-br` skill's `accrual-provisions.md` — for the legitimate accounting basis some manual entries (period-end adjustments) properly rely on.

## Known Limitations
- Does not specify the entity's actual approval thresholds, manual-entry policy, or fee structures — `CORPORATE_CONTEXT_REQUIRED` for every determination this reference's decision points depend on.
- Round-amount detection specifically is acknowledged as a weak, high-false-positive signal on its own — this reference deliberately does not recommend escalating on this signal alone.
- Draws on general fraud-examination secondary literature for its pattern framing, not a single primary regulatory text, in this research pass.
