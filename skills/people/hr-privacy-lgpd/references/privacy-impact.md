# Privacy Impact

## Topics Covered
- privacy-impact

## Purpose
Determine whether a specific HR data-handling scenario (retention, sharing, a proposed new use of data, or a security incident) creates a privacy-impact concern requiring assessment or breach-notification action — before advising on retention duration, cross-context data sharing, or responding to a suspected incident.

## When to Load
Load whenever a request involves assessing the privacy impact of an HR data-retention decision, a proposed data-sharing arrangement, or a suspected/confirmed security incident involving employee personal data — before recommending a retention period, a sharing arrangement, or an incident response.

## Scope
Covers LGPD-based privacy-impact assessment and incident-response methodology for HR data. Does not cover the access-authorization/legal-basis analysis for a specific access request (see `hr-data-access.md`, the companion reference this one builds on) or the substantive employment-law consequences of the underlying HR matter.

## Core Concepts
- **Retention tied to purpose, not indefinite convenience**: LGPD's necessity/purpose-limitation principle requires that personal data be retained only as long as necessary for the purpose it was collected for (or a subsequent compatible purpose, or a specific legal retention obligation, e.g., labor/tax record-keeping requirements) — an indefinite retention policy ("keep everything forever, just in case") is itself a privacy-impact concern independent of any specific incident, since it expands the population of data at risk without a corresponding necessity.
- **Sharing/transfer as a distinct privacy-impact trigger**: sharing HR data with a third party (a vendor, an affiliate, a government authority) or across an internal purpose boundary (e.g., data collected for payroll being repurposed for a performance-management analytics tool) each requires its own legal-basis and necessity check — a valid basis for the original collection does not automatically extend to a new sharing context or purpose.
- **Incident classification — risk or relevant harm to the data subject**: per LGPD Art. 48, a security incident triggers a mandatory communication obligation specifically when it "may create risk or relevant harm to data subjects" — not every technical security event automatically requires notification, but the threshold assessment (does this incident create that risk) should be made deliberately and documented, not assumed away to avoid the notification burden.
- **Notification deadlines — ANPD and the data subject**: per Resolução CD/ANPD nº 15/2024 (Regulamento de Comunicação de Incidente de Segurança, as researched), the controller must communicate a qualifying incident to ANPD and to affected data subjects within 3 business days of the controller becoming aware the incident affected personal data — extendable to 6 business days for a small-sized processing agent (pequeno porte) — with the ability to supplement the communication with further-substantiated information within 20 business days of the initial communication. VERIFY_CURRENT_T1_SOURCE for whether this specific deadline framework remains current, given ANPD's active regulatory role.
- **Awareness triggers the clock, not confirmation of full scope**: the notification deadline runs from when the controller becomes aware the incident affected personal data — not from when the full scope/impact is completely understood; treat "we don't yet know the full extent" as a reason to notify with the information available (supplementing later, per the 20-business-day allowance) rather than a reason to delay the initial notification past its deadline.

## Decision Points
1. Is the current or proposed retention period tied to an actual, current, documented purpose or legal obligation, or does it reflect indefinite/undocumented retention? `CORPORATE_CONTEXT_REQUIRED`.
2. Does a proposed data-sharing arrangement (new recipient, new purpose) have its own, independently-assessed legal basis, distinct from the basis for the original collection?
3. For a suspected/confirmed incident: does it create risk or relevant harm to data subjects, triggering the Art. 48 notification obligation — assessed deliberately, not assumed away?
4. If notification is required, has the 3-business-day (or 6, for a small processing agent) clock been correctly calculated from the moment of awareness, not from full-scope confirmation?
5. Has the entity's accountable privacy owner/encarregado (DPO) been engaged for the assessment, consistent with this skill's own routing to that accountable role?

## Required Facts
- The specific retention period in question and its tied purpose/legal obligation.
- The specific sharing arrangement (recipient, purpose, data categories) and its independent legal-basis assessment.
- For an incident: the nature of the data affected, the number of data subjects potentially affected, and the date of the controller's awareness.
- The entity's processing-agent size classification, relevant to the 3-vs-6-business-day distinction.

