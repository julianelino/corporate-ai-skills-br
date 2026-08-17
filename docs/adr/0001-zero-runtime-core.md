# ADR 0001: Zero-Runtime Core

Date: 2026-08-17

## Status

Accepted.

## Context

Corporate AI Skills BR must remain usable by agents and teams regardless of local programming language, package manager, or SDK availability. Requiring Python or Node.js to read and apply a skill would reduce portability and introduce unnecessary operational friction.

## Decision

Corporate AI Skills BR uses a zero-runtime Core. Markdown, YAML, JSON Schema, templates, policies, workflows, references, and context contracts define the portable knowledge and agent layer. Node.js 20+ is an optional automation runtime for validation, deterministic engines, evals, token auditing, and CI. Python is not a Core dependency and may be introduced only through an explicitly activated advanced-analytics adapter.

## Consequences

- A machine without Node.js or Python can consume the skill pack normally.
- A machine with Node.js can run `npm run check` without installing dependencies.
- A broken optional script cannot invalidate the knowledge, governance, or workflows in the Core.
- New runtime dependencies require an ADR and must preserve a zero-runtime fallback.
