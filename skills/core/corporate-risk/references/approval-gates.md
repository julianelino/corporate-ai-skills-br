# Approval Gates

## Topics Covered
- approval-gates

## Purpose
Establish how a risk classification (per `risk-assessment.md`) maps to this repository's frozen approval model — `AUTO`, `REVIEW`, `APPROVAL_REQUIRED`, `DUAL_APPROVAL` — and how decision authority, risk ownership, and segregation of duties interact with that mapping, before recommending a specific approval path for a case.

## When to Load
Load whenever a request involves determining which approval gate a classified case should route through, identifying the accountable decision owner, or checking whether a proposed path would improperly collapse segregation of duties — before recommending an approval mode.

## Scope
Covers the approval-gate mapping and decision-authority framework as defined in this repository's own `GOVERNANCE.md` and `ARCHITECTURE.md`. Does not cover risk classification itself (see `risk-assessment.md`, the prerequisite step this reference builds on) or any specialist skill's own domain-specific approval requirements beyond the general framework.

## Core Concepts
- **The four approval modes (per `GOVERNANCE.md`'s "Approval model")**: `AUTO` — deterministic conversions, percentages, aging, and preliminary reports; `REVIEW` — suggested classifications, probable matches, and billing mirrors; `APPROVAL_REQUIRED` — warnings, salary changes, hires, terminations, and material accounting decisions; `DUAL_APPROVAL` — supplier bank changes, material payments, material write-offs, and high-risk financial actions. This is this repository's own frozen approval model — the mapping from a case's nature and risk level to one of these four modes is not a judgment call to reinvent per case, but an application of this existing table.
- **Decision authorities (per `ARCHITECTURE.md`)**: `KNOW`, `ANALYZE`, `RECOMMEND`, `DRAFT`, `PREPARE`, `EXECUTE`, and `APPROVE` — a skill's contract declares which of these it holds; critically, `APPROVE` "is reserved for accountable humans and does not belong to a skill contract" — no skill, including this one, ever holds `APPROVE` authority, regardless of how confidently it can classify a case's risk or recommend a path. This mirrors the `payments` skill's PREPARE != APPROVE boundary and the `corporate-investigation` skill's ANALYZE != DECIDE boundary — the same architectural principle applied at the general risk-and-approval level.
- **Risk ownership**: every case routed to an approval gate needs an identified decision owner — the accountable human who will actually exercise `APPROVE` authority — this skill's role is to identify who that owner should be (per the applicable authority matrix) and surface the case to them with a clear rationale, not to make the decision itself or leave ownership ambiguous.
- **Segregation of duties (SoD) as a hard boundary, not a suggestion**: per this skill's own SKILL.md, it must "never approve, accuse, terminate, pay, or override segregation of duties" — a proposed approval path that would collapse SoD (e.g., the same person both preparing and approving a `DUAL_APPROVAL`-tier action) is itself a risk finding requiring escalation, not a path this skill should validate or route toward. This connects directly to the `payments` skill's `vendor-payments-controls.md` SoD principle, applied here as the general cross-domain rule.
- **Rising risk narrows the safe operating mode**: per this skill's own SKILL.md, "increase verification and decrease autonomy as risk grows" — a higher `R`-level case should map toward a more restrictive approval mode (`APPROVAL_REQUIRED` or `DUAL_APPROVAL`) and a narrower decision-authority allowance (fewer of `RECOMMEND`/`DRAFT`/`PREPARE` exercised autonomously), never the reverse. A case cannot be both high-risk and `AUTO`-eligible.

## Decision Points
1. Given the case's risk classification (per `risk-assessment.md`) and its substantive nature (does it match one of `GOVERNANCE.md`'s named examples for each mode — salary change, supplier bank change, material write-off, etc.), which of the four approval modes applies?
2. Who is the accountable decision owner for this specific case, per the applicable authority matrix? `CORPORATE_CONTEXT_REQUIRED` for the entity's specific role assignments.
3. Does the current or proposed process path preserve segregation of duties, or does it risk collapsing preparer/approver (or requester/approver) into the same person?
4. Does the case's decision-authority allowance narrow appropriately as its risk level rises, avoiding any autonomous exercise of `EXECUTE` or `APPROVE`-adjacent action by a skill?
5. Is there a cross-domain handoff required — e.g., a case spanning both `financial-fraud-risk` signal-triage and `corporate-investigation` formal fact-finding — and has the approval-gate recommendation accounted for both domains' requirements rather than only one?

