# Vendor Payments and Controls (Segregação de Funções, Validação Bancária, Prevenção de Duplicidade)

## Topics Covered
- vendor payments

## Purpose
Establish the core control framework this entire skill operates within — segregation of duties, bank-detail-change validation, duplicate-payment prevention, and payment evidence/reconciliation handoff — that every other reference in this skill (`pix.md`, `ted-boleto.md`, `batch-cnab.md`, `international-payments.md`, `tax-payments.md`) assumes and builds on. This is the reference that makes PREPARE != APPROVE operational, not just a stated principle.

## When to Load
Load for any vendor payment preparation or review — this reference's controls apply regardless of which specific rail (Pix, TED, boleto, batch, international, tax) is ultimately used, and should generally be checked before or alongside the rail-specific reference.

## Scope
Covers the general control framework for vendor payment preparation: SoD, supplier-master/bank-detail-change validation, duplicate prevention, payment evidence, and the reconciliation handoff. Does not cover any specific payment rail's mechanics (see this skill's other references) or the substantive fraud-classification framework for a confirmed anomaly (see the `financial-fraud-risk` skill, which this reference hands off to when a control failure surfaces a genuine anomaly).

## Core Concepts
- **PREPARE != APPROVE — the foundational rule**: this skill's role is to prepare, validate, and simulate a payment for a human decision-maker — never to approve or execute one. Every reference and decision point in this skill exists in service of producing a well-validated payment package for a human to approve, not to reach a decision that authorizes fund movement. This is a hard architectural boundary, not a style preference.
- **Segregation of duties (SoD)**: the person/role that creates or changes a supplier's master record (including bank details) must not be the same person/role that approves the resulting payment — collapsing these into one path (or one person controlling both) removes the structural check that catches a fraudulent or erroneous change before funds move. This extends to the CNAB batch-generation/transmission-approval split described in `batch-cnab.md`.
- **Independent-channel bank-detail-change validation**: any new or changed supplier bank detail must be confirmed through a channel independent of the request itself — e.g., a known phone number on file (not one provided in the same email/message requesting the change), a separate verified contact, or an established secure vendor portal — never by replying to or trusting the same communication channel that introduced the change. This is the primary defense against the well-documented fraud pattern of a fake vendor email or a falsa central de atendimento (fake call-center) call requesting a bank-detail change.
- **Duplicate-payment prevention**: before preparing a payment, check for an existing payment against the same invoice number, the same amount, and the same vendor within a reasonable window — a duplicate can arise from genuine system error (a batch reprocessed, an invoice submitted twice) or from a deliberate fraud pattern (a duplicated/altered invoice submitted through a different channel) — either way, the check is a required preparation step, not an optional nicety.
- **Payment evidence and audit trail**: every prepared payment should carry a documented trail — the approved invoice/receipt, the payee, the bank-detail-validation record, the amount, the due date, the approval mode, and the resulting transaction reference — sufficient for later reconciliation and for demonstrating, after the fact, that the required controls were actually followed, not merely nominally in place.
- **Reconciliation handoff**: a prepared and approved payment's lifecycle does not end at transmission — the actual settlement/confirmation (via bank statement, CNAB retorno per `batch-cnab.md`, or rail-specific confirmation) must be reconciled back against the original approved instruction, closing the loop rather than assuming transmission equals successful, correctly-directed completion.
- **High-risk payment changes require elevated scrutiny**: a newly-registered vendor, a changed bank detail on an existing vendor, an unusually large or urgent payment, or a payment to a jurisdiction/rail not typical for that vendor are all independently recognized higher-risk patterns — each should trigger the specific validation appropriate to its risk (independent-channel confirmation for bank-detail changes; extra documentation for new vendors; escalation for unusual urgency) rather than being processed with standard-payment-level scrutiny merely because the payment "looks routine" in other respects.

## Decision Points
1. Are the roles preparing/requesting this payment (invoice approval, supplier-master maintenance, payment approval) genuinely segregated, or does any single person/role span more than one of these functions for this specific payment?
2. Is this payment tied to a new or recently-changed supplier bank detail? If so, has independent-channel confirmation been completed and documented before proceeding — never confirmed via the same channel that introduced the change?
3. Has a duplicate-payment check been performed against invoice number, amount, and vendor for a reasonable prior window?
4. Is the full evidence trail (approved invoice/receipt, payee, bank-validation record, amount, due date, approval mode) assembled and documented for this payment?
5. Does this payment exhibit any high-risk pattern (new vendor, changed bank detail, unusual size/urgency, atypical rail/jurisdiction for this vendor) warranting elevated scrutiny beyond the standard checklist?
6. Once transmitted, has the payment been reconciled against its actual settlement confirmation, closing the loop rather than assuming success?

