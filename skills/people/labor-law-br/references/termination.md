# Termination (Rescisão do Contrato de Trabalho)

## Topics Covered
- termination

## Purpose
Determine which termination modality applies to a given fact pattern, which verbas rescisórias and deadlines it triggers, and which stability/guarantee facts or procedural defects would invalidate an otherwise straightforward dismissal.

## When to Load
Load whenever a request involves ending an employment contract — dismissal (with or without cause), resignation, rescisão indireta, mutual-agreement termination, or a fixed-term contract's early end — before calculating verbas, drafting termination documents, or advising on timing.

## Scope
Covers CLT Arts. 477–486 (rescisão contratual, verbas, prazos) and Art. 484-A (rescisão por acordo, introduced by Lei nº 13.467/2017). Does not cover the substantive grounds for justa causa itself (see `discipline.md`) or litigation over a contested termination (see `labor-litigation.md`).

## Core Concepts
- **Dispensa sem justa causa**: employer-initiated, no employee fault. Triggers full verbas: saldo de salário, aviso prévio (worked or indemnified), 13º salário proporcional, férias vencidas + proporcionais (+1/3), FGTS deposits regularized plus the 40% multa on the full FGTS balance, and access to seguro-desemprego and FGTS withdrawal.
- **Dispensa por justa causa (Art. 482)**: employer-initiated, employee fault. Excludes aviso prévio, the 13º/férias proporcionais, the 40% FGTS multa, and seguro-desemprego eligibility; saldo de salário and férias vencidas (already accrued, non-proportional) remain due. See `discipline.md` for the Art. 482 grounds and the imediatidade requirement that determines whether a justa causa is valid at all.
- **Pedido de demissão**: employee-initiated. No 40% multa, no seguro-desemprego, no FGTS withdrawal (except specific statutory exceptions); if the employee fails to give aviso prévio, the employer may deduct the equivalent period from what is owed.
- **Rescisão indireta (Art. 483)**: employee-initiated termination for employer fault (e.g., an employer requiring services beyond the employee's capacity or against the law, treating the employee with excessive rigor, exposing the employee to serious risk, failing to fulfill contractual obligations, or reducing the employee's work in a way that materially harms them). Produces the same verbas as a dispensa sem justa causa. Requires proof of the employer fault — same imediatidade logic as justa causa applies by analogy (the employee should act within a reasonable time of the fault, or risk perdão tácito arguments).
- **Rescisão por acordo (Art. 484-A, Lei 13.467/2017)**: mutual-agreement termination. Employee receives half the aviso prévio indemnification (if not worked), half the 40% FGTS multa (i.e., 20%), and all other verbas in full; may withdraw up to 80% of the FGTS balance; no seguro-desemprego.
- **Culpa recíproca (Art. 484)**: both parties at fault; verbas reduced to half of what a dispensa sem justa causa would generate — a judicial determination, not something either party can unilaterally declare.
- **Aviso prévio proporcional (Lei nº 12.506/2011)**: the statutory 30-day minimum aviso prévio increases by 3 days per year of service beyond the first, capped at 90 days total — applies to employer-initiated dismissals without cause.

## Decision Points
1. Which party initiated the termination, and on what stated basis? (Determines the applicable modality and verbas set.)
2. If employer-initiated for cause, does the fact pattern actually satisfy an Art. 482 ground with intact imediatidade? (See `discipline.md` — a defective justa causa converts to dispensa sem justa causa for verbas purposes, and may support a labor claim.)
3. Does the employee have an active stability or guarantee (gestante, CIPA member, work-accident stability, pre-retirement per applicable CCT, union leadership) that blocks or restricts termination without cause? `CORPORATE_CONTEXT_REQUIRED` for CCT-based stabilities.
4. What is the employee's length of service? (Determines aviso prévio proportional days.)
5. Is a rescisão por acordo genuinely mutual, or is it being used to disguise an employer-driven dismissal to avoid full verbas? (A one-sided imposition mislabeled as Art. 484-A is a live litigation risk.)
6. Has the Art. 477 §6º payment deadline (10 calendar days from the termination date) been calculated correctly?

