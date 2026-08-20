# Filing Calendar and Technical Manuals (Calendário de Obrigações e Manuais Técnicos)

## Topics Covered
- filing calendar
- technical manuals

## Purpose
Establish the discipline for tracking each SPED obligation's current deadline and current governing manual — since both are independently volatile across ECD, ECF, EFD variants, and Reinf/DCTFWeb, and neither should be assumed stable from a prior period.

## When to Load
Load whenever a request involves assembling or confirming a filing calendar across multiple SPED obligations, or confirming which manual version currently governs a specific obligation — before committing to a compliance timeline or preparation approach that spans more than one obligation.

## Scope
Covers the cross-obligation discipline for deadline-tracking and manual-currency verification. Does not restate any single obligation's specific current deadline or manual version (see `ecd.md`, `ecf.md`, `efd.md`, `reinf-dctfweb.md` for obligation-specific content) or the validation mechanics those manuals govern (see `layouts-validation.md`).

## Core Concepts
- **Each obligation has its own independent deadline cycle**: ECD (commonly last business day of June, following-year), ECF (commonly last business day of July, following-year), EFD-ICMS/IPI (commonly the 20th of the following month), EFD-Reinf/DCTFWeb (commonly around the 15th of the following month for periodic filings, with DCTFWeb itself commonly by the last business day of the following month) — these are structurally different cycles (annual vs. monthly) with different reference points, and none should be assumed to move in lockstep with another. VERIFY_CURRENT_T1_SOURCE for every specific date before building or relying on a consolidated calendar.
- **A consolidated filing calendar is a derived artifact, not a source of truth**: any internally-maintained "SPED calendar" document is only as current as its last verification against each obligation's actual current rule — treat a consolidated calendar as a convenience view requiring periodic re-validation against primary sources, never as authoritative in its own right.
- **Each obligation has its own manual, versioned independently**: ECD and ECF each have their own Manual de Orientação (with independent leiaute version numbers, e.g., ECF's "Leiaute 12" for 2026 per `ecf.md`); EFD-ICMS/IPI has its own Guia Prático (with its own version history, e.g., versions referenced in this research such as 3.0.6 and later 6.x/7.x); EFD-Reinf and DCTFWeb have their own respective manuals — confirming one obligation's manual is current says nothing about whether another obligation's manual has also been recently revised.
- **Dependency-aware sequencing**: because ECF depends on ECD (see `ecf.md`), and DCTFWeb depends on eSocial + EFD-Reinf + MIT (see `reinf-dctfweb.md`), a filing calendar should reflect these dependencies explicitly — sequencing preparation so upstream obligations are validated and finalized before downstream obligations that consume their data are attempted, rather than treating all obligations as independent, parallel deadlines.
- **Ad hoc extensions/adjustments happen**: Receita Federal and state/municipal authorities have, at various points, granted specific-year deadline extensions for specific obligations — a calendar built purely from the "standard" recurring rule (e.g., "always the last business day of June") can be wrong for a specific year if an extension or adjustment was granted; VERIFY_CURRENT_T1_SOURCE close to the actual filing window, not only when the calendar was first assembled.

## Decision Points
1. When assembling a multi-obligation filing calendar, has each obligation's specific current deadline been independently confirmed, rather than inferred from a "typical" pattern or a prior year's date?
2. Does the calendar reflect known dependencies (ECD before ECF; eSocial/Reinf/MIT before DCTFWeb), sequencing preparation accordingly?
3. For each obligation, has the currently-applicable manual/leiaute version been confirmed, separately from confirming the deadline itself?
4. Is there a known or plausible ad hoc extension for the specific year/period in question that would change a "standard-rule" date?
5. How recently was the calendar last validated against primary sources — is a re-check due given how close the actual filing window is?

## Required Facts
- The full set of SPED obligations applicable to the specific entity (which depends on its regime — see `ecd.md`, `ecf.md`, `efd.md` for obligation-specific applicability tests).
- Each applicable obligation's current deadline and current manual version. VERIFY_CURRENT_T1_SOURCE for every one, independently.
- Known dependencies between the entity's applicable obligations.

## Required Evidence
- Current official deadline publications for each applicable obligation (Receita Federal, `sefaz`, `municipal-tax`, `esocial` as relevant).
- Current manual/Guia Prático/Manual de Orientação version references for each applicable obligation.
- Any specific-year extension or adjustment announcement relevant to the period in question.

## Exceptions
- Not every entity is subject to every SPED obligation this skill covers — a filing calendar should only include obligations the specific entity actually needs to file, per each obligation's own applicability test (see the respective references) — do not build a calendar assuming universal applicability.
- A calendar built for one calendar/fiscal year should not be assumed valid for the next year without re-confirmation, even where no specific change is anticipated — deadlines and manual versions are independently revised year to year, not on a fixed multi-year cycle.

## Risk Considerations
- Building a consolidated calendar once and treating it as permanently authoritative, without periodic re-validation, risks relying on a stale date or manual version by the time the actual filing window arrives.
- Ignoring dependency sequencing (e.g., attempting ECF preparation before ECD is finalized) risks wasted preparation effort and downstream rejections.
- Assuming a "standard rule" date applies in a specific year without checking for an ad hoc extension risks either an unnecessarily rushed filing (if an extension was actually granted) or, more dangerously, a missed deadline (if the standard date moved earlier for some other reason).

## Human Escalation Conditions
Escalate for human accounting/tax review whenever: the entity's complete set of applicable SPED obligations is uncertain; a specific-year extension's existence or scope is unclear; or a dependency-sequencing conflict (e.g., insufficient time between ECD and ECF deadlines given remediation needs) threatens on-time compliance.

## Source IDs
`sped` (T1 — the SPED program's overall calendar coordination and manual repository), `receita` (T1 — federal obligation deadlines and any announced extensions), `sefaz`/`municipal-tax` (T1 — state/municipal obligation deadlines where relevant), `esocial` (T1 — eSocial-linked deadline coordination for DCTFWeb-adjacent obligations), `econet` (T3 — practical consolidated-calendar tracking guidance; secondary only, never sole authority for a specific deadline).

## Freshness Requirements
Critical, and requiring re-verification on a rolling basis — not a one-time check — since this reference's entire purpose is to guard against relying on a stale consolidated view of multiple independently-changing obligations.

## Effective-Date Considerations
The cross-obligation dependency structure described here (ECD→ECF; eSocial+Reinf+MIT→DCTFWeb) is a stable structural feature of the SPED ecosystem; the specific dates and manual versions populating any calendar built on this structure are inherently time-bound to a specific fiscal/calendar year and must be re-derived, not carried forward, for each new cycle.

## Related References
- `ecd.md`, `ecf.md`, `efd.md`, `reinf-dctfweb.md` (this skill) — for each obligation's specific current deadline and manual-version content this reference's discipline applies to.
- `layouts-validation.md` (this skill) — for the validation mechanics governed by the manuals this reference addresses.

## Known Limitations
- Does not itself supply a consolidated, current-dated filing calendar — deliberately, since any such calendar would go stale and risk being relied on past its validity; always VERIFY_CURRENT_T1_SOURCE against each obligation's own current source.
- Does not track state/municipal-specific deadline variations for EFD-ICMS/IPI or ISS-adjacent obligations beyond noting their existence — see `efd.md` and the `tax-br` skill's `iss.md`.
- Sourced from secondary summaries, not an independently re-fetched primary SPED calendar publication, in this research pass.
