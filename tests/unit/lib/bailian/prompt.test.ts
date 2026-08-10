import { describe, expect, it } from "vitest";

import { buildStyleIntentPrompt } from "@/lib/bailian/prompt";

describe("Style Advisor knowledge prompt", () => {
  it("includes published references and their usage policy", () => {
    const prompt = buildStyleIntentPrompt("Build a dashboard.", [{ slug: "editorial", nameEn: "Editorial", description: "Editorial" }], [{ id: "radix", name: "Radix", summary: "Accessible primitives", tags: ["a11y"], sourceUrl: "https://example.com", usagePolicy: "retrieval-only" }]);
    expect(prompt).toContain("Published knowledge references");
    expect(prompt).toContain("radix");
    expect(prompt).toContain("retrieval-only");
  });
});