## Required Evidence
- The documented retention schedule/policy and its purpose linkage. `CORPORATE_CONTEXT_REQUIRED`.
- The proposed sharing arrangement's documentation and its specific legal basis.
- Incident-detection records establishing the awareness date, for deadline calculation.
- Any communication already sent to ANPD/data subjects, for compliance verification.

## Exceptions
- A retention period mandated by a separate legal obligation (e.g., labor/tax record-keeping requirements under other statutes) can justify retention beyond the immediate HR purpose — but this should be tied to the specific overriding legal obligation, not treated as blanket justification for retaining unrelated data categories indefinitely.
- Not every security event rises to the Art. 48 notification threshold — an incident with no realistic risk or relevant harm to data subjects (e.g., an internal access anomaly promptly contained with no data actually exposed) may not require notification, but this determination should be documented and reasoned, not assumed by default in either direction.

## Risk Considerations
- Indefinite or undocumented retention expands privacy-impact exposure independent of any specific incident and is itself a compliance gap worth flagging proactively, not only reactively after an incident occurs.
- Extending an original collection's legal basis to a new sharing context or purpose without independent assessment is a common, consequential LGPD compliance gap.
- Delaying incident notification past the 3-business-day (or 6-day) deadline while waiting for full scope confirmation, rather than notifying with available information and supplementing later, risks a distinct compliance failure on top of the underlying incident itself.

## Human Escalation Conditions
Escalate for human privacy/legal review (the accountable privacy owner) whenever: a retention period lacks clear purpose/legal-obligation linkage; a proposed sharing arrangement's legal basis is unclear; a suspected incident's risk/relevant-harm threshold assessment is uncertain; or a notification deadline is approaching and the required communication has not yet been prepared.

## Source IDs
`planalto` (T1 — Lei 13.709/2018 Art. 48; not independently re-fetched due to the persistent planalto.gov.br connection failure documented across this repository's labor-law references), ANPD (T1 — Resolução CD/ANPD nº 15/2024, Regulamento de Comunicação de Incidente de Segurança; not currently a registered `sources/SOURCE_REGISTRY.yaml` T1 entry — this is itself a gap worth flagging for future source-registry curation, distinct from this reference's own content), `stf` (T1 — constitutional/jurisprudential context, not independently checked for this reference).

## Freshness Requirements
Critical. The incident-notification deadline framework (Resolução CD/ANPD nº 15/2024, as researched) reflects active ANPD regulatory activity; VERIFY_CURRENT_T1_SOURCE for the current deadline framework before relying on a specific timeline in a consequential incident-response decision.

## Effective-Date Considerations
- **CURRENT (per Resolução CD/ANPD nº 15/2024, as researched)**: the 3-business-day (6 for small processing agents) notification deadline, with a 20-business-day supplementation allowance.
- LGPD's core Art. 48 notification obligation (2018) is stable; the specific procedural deadlines have been progressively regulated by ANPD (culminating, per this research, in the 2024 resolution) — an analysis relying on an earlier, less-specific understanding of Art. 48's timing (before ANPD's specific regulation) should be updated to reflect the current regulated deadlines.

## Related References
- `hr-data-access.md` (this skill) — for the legal-basis/necessity analysis this reference's retention and sharing assessments build on.
- `corporate-investigation` skill's `preservation.md` — for the LGPD legitimate-interest basis and evidence-handling considerations relevant where an incident investigation is also underway.
- `corporate-compliance` skill's `retaliation.md` — for the whistleblowing-channel protection considerations relevant if an incident was reported through such a channel.

## Known Limitations
- Does not confirm whether Resolução CD/ANPD nº 15/2024 remains the current, unamended regulation — VERIFY_CURRENT_T1_SOURCE, given ANPD's active regulatory role.
- Does not specify the entity's actual retention schedule, sharing arrangements, or processing-agent size classification — `CORPORATE_CONTEXT_REQUIRED`.
- No `sources/SOURCE_REGISTRY.yaml` T1 entry currently exists for ANPD specifically — flagged here as a gap, not papered over; sourced from secondary summaries, not an independently re-fetched primary text, in this research pass.
