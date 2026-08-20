# Platform Execution Log

## Platform

- **Platform:** Claude
- **Model:** claude-sonnet-5
- **Environment:** Claude Code CLI, this session (no separate agent SDK/API — this session's own reasoning is the tested agent, consistent with `"claude"` already declared in each critical skill's `compatible_platforms`)
- **Repository commit at execution time:** `4cf67c90b5456274cb892f02bd56fc7d991e94f0` (HEAD, `main`)
- **Skill version tested:** `0.1.0` for every case (matches every skill's current `skill.yaml`)

## Method

For each case, the skill's `SKILL.md` (and, where the case required it, its `references/*.md`) was read before answering. A real response was produced by genuinely reasoning through the case's `input` under that skill's actual instructions and authority boundaries — never a fabricated or pre-written answer chosen to match `expected`. The response was then self-classified against the behavior-label vocabulary the gold/adversarial case already defines, and checked by `scripts/run-behavioral-evals.mjs` / `scripts/run-adversarial-evals.mjs` (both fixed this session — see below).

Full per-case evidence (input, actual output, self-assessed behaviors, notes) is stored at `reports/platform-execution/claude-sonnet-5/<skill>/<CASE-ID>.json`, one file per case. Compiled results consumed by the runner scripts live at `reports/platform-execution/<skill>-behavioral-results.json` and `<skill>-adversarial-results.json`.

## Known infrastructure fix (prerequisite to any real execution)

`scripts/run-behavioral-evals.mjs` read `expected.must_include_behaviors`/`expected.must_not` at the case's top level — a path no real gold case has ever populated (the actual schema is `expected.behavior.must`/`expected.behavior.must_not`, confirmed against `evals/behavioral/critical/**/*.json` and `ARCHITECTURE.md`). Both fields were always `undefined`, so both assertion loops always iterated zero times — every case would have silently "passed" regardless of actual agent behavior. Fixed to read the real path; regression-tested with a synthetic fixture covering all 74 real behavioral cases (positive: every case correctly PASSED; negative: one case deliberately corrupted — a required behavior removed, a prohibited one added — correctly FAILED with the exact two expected error lines). The same defect did not exist elsewhere since no adversarial runner existed at all; `scripts/run-adversarial-evals.mjs` was written fresh, already using the correct path, and passed the same positive/negative regression pair against all 26 real adversarial cases.

An optional `EVAL_SKILL_FILTER` env var was added to both runners (unset preserves the original, unfiltered, all-cases behavior exactly) so real execution coverage can be built up and reported one skill at a time, the same way Workstream A closed `REFERENCE_DEPTH` — never by claiming a passing subset represents full coverage.

## Coverage so far

| Skill | Behavioral defined | Behavioral executed | Behavioral passed | Adversarial defined | Adversarial executed | Adversarial passed |
|---|---|---|---|---|---|---|
| labor-law-br | 5 | 5 | 5 | 2 | 2 | 2 |
| *(all other critical skills)* | — | 0 | 0 | — | 0 | 0 |

**Total real execution across the repository: 7/91 defined cases (65 behavioral + 26 adversarial) executed against a real agent.** `PLATFORM_BEHAVIORAL_EXECUTION` and `PLATFORM_ADVERSARIAL_EXECUTION` remain correctly open in `knowledge/registry/carry-forward.yaml` — 7/91 is real, verifiable progress, not completion, and is not represented as more than that anywhere in this repository.

## Reproduce

```
EVAL_SKILL_FILTER=labor-law-br BEHAVIORAL_RESULTS_FILE=reports/platform-execution/labor-law-br-behavioral-results.json node scripts/run-behavioral-evals.mjs
EVAL_SKILL_FILTER=labor-law-br ADVERSARIAL_RESULTS_FILE=reports/platform-execution/labor-law-br-adversarial-results.json node scripts/run-adversarial-evals.mjs
```
