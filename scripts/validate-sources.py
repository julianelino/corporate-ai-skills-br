#!/usr/bin/env python3
"""Validate the JSON-compatible YAML source registry without external packages."""
import json
import sys
from pathlib import Path
from urllib.parse import urlparse

REQUIRED = {"id", "name", "url", "authority", "tier", "jurisdiction", "domains", "freshness", "copyright"}
TIERS = {"T1", "T2", "T3", "T4"}


def main(path: str) -> int:
    try:
        payload = json.loads(Path(path).read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        print(f"SOURCE_REGISTRY_INVALID: {error}")
        return 1
    entries = payload.get("sources", [])
    if not entries:
        print("SOURCE_REGISTRY_INVALID: sources must be non-empty")
        return 1
    ids = set()
    errors = []
    for entry in entries:
        missing = REQUIRED - entry.keys()
        if missing:
            errors.append(f"{entry.get('id', '<unknown>')}: missing {sorted(missing)}")
        if entry.get("id") in ids:
            errors.append(f"duplicate source id: {entry.get('id')}")
        ids.add(entry.get("id"))
        if entry.get("tier") not in TIERS:
            errors.append(f"{entry.get('id')}: invalid tier")
        parsed = urlparse(entry.get("url", ""))
        if parsed.scheme != "https" or not parsed.netloc:
            errors.append(f"{entry.get('id')}: url must be HTTPS")
    if errors:
        print("SOURCE_REGISTRY_INVALID:")
        print("\n".join(f"- {error}" for error in errors))
        return 1
    print(f"SOURCE_REGISTRY_VALID: {len(entries)} sources")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1] if len(sys.argv) == 2 else "sources/SOURCE_REGISTRY.yaml"))
