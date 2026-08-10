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

// Entries recorded within a week of the newest one count as the same donation
// batch and celebrate together (screenshots usually arrive in clusters).
const RECENT_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

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
  const latestReceiptEntries = useMemo(
    () =>
      latestEntry
        ? sortedReceiptEntries
            .filter(
              (entry) =>
                Date.parse(latestEntry.date) - Date.parse(entry.date) <= RECENT_WINDOW_MS
            )
            .slice(0, 6)
        : [],
    [latestEntry, sortedReceiptEntries]
  );
  const thankYouModalStorageKey = latestEntry
    ? `stylekit-thankyou-modal-dismissed:${latestEntry.id}`
    : "stylekit-thankyou-modal-dismissed";

  useEffect(() => {
    // 检查是否为首页
    const pathname = window.location.pathname;
    const isHome = pathname === "/" || pathname === "/en" || pathname === "/zh";

    if (showOnHomepageOnly && !isHome) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const forceOpen = params.has("preview") || params.get("support") === "thanks";
    let dismissed: string | null = null;
    try {
      dismissed = forceOpen ? null : localStorage.getItem(thankYouModalStorageKey);
    } catch {
      dismissed = null;
    }

    if (!dismissed && latestReceiptEntries.length > 0 && thankYouModalConfig.enabled) {
      const frame = window.requestAnimationFrame(() => setIsOpen(true));
      return () => window.cancelAnimationFrame(frame);
    }
  }, [latestReceiptEntries.length, showOnHomepageOnly, thankYouModalStorageKey]);

  const handleClose = () => {
    setIsOpen(false);
    try {
      localStorage.setItem(thankYouModalStorageKey, Date.now().toString());
    } catch {
      // Storage unavailable (private mode): the modal simply shows again next visit.
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
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-border bg-background p-6 shadow-2xl md:p-8"
      >
        {/* 关闭按钮 */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/20 transition-colors"
          aria-label={locale === "zh" ? "关闭" : "Close"}
        >
          <X className="w-5 h-5" />
        </button>

        {/* 内容区域 */}
        <div className="flex flex-col gap-6">
          {/* 文字 */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {config.title[locale]}
            </h2>
            <p className="text-base text-muted leading-7">
              {config.description[locale]}
            </p>
          </div>

          {/* 图片区：表情包 + 本批全部收款截图 */}
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:items-start sm:justify-center">
            {celebrationEntry?.celebrationImage ? (
              <div className="shrink-0 flex justify-center">
                <Image
                  src={celebrationEntry.celebrationImage}
                  alt={celebrationEntry.celebrationAlt?.[locale] || "Thank you"}
                  width={200}
                  height={200}
                  className="w-36 h-36 sm:w-44 sm:h-44 object-contain"
                  unoptimized
                />
              </div>
            ) : null}

            {latestReceiptEntries.map((entry) => (
              <figure
                key={entry.id}
                className="shrink-0 overflow-hidden rounded-2xl border border-border bg-zinc-50 p-3 dark:bg-zinc-900/60 max-w-sm"
              >
                <div className="relative w-56 sm:w-64 aspect-[3/4] overflow-hidden rounded-xl bg-white">
                  <Image
                    src={entry.receiptImage!}
                    alt={entry.receiptAlt?.[locale] || "Receipt"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 224px, 256px"
                    unoptimized
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
