import { fail, json } from './lib.mjs';

// Structural validation for the Router v2 policy files. Never checks routing outcomes (that's
// scripts/run-static-evals.mjs / router-compare.mjs) — only that the policy itself is well-formed,
// so a typo here fails fast instead of silently producing a zero-weight or a broken trigger.

const errors = [];

const policy = json('knowledge/registry/routing-policy.json');
for (const key of ['exact_phrase_per_token', 'exact_token', 'prefix', 'handle_evidence', 'namespace_consensus']) {
  const value = policy.weights?.[key];
  if (typeof value !== 'number' || value < 0) errors.push(`ROUTING_POLICY: weights.${key} must be a non-negative number, got ${JSON.stringify(value)}`);
}
if (typeof policy.thresholds?.minimum_margin !== 'number' || policy.thresholds.minimum_margin < 0) errors.push('ROUTING_POLICY: thresholds.minimum_margin must be a non-negative number');

const intents = json('knowledge/registry/intents.json').intents;
for (const [name, phrases] of Object.entries(intents ?? {})) {
  if (!Array.isArray(phrases) || phrases.length === 0) errors.push(`ROUTING_POLICY: intent ${name} has no phrases`);
  for (const phrase of phrases ?? []) if (typeof phrase !== 'string' || !phrase.trim()) errors.push(`ROUTING_POLICY: intent ${name} has an empty/invalid phrase`);
}

const signals = json('knowledge/registry/routing-signals.json');
for (const group of ['risk_signals', 'freshness_signals']) {
  for (const [name, phrases] of Object.entries(signals[group] ?? {})) {
    if (!Array.isArray(phrases) || phrases.length === 0) errors.push(`ROUTING_POLICY: ${group}.${name} has no phrases`);
  }
}

const triggers = json('knowledge/registry/routing-triggers.yaml').skills;
for (const entry of triggers) {
  for (const trigger of entry.triggers ?? []) {
    if (trigger.endsWith('*') && trigger.slice(0, -1).trim() === '') errors.push(`ROUTING_POLICY: ${entry.skill} has an empty prefix trigger "*"`);
  }
  const triggerSet = new Set(entry.triggers ?? []);
  for (const anti of entry.anti_triggers ?? []) {
    if (triggerSet.has(anti)) errors.push(`ROUTING_POLICY: ${entry.skill} has "${anti}" in both triggers and anti_triggers — it can never match`);
  }
}

fail(errors);
console.log('ROUTING_POLICY_VALID');
