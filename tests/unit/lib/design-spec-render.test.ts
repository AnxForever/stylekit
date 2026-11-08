import { describe, expect, it } from "vitest";
import {
  renderCssVariables,
  renderDesignMd,
  renderDtcg,
  renderTailwindTheme,
} from "@/lib/design-spec";
import { editorialSpec } from "@/lib/design-spec/samples/editorial";
import { listDesignSpecs } from "@/lib/design-spec/registry";
import type { DesignSpec } from "@/lib/design-spec/types";
import { stylesMeta } from "@/lib/styles/meta-registry";

describe("backfilled specs", () => {
  const specs = listDesignSpecs();

  it("provides a complete design document for every curated style", () => {
    const completeSlugs = new Set(
      specs.filter((spec) => spec.completeness === "full").map((spec) => spec.slug),
    );
    expect(stylesMeta.map((style) => style.slug).filter((slug) => !completeSlugs.has(slug))).toEqual([]);
  });

  it("renders every registered spec with all twelve sections", () => {
    for (const spec of specs) {
      const md = renderDesignMd(spec, { density: "extended", locale: "en" });
      const sections = md.split("\n").filter((line) => line.startsWith("## "));
      expect(sections.length, `${spec.slug} sections`).toBe(12);
    }
  });

  it("never ships a placeholder sentence", () => {
    for (const spec of specs) {
      const en = renderDesignMd(spec, { density: "extended", locale: "en" });
      const zh = renderDesignMd(spec, { density: "extended", locale: "zh" });
      expect(en, spec.slug).not.toContain("TODO");
      expect(zh, spec.slug).not.toContain("TODO");
    }
  });

  it("keeps every spec bilingual and complete", () => {
    for (const spec of specs) {
      expect(spec.completeness, spec.slug).toBe("full");
      for (const color of spec.colors) {
        expect(color.role.en.trim().length, `${spec.slug}/${color.nameEn} en`).toBeGreaterThan(20);
        expect(color.role.zh.trim().length, `${spec.slug}/${color.nameEn} zh`).toBeGreaterThan(8);
      }
    }
  });

  it("covers the styles that carry the most traffic", () => {
    const slugs = new Set(specs.map((spec) => spec.slug));
    for (const slug of [
      "corporate-clean",
      "neumorphism",
      "glassmorphism",
      "editorial",
      "soft-ui",
      "macos-vibrancy",
      "neo-brutalist",
    ]) {
      expect(slugs.has(slug), slug).toBe(true);
    }
  });
});

describe("DESIGN.md renderer", () => {
  it("opens with the thesis, theme and summary before any section", () => {
    const md = renderDesignMd(editorialSpec);
    const head = md.split("\n").slice(0, 6).join("\n");

    expect(head).toContain("# Editorial — Style Reference");
    expect(head).toContain("> A serif magazine spread on warm paper");
    expect(head).toContain("**Theme:** light");
  });

  it("keeps the section order the reader expects", () => {
    const md = renderDesignMd(editorialSpec);
    const order = [
      "## Colors",
      "## Typography",
      "## Spacing & Layout",
      "## Components",
      "## Do's and Don'ts",
      "## Surfaces",
      "## Elevation",
      "## Imagery",
      "## Layout",
      "## Agent Prompt Guide",
      "## Similar Brands",
      "## Quick Start",
    ];

    const positions = order.map((heading) => md.indexOf(heading));
    expect(positions.every((index) => index >= 0)).toBe(true);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });

  it("carries every color with its role sentence", () => {
    const md = renderDesignMd(editorialSpec);

    for (const color of editorialSpec.colors) {
      expect(md).toContain(color.value);
      expect(md).toContain(color.nameEn);
      expect(md).toContain(color.role.en);
    }
  });

  it("drops token columns, the prompt guide and the variable sheet in compact", () => {
    const compact = renderDesignMd(editorialSpec, { density: "compact" });

    expect(compact).not.toContain("--color-ink");
    expect(compact).not.toContain("## Agent Prompt Guide");
    expect(compact).not.toContain("## Quick Start");
    expect(compact).toContain("## Do's and Don'ts");
    expect(compact).toContain("#1c1c1c");
  });

  it("renders the Chinese text when asked for zh", () => {
    const md = renderDesignMd(editorialSpec, { locale: "zh" });

    expect(md).toContain(editorialSpec.northStar.zh);
    expect(md).toContain(editorialSpec.dos[0].zh);
    expect(md).not.toContain(editorialSpec.northStar.en);
  });

  it("escapes pipes so a role sentence cannot break a table row", () => {
    const withPipe: DesignSpec = {
      ...editorialSpec,
      colors: [
        {
          ...editorialSpec.colors[0],
          role: { zh: "a | b", en: "a | b" },
        },
      ],
    };

    const md = renderDesignMd(withPipe);
    const row = md.split("\n").find((line) => line.includes("Ink"));
    expect(row).toBeDefined();
    // The pipe must survive as an escaped character, not as a column break.
    expect(row).toContain("a \\| b");
    expect(row?.startsWith("| Ink |")).toBe(true);
  });
});

describe("export renderers", () => {
  it("emits a Tailwind v4 theme without layout-only variables", () => {
    const theme = renderTailwindTheme(editorialSpec);

    expect(theme.startsWith("@theme {")).toBe(true);
    expect(theme).toContain("--color-ink: #1c1c1c;");
    expect(theme).toContain("--font-serif:");
    expect(theme).toContain("--spacing-8: 8px;");
    expect(theme).not.toContain("--page-max-width");
  });

  it("emits the full variable sheet including layout and surfaces", () => {
    const css = renderCssVariables(editorialSpec);

    expect(css.startsWith(":root {")).toBe(true);
    expect(css).toContain("--page-max-width: 1200px;");
    expect(css).toContain("--section-gap: 96px;");
    expect(css).toContain("--surface-paper: #f9f8f6;");
    expect(css).toContain("--radius-cards: 0;");
  });

  it("emits DTCG tokens whose descriptions carry the role, not the label", () => {
    const parsed = JSON.parse(renderDtcg(editorialSpec)) as {
      color: Record<string, { $value: string; $type: string; $description: string }>;
    };

    expect(parsed.color.ink.$value).toBe("#1c1c1c");
    expect(parsed.color.ink.$type).toBe("color");
    expect(parsed.color.ink.$description).toContain("Ink");
    expect(parsed.color.ink.$description).toContain(editorialSpec.colors[0].role.en);
  });

  it("keeps every export on the same values", () => {
    const md = renderDesignMd(editorialSpec);
    const theme = renderTailwindTheme(editorialSpec);
    const css = renderCssVariables(editorialSpec);
    const tokens = renderDtcg(editorialSpec);

    for (const color of editorialSpec.colors) {
      expect(md).toContain(color.value);
      expect(theme).toContain(`${color.token}: ${color.value};`);
      expect(css).toContain(`${color.token}: ${color.value};`);
      expect(tokens).toContain(color.value);
    }
  });
});

describe("stub completeness", () => {
  const stub: DesignSpec = {
    ...editorialSpec,
    completeness: "stub",
    components: [],
    similar: [],
  };

  it("still publishes colors and rules so a page can ship", () => {
    const md = renderDesignMd(stub);

    expect(md).toContain("## Colors");
    expect(md).toContain("## Do's and Don'ts");
    expect(md).not.toContain("## Typography");
    expect(md).not.toContain("## Components");
    expect(md).not.toContain("## Quick Start");
  });
});
