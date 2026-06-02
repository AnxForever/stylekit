"use client";

import { useI18n } from "@/lib/i18n/context";
import type { VocabularyCategory } from "@/lib/animations/vocabulary";
import { VocabularyTermCard } from "./vocabulary-term";

interface VocabularyCategorySectionProps {
  category: VocabularyCategory;
  validSlugs: Set<string>;
}

/**
 * One section of the vocabulary page: a heading with the category
 * blurb followed by a 1- or 2-column grid of term cards (1 col on
 * mobile, 2 on desktop).
 */
export function VocabularyCategorySection({
  category,
  validSlugs,
}: VocabularyCategorySectionProps) {
  const { t, locale } = useI18n();
  const anchorId = `vocab-${category.id}`;

  return (
    <section id={anchorId} className="scroll-mt-32">
      <header className="mx-auto max-w-5xl mb-6 md:mb-8">
        <div className="flex items-baseline gap-3 mb-2">
          <h2 className="text-2xl md:text-3xl font-serif tracking-tight">
            {t(category.nameKey)}
          </h2>
          <span className="text-xs uppercase tracking-[0.18em] text-muted">
            {category.terms.length}{" "}
            {locale === "zh" ? "个术语" : "terms"}
          </span>
        </div>
        <p className="text-sm md:text-base text-muted leading-relaxed max-w-3xl">
          {t(category.blurbKey)}
        </p>
      </header>

      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
        {category.terms.map((term) => (
          <VocabularyTermCard
            key={term.id}
            term={term}
            validSlugs={validSlugs}
          />
        ))}
      </div>
    </section>
  );
}
