# Labor Litigation (Reclamação Trabalhista)

## Topics Covered
- labor-litigation

## Purpose
Determine whether a labor claim is time-barred, who bears the burden of proof on a disputed fact, and what financial exposure (including attorney's fees) a company faces once a labor dispute is filed or threatened — before advising on litigation strategy, settlement, or evidence preservation.

## When to Load
Load whenever a request involves an actual or threatened reclamação trabalhista (labor claim), a question about prescription/time limits on a labor claim, burden-of-proof allocation in a labor dispute, or the fee exposure of litigating vs. settling — before recommending a litigation or settlement posture.

## Scope
Covers CF Art. 7º, XXIX (prescrição), CLT Art. 818 and CPC Art. 373 (ônus da prova), and CLT Art. 791-A (honorários advocatícios sucumbenciais, introduced by Lei nº 13.467/2017). Does not cover the substantive merits of a specific claim type (see `termination.md`, `discipline.md`, `working-time.md`, `collective-bargaining.md` for the underlying substantive rules) or formal internal-investigation evidence handling (see the `corporate-investigation` skill).

## Core Concepts
- **Prescrição quinquenal e bienal (CF Art. 7º, XXIX)**: a worker may claim labor credits going back up to 5 years from the date of the claim (quinquenal), but only within 2 years of the contract's termination (bienal) — after 2 years post-termination, the right to sue at all is extinguished, regardless of how old the underlying credit is. Both limits apply together; the 2-year rule does not apply while the contract is still active.
- **Ônus da prova (CLT Art. 818, CPC Art. 373, applied subsidiarily)**: the general rule allocates the burden to whoever asserts the fact — the employee must prove the constitutive facts of the claimed right, and the employer must prove any fact it raises to impede, modify, or extinguish that right. Specific doctrinal and statutory inversions exist for particular claim types (e.g., overtime records, where an employer's failure to maintain compliant time records can shift the practical evidentiary burden) — treat burden allocation as claim-specific, not a single blanket rule.
- **Honorários advocatícios sucumbenciais (Art. 791-A, Lei 13.467/2017)**: since claims filed on or after 2017-11-11, the losing party (including a partially-losing claimant) owes the winning side's attorney's fees, set between 5% and 15% of the liquidated award, the economic benefit obtained, or (where those cannot be measured) the updated case value. On partial procedence, courts arbitrate reciprocal fees, subject to specific compensation/suspension rules for beneficiaries of gratuidade de justiça (free legal aid) — this materially changed the risk calculus for both filing and defending claims compared to the pre-2017 regime, where the employer generally bore no fee-shifting risk from initiating or losing.
- **Temporal scope of Art. 791-A**: applies only to claims filed on or after 2017-11-11 (per TST Instrução Normativa nº 41/2018, Art. 6) — a claim tied to an earlier employment relationship but filed after that date is still subject to the current fee-shifting regime; the filing date, not the employment period, controls.
- **Gratuidade de justiça**: a claimant who qualifies is not required to pay opposing fees/costs up front; the current regime imposes conditions (e.g., a 2-year suspension of enforceability with limited execution circumstances) on collecting fees from a gratuidade beneficiary who loses — treat this as a factor reducing but not eliminating an employer's incentive calculus, and verify the current mechanics before advising on settlement strategy.

## Decision Points
1. Has more than 2 years passed since contract termination? If yes and the claim was not filed within that window, the entire action is generally time-barred (bienal) — verify the exact filing date against the termination date.
2. For any specific credit claimed, does it fall within the 5-year lookback (quinquenal) from the claim's filing date? Credits older than that are generally unenforceable even if the underlying right existed.
3. Who bears the burden on each specific disputed fact — is this a general Art. 818/CPC 373 allocation, or does the specific claim type (e.g., overtime, where non-compliant time records commonly shift practical burden) carry a recognized deviation?
4. Was the claim filed before or after 2017-11-11? (Determines whether Art. 791-A fee-shifting applies at all.)
5. Does the claimant qualify for gratuidade de justiça, and how does that affect realistic fee-recovery prospects even if the company prevails?

## Required Facts
- Contract termination date (or confirmation the contract remains active) and the claim's filing date, to assess prescription.
- The specific credits claimed and the periods they cover, to assess the quinquenal lookback per credit.
- The specific facts in dispute and which party's assertion each depends on, to allocate burden correctly.
- Whether the claimant has requested or been granted gratuidade de justiça.

## Required Evidence
- Time records, payroll records, and any documentation relevant to the specific disputed facts (their absence or inadequacy can itself shift practical burden for certain claim types, e.g. jornada).
- The TRCT and termination documentation (see `termination.md`).
- Any prior disciplinary or investigation record relevant to the dispute (see `discipline.md`).
- Applicable CCT/ACT terms bearing on the disputed claim (see `collective-bargaining.md`).

## Exceptions
- The bienal prescrição does not run while the employment contract remains active — it only begins at termination; do not apply it to an active-contract dispute.
- Certain claims (e.g., FGTS-related, in some doctrinal treatments) have historically been subject to distinct prescription treatment from the general quinquenal/bienal rule — treat any FGTS-specific prescription question as requiring dedicated current verification, not an assumption that the general rule applies unmodified.

## Risk Considerations
- Assuming the pre-2017 fee regime (no fee-shifting risk to the employer for merely losing) still applies to a currently-filed claim is a live, consequential error — Art. 791-A exposure should factor into every current litigation/settlement decision for claims filed since 2017-11-11.
- Miscalculating the bienal deadline from the wrong reference date (e.g., from the last day worked rather than the formal termination date, where those differ) risks either wrongly advising a claim is time-barred or failing to raise a valid prescription defense.
- Treating burden of proof as uniformly employee-side across all claim types ignores well-established deviations (particularly for jornada/overtime claims tied to inadequate employer record-keeping) and can lead to underestimating litigation exposure.

## Human Escalation Conditions
Escalate for human legal review whenever: a claim is filed or imminent; a prescription calculation is close to a deadline boundary; the claim involves a material financial exposure or a class/collective dimension; fee-shifting exposure under Art. 791-A materially affects a settlement recommendation; or burden-of-proof allocation for the specific claim type is unclear.

## Source IDs
`planalto` (T1 — CF Art. 7º, XXIX; CLT Arts. 818, 791-A; not independently re-fetched due to the persistent planalto.gov.br connection failure documented in `collective-bargaining.md`), `tst` (T1 — jurisprudence and normative instructions on prescrição, ônus da prova deviations by claim type, and Art. 791-A's temporal scope and gratuidade-de-justiça interaction; not independently checked for this reference beyond the IN 41/2018 temporal-scope point cited above), `stf` (T1 — for any constitutional challenge to fee-shifting or gratuidade-de-justiça mechanics, not researched in this pass).

## Freshness Requirements
Critical. Prescription deadlines, fee percentages, and the gratuidade-de-justiça fee-collection mechanics are precise numeric/temporal rules with real litigation consequences; re-verify against a current T1 source before any consequential deadline calculation or settlement recommendation.

## Effective-Date Considerations
- **CURRENT (since 2017-11-11, Lei 13.467/2017):** Art. 791-A fee-shifting applies to any claim filed on or after this date, regardless of when the underlying employment relationship occurred.
- **SUPERSEDED (claims filed before 2017-11-11):** no honorários sucumbenciais fee-shifting risk existed for losing a labor claim under the prior regime (subject to narrower pre-existing rules on assistência sindical that this reference does not detail).
- The bienal/quinquenal prescrição framework itself (CF Art. 7º, XXIX) predates the 2017 reform and was not altered by it — do not confuse this stable prescription rule with the reform-introduced fee-shifting rule, which is a separate and more recent change.

## Related References
- `termination.md` (this skill) — termination date is the anchor for the bienal prescrição calculation.
- `discipline.md` (this skill) — disciplinary/justa causa disputes are among the most common labor-litigation fact patterns.
- `working-time.md` (this skill) — overtime/interval disputes are where burden-of-proof deviations most commonly matter.
- `collective-bargaining.md` (this skill) — CCT/ACT terms are frequently disputed evidence in labor litigation.

## Known Limitations
- The exact current fee-percentage range and gratuidade-de-justiça enforcement mechanics are cited from secondary sources referencing the statutory text, not an independently re-fetched primary source, due to the planalto.gov.br access failure; re-verify exact current figures before a consequential fee estimate.
- Does not cover claim-type-specific burden-of-proof deviations exhaustively — only flags that they exist and that jornada/overtime is a commonly-cited example; a specific claim type's current burden allocation should be confirmed against current TST guidance.
- Does not cover procedural mechanics of the claim itself (petição inicial requirements, audiência stages, recursos) — this reference is limited to prescription, burden, and fee-exposure framing.
