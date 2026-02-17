"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { TemplatesFilter } from "@/components/templates/templates-filter";
import { TemplateCoverPreview } from "@/components/templates/template-cover-preview";
import { useI18n } from "@/lib/i18n/context";
import { pickLocale, type LocaleCopy } from "@/lib/i18n/locale-copy";

type TemplateType = "landing" | "dashboard" | "blog" | "portfolio";
type TemplateTypeFilter = "all" | TemplateType;
type TemplateSort = "recommended" | "name-asc" | "name-desc";

interface Template {
  id: string;
  name: LocaleCopy<string>;
  description: LocaleCopy<string>;
  styleSlug: string;
  type: TemplateType;
  href: string;
}

const templates: Template[] = [
  {
    id: "brutal-landing",
    name: { zh: "野兽派落地页", en: "Brutal Landing Page" },
    description: {
      zh: "高冲击力的 Neo-Brutalist 落地页，适合新品发布与品牌主导型活动。",
      en: "High-impact Neo-Brutalist landing page for launches and brand-first campaigns.",
    },
    styleSlug: "neo-brutalist",
    type: "landing",
    href: "/templates/brutal-landing",
  },
  {
    id: "glass-landing",
    name: { zh: "玻璃拟态落地页", en: "Glass Landing Page" },
    description: {
      zh: "现代玻璃拟态落地页，适合 SaaS 产品与科技类展示场景。",
      en: "Modern glassmorphism landing page ideal for SaaS products and technology showcases.",
    },
    styleSlug: "glassmorphism",
    type: "landing",
    href: "/templates/glass-landing",
  },
  {
    id: "editorial-blog",
    name: { zh: "编辑风博客", en: "Editorial Blog" },
    description: {
      zh: "杂志感阅读布局，突出排版节奏和长内容阅读体验。",
      en: "Magazine-inspired reading layout focused on typography, rhythm, and long-form content.",
    },
    styleSlug: "editorial",
    type: "blog",
    href: "/templates/editorial-blog",
  },
  {
    id: "anx-blog",
    name: { zh: "Anx 实验博客", en: "Anx Avant Blog" },
    description: {
      zh: "实验型作品集博客混合布局，强调大胆字体、粗边框与动感分区。",
      en: "Experimental portfolio-blog mix with loud typography, brutal borders, and kinetic sections.",
    },
    styleSlug: "neo-brutalist",
    type: "blog",
    href: "/templates/anx-blog",
  },
  {
    id: "warm-dashboard",
    name: { zh: "暖色仪表盘", en: "Warm Dashboard" },
    description: {
      zh: "暖色调数据面板，包含侧栏导航、统计卡片、图表和表格模块。",
      en: "Warm-toned analytics dashboard with sidebar navigation, stat cards, charts, and data tables.",
    },
    styleSlug: "warm-dashboard",
    type: "dashboard",
    href: "/templates/warm-dashboard",
  },
  {
    id: "minimalist-portfolio",
    name: { zh: "极简作品集", en: "Minimalist Portfolio" },
    description: {
      zh: "干净扁平的作品集模板，包含项目列表、技能区和联系表单。",
      en: "Clean, flat portfolio with bold typography, project list, skills section, and contact form.",
    },
    styleSlug: "minimalist-flat",
    type: "portfolio",
    href: "/templates/minimalist-portfolio",
  },
  {
    id: "magazine-landing",
    name: { zh: "杂志风落地页", en: "Magazine Landing" },
    description: {
      zh: "编辑式杂志布局，含精选文章、分类导航与订阅模块。",
      en: "Editorial magazine layout with featured articles, category navigation, and newsletter signup.",
    },
    styleSlug: "magazine-grid",
    type: "landing",
    href: "/templates/magazine-landing",
  },
  {
    id: "neumorphism-landing",
    name: { zh: "新拟态落地页", en: "Neumorphism Landing" },
    description: {
      zh: "柔和新拟态 SaaS 页面，包含价格卡、推荐区与用户评价模块。",
      en: "Soft neumorphic SaaS landing page with raised elements, pricing cards, and testimonials.",
    },
    styleSlug: "neumorphism",
    type: "landing",
    href: "/templates/neumorphism-landing",
  },
  {
    id: "brutalist-playful-blog",
    name: { zh: "玩味野兽派博客", en: "Brutalist Playful Blog" },
    description: {
      zh: "彩色 Neo-Brutalist 博客，使用粗边框、硬阴影与有趣布局。",
      en: "Colorful neo-brutalist blog with thick borders, hard shadows, category filters, and playful layouts.",
    },
    styleSlug: "neo-brutalist-playful",
    type: "blog",
    href: "/templates/brutalist-playful-blog",
  },
];

