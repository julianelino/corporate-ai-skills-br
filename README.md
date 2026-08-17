# Corporate AI Skills BR

> **Deep expertise. Minimal activation. Dynamic verification. Deterministic calculation. Evidence-based decisions. Human accountability.**

Corporate AI Skills BR is a proprietary, modular platform of governed specialists for Brazilian People, Labor, Payroll, Finance, Accounting, Tax, Audit, Documents, and automation work.

It is not a collection of prompts and not a generalist assistant. It routes a request to the smallest capable set of specialists, selectively loads references, verifies changing rules, delegates deterministic calculations to code, and preserves human accountability for consequential actions.

## Core operating model

```text
Intent → primary specialist → necessary references → additional specialist → fresh source check → risk/review
```

Use one specialist for a simple request, one or two for a typical request, and three to six only for a justified cross-domain case. A projected load above six specialists must trigger `CONTEXT_GUARD` and a routing review.

## Repository map

- `skills/` — concise, focused specialists with machine-readable contracts.
- `workflows/` — approval-gated multi-specialist processes.
- `knowledge/registry/` and `sources/` — capability and source registries.
- `reasoning/`, `schemas/`, `policies/`, `context/` — shared foundations and controlled corporate context boundaries.
- `engines/` — platform-neutral deterministic-engine specifications plus optional reference implementations.
- `evals/`, `fixtures/`, `tests/`, `scripts/` — synthetic evaluation and quality controls.

Read [ARCHITECTURE.md](ARCHITECTURE.md) before extending the platform and [GOVERNANCE.md](GOVERNANCE.md) before changing a critical skill.

## Safety and decision boundaries

The platform can know, analyze, recommend, draft, prepare, and execute only deterministic technical operations within its contract. It does not approve hiring, termination, disciplinary action, payments, bank changes, accounting postings, or other business decisions. Sensitive operations default to `SIMULATE`.

Source-dependent legal, tax, payroll, accounting, SST, eSocial, SPED, CCT/ACT, and material jurisprudence guidance must verify current authoritative information when applicable. Corporate data remains controlled context, never default prompt material.

## Platform compatibility

| Platform | Status | Notes |
| --- | --- | --- |
| Codex | supported | Native repository-oriented skill structure. |
| ChatGPT | partial | Core Markdown and references are portable; runtime behavior depends on workspace configuration. |
| Claude | partial | Core content is portable; adapter guidance is required for invocation conventions. |
| Gemini | experimental | Content is portable; no full runtime validation is claimed. |
| Copilot | experimental | Content is portable; repository instruction support varies by product. |

## Installation and use

Use the repository as controlled source material in a compatible workspace. Keep the shared foundations available, make individual skill directories discoverable by the platform in use, and only load relevant references for the request. **No Python, Node.js, package manager, or local runtime is required to use the skills, workflows, policies, schemas, or references.** Do not import real employee, medical, banking, customer, credential, or production data into fixtures or examples.

## Optional contributor tooling

The Python scripts and tests are optional reference tooling for maintainers; they are not part of the product runtime. GitHub Actions provisions its own Python environment for these checks. A platform adapter may implement the engine specifications in Python, JavaScript/TypeScript, VBA, Apps Script, ABAP, or another approved runtime.

If you choose to run the reference checks locally, use:

```bash
python3 scripts/validate-skill.py skills
python3 scripts/validate-sources.py sources/SOURCE_REGISTRY.yaml
pytest -q
```

## Author

Created and architected by **Juliane Lino**.

Copyright © 2026 Juliane Lino. All rights reserved.
