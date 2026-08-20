# corporate-ai-skills-br — v0.9.0

**Status:** `CONTROLLED PRODUCTION / RELEASE CANDIDATE`

This is deliberately **not** labeled `v1.0.0 Production Validated`. The repository's own final reliability gate (`npm run reliability:final`) proves it is not there yet — two of its four levels are `PASS`, two remain `BLOCKED` on real, named, unclosed items. This document exists so that fact is visible wherever the status table below is read, not only in `reports/final-reliability-gate.json`.

## Status table

| Gate | Result |
|---|---|
| Architecture Complete | `PASS` |
| Repository Reliability Complete | `PASS` |
| Reference Depth | `PASS` — 82/82 required topics (100%), 13/13 critical skills |
| Human Domain Review | `PENDING` — 0/13 critical skills approved by a qualified human |
| Behavioral Platform Validation | `PENDING` — 65/65 cases defined and valid; 0 executed against a real agent |
| Adversarial Platform Validation | `PENDING` — 26/26 cases defined and valid; 0 executed against a real agent |

Reproduce this table at any time: `npm run reliability:final` (the four hard-gated levels) and `npm run reference:depth` (the topic-coverage figure). Neither number above is asserted without a script that recomputes it from current repository state.

## What this status permits

A controlled pilot, under the explicit operator rule in `docs/PRODUCTION_SAFETY_OVERRIDE.md`:

- Critical/high skills may `KNOW`, `ANALYZE`, calculate deterministically, `RECOMMEND`, `DRAFT`, identify risks, identify required sources, and prepare documentation.
- No critical/high skill may `APPROVE`, execute a sensitive action, make a final employment decision, authorize a payment, certify legal/tax/accounting compliance, or claim human validation that has not actually happened — this is already true structurally (no skill's `decision_authority` includes `APPROVE`/`EXECUTE`; see `scripts/production-minimum-gate.mjs`'s check), and `PRODUCTION_SAFETY_OVERRIDE.md` extends the same posture to the deployment/operator layer.

## What this status does not permit

Declaring the pack "100% validated," representing any critical skill's output as human-reviewed, or removing the human-in-the-loop requirement for `APPROVAL_REQUIRED`/`DUAL_APPROVAL`-tier actions (per `GOVERNANCE.md`'s approval model). None of that becomes true until the Pending rows above actually close.

## Before a controlled-production GO

Run `npm run gate:production-minimum`. It recomputes and reports, separately from `npm run reliability:final`:

- `npm run check`, Architecture Complete, Repository Reliability Complete, Reference Depth, secret scan, SSRF/network-target checks, and router v2 regression count — all re-derived from current repository state, not cached.
- That no critical skill's `decision_authority` includes `APPROVE`/`EXECUTE`, and that every critical skill requires human review before release.
- That a rollback mechanism exists (`status: RETIRED` + `npm run registry:build` removes a skill from the routable registry) — verified structurally.
- Four items it explicitly marks `MANUAL_CONFIRMATION_REQUIRED` and never fabricates as passing: logging/audit trail actually enabled in the real deployment target, pilot users actually identified and scoped, the rollback path actually rehearsed end-to-end, and this Release Candidate status actually visible to the pilot's users.

`npm run gate:production-minimum` reporting `AUTOMATED_CHECKS_PASS` is a necessary, not sufficient, condition for GO — the manual items still require a human decision.

## Path to v1.0.0

```
HUMAN_REVIEW closes (13/13 real, scoped, qualified human approvals)
        +
PLATFORM_BEHAVIORAL_EXECUTION closes (65/65 executed against a real agent, pass policy met)
        +
PLATFORM_ADVERSARIAL_EXECUTION closes (26/26 executed against a real agent, pass policy met)
        ↓
npm run reliability:final reports all four levels PASS
        ↓
v0.9.0 Release Candidate → v1.0.0 Production Validated
```

No step in this chain is satisfied by editing this document, `carry-forward.yaml`, or any `skill.yaml` by hand — each closes only through its own registered verifier, the same discipline this repository already applies to `REFERENCE_DEPTH`.
