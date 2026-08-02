import { describe, expect, it } from "vitest";

import { mainNav, secondaryNav } from "@/lib/nav-config";

describe("primary navigation", () => {
  it("keeps resources grouped without foundations or a build menu", () => {
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
    expect(resources?.dropdown?.groups?.map((group) => group.groupLabelKey)).toEqual([
      "nav.resourcesBrowse",
      "nav.resourcesComponents",
      "nav.more",
    ]);
    expect(resourceItems?.map((item) => item.labelKey)).toEqual([
      "nav.animations",
      "nav.mouseInteractions",
      "nav.recipes",
      "nav.guides",
      "nav.resourceLibrary",
      "nav.componentPatterns",
      "nav.learn",
      "nav.developers",
      "nav.changelog",
      "nav.blog",
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
