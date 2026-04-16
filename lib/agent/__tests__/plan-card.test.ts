import { describe, expect, it } from "vitest";
import { buildAgentPlanCard } from "@/lib/agent/plan-card";

describe("buildAgentPlanCard", () => {
  it("builds a structured page plan card from planner and recommendation data", () => {
    const result = buildAgentPlanCard({
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
          brandMood: "professional",
        },
      },
      smartRecommendation: {
        style: {
          item: {
            slug: "glassmorphism",
            name: "Glassmorphism",
            philosophy: "",
          },
          score: 86,
          reasons: ["Matches professional brand mood"],
          alternatives: [
            {
              slug: "corporate-clean",
              name: "Corporate Clean",
              philosophy: "",
            },
          ],
        },
        colors: {
          item: {} as never,
          score: 80,
          reasons: [],
          alternatives: [],
        },
        typography: {
          item: {} as never,
          score: 78,
          reasons: [],
          alternatives: [],
        },
        landingPattern: {
          item: {
            name: "Enterprise Sales",
            keywords: [],
            sectionOrder: ["Hero", "Solution Overview", "Case Studies", "Contact Form"],
            primaryCtaPlacement: "Hero",
            colorStrategy: "",
            recommendedEffects: "",
            conversionOptimization: "",
          },
          score: 80,
          reasons: [],
          alternatives: [],
        },
        styleScores: [],
        compatibility: {
          styleColorScore: 80,
          styleTypographyScore: 78,
          overallHarmony: 82,
        },
        contextAdjustments: [],
        summary: {
          confidence: 82,
          headline: "Glassmorphism with SaaS colors",
          keyDecisions: [],
        },
      } as never,
      recommendations: [
        {
          id: "style-glassmorphism",
          type: "style",
          slug: "glassmorphism",
          href: "/styles/glassmorphism",
          title: "Glassmorphism",
          reason: "Best overall visual match",
          confidence: 86,
        },
      ],
    });

    expect(result.pageType).toBe("Enterprise SaaS Dashboard");
    expect(result.templateType).toBe("Dashboard");
    expect(result.primaryAction).toContain("Book a demo");
    expect(result.secondaryAction).toContain("case studies");
    expect(result.sections).toHaveLength(4);
    expect(result.contentPriorities.length).toBeGreaterThanOrEqual(3);
    expect(result.mustInclude).toEqual(["Primary KPIs", "Actionable table"]);
    expect(result.constraints).toContain("Keep the first screen concise");
    expect(result.risks.some((item) => item.includes("Glassmorphism"))).toBe(true);
    expect(result.mobileNotes.length).toBeGreaterThanOrEqual(2);
    expect(result.nextStep).toContain("Glassmorphism");
  });
});
