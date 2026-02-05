import type { StyleCategory, StyleTag, StyleType } from "@/lib/styles/meta";

export interface ExtractedStyleDraft {
  name?: string;
  nameEn?: string;
  slug?: string;
  description?: string;
  category?: StyleCategory;
  styleType?: StyleType;
  tags?: StyleTag[];
  primaryColor?: string;
  secondaryColor?: string;
  accentColors?: string[];
  keywords?: string[];
  philosophy?: string;
  doList?: string[];
  dontList?: string[];
  buttonCode?: string;
  cardCode?: string;
  inputCode?: string;
}

export interface ParseStyleExtractorResult {
  ok: boolean;
  source: "json" | "markdown";
  data?: ExtractedStyleDraft;
  error?: string;
}

const HEX_COLOR_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const HEX_COLOR_GLOBAL = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g;

const DO_HEADING_KEYS = [
  "do",
  "dos",
  "required",
  "must",
  "best practice",
  "must-have",
  "必须",
  "推荐",
  "应当",
];

const DONT_HEADING_KEYS = [
  "don't",
  "dont",
  "forbidden",
  "avoid",
  "anti",
  "禁止",
  "避免",
  "不要",
];

const PHILOSOPHY_HEADING_KEYS = [
  "philosophy",
  "design philosophy",
  "设计哲学",
  "设计理念",
];

const BUTTON_KEYS = ["button", "按钮"];
const CARD_KEYS = ["card", "卡片"];
const INPUT_KEYS = ["input", "form", "field", "输入", "表单"];

type HeadingSection = "do" | "dont" | "philosophy" | null;

export function parseStyleExtractorInput(input: string): ParseStyleExtractorResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      ok: false,
      source: "markdown",
      error: "Input is empty.",
    };
  }

  const jsonDraft = parseJsonDraft(trimmed);
  if (jsonDraft && hasMeaningfulDraft(jsonDraft)) {
    return {
      ok: true,
      source: "json",
      data: finalizeDraft(jsonDraft),
    };
  }

  const markdownDraft = parseMarkdownDraft(trimmed);
  if (hasMeaningfulDraft(markdownDraft)) {
    return {
      ok: true,
      source: "markdown",
      data: finalizeDraft(markdownDraft),
    };
  }

  return {
    ok: false,
    source: "markdown",
    error: "No recognizable style fields were found.",
  };
}

function parseJsonDraft(text: string): ExtractedStyleDraft | null {
  if (!(text.startsWith("{") || text.startsWith("["))) return null;

  try {
    const parsed = JSON.parse(text);
    return draftFromObject(parsed);
  } catch {
    return null;
  }
}

