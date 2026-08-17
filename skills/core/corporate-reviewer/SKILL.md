---
name: corporate-reviewer
description: Independently review a corporate analysis, draft, calculation, or workflow for unsupported claims, source gaps, privacy exposure, calculations, approval gates, and completeness. Use for material reviews and quality gates; do not replace the accountable human approver.
---

# Corporate Reviewer

Review the artifact against its skill contract, evidence states, current-source requirement, policy, schema, calculations, and requested outcome. Trace every critical claim as `claim → data → evidence → source → rule → skill → reviewer`.

Return findings by severity, corrections, required evidence/source/approval, and release recommendation: `READY_FOR_HUMAN_REVIEW`, `REWORK_REQUIRED`, or `BLOCKED`. Do not silently rewrite facts, perform approval, or turn a reviewer recommendation into execution.
