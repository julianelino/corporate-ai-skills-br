# IRRF and INSS Withholding (Retenção na Fonte)

## Topics Covered
- IRRF
- INSS withholding

## Purpose
Determine whether a specific payment triggers IRRF and/or INSS withholding obligations for the paying entity, and which withholding mechanism/rate category applies — before processing a payment or advising on a withholding obligation.

## When to Load
Load whenever a request involves a payment (to an individual or a legal entity, for services or other income) that may trigger a withholding obligation — before disbursing the payment or configuring the withholding calculation.

## Scope
Covers the general IRRF withholding framework (RIR/2018) for payments to individuals and legal entities, and Lei nº 9.711/1998's INSS withholding regime for cessão de mão de obra and empreitada. Does not cover the specific current progressive-table brackets for individual IRRF withholding (VERIFY_CURRENT_T1_SOURCE — these are revised by subsequent legislation) or general payroll withholding already covered in the `payroll-br` skill's `payroll.md`/`incidences.md` references (this reference focuses on third-party/vendor payment withholding, not employee payroll).

## Core Concepts
- **IRRF on payments to individuals (pessoa física)**: subject to the progressive monthly withholding table (tabela progressiva), which is periodically revised by specific legislation (e.g., recent adjustments under Lei 14.848/2024, itself potentially superseded by later legislation) — VERIFY_CURRENT_T1_SOURCE for the current bracket thresholds and rates before a consequential withholding calculation.
- **IRRF on payments to legal entities (pessoa jurídica) for services**: commonly subject to a flat withholding rate for specified service categories (e.g., a commonly-cited 1.5% rate under RIR/2018 Art. 714 for certain professional/technical services) — the specific rate depends on the service category; VERIFY_CURRENT_T1_SOURCE and confirm the payment falls within a category actually subject to withholding, since not all PJ payments trigger IRRF withholding by default.
- **INSS withholding on cessão de mão de obra/empreitada (Lei 9.711/1998)**: a contracting company paying a service provider under a cessão de mão de obra (labor-supply arrangement where workers are placed at the contractor's disposal, under its direction) or empreitada (specific work-contract) arrangement must withhold a percentage (commonly cited as 11% of the gross invoice value, subject to specific base-calculation adjustments) and remit it directly to the INSS on the service provider's behalf — this is distinct from, and in addition to, any IRRF withholding on the same payment.
- **Cessão de mão de obra — the qualifying test**: not every service contract triggers the 11% INSS withholding — it applies specifically to arrangements involving cleaning, surveillance/security (vigilância), construction, and other statutorily-listed activities placing workers under the contractor's direction/subordination — a service contract without this labor-placement/subordination character (e.g., a simple product-delivery contract) generally does not trigger this withholding. Verify the specific activity against the current statutory list rather than assuming all outsourced-labor arrangements qualify.
- **Interaction with ISS/simples**: withholding obligations (IRRF, INSS, and municipally-mandated ISS retention where applicable) can apply simultaneously to the same payment, each governed by its own rules and each requiring separate calculation and remittance — do not assume satisfying one withholding obligation addresses the others.

## Decision Points
1. Is the payment to an individual (pessoa física, triggering the progressive IRRF table) or a legal entity (pessoa jurídica, triggering a service-category-specific flat rate, if any)?
2. For a PJ payment, does the specific service category fall under a statutory IRRF withholding requirement, and at what current rate? VERIFY_CURRENT_T1_SOURCE.
3. Does the arrangement qualify as cessão de mão de obra or empreitada under Lei 9.711/1998's specific activity list, triggering the 11% INSS withholding requirement?
4. Do IRRF and INSS withholding both apply to the same payment, requiring separate calculation and remittance for each?
5. Does a municipal ISS-retention obligation also apply to this payment (see `iss.md`), compounding the total withholding obligations on a single invoice?

## Required Facts
- The payee type (individual vs. legal entity) and, for legal entities, the specific service category.
- Whether the arrangement involves labor placement/subordination qualifying as cessão de mão de obra or empreitada.
- The gross payment amount and any statutory base adjustments (e.g., specific deductions permitted before applying the INSS withholding percentage).
- Whether municipal ISS retention also applies to the same payment.

## Required Evidence
- The service contract, establishing its nature (labor-placement/subordination vs. simple service delivery) for the cessão-de-mão-de-obra qualification test.
- Invoice/nota fiscal documentation supporting the withholding-base calculation.
- Current rate tables for IRRF (progressive, for individuals; category-specific, for legal entities) and the current INSS withholding percentage. VERIFY_CURRENT_T1_SOURCE.

## Exceptions
- Payments to entities under Simples Nacional are generally subject to different (often reduced or exempted) withholding treatment compared to entities under the general tax regime — do not apply the general PJ withholding rules without first checking the payee's tax regime. `CORPORATE_CONTEXT_REQUIRED`/VERIFY_CURRENT_T1_SOURCE.
- Some service categories are specifically excluded from IRRF withholding despite superficially resembling a withholding-triggering category — verify the specific service against current RIR/2018 categorization rather than assuming inclusion.

## Risk Considerations
- Applying a stale progressive IRRF table to an individual payment is a common, consequential error given the table's periodic legislative revision.
- Failing to identify a cessão-de-mão-de-obra arrangement (and therefore omitting the 11% INSS withholding) exposes the contracting company to liability for the unwithheld amount plus penalties, since Lei 9.711/1998 places this withholding obligation on the paying entity, not the service provider.
- Applying the 11% INSS withholding to a service contract that does not actually involve labor placement/subordination overstates the withholding and can create unnecessary cash-flow and reconciliation burden for the service provider.

## Human Escalation Conditions
Escalate for human tax review whenever: a service arrangement's qualification as cessão de mão de obra is genuinely ambiguous; the payee's tax regime (general vs. Simples Nacional) affects withholding treatment and is unconfirmed; multiple withholding obligations (IRRF, INSS, ISS) may apply simultaneously and their interaction is unclear; or current rate/table figures cannot be confirmed against a current source.

## Source IDs
`receita` (T1 — current IRRF progressive table and PJ service-category withholding rates), `planalto` (T1 — Lei 9.711/1998, RIR/2018; not independently re-fetched due to the persistent planalto.gov.br connection failure documented across this repository's labor-law references), `mte`/`esocial` (T1 — INSS-withholding-related reporting mechanics, cross-referenced with the `payroll-br` skill's `esocial.md`), `econet` (T3 — practical withholding-category guidance; secondary only, never sole authority).

## Freshness Requirements
Critical. The IRRF progressive table for individuals is revised periodically by specific legislation (most recently referenced via Lei 14.848/2024 in this research, itself subject to further revision); VERIFY_CURRENT_T1_SOURCE before any consequential withholding calculation.

## Effective-Date Considerations
Lei 9.711/1998's 11% INSS withholding framework for cessão de mão de obra/empreitada has been in force since February 1999 and is structurally stable; the IRRF progressive table for individuals, by contrast, is the volatile element, revised by subsequent legislation (Lei 14.848/2024 is the most recent revision referenced in this research, but confirm no more recent law has further adjusted it) — treat any specific bracket/rate cited elsewhere as requiring current verification, not a fixed current fact.

## Related References
- `payroll-br` skill's `payroll.md` and `incidences.md` — for employee-payroll withholding (INSS/IRRF as employee deductions), a distinct mechanism from this reference's third-party/vendor-payment withholding.
- `iss.md` (this skill) — for municipal ISS retention obligations that can apply alongside IRRF/INSS withholding on the same service payment.
- `payments` skill — for the payment-preparation and approval-separation controls this withholding calculation feeds into.

## Known Limitations
- Does not state a specific current IRRF progressive-table bracket or PJ service-category rate as reliable current fact — VERIFY_CURRENT_T1_SOURCE per this reference's own repeated flags.
- Does not enumerate the complete Lei 9.711/1998 activity list qualifying for INSS withholding — verify the specific activity against current `receita`/INSS guidance.
- Sourced from secondary summaries, not an independently re-fetched primary text, in this research pass.
