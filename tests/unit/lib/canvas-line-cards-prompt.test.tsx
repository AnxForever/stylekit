// @vitest-environment happy-dom

import { readFileSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PromptTopicContent } from "@/app/prompts/[topic]/_content";
import { getPublicAsset } from "@/lib/assets";
import { CURATED_STYLE_COUNT } from "@/lib/product/catalog-facts";
import { getTopicBySlug, promptTopics } from "@/lib/prompts";
import type { PromptTopic } from "@/lib/prompts/types";
import {
  canvasLineCardsPrompt,
  canvasLineCardsTopic,
} from "@/lib/prompts/canvas-line-cards";

function renderTopic(locale: "en" | "zh", topic: PromptTopic = canvasLineCardsTopic) {
  const root = document.createElement("div");
  root.innerHTML = renderToStaticMarkup(
    <PromptTopicContent locale={locale} topic={topic} relatedStyles={[]} curatedStyleCount={CURATED_STYLE_COUNT} />,
  );
  return root;
}

describe("Canvas line-card reproducibility prompt", () => {
  it("registers the complete recipe in the existing prompt library", () => {
    expect(getTopicBySlug("canvas-line-cards")).toBe(canvasLineCardsTopic);
    expect(promptTopics.filter((topic) => topic.slug === "canvas-line-cards")).toHaveLength(1);
  });

  it("carries the actual reference paths in both copyable prompts", () => {
    const reference = readFileSync(path.resolve(__dirname, "../../../public/experiments/brand-line-cards/index.html"), "utf8");
    const paths = [...reference.matchAll(/path: "([^"]+)"/g)].map((match) => match[1]);
    expect(paths).toHaveLength(3);
    for (const svgPath of paths) {
      expect(canvasLineCardsPrompt.zh).toContain(svgPath);
      expect(canvasLineCardsPrompt.en).toContain(svgPath);
    }
  });

  it.each(["en", "zh"] as const)("renders the full %s body as the copy target with a working reference attachment", (locale) => {
    const root = renderTopic(locale);
    const prompt = root.querySelector("#prompt-canvas-line-cards-0");
    expect(prompt?.textContent).toBe(canvasLineCardsPrompt[locale]);
    expect(root.querySelector('[aria-controls="prompt-canvas-line-cards-0"]')).not.toBeNull();
    const demo = root.querySelector<HTMLAnchorElement>('a[target="_blank"]');
    expect(demo?.getAttribute("href")).toBe("/experiments/brand-line-cards/index.html");
    const download = root.querySelector<HTMLAnchorElement>("a[download]");
    expect(download?.getAttribute("href")).toBe(demo?.getAttribute("href"));
    expect(download?.getAttribute("download")).toBe("stylekit-brand-line-cards.html");
  });

  it("preserves existing prompt text when a topic has no Chinese override", () => {
    const legacy = promptTopics.find((topic) => topic.slug !== "canvas-line-cards")!;
    const root = renderTopic("zh", legacy);
    expect(root.querySelector(`#prompt-${legacy.slug}-0`)?.textContent).toBe(legacy.prompts[0].prompt);
  });

  it("delivers both languages and the authored source through the public prompt asset", () => {
    const asset = getPublicAsset("prompt", "canvas-line-cards");
    expect(asset).not.toBeNull();
    expect(asset?.code).toContain(canvasLineCardsPrompt.en);
    expect(asset?.code).toContain(canvasLineCardsPrompt.zh);
    expect(asset?.metadata.sourceRef).toBe("lib/prompts/canvas-line-cards.ts");
  });
});
