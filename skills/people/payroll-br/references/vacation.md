# Vacation (Férias)

## Topics Covered
- vacation

## Purpose
Determine the correct férias entitlement, timing, and payroll treatment for a given employee — period aquisitivo/concessivo status, valid parcelamento, abono pecuniário, and the payroll consequences of a late or non-compliant grant — before calculating or advising on a férias event.

## When to Load
Load whenever a request involves calculating, scheduling, or reviewing an employee's férias (vacation) — including a parcelamento request, an abono pecuniário request, or a dispute about whether férias were granted within the legal period — before finalizing a férias calculation or payroll entry.

## Scope
Covers CLT Arts. 129–153 (direito a férias, período aquisitivo/concessivo, parcelamento, abono pecuniário, férias em dobro). Does not cover the constitutional 1/3 additional's interaction with other rubrics' incidência (see `incidences.md`) or a férias-related termination calculation (see `termination-support.md`).

## Core Concepts
- **Período aquisitivo (Art. 130)**: every 12 months of continuous employment generates a férias entitlement, generally 30 calendar days, reduced on a sliding scale if the employee had a material number of unjustified absences during the period (verify the exact current reduction scale against a T1 source before applying it to a specific absence count).
- **Período concessivo**: the employer has the following 12 months (after the período aquisitivo closes) to actually grant the férias. Granting férias after the período concessivo expires triggers férias em dobro (Art. 137) — double payment for the entire period, not just the delay — a frequently underestimated exposure.
- **Parcelamento (Art. 134, §1º, as amended by Lei 13.467/2017)**: with the employee's agreement, férias may be split into up to 3 periods, provided one period is at least 14 consecutive days and the others are each at least 5 consecutive days; none of the periods may begin within the 2 days preceding a holiday or the weekly rest day (Art. 134, §3º).
- **Abono pecuniário (Art. 143)**: the employee may convert up to 1/3 of the férias period into cash, generally requested up to 15 days before the período aquisitivo's end (verify the exact current deadline mechanics against a T1 source, since practical administration of this deadline is commonly a point of dispute).
- **1/3 constitutional additional**: férias pay (and the abono pecuniário, where elected) carries a constitutionally-mandated additional of at least 1/3 over the normal remuneration — this is a floor, not subject to reduction by any instrument.
- **Férias coletivas**: an employer may grant collective vacation to all or part of its workforce simultaneously, subject to its own notice and administrative requirements — a distinct mechanism from individual férias scheduling, not detailed further in this reference.

## Decision Points
1. Has the período aquisitivo closed, and if so, is the employer still within the período concessivo, or has it expired (triggering férias em dobro exposure)?
2. Does the employee's absence record during the período aquisitivo reduce the entitled number of days? Verify the current reduction scale before applying it.
3. If parcelamento is requested, does the proposed split satisfy the minimum-duration and holiday/DSR-adjacency requirements, and is the employee's agreement documented?
4. Has abono pecuniário been validly requested within the applicable deadline, and has the 1/3 additional been correctly applied to both the férias pay and the abono portion?
5. Is this an individual férias event, or does it need to be analyzed as férias coletivas (different administrative mechanism)?

## Required Facts
- Employee's admission date and période aquisitivo/concessivo status.
- Absence record during the relevant período aquisitivo, if entitlement reduction is a possibility.
- Whether parcelamento or abono pecuniário has been requested, and the specific proposed structure.
- The férias grant date relative to the período concessivo deadline.

## Required Evidence
- Employee's admission date and attendance/absence records for the relevant período aquisitivo.
- Documented employee agreement to any parcelamento arrangement.
- The abono pecuniário request and its timing relative to the applicable deadline.
- Payroll records showing the 1/3 additional was applied.

## Exceptions
- Férias coletivas follow a distinct administrative process (employer-initiated for a group, with its own notice requirements) rather than the individual período aquisitivo/concessivo cycle described above — treat as `CORPORATE_CONTEXT_REQUIRED` for the specific collective grant's terms if that mechanism is in play.
- An employee dismissed before completing a full período aquisitivo is still entitled to proportional férias — this connects directly to `termination-support.md`, not to this reference's individual-cycle framework alone.

## Risk Considerations
- Granting férias after the período concessivo has expired triggers férias em dobro for the entire period, not a pro-rated penalty — this is a high-value, commonly underestimated exposure when férias scheduling is not actively tracked.
- Applying an outdated or incorrect absence-based entitlement-reduction scale risks both underpaying entitled employees and creating compliance exposure.
- Failing to apply the 1/3 additional to the abono pecuniário portion specifically (not just the "regular" férias days) is a common calculation error.

## Human Escalation Conditions
Escalate for human payroll/legal review whenever: a período concessivo appears to have expired without the férias being granted; an absence-based entitlement reduction is being applied and its current basis is uncertain; a parcelamento arrangement's validity is disputed; or férias coletivas administration is involved.

## Source IDs
`planalto` (T1 — CLT Arts. 129–153; not independently re-fetched due to the persistent planalto.gov.br connection failure documented across this repository's labor-law references), `mte` (T1 — regulatory guidance on férias administration), `tst` (T1 — jurisprudence on férias em dobro and parcelamento validity disputes; not independently checked for this reference).

## Freshness Requirements
Critical. The absence-based entitlement-reduction scale and the abono pecuniário deadline mechanics are precise numeric rules; re-verify against a current T1 source before a consequential calculation.

## Effective-Date Considerations
- **CURRENT (since 2017-11-11, Lei 13.467/2017):** férias may be split into up to 3 periods under the Art. 134, §1º conditions described above.
- **SUPERSEDED (until 2017-11-10):** parcelamento was more restrictive under the pre-reform text — do not apply the current 3-period structure to a pre-reform dispute without checking which rule applied at the relevant time.
- The período aquisitivo/concessivo cycle itself (Arts. 129–130) and the 1/3 constitutional additional (a constitutional, not merely statutory, floor) were not altered by the 2017 reform.

## Related References
- `payroll.md` (this skill) — for the general payroll structure this event fits into.
- `incidences.md` (this skill) — for how férias pay and the 1/3 additional interact with the INSS/FGTS/IRRF calculation base.
- `termination-support.md` (this skill) — for proportional férias owed on termination.
- `labor-law-br`'s `working-time.md` — for how absences affecting entitlement interact with working-time record obligations.

## Known Limitations
- The exact current absence-based entitlement-reduction scale and the precise abono pecuniário deadline administrative mechanics are cited from secondary sources, not an independently re-fetched primary text, due to the planalto.gov.br access failure; re-verify before a consequential calculation.
- Does not detail férias coletivas' specific administrative/notice requirements — treat as a distinct mechanism requiring dedicated research if it becomes a recurring need.
- Does not cover sector-specific férias variations (e.g., for professors, subject to an academic-calendar-linked regime) that differ from the general CLT framework.
