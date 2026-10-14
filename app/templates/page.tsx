"use client";

export const dynamic = "force-static";

import Image from "next/image";
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Code2, Download, ExternalLink, Github, Loader2, X } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { TemplatesFilter } from "@/components/templates/templates-filter";
import { TemplateCoverPreview } from "@/components/templates/template-cover-preview";
import { TemplateSourceDialog } from "@/components/templates/template-source-dialog";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { useI18n } from "@/lib/i18n/context";
import { pickLocale } from "@/lib/i18n/locale-copy";
import {
  getScenarioLabel,
  getStyleScenarios,
  STYLE_SCENARIOS,
  type StyleScenario,
} from "@/lib/styles/scenarios";
import {
  templateCatalog,
  type TemplateCatalogEntry,
  type TemplateCatalogType,
} from "@/lib/templates/catalog";
import {
  getTemplateTypeScenarios,
  getTemplateTypes,
  matchesTemplateSearch,
  matchesTemplateType,
  type TemplateTypeFilter,
} from "@/lib/templates/discovery";
import { templateCoverSlugs } from "@/lib/templates/covers.generated";

type TemplateSort = "recommended" | "name-asc" | "name-desc";
const templates = templateCatalog;
const subscribeToClientReady = () => () => {};
const getClientReady = () => true;
const getServerReady = () => false;

const allStyles = getAllStylesMeta();
const styleMap = new Map(allStyles.map((style) => [style.slug, style]));

const templatePrimaryScenarioMap: Partial<Record<TemplateCatalogType, StyleScenario>> = {
  landing: "marketing",
  dashboard: "dashboard",
  blog: "blog",
  portfolio: "portfolio",
  saas: "saas",
  ecommerce: "ecommerce",
  admin: "admin",
  docs: "docs",
};

function getTemplateScenarios(template: TemplateCatalogEntry): StyleScenario[] {
  const style = styleMap.get(template.styleSlug);
  const styleScenarios = style ? getStyleScenarios(style, 3) : [];
  const combined = [
    ...getTemplateTypeScenarios(template, templatePrimaryScenarioMap),
    ...styleScenarios,
  ];

  return combined.filter((scenario, index) => combined.indexOf(scenario) === index).slice(0, 3);
}