## Required Facts
- The case's risk classification and substantive nature, for approval-mode matching.
- The applicable authority matrix identifying the accountable decision owner. `CORPORATE_CONTEXT_REQUIRED`.
- The current process path's role assignments, for SoD verification.

## Required Evidence
- The risk-assessment output (per `risk-assessment.md`) this approval-gate determination builds on.
- The entity's authority matrix / approval-threshold policy. `CORPORATE_CONTEXT_REQUIRED`.
- Role/permission records for SoD verification.

## Exceptions
- A case matching multiple `GOVERNANCE.md` example categories at different modes (e.g., touching both a "material accounting decision" and a "supplier bank change") should route to the more restrictive applicable mode (`DUAL_APPROVAL` over `APPROVAL_REQUIRED`) — never resolve an ambiguity by defaulting to the less restrictive option.
- A genuinely deterministic, low-stakes calculation (e.g., an aging report) remains `AUTO`-eligible even within a broader high-risk case context, provided the specific sub-output itself carries no material judgment or consequence — but this distinction should be applied carefully, not used to carve routine-looking pieces out of an otherwise `APPROVAL_REQUIRED` case.

## Risk Considerations
- Recommending `AUTO` or `REVIEW` for a case that substantively matches an `APPROVAL_REQUIRED` or `DUAL_APPROVAL` example category (per `GOVERNANCE.md`'s table) understates the required control level.
- Failing to identify a specific accountable decision owner leaves an approval gate structurally incomplete — a case "requiring approval" with no named owner risks either indefinite delay or an ad hoc, unaccountable approval.
- Validating or routing toward a process path that collapses segregation of duties — even if no specific fraud is suspected — removes a structural control this skill exists partly to protect, per its own explicit prohibition on overriding SoD.

## Human Escalation Conditions
Escalate for human governance/risk-leadership review whenever: a case's approval-mode mapping is genuinely ambiguous across `GOVERNANCE.md`'s categories; the accountable decision owner cannot be identified from the current authority matrix; a segregation-of-duties gap is identified in the current process path; or a case spans multiple domains requiring coordinated, rather than single-track, approval routing.

## Source IDs
`GOVERNANCE.md` (Corporate Source — the authoritative "Approval model" table defining `AUTO`/`REVIEW`/`APPROVAL_REQUIRED`/`DUAL_APPROVAL` and their example categories); `ARCHITECTURE.md` (Corporate Source — the decision-authority framework, `KNOW` through `APPROVE`, and the `APPROVE`-reserved-for-humans rule); no `sources/SOURCE_REGISTRY.yaml` T1 entry maps to this skill's general domain, per its own source map.

## Freshness Requirements
Conditional — the approval-mode table and decision-authority framework are architecture-frozen and stable; `CORPORATE_CONTEXT_REQUIRED` for the entity's specific current authority matrix (who specifically holds approval authority for which threshold), which requires periodic reconfirmation as organizational structure evolves.

## Effective-Date Considerations
The four-mode approval model and the `KNOW`–`APPROVE` decision-authority scale are part of this repository's frozen architecture (per the Architecture Freeze governance rule) — do not propose a different model without a demonstrated defect and the required change-control process. The entity's specific authority-matrix assignments (who holds which approval role) are the volatile element requiring current confirmation, separate from the stable structural framework itself.

## Related References
- `risk-assessment.md` (this skill) — for the risk classification this reference's approval-mode mapping depends on.
- `payments` skill's `vendor-payments-controls.md` — for the SoD principle this reference applies as a general cross-domain rule, with that skill's own PREPARE != APPROVE application.
- `corporate-investigation` skill's `findings.md` — for the ANALYZE != DECIDE boundary this reference's `APPROVE`-reserved-for-humans principle mirrors in the investigation context.

## Known Limitations
- Does not specify the entity's actual authority matrix or specific approval-role assignments — `CORPORATE_CONTEXT_REQUIRED` for every determination of who the accountable decision owner is.
- Does not resolve edge cases where a case's substantive nature doesn't cleanly match any of `GOVERNANCE.md`'s named example categories — route to the more restrictive plausible mode and escalate for human clarification.
- Grounded entirely in this repository's own governance documents (`GOVERNANCE.md`, `ARCHITECTURE.md`), not an external regulatory framework, consistent with this skill's own source map noting no T1 registry entry maps to its domain.
