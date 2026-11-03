import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";

const mocks = vi.hoisted(() => ({
  locale: "en" as "en" | "zh",
  getRequestLocaleContext: vi.fn(),
}));

vi.mock("@/lib/i18n/request", () => ({
  getRequestLocaleContext: mocks.getRequestLocaleContext,
}));
vi.mock("@/components/layout/header", () => ({ Header: () => null }));
vi.mock("@/components/layout/footer", () => ({ Footer: () => null }));
vi.mock("@/components/seo/prompt-template-preview-section", () => ({
  PromptTemplatePreviewSection: () => null,
}));
vi.mock("@/app/prompts/[topic]/_prompt-copy-button", () => ({
  PromptCopyButton: () => null,
}));
vi.mock("@/components/i18n/localized-link", async () => {
  const React = await import("react");
  const { localizeHref } = await import("@/lib/i18n/routing");

  return {
    LocalizedLink: ({
      href,
      children,
      ...props
    }: {
      href: string;
      children?: ReactNode;
      className?: string;
    }) =>
      React.createElement(
        "a",
        { ...props, href: localizeHref(href, mocks.locale) },
        children,
      ),
  };
});

import UiPromptsPage from "@/app/ui-prompts/page";
import { generateMetadata } from "@/app/[locale]/ui-prompts/page";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { promptTopics } from "@/lib/prompts";

beforeEach(() => {
  mocks.locale = "en";
  mocks.getRequestLocaleContext.mockImplementation(async () => ({
    locale: mocks.locale,
  }));
});

describe("UI prompt library discovery", () => {
  it("aligns English title, description, Open Graph, and Twitter metadata", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: "en" }),
    });
    const expectedTitle = "AI UI Prompt Library for Websites & Dashboards";
    const expectedSocialTitle = expectedTitle + " | StyleKit";

    expect(metadata.title).toBe(expectedTitle);
    expect(metadata.description).toContain("website and dashboard examples");
    expect(metadata.openGraph?.title).toBe(expectedSocialTitle);
    expect(metadata.openGraph?.description).toBe(metadata.description);
    expect(metadata.twitter?.title).toBe(expectedSocialTitle);
    expect(metadata.twitter?.description).toBe(metadata.description);
    expect(metadata.alternates?.canonical).toContain("/en/ui-prompts");
  });

  it("preserves the Chinese prompt-library title", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: "zh" }),
    });

    expect(metadata.title).toBe("AI UI 与前端设计提示词库");
    expect(metadata.openGraph?.title).toBe("AI UI 与前端设计提示词库 | StyleKit");
    expect(metadata.twitter?.title).toBe("AI UI 与前端设计提示词库 | StyleKit");
  });

  it.each([
    { locale: "en" as const, prefix: "/en", label: "Related style:" },
    { locale: "zh" as const, prefix: "/zh", label: "相关风格：" },
  ])("links each prompt topic to its first valid related style in $locale", async ({
    locale,
    prefix,
    label,
  }) => {
    mocks.locale = locale;
    const html = renderToStaticMarkup(await UiPromptsPage());
    expect(html).toContain(
      locale === "en" ? "AI UI Prompt Library" : "UI 与前端设计提示词库",
    );
    const styles = getAllStylesMeta();
    const expectedSlugs = promptTopics
      .map((topic) =>
        topic.relatedStyleSlugs.find((slug) =>
          styles.some((style) => style.slug === slug),
        ),
      )
      .filter((slug): slug is string => Boolean(slug));
    const actualSlugs = Array.from(
      html.matchAll(new RegExp('href="' + prefix + '/styles/([^"]+)"', "g")),
      (match) => match[1],
    );

    expect(actualSlugs).toEqual(expectedSlugs);
    expect(html).toContain(label);
    expect(html).toContain('href="' + prefix + "/dashboard-prompts" + '"');
    expect(html).toContain("min-h-11");
    expect(html).toContain("focus-visible:ring-2");
    expect(html).not.toMatch(/<a\b[^>]*>(?:(?!<\/a>|<a\b)[\s\S])*<a\b/);

    const firstSlug = expectedSlugs[0];
    const firstStyle = styles.find((style) => style.slug === firstSlug);
    expect(firstStyle).toBeDefined();
    expect(html).toContain(
      locale === "zh"
        ? firstStyle!.name
        : firstStyle!.nameEn || firstStyle!.name,
    );
  });
});
