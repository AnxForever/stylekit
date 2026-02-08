import { NextResponse } from "next/server";
import type { LookupAddress } from "node:dns";
import { lookup } from "node:dns/promises";
import net from "node:net";
import {
  extractStyleDraftFromDocument,
  extractStylesheetLinks,
} from "@/lib/style-extractor/url-extractor";

const MAX_HTML_CHARS = 1_500_000;
const MAX_CSS_FILES = 4;
const MAX_CSS_CHARS = 350_000;
const FETCH_TIMEOUT_MS = 12_000;
const MAX_REDIRECTS = 5;
const DNS_LOOKUP_TIMEOUT_MS = 1500;

class BlockedUrlError extends Error {
  readonly name = "BlockedUrlError";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const targetUrl = typeof body?.url === "string" ? body.url.trim() : "";

    if (!targetUrl) {
      return NextResponse.json({ error: "Missing required field: url" }, { status: 400 });
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(targetUrl);
    } catch {
      return NextResponse.json({ error: "Invalid URL format." }, { status: 400 });
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return NextResponse.json({ error: "Only http/https URLs are supported." }, { status: 400 });
    }

    if (isBlockedHostname(parsedUrl.hostname)) {
      return NextResponse.json(
        { error: "Local or private network URLs are not allowed." },
        { status: 400 }
      );
    }

    const html = await fetchText(parsedUrl.toString(), MAX_HTML_CHARS);
    const stylesheetLinks = extractStylesheetLinks(html, parsedUrl.toString())
      .filter((link) => isAllowedRemoteUrl(link))
      .slice(0, MAX_CSS_FILES);

    const cssResults = await Promise.allSettled(
      stylesheetLinks.map((link) => fetchText(link, MAX_CSS_CHARS))
    );
    const cssChunks = cssResults
      .filter((result): result is PromiseFulfilledResult<string> => result.status === "fulfilled")
      .map((result) => result.value);

    const extracted = extractStyleDraftFromDocument({
      url: parsedUrl.toString(),
      html,
      cssChunks,
    });

    return NextResponse.json({
      ok: true,
      url: parsedUrl.toString(),
      extractedAt: new Date().toISOString(),
      draft: extracted.draft,
      raw: extracted.raw,
      evidence: {
        ...extracted.evidence,
        stylesheetRequested: stylesheetLinks.length,
        stylesheetFetched: cssChunks.length,
      },
    });
  } catch (error) {
    if (error instanceof BlockedUrlError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        error: `Failed to extract style from URL: ${(error as Error).message}`,
      },
      { status: 500 }
    );
  }
}

async function fetchText(url: string, maxChars: number): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    let currentUrl = url;
    const visited = new Set<string>();

    for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
      if (visited.has(currentUrl)) {
        throw new Error("Redirect loop detected.");
      }
      visited.add(currentUrl);

      await assertAllowedRemoteUrl(currentUrl);

      const response = await fetch(currentUrl, {
        method: "GET",
        cache: "no-store",
        redirect: "manual",
        signal: controller.signal,
        headers: {
          "user-agent":
            "Mozilla/5.0 (compatible; StyleKitExtractor/1.0; +https://stylekit.top)",
          accept: "text/html, text/css;q=0.9,*/*;q=0.8",
        },
      });

      if (isRedirectStatus(response.status)) {
        const location = response.headers.get("location");
        if (!location) {
          throw new Error(`Upstream redirect missing location header (status ${response.status})`);
        }

        currentUrl = new URL(location, currentUrl).toString();
        continue;
      }

      if (!response.ok) {
        throw new Error(`Upstream request failed with status ${response.status}`);
      }

      const text = await response.text();
      return text.length > maxChars ? text.slice(0, maxChars) : text;
    }

    throw new Error("Too many redirects.");
  } finally {
    clearTimeout(timeoutId);
  }
}

function isAllowedRemoteUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    if (!["http:", "https:"].includes(parsed.protocol)) return false;
    return !isBlockedHostname(parsed.hostname);
  } catch {
    return false;
  }
}

function isBlockedHostname(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local")) {
    return true;
  }
  if (host.endsWith(".internal") || host.endsWith(".lan") || host.endsWith(".home.arpa")) {
    return true;
  }

  const ipVersion = net.isIP(host);
  if (ipVersion === 4) return isBlockedIPv4(host);
  if (ipVersion === 6) return isBlockedIPv6(host);

  return false;
}

function isBlockedIPv4(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return true;

  const [a, b, c] = parts.map((part) => Number(part));
  if ([a, b, c].some((value) => !Number.isFinite(value))) return true;

  if (a === 0) return true; // "this" network
  if (a === 10) return true;
  if (a === 127) return true;
  if (a === 169 && b === 254) return true; // link-local
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT

  // Reserved / non-public ranges commonly used in SSRF payloads
  if (a === 192 && b === 0 && c === 0) return true; // 192.0.0.0/24
  if (a === 192 && b === 0 && c === 2) return true; // TEST-NET-1
  if (a === 198 && (b === 18 || b === 19)) return true; // benchmark testing
  if (a === 198 && b === 51 && c === 100) return true; // TEST-NET-2
  if (a === 203 && b === 0 && c === 113) return true; // TEST-NET-3

  if (a >= 224) return true; // multicast + future/reserved

  return false;
}

