# Behavioral Signals (Unusual Users, Weekend Activity)

## Topics Covered
- unusual users
- weekend activity

## Purpose
Establish how to triage two related behavioral-context signals — an unusual user performing a transaction/access, and activity occurring outside normal business timing (notably weekends) — each meaningful primarily as a deviation from an established baseline, not as a standalone red flag.

## When to Load
Load whenever a request involves a transaction or system access flagged because it was performed by a user outside their normal role/pattern, or because it occurred at an unusual time (weekend, after-hours) — before characterizing the pattern or recommending any action.

## Scope
Covers the risk-signal triage discipline for these two behavioral-context signals. Does not cover the segregation-of-duties control framework these signals often intersect with (see `payments` skill's `vendor-payments-controls.md`) or the specific transaction-structure signals that frequently co-occur (see `transaction-pattern-signals.md`).

## Core Concepts
- **Baseline-dependence**: neither signal has meaning in isolation — "unusual" and "weekend" are both deviations from an established normal pattern for the specific user, role, or process. A user who routinely works weekends (a specific operational role, a different time zone, a documented on-call arrangement) generates a false signal if weekend activity is flagged without accounting for that baseline; a user acting entirely outside their normal role/system access is a much stronger signal than the same action taken by someone whose role ordinarily includes it.
- **Unusual user — the SoD-adjacent version**: the highest-concern manifestation is a user performing an action outside their assigned role in a way that crosses a segregation-of-duties boundary (e.g., someone with supplier-master-edit access also approving a payment to that same supplier, contrary to the `payments` skill's `vendor-payments-controls.md` SoD principle) — this is a control-boundary violation, materially more concerning than a merely infrequent user performing an action still within their proper role.
- **Unusual user — the access-anomaly version**: a user accessing or acting on a record/system they have technical permission for but no ordinary business reason to touch (e.g., an employee in an unrelated department editing a specific vendor's bank details) is a distinct, also-concerning pattern even without a formal SoD violation, since it suggests either credential compromise or an undisclosed relationship/motive.
- **Weekend/after-hours activity**: transactions initiated or approved outside normal business hours can reflect a deliberate attempt to act when oversight/review is less active (fewer colleagues present to notice, delayed detection until the next business day) — but can equally reflect a legitimate urgent business need, a different time-zone counterparty, or simply an employee catching up on routine work. As with round amounts in `transaction-pattern-signals.md`, this signal alone is weak and should generally not be escalated in isolation.
- **Compounding effect**: an unusual user combined with weekend timing, or either combined with another signal from this skill (a bank-detail change, a manual entry, a round amount), meaningfully raises the pattern from anomaly toward indicator — the same co-occurrence discipline described in `transaction-pattern-signals.md` applies here.

## Decision Points
1. Is "unusual" or "weekend" being assessed against an actual established baseline for this specific user/role/process, or merely against a generic assumption of "normal business hours/roles"?
2. Does the unusual-user pattern cross a formal SoD boundary (e.g., the same person edited a supplier record and approved a related payment), or is it a role-appropriate action merely performed by a less-typical member of an authorized group?
3. Does the access-anomaly version apply — a user with no ordinary business reason to touch this specific record, even if within their general technical permissions?
4. Is the weekend/after-hours timing explained by a documented legitimate reason (urgent business need, different time zone, on-call arrangement), or does it lack any apparent explanation?
5. Does this signal co-occur with another signal in this skill, raising it from a weak standalone indicator to a combined pattern warranting closer review?

## Required Facts
- The specific user's normal role, access scope, and typical activity pattern (baseline), for comparison.
- Whether the flagged action crosses a formal SoD boundary or merely falls outside a general norm.
- Any documented business reason for weekend/after-hours timing.
- Co-occurrence with other signals in this skill.

## Required Evidence
- Access/role records establishing the user's normal scope, for baseline comparison.
- SoD policy documentation, to assess whether a formal boundary was crossed. `CORPORATE_CONTEXT_REQUIRED`.
- Any business justification on record for unusual timing.

## Exceptions
- A user whose documented role legitimately includes weekend/after-hours activity (on-call, different time zone, specific operational function) does not generate a meaningful signal from timing alone — baseline-adjustment is required before treating this as anomalous.
- An "unusual user" acting within an authorized backup/delegation arrangement (e.g., a documented approval-delegate covering for an absent primary approver) is a properly-controlled exception, not an SoD violation — provided the delegation itself was properly authorized and documented, not self-assigned.

## Risk Considerations
- Flagging weekend/after-hours activity without baseline-adjustment for roles that legitimately operate on that schedule produces high false-positive volume specific to those roles and risks those employees' legitimate work being treated as suspect by default.
- Failing to distinguish a formal SoD-boundary crossing from a merely-infrequent-but-authorized action understates the seriousness of the former and overstates the seriousness of the latter.
- Treating an undocumented delegation/backup arrangement as equivalent to a properly-authorized one misses the actual control question — whether the delegation itself was legitimately granted, not merely whether the delegate's action was otherwise reasonable.

## Human Escalation Conditions
Escalate to the accountable function whenever: an action crosses a formal SoD boundary; an access-anomaly pattern (no ordinary business reason to touch a specific record) is identified; weekend/after-hours activity lacks any documented business justification and co-occurs with another signal; or a claimed delegation/backup arrangement cannot be confirmed as properly authorized.

## Source IDs
`bacen`/`cvm` (T1 — general financial-control and market-integrity context, not pattern-specific), corporate policy (Corporate Source — the entity's own role definitions, access-control policy, SoD matrix, and delegation/backup-authorization procedure; `CORPORATE_CONTEXT_REQUIRED` for all baseline comparisons).

## Freshness Requirements
Standard — these are stable, well-recognized behavioral-anomaly heuristics; `CORPORATE_CONTEXT_REQUIRED` for the entity's specific current role/access baselines, which require periodic reconfirmation as organizational structure evolves.

## Effective-Date Considerations
These behavioral-signal patterns are stable, generally-recognized fraud-examination and internal-control heuristics not tied to a specific statutory effective date.

## Related References
- `payments` skill's `vendor-payments-controls.md` — for the SoD control framework the "unusual user" signal's most serious manifestation directly implicates.
- `duplicate-signals.md`, `bank-changes.md`, `transaction-pattern-signals.md`, `reversals.md` (this skill) — for the other signal categories these behavioral patterns should be cross-checked against for co-occurrence.
- `corporate-investigation` skill — for the formal-investigation authority this skill's escalation hands off to.

## Known Limitations
- Does not specify the entity's actual role baselines, SoD matrix, or delegation-authorization procedure — `CORPORATE_CONTEXT_REQUIRED` for every determination this reference's decision points depend on.
- Weekend/after-hours timing alone is acknowledged as a weak, high-false-positive signal — this reference deliberately does not recommend escalating on this signal alone absent co-occurrence or a clear SoD/access-anomaly dimension.
- Draws on general fraud-examination and internal-control secondary literature for its pattern framing, not a single primary regulatory text, in this research pass.
