import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { root } from './lib.mjs';
import { resolvedUrlIsSafe } from './network-safety.mjs';

const MAX_REDIRECTS = 5;

// SSRF guard: resolves DNS for real (not just URL shape) before every request AND before following
// each redirect hop — a URL that looks like a safe public host can still redirect to a private/
// metadata target, and DNS itself can change between the structural check and request time.
async function safeFetch(startUrl, options) {
  let url = startUrl;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const safety = await resolvedUrlIsSafe(url);
    if (!safety.safe) throw new Error(`blocked network target: ${url} (${safety.reason})`);
    const response = await fetch(url, { ...options, redirect: 'manual' });
    if ([301, 302, 303, 307, 308].includes(response.status) && response.headers.get('location')) {
      url = new URL(response.headers.get('location'), url).href;
      continue;
    }
    return response;
  }
  throw new Error(`too many redirects (>${MAX_REDIRECTS})`);
}

// OPERATIONAL checker: makes real HTTP requests. Not part of `npm run check` / Core (see
// GOVERNANCE.md "Runtime governance" — the Core stays usable with no network). Run explicitly via
// `npm run freshness:check`, by a human or a scheduled CI job (.github/workflows/source-freshness.yml).
//
// It only ever writes `last_checked`, `status`, and `fingerprint` — never `last_verified` and never
// any knowledge/reference content. "I could reach it and it looks the same/different" is not "a
// qualified human confirmed the content is still correct" — those are deliberately different fields,
// set by deliberately different actors.

const REGISTRY_PATH = 'sources/SOURCE_REGISTRY.yaml';
const TIMEOUT_MS = 10000;

// Best-effort noise reduction, not semantic diffing: strips the most common per-request volatility
// (hidden CSRF/session inputs, nonce attributes, long opaque tokens) before hashing.
//
// KNOWN LIMITATION (found running this for real against all 18 registered sources, Task 5): several
// gov.br portal pages (observed: mte, tst, cfc, sefaz) still fingerprint as CHANGED_UNREVIEWED
// between consecutive checks seconds apart with no real content change — they embed rotating
// widgets (news carousels, "last updated" banners) as literal text, not just tokens this heuristic
// strips. Send `etag` in change_detection where a source actually supports it (verified: `sped`
// does; most gov.br portal pages send `Cache-Control: no-store` with no ETag/Last-Modified at all).
// For the rest, treat CHANGED_UNREVIEWED as "worth a look", not "definitely changed" — a human
// confirming via last_verified is exactly the gate this design puts in the way of a false alarm
// becoming an unreviewed "fact". Pointing these registry URLs at a more stable deep link (the actual
// legal-text page instead of the portal homepage) would likely fix most of this, but was not
// researched here — see reliability-hardening.md Task 5's deferred list.
function normalizedFingerprint(text) {
  const normalized = text
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<input[^>]*type=["']hidden["'][^>]*>/gi, '')
    .replace(/\snonce=["'][^"']*["']/gi, '')
    .replace(/\b[a-zA-Z0-9_-]{24,}\b/g, '<token>') // long opaque tokens (session/CSRF ids), not real prose
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
  return createHash('sha256').update(normalized).digest('hex');
}

async function checkOne(source) {
  const fl = source.freshness_lifecycle;
  const now = new Date().toISOString();
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    // Some sites (observed: planalto.gov.br) reject Node's default fetch client identity; a normal
    // browser-like User-Agent is not evasion, it's what curl and every browser already send.
    const response = await safeFetch(source.url, { signal: controller.signal, headers: { 'User-Agent': 'Mozilla/5.0 (compatible; corporate-ai-skills-br-source-check/1.0)' } });
    clearTimeout(timer);
    if (!response.ok) return { id: source.id, outcome: 'UNREACHABLE', detail: `HTTP ${response.status}` };

    // Prefer the server's own ETag when the source declares change_detection: etag and the server
    // actually sends one — a real cache-validation identity beats a heuristic body hash. Fall back to
    // normalized_hash (and note the fallback) if the header isn't present despite the declared mode.
    let fingerprint;
    if (fl.change_detection === 'etag') {
      const etag = response.headers.get('etag');
      if (etag) fingerprint = `etag:${etag}`;
    }
    if (!fingerprint) {
      const text = await response.text();
      fingerprint = `hash:${normalizedFingerprint(text)}`;
    }
    if (fl.fingerprint === null) { fl.fingerprint = fingerprint; fl.last_checked = now; fl.status = 'CURRENT'; return { id: source.id, outcome: 'CURRENT', detail: 'baseline established' }; }
    if (fl.fingerprint === fingerprint) { fl.last_checked = now; if (fl.status !== 'CHANGED_UNREVIEWED') fl.status = 'CURRENT'; return { id: source.id, outcome: fl.status, detail: 'unchanged' }; }
    // Changed: record the new fingerprint so the NEXT check compares against latest, but the status
    // stays CHANGED_UNREVIEWED (sticky) until a human clears it by verifying and updating last_verified.
    fl.fingerprint = fingerprint; fl.last_checked = now; fl.status = 'CHANGED_UNREVIEWED';
    return { id: source.id, outcome: 'CHANGED_UNREVIEWED', detail: 'content fingerprint changed since last check' };
  } catch (error) {
    fl.last_checked = now; fl.status = 'UNREACHABLE';
    return { id: source.id, outcome: 'UNREACHABLE', detail: error.message };
  }
}

export async function checkAll() {
  const registry = JSON.parse(readFileSync(root + '/' + REGISTRY_PATH, 'utf8'));
  const results = [];
  for (const source of registry.sources) {
    if (source.freshness_lifecycle?.mode !== 'monitor') { results.push({ id: source.id, outcome: 'SKIPPED_MANUAL', detail: 'mode=manual, not network-checked' }); continue; }
    results.push(await checkOne(source));
  }
  writeFileSync(root + '/' + REGISTRY_PATH, JSON.stringify(registry, null, 2) + '\n');
  return results;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const results = await checkAll();
  for (const r of results) console.log(`${r.id.padEnd(16)} ${r.outcome.padEnd(20)} ${r.detail}`);
  const changed = results.filter((r) => r.outcome === 'CHANGED_UNREVIEWED');
  if (changed.length) console.log(`\n${changed.length} source(s) changed and need human review: ${changed.map((r) => r.id).join(', ')}`);
}
