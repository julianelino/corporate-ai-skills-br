from pathlib import Path


def test_utility_skills_have_contracts():
    assert Path("skills/utilities/financial-spreadsheets/skill.yaml").exists()
    assert Path("skills/utilities/spreadsheet-automation/skill.yaml").exists()
