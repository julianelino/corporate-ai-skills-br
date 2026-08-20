# Tax Payments

## Topics Covered
- tax payments

## Purpose
Establish the specific preparation and validation concerns for tax-obligation payments (DARF, GPS, and other guias) — deadline criticality, the correct-code/correct-period pairing requirement, and the handoff from the `tax-br`/`sped-compliance`-derived liability calculation to actual payment preparation — before preparing (never approving or executing) a tax payment.

## When to Load
Load whenever a request involves preparing or reviewing a payment of a federal, state, or municipal tax obligation — before recommending a tax payment be prepared for approval.

## Scope
Covers the payment-preparation layer for tax obligations: guia/DARF/GPS identification, code-and-period matching, and deadline discipline. Does not cover the substantive tax-liability calculation itself (see the `tax-br` skill's references) or the ancillary-obligation filing mechanics that often precede or accompany the payment (see the `sped-compliance` skill's references, e.g., `filing-calendar-manuals.md` for deadline-tracking discipline).

## Core Concepts
- **DARF (Documento de Arrecadação de Receitas Federais)**: the standard payment document for federal tax obligations (IRPJ, CSLL, PIS, Cofins, IRRF, and others per `tax-br`'s references) — requires the correct código de receita (revenue code) matched to the specific tax and situation, and the correct período de apuração, since Receita Federal's systems reconcile payments against declared liabilities by code and period, not merely by total amount.
- **GPS / DCTFWeb-generated guides**: social-security and related contribution payments increasingly flow through DCTFWeb-generated guides (see `sped-compliance` skill's `reinf-dctfweb.md`) rather than a standalone GPS in every case — confirm the current correct payment-guide mechanism for the specific obligation rather than assuming a historical guide type still applies unchanged.
- **State/municipal guias**: ICMS and ISS payments (see `tax-br` skill's `icms.md`, `iss.md`) use their own state- or municipality-specific guia formats and payment channels — there is no single national tax-payment document covering every tax type; the correct guia/channel is jurisdiction- and tax-specific.
- **Code-and-period precision is the primary integrity control**: a tax payment with the wrong código de receita or the wrong período de apuração can result in the payment being recorded against the wrong obligation entirely — leaving the intended obligation appearing unpaid (triggering penalties/interest) even though funds were actually disbursed — this makes code/period verification a higher-priority check than amount verification alone for tax payments specifically.
- **Deadline criticality and non-negotiability**: unlike some commercial payments where a short delay mainly affects a vendor relationship, a late tax payment generally triggers automatic, non-negotiable penalty and interest accrual under the applicable tax law — the SPED filing-calendar discipline (`sped-compliance` skill's `filing-calendar-manuals.md`) applies with particular force to the payment step itself, not only the ancillary-obligation filing.

## Decision Points
1. Which specific tax obligation does this payment satisfy, and does the guia/DARF/GPS being prepared carry the correct código de receita and período de apuração for that specific obligation?
2. Is the payment amount consistent with the liability calculated per the relevant `tax-br` reference (IRPJ/CSLL, PIS/Cofins, ICMS, ISS, IPI, IRRF/INSS withholding, or IBS/CBS test-phase amounts)?
3. Is the payment channel/guia format correct for the specific tax's jurisdiction (federal DARF, state/municipal-specific guia, or DCTFWeb-generated guide)?
4. Is the payment being prepared with sufficient margin before the deadline, per the `sped-compliance` skill's filing-calendar discipline, given the non-negotiable nature of late-payment penalties?
5. Does this payment relate to a corrected/amended liability (e.g., following an ECF adjustment) requiring a specific correction procedure rather than a standard current-period guia?

## Required Facts
- The specific tax obligation, its código de receita (federal) or jurisdiction-specific guia identifier, and the correct período de apuração.
- The calculated liability amount, sourced from the relevant `tax-br` reference's analysis.
- The applicable deadline for this specific obligation and period.
- Whether this is a standard current-period payment or a correction/amendment requiring different handling.

## Required Evidence
- The prepared guia/DARF/GPS document showing the specific código de receita and período de apuração.
- The underlying liability calculation supporting the payment amount (cross-referenced to the relevant `tax-br` reference).
- Confirmation of the applicable deadline for the specific obligation and period.

## Exceptions
- A tax obligation subject to a specific installment/parcelamento arrangement (whether a standard or special program) follows that arrangement's own guia/deadline rules rather than the standard current-period payment process — verify whether the specific liability is under such an arrangement before preparing a standard guia. `CORPORATE_CONTEXT_REQUIRED`/VERIFY_CURRENT_T1_SOURCE.
- A retificação (correction) of a previously-filed obligation may require a specific corrected guia referencing the original period, rather than treating the correction as a new, unrelated payment.

## Risk Considerations
- Using the wrong código de receita or período de apuração is a distinctively tax-specific risk (compared to general vendor payments) because it can leave the actual intended obligation appearing unpaid even after funds are disbursed, compounding the problem with penalties on top of the wasted payment.
- Treating tax-payment deadlines with the same flexibility as commercial payment terms ignores the generally automatic, non-negotiable nature of tax-specific penalty/interest accrual.
- Preparing a tax payment without first confirming the liability calculation against the relevant `tax-br` reference risks paying an incorrect amount (over- or under-payment), each with its own follow-up compliance burden.

## Human Escalation Conditions
Escalate for human tax/treasury review whenever: the correct código de receita or guia format for a specific obligation is uncertain; the payment relates to a correction/amendment or an installment arrangement; the calculated liability amount is disputed or unclear; or the deadline margin is insufficient given current preparation status.

## Source IDs
`receita` (T1 — DARF código de receita tables, federal tax-payment procedures), `sped` (T1 — DCTFWeb-generated guide mechanics, cross-referenced with `sped-compliance` skill), `sefaz`/`municipal-tax` (T1 — state/municipal guia formats and channels), `bacen` (T1 — payment-channel/settlement context where relevant).

## Freshness Requirements
Critical. Código de receita tables, guia formats, and deadlines are all subject to periodic revision (and, per `tax-br`'s `tax-reform-ibs-cbs.md`, the ongoing 2026 transition introduces new payment obligations alongside legacy ones); VERIFY_CURRENT_T1_SOURCE before any consequential payment preparation.

## Effective-Date Considerations
This reference's payment-preparation discipline (code/period precision, deadline criticality) is structurally stable across tax types and time; the specific códigos de receita, guia formats, and deadlines it applies to are volatile and governed by the corresponding `tax-br` and `sped-compliance` references' own effective-date considerations — notably the active 2026 tax-reform transition, which is introducing new IBS/CBS payment obligations alongside legacy ICMS/ISS/PIS/Cofins payments during the current coexistence phase.

## Related References
- `tax-br` skill's references (`irpj-csll.md`, `pis-cofins.md`, `icms.md`, `iss.md`, `ipi.md`, `irrf-inss-withholding.md`, `tax-reform-ibs-cbs.md`) — for the substantive liability calculations this reference's payments must accurately reflect.
- `sped-compliance` skill's `reinf-dctfweb.md` and `filing-calendar-manuals.md` — for the ancillary-obligation filings that often precede or accompany tax payments, and the deadline-tracking discipline this reference relies on.
- `vendor-payments-controls.md` (this skill) — for the general SoD/approval-separation framework this reference's payment preparation also operates within (a tax payment is prepared, never approved, by this skill, same as any other payment type).

## Known Limitations
- Does not embed any specific código de receita, guia format, or deadline — these are obligation- and jurisdiction-specific and must be confirmed via the relevant `tax-br`/`sped-compliance` reference and VERIFY_CURRENT_T1_SOURCE for each specific payment.
- Does not cover installment/parcelamento program mechanics in detail — these have their own specific rules distinct from standard current-period payment preparation.
- Sourced from secondary summaries and cross-references to this repository's own `tax-br`/`sped-compliance` research, not an independently re-fetched primary Receita Federal payment-procedure manual, in this research pass.
