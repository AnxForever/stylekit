import { buildStyleCopyIdentity } from "./style-copy-identity";
import type { Locale } from "@/lib/i18n/translations";
import { buildSlopChecklist, NEGATIVE_PREFIX_RE } from "./slop-checklist";

export interface PromptPairInput {
  styleName: string;
  styleSlug: string;
  aiRules: string;
  aiRulesEn?: string;
  enhancedRules?: string | null;
  doList: string[];
  doListEn?: string[];
  dontList: string[];
  dontListEn?: string[];
  keywords: string[];
  keywordsEn?: string[];
}

export interface PromptContext {
  /** What the user is building: landing page, dashboard, app, or other */
  projectType: string;
  /** 3-word brand personality, e.g. "专业、温暖、极简" */
  brandPersonality: string;
  /** What this should NOT look like, e.g. "不要 Material Design，不要紫色" */
  antiReferences: string;
}

export interface PromptPairContent {
  hardPrompt: string;
  softPrompt: string;
}

function pickUnique(values: string[], limit: number): string[] {
  const seen = new Set<string>();
  const picked: string[] = [];

  for (const value of values) {
    const item = value.trim();
    if (!item) continue;
    if (seen.has(item)) continue;
    seen.add(item);
    picked.push(item);
    if (picked.length >= limit) break;
  }

  return picked;
}

function toBulletList(values: string[]): string {
  if (values.length === 0) {
    return "- (none)";
  }

  return values.map((value) => `- ${value}`).join("\n");
}

function hasCjk(value: string): boolean {
  return /[\u3400-\u9fff]/.test(value);
}

function cjkRatio(value: string): number {
  const compact = value.replace(/\s/g, "");
  if (!compact) return 0;
  const cjkMatches = compact.match(/[\u3400-\u9fff]/g);
  return (cjkMatches?.length ?? 0) / compact.length;
}

