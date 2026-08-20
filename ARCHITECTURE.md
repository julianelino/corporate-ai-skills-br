# Architecture

> **Deep expertise. Minimal activation. Dynamic verification. Deterministic calculation. Evidence-based decisions. Human accountability.**

> **Do not make experts smaller to save tokens. Make context smarter.**

> **Route minimally. Load selectively. Verify dynamically. Calculate deterministically. Decide with evidence. Escalate by risk. Keep humans accountable.**

## Design boundaries

The repository separates responsibilities deliberately:

| Component | Responsibility |
| --- | --- |
| Skill | Specialist reasoning, input/output contract, delegation, and safety boundary. |
| Workflow | Ordered multi-component process with gates and audit expectations. |
| Reasoning pack | Reusable method, never domain-specific facts. |
| Knowledge/reference | Detailed, selectively loaded material with source and temporality. |
| Engine | Platform-neutral deterministic operation specification; a runtime adapter calculates or validates, but does not decide. |
| Schema | Stable data shape and validation rules. |
| Policy | Repository-wide non-negotiable control. |
| Adapter | Platform or enterprise-system mapping; never owns business policy. |

## Loading architecture

```text
LEVEL 0  Intent detection
LEVEL 1  Primary specialist
LEVEL 2  Necessary references
LEVEL 3  Additional specialist
LEVEL 4  Fresh external source verification
LEVEL 5  Risk and reviewer
```

Routing ends as soon as a sufficient, safe answer is possible. It never imports a whole domain pack merely because the subject is broad.

## Skill contract

Each skill contains a concise `SKILL.md` with only the standard trigger frontmatter (`name`, `description`) and a companion `skill.yaml` contract. This preserves tool compatibility while satisfying the governed metadata model:

```yaml
name: example
description: Human-readable intent summary
version: 0.1.0
domain: [people]
status: BETA
jurisdiction: BR
default_locale: pt-BR
routes_from: [corporate-router]
routes_to: [corporate-risk]
handles: [example-case]
requires: []
optional_context: []
risk_ceiling: R2
decision_authority: [KNOW, ANALYZE, RECOMMEND]
freshness: conditional
source_policy: standard
token_budget:
  core_tokens: 2500
  initial_references: 0
  max_references: 4
  examples_on_demand: true
  large_sources_on_demand: true
compatible_platforms: [codex]
```

## Capability registry

A skill manifest (`skill.yaml`) is the canonical declaration of a skill, including its routing exposure. The Capability Registry (`knowledge/registry/capability-registry.generated.yaml`) is a generated routing index, not an independent source of truth: `npm run registry:build` derives it from every `skill.yaml` plus the curated trigger phrases in `knowledge/registry/routing-triggers.yaml`, and it is never edited by hand. Every non-`RETIRED` skill declares `routing.exposure` as one of `DIRECT` (user-routable), `DELEGATED` (reached only through another skill's `routes_to`), `INTERNAL` (repository maintenance, never a request target), or `UTILITY`, plus a `routing.namespace` (e.g. `finance.p2p`, `people.labor`) that documents which functional cluster it belongs to — informational grouping today, not yet a two-phase routing input. `npm run registry:coverage` hard-fails when a `DIRECT`/`DELEGATED` skill is absent from the generated registry, and specifically when a skill named as critical in `GOVERNANCE.md` (or carrying `status: CRITICAL`) is invisible to routing. `npm run registry:drift` hard-fails when the committed generated file no longer matches what the manifests produce. `npm run routing:eval-coverage` hard-fails when a routable skill has no positive routing eval under `evals/static/routing/`, or when a governance-critical skill has fewer than 3 positive cases and 1 boundary case.

The deterministic router (`engines/reference-routing/index.mjs`) matches on word/phrase boundaries, not bare substrings — a trigger only matches a whole token or contiguous token sequence, so a short trigger like `"iss"` cannot match inside an unrelated word like `"dismissal"`. A trigger ending in `*` is the explicit, opt-in exception for a prefix match (e.g. `"pay*"` also catches "payment", "payable"), scored below an exact match. Match weight is the trigger's token count, so a longer, more specific phrase outweighs a short generic one instead of counting equally. A skill's `anti_triggers` (also curated in `routing-triggers.yaml`) exclude it outright when matched — reserved for genuine semantic overlap between two skills that share vocabulary for opposite meanings (e.g. "customer invoice" vs "supplier invoice"), never for skills that legitimately both apply to the same input (see `knowledge/registry/routing-collisions.yaml` for the taxonomy and the real collisions found and fixed while building this). An exact tie for the top score returns `status: AMBIGUOUS` with `primary: null` and `ambiguity_reason`, rather than guessing. `npm run routing:eval-coverage` hard-fails when a routable skill lacks the positive/boundary/delegation minimum its `quality_profile` sets for its own `routing.exposure` (`knowledge/registry/quality-profiles.yaml` `evals.routing.by_exposure`) — a `DELEGATED` skill is measured by delegation cases, never a `DIRECT` skill's positive-match bar.

## Router v2

`engines/reference-routing/index.mjs` is a dispatcher: it exports `v2.mjs` by default, or `v1.mjs` (the frozen Task 1c matcher) when `ROUTER_VERSION=v1` is set. `v2.mjs` imports v1's tokenizer and matcher rather than reimplementing them — the lexical-boundary protections never regress — and adds three things, each weaker than the last: **handle evidence** (a skill's own `handles`, capped at a fixed weak bonus — `knowledge/registry/routing-policy.json` `weights.handle_evidence` — below any curated trigger, never scaled by phrase length); **namespace consensus** (a small bonus when two or more already-matched candidates share a `routing.namespace`, corroborating that domain without ever siloing — a request can and does span namespaces); and **`intent_signals`/`risk_signals`/`freshness_signals`** (keyword detection against `knowledge/registry/intents.json` and `routing-signals.json`, surfaced for a downstream orchestrator to weigh — informational only, never fed into scoring; building a responsible intent-to-domain compatibility matrix was explicitly out of scope, see `reliability-hardening.md` Task 4). `AMBIGUOUS` gained `insufficient_margin` alongside `score_tie`/`context_guard`: `thresholds.minimum_margin` in the policy file was calibrated by running all 100 committed static cases through v1 and taking the smallest real score gap among passing multi-candidate cases (0.5), not chosen from intuition. `npm run validate:routing-policy` checks the policy files are well-formed (weights present and non-negative, no trigger listed in both `triggers` and `anti_triggers`, no empty prefix). `npm run router:compare` runs every static eval case through both engines and classifies every differing outcome — `UNCHANGED`, `INTENTIONAL_CHANGE`, `IMPROVED`, `REGRESSION` — against the case's own `expected` block; v2 only became the default after that comparison showed zero regressions and zero unverifiable cases across all 104 cases.

