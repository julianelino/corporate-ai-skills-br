# Tax Reform, IBS, and CBS (Reforma Tributária — EC 132/2023 e LC 214/2025)

## Topics Covered
- IBS
- CBS
- tax reform transitions

## Purpose
Determine which phase of the consumption-tax reform transition governs a given operation's date, and which new/legacy taxes actually apply during that phase — this is the single most temporally volatile reference in this skill, since the reform is an active, multi-year, in-progress transition as of this reference's research (2026, the first test-rate year).

## When to Load
Load whenever a request involves IBS, CBS, the Imposto Seletivo, or any question about how the tax-reform transition affects the applicability of ICMS, ISS, PIS, Cofins, or IPI for a specific operation date — before applying any of this skill's other tax-specific references without checking their current-period applicability against this reform timeline.

## Scope
Covers Emenda Constitucional nº 132/2023 (the constitutional reform) and Lei Complementar nº 214/2025 (the infraconstitutional regulation of IBS, CBS, and the Imposto Seletivo). Does not cover the specific mechanics of the taxes IBS/CBS will eventually replace (see `icms.md`, `iss.md`, `pis-cofins.md`) beyond their coexistence/phase-out timeline, or IPI's evolving role (see `ipi.md`).

## Core Concepts
- **New taxes created**: IBS (Imposto sobre Bens e Serviços, state/municipal competence, replacing ICMS and ISS) and CBS (Contribuição sobre Bens e Serviços, federal competence, replacing PIS and Cofins), plus a new Imposto Seletivo (IS, federal, targeting specific goods/services deemed harmful to health or the environment) — together the core structure of the consumption-tax reform.
- **Dual-VAT design**: IBS and CBS are designed as a dual, destination-based, non-cumulative VAT-style system intended to replace the current fragmented multi-tax structure (ICMS's 27-state variation, ISS's thousands-of-municipalities variation, and the PIS/Cofins cumulative/non-cumulative split) with a more uniform base and credit mechanism — though IBS retains state/municipal revenue distribution even as its rules become more nationally uniform than legacy ICMS/ISS.
- **2026 — test-rate year**: per this research, 2026 (the current year as of this reference) is the transition's first phase, in which IBS and CBS are charged at reduced test rates (commonly cited as approximately 0.1% for IBS and 0.9% for CBS) that are creditable/compensable against PIS/Cofins owed in the same period — the purpose is system testing and calibration, not material additional net tax burden during this phase. VERIFY_CURRENT_T1_SOURCE for the exact current-year rate, since even the test-phase parameters are subject to regulatory refinement.
- **Multi-year transition through approximately 2033**: per the reform's general design (as legislated in EC 132/2023 and detailed in LC 214/2025), legacy taxes (ICMS, ISS, PIS, Cofins) and the new taxes (IBS, CBS) are expected to coexist through a phased transition, with legacy tax rates gradually reduced as IBS/CBS rates increase, until legacy taxes are fully extinguished around 2033 — VERIFY_CURRENT_T1_SOURCE for the specific year-by-year schedule applicable to any given future-period analysis, since transition schedules in multi-year reforms are subject to legislative adjustment as implementation proceeds.
- **Coexistence, not immediate replacement**: during the entire transition period, an operation is generally subject to both the legacy tax(es) (per `icms.md`, `iss.md`, `pis-cofins.md`) and the new IBS/CBS at that period's applicable test/transition rate — do not treat IBS/CBS's introduction as having already replaced the legacy taxes for any current-period (2026) operation; both regimes currently apply simultaneously, with the legacy-tax portion still the materially larger component in this early phase.

## Decision Points
1. What is the operation's date, and which reform-transition phase does that date fall within (test-rate 2026, or a later, not-yet-detailed phase)? VERIFY_CURRENT_T1_SOURCE for the phase parameters applicable to that specific date.
2. Does the operation require calculating IBS/CBS at the current test/transition rate in addition to the applicable legacy tax(es) (ICMS/ISS per `icms.md`/`iss.md`, PIS/Cofins per `pis-cofins.md`)?
3. Is the IBS/CBS amount for this operation compensable/creditable against the corresponding legacy tax owed in the same period, per the current-phase mechanism?
4. Does the product/service fall under the Imposto Seletivo's scope (goods/services deemed harmful to health or environment), triggering an additional, distinct tax alongside IBS/CBS?
5. Is the analysis being performed for a current-period (2026) operation, or does it involve a forward-looking projection into a later transition phase whose specific parameters have not yet been confirmed?

## Required Facts
- The operation's date, to place it within the correct transition phase.
- The product/service category, to assess Imposto Seletivo applicability.
- The current test/transition-phase IBS and CBS rates applicable to the operation date. VERIFY_CURRENT_T1_SOURCE.
- Whether the entity/operation qualifies for any transition-specific exemption or reduced-rate category already defined in LC 214/2025.

