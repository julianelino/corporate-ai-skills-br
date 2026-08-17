from decimal import Decimal

from engines.calculations.core import allocation, interest, turnover_rate
from engines.data_intake.normalize import intake_strategy


def test_extended_deterministic_calculations():
    assert interest(100, "0.1", 1) == Decimal("10.00")
    assert turnover_rate(2, 100) == Decimal("2.00")
    assert allocation(100, {"A": 1, "B": 3}) == {"A": Decimal("25.00"), "B": Decimal("75.00")}


def test_structured_intake_precedes_ocr():
    assert intake_strategy("fixture.csv") == "STRUCTURED_PARSE"
    assert intake_strategy("fixture.pdf") == "NATIVE_EXTRACTION_REQUIRED"
    assert intake_strategy("fixture.png") == "OCR_FALLBACK"
