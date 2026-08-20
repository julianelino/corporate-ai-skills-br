import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fail, files, json, root } from './lib.mjs';
import { computeAll as computeCarryForward } from './verify-carry-forward.mjs';

// Task 3 audit gate: structure and process, never content quality (a human, not a script, judges
// whether a source hierarchy or a risk conclusion is actually correct). Checks that every critical
// skill has a source map, a topic-coverage entry, a review package, and a well-formed review state —
// and hard-fails an "approved" human review that lacks real reviewer evidence. It does not, and must
// not, mark any human review as approved itself.

const REQUIRED_SOURCE_SECTIONS = ['Source Policy', 'Primary Authorities', 'Corporate Sources', 'Secondary Professional Sources', 'Freshness-Critical Topics', 'Conflict Resolution', 'Source Restrictions', 'When External Verification Is Required', 'References Loaded On Demand'];
const AI_REVIEWER_MARKERS = ['ai', 'assistant', 'claude', 'gpt', 'llm', 'copilot', 'bot'];

const skillFiles = files('skills', (name) => name === 'skill.yaml')
  .map((path) => ({ path, contract: JSON.parse(readFileSync(path, 'utf8')) }))
  .filter(({ contract }) => contract.status !== 'RETIRED');
const critical = skillFiles.filter(({ contract }) => contract.quality_profile === 'critical');
const topics = json('knowledge/registry/critical-topics.yaml').skills;
const carryForward = json('knowledge/registry/carry-forward.yaml');
const errors = [];

for (const { path, contract } of critical) {
  const dir = dirname(path);
  const name = contract.name;

  // 1. Source map exists and covers every required section.
  const sourcesPath = join(dir, 'sources.md');
  if (!existsSync(sourcesPath)) { errors.push(`CRITICAL_SOURCES: ${name} has no sources.md`); }
  else {
    const text = readFileSync(sourcesPath, 'utf8');
    for (const section of REQUIRED_SOURCE_SECTIONS) if (!text.includes(`## ${section}`)) errors.push(`CRITICAL_SOURCES: ${name}/sources.md is missing the "${section}" section`);
  }

  // 2. Topic-coverage entry exists (declared knowledge scope, even if references are still thin).
  if (!topics[name]?.length) errors.push(`CRITICAL_SOURCES: ${name} has no entry in knowledge/registry/critical-topics.yaml`);

  // 3. Review package exists.
  const reviewDir = join(root, 'reviews/critical', name);
  if (!existsSync(join(reviewDir, 'REVIEW.md'))) errors.push(`CRITICAL_SOURCES: ${name} has no reviews/critical/${name}/REVIEW.md`);
  if (!existsSync(join(reviewDir, 'review.json'))) errors.push(`CRITICAL_SOURCES: ${name} has no reviews/critical/${name}/review.json`);

  // 4. Review state is well-formed and, if approved, backed by real evidence — never a fake sign-off.
  const review = contract.human_review;
  if (!review?.status) { errors.push(`CRITICAL_SOURCES: ${name} has no human_review.status`); continue; }
  if (review.status === 'approved') {
    if (!(review.reviewers?.length > 0)) errors.push(`CRITICAL_SOURCES: ${name} is marked approved with no reviewers`);
    if (!review.reviewed_at) errors.push(`CRITICAL_SOURCES: ${name} is marked approved with no reviewed_at`);
    if (!review.reviewed_commit) errors.push(`CRITICAL_SOURCES: ${name} is marked approved with no reviewed_commit`);
    for (const reviewer of review.reviewers ?? []) {
      const lower = String(reviewer).toLowerCase();
      if (AI_REVIEWER_MARKERS.some((marker) => lower.includes(marker))) errors.push(`CRITICAL_SOURCES: ${name} lists "${reviewer}" as a reviewer — an AI cannot approve mandatory human review`);
    }
  }
}

// 5. Carry-forward items can only shrink through verification, never through editing the file.
// EXPECTED_IDS is every item ever opened — once a finding is tracked, it must stay visible (even
// closed items stay in the file, never deleted) until the resolving task actually addresses it.
const EXPECTED_IDS = ['CRITICAL_ROUTING_DEPTH', 'REFERENCE_DEPTH', 'HUMAN_REVIEW', 'FRESHNESS_NOISY_TARGETS', 'DEPRECATED_REPLACEMENT', 'PLATFORM_ADVERSARIAL_EXECUTION', 'PLATFORM_BEHAVIORAL_EXECUTION'];
const carryForwardIds = new Set((carryForward.items ?? []).map((item) => item.id));
for (const id of EXPECTED_IDS) if (!carryForwardIds.has(id)) errors.push(`CRITICAL_SOURCES: carry-forward item ${id} is missing entirely`);

const recomputed = computeCarryForward();
const recomputedIds = new Set(recomputed.map((item) => item.id));
for (const item of carryForward.items ?? []) {
  if (item.status !== 'closed') continue;
  // A closed item with no registered verifier (scripts/verify-carry-forward.mjs) cannot have been
  // legitimately closed — there is no mechanism that could have recomputed its gap as zero.
  if (!recomputedIds.has(item.id) || !recomputed.find((r) => r.id === item.id)?.verifiable) { errors.push(`CRITICAL_SOURCES: carry-forward ${item.id} is closed but has no registered verifier in scripts/verify-carry-forward.mjs — a closure without a way to check it is not a real closure`); continue; }
  const check = recomputed.find((r) => r.id === item.id);
  if (check.gap_count > 0) errors.push(`CRITICAL_SOURCES: carry-forward ${item.id} is declared closed but ${check.gap_count} gap(s) remain (${check.remaining_skills.join(', ')}) — run npm run carry-forward:verify`);
}
const openCount = (carryForward.items ?? []).filter((item) => item.status !== 'closed').length;

fail(errors);
console.log(`CRITICAL_SOURCES_VALID: ${critical.length}/${critical.length} critical skills have source maps, topic coverage, and review packages; ${critical.filter(({ contract }) => contract.human_review?.status === 'approved').length}/${critical.length} human reviews approved; ${openCount} open carry-forward item(s)`);
