import { lookup } from 'node:dns/promises';

// SSRF guard shared by the structural validator (URL shape only) and the operational freshness
// checker (real DNS resolution + redirect-hop checking). A source URL — or anything it redirects
// to — must never resolve to loopback, link-local (includes the 169.254.169.254 cloud metadata
// endpoint), private, or carrier-grade-NAT ranges.

const HOSTNAME_DENYLIST = new Set(['localhost', '0.0.0.0']);

function ipv4InRange(ip, base, maskBits) {
  const toInt = (addr) => addr.split('.').reduce((acc, octet) => (acc << 8) + Number(octet), 0) >>> 0;
  const mask = maskBits === 0 ? 0 : (0xffffffff << (32 - maskBits)) >>> 0;
  return (toInt(ip) & mask) === (toInt(base) & mask);
}

const IPV4_BLOCKED_RANGES = [
  ['127.0.0.0', 8], ['10.0.0.0', 8], ['172.16.0.0', 12], ['192.168.0.0', 16],
  ['169.254.0.0', 16], ['0.0.0.0', 8], ['100.64.0.0', 10],
];

export function isBlockedIp(ip) {
  if (ip.includes(':')) {
    const lower = ip.toLowerCase();
    return lower === '::1' || lower.startsWith('fe80:') || lower.startsWith('fc') || lower.startsWith('fd') || lower.startsWith('::ffff:127.');
  }
  return IPV4_BLOCKED_RANGES.some(([base, bits]) => ipv4InRange(ip, base, bits));
}

export function isBlockedHostname(hostname) {
  const lower = hostname.toLowerCase();
  if (HOSTNAME_DENYLIST.has(lower)) return true;
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(lower) && isBlockedIp(lower)) return true; // literal IPv4 in the URL
  return false;
}

// Structural-only: no network. Catches an obviously unsafe literal URL (localhost, a private IP
// written directly) without resolving DNS — what scripts/validate-network-targets.mjs uses.
export function staticUrlIsSafe(urlString) {
  let parsed;
  try { parsed = new URL(urlString); } catch { return { safe: false, reason: 'not a valid URL' }; }
  if (parsed.protocol !== 'https:') return { safe: false, reason: `scheme must be https, got ${parsed.protocol}` };
  if (parsed.username || parsed.password) return { safe: false, reason: 'URL must not embed credentials' };
  if (isBlockedHostname(parsed.hostname)) return { safe: false, reason: `hostname "${parsed.hostname}" is loopback/private/metadata` };
  return { safe: true };
}

// Resolves DNS for real — what the operational checker uses before every fetch and every redirect hop.
export async function resolvedUrlIsSafe(urlString) {
  const staticCheck = staticUrlIsSafe(urlString);
  if (!staticCheck.safe) return staticCheck;
  const parsed = new URL(urlString);
  try {
    const { address } = await lookup(parsed.hostname);
    if (isBlockedIp(address)) return { safe: false, reason: `"${parsed.hostname}" resolves to ${address}, which is loopback/private/metadata` };
  } catch (error) {
    return { safe: false, reason: `DNS resolution failed: ${error.message}` };
  }
  return { safe: true };
}
