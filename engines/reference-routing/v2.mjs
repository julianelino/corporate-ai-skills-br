import { readFileSync } from 'node:fs';
import { matchWeight, tokenize } from './v1.mjs';

// Router v2 (Task 4): same deterministic token/phrase matcher as v1 (imported, not reforked — the
// Task 1c lexical-boundary protections must never regress) plus four additions, in order of how much
// they're trusted: (1) trigger/anti-trigger matching, unchanged; (2) handle evidence, a fixed weak
// bonus below any real trigger match; (3) namespace consensus, a small bonus when multiple matched
// candidates already agree on a domain; (4) intent/risk/freshness signal *detection*, informational
// only — none of the three affects scoring or the routing decision. See ARCHITECTURE.md "Router v2"
// for why: an intent/domain compatibility matrix would be a guess this task chose not to make.

function loadJson(relativePath) {
  return JSON.parse(readFileSync(new URL(relativePath, import.meta.url), 'utf8'));
}

const POLICY = loadJson('../../knowledge/registry/routing-policy.json');
const INTENTS = loadJson('../../knowledge/registry/intents.json').intents;
const SIGNALS = loadJson('../../knowledge/registry/routing-signals.json');

function detectSignals(queryTokens, lexicon) {
  const found = [];
  for (const [signal, phrases] of Object.entries(lexicon)) {
    if (phrases.some((phrase) => matchWeight(queryTokens, phrase) > 0)) found.push(signal);
  }
  return found;
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

    // Handle evidence: a skill's own declared handles are real data, but weaker than a curated
    // trigger — capped at one fixed bonus regardless of phrase length, never scaled by specificity.
    const handleMatches = (item.handles ?? []).filter((handle) => matchWeight(queryTokens, handle.replace(/-/g, ' ')) > 0);
    const handleBonus = handleMatches.length > 0 ? POLICY.weights.handle_evidence : 0;

    return { item, matched, antiMatched, handleMatches, baseScore: score + handleBonus, excluded: antiMatched.length > 0 };
  });

  const candidates = evaluated.filter(({ matched, handleMatches, excluded }) => (matched.length > 0 || handleMatches.length > 0) && !excluded);

  // Namespace consensus: if two or more distinct, already-matched candidates share a namespace, that
  // namespace has independent corroboration — nudge each of them, not as a silo, just as a tiebreaker.
  const namespaceCounts = new Map();
  for (const { item } of candidates) if (item.namespace) namespaceCounts.set(item.namespace, (namespaceCounts.get(item.namespace) ?? 0) + 1);

  const scored = candidates
    .map(({ item, matched, antiMatched, handleMatches, baseScore }) => {
      const namespaceConsensus = item.namespace && namespaceCounts.get(item.namespace) >= 2;
      const score = baseScore + (namespaceConsensus ? POLICY.weights.namespace_consensus : 0);
      return { item, matched, antiMatched, handleMatches, namespaceConsensus, score };
    })
    .sort((a, b) => b.score - a.score || a.item.skill.localeCompare(b.item.skill));

  const selected = scored.slice(0, 6);
  const contextGuard = scored.length > 6;
  const margin = selected.length >= 2 ? selected[0].score - selected[1].score : Infinity;
  const tied = selected.length >= 2 && margin === 0;
  const insufficientMargin = !tied && selected.length >= 2 && margin < POLICY.thresholds.minimum_margin;
  const ambiguous = contextGuard || tied || insufficientMargin;
  const status = ambiguous ? 'AMBIGUOUS' : selected.length === 0 ? 'NO_MATCH' : 'ROUTED';
  const ambiguityReason = contextGuard ? 'context_guard' : tied ? 'score_tie' : insufficientMargin ? 'insufficient_margin' : undefined;

  return {
    intent,
    status,
    router_contract_version: '2.0',
    primary: status === 'ROUTED' ? selected[0].item.skill : null,
    specialists: selected.map(({ item }) => item.skill),
    context_guard: contextGuard,
    ...(ambiguityReason ? { ambiguity_reason: ambiguityReason } : {}),
    mode: selected.some(({ item }) => ['R4', 'R5', 'R6'].includes(item.risk_ceiling)) ? 'SIMULATE' : 'ANALYZE',
    // Informational only — never fed back into scoring. See the module comment above.
    intent_signals: detectSignals(queryTokens, INTENTS),
    risk_signals: detectSignals(queryTokens, SIGNALS.risk_signals),
    freshness_signals: detectSignals(queryTokens, SIGNALS.freshness_signals),
    debug: Object.fromEntries(evaluated
      .filter(({ matched, antiMatched, handleMatches }) => matched.length > 0 || antiMatched.length > 0 || handleMatches.length > 0)
      .map(({ item, matched, antiMatched, handleMatches }) => {
        const full = scored.find((s) => s.item === item);
        return [item.skill, { matched, anti_matched: antiMatched, handle_matched: handleMatches, namespace: item.namespace ?? null, namespace_consensus: full?.namespaceConsensus ?? false, score: full?.score ?? 0, excluded: antiMatched.length > 0 }];
      })),
  };
}
