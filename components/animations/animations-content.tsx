"use client";

import { useDeferredValue, useMemo, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Search, SlidersHorizontal, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover/popover";
import { AnimationCard, AnimationCardPreviewStyles } from "@/components/animations/animation-card";
import type { AnimationMeta, AnimationCategory, AnimationTrigger } from "@/lib/animations/types";

type CategoryFilter = AnimationCategory | "all";
type TriggerFilter = AnimationTrigger | "all";
type DifficultyFilter = "beginner" | "intermediate" | "advanced" | "all";

interface AnimationsContentProps {
  allAnimations: AnimationMeta[];
}

const categoryKeys: { key: CategoryFilter; i18nKey: string }[] = [
  { key: "all", i18nKey: "animations.filterAll" },
  { key: "entrance", i18nKey: "animations.categoryEntrance" },
  { key: "exit", i18nKey: "animations.categoryExit" },
  { key: "hover", i18nKey: "animations.categoryHover" },
  { key: "pointer", i18nKey: "animations.categoryPointer" },
  { key: "scroll", i18nKey: "animations.categoryScroll" },
  { key: "text", i18nKey: "animations.categoryText" },
  { key: "loading", i18nKey: "animations.categoryLoading" },
  { key: "background", i18nKey: "animations.categoryBackground" },
  { key: "transition", i18nKey: "animations.categoryTransition" },
  { key: "micro-interaction", i18nKey: "animations.categoryMicroInteraction" },
];

const triggerKeys: { key: TriggerFilter; i18nKey: string }[] = [
  { key: "all", i18nKey: "animations.filterAll" },
  { key: "on-mount", i18nKey: "animations.triggerOnMount" },
  { key: "on-scroll", i18nKey: "animations.triggerOnScroll" },
  { key: "on-hover", i18nKey: "animations.triggerOnHover" },
  { key: "on-click", i18nKey: "animations.triggerOnClick" },
  { key: "continuous", i18nKey: "animations.triggerContinuous" },
  { key: "manual", i18nKey: "animations.triggerManual" },
];

const difficultyKeys: { key: DifficultyFilter; i18nKey: string }[] = [
  { key: "all", i18nKey: "animations.filterAll" },
  { key: "beginner", i18nKey: "animations.difficultyBeginner" },
  { key: "intermediate", i18nKey: "animations.difficultyIntermediate" },
  { key: "advanced", i18nKey: "animations.difficultyAdvanced" },
];

/** Read a filter value from search params, falling back to "all". */
function readParam<T extends string>(
  params: URLSearchParams,
  key: string,
  valid: readonly T[],
): T | "all" {
  const raw = params.get(key);
  if (raw && (valid as readonly string[]).includes(raw)) return raw as T;
  return "all";
}

const validCategories: AnimationCategory[] = [
  "entrance", "exit", "hover", "scroll", "text",
  "pointer", "loading", "background", "transition", "micro-interaction",
];
const validTriggers: AnimationTrigger[] = [
  "on-mount", "on-scroll", "on-hover", "on-click", "continuous", "manual",
];
const validDifficulties = ["beginner", "intermediate", "advanced"] as const;

export function AnimationsContent({ allAnimations }: AnimationsContentProps) {
  const { t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL
  const [category, setCategory] = useState<CategoryFilter>(
    () => readParam(searchParams, "category", validCategories)
  );
  const [trigger, setTrigger] = useState<TriggerFilter>(
    () => readParam(searchParams, "trigger", validTriggers)
  );
  const [difficulty, setDifficulty] = useState<DifficultyFilter>(
    () => readParam(searchParams, "difficulty", validDifficulties)
  );
  const [search, setSearch] = useState(() => searchParams.get("q") ?? "");
  const deferredSearch = useDeferredValue(search);

  // Sync state to URL
  const syncURL = useCallback(
    (cat: CategoryFilter, trig: TriggerFilter, diff: DifficultyFilter, q: string) => {
      const params = new URLSearchParams();
      if (cat !== "all") params.set("category", cat);
      if (trig !== "all") params.set("trigger", trig);
      if (diff !== "all") params.set("difficulty", diff);
      if (q.trim()) params.set("q", q.trim());
      const qs = params.toString();
      router.replace(qs ? `/animations?${qs}` : "/animations", { scroll: false });
    },
    [router]
  );

  const handleCategory = useCallback(
    (key: CategoryFilter) => {
      setCategory(key);
      syncURL(key, trigger, difficulty, search);
      // With the sticky bar you can switch category from deep in the page;
      // jump back to the top of the results so the change is visible.
      if (typeof window !== "undefined" && window.scrollY > 320) {
        document
          .getElementById("animations-results-top")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [trigger, difficulty, search, syncURL]
  );

  const handleTrigger = useCallback(
    (key: TriggerFilter) => {
      setTrigger(key);
      syncURL(category, key, difficulty, search);
    },
    [category, difficulty, search, syncURL]
  );

  const handleDifficulty = useCallback(
    (key: DifficultyFilter) => {
      setDifficulty(key);
      syncURL(category, trigger, key, search);
    },
    [category, trigger, search, syncURL]
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      syncURL(category, trigger, difficulty, value);
    },
    [category, trigger, difficulty, syncURL]
  );

  const filtered = useMemo(() => {
    let result = allAnimations;
    if (category !== "all") result = result.filter((a) => a.category === category);
    if (trigger !== "all") result = result.filter((a) => a.trigger === trigger);
    if (difficulty !== "all") result = result.filter((a) => a.difficulty === difficulty);
    if (deferredSearch.trim()) {
      const q = deferredSearch.trim().toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.nameEn.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.keywords.some((k) => k.toLowerCase().includes(q)) ||
          a.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return result;
  }, [allAnimations, category, trigger, difficulty, deferredSearch]);

  const isSearching = search !== deferredSearch;
  const hasSecondaryFilters = trigger !== "all" || difficulty !== "all";
  // With no active filter or search, group by category so 60 animations scan
  // as titled sections instead of one undifferentiated wall.
  const isGrouped =
    category === "all" &&
    trigger === "all" &&
    difficulty === "all" &&
    !deferredSearch.trim();

  const groupedSections = useMemo(() => {
    if (!isGrouped) return [];
    return validCategories
      .map((key) => ({
        key,
        items: filtered.filter((a) => a.category === key),
      }))
      .filter((section) => section.items.length > 0);
  }, [isGrouped, filtered]);

  const gridClassName =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5";

  const renderCard = (anim: AnimationMeta) => (
    <div
      key={anim.slug}
      className="[content-visibility:auto] [contain-intrinsic-size:1px_340px]"
    >
      <AnimationCard animation={anim} />
    </div>
  );

  return (
    <>
      <AnimationCardPreviewStyles />
      {/* Page Header */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <p className="text-xs tracking-widest uppercase text-muted mb-3">
            {t("animations.subtitle")}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-3">
            {t("animations.title")}
          </h1>
          <p className="text-base text-muted max-w-2xl">
            {t("animations.description")}
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          {/* Single-row filter bar — sticky so any category is one click away
              no matter how deep the user has scrolled. */}
          <div className="sticky top-0 z-30 -mt-2 mb-8 flex flex-wrap items-center gap-3 border-b border-border bg-background py-3">
            {/* Category pills -- scrollable */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {categoryKeys.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleCategory(item.key)}
                  className={`inline-flex items-center whitespace-nowrap px-3 py-1.5 transition-colors text-sm shrink-0 ${
                    category === item.key
                      ? "bg-foreground text-background"
                      : "border border-border hover:border-foreground"
                  }`}
                >
                  {t(item.i18nKey as Parameters<typeof t>[0])}
                </button>
              ))}
            </div>

            {/* More Filters popover */}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border transition-colors shrink-0 ${
                    hasSecondaryFilters
                      ? "border-foreground text-foreground"
                      : "border-border text-muted hover:border-foreground"
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  {t("animations.moreFilters")}
                  {hasSecondaryFilters && (
                    <span className="ml-1 w-1.5 h-1.5 rounded-full bg-foreground" />
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-64 p-4 space-y-4">
                {/* Trigger */}
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted mb-2">
                    {t("animations.trigger")}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {triggerKeys.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => handleTrigger(item.key)}
                        className={`px-2.5 py-1 text-[11px] transition-colors ${
                          trigger === item.key
                            ? "bg-foreground text-background"
                            : "border border-border text-muted hover:border-foreground"
                        }`}
                      >
                        {t(item.i18nKey as Parameters<typeof t>[0])}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Difficulty */}
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted mb-2">
                    {t("animations.difficulty")}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {difficultyKeys.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => handleDifficulty(item.key)}
                        className={`px-2.5 py-1 text-[11px] transition-colors ${
                          difficulty === item.key
                            ? "bg-foreground text-background"
                            : "border border-border text-muted hover:border-foreground"
                        }`}
                      >
                        {t(item.i18nKey as Parameters<typeof t>[0])}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Clear secondary filters */}
                {hasSecondaryFilters && (
                  <button
                    type="button"
                    onClick={() => {
                      handleTrigger("all");
                      handleDifficulty("all");
                    }}
                    className="flex items-center gap-1 text-xs text-muted hover:text-foreground transition-colors"
                  >
                    <X className="w-3 h-3" />
                    Clear filters
                  </button>
                )}
              </PopoverContent>
            </Popover>

            {/* Search */}
            <div className="relative max-w-xs w-full ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={t("animations.searchPlaceholder")}
                className="w-full pl-10 pr-4 py-2 text-sm border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            {/* Results count */}
            <div className="flex items-center gap-3 shrink-0">
              <p className="text-sm text-muted">
                {filtered.length} {t("animations.results")}
              </p>
              {isSearching && (
                <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                </span>
              )}
            </div>
          </div>

          {/* Grid */}
          <div id="animations-results-top" className="scroll-mt-24">
          {filtered.length > 0 ? (
            isGrouped ? (
              <div className="space-y-12 md:space-y-14">
                {groupedSections.map((section) => (
                  <section
                    key={section.key}
                    id={`category-${section.key}`}
                    className="scroll-mt-24"
                  >
                    <div className="mb-5 flex items-baseline gap-3 border-b border-border pb-2">
                      <h2 className="text-xs uppercase tracking-[0.2em]">
                        {t(
                          (categoryKeys.find((c) => c.key === section.key)
                            ?.i18nKey ?? "animations.filterAll") as Parameters<typeof t>[0]
                        )}
                      </h2>
                      <span className="font-mono text-xs tabular-nums text-muted">
                        {String(section.items.length).padStart(2, "0")}
                      </span>
                    </div>
                    <div className={gridClassName}>
                      {section.items.map(renderCard)}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className={gridClassName}>{filtered.map(renderCard)}</div>
            )
          ) : (
            <div className="text-center py-16">
              <p className="text-muted">
                {t("animations.noResults")}
              </p>
            </div>
          )}
          </div>
        </div>
      </section>
    </>
  );
}
