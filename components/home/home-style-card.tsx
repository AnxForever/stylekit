/// <reference types="react/canary" />
"use client";

import { ViewTransition } from "react";
import { FavoriteButton } from "@/components/favorite-button";
import { AddToKitButton } from "@/components/kit/add-to-kit-button";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { StyleCoverPreview } from "@/components/style-preview/style-cover-preview";
import { useI18n } from "@/lib/i18n/context";
import type { StyleMeta } from "@/lib/styles/meta";
import { getScenarioLabel, getStyleScenarios } from "@/lib/styles/scenarios";

interface HomeStyleCardProps {
  style: StyleMeta;
  /**
   * Whether this instance owns the shared-element view-transition boundary.
   * The home Style Catalog mounts two lists at once (mobile carousel +
   * desktop grid) and the first few slugs overlap. Two `<ViewTransition>`
   * with the same name mounted simultaneously makes React abort the morph,
   * so only the list visible at the current breakpoint enables it.
   */
  enableViewTransition?: boolean;
}

export function HomeStyleCard({ style, enableViewTransition = true }: HomeStyleCardProps) {
  const { locale } = useI18n();
  const scenarios = getStyleScenarios(style, 2);
  const description = locale === "zh" ? style.description : style.descriptionEn;
  const primaryName = locale === "zh" ? style.name : style.nameEn || style.name;
  const secondaryName = locale === "zh" ? style.nameEn : style.name;
  const shouldShowSecondaryName = Boolean(secondaryName && secondaryName !== primaryName);
  const cardClassName = "group relative border border-border bg-background motion-safe:transition-[border-color,transform,box-shadow] motion-safe:duration-200 hover:border-foreground focus-within:border-foreground motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md";

  const cover = (
    <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden border-b border-border/80 bg-zinc-100 dark:bg-zinc-900">
      <StyleCoverPreview
        styleSlug={style.slug}
        interactive={false}
        className="motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.02]"
      />
    </div>
  );

  return (
    <div className="relative">
      <div className={cardClassName}>
        <LocalizedLink
          href={`/styles/${style.slug}`}
          aria-label={`${primaryName} ${locale === "zh" ? "详情" : "details"}`}
          className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
        {/* Shared-element transition into the style detail cover — same pair
            name as StyleCard on /styles so home cards get the identical
            click-through animation. Only the list visible at the current
            breakpoint owns the boundary (see enableViewTransition) so the
            hidden duplicate list doesn't clash on the same name. */}
        {enableViewTransition ? (
          <ViewTransition
            name={`style-cover-${style.slug}`}
            enter="none"
            exit="none"
            update="none"
          >
            {cover}
          </ViewTransition>
        ) : (
          cover
        )}

        {style.colors && (
          <div className="h-1.5 flex">
            <div className="flex-1" style={{ backgroundColor: style.colors.primary }} />
            <div className="flex-1" style={{ backgroundColor: style.colors.secondary }} />
            {style.colors.accent?.slice(0, 2).map((color, index) => (
              <div key={color || index} className="flex-1" style={{ backgroundColor: color }} />
            ))}
          </div>
        )}

        <div className="p-3 sm:p-4 md:p-5">
          <div className="flex min-w-0 items-center gap-2 mb-2">
            <h3 className="truncate text-base leading-snug group-hover:text-accent group-focus-visible:text-accent transition-colors">
              {primaryName}
            </h3>
            {shouldShowSecondaryName && (
              <span className="hidden shrink-0 text-sm text-muted sm:inline">
                {secondaryName}
              </span>
            )}
          </div>
          <p className="line-clamp-2 text-sm text-muted leading-relaxed">
            {description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {scenarios.map((scenario) => (
              <span
                key={scenario}
                className="text-[10px] px-2 py-0.5 border border-border text-muted"
              >
                {getScenarioLabel(scenario, locale)}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-2 right-2 z-20 flex items-center gap-1">
        <AddToKitButton
          type="style"
          slug={style.slug}
          size="sm"
          className="bg-white/80 dark:bg-black/50 backdrop-blur-sm"
        />
        <FavoriteButton
          slug={style.slug}
          size="sm"
          className="bg-white/80 dark:bg-black/50 backdrop-blur-sm"
        />
      </div>
    </div>
  );
}
