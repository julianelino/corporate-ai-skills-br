# Reliability Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Execute inline, one validated task at a time. Do not add a new specialist unless an evaluated case proves a domain gap.

**Goal:** Turn the existing architectural foundation into a measurable, freshness-aware, security-tested V1 candidate without making the Core depend on a runtime.

**Architecture:** Keep static quality gates executable through optional dependency-free Node.js and portable wrappers. Isolate behavioral evaluation behind an explicit provider adapter, so a model/API is never required by Core CI. Build source monitoring, router enrichment, engine coverage, fixtures, lifecycle controls, catalogs, and human-review evidence on the same contracts.

**Tech Stack:** Markdown/YAML/JSON Schema Core; optional Node.js 20+ built-ins; GitHub Actions.

## Global Constraints

- Core remains usable with no Node.js or Python installed.
- Do not add skills except when a failed gold case establishes an unserved domain.
- Behavioral evaluation must not require a paid model in Core CI.
- Critical content changes require authoritative sources, eval coverage, and human review metadata.
- Never copy paid or private source content; fixtures stay synthetic.

---

### Task 1: Executable evaluation framework

**Files:**
- Create: `evals/static/*.json`, `evals/behavioral/*.json`, `scripts/run-static-evals.mjs`, `scripts/run-behavioral-evals.mjs`, `tests/node/evals.test.mjs`
- Modify: `package.json`, `.github/workflows/ci.yml`

**Interfaces:**
- Static case: `{ id, input, expected: { primary_skill, risk_at_least, required_contract_fields } }`.
- Behavioral case: `{ id, input, expected: { must_include_behaviors, must_not } }`.
- Behavioral result: `{ id, behaviors: string[], output?: string }`.

- [ ] Implement static assertions against router and skill contracts.
- [ ] Implement behavioral assertions against externally produced structured results; skip only when no result file is supplied.
- [ ] Add initial legal, payment, privacy, and routing cases.
- [ ] Run `npm run eval` and Node tests.

### Task 2: Gold-case and fixture coverage

**Files:**
- Create: critical-domain gold cases and synthetic People, Finance, Accounting, and Tax fixtures.
- Modify: coverage-report script and quality thresholds.

- [ ] Add cases according to risk tier and map every case to a skill/workflow/fixture.
- [ ] Fail readiness when a critical skill lacks its minimum gold coverage.

### Task 3: Critical reference depth

**Files:**
- Create: thematic references under critical skills.
- Modify: critical SKILL routing instructions and sources maps.

- [ ] Add purpose, load condition, decision points, evidence, freshness, and related references without copying source text.

### Task 4: Source Registry v2 and freshness monitoring

**Files:**
- Modify: `sources/SOURCE_REGISTRY.yaml`.
- Create: source baseline, monitor script, and issue workflow.

- [ ] Add verification lifecycle fields.
- [ ] Compare HTTP validators or content fingerprints against baseline.
- [ ] Open a human-review issue when a monitored source changes; never update knowledge automatically.

### Task 5: Executable security and injection gates

**Files:**
- Create: secret, security, and injection check scripts and eval cases.
- Modify: package scripts and CI.

- [ ] Scan high-signal secret patterns with synthetic-fixture allowlist.
- [ ] Assert adversarial behavior contracts without treating untrusted content as instructions.

### Task 6: Router v2 and lifecycle controls

**Files:**
- Modify: router, capability registry, contracts, and router tests.

- [ ] Return domain, task, risk signals, freshness signals, artifacts, action request, candidates, and minimal set.
- [ ] Exclude `RETIRED`; warn on `DEPRECATED` only when no viable substitute exists.

### Task 7: Engine and intake coverage

**Files:**
- Modify: Node engine modules and Node tests.

- [ ] Add deterministic reconciliation classifications, rules/mappings, structured JSON/CSV intake, and safe compression rules.

### Task 8: Documentation, catalogs, and platform gates

**Files:**
- Create: installation guides, catalogs, token/security guides, troubleshooting, and coverage report.

- [ ] Generate catalogs from contracts/registry.
- [ ] Define `SUPPORTED`, `TESTED`, `DOCUMENTED`, `EXPERIMENTAL`, and `UNSUPPORTED` platform gates.

### Task 9: Human review and final audit

**Files:**
- Modify: critical contracts, governance, release checklist, and checkpoints.

- [ ] Add release-review metadata to critical skills.
- [ ] Run all core quality gates and report unresolved human/platform prerequisites.
