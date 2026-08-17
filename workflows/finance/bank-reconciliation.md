# Finance Workflow: bank-reconciliation

## Flow

bank-reconciliation → accounts-payable/accounts-receivable → accounting-br; classify low-confidence records conservatively.

## Controls

Operate in `SIMULATE` until required human approvals exist. Record requester, evidence, owner, approvals, before/after values, and exceptions. Never merge supplier maintenance, bank change, approval, and payment execution.
