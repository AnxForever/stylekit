import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = path.resolve(__dirname, "../../..");

async function read(relativePath: string) {
  return readFile(path.join(ROOT, relativePath), "utf8");
}

describe("English homepage typography", () => {
  it("uses a readable editorial title with a scoped calligraphic accent", async () => {
    const [layout, homepage, globals] = await Promise.all([
      read("app/layout.tsx"),
      read("components/home/home-content.tsx"),
      read("app/globals.css"),
    ]);

    expect(layout).toContain("Playfair_Display");
    expect(layout).not.toContain("Newsreader");
    expect(layout).not.toContain("Parisienne");
    expect(layout).not.toContain("Bodoni");
    expect(homepage).toContain('locale === "en" && "home-hero-editorial-accent-en"');
    expect(homepage).toContain('className="home-hero-editorial-line-en"');
    expect(homepage).toContain('"home-hero-title-en max-w-[17ch]"');
    expect(globals).toContain(".home-hero-title-en");
    expect(globals).toContain("var(--font-public-display)");
    expect(globals).toContain(".home-hero-editorial-line-en");
    expect(globals).toContain(".home-hero-editorial-accent-en");
    expect(globals).toMatch(/\.home-hero-title-en \{[\s\S]*?font-weight: 500;/);
  });

  it("keeps AI readable inside the Chinese homepage title", async () => {
    const [homepage, globals] = await Promise.all([
      read("components/home/home-content.tsx"),
      read("app/globals.css"),
    ]);

    expect(homepage).toContain('heroTitleLine1.split("AI")');
    expect(homepage).toContain('<span className="home-hero-ai-zh">AI</span>');
    expect(globals).toContain(".home-hero-ai-zh");
    expect(globals).toContain(
      'font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;'
    );
    expect(globals).toContain("font-size: 1em");
    expect(globals).toContain("font-weight: 400");
  });

  it("removes the rejected display font from global and showcase sources", async () => {
    const sources = await Promise.all([
      read("app/layout.tsx"),
      read("lib/typography/index.ts"),
      read("lib/typography/showcase-profiles.ts"),
    ]);

    expect(sources.join("\n")).not.toContain("Bodoni");
  });
});
