import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { animations } from "@/lib/animations";
import { getAllArchetypes } from "@/lib/archetypes";
import { backgrounds } from "@/lib/backgrounds";
import { componentPatterns } from "@/lib/component-patterns";
import { DESIGN_PRINCIPLES } from "@/lib/design-principles";
import { gradients } from "@/lib/gradients";
import { promptTopics } from "@/lib/prompts";
import { shadows } from "@/lib/shadows";
import { getAllStyleColors } from "@/lib/styles/colors";
import { stylesMeta } from "@/lib/styles/meta";
import { getAllRecipes } from "@/lib/styles/recipes";
import { SPACING_PRESETS, GRID_PRESETS } from "@/lib/spacing";
import { SCALE_RATIOS } from "@/lib/type-scale";
import { HIERARCHY_LEVERS, TEXT_LEVELS } from "@/lib/visual-hierarchy";
import { fontPairings } from "@/lib/typography";
import { templateCatalog } from "@/lib/templates/catalog";
import { UI_PROMPT_EXAMPLES } from "@/lib/seo/ui-prompt-examples";
import { componentPatternPreviewSource } from "@/lib/assets/component-pattern-preview-source.generated";
import {
  ASSET_KINDS,
  getPublicAsset,
  isAssetKind,
  listPublicAssets,
} from "@/lib/assets";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function ids(kind: (typeof ASSET_KINDS)[number]): string[] {
  const result = listPublicAssets({ kind, limit: 100 });
  const all = [...result.assets];
  for (let offset = result.limit; offset < result.total; offset += result.limit) {
    all.push(...listPublicAssets({ kind, offset, limit: result.limit }).assets);
  }
  return all.map((asset) => asset.id);
}

