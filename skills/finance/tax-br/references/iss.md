# ISS (Imposto sobre Serviços de Qualquer Natureza)

## Topics Covered
- ISS

## Purpose
Determine whether a given service falls within the taxative national service list, which municipality has jurisdiction, and the range within which that municipality's specific rate must fall — before calculating or advising on an ISS liability. Like ICMS, ISS is fundamentally local (municipal) legislation layered on a federal general-rule law, and this reference cannot substitute for a specific municipality's own legislation.

## When to Load
Load whenever a request involves the provision of a service potentially subject to ISS — before determining whether the service is on the taxative list, which municipality has jurisdiction, or the applicable rate.

## Scope
Covers Lei Complementar nº 116/2003 — the federal law establishing the taxative national list of services subject to ISS, general jurisdiction rules, and the rate ceiling/floor. Does not cover any specific municipality's own ISS legislation/rate table (fundamentally `CORPORATE_CONTEXT_REQUIRED`/VERIFY_CURRENT_T1_SOURCE per service and municipality) or the tax-reform transition that will eventually fold ISS into IBS (see `tax-reform-ibs-cbs.md`).

## Core Concepts
- **Competência municipal**: ISS is a municipal (and Distrito Federal) tax — each municipality has its own ISS legislation (specific rate within the LC 116 range, procedural rules, specific exemptions) operating within LC 116/2003's federal framework; the same service can be taxed at different rates in different cities.
- **Lista taxativa (LC 116/2003 annex)**: the annexed list of services is taxative (numerus clausus, not merely illustrative) — a service not appearing on the list (in its ~40 groups/~200 items, subject to periodic legislative expansion) is not subject to ISS regardless of how service-like it may seem; conversely, presence on the list is generally necessary, not merely sufficient, for ISS applicability — check both the list match and any specific municipal implementation.
- **Rate ceiling and floor (Art. 8º, LC 116/2003)**: municipalities must set their specific ISS rate for each service within a statutory floor and ceiling range — commonly cited as a 2% floor and a 5% ceiling — VERIFY_CURRENT_T1_SOURCE before relying on these specific bounds for a consequential calculation, since the exact figures should be confirmed against the current LC 116 text.
- **Local do serviço vs. local do estabelecimento prestador**: the general rule assigns ISS to the municipality where the service provider is established, but LC 116/2003 sets numerous exceptions where the tax is instead due to the municipality where the service is actually performed (e.g., construction-related services, certain cleaning/security services) — this exception list is a frequent source of jurisdictional dispute between municipalities and should be checked per specific service item, not assumed to follow the general establishment-based rule.
- **Simples Nacional interaction**: for entities under the Simples Nacional regime, ISS is generally collected as part of the unified Simples payment (DAS) using the regime's own rate tables, rather than via a separate municipal ISS calculation — do not apply this reference's general LC 116 framework to a Simples Nacional entity's ISS without checking the Simples-specific rules first. `CORPORATE_CONTEXT_REQUIRED` for the entity's tax regime.

## Decision Points
1. Does the specific service appear on the LC 116/2003 taxative list (checking the current, potentially-expanded item list)? If not, ISS does not apply regardless of other factors.
2. Which municipality has jurisdiction — the general establishment-based rule, or one of LC 116's specific service-based exceptions? `CORPORATE_CONTEXT_REQUIRED`/VERIFY_CURRENT_T1_SOURCE for the specific service item and municipality.
3. What is that municipality's specific current rate for this service, within the statutory floor/ceiling range? VERIFY_CURRENT_T1_SOURCE — no single national rate exists.
4. Is the service provider under Simples Nacional, requiring the regime-specific unified calculation instead of the general LC 116 municipal-rate approach?
5. Does the service potentially also implicate a different tax entirely (e.g., a mixed goods-and-service operation raising an ICMS-vs-ISS boundary question)? Escalate rather than assuming ISS applies to the full transaction value.

