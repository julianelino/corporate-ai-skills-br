# Conduct and Policy-Control Design

## Topics Covered
- conduct
- policy-control

## Purpose
Establish the methodology for assessing reported conduct against a corporate code of conduct and for evaluating whether a control designed to prevent/detect a specific policy breach is actually adequate — this skill's core methodological function, distinct from any specialist legal domain it hands off to.

## When to Load
Load whenever a request involves assessing whether reported conduct breaches the code of conduct, or evaluating/designing a compliance control's adequacy — before characterizing conduct as a breach or endorsing a control as sufficient. Per this skill's own routing rule, hand off allegations requiring formal fact-finding to `corporate-investigation`, people-specific cases to `employee-relations`, and financial-signal cases to `financial-fraud-risk` — this reference covers the compliance-assessment layer common across those handoffs, not a substitute for any of them.

## Scope
Covers the general methodology for conduct assessment against corporate policy and control-design evaluation. Does not cover the substantive legal content of any specific regulated domain (tax, labor, accounting) — corporate-compliance evaluates whether the *control* around a specialist domain's obligations is adequate, while the specialist skill (`tax-br`, `labor-law-br`, `accounting-br`, etc.) remains authoritative for the domain's own substantive rules. This is the "compliance evaluates the control, not the domain" boundary this skill's entire reference set observes.

