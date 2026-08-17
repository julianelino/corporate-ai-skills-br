from pathlib import Path


def test_finance_skills_are_governed_and_complete():
    skills = list(Path("skills/finance").glob("*/SKILL.md"))
    assert len(skills) == 28
    for skill in skills:
        assert "TODO" not in skill.read_text(encoding="utf-8")
        assert (skill.parent / "skill.yaml").exists()


def test_payment_preserves_segregation_of_duties():
    text = Path("skills/finance/payments/SKILL.md").read_text(encoding="utf-8").casefold()
    assert "segregation" in text
    assert "never approve" in text
