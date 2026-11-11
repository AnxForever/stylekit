"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { getThankYouContentVersion, parseThankYouCookie, serializeThankYouCookie, withoutThankYouRequest } from "@/lib/support/thank-you-state";
import {
  thankYouEntries as legacyThankYouEntries,
  thankYouModalConfig,
  type ThankYouEntry,
} from "@/lib/site/support";

/**
 * Keep the legacy row ID for already-open older bundles. The separate content
 * version suppresses repeat visits without suppressing later content updates.
 */
const DISMISSED_STORAGE_KEY = "stylekit-thank-you-seen";
const DISMISSED_VERSION_KEY = "stylekit-thank-you-dismissed-version";
const OPEN_DELAY_MS = 1200;

function readDismissedVersion(): string | null {
  try {
    const stored = window.localStorage.getItem(DISMISSED_VERSION_KEY);
    if (stored) return stored;
  } catch {
    // Fall through to the cookie when site storage is unavailable.
  }
  try {
    return parseThankYouCookie(document.cookie);
  } catch {
    return null;
  }
}

function persistDismissal(version: string, batchId: string) {
  try {
    window.localStorage.setItem(DISMISSED_VERSION_KEY, version);
    window.localStorage.setItem(DISMISSED_STORAGE_KEY, batchId);
  } catch {
    // Restricted storage must not undo a close; the cookie below still records it.
  }
  try {
    document.cookie = serializeThankYouCookie(version);
  } catch {
    // Cookies may be disabled too; the mounted notice still stays closed.
  }
}

export function ThankYouModal({
  showOnHomepageOnly = true,
  entries,
  allowAutomaticOpen = true,
}: {
  showOnHomepageOnly?: boolean;
  entries?: ThankYouEntry[];
  allowAutomaticOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useI18n();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const forceOpen = Boolean(searchParams?.has("preview") || searchParams?.get("support") === "thanks");
  const dismissedVersionRef = useRef<string | null>(null);
  const resolvedEntries = entries ?? legacyThankYouEntries;
  const sortedReceiptEntries = useMemo(
    () =>
      resolvedEntries
        .filter((entry) => entry.receiptImage)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [resolvedEntries]
  );
  const latestEntry = sortedReceiptEntries[0];
  const latestBatchId = latestEntry?.id ?? null;
  // The notice version follows the six receipts that are actually visible.
  const latestReceiptEntries = useMemo(
    () => sortedReceiptEntries.slice(0, 6),
    [sortedReceiptEntries]
  );
  const celebrationEntry =
    latestEntry?.celebrationImage
      ? latestEntry
      : resolvedEntries.find((entry) => entry.celebrationImage);
  const contentVersion = getThankYouContentVersion(
    latestReceiptEntries,
    thankYouModalConfig,
    celebrationEntry,
  );

  useEffect(() => {
    const isHome = pathname === "/" || pathname === "/en" || pathname === "/zh";
    if (showOnHomepageOnly && !isHome) return;
    if (!thankYouModalConfig.enabled || !latestBatchId || !contentVersion) return;
    if (!forceOpen && !allowAutomaticOpen) return;

    let acknowledgedId: string | null = null;
    try {
      acknowledgedId = window.localStorage.getItem(DISMISSED_STORAGE_KEY);
    } catch {
      // The in-component ref still keeps a close action closed if storage fails.
    }
    const dismissedVersion = readDismissedVersion();
    if (!forceOpen) {
      if (dismissedVersionRef.current === contentVersion || dismissedVersion === contentVersion) return;
      if (!dismissedVersion && (acknowledgedId === latestBatchId || acknowledgedId === "1")) {
        // The old boolean cannot identify a batch. Honor that dismissal during
        // migration, then let every later content-version change open normally.
        dismissedVersionRef.current = contentVersion;
        persistDismissal(contentVersion, latestBatchId);
        return;
      }
    }

    const timer = window.setTimeout(() => {
      if (!forceOpen) {
        if (dismissedVersionRef.current === contentVersion) return;
        if (readDismissedVersion() === contentVersion) return;
      }
      // A notice that has appeared counts as delivered. Recording it at open
      // time (not only in handleClose) means closing the tab or the whole site
      // without pressing X still suppresses it until the content changes.
      if (allowAutomaticOpen) {
        dismissedVersionRef.current = contentVersion;
        persistDismissal(contentVersion, latestBatchId);
      }
      setIsOpen(true);
    }, forceOpen ? 0 : OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [allowAutomaticOpen, contentVersion, forceOpen, latestBatchId, pathname, showOnHomepageOnly]);

  // A close in another tab applies here too, so a second open tab does not keep
  // showing a notice the visitor already dismissed.
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === DISMISSED_VERSION_KEY && event.newValue === contentVersion) {
        setIsOpen(false);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [contentVersion]);

  const handleClose = () => {
    dismissedVersionRef.current = contentVersion;
    setIsOpen(false);
    if (thankYouModalConfig.dismissible && latestBatchId && contentVersion && allowAutomaticOpen) {
      persistDismissal(contentVersion, latestBatchId);
    }
    const nextUrl = withoutThankYouRequest(window.location.href);
    if (nextUrl) {
      // Next copies its router state itself. Passing its internal markers would
      // bypass the update that synchronizes useSearchParams with this URL.
      const nextHistoryState = { ...window.history.state };
      delete nextHistoryState.__NA;
      delete nextHistoryState._N;
      window.history.replaceState(nextHistoryState, "", nextUrl);
    }
  };

  if (!isOpen) return null;

  const config = thankYouModalConfig;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 半透明遮罩 */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* 弹窗内容 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={config.title[locale]}
        className="relative flex max-h-[90dvh] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-border bg-background p-5 shadow-2xl sm:p-7"
      >
        {/* 关闭按钮 */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 rounded-full p-2 transition-colors hover:bg-muted/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
          aria-label={locale === "zh" ? "关闭" : "Close"}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex shrink-0 items-start gap-4 pr-8">
          {celebrationEntry?.celebrationImage ? (
            <div className="shrink-0">
              <Image
                src={celebrationEntry.celebrationImage}
                alt={celebrationEntry.celebrationAlt?.[locale] || "Thank you"}
                width={200}
                height={200}
                className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                unoptimized
              />
            </div>
          ) : null}
          <div className="min-w-0 pt-1">
            <h2 className="mb-2 text-xl font-bold sm:text-2xl">
              {config.title[locale]}
            </h2>
            <p className="text-sm leading-6 text-muted">
              {config.description[locale]}
            </p>
          </div>
        </div>

        <div className="mt-5 min-h-0 overflow-y-auto overscroll-contain">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {latestReceiptEntries.map((entry) => (
              <figure
                key={entry.id}
                className="min-w-0 overflow-hidden rounded-2xl border border-border bg-background"
              >
                <a
                  href={entry.receiptImage!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${entry.receiptAlt?.[locale] || "Receipt"} (${entry.date})`}
                  className="relative block aspect-[4/5] overflow-hidden bg-muted/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground/30"
                >
                  <Image
                    src={entry.receiptImage!}
                    alt={entry.receiptAlt?.[locale] || "Receipt"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) calc((100vw - 88px) / 2), 168px"
                    unoptimized
                  />
                </a>
                <figcaption className="border-t border-border px-3 py-2 text-center text-xs text-muted">
                  {entry.date}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <p className="mt-3 shrink-0 text-center text-xs text-muted">
          {locale === "zh" ? "点击截图查看原图" : "Select a receipt to view its original image"}
        </p>
      </div>
    </div>
  );
}