function draftFromObject(value: unknown): ExtractedStyleDraft {
  const obj = asRecord(Array.isArray(value) ? value[0] : value);
  if (!obj) return {};

  const name = pickString(obj, [
    "name",
    "style.name",
    "title",
    "styleName",
    "meta.name",
  ]);
  const nameEn = pickString(obj, [
    "nameEn",
    "style.nameEn",
    "englishName",
    "meta.nameEn",
  ]);

  const slug =
    pickString(obj, ["slug", "styleSlug", "meta.styleSlug"]) ??
    slugify(nameEn ?? name ?? "");

  const description = pickString(obj, [
    "description",
    "style.description",
    "summary",
    "meta.description",
  ]);

  const philosophy = pickString(obj, [
    "philosophy",
    "style.philosophy",
    "designPhilosophy",
  ]);

  const keywords = normalizeStringArray(
    pickArray(obj, ["keywords", "style.keywords", "meta.keywords"])
  );

  const doList = normalizeStringArray(
    pickArray(obj, [
      "doList",
      "style.doList",
      "rules.do",
      "requiredRules",
      "required",
      "must",
    ])
  );

  const dontList = normalizeStringArray(
    pickArray(obj, [
      "dontList",
      "style.dontList",
      "rules.dont",
      "forbiddenRules",
      "forbidden",
      "avoid",
    ])
  );

  const primaryColor = normalizeColor(
    pickString(obj, [
      "primaryColor",
      "colors.primary",
      "style.colors.primary",
      "palette.primary",
    ])
  );

  const secondaryColor = normalizeColor(
    pickString(obj, [
      "secondaryColor",
      "colors.secondary",
      "style.colors.secondary",
      "palette.secondary",
    ])
  );

  const accentColors = normalizeColorArray(
    pickArray(obj, [
      "accentColors",
      "colors.accent",
      "style.colors.accent",
      "palette.accent",
    ])
  );

  const buttonCode = pickCode(obj, [
    "buttonCode",
    "components.button.code",
    "components.button",
    "examples.button",
  ]);
  const cardCode = pickCode(obj, [
    "cardCode",
    "components.card.code",
    "components.card",
    "examples.card",
  ]);
  const inputCode = pickCode(obj, [
    "inputCode",
    "components.input.code",
    "components.input",
    "examples.input",
    "components.field.code",
  ]);

  const styleTypeRaw = pickString(obj, [
    "styleType",
    "type",
    "style.type",
    "style.styleType",
  ]);
  const categoryRaw = pickString(obj, ["category", "style.category"]);

  const contentForInference = [
    description,
    philosophy,
    ...keywords,
    ...doList,
    ...dontList,
  ]
    .filter(Boolean)
    .join(" ");

  const styleType = normalizeStyleType(styleTypeRaw) ?? inferStyleType(contentForInference);
  const category = normalizeCategory(categoryRaw) ?? inferCategory(contentForInference);

  const tags = normalizeTags(
    pickArray(obj, ["tags", "style.tags"]),
    contentForInference,
    category,
    styleType
  );

  return {
    name,
    nameEn,
    slug,
    description,
    category,
    styleType,
    tags,
    primaryColor,
    secondaryColor,
    accentColors,
    keywords,
    philosophy,
    doList,
    dontList,
    buttonCode,
    cardCode,
    inputCode,
  };
}

function parseMarkdownDraft(markdown: string): ExtractedStyleDraft {
  const lines = markdown.split(/\r?\n/);
  const title = extractMarkdownTitle(markdown);
  const description = extractDescription(lines, title);
  const keywords = extractKeywords(markdown);
  const doList = extractBulletSection(lines, "do");
  const dontList = extractBulletSection(lines, "dont");
  const philosophy = extractPhilosophy(lines);

  const {
    primaryColor,
    secondaryColor,
    accentColors,
  } = extractColors(markdown);

  const {
    buttonCode,
    cardCode,
    inputCode,
  } = extractComponentCode(markdown);

  const combinedText = [
    title,
    description,
    philosophy,
    ...keywords,
    ...doList,
    ...dontList,
  ]
    .filter(Boolean)
    .join(" ");

  const styleType = inferStyleType(combinedText);
  const category = inferCategory(combinedText);

  return {
    name: title,
    nameEn: looksLikeEnglish(title) ? title : undefined,
    slug: slugify(title ?? ""),
    description,
    category,
    styleType,
    tags: inferTags(combinedText, category, styleType),
    primaryColor,
    secondaryColor,
    accentColors,
    keywords,
    philosophy,
    doList,
    dontList,
    buttonCode,
    cardCode,
    inputCode,
  };
}

function extractMarkdownTitle(markdown: string): string | undefined {
  const heading = markdown.match(/^#\s+(.+)$/m)?.[1];
  if (heading) return cleanInlineText(heading);

  const fallback = markdown
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith("```") && !line.startsWith("- "));
  return fallback ? cleanInlineText(fallback) : undefined;
}

function extractDescription(lines: string[], title?: string): string | undefined {
  let codeFence = false;
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith("```")) {
      codeFence = !codeFence;
      continue;
    }
    if (codeFence) continue;
    if (title && line === title) continue;
    if (line.startsWith("#")) continue;
    if (/^[-*]\s+/.test(line)) continue;
    if (/^(keywords?|关键词)\s*[:：]/i.test(line)) continue;
    return cleanInlineText(line);
  }
  return undefined;
}

