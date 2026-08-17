import { readFileSync } from 'node:fs';

export function route(intent, registryPath = new URL('../../knowledge/registry/capability-registry.yaml', import.meta.url)) {
  const registry = JSON.parse(readFileSync(registryPath, 'utf8'));
  const query = intent.toLowerCase();
  const matches = registry.capabilities.map((item) => ({ item, score: item.triggers.filter((trigger) => query.includes(trigger.toLowerCase())).length })).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score || a.item.skill.localeCompare(b.item.skill));
  const selected = matches.slice(0, 6).map(({ item }) => item);
  return { intent, primary: selected[0]?.skill ?? 'corporate-router', specialists: selected.map((item) => item.skill).length ? selected.map((item) => item.skill) : ['corporate-router'], context_guard: matches.length > 6, mode: selected.some((item) => ['R4', 'R5', 'R6'].includes(item.risk_ceiling)) ? 'SIMULATE' : 'ANALYZE' };
}
