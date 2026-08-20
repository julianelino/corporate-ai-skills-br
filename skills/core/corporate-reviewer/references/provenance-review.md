# Provenance Review

## Topics Covered
- provenance-review

## Purpose
Establish the methodology for tracing a critical claim's full provenance chain — `claim → data → evidence → source → rule → skill → reviewer`, per this skill's own SKILL.md — to detect unsupported claims, source gaps, and stale sources before an artifact reaches human review.

## When to Load
Load whenever this skill (always `DELEGATED`) is reviewing an artifact's critical claims specifically for their evidentiary/source backing — before certifying that a claim's provenance is adequate or flagging a gap.

## Scope
Covers provenance-tracing methodology specifically. Does not cover the broader completeness/calculation/severity-grading review (see `quality-review.md`, the companion review dimension this reference feeds into) or the substantive freshness-lifecycle mechanics of the Source Registry itself (a repository-architecture concern, not this skill's own domain).

## Core Concepts
- **The seven-link chain**: per this skill's own SKILL.md, every critical claim in a reviewed artifact should be traceable as `claim → data → evidence → source → rule → skill → reviewer` — claim (the specific assertion made); data (the underlying fact/figure the claim rests on); evidence (the evidence-state-tagged record supporting that data, per `schemas/evidence.schema.json`); source (the specific registry source, `sources/SOURCE_REGISTRY.yaml` entry or corporate document, the evidence derives from); rule (the specific rule/standard applied to the data); skill (which skill's contract/authority the claim was produced under); reviewer (this review itself, closing the chain). A claim missing any link in this chain has an identifiable, specific gap — not a vague "needs more support."
- **Not every claim requires the full chain**: this skill's own SKILL.md specifies tracing "every critical claim" — a routine, low-materiality, or clearly-labeled-as-inferred statement does not require the same rigor as a claim the artifact's central conclusion depends on. Applying full-chain tracing indiscriminately to every sentence would be disproportionate; the judgment is in correctly identifying which claims are actually critical.
- **Source currency, not just source existence**: a claim citing a source that exists but is stale (superseded, past its freshness requirement, or flagged `CHANGED_UNREVIEWED` per this repository's own freshness lifecycle) has a provenance gap just as real as a claim citing no source at all — per this skill's own source-map restriction, "do not certify a critical claim whose authoritative current source is absent or stale." Checking that a source is cited is necessary but not sufficient; checking that it is current is equally required.
- **Evidence-state consistency**: the claim's evidence should be tagged with the correct state (`CONFIRMED`, `CALCULATED`, `INFERRED`, `ALLEGED`, `ESTIMATED`, `UNKNOWN`, per `schemas/evidence.schema.json`) and the claim's own confidence/certainty should match — a claim stated with unqualified confidence but backed only by `INFERRED` or `ESTIMATED` evidence is a provenance-consistency gap, distinct from a missing-source gap, and should be flagged as its own finding type.
- **Rule and skill-authority tracing**: beyond data/evidence/source, confirm which specific rule was applied (was it the currently-applicable rule, not a superseded one — cross-reference the specialist skill's own effective-date handling) and which skill's contract/authority the claim was produced under (did that skill actually hold the decision authority the claim implicitly exercises) — a claim technically well-sourced in its data but produced under an authority the originating skill doesn't actually hold (e.g., a skill with only `RECOMMEND` authority phrasing something as a final decision) is a provenance gap in the "skill" link specifically.

## Decision Points
1. Which claims in this artifact are genuinely critical (the conclusion depends on them), warranting full seven-link tracing, versus routine/low-materiality statements not requiring the same rigor?
2. For each critical claim, can each of the seven links (claim, data, evidence, source, rule, skill, reviewer) actually be identified and verified?
3. Where a source is cited, is it not merely present but current — checked against its freshness requirement and lifecycle status, not assumed current because it was cited at all?
4. Does the claim's stated confidence/certainty match its actual underlying evidence state, or does it overstate certainty relative to `INFERRED`/`ESTIMATED`/`ALLEGED` evidence?
5. Was the claim produced within the originating skill's actual decision-authority bounds, or does it implicitly exercise authority (e.g., a final-sounding conclusion from a `RECOMMEND`-only skill) that skill doesn't hold?

## Required Facts
- The specific critical claims identified in the artifact.
- Each claim's traced chain elements (data, evidence, source, rule, skill).
- The cited source's current freshness/lifecycle status.
- The claim's stated confidence relative to its actual evidence state.

## Required Evidence
- The artifact's citations and evidence records.
- The cited sources' current registry status (`sources/SOURCE_REGISTRY.yaml` freshness metadata) where a Registry source is involved.
- The originating skill's contract (`decision_authority`) for authority-boundary verification.

## Exceptions
- A claim explicitly and clearly labeled by the artifact itself as `INFERRED`, `ESTIMATED`, or `UNKNOWN` (matching its actual evidentiary basis) is not a provenance gap merely for having weaker evidence — the gap is a mismatch between stated confidence and actual evidence, not weak evidence honestly labeled as such.
- A non-critical, clearly illustrative or contextual statement does not require full-chain tracing — over-applying this reference's rigor to every sentence in an artifact would itself be a review-quality failure (disproportionate, obscuring the genuinely critical gaps among noise).

## Risk Considerations
- Certifying a claim's provenance based only on "a source is cited" without checking that source's current freshness status risks passing a claim resting on stale, no-longer-authoritative information.
- Failing to check confidence/evidence-state consistency allows an artifact to overstate certainty on a claim that is actually only inferred or estimated — a subtle but consequential gap distinct from a missing-source gap.
- Failing to check skill-authority boundaries allows an artifact to present a conclusion with more finality than its originating skill's actual contract permits.

## Human Escalation Conditions
Escalate (via the `REWORK_REQUIRED`/`BLOCKED` findings this feeds into `quality-review.md`'s recommendation) whenever: a critical claim has a genuine gap in any of the seven chain links; a cited source is stale relative to its freshness requirement; a claim's stated confidence materially overstates its actual evidence state; or a claim implicitly exercises authority its originating skill's contract doesn't grant.

## Source IDs
The reviewed artifact's own cited sources and their `sources/SOURCE_REGISTRY.yaml` records (per this skill's own "claim-based" source policy); `schemas/evidence.schema.json` (Corporate Source — the evidence-state schema this reference's consistency check applies); no `sources/SOURCE_REGISTRY.yaml` T1 entry maps to this skill's general domain itself, per its own source map.

## Freshness Requirements
Critical — this reference's entire function is checking source currency for critical claims; a provenance review that does not itself verify current freshness status defeats its own purpose.

## Effective-Date Considerations
The seven-link provenance chain and the evidence-state schema are stable elements of this skill's own frozen contract and the repository's frozen architecture — do not propose additional/fewer links or a different evidence-state taxonomy without a demonstrated defect and the required change-control process.

## Related References
- `quality-review.md` (this skill) — for the broader completeness/calculation/severity-grading review this reference's provenance findings feed into.
- `corporate-risk` skill's `risk-assessment.md` — for the same evidence-certainty categories (`CONFIRMED` through `UNKNOWN`) this reference applies at the claim-provenance level.

## Known Limitations
- Does not itself resolve a substantive dispute about whether a specific rule was correctly applied to specific facts — confirms the rule is current and was the one actually cited/applied, not that the specialist domain's application of it was substantively correct.
- Does not specify which specific claims in a given artifact type are "critical" by a fixed rule — this requires judgment proportionate to the artifact's actual conclusion-dependency structure.
- Draws on this skill's own frozen contract and general provenance-tracing methodology, not an external regulatory text, consistent with this skill's own source map.
