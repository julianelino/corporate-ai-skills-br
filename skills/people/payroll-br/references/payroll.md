# Payroll (Folha de Pagamento — Estrutura Geral)

## Topics Covered
- payroll

## Purpose
Establish the general structure of a Brazilian payroll competência (salário-base, DSR, 13º salário, and the INSS/FGTS/IRRF framework) so that a specific rubric, event, or period can be analyzed against the correct baseline — before delegating to `incidences.md` for rubric-specific incidência treatment, `vacation.md` for férias, `termination-support.md` for rescisão, or `esocial.md` for reporting obligations.

## When to Load
Load whenever a request involves the general shape of a payroll competência — what a normal monthly run includes, how DSR and 13º salário fit into it, or the high-level INSS/FGTS/IRRF framework — before narrowing to a specific rubric or event-driven calculation, which belongs in this skill's other references.

## Scope
Covers CLT general remuneração framework (Art. 457 context, at a structural level — see `incidences.md` for the detailed integrar/não-integrar analysis), Lei nº 605/1949 (DSR), Lei nº 4.090/1962 (13º salário), and Lei nº 8.036/1990 Art. 15 (FGTS 8% base). Does not cover which specific rubrics integrate the calculation base (see `incidences.md`), férias-specific rules (see `vacation.md`), termination-specific calculations (see `termination-support.md`), or reporting mechanics (see `esocial.md`).

## Core Concepts
- **Competência vs. pagamento**: a payroll competência (the period being paid, e.g., "folha de novembro/2026") is distinct from the payment date; a rubric's tax/contribution treatment, and the reporting deadline, are generally tied to the competência and its statutory payment deadline, not an arbitrary payment date — confusing the two is a common source of calculation and compliance errors.
- **DSR — Descanso Semanal Remunerado (Lei 605/1949)**: paid weekly rest; for employees with a fixed monthly salary, DSR is generally already embedded in the monthly amount, but for variable-pay components (commission, piece-rate, and specific hourly-plus-variable arrangements), a separate DSR calculation on the variable portion is required — this is a frequent source of underpayment when only the fixed base is used to compute DSR.
- **13º salário (Lei 4.090/1962)**: an additional month's remuneration, generally paid in two installments — commonly the first by 2026-11-30 and the second by 2026-12-20 (verify the current year's exact statutory dates before relying on them), calculated as 1/12 of the annual base per month (or fraction ≥15 days) worked in the year. INSS and IRRF are withheld on the second installment (not split across both); FGTS applies to both installments.
- **INSS, IRRF, FGTS — structural roles**: INSS (employee contribution, withheld; employer contribution, borne by the company) funds social security; IRRF is income-tax withholding on the employee's remuneration above the exemption threshold; FGTS (8% of remuneration, per Art. 15, Lei 8.036/1990) is an employer-funded deposit to the employee's FGTS account, not a withholding from the employee's pay. Do not conflate FGTS (an employer cost) with INSS/IRRF (employee withholdings), even though all three commonly appear on the same payslip.
- **Tabelas oficiais (INSS/IRRF)**: the specific bracket thresholds and rates for both INSS and IRRF are revised periodically (commonly annually) by official instruction — this reference does not embed a specific table, since it would go stale; always confirm the currently-applicable table via `receita`/`mte` before a consequential calculation.

## Decision Points
1. Is this request about the general payroll structure/period, or does it concern a specific rubric's incidência (route to `incidences.md`), a férias event (route to `vacation.md`), a termination scenario (route to `termination-support.md`), or a reporting obligation (route to `esocial.md`)?
2. For a variable-pay employee, has DSR been calculated separately on the variable portion, or only embedded in a fixed base that doesn't reflect the variable component?
3. Which competência does the calculation belong to, and does its statutory payment/reporting deadline differ from the actual disbursement date being planned?
4. Are the INSS/IRRF bracket tables being used the currently-applicable ones for the relevant competência, or a potentially stale cached table?

