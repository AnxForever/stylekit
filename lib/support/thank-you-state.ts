import type { SupportLocaleCopy, ThankYouEntry, ThankYouModalConfig } from "@/lib/site/support";

function copyWithFallback(copy: SupportLocaleCopy | undefined, fallback: string) {
  return { en: copy?.en || fallback, zh: copy?.zh || fallback };
}

/** Content identity, not a security hash. Ignore row IDs and incidental row order. */
export function getThankYouContentVersion(
  receipts: ThankYouEntry[],
  config: ThankYouModalConfig,
  celebrationEntry: ThankYouEntry | undefined,
): string | null {
  if (receipts.length === 0) return null;
  const content = JSON.stringify({
    title: copyWithFallback(config.title, ""),
    description: copyWithFallback(config.description, ""),
    receipts: receipts.map((entry) => JSON.stringify({
      date: entry.date,
      image: entry.receiptImage,
      alt: copyWithFallback(entry.receiptAlt, "Receipt"),
    })).sort(),
    celebration: celebrationEntry?.celebrationImage ? {
      image: celebrationEntry.celebrationImage,
      alt: copyWithFallback(celebrationEntry.celebrationAlt, "Thank you"),
    } : null,
  });
  let hash = 0x811c9dc5;
  for (let index = 0; index < content.length; index += 1) {
    hash = Math.imul(hash ^ content.charCodeAt(index), 0x01000193) >>> 0;
  }
  return "thank-you-v1:" + content.length + ":" + hash.toString(16);
}

/**
 * Dismissals live in localStorage, but restricted contexts (private windows,
 * in-app webviews, blocked site storage) can make reads/writes throw or drop
 * the value. A first-party cookie is the fallback so a closed notice stays
 * closed; the value is the same content version, so it still reopens when the
 * notice content changes.
 */
export const THANK_YOU_VERSION_COOKIE = "sk-thank-you-version";
const THANK_YOU_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export function parseThankYouCookie(cookieHeader: string): string | null {
  for (const part of cookieHeader.split(";")) {
    const separator = part.indexOf("=");
    if (separator < 0) continue;
    if (part.slice(0, separator).trim() !== THANK_YOU_VERSION_COOKIE) continue;
    const value = part.slice(separator + 1).trim();
    try {
      return decodeURIComponent(value) || null;
    } catch {
      return value || null;
    }
  }
  return null;
}

export function serializeThankYouCookie(version: string): string {
  return `${THANK_YOU_VERSION_COOKIE}=${encodeURIComponent(version)}; path=/; max-age=${THANK_YOU_COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
}

/** Consume only this dialog's explicit request; preserve attribution and anchors. */
export function withoutThankYouRequest(href: string): string | null {
  const url = new URL(href);
  let changed = false;
  if (url.searchParams.has("preview")) {
    url.searchParams.delete("preview");
    changed = true;
  }
  if (url.searchParams.get("support") === "thanks") {
    url.searchParams.delete("support");
    changed = true;
  }
  return changed ? url.pathname + url.search + url.hash : null;
}
