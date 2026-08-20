# Investigation (Apuração Interna em Relações Trabalhistas)

## Topics Covered
- investigation

## Purpose
Structure a fair, evidence-based internal investigation into an employee-relations allegation (harassment, discrimination, disciplinary misconduct, or a fraud-adjacent concern touching an employment relationship) — establishing scope, preservation, confidentiality, retaliation protection, and an accountable investigator — before any conclusion about what happened is reached.

## When to Load
Load whenever an allegation requires more than routine grievance handling: harassment, discrimination, disciplinary misconduct with disputed or complex facts, or any matter where the evidentiary record needs to be built systematically rather than resolved through a simple intake conversation. Route to the `corporate-investigation` skill instead when the matter is primarily fraud, financial-integrity, or non-employment-relationship investigation in nature; the two overlap but are not identical — an allegation with both an employment-relations dimension and a fraud dimension may require both.

## Scope
Covers the employee-relations-specific investigation process: scope-setting, preservation, confidentiality, non-retaliation, evidence-ledger discipline (allegation / evidence / contradiction / confirmed fact / unconfirmed fact kept separate), interview practice, and the accountable-investigator requirement. Uses the shared investigation reasoning pack referenced in `SKILL.md`. Does not itself resolve the legal validity of any resulting disciplinary or termination decision (see `labor-law-br`'s `discipline.md`/`termination.md`) or duplicate the general investigation framework in the `corporate-investigation` skill, which this reference defers to for allegation/preservation/evidence/interview/findings mechanics common to both domains.

## Core Concepts
- **Scope definition**: before evidence-gathering begins, define what specifically is being investigated (which allegation, which time period, which parties) — an investigation that scope-creeps into unrelated conduct without a documented reason risks both fairness problems and evidentiary confusion.
- **Preservation**: relevant records (messages, logs, documents, access records) should be preserved promptly once an investigation is opened, before they can be lost, altered, or routinely purged — this is a time-sensitive first step, not something to defer until later in the process.
- **Confidentiality**: investigation details should be shared only with those who need to know to conduct the investigation or make a resulting decision — broad disclosure undermines both fairness to the parties and the investigation's evidentiary integrity.
- **Non-retaliation**: anyone participating in the investigation (complainant, witnesses, the accused, if later cleared) must be protected from retaliation for that participation — this connects directly to `discipline.md`'s non-retaliation principle and should be actively monitored, not just stated as policy.
- **Accountable investigator**: a specific person (or defined role) should be accountable for the investigation's conduct and conclusions — an investigation without a named accountable owner risks both procedural drift and an unclear decision-making chain.
- **Evidence ledger discipline**: throughout the investigation, keep allegation, evidence, contradiction, confirmed fact, and unconfirmed fact in clearly separate categories — never let an allegation be treated as a confirmed fact merely because it was investigated, and never let a confirmed fact be walked back to allegation status without new contradicting evidence.
- **Right to respond**: the accused should generally have a documented opportunity to respond to the specific allegations before findings are finalized, consistent with `discipline.md`'s right-to-respond principle.

## Decision Points
1. Is the scope of the investigation clearly and narrowly defined, or does it risk drifting into unrelated matters without documented justification?
2. Has preservation of relevant records happened promptly, before the investigation's existence could prompt loss or alteration of evidence?
3. Who has been informed of the investigation, and is that circle limited to those who genuinely need to know?
4. Is there a named, accountable investigator, and do they have any conflict of interest with either party that should be addressed before proceeding?
5. Has each piece of information been correctly categorized as allegation, evidence, contradiction, confirmed fact, or unconfirmed fact — and does the emerging record support a finding, or does it remain genuinely unresolved?
6. Has the accused had a documented opportunity to respond before findings are finalized?
7. Does this matter also have a fraud/financial-integrity dimension requiring coordination with the `corporate-investigation` skill?

## Required Facts
- The specific allegation(s), scoped to what is actually being investigated.
- The parties involved and any potential investigator conflicts of interest.
- What records/evidence sources are relevant and have been preserved.
- Whether the accused has been given an opportunity to respond, and what that response was.
- Any indication of retaliation risk against a participant.

## Required Evidence
- Preserved records relevant to the allegation (messages, logs, documents, access records).
- Interview notes/records, clearly attributed and dated.
- A documented evidence ledger separating allegation, evidence, contradiction, confirmed fact, and unconfirmed fact.
- Documentation of the accused's opportunity to respond.

## Exceptions
- Immediate protective measures (e.g., temporarily separating parties, restricting system access) taken to prevent ongoing harm or evidence loss while an investigation is set up are not themselves findings of fault and should be framed as precautionary, not punitive.
- Not every complaint requires a full formal investigation — routine grievances without disputed or complex facts can be handled through `grievance.md`'s lighter process; escalate to a formal investigation when facts are disputed, stakes are material, or the allegation implicates harassment, discrimination, or serious misconduct.

## Risk Considerations
- Failing to preserve records promptly is one of the most common, avoidable investigation failures and can undermine an otherwise well-conducted process.
- Allowing scope creep without documentation invites both fairness challenges and a muddled evidentiary record.
- Treating an allegation as a confirmed fact before the evidence ledger actually supports that conclusion is a serious fairness and legal-exposure risk — this error is easy to make under time pressure and should be actively guarded against.
- Failing to actively monitor for retaliation against investigation participants, rather than just stating a non-retaliation policy, is a common gap that produces separate, often more serious, legal exposure than the underlying allegation.

## Human Escalation Conditions
Escalate for human review whenever: the allegation is severe (harassment, discrimination, potential criminal conduct); the investigation may lead to dismissal-level discipline; a conflict of interest affects the available investigator pool; the matter has a material fraud/financial-integrity dimension requiring `corporate-investigation` coordination; or the evidence remains genuinely inconclusive despite a thorough process.

## Source IDs
`planalto` (T1 — general legal framework for evidence and due-process expectations in an employment context; not independently re-fetched due to the persistent planalto.gov.br connection failure documented across this repository's labor-law references), `tst` (T1 — jurisprudence on investigation fairness, evidentiary standards, and retaliation; not independently checked for this reference), `abrh` (T3 — practical internal-investigation process guidance; secondary only, never sole authority for a legal-validity conclusion).

## Freshness Requirements
Critical for any conclusion feeding a dismissal-level or legally consequential decision; standard for the general process-design principles themselves, which are stable practice expectations not tied to a specific frequently-changing statute.

## Effective-Date Considerations
The investigation-process principles here (scope, preservation, confidentiality, non-retaliation, evidence-ledger discipline) are stable practice/doctrinal expectations, not tied to a specific statutory effective date. Any resulting disciplinary or termination decision must separately apply `labor-law-br`'s current-law analysis (`discipline.md`, `termination.md`) for legal validity.

## Related References
- `corporate-investigation` skill — for the general allegation/preservation/evidence/interviews/findings framework this reference builds on, and for matters with a material fraud/financial-integrity dimension.
- `discipline.md` (this skill) — for the disciplinary process once investigation findings support a measure.
- `harassment.md`, `discrimination.md` (this skill) — for the substantive frameworks investigations in those areas should apply.
- `grievance.md` (this skill) — for matters that do not rise to the level requiring a full formal investigation.
- `labor-law-br`'s `discipline.md` and `termination.md` — for the legal-validity analysis of any resulting measure.

## Known Limitations
- Does not itself resolve the substantive legal-validity question for any resulting disciplinary or termination decision — see `labor-law-br` for that analysis.
- Does not duplicate the full allegation/preservation/evidence/interview/findings mechanics already covered by the `corporate-investigation` skill; this reference focuses on the employee-relations-specific process layer (confidentiality, retaliation protection, right to respond) that sits alongside that shared framework.
- The threshold for when a matter requires a full formal investigation versus routine grievance handling is a judgment call dependent on severity and factual complexity, not a fixed rule this reference can resolve in the abstract.
