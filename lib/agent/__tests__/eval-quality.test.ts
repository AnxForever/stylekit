import { describe, it, expect } from "vitest";
import { buildAgentCodePrompt } from "../code-prompt";
import type { AgentPlannerResult } from "../types";
import type { SmartRecommendation } from "@/lib/knowledge/smart-recommender";
import type { AgentProjectKnowledgeContext } from "../project-knowledge";

const basePlanner: AgentPlannerResult = {
  ready: true,
  phase: "done",
  normalizedQuery: "minimalist portfolio for designers",
  productType: "Portfolio",
  audience: "Designers and creative professionals",
  visualTone: "Minimalist, clean, airy",
  styleSlug: "",
  mustHave: ["Project gallery", "About section", "Contact form"],
  constraints: ["Keep it simple", "Mobile-friendly"],
  followUpQuestion: "",
  suggestedOptions: [],
  reasoning: ["user wants minimalist design", "portfolio for creatives"],
  context: {
    targetAudience: "creative",
    primaryDevice: "desktop",
    brandMood: "minimal",
  },
};

const mockSmartRecommendation = {
  style: {
    item: {
      slug: "minimalist-flat",
      name: "Minimalist Flat",
      philosophy: "Less is more, clarity above all",
    },
    score: 85,
    reasons: ["matches minimalist visual tone", "suitable for portfolio"],
    alternatives: [
      { slug: "corporate-clean", name: "Corporate Clean", philosophy: "Professional clarity" },
    ],
  },
  colors: {
    item: {
      name: "Neutral Mono",
      primary: "#1a1a1a",
      secondary: "#f5f5f5",
      accent: "#3b82f6",
      background: "#ffffff",
      text: "#1a1a1a",
    },
    score: 80,
    reasons: ["clean palette for minimal design"],
    alternatives: [],
  },
  typography: {
    item: {
      name: "Inter + System",
      heading: "Inter",
      body: "system-ui",
      mono: "monospace",
    },
    score: 78,
    reasons: ["modern and readable"],
    alternatives: [],
  },
  landingPattern: null,
  styleScores: [
    { slug: "minimalist-flat", score: 85, reasons: ["top match"] },
  ],
  compatibility: {
    styleColorScore: 90,
    styleTypographyScore: 85,
    overallHarmony: 87,
  },
  contextAdjustments: ["boosted minimal styles for creative audience"],
  summary: {
    confidence: 85,
    headline: "Minimalist Flat is the best match for this portfolio",
    keyDecisions: ["chose minimalist-flat for clean aesthetic"],
  },
};

const mockProjectKnowledge = {
  items: [
    {
      type: "recipe",
      title: "Minimalist Card Layout",
      source: "lib/styles/minimalist-flat.ts",
      summary: "A clean card layout with generous whitespace",
    },
    {
      type: "componentPattern",
      title: "Responsive Grid",
      source: "lib/component-patterns/index.ts",
      summary: "CSS Grid with responsive breakpoints",
    },
  ],
  counts: {
    recipe: 1,
    templateExample: 0,
    componentPattern: 1,
    webGuideline: 0,
    reactGuideline: 0,
  },
};

describe("eval-quality: buildAgentCodePrompt output", () => {
  describe("English locale", () => {
    const result = buildAgentCodePrompt({
      locale: "en",
      planner: basePlanner,
      smartRecommendation: mockSmartRecommendation as unknown as SmartRecommendation,
      projectKnowledge: mockProjectKnowledge as unknown as AgentProjectKnowledgeContext,
      designRecommendation: null,
    });

    it("returns a non-empty title", () => {
      expect(result.title).toBeTruthy();
      expect(result.title.length).toBeGreaterThan(0);
    });

    it("returns a non-empty styleName", () => {
      expect(result.styleName).toBeTruthy();
    });

    it("returns the correct styleSlug", () => {
      expect(result.styleSlug).toBe("minimalist-flat");
    });

    it("returns a non-empty templateType", () => {
      expect(result.templateType).toBeTruthy();
    });

    it("generates a prompt within 500-10000 characters", () => {
      expect(result.prompt.length).toBeGreaterThanOrEqual(500);
      expect(result.prompt.length).toBeLessThanOrEqual(10000);
    });

    it("does not contain 'undefined' or 'null' or '[object Object]'", () => {
      expect(result.prompt).not.toContain("undefined");
      expect(result.prompt).not.toContain("[object Object]");
      /* Allow "null" only as part of real content like "nullable" */
      const nullMatches = result.prompt.match(/\bnull\b/g);
      const allowedNullContexts = result.prompt.match(/nullable|null-safe|non-null/g);
      const realNulls =
        (nullMatches?.length ?? 0) - (allowedNullContexts?.length ?? 0);
      expect(realNulls).toBeLessThanOrEqual(0);
    });

    it("contains style identity reference", () => {
      expect(result.prompt).toContain("STYLEKIT_STYLE_REFERENCE");
    });

    it("contains section plan heading", () => {
      expect(result.prompt).toMatch(/Section Plan/i);
    });

    it("contains implementation requirements", () => {
      expect(result.prompt).toMatch(/Implementation Requirements/i);
    });

    it("contains the audience in the brief", () => {
      expect(result.prompt).toContain("Designers");
    });
  });

  describe("Chinese locale", () => {
    const result = buildAgentCodePrompt({
      locale: "zh",
      planner: {
        ...basePlanner,
        normalizedQuery: "简约设计师作品集",
        productType: "作品集",
        audience: "设计师和创意工作者",
        visualTone: "简约、干净",
      },
      smartRecommendation: mockSmartRecommendation as unknown as SmartRecommendation,
      projectKnowledge: mockProjectKnowledge as unknown as AgentProjectKnowledgeContext,
      designRecommendation: null,
    });

    it("generates a prompt within 500-10000 characters", () => {
      expect(result.prompt.length).toBeGreaterThanOrEqual(500);
      expect(result.prompt.length).toBeLessThanOrEqual(10000);
    });

    it("contains Chinese section headings", () => {
      expect(result.prompt).toMatch(/页面结构|任务概述|功能与内容要求/);
    });

    it("does not contain 'undefined'", () => {
      expect(result.prompt).not.toContain("undefined");
    });

    it("contains the style identity", () => {
      expect(result.prompt).toContain("STYLEKIT_STYLE_REFERENCE");
    });
  });

  describe("with design recommendation", () => {
    const designRec = {
      productType: "portfolio",
      colors: {
        primary: "#1a1a1a",
        secondary: "#f5f5f5",
        accent: "#3b82f6",
        background: "#ffffff",
      },
      typography: {
        heading: "Inter",
        body: "system-ui",
        scale: "1.25",
      },
      landingPattern: null,
      uxGuidelines: [
        {
          title: "Visual Hierarchy",
          content: "Use size and weight to guide the eye",
        },
      ],
    };

    const result = buildAgentCodePrompt({
      locale: "en",
      planner: basePlanner,
      smartRecommendation: mockSmartRecommendation as unknown as SmartRecommendation,
      projectKnowledge: mockProjectKnowledge as unknown as AgentProjectKnowledgeContext,
      designRecommendation: designRec as any,
    });

    it("includes design recommendations section", () => {
      expect(result.prompt).toMatch(/Design Recommendations/i);
    });

    it("still has valid prompt length", () => {
      expect(result.prompt.length).toBeGreaterThanOrEqual(500);
    });
  });
});
