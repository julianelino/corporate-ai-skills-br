"""Normalize structured intake before any specialist interprets it."""
from __future__ import annotations

import csv
from pathlib import Path


SUPPORTED_STRUCTURED = {".csv"}


def intake_strategy(path: str) -> str:
    suffix = Path(path).suffix.casefold()
    if suffix in SUPPORTED_STRUCTURED:
        return "STRUCTURED_PARSE"
    if suffix in {".xlsx", ".docx", ".pdf"}:
        return "NATIVE_EXTRACTION_REQUIRED"
    if suffix in {".png", ".jpg", ".jpeg", ".tiff"}:
        return "OCR_FALLBACK"
    return "UNSUPPORTED"


def read_csv(path: str) -> list[dict[str, str]]:
    if intake_strategy(path) != "STRUCTURED_PARSE":
        raise ValueError("read_csv accepts CSV only")
    with Path(path).open(encoding="utf-8", newline="") as source:
        return list(csv.DictReader(source))