describe("public asset registry", () => {
  it("exposes a runtime kind list and covers each public source registry", () => {
    expect(ASSET_KINDS).toContain("prompt");
    expect(ASSET_KINDS).not.toContain("knowledge");
    expect(isAssetKind("component-pattern")).toBe(true);
    expect(isAssetKind("user-kit")).toBe(false);

    const all = listPublicAssets({ limit: 100 });
    expect(all.schemaVersion).toBe("1");
    expect(all.total).toBeGreaterThan(0);
    expect(all.kindCounts.style).toBe(stylesMeta.length);
    expect(all.kindCounts.recipe).toBe(getAllRecipes().length);
    expect(all.kindCounts.animation).toBe(animations.length);
    expect(all.kindCounts.background).toBe(backgrounds.length);
    expect(all.kindCounts.gradient).toBe(gradients.length);
    expect(all.kindCounts.shadow).toBe(shadows.length);
    expect(all.kindCounts.typography).toBe(fontPairings.length);
    expect(all.kindCounts.palette).toBe(getAllStyleColors().length);
    expect(all.kindCounts["component-pattern"]).toBe(componentPatterns.length);
    expect(all.kindCounts.spacing).toBe(SPACING_PRESETS.length);
    expect(all.kindCounts["layout-grid"]).toBe(GRID_PRESETS.length);
    expect(all.kindCounts["design-principle"]).toBe(DESIGN_PRINCIPLES.length);
    expect(all.kindCounts["visual-hierarchy"]).toBe(HIERARCHY_LEVERS.length + TEXT_LEVELS.length + 1);
    expect(all.kindCounts["type-scale"]).toBe(SCALE_RATIOS.length);
    expect(all.kindCounts.archetype).toBe(getAllArchetypes().length);
    expect(all.kindCounts.prompt).toBe(promptTopics.length + UI_PROMPT_EXAMPLES.length);
    expect(all.kindCounts.template).toBe(templateCatalog.length);
    expect(all.kindCounts["experience-pack"]).toBe(1);

    for (const kind of ASSET_KINDS) {
      const records = ids(kind);
      expect(new Set(records).size, `${kind} IDs should be unique`).toBe(records.length);
      expect(all.kindCounts[kind], `${kind} count should have a public detail for every list row`).toBe(records.length);
      for (const id of records) {
        const detail = getPublicAsset(kind, id);
        expect(detail, `${kind}/${id} should have a detail record`).not.toBeNull();
        expect(detail!.metadata.tags).toBeInstanceOf(Array);
        expect(detail!.metadata.id).toBe(id);
      }
    }
  });

  it("returns stable, paginated summaries and searches across separated words", () => {
    const first = listPublicAssets({ kind: "animation", limit: 5 });
    const second = listPublicAssets({ kind: "animation", offset: 5, limit: 5 });
    expect(first.assets).toHaveLength(5);
    expect(first.hasMore).toBe(true);
    expect(first.total).toBe(animations.length);
    expect(first.kindCounts.animation).toBe(animations.length);
    expect(second.assets[0].id).not.toBe(first.assets[0].id);
    expect(second.offset).toBe(5);

    const disjoint = listPublicAssets({ kind: "animation", query: "glow hover", limit: 10 });
    expect(disjoint.assets.map((asset) => asset.id)).toContain("hover-glow");
    const exactName = listPublicAssets({ kind: "animation", query: "cursor aura", limit: 10 });
    expect(exactName.assets[0].id).toBe("cursor-aura");
    expect(listPublicAssets({ kind: "animation", query: "nothing-matches-this" }).total).toBe(0);
  });

  it("provides full styles, composition recipes, and dependency-aware code", () => {
    const style = getPublicAsset("style", "glassmorphism")!;
    expect(style.data).toHaveProperty("style.slug", "glassmorphism");
    expect(style.data).toHaveProperty("style.components.button.code", expect.stringContaining("<button"));
    expect(style.data).toHaveProperty("brief.slug", "glassmorphism");
    expect(style.data).toHaveProperty("brief.tokens", expect.any(Object));
    expect(style.data).toHaveProperty("palette.colors.primary", expect.any(String));
    expect(style.dependencies).toEqual(["react", "tailwindcss"]);
    expect(style.sourceUrls?.some((url) => url.endsWith("/styles/glassmorphism.svg"))).toBe(true);

    const recipe = getPublicAsset("recipe", "saas-modern-glass")!;
    expect(recipe.data).toHaveProperty("visualStyle", "liquid-glass");
    expect(recipe.data).toHaveProperty("layout", "bento-grid");
    expect(recipe.codeLanguage).toBe("json");

    const cursorAura = getPublicAsset("animation", "cursor-aura")!;
    expect(cursorAura.dependencies).toContain("react");
    const handwriting = getPublicAsset("animation", "handwriting-reveal")!;
    expect(handwriting.dependencies).toContain("framer-motion");
    expect(handwriting.data).toHaveProperty("codeSnippets", expect.arrayContaining([expect.objectContaining({ dependencies: expect.arrayContaining(["framer-motion"]) })]));

    const borderBeam = getPublicAsset("animation", "border-beam")!;
    expect(borderBeam.attribution).toEqual({
      source: "border-beam",
      author: "Jakub Antalík",
      license: "MIT",
      url: "https://github.com/Jakubantalik/border-beam",
    });
  });

  it("keeps all component previews usable and in parity with the source file", async () => {
    const source = await readFile(path.join(projectRoot, "components/component-patterns/pattern-previews.tsx"), "utf8");
    const newline = String.fromCharCode(10);
    const normalizedSource = source.split(String.fromCharCode(13) + newline).join(newline);
    const expected = normalizedSource
      .split(newline)
      .filter((line) => line !== 'import type { ComponentPatternPreviewId } from "@/lib/component-patterns";')
      .join(newline)
      .replace(/ComponentPatternPreviewId/g, "string");
    expect(componentPatternPreviewSource).toBe(expected);

    for (const pattern of componentPatterns) {
      const asset = getPublicAsset("component-pattern", pattern.id)!;
      expect(asset.code).toContain(`case "${pattern.previewId}"`);
      expect(asset.data).toHaveProperty("entryPoint", "PatternPreview");
      expect(asset.data).toHaveProperty("selector", { prop: "previewId", value: pattern.previewId });
      expect(asset.dependencies).toEqual(["react", "tailwindcss"]);
    }
  });

  it("preserves attribution and applies public/restricted availability correctly", () => {
    for (const background of backgrounds.filter((item) => item.attribution)) {
      const asset = getPublicAsset("background", background.id)!;
      expect(asset.attribution).toEqual(background.attribution);
      expect(asset.license?.name).toBe(background.attribution!.license);
    }

    const localTemplate = getPublicAsset("template", "brutal-landing")!;
    expect(localTemplate.metadata.availability).toBe("remote");
    expect(localTemplate.metadata.contentLevel).toBe("remote");
    expect(localTemplate.data).toHaveProperty("downloadUrl", "https://www.stylekit.top/api/templates/brutal-landing/download");
    expect(localTemplate.data).toHaveProperty("sourceFilesIncluded", false);
    const externalTemplate = getPublicAsset("template", "nextdevtpl")!;
    expect(externalTemplate.metadata.availability).toBe("external");
    expect(externalTemplate.data).toHaveProperty("external.repoUrl", "https://github.com/evepupil/NextDevTpl");

    const pack = getPublicAsset("experience-pack", "corporate-clean-saas")!;
    expect(pack.metadata.availability).toBe("restricted");
    expect(pack.metadata.contentLevel).toBe("restricted");
    expect(pack.data).toHaveProperty("installableSourceIncluded", false);
    expect(pack.data).toHaveProperty("license.sourceRedistribution", "prohibited");
    expect(pack.data).not.toHaveProperty("assets");
    expect(pack.data).not.toHaveProperty("blocks");
    expect(pack.data).not.toHaveProperty("templates");
    expect(pack).not.toHaveProperty("code");
  });

  it("isolates returned data and rejects invalid pagination", () => {
    const first = getPublicAsset("background", "dot-grid")!;
    const data = first.data as { tags: string[] };
    data.tags.push("mutated-by-consumer");
    expect(getPublicAsset("background", "dot-grid")!.data).not.toHaveProperty("tags", expect.arrayContaining(["mutated-by-consumer"]));
    expect(getPublicAsset("palette", "missing-color-style")).toBeNull();
    expect(() => listPublicAssets({ offset: -1 })).toThrow(RangeError);
    expect(() => listPublicAssets({ limit: 101 })).toThrow(RangeError);
    expect(() => listPublicAssets({ query: "x".repeat(501) })).toThrow(RangeError);
  });
});