## Required Facts
- The roles involved in this payment's preparation chain, to confirm SoD.
- Whether the vendor/bank-detail is new or recently changed, and the independent-channel confirmation status.
- Prior payment history for the same invoice/vendor/amount combination, for duplicate screening.
- The complete evidence-trail elements for this specific payment.

## Required Evidence
- Role/permission records demonstrating SoD for this payment's chain (creation/change vs. approval).
- The independent-channel confirmation record for any new/changed bank detail — documented separately from the request that introduced the change.
- The duplicate-check result (against invoice number, amount, vendor, timeframe).
- The approved invoice/receipt and the resulting settlement confirmation, for the full evidence trail.

## Exceptions
- A small-value, well-established, unchanged vendor relationship does not exempt the payment from SoD or duplicate-checking — these controls apply regardless of payment size or vendor tenure, since fraud specifically targets routine, lower-scrutiny payments precisely because they are less likely to be questioned. The elevated-scrutiny triggers (new vendor, changed detail, unusual size/urgency) are additive to the baseline controls, not a replacement for them at lower risk levels.
- A genuine, well-documented emergency payment scenario may compress timelines, but should never compress or bypass the independent-channel bank-detail confirmation specifically — a compressed timeline is exactly the condition social-engineering fraud attempts to manufacture.

## Risk Considerations
- Any single point where one person/role can both change a bank detail and cause a payment to that detail to be approved is a structural fraud vulnerability, regardless of that person's individual trustworthiness — the control exists precisely because trust alone is not a sufficient control.
- Confirming a bank-detail change by replying to the same email or calling back a number provided in the request itself defeats the entire purpose of independent-channel verification — it merely confirms the fraudster (if any) is still reachable, not that the change is legitimate.
- Treating urgency as license to skip validation is the single most common vector by which the other controls in this reference are defeated — urgency should trigger more scrutiny, specifically because it is a known manipulation tactic, not less.

## Human Escalation Conditions
Escalate for human review (and, where a genuine anomaly is confirmed, hand off to the `financial-fraud-risk` skill without asserting fraud prematurely — see that skill's own anomaly-vs-confirmed-fraud discipline) whenever: SoD cannot be confirmed for a specific payment; a bank-detail change's independent-channel confirmation is incomplete; a potential duplicate is identified; a high-risk pattern (new vendor, changed detail, unusual urgency/size/jurisdiction) is present; or a reconciliation discrepancy is found between the approved instruction and actual settlement.

## Source IDs
`bacen` (T1 — payment-system regulatory context relevant to fraud-prevention expectations), corporate policy (Corporate Source — the entity's own supplier-master, SoD, and approval-matrix policies govern the specific role/threshold configuration this reference's general principles must be applied within; `CORPORATE_CONTEXT_REQUIRED`).

## Freshness Requirements
Standard for the general control principles described here, which are stable, widely-recognized fraud-prevention practices; `CORPORATE_CONTEXT_REQUIRED` for the entity's specific current SoD role definitions, approval matrix, and supplier-master validation procedure, which should be confirmed as current company policy, not assumed from this reference alone.

## Effective-Date Considerations
The control principles in this reference (SoD, independent-channel verification, duplicate prevention) are not tied to a specific statutory effective date — they reflect stable, widely-recognized fraud-prevention practice. The specific fraud patterns referenced (boleto tampering, fake vendor-change emails, falsa central de atendimento calls) are actively evolving in sophistication (including AI-assisted/deepfake variants per broader industry reporting) — treat the general control discipline as durable, but stay alert to new manifestations of the same underlying pattern (someone impersonating a trusted party to induce a bypass of independent verification).

## Related References
- `pix.md`, `ted-boleto.md`, `batch-cnab.md`, `international-payments.md`, `tax-payments.md` (this skill) — each rail-specific reference assumes and builds on this reference's baseline controls.
- `financial-fraud-risk` skill — for the escalation path once a control failure surfaces a genuine anomaly requiring fraud-risk-specific analysis, with that skill's own discipline against premature accusation.
- `corporate-risk`/`corporate-investigation` skills — for broader risk-escalation or formal-investigation handoff where a confirmed control breach warrants it.

## Known Limitations
- Does not specify the entity's actual SoD role definitions, approval thresholds, or supplier-master procedure — these are `CORPORATE_CONTEXT_REQUIRED` and must be supplied, never assumed or invented.
- Does not resolve, on its own, whether a specific flagged pattern is fraud, error, or a legitimate exception — it establishes the checks that surface a pattern requiring further review, consistent with this skill's PREPARE != APPROVE boundary.
- General fraud-prevention practice guidance in this reference draws on secondary industry reporting on Brazilian payment-fraud patterns (boleto tampering, vendor bank-detail-change scams), not a single primary regulatory text, in this research pass.
