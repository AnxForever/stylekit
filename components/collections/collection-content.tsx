"use client";

import { StyleCard } from "@/components/home/style-card";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { useI18n } from "@/lib/i18n/context";
import type { StyleCollection } from "@/lib/styles/collections";
import type { StyleMeta } from "@/lib/styles/meta-types";

interface CollectionContentProps {
  collection: StyleCollection;
  styles: StyleMeta[];
}

export function CollectionContent({ collection, styles }: CollectionContentProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      <header className="mb-10 max-w-3xl">
        <LocalizedLink
          href="/collections"
          className="mb-4 inline-block text-xs uppercase tracking-widest text-muted hover:text-foreground"
        >
          {isZh ? "← 全部合集" : "← All collections"}
        </LocalizedLink>
        <h1 className="text-3xl font-bold md:text-4xl">
          {isZh ? collection.headlineZh : collection.headlineEn}
        </h1>
        <p className="mt-4 text-muted">
          {isZh ? collection.introZh : collection.introEn}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
          <span className="text-muted">
            {isZh
              ? `${styles.length} 个风格`
              : `${styles.length} styles`}
          </span>
          {collection.relatedPromptHref ? (
            <LocalizedLink
              href={collection.relatedPromptHref}
              className="underline underline-offset-4 hover:text-foreground"
            >
              {isZh
                ? collection.relatedPromptLabelZh ?? "相关提示词"
                : collection.relatedPromptLabelEn ?? "Related prompts"}{" "}
              →
            </LocalizedLink>
          ) : null}
        </div>
      </header>

      {styles.length === 0 ? (
        <p className="py-16 text-center text-muted">
          {isZh ? "该合集暂无风格。" : "No styles in this collection yet."}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {styles.map((style) => (
            <StyleCard key={style.slug} style={style} variant="compact" />
          ))}
        </div>
      )}
    </div>
  );
}
