"""Explainable deterministic classifications."""


def classify_aging(days_past_due: int) -> str:
    if days_past_due <= 0:
        return "CURRENT"
    if days_past_due <= 30:
        return "D1_30"
    if days_past_due <= 60:
        return "D31_60"
    if days_past_due <= 90:
        return "D61_90"
    return "D91_PLUS"
