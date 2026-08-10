import { getRecipeIds, hasRecipes } from "@/lib/recipes";
import { z } from "zod";
import { getFrontendReadiness } from "./readiness";
import { getStyleQuality } from "./quality";
import { getStyleBySlug } from "./registry";
import { getStyleTokens } from "./tokens-registry";

export const STYLE_PACK_SCHEMA_VERSION = "style-pack-v1" as const;

const componentSummarySchema = z.object({
  name: z.string(),
  description: z.string(),
  hasPreview: z.boolean(),
  hasCode: z.boolean(),
}).strict();

export const stylePackSchema = z.object({
  schemaVersion: z.literal(STYLE_PACK_SCHEMA_VERSION),
  slug: z.string(),
  name: z.string(),
  nameEn: z.string(),
  styleType: z.enum(["visual", "layout"]),
  category: z.enum(["modern", "retro", "minimal", "expressive"]),
  tags: z.array(z.string()),
  description: z.string(),
  philosophy: z.string(),
  colors: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.array(z.string()),
  }).strict(),
  keywords: z.array(z.string()),
  doList: z.array(z.string()),
  dontList: z.array(z.string()),
  components: z.record(z.string(), componentSummarySchema),
  variants: z.array(z.object({
    id: z.string(),
    name: z.string(),
    nameEn: z.string(),
    description: z.string(),
  }).strict()),
  atoms: z.unknown().nullable(),
  tokens: z.unknown().nullable(),
  recipes: z.object({
    available: z.boolean(),
    ids: z.array(z.string()),
  }).strict(),
  readiness: z.unknown(),
  quality: z.unknown(),
}).strict();

export type StylePack = z.infer<typeof stylePackSchema>;

/**
 * Build a compact, machine-readable view of the canonical StyleKit data.
 * Component source code and long AI prompts stay in the repository; the pack
 * exposes their availability and the structured rules needed for routing.
 */
export function getStylePack(slug: string): StylePack | null {
  const style = getStyleBySlug(slug);
  if (!style) return null;

  const pack = {
    schemaVersion: STYLE_PACK_SCHEMA_VERSION,
    slug: style.slug,
    name: style.name,
    nameEn: style.nameEn,
    styleType: style.styleType,
    category: style.category,
    tags: [...style.tags],
    description: style.descriptionEn ?? style.description,
    philosophy: style.philosophyEn ?? style.philosophy,
    colors: style.colors,
    keywords: [...(style.keywordsEn ?? style.keywords)],
    doList: [...(style.doListEn ?? style.doList)],
    dontList: [...(style.dontListEn ?? style.dontList)],
    components: Object.fromEntries(
      Object.entries(style.components).map(([id, component]) => [id, {
        name: component.name,
        description: component.description,
        hasPreview: Boolean(component.preview),
        hasCode: Boolean(component.code),
      }]),
    ),
    variants: (style.variants ?? []).map((variant) => ({
      id: variant.id,
      name: variant.name,
      nameEn: variant.nameEn,
      description: variant.description,
    })),
    atoms: style.atoms ?? null,
    tokens: getStyleTokens(slug) ?? null,
    recipes: {
      available: hasRecipes(slug),
      ids: getRecipeIds(slug),
    },
    readiness: getFrontendReadiness(style),
    quality: getStyleQuality(style),
  } satisfies StylePack;

  return stylePackSchema.parse(pack);
}

export function getStylePacks(slugs: readonly string[]): StylePack[] {
  return slugs.flatMap((slug) => {
    const pack = getStylePack(slug);
    return pack ? [pack] : [];
  });
}
