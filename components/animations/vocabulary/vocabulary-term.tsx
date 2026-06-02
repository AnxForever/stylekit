"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { localizeHref } from "@/lib/i18n/routing";
import { getAnimationBySlug } from "@/lib/animations";
import { getVocabularyTermById, type VocabularyTerm } from "@/lib/animations/vocabulary";
import { AnimationPreview } from "@/components/animations/animation-preview";

interface VocabularyTermCardProps {
  term: VocabularyTerm;
  validSlugs: Set<string>;
}

/**
 * One term: name + definition on the left, the canonical animation
 * preview on the right, plus a "see also" row of related patterns
 * and inline links to related terms. The preview only renders when
 * the primary example pattern still exists in the catalog, so a
 * removed animation gracefully degrades to a definition-only card.
 */
export function VocabularyTermCard({
  term,
  validSlugs,
}: VocabularyTermCardProps) {
  const { t, locale } = useI18n();

  // Pick the first example that's still in the catalog. Otherwise the
  // term renders without a primary preview but keeps the related list.
  const primary = term.examplePatterns.find((slug) => validSlugs.has(slug));
  const primaryMeta = primary ? getAnimationBySlug(primary) : undefined;
  const relatedPatterns = term.examplePatterns.filter(
    (slug) => slug !== primary && validSlugs.has(slug),
  );

  return (
    <article
      id={`term-${term.id}`}
      className="group relative border border-border bg-background p-5 md:p-6 flex flex-col gap-4 transition-colors scroll-mt-32"
    >
      <div>
        <h3 className="text-lg md:text-xl font-serif tracking-tight mb-2">
          {t(term.nameKey)}
        </h3>
        <p className="text-sm leading-relaxed text-muted">
          {t(term.definitionKey)}
        </p>
      </div>

      {primary && primaryMeta && (
        <div className="border border-border/60 bg-muted/20">
          <AnimationPreview slug={primary} bg="light" />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] uppercase tracking-[0.18em] text-muted">
        {primary && primaryMeta && (
          <Link
            href={localizeHref(`/animations/${primaryMeta.slug}`, locale)}
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <span>{locale === "zh" ? primaryMeta.name : primaryMeta.nameEn}</span>
            <span aria-hidden>→</span>
          </Link>
        )}
        {relatedPatterns.length > 0 && (
          <span className="text-muted/60">
            {locale === "zh" ? "另见" : "also"}
          </span>
        )}
        {relatedPatterns.map((slug) => {
          const meta = getAnimationBySlug(slug);
          if (!meta) return null;
          return (
            <Link
              key={slug}
              href={localizeHref(`/animations/${meta.slug}`, locale)}
              className="hover:text-foreground transition-colors"
            >
              {locale === "zh" ? meta.name : meta.nameEn}
            </Link>
          );
        })}
      </div>

      {term.relatedTerms && term.relatedTerms.length > 0 && (
        <div className="pt-3 border-t border-border/60 text-xs text-muted">
          <span className="uppercase tracking-[0.18em] mr-2">
            {locale === "zh" ? "相关" : "Related"}
          </span>
          {term.relatedTerms.map((id, i) => (
            <span key={id}>
              <a
                href={`#term-${id}`}
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                {resolveRelatedName(t, id)}
              </a>
              {i < (term.relatedTerms?.length ?? 0) - 1 ? " · " : ""}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

/**
 * Render the name of a related term by looking it up in the
 * vocabulary registry. Kept as a tiny helper so <VocabularyTermCard>
 * stays a one-component file.
 */
function resolveRelatedName(
  t: ReturnType<typeof useI18n>["t"],
  id: string,
): string {
  const related = getVocabularyTermById(id);
  if (!related) return id;
  return t(related.nameKey);
}
