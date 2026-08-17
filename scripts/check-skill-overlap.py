#!/usr/bin/env python3
"""Flag exact duplicate skill descriptions for human overlap review."""
import re
import sys
from collections import defaultdict
from pathlib import Path


def main(root: str = "skills") -> int:
    descriptions = defaultdict(list)
    for path in Path(root).rglob("SKILL.md"):
        match = re.search(r"^description: (.+)$", path.read_text(encoding="utf-8"), re.M)
        if match:
            descriptions[match.group(1).casefold()].append(str(path.parent))
    overlaps = [paths for paths in descriptions.values() if len(paths) > 1]
    if overlaps:
        print("SKILL_OVERLAP_REVIEW_REQUIRED:\n" + "\n".join(" - ".join(paths) for paths in overlaps))
        return 1
    print(f"SKILL_OVERLAP_CHECK_PASSED: {len(descriptions)} distinct descriptions")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1] if len(sys.argv) == 2 else "skills"))
