import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { AgentPlannerResult } from "../types";
import type { SmartRecommendation } from "@/lib/knowledge/smart-recommender";
import type { AgentProjectKnowledgeContext } from "../project-knowledge";

vi.mock("../provider", async () => {
  const actual = await vi.importActual<typeof import("../provider")>("../provider");
  return {
    ...actual,
    isAgentModelConfigured: vi.fn(() => true),
    requestAgentJson: vi.fn(),
  };
});

import { composeAgentCodePrompt } from "../prompt-composer";
import { requestAgentJson, isAgentModelConfigured } from "../provider";

const planner: AgentPlannerResult = {
  ready: true,
  phase: "done",
  normalizedQuery: "minimalist portfolio",
  productType: "Portfolio",
  audience: "Designers",
  visualTone: "Minimalist",
  styleSlug: "",
  mustHave: ["Gallery"],
  constraints: [],
  followUpQuestion: "",
  suggestedOptions: [],
  reasoning: [],
  context: { targetAudience: "creative", primaryDevice: "desktop", brandMood: "minimal" },
};

const smartRecommendation = {
  style: {
    item: { slug: "minimalist-flat", name: "Minimalist Flat", philosophy: "Less is more" },
    score: 85,
    reasons: [],
    alternatives: [],
  },
  colors: { item: { name: "Mono", primary: "#000", secondary: "#fff", accent: "#3b82f6", background: "#fff", text: "#000" }, score: 80, reasons: [], alternatives: [] },
  typography: { item: { name: "Inter", heading: "Inter", body: "system-ui", mono: "mono" }, score: 78, reasons: [], alternatives: [] },
  landingPattern: null,
  styleScores: [{ slug: "minimalist-flat", score: 85, reasons: [] }],
  compatibility: { styleColorScore: 90, styleTypographyScore: 85, overallHarmony: 87 },
  contextAdjustments: [],
  summary: { confidence: 85, headline: "", keyDecisions: [] },
} as unknown as SmartRecommendation;

const projectKnowledge: AgentProjectKnowledgeContext = {
  items: [],
  counts: { promptTopic: 0, stylePrompt: 0, recipe: 0, templateExample: 0, componentPattern: 0, webGuideline: 0, reactGuideline: 0 },
};

describe("composeAgentCodePrompt", () => {
  beforeEach(() => {
    vi.mocked(requestAgentJson).mockReset();
    vi.mocked(isAgentModelConfigured).mockReturnValue(true);
    delete process.env.AGENT_USE_COMPOSITION;
  });

  afterEach(() => {
    delete process.env.AGENT_USE_COMPOSITION;
  });

  it("returns the LLM-composed prompt when composition is enabled", async () => {
    vi.mocked(requestAgentJson).mockResolvedValueOnce({
      title: "Portfolio - Minimalist Flat",
      prompt: "A long freshly-composed prompt describing the minimalist portfolio in new language ".repeat(3),
    } as never);

    const result = await composeAgentCodePrompt({
      locale: "en",
      planner,
      smartRecommendation,
      projectKnowledge,
    });

    expect(requestAgentJson).toHaveBeenCalledOnce();
    expect(result.prompt).toContain("freshly-composed");
    expect(result.styleSlug).toBe("minimalist-flat");
  });

  it("falls back to deterministic template when AGENT_USE_COMPOSITION=false", async () => {
    process.env.AGENT_USE_COMPOSITION = "false";

    const result = await composeAgentCodePrompt({
      locale: "en",
      planner,
      smartRecommendation,
      projectKnowledge,
    });

    expect(requestAgentJson).not.toHaveBeenCalled();
    expect(result.prompt.length).toBeGreaterThan(0);
    expect(result.styleSlug).toBe("minimalist-flat");
  });

  it("falls back when the LLM call throws", async () => {
    vi.mocked(requestAgentJson).mockRejectedValueOnce(new Error("boom"));

    const result = await composeAgentCodePrompt({
      locale: "en",
      planner,
      smartRecommendation,
      projectKnowledge,
    });

    expect(result.prompt.length).toBeGreaterThan(0);
    expect(result.styleSlug).toBe("minimalist-flat");
  });

  it("passes multi-dimensional hints into the composer user payload", async () => {
    vi.mocked(requestAgentJson).mockResolvedValueOnce({
      title: "ok",
      prompt: "composed output with hints woven in — plenty of length to pass schema validation for sure.",
    } as never);

    await composeAgentCodePrompt({
      locale: "en",
      planner: {
        ...planner,
        layoutHint: "split-grid editorial",
        motionHint: "subtle fade only",
        colorHint: "warm sunset",
        typographyHint: "editorial serif",
      },
      smartRecommendation,
      projectKnowledge,
    });

    const callArgs = vi.mocked(requestAgentJson).mock.calls[0]?.[0];
    expect(callArgs).toBeDefined();
    const userPayload = (callArgs as { user: string }).user;
    expect(userPayload).toContain("split-grid editorial");
    expect(userPayload).toContain("subtle fade only");
    expect(userPayload).toContain("warm sunset");
    expect(userPayload).toContain("editorial serif");
    expect(userPayload).toContain("Multi-dimensional preferences");
  });

  it("injects Style atoms section for styles that carry complete atoms", async () => {
    vi.mocked(requestAgentJson).mockResolvedValueOnce({
      title: "ok",
      prompt: "composed output referencing atoms — plenty of length to pass schema validation for sure.",
    } as never);

    const neoRecommendation = {
      ...smartRecommendation,
      style: {
        ...smartRecommendation.style,
        item: { slug: "neo-brutalist", name: "Neo-Brutalist", philosophy: "Raw function" },
      },
    } as unknown as SmartRecommendation;

    await composeAgentCodePrompt({
      locale: "en",
      planner,
      smartRecommendation: neoRecommendation,
      projectKnowledge,
    });

    const callArgs = vi.mocked(requestAgentJson).mock.calls[0]?.[0];
    expect(callArgs).toBeDefined();
    const payload = (callArgs as { user: string; system: string });
    expect(payload.user).toContain("Style atoms (highest priority)");
    expect(payload.user).toMatch(/- Philosophy: /);
    expect(payload.user).toMatch(/- Layout: /);
    expect(payload.user).toMatch(/- Motion: /);
    expect(payload.user).toMatch(/- Color: /);
    expect(payload.user).toMatch(/- Typography: /);
    expect(payload.system).toContain("Style atoms");
  });

  it("omits Style atoms section for styles that have no atoms", async () => {
    vi.mocked(requestAgentJson).mockResolvedValueOnce({
      title: "ok",
      prompt: "composed output without atoms — plenty of length to pass schema validation for sure.",
    } as never);

    await composeAgentCodePrompt({
      locale: "en",
      planner,
      smartRecommendation,
      projectKnowledge,
    });

    const callArgs = vi.mocked(requestAgentJson).mock.calls[0]?.[0];
    const payload = (callArgs as { user: string });
    expect(payload.user).not.toContain("Style atoms (highest priority)");
  });
});
