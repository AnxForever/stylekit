import { describe, expect, it } from "vitest";
import {
  getCanonicalResourceUrl,
  getResourceSectionFromSearch,
  getResourceTabHref,
  parseResourceSectionId,
} from "@/lib/resources/navigation";

describe("resource tab navigation", () => {
  it("uses the query tab as canonical state and defaults invalid values", () => {
    expect(getResourceSectionFromSearch("?utm_source=docs&tab=shadows")).toBe("shadows");
    expect(getResourceSectionFromSearch("?tab=unknown")).toBe("typography");
    expect(parseResourceSectionId("shaders")).toBe("shaders");
    expect(parseResourceSectionId("unknown")).toBeNull();
  });

  it("migrates a legacy hash to the query while retaining other parameters", () => {
    const canonical = getCanonicalResourceUrl(
      new URL("https://stylekit.test/zh/resources?campaign=launch#shadows"),
    );

    expect(canonical?.pathname).toBe("/zh/resources");
    expect(canonical?.searchParams.get("campaign")).toBe("launch");
    expect(canonical?.searchParams.get("tab")).toBe("shadows");
    expect(canonical?.hash).toBe("");
  });

  it("keeps a valid query tab over an old hash and removes the stale fragment", () => {
    const canonical = getCanonicalResourceUrl(
      new URL("https://stylekit.test/resources?tab=gradients&campaign=launch#shadows"),
    );

    expect(canonical?.searchParams.get("tab")).toBe("gradients");
    expect(canonical?.searchParams.get("campaign")).toBe("launch");
    expect(canonical?.hash).toBe("");
  });

  it("drops an invalid tab parameter and preserves unrelated fragments", () => {
    const canonical = getCanonicalResourceUrl(
      new URL("https://stylekit.test/resources?tab=missing&campaign=launch#overview"),
    );

    expect(canonical?.searchParams.has("tab")).toBe(false);
    expect(canonical?.searchParams.get("campaign")).toBe("launch");
    expect(canonical?.hash).toBe("#overview");
  });

  it("builds tab destinations without discarding unrelated query values", () => {
    const href = getResourceTabHref(
      new URL("https://stylekit.test/zh/resources?campaign=launch&tab=gradients#gradients"),
      "shadows",
    );
    const destination = new URL(href, "https://stylekit.test");

    expect(destination.pathname).toBe("/zh/resources");
    expect(destination.searchParams.get("campaign")).toBe("launch");
    expect(destination.searchParams.get("tab")).toBe("shadows");
    expect(destination.hash).toBe("");
  });

  it("preserves an unrelated page fragment when changing tabs", () => {
    const href = getResourceTabHref(
      new URL("https://stylekit.test/resources?campaign=launch#overview"),
      "shadows",
    );

    expect(new URL(href, "https://stylekit.test").hash).toBe("#overview");
  });
});
