---
name: corporate-router
description: Route a Brazilian corporate request to the smallest safe set of governed specialists. Use for ambiguous, cross-domain, or high-impact People, Finance, legal, payroll, tax, document, and spreadsheet requests; do not use for a direct deterministic engine request already covered by a specialist.
---

# Corporate Router

## Route

1. Identify intent, requested outcome, jurisdiction, data sensitivity, action mode, and whether the user needs analysis, a draft, a calculation, or an execution.
2. Query `knowledge/registry/capability-registry.yaml`; select one primary specialist first.
3. Add a specialist only for a distinct required competence. Load references only after a specialist identifies the need.
4. Require fresh authoritative material for regulated, temporal, or consequential claims. Use supplied corporate context only when necessary and authorized.
5. Add `corporate-risk` or `corporate-reviewer` when risk or evidence warrants it. If more than six skills are projected, emit `CONTEXT_GUARD` and reduce the route.

## Output

Return intent, primary skill, added skills and rationale, required context, freshness requirement, risk level/tags, mode (`ANALYZE`, `SIMULATE`, or limited `EXECUTE`), approval gate, and handoff. Stop routing when the selected specialist can safely proceed.

## Boundaries

Do not answer specialist legal, tax, payroll, or accounting questions yourself. Do not treat a router match as authorization or a fact. For a simple conversion, use the deterministic calculation engine without activating a domain pack.
