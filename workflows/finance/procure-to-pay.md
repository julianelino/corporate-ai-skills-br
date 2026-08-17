# Finance Workflow: procure-to-pay

## Flow

accounts-payable → payments → bank-reconciliation → accounting-br; document, supplier, contract/PO, receipt, tax, approval, payment simulation, reconciliation.

## Controls

Operate in `SIMULATE` until required human approvals exist. Record requester, evidence, owner, approvals, before/after values, and exceptions. Never merge supplier maintenance, bank change, approval, and payment execution.