## Core Concepts
- **Code of conduct as the primary authority, not law directly**: per this skill's own source map, no T1 registry entries map to this skill's general domain — the approved corporate code of conduct and related policies are the primary authority for a conduct assessment, with external law relevant primarily where the code itself references or is grounded in a specific legal requirement (e.g., the code's anti-corruption section is grounded in Lei 12.846/2013 — see `anti-corruption.md`). A conduct assessment without a current, approved code of conduct on hand cannot proceed to a consequential conclusion.
- **Separating breach indicator from confirmed fact**: this skill's own operating principle — a reported conduct pattern is an indicator requiring assessment, not a confirmed breach, until the applicable process (which may require `corporate-investigation`'s involvement for disputed facts) establishes it as such. This mirrors `financial-fraud-risk`'s anomaly-vs-confirmed-fraud discipline, applied to conduct/policy breaches generally.
- **Control assessment — the three-part question**: for any specific control (a policy, an approval requirement, a segregation-of-duties rule, a training program), the compliance-methodology question is: (1) does the control exist and is it documented; (2) is it actually operating as designed (not merely on paper); (3) is it proportionate and sufficient to the risk it addresses, or does it leave a gap. A control that exists on paper but is not actually followed, or that is followed but insufficient to the actual risk level, both fail this assessment despite superficially "having a control."
- **Policy alignment vs. legal compliance — a necessary but not sufficient relationship**: corporate policy should be at least as protective as applicable law, and often more so — but confirming an action complies with corporate policy is not the same claim as confirming it complies with law; where a regulated, temporal, or consequential legal question is embedded in the conduct being assessed, escalate to the relevant specialist skill (per this skill's own source-map routing) rather than treating policy-compliance as a proxy for legal compliance.
- **Proportionality and exception handling**: not every policy deviation warrants the same response — a documented, approved exception (e.g., a pre-cleared conflict-of-interest waiver, an approved gift-value exception) is different from an undisclosed deviation, and a minor, first-instance, low-impact deviation is different from a material, repeated, or high-impact one. The methodology requires assessing severity and pattern before recommending a response, not applying a uniform reaction to every deviation.

## Decision Points
1. Is there a current, approved corporate code of conduct (and any relevant specific policy) available to assess this conduct against? If not, this is a hard stop per the `unknown`-on-missing-source principle.
2. Does the reported conduct, as currently evidenced, rise to a breach indicator, or does it remain an unconfirmed allegation requiring further fact-finding (route to `corporate-investigation`)?
3. For a control-adequacy question: does the control exist, is it actually operating, and is it proportionate to the risk — answering all three, not just the first?
4. Does the conduct/control question embed a regulated, temporal, or consequential legal question requiring a specialist-skill handoff, or can it be resolved on declared corporate sources alone (per this skill's own conditional-freshness source policy)?
5. Is a documented, approved exception on record for this specific instance, distinguishing it from an undisclosed deviation?

## Required Facts
- The specific conduct/control in question and the applicable current policy provision.
- Whether the matter is a confirmed breach, an indicator requiring further fact-finding, or a documented approved exception.
- Whether a regulated/legal dimension requires specialist-skill handoff.
- Severity/pattern context (first instance vs. repeated, minor vs. material impact).

## Required Evidence
- The current, approved code of conduct and relevant specific policy text.
- Documentation of the reported conduct or the control being assessed.
- Any documented exception/waiver on record.
- Prior-instance history, where pattern assessment is relevant.

## Exceptions
- A conduct question with a purely operational/routine character (per this skill's source policy, "routine analytical requests may proceed on declared corporate sources alone") does not require the always-verify-external-source discipline that applies to a regulated, temporal, or consequential determination — but the assessor should actively confirm the request is genuinely routine before relying on this narrower path, not default to it for convenience.
- A control that technically exists and operates but was clearly designed for a different, narrower risk than the one now in question is not "adequate" merely because it exists — this is a scope-mismatch failure distinct from a non-operating-control failure, and should be assessed and reported as such.

## Risk Considerations
- Treating a reported conduct pattern as a confirmed breach without appropriate fact-finding risks a due-process failure and an unjustified consequence for the accused — route disputed facts to `corporate-investigation` rather than concluding independently.
- Confirming policy compliance and representing that as legal compliance, without checking whether the underlying question actually requires specialist legal analysis, risks a materially incomplete conclusion on a consequential matter.
- Accepting a control as adequate based only on its existence (without checking actual operation and proportionality) is a common, superficial compliance-assessment failure.

## Human Escalation Conditions
Escalate for human compliance/legal review whenever: the current, approved policy cannot be confirmed; the conduct in question is disputed and requires formal fact-finding; a control-adequacy assessment reveals a gap with material risk exposure; or the matter embeds a regulated legal question beyond this skill's own authority.

## Source IDs
Corporate policy (Corporate Source — the approved code of conduct and related policies are this skill's primary authority; `CORPORATE_CONTEXT_REQUIRED`); specialist-skill sources (per handoff — `tax-br`, `labor-law-br`, `accounting-br`, etc. — where a conduct/control question embeds a regulated legal question).

## Freshness Requirements
Conditional, per this skill's own source policy — critical for a regulated, temporal, or consequential determination; standard for a routine analytical request proceeding on declared corporate sources alone. Confirm which category applies before choosing the verification depth.

## Effective-Date Considerations
The code of conduct and related policies are corporate instruments subject to the entity's own revision cycle — always confirm the version being assessed against is the currently-approved one, not a superseded draft or prior edition. `CORPORATE_CONTEXT_REQUIRED`.

## Related References
- `conflict-of-interest.md`, `gifts.md`, `anti-corruption.md`, `retaliation.md` (this skill) — for the specific conduct domains this general methodology applies to.
- `corporate-investigation` skill — for the formal fact-finding this reference's breach-indicator/confirmed-fact distinction routes to.
- `employee-relations`, `financial-fraud-risk` skills — for the specific handoffs this skill's own routing rule names.

## Known Limitations
- Does not itself supply the entity's actual code of conduct or specific policies — `CORPORATE_CONTEXT_REQUIRED` for every conduct/control assessment.
- Does not resolve any specific regulated legal question embedded in a conduct/control matter — routes to the relevant specialist skill instead.
- Draws on general compliance-methodology practice, not a single primary regulatory text, in this research pass, consistent with this skill's own source map noting no T1 registry entries map to its general domain.
