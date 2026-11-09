"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import {
  thankYouEntries as legacyThankYouEntries,
  thankYouModalConfig,
  type ThankYouEntry,
} from "@/lib/site/support";

/**
 * Shown once per browser per donation batch. The value is the id of the newest
 * acknowledgment the visitor already dismissed, so a later batch opens the
 * dialog again. A legacy "1" from the old boolean flag simply never matches a
 * row id, which gives returning visitors one final thank-you before migrating.
 * Closing the dialog is the only thing that writes this key, so a first visit
 * still gets the thank-you note even when the visitor bounces before the
 * dialog appears.
 */
const DISMISSED_STORAGE_KEY = "stylekit-thank-you-seen";
const OPEN_DELAY_MS = 1200;

export function ThankYouModal({
  showOnHomepageOnly = true,
  entries,
}: {
  showOnHomepageOnly?: boolean;
  entries?: ThankYouEntry[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useI18n();
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
  // Keep the newest six receipts in view across donation batches. The batch
  // acknowledgement continues to follow the newest receipt's id.
  const latestReceiptEntries = useMemo(
    () => sortedReceiptEntries.slice(0, 6),
    [sortedReceiptEntries]
  );
  useEffect(() => {
    const pathname = window.location.pathname;
    const isHome = pathname === "/" || pathname === "/en" || pathname === "/zh";

    if (showOnHomepageOnly && !isHome) return;
    if (!thankYouModalConfig.enabled || !latestBatchId || latestReceiptEntries.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    const forceOpen = params.has("preview") || params.get("support") === "thanks";

    let acknowledgedId: string | null = null;
    try {
      acknowledgedId = window.localStorage.getItem(DISMISSED_STORAGE_KEY);
    } catch {
      // Storage can be unavailable in private mode; keep the notice, don't crash.
    }
    if (!forceOpen && acknowledgedId === latestBatchId) return;

    const timer = window.setTimeout(
      () => setIsOpen(true),
      forceOpen ? 0 : OPEN_DELAY_MS
    );
    return () => window.clearTimeout(timer);
  }, [latestBatchId, latestReceiptEntries.length, showOnHomepageOnly]);

  const handleClose = () => {
    setIsOpen(false);
    if (!thankYouModalConfig.dismissible || !latestBatchId) return;
    try {
      // Remember the batch that was just acknowledged, not a permanent flag.
      window.localStorage.setItem(DISMISSED_STORAGE_KEY, latestBatchId);
    } catch {
      // Ignore storage failures: the dialog closes for this session either way.
    }
  };

  if (!isOpen) return null;

  const config = thankYouModalConfig;
  const celebrationEntry =
    latestEntry?.celebrationImage
      ? latestEntry
      : resolvedEntries.find((entry) => entry.celebrationImage);

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
