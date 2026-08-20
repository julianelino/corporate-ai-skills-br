# Discrimination (Práticas Discriminatórias no Emprego)

## Topics Covered
- discrimination

## Purpose
Identify when an employment practice (hiring, pay, promotion, termination, or day-to-day treatment) is discriminatory under Brazilian law, and structure a response that addresses the specific practice and its legal exposure — before any conclusion about whether a decision or pattern is discriminatory.

## When to Load
Load whenever a request involves a claim, pattern, or risk of discriminatory treatment based on a protected characteristic (sex/gender, race, age, origin, disability, pregnancy, religion, or similar), or a pay-equity question — before characterizing a decision as discriminatory or non-discriminatory.

## Scope
Covers Lei nº 9.029/1995 (prohibited discriminatory practices in employment access and maintenance, including pregnancy/sterility-related discrimination), Lei nº 12.288/2010 (Estatuto da Igualdade Racial, employment-relevant provisions), and Lei nº 14.611/2023 (equal pay and remuneration-criteria equality between men and women, amending the CLT). Does not cover harassment framed primarily as assédio (see `harassment.md`) or the disciplinary process for a substantiated case (see `discipline.md`).

## Core Concepts
- **Lei 9.029/1995**: prohibits discriminatory practices for access to or maintenance of an employment relationship based on sex, origin, race, color, marital status, family situation, disability, age, among other factors, and specifically prohibits requiring pregnancy or sterilization certificates/tests as a condition for hiring or continued employment. Violations carry both administrative and criminal consequences.
- **Estatuto da Igualdade Racial (Lei 12.288/2010)**: establishes rights and guarantees against racial discrimination, including in employment contexts, as part of a broader statute; its employment-specific provisions should be read alongside Lei 9.029/1995's general prohibition rather than as a substitute for it.
- **Lei 14.611/2023 — Igualdade Salarial**: amends the CLT to require equal pay and remuneration criteria for equal work or work of equal value between men and women, and — for companies above a headcount threshold (commonly cited as more than 100 employees; verify the current threshold before asserting applicability) — requires semi-annual Relatórios de Transparência Salarial e de Critérios Remuneratórios and, where a gap is identified, a Plano de Ação de Mitigação da Desigualdade Salarial. `CORPORATE_CONTEXT_REQUIRED` for the company's actual headcount and whether it currently meets the reporting threshold.
- **Direct vs. indirect discrimination**: a facially neutral policy or practice that disproportionately disadvantages a protected group can constitute discrimination even without an explicit discriminatory criterion — do not limit analysis to only overtly stated discriminatory reasons.
- **Burden and pattern evidence**: a single adverse decision is rarely conclusive on its own; pattern evidence (how similarly-situated employees outside the protected group were treated) is often the practical basis for establishing or rebutting a discrimination claim — this connects directly to `discipline.md`'s consistency principle.

## Decision Points
1. Does the practice or decision involve, explicitly or in its pattern of application, a protected characteristic (sex, race, age, origin, disability, pregnancy, family situation, or similar)?
2. If the practice is facially neutral, does it produce a disproportionate adverse effect on a protected group (indirect discrimination)? This requires pattern/statistical evidence, not assumption.
3. For a pay-related question, does the company meet the Lei 14.611/2023 reporting threshold, and if so, is its most recent Relatório de Transparência Salarial current and does it show a gap requiring a mitigation plan? `CORPORATE_CONTEXT_REQUIRED`.
4. Is there comparator evidence — how were similarly-situated employees outside the relevant protected group treated in comparable circumstances?
5. Does the fact pattern also implicate a specific statutory prohibition (e.g., a pregnancy-related test or certificate requirement under Lei 9.029/1995) that is independently unlawful regardless of intent?

## Required Facts
- The specific practice or decision, the protected characteristic potentially implicated, and whether the connection is explicit or requires pattern inference.
- Comparator treatment of similarly-situated employees outside the protected group.
- The company's headcount and current Lei 14.611/2023 reporting status, if a pay-equity question is involved. `CORPORATE_CONTEXT_REQUIRED`.
- Any documented, legitimate, non-discriminatory business justification offered for the practice or decision.

