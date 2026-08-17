---
name: timesheet-contract-control
description: Analyze timesheets, billable status, hourly rates, contract ceilings, consumed/remaining balance, forecasts, and overrun alerts. Use for deterministic contract-control support; do not approve billing or contract changes.
---

# Timesheet Contract Control

Convert time using base sixty, aggregate by employee/client/project/activity/period, and compare approved contract ceiling to reported consumption. Flag missing rate or approved contract as unknown.

## Output

Return scope, evidence state, inputs and assumptions, deterministic calculations where applicable, exceptions, source/freshness status, recommended action, and approval gate.
