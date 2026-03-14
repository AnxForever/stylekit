"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { AnimationCard, AnimationCardPreviewStyles } from "@/components/animations/animation-card";
import type { AnimationMeta, AnimationCategory, AnimationTrigger } from "@/lib/animations/types";

type CategoryFilter = AnimationCategory | "all";
type TriggerFilter = AnimationTrigger | "all";
type DifficultyFilter = "beginner" | "intermediate" | "advanced" | "all";

interface AnimationsContentProps {
  allAnimations: AnimationMeta[];
  initialCategory?: CategoryFilter;
  initialTrigger?: TriggerFilter;
  initialDifficulty?: DifficultyFilter;
}

const categoryKeys: { key: CategoryFilter; i18nKey: string }[] = [
  { key: "all", i18nKey: "animations.filterAll" },
  { key: "entrance", i18nKey: "animations.categoryEntrance" },
  { key: "exit", i18nKey: "animations.categoryExit" },
  { key: "hover", i18nKey: "animations.categoryHover" },
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

export function AnimationsContent({
  allAnimations,
  initialCategory = "all",
  initialTrigger = "all",
  initialDifficulty = "all",
}: AnimationsContentProps) {
  const { t } = useI18n();
  const [category, setCategory] = useState<CategoryFilter>(initialCategory);
  const [trigger, setTrigger] = useState<TriggerFilter>(initialTrigger);
  const [difficulty, setDifficulty] = useState<DifficultyFilter>(initialDifficulty);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = allAnimations;

    if (category !== "all") {
      result = result.filter((a) => a.category === category);
    }
    if (trigger !== "all") {
      result = result.filter((a) => a.trigger === trigger);
    }
    if (difficulty !== "all") {
      result = result.filter((a) => a.difficulty === difficulty);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
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
  }, [allAnimations, category, trigger, difficulty, search]);

  return (
    <>
      <AnimationCardPreviewStyles />
      {/* Page Header -- editorial style */}
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
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
            <span className="text-muted">{t("animations.category")}:</span>
            {categoryKeys.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setCategory(item.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 transition-colors text-sm ${
                  category === item.key
                    ? "bg-foreground text-background"
                    : "border border-border hover:border-foreground"
                }`}
              >
                {t(item.i18nKey as Parameters<typeof t>[0])}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
            <span className="text-muted">{t("animations.trigger")}:</span>
            {triggerKeys.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setTrigger(item.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 transition-colors text-sm ${
                  trigger === item.key
                    ? "bg-foreground text-background"
                    : "border border-border hover:border-foreground"
                }`}
              >
                {t(item.i18nKey as Parameters<typeof t>[0])}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
            <span className="text-muted">{t("animations.difficulty")}:</span>
            {difficultyKeys.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setDifficulty(item.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 transition-colors text-sm ${
                  difficulty === item.key
                    ? "bg-foreground text-background"
                    : "border border-border hover:border-foreground"
                }`}
              >
                {t(item.i18nKey as Parameters<typeof t>[0])}
              </button>
            ))}
          </div>

          {/* Search + Results count */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("animations.searchPlaceholder")}
                className="w-full pl-10 pr-4 py-2 text-sm border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
            <p className="text-sm text-muted">
              {filtered.length} {t("animations.results")}
            </p>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((anim) => (
                <AnimationCard key={anim.slug} animation={anim} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted">
                {t("animations.noResults")}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
