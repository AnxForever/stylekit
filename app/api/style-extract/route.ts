import { NextResponse } from "next/server";
import {
  extractStyleDraftFromDocument,
  extractStylesheetLinks,
} from "@/lib/style-extractor/url-extractor";

const MAX_HTML_CHARS = 1_500_000;
const MAX_CSS_FILES = 4;
const MAX_CSS_CHARS = 350_000;
const FETCH_TIMEOUT_MS = 12_000;

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
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; StyleKitExtractor/1.0; +https://stylekit.top)",
        accept: "text/html, text/css;q=0.9,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      throw new Error(`Upstream request failed with status ${response.status}`);
    }

    const text = await response.text();
    return text.length > maxChars ? text.slice(0, maxChars) : text;
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
  if (host === "::1" || host === "[::1]") return true;
  if (host === "0.0.0.0") return true;

  if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    const [a, b] = host.split(".").map(Number);
    if (a === 10) return true;
    if (a === 127) return true;
    if (a === 192 && b === 168) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 169 && b === 254) return true;
  }

  return false;
}
