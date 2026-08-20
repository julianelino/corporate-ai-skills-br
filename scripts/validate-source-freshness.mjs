import { fail, json } from './lib.mjs';

// Structural gate only: shape and internal consistency of freshness_lifecycle, never content
// correctness. It never asserts a source *is* current — only that its record is well-formed. Actually
// checking reachability/change is scripts/check-source-freshness.mjs (operational, not in npm run check).

const MODES = new Set(['monitor', 'manual']);
const STATUSES = new Set(['UNKNOWN', 'CURRENT', 'CHANGED_UNREVIEWED', 'STALE', 'UNREACHABLE', 'SUPERSEDED', 'HISTORICAL']);
const CRITICALITIES = new Set(['critical', 'standard']);
const DETECTION_MODES = new Set(['etag', 'last_modified', 'normalized_hash', 'manual']);
const ISO_DATE = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?Z)?$/;

const registry = json('sources/SOURCE_REGISTRY.yaml');
const ids = new Set(registry.sources.map((s) => s.id));
const errors = [];

for (const source of registry.sources) {
  const fl = source.freshness_lifecycle;
  if (!fl) { errors.push(`SOURCE_FRESHNESS: ${source.id} has no freshness_lifecycle`); continue; }

  if (!MODES.has(fl.mode)) errors.push(`SOURCE_FRESHNESS: ${source.id} invalid mode "${fl.mode}"`);
  if (!STATUSES.has(fl.status)) errors.push(`SOURCE_FRESHNESS: ${source.id} invalid status "${fl.status}"`);
  if (!CRITICALITIES.has(fl.criticality)) errors.push(`SOURCE_FRESHNESS: ${source.id} invalid criticality "${fl.criticality}"`);
  if (!DETECTION_MODES.has(fl.change_detection)) errors.push(`SOURCE_FRESHNESS: ${source.id} invalid change_detection "${fl.change_detection}"`);
  if (!(Number.isInteger(fl.review_interval_days) && fl.review_interval_days > 0)) errors.push(`SOURCE_FRESHNESS: ${source.id} review_interval_days must be a positive integer`);

  for (const field of ['last_checked', 'last_verified', 'effective_from', 'effective_until']) {
    const value = fl[field];
    if (value !== null && !ISO_DATE.test(value)) errors.push(`SOURCE_FRESHNESS: ${source.id}.${field} must be null or an ISO date, got ${JSON.stringify(value)}`);
  }
  if (fl.effective_from && fl.effective_until && fl.effective_from > fl.effective_until) errors.push(`SOURCE_FRESHNESS: ${source.id} effective_from is after effective_until`);

  for (const field of ['supersedes', 'superseded_by']) {
    const target = fl[field];
    if (target !== null && !ids.has(target)) errors.push(`SOURCE_FRESHNESS: ${source.id}.${field} references unknown source "${target}"`);
  }
  if (fl.status === 'SUPERSEDED' && !fl.superseded_by) errors.push(`SOURCE_FRESHNESS: ${source.id} is SUPERSEDED but has no superseded_by`);

  if (fl.mode === 'monitor' && fl.change_detection === 'manual') errors.push(`SOURCE_FRESHNESS: ${source.id} is mode=monitor but change_detection=manual — pick a real detection mode or switch to mode=manual`);
}

fail(errors);
console.log(`SOURCE_FRESHNESS_VALID: ${registry.sources.length} sources`);
