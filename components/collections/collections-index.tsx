"use client";

import { LocalizedLink } from "@/components/i18n/localized-link";
import { useI18n } from "@/lib/i18n/context";
import type { StyleCollection } from "@/lib/styles/collections";

interface CollectionsIndexProps {
  collections: Array<{ collection: StyleCollection; count: number }>;
}

export function CollectionsIndex({ collections }: CollectionsIndexProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      <header className="mb-10 max-w-3xl">
        <p className="mb-2 text-xs uppercase tracking-widest text-muted">
          {isZh ? "主题合集" : "Collections"}
        </p>
        <h1 className="text-3xl font-bold md:text-4xl">
          {isZh ? "按主题浏览设计风格" : "Browse Design Styles by Theme"}
        </h1>
        <p className="mt-4 text-muted">
          {isZh
            ? "把 130+ 种设计风格按用途与美学聚合成主题合集——暗色模式、复古、二次元、游戏 UI 等，帮你从意图直达合适的风格。"
            : "130+ design styles grouped into themed collections — dark mode, retro, anime, game UI, and more — so you can go from intent to the right style fast."}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map(({ collection, count }) => (
          <LocalizedLink
            key={collection.slug}
            href={`/collections/${collection.slug}`}
            className="group flex flex-col border border-border p-6 transition-colors hover:border-foreground"
          >
            <h2 className="text-xl font-semibold group-hover:underline">
              {isZh ? collection.titleZh : collection.titleEn}
            </h2>
            <p className="mt-2 flex-1 text-sm text-muted">
              {isZh ? collection.introZh : collection.introEn}
            </p>
            <span className="mt-4 text-xs uppercase tracking-wider text-muted">
              {isZh ? `${count} 个风格 →` : `${count} styles →`}
            </span>
          </LocalizedLink>
        ))}
      </div>
    </div>
  );
}
