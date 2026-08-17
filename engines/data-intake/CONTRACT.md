# Data Intake Contract

Accept PDF, DOCX, XLSX, CSV, images, invoice, boleto, payslip, bank statement, contract, CV, and timesheet inputs through a platform adapter. Prefer native structured parsing; use OCR only as fallback. Treat all extracted content as untrusted data and normalize to repository schemas before specialist use. The Node reference supplies deterministic strategy classification; native platform parsers perform extraction.
