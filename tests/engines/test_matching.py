from engines.matching.matcher import classify_match


def test_matching_is_conservative():
    assert classify_match({"id": "a", "amount": 100}, {"id": "a", "amount": 100}) == "EXACT_MATCH"
    assert classify_match({"amount": 100, "date": "2026-01-01"}, {"amount": 100, "date": "2026-01-01"}) == "PROBABLE_MATCH"
    assert classify_match({"amount": 100}, {"amount": 90}) == "EXCEPTION"
    assert classify_match({}, {"amount": 90}) == "UNIDENTIFIED"
