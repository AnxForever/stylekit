"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, Clock, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
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

const AnimationSandbox = dynamic(
  () => import("@/components/animations/animation-sandbox").then((m) => ({ default: m.AnimationSandbox })),
  {
    ssr: false,
    loading: () => <SectionSkeleton className="min-h-[420px]" />,
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
      {/* Header -- compact */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-6 md:py-8">
          <Link
            href="/animations"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("animations.backToList")}
          </Link>

          <h1 className="text-2xl md:text-3xl lg:text-4xl mb-1.5">
            {locale === "zh" ? animation.name : animation.nameEn}
          </h1>
          <p className="text-xs text-muted mb-2">
            {locale === "zh" ? animation.nameEn : animation.name}
          </p>
          <p className="text-sm text-muted max-w-2xl mb-3">
            {locale === "zh" ? animation.description : animation.descriptionEn}
          </p>

          <div className="flex flex-wrap gap-2">
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

      {/* Sandbox Panel */}
      <section>
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <h2 className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("animations.sandbox")}
          </h2>
          <AnimationSandbox animation={animation} />
        </div>
      </section>

      {/* Metadata + Use Cases -- 2-column layout */}
      <section>
        <div className="max-w-6xl mx-auto px-6 md:px-12 pb-8 md:pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Metadata grid */}
            <div>
              <div className="grid grid-cols-1 gap-px bg-border border border-border">
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
              <div>
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
          </div>
        </div>
      </section>

      {/* Related + Styles */}
      <section>
        <div className="max-w-6xl mx-auto px-6 md:px-12 pb-12 md:pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Related Animations */}
            {animation.relatedAnimations && animation.relatedAnimations.length > 0 && (
              <div>
                <h2 className="text-xs tracking-widest uppercase text-muted mb-4">
                  {t("animations.relatedAnimations")}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {animation.relatedAnimations.map((slug) => (
                    <Link
                      key={slug}
                      href={`/animations/${slug}`}
                      className="px-3 py-1.5 text-sm border border-border text-foreground hover:border-foreground transition-colors"
                    >
                      {slug}
                    </Link>
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
