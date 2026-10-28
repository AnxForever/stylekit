import type { StyleMeta } from "@/lib/styles/meta-types";

type GuideRelationStyle = Pick<StyleMeta, "slug" | "name" | "nameEn">;

const RELATION_STYLE_ALIASES: Readonly<Record<string, string>> = {
  "neo brutalism": "neo-brutalist",
  "anti design movement": "anti-design",
};

function normalizeLabel(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

/**
 * Resolve a guide's display name to a canonical style slug only when that
 * style exists in the current public metadata registry.
 */
export function resolveGuideRelatedStyleSlug(
  label: string,
  styles: readonly GuideRelationStyle[],
): string | undefined {
  const normalizedLabel = normalizeLabel(label);
  if (!normalizedLabel) return undefined;

  const exactMatch = styles.find((style) =>
    [style.slug, style.name, style.nameEn].some(
      (candidate) => normalizeLabel(candidate) === normalizedLabel,
    ),
  );
  const candidateSlug =
    exactMatch?.slug ?? RELATION_STYLE_ALIASES[normalizedLabel];

  return candidateSlug && styles.some((style) => style.slug === candidateSlug)
    ? candidateSlug
    : undefined;
}
