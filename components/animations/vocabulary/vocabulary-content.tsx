"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/lib/i18n/context";
import { Search } from "lucide-react";
import { vocabulary } from "@/lib/animations/vocabulary";
import { getAnimationBySlug } from "@/lib/animations";
import { VocabularyCategorySection } from "./vocabulary-category";

/**
 * Client shell for /animations/vocabulary. Renders the page header,
 * a search box that filters across all categories, and the list of
 * category sections. Each section defers its own grid rendering to
 * <VocabularyCategorySection> so the animation previews stay code-
 * split per category.
 */
export function VocabularyContent() {
  const { t, locale } = useI18n();
  const [query, setQuery] = useState("");

  const normalized = query.trim().toLowerCase();

  // Pre-compute the set of valid pattern slugs once so category sections
  // can quickly verify their example slugs exist before rendering a
  // preview (and skip missing patterns instead of crashing on a 404).
  const validSlugs = useMemo(() => {
    const set = new Set<string>();
    for (const cat of vocabulary) {
      for (const term of cat.terms) {
        for (const slug of term.examplePatterns) {
          // Touch the lookup so dead slugs surface here at SSR/SSG time.
          if (getAnimationBySlug(slug)) set.add(slug);
        }
      }
    }
    return set;
  }, []);

  const filteredCategories = useMemo(() => {
    if (!normalized) return vocabulary;
    return vocabulary
      .map((cat) => ({
        ...cat,
        terms: cat.terms.filter((term) => {
          const name = t(term.nameKey).toLowerCase();
          const def = t(term.definitionKey).toLowerCase();
          return (
            name.includes(normalized) || def.includes(normalized)
          );
        }),
      }))
      .filter((cat) => cat.terms.length > 0);
  }, [normalized, t]);

  return (
    <div className="px-6 md:px-12 py-12 md:py-16">
      <header className="mx-auto max-w-5xl mb-10 md:mb-14">
        <p className="text-[11px] uppercase tracking-[0.32em] text-muted mb-4">
          {locale === "zh" ? "动画词汇表" : "Vocabulary"}
        </p>
        <h1 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
          {locale === "zh" ? "动画设计语言" : "The vocabulary of motion"}
        </h1>
        <p className="text-base md:text-lg text-muted max-w-3xl leading-relaxed">
          {locale === "zh"
            ? "12 个分类、48 个核心术语，每个术语都配有一个 StyleKit 真实可运行的动效作为参照。从设计师、工程师到 AI 提示词，都能用同一套词汇精确描述运动。"
            : "12 categories, 48 core terms. Every term is paired with a live StyleKit animation you can copy. Speak the same language with designers, engineers, and AI prompts."}
        </p>
      </header>

      <div className="mx-auto max-w-5xl mb-10 md:mb-14">
        <label htmlFor="vocab-search" className="sr-only">
          {locale === "zh" ? "搜索术语" : "Search terms"}
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            id="vocab-search"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={
              locale === "zh" ? "搜索术语（如 '弹性'、'stagger'）" : "Search terms (e.g. bounce, stagger)"
            }
            className="w-full h-11 pl-9 pr-3 text-sm border border-border bg-background focus:outline-none focus:border-foreground transition-colors"
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-14 md:space-y-20">
        {filteredCategories.length === 0 ? (
          <p className="text-sm text-muted text-center py-12">
            {locale === "zh"
              ? `未找到包含 "${query}" 的术语`
              : `No terms matching “${query}”`}
          </p>
        ) : (
          filteredCategories.map((category) => (
            <VocabularyCategorySection
              key={category.id}
              category={category}
              validSlugs={validSlugs}
            />
          ))
        )}
      </div>
    </div>
  );
}