const allStyles = getAllStylesMeta();
const styleMap = new Map(allStyles.map((style) => [style.slug, style]));

function getTemplateGridColumns() {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

function templateTypeToTranslationKey(type: TemplateType) {
  switch (type) {
    case "landing":
      return "templates.typeLanding";
    case "dashboard":
      return "templates.typeDashboard";
    case "blog":
      return "templates.typeBlog";
    case "portfolio":
      return "templates.typePortfolio";
    default:
      return "templates.typeAll";
  }
}

export default function TemplatesPage() {
  const { locale, t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const templateCardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const queryParam = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const trimmedSearchQuery = searchQuery.trim();
  const activeType = (searchParams.get("type") as TemplateTypeFilter | null) || "all";
  const sortParam = searchParams.get("sort");
  const validSorts: TemplateSort[] = ["recommended", "name-asc", "name-desc"];
  const activeSort: TemplateSort = validSorts.includes(sortParam as TemplateSort)
    ? (sortParam as TemplateSort)
    : "recommended";
  const hasActiveControls =
    activeType !== "all" ||
    activeSort !== "recommended" ||
    queryParam.trim().length > 0;
  const activeFilterSummary = useMemo(() => {
    const parts: string[] = [];
    if (activeType !== "all") {
      parts.push(`${t("templates.type")}: ${t(templateTypeToTranslationKey(activeType))}`);
    }
    if (activeSort !== "recommended") {
      const sortLabel = activeSort === "name-asc"
        ? t("templates.sortNameAsc")
        : t("templates.sortNameDesc");
      parts.push(`${t("templates.sort")}: ${sortLabel}`);
    }
    if (queryParam.trim().length > 0) {
      parts.push(`${t("nav.search")}: ${queryParam}`);
    }
    return parts.join(" · ");
  }, [activeType, activeSort, queryParam, t]);

  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  useEffect(() => {
    const handleGlobalSearchShortcut = (event: KeyboardEvent) => {
      if (event.key !== "/") return;

      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      event.preventDefault();
      searchInputRef.current?.focus();
    };

    window.addEventListener("keydown", handleGlobalSearchShortcut);
    return () => window.removeEventListener("keydown", handleGlobalSearchShortcut);
  }, []);

  useEffect(() => {
    if (searchQuery === queryParam) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const normalizedQuery = trimmedSearchQuery;
      if (normalizedQuery) {
        params.set("q", normalizedQuery);
      } else {
        params.delete("q");
      }

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery, trimmedSearchQuery, queryParam, searchParams, router, pathname]);

  const handleSortChange = (sort: TemplateSort) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sort === "recommended") {
      params.delete("sort");
    } else {
      params.set("sort", sort);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("type");
    params.delete("sort");
    params.delete("q");

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const filteredTemplates = useMemo(() => {
    const normalizedQuery = trimmedSearchQuery.toLowerCase();

    const matchedTemplates = templates
      .filter((template) => activeType === "all" || template.type === activeType)
      .filter((template) => {
        if (!normalizedQuery) return true;

        const style = styleMap.get(template.styleSlug);
        const searchableText = [
          template.id,
          template.href,
          template.name.zh,
          template.name.en,
          template.description.zh,
          template.description.en,
          style?.name,
          style?.nameEn,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedQuery);
      });

    if (activeSort === "recommended") return matchedTemplates;

    const sortedTemplates = [...matchedTemplates].sort((left, right) => {
      const leftName = pickLocale(locale, left.name).toLowerCase();
      const rightName = pickLocale(locale, right.name).toLowerCase();
      return leftName.localeCompare(rightName);
    });

    if (activeSort === "name-desc") {
      sortedTemplates.reverse();
    }

    return sortedTemplates;
  }, [activeType, trimmedSearchQuery, activeSort, locale]);

  useEffect(() => {
    templateCardRefs.current = templateCardRefs.current.slice(0, filteredTemplates.length);
  }, [filteredTemplates.length]);

  const handleTemplateCardKeyDown = (
    event: React.KeyboardEvent<HTMLAnchorElement>,
    index: number
  ) => {
    const columns = getTemplateGridColumns();
    const maxIndex = filteredTemplates.length - 1;
    let nextIndex = index;

    if (event.key === "ArrowRight") nextIndex = index + 1;
    if (event.key === "ArrowLeft") nextIndex = index - 1;
    if (event.key === "ArrowDown") nextIndex = index + columns;
    if (event.key === "ArrowUp") nextIndex = index - columns;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = maxIndex;

    if (nextIndex < 0 || nextIndex > maxIndex || nextIndex === index) return;

    event.preventDefault();
    templateCardRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
            <p className="text-xs tracking-widest uppercase text-muted mb-3">
              {t("templates.subtitle")}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl mb-3">
              {t("templates.title")}
            </h1>
            <p className="text-base md:text-lg text-muted max-w-3xl">
              {t("templates.description")}
            </p>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <TemplatesFilter />

            <div className="mb-5 md:mb-7 space-y-3">
              <label htmlFor="templates-search" className="sr-only">
                {t("nav.search")}
              </label>
              <input
                ref={searchInputRef}
                id="templates-search"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setSearchQuery("");
                  }
                }}
                aria-keyshortcuts="/"
                aria-describedby="templates-results-count"
                placeholder={t("templates.searchPlaceholder")}
                className="w-full md:max-w-md h-10 px-3 text-sm border border-border bg-background focus:outline-none focus:border-foreground transition-colors"
              />
              <p className="text-xs text-muted">
                {t("templates.searchHint")}
              </p>
              {trimmedSearchQuery.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label={t("templates.clearSearch")}
                  className="text-xs text-muted hover:text-foreground transition-colors"
                >
                  {t("templates.clearSearch")}
                </button>
              )}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p
                  id="templates-results-count"
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  className="text-sm text-muted"
                >
                  {filteredTemplates.length} {t("templates.results")}
                </p>
                <div className="flex items-center gap-2">
                  <label htmlFor="templates-sort" className="text-sm text-muted">
                    {t("templates.sort")}:
                  </label>
                  <select
                    id="templates-sort"
                    value={activeSort}
                    onChange={(event) => handleSortChange(event.target.value as TemplateSort)}
                    aria-label={t("templates.sortAriaLabel")}
                    className="h-9 px-3 text-sm border border-border bg-background focus:outline-none focus:border-foreground transition-colors"
                  >
                    <option value="recommended">{t("templates.sortRecommended")}</option>
                    <option value="name-asc">{t("templates.sortNameAsc")}</option>
                    <option value="name-desc">{t("templates.sortNameDesc")}</option>
                  </select>
                  {hasActiveControls && (
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="px-3 py-1.5 text-xs border border-border hover:border-foreground transition-colors"
                    >
                      {t("templates.resetFilters")}
                    </button>
                  )}
                </div>
              </div>
              {hasActiveControls && (
                <p className="text-xs text-muted" role="status" aria-live="polite">
                  {t("templates.activeFiltersLabel")}: {activeFilterSummary}
                </p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {filteredTemplates.map((template, index) => {
                const style = styleMap.get(template.styleSlug);
                const templateName = pickLocale(locale, template.name);
                const templateDescription = pickLocale(locale, template.description);
                const styleLabel = locale === "zh"
                  ? style?.name || style?.nameEn || "风格"
                  : style?.nameEn || style?.name || "Style";

                return (
                  <Link
                    key={template.id}
                    href={template.href}
                    ref={(element) => {
                      templateCardRefs.current[index] = element;
                    }}
                    onKeyDown={(event) => handleTemplateCardKeyDown(event, index)}
                    aria-label={`${templateName} - ${t("templates.openTemplate")}`}
                    className="group block border border-border hover:border-foreground transition-colors"
                  >
                    <div className="aspect-[16/10] relative overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                      {style && (
                        <TemplateCoverPreview
                          templateId={template.id}
                          colors={{
                            primary: style.colors.primary,
                            secondary: style.colors.secondary,
                            accent: style.colors.accent,
                          }}
                        />
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                        <span className="text-white text-sm font-medium">{templateName}</span>
                      </div>
                    </div>

                    <div className="p-4 md:p-5">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-muted">
                          {t(templateTypeToTranslationKey(template.type))}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-muted">
                          {styleLabel}
                        </span>
                      </div>

                      <h3 className="text-lg mb-2 group-hover:text-accent transition-colors">
                        {templateName}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed line-clamp-2">
                        {templateDescription}
                      </p>

                      <p className="text-xs tracking-wide mt-4 group-hover:text-accent transition-colors">
                        {t("templates.openTemplate")} &rarr;
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-16 text-muted">
                {trimmedSearchQuery.length > 0
                  ? t("templates.emptySearch")
                  : t("templates.empty")}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
