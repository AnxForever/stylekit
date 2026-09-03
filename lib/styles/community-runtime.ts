import { getStyleBySlug as getStaticStyleBySlug } from "./registry";
import type { ComponentTemplate, DesignStyle, ExamplePrompt } from "./types";
import { cache } from "react";
import {
  getAllStylesMeta,
  type StyleCategory,
  type StyleMeta,
  type StyleTag,
  type StyleType,
} from "./meta";
import { getStyleTokens } from "./tokens-registry";
import type { StyleTokens } from "./tokens";
import {
  getLatestApprovedSubmissionBySlug,
  listSubmissions,
  type SubmissionRecord,
} from "@/lib/submit/reviewer";
import {
  getLatestApprovedSubmissionBySlugSupabase,
  isSupabaseConfigured,
  listSubmissionsSupabase,
} from "@/lib/submit/reviewer-supabase";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const STYLE_TYPES: ReadonlySet<StyleType> = new Set(["visual", "layout"]);
const STYLE_CATEGORIES: ReadonlySet<StyleCategory> = new Set([
  "modern",
  "retro",
  "minimal",
  "expressive",
]);
const STYLE_TAGS: ReadonlySet<StyleTag> = new Set([
  "retro",
  "high-contrast",
  "responsive",
  "brand-inspired",
  "dark-theme",
  "colorful",
  "hand-drawn",
  "glassmorphic",
  "gradient",
  "geometric",
  "game-ui",
  "anime-aesthetic",
  "texture-heavy",
]);

export type RuntimeStyleSource = "static" | "community";

export interface RuntimeStyleResult {
  source: RuntimeStyleSource;
  style: DesignStyle;
  submissionId?: string;
  tokens: StyleTokens | null;
}

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  return value as Record<string, unknown>;
}

function asString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => asString(item))
    .filter((item): item is string => item !== null);
}

function toInlineSvgDataUri(value: unknown): string | null {
  const svg = asString(value);
  if (!svg) {
    return null;
  }
  if (svg.startsWith("data:image/svg+xml")) {
    return svg;
  }
  if (!svg.includes("<svg")) {
    return null;
  }
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function asStyleType(value: unknown): StyleType {
  if (typeof value === "string" && STYLE_TYPES.has(value as StyleType)) {
    return value as StyleType;
  }
  return "visual";
}

function asStyleCategory(value: unknown): StyleCategory {
  if (typeof value === "string" && STYLE_CATEGORIES.has(value as StyleCategory)) {
    return value as StyleCategory;
  }
  return "modern";
}

function asStyleTags(value: unknown): StyleTag[] {
  const tags = asStringList(value).filter((tag): tag is StyleTag =>
    STYLE_TAGS.has(tag as StyleTag)
  );
  return tags.length > 0 ? tags : ["retro"];
}

/**
 * Community token payloads are stored as free-form JSON, so a bare cast would
 * hand consumers a StyleTokens that is missing whole groups. Anything reading
 * these tokens (generateEnhancedAIRules, the design spec) walks
 * `tokens.<group>.<field>` unguarded and throws on the first absent group, so
 * a partial payload has to read as "no tokens" rather than as tokens.
 */
const REQUIRED_TOKEN_GROUPS = [
  "colors",
  "typography",
  "spacing",
  "border",
  "shadow",
  "interaction",
] as const;

function asStyleTokens(value: unknown): StyleTokens | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const record = value as Record<string, unknown>;
  for (const group of REQUIRED_TOKEN_GROUPS) {
    const entry = record[group];
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      return null;
    }
  }

  return value as StyleTokens;
}

function normalizeSlug(slug: string): string {
  return slug.trim().toLowerCase();
}

function parseComponentTemplate(
  value: unknown,
  fallbackName: string,
  fallbackDescription: string,
  fallbackCode: string
): ComponentTemplate {
  const record = asRecord(value);
  return {
    name: asString(record.name) ?? fallbackName,
    description: asString(record.description) ?? fallbackDescription,
    code: asString(record.code) ?? fallbackCode,
  };
}

