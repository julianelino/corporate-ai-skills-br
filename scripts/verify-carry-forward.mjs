import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { fail, json, root } from './lib.mjs';
import { buildReadiness } from './report-release-readiness.mjs';
import { computeReferenceDepth } from './report-reference-depth.mjs';
import { contracts } from './build-capability-registry.mjs';
import { computePlatformExecution } from './platform-execution.mjs';

// The only legitimate way to close a knowledge/registry/carry-forward.yaml item: recompute the gap
// it names and write the result. A manual edit to "status": "closed" is not verification — this
// script (or one like it, one function per known item id) is. validate-critical-sources.mjs then
// hard-fails if a "closed" item's recomputed gap count is not actually zero.

const CARRY_FORWARD_PATH = 'knowledge/registry/carry-forward.yaml';

// Same list validate-critical-sources.mjs uses to refuse a fake sign-off — duplicated here rather
// than imported, since that script is a linear top-level CLI, not a module built for reuse. Any
// reviewer name containing one of these substrings is treated as not a real human, full stop.
const AI_REVIEWER_MARKERS = ['ai', 'assistant', 'claude', 'gpt', 'llm', 'copilot', 'bot'];

function isRealApproval(review) {
  if (review?.status !== 'approved') return false;
  if (!(review.reviewers?.length > 0)) return false;
  if (!review.reviewed_at) return false;
  if (!review.reviewed_commit) return false;
  return !review.reviewers.some((r) => AI_REVIEWER_MARKERS.some((marker) => String(r).toLowerCase().includes(marker)));
}

export const VERIFIERS = {
  CRITICAL_ROUTING_DEPTH(item) {
    const readiness = buildReadiness();
    const bySkill = new Map(readiness.skills.map((r) => [r.skill, r]));
    const stillGapped = item.affected_skills.filter((skill) => {
      const gaps = bySkill.get(skill)?.gaps ?? [];
      return gaps.some((g) => g.dimension === 'routing_eval' || g.dimension === 'boundary_eval');
    });
    return { gap_count: stillGapped.length, remaining_skills: stillGapped };
  },

  // A skill counts as gapped if it still has any uncovered required topic — matching
  // CRITICAL_ROUTING_DEPTH's convention of counting skills, not raw topic counts, so this item's
  // gap_count is directly comparable to its affected_skills list in carry-forward.yaml.
  REFERENCE_DEPTH() {
    const depth = computeReferenceDepth();
    const stillGapped = depth.skills.filter((row) => row.uncovered_topics.length > 0).map((row) => row.skill);
    return { gap_count: stillGapped.length, remaining_skills: stillGapped };
  },

  // A critical skill counts as gapped unless its skill.yaml carries a real, well-formed, non-AI
  // human_review.status: "approved" — mirrors validate-critical-sources.mjs's own well-formedness
  // check so this verifier and that hard gate can never silently disagree about what "approved"
  // means. Never itself sets a skill to approved — read-only, same as every other verifier here.
  HUMAN_REVIEW() {
    const critical = contracts().filter((c) => c.quality_profile === 'critical' && c.status !== 'RETIRED');
    const stillGapped = critical.filter((c) => !isRealApproval(c.human_review)).map((c) => c.name).sort();
    return { gap_count: stillGapped.length, remaining_skills: stillGapped };
  },

  // Single source of truth: scripts/platform-execution.mjs, the same module
  // scripts/final-reliability-gate.mjs reads — never a second, independently-computed counter here.
  // gap_count = defined - passed (a real per-case count, not a per-skill count like the other
  // verifiers above), matching the explicit repository convention this item was scoped to: a case
  // that was executed but FAILED still counts toward the gap, exactly like a case never executed at
  // all — "passed" is the only thing that shrinks it. remaining_skills lists which critical skills
  // still have at least one not-yet-passed case, kept for report-format parity with the other
  // verifiers' remaining_skills field, but the case-level gap_count is authoritative for closure.
  PLATFORM_BEHAVIORAL_EXECUTION() {
    const { behavioral } = computePlatformExecution();
    const remaining_skills = Object.entries(behavioral.bySkill).filter(([, s]) => s.passed < s.defined).map(([skill]) => skill).sort();
    return { gap_count: behavioral.defined - behavioral.passed, remaining_skills };
  },

  PLATFORM_ADVERSARIAL_EXECUTION() {
    const { adversarial } = computePlatformExecution();
    const remaining_skills = Object.entries(adversarial.bySkill).filter(([, s]) => s.passed < s.defined).map(([skill]) => skill).sort();
    return { gap_count: adversarial.defined - adversarial.passed, remaining_skills };
  },
};

// Read-only: recompute what each item's gap count actually is right now. Safe to call from a
// validator — never writes. Only the CLI entrypoint below (or another script that explicitly opts
// in) persists a status change, and only by calling apply().
export function computeAll() {
  const data = json(CARRY_FORWARD_PATH);
  return (data.items ?? []).map((item) => {
    const verifier = VERIFIERS[item.id];
    if (!verifier) return { id: item.id, verifiable: false, declared_status: item.status };
    const { gap_count, remaining_skills } = verifier(item);
    return { id: item.id, verifiable: true, gap_count, remaining_skills, declared_status: item.status };
  });
}

// Writes the recomputed status back to carry-forward.yaml. The only legitimate path to "closed".
export function apply() {
  const data = json(CARRY_FORWARD_PATH);
  const results = [];
  for (const item of data.items ?? []) {
    const verifier = VERIFIERS[item.id];
    if (!verifier) { results.push({ id: item.id, verifiable: false }); continue; }
    const { gap_count, remaining_skills } = verifier(item);
    results.push({ id: item.id, verifiable: true, gap_count, remaining_skills, was_status: item.status });
    if (gap_count === 0 && item.status !== 'closed') {
      item.status = 'closed';
      item.closed_at = new Date().toISOString();
      item.verified_gap_count = 0;
    } else if (gap_count > 0) {
      item.status = 'open';
      item.verified_gap_count = gap_count;
      delete item.closed_at;
    }
  }
  writeFileSync(root + '/' + CARRY_FORWARD_PATH, JSON.stringify(data, null, 2) + '\n');
  return results;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const results = apply();
  for (const r of results) {
    if (!r.verifiable) { console.log(`${r.id}: no verifier registered, left as-is`); continue; }
    console.log(`${r.id}: ${r.gap_count} gap(s) remaining${r.gap_count ? ` (${r.remaining_skills.join(', ')})` : ''} — status ${r.gap_count === 0 ? 'closed' : 'open'}`);
  }
}
