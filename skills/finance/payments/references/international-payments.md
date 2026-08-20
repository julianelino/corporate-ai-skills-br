# International Payments

## Topics Covered
- international payments

## Purpose
Establish the specific regulatory and control concerns cross-border payments introduce — the contrato de câmbio requirement, RDE/SCE registration obligations, and the additional fraud-surface a foreign-currency, foreign-bank payment creates — before preparing (never approving or executing) an international payment.

## When to Load
Load whenever a request involves preparing or reviewing a payment to or from a foreign counterparty, or any foreign-exchange-linked transaction — before recommending an international payment be prepared for approval.

## Scope
Covers the general Banco Central foreign-exchange framework (contrato de câmbio requirement) and the SCE (Sistema de Capitais Estrangeiros, successor to RDE) registration obligations relevant to specific cross-border flows (e.g., foreign direct investment). Does not cover the substantive tax treatment of a specific cross-border payment (a `tax-br` skill question, not detailed here) or domestic payment rails (see `pix.md`, `ted-boleto.md`).

## Core Concepts
- **Contrato de câmbio**: essentially every cross-border financial movement in or out of Brazil requires a contrato de câmbio (foreign-exchange contract) executed through an authorized institution — this is the mandatory legal vehicle for the currency conversion and cross-border transfer itself, distinct from the underlying commercial reason for the payment (an invoice, a loan repayment, a dividend, an investment).
- **SCE (Sistema de Capitais Estrangeiros) — successor to RDE**: the current system (per this research) for registering and tracking foreign-capital flows, including RDE-IED-equivalent registration for foreign direct investment (now SCE-IED) — a specific registration code from this system must generally be referenced in the contrato de câmbio or the relevant cross-border account record for movements it covers (e.g., foreign direct investment flows), not every cross-border payment type.
- **Periodic declaration obligations**: entities with registered foreign capital are subject to periodic declarations (DEF — Declaração Econômico-Financeira, per this research, with quarterly, annual, or five-year cadence depending on the entity's asset-size criteria) to Banco Central — a registration obligation is not a one-time event; it carries ongoing reporting duties that a payment-preparation process should flag, not merely the initial registration.
- **Sisbacen credentialing**: accessing Banco Central's registration/reporting systems requires prior credentialing (via an authorized financial institution acting as mandatária, or directly via e-CNPJ certificate) — this is an administrative prerequisite that should be confirmed as current/valid before assuming a registration or declaration can be completed on short notice.
- **Foreign-payment-specific fraud surface**: cross-border payments carry the same beneficiary-verification risks as domestic payments (see `vendor-payments-controls.md`), compounded by less familiar banking formats (SWIFT/IBAN conventions vary by destination country), longer settlement times that can delay fraud detection, and the practical difficulty of reversing funds once they leave Brazilian banking jurisdiction — treat cross-border payee-verification with at least the same rigor as domestic payments, not less, despite the additional procedural friction potentially creating pressure to expedite.

## Decision Points
1. Does this payment require a contrato de câmbio, and has the authorized institution processing it been confirmed?
2. Does the underlying transaction type (e.g., foreign direct investment) require SCE registration, and if so, is a valid registration code available to reference in the contrato de câmbio?
3. Does the entity have an active foreign-capital registration requiring a periodic DEF declaration, and is that declaration current — independent of whether this specific payment is being prepared?
4. Has the foreign beneficiary's banking details been independently verified through a channel separate from the instruction itself, with at least the same rigor as a domestic bank-detail-change verification (see `vendor-payments-controls.md`)?
5. Does apparent urgency around this cross-border payment (a common pressure tactic) warrant additional, not reduced, scrutiny given the reduced practical reversibility once funds leave Brazilian jurisdiction?

## Required Facts
- The nature of the cross-border transaction (trade payment, loan, investment, dividend, service payment) and whether it triggers SCE registration.
- The entity's current SCE registration and DEF declaration status, if applicable.
- The foreign beneficiary's banking details and independent-channel verification status.
- The authorized institution processing the contrato de câmbio.

## Required Evidence
- The contrato de câmbio documentation.
- SCE registration code/confirmation, where the transaction type requires it.
- DEF declaration filing history, where the entity has a registered foreign-capital position.
- Independent-channel confirmation of the foreign beneficiary's banking details.

## Exceptions
- Small-value or specific transaction-type payments may fall under simplified foreign-exchange procedures with reduced documentation requirements compared to the general framework — verify the current specific-transaction-type rule rather than assuming the full registration/declaration framework applies uniformly. `CORPORATE_CONTEXT_REQUIRED`/VERIFY_CURRENT_T1_SOURCE.
- A payment to a foreign counterparty that does not involve a registrable capital flow (e.g., an ordinary trade invoice payment) may not require SCE registration even though it still requires a contrato de câmbio — do not assume every cross-border payment triggers the same registration obligations.

## Risk Considerations
- Assuming a cross-border payment follows the same simple approval path as a domestic payment, without checking contrato de câmbio and potential SCE-registration requirements, risks a regulatory compliance gap.
- Skipping or attenuating independent beneficiary verification for a foreign payment (perhaps due to unfamiliarity with foreign banking formats or pressure to move faster given procedural friction) is especially risky given the reduced practical ability to reverse funds once they leave Brazilian jurisdiction.
- Treating foreign-capital registration as a one-time task, without tracking the ongoing periodic DEF declaration obligation, risks a compliance gap unrelated to any specific payment event but still material to the entity's overall standing.

## Human Escalation Conditions
Escalate for human treasury/tax/legal review whenever: SCE-registration applicability for a specific transaction type is uncertain; the entity's DEF declaration status cannot be confirmed as current; a foreign beneficiary's banking details cannot be independently verified; or any urgency around the payment raises fraud-pattern concerns.

## Source IDs
`bacen` (T1 — contrato de câmbio regulatory framework, SCE/SCE-IED system, DEF declaration requirements, and Sisbacen credentialing), `cvm` (T1 — where the cross-border transaction involves securities/capital-markets aspects).

## Freshness Requirements
Critical. Foreign-exchange and foreign-capital-registration rules are subject to periodic Banco Central regulatory revision (this research noted RDE's evolution into the current SCE system); VERIFY_CURRENT_T1_SOURCE before a consequential registration or declaration determination.

## Effective-Date Considerations
The RDE (Registro Declaratório Eletrônico) system, including RDE-IED for foreign direct investment, has been superseded by the current SCE (Sistema de Capitais Estrangeiros) system, with SCE-IED as its foreign-direct-investment-specific module — an analysis or process still referencing "RDE-IED" as the current active system reflects outdated terminology/process design and should be updated to reference SCE-IED, though the underlying registration concept and obligation continue under the new system.

## Related References
- `vendor-payments-controls.md` (this skill) — for the beneficiary-verification and bank-detail-change control discipline this reference extends to the cross-border context.
- `tax-br` skill — for the substantive tax treatment (withholding, IOF where applicable) of specific cross-border payment types, not detailed in this reference.

## Known Limitations
- Does not detail the specific DEF declaration thresholds (asset-size criteria determining quarterly/annual/five-year cadence) — VERIFY_CURRENT_T1_SOURCE for the entity's specific current obligation.
- Does not cover IOF (Imposto sobre Operações Financeiras) or other cross-border-transaction-specific tax treatment — see the `tax-br` skill (not currently covering IOF as a named required topic; treat as a related but distinct question).
- Sourced from secondary summaries, not an independently re-fetched primary `bacen` regulatory text, in this research pass.
