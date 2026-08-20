# Retaliation and Whistleblower Protection

## Topics Covered
- retaliation

## Purpose
Establish the methodology for identifying and preventing retaliation against a person who reports misconduct, participates in an investigation, or exercises a compliance-related right — and for assessing whether a specific adverse action taken against a reporter is a legitimate, unrelated business decision or a retaliatory response requiring escalation.

## When to Load
Load whenever a request involves a report/complaint follower being subjected to an adverse action, or a compliance program's whistleblowing-channel design/protection adequacy — before characterizing an adverse action as legitimate or recommending protective measures.

## Scope
Covers the general methodology for retaliation-risk assessment and whistleblower-channel protection design. Does not cover the formal investigation of a specific retaliation allegation (see `corporate-investigation` skill for allegation/evidence/interview mechanics) or the labor-law-specific consequences of a confirmed retaliatory termination (see `labor-law-br` skill's `discipline.md`/`termination.md` for the legal-validity analysis of a specific employment action).

## Core Concepts
- **Non-retaliation as a foundational, cross-cutting principle**: this skill's own operating principles (per its SKILL.md) name non-retaliation alongside confidentiality, proportionality, and need-to-know access as core requirements for handling any compliance matter — retaliation risk is not a separate, occasional concern but a standing consideration in every compliance case involving a reporter or witness.
- **Retaliation defined broadly**: retaliation is not limited to termination — it includes demotion, undesirable reassignment, exclusion from opportunities, harassment, negative performance reviews without legitimate basis, or any other adverse treatment causally connected to the protected report/participation — a narrow definition limited to dismissal alone would miss most real-world retaliation patterns.
- **The causal-connection question**: the core assessment challenge is distinguishing a genuinely legitimate, independently-justified adverse action (a pre-existing performance issue, a documented restructuring unrelated to the report) from one causally connected to the protected activity — timing (an adverse action following closely after a report), a change in treatment pattern (suddenly critical reviews after years of positive ones), and the absence of independent documented justification are all relevant to this assessment, mirroring the general burden-shifting logic recognized in retaliation analysis across legal contexts (see `labor-law-br` skill's `discipline.md` for the employment-law-specific version of consistency/documentation analysis).
- **Whistleblowing-channel protection as a structural requirement**: an effective compliance program requires a channel that genuinely protects reporters — anonymity where requested, confidentiality of identity where not anonymous, and active monitoring against retaliation, not merely a policy statement that retaliation is prohibited (directly connecting to `anti-corruption.md`'s integrity-program criteria, which name effective, protected whistleblowing channels as a specific evaluated element).
- **Legal backdrop — an evolving Brazilian framework**: per this research, Brazilian law has been developing whistleblower-protection provisions (e.g., protections referenced in the context of Lei nº 13.964/2019 for certain reporting contexts) but a comprehensive, general whistleblower-protection statute is still considered by commentators to be a developing area rather than a single settled framework — do not assume a specific, comprehensive statutory whistleblower-protection regime exists in the same way some other jurisdictions have one; the primary protection mechanism in most Brazilian corporate compliance programs is the company's own policy and process design, reinforced by general labor-law protections against discriminatory/abusive dismissal (see `labor-law-br` skill) where retaliation manifests as an employment action.
- **Confidence and trust in the channel**: even where formal protections exist, actual whistleblower confidence in using the channel is commonly identified (per this research) as a persistent practical challenge — a program's effectiveness should be assessed not only by its formal protections but by whether reporters actually trust and use it, which itself is worth monitoring as a program-health indicator.

## Decision Points
1. Did the person experience an adverse action (broadly defined, not limited to termination) following a protected report or investigation participation?
2. Is there an independent, documented, pre-existing justification for the adverse action, or does its timing/pattern suggest a causal connection to the protected activity?
3. Does the whistleblowing channel involved genuinely protect the reporter's confidentiality/anonymity, or is there a gap (e.g., the reporter's identity became known through inadequate process controls) that itself constitutes a protection failure regardless of whether a further adverse action followed?
4. Does this matter require formal investigation (route to `corporate-investigation`) given disputed facts, or does the causal-connection question require employment-law-specific analysis (route to `labor-law-br` skill)?
5. Is there a broader pattern (multiple reporters experiencing adverse actions, declining channel-usage rates) suggesting a program-level trust/effectiveness problem beyond this specific instance?

## Required Facts
- The specific adverse action and its timing relative to the protected report/participation.
- Any independent, documented justification offered for the adverse action.
- How the reporter's identity became known (properly limited to those with a need to know, or improperly disclosed).
- Any pattern context (other reporters' experiences, channel-usage trends).

## Required Evidence
- Documentation of the adverse action and its stated rationale.
- The reporter's protected-activity record (report date, investigation participation).
- Access/disclosure records for who knew the reporter's identity and when.
- Prior performance/disciplinary history for the affected individual, for independent-justification assessment.

## Exceptions
- An adverse action with clear, well-documented, pre-existing justification predating the protected report (e.g., a performance improvement plan already underway before any report was made) is not retaliation merely because it coincides in time — but the documentation must genuinely predate and be independent of the report, not be retroactively constructed to justify a decision actually motivated by it.
- A report made in bad faith (knowingly false, intended to harm rather than genuinely raise a concern) does not carry the same protection as a good-faith report — but bad faith should be established through appropriate process, not assumed defensively whenever a report proves unsubstantiated (an unsubstantiated but good-faith report still warrants protection).

## Risk Considerations
- Treating "the adverse action would have happened anyway" as a sufficient defense without genuine, contemporaneous documentation predating the report risks accepting a retroactively-constructed justification.
- A channel-confidentiality failure (identity improperly disclosed) is itself a protection-failure worth flagging and addressing, even absent a subsequent adverse action — do not wait for retaliation to materialize before treating an identity-disclosure gap as a compliance concern.
- Declining trust/usage of a whistleblowing channel over time is a leading indicator of a program-effectiveness problem, not merely a neutral statistic — failing to monitor and act on this trend risks the entire integrity-program's whistleblowing element becoming nominal rather than genuinely effective.

## Human Escalation Conditions
Escalate for human compliance/legal/HR review whenever: an adverse action closely follows a protected report without clear independent justification; a reporter's identity was improperly disclosed; a pattern across multiple reporters suggests a program-level problem; or the matter involves an employment action requiring `labor-law-br` skill's legal-validity analysis.

## Source IDs
Corporate policy (Corporate Source — the approved whistleblowing/non-retaliation policy and channel design; `CORPORATE_CONTEXT_REQUIRED`); `planalto` (T1 — general Brazilian legal context on reporter protection provisions, e.g., Lei 13.964/2019 as referenced in this research for certain contexts; not independently re-fetched due to the persistent planalto.gov.br connection failure documented across this repository's other references); cross-reference `labor-law-br` skill for employment-law-specific retaliatory-termination analysis.

## Freshness Requirements
Critical for the legal backdrop specifically, given this research identified Brazilian whistleblower-protection law as a still-developing area — VERIFY_CURRENT_T1_SOURCE for whether more comprehensive whistleblower-protection legislation has since been enacted; standard for the general program-design methodology described here.

## Effective-Date Considerations
This research identified Brazilian whistleblower-protection law as an evolving area without a single comprehensive statute as of this reference's research — treat any claim that a specific, comprehensive statutory protection regime exists as requiring current verification rather than assumption; do not overstate the current statutory protection landscape relative to what has actually been confirmed.

## Related References
- `anti-corruption.md` (this skill) — for the integrity-program criteria that specifically name effective, protected whistleblowing channels as an evaluated element.
- `conduct-policy-control.md` (this skill) — for the general breach-indicator/confirmed-fact methodology applicable to a retaliation allegation itself.
- `corporate-investigation` skill — for formal fact-finding on a disputed retaliation allegation.
- `labor-law-br` skill's `discipline.md`/`termination.md` — for the employment-law-specific legal-validity analysis where retaliation manifests as a disciplinary or termination action.

## Known Limitations
- Does not confirm the complete current Brazilian legal landscape for whistleblower protection — flagged explicitly as an evolving area requiring VERIFY_CURRENT_T1_SOURCE rather than a settled statutory summary.
- Does not specify the entity's actual whistleblowing-channel design or non-retaliation policy — `CORPORATE_CONTEXT_REQUIRED`.
- Draws on general compliance-program and secondary legal-commentary sources, not an independently re-fetched primary statutory text, in this research pass.
