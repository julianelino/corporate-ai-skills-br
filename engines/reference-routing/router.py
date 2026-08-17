"""Small, explainable routing helper. Specialists retain domain reasoning."""
from __future__ import annotations

import json
from pathlib import Path


def load_registry(path: str = "knowledge/registry/capability-registry.yaml") -> dict:
    return json.loads(Path(path).read_text(encoding="utf-8"))


def route(intent: str, registry: dict | None = None) -> dict:
    registry = registry or load_registry()
    query = intent.casefold()
    matches = []
    for item in registry["capabilities"]:
        score = sum(1 for trigger in item["triggers"] if trigger.casefold() in query)
        if score:
            matches.append((score, item))
    matches.sort(key=lambda pair: (-pair[0], pair[1]["skill"]))
    skills = [item["skill"] for _, item in matches[:6]]
    guard = len(matches) > 6
    return {
        "intent": intent,
        "primary": skills[0] if skills else "corporate-router",
        "specialists": skills or ["corporate-router"],
        "context_guard": guard,
        "mode": "SIMULATE" if any(item["risk_ceiling"] in {"R4", "R5", "R6"} for _, item in matches[:6]) else "ANALYZE",
        "reason": "keyword capability match; confirm missing context and current-source needs before a critical conclusion",
    }
