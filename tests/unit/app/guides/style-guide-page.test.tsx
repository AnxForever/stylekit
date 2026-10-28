import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { notFoundMock } = vi.hoisted(() => ({
  notFoundMock: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

vi.mock("next/navigation", () => ({ notFound: notFoundMock }));
vi.mock("@/components/layout/header", () => ({ Header: () => <header /> }));
vi.mock("@/components/layout/footer", () => ({ Footer: () => <footer /> }));
vi.mock("@/components/i18n/localized-link", () => ({
  LocalizedLink: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: ReactNode;
    className?: string;
  }) => <a href={href} {...props}>{children}</a>,
}));

import StyleGuidePage, {
  generateMetadata,
} from "@/app/guides/[slug]/page";
import { RelatedStyleLinks } from "@/components/guides/related-style-links";
import { resolveGuideRelatedStyleSlug } from "@/lib/seo/style-guide-relations";
import { getAllStylesMeta } from "@/lib/styles/meta";

describe("style guide detail page", () => {
  beforeEach(() => {
    notFoundMock.mockClear();
  });

  it("renders the Neo-Brutalist Tailwind v4 tutorial and its canonical export link", async () => {
    const page = await StyleGuidePage({
      params: Promise.resolve({ slug: "neo-brutalism" }),
    });
    const html = renderToStaticMarkup(page);

    expect(html).toContain("Neo-Brutalist Web Design with Tailwind CSS");
    expect(html.indexOf("Build a Neo-Brutalist website with Tailwind CSS v4")).toBeLessThan(
      html.indexOf("Put the rules into a responsive component"),
    );
    expect(html.indexOf("Put the rules into a responsive component")).toBeLessThan(
      html.indexOf("Design Philosophy"),
    );
    expect(html).toContain("@theme");
    expect(html).toContain("bg-neo-lime");
    expect(html).toContain("md:border-4");
    expect(html).toContain("focus-visible:outline-2");
    expect(html).toContain("motion-reduce:translate-none!");
    expect(html).toContain('href="/styles/neo-brutalist#style-exports"');
  });

  it("uses the tutorial-specific metadata while keeping canonical URL generation", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "neo-brutalism" }),
    });

    expect(metadata.title).toBe("Neo-Brutalist Web Design with Tailwind CSS");
    expect(metadata.description).toContain("Tailwind CSS v4");
    expect(metadata.alternates?.canonical).toContain("/en/guides/neo-brutalism");
  });

  it("links only to registered canonical slugs and leaves concepts as plain text", () => {
    const html = renderToStaticMarkup(
      <RelatedStyleLinks
        names={[
          "Neo-Brutalism",
          "Anti-Design Movement",
          "新拟物派",
          "Content-First Design",
          "不存在的风格",
          "",
        ]}
        styles={getAllStylesMeta()}
      />,
    );

    expect(html).toContain('href="/styles/neo-brutalist"');
    expect(html).toContain('href="/styles/anti-design"');
    expect(html).toContain('href="/styles/neumorphism"');
    expect(html).not.toContain('href="/styles/neo-brutalism"');
    expect(html).not.toContain('href="/styles/anti-design-movement"');
    expect(html).not.toContain('href="/styles/content-first-design"');
    expect(html).not.toContain('href="/styles/undefined"');
    expect(html).toContain("不存在的风格");
    expect(html).toContain("Content-First Design");
  });

  it("accepts a canonical slug only when it is present in the style registry", () => {
    const styles = getAllStylesMeta();
    expect(resolveGuideRelatedStyleSlug("neo-brutalist", styles)).toBe("neo-brutalist");
    expect(resolveGuideRelatedStyleSlug("新拟物派", styles)).toBe("neumorphism");
    expect(resolveGuideRelatedStyleSlug("不存在的风格", styles)).toBeUndefined();
    expect(resolveGuideRelatedStyleSlug("", styles)).toBeUndefined();
    expect(resolveGuideRelatedStyleSlug("missing-style", styles)).toBeUndefined();
  });

  it("does not link aliases when their canonical target is absent from the registry", () => {
    const styles = getAllStylesMeta().filter(
      (style) => style.slug !== "neo-brutalist",
    );
    const html = renderToStaticMarkup(
      <RelatedStyleLinks names={["Neo-Brutalism"]} styles={styles} />,
    );

    expect(html).toContain("Neo-Brutalism");
    expect(html).not.toContain("<a ");
  });

  it("uses Next's not-found path for unknown guide slugs", async () => {
    await expect(
      StyleGuidePage({
        params: Promise.resolve({ slug: "not-a-guide" }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFoundMock).toHaveBeenCalledOnce();
  });
});
