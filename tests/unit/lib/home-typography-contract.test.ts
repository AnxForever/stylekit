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

  it("keeps the rejected display font out of the site's own typography", async () => {
    // Scope note: lib/typography/index.ts is deliberately NOT checked here. It is
    // the public pairing catalogue visitors copy from, not the site's own type --
    // the same split Newsreader already has (banned in app/layout.tsx, shipped as
    // the newsreader-editorial pairing). A catalogue entry can only become site
    // typography by being selected in PROFILE_PAIRINGS, which the resolved-profile
    // check below covers directly.
    const [layout, showcaseSource] = await Promise.all([
      read("app/layout.tsx"),
      read("lib/typography/showcase-profiles.ts"),
    ]);

    expect(layout).not.toContain("Bodoni");
    // Lower-cased: profiles reference pairings by id (e.g. "vogue-bodoni"), so a
    // case-sensitive match would sail straight past them.
    expect(showcaseSource.toLowerCase()).not.toContain("bodoni");

    const { getShowcaseTypographyProfile } = await import(
      "@/lib/typography/showcase-profiles"
    );
    const { stylesMeta } = await import("@/lib/styles/meta-registry");

    for (const style of stylesMeta) {
      const profile = getShowcaseTypographyProfile(
        `/styles/${style.slug}/showcase`
      );
      if (!profile) continue;
      expect(profile.pairing.heading.family, style.slug).not.toContain("Bodoni");
      expect(profile.pairing.body.family, style.slug).not.toContain("Bodoni");
    }
  });
});
