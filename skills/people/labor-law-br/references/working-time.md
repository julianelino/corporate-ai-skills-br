# Working Time (Jornada de Trabalho)

## Topics Covered
- working-time

## Purpose
Determine the applicable working-hours regime for a given employee, whether a specific work pattern (overtime, shift, remote, compensatory) is validly structured, and which control/registration obligations apply — before advising on scheduling, overtime pay, or a jornada-based dispute.

## When to Load
Load whenever a request involves work schedules, overtime, breaks/intervals, shift patterns (including 12x36), remote/teletrabalho hour arrangements, or point/time-registration obligations — before calculating pay impact or confirming compliance.

## Scope
Covers CLT Arts. 58, 59, 59-A, 62, 66, 71, 73, and the teletrabalho chapter (Arts. 75-A–75-E as amended by Lei nº 14.442/2022), plus Portaria MTP nº 671/2021 (ponto eletrônico). Does not cover termination consequences of a jornada dispute (see `termination.md`) or litigation over unpaid overtime (see `labor-litigation.md`).

## Core Concepts
- **Jornada normal (Art. 58)**: default limit of 8 hours/day, unless a different limit is expressly fixed by contract, CCT/ACT, or a specific statutory regime.
- **Horas extras (Art. 59)**: up to 2 extra hours/day by individual agreement, CCT, or ACT, with a minimum 50% additional over the normal hourly rate (a CCT/ACT may set a higher percentage; never assume 50% is the ceiling without checking the applicable instrument).
- **Banco de horas (Art. 59, §§2º–3º)**: compensatory time arrangements allowing overtime to be offset by time off within a defined period, requiring either a collective instrument or, for arrangements within a shorter compensation period, individual written agreement, depending on the specific modality — verify the exact current requirement against a T1 source for the specific arrangement contemplated.
- **Escala 12x36 (Art. 59-A)**: 12 hours worked followed by 36 hours of rest, requiring an individual written agreement or a collective instrument; the additional hours within the 12-hour shift are considered already compensated by the extended rest period for regime-compliance purposes, subject to the specific instrument's terms.
- **Intervalo intrajornada (Art. 71)**: mandatory rest/meal break for continuous work exceeding 6 hours — minimum 1 hour, maximum 2 hours unless a written agreement or collective instrument permits otherwise; for work of 4–6 hours, a mandatory 15-minute break applies; below 4 hours, no mandatory break. Intervals are not counted as worked time.
- **Intervalo interjornada (Art. 66)**: minimum 11 consecutive hours of rest between two workdays.
- **Trabalho noturno (Art. 73)**: night work (generally 22h–5h in the urban regime) carries a statutory additional (commonly cited as at least 20%) and a reduced "night hour" concept for calculation purposes — confirm the current percentage and the exact time window against a T1 source before a consequential calculation.
- **Teletrabalho e controle de jornada (Art. 62, III, as amended by Lei nº 14.442/2022)**: only teletrabalho/remote employees compensated **by production or task** (produção ou tarefa) are excluded from Section II's working-hours control (and therefore from overtime entitlement); teletrabalho employees compensated **by hour** are subject to normal jornada control and overtime rules — this is a 2022 narrowing of the original 2017 exclusion and is a frequently-missed distinction (see Effective-Date Considerations).
- **Ponto eletrônico (Portaria MTP nº 671/2021)**: consolidates the technical, documentary, and inspection requirements for electronic time-registration systems (REP-C, REP-A, REP-P); manual registration must faithfully reflect the actual schedule worked — a fixed "ponto britânico" (recording only the contractual schedule regardless of actual hours) is not compliant.

## Decision Points
1. Is the employee subject to jornada control at all, or excluded under Art. 62 (management-level/trust positions under Art. 62, II, or teletrabalho paid by production/task under Art. 62, III as narrowed by Lei 14.442/2022)? `CORPORATE_CONTEXT_REQUIRED` to confirm the employee's actual compensation basis and role classification.
2. If a compensatory/banco de horas or 12x36 arrangement is in place, is it backed by the correct instrument (individual written agreement vs. collective instrument) for its specific modality and duration?
3. Are intrajornada and interjornada intervals being respected, and if not, does that create wage-parcel exposure (interval violations commonly generate an indenizatory addition under current doctrine — verify the current legal basis and calculation method before quoting a figure)?
4. Does an applicable CCT/ACT set a different overtime percentage, interval rule, or shift pattern than the general CLT default? Check `collective-bargaining.md`'s Art. 611-A/611-B analysis for whether that deviation is valid.
5. Is time being registered in a way that faithfully reflects actual hours worked (Portaria 671/2021), or does the registration pattern itself create litigation risk (e.g., a suspiciously uniform "ponto britânico" pattern)?

