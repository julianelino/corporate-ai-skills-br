# Finance Workflow: billing-cycle

## Flow

timesheet-contract-control → billing-invoicing → tax-br/accounting-br as needed → approval; detect ceiling overrun.

## Controls

Operate in `SIMULATE` until required human approvals exist. Record requester, evidence, owner, approvals, before/after values, and exceptions. Never merge supplier maintenance, bank change, approval, and payment execution.
