/**
 * The single source of truth behind every export we publish.
 *
 * DESIGN.md, the Tailwind `@theme` block, the `:root` variable sheet and the
 * DTCG token file are four renderings of a `DesignSpec` — not four documents
 * maintained side by side. If a value has to be written twice, it belongs here.
 *
 * Text that a reader sees carries both locales: the catalogue is bilingual and
 * a spec missing one language would silently degrade a page that already ranks
 * in that language.
 */

export type SpecLocale = "zh" | "en";

export interface LocalizedText {
  zh: string;
  en: string;
}

/** Where a color sits in the system, which decides how it is presented. */
export type ColorGroup = "brand" | "neutral" | "surface" | "accent";

export interface ColorToken {
  name: string;
  nameEn: string;
  /** Hex value, lowercase, with the leading `#`. */
  value: string;
  group: ColorGroup;
  /**
   * When to reach for this color, not what it looks like. This sentence is the
   * difference between a palette and a design system.
   */
  role: LocalizedText;
  /** CSS custom property name, including the leading `--`. */
  token: string;
}

export interface FontToken {
  family: string;
  /** Honest fallback a reader can actually install. */
  substitute: string;
  weights: readonly number[];
  sizes: readonly number[];
  lineHeight: {
    display: number;
    heading: number;
    body: number;
  };
  tracking: {
    display: string;
    label: string;
  };
  /** OpenType features that carry the typeface's character, e.g. `ss04`. */
  features?: readonly string[];
  role: LocalizedText;
  token: string;
}

export interface TypeScaleStep {
  /** Semantic name used in prose and tokens: display, heading, body-lg... */
  role: string;
  font?: string;
  weight?: number;
  /** Pixels, unitless. */
  size: number;
  lineHeight: number;
  tracking?: string;
  token: string;
}

export interface SpacingSpec {
  /** Base unit in pixels. Everything else is a multiple of it. */
  base: number;
  density: "compact" | "comfortable" | "airy";
  scale: readonly number[];
  maxWidth: number;
  sectionGap: number;
  cardPadding: number;
  elementGap: number;
}

export interface RadiusToken {
  /** Component family the radius applies to: cards, buttons, inputs... */
  element: string;
  value: string;
}

export interface SurfaceToken {
  level: number;
  name: string;
  value: string;
  purpose: string;
}

export interface ElevationToken {
  name: string;
  value: string;
}

export interface ComponentSpec {
  name: string;
  role: LocalizedText;
  /**
   * A parameter sentence that lets someone rebuild the component from scratch:
   * size, weight, border, fill, padding. Not a code dump.
   */
  construction: LocalizedText;
  sizes?: string;
  states?: string;
  /** Optional reference markup. Reconstructions, never source components. */
  html?: string;
}

export interface PromptGuide {
  /** Slot to hex, for the six slots an agent needs first. */
  quickColors: Readonly<Record<string, string>>;
  prompts: readonly LocalizedText[];
}

export interface SimilarStyle {
  name: string;
  slug?: string;
  why: LocalizedText;
}

export interface CustomSection {
  title: LocalizedText;
  body: LocalizedText;
}

/**
 * `stub` renders colors and the do/don't list only. It supports incremental
 * backfills while complete documents are still being prepared.
 */
export type SpecCompleteness = "stub" | "partial" | "full";

export interface DesignSpec {
  slug: string;
  name: string;
  nameEn: string;
  sourceUrl?: string;
  cover: string;
  theme: "light" | "dark" | "mixed";
  /** One line that names the visual thesis. Shown on every card. */
  northStar: LocalizedText;
  /** The long paragraph: what the system is, how contrast is achieved, why it works. */
  summary: LocalizedText;
  colors: readonly ColorToken[];
  fonts: readonly FontToken[];
  typeScale: readonly TypeScaleStep[];
  spacing: SpacingSpec;
  radii: readonly RadiusToken[];
  surfaces: readonly SurfaceToken[];
  elevation: readonly ElevationToken[];
  components: readonly ComponentSpec[];
  imagery: LocalizedText;
  layout: LocalizedText;
  dos: readonly LocalizedText[];
  donts: readonly LocalizedText[];
  promptGuide: PromptGuide;
  similar: readonly SimilarStyle[];
  customSections?: readonly CustomSection[];
  completeness: SpecCompleteness;
}
