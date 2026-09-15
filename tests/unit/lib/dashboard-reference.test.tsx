import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ComponentProps } from "react";

vi.mock("@/lib/i18n/context", () => ({
  useI18n: () => ({ locale: "en", t: (key: string) => key }),
}));
vi.mock("next/link", () => ({
  default: (props: ComponentProps<"a">) => <a {...props} />,
}));

import { DashboardPromptGuide } from "@/app/dashboard-prompts/_dashboard-guide";
import { PromptTopicContent } from "@/app/prompts/[topic]/_content";
import { getTopicBySlug } from "@/lib/prompts";
import {
  DASHBOARD_PROMPT_CHECKLIST,
  DASHBOARD_PROMPT_COMPARISON,
  DASHBOARD_SOURCES,
} from "@/lib/seo/dashboard-reference";

const topic = getTopicBySlug("dashboard-design");
if (!topic) throw new Error("Dashboard prompt topic missing");

describe("source-backed dashboard prompt answers", () => {
  it("leads with the actual prompt count, tools, method, limits, and primary sources", () => {
    const html = renderToStaticMarkup(
      <DashboardPromptGuide locale="en" promptCount={topic.prompts.length} />
    );

    expect(topic.prompts).toHaveLength(8);
    expect(html).toContain("8 copy-paste dashboard UI prompts");
    expect(html).toContain("ChatGPT, Claude, Cursor, and v0");
    expect(html).toContain("not model-quality benchmarks");
    expect(html).toContain(DASHBOARD_PROMPT_COMPARISON.specific.en);
    for (const source of DASHBOARD_SOURCES) {
      expect(html).toContain(`href="${source.href}"`);
    }
    expect(DASHBOARD_PROMPT_CHECKLIST).toHaveLength(6);
  });

  it("server-renders FAQ answers inside native disclosure elements", () => {
    const html = renderToStaticMarkup(
      <PromptTopicContent
        topic={topic}
        relatedStyles={[]}
        curatedStyleCount={148}
      />
    );

    expect(html.match(/<details/g)).toHaveLength(topic.faq.length);
    for (const faq of topic.faq) {
      expect(html).toContain(renderToStaticMarkup(<>{faq.answerEn}</>));
    }
  });

  it("renders a complete Chinese answer without client locale detection", () => {
    const html = renderToStaticMarkup(
      <DashboardPromptGuide locale="zh" promptCount={topic.prompts.length} />
    );

    expect(html).toContain("8 条可复制的仪表盘 UI 提示词");
    expect(html).toContain(DASHBOARD_PROMPT_COMPARISON.specific.zh);
    expect(html).toContain("编写方法与使用限制");
  });
});
