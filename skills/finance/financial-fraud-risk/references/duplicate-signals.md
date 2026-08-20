# Duplicate Suppliers, Invoices, and PIX Signals

## Topics Covered
- duplicate suppliers/invoices/PIX

## Purpose
Establish how to triage a duplicate-looking supplier record, invoice, or PIX payment as a risk signal — distinguishing genuine duplication risk from benign explanations — without ever concluding fraud from the pattern alone. This reference operationalizes the skill's foundational rule: ANOMALY != INDICATOR != SUSPICION != CONFIRMED FRAUD.

## When to Load
Load whenever a request involves a potential duplicate supplier registration, a potential duplicate invoice, or a potential duplicate/repeated PIX payment — before characterizing the pattern or recommending any action.

## Scope
Covers the triage discipline for duplicate-pattern signals across three related but distinct manifestations: duplicate supplier master records, duplicate invoices, and duplicate PIX payments. Does not cover the bank-detail-change signal specifically (see `bank-changes.md`, though duplicate-supplier patterns often co-occur with a bank-detail change) or the escalation/investigation-handoff mechanics common to all signals in this skill (see `reversals.md`'s Related References for the shared escalation framework, also repeated here).

## Core Concepts
- **The four-state framework**: a duplicate-looking pattern starts as an ANOMALY (a statistical/pattern deviation, nothing more) — it becomes an INDICATOR only when it fits a recognized risk pattern with some corroborating context; it becomes a SUSPICION only when a specific, articulable reason exists to believe misconduct occurred; it becomes CONFIRMED FRAUD only through a formal investigation reaching that conclusion (a different skill's authority — see `corporate-investigation`). This skill's role stops at INDICATOR/SUSPICION-level triage and escalation — never at CONFIRMED.
- **Duplicate supplier records**: two supplier master records resolving to the same real-world entity (via matching tax ID, matching bank account, or near-identical name/address) can enable a fraud pattern where a fraudster creates a look-alike supplier to redirect payments, but can equally reflect an entirely benign data-entry duplication (a supplier registered twice by different departments, a legitimate name change not properly merged) — the distinguishing question is whether the duplicate record introduces a *different* payment destination (bank account) from the legitimate one, which is the actual fraud-relevant fact, not the mere existence of two records.
- **Duplicate invoices**: the same invoice (or a near-identical one with minor number/date alterations) submitted more than once can indicate an attempt to extract a second payment — but can equally reflect a vendor's own billing-system error, a resubmission after a rejected first attempt, or a legitimate credit-note/reissue cycle. The distinguishing question is whether a *second payment* was actually made (or attempted) against the same underlying obligation, not merely whether two invoice records exist.
- **Duplicate/repeated PIX payments**: because Pix settles instantly and is generally irrevocable (see `payments` skill's `pix.md`), a duplicate Pix payment is a higher-urgency variant of this signal — if confirmed as an actual double-payment (not merely two similar-looking but distinct legitimate transactions), the window to seek recovery (voluntary return, or MED if fraud/error is confirmed) is time-sensitive.
- **Corroborating context that raises INDICATOR-level concern**: a duplicate paired with a bank-detail change (see `bank-changes.md`), a duplicate initiated or approved by a single user without independent review, or a duplicate discovered only through customer/vendor complaint rather than internal control — each of these raises the pattern from a bare anomaly toward an indicator warranting review, distinct from a duplicate caught and self-corrected by routine reconciliation.

## Decision Points
1. Does the duplicate pattern involve an actual second payment/disbursement, or merely two records (which may reflect ordinary data duplication, not a financial-loss risk by itself)?
2. If a duplicate supplier record exists, does it route to a *different* bank account than the legitimate record — this is the fact that actually matters for fraud risk, not the record duplication itself.
3. Is there a plausible, checkable benign explanation (department duplication, vendor resubmission, legitimate reissue) that should be checked before treating the pattern as an indicator?
4. Does the pattern co-occur with another signal in this skill (a recent bank-detail change, an unusual user, weekend timing) that would elevate it from anomaly to indicator?
5. If this is a duplicate Pix payment, has the time-sensitive recovery path (voluntary return / MED per `payments` skill's `pix.md`) been flagged given settlement irrevocability?

## Required Facts
- Whether an actual second payment/disbursement occurred, not merely a record-level duplication.
- The bank-account destination for each instance of the duplicate, to check for divergence.
- Any co-occurring signal (bank-detail change, single-user initiation, unusual timing).
- A plausible benign explanation, checked and either confirmed or ruled out.

## Required Evidence
- The supplier master records, invoice records, or payment records showing the duplicate pattern.
- Bank-account destination data for each instance.
- Any available explanation from the initiating department/user or the vendor, where already on record — not solicited in a way that tips off a potential bad actor before appropriate review.

## Exceptions
- A duplicate caught and corrected by routine reconciliation before any actual second payment occurred is a control-effectiveness data point, not a fraud indicator — do not treat every near-miss as requiring the same escalation as an actual double-disbursement.
- A vendor's own legitimate invoice-numbering error (e.g., a resubmitted invoice after a rejected first attempt) is a common, benign explanation that should be checked directly with the vendor through an independent channel before assuming anything more.

## Risk Considerations
- Treating record-level duplication (two similar-looking entries) as equivalent to financial-loss risk, without checking whether an actual second payment occurred, wastes investigative effort on a large volume of benign false positives.
- Failing to check whether a duplicate supplier record routes to a different bank account than the legitimate one misses the actual fraud-relevant fact hiding within an otherwise-routine-looking duplication.
- For a duplicate Pix specifically, delaying triage given the instrument's irrevocability can foreclose the recovery window entirely.

## Human Escalation Conditions
Escalate to the accountable function (per `corporate-investigation`/`corporate-risk` skills, as scoped by corporate policy) whenever: an actual second payment/disbursement is confirmed; a duplicate supplier record resolves to a different bank account than the legitimate one; the pattern co-occurs with another signal in this skill; or a duplicate Pix payment requires time-sensitive recovery action.

## Source IDs
`bacen` (T1 — Pix-specific duplicate-payment recovery mechanics, cross-referenced with `payments` skill's `pix.md`), corporate policy (Corporate Source — the entity's own reconciliation and duplicate-detection control procedures; `CORPORATE_CONTEXT_REQUIRED`).

## Freshness Requirements
Standard for the general triage framework; critical for the Pix-specific recovery-timing guidance, which should be checked against `payments` skill's `pix.md` for current MED scope/timing.

## Effective-Date Considerations
The general duplicate-detection triage principles here are not tied to a specific statutory effective date. The Pix-specific recovery mechanics (MED) are subject to the same active regulatory evolution noted in `payments` skill's `pix.md` — cross-check that reference's Effective-Date Considerations before relying on a specific recovery-timing assumption.

## Related References
- `payments` skill's `pix.md` and `vendor-payments-controls.md` — for the payment-preparation-side controls (duplicate-check, independent-channel bank-detail confirmation) this signal-triage reference complements from the risk-monitoring side.
- `bank-changes.md` (this skill) — for the closely-related, frequently co-occurring bank-detail-change signal.
- `corporate-investigation` skill — for the formal-investigation authority this skill's escalation hands off to.
- `corporate-risk` skill — for broader risk-classification framing once a signal is escalated.

## Known Limitations
- Does not itself resolve whether a specific flagged pattern is fraud, error, or a legitimate exception — this reference's role is limited to structuring the triage that determines whether escalation is warranted.
- Does not specify the entity's actual reconciliation/duplicate-detection control procedures — `CORPORATE_CONTEXT_REQUIRED`.
- Draws on general fraud-examination and payment-industry secondary reporting for its risk-pattern framing, not a single primary regulatory text, in this research pass.
