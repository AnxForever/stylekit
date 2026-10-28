import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import StylesPage from "@/app/styles/page";
import { getDesignWorkflowLinks } from "@/lib/seo/design-workflows";

vi.mock("@/components/layout/header", () => ({ Header: () => null }));
vi.mock("@/components/layout/footer", () => ({ Footer: () => null }));
vi.mock("@/components/ui/breadcrumb", () => ({ Breadcrumb: () => null }));
vi.mock("@/components/styles/styles-content", () => ({ StylesContent: () => null }));

describe("catalog search discovery", () => {
  it.each(["en", "zh"] as const)("server-renders canonical %s breadcrumbs and contextual workflow anchors", async locale => {
    const html = renderToStaticMarkup(await StylesPage({ params: Promise.resolve({ locale }) }));
    const schema = JSON.parse(html.match(/<script[^>]*>(.*?)<\/script>/s)![1]);
    expect(schema.itemListElement[0].item).toMatch(new RegExp(`/${locale}$`));
    expect(schema.itemListElement[1].item).toMatch(new RegExp(`/${locale}/styles$`));
    for (const link of getDesignWorkflowLinks(locale)) {
      expect(html).toContain(`href="${link.href}"`);
    }
    const tutorialAnchor = html.match(/<a[^>]*href="\/en\/guides\/neo-brutalism"[^>]*>/)?.[0];
    expect(tutorialAnchor).toMatch(/hrefLang="en"/i);
    expect(html).not.toContain("/zh/guides/neo-brutalism");
  });

  it("keeps style-specific tutorial links relevant rather than inserting an unrelated style guide", () => {
    expect(getDesignWorkflowLinks("en", "neo-brutalist").some(link => link.href.includes("/guides/"))).toBe(true);
    expect(getDesignWorkflowLinks("en", "glassmorphism").some(link => link.href.includes("/guides/"))).toBe(false);
  });
});
