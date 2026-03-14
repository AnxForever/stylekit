"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Zap, Code } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { AnimationPreview } from "@/components/animations/animation-preview";
import { AnimationCodeTabs } from "@/components/animations/animation-code-tabs";
import { AnimationPlayground } from "@/components/animations/animation-playground";
import { RecommendedStyles } from "@/components/animations/recommended-styles";
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

export function AnimationDetailContent({ animation }: AnimationDetailContentProps) {
  const { t, locale } = useI18n();

  return (
    <div>
      {/* Header section -- editorial style */}
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <Link
            href="/animations"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("animations.backToList")}
          </Link>

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
          <div className="mb-12">
            <h2 className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("animations.previewTab")}
            </h2>
            <AnimationPreview slug={animation.slug} bg={animation.previewBg} />
          </div>

          {/* Code snippets */}
          <div className="mb-12">
            <h2 className="text-xs tracking-widest uppercase text-muted mb-4">
              <Code className="w-4 h-4 inline-block mr-2 -mt-0.5" />
              {t("animations.codeTab")}
            </h2>
            <AnimationCodeTabs snippets={animation.codeSnippets} />
          </div>

          {/* Playground */}
          <AnimationPlayground animation={animation} />

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
            <div>
              <RecommendedStyles slugs={animation.recommendedStyles} />
            </div>
          )}
        </div>
      </section>
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
