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

  it("scopes kinetic timing rules to discrete transitions and preserves loop guidance in the brief", () => {
    const style = getStyleBySlug("kinetic-typography")!;
    const brief = getImplementationBrief(style.slug)!;
    const rulesZh = [...style.doList, ...style.dontList, style.aiRules].join("\n");
    const rulesEn = [
      ...(style.doListEn ?? []),
      ...(style.dontListEn ?? []),
      style.aiRulesEn ?? "",
    ].join("\n");

    expect(rulesZh).not.toMatch(/禁止超过 1\.2s 的拖沓动画与 linear 缓动|全程统一使用 expo-out/);
    expect(rulesEn).not.toMatch(/Never drag animations past 1\.2s or use linear easing|expo-out easing everywhere/i);
    expect(rulesZh).toContain("离散入场或交互过渡超过 1.2s");
    expect(rulesZh).toContain("连续装饰循环不受此时长限制");
    expect(rulesZh).toContain("呼吸可用 2.4s ease-in-out");
    expect(rulesZh).toContain("跑马灯可用 24s linear 保持匀速");
    expect(rulesEn).toContain("continuous decorative loops have their own timing");
    expect(rulesEn).toContain("2.4s ease-in-out breathing");
    expect(rulesEn).toContain("24s linear marquee for constant speed");
    expect(rulesEn).toContain("pause/stop/hide mechanism");

    expect(brief.doList).toEqual(style.doListEn);
    expect(brief.dontList).toEqual(style.dontListEn);
    expect(brief.aiRules).toBe(style.aiRulesEn);
    expect(brief.globalCss).toContain("animation: kt-marquee 24s linear infinite");
    expect(brief.globalCss).toContain(".kt-marquee:hover .kt-marquee-track { animation-play-state: paused; }");
    expect(brief.globalCss).toContain("@media (prefers-reduced-motion: reduce)");
    expect(brief.components.hero).toBeDefined();
    expect(brief.components.hero?.code).toContain("animation: kt-breathe 2.4s ease-in-out infinite alternate");
  });

  it("keeps kinetic landing-page prompts consistent with continuous loop guidance", () => {
    const style = getStyleBySlug("kinetic-typography")!;
    const example = style.examplePrompts?.find((prompt) => prompt.titleEn === "Kinetic Type Landing Page");
    expect(example).toBeDefined();

    for (const prompt of [example?.prompt, example?.promptEn]) {
      expect(prompt).not.toMatch(/All easing cubic-bezier/i);
      expect(prompt).toContain("for discrete entrances and interaction transitions");
      expect(prompt).toContain("breathing uses 2.4s ease-in-out");
      expect(prompt).toContain("marquee uses 24s linear");
    }
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
