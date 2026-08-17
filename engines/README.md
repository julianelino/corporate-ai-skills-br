# Deterministic Engine Contracts

The engine layer is runtime-independent. Consumers use the skill, workflow, schemas, and engine contract without installing Python or any package manager. Each integration may implement a contract in its native approved runtime, including JavaScript/TypeScript, VBA, Apps Script, ABAP, or a service.

The repository's Python modules are optional, dependency-free reference implementations used by maintainers to prove deterministic behavior in CI. They are not a requirement for ChatGPT, Codex, Claude, Gemini, Copilot, or a corporate adapter.

Every implementation must preserve declared inputs, outputs, rounding, validation errors, evidence labels, audit trail, and human-approval boundaries. The LLM interprets results; the engine calculates.
