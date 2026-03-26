"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { useI18n } from "@/lib/i18n/context";
import {
  componentPatterns,
  getComponentPatternCategories,
  getComponentPatternFamilies,
  type ComponentPatternCategory,
  type ComponentPatternFamily,
} from "@/lib/component-patterns";
import { getStyleMetaBySlug } from "@/lib/styles/meta";
import { PatternPreview } from "./pattern-previews";

export function ComponentPatternsContent() {
  const { t, locale } = useI18n();
  const [selectedFamily, setSelectedFamily] = useState<ComponentPatternFamily | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<ComponentPatternCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const families = useMemo(() => getComponentPatternFamilies(), []);
  const categories = useMemo(() => getComponentPatternCategories(), []);

  const filteredPatterns = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return componentPatterns.filter((pattern) => {
      if (selectedFamily !== "all" && pattern.family !== selectedFamily) {
        return false;
      }

      if (selectedCategory !== "all" && pattern.category !== selectedCategory) {
        return false;
      }

      if (!query) {
        return true;
      }

      const styleMeta = getStyleMetaBySlug(pattern.sourceStyleSlug);
      const fields = [
        pattern.name,
        pattern.nameZh,
        pattern.summary,
        pattern.summaryZh,
        pattern.useCase,
        pattern.useCaseZh,
        ...pattern.tags,
        ...pattern.tagsZh,
        styleMeta?.name,
        styleMeta?.nameEn,
      ];

      return fields.some((field) => field?.toLowerCase().includes(query));
    });
  }, [searchQuery, selectedCategory, selectedFamily]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.16em] text-muted mb-3">
          {t("componentPatterns.subtitle")}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {t("componentPatterns.title")}
        </h1>
        <p className="text-muted leading-relaxed max-w-3xl">
          {t("componentPatterns.description")}
        </p>
      </div>

      <div className="mb-8 space-y-4">
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={t("componentPatterns.searchPlaceholder")}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
              aria-label={t("componentPatterns.clearSearch")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          ) : null}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
              {t("componentPatterns.familyLabel")}
            </span>
            <FilterButton
              active={selectedFamily === "all"}
              onClick={() => setSelectedFamily("all")}
              label={`${t("componentPatterns.filterAll")} (${componentPatterns.length})`}
            />
            {families.map((family) => (
              <FilterButton
                key={family.family}
                active={selectedFamily === family.family}
                onClick={() => setSelectedFamily(family.family)}
                label={`${locale === "zh" ? family.labelZh : family.labelEn} (${family.count})`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
              {t("componentPatterns.categoryLabel")}
            </span>
            <FilterButton
              active={selectedCategory === "all"}
              onClick={() => setSelectedCategory("all")}
              label={`${t("componentPatterns.filterAll")} (${componentPatterns.length})`}
            />
            {categories.map((category) => (
              <FilterButton
                key={category.category}
                active={selectedCategory === category.category}
                onClick={() => setSelectedCategory(category.category)}
                label={`${locale === "zh" ? category.labelZh : category.labelEn} (${category.count})`}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted mb-6">
        {t("componentPatterns.showing")} {filteredPatterns.length} {t("componentPatterns.patterns")}
      </p>

      {filteredPatterns.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center text-muted">
          {t("componentPatterns.noResults")}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPatterns.map((pattern) => {
            const styleMeta = getStyleMetaBySlug(pattern.sourceStyleSlug);
            const sourceName = locale === "zh" ? styleMeta?.name ?? pattern.sourceStyleSlug : styleMeta?.nameEn ?? pattern.sourceStyleSlug;

            return (
              <article
                key={pattern.id}
                className="group overflow-hidden rounded-3xl border border-border bg-background transition-colors hover:border-foreground/30"
              >
                <PatternPreview previewId={pattern.previewId} />

                <div className="space-y-4 p-5">
                  <div className="flex flex-wrap gap-2">
                    <Badge>{locale === "zh" ? getFamilyLabelZh(pattern.family) : getFamilyLabelEn(pattern.family)}</Badge>
                    <Badge muted>{locale === "zh" ? getCategoryLabelZh(pattern.category) : getCategoryLabelEn(pattern.category)}</Badge>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold tracking-tight">
                      {locale === "zh" ? pattern.nameZh : pattern.name}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {locale === "zh" ? pattern.summaryZh : pattern.summary}
                    </p>
                  </div>

                  <div>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-muted mb-2">
                      {t("componentPatterns.bestFor")}
                    </div>
                    <p className="text-sm text-foreground/80">
                      {locale === "zh" ? pattern.useCaseZh : pattern.useCase}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(locale === "zh" ? pattern.tagsZh : pattern.tags).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.16em] text-muted">
                        {t("componentPatterns.sourceLabel")}
                      </div>
                      <LocalizedLink href={pattern.sourceHref} className="mt-1 inline-flex text-sm font-medium hover:text-accent transition-colors">
                        {sourceName}
                      </LocalizedLink>
                    </div>

                    <LocalizedLink
                      href={pattern.sourceHref}
                      className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-medium hover:border-foreground hover:text-foreground transition-colors"
                    >
                      {t("componentPatterns.viewSource")}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17 17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </LocalizedLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-2 text-sm transition-colors ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-muted hover:border-foreground hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function Badge({
  children,
  muted,
}: {
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] ${
        muted
          ? "bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-300"
          : "bg-foreground text-background"
      }`}
    >
      {children}
    </span>
  );
}

function getFamilyLabelEn(family: ComponentPatternFamily) {
  switch (family) {
    case "breadcrumb":
      return "Breadcrumb";
    case "accordion":
      return "Accordion";
    case "tabs":
      return "Tabs";
    case "pagination":
      return "Pagination";
    case "sidebar-nav":
      return "Sidebar Nav";
  }
}

function getFamilyLabelZh(family: ComponentPatternFamily) {
  switch (family) {
    case "breadcrumb":
      return "面包屑";
    case "accordion":
      return "手风琴";
    case "tabs":
      return "标签页";
    case "pagination":
      return "分页";
    case "sidebar-nav":
      return "侧栏导航";
  }
}

function getCategoryLabelEn(category: ComponentPatternCategory) {
  switch (category) {
    case "navigation":
      return "Navigation";
    case "disclosure":
      return "Disclosure";
  }
}

function getCategoryLabelZh(category: ComponentPatternCategory) {
  switch (category) {
    case "navigation":
      return "导航";
    case "disclosure":
      return "展开/折叠";
  }
}
