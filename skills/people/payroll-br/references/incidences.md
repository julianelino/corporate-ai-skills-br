# Incidences (Incidência de Encargos sobre Rubricas)

## Topics Covered
- incidences

## Purpose
Determine whether a specific payroll rubric (event/verba) integrates the remuneration base for INSS, FGTS, and IRRF purposes — the natureza salarial vs. indenizatória distinction that drives nearly every payroll incidência question — before calculating or configuring a rubric's tax/contribution treatment.

## When to Load
Load whenever a request involves classifying a specific payroll rubric's incidência (does it generate INSS/FGTS/IRRF, and does it feed into the base for horas extras, DSR, 13º, or férias calculations) — before configuring a rubric or explaining its treatment.

## Scope
Covers CLT Art. 457 (remuneração — what integrates salário) and Art. 458 (utilidades), and Lei nº 8.036/1990 Art. 15 (FGTS base, tracks the Art. 457/458 remuneração concept). Does not cover the general payroll structure (see `payroll.md`), férias-specific incidência timing (see `vacation.md`), or termination-specific verbas (see `termination-support.md`).

## Core Concepts
- **Natureza salarial vs. indenizatória**: the single most consequential distinction in this reference. A rubric with natureza salarial (part of "remuneração" under Art. 457) integrates the base for INSS, FGTS, and generally also feeds into the calculation base for horas extras, DSR, 13º, and férias. A rubric with natureza indenizatória (compensating a specific cost or loss, not compensating labor itself) generally does not integrate that base for INSS/FGTS, though it may still be subject to IRRF depending on its specific nature.
- **Art. 457, §2º exclusions (as amended by Lei 13.467/2017)**: importâncias pagas a título de ajuda de custo, auxílio-alimentação (desde que não pago em dinheiro), diárias para viagem, prêmios, and abonos do not integrate the remuneração for any legal effect, even when paid habitually — the 2017 reform specifically removed the pre-existing habitualidade trigger that used to convert some of these into salário-natured rubrics after repeated payment.
- **Art. 458 utilidades**: in-kind benefits (e.g., alimentação, when provided in-kind rather than in cash) generally integrate salário for all effects, except specific carve-outs (vestuário/equipamentos used for the job itself, and other specific exclusions) which Art. 458 itself does not treat as salário.
- **FGTS base tracks Art. 457/458 (Lei 8.036/1990, Art. 15)**: whatever integrates remuneração under the CLT's own definition generally also forms the FGTS 8% base — the two frameworks are meant to move together, not be analyzed independently.
- **Horas extras, DSR, 13º, férias — cascading base effect**: a rubric that integrates the salário base (e.g., a habitual commission) generally must also be reflected in the calculation base for DSR, 13º, and férias, not just for INSS/FGTS purposes — treating a rubric's incidência as "only about INSS/FGTS" and ignoring its cascading effect on these other calculations is a common, systemic underpayment pattern.

## Decision Points
1. Is the rubric compensating labor/service (salário-natured) or compensating a specific cost, loss, or one-off event (indenizatória-natured)? This is the threshold question for every subsequent step.
2. If salário-natured, does it integrate INSS, FGTS, and the DSR/13º/férias calculation base — all together, not selectively?
3. If claimed as indenizatória under an Art. 457, §2º category (ajuda de custo, auxílio-alimentação in-kind, diárias, prêmios, abonos), does it genuinely fit that category's substance, or is it a mislabeled salário-natured payment? Post-2017, habitualidade alone no longer converts these into salário — but mislabeling a payment that doesn't substantively fit the category remains a real risk.
4. For an in-kind utilidade (Art. 458), does it fall within a specific statutory exclusion (e.g., work-tools/uniforms), or does it integrate salário for all effects?
5. Does an applicable CCT/ACT (see `collective-bargaining.md` in `labor-law-br`) create a rubric-specific treatment that differs from the general rule, and if so, does that deviation fall within a validly negotiable matter?

## Required Facts
- The rubric's actual substance — what it compensates for, not merely its label in the payroll system.
- Whether it is paid habitually or as a one-off event (relevant to identifying its true nature, even though habitualidade alone no longer converts an Art. 457, §2º item to salário post-2017).
- Whether it is paid in cash or in-kind (relevant to the auxílio-alimentação and utilidades analysis specifically).
- Applicable CCT/ACT terms affecting this specific rubric. `CORPORATE_CONTEXT_REQUIRED`.

