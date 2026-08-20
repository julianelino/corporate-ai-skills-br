# Termination Support (Cálculo de Verbas Rescisórias)

## Topics Covered
- termination-support

## Purpose
Support the payroll simulation and calculation of verbas rescisórias once a termination scenario and its legal basis have already been established — this reference never authorizes or determines the termination itself, only supports the resulting calculation once `labor-law-br`'s `termination.md` analysis (or a human-approved decision) confirms the modality.

## When to Load
Load only after the termination modality and its human-approved basis are known — to calculate saldo de salário, aviso prévio, 13º/férias proporcionais, and the FGTS multa base for a specific, already-determined termination scenario.

## Scope
Covers the payroll-calculation mechanics for CLT Arts. 477–486 verbas (see `labor-law-br`'s `termination.md` for the legal modality analysis itself) and the Art. 477 §6º ten-calendar-day payment deadline. Does not determine which termination modality applies (see `labor-law-br`'s `termination.md`) or resolve stability/guarantee questions (also `labor-law-br`'s `termination.md`).

## Core Concepts
- **Saldo de salário**: days worked in the termination month up to the last day, calculated pro-rata on the monthly base plus any salário-natured rubrics per `incidences.md`.
- **Aviso prévio (indemnified vs. worked)**: if indemnified, the aviso prévio period is paid but not worked, and — per current doctrine — generally still projects forward for length-of-service and verbas-calculation purposes (e.g., extending the period counted for 13º/férias proporcionais and, in some analyses, the FGTS deposit base); if worked, it is paid as ordinary salary for the period actually worked. Use `labor-law-br`'s `termination.md` for the proportional-days calculation (Lei 12.506/2011).
- **13º salário proporcional**: 1/12 per month (or fraction ≥15 days) worked in the termination year, up to and including the projected aviso prévio period where indemnified — verify current treatment of the aviso-prévio projection effect before a consequential calculation.
- **Férias proporcionais + vencidas**: proportional férias for the current (incomplete) período aquisitivo, plus any férias vencidas (already-accrued but not yet granted) from a prior, closed período aquisitivo — both with the 1/3 constitutional additional. See `vacation.md` for the underlying período aquisitivo/concessivo mechanics; a férias vencidas balance found to be past its período concessivo carries the férias em dobro exposure described there, which should be reflected in the termination calculation.
- **FGTS multa base**: the 40% (dispensa sem justa causa) or 20% (rescisão por acordo, Art. 484-A) multa is calculated over the full FGTS balance deposited during the entire employment relationship, not merely the final competência — an incomplete or unreconciled FGTS deposit history will understate the multa base.
- **Art. 477 §6º deadline**: verbas rescisórias must generally be paid within 10 calendar days of the termination date, regardless of modality — verify the current text/any modality-specific variation before relying on this as a fixed universal rule, and verify the current penalty amount for a missed deadline before quoting a specific figure.

## Decision Points
1. Has the termination modality already been determined (per `labor-law-br`'s `termination.md`)? This reference does not itself determine modality — do not proceed with a calculation if the modality is still in dispute or unconfirmed.
2. Is aviso prévio being indemnified or worked, and has its projection effect on 13º/férias proporcionais been correctly applied?
3. Does the employee have a férias vencidas balance, and if so, is it within or past its período concessivo (double-payment exposure)?
4. Is the FGTS deposit history complete and reconciled for the full employment relationship, to correctly compute the 40%/20% multa base?
5. Has the Art. 477 §6º ten-day deadline been calculated correctly from the termination date, and does the payment plan meet it?

## Required Facts
- Confirmed termination modality and its date (from `labor-law-br`'s `termination.md` analysis or a human-approved decision).
- Aviso prévio treatment (indemnified/worked) and its proportional-days count.
- Férias status: proportional period, and any vencidas balance with its período concessivo status.
- Complete FGTS deposit history for the employment relationship.

## Required Evidence
- The confirmed, human-approved termination decision and its stated modality/date.
- FGTS deposit statements covering the full employment relationship.
- Payroll history sufficient to compute 13º and férias proportional bases, including salário-natured rubrics per `incidences.md`.
- Any CCT/ACT terms affecting verbas amounts or deadlines. `CORPORATE_CONTEXT_REQUIRED`.

## Exceptions
- This reference does not itself resolve a stability/guarantee conflict (e.g., a pregnant employee, a CIPA member) — that determination belongs to `labor-law-br`'s `termination.md` and must be resolved before a calculation proceeds, since it may render a no-cause dismissal invalid regardless of the calculated verbas.
- Rescisão por acordo (Art. 484-A) verbas differ structurally (half aviso prévio if indemnified, 20% not 40% FGTS multa, no seguro-desemprego) — do not apply the dispensa-sem-justa-causa verbas set to an Art. 484-A scenario.

## Risk Considerations
- Calculating verbas before the termination modality is confirmed risks producing a simulation that doesn't match the actual legal basis, which is misleading if presented as final.
- Using an incomplete FGTS deposit history to compute the multa base systematically understates the amount owed and creates real compliance and litigation exposure.
- Missing the Art. 477 §6º payment deadline exposes the company to the statutory penalty independent of whether the calculated verbas amounts themselves were correct.
- Failing to apply the férias em dobro exposure to an expired-período-concessivo vencidas balance produces an understated calculation.

## Human Escalation Conditions
Escalate for human payroll/legal review whenever: the termination modality is not yet confirmed; the FGTS deposit history is incomplete or shows discrepancies; a férias vencidas balance's período concessivo status is uncertain; or the Art. 477 §6º deadline cannot be met and a mitigation plan is needed.

## Source IDs
`planalto` (T1 — CLT Arts. 477–486; not independently re-fetched due to the persistent planalto.gov.br connection failure documented across this repository's labor-law references), `fgts-digital` (T1 — FGTS deposit/multa mechanics and reconciliation), `esocial` (T1 — termination-event reporting requirements, detailed in `esocial.md`), `receita` (T1 — IRRF treatment of termination verbas).

## Freshness Requirements
Critical. Verbas percentages, the Art. 477 §6º penalty amount, and the aviso-prévio projection effect on other verbas are precise, consequential calculation parameters; re-verify against a current T1 source before any consequential calculation.

## Effective-Date Considerations
This reference's calculation mechanics depend entirely on the modality-specific rules in `labor-law-br`'s `termination.md`, which carries its own effective-date considerations (notably the Art. 484-A rescisão por acordo modality, CURRENT since 2017-11-11) — always confirm the applicable modality's current-law status there before applying this reference's calculation mechanics.

## Related References
- `labor-law-br`'s `termination.md` — required first, to determine the modality and confirm no unresolved stability/guarantee conflict exists.
- `incidences.md` (this skill) — for which rubrics feed the saldo de salário and verbas calculation bases.
- `vacation.md` (this skill) — for the underlying férias período aquisitivo/concessivo and férias em dobro mechanics.
- `esocial.md` (this skill) — for the termination-specific reporting events (e.g., S-2299) this calculation feeds into.

## Known Limitations
- Does not independently re-verify the current Art. 477 §6º penalty amount against a primary source in this research pass; re-verify before quoting a specific figure.
- Does not resolve the aviso-prévio-indemnified projection effect on FGTS deposit base with full certainty — treatments vary by analysis and this reference flags it as requiring current verification rather than asserting a fixed rule.
- Assumes the modality determination and any stability conflict have already been resolved elsewhere (`labor-law-br`'s `termination.md`); does not itself perform that legal analysis.
