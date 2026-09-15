import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ComponentProps } from "react";
vi.mock("@/lib/i18n/context", () => ({ useI18n: () => ({ locale: "en" }) }));
vi.mock("next/link", () => ({ default: (props: ComponentProps<"a">) => <a {...props} /> }));
import { DarkModeFlagshipContent } from "@/app/dark-mode-ui-prompts/_content";
import { getTopicBySlug } from "@/lib/prompts";
import { generatePromptPageSchemas } from "@/lib/seo/prompt-schema";
import { DARK_MODE_QUICK_PROMPT, DARK_MODE_REFERENCE_REVIEWED_AT, DARK_MODE_SOURCES, DARK_MODE_TAILWIND_CSS } from "@/lib/seo/dark-mode-reference";

const topic = getTopicBySlug("dark-mode");
if (!topic) throw new Error("Dark mode topic missing");

describe("source-backed dark mode answers", () => {
  it("uses current Tailwind v4 CSS and does not teach a v3 config as v4", () => {
    expect(DARK_MODE_TAILWIND_CSS).toContain('@import "tailwindcss"');
    expect(DARK_MODE_TAILWIND_CSS).toContain("@custom-variant dark (&:where(.dark, .dark *));");
    const answer = topic.faq.find((item) => item.questionEn.includes("Tailwind CSS v4"));
    expect(answer?.answerEn).toContain("prefers-color-scheme");
    expect(answer?.answerZh).toContain("@custom-variant");
    expect(JSON.stringify(topic.faq)).not.toContain("darkMode: 'class'");
  });

  it("corrects the CSS-pixel threshold and avoids blanket compliance claims", () => {
    const answer = topic.faq.find((item) => item.questionEn.includes("text contrast under WCAG"));
    expect(answer?.answerEn).toContain("24 CSS px");
    expect(answer?.answerEn).toContain("18.67 CSS px");
    expect(answer?.answerEn).toContain("does not establish full WCAG compliance");
    expect(JSON.stringify(topic.faq)).not.toMatch(/87%|8% of men|all styles/);
  });

  it("server-renders all FAQ answers even when collapsed, with the same text as structured data", () => {
    const html = renderToStaticMarkup(<DarkModeFlagshipContent topic={topic} relatedStyles={[]} curatedStyleCount={148} doList={[]} dontList={[]} templates={[]} />);
    const schema = generatePromptPageSchemas(topic, "en", "/dark-mode-ui-prompts");
    expect(html.match(/<details/g)).toHaveLength(topic.faq.length);
    for (const [index, faq] of topic.faq.entries()) {
      expect(html).toContain(renderToStaticMarkup(<>{faq.answerEn}</>));
      expect(schema.faq.mainEntity[index].acceptedAnswer.text).toBe(faq.answerEn);
    }
    expect(html).toContain(DARK_MODE_REFERENCE_REVIEWED_AT);
    for (const source of DARK_MODE_SOURCES) {
      expect(html.split(`href="${source.href}"`)).toHaveLength(2);
    }
    expect(html).toContain(renderToStaticMarkup(<>{DARK_MODE_QUICK_PROMPT.en}</>));
  });
  it("renders Chinese content from the route locale without waiting for client preference hydration", () => {
    const html = renderToStaticMarkup(<DarkModeFlagshipContent ssrLocale="zh" topic={topic} relatedStyles={[]} curatedStyleCount={148} doList={[]} dontList={[]} templates={[]} />);
    expect(html).toContain("暗黑模式 UI 提示词");
    expect(html).toContain("如何在 Tailwind CSS v4 中实现暗色模式？");
    expect(html).not.toContain("Start with this dark mode prompt");
  });

});
