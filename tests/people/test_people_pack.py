from pathlib import Path


def test_people_skills_are_governed_and_complete():
    skills = list(Path("skills/people").glob("*/SKILL.md"))
    assert len(skills) == 17
    for skill in skills:
        text = skill.read_text(encoding="utf-8")
        assert "TODO" not in text
        assert (skill.parent / "skill.yaml").exists()


def test_labor_skill_requires_evidence_and_human_decision():
    text = Path("skills/people/labor-law-br/SKILL.md").read_text(encoding="utf-8")
    assert "evidence" in text.casefold()
    assert "human decision" in text.casefold()
