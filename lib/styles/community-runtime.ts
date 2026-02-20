import { getStyleBySlug as getStaticStyleBySlug } from "@/lib/styles";
import type { ComponentTemplate, DesignStyle, ExamplePrompt } from "@/lib/styles";
import {
  getAllStylesMeta,
  type StyleCategory,
  type StyleMeta,
  type StyleTag,
  type StyleType,
} from "@/lib/styles/meta";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import type { StyleTokens } from "@/lib/styles/tokens";
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

const STYLE_TYPES: ReadonlySet<StyleType> = new Set(["visual", "layout", "animation"]);
const STYLE_CATEGORIES: ReadonlySet<StyleCategory> = new Set([
  "modern",
  "retro",
  "minimal",
  "expressive",
]);
const STYLE_TAGS: ReadonlySet<StyleTag> = new Set([
  "modern",
  "retro",
  "minimal",
  "expressive",
  "high-contrast",
  "responsive",
  "brand-inspired",
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
  return tags.length > 0 ? tags : ["modern"];
}

function asStyleTokens(value: unknown): StyleTokens | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
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

function mapSubmissionToStyle(submission: SubmissionRecord): DesignStyle | null {
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

  const compatibleWith = asStringList(storedDesignStyle.compatibleWith).filter((item) =>
    SLUG_RE.test(item)
  );

  return {
    slug,
    name,
    nameEn,
    description,
    cover:
      asString(storedDesignStyle.cover) ??
      asString(formData.cover) ??
      `/styles/${slug}/opengraph-image`,
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
    philosophy:
      asString(storedDesignStyle.philosophy) ??
      asString(formData.philosophy) ??
      "Community submitted style.",
    doList: (() => {
      const list = asStringList(storedDesignStyle.doList ?? formData.doList);
      return list.length > 0 ? list : ["Keep style language consistent across components."];
    })(),
    dontList: (() => {
      const list = asStringList(storedDesignStyle.dontList ?? formData.dontList);
      return list.length > 0 ? list : ["Do not mix conflicting visual systems."];
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
    },
    globalCss: asString(storedDesignStyle.globalCss) ?? "",
    aiRules,
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

async function getApprovedSubmissionBySlugRuntime(
  slug: string
): Promise<SubmissionRecord | null> {
  const normalizedSlug = normalizeSlug(slug);
  if (!SLUG_RE.test(normalizedSlug)) {
    return null;
  }

  if (isSupabaseConfigured()) {
    try {
      return await getLatestApprovedSubmissionBySlugSupabase(normalizedSlug);
    } catch {
      return getLatestApprovedSubmissionBySlug(normalizedSlug);
    }
  }

  return getLatestApprovedSubmissionBySlug(normalizedSlug);
}

export async function resolveStyleBySlug(
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
}

export async function listCatalogStylesMeta(): Promise<StyleMeta[]> {
  const staticMeta = getAllStylesMeta();
  const staticSlugSet = new Set(staticMeta.map((item) => item.slug));

  const communitySubmissions = await listApprovedSubmissionsRuntime();
  const seenCommunitySlugs = new Set<string>();

  const communityMeta: StyleMeta[] = [];
  for (const submission of communitySubmissions) {
    const slug = normalizeSlug(submission.slug);
    if (!SLUG_RE.test(slug)) {
      continue;
    }
    if (staticSlugSet.has(slug) || seenCommunitySlugs.has(slug)) {
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
      cover: mappedStyle.cover,
      category: mappedStyle.category,
      styleType: mappedStyle.styleType,
      tags: mappedStyle.tags,
      compatibleWith: mappedStyle.compatibleWith,
      keywords: mappedStyle.keywords,
      colors: mappedStyle.colors,
    });
    seenCommunitySlugs.add(slug);
  }

  return [...staticMeta, ...communityMeta];
}
