# Reversals Signal

## Topics Covered
- reversals

## Purpose
Establish how to triage a transaction reversal (estorno) as a risk signal — particularly the pattern where a duplicate or erroneous-looking payment is "corrected" by a manual reversal that itself lacks independent oversight, a recognized mechanism for extracting funds under cover of a routine-looking correction.

## When to Load
Load whenever a request involves a transaction reversal/estorno flagged as a risk signal — before characterizing the reversal or recommending any action.

## Scope
Covers the risk-signal triage discipline for reversals. Does not cover the underlying duplicate-payment pattern a reversal often corrects (see `duplicate-signals.md`) or the manual-entry signal a reversal is a specific instance of (see `transaction-pattern-signals.md`), though a reversal should generally be evaluated with both in view.

## Core Concepts
- **Reversals are normal and necessary**: legitimate reversals are a routine part of financial operations — correcting a genuine duplicate payment, reversing an erroneous entry, undoing a transaction rejected after the fact — a reversal existing is not itself a signal; the absence of reversal capability would itself be a control gap.
- **The specific fraud pattern this signal targets**: the recognized pattern (noted in this research) is a deliberate double-payment to a real vendor, followed by a manual reversal that — instead of correctly returning the full duplicate amount — either reverses only part of it, is directed to a different account than the original payment, or is never actually completed/monitored, allowing the "corrected" excess to be quietly diverted. The reversal here functions as camouflage: it makes a two-step fraud look like a routine, already-resolved correction.
- **The distinguishing question**: does the reversal fully and correctly undo the original transaction — same amount, same original destination/source, completed and confirmed — or does it leave an unexplained residual difference (in amount, timing, or destination) between what was reversed and what was originally disbursed? A clean, complete, confirmed reversal is a resolved control event; a partial, delayed, or misdirected reversal is the actual signal warranting review.
- **Reversal authorization**: because a reversal moves funds (or removes an accounting entry) just as a forward transaction does, it should be subject to comparable SoD discipline (see `behavioral-signals.md`'s "unusual user" framework) — the person who caused the original erroneous/duplicate transaction should not be the sole authority reversing it without independent review, mirroring the same principle that prevents one person from both creating a bank-detail change and approving the resulting payment.
- **Timing as a secondary signal**: a reversal executed long after the original transaction (well beyond what routine error-correction timelines would suggest), or one clustered with other signals from this skill (weekend timing, an unusual user, a round amount), raises the pattern from a routine correction toward an indicator warranting closer review.

## Decision Points
1. Does the reversal fully and correctly undo the original transaction — matching amount, matching original destination/source, actually completed and confirmed — or does an unexplained residual difference exist?
2. Was the reversal authorized/executed by someone independent of whoever caused or benefited from the original transaction, consistent with SoD discipline?
3. Does the reversal's timing fall within a routine error-correction window, or is it unusually delayed relative to the original transaction?
4. Does the reversal co-occur with another signal from this skill (a duplicate payment per `duplicate-signals.md`, unusual timing/user per `behavioral-signals.md`, a round-amount discrepancy per `transaction-pattern-signals.md`)?
5. Has the reversal actually been confirmed complete (funds/entry actually returned/removed), or does it remain only recorded as intended without confirmed completion?

## Required Facts
- The original transaction's amount, destination/source, and date.
- The reversal's amount, destination/source, date, and confirmed-completion status.
- Whether the reversal was authorized/executed by someone independent of the original transaction's originator/beneficiary.
- Any co-occurring signal from elsewhere in this skill.

## Required Evidence
- Records for both the original transaction and the reversal, permitting a direct amount/destination/timing comparison.
- Confirmation (bank statement, system record) that the reversal was actually completed, not merely recorded as intended.
- Authorization/role records for who executed the reversal.

## Exceptions
- A reversal handled through a well-documented, independently-reviewed standard correction process (e.g., a routine reconciliation-driven reversal with its own approval step) is a properly-controlled event, even if executed by the same operational team that processes the original transactions — the key control is independent review of the specific reversal, not necessarily a different team for every instance.
- A partial reversal can be entirely legitimate where the original transaction itself was only partially erroneous (e.g., a duplicate payment covering two invoices where only one was actually duplicated) — the distinguishing check is whether the partial amount is explained and reconciles to the actual error, not whether it is partial per se.

## Risk Considerations
- Accepting a reversal as resolving a flagged duplicate/error without checking that it fully and correctly matches the original transaction misses the exact pattern this signal exists to catch — a plausible-looking but incomplete or misdirected reversal.
- Allowing the same person who caused or benefited from an erroneous/duplicate transaction to also authorize its reversal without independent review recreates the same SoD gap this skill flags elsewhere for original transactions.
- Treating "a reversal was recorded" as equivalent to "the funds were actually returned" without confirming actual completion risks closing a case that remains financially unresolved.

## Human Escalation Conditions
Escalate to the accountable function whenever: a reversal shows an unexplained residual difference from the original transaction (amount, destination, or timing); the reversal lacks independent authorization from the original transaction's originator/beneficiary; the reversal's actual completion cannot be confirmed; or the reversal co-occurs with another signal in this skill.

## Source IDs
`bacen`/`cvm` (T1 — general financial-control and market-integrity context, not pattern-specific), corporate policy (Corporate Source — the entity's own reversal-authorization procedure and reconciliation controls; `CORPORATE_CONTEXT_REQUIRED`).

## Freshness Requirements
Standard — this is a stable, well-recognized fraud-examination heuristic; `CORPORATE_CONTEXT_REQUIRED` for the entity's specific current reversal-authorization procedure.

## Effective-Date Considerations
The double-payment-plus-camouflage-reversal pattern is a stable, generally-recognized fraud typology not tied to a specific statutory effective date or subject to rapid regulatory change.

## Related References
- `duplicate-signals.md` (this skill) — for the underlying duplicate-payment pattern a reversal frequently follows.
- `transaction-pattern-signals.md` (this skill) — for the manual-entry signal a reversal is a specific instance of.
- `behavioral-signals.md` (this skill) — for the SoD/unusual-user and timing considerations applicable to who executes and when a reversal occurs.
- `payments` skill's `vendor-payments-controls.md` — for the SoD principle this reference extends to reversal authorization specifically.

## Known Limitations
- Does not specify the entity's actual reversal-authorization procedure or standard error-correction timeline — `CORPORATE_CONTEXT_REQUIRED` for every determination this reference's decision points depend on.
- Does not resolve, on its own, whether a specific flagged reversal reflects fraud, error, or a legitimate exception — this reference's role is limited to structuring the triage that determines whether escalation is warranted.
- Draws on general fraud-examination secondary literature for its pattern framing, not a single primary regulatory text, in this research pass.
