"use client";

import dynamic from "next/dynamic";
import { ArrowLeft, Clock, Zap, Code } from "lucide-react";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { useI18n } from "@/lib/i18n/context";
import { AnimationPreview } from "@/components/animations/animation-preview";
import type { Animation } from "@/lib/animations/types";

interface AnimationDetailContentProps {
  animation: Animation;
}

const categoryI18nMap: Record<string, string> = {
  entrance: "animations.categoryEntrance",
  exit: "animations.categoryExit",
  hover: "animations.categoryHover",
  scroll: "animations.categoryScroll",
  text: "animations.categoryText",
  loading: "animations.categoryLoading",
  background: "animations.categoryBackground",
  transition: "animations.categoryTransition",
  "micro-interaction": "animations.categoryMicroInteraction",
};

const triggerI18nMap: Record<string, string> = {
  "on-mount": "animations.triggerOnMount",
  "on-scroll": "animations.triggerOnScroll",
  "on-hover": "animations.triggerOnHover",
  "on-click": "animations.triggerOnClick",
  continuous: "animations.triggerContinuous",
  manual: "animations.triggerManual",
};

const difficultyI18nMap: Record<string, string> = {
  beginner: "animations.difficultyBeginner",
  intermediate: "animations.difficultyIntermediate",
  advanced: "animations.difficultyAdvanced",
};

const AnimationCodeTabs = dynamic(
  () => import("@/components/animations/animation-code-tabs").then((m) => ({ default: m.AnimationCodeTabs })),
  {
    ssr: false,
    loading: () => <SectionSkeleton className="min-h-[280px]" />,
  }
);
const AnimationPlayground = dynamic(
  () => import("@/components/animations/animation-playground").then((m) => ({ default: m.AnimationPlayground })),
  {
    ssr: false,
    loading: () => <SectionSkeleton className="min-h-[360px]" />,
  }
);
const RecommendedStyles = dynamic(
  () => import("@/components/animations/recommended-styles").then((m) => ({ default: m.RecommendedStyles })),
  {
    ssr: false,
    loading: () => <SectionSkeleton className="min-h-[160px]" />,
  }
);

export function AnimationDetailContent({ animation }: AnimationDetailContentProps) {
  const { t, locale } = useI18n();

  return (
    <div>
      {/* Header section -- editorial style */}
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <LocalizedLink
            href="/animations"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("animations.backToList")}
          </LocalizedLink>

          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-2">
            {locale === "zh" ? animation.name : animation.nameEn}
          </h1>
          <p className="text-xs text-muted mb-3">
            {locale === "zh" ? animation.nameEn : animation.name}
          </p>
          <p className="text-base text-muted max-w-2xl mb-4">
            {locale === "zh" ? animation.description : animation.descriptionEn}
          </p>

          {/* Tags -- editorial uppercase style */}
          <div className="flex flex-wrap gap-3">
            <span className="text-[10px] uppercase tracking-wider text-muted px-2 py-1 border border-border">
              {t(categoryI18nMap[animation.category] as Parameters<typeof t>[0])}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted px-2 py-1 border border-border">
              {t(triggerI18nMap[animation.trigger] as Parameters<typeof t>[0])}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted px-2 py-1 border border-border">
              {t(difficultyI18nMap[animation.difficulty] as Parameters<typeof t>[0])}
            </span>
            {animation.isGPUAccelerated && (
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted px-2 py-1 border border-border">
                <Zap className="w-3 h-3" />
                {t("animations.gpuAccelerated")}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section>
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16">
          {/* Preview */}
          <div className="mb-12 [content-visibility:auto] [contain-intrinsic-size:1px_380px]">
            <h2 className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("animations.previewTab")}
            </h2>
            <AnimationPreview slug={animation.slug} bg={animation.previewBg} />
          </div>

          {/* Code snippets */}
          <div className="mb-12 [content-visibility:auto] [contain-intrinsic-size:1px_420px]">
            <h2 className="text-xs tracking-widest uppercase text-muted mb-4">
              <Code className="w-4 h-4 inline-block mr-2 -mt-0.5" />
              {t("animations.codeTab")}
            </h2>
            <AnimationCodeTabs snippets={animation.codeSnippets} />
          </div>

          {/* Playground */}
          <div className="[content-visibility:auto] [contain-intrinsic-size:1px_440px]">
            <AnimationPlayground animation={animation} />
          </div>

          {/* Metadata grid */}
          <div className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border border border-border">
              <MetaCard
                label={t("animations.duration")}
                icon={<Clock className="w-3.5 h-3.5" />}
                value={animation.duration}
              />
              <MetaCard
                label={t("animations.easing")}
                value={animation.easing}
              />
              <MetaCard
                label={t("animations.cssProperties")}
                value={animation.cssProperties.join(", ")}
              />
            </div>
          </div>

          {/* Use Cases */}
          {animation.useCases.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xs tracking-widest uppercase text-muted mb-4">
                {t("animations.useCases")}
              </h2>
              <ul className="space-y-2">
                {animation.useCases.map((useCase) => (
                  <li
                    key={useCase}
                    className="flex items-start gap-2 text-sm text-muted"
                  >
                    <span className="mt-1.5 h-1 w-4 shrink-0 bg-foreground/20" />
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Animations */}
          {animation.relatedAnimations && animation.relatedAnimations.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xs tracking-widest uppercase text-muted mb-4">
                {t("animations.relatedAnimations")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {animation.relatedAnimations.map((slug) => (
                  <LocalizedLink
                    key={slug}
                    href={`/animations/${slug}`}
                    className="px-3 py-1.5 text-sm border border-border text-foreground hover:border-foreground transition-colors"
                  >
                    {slug}
                  </LocalizedLink>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Styles */}
          {animation.recommendedStyles && animation.recommendedStyles.length > 0 && (
            <div className="[content-visibility:auto] [contain-intrinsic-size:1px_220px]">
              <RecommendedStyles slugs={animation.recommendedStyles} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function SectionSkeleton({ className = "min-h-[240px]" }: { className?: string }) {
  return (
    <div className={`border border-border overflow-hidden animate-pulse ${className}`}>
      <div className="h-12 border-b border-border bg-muted/30" />
      <div className="p-6 space-y-4">
        <div className="h-24 rounded bg-muted/20" />
        <div className="h-3 w-3/4 rounded bg-muted/20" />
        <div className="h-3 w-1/2 rounded bg-muted/20" />
      </div>
    </div>
  );
}

function MetaCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-background p-4 md:p-5">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted mb-1.5">
        {icon}
        {label}
      </div>
      <p className="text-sm font-mono text-foreground break-all">
        {value}
      </p>
    </div>
  );
}