## Quality profile

`routing.exposure` says whether a skill is reachable; `quality_profile` (`critical`, `high`, `standard`, `utility`, or `internal`) says how rigorous its controls must be, and is a separate axis. Requirements per profile — `sources`, `references`, eval types and minimums, `human_review` — live in one place, `knowledge/registry/quality-profiles.yaml`; a `skill.yaml` only ever declares its `quality_profile` (and, rarely, a `quality_overrides` entry with a mandatory `reason` when it must deviate). `npm run validate:quality` is a structural gate in `npm run check`: every skill has a valid profile, `risk_ceiling` `R5`/`R6` cannot be classified `standard`/`utility`/`internal`, freshness cannot fall below the profile's floor, and any override that relaxes a control needs a stated reason. It does not check whether a skill actually meets its requirements — that is `npm run readiness`, a separate report (policy vs. actual, per skill, with a `readiness_tier` and `release_status`) that is never wired into `npm run check`: an unmet readiness requirement (missing behavioral eval, pending human review) must not block ordinary development, only an intentional `npm run readiness -- --release` check.

## Critical behavioral gold cases

Every `quality_profile: critical` skill — discovered dynamically, never a hardcoded list — carries at least one behavior-contract gold case per risk class (`NORMAL`, `BOUNDARY`, `INSUFFICIENT_CONTEXT`, `HIGH_RISK`, `FAIL_SAFE`) under `evals/behavioral/critical/<skill>/`. A gold case asserts `expected.behavior.must`/`must_not` (behavior labels, not exact text) and `expected.contract` (`minimum_risk`, `freshness_required`, `human_approval_required`, `authority.{allowed,forbidden}`, and where relevant `evidence.must_distinguish`) — checked for internal consistency against the skill's own `risk_ceiling`/`decision_authority`/`freshness` by `npm run behavioral:validate`. That validator is a **definition** gate only: it never executes a case or reports a behavioral pass. `scripts/run-behavioral-evals.mjs` is the separate **execution** mode, which stays inert (`BEHAVIORAL_EVALS_SKIPPED`) unless `BEHAVIORAL_RESULTS_FILE` or `BEHAVIORAL_EVAL_COMMAND` is supplied — never required by `npm run check`. `npm run behavioral:report` shows `Defined`/`Valid`/`Executed`/`Passed` as distinct counts; a case is never reported "passed" without having actually been executed against an agent.

## Critical sources and human review

