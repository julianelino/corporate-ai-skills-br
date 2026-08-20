import { readFileSync } from 'node:fs';

// FROZEN as of Router v2 (Task 4). This is the Task 1c matcher, preserved verbatim as the
// regression baseline for engines/reference-routing/v2.mjs — see scripts/router-compare.mjs.
// Do not add features here; add them to v2.mjs instead.

// Weight of a prefix ("pay*") match: deliberately below any exact single-token match (1), because a
// prefix is a fuzzier, more generic signal and should not out-rank or tie a precise word/phrase.
const PREFIX_MATCH_WEIGHT = 0.5;

// Trigger matching is token/phrase-boundary, not bare substring: "ted" no longer matches inside
// "repeated", "iss" no longer matches inside "dismissal". A trailing "*" is the explicit, opt-in
// escape hatch for a prefix match (e.g. "pay*" also catches "payment", "payable", "paying").
export function normalize(text) {
  return text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

export function tokenize(text) {
  const normalized = normalize(text);
  return normalized ? normalized.split(' ') : [];
}

// Returns the match weight (0 = no match). An exact trigger's weight is its token count, so a
// longer, more specific phrase outscores a short generic word instead of counting both as "one match".
export function matchWeight(queryTokens, trigger) {
  if (trigger.endsWith('*')) {
    const prefix = normalize(trigger.slice(0, -1));
    return prefix && queryTokens.some((token) => token.startsWith(prefix)) ? PREFIX_MATCH_WEIGHT : 0;
  }
  const triggerTokens = tokenize(trigger);
  if (triggerTokens.length === 0) return 0;
  for (let i = 0; i + triggerTokens.length <= queryTokens.length; i++) {
    if (triggerTokens.every((token, j) => queryTokens[i + j] === token)) return triggerTokens.length;
  }
  return 0;
}

export function route(intent, registryPath = new URL('../../knowledge/registry/capability-registry.generated.yaml', import.meta.url)) {
  const registry = JSON.parse(readFileSync(registryPath, 'utf8'));
  const queryTokens = tokenize(intent);

  const evaluated = registry.capabilities.map((item) => {
    let score = 0;
    const matched = [];
    for (const trigger of item.triggers) {
      const weight = matchWeight(queryTokens, trigger);
      if (weight > 0) { matched.push(trigger); score += weight; }
    }
    const antiMatched = (item.anti_triggers ?? []).filter((trigger) => matchWeight(queryTokens, trigger) > 0);
    return { item, matched, antiMatched, score, excluded: antiMatched.length > 0 };
  });

  // A matched anti-trigger excludes the candidate outright, regardless of positive score.
  const scored = evaluated
    .filter(({ matched, excluded }) => matched.length > 0 && !excluded)
    .sort((a, b) => b.score - a.score || a.item.skill.localeCompare(b.item.skill));

  const selected = scored.slice(0, 6);
  const contextGuard = scored.length > 6;
  // Any real score difference, however small, is a confident win. Only an exact tie at the top is ambiguous.
  const tied = selected.length >= 2 && selected[0].score === selected[1].score;
  const status = contextGuard || tied ? 'AMBIGUOUS' : selected.length === 0 ? 'NO_MATCH' : 'ROUTED';
  const ambiguityReason = contextGuard ? 'context_guard' : tied ? 'score_tie' : undefined;

  return {
    intent,
    status,
    router_contract_version: '1.0',
    // AMBIGUOUS never commits to a primary: it names candidates for CONTEXT_GUARD/tie re-evaluation, not a routing decision.
    primary: status === 'ROUTED' ? selected[0].item.skill : null,
    specialists: selected.map(({ item }) => item.skill),
    context_guard: contextGuard,
    ...(ambiguityReason ? { ambiguity_reason: ambiguityReason } : {}),
    mode: selected.some(({ item }) => ['R4', 'R5', 'R6'].includes(item.risk_ceiling)) ? 'SIMULATE' : 'ANALYZE',
    // Debugging aid only; not asserted by any eval. Shows why each candidate matched (or was excluded).
    debug: Object.fromEntries(evaluated.filter(({ matched, antiMatched }) => matched.length > 0 || antiMatched.length > 0).map(({ item, matched, antiMatched, score, excluded }) => [item.skill, { matched, anti_matched: antiMatched, score, excluded }])),
  };
}
