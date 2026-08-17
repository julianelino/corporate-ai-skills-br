#!/usr/bin/env python3
"""Perform structural checks for repository JSON Schemas."""
import json
import sys
from pathlib import Path


def main(directory: str) -> int:
    paths = sorted(Path(directory).glob("*.schema.json"))
    errors = []
    for path in paths:
        try:
            schema = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as error:
            errors.append(f"{path}: {error}")
            continue
        if schema.get("type") != "object" or not schema.get("title"):
            errors.append(f"{path}: expected titled object schema")
    if errors:
        print("SCHEMA_INVALID:\n" + "\n".join(f"- {error}" for error in errors))
        return 1
    print(f"SCHEMA_VALID: {len(paths)} schemas")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1] if len(sys.argv) == 2 else "schemas"))
