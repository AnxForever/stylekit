import { describe, expect, it } from "vitest";
import { templateCatalog } from "@/lib/templates/catalog";
import {
  getTemplateTypeScenarios,
  matchesTemplateSearch,
  matchesTemplateType,
} from "@/lib/templates/discovery";

const anxPortfolio = templateCatalog.find((template) => template.id === "anx-portfolio");

describe("template discovery", () => {
  it("finds the AnxForever project by name, domain, and both portfolio/blog terms", () => {
    expect(anxPortfolio).toBeDefined();
    if (!anxPortfolio) return;

    for (const query of ["AnxForever", "me.anxforever.cn", "blog", "portfolio"]) {
      expect(matchesTemplateSearch(anxPortfolio, query), query).toBe(true);
    }
    expect(matchesTemplateType(anxPortfolio, "portfolio")).toBe(true);
    expect(matchesTemplateType(anxPortfolio, "blog")).toBe(true);
    expect(matchesTemplateType(anxPortfolio, "landing")).toBe(false);
  });

  it("searches external repository, stack, features, keywords, and translated category labels", () => {
    expect(anxPortfolio).toBeDefined();
    if (!anxPortfolio) return;

    expect(matchesTemplateSearch(anxPortfolio, "github.com/anxforever/anx-portfolio")).toBe(true);
    expect(matchesTemplateSearch(anxPortfolio, "next.js + react + mdx")).toBe(true);
    expect(matchesTemplateSearch(anxPortfolio, "分类收藏")).toBe(true);
    expect(matchesTemplateSearch(anxPortfolio, "博客")).toBe(true);
    expect(matchesTemplateSearch(anxPortfolio, "作品集", ["作品集"])).toBe(true);
  });

  it("merges scenarios from every supported template category without duplicates", () => {
    expect(anxPortfolio).toBeDefined();
    if (!anxPortfolio) return;

    expect(
      getTemplateTypeScenarios(anxPortfolio, {
        portfolio: "portfolio",
        blog: "blog",
      })
    ).toEqual(["portfolio", "blog"]);
    expect(
      getTemplateTypeScenarios(anxPortfolio, {
        portfolio: "writing",
        blog: "writing",
      })
    ).toEqual(["writing"]);
  });

  it("keeps the profile-and-journal example discoverable by either project type", () => {
    const technicalProfile = templateCatalog.find((template) => template.id === "technical-profile");
    expect(technicalProfile).toBeDefined();
    if (!technicalProfile) return;

    expect(matchesTemplateType(technicalProfile, "portfolio")).toBe(true);
    expect(matchesTemplateType(technicalProfile, "blog")).toBe(true);
    expect(matchesTemplateSearch(technicalProfile, "technical-profile")).toBe(true);
  });
});
