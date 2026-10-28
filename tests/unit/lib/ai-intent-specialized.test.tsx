import { renderToStaticMarkup } from "react-dom/server";
import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/layout/header", () => ({ Header: () => null }));
vi.mock("@/components/layout/footer", () => ({ Footer: () => null }));
vi.mock("@/components/ui/breadcrumb", () => ({ Breadcrumb: () => null }));
vi.mock("next/link", () => ({
  default: (props: ComponentProps<"a">) => <a {...props} />,
}));

import {
  AiIntentPage,
  getAiIntentMetadata,
} from "@/components/seo/ai-intent-page";
import {
  getSpecializedAiIntentCopy,
  type SpecializedAiIntentKey,
} from "@/lib/seo/ai-intent-specialized";

const specializedKeys: SpecializedAiIntentKey[] = [
  "ai-ui-design",
  "claude-code-ui-design",
  "codex-ui-design",
];

describe("specialized AI design intent pages", () => {
  it.each(["en", "zh"] as const)(
    "renders distinct practical content, FAQ, and resources in %s",
    (locale) => {
      const titles = specializedKeys.map((key) =>
        getAiIntentMetadata(key, locale).title
      );
      expect(new Set(titles).size).toBe(specializedKeys.length);

      for (const key of specializedKeys) {
        const copy = getSpecializedAiIntentCopy(key, locale);
        const html = renderToStaticMarkup(
          <AiIntentPage keyName={key} locale={locale} />
        );

        expect(html).toContain(copy.includedTitle);
        expect(html).toContain(copy.workflowTitle);
        expect(html).toContain(copy.promptTitle);
        expect(html).toContain(copy.promptContent?.split("\n")[0]);
        expect(html).toContain(copy.relatedTitle);
        expect(html).toContain("FAQPage");
        expect(copy.faq.length).toBeGreaterThanOrEqual(3);
        expect(copy.related.length).toBeGreaterThanOrEqual(3);

        for (const step of copy.workflow) {
          expect(html).toContain(renderToStaticMarkup(<>{step}</>));
        }

        for (const item of copy.faq) {
          expect(html).toContain(item.question);
          expect(html).toContain(item.answer);
        }

        const officialResource = copy.related.find((item) => item.external);
        if (key === "ai-ui-design") {
          expect(officialResource).toBeUndefined();
        } else {
          expect(officialResource).toBeDefined();
          expect(html).toContain(`href="${officialResource?.href}"`);
        }

        if (key === "claude-code-ui-design") {
          expect(copy.workflow.join(" ")).toContain(".md");
          expect(copy.workflow.join(" ")).toContain("CLAUDE.md");
        }

        if (key === "codex-ui-design") {
          expect(copy.intro).toContain("AGENTS.md");
          expect(copy.stylesBody).toContain(locale === "zh" ? "不会创建" : "does not create");
        }
      }
    }
  );

  it.each(["en", "zh"] as const)(
    "keeps the AI web design workflow title aligned with its four steps in %s",
    (locale) => {
      const html = renderToStaticMarkup(
        <AiIntentPage keyName="ai-web-design" locale={locale} />
      );
      const workflowTitle = locale === "zh"
        ? "从想法到 AI 前端的 4 个步骤"
        : "A four-step AI frontend workflow";

      expect(html).toContain(workflowTitle);
      expect(html.match(/<li class="flex gap-4/g)).toHaveLength(4);
    }
  );
});