## Required Facts
- Termination date and the party who initiated it.
- Stated reason, and whether it maps to a specific Art. 482 ground or Art. 483 fault.
- Employee's admission date (for length-of-service and aviso prévio proportional calculation).
- Any stability/guarantee condition in effect at the termination date.
- Applicable CCT/ACT clauses affecting verbas, notice, or additional guarantees. `CORPORATE_CONTEXT_REQUIRED`.
- Whether aviso prévio was worked, indemnified, or waived by agreement.

## Required Evidence
- Documentation supporting the stated reason (for cause or rescisão indireta claims) — see `discipline.md`'s evidence standard.
- Proof of the termination date and any prior notice given.
- FGTS deposit history (to compute the 40%/20% multa base accurately).
- The signed TRCT (Termo de Rescisão do Contrato de Trabalho) once issued.

## Exceptions
- A pregnant employee's contract generally cannot be terminated without cause during the constitutionally protected stability period regardless of the employer's stated reason, subject to the specific exceptions recognized in current law/jurisprudence — treat any attempted no-cause dismissal of a pregnant employee as requiring escalation, not a default proceed.
- A rescisão por acordo cannot be used to strip a stability holder of protections that stability was meant to guarantee merely by mutual-sounding paperwork; do not treat the label alone as dispositive.

## Risk Considerations
- Misclassifying a dispensa sem justa causa as justa causa to avoid the 40% multa and aviso prévio is a common, high-risk error that exposes the company to reversion in litigation plus potential moral-damages exposure.
- Missing the Art. 477 §6º ten-day payment deadline exposes the company to the Art. 477 §8º penalty (one month's salary, or the applicable current equivalent) — verify the current text/amount before quoting a specific figure.
- Treating a rescisão por acordo as a way to reduce verbas for a termination the employer actually initiated unilaterally is a recognized litigation pattern; do not draft or recommend an Art. 484-A framing unless the mutuality is genuinely evidenced.

## Human Escalation Conditions
Escalate for human legal review whenever: the employee may hold any form of stability/guarantee; the termination reason is disputed or evidentially thin; a rescisão indireta is being considered or alleged; the termination involves a material number of employees (potential collective-dismissal implications); or verbas cannot be confidently calculated from the facts on hand.

## Source IDs
`planalto` (T1 — CLT Arts. 477–486, Lei 12.506/2011; not independently re-fetched for this reference due to the same persistent planalto.gov.br connection failure documented in `collective-bargaining.md` and `scripts/check-source-freshness.mjs` — content cross-checked via secondary summaries of the current statutory text, not a primary re-fetch), `mte` (T1 — regulatory guidance on rescisão/FGTS multa), `tst` (T1 — jurisprudence on rescisão indireta, culpa recíproca, and stability disputes; not independently checked for this reference).

## Freshness Requirements
Critical. Verbas amounts, deadlines, and stability rules are frequently litigated and occasionally adjusted; re-verify against a current T1 source before any consequential calculation or determination — do not rely on this reference's percentages/deadlines as a substitute for a current check.

## Effective-Date Considerations
- **CURRENT (since 2017-11-11, Lei 13.467/2017):** Art. 484-A rescisão por acordo modality exists.
- **SUPERSEDED (until 2017-11-10):** no mutual-agreement termination modality existed in the CLT; terminations were binary (employer-initiated or employee-initiated) plus culpa recíproca.
- Aviso prévio proportional (Lei 12.506/2011) applies to any dismissal without cause since its 2011 enactment; do not apply it to justa causa dismissals (no aviso prévio is due there at all).

## Related References
- `discipline.md` (this skill) — required before treating any Art. 482-based justa causa as valid.
- `working-time.md` (this skill) — relevant when disputed overtime or interval violations are the basis for a rescisão indireta claim.
- `labor-litigation.md` (this skill) — once a termination is contested.
- `collective-bargaining.md` (this skill) — check for CCT/ACT clauses affecting notice, verbas, or additional stability.

## Known Limitations
- Specific verbas percentages and the Art. 477 §8º penalty amount are cited from secondary sources, not an independently re-fetched primary text, due to the planalto.gov.br access failure; re-verify exact current figures before a consequential calculation.
- Does not cover collective/mass-dismissal-specific procedural requirements, which involve additional union-notification obligations not detailed here.
- Does not cover the specific stability periods' exact durations (e.g., the precise post-accident CIPA stability window), which should be confirmed against a current T1 source per case.
