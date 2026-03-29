import { buildStyleCopyIdentity } from "./style-copy-identity";
import type { Locale } from "@/lib/i18n/translations";

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

export function buildHardPrompt(input: PromptPairInput, locale: Locale = "zh"): string {
  const identity = buildStyleCopyIdentity({
    styleName: input.styleName,
    styleSlug: input.styleSlug,
  });
  const sourceRules = locale === "en"
    ? (input.enhancedRules || input.aiRulesEn || input.aiRules).trim()
    : (input.enhancedRules || input.aiRules).trim();
  const text = hardPromptText[locale];

  return `${identity}

${text.title}

${text.intro}

${text.requirementsTitle}
${text.requirements.map((r) => `- ${r}`).join("\n")}

## Style Rules
${sourceRules}`;
}

export function buildSoftPrompt(input: PromptPairInput, locale: Locale = "zh"): string {
  const identity = buildStyleCopyIdentity({
    styleName: input.styleName,
    styleSlug: input.styleSlug,
  });

  const keywordSource = locale === "en" && input.keywordsEn ? input.keywordsEn : input.keywords;
  const doSource = locale === "en" && input.doListEn ? input.doListEn : input.doList;
  const dontSource = locale === "en" && input.dontListEn ? input.dontListEn : input.dontList;

  const keywords = pickUnique(keywordSource, 6);
  const dos = pickUnique(doSource, 4);
  const donts = pickUnique(dontSource, 3);
  const text = softPromptText[locale];

  return `${identity}

${text.title}

${text.intro}

## Style Signals
${toBulletList(keywords)}

## Prefer
${toBulletList(dos)}

## Avoid
${toBulletList(donts)}

${text.guidanceTitle}
${text.guidance.map((g) => `- ${g}`).join("\n")}`;
}

export function buildPromptPair(input: PromptPairInput, locale: Locale = "zh"): PromptPairContent {
  return {
    hardPrompt: buildHardPrompt(input, locale),
    softPrompt: buildSoftPrompt(input, locale),
  };
}
