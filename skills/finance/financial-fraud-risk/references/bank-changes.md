# Bank Changes Signal

## Topics Covered
- bank changes

## Purpose
Establish how to triage a supplier/payee bank-detail change as a risk signal — the single highest-leverage fraud pattern this skill monitors, since a successful bank-detail-change fraud redirects an otherwise-legitimate payment in full — without concluding fraud from the change alone.

## When to Load
Load whenever a request involves a recently-changed or newly-registered payee bank detail flagged as a risk signal — before characterizing the change or recommending any action. This reference covers the risk-monitoring/triage angle; the payment-preparation-side control (independent-channel confirmation before a payment is prepared) lives in the `payments` skill's `vendor-payments-controls.md`.

## Scope
Covers the risk-signal triage discipline for bank-detail changes. Does not cover the preventive control itself (independent-channel confirmation at payment-preparation time — see `payments` skill's `vendor-payments-controls.md`) or the duplicate-supplier pattern that frequently co-occurs with a bank-detail change (see `duplicate-signals.md`).

## Core Concepts
- **Why this signal carries outsized weight**: unlike most other signals in this skill (which flag a pattern requiring interpretation), a bank-detail change that is later confirmed fraudulent has a direct, generally-irreversible financial consequence — the funds go exactly where the fraudster directed them, in full, often via an instant/hard-to-reverse rail (see `payments` skill's `pix.md`). This is why bank-detail changes warrant the strictest available control (independent-channel confirmation) rather than routine-level scrutiny.
- **The core fraud pattern (vendor-impersonation bank-detail-change fraud)**: a fraudster — via a compromised or spoofed vendor email, a fake call-center call (falsa central de atendimento), or a compromised internal account — requests that a legitimate, existing vendor's bank details be updated to an account the fraudster controls. The vendor relationship is real; only the destination account is fraudulent. This makes the pattern harder to catch than an entirely fabricated vendor, since every other aspect of the transaction (invoice, amount, vendor identity) looks legitimate.
- **The signal, from a monitoring perspective**: a payment or payment-preparation event tied to a bank detail that changed recently (the specific "recent" window is `CORPORATE_CONTEXT_REQUIRED`/policy-dependent, but shorter is generally higher-risk) is the signal this reference addresses — the monitoring question is whether the change was validated through the required independent channel *before* the change was accepted, not merely whether a change occurred (changes happen legitimately too — a vendor genuinely does change banks).
- **Distinguishing legitimate change from fraud risk**: a legitimate bank-detail change (a vendor's genuine bank switch, a merger, an account closure) is common and not itself suspicious — the fraud-risk-relevant fact is whether the change was verified through an independent channel per the required control, not the mere occurrence of a change. A change made without that verification is a control-gap indicator regardless of whether this specific instance turns out to be fraudulent — it represents unmitigated risk exposure either way.
- **Timing concentration**: bank-detail-change fraud attempts often cluster around payment due dates or other periods of processing urgency (exploiting the same pressure dynamic described in `payments` skill's `vendor-payments-controls.md`) — a change appearing shortly before an expected payment run deserves heightened, not routine, scrutiny.

## Decision Points
1. Was this bank-detail change validated through the required independent channel before being accepted into the supplier master? If the control step is missing or undocumented, this is itself an indicator regardless of the change's ultimate legitimacy.
2. How recent is the change relative to the payment it affects, and does that timing pattern (e.g., appearing just before a payment run) raise additional concern?
3. Does the change co-occur with another signal (a duplicate supplier record per `duplicate-signals.md`, an unusual initiating user per `behavioral-signals.md`)?
4. Has independent contact with the vendor (through a channel established before and separate from the change request) confirmed or refuted the change?
5. If a payment has already been made against an unverified changed bank detail, has this been flagged with the urgency the underlying rail's reversibility characteristics warrant (see `payments` skill's rail-specific references)?

## Required Facts
- Whether the independent-channel verification control was applied to this specific bank-detail change, and its documented outcome.
- The timing of the change relative to any payment it affects.
- Any co-occurring signal from elsewhere in this skill.
- Whether a payment has already been disbursed against the changed detail.

## Required Evidence
- The independent-channel confirmation record (or its absence) from `payments` skill's `vendor-payments-controls.md` control.
- The change-request communication itself (email, call log, portal submission) and its originating channel.
- Payment records tied to the changed bank detail, if any have already been made.

## Exceptions
- A bank-detail change verified through the required independent channel, with a documented, confirmed outcome, is a properly-controlled event — do not treat every change as an open risk signal once the control has actually been applied and documented; the signal specifically flags changes lacking that verification, or where the verification itself is in question.
- A change originating from a well-established, low-risk internal process (e.g., a bulk update following a documented, verified vendor merger affecting many suppliers at once) may warrant a different, batch-level verification approach than a single ad hoc change — but batch processing does not exempt any individual change from ultimately requiring independent confirmation.

## Risk Considerations
- Treating "a change occurred" alone as the signal (rather than "a change occurred without documented independent verification") produces excessive false positives on entirely legitimate vendor bank switches and risks alert fatigue that causes real indicators to be missed.
- Failing to check for timing concentration around payment runs misses a well-documented fraud-pattern characteristic.
- Delaying action on an unverified changed detail that already has a payment scheduled or disbursed against it risks losing the recovery window entirely, particularly for instant/hard-to-reverse rails.

## Human Escalation Conditions
Escalate to the accountable function whenever: a bank-detail change lacks documented independent verification and a payment is scheduled or has occurred against it; the change co-occurs with another signal in this skill; or independent vendor contact contradicts the change request.

## Source IDs
`bacen` (T1 — payment-system fraud-pattern context, cross-referenced with `payments` skill's `pix.md`/`vendor-payments-controls.md`), corporate policy (Corporate Source — the entity's own bank-detail-change verification procedure and the specific "recent change" monitoring window; `CORPORATE_CONTEXT_REQUIRED`).

## Freshness Requirements
Standard for the general triage framework; cross-reference `payments` skill's `pix.md` for critical, actively-evolving Pix-specific fraud-response mechanics where the changed detail is Pix-linked.

## Effective-Date Considerations
The vendor-impersonation bank-detail-change fraud pattern is a stable, long-recognized fraud typology; its specific manifestation channels (email spoofing, fake call centers, and increasingly AI-assisted impersonation per broader industry reporting) continue to evolve — treat the underlying pattern (a real vendor, a fraudulent destination account) as the stable signal to monitor for, regardless of which specific impersonation technique is used.

## Related References
- `payments` skill's `vendor-payments-controls.md` — for the preventive independent-channel-verification control this signal monitors compliance with.
- `payments` skill's `pix.md` and `ted-boleto.md` — for the rail-specific reversibility characteristics that determine urgency once an unverified change is flagged.
- `duplicate-signals.md` (this skill) — for the frequently co-occurring duplicate-supplier pattern.
- `corporate-investigation` skill — for the formal-investigation authority this skill's escalation hands off to.

## Known Limitations
- Does not specify the entity's actual "recent change" monitoring window or verification procedure — `CORPORATE_CONTEXT_REQUIRED`.
- Does not itself perform the independent verification — that is `payments` skill's `vendor-payments-controls.md`'s preventive control; this reference is the risk-monitoring/triage counterpart.
- Draws on general fraud-examination and payment-industry secondary reporting for its pattern framing, not a single primary regulatory text, in this research pass.
