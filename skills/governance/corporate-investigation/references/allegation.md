# Allegation Intake

## Topics Covered
- allegation

## Purpose
Establish the methodology for receiving and structuring an initial allegation — scope definition, the allegation ledger, and the hard separation between what was alleged and what is known — before any evidence-gathering step begins.

## When to Load
Load whenever a request involves the intake of a new allegation of corporate misconduct — before defining an investigation's scope or moving to evidence/interview planning (see `evidence.md`, `interviews.md`).

## Scope
Covers allegation-intake methodology: scope-setting, the allegation ledger, and initial triage. Does not cover evidence handling once collection begins (see `evidence.md`), preservation mechanics (see `preservation.md`), or the ultimate findings standard (see `findings.md`).

## Core Concepts
- **The allegation ledger**: from the first intake, maintain explicit, separate categories — allegation (what was reported, verbatim or closely paraphrased), evidence (what has actually been collected), contradiction (where sources conflict), confirmed fact (established beyond reasonable investigative doubt), unconfirmed fact (plausible but not yet established), and unknown (genuinely undetermined) — per this skill's own SKILL.md. An allegation never advances a category on its own; only evidence does.
- **Scope definition — narrow and documented**: define what specifically is being investigated (which allegation, which time period, which parties) before evidence-gathering begins — an investigation that expands beyond its documented scope without a recorded reason risks both fairness problems (investigating someone for something they were never told about) and evidentiary confusion (mixing facts relevant to different questions).
- **Mandate and investigator authority**: before proceeding, establish who has authorized this investigation, what authority the investigator has (access to specific systems/records, ability to interview specific people), and the boundaries of that authority — an investigation proceeding without a clear mandate risks both procedural challenge later and overreach in the moment.
- **Initial safety/non-retaliation measures**: where the allegation suggests an ongoing safety risk or where the reporter/witnesses face plausible retaliation exposure, immediate protective measures (which are precautionary, not punitive findings against anyone) should be considered at intake — before, not after, the substantive investigation proceeds. Cross-reference `corporate-compliance` skill's `retaliation.md` for the broader non-retaliation framework this connects to.
- **Anonymous and third-party allegations**: an allegation received anonymously, or from a third party rather than a direct witness/victim, is not automatically less credible, but does carry specific corroboration challenges (no direct source to follow up with) that should be explicitly noted in the ledger rather than silently treated the same as a first-hand, identified report.

## Decision Points
1. What, precisely, is being alleged — restated with enough specificity to define a bounded scope, not left as a vague general concern?
2. Who authorized this investigation, and what is the investigator's documented authority and its boundaries?
3. Does the allegation suggest an immediate safety or retaliation risk requiring protective measures before substantive work begins?
4. Is the allegation anonymous, third-party, or first-hand/identified — and has that distinction been recorded, since it affects the corroboration approach?
5. Does the allegation, on its face, actually fall within this skill's authority, or does it belong to a different skill (e.g., a purely HR-process matter without disputed facts, better handled by `employee-relations`; a purely financial-signal-triage matter, better handled by `financial-fraud-risk` before escalating here)?

## Required Facts
- The specific allegation, restated with defined scope (subject matter, time period, parties).
- The investigation's mandate and the investigator's documented authority.
- Whether immediate protective measures are warranted.
- The allegation's source category (anonymous, third-party, first-hand) and its corroboration implications.

## Required Evidence
- The original allegation record (report, complaint, referral) in its earliest available form.
- The mandate/authorization documentation.
- Any documented protective measures taken at intake.

## Exceptions
- A report that, on its face, describes an emergency (imminent physical safety threat, ongoing active fraud) may require immediate action (safety measures, access restriction) even before full scope-definition is complete — but this should be documented as an emergency deviation from the standard sequence, not treated as license to skip scope-definition altogether once the immediate emergency is addressed.
- A vague or overly broad initial report should be clarified (where possible, through the reporting channel, not by inventing specificity) before scope is finalized — proceeding on an assumed, unconfirmed scope risks investigating the wrong thing.

## Risk Considerations
- Treating the allegation itself as a confirmed fact at intake collapses the ledger's entire purpose and risks the investigation proceeding with a presumption of guilt.
- An undefined or silently-expanding scope risks both unfairness to the accused (investigated for undisclosed matters) and a muddled evidentiary record that undermines the eventual findings.
- Failing to consider protective measures at intake, when warranted, risks preventable harm occurring while the substantive investigation is still being organized.

## Human Escalation Conditions
Escalate for human legal/compliance leadership review whenever: the allegation involves senior leadership or a potential conflict for the assigned investigator; immediate safety/retaliation risk is identified; the mandate/authority for the investigation is unclear; or the allegation's proper skill-routing is ambiguous.

## Source IDs
Corporate policy (Corporate Source — the approved investigation policy governing mandate, authority, and intake procedure; `CORPORATE_CONTEXT_REQUIRED`); no `sources/SOURCE_REGISTRY.yaml` T1 entry currently maps to this skill's general domain, per its own source map — primary authority is the corporate investigation policy itself.

## Freshness Requirements
Conditional, per this skill's own source policy — critical for a regulated, temporal, or consequential determination; standard for routine intake proceeding on declared corporate sources alone.

## Effective-Date Considerations
The allegation-intake methodology described here (ledger discipline, scope definition, mandate/authority) reflects stable investigative practice, not a specific statutory effective date. The entity's own investigation policy is the element requiring current-version confirmation. `CORPORATE_CONTEXT_REQUIRED`.

## Related References
- `preservation.md` (this skill) — for the immediate preservation obligations that typically begin alongside or immediately after intake.
- `evidence.md` (this skill) — for how the ledger categories are populated as the investigation proceeds.
- `interviews.md` (this skill) — for interview planning once scope is defined.
- `findings.md` (this skill) — for how the ledger ultimately resolves into a findings determination.
- `corporate-compliance` skill's `retaliation.md` — for the broader non-retaliation framework relevant to protective measures at intake.

## Known Limitations
- Does not specify the entity's actual investigation policy, mandate structure, or intake channel — `CORPORATE_CONTEXT_REQUIRED`.
- Does not resolve, at the intake stage, whether the allegation is ultimately substantiated — that is the findings stage's role, not this one's.
- Draws on general investigative-practice methodology, not a single primary regulatory text, in this research pass, consistent with this skill's own source map.
