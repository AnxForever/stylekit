"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { ThankYouEntry } from "@/lib/site/support";

export function ThankYouList({ entries }: { entries: ThankYouEntry[] }) {
  const { locale } = useI18n();
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  if (entries.length === 0) return null;

  return (
    <section
      id="thank-you-list"
      className="scroll-mt-24 border-t border-border py-10 md:grid md:grid-cols-[200px_minmax(0,1fr)] md:gap-10 md:py-14"
    >
      <div className="mb-4 md:mb-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
          <span className="tabular-nums text-muted/70">03</span>
          <span className="mx-2 text-muted/50">·</span>
          {locale === "zh" ? "鸣谢名单" : "Acknowledgments"}
        </p>
      </div>
      <div>
        <p className="max-w-2xl text-sm leading-6 text-muted">
          {locale === "zh"
            ? "感谢所有支持 StyleKit 维护与开发的朋友们。"
            : "Thank you to everyone who has supported StyleKit's maintenance and development."}
        </p>

        {/* 图片网格 - 只显示收款截图，统一尺寸 */}
        <div className="mt-6 grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="group relative overflow-hidden bg-background"
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
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  unoptimized
                />
              </button>
            )}
          </div>
        ))}
        </div>
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
