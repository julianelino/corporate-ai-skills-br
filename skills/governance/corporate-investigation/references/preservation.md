# Preservation

## Topics Covered
- preservation

## Purpose
Establish the methodology for preserving evidence relevant to an investigation — chain-of-custody discipline and LGPD-compliant personal-data handling — before evidence can be lost, altered, or rendered inadmissible through improper handling.

## When to Load
Load whenever a request involves identifying or executing evidence preservation for an ongoing or anticipated investigation — before any collection, review, or handling of potentially relevant records/devices/communications.

## Scope
Covers preservation methodology: chain-of-custody discipline and the LGPD (Lei Geral de Proteção de Dados) considerations specific to preserving personal data during a corporate investigation. Does not cover the interview process (see `interviews.md`) or how preserved evidence is subsequently evaluated toward findings (see `findings.md`, `evidence.md`).

## Core Concepts
- **Preservation is time-sensitive and should be immediate**: once an investigation is opened (or reasonably anticipated), relevant records (messages, logs, documents, access records, devices) should be preserved promptly, before routine deletion/rotation policies, awareness of the investigation, or simple operational activity destroys them — this is a first-priority step, not something to defer until later in the process.
- **Cadeia de custódia (chain of custody)**: Brazilian criminal-procedure law (Lei 13.964/2019, per this research) codifies a ten-step chain-of-custody framework — reconhecimento (recognition), isolamento (isolation), fixação (fixation/documentation), coleta (collection), acondicionamento (packaging), transporte (transport), recebimento (receipt), processamento (processing), armazenamento (storage), and descarte (disposal) — while this framework is a criminal-procedure standard, its underlying logic (an unbroken, documented record of who handled evidence, when, and how, from collection to use) is the recognized best-practice standard corporate investigations should apply to preserve evidentiary integrity and admissibility, particularly for digital evidence. Evidence collected without this discipline risks being effectively unusable later, since its integrity cannot be demonstrated.
- **Digital evidence's specific fragility**: digital evidence (emails, chat logs, system access records) is particularly vulnerable to both accidental loss (routine retention/deletion cycles) and to challenge on authenticity grounds if not properly preserved with metadata, hash values, or equivalent integrity markers intact — treat digital preservation with at least the same rigor as physical evidence, not less merely because it "always exists somewhere."
- **LGPD and personal data in investigation evidence**: much investigation-relevant evidence involves personal data (employee communications, access logs tied to individuals) requiring a valid legal basis under the LGPD — per this research, Art. 7º, IX (legítimo interesse / legitimate interest) is a commonly-cited basis for investigation-related personal-data processing, but this requires a documented, proportionate legitimate-interest assessment, not an assumption that any investigation automatically justifies unlimited data collection. `CORPORATE_CONTEXT_REQUIRED`/VERIFY_CURRENT_T1_SOURCE for the entity's specific documented legal-basis assessment.
- **Personal-device and personal-communication limits**: a company generally cannot simply confiscate or access an employee's personal device or private communications without consent or a valid legal order, even where the device is also used for work — this is a recognized tension point between investigative need and employee privacy/labor-law protections, requiring careful, case-specific legal evaluation rather than a default assumption of company access.

## Decision Points
1. Has a preservation notice/hold been issued for all reasonably relevant records (communications, logs, documents), promptly upon the investigation opening or being reasonably anticipated?
2. Is the chain-of-custody discipline (recognition, isolation, documentation, collection, packaging, transport, receipt, processing, storage, disposal) being applied to physical and digital evidence alike, with each step documented?
3. Has a documented legal basis (e.g., legítimo interesse under LGPD Art. 7º, IX) been established for the personal data being preserved/processed, proportionate to the investigation's actual scope?
4. Does any evidence sought reside on a personal device or in a private communication channel, requiring specific consent or legal-order analysis before access — rather than an assumed right to collect it?
5. Is the preservation scope proportionate to the defined allegation scope (per `allegation.md`), or does it risk over-collecting data beyond what the investigation actually requires?