function parseOptionalComponentTemplate(
  value: unknown,
  fallbackName: string,
  fallbackDescription: string,
  fallbackCode: string | null
): ComponentTemplate | undefined {
  const record = asRecord(value);
  const code = asString(record.code) ?? fallbackCode;
  if (!code) {
    return undefined;
  }

  return {
    name: asString(record.name) ?? fallbackName,
    description: asString(record.description) ?? fallbackDescription,
    code,
  };
}

function parseExamplePrompts(value: unknown): ExamplePrompt[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const prompts = value
    .map((item) => {
      const record = asRecord(item);
      const title = asString(record.title);
      const titleEn = asString(record.titleEn);
      const description = asString(record.description);
      const descriptionEn = asString(record.descriptionEn);
      const prompt = asString(record.prompt);

      if (!title || !titleEn || !description || !descriptionEn || !prompt) {
        return null;
      }

      return {
        title,
        titleEn,
        description,
        descriptionEn,
        prompt,
      } satisfies ExamplePrompt;
    })
    .filter((item): item is ExamplePrompt => item !== null);

  return prompts.length > 0 ? prompts : undefined;
}

export function mapSubmissionToStyle(submission: SubmissionRecord): DesignStyle | null {
  const slug = normalizeSlug(submission.slug);
  if (!SLUG_RE.test(slug)) {
    return null;
  }

  const formData = asRecord(submission.formData);
  const storedDesignStyle = asRecord(submission.designStyle);

  const name =
    asString(storedDesignStyle.name) ??
    asString(formData.name) ??
    asString(formData.nameEn) ??
    slug;
  const nameEn =
    asString(storedDesignStyle.nameEn) ??
    asString(formData.nameEn) ??
    asString(formData.name) ??
    slug;

  const description =
    asString(storedDesignStyle.description) ??
    asString(formData.description) ??
    `${nameEn} community style submission.`;

  const colorsRecord = asRecord(storedDesignStyle.colors);
  const primaryColor =
    asString(colorsRecord.primary) ??
    asString(formData.primaryColor) ??
    "#111111";
  const secondaryColor =
    asString(colorsRecord.secondary) ??
    asString(formData.secondaryColor) ??
    "#ffffff";
  const accentColors = asStringList(colorsRecord.accent);
  const fallbackAccents = asStringList(formData.accentColors);
  const accent =
    accentColors.length > 0
      ? accentColors
      : fallbackAccents.length > 0
        ? fallbackAccents
        : [primaryColor];

  const componentsRecord = asRecord(storedDesignStyle.components);
  const buttonFallbackCode =
    asString(formData.buttonCode) ??
    `<button className="px-4 py-2" style={{ background: "${primaryColor}", color: "${secondaryColor}" }}>Button</button>`;
  const cardFallbackCode =
    asString(formData.cardCode) ??
    `<div className="p-4 border" style={{ borderColor: "${primaryColor}" }}>Card</div>`;
  const inputFallbackCode =
    asString(formData.inputCode) ??
    `<input className="px-3 py-2 border" style={{ borderColor: "${primaryColor}" }} placeholder="Input" />`;

  const aiRules =
    asString(storedDesignStyle.aiRules) ??
    asStringList(formData.aiRules).join("\n") ??
    "";

  const assetsRecord = asRecord(formData.__assets);
  const legacyAssetsRecord = asRecord(formData.assets);
  const inlineCover =
    toInlineSvgDataUri(assetsRecord.coverSvg) ??
    toInlineSvgDataUri(legacyAssetsRecord.coverSvg);
  const fallbackCover = `/styles/${slug}/opengraph-image`;
  const legacyGeneratedCover = `/styles/${slug}.svg`;
  const configuredCover = asString(storedDesignStyle.cover) ?? asString(formData.cover);
  const resolvedCover =
    configuredCover && configuredCover !== legacyGeneratedCover ? configuredCover : fallbackCover;

  const navComponent = parseOptionalComponentTemplate(
    componentsRecord.nav,
    "Nav",
    "Navigation bar",
    asString(formData.navCode)
  );
  const heroComponent = parseOptionalComponentTemplate(
    componentsRecord.hero,
    "Hero",
    "Hero section",
    asString(formData.heroCode)
  );
  const footerComponent = parseOptionalComponentTemplate(
    componentsRecord.footer,
    "Footer",
    "Footer section",
    asString(formData.footerCode)
  );

  const compatibleWith = asStringList(storedDesignStyle.compatibleWith).filter((item) =>
    SLUG_RE.test(item)
  );

  return {
    slug,
    name,
    nameEn,
    description,
    cover: inlineCover ?? resolvedCover,
    styleType: asStyleType(storedDesignStyle.styleType ?? formData.styleType),
    tags: asStyleTags(storedDesignStyle.tags ?? formData.tags),
    compatibleWith: compatibleWith.length > 0 ? compatibleWith : undefined,
    category: asStyleCategory(storedDesignStyle.category ?? formData.category),
    colors: {
      primary: primaryColor,
      secondary: secondaryColor,
      accent,
    },
    keywords: asStringList(storedDesignStyle.keywords ?? formData.keywords),
    descriptionEn: asString(storedDesignStyle.descriptionEn) ?? undefined,
    philosophy:
      asString(storedDesignStyle.philosophy) ??
      asString(formData.philosophy) ??
      "Community submitted style.",
    philosophyEn: asString(storedDesignStyle.philosophyEn) ?? undefined,
    doList: (() => {
      const list = asStringList(storedDesignStyle.doList ?? formData.doList);
      // No fallback rule here on purpose. The submission gates require a
      // non-empty doList, so an empty one means the row predates the gates or
      // was hand-edited. Inventing "keep style language consistent" made those
      // rows look complete and taught contributors that empty lists were fine.
      return list;
    })(),
    doListEn: (() => {
      const list = asStringList(storedDesignStyle.doListEn);
      return list.length > 0 ? list : undefined;
    })(),
    dontList: asStringList(storedDesignStyle.dontList ?? formData.dontList),
    dontListEn: (() => {
      const list = asStringList(storedDesignStyle.dontListEn);
      return list.length > 0 ? list : undefined;
    })(),
    components: {
      button: parseComponentTemplate(
        componentsRecord.button,
        "Button",
        "Primary button",
        buttonFallbackCode
      ),
      card: parseComponentTemplate(
        componentsRecord.card,
        "Card",
        "Content card",
        cardFallbackCode
      ),
      input: parseComponentTemplate(
        componentsRecord.input,
        "Input",
        "Text input",
        inputFallbackCode
      ),
      ...(navComponent ? { nav: navComponent } : {}),
      ...(heroComponent ? { hero: heroComponent } : {}),
      ...(footerComponent ? { footer: footerComponent } : {}),
    },
    globalCss: asString(storedDesignStyle.globalCss) ?? "",
    aiRules,
    aiRulesEn: asString(storedDesignStyle.aiRulesEn) ?? undefined,
    examplePrompts: parseExamplePrompts(storedDesignStyle.examplePrompts),
  };
}

