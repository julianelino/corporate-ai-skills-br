# Collective Bargaining (Convenção e Acordo Coletivo de Trabalho)

## Topics Covered
- collective-bargaining

## Purpose
Determine which working conditions a collective instrument (convenção or acordo coletivo) can validly set or change, and which statutory rights it can never reach — the single most consequential distinction for any request that cites a CCT/ACT as justification for a practice.

## When to Load
Load whenever a request cites a CCT (convenção coletiva), ACT (acordo coletivo), or a "negotiated" condition as the basis for a working-time, pay, or benefit practice that differs from the general CLT rule — before evaluating whether that practice is valid.

## Scope
Covers CLT Título VI, Capítulo I (Arts. 611, 611-A, 611-B, 620), as amended by Lei nº 13.467/2017 ("Reforma Trabalhista", in force since 2017-11-11). Does not cover union representativeness, the negotiation process itself, or contribuição sindical — see related references when those become available.

## Core Concepts
- **Convenção coletiva de trabalho** (Art. 611, *caput*): a normative agreement between two or more unions (sindicatos), setting conditions applicable across their represented economic/professional categories.
- **Acordo coletivo de trabalho** (Art. 611, §1º): a normative agreement between one or more unions of employees and one or more specific companies (or a single company), narrower in scope than a convenção.
- **Prevalência do negociado sobre o legislado** (Art. 611-A, introduced by Lei 13.467/2017): for the 15 matters listed in Art. 611-A, a valid collective instrument prevails over the general CLT rule even when the negotiated condition is *less* favorable to the employee than the statutory default — this reversed the pre-2017 principle that a collective instrument could only improve on, never reduce, statutory protection.
- **Art. 611-B floor**: an enumerated list of 30 matters a collective instrument can never suppress or reduce, regardless of Art. 611-A — these remain a hard statutory floor.
- **Acordo vs. convenção conflict rule** (Art. 620): since Lei 13.467/2017, an acordo coletivo *always* prevails over a convenção coletiva when both apply to the same employment relationship — **this is a reversal of the pre-2017 rule**, not a continuation of it (see Effective-Date Considerations).

## Decision Points
1. Is the collective instrument a convenção or an acordo? (Determines which prevails under Art. 620 if both exist.)
2. Does the negotiated condition fall inside the Art. 611-A list (I–XV)? If yes, the negotiated term can validly deviate from the general CLT rule, even unfavorably.
3. Does the negotiated condition touch any Art. 611-B item (I–XXX)? If yes, the collective instrument cannot validly reduce it — treat any purported reduction as invalid regardless of union agreement.
4. If both a convenção and an acordo cover the same matter, does the acordo's term govern? (Yes, under current Art. 620 — never apply the old "most favorable" rule to a case governed by current law.)
5. Is the instrument itself still within its validity period (collective instruments in Brazil are time-bound, typically annual)?

## Required Facts
- Exact text of the relevant CCT/ACT clause.
- Whether the instrument is a convenção or an acordo, and its validity period (vigência).
- Whether both a convenção and an acordo exist and cover the same matter (conflict scenario).
- The specific matter being negotiated, mapped to an Art. 611-A item, an Art. 611-B item, or neither.
- Date the instrument was signed/registered, relative to 2017-11-11 (Lei 13.467/2017's effective date) if a pre-reform instrument's continued validity is in question.

## Required Evidence
- The signed collective instrument (or its officially registered/deposited text — CCT/ACT must be registered with the Ministério do Trabalho e Emprego to be enforceable).
- Confirmation of the negotiating unions' representativeness for the affected employees.

## Exceptions
- Art. 611-B's 30 items are not negotiable downward by any collective instrument, no matter how favorable to the union's other members the trade-off appears.
- Individual employees generally cannot opt out of validly-negotiated collective terms; do not treat an individual's objection alone as invalidating an otherwise valid CCT/ACT clause — that determination itself requires legal/human review, not a default assumption either way.

## Risk Considerations
- Applying the pre-2017 "most favorable always wins" logic to a post-2017 acordo-vs-convenção conflict is a **live, common, high-risk error** — the rule reversed, it did not merely add an exception.
- Treating an Art. 611-A negotiated reduction as automatically valid without checking it doesn't also fall under an Art. 611-B item is a second common error — the two lists are not mutually exclusive in how a clause might be worded, only in effect.
- Constitutional challenges to specific aspects of the negociado-sobre-legislado framework have been litigated since 2017. This reference does not track pending or decided STF/TST rulings on any specific Art. 611-A item — verify current jurisprudential status via `tst`/`stf` before treating an Art. 611-A-based deviation as free of litigation risk in a materially consequential case.

## Human Escalation Conditions
Escalate for human legal review whenever: a proposed practice relies on an Art. 611-A deviation with material financial or safety impact; an Art. 611-B item is arguably implicated; an acordo/convenção conflict exists and the affected group is large; or the collective instrument's validity/registration status is uncertain.

## Source IDs
`planalto` (T1 — CLT consolidated text, Arts. 611/611-A/611-B/620; note: not independently re-fetched for this reference due to a persistent connection failure from this environment to planalto.gov.br, also observed and documented in `scripts/check-source-freshness.mjs` — the Art. 611-A/611-B/620 text above was verified instead via the Câmara dos Deputados' official mirror of the same law, https://www2.camara.leg.br/legin/fed/lei/2017/lei-13467-13-julho-2017-785204-publicacaooriginal-153369-pl.html, which republishes the identical statutory text), `tst` (T1 — jurisprudence on validity/interpretation, not independently checked for this reference; consult before relying on any single Art. 611-A item in a disputed case).

## Freshness Requirements
Critical. Re-verify against a live, current source before any consequential determination — do not rely on this reference's quoted text as a substitute for checking the current CLT text if legislative or constitutional change is plausible for the specific matter at hand.

## Effective-Date Considerations
- **CURRENT (since 2017-11-11):** Arts. 611-A, 611-B exist; Art. 620 gives an acordo coletivo absolute prevalence over a convenção coletiva on the same matter, independent of which is more favorable.
- **SUPERSEDED (until 2017-11-10):** Arts. 611-A/611-B did not exist; Art. 620 gave prevalence to whichever instrument (convenção or acordo) was more favorable to the employee.
- A pre-reform employment relationship or dispute may still require applying the superseded rule depending on when the relevant facts occurred — do not assume current law applies retroactively without checking; this is exactly the kind of question that requires escalation, not a default.

## Related References
- `termination.md` (this skill) — a termination decision that cites a CCT/ACT clause should cross-check that clause against this reference's Art. 611-A/611-B analysis before relying on it.
- Not yet written: a dedicated reference for union representativeness and CCT/ACT registration requirements (`CORPORATE_CONTEXT_REQUIRED` would apply for a specific company's applicable union/category).

## Known Limitations
- The Art. 611-B item list is quoted from a secondary official mirror (Câmara dos Deputados), not independently re-verified against `planalto` directly, due to a real, reproducible fetch failure against planalto.gov.br from this environment (same failure mode already documented for the automated freshness checker). Re-verify directly against `planalto` when that access is available.
- Does not cover sector-specific CCT variations, since those are `CORPORATE_CONTEXT_REQUIRED` (the applicable CCT/ACT for a specific company and category must be supplied, never assumed).
- Does not track post-2017 STF/TST rulings narrowing or confirming specific Art. 611-A items — this is a live area of litigation.