function isBlockedIPv6(ip: string): boolean {
  const groups = parseIPv6Groups(ip);
  if (!groups) return true;

  const [g0] = groups;

  const isUnspecified = groups.every((g) => g === 0);
  if (isUnspecified) return true;

  const isLoopback = groups.slice(0, 7).every((g) => g === 0) && groups[7] === 1;
  if (isLoopback) return true;

  // fc00::/7 unique local address
  if ((g0 & 0xfe00) === 0xfc00) return true;
  // fe80::/10 link-local
  if ((g0 & 0xffc0) === 0xfe80) return true;
  // ff00::/8 multicast
  if ((g0 & 0xff00) === 0xff00) return true;

  // IPv4-mapped ::ffff:0:0/96
  if (
    groups[0] === 0 &&
    groups[1] === 0 &&
    groups[2] === 0 &&
    groups[3] === 0 &&
    groups[4] === 0 &&
    groups[5] === 0xffff
  ) {
    const ipv4 = `${groups[6] >> 8}.${groups[6] & 0xff}.${groups[7] >> 8}.${groups[7] & 0xff}`;
    return isBlockedIPv4(ipv4);
  }

  // Documentation range (non-routable)
  if (groups[0] === 0x2001 && groups[1] === 0x0db8) return true;

  return false;
}

function parseIPv6Groups(ip: string): number[] | null {
  const normalized = ip.toLowerCase();

  const hasEmbeddedIPv4 = normalized.includes(".");

  const [leftRaw, rightRaw = ""] = normalized.split("::");
  if (normalized.split("::").length > 2) return null;

  const leftParts = leftRaw ? leftRaw.split(":").filter(Boolean) : [];
  const rightParts = rightRaw ? rightRaw.split(":").filter(Boolean) : [];

  const parts = [...leftParts];

  if (hasEmbeddedIPv4) {
    // IPv4 is always in the last chunk, e.g. ::ffff:127.0.0.1
    const popTarget = rightParts.length > 0 ? rightParts : parts;
    const last = popTarget.pop();
    if (!last) return null;

    const bytes = last.split(".").map((value) => Number(value));
    if (bytes.length !== 4) return null;
    if (bytes.some((b) => !Number.isFinite(b) || b < 0 || b > 255)) return null;

    const hi = ((bytes[0] << 8) | bytes[1]).toString(16);
    const lo = ((bytes[2] << 8) | bytes[3]).toString(16);
    popTarget.push(hi, lo);
  }

  const missing = 8 - (parts.length + rightParts.length);
  if (missing < 0) return null;

  const full = [...parts, ...Array.from({ length: missing }, () => "0"), ...rightParts];
  if (full.length !== 8) return null;

  const groups = full.map((chunk) => {
    if (!/^[0-9a-f]{1,4}$/i.test(chunk)) return NaN;
    return Number.parseInt(chunk, 16);
  });

  return groups.some((g) => !Number.isFinite(g) || g < 0 || g > 0xffff) ? null : groups;
}

function isRedirectStatus(status: number): boolean {
  return status === 301 || status === 302 || status === 303 || status === 307 || status === 308;
}

async function assertAllowedRemoteUrl(value: string): Promise<void> {
  let parsed: URL;

  try {
    parsed = new URL(value);
  } catch {
    throw new BlockedUrlError("Invalid URL format.");
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new BlockedUrlError("Only http/https URLs are supported.");
  }

  if (isBlockedHostname(parsed.hostname)) {
    throw new BlockedUrlError("Local or private network URLs are not allowed.");
  }

  await assertDnsResolvesPublic(parsed.hostname);
}

async function assertDnsResolvesPublic(hostname: string): Promise<void> {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  if (net.isIP(host)) return;

  let results: LookupAddress[];
  try {
    results = await withTimeout(
      lookup(host, { all: true, verbatim: true }),
      DNS_LOOKUP_TIMEOUT_MS
    );
  } catch {
    // If DNS lookup fails/timeouts, let fetch surface the error. This guard is best-effort.
    return;
  }

  for (const entry of results) {
    const address = entry.address;
    const family = net.isIP(address);
    if (family === 4 && isBlockedIPv4(address)) {
      throw new BlockedUrlError("Local or private network URLs are not allowed.");
    }
    if (family === 6 && isBlockedIPv6(address)) {
      throw new BlockedUrlError("Local or private network URLs are not allowed.");
    }
  }
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  try {
    return await Promise.race([
      promise,
      new Promise<T>((_resolve, reject) => {
        timeoutId = setTimeout(() => reject(new Error("Timed out")), timeoutMs);
      }),
    ]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}