async function listApprovedSubmissionsRuntime(): Promise<SubmissionRecord[]> {
  if (isSupabaseConfigured()) {
    try {
      return await listSubmissionsSupabase("approved");
    } catch {
      return listSubmissions("approved");
    }
  }

  return listSubmissions("approved");
}

/**
 * A hidden submission is still approved — the review trail and the author's own
 * history keep it — but a moderator has pulled it from the public catalog, so
 * every public read has to treat it as absent. Rows written before migration
 * 035 carry no visibility at all and stay visible.
 */
function isPubliclyVisible(submission: SubmissionRecord): boolean {
  return submission.visibility !== "hidden";
}

async function getApprovedSubmissionBySlugRuntime(
  slug: string
): Promise<SubmissionRecord | null> {
  const normalizedSlug = normalizeSlug(slug);
  if (!SLUG_RE.test(normalizedSlug)) {
    return null;
  }

  const found = await (async () => {
    if (isSupabaseConfigured()) {
      try {
        return await getLatestApprovedSubmissionBySlugSupabase(normalizedSlug);
      } catch {
        return getLatestApprovedSubmissionBySlug(normalizedSlug);
      }
    }
    return getLatestApprovedSubmissionBySlug(normalizedSlug);
  })();

  // Guarding inside the lookup covers every public reader at once.
  return found && isPubliclyVisible(found) ? found : null;
}