## Required Facts
- The specific service performed, mapped to a specific LC 116 list item (or absence from the list).
- The service provider's establishment location and, where relevant, the location where the service was actually performed.
- The specific municipality's current rate for the identified service item. VERIFY_CURRENT_T1_SOURCE.
- The service provider's tax regime (general vs. Simples Nacional).

## Required Evidence
- Nota fiscal de serviço and contract documentation establishing the service's actual nature and location.
- The specific municipality's current ISS legislation for the identified service item.
- Confirmation of the provider's tax regime.

## Exceptions
- A transaction combining goods and services (e.g., a manufactured product installed as part of a service contract) can raise a genuine ICMS-vs-ISS boundary question depending on the specific list item and its treatment of materials — do not default to taxing the full value under either tax without checking the specific service item's own rules on materials.
- Some LC 116 list items carry specific exemptions or reduced treatment for particular circumstances (e.g., certain exported services) — verify against current municipal and federal guidance before assuming standard treatment applies.

## Risk Considerations
- Generalizing one municipality's ISS rate or exemption to another municipality's identical-seeming service is a common, high-risk error given ISS's fundamentally local, non-uniform legislative structure.
- Applying the general establishment-based jurisdiction rule to a service that actually falls under one of LC 116's specific location-of-performance exceptions produces a wrong-municipality ISS liability, risking double taxation or non-compliance in either or both municipalities.
- Treating the LC 116 list as illustrative rather than taxative risks either incorrectly taxing a genuinely non-listed service or incorrectly exempting a service that does match a list item under a less-than-obvious classification.

## Human Escalation Conditions
Escalate for human tax review whenever: a service's LC 116 list classification is genuinely ambiguous; jurisdiction (establishment vs. performance location) is disputed between municipalities; a mixed goods/services transaction raises an ICMS-vs-ISS boundary question; or the specific municipal rate cannot be confirmed against a current source.

## Source IDs
`municipal-tax` (T1 — specific municipality's ISS legislation, rate, and list-item implementation — the primary source for any specific-municipality question this reference itself cannot resolve), `planalto` (T1 — LC 116/2003; not independently re-fetched due to the persistent planalto.gov.br connection failure documented across this repository's labor-law references), `receita` (T1 — Simples Nacional's unified ISS treatment specifics), `econet` (T3 — practical multi-municipality comparison guidance; secondary only).

## Freshness Requirements
Critical, and inherently municipality-specific — this reference's federal-framework content (list, floor/ceiling, general jurisdiction rule) is comparatively stable, but any specific municipal rate requires VERIFY_CURRENT_T1_SOURCE against the specific municipality for every consequential calculation.

## Effective-Date Considerations
- **CURRENT**: LC 116/2003's taxative list and jurisdiction framework, as periodically amended to add new list items (e.g., subsequent legislation has expanded the list over time to cover newer service categories) — VERIFY_CURRENT_T1_SOURCE for whether a specific modern service type has been added to the list since this reference's research.
- **CURRENT (2026, transition phase)**: ISS continues to apply under LC 116/2003 while IBS is simultaneously charged at 2026 test rates (see `tax-reform-ibs-cbs.md`) — coexistence, not yet replacement.
- **FUTURE**: ISS is expected to be extinguished and folded into IBS as the multi-year reform transition completes — VERIFY_CURRENT_T1_SOURCE for the exact current milestone before assuming ISS no longer applies to any specific future-period service.

## Related References
- `tax-reform-ibs-cbs.md` (this skill) — for the IBS transition currently underway and ISS's eventual replacement.
- `icms.md` (this skill) — for the boundary question between goods-circulation (ICMS) and service-provision (ISS) taxation on mixed transactions.

## Known Limitations
- Deliberately does not embed any specific municipality's rate table or list-item interpretation — ISS's fundamentally local, thousands-of-municipalities structure makes any such table certain to be incomplete or stale; always VERIFY_CURRENT_T1_SOURCE against the specific `municipal-tax` authority.
- Does not resolve the specific location-of-performance exception list item-by-item — this requires checking the current LC 116 text for the specific service in question.
- Sourced from secondary summaries of LC 116/2003, not an independently re-fetched primary text, in this research pass.
