import { readFileSync } from 'node:fs';
import { fail, files } from './lib.mjs';

// Least-privilege check for GitHub Actions workflows. No YAML parser dependency (Core stays
// dependency-free) — a small line-based reader is enough for a top-level `permissions:` block.
// Every workflow must declare one explicitly (an absent block relies on the repo's ambient default,
// which is not visible or auditable from this file). Anything beyond `contents: read` must be a
// named, justified exception here — not silently granted.

const EXCEPTIONS = {
  // .github/workflows/source-freshness.yml opens a review issue when a source changes; it needs to
  // write issues and nothing else. See ARCHITECTURE.md "Freshness lifecycle".
  'source-freshness.yml': { issues: 'write' },
};

function extractPermissions(text) {
  const lines = text.split('\n');
  const startIndex = lines.findIndex((line) => /^permissions:\s*$/.test(line));
  if (startIndex === -1) return null;
  const perms = {};
  for (let i = startIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^\S/.test(line)) break; // back to column 0: permissions block ended
    const match = /^\s+(\w[\w-]*):\s*(\w+)\s*$/.exec(line);
    if (match) perms[match[1]] = match[2];
  }
  return perms;
}

const errors = [];
for (const path of files('.github/workflows', (name) => name.endsWith('.yml') || name.endsWith('.yaml'))) {
  const name = path.split('/').pop();
  const text = readFileSync(path, 'utf8');
  const perms = extractPermissions(text);
  if (!perms) { errors.push(`CI_PERMISSIONS: ${name} has no top-level permissions: block (relies on an invisible ambient default)`); continue; }
  const allowed = { contents: 'read', ...(EXCEPTIONS[name] ?? {}) };
  for (const [scope, level] of Object.entries(perms)) {
    if (allowed[scope] !== level) errors.push(`CI_PERMISSIONS: ${name} grants ${scope}: ${level}, not in the allowed set for this workflow (${JSON.stringify(allowed)})`);
  }
}

fail(errors);
console.log('CI_PERMISSIONS_VALID');
