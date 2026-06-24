"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { thankYouEntries, thankYouModalConfig } from "@/lib/site/support";

const latestEntry = [...thankYouEntries].sort(
  (a, b) => b.date.localeCompare(a.date)
)[0];

const thankYouModalStorageKey = `stylekit-thankyou-modal-dismissed:${latestEntry.id}`;

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

    const dismissed = localStorage.getItem(thankYouModalStorageKey);

    if (!dismissed && thankYouEntries.length > 0 && thankYouModalConfig.enabled) {
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
  const celebrationEntry =
    latestEntry.celebrationImage
      ? latestEntry
      : thankYouEntries.find((entry) => entry.celebrationImage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 半透明遮罩 */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* 弹窗内容 */}
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-border bg-background p-6 shadow-2xl md:p-8">
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

          {/* 图片区：单张 receipt 自适应居中 */}
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-center">
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

            {latestEntry.receiptImage ? (
              <figure
                key={latestEntry.id}
                className="shrink-0 overflow-hidden rounded-2xl border border-border bg-zinc-50 p-3 dark:bg-zinc-900/60 max-w-sm"
              >
                <div className="relative w-56 sm:w-64 aspect-[3/4] overflow-hidden rounded-xl bg-white">
                  <Image
                    src={latestEntry.receiptImage}
                    alt={latestEntry.receiptAlt?.[locale] || "Receipt"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 224px, 256px"
                    unoptimized
                  />
                </div>
              </figure>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
