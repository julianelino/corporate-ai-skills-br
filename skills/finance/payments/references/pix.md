# PIX

## Topics Covered
- PIX

## Purpose
Establish PIX-specific preparation and validation concerns — chave/DICT resolution, irrevocability, and the MED fraud-reversal mechanism's actual scope and limits — before preparing (never approving or executing) a PIX payment. As with every reference in this skill, PREPARE != APPROVE: this reference supports analysis and validation, never a decision to release funds.

## When to Load
Load whenever a request involves preparing, validating, or reviewing a PIX payment or a PIX-related fraud/dispute scenario — before recommending a PIX payment be prepared for approval, or before assessing a PIX-fraud report.

## Scope
Covers Pix's instant-settlement architecture, DICT (Diretório de Identificações de Contas Transacionais) key resolution, and the MED (Mecanismo Especial de Devolução) fraud-reversal mechanism administered by Banco Central. Does not cover the general vendor-payment/bank-detail-change control framework this reference depends on for fraud prevention (see `vendor-payments-controls.md`) or other payment rails (see `ted-boleto.md`).

## Core Concepts
- **Instant and generally irrevocable**: Pix settles in real time (seconds), and once completed, a Pix transfer is not simply reversible by the sending party's request — unlike a check or some other instruments, there is no ordinary "recall" mechanism; the only path to reversal is the specific MED fraud/error process described below, or the receiving party's voluntary return.
- **DICT and chave Pix**: a chave Pix (CPF/CNPJ, email, phone, or random key) resolves via DICT to the actual receiving account's ownership data — before a payment is prepared, the resolved DICT ownership name/document should be checked against the expected payee, since a chave alone does not guarantee the receiving account belongs to the intended vendor; a mismatch between the resolved DICT name and the expected payee is a hard stop requiring escalation, not a detail to note and proceed past.
- **MED (Mecanismo Especial de Devolução)**: a Banco Central-administered mechanism allowing the receiving institution to place a cautelar (precautionary) block on funds and, if the fraud/error is confirmed, return them (fully or partially, depending on available balance) — per Resolução BCB nº 493 (2025, per this research), the block must occur immediately upon infraction notification, fund-tracing can extend up to 11 additional days post-contestation, and the concept of qualifying fraud now explicitly includes social-engineering scams (golpes), not only technical account compromise.
- **MED's real limits**: MED does not cover every "wrong payment" scenario — per this research, it explicitly does not apply to typing errors (erro de digitação) by the payer, commercial disagreement (desacordo comercial), buyer's remorse (arrependimento da compra), or a voluntary send to the wrong person absent fraud — do not represent MED as a general safety net covering any payment mistake; it is specifically a fraud/operational-failure remedy, not a universal undo button.
- **Prevention outweighs remedy**: because Pix is fast and MED's scope is narrower than commonly assumed, the primary control point is pre-payment validation (DICT name match, independent confirmation of any bank-detail change per `vendor-payments-controls.md`) rather than reliance on post-payment reversal.

## Decision Points
1. Has the chave Pix been resolved via DICT, and does the resolved account-holder name/document match the expected payee exactly? Any mismatch is a hard stop.
2. Is this payment tied to a recently-changed or newly-registered payee/bank detail? If so, has the independent-channel confirmation required by `vendor-payments-controls.md` been completed before this Pix is prepared?
3. If a Pix has already been sent and fraud/error is suspected, does the scenario actually fall within MED's scope (fraud, including social-engineering scams, or PSP operational failure), or is it a typing error/commercial disagreement/remorse scenario MED does not cover?
4. If MED applies, has the infraction been reported immediately, given the block must occur immediately upon notification?

## Required Facts
- The chave Pix used and its DICT-resolved account-holder identity.
- Whether the payee/bank detail is newly registered or recently changed.
- For a suspected-fraud scenario: the nature of the fraud (technical compromise vs. social-engineering scam vs. simple error) — this determines MED eligibility.

## Required Evidence
- DICT resolution output showing the account-holder name/document matched against the expected payee.
- Independent-channel confirmation record for any new/changed bank detail (see `vendor-payments-controls.md`).
- For a MED request: documentation of the fraud/error and the timing of the report relative to the transaction.

## Exceptions
- A DICT name that is a close but imperfect match (e.g., an abbreviated legal name, a DBA vs. registered name) is not automatically a mismatch, but should not be waved through either — verify against the vendor master record before proceeding. `CORPORATE_CONTEXT_REQUIRED`.
- MED's scope has been described by this research as recently expanded (2025) to explicitly include social-engineering scams — VERIFY_CURRENT_T1_SOURCE for whether a specific scenario currently qualifies, since this is an area of recent and ongoing regulatory refinement.

## Risk Considerations
- Skipping DICT-name verification because "the chave was provided by the vendor" treats an unverified input as verified — the chave itself proves nothing about who actually controls the receiving account.
- Assuming MED will reverse any mistaken Pix, and therefore relaxing pre-payment validation discipline, is a dangerous misunderstanding of MED's actual, narrower scope.
- Delaying a fraud report reduces MED's effectiveness given the immediate-block requirement — time is a critical factor in fraud recovery, not a formality.

## Human Escalation Conditions
Escalate for human review whenever: a DICT resolution does not match the expected payee; a payment is tied to a recently-changed bank detail without completed independent confirmation; or a suspected-fraud scenario requires a MED report decision.

## Source IDs
`bacen` (T1 — Pix regulatory framework, DICT operational manual, MED mechanics and current resolution — e.g., Resolução BCB nº 493/2025 per this research), `cvm` (T1 — not directly Pix-specific but relevant to broader payment-instrument regulatory context where applicable).

## Freshness Requirements
Critical. Pix's antifraude framework (including MED's scope and timing rules) has been under active, recent regulatory revision (per this research, a 2025 resolution and associated manual updates); VERIFY_CURRENT_T1_SOURCE before relying on this reference's specific MED scope/timing description for a consequential fraud-response decision.

## Effective-Date Considerations
- **CURRENT (per Resolução BCB nº 493, 2025, and associated DICT/Tempos manual updates per this research)**: immediate cautelar block upon infraction notification, extended fund-tracing window (up to 11 additional days), partial/multiple returns, PSP-operational-failure coverage, and explicit inclusion of social-engineering scams within the fraud concept.
- VERIFY_CURRENT_T1_SOURCE for whether any further MED/antifraude revision has occurred since this research, given the demonstrated pace of regulatory change in this specific area.

## Related References
- `vendor-payments-controls.md` (this skill) — for the independent-channel bank-detail-change confirmation this reference depends on as its primary fraud-prevention control.
- `ted-boleto.md`, `batch-cnab.md` (this skill) — for other payment rails with materially different reversal characteristics than Pix's near-irrevocability.

## Known Limitations
- Does not state MED's complete current eligibility criteria exhaustively — VERIFY_CURRENT_T1_SOURCE for a specific scenario's qualification, especially given the area's recent and ongoing regulatory evolution.
- Sourced from secondary summaries of `bacen` regulatory content, not an independently re-fetched primary resolution text, in this research pass.
- Does not cover Pix Automático, Pix Parcelado, or other more recent Pix product variants in detail — this reference focuses on the core instant-transfer mechanism and its fraud-response framework.
