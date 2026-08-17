#!/usr/bin/env python3
"""Flag core skill text materially beyond its declared review budget."""
import json
import re
import sys
from pathlib import Path


def main(root: str = "skills") -> int:
    errors = []
    for skill in Path(root).rglob("skill.yaml"):
        contract = json.loads(skill.read_text(encoding="utf-8"))
        words = len(re.findall(r"\S+", (skill.parent / "SKILL.md").read_text(encoding="utf-8")))
        allowed = contract["token_budget"]["core_tokens"] * 2
        if words > allowed:
            errors.append(f"{skill.parent}: {words} words exceeds review threshold {allowed}")
    if errors:
        print("TOKEN_BUDGET_FAILED:\n" + "\n".join(errors))
        return 1
    print("TOKEN_BUDGET_PASSED")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1] if len(sys.argv) == 2 else "skills"))