export const resolveStyleBySlug = cache(async function resolveStyleBySlug(
  slug: string
): Promise<RuntimeStyleResult | null> {
  const normalizedSlug = normalizeSlug(slug);
  if (!normalizedSlug) {
    return null;
  }

  const staticStyle = getStaticStyleBySlug(normalizedSlug);
  if (staticStyle) {
    return {
      source: "static",
      style: staticStyle,
      tokens: getStyleTokens(normalizedSlug) ?? null,
    };
  }

  const submission = await getApprovedSubmissionBySlugRuntime(normalizedSlug);
  if (!submission) {
    return null;
  }

  const style = mapSubmissionToStyle(submission);
  if (!style) {
    return null;
  }

  return {
    source: "community",
    style,
    submissionId: submission.id,
    tokens: asStyleTokens(submission.tokens),
  };
});

/**
 * Approved submissions only, excluding anything the curated library already has.
 *
 * Split out from the old `listCatalogStylesMeta`, which returned curated and
 * community styles in one array. That merge was the source of a live
 * contradiction: `/api/styles` advertised community slugs that
 * `app/styles/[slug]` could never render, because it fixes its params at build
 * time. The two catalogs now have separate endpoints and separate routes.
 */
/**
 * Catalog metadata plus the submission facts the community catalog sorts and
 * badges by. Structurally a StyleMeta, so every StyleMeta consumer still works.
 */
export interface CommunityStyleMeta extends StyleMeta {
  publishedAt?: string;
  promoted?: boolean;
}

export interface CommunityAttribution {
  authorName: string | null;
  avatarUrl: string | null;
}

/**
 * Contributor credit for one approved community style.
 *
 * Kept separate from RuntimeStyleResult so the shared delivery contract, which
 * curated styles also flow through, stays free of submission-only fields. The
 * lookup is React-cached upstream, so calling this next to resolveStyleBySlug
 * does not cost a second round trip.
 */
export const getCommunityAttribution = cache(async function getCommunityAttribution(
  slug: string
): Promise<CommunityAttribution | null> {
  const submission = await getApprovedSubmissionBySlugRuntime(normalizeSlug(slug));
  if (!submission) {
    return null;
  }

  const author = asRecord(asRecord(submission.formData).__author);
  return {
    authorName: asString(author.handle) ?? submission.authorName ?? null,
    avatarUrl: asString(author.avatarUrl),
  };
});

export async function listCommunityStylesMeta(): Promise<CommunityStyleMeta[]> {
  const curatedSlugs = new Set(getAllStylesMeta().map((item) => item.slug));
  const communitySubmissions = (await listApprovedSubmissionsRuntime()).filter(
    isPubliclyVisible
  );
  const seenCommunitySlugs = new Set<string>();

  const communityMeta: CommunityStyleMeta[] = [];
  for (const submission of communitySubmissions) {
    const slug = normalizeSlug(submission.slug);
    if (!SLUG_RE.test(slug)) {
      continue;
    }
    if (curatedSlugs.has(slug) || seenCommunitySlugs.has(slug)) {
      continue;
    }

    const mappedStyle = mapSubmissionToStyle(submission);
    if (!mappedStyle) {
      continue;
    }

    communityMeta.push({
      slug: mappedStyle.slug,
      name: mappedStyle.name,
      nameEn: mappedStyle.nameEn,
      description: mappedStyle.description,
      descriptionEn:
        mappedStyle.descriptionEn ||
        `Explore the visual language, layout principles, and interaction patterns of ${mappedStyle.nameEn}.`,
      cover: mappedStyle.cover,
      category: mappedStyle.category,
      styleType: mappedStyle.styleType,
      tags: mappedStyle.tags,
      compatibleWith: mappedStyle.compatibleWith,
      keywords: mappedStyle.keywords,
      colors: mappedStyle.colors,
      // reviewedAt is when the style actually became visible; submittedAt is
      // the fallback for rows approved before that column was written.
      publishedAt: submission.reviewedAt ?? submission.submittedAt,
      promoted: submission.visibility === "promoted",
    });
    seenCommunitySlugs.add(slug);
  }

  return communityMeta;
}
