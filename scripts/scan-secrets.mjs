import { readFileSync } from 'node:fs';
import { fail, files, json } from './lib.mjs';

// Real-shaped secret detection, not a bare word grep on "token"/"secret"/"password" (that would be
// mostly false positives across this repo's own vocabulary — "token" is a routing concept here).
// Every pattern below matches a known, structurally-specific credential format.

const PATTERNS = [
  { id: 'aws_access_key_id', regex: /\bAKIA[0-9A-Z]{16}\b/g },
  { id: 'github_token', regex: /\bgh[pousr]_[A-Za-z0-9]{36}\b/g },
  { id: 'google_api_key', regex: /\bAIza[0-9A-Za-z_-]{35}\b/g },
  { id: 'openai_style_key', regex: /\bsk-[A-Za-z0-9]{20,}\b/g },
  { id: 'slack_token', regex: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g },
  { id: 'private_key_block', regex: /-----BEGIN (?:RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY-----/g },
  { id: 'generic_credential_assignment', regex: /\b(?:password|passwd|api[_-]?key|secret|access[_-]?token)\b\s*[:=]\s*["'][^"'\s]{12,}["']/gi },
];

const SKIP_DIR_SEGMENTS = ['/.git/', '/node_modules/', '/__pycache__/', '/reports/', '/.pytest_cache/'];

const allowlist = new Set(json('security/secret-allowlist.json').allowed);
const errors = [];
const paths = files('.', (name, path) => {
  if (SKIP_DIR_SEGMENTS.some((segment) => path.includes(segment))) return false;
  return /\.(mjs|js|json|yaml|yml|md|txt|env|sh|py)$/.test(name);
});

for (const path of paths) {
  if (path.endsWith('security/secret-allowlist.json') || path.endsWith('scripts/scan-secrets.mjs')) continue; // contains the patterns/examples themselves
  let text;
  try { text = readFileSync(path, 'utf8'); } catch { continue; }
  for (const { id, regex } of PATTERNS) {
    for (const match of text.matchAll(regex)) {
      const value = match[0];
      if (allowlist.has(value)) continue;
      errors.push(`SECRET_SCAN: ${path}: possible ${id} — "${value.slice(0, 12)}..." (allowlist the exact string in security/secret-allowlist.json only if this is a deliberate fixture)`);
    }
  }
}

fail(errors);
console.log(`SECRET_SCAN_CLEAN: ${paths.length} files scanned`);
