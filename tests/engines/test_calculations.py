from datetime import date
from decimal import Decimal

import pytest

from engines.calculations.core import aging_bucket, decimal_to_hhmm, gross_margin, hhmm_to_decimal, irr, npv, percentage, straight_line_depreciation


def test_time_conversion_uses_base_sixty():
    assert hhmm_to_decimal("08:30") == Decimal("8.50")
    assert decimal_to_hhmm("7.75") == "07:45"


def test_percentage_and_margin_are_deterministic():
    assert percentage(25, 100) == Decimal("25.00")
    assert gross_margin(200, 50) == Decimal("75.00")


def test_aging_and_depreciation():
    assert aging_bucket(date(2026, 1, 1), date(2026, 2, 15)) == "D31_60"
    assert straight_line_depreciation(1200, 0, 12) == Decimal("100.00")


def test_npv_and_irr():
    assert npv(0.1, [-100, 110]) == Decimal("0.00")
    assert irr([-100, 110]) == pytest.approx(0.1, abs=0.001)


def test_reject_invalid_durations_and_division():
    with pytest.raises(ValueError):
        hhmm_to_decimal("08:60")
    with pytest.raises(ValueError):
        percentage(1, 0)