## Required Facts
- The employee's classification (Art. 62 exclusion candidate or not) and actual role/compensation basis.
- The specific working-time regime in effect (standard, banco de horas, 12x36, teletrabalho) and its governing instrument.
- Applicable CCT/ACT terms affecting hours, overtime percentage, or intervals. `CORPORATE_CONTEXT_REQUIRED`.
- Time-registration method in use and whether it faithfully reflects actual hours.

## Required Evidence
- The written individual agreement or collective instrument backing any banco de horas, 12x36, or teletrabalho arrangement.
- Time records (electronic or manual) for any period where overtime, interval compliance, or a jornada dispute is at issue.
- The applicable CCT/ACT text, where relied upon to justify a deviation from the general rule.

## Exceptions
- Art. 62 exclusions (management/trust positions; teletrabalho paid by production or task) remove entitlement to overtime and formal jornada control, but do not remove other statutory protections (rest, vacation, etc.) — do not over-extend an Art. 62 exclusion beyond its actual scope.
- A CCT/ACT may validly extend the intrajornada interval beyond 2 hours by written agreement or collective instrument (Art. 71 itself permits this), but cannot validly eliminate the interval below its statutory floor for continuous work exceeding 6 hours — cross-check against `collective-bargaining.md`'s Art. 611-B floor analysis before treating any interval reduction as valid.

## Risk Considerations
- Misclassifying an hourly-paid teletrabalho employee as excluded from jornada control under the pre-2022 understanding of Art. 62, III is a live, common error since Lei 14.442/2022 narrowed the exclusion — this creates real unpaid-overtime exposure.
- A time-registration pattern that never varies (ponto britânico) is treated by labor courts as unreliable evidence and can shift the evidentiary burden against the employer in an overtime dispute.
- Applying banco de horas or 12x36 without the correct backing instrument for the specific modality/duration risks the entire arrangement being invalidated, converting all "compensated" hours into payable overtime.

## Human Escalation Conditions
Escalate for human legal review whenever: an Art. 62 exclusion is being relied on for a borderline role or compensation structure; a jornada dispute involves a material back-pay exposure; a proposed working-time arrangement lacks clear instrument backing; or a time-registration audit reveals a pattern inconsistent with Portaria 671/2021.

## Source IDs
`planalto` (T1 — CLT Arts. 58/59/59-A/62/66/71/73/75-A–75-E, Lei 14.442/2022; not independently re-fetched due to the persistent planalto.gov.br connection failure documented in `collective-bargaining.md`), `mte` (T1 — Portaria MTP nº 671/2021 and ponto eletrônico regulatory guidance), `tst` (T1 — jurisprudence on interval violations, banco de horas validity, and teletrabalho classification disputes; not independently checked for this reference).

## Freshness Requirements
Critical. Specific percentages (overtime additional, night-work additional), the exact night-work time window, and the current interval-violation compensation mechanism should be re-verified against a current T1 source before any consequential calculation.

## Effective-Date Considerations
- **CURRENT (since 2022, Lei 14.442/2022):** Art. 62, III excludes from jornada control only teletrabalho employees paid by produção ou tarefa; hourly-paid teletrabalho employees are subject to normal jornada/overtime rules.
- **SUPERSEDED (2017-11-11 through the 2022 amendment):** the original Lei 13.467/2017 version of Art. 62, III excluded teletrabalho employees from jornada control more broadly, without the production/task compensation-basis narrowing.
- **CURRENT (since 2017-11-11, Lei 13.467/2017):** Art. 59-A's 12x36 regime and its "already compensated" treatment of the extended shift exist as a distinct statutory regime, separate from the general banco de horas mechanism.
- A pre-2022 classification of a teletrabalho employee's jornada-control status should be re-evaluated against the current rule if the arrangement is still active — do not assume a classification made before the amendment remains valid without checking.

## Related References
- `collective-bargaining.md` (this skill) — required whenever a CCT/ACT is cited to justify a deviation from the general working-time rules (Art. 611-A item VII covers "jornada de trabalho, observados os limites constitucionais").
- `termination.md` (this skill) — when a jornada violation is the basis for a rescisão indireta claim.
- `labor-litigation.md` (this skill) — once an overtime or interval dispute is litigated, including its evidentiary burden implications.

## Known Limitations
- Specific current percentages for overtime and night-work additionals, and the exact current night-work time window, are not independently re-verified against a primary source in this research pass due to the planalto.gov.br access failure; treat any specific percentage cited elsewhere as needing confirmation before a consequential calculation.
- Does not cover sector-specific working-time regimes (e.g., specific rules for bank employees, healthcare shift workers, or drivers), which have their own statutory particulars not addressed here.
- Does not cover the precise current mechanism (indenizatory vs. remuneratory nature) for compensating intrajornada interval violations, which has been subject to doctrinal and legislative evolution — verify current treatment before a consequential calculation.
