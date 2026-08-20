# Findings

## Topics Covered
- findings

## Purpose
Establish the methodology for converting an evidence ledger into a findings determination — the applicable standard of proof, the limits of this skill's own authority to conclude guilt, and how to present an outcome that includes genuine limitations rather than false certainty.

## When to Load
Load whenever a request involves drafting, reviewing, or finalizing investigation findings — before characterizing an allegation as substantiated, unsubstantiated, or inconclusive.

## Scope
Covers findings methodology: standard of proof, authority limits, and findings presentation. Does not cover the evidence-evaluation process feeding into findings (see `evidence.md`) or the interview process generating some of that evidence (see `interviews.md`).

## Core Concepts
- **This skill's own authority limit — never a guilt determination**: per this skill's own SKILL.md, corporate-investigation "never coach[es] evidence, make[s] an accusation, or convert[s] an anomaly into fraud," and is explicitly for "investigation planning and analysis; do not independently investigate, decide guilt, or disclose case data." A findings output from this skill structures and presents the evidentiary record and its implications — the actual decision on consequences (discipline, termination, legal referral) belongs to the accountable human decision-maker/gate this skill's output feeds, not to this skill itself.
- **Standard of proof — civil/internal, not criminal**: internal corporate investigation findings are generally evaluated against a preponderance-of-evidence-type standard (more likely than not) rather than the higher "beyond reasonable doubt" criminal standard — but the specific standard actually applied should be confirmed against the entity's own investigation policy, since some organizations may specify a different (e.g., "clear and convincing") threshold for specific serious-consequence findings. `CORPORATE_CONTEXT_REQUIRED`.
- **Three possible outcomes, not two**: findings should genuinely allow for substantiated (the evidence, at the applicable standard, supports the allegation), unsubstantiated (the evidence does not support the allegation, whether because it affirmatively contradicts it or is simply insufficient), and inconclusive (the evidence is genuinely mixed or insufficient to reach either conclusion with confidence) — collapsing "unsubstantiated" and "inconclusive" into a single forced binary misrepresents genuine uncertainty as a clean exoneration or, worse, pressure toward a substantiated finding to avoid an unsatisfying "we don't know."
- **Findings should state their own limitations**: a rigorous findings document explicitly notes what evidence was unavailable, what corroboration could not be obtained, what contradictions remain unresolved, and what the practical limits of the investigation's own scope/authority were (e.g., inability to compel testimony, inability to access certain records) — presenting a finding with unstated confidence beyond what the actual evidence supports misrepresents the investigation's actual reliability.
- **Findings feed a decision, they are not the decision**: the output structures the evidentiary record, the applicable ledger classification for each allegation element, and the limitations — and hands this off to the accountable decision-maker (per the entity's governance structure) who determines consequences, informed by but not dictated to by this skill's analysis. This mirrors the PREPARE != APPROVE boundary in the `payments` skill — here, ANALYZE != DECIDE.

## Decision Points
1. Does the current evidence ledger, applying the entity's actual standard of proof, support a substantiated, unsubstantiated, or genuinely inconclusive finding for each specific allegation element?
2. Have all three possible outcomes been genuinely considered, rather than defaulting to a forced binary?
3. What are this specific investigation's actual limitations (unavailable evidence, uncooperative witnesses, scope/authority constraints), and are they explicitly stated in the findings?
4. Does the findings document stay within this skill's authority — presenting evidence and its implications — without itself pronouncing a guilt/innocence conclusion or a consequence decision?
5. Who is the accountable decision-maker this findings output should be routed to, and is that handoff clearly structured?

## Required Facts
- The current, complete evidence ledger for each allegation element.
- The entity's applicable standard of proof for investigation findings. `CORPORATE_CONTEXT_REQUIRED`.
- The investigation's actual limitations (evidence gaps, access constraints, unresolved contradictions).
- The accountable decision-maker/gate the findings should route to.

## Required Evidence
- The complete evidence ledger supporting the findings.
- Documentation of the applicable standard of proof used.
- Explicit documentation of investigation limitations.

## Exceptions
- Where multiple distinct allegations were investigated together, each should generally receive its own findings determination rather than a single blended outcome — a mixed record (one allegation substantiated, another not) should be presented as such, not averaged into an ambiguous overall conclusion.
- An investigation that must close before reaching a confident conclusion (e.g., due to a resigned/unreachable key witness) should report as inconclusive with the specific limitation stated, not be stretched into an unsubstantiated finding merely to reach closure.

## Risk Considerations
- Presenting a finding with more confidence than the actual evidence supports (glossing over unresolved contradictions or evidence gaps) risks a decision-maker relying on a conclusion that is less sound than it appears.
- Collapsing findings into only two categories (substantiated/unsubstantiated) when the evidence is genuinely mixed misrepresents real uncertainty and can produce either an unwarranted clearance or an unwarranted adverse conclusion.
- This skill (or any AI system operating it) pronouncing a guilt/innocence conclusion or a consequence decision, rather than structuring the analysis for the accountable human decision-maker, exceeds this skill's own stated authority and risks a decision made without appropriate human accountability.

## Human Escalation Conditions
Escalate to the accountable decision-maker for every findings output — this is not an exceptional escalation but the standard, required handoff; additionally flag for elevated human legal/compliance review whenever: the finding is inconclusive on a serious allegation; unresolved contradictions materially affect the outcome; or the applicable standard of proof for this specific case type is unclear.

## Source IDs
Corporate policy (Corporate Source — the approved investigation policy's standard of proof and findings/decision-authority structure; `CORPORATE_CONTEXT_REQUIRED`); no `sources/SOURCE_REGISTRY.yaml` T1 entry currently maps to this skill's general domain, per its own source map.

## Freshness Requirements
Standard for the general findings methodology, which reflects stable investigative-practice principles; `CORPORATE_CONTEXT_REQUIRED` for the entity's specific current standard of proof and decision-authority structure.

## Effective-Date Considerations
The findings methodology described here (standard of proof framing, three-outcome discipline, stated limitations, authority boundary) reflects stable investigative-practice principles, not a specific statutory effective date.

## Related References
- `allegation.md`, `preservation.md`, `evidence.md`, `interviews.md` (this skill) — for the full investigative process this reference's findings stage concludes.
- `corporate-compliance` skill's `conduct-policy-control.md` — for the general breach-indicator/confirmed-fact discipline this reference specializes for the formal-investigation context.
- `financial-fraud-risk` skill — for the anomaly-vs-confirmed-fraud discipline this reference's substantiated/unsubstantiated/inconclusive framing mirrors in the financial-signal context.

## Known Limitations
- Does not specify the entity's actual standard of proof or decision-authority structure — `CORPORATE_CONTEXT_REQUIRED`.
- Does not itself determine consequences for a substantiated finding — that is explicitly outside this skill's authority per its own SKILL.md.
- Draws on general investigative-practice methodology, not a single primary regulatory text, in this research pass, consistent with this skill's own source map.
