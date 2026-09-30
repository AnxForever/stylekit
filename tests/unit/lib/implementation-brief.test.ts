import { describe, expect, it } from "vitest";
import { createImplementationBrief, getImplementationBrief } from "@/lib/implementation-brief";
import { getStyleBySlug } from "@/lib/styles";
import { getStyleRecipes } from "@/lib/recipes";

describe("implementation brief", () => {
  it("delivers source instructions, code and merged rules in one stable contract", () => {
    const brief = getImplementationBrief("neo-brutalist")!;
    expect(brief.schemaVersion).toBe("stylekit-brief-v1");
    expect(brief.aiRules).toBeTruthy();
    expect(brief.globalCss).toBe(getStyleBySlug(brief.slug)!.globalCss);
    expect(brief.components.button.code).toContain("className");
    expect(Object.keys(brief.recipes)).toEqual(expect.arrayContaining(["button", "card", "input"]));
    expect(brief.lintRules.sources).toEqual(["tokens", "curated"]);
    expect(brief.provenance.contentHash).toMatch(/^fnv1a32:[a-f0-9]{8}$/);
    expect(getImplementationBrief(brief.slug)).toEqual(brief);
    expect(JSON.parse(JSON.stringify(brief))).toEqual(brief);
  });

  it("changes the content identifier when AI guidance changes", () => {
    const style = getStyleBySlug("neo-brutalist")!;
    const brief = getImplementationBrief(style.slug)!;
    const changed = createImplementationBrief({ ...style, aiRulesEn: `${brief.aiRules}\nNew guidance.` }, {
      tokens: brief.tokens, recipes: getStyleRecipes(style.slug)!, readiness: brief.readiness,
    });
    expect(changed.provenance.contentHash).not.toBe(brief.provenance.contentHash);
  });

  it("uses community capabilities without importing curated rules for a reused slug", () => {
    const brief = getImplementationBrief("neo-brutalist")!;
    const community = createImplementationBrief(getStyleBySlug(brief.slug)!, {
      tokens: null, recipes: null, readiness: brief.readiness,
    }, "community");
    expect(community.lintRules.sources).toEqual([]);
    expect(community.recipes).toEqual({});
    expect(community.provenance.source).toBe("community");
  });

  it("does not invent a brief for unknown styles", () => {
    expect(getImplementationBrief("unknown-style")).toBeNull();
  });
});
