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
