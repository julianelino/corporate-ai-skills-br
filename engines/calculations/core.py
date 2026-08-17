"""Deterministic, locale-neutral calculation primitives for corporate skills."""
from __future__ import annotations

from datetime import date
from decimal import Decimal, ROUND_HALF_UP
from math import isfinite

CENT = Decimal("0.01")


def _amount(value: float | int | str | Decimal) -> Decimal:
    return Decimal(str(value)).quantize(CENT, rounding=ROUND_HALF_UP)


def hhmm_to_decimal(value: str) -> Decimal:
    """Convert HH:MM to decimal hours; 08:30 becomes 8.50, never 8.30."""
    try:
        hours, minutes = value.split(":", 1)
        hours_i, minutes_i = int(hours), int(minutes)
    except (ValueError, AttributeError) as error:
        raise ValueError("duration must use HH:MM") from error
    if hours_i < 0 or not 0 <= minutes_i < 60:
        raise ValueError("invalid duration")
    return (Decimal(hours_i) + Decimal(minutes_i) / Decimal(60)).quantize(CENT, rounding=ROUND_HALF_UP)


def decimal_to_hhmm(value: float | int | str | Decimal) -> str:
    total_minutes = int((Decimal(str(value)) * Decimal(60)).quantize(Decimal("1"), rounding=ROUND_HALF_UP))
    if total_minutes < 0:
        raise ValueError("duration cannot be negative")
    return f"{total_minutes // 60:02d}:{total_minutes % 60:02d}"


def percentage(part: float | int | str, whole: float | int | str) -> Decimal:
    whole_value = Decimal(str(whole))
    if whole_value == 0:
        raise ValueError("whole cannot be zero")
    return (Decimal(str(part)) / whole_value * Decimal(100)).quantize(CENT, rounding=ROUND_HALF_UP)


def gross_margin(revenue: float | int | str, cost: float | int | str) -> Decimal:
    return percentage(Decimal(str(revenue)) - Decimal(str(cost)), revenue)


def interest(principal: float | int | str, periodic_rate: float | int | str, periods: int) -> Decimal:
    if periods < 0:
        raise ValueError("periods cannot be negative")
    return (_amount(principal) * ((Decimal(1) + Decimal(str(periodic_rate))) ** periods - Decimal(1))).quantize(CENT, rounding=ROUND_HALF_UP)


def turnover_rate(terminations: int, average_headcount: float | int | str) -> Decimal:
    return percentage(terminations, average_headcount)


def allocation(total: float | int | str, weights: dict[str, float | int | str]) -> dict[str, Decimal]:
    if not weights or sum(Decimal(str(weight)) for weight in weights.values()) <= 0:
        raise ValueError("weights must have a positive total")
    total_weight = sum(Decimal(str(weight)) for weight in weights.values())
    return {key: (_amount(total) * Decimal(str(weight)) / total_weight).quantize(CENT, rounding=ROUND_HALF_UP) for key, weight in weights.items()}


def aging_bucket(due_date: date, as_of: date) -> str:
    days = (as_of - due_date).days
    if days <= 0:
        return "CURRENT"
    if days <= 30:
        return "D1_30"
    if days <= 60:
        return "D31_60"
    if days <= 90:
        return "D61_90"
    return "D91_PLUS"


def straight_line_depreciation(cost: float | int | str, residual: float | int | str, useful_life_months: int) -> Decimal:
    if useful_life_months <= 0:
        raise ValueError("useful_life_months must be positive")
    base = _amount(cost) - _amount(residual)
    if base < 0:
        raise ValueError("residual cannot exceed cost")
    return (base / Decimal(useful_life_months)).quantize(CENT, rounding=ROUND_HALF_UP)


def npv(rate: float, cashflows: list[float]) -> Decimal:
    if rate <= -1 or not isfinite(rate):
        raise ValueError("rate must be finite and greater than -1")
    value = sum(Decimal(str(flow)) / (Decimal(1) + Decimal(str(rate))) ** period for period, flow in enumerate(cashflows))
    return value.quantize(CENT, rounding=ROUND_HALF_UP)


def irr(cashflows: list[float], tolerance: float = 1e-7, iterations: int = 200) -> float:
    if not cashflows or not (any(flow < 0 for flow in cashflows) and any(flow > 0 for flow in cashflows)):
        raise ValueError("cashflows need at least one positive and one negative value")
    low, high = -0.9999, 10.0
    for _ in range(iterations):
        midpoint = (low + high) / 2
        value = float(npv(midpoint, cashflows))
        if abs(value) <= tolerance:
            return midpoint
        if value > 0:
            low = midpoint
        else:
            high = midpoint
    return (low + high) / 2