Every critical skill's `sources.md` follows one structure: Source Policy, Primary Authorities, Corporate Sources, Secondary Professional Sources, Freshness-Critical Topics, Conflict Resolution, Source Restrictions, When External Verification Is Required, References Loaded On Demand — checked by `npm run critical:sources`. It references `sources/SOURCE_REGISTRY.yaml` entries by ID; it never duplicates their metadata. `knowledge/registry/critical-topics.yaml` records each critical skill's real knowledge scope (from its own `handles`/description), so reference-file coverage of that scope is measurable rather than asserted. `human_review` on a critical skill's `skill.yaml` carries `scope` (which of `DOMAIN`/`LEGAL`/`TAX`/`PAYROLL`/`ACCOUNTING`/`SECURITY`/`ARCHITECTURE`/`GOVERNANCE` it needs), `skill_version`, and `reviewed_commit`, so an approval ties to a specific version, not a floating claim. `reviews/critical/<skill>/` holds a machine-assembled package (purpose, risk, authority, source hierarchy, gold-case summary, known gaps, ten fixed reviewer questions, approval criteria) for a qualified human to work from — never a substitute for their review. `npm run critical:sources` hard-fails a `human_review.status: approved` that lacks a non-empty `reviewers`, a `reviewed_at`, a `reviewed_commit`, or that names an AI as a reviewer: an assistant may prepare and precheck a package, it may never approve it.

## Freshness lifecycle

The rule is: detect change, never silently change domain knowledge. Every `sources/SOURCE_REGISTRY.yaml` entry carries `freshness_lifecycle`: `mode` (`monitor` for official/court/standards sources with a checkable URL, `manual` for professional/secondary/benchmark sources that are periodically human-reviewed, never network-polled), `status` (`UNKNOWN`/`CURRENT`/`CHANGED_UNREVIEWED`/`STALE`/`UNREACHABLE`/`SUPERSEDED`/`HISTORICAL`), and two deliberately separate timestamps: `last_checked` (an automated request reached it) and `last_verified` (a qualified human confirmed the content is still correct) — the first is not evidence for the second. `npm run validate:source-freshness` checks the shape only (valid mode/status/dates, `supersedes`/`superseded_by` point at real entries, a `SUPERSEDED` source names its replacement), and is in `npm run check`. `npm run freshness:check` is the operational counterpart — real HTTP requests, a normalized-content or `etag` fingerprint, never part of Core or `npm run check` (`GOVERNANCE.md` "Runtime governance") — and it only ever writes `last_checked`/`status`/`fingerprint`; `last_verified` is a human-only field no script sets. A `CHANGED_UNREVIEWED` status is sticky: it does not silently clear itself on a later unchanged check, only a human clearing it (by verifying and setting `last_verified`) resets it.

Source freshness and knowledge freshness are two different layers: `npm run freshness:report` (`scripts/report-source-impact.mjs`) builds the source→skill dependency from what each critical skill's `sources.md` actually cites by ID — not an invented mapping — and `npm run readiness` uses it to add two gap types for any skill whose profile requires sources: `source_freshness_alert` (a referenced source is currently flagged) and `source_verification` (none of its referenced sources has ever been human-verified — an automated `CURRENT` result is not verification). `.github/workflows/source-freshness.yml` runs the operational check on a schedule and opens a `knowledge-review` issue with the real results when something needs a look; it never commits a change to the registry or any knowledge content itself.

## Security execution

Security policy that cannot be tested is documentation, not a control. `knowledge/registry/security-policy.json` is the threat model — only threats real to this repository, each pointing at the actual check or eval that tests it — and states the instruction hierarchy every skill follows: `SYSTEM_AND_PROJECT_POLICY > SKILL_INSTRUCTIONS > TRUSTED_CORPORATE_CONTEXT > EXTERNAL_OR_UPLOADED_CONTENT`. A document, email, or any other supplied content is data, never instruction authority, regardless of what its text claims. Five deterministic controls run in `npm run check`: `scripts/scan-secrets.mjs` (real credential-shape patterns, not a bare word grep; `security/secret-allowlist.json` exists only for deliberate fixtures, by exact string); `scripts/validate-network-targets.mjs` and the same logic re-applied with real DNS resolution before every request and redirect hop in `scripts/check-source-freshness.mjs` (`scripts/network-safety.mjs`) — an SSRF guard made necessary by Task 5's own real network access, blocking loopback/private/link-local/carrier-NAT ranges and the cloud metadata address; `scripts/validate-ci-permissions.mjs` (every workflow must declare an explicit `permissions:` block, `contents: read` unless a named exception is justified); `scripts/validate-dependency-policy.mjs` (turns "zero external dependencies" from an assumption into a checked property against `security/dependency-policy.json`'s empty allowlist); and the fake-human-approval guard already described above.

