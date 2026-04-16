import { describe, expect, it } from "vitest";
import { buildAgentProjectKnowledgeContext } from "@/lib/agent/project-knowledge";

describe("buildAgentProjectKnowledgeContext", () => {
  it("pulls prompts, recipes, implementation examples, and frontend guidance from project data", () => {
    const result = buildAgentProjectKnowledgeContext({
      locale: "en",
      planner: {
        ready: true,
        phase: "done",
        normalizedQuery: "enterprise saas dashboard",
        productType: "Enterprise SaaS Dashboard",
        audience: "Enterprise operations leaders",
        visualTone: "Professional and clear",
        styleSlug: "",
        mustHave: ["Primary KPIs", "Actionable table"],
        constraints: ["Keep the first screen concise"],
        followUpQuestion: "",
        suggestedOptions: [],
        reasoning: [],
        context: {
          targetAudience: "enterprise",
          primaryDevice: "mobile",
          accessibilityPriority: true,
          performancePriority: true,
        },
      },
      styleSlug: "corporate-clean",
    });

    expect(result.counts.promptTopic).toBeGreaterThan(0);
    expect(result.counts.stylePrompt).toBeGreaterThan(0);
    expect(result.counts.recipe).toBeGreaterThan(0);
    expect(result.counts.templateExample).toBeGreaterThan(0);
    expect(result.counts.componentPattern).toBeGreaterThan(0);
    expect(result.counts.webGuideline).toBeGreaterThan(0);
    expect(result.counts.reactGuideline).toBeGreaterThan(0);
    expect(result.items.some((item) => item.type === "promptTopic")).toBe(true);
    expect(result.items.some((item) => item.type === "stylePrompt")).toBe(true);
    expect(result.items.some((item) => item.type === "recipe")).toBe(true);
    expect(result.items.some((item) => item.type === "templateExample")).toBe(true);
    expect(result.items.some((item) => item.type === "componentPattern")).toBe(true);
    expect(
      result.items.some(
        (item) => item.type === "templateExample" && item.source.startsWith("app/templates/")
      )
    ).toBe(true);
  });
});
