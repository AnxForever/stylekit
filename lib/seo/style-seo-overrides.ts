// Per-style metadata overrides, driven by real GSC query data. Only add an
// entry when search data shows the default title formula misses the dominant
// intent for that style. Evidence date + queries are noted per entry.

import type { Locale } from "@/lib/i18n/translations";

export interface StyleSeoOverride {
  titleEn?: string;
  titleZh?: string;
  descriptionEn?: string;
  descriptionZh?: string;
}

// GSC 90-day window ending 2026-07-29.
export const STYLE_SEO_OVERRIDES: Record<string, StyleSeoOverride> = {
  // ~331 imp, dominant intent "stripe brand color(s) #635bff #0a2540" — users
  // want the hex codes, not just the style guide.
  "stripe-style": {
    titleEn: "Stripe Style UI — Brand Colors #635bff, #0a2540, AI Prompts & Tokens",
    descriptionEn:
      "Stripe's brand palette — primary #635bff, deep navy #0a2540 — as ready-to-use design tokens, component recipes, and AI prompts for building Stripe-style fintech UI.",
    titleZh: "Stripe 风格 — 品牌色 #635bff / #0a2540、AI 提示词与设计 Tokens",
    descriptionZh:
      "Stripe 品牌配色（主色 #635bff、深海军蓝 #0a2540）整理为可直接使用的设计 tokens、组件配方和 AI 提示词，稳定复刻 Stripe 式金融科技界面。",
  },
  // zh queries use "瑞士国际主义(风格)" — align the zh title wording.
  "swiss-style": {
    titleZh: "瑞士国际主义风格 (Swiss International Style) — 网格排版与 AI 提示词",
    descriptionZh:
      "瑞士国际主义（国际主义平面设计风格）：严格网格、无衬线字体、客观排版。包含设计 tokens、组件配方和 AI 提示词指南。",
  },
  // zh query "包豪斯配色" — surface the palette intent.
  bauhaus: {
    titleZh: "包豪斯风格 (Bauhaus) — 配色、几何构成与 AI 提示词",
    descriptionZh:
      "包豪斯经典配色（红黄蓝三原色 + 黑白）与功能主义几何构成，整理为设计 tokens、组件配方和 AI 提示词指南。",
  },
};

export function getStyleSeoOverride(
  slug: string,
  locale: Locale
): { title?: string; description?: string } {
  const override = STYLE_SEO_OVERRIDES[slug];
  if (!override) return {};
  return locale === "zh"
    ? { title: override.titleZh, description: override.descriptionZh }
    : { title: override.titleEn, description: override.descriptionEn };
}
