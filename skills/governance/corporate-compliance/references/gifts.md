# Gifts, Entertainment, and Hospitality

## Topics Covered
- gifts

## Purpose
Establish the methodology for assessing whether a gift, entertainment, or hospitality offer/receipt is compliant with corporate policy — value thresholds, the public-official distinction, and the disclosure/approval mechanism — before recommending acceptance, refusal, or escalation.

## When to Load
Load whenever a request involves a gift, meal, entertainment, travel, or other hospitality offered or received in a business context — before characterizing it as compliant or recommending a response.

## Scope
Covers the general methodology for gift/entertainment/hospitality assessment. Does not cover anti-corruption-specific rules for gifts to public officials in detail (see `anti-corruption.md`, since that context carries materially higher legal risk under Lei 12.846/2013 and should be treated as a distinct, stricter category, not a routine gift question) or the broader conflict-of-interest framework a gift can also trigger (see `conflict-of-interest.md`).

## Core Concepts
- **Value threshold as the primary but not sole test**: most corporate gift policies set a specific monetary threshold below which a gift is presumptively acceptable (with disclosure) and above which it requires approval or is prohibited outright — but value alone does not resolve every case; frequency (repeated modest gifts from the same source accumulating into a pattern), timing (a gift arriving near a decision point involving the giver), and the nature of the relationship (an active vendor negotiation vs. a long-settled relationship) all bear on whether even a below-threshold gift raises concern.
- **Public official vs. private counterparty — a materially different risk tier**: a gift to or from a public official (or someone acting on behalf of government) carries a categorically higher legal-risk profile than a private business gift, because of anti-corruption law's specific focus on public-official interactions (see `anti-corruption.md`) — do not apply the general private-counterparty threshold/approach to a public-official scenario without checking the stricter framework first.
- **Cash and cash-equivalents are categorically different**: cash, cash-equivalents (gift cards, vouchers readily convertible to cash), and similarly liquid items are commonly prohibited outright regardless of value under most corporate gift policies, distinct from the value-threshold analysis applied to physical gifts, meals, or entertainment — do not apply a value-threshold test to a cash-equivalent item without first checking whether it falls under a separate, stricter prohibition.
- **Disclosure as the default expectation**: even a compliant, below-threshold gift is commonly expected to be logged/disclosed under a well-designed policy, both to create a monitoring record (relevant to the frequency/pattern concern above) and to protect the individual by documenting the good-faith compliant handling of the offer — treat "I didn't think it was worth reporting" as a policy-design/training gap to flag, not a satisfactory outcome.
- **Timing relative to a pending decision**: a gift offered or received while a business decision involving the giver is pending (a vendor selection, a contract renewal, a regulatory interaction) raises materially more concern than the same gift in an unrelated, non-decision-adjacent context — this timing dimension should be assessed explicitly, not folded silently into the value-threshold question alone.

## Decision Points
1. What is the gift/entertainment/hospitality's value, and does it fall within, at, or above the applicable policy threshold? `CORPORATE_CONTEXT_REQUIRED` for the specific current threshold.
2. Does this involve a public official or someone acting on behalf of government, requiring the stricter `anti-corruption.md` framework instead of the general private-counterparty approach?
3. Is the item cash or a cash-equivalent, triggering a categorical prohibition distinct from the value-threshold analysis?
4. Is there a pending business decision involving the giver/recipient that elevates the timing-risk of this specific instance?
5. Does this instance form part of a pattern (repeated gifts from/to the same source) that, viewed cumulatively, raises concern even if each individual instance falls below threshold?
6. Has the gift been logged/disclosed per the applicable policy's mechanism?

## Required Facts
- The gift/entertainment/hospitality's nature, value, and form (physical item, meal, travel, cash-equivalent).
- Whether the counterparty is a public official or private party.
- Whether a pending business decision involving the counterparty exists.
- Prior gift history with the same counterparty, for pattern assessment.
- Whether the instance has been logged/disclosed.

## Required Evidence
- The applicable current gift/entertainment policy and its specific thresholds. `CORPORATE_CONTEXT_REQUIRED`.
- The disclosure/log record for the specific instance.
- Documentation of any pending business decision involving the counterparty, where timing is a concern.

## Exceptions
- Reciprocal, proportionate business courtesies within an ongoing, non-decision-adjacent relationship (e.g., a routine business lunch during a long-settled vendor relationship with no pending decision) are commonly treated more leniently than a gift arriving during an active competitive process — but this distinction should be applied deliberately, not assumed, and still generally requires disclosure per policy.
- A gift declined and returned (or donated, per a policy mechanism some companies provide for gifts that cannot practically be returned) is a properly-resolved instance — the methodology should credit correct handling, not treat the initial offer alone as an unresolved compliance concern once properly addressed.

## Risk Considerations
- Applying only the value-threshold test while ignoring timing (a pending decision) or pattern (repeated instances) risks clearing a gift that is compliant on value alone but concerning in context.
- Applying the general private-counterparty framework to a public-official scenario, rather than escalating to the stricter anti-corruption framework, is a materially consequential error given the different legal-exposure profile.
- Treating a cash-equivalent gift under the ordinary value-threshold test, rather than recognizing its likely categorical prohibition, misapplies the policy's actual structure.

## Human Escalation Conditions
Escalate for human compliance/legal review whenever: a public official or government-adjacent party is involved; the value approaches or exceeds the policy threshold; a pending business decision involving the counterparty exists; a pattern of repeated gifts is identified; or the item is cash/cash-equivalent.

## Source IDs
Corporate policy (Corporate Source — the approved gift/entertainment policy and its specific thresholds; `CORPORATE_CONTEXT_REQUIRED`); cross-reference `anti-corruption.md` for the public-official-specific legal framework this reference defers to for that scenario.

## Freshness Requirements
Standard for the general methodology; `CORPORATE_CONTEXT_REQUIRED` for the entity's current specific value thresholds, which are commonly periodically revised (e.g., for inflation or after a policy review).

## Effective-Date Considerations
The general gift/entertainment assessment methodology (value, timing, pattern, disclosure) reflects stable corporate-governance practice; the entity's specific threshold figures are the volatile element requiring current confirmation. The public-official distinction's legal grounding (see `anti-corruption.md`) is subject to that reference's own, more legally-grounded effective-date considerations.

## Related References
- `anti-corruption.md` (this skill) — for the materially stricter framework applicable to public-official gifts.
- `conflict-of-interest.md` (this skill) — for the broader conflict a gift can trigger beyond the gift-specific policy question.
- `conduct-policy-control.md` (this skill) — for the general breach-indicator/confirmed-fact methodology this reference applies to gift-related conduct specifically.

## Known Limitations
- Does not specify the entity's actual gift/entertainment policy thresholds or disclosure mechanism — `CORPORATE_CONTEXT_REQUIRED`.
- Does not resolve the specific legal exposure of a public-official gift scenario — see `anti-corruption.md` and escalate for legal review.
- Draws on general corporate-governance practice literature, not a single primary regulatory text, in this research pass, consistent with this skill's own source map.