`evals/adversarial/critical/<skill>/` holds adversarial case definitions (>=2 per critical skill, from `quality-profiles.yaml`, discovered dynamically) — prompt injection, privilege escalation, source manipulation, false accusation, fake human approval — checked for definition-only validity by `npm run adversarial:validate`, the same DEFINED/VALID/EXECUTED/PASSED discipline as the behavioral gold cases. `npm run security:report` aggregates every deterministic control plus the adversarial and prompt-injection definition counts into one report, and is explicit that `Executed: 0` and `Passed: 0` always hold until a real agent/platform is wired to `scripts/run-behavioral-evals.mjs`'s execution mode — a defined and valid adversarial case is never reported as a tested one.

## Carry-forward findings

A finding that a task surfaces but explicitly defers (a policy gap, a routing-depth shortfall) is recorded in `knowledge/registry/carry-forward.yaml`, naming which later task must resolve it. It never just disappears from the plan when the surfacing task closes. An item's `status` only ever moves to `closed` through a registered verifier in `scripts/verify-carry-forward.mjs` that recomputes the actual gap from current data (`npm run carry-forward:verify`) — never a manual edit. `npm run critical:sources` independently recomputes every item's gap count, read-only, and hard-fails if a `"closed"` item's recomputed count is not actually zero, so a stale or fabricated closure cannot survive `npm run check`.

## Final reliability gate

`npm run reliability:final` answers four independent questions, each hard-gated — never a percentage, never one score standing in for all four, because that would hide exactly the distinctions the rest of this document exists to make: **Architecture Complete** (does the system exist and cohere — zero-runtime Core, generated registry, Router v2 with its v1 baseline, quality profiles, the gold-case/adversarial/freshness/security frameworks, a verifiable carry-forward); **Repository Reliability Complete** (do the gates actually catch regressions — `npm run check` green, the router v1-vs-v2 shadow comparison showing zero regressions and zero unverifiable cases, every deterministic security control passing, no duplicate hardcoded critical-skill list); **V1 Release Ready** (the first two, plus zero open `release_blocking: true` carry-forward items); and **Production / Domain Validated** (all 13 critical skills' human review actually `approved`, and the behavioral/adversarial cases actually executed against a real agent — not merely defined). A level is `PASS` only if every one of its own checks is true and every prerequisite level already passed; `reports/final-reliability-gate.json` records exactly which checks failed or which carry-forward items are blocking, never a vague "mostly ready". Building this gate found two of its own bugs on first run (a hardcoded critical-skill-list detector that matched its own source text, and a router-comparison check that treated an absent JSON key as "unknown" instead of "zero occurrences") — both fixed and smoke-tested the same way as every other gate in this repository, by breaking something on purpose and confirming the failure is reported correctly before trusting the pass.

## Risk, evidence, and authority

Risk levels run from `R0` informational through `R6` critical. Tags include `LEGAL`, `PEOPLE`, `FINANCIAL`, `ACCOUNTING`, `TAX`, `PRIVACY`, `COMPLIANCE`, `FRAUD`, `REPUTATIONAL`, and `SECURITY`.

Evidence is always marked `CONFIRMED`, `CALCULATED`, `INFERRED`, `ALLEGED`, `ESTIMATED`, or `UNKNOWN`. Confidence is qualitative (`HIGH`, `MEDIUM`, `LOW`) and must name its limiting factors. A specialist may not convert an allegation or anomaly into a confirmed fact.

Decision authorities are `KNOW`, `ANALYZE`, `RECOMMEND`, `DRAFT`, `PREPARE`, `EXECUTE`, and `APPROVE`. `APPROVE` is reserved for accountable humans and does not belong to a skill contract. Execution is limited to deterministic engines after an approved workflow gate.

## Context and data ownership

Corporate context is partitioned by domain and loaded only for the use case. Master-data owners resolve conflicts: HR owns employee master data; Payroll/HR payroll data; Finance/Controllership cost centers; Accounting chart of accounts and accounting policy; FP&A budget; Treasury bank data; HR/Labor CCT; and Tax tax policy. When sources conflict, report the conflict with owner, authority, freshness, and evidence; never choose silently.

## Versioning and maturity

Repository releases use semantic versioning. Each skill has its own version and one of `EXPERIMENTAL`, `BETA`, `STABLE`, `CRITICAL`, `DEPRECATED`, or `RETIRED`. A critical skill change requires sources, rationale, impact assessment, tests, and human review.

## Runtime independence

The governed product surface is Markdown, YAML, JSON Schema, and templates. It has no mandatory local programming runtime. `engines/` describes deterministic contracts independently of language; Node.js implementations are the preferred optional automation runtime. Python is reserved for a future optional advanced-analytics adapter. An adapter must preserve engine inputs, outputs, precision, errors, auditability, and approval boundaries when using another runtime.
