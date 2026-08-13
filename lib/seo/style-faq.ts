// Data-driven FAQ content for style detail pages. Every answer is built from
// the style's own registry fields so on-page text and FAQPage schema stay
// truthful and in sync.

import type { DesignStyle } from "@/lib/styles/types";
import type { Locale } from "@/lib/i18n/translations";
import { localizedString, localizedList } from "@/lib/styles/locale-content";

export interface StyleFaqItem {
  question: string;
  answer: string;
}

const HEX_RE = /^#[0-9a-f]{3,8}$/i;

function paletteSummary(style: DesignStyle, locale: Locale): string | null {
  const { primary, secondary, accent } = style.colors;
  const accents = accent.filter((c) => HEX_RE.test(c)).slice(0, 4);
  if (!HEX_RE.test(primary) || !HEX_RE.test(secondary)) return null;
  return locale === "zh"
    ? `${style.name} 的主色是 ${primary}，辅色是 ${secondary}${accents.length > 0 ? `，强调色包括 ${accents.join("、")}` : ""}。每个色值都可以在本页色板中复制。`
    : `${style.nameEn} uses ${primary} as its primary color and ${secondary} as its secondary color${accents.length > 0 ? `, with accent colors ${accents.join(", ")}` : ""}. Every hex value can be copied from the palette on this page.`;
}

function firstSentence(text: string): string {
  const match = /^[^.!?]+[.!?]/.exec(text.trim());
  return match ? match[0].trim() : text.trim();
}

function listAnswer(items: string[], max: number): string {
  return items
    .slice(0, max)
    .map((item) => item.replace(/[.;]\s*$/, ""))
    .join(". ");
}

export function buildStyleFaq(style: DesignStyle, locale: Locale): StyleFaqItem[] {
  const name = locale === "zh" ? style.name : style.nameEn || style.name;
  const description = localizedString(locale, style.description, style.descriptionEn);
  const philosophy = localizedString(locale, style.philosophy, style.philosophyEn);
  const doList = localizedList(locale, style.doList, style.doListEn);
  const dontList = localizedList(locale, style.dontList, style.dontListEn);
  const keywords = localizedList(locale, style.keywords, style.keywordsEn);

  const faqs: StyleFaqItem[] = [];

  faqs.push({
    question: locale === "zh" ? `什么是${name}风格？` : `What is the ${name} design style?`,
    answer:
      locale === "zh"
        ? `${description}${philosophy ? ` 它的设计理念：${firstSentence(philosophy)}` : ""}`
        : `${description}${philosophy ? ` Its core principle: ${firstSentence(philosophy)}` : ""}`,
  });

  const palette = paletteSummary(style, locale);
  if (palette) {
    faqs.push({
      question:
        locale === "zh"
          ? `${name}风格常用什么配色？`
          : `What colors does ${name} use?`,
      answer: palette,
    });
  }

  if (doList.length > 0) {
    faqs.push({
      question:
        locale === "zh"
          ? `怎样把${name}风格做对？`
          : `How do I apply ${name} correctly?`,
      answer:
        (locale === "zh" ? "关键做法：" : "Key practices: ") +
        listAnswer(doList, 3) +
        ".",
    });
  }

  if (dontList.length > 0) {
    faqs.push({
      question:
        locale === "zh"
          ? `${name}风格最常见的错误是什么？`
          : `What are common mistakes with ${name}?`,
      answer:
        (locale === "zh" ? "应避免：" : "Avoid: ") + listAnswer(dontList, 3) + ".",
    });
  }

  faqs.push({
    question:
      locale === "zh"
        ? `如何让 AI 生成${name}风格的界面？`
        : `How do I prompt AI to generate ${name} UI?`,
    answer:
      locale === "zh"
        ? `复制本页提供的 AI 提示词（含设计 tokens 与组件规则），粘贴到 ChatGPT、Claude、Claude Code 或 Codex。提示词中应包含关键词：${keywords.slice(0, 4).join("、")}。`
        : `Copy the ready-made AI prompt on this page — it bundles the design tokens and component rules — and paste it into ChatGPT, Claude, Claude Code, or Codex. Effective prompts include the keywords: ${keywords.slice(0, 4).join(", ")}.`,
  });

  return faqs;
}

export function generateFaqJsonLd(faqs: StyleFaqItem[], url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
