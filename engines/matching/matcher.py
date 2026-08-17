"""Conservative matching: uncertain data never becomes a confirmed match."""
from decimal import Decimal


def classify_match(left: dict, right: dict) -> str:
    if left.get("id") and left.get("id") == right.get("id"):
        return "EXACT_MATCH"
    amount_left = left.get("amount")
    amount_right = right.get("amount")
    date_left = left.get("date")
    date_right = right.get("date")
    if amount_left is not None and amount_right is not None and Decimal(str(amount_left)) == Decimal(str(amount_right)) and date_left == date_right:
        return "PROBABLE_MATCH"
    if amount_left is None or amount_right is None:
        return "UNIDENTIFIED"
    return "EXCEPTION"