function sanitizeEnglishRuleSource(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (!hasCjk(trimmed)) return trimmed;

  const withoutCjkParentheticals = trimmed
    .replace(/\s*[\(（][^()（）]*[\u3400-\u9fff][^()（）]*[\)）]/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (withoutCjkParentheticals && !hasCjk(withoutCjkParentheticals)) {
    return withoutCjkParentheticals;
  }

  if (cjkRatio(trimmed) > 0.03) return null;

  const sanitized = withoutCjkParentheticals
    .replace(/[\u3400-\u9fff]+/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return sanitized && !hasCjk(sanitized) ? sanitized : null;
}

function normalizeEnglishSignal(value: string): string | null {
  const cleaned = value
    .replace(/\([^)]*\)/g, "")
    .replace(/^[*-]\s+/, "")
    .replace(/^(use|keep|create|build|make|prefer|prioritize|maintain|ensure|apply|combine|place|set)\s+/i, "")
    .replace(/\s+/g, " ")
    .replace(/[.;:,]+$/g, "")
    .trim();

  if (!cleaned || hasCjk(cleaned)) return null;
  if (cleaned.length <= 64) return cleaned;

  const shortClause = cleaned.split(/\b(?:with|while|without|for|when|and|but|to)\b/i)[0]?.trim();
  return shortClause && shortClause.length >= 3 ? shortClause : cleaned.slice(0, 64).trim();
}

function buildEnglishKeywordFallback(input: PromptPairInput): string[] {
  const existingEnglish = input.keywords.filter((keyword) => !hasCjk(keyword));
  const doSource = input.doListEn && input.doListEn.length > 0 ? input.doListEn : input.doList;
  const derivedSignals = doSource
    .map(normalizeEnglishSignal)
    .filter((item): item is string => Boolean(item));
  const styleNameSignal = hasCjk(input.styleName) ? [] : [input.styleName];

  return [...existingEnglish, ...derivedSignals, ...styleNameSignal];
}

export function resolvePromptKeywords(
  input: PromptPairInput,
  locale: Locale = "zh",
  limit = 6
): string[] {
  const source =
    locale === "en"
      ? input.keywordsEn && input.keywordsEn.length > 0
        ? input.keywordsEn
        : buildEnglishKeywordFallback(input)
      : input.keywords;

  return pickUnique(source, limit);
}

function buildEnglishHardRules(input: PromptPairInput): string {
  const doSource = input.doListEn && input.doListEn.length > 0 ? input.doListEn : input.doList;
  const dontSource = input.dontListEn && input.dontListEn.length > 0 ? input.dontListEn : input.dontList;
  const required = pickUnique(doSource.filter((item) => !hasCjk(item)), 8);
  const forbidden = pickUnique(dontSource.filter((item) => !hasCjk(item)), 8);

  return `## Required Style Rules
${toBulletList(required)}

## Forbidden Rules
${toBulletList(forbidden)}`;
}

/**
 * The generated token spec and the hand-written rules answer different
 * questions: the spec says which classes this style uses, the prose says how to
 * compose them - scene before glass, where the light comes from, what the style
 * is actually for. This used to pick one and discard the other, and since every
 * style has tokens, the prose always lost. Both ship now, authored rules first.
 */
function resolveHardRuleSource(input: PromptPairInput, locale: Locale): string {
  const authored =
    locale === "en"
      ? sanitizeEnglishRuleSource(input.aiRulesEn ?? "")
      : input.aiRules.trim();

  const generated =
    locale === "en"
      ? input.enhancedRules
        ? sanitizeEnglishRuleSource(input.enhancedRules)
        : null
      : (input.enhancedRules ?? "").trim() || null;

  const parts = [authored, generated].filter(
    (part): part is string => Boolean(part && part.trim())
  );

  if (parts.length > 0) {
    return parts.join("\n\n---\n\n");
  }

  return buildEnglishHardRules(input);
}

function buildContextSection(context: PromptContext, locale: Locale): string {
  const lines: string[] = [];
  lines.push(locale === "zh" ? "## 项目上下文" : "## Project Context");

  if (context.projectType) {
    const label = locale === "zh" ? "项目类型" : "Project type";
    lines.push(`- ${label}: ${context.projectType}`);
  }
  if (context.brandPersonality) {
    const label = locale === "zh" ? "品牌调性" : "Brand personality";
    lines.push(`- ${label}: ${context.brandPersonality}`);
  }
  if (context.antiReferences) {
    const label = locale === "zh" ? "绝对不要" : "Anti-references";
    lines.push(`- ${label}: ${context.antiReferences}`);
  }

  return lines.join("\n");
}

function buildAbsoluteBans(dontList: string[], locale: Locale, limit = 8): string {
  const bans = dontList
    .slice(0, limit)
    .map((item) => item.trim())
    .filter(Boolean);

  if (bans.length === 0) return "";

  const title =
    locale === "zh"
      ? "## 绝对禁止（匹配即拒绝）"
      : "## Absolute Bans (Match and Refuse)";

  const intro =
    locale === "zh"
      ? "以下模式一旦出现，视为风格违规——不找借口，直接重写。"
      : "If any of the following patterns appear, it is a style violation — rewrite without exception.";

  const items = bans.map((b) => {
    // Strip leading negative markers to avoid double negation like "禁止 不要..."
    const clean = b.replace(NEGATIVE_PREFIX_RE, "").trim();
    return `- ${clean}`;
  }).join("\n");

  return `${title}\n\n${intro}\n\n${items}`;
}

const hardPromptText = {
  zh: {
    title: "# Hard Prompt",
    intro: "请严格遵守以下风格规则并保持一致性，禁止风格漂移。",
    requirementsTitle: "## 执行要求",
    requirements: [
      "优先保证风格一致性，其次再做创意延展。",
      "遇到冲突时以禁止项为最高优先级。",
      "输出前自检：颜色、排版、间距、交互是否仍属于该风格。",
    ],
  },
  en: {
    title: "# Hard Prompt",
    intro: "Strictly follow the style rules below and maintain consistency. No style drift allowed.",
    requirementsTitle: "## Requirements",
    requirements: [
      "Prioritize style consistency first, then creative extension.",
      "When conflicts arise, treat prohibitions as the highest priority.",
      "Self-check before output: verify colors, typography, spacing, and interactions still match this style.",
    ],
  },
} as const;

const softPromptText = {
  zh: {
    title: "# Soft Prompt",
    intro: "保持整体风格气质即可，允许实现细节灵活调整，但不要偏离核心视觉语言。",
    guidanceTitle: "## Output Guidance",
    guidance: [
      "先保证整体风格识别度，再优化细节。",
      "避免过度炫技，保持可读性与可维护性。",
    ],
  },
  en: {
    title: "# Soft Prompt",
    intro: "Maintain the overall style essence. Implementation details can be adjusted flexibly, but do not deviate from the core visual language.",
    guidanceTitle: "## Output Guidance",
    guidance: [
      "Ensure overall style recognizability first, then refine details.",
      "Avoid over-engineering; maintain readability and maintainability.",
    ],
  },
} as const;

/**
 * A community submission is single-language: it fills the base fields
 * (`aiRules`, `doList`, `dontList`, `keywords`) and leaves the `*En` variants
 * empty. The English builders read only the `*En` variants, so without this an
 * English-authored community style produces an English prompt missing its own
 * rules, bans and signals. Backfill each English variant from its base field
 * when that base is already English. Curated styles carry both variants, so the
 * `already present` guard means this never changes their output, and a
 * Chinese base never leaks into an English slot.
 */
function withEnglishFallbacks(input: PromptPairInput): PromptPairInput {
  const englishList = (
    en: string[] | undefined,
    base: string[],
  ): string[] | undefined =>
    en && en.length > 0
      ? en
      : base.length > 0 && base.every((item) => !hasCjk(item))
        ? base
        : en;

  return {
    ...input,
    aiRulesEn:
      input.aiRulesEn && input.aiRulesEn.trim()
        ? input.aiRulesEn
        : input.aiRules && !hasCjk(input.aiRules)
          ? input.aiRules
          : input.aiRulesEn,
    doListEn: englishList(input.doListEn, input.doList),
    dontListEn: englishList(input.dontListEn, input.dontList),
    keywordsEn: englishList(input.keywordsEn, input.keywords),
  };
}

export function buildHardPrompt(
  input: PromptPairInput,
  locale: Locale = "zh",
  context?: PromptContext
): string {
  input = withEnglishFallbacks(input);
  const identity = buildStyleCopyIdentity({
    styleName: input.styleName,
    styleSlug: input.styleSlug,
  });
  const sourceRules = resolveHardRuleSource(input, locale);
  const text = hardPromptText[locale];

  // Only include bans/checklist derived from dontList when the language
  // matches the locale (avoid injecting Chinese into English prompts).
  const dontForLocale =
    locale === "en"
      ? input.dontListEn && input.dontListEn.length > 0
        ? input.dontListEn
        : []
      : input.dontList;

  const contextBlock = context ? buildContextSection(context, locale) : "";
  const bansBlock = buildAbsoluteBans(dontForLocale, locale);
  const checklistBlock = buildSlopChecklist({
    dontList: dontForLocale,
    locale: locale === "en" ? "en" : "zh",
  });

  const parts = [
    identity,
    contextBlock,
    text.title,
    text.intro,
    text.requirementsTitle,
    text.requirements.map((r) => `- ${r}`).join("\n"),
    "## Style Rules",
    sourceRules,
    bansBlock,
    checklistBlock,
  ];

  return parts.filter(Boolean).join("\n\n");
}

export function buildSoftPrompt(
  input: PromptPairInput,
  locale: Locale = "zh",
  context?: PromptContext
): string {
  input = withEnglishFallbacks(input);
  const identity = buildStyleCopyIdentity({
    styleName: input.styleName,
    styleSlug: input.styleSlug,
  });

  const doSource = locale === "en" && input.doListEn && input.doListEn.length > 0 ? input.doListEn : input.doList;
  // For soft prompt, always merge context anti-refs — they are user-provided
  // and language-appropriate. Base dontSource follows normal locale fallback.
  const dontSource =
    locale === "en" && input.dontListEn && input.dontListEn.length > 0 ? input.dontListEn : input.dontList;

  const keywords = resolvePromptKeywords(input, locale, 6);
  const dos = pickUnique(doSource, 4);
  const text = softPromptText[locale];

  // Merge anti-references from context into the dont list
  const contextAntiRefs = context?.antiReferences
    ? context.antiReferences
        .split(/[,，、;；\n]+/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  const mergedDonts = pickUnique([...dontSource, ...contextAntiRefs], 6);

  const contextBlock = context ? buildContextSection(context, locale) : "";

  const parts = [
    identity,
    contextBlock,
    text.title,
    text.intro,
    "## Style Signals",
    toBulletList(keywords),
    "## Prefer",
    toBulletList(dos),
    "## Avoid",
    toBulletList(mergedDonts),
    text.guidanceTitle,
    text.guidance.map((g) => `- ${g}`).join("\n"),
  ];

  return parts.filter(Boolean).join("\n\n");
}

export function buildPromptPair(
  input: PromptPairInput,
  locale: Locale = "zh",
  context?: PromptContext
): PromptPairContent {
  return {
    hardPrompt: buildHardPrompt(input, locale, context),
    softPrompt: buildSoftPrompt(input, locale, context),
  };
}
