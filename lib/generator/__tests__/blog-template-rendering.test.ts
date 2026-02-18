import { describe, expect, it } from "vitest";
import {
  generateBlogFooterHtml,
  generateBlogPostsHtml,
  generateBlogSidebarHtml,
} from "@/lib/generator/templates/blog";

describe("blog template rendering", () => {
  it("renders featured and regular post layouts with reading time", () => {
    const html = generateBlogPostsHtml({
      sectionTitle: "Insights",
      post1Title: "Quarterly platform review",
      post1Excerpt: "A detailed review of release quality, onboarding speed, and reliability outcomes.",
      post1Date: "2026-03-18",
      post1Category: "Engineering",
      post2Title: "Data contracts at scale",
      post2Excerpt: "How teams align schema evolution and avoid cross-service incidents.",
      post2Date: "2026-03-14",
      post2Category: "Platform",
      post3Title: "Design systems for enterprise",
      post3Excerpt: "Patterns to keep consistency without slowing delivery.",
      post3Date: "2026-03-10",
      post3Category: "Design",
    });

    expect(html).toContain("blog-featured-post");
    expect(html).toContain("blog-post-list");
    expect(html).toContain("Featured");
    expect(html).toContain("3 posts");
    expect(html).toContain("min read");
  });

  it("renders enriched sidebar blocks", () => {
    const html = generateBlogSidebarHtml({
      aboutTitle: "About this publication",
      aboutText: "Weekly posts for product engineers and growth teams.",
      categories: "Engineering, Product, Growth",
      tags: "React, TypeScript, Analytics, Experimentation",
    });

    expect(html).toContain("sidebar-category-count");
    expect(html).toContain("Topic pulse");
    expect(html).toContain("Weekly Brief");
    expect(html).toContain("Subscribe update");
  });

  it("filters empty footer links", () => {
    const html = generateBlogFooterHtml({
      copyright: "2026 Demo Blog",
      links: "Home, , Docs, Contact, ",
    });

    const linkMatches = html.match(/class=\"footer-link\"/g) ?? [];
    expect(linkMatches).toHaveLength(3);
    expect(html).toContain("Home");
    expect(html).toContain("Docs");
    expect(html).toContain("Contact");
  });
});
