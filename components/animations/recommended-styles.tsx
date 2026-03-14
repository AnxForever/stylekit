"use client";

import Link from "next/link";
import { getStyleMetaBySlug } from "@/lib/styles/meta";
import { useI18n } from "@/lib/i18n/context";

interface RecommendedStylesProps {
  slugs: string[];
}

export function RecommendedStyles({ slugs }: RecommendedStylesProps) {
  const { t, locale } = useI18n();
  const styles = slugs
    .map((slug) => getStyleMetaBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => s !== undefined);

  if (styles.length === 0) return null;

  return (
    <>
      <h2 className="text-xs tracking-widest uppercase text-muted mb-4">
        {t("animations.recommendedStyles")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border border border-border">
        {styles.slice(0, 3).map((style) => (
          <Link
            key={style.slug}
            href={`/styles/${style.slug}`}
            className="group bg-background p-4 hover:bg-muted/20 transition-colors"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div
                className="w-3 h-3 border border-border"
                style={{ backgroundColor: style.colors.primary }}
              />
              <h3 className="text-sm group-hover:text-accent transition-colors">
                {locale === "zh" ? style.name : style.nameEn}
              </h3>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-muted">
              {style.styleType}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