## Required Facts
- The specific records/systems/devices identified as relevant, and the preservation-hold status for each.
- The chain-of-custody documentation for each piece of evidence collected.
- The LGPD legal-basis assessment for personal data being preserved.
- Whether any sought evidence resides on a personal device/private channel requiring specific analysis.

## Required Evidence
- The preservation-hold notice and its issuance date/scope.
- Chain-of-custody logs for each evidence item.
- The documented LGPD legal-basis assessment. `CORPORATE_CONTEXT_REQUIRED`.
- Any consent or legal-order documentation for personal-device/private-channel access.

## Exceptions
- Publicly-available or company-system information (a company email account, a company-issued device's business-use data) generally carries a lower privacy-expectation bar than personal devices/accounts — but this distinction itself should be confirmed against current LGPD/labor-law guidance for the specific data type, not assumed categorically.
- An emergency preservation action (e.g., immediately isolating a system suspected of active compromise) may need to precede full LGPD legal-basis documentation — but the documentation should be completed promptly after, not indefinitely deferred.

## Risk Considerations
- Delaying preservation risks the underlying evidence being altered or destroyed (deliberately or through routine processes) before it can be collected — this is often the single most consequential and irreversible failure point in an investigation.
- Collecting or processing personal data without a documented, proportionate legal basis risks both an LGPD compliance violation and, separately, undermining the investigation's own credibility if challenged.
- Breaking chain-of-custody discipline (undocumented handling, gaps in the record) risks the evidence being effectively unusable even if its content is accurate, since its integrity cannot be demonstrated.

## Human Escalation Conditions
Escalate for human legal/privacy review whenever: evidence resides on a personal device or private communication channel; the LGPD legal-basis assessment for a specific collection is unclear; a chain-of-custody gap is identified in evidence already collected; or the preservation scope's proportionality to the actual allegation is in question.

## Source IDs
`planalto` (T1 — Lei 13.964/2019's chain-of-custody framework and LGPD Art. 7º, IX; not independently re-fetched due to the persistent planalto.gov.br connection failure documented across this repository's labor-law references), corporate policy (Corporate Source — the approved data-retention, privacy, and investigation-preservation policies; `CORPORATE_CONTEXT_REQUIRED`).

## Freshness Requirements
Critical. LGPD interpretive guidance on investigation-related legitimate-interest processing continues to develop; VERIFY_CURRENT_T1_SOURCE before a consequential personal-data-preservation decision, especially involving personal devices or sensitive data categories.

## Effective-Date Considerations
The chain-of-custody framework (Lei 13.964/2019) and the LGPD's legitimate-interest basis are both stable, current legal frameworks as researched; specific interpretive guidance on how they apply to corporate-investigation contexts specifically continues to develop through case law and regulatory guidance (ANPD) — treat the general framework as CURRENT and stable, but confirm current interpretive guidance for a novel or high-stakes application.

## Related References
- `allegation.md` (this skill) — for the scope-definition step that should bound preservation's actual reach.
- `evidence.md` (this skill) — for how preserved material is subsequently evaluated.
- `hr-privacy-lgpd` skill — for the broader LGPD framework this reference's personal-data considerations connect to.
- `corporate-compliance` skill's `conduct-policy-control.md` — for the general policy-authority discipline this reference operates within.

## Known Limitations
- Does not resolve the specific LGPD legal-basis documentation requirements exhaustively — see the `hr-privacy-lgpd` skill for the fuller privacy framework, and escalate for legal review on a specific collection's basis.
- Does not resolve personal-device access questions definitively — these require case-specific legal analysis given the recognized tension between investigative need and employee privacy/labor-law protections.
- Sourced from secondary summaries, not an independently re-fetched primary text of Lei 13.964/2019 or LGPD, in this research pass.
