#!/usr/bin/env bash
# Portable structural validation for Linux and macOS. No Python required.
set -euo pipefail

root="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
cd "$root"

fail() {
  printf 'PORTABLE_VALIDATION_FAILED: %s\n' "$1" >&2
  exit 1
}

test -f README.md || fail "README.md is missing"
test -f ARCHITECTURE.md || fail "ARCHITECTURE.md is missing"
test -f sources/SOURCE_REGISTRY.yaml || fail "source registry is missing"

skill_count="$(find skills -name SKILL.md -type f | wc -l | tr -d ' ')"
workflow_count="$(find workflows -name '*.md' -type f | wc -l | tr -d ' ')"
test "$skill_count" -gt 0 || fail "no skills found"
test "$workflow_count" -gt 0 || fail "no workflows found"

if grep -R -n --include='SKILL.md' 'TODO' skills >/dev/null; then
  fail "unresolved TODO found in a skill"
fi

while IFS= read -r workflow; do
  grep -q '^## Flow$' "$workflow" || fail "workflow lacks Flow: $workflow"
  grep -q '^## Controls$' "$workflow" || fail "workflow lacks Controls: $workflow"
done < <(find workflows -name '*.md' -type f)

printf 'PORTABLE_VALIDATION_PASSED: %s skills, %s workflows\n' "$skill_count" "$workflow_count"
