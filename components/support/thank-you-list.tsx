"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { thankYouEntries } from "@/lib/site/support";

export function ThankYouList() {
  const { locale } = useI18n();
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  if (thankYouEntries.length === 0) return null;

  return (
    <section id="thank-you-list" className="grid gap-6">
      {/* 标题 */}
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.28em] text-muted">
          {locale === "zh" ? "鸣谢名单" : "Acknowledgments"}
        </p>
        <p className="mt-3 text-base leading-7 text-muted md:text-lg">
          {locale === "zh"
            ? "感谢所有支持 StyleKit 维护与开发的朋友们。"
            : "Thank you to everyone who has supported StyleKit's maintenance and development."}
        </p>
      </div>

      {/* 图片网格 - 只显示收款截图，统一尺寸 */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {thankYouEntries.map((entry) => (
          <div
            key={entry.id}
            className="group relative overflow-hidden rounded-[28px] border border-border bg-background shadow-sm transition-all hover:shadow-md"
          >
            {/* 只显示收款截图 - 固定宽高比 */}
            {entry.receiptImage && (
              <button
                onClick={() => setLightboxImage(entry.receiptImage!)}
                className="relative aspect-square w-full overflow-hidden bg-muted/5 transition-opacity hover:opacity-95"
              >
                <Image
                  src={entry.receiptImage}
                  alt={entry.receiptAlt?.[locale] || "Receipt"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  unoptimized
                />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox 模态框 */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <Image
              src={lightboxImage}
              alt="Receipt detail"
              fill
              className="object-contain"
              sizes="90vw"
              unoptimized
            />
          </div>
        </div>
      )}
    </section>
  );
}
