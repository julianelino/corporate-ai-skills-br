import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { files, json, root } from './lib.mjs';

// Builds source -> skill dependency from what skills/**/sources.md actually reference (backtick-quoted
// SOURCE_REGISTRY ids), not an invented mapping — the same discipline as Task 3's critical-topics.yaml.
// A source's freshness_lifecycle.status combined with this map tells you which skills are
// *potentially* impacted by a change; it never claims they are actually wrong.

const registry = json('sources/SOURCE_REGISTRY.yaml');
const registryIds = new Set(registry.sources.map((s) => s.id));

export function buildImpactMap() {
  const sourcesFiles = files('skills', (name) => name === 'sources.md');
  const impactedBy = new Map(); // sourceId -> [skillName]
  for (const path of sourcesFiles) {
    const skillName = path.split('/').slice(-2, -1)[0];
    const text = readFileSync(path, 'utf8');
    const referenced = new Set((text.match(/`([a-z0-9-]+)`/g) ?? []).map((m) => m.slice(1, -1)).filter((id) => registryIds.has(id)));
    for (const id of referenced) (impactedBy.get(id) ?? impactedBy.set(id, []).get(id)).push(skillName);
  }
  return impactedBy;
}

function printReport() {
  const impactedBy = buildImpactMap();
  const byStatus = {};
  for (const s of registry.sources) (byStatus[s.freshness_lifecycle?.status ?? 'UNKNOWN'] ??= []).push(s);

  console.log('SOURCE FRESHNESS\n');
  console.log(`Sources monitored: ${registry.sources.filter((s) => s.freshness_lifecycle?.mode === 'monitor').length}/${registry.sources.length}`);
  for (const status of ['CURRENT', 'CHANGED_UNREVIEWED', 'STALE', 'UNREACHABLE', 'UNKNOWN', 'SUPERSEDED', 'HISTORICAL']) {
    const list = byStatus[status] ?? [];
    if (!list.length) continue;
    console.log(`  ${status.padEnd(20)} ${list.length}  (${list.map((s) => s.id).join(', ')})`);
  }
  const manual = registry.sources.filter((s) => s.freshness_lifecycle?.mode === 'manual');
  console.log(`  Manual review only  ${manual.length}  (${manual.map((s) => s.id).join(', ')})`);

  const needsAttention = registry.sources.filter((s) => ['CHANGED_UNREVIEWED', 'STALE', 'UNREACHABLE'].includes(s.freshness_lifecycle?.status));
  if (needsAttention.length) {
    console.log('\nPotentially impacted skills:');
    for (const s of needsAttention) {
      const skills = impactedBy.get(s.id) ?? [];
      console.log(`  ${s.id} (${s.freshness_lifecycle.status}): ${skills.length ? skills.join(', ') : '(no skill references this source id in sources.md)'}`);
    }
  } else {
    console.log('\nNo source currently flagged CHANGED_UNREVIEWED, STALE, or UNREACHABLE.');
  }
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) printReport();
