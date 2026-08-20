import { fail, json } from './lib.mjs';
import { contracts } from './build-capability-registry.mjs';

// Structural policy gate: fails npm run check on a malformed or inconsistent profile assignment.
// It does NOT check whether a skill actually meets its profile's requirements (missing sources,
// too few behavioral cases, human review still pending, ...) — that is readiness, a separate concept
// (scripts/report-release-readiness.mjs), and readiness gaps must not break normal development CI.

const PROFILES = json('knowledge/registry/quality-profiles.yaml').profiles;
const NAMESPACES = new Set(json('knowledge/registry/namespaces.yaml').namespaces);
const FRESHNESS_ORDER = { static: 0, conditional: 1, critical: 2 };
const HUMAN_REVIEW_STATUSES = new Set(['not_required', 'pending', 'in_review', 'approved', 'changes_requested', 'stale', 'expired']);

const errors = [];
for (const contract of contracts()) {
  const profileName = contract.quality_profile;
  if (!profileName || !(profileName in PROFILES)) { errors.push(`QUALITY_PROFILE: ${contract.name} has no valid quality_profile`); continue; }
  const profile = PROFILES[profileName];

  if (['R5', 'R6'].includes(contract.risk_ceiling) && !['critical', 'high'].includes(profileName)) {
    errors.push(`QUALITY_PROFILE: ${contract.name} is ${contract.risk_ceiling} but classified ${profileName} (must be critical or high)`);
  }

  const namespace = contract.routing?.namespace;
  if (namespace && !NAMESPACES.has(namespace)) errors.push(`QUALITY_PROFILE: ${contract.name} has namespace "${namespace}" not in knowledge/registry/namespaces.yaml (typo, or add it there deliberately)`);

  if (profile.freshness_min) {
    const min = FRESHNESS_ORDER[profile.freshness_min];
    const actual = FRESHNESS_ORDER[contract.freshness];
    if (actual === undefined || actual < min) errors.push(`QUALITY_PROFILE: ${contract.name} (${profileName}) freshness "${contract.freshness}" is below the profile minimum "${profile.freshness_min}"`);
  }

  if (profile.human_review?.requirement === 'required') {
    const review = contract.human_review;
    if (!review || !HUMAN_REVIEW_STATUSES.has(review.status)) errors.push(`QUALITY_PROFILE: ${contract.name} (${profileName}) requires a human_review block with a valid status`);
  }

  for (const override of contract.quality_overrides ?? []) {
    const relaxes = [false, 0, 'none', 'not_required'].includes(override.value);
    if (relaxes && !override.reason) errors.push(`QUALITY_PROFILE: ${contract.name} relaxes ${override.dimension ?? '(unknown)'} without a reason`);
  }
}

fail(errors);
console.log(`QUALITY_PROFILE_VALID: ${contracts().length} skills`);
