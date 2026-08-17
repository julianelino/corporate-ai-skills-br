from pathlib import Path


def test_governance_skills_protect_evidence_and_approval():
    for name in ("corporate-compliance", "corporate-investigation"):
        text = Path(f"skills/governance/{name}/SKILL.md").read_text(encoding="utf-8").casefold()
        assert "do not" in text
        assert (Path(f"skills/governance/{name}/skill.yaml")).exists()
