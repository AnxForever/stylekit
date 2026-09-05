/**
 * SSRF guard for the extraction service.
 *
 * The service fetches a URL the caller supplies, so it is a textbook SSRF
 * target: an attacker could point it at cloud metadata (169.254.169.254), an
 * internal admin panel, or a database port. Defence has two halves:
 *
 *  1. Resolve the hostname ourselves and reject any resolved address that is
 *     private, loopback, link-local, or otherwise not a public unicast IP.
 *  2. Pin the browser to those vetted addresses (see `hostResolverRules`) so a
 *     DNS-rebinding answer cannot swap in an internal IP after the check.
 */

import { lookup } from "node:dns/promises";
import net from "node:net";

export interface SafeUrlOk {
  ok: true;
  url: string;
  hostname: string;
  /** Vetted addresses, used to pin the browser's DNS. */
  addresses: string[];
}
export interface SafeUrlErr {
  ok: false;
  reason: string;
}
export type SafeUrlResult = SafeUrlOk | SafeUrlErr;

/** True for any address the service must never connect to. */
export function isBlockedIp(ip: string): boolean {
  const kind = net.isIP(ip);
  if (kind === 4) return isBlockedIpv4(ip);
  if (kind === 6) return isBlockedIpv6(ip);
  return true; // not an IP literal: refuse rather than guess
}

function isBlockedIpv4(ip: string): boolean {
  const parts = ip.split(".").map((p) => Number(p));
  if (parts.length !== 4 || parts.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) {
    return true;
  }
  const [a, b] = parts;
  if (a === 0) return true; // 0.0.0.0/8 "this host"
  if (a === 10) return true; // private
  if (a === 127) return true; // loopback
  if (a === 169 && b === 254) return true; // link-local incl. cloud metadata
  if (a === 172 && b >= 16 && b <= 31) return true; // private
  if (a === 192 && b === 168) return true; // private
  if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT 100.64/10
  if (a === 192 && b === 0) return true; // 192.0.0/24 + 192.0.2/24 test
  if (a === 198 && (b === 18 || b === 19)) return true; // benchmarking
  if (a === 198 && b === 51) return true; // 198.51.100/24 test
  if (a === 203 && b === 0) return true; // 203.0.113/24 test
  if (a >= 224) return true; // multicast + reserved + 255.255.255.255
  return false;
}

function isBlockedIpv6(ip: string): boolean {
  const lower = ip.toLowerCase();
  if (lower === "::1" || lower === "::") return true; // loopback / unspecified
  if (lower.startsWith("fe80")) return true; // link-local
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true; // unique-local fc00::/7
  if (lower.startsWith("ff")) return true; // multicast
  // IPv4-mapped (::ffff:a.b.c.d) — reuse the v4 rules on the tail.
  const mapped = lower.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isBlockedIpv4(mapped[1]);
  return false;
}

/**
 * Validate a caller-supplied URL and resolve it to vetted public addresses.
 * Returns every resolved address so the browser can be pinned to them.
 */
export async function assertSafeUrl(raw: string): Promise<SafeUrlResult> {
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return { ok: false, reason: "invalid-url" };
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { ok: false, reason: "protocol-not-allowed" };
  }
  if (parsed.username || parsed.password) {
    return { ok: false, reason: "credentials-not-allowed" };
  }

  const hostname = parsed.hostname;
  // A bare IP literal in the URL is checked directly.
  if (net.isIP(hostname)) {
    if (isBlockedIp(hostname)) return { ok: false, reason: "blocked-address" };
    return { ok: true, url: parsed.toString(), hostname, addresses: [hostname] };
  }

  let resolved: { address: string }[];
  try {
    resolved = await lookup(hostname, { all: true });
  } catch {
    return { ok: false, reason: "dns-failed" };
  }
  if (!resolved.length) return { ok: false, reason: "dns-empty" };

  const addresses = resolved.map((r) => r.address);
  // Every resolved address must be public: one internal answer is enough to
  // abuse, and we cannot know which the browser would pick.
  for (const address of addresses) {
    if (isBlockedIp(address)) return { ok: false, reason: "blocked-address" };
  }

  return { ok: true, url: parsed.toString(), hostname, addresses };
}

/**
 * Chromium `--host-resolver-rules` value that pins the hostname to the vetted
 * addresses, so the browser's own DNS lookup cannot rebind to an internal IP
 * between our check and the navigation.
 */
export function hostResolverRules(hostname: string, addresses: string[]): string {
  if (!addresses.length || net.isIP(hostname)) return "";
  // MAP <host> <ip> forces resolution; only the first address is used by Chrome.
  return `MAP ${hostname} ${addresses[0]}`;
}