function extractKeywords(markdown: string): string[] {
  const keywordLine = markdown.match(/(?:^|\n)\s*(?:keywords?|关键词)\s*[:：]\s*(.+)$/im)?.[1];
  if (!keywordLine) return [];
  return keywordLine
    .split(/[，,|、]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function extractBulletSection(lines: string[], target: "do" | "dont"): string[] {
  const items: string[] = [];
  let active = false;
  let codeFence = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith("```")) {
      codeFence = !codeFence;
      continue;
    }
    if (codeFence) continue;

    const headingType = detectHeadingSection(line);
    if (headingType) {
      active = headingType === target;
      continue;
    }

    if (!active) continue;
    if (!line) continue;

    const bulletMatch = line.match(/^[-*]\s+(.+)$/) || line.match(/^\d+\.\s+(.+)$/);
    if (bulletMatch?.[1]) {
      items.push(cleanInlineText(bulletMatch[1]));
      continue;
    }

    if (line.startsWith("#")) {
      active = false;
    }
  }

  return dedupe(items);
}

function extractPhilosophy(lines: string[]): string | undefined {
  let active = false;
  const chunks: string[] = [];
  let codeFence = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith("```")) {
      codeFence = !codeFence;
      continue;
    }
    if (codeFence) continue;

    const headingType = detectHeadingSection(line);
    if (headingType === "philosophy") {
      active = true;
      continue;
    }
    if (headingType) {
      active = false;
    }
    if (!active || !line) continue;
    if (line.startsWith("#")) break;
    if (/^[-*]\s+/.test(line)) continue;
    chunks.push(cleanInlineText(line));
  }

  return chunks.length > 0 ? chunks.join(" ").trim() : undefined;
}

function detectHeadingSection(line: string): HeadingSection {
  const heading = extractHeadingText(line);
  if (!heading) return null;
  const normalized = heading.toLowerCase();
  if (containsAny(normalized, DONT_HEADING_KEYS)) return "dont";
  if (containsAny(normalized, DO_HEADING_KEYS)) return "do";
  if (containsAny(normalized, PHILOSOPHY_HEADING_KEYS)) return "philosophy";
  return null;
}

