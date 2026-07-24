import { LocalizedLink } from "@/components/i18n/localized-link";
import { StyleCoverPreview } from "@/components/style-preview/style-cover-preview";
import { useI18n } from "@/lib/i18n/context";
import type { StyleMeta } from "@/lib/styles/meta";
import { getScenarioLabel, getStyleScenarios } from "@/lib/styles/scenarios";

interface HomeStyleCardProps {
  style: StyleMeta;
}

export function HomeStyleCard({ style }: HomeStyleCardProps) {
  const { locale } = useI18n();
  const scenarios = getStyleScenarios(style, 2);
  const description = locale === "zh" ? style.description : style.descriptionEn;
  const primaryName = locale === "zh" ? style.name : style.nameEn || style.name;
  const secondaryName = locale === "zh" ? style.nameEn : style.name;
  const shouldShowSecondaryName = Boolean(secondaryName && secondaryName !== primaryName);
  const cardClassName = "group relative border border-border bg-background motion-safe:transition-[border-color,transform,box-shadow] motion-safe:duration-200 hover:border-foreground focus-within:border-foreground motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md";

  return (
    <div className={cardClassName}>
      <LocalizedLink
        href={`/styles/${style.slug}`}
        aria-label={`${primaryName} ${locale === "zh" ? "详情" : "details"}`}
        className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      />
      <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden border-b border-border/80 bg-zinc-100 dark:bg-zinc-900">
        <StyleCoverPreview
          styleSlug={style.slug}
          interactive={false}
          className="motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.02]"
        />
      </div>

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
  );
}
