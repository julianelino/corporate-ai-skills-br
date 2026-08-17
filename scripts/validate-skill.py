#!/usr/bin/env python3
"""Validate governed skill contracts using only the Python standard library."""
import json
import re
import sys
from pathlib import Path

REQUIRED = {"name", "version", "domain", "status", "jurisdiction", "default_locale", "routes_from", "routes_to", "handles", "requires", "optional_context", "risk_ceiling", "decision_authority", "freshness", "source_policy", "token_budget", "compatible_platforms"}
FRONTMATTER = re.compile(r"\A---\nname: ([a-z0-9-]+)\ndescription: (.+)\n---\n", re.S)


def main(root: str) -> int:
    errors = []
    skills = sorted(Path(root).rglob("SKILL.md"))
    for skill_md in skills:
        text = skill_md.read_text(encoding="utf-8")
        match = FRONTMATTER.match(text)
        if not match:
            errors.append(f"{skill_md}: frontmatter must contain only name and description")
            continue
        contract_path = skill_md.parent / "skill.yaml"
        if not contract_path.exists():
            errors.append(f"{skill_md.parent}: missing skill.yaml")
            continue
        try:
            contract = json.loads(contract_path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as error:
            errors.append(f"{contract_path}: {error}")
            continue
        missing = REQUIRED - contract.keys()
        if missing:
            errors.append(f"{contract_path}: missing {sorted(missing)}")
        if contract.get("name") != match.group(1):
            errors.append(f"{contract_path}: name must match SKILL.md")
        budget = contract.get("token_budget", {})
        if not {"core_tokens", "initial_references", "max_references"} <= budget.keys():
            errors.append(f"{contract_path}: incomplete token budget")
        if contract.get("risk_ceiling") in {"R5", "R6"} and not (skill_md.parent / "sources.md").exists():
            errors.append(f"{skill_md.parent}: R5/R6 skills require sources.md")
        if "TODO" in text:
            errors.append(f"{skill_md}: unresolved TODO")
    if errors:
        print("SKILL_VALIDATION_FAILED:\n" + "\n".join(f"- {item}" for item in errors))
        return 1
    print(f"SKILL_VALIDATION_PASSED: {len(skills)} skills")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1] if len(sys.argv) == 2 else "skills"))
