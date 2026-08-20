# Production Safety Override — Release Candidate

**Status:** active for `v0.9.0` (Controlled Production / Release Candidate) until `HUMAN_REVIEW`, `PLATFORM_BEHAVIORAL_EXECUTION`, and `PLATFORM_ADVERSARIAL_EXECUTION` close and `npm run reliability:final` reports all four levels `PASS`.

This is an **operational rollout layer**, not a change to any skill. It does not modify `skill.yaml`, `risk_ceiling`, `decision_authority`, routing, or any other frozen architecture element. It is a rule the deploying platform/operator applies on top of the existing contracts while `V1 Release Ready` / `Production Domain Validated` are still `BLOCKED` for the reasons `npm run reliability:final` names.

## Why this exists

`npm run reference:depth` reports 82/82 (100%) and `Architecture Complete` / `Repository Reliability Complete` both report `PASS`. `HUMAN_REVIEW`, `PLATFORM_BEHAVIORAL_EXECUTION`, and `PLATFORM_ADVERSARIAL_EXECUTION` remain open — no critical skill has been approved by a qualified human, and no behavioral or adversarial case has ever been executed against a real agent. A controlled pilot is defensible only if every critical/high-risk output is treated as decision support requiring human verification, never as a final, certified answer — the same posture already required by the underlying `decision_authority` contracts (`APPROVE` is reserved for humans and no skill holds it), made explicit here as an operator-facing rule.

## Scope

Applies to every skill with `quality_profile: critical` or `quality_profile: high`, for the duration this document's status line marks "active."

## Rules

1. **Treat output as decision support, not final authority.** A recommendation, draft, calculation, or risk classification from a critical/high skill informs a human decision — it is never itself the decision.
2. **Do not perform or claim approval of sensitive actions.** No deployment configuration, prompt, or integration may cause a critical/high skill's output to be logged, displayed, or transmitted as an approval, a certification, or an executed action. This mirrors every critical skill's own contract — none holds `APPROVE` or `EXECUTE` — and extends it to the deployment layer itself.
3. **Require human verification before operational use.** For terminations, salary changes, hires, payments, bank-detail changes, material accounting/tax/legal conclusions, or any action `GOVERNANCE.md`'s approval model marks `APPROVAL_REQUIRED` or `DUAL_APPROVAL`, a named accountable human must review before the action is taken — the pilot's own process, not the skill, is what enforces this.
4. **Surface material uncertainty and required evidence explicitly**, for legal, payroll, tax, accounting, privacy, compliance, investigation, fraud-risk, or payment questions — an output that omits its own evidence gaps or `VERIFY_CURRENT_T1_SOURCE` flags should not be relied on as-is.
5. **Never claim that domain review has been completed when `human_review.status` is not `approved`.** Check `reviews/critical/<skill>/REVIEW.md` and the skill's own `skill.yaml` before representing any critical skill's output as human-reviewed.
6. **Never bypass existing `decision_authority` or risk controls.** This override adds caution; it removes none of the existing gates (`corporate-risk`'s risk classification, `corporate-reviewer`'s independent review, the approval-mode mapping in `GOVERNANCE.md`).

## Pilot scope (recommended, not enforced by this document)

- Users: HR, Finance, and Functional staff who already understand the underlying process and can recognize an incorrect answer — not end users making critical decisions unsupervised.
- No automated integration that executes a payment, a bank-detail change, a termination, or an equivalent irreversible action directly from a skill's output.
- A named accountable owner per pilot area, responsible for the human-verification step in Rule 3.

## Rollback

A skill (or an entire `quality_profile` tier) can be removed from the routable capability registry immediately:

1. Set the skill's `status` to `RETIRED` in its `skill.yaml` (or apply the same change across the affected tier).
2. Run `npm run registry:build` to regenerate `knowledge/registry/capability-registry.generated.yaml` without it.
3. Confirm via `npm run coverage` / `npm run reference:depth` that the skill no longer appears as routable.

This mechanism is verified structurally (`scripts/build-capability-registry.mjs` excludes `status === "RETIRED"`) — see `scripts/production-minimum-gate.mjs`'s "Rollback mechanism exists" check. It has not been rehearsed end-to-end in an actual deployment target as of this document's writing; that rehearsal is one of the manual confirmations `npm run gate:production-minimum` lists as pending.

## Exit condition

This override is retired — not by editing this file, but by the underlying blockers actually closing — when `npm run reliability:final` reports:

```
Architecture Complete             PASS
Repository Reliability Complete   PASS
V1 Release Ready                  PASS
Production / Domain Validated     PASS
```

At that point the project may be labeled `v1.0.0 Production Validated` and this override's constraints may be relaxed to whatever the entity's standard operating policy requires — never before.
