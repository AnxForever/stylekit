"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { thankYouEntries, thankYouModalConfig } from "@/lib/site/support";

const latestEntry = [...thankYouEntries].sort(
  (a, b) => b.date.localeCompare(a.date)
)[0];

const latestReceiptEntries = latestEntry
  ? thankYouEntries.filter((entry) => entry.date === latestEntry.date && entry.receiptImage)
  : [];

const thankYouModalStorageKey = `stylekit-thankyou-modal-dismissed:${
  latestReceiptEntries.map((entry) => entry.id).join(":") || latestEntry?.id || "empty"
}`;

export function ThankYouModal({ showOnHomepageOnly = true }: { showOnHomepageOnly?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useI18n();

  useEffect(() => {
    // 检查是否为首页
    const pathname = window.location.pathname;
    const isHome = pathname === "/" || pathname === "/en" || pathname === "/zh";

    if (showOnHomepageOnly && !isHome) {
      return;
    }

    const isPreview = new URLSearchParams(window.location.search).has("preview");
    const dismissed = isPreview ? null : localStorage.getItem(thankYouModalStorageKey);

    if (!dismissed && latestReceiptEntries.length > 0 && thankYouModalConfig.enabled) {
      const frame = window.requestAnimationFrame(() => setIsOpen(true));
      return () => window.cancelAnimationFrame(frame);
    }
  }, [showOnHomepageOnly]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(thankYouModalStorageKey, Date.now().toString());
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
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-border bg-background p-6 shadow-2xl md:p-8">
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

          {/* 图片区：展示最新一批 receipt */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latestReceiptEntries.map((entry) => (
              <figure
                key={entry.id}
                className="overflow-hidden rounded-2xl border border-border bg-zinc-50 p-3 dark:bg-zinc-900/60"
              >
                <div className="relative h-56 w-full overflow-hidden rounded-xl bg-white sm:h-64">
                  <Image
                    src={entry.receiptImage!}
                    alt={entry.receiptAlt?.[locale] || "Receipt"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                </div>
                {entry.amount ? (
                  <figcaption className="mt-3 text-center text-sm font-medium text-foreground">
                    {entry.amount[locale]}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