## Required Facts
- The competência period and the employee's pay structure (fixed, variable, or mixed).
- Whether DSR needs separate calculation (variable-pay components present).
- 13º salário installment status (first/second, and whether the year is complete or the employee is mid-year).
- The currently-applicable INSS/IRRF bracket table for the competência in question. `CORPORATE_CONTEXT_REQUIRED` is not needed here — this is a public official table, but it must be current, not assumed.

## Required Evidence
- Payroll system parameterization showing how DSR is calculated for variable-pay employees. `CORPORATE_CONTEXT_REQUIRED`.
- The current official INSS/IRRF table being applied, with its effective date.
- FGTS deposit records for the competência, where a reconciliation is being performed.

## Exceptions
- Employees under specific statutory regimes (e.g., intermittent work, domestic employment under its own statute) have structurally different payroll mechanics than the general CLT framework summarized here — treat as `CORPORATE_CONTEXT_REQUIRED` to confirm the applicable regime before applying this reference's general structure.

## Risk Considerations
- Applying a stale INSS/IRRF table to a current competência is a common, consequential error — both under- and over-withholding create compliance exposure and employee-facing errors.
- Failing to calculate DSR separately for variable-pay components systematically underpays affected employees and creates recurring, compounding exposure across competências.
- Conflating FGTS (employer cost, not a withholding) with INSS/IRRF (employee withholdings) in explanation or calculation risks materially misstating the employee's net-pay impact.

## Human Escalation Conditions
Escalate for human payroll/legal review whenever: the applicable INSS/IRRF table's currency is uncertain; an employee's regime is ambiguous (CLT-general vs. a specific statute); or a DSR/13º calculation discrepancy is identified and its correction has retroactive, multi-competência implications.

## Source IDs
`planalto` (T1 — Lei 605/1949, Lei 4.090/1962, Lei 8.036/1990 Art. 15; not independently re-fetched due to the persistent planalto.gov.br connection failure documented across this repository's labor-law references), `receita` (T1 — current IRRF tables and withholding rules), `mte` (T1 — current INSS contribution tables and general payroll regulatory guidance), `esocial` (T1 — reporting-linked payroll structural requirements, detailed in `esocial.md`).

## Freshness Requirements
Critical. INSS/IRRF bracket tables change periodically (commonly annually); 13º salário and other statutory deadlines should be confirmed for the specific current year before a consequential calculation.

## Effective-Date Considerations
DSR (1949) and 13º salário (1962) are long-standing, stable statutory frameworks not materially altered by the 2017 reform; the FGTS 8% base (Lei 8.036/1990) is likewise stable in its general rule. The volatile element is the INSS/IRRF table, which changes on its own periodic cycle independent of these underlying laws — treat the underlying legal framework as CURRENT/stable, but always re-check the specific numeric table in force for the competência being calculated.

## Related References
- `incidences.md` (this skill) — for which specific rubrics integrate the INSS/FGTS/IRRF calculation base.
- `vacation.md` (this skill) — for férias-specific payroll treatment.
- `termination-support.md` (this skill) — for rescisão-specific payroll calculations.
- `esocial.md` (this skill) — for the reporting events this payroll data feeds into.
- `labor-law-br`'s `termination.md` and `working-time.md` — for the legal basis behind rescisão and overtime rubrics respectively.

## Known Limitations
- Deliberately does not embed a specific current INSS/IRRF bracket table, since any such table would go stale immediately and risk being relied on past its validity — always confirm the current table via `receita`/`mte`.
- Does not cover specific-regime payroll mechanics (intermittent work, domestic employment, rural employment), which have their own statutory particulars. `CORPORATE_CONTEXT_REQUIRED` to confirm regime before applying this reference.
- The 13º salário installment dates cited are the commonly-applied statutory deadlines; confirm against a current source for the specific year, since a national holiday/weekend adjustment or a specific-year exception could shift the practical deadline.
