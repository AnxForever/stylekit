import { describe, expect, it } from "vitest";

import { mainNav, secondaryNav } from "@/lib/nav-config";

describe("primary navigation", () => {
  it("keeps resources as a compact dropdown without a build menu", () => {
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
    expect(resourceItems).toHaveLength(8);
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