function extractHeadingText(line: string): string | null {
  const markdownHeading = line.match(/^#{1,6}\s+(.+)$/);
  if (markdownHeading?.[1]) return markdownHeading[1].trim();

  const strongHeading = line.match(/^\*\*(.+)\*\*$/);
  if (strongHeading?.[1]) return strongHeading[1].trim();

  return null;
}

function extractColors(markdown: string): {
  primaryColor?: string;
  secondaryColor?: string;
  accentColors?: string[];
} {
  const explicitPrimary = extractLabeledColor(markdown, ["primary", "主色"]);
  const explicitSecondary = extractLabeledColor(markdown, ["secondary", "次色"]);
  const explicitAccent = extractLabeledColor(markdown, ["accent", "强调"]);

  const allHex = dedupe((markdown.match(HEX_COLOR_GLOBAL) ?? []).map((hex) => hex.toLowerCase()));

  const colors = allHex.filter((hex) =>
    hex !== explicitPrimary && hex !== explicitSecondary && hex !== explicitAccent
  );

  const primaryColor = explicitPrimary ?? colors[0];
  const secondaryColor = explicitSecondary ?? colors[1];

  const accentSeed = [explicitAccent, ...colors.slice(2)]
    .filter((item): item is string => Boolean(item))
    .slice(0, 5);

  return {
    primaryColor,
    secondaryColor,
    accentColors: accentSeed.length > 0 ? dedupe(accentSeed) : undefined,
  };
}

function extractLabeledColor(text: string, labels: string[]): string | undefined {
  for (const label of labels) {
    const match = text.match(new RegExp(`${escapeRegExp(label)}[^\\n#]*(#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\\b)`, "i"));
    if (match?.[1]) return match[1].toLowerCase();
  }
  return undefined;
}

function extractComponentCode(markdown: string): {
  buttonCode?: string;
  cardCode?: string;
  inputCode?: string;
} {
  const codeBlocks: Array<{ code: string; context: string }> = [];
  const codeBlockRegex = /```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/g;
  let match: RegExpExecArray | null = codeBlockRegex.exec(markdown);

  while (match) {
    const code = match[1]?.trim();
    if (code) {
      const context = markdown
        .slice(Math.max(0, match.index - 180), match.index)
        .toLowerCase();
      codeBlocks.push({ code, context });
    }
    match = codeBlockRegex.exec(markdown);
  }

  let buttonCode: string | undefined;
  let cardCode: string | undefined;
  let inputCode: string | undefined;
  const fallback: string[] = [];

  for (const block of codeBlocks) {
    if (!buttonCode && containsAny(block.context, BUTTON_KEYS)) {
      buttonCode = block.code;
      continue;
    }
    if (!cardCode && containsAny(block.context, CARD_KEYS)) {
      cardCode = block.code;
      continue;
    }
    if (!inputCode && containsAny(block.context, INPUT_KEYS)) {
      inputCode = block.code;
      continue;
    }
    fallback.push(block.code);
  }

  if (!buttonCode && fallback[0]) buttonCode = fallback[0];
  if (!cardCode && fallback[1]) cardCode = fallback[1];
  if (!inputCode && fallback[2]) inputCode = fallback[2];

  return { buttonCode, cardCode, inputCode };
}

function finalizeDraft(draft: ExtractedStyleDraft): ExtractedStyleDraft {
  const baseName = draft.nameEn ?? draft.name;
  const slug = draft.slug ? slugify(draft.slug) : slugify(baseName ?? "");

  const colors = normalizeColorArray(draft.accentColors);

  return {
    ...draft,
    slug: slug || undefined,
    primaryColor: normalizeColor(draft.primaryColor),
    secondaryColor: normalizeColor(draft.secondaryColor),
    accentColors: colors.length > 0 ? colors : undefined,
    keywords: normalizeStringArray(draft.keywords),
    doList: normalizeStringArray(draft.doList),
    dontList: normalizeStringArray(draft.dontList),
    tags: draft.tags && draft.tags.length > 0 ? dedupe(draft.tags) : undefined,
  };
}

function normalizeStyleType(value: string | undefined): StyleType | undefined {
  if (!value) return undefined;
  const normalized = value.toLowerCase();
  if (normalized.includes("layout")) return "layout";
  if (normalized.includes("animation") || normalized.includes("motion")) return "animation";
  if (normalized.includes("visual")) return "visual";
  return undefined;
}

function normalizeCategory(value: string | undefined): StyleCategory | undefined {
  if (!value) return undefined;
  const normalized = value.toLowerCase();
  if (normalized.includes("minimal")) return "minimal";
  if (normalized.includes("retro") || normalized.includes("vintage")) return "retro";
  if (normalized.includes("expressive") || normalized.includes("bold")) return "expressive";
  if (normalized.includes("modern")) return "modern";
  return undefined;
}

function normalizeTags(
  value: unknown,
  textForInference: string,
  category: StyleCategory,
  styleType: StyleType
): StyleTag[] {
  const source = normalizeStringArray(value);
  if (source.length === 0) return inferTags(textForInference, category, styleType);

  const normalized = source
    .map((item) => item.toLowerCase())
    .map((item): StyleTag | null => {
      if (item.includes("modern")) return "modern";
      if (item.includes("minimal")) return "minimal";
      if (item.includes("retro")) return "retro";
      if (item.includes("expressive")) return "expressive";
      if (item.includes("responsive")) return "responsive";
      if (item.includes("contrast")) return "high-contrast";
      if (item.includes("brand")) return "brand-inspired";
      return null;
    })
    .filter((item): item is StyleTag => item !== null);

  return normalized.length > 0
    ? dedupe(normalized)
    : inferTags(textForInference, category, styleType);
}

function inferStyleType(text: string): StyleType {
  const normalized = text.toLowerCase();
  const animationScore = keywordScore(normalized, [
    "animation",
    "motion",
    "transition",
    "keyframe",
    "micro-interaction",
    "动效",
    "动画",
  ]);
  const layoutScore = keywordScore(normalized, [
    "layout",
    "grid",
    "sidebar",
    "timeline",
    "masonry",
    "split screen",
    "布局",
    "栅格",
  ]);

  if (animationScore >= 2 && animationScore >= layoutScore) return "animation";
  if (layoutScore >= 2) return "layout";
  return "visual";
}

function inferCategory(text: string): StyleCategory {
  const normalized = text.toLowerCase();
  const scores: Record<StyleCategory, number> = {
    modern: keywordScore(normalized, ["modern", "clean", "saas", "tech", "现代"]),
    minimal: keywordScore(normalized, ["minimal", "editorial", "simple", "极简", "留白"]),
    expressive: keywordScore(normalized, ["bold", "vibrant", "expressive", "neon", "高对比", "张力"]),
    retro: keywordScore(normalized, ["retro", "vintage", "y2k", "nostalgia", "复古"]),
  };

  const winner = (Object.entries(scores) as Array<[StyleCategory, number]>)
    .sort((a, b) => b[1] - a[1])[0];

  return winner && winner[1] > 0 ? winner[0] : "modern";
}

function inferTags(text: string, category: StyleCategory, styleType: StyleType): StyleTag[] {
  const normalized = text.toLowerCase();
  const tags: StyleTag[] = [category];

  if (normalized.includes("responsive") || normalized.includes("mobile")) {
    tags.push("responsive");
  }
  if (normalized.includes("high contrast") || normalized.includes("contrast") || normalized.includes("高对比")) {
    tags.push("high-contrast");
  }
  if (normalized.includes("brand") || normalized.includes("品牌")) {
    tags.push("brand-inspired");
  }
  if (styleType === "animation") {
    tags.push("expressive");
  }

  return dedupe(tags);
}

function hasMeaningfulDraft(draft: ExtractedStyleDraft): boolean {
  return Boolean(
    draft.name ||
      draft.nameEn ||
      draft.slug ||
      draft.description ||
      draft.primaryColor ||
      draft.secondaryColor ||
      (draft.accentColors && draft.accentColors.length > 0) ||
      (draft.keywords && draft.keywords.length > 0) ||
      (draft.doList && draft.doList.length > 0) ||
      (draft.buttonCode || draft.cardCode || draft.inputCode)
  );
}

function pickCode(obj: Record<string, unknown>, paths: string[]): string | undefined {
  for (const path of paths) {
    const raw = readPath(obj, path);
    if (typeof raw === "string" && raw.trim()) return raw.trim();
    const rawRecord = asRecord(raw);
    if (rawRecord && typeof rawRecord.code === "string" && rawRecord.code.trim()) {
      return rawRecord.code.trim();
    }
  }
  return undefined;
}

function pickString(obj: Record<string, unknown>, paths: string[]): string | undefined {
  for (const path of paths) {
    const raw = readPath(obj, path);
    if (typeof raw === "string" && raw.trim()) return raw.trim();
  }
  return undefined;
}

function pickArray(obj: Record<string, unknown>, paths: string[]): unknown[] | undefined {
  for (const path of paths) {
    const raw = readPath(obj, path);
    if (Array.isArray(raw)) return raw;
  }
  return undefined;
}

function readPath(obj: Record<string, unknown>, path: string): unknown {
  const segments = path.split(".");
  let current: unknown = obj;
  for (const segment of segments) {
    const currentRecord = asRecord(current);
    if (!currentRecord) return undefined;
    current = currentRecord[segment];
  }
  return current;
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return dedupe(
    value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean)
  );
}

function normalizeColor(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  return HEX_COLOR_PATTERN.test(normalized) ? normalized : undefined;
}

function normalizeColorArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return dedupe(
    value
      .filter((item): item is string => typeof item === "string")
      .map((item) => normalizeColor(item))
      .filter((item): item is string => Boolean(item))
  ).slice(0, 5);
}

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function cleanInlineText(value: string): string {
  return value
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .trim();
}

function containsAny(haystack: string, keywords: string[]): boolean {
  return keywords.some((keyword) => haystack.includes(keyword));
}

function keywordScore(text: string, keywords: string[]): number {
  return keywords.reduce((score, keyword) => (text.includes(keyword) ? score + 1 : score), 0);
}

function looksLikeEnglish(value: string | undefined): boolean {
  if (!value) return false;
  return /^[\x00-\x7F\s-]+$/.test(value);
}

function dedupe<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : null;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
