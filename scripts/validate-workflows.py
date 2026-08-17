#!/usr/bin/env python3
"""Check that workflow documents have a flow and explicit controls."""
import sys
from pathlib import Path


def main(root: str = "workflows") -> int:
    errors = []
    paths = list(Path(root).rglob("*.md"))
    for path in paths:
        text = path.read_text(encoding="utf-8")
        if "## Flow" not in text or "## Controls" not in text:
            errors.append(str(path))
    if errors:
        print("WORKFLOW_VALIDATION_FAILED:\n" + "\n".join(errors))
        return 1
    print(f"WORKFLOW_VALIDATION_PASSED: {len(paths)} workflows")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1] if len(sys.argv) == 2 else "workflows"))
