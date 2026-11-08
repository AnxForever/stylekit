import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/design/[slug]/[format]/route";
import { hasDesignSpec, listDesignSpecs } from "@/lib/design-spec/registry";

const params = (slug: string, format: string) => Promise.resolve({ slug, format });

function call(slug: string, format: string, query = "") {
  return GET(new Request(`https://stylekit.top/api/design/${slug}/${format}${query}`), {
    params: params(slug, format),
  });
}

describe("design spec routes", () => {
  it("serves DESIGN.md as markdown", async () => {
    const response = await call("editorial", "design.md");

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/markdown");
    expect(response.headers.get("content-disposition")).toBe('inline; filename="design.md"');
    const body = await response.text();
    expect(body.startsWith("# Editorial — Style Reference")).toBe(true);
    expect(body).toContain("## Do's and Don'ts");
  });

  it("serves the same complete design.md regardless of density", async () => {
    const canonical = await (await call("editorial", "design.md")).text();
    const compact = await (await call("editorial", "design.md", "?density=compact")).text();

    expect(compact).toBe(canonical);
    expect(compact).toContain("## Agent Prompt Guide");
    expect(compact).toContain("## Quick Start");
  });

  it("honours the zh locale and falls back to English for unknown values", async () => {
    const zh = await (await call("editorial", "design.md", "?locale=zh")).text();
    const fallback = await (await call("editorial", "design.md", "?locale=fr")).text();

    expect(zh).toContain("编辑杂志风");
    expect(fallback.startsWith("# Editorial — Style Reference")).toBe(true);
  });

  it("serves the Tailwind theme as CSS", async () => {
    const response = await call("glassmorphism", "theme.css");

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/css");
    const body = await response.text();
    expect(body.startsWith("@theme {")).toBe(true);
    expect(body).toContain("--color-champagne: #e4b863;");
  });

  it("serves the variable sheet with layout values the theme omits", async () => {
    const body = await (await call("neo-brutalist", "variables.css")).text();

    expect(body.startsWith(":root {")).toBe(true);
    expect(body).toContain("--page-max-width: 1280px;");
    expect(body).toContain("--radius-cards: 0;");
  });

  it("serves parseable DTCG tokens", async () => {
    const response = await call("editorial", "tokens.json");
    const parsed = (await response.json()) as { color: Record<string, { $value: string }> };

    expect(response.headers.get("content-type")).toContain("application/json");
    expect(parsed.color.ink.$value).toBe("#1c1c1c");
  });

  it("returns 404 for an unknown format", async () => {
    const response = await call("editorial", "screenshot.png");
    expect(response.status).toBe(404);
  });

  it("returns 404 for a slug that has no spec", async () => {
    const response = await call("__not-a-style__", "design.md");
    expect(response.status).toBe(404);
  });

  it("marks the output cacheable and readable cross-origin", async () => {
    const response = await call("editorial", "design.md");
    expect(response.headers.get("cache-control")).toContain("s-maxage");
    expect(response.headers.get("access-control-allow-origin")).toBe("*");
  });
});

describe("design spec registry", () => {
  it("only advertises slugs it can actually render", () => {
    for (const spec of listDesignSpecs()) {
      expect(hasDesignSpec(spec.slug)).toBe(true);
      expect(spec.colors.length).toBeGreaterThan(0);
    }
  });

  it("does not claim slugs outside the registry", () => {
    expect(hasDesignSpec("__not-a-style__")).toBe(false);
  });
});
