import { describe, expect, it } from "vitest";

import { mainNav, secondaryNav } from "@/lib/nav-config";

describe("primary navigation", () => {
  it("keeps the top bar to the two catalogs and resources", () => {
    expect(mainNav.map((item) => item.labelKey)).toEqual([
      "nav.styles",
      "nav.templates",
      "nav.resources",
    ]);
    expect(mainNav.some((item) => item.labelKey === "nav.community")).toBe(false);
  });

  it("puts the chat group and blog beside foundations in resources", () => {
    const resources = mainNav.find((item) => item.labelKey === "nav.resources");
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
      "nav.learn",
      "nav.communityJoin",
      "nav.blog",
      "nav.animations",
      "nav.mouseInteractions",
      "nav.recipes",
      "nav.guides",
      "nav.resourceLibrary",
      "nav.componentPatterns",
      "nav.mobileDesign",
      "nav.developers",
      "nav.changelog",
    ]);
    expect(
      resources?.dropdown?.groups
        ?.find((group) => group.groupLabelKey === "nav.resourcesBrowse")
        ?.items.map((item) => item.href)
    ).toEqual([
      "/learn",
      "/community/join",
      "/blog",
      "/animations",
      "/mouse-interactions",
      "/recipes",
      "/guides",
    ]);
    expect(
      resources?.dropdown?.groups
        ?.find((group) => group.groupLabelKey === "nav.resourcesComponents")
        ?.items.map((item) => item.href)
    ).toEqual(["/resources", "/component-patterns", "/mobile"]);
    expect(JSON.stringify(mainNav)).not.toContain("anxforever.cn");
    expect(secondaryNav).toEqual([]);
  });
});