## Required Evidence
- Payroll system rubric configuration and its current incidência flags (INSS/FGTS/IRRF/base-calculation flags for horas extras, DSR, 13º, férias). `CORPORATE_CONTEXT_REQUIRED`.
- Documentation of what the rubric actually compensates (policy, contract clause, or CCT/ACT text) to verify the label matches the substance.

## Exceptions
- A rubric mislabeled as ajuda de custo or prêmio but that in substance compensates ordinary labor (e.g., a disguised recurring salary component) does not receive Art. 457, §2º treatment merely because of its label — substance governs, and this determination can be evidentially contested in litigation.
- A CCT/ACT may validly set specific rubric treatments for matters within the Art. 611-A negotiable list, but cannot use a collective instrument to override the Art. 457/458 salário/indenizatória distinction itself for matters outside that list — cross-check `collective-bargaining.md` before treating any CCT/ACT-based rubric reclassification as automatically valid.

## Risk Considerations
- Treating a genuinely salário-natured rubric as indenizatória to avoid INSS/FGTS incidência is a common, high-risk practice that exposes the company to retroactive assessment (Receita Federal/INSS) plus penalties, in addition to labor-court exposure.
- Correctly excluding a rubric from INSS/FGTS (as a genuine Art. 457, §2º item) but forgetting the corresponding — but analytically separate — question of its IRRF treatment, or vice versa, produces an incomplete and potentially wrong overall classification.
- Missing the cascading effect on DSR/13º/férias calculation bases when a salário-natured rubric is correctly flagged for INSS/FGTS but not reflected in those other bases is a frequent, compounding underpayment pattern.

## Human Escalation Conditions
Escalate for human payroll/tax review whenever: a rubric's salário vs. indenizatória classification is genuinely ambiguous or high-value; a proposed rubric structure appears designed primarily to avoid incidência rather than to genuinely compensate a specific cost; or a CCT/ACT purports to reclassify a rubric's treatment in a way that may exceed its negotiable scope.

## Source IDs
`planalto` (T1 — CLT Arts. 457/458, Lei 8.036/1990 Art. 15; not independently re-fetched due to the persistent planalto.gov.br connection failure documented across this repository's labor-law references), `receita` (T1 — IRRF treatment of specific rubric categories), `mte` (T1 — regulatory guidance on remuneração classification), `esocial` (T1 — rubric-to-event mapping requirements, detailed in `esocial.md`).

## Freshness Requirements
Critical. Rubric classification is one of the most frequently litigated and audited payroll questions; re-verify a specific rubric's current treatment against a T1 source before configuring or relying on a classification, especially for a novel or high-value rubric.

## Effective-Date Considerations
- **CURRENT (since 2017-11-11, Lei 13.467/2017):** habitualidade alone no longer converts prêmios, ajudas de custo, diárias para viagem, or abonos into salário-natured rubrics — a materially different rule from the pre-reform understanding.
- **SUPERSEDED (until 2017-11-10):** habitual payment of these categories could, under prior doctrine, cause them to integrate salário — a pre-reform classification should not be assumed to carry forward unchanged to a current-period analysis of the same rubric type.
- The Art. 458 utilidades framework and the core Art. 457 remuneração concept were not materially altered by the 2017 reform in the same way.

## Related References
- `payroll.md` (this skill) — for the general payroll structure this classification feeds into.
- `vacation.md` (this skill) — for how a salário-natured rubric's cascading effect reaches férias calculation.
- `termination-support.md` (this skill) — for how rubric classification affects rescisão verbas and the FGTS multa base.
- `labor-law-br`'s `collective-bargaining.md` — for whether a CCT/ACT-based rubric treatment falls within a validly negotiable matter.
- `esocial.md` (this skill) — for how rubric classification maps to specific eSocial event fields.

## Known Limitations
- Does not provide a rubric-by-rubric exhaustive catalog — the salário/indenizatória framework here must be applied to each specific rubric's actual substance, which is `CORPORATE_CONTEXT_REQUIRED` and cannot be generalized.
- The IRRF treatment of Art. 457, §2º-excluded rubrics is noted as "generally still subject to analysis" but not resolved item-by-item in this reference; verify each rubric's IRRF treatment against `receita` guidance separately from its INSS/FGTS classification.
- Does not cover sector- or regime-specific rubric variations (e.g., specific commission structures in regulated sectors) beyond the general framework presented here.
