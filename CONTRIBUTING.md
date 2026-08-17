# Contributing

## Before editing

Read `ARCHITECTURE.md`, `GOVERNANCE.md`, `SECURITY.md`, the applicable skill contract, source map, and evals. Preserve Juliane Lino’s original authorship and proprietary terms.

## Change requirements

Keep skills focused, write technical internals in English, preserve official Brazilian terminology when needed, and use Portuguese naturally for Brazilian user-facing outputs. Add sources and temporality for regulated content, tests for deterministic code, synthetic fixtures only, and an eval for material behavior.

The Core must work without a runtime. When Node.js 20+ is available, run `npm run check`; it uses no installed dependencies. Otherwise run the portable operating-system wrapper from `scripts/README.md` or rely on GitHub Actions. Python is not a Core contributor requirement. Do not commit secrets, paid/proprietary content, invented corporate data, or copied source material without rights. Describe source, rationale, impact, risk, and approval implications for critical changes.

## Commit convention

When Git is available, use Conventional Commits, for example `feat(payroll): add payroll audit checks` or `test(evals): add payment fraud guard case`. Never push without explicit authorization.
