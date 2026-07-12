import { describe, expect, it } from "vitest";

import { mainNav, secondaryNav } from "@/lib/nav-config";

describe("primary navigation", () => {
  it("keeps a complete resources dropdown without a build menu", () => {
    expect(mainNav.map((item) => item.labelKey)).toEqual([
      "nav.styles",
      "nav.templates",
      "nav.resources",
    ]);

    const resources = mainNav.find(
      (item) => item.labelKey === "nav.resources"
    );
    const resourceItems = resources?.dropdown?.groups?.flatMap(
      (group) => group.items
    );

    expect(resources?.dropdown?.width).toBe("wide");
    expect(resourceItems?.map((item) => item.labelKey)).toEqual([
      "nav.blog",
      "nav.colorTheory",
      "nav.typography",
      "nav.typeScale",
      "nav.spacing",
      "nav.designPrinciples",
      "nav.visualHierarchy",
      "nav.styles",
      "nav.animations",
      "nav.mouseInteractions",
      "nav.vocabulary",
      "nav.recipes",
      "nav.guides",
      "nav.componentPatterns",
      "nav.gradients",
      "nav.shadows",
      "nav.backgrounds",
      "nav.developers",
    ]);
    expect(
      resourceItems?.filter((item) => item.labelKey === "nav.blog")
    ).toEqual([
      {
        href: "https://anxforever.cn",
        labelKey: "nav.blog",
        external: true,
      },
    ]);
    expect(secondaryNav).toEqual([]);
  });
});
