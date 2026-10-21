import { describe, expect, it } from "vitest";

import { mainNav, secondaryNav } from "@/lib/nav-config";

describe("primary navigation", () => {
  it("keeps the chat group and blog together under community", () => {
    expect(mainNav.map((item) => item.labelKey)).toEqual([
      "nav.styles",
      "nav.templates",
      "nav.community",
      "nav.resources",
    ]);

    const community = mainNav.find((item) => item.labelKey === "nav.community");

    expect(community?.href).toBe("/community");
    expect(community?.dropdown?.width).toBe("narrow");
    expect(community?.dropdown?.items?.map((item) => item.labelKey)).toEqual([
      "nav.communityStyles",
      "nav.communityJoin",
      "nav.blog",
    ]);
    expect(community?.dropdown?.items?.map((item) => item.href)).toEqual([
      "/community",
      "/community/join",
      "/blog",
    ]);
    expect(community?.dropdown?.groups).toBeUndefined();
  });

  it("keeps resources grouped without a build menu or an external blog", () => {
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
