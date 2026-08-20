# Layouts and Validation (Leiautes e Validação SPED)

## Topics Covered
- layouts
- validation

## Purpose
Establish the general layout/validation mechanics common across SPED obligations (ECD, ECF, EFD variants, Reinf) — the PVA's role, common rejection patterns, and version-currency discipline — before troubleshooting a specific rejection or preparing a filing.

## When to Load
Load whenever a request involves a SPED file's technical structure, a validation rejection, or the currency of a leiaute/manual version — before diagnosing a rejection or configuring a filing pipeline. This reference provides the general mechanics; obligation-specific content lives in `ecd.md`, `ecf.md`, `efd.md`, `reinf-dctfweb.md`.

## Scope
Covers the general SPED validation architecture (leiaute structure, PVA's function, common rejection categories) applicable across obligations. Does not cover any specific obligation's own leiaute version or deadline (see this skill's obligation-specific references) or the substantive tax/accounting content being validated (see `tax-br`/`accounting-br` skills).

## Core Concepts
- **Leiaute (layout)**: each SPED obligation defines a structured file format — a specific set of blocks and registros (standardized records), each with defined fields, valid value domains, and inter-record consistency rules — published in the obligation's official manual (Manual de Orientação / Guia Prático) and periodically revised with a version number.
- **PVA (Programa Validador e Assinador)**: the official validator/signer application does not generate the bookkeeping data itself — it validates a file already produced by the taxpayer's own accounting/fiscal software against the current leiaute's structural and consistency rules, then digitally signs and transmits it. A rejection at the PVA stage means a structural/consistency problem, not necessarily a substantive accounting/tax error — though the two are often related (see below).
- **Common rejection pattern — plan-de-contas mapping mismatch**: a frequently-cited error category (illustrated by ECD/ECF's "J050"-type message pattern in this research) occurs when an account's declared natureza (nature) in the company's chart of accounts does not match the natureza expected by the reference account (conta referencial) it was mapped to in the Receita Federal's Plano Referencial — this is simultaneously a technical validation failure and a signal of a potential substantive chart-of-accounts mapping problem, worth checking against the `accounting-br` skill's `assets-liabilities-equity.md` classification framework.
- **Common rejection pattern — missing mandatory fields**: blank mandatory fields (e.g., CFOP, NCM, ICMS rate in an EFD-ICMS/IPI context) are a frequent, straightforward rejection cause — generally the easiest category to prevent through upstream data-completeness checks before transmission.
- **Common rejection pattern — cross-record inconsistency**: the same item/entity described differently across related records (e.g., a product registered in one master record but described inconsistently in transactional records referencing it) is flagged by the PVA and can be treated by Receita Federal as either a systemic data-quality problem or, in a worse case, a potential fraud indicator — this connects to `financial-fraud-risk` skill's anomaly-handling framework if the inconsistency pattern appears deliberate rather than incidental, though a SPED rejection alone should never itself support a fraud conclusion (see that skill's own reference).
- **Version currency discipline**: because leiaute versions are periodically revised (e.g., ECF's "Leiaute 12" for the 2026 cycle, per `ecf.md`), a filing prepared against an outdated leiaute's assumptions risks both unexpected rejections and a wasted preparation cycle — the discipline of confirming the currently-applicable leiaute version before preparation, not after a rejection, applies uniformly across every SPED obligation this skill covers.

## Decision Points
1. Is a specific rejection a structural/field-level problem (missing mandatory field, wrong value domain) or a consistency/mapping problem (chart-of-accounts natureza mismatch, cross-record inconsistency)? The remediation path differs.
2. For a chart-of-accounts mapping rejection, does the underlying issue reflect a genuine accounting classification question (route to `accounting-br` skill) or simply an incorrect reference-account selection in the mapping table?
3. Is the file being prepared against the currently-applicable leiaute version for the specific obligation, confirmed before preparation began?
4. Does a cross-record inconsistency pattern appear incidental (a data-entry error) or potentially deliberate (warranting escalation per `financial-fraud-risk` skill's anomaly-handling discipline, without itself concluding fraud)?
5. Has the specific obligation's own reference (`ecd.md`, `ecf.md`, `efd.md`, `reinf-dctfweb.md`) been checked for any obligation-specific validation nuance beyond this general framework?

## Required Facts
- The specific error/rejection message and which SPED obligation produced it.
- The currently-applicable leiaute version for that obligation. VERIFY_CURRENT_T1_SOURCE.
- Whether the rejection is isolated or part of a recurring pattern across filings.

## Required Evidence
- The PVA's specific rejection message/log.
- The chart-of-accounts mapping table, where a natureza-mismatch rejection is involved.
- The current Manual de Orientação / Guia Prático for the specific obligation and leiaute version.

## Exceptions
- Not every PVA warning is a hard rejection — some validation messages are advisory (allowing transmission with a noted inconsistency) rather than blocking; do not treat every validation message as requiring the same urgency without checking whether it is blocking or advisory.
- A cross-record inconsistency can have an entirely benign explanation (e.g., a legitimate mid-period product description update) — do not escalate every such pattern as a potential fraud indicator without first checking for an ordinary business explanation.

## Risk Considerations
- Treating every PVA rejection as purely technical, without checking whether it signals an underlying substantive accounting/tax classification problem, risks fixing the symptom (the validation error) while leaving the substantive issue unaddressed.
- Escalating an incidental cross-record inconsistency as a fraud indicator without first ruling out an ordinary explanation risks an unwarranted, reputationally costly accusation — see `financial-fraud-risk` skill's own reference on this exact risk.
- Preparing a filing against an outdated leiaute version wastes a full preparation cycle when the file is subsequently rejected for using superseded structural assumptions.

## Human Escalation Conditions
Escalate for human accounting/tax review whenever: a rejection's root cause is genuinely unclear after checking both structural and substantive possibilities; a chart-of-accounts mapping question requires an accounting-classification judgment; or a cross-record inconsistency pattern raises a genuine (not merely theoretical) fraud-indicator concern requiring the `financial-fraud-risk` skill's escalation path.

## Source IDs
`sped` (T1 — the general SPED validation architecture and PVA documentation), `receita` (T1 — current leiaute versions and Manuais de Orientação/Guias Práticos across obligations), `econet` (T3 — practical rejection-troubleshooting guidance; secondary only, never sole authority for a substantive classification conclusion).

## Freshness Requirements
Critical for leiaute-version-specific validation rules; standard for the general PVA mechanics and rejection-category taxonomy described here, which are structurally stable across leiaute revisions even as specific field/rule details change.

## Effective-Date Considerations
The general PVA/leiaute/rejection-category framework described here is a stable, long-standing SPED program design element; the specific current leiaute version and its exact validation rules for any given obligation are the volatile element and must be confirmed per-obligation (see `ecd.md`, `ecf.md`, `efd.md`, `reinf-dctfweb.md`) before a consequential preparation activity.

## Related References
- `ecd.md`, `ecf.md`, `efd.md`, `reinf-dctfweb.md` (this skill) — for obligation-specific leiaute versions and deadlines this general framework applies to.
- `accounting-br` skill's `assets-liabilities-equity.md` — for the substantive classification framework underlying chart-of-accounts mapping rejections.
- `financial-fraud-risk` skill — for the escalation path when a cross-record inconsistency raises a genuine fraud-indicator concern, with that skill's own discipline against premature accusation.
- `filing-calendar-manuals.md` (this skill) — for the broader manual-currency and filing-calendar discipline.

## Known Limitations
- Illustrates common rejection patterns using research-identified examples (e.g., the "J050"-type natureza-mismatch message) but does not catalog every possible rejection code across every SPED obligation — VERIFY_CURRENT_T1_SOURCE against the specific obligation's current manual for a comprehensive rejection-code reference.
- Does not resolve any specific rejection's root cause in the abstract — requires the actual error context and the specific obligation's current manual.
- Sourced from secondary summaries, not an independently re-fetched primary SPED manual, in this research pass.
