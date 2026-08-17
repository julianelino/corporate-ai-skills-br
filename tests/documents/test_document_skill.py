from pathlib import Path


def test_document_skill_has_audit_controls():
    text = Path("skills/documents/corporate-document-authoring/SKILL.md").read_text(encoding="utf-8").casefold()
    assert "sensitive-data" in text
    assert "approval" in text