## Required Evidence
- Documentation of the decision/practice and its stated rationale.
- Comparator data for similarly-situated employees, where available.
- Current pay-equity reporting data, if applicable. `CORPORATE_CONTEXT_REQUIRED`.
- Any policy documents governing the practice at issue.

## Exceptions
- A legitimate, consistently-applied, job-related criterion (e.g., a genuine occupational requirement) is not discriminatory merely because it correlates with a protected characteristic — but the legitimacy and consistency of the criterion itself must be evidenced, not assumed, especially where it produces a disproportionate effect.
- Affirmative or inclusion-oriented measures designed to address historical underrepresentation operate under a different legal framework than anti-discrimination prohibitions and are not analyzed the same way as a claim of adverse discriminatory treatment — treat as requiring separate, dedicated analysis rather than folding into this reference's framework.

## Risk Considerations
- Requiring or informally relying on pregnancy/sterility-related information in hiring or continued-employment decisions is independently unlawful under Lei 9.029/1995 regardless of any other justification offered — treat as a hard prohibition, not a balancing test.
- Facially neutral practices with a demonstrable disparate impact on a protected group carry real exposure even without any explicit discriminatory statement — do not clear a practice solely because no one said anything overtly discriminatory.
- Missing the Lei 14.611/2023 reporting deadline, or failing to produce a mitigation plan after an identified gap, is an independent compliance failure distinct from any individual discrimination claim.

## Human Escalation Conditions
Escalate for human legal review whenever: a specific employment decision is alleged to be discriminatory; a pay-equity gap is identified and a mitigation plan is required; a facially neutral policy shows a disparate-impact pattern; or the company's Lei 14.611/2023 reporting obligations and current compliance status are unclear.

## Source IDs
`planalto` (T1 — Lei 9.029/1995, Lei 12.288/2010, Lei 14.611/2023; not independently re-fetched due to the persistent planalto.gov.br connection failure documented across this repository's labor-law references), `mte` (T1 — Igualdade Salarial program guidance and reporting-template requirements), `tst` (T1 — jurisprudence on direct/indirect discrimination and comparator-evidence standards; not independently checked for this reference).

## Freshness Requirements
Critical. The Lei 14.611/2023 headcount threshold, reporting cadence, and mitigation-plan mechanics are precise compliance parameters; re-verify against a current T1/`mte` source before asserting a specific company's current obligation status.

## Effective-Date Considerations
- **CURRENT (since 2023-07-03, Lei 14.611/2023):** equal-pay/remuneration-criteria requirement and, for companies above the applicable headcount threshold, semi-annual transparency reporting and mitigation-plan obligations.
- **CURRENT (since 1995, Lei 9.029/1995):** general prohibition on discriminatory employment practices, including the pregnancy/sterility-specific prohibitions — long-standing and not altered by the more recent pay-equity law, which supplements rather than replaces it.
- **CURRENT (since 2010, Lei 12.288/2010):** Estatuto da Igualdade Racial's employment-relevant provisions.

## Related References
- `harassment.md` (this skill) — discriminatory conduct can overlap with harassment when it involves repeated, dignity-attacking treatment tied to a protected characteristic.
- `discipline.md` (this skill) — consistency analysis across comparable cases is directly relevant to rebutting or establishing a discrimination claim.
- `grievance.md` (this skill) — for the process an employee uses to raise a discrimination concern internally.
- `hr-privacy-lgpd` skill — pay-equity reporting and any protected-characteristic data handling implicate LGPD considerations independently of the discrimination analysis itself.

## Known Limitations
- The exact current Lei 14.611/2023 headcount threshold and reporting-template specifics are cited from secondary sources, not an independently re-fetched primary text, due to the planalto.gov.br access failure; re-verify before asserting a specific company's obligation.
- Does not cover disability-specific employment-quota obligations (cotas para pessoas com deficiência), which are a related but distinct statutory framework not researched in this pass.
- Indirect/disparate-impact analysis requires actual comparator/statistical data that is `CORPORATE_CONTEXT_REQUIRED` and cannot be assumed or fabricated for a specific case.
