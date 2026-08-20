# Batch Payments and CNAB

## Topics Covered
- batch payments
- CNAB

## Purpose
Establish the specific control concerns batch/file-based payment processing introduces — a single corrupted or manipulated CNAB file can affect many payments at once, making file-level integrity and pre-transmission reconciliation a distinct control layer from individual-payment validation.

## When to Load
Load whenever a request involves preparing or reviewing a batch payment run or a CNAB remessa/retorno file — before recommending a batch be prepared for approval or transmitted to a bank.

## Scope
Covers CNAB (Centro Nacional de Automação Bancária) file standards — CNAB 240 and CNAB 400 — and the batch-processing control implications of file-based payment volume. Does not cover the individual-payment-rail specifics the batch ultimately executes (see `pix.md`, `ted-boleto.md`) or the vendor-master/bank-detail controls each payment within a batch must still individually satisfy (see `vendor-payments-controls.md`).

## Core Concepts
- **CNAB as a shared standard, not a single format**: CNAB 240 (240-position records, organized in segments, carrying richer data) and CNAB 400 (400-position records, an older, narrower format) are both FEBRABAN-defined standards for exchanging remessa (outbound, company-to-bank) and retorno (inbound, bank-to-company) files — a company's specific integration must match the format its bank(s) actually support for the specific transaction type, since not every bank/product combination supports both formats identically.
- **Remessa and retorno as the batch lifecycle**: a remessa file initiates a batch (e.g., registering boletos, instructing a set of TED/Pix transfers) sent to the bank; the retorno file reports back the outcome per item (liquidated, confirmed, rejected, not-located) — a batch is not confirmed complete merely because the remessa was accepted for transmission; the retorno must be checked to confirm actual per-item outcomes.
- **Aggregation risk**: because a single CNAB file can carry many individual payment instructions, a file-level error (a corrupted field, a wrong total, a duplicated segment, or a manipulated record within an otherwise-legitimate file) can silently affect a large number of payments at once — this is a materially different risk profile from a single manual payment error, and warrants file-level reconciliation (total amount, item count, hash/checksum where available) in addition to per-item validation.
- **Segregation of duties at the batch level**: the person/system generating the CNAB remessa file (from the company's ERP/payment system) should not be the same person with authority to approve its transmission to the bank without independent review — mirroring `vendor-payments-controls.md`'s general SoD principle, but applied at the file level: a compromised or manipulated file-generation step can affect every payment in the batch, making this control point especially high-leverage for an attacker.
- **Reconciliation handoff**: the retorno file's per-item confirmation status is the authoritative source for updating internal records (which invoices were actually paid, which were rejected and need reprocessing) — do not treat the remessa's acceptance, or an assumption that "the batch usually works," as sufficient confirmation of actual payment execution.

## Decision Points
1. Does the CNAB format (240 vs. 400) being used match what the receiving bank actually supports for this specific transaction type?
2. Has the remessa file's aggregate total (sum of individual payment amounts, item count) been reconciled against the source payment-approval list before transmission?
3. Was the remessa file generated and reviewed/approved by different roles, consistent with SoD at the file level?
4. Has the retorno file been checked per-item (not just for overall file acceptance) to confirm which payments actually settled, were rejected, or were not located?
5. Does any individual item within the batch tie to a recently-changed bank detail requiring the same independent-channel confirmation any single payment would require (see `vendor-payments-controls.md`), even though it's part of a larger file?

## Required Facts
- The CNAB format version and the specific bank/product combination it targets.
- The remessa file's aggregate totals, for reconciliation against the source approval list.
- The retorno file's per-item status for every item in the corresponding remessa.
- Role assignments for file generation vs. transmission approval (SoD confirmation).

## Required Evidence
- The remessa file itself and its aggregate-total reconciliation record against the approved payment list.
- The retorno file and its per-item outcome mapping back to the source invoices/payments.
- Role/permission records confirming file-generation and transmission-approval are held by different parties.

## Exceptions
- A retorno showing a "rejected" or "not located" status for a specific item is not itself evidence of fraud — it commonly reflects a data or timing issue (e.g., an already-settled boleto, a formatting mismatch) — but every rejection should be individually investigated and resolved, not silently ignored or resubmitted without understanding the cause.
- A small-batch or single-item CNAB file still requires the same file-level reconciliation discipline as a large batch — batch size does not proportionally reduce the need for aggregate-total and per-item verification.

## Risk Considerations
- Treating remessa-file acceptance by the bank's transmission channel as equivalent to "payments completed" skips the retorno-based confirmation step entirely, risking undetected failures or rejections.
- Concentrating file-generation and transmission-approval authority in one role creates a high-leverage single point of compromise — a manipulated file at generation time can silently redirect or alter many payments before any per-item review occurs.
- Failing to reconcile the remessa's aggregate total against the source approval list before transmission risks an undetected addition, alteration, or omission within the file.

## Human Escalation Conditions
Escalate for human review whenever: a remessa's aggregate total does not reconcile against the source approval list; a retorno shows an unexpected rejection pattern; file-generation and transmission-approval roles are not properly segregated for a specific batch; or any item within a batch ties to a recently-changed bank detail without completed independent confirmation.

## Source IDs
`bacen` (T1 — broader payment-system regulatory context for batch/file-based processing), FEBRABAN CNAB layout specifications (referenced as the industry-standard technical source for CNAB 240/400 field structure; not a `sources/SOURCE_REGISTRY.yaml` T1 entry in its own right — treat as a technical-standard reference, cross-check against the specific bank's own integration documentation for the authoritative current field layout).

## Freshness Requirements
Critical for the specific CNAB layout version in use (FEBRABAN periodically revises the CNAB 240 layout — this research identified version references such as V10.9 and V10.11) — VERIFY_CURRENT_T1_SOURCE / against the specific bank's current integration specification before a consequential file-generation configuration decision.

## Effective-Date Considerations
CNAB 240 and CNAB 400 are both long-standing, stable industry standards; the specific layout version (e.g., V10.11 per this research) is the volatile element, periodically revised by FEBRABAN — confirm the currently-applicable version against the specific bank's integration requirements before relying on a specific field-position assumption.

## Related References
- `vendor-payments-controls.md` (this skill) — for the individual-payment/bank-detail-change controls each item within a batch must still satisfy.
- `pix.md`, `ted-boleto.md` (this skill) — for the specific payment rails a CNAB batch commonly instructs.

## Known Limitations
- Does not detail the specific field-by-field CNAB 240/400 layout structure — this is bank- and product-specific and requires the specific bank's current integration documentation.
- Does not cover CNAB variants beyond the general remessa/retorno boleto/transfer use case (e.g., specialized segments for specific product types).
- Sourced from secondary summaries, not an independently re-fetched primary FEBRABAN layout document, in this research pass.