## Required Evidence
- The operation date and documentation supporting the legacy-tax calculation it must be layered with.
- Current official guidance on the applicable test/transition-phase rates for the specific period. VERIFY_CURRENT_T1_SOURCE.
- LC 214/2025's specific provisions for any claimed exemption, reduced rate, or special regime.

## Exceptions
- LC 214/2025 defines specific reduced-rate or exempt categories (commonly cited examples across similar VAT reforms include essential goods like certain foodstuffs, health, and education services) — do not assume a uniform IBS/CBS rate applies to every operation without checking whether the specific good/service falls into a differentiated category. VERIFY_CURRENT_T1_SOURCE for the current, complete list.
- Specific regimes (e.g., Simples Nacional, Zona Franca de Manaus) are expected to retain differentiated treatment under the reform design — verify current guidance for how each interacts with the new IBS/CBS framework rather than assuming the general-regime rules apply.

## Risk Considerations
- Treating IBS/CBS as having already replaced ICMS/ISS/PIS/Cofins for a current 2026 operation is a significant, currently-live risk given how new and actively-reported this transition is — the correct current treatment is coexistence with legacy taxes, not replacement.
- Using a rate or transition-schedule figure that predates a subsequent regulatory refinement (common during an active, multi-year implementation) risks a materially wrong calculation — this reference's specific figures should be treated as illustrative of the transition's structure, not as currently-binding numbers, given how recently (2025-2026) this framework was finalized and how actively it continues to be implemented.
- Failing to check Imposto Seletivo applicability for a specific product separately from the general IBS/CBS calculation risks omitting a distinct, additional tax liability.

## Human Escalation Conditions
Escalate for human tax review whenever: an operation's transition-phase treatment is unclear; a claimed reduced-rate/exempt category under LC 214/2025 is uncertain; Imposto Seletivo applicability is ambiguous; or the analysis involves a forward-looking period whose specific transition parameters have not yet been confirmed by current official guidance.

## Source IDs
`receita` (T1 — current IBS/CBS/IS rates, transition-phase guidance, and implementing regulations), `planalto` (T1 — EC 132/2023, LC 214/2025; not independently re-fetched due to the persistent planalto.gov.br connection failure documented across this repository's labor-law references), `sefaz` (T1 — state-level IBS implementation and coordination guidance), `econet` (T3 — practical transition-tracking guidance; secondary only, never sole authority).

## Freshness Requirements
Maximally critical of any reference in this repository's tax-br coverage — this is an actively-implementing, multi-year reform in its very first operative year (2026) as of this reference's research; treat every specific rate, threshold, and schedule figure here as subject to near-term regulatory refinement, and VERIFY_CURRENT_T1_SOURCE before any consequential calculation, without exception.

## Effective-Date Considerations
- **CURRENT (2026)**: test-rate phase — IBS and CBS charged at reduced, PIS/Cofins-compensable rates alongside full legacy-tax application (ICMS, ISS, PIS, Cofins, IPI all continue per their own references).
- **FUTURE (through approximately 2033, per current legislative design)**: a multi-year phased increase of IBS/CBS rates paired with a phased reduction of legacy-tax rates, until legacy taxes are fully extinguished — the exact year-by-year schedule requires VERIFY_CURRENT_T1_SOURCE for any period beyond the current 2026 test phase, since this reference's research did not confirm granular year-by-year figures beyond the general multi-year design.
- **SUPERSEDED (pre-EC 132/2023)**: no IBS/CBS/Imposto Seletivo existed; the legacy multi-tax structure (ICMS, ISS, PIS, Cofins, IPI) operated as the sole consumption-tax framework — a pre-2023 analysis should not reference IBS/CBS at all.

## Related References
- `icms.md`, `iss.md`, `pis-cofins.md`, `ipi.md` (this skill) — for the legacy taxes this reform will progressively replace, all of which remain independently applicable during the current transition and must be checked alongside this reference, not instead of it.

## Known Limitations
- Does not confirm the granular year-by-year rate/schedule for transition phases beyond 2026 — this reform's implementing regulations are being issued progressively, and later-phase specifics should be treated as VERIFY_CURRENT_T1_SOURCE rather than assumed from this reference's general multi-year framing.
- Does not enumerate LC 214/2025's complete reduced-rate/exempt category list — VERIFY_CURRENT_T1_SOURCE for the current, complete list before a consequential classification.
- Sourced from secondary summaries of EC 132/2023 and LC 214/2025, not an independently re-fetched primary text, in this research pass — given the reform's active, ongoing implementation, this reference should be re-verified more frequently than this skill's other, more structurally stable references.
