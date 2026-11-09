import { describe, expect, it } from "vitest";
import { validateDesignSpecCoverage } from "@/lib/design-spec/catalog-coverage";

describe("canonical document publication coverage", () => {
  it("accepts a complete authored document for each curated style", () => {
    expect(validateDesignSpecCoverage(["editorial"], [
      { slug: "editorial", completeness: "full" },
    ])).toEqual([]);
  });

  it("names a style whose document registration was omitted", () => {
    expect(validateDesignSpecCoverage(["editorial", "new-style"], [
      { slug: "editorial", completeness: "full" },
    ])).toEqual([{ slug: "new-style", kind: "missing" }]);
  });

  it("rejects a registered stub instead of treating presence as completeness", () => {
    expect(validateDesignSpecCoverage(["new-style"], [
      { slug: "new-style", completeness: "stub" },
    ])).toEqual([{ slug: "new-style", kind: "incomplete" }]);
  });

  it("allows a separately authored future spec before its style is published", () => {
    expect(validateDesignSpecCoverage(["editorial"], [
      { slug: "editorial", completeness: "full" },
      { slug: "future-style", completeness: "full" },
    ])).toEqual([]);
  });
});