function getTemplateGridColumns() {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

function templateTypeToTranslationKey(type: TemplateTypeFilter) {
  switch (type) {
    case "landing":
      return "templates.typeLanding";
    case "dashboard":
      return "templates.typeDashboard";
    case "blog":
      return "templates.typeBlog";
    case "portfolio":
      return "templates.typePortfolio";
    case "saas":
      return "templates.typeSaas";
    case "ecommerce":
      return "templates.typeEcommerce";
    case "admin":
      return "templates.typeAdmin";
    case "auth":
      return "templates.typeAuth";
    case "docs":
      return "templates.typeDocs";
    case "social":
      return "templates.typeSocial";
    case "messaging":
      return "templates.typeMessaging";
    case "media":
      return "templates.typeMedia";
    case "lifestyle":
      return "templates.typeLifestyle";
    case "education":
      return "templates.typeEducation";
    case "pricing":
      return "templates.typePricing";
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
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const trimmedSearchQuery = searchQuery.trim();
  const trimmedDeferredSearchQuery = deferredSearchQuery.trim();
  const activeType = (searchParams.get("type") as TemplateTypeFilter | null) || "all";
  const deferredActiveType = useDeferredValue(activeType);
  const styleParam = searchParams.get("style") || "";
  const activeStyleSlug = styleMap.has(styleParam) ? styleParam : "";
  const deferredActiveStyleSlug = useDeferredValue(activeStyleSlug);
  const activeStyleMeta = activeStyleSlug ? styleMap.get(activeStyleSlug) : undefined;
  const scenarioParam = searchParams.get("scenario") || "";
  const activeScenario: StyleScenario | "all" = STYLE_SCENARIOS.includes(scenarioParam as StyleScenario)
    ? (scenarioParam as StyleScenario)
    : "all";
  const deferredActiveScenario = useDeferredValue(activeScenario);
  const sortParam = searchParams.get("sort");
  const validSorts: TemplateSort[] = ["recommended", "name-asc", "name-desc"];
  const activeSort: TemplateSort = validSorts.includes(sortParam as TemplateSort)
    ? (sortParam as TemplateSort)
    : "recommended";
  const deferredActiveSort = useDeferredValue(activeSort);
  const hasActiveControls =
    activeStyleSlug.length > 0 ||
    activeScenario !== "all" ||
    activeType !== "all" ||
    activeSort !== "recommended" ||
    queryParam.trim().length > 0;
  const activeFilterSummary = useMemo(() => {
    const parts: string[] = [];
    if (activeStyleMeta) {
      parts.push(
        `${t("nav.styles")}: ${locale === "zh" ? activeStyleMeta.name : (activeStyleMeta.nameEn || activeStyleMeta.name)}`
      );
    }
    if (activeScenario !== "all") {
      parts.push(
        `${locale === "zh" ? "场景" : "Scenario"}: ${getScenarioLabel(activeScenario, locale)}`
      );
    }
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
  }, [activeScenario, activeStyleMeta, activeType, activeSort, locale, queryParam, t]);

  useEffect(() => {
    const savedScroll = sessionStorage.getItem("templates-scroll-position");
    if (savedScroll) {
      const y = parseInt(savedScroll, 10);
      setTimeout(() => {
        window.scrollTo({ top: y, behavior: "instant" });
      }, 100);
      sessionStorage.removeItem("templates-scroll-position");
    }

    const savedUrl = sessionStorage.getItem("templates-return-url");
    if (savedUrl && !window.location.search) {
      try {
        const url = new URL(savedUrl);
        if (url.search) {
          sessionStorage.removeItem("templates-return-url");
          router.replace(url.pathname + url.search, { scroll: false });
        }
      } catch {
        // ignore invalid URL
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  useEffect(() => {
    const handleGlobalSearchShortcut = (event: KeyboardEvent) => {
      if (event.key !== "/") return;

      const target = event.target as HTMLElement | null;
      if (target?.closest("dialog")) return;
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

  const handleScenarioChange = (scenario: StyleScenario | "all") => {
    const params = new URLSearchParams(searchParams.toString());
    if (scenario === "all") {
      params.delete("scenario");
    } else {
      params.set("scenario", scenario);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("style");
    params.delete("scenario");
    params.delete("type");
    params.delete("sort");
    params.delete("q");

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const filteredTemplates = useMemo(() => {
    const normalizedQuery = trimmedDeferredSearchQuery.toLowerCase();

    const matchedTemplates = templates
      .filter((template) => !deferredActiveStyleSlug || template.styleSlug === deferredActiveStyleSlug)
      .filter((template) => (
        deferredActiveScenario === "all" ||
        getTemplateScenarios(template).includes(deferredActiveScenario)
      ))
      .filter((template) => matchesTemplateType(template, deferredActiveType))
      .filter((template) => {
        const style = styleMap.get(template.styleSlug);
        const typeLabels = getTemplateTypes(template).map((type) =>
          t(templateTypeToTranslationKey(type))
        );
        return matchesTemplateSearch(template, normalizedQuery, [
          style?.name ?? "",
          style?.nameEn ?? "",
          ...typeLabels,
        ]);
      });

    if (deferredActiveSort === "recommended") return matchedTemplates;

    const sortedTemplates = [...matchedTemplates].sort((left, right) => {
      const leftName = pickLocale(locale, left.name).toLowerCase();
      const rightName = pickLocale(locale, right.name).toLowerCase();
      return leftName.localeCompare(rightName);
    });

    if (deferredActiveSort === "name-desc") {
      sortedTemplates.reverse();
    }

    return sortedTemplates;
  }, [deferredActiveScenario, deferredActiveSort, deferredActiveStyleSlug, deferredActiveType, locale, t, trimmedDeferredSearchQuery]);
  const isFiltering =
    searchQuery !== deferredSearchQuery ||
    activeScenario !== deferredActiveScenario ||
    activeStyleSlug !== deferredActiveStyleSlug ||
    activeType !== deferredActiveType ||
    activeSort !== deferredActiveSort;

  useEffect(() => {
    templateCardRefs.current = templateCardRefs.current.slice(0, filteredTemplates.length);
  }, [filteredTemplates.length]);

  const [sourceTemplate, setSourceTemplate] = useState<{ slug: string; name: string } | null>(null);
  const clientReady = useSyncExternalStore(subscribeToClientReady, getClientReady, getServerReady);
  const handleViewSource = useCallback((slug: string, name: string) => {
    setSourceTemplate({ slug, name });
  }, []);
  const handleCloseSource = useCallback(() => {
    setSourceTemplate(null);
  }, []);

  const handleTemplateCardKeyDown = (
    event: React.KeyboardEvent<HTMLAnchorElement>,
    index: number
  ) => {
    const total = filteredTemplates.length;
    if (total <= 1) return;

    const columns = getTemplateGridColumns();
    const maxIndex = total - 1;
    const column = index % columns;
    let nextIndex = index;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % total;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + total) % total;
        break;
      case "ArrowDown": {
        const downIndex = index + columns;
        nextIndex = downIndex <= maxIndex ? downIndex : Math.min(column, maxIndex);
        break;
      }
      case "ArrowUp": {
        if (index - columns >= 0) {
          nextIndex = index - columns;
        } else {
          nextIndex = maxIndex - ((maxIndex - column) % columns);
        }
        break;
      }
      case "PageDown": {
        const lastRowStart = maxIndex - (maxIndex % columns);
        const candidate = lastRowStart + column;
        nextIndex = candidate <= maxIndex ? candidate : maxIndex;
        break;
      }
      case "PageUp":
        nextIndex = Math.min(column, maxIndex);
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = maxIndex;
        break;
      default:
        return;
    }

    event.preventDefault();
    if (nextIndex !== index) {
      templateCardRefs.current[nextIndex]?.focus();
    }
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
            {activeStyleMeta && (
              <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-muted">{t("nav.styles")}:</span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-border bg-background">
                  <span>
                    {locale === "zh" ? activeStyleMeta.name : (activeStyleMeta.nameEn || activeStyleMeta.name)}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const params = new URLSearchParams(searchParams.toString());
                      params.delete("style");
                      const query = params.toString();
                      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
                    }}
                    aria-label={t("styles.clearTags")}
                    className="text-muted hover:text-foreground transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              </div>
            )}

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
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] tracking-[0.16em] uppercase text-muted">
                  {locale === "zh" ? "按场景进入" : "Explore by goal"}
                </span>
                <button
                  type="button"
                  onClick={() => handleScenarioChange("all")}
                  className={`px-3 py-1.5 md:px-4 md:py-2.5 text-xs tracking-wide border transition-colors ${
                    activeScenario === "all"
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted hover:text-foreground hover:border-foreground"
                  }`}
                >
                  {locale === "zh" ? "全部" : "All"}
                </button>
                {STYLE_SCENARIOS.map((scenario) => {
                  const isActive = activeScenario === scenario;

                  return (
                    <button
                      key={scenario}
                      type="button"
                      onClick={() => handleScenarioChange(isActive ? "all" : scenario)}
                      className={`px-3 py-1.5 md:px-4 md:py-2.5 text-xs tracking-wide border transition-colors ${
                        isActive
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted hover:text-foreground hover:border-foreground"
                      }`}
                    >
                      {getScenarioLabel(scenario, locale)}
                    </button>
                  );
                })}
              </div>
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
                {isFiltering && (
                  <div className="inline-flex items-center gap-1.5 text-xs text-muted">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <label htmlFor="templates-sort" className="text-sm text-muted">
                    {t("templates.sort")}:
                  </label>
                  <select
                    id="templates-sort"
                    value={activeSort}
                    onChange={(event) => handleSortChange(event.target.value as TemplateSort)}
                    aria-label={t("templates.sortAriaLabel")}
                    className="h-9 md:h-11 px-3 text-sm border border-border bg-background focus:outline-none focus:border-foreground transition-colors"
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

            <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 transition-opacity ${isFiltering ? "opacity-75" : ""}`}>
              {filteredTemplates.map((template, index) => {
                const style = styleMap.get(template.styleSlug);
                const previewColors = style
                  ? {
                      primary: style.colors.primary,
                      secondary: style.colors.secondary,
                      accent: style.colors.accent,
                    }
                  : template.coverColors;
                const templateName = pickLocale(locale, template.name);
                const templateDescription = pickLocale(locale, template.description);
                const styleLabel = locale === "zh"
                  ? style?.name || style?.nameEn || "风格"
                  : style?.nameEn || style?.name || "Style";
                const slug = template.external
                  ? template.id
                  : template.href.split("/").filter(Boolean).pop() ?? "";

                if (template.external) {
                  return (
                    <div
                      key={template.id}
                      data-template-id={template.id}
                      className="group border border-border hover:border-foreground focus-within:border-foreground transition-colors [content-visibility:auto] [contain-intrinsic-size:1px_520px]"
                    >
                      <a
                        href={template.external.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        ref={(element) => {
                          templateCardRefs.current[index] = element;
                        }}
                        onKeyDown={(event) => handleTemplateCardKeyDown(event, index)}
                        aria-label={`${templateName} - ${t("templates.externalPreview")}`}
                        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <div className="aspect-[16/10] relative overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                          {templateCoverSlugs.has(slug) && (
                            <Image
                              src={`/templates/covers/${slug}.webp`}
                              alt={`${templateName} preview`}
                              fill
                              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              unoptimized
                            />
                          )}
                          <span className="absolute left-3 top-3 border border-foreground bg-background/90 px-2 py-1 text-[10px] uppercase tracking-[0.16em] backdrop-blur-sm">
                            {t("templates.completeProject")}
                          </span>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                            <span className="text-white text-sm font-medium">{templateName}</span>
                          </div>
                        </div>

                        <div className="p-4 md:p-5">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            {getTemplateTypes(template).map((type) => (
                              <span key={type} className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-muted">
                                {t(templateTypeToTranslationKey(type))}
                              </span>
                            ))}
                          </div>

                          <h3 className="text-lg mb-2 group-hover:text-accent transition-colors">
                            {templateName}
                          </h3>
                          <p className="text-sm text-muted leading-relaxed line-clamp-2">
                            {templateDescription}
                          </p>
                          {template.external.stack && (
                            <p className="mt-4 text-xs leading-relaxed text-muted">
                              <span className="mr-1 text-foreground">{t("templates.stack")}</span>
                              {template.external.stack}
                            </p>
                          )}
                          {template.external.features && (
                            <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-muted">
                              {pickLocale(locale, template.external.features).slice(0, 3).map((feature) => (
                                <li key={feature} className="flex gap-2">
                                  <span aria-hidden="true" className="text-foreground">—</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </a>

                      <div className="flex flex-wrap items-center gap-2 px-4 pb-4 md:px-5 md:pb-5 pt-0">
                        <a
                          href={template.external.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={t("templates.fullSource")}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          {t("templates.fullSource")}
                        </a>
                        <a
                          href={template.external.siteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={t("templates.externalPreview")}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted border border-border hover:border-foreground hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          {t("templates.externalPreview")}
                        </a>
                        {template.external.license && (
                          <a
                            href={template.external.license.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={t("templates.viewLicense")}
                            className="ml-auto text-xs text-muted underline decoration-border underline-offset-4 hover:text-foreground"
                          >
                            {template.external.license.label} {t("templates.license")}
                          </a>
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={template.id}
                    data-template-id={template.id}
                    className="group border border-border hover:border-foreground focus-within:border-foreground transition-colors [content-visibility:auto] [contain-intrinsic-size:1px_520px]"
                  >
                    <LocalizedLink
                      href={template.href}
                      ref={(element) => {
                        templateCardRefs.current[index] = element;
                      }}
                      onClick={() => {
                        sessionStorage.setItem("templates-scroll-position", window.scrollY.toString());
                        sessionStorage.setItem("templates-return-url", window.location.href);
                      }}
                      onKeyDown={(event) => handleTemplateCardKeyDown(event, index)}
                      aria-label={`${templateName} - ${t("templates.openTemplate")}`}
                      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <div className="aspect-[16/10] relative overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                        {templateCoverSlugs.has(slug) ? (
                          <Image
                            src={`/templates/covers/${slug}.webp`}
                            alt={`${templateName} preview`}
                            fill
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            unoptimized
                          />
                        ) : (
                          previewColors && (
                            <TemplateCoverPreview
                              templateId={template.id}
                              colors={previewColors}
                            />
                          )
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                          <span className="text-white text-sm font-medium">{templateName}</span>
                        </div>
                      </div>

                      <div className="p-4 md:p-5">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {getTemplateTypes(template).map((type) => (
                            <span key={type} className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-muted">
                              {t(templateTypeToTranslationKey(type))}
                            </span>
                          ))}
                          <span className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-muted">
                            {styleLabel}
                          </span>
                          <span className="text-xs px-2 py-0.5 border border-border text-muted">
                            {t("templates.downloadableExample")}
                          </span>
                        </div>

                        <h3 className="text-lg mb-2 group-hover:text-accent transition-colors">
                          {templateName}
                        </h3>
                        <p className="text-sm text-muted leading-relaxed line-clamp-2">
                          {templateDescription}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {getTemplateScenarios(template).slice(0, 2).map((scenario) => (
                            <span
                              key={scenario}
                              className="text-[10px] px-2 py-0.5 border border-border text-muted"
                            >
                              {getScenarioLabel(scenario, locale)}
                            </span>
                          ))}
                        </div>

                        <p className="text-xs tracking-wide mt-4 group-hover:text-accent transition-colors">
                          {t("templates.openTemplate")} &rarr;
                        </p>
                      </div>
                    </LocalizedLink>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1 px-4 pb-4 md:px-5 md:pb-5 pt-0">
                      <button
                        type="button"
                        onClick={() => handleViewSource(slug, templateName)}
                        disabled={!clientReady}
                        title={t("templates.viewSource")}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted border border-border hover:border-foreground hover:text-foreground transition-colors disabled:cursor-wait disabled:opacity-50"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        {t("templates.viewSource")}
                      </button>
                      <a
                        href={"/api/templates/" + encodeURIComponent(slug) + "/download"}
                        download
                        title={t("templates.downloadExample")}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        {t("templates.downloadExample")}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="py-16">
                <div className="max-w-xl mx-auto border border-dashed border-border px-6 py-10 text-center space-y-4">
                  <p className="text-sm text-muted">
                    {trimmedSearchQuery.length > 0
                      ? t("templates.emptySearch")
                      : t("templates.empty")}
                  </p>
                  {hasActiveControls && (
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="px-4 py-2 text-xs border border-border hover:border-foreground transition-colors"
                    >
                      {t("templates.resetFilters")}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {sourceTemplate && (
        <TemplateSourceDialog
          key={sourceTemplate.slug}
          slug={sourceTemplate.slug}
          name={sourceTemplate.name}
          onClose={handleCloseSource}
        />
      )}
    </div>
  );
}
