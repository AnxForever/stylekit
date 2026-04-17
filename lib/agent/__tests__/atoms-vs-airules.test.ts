/**
 * Phase 3 comparison suite: atoms-equipped styles vs aiRules-only styles.
 *
 * This file is a deterministic, non-LLM contrast test. It captures the
 * arguments passed to `requestAgentJson` by `composeAgentCodePrompt` and
 * asserts structural differences between the two prompt routes:
 *   - neo-brutalist  -> atoms route (highest-priority style source)
 *   - minimalist-flat -> aiRules route (pre-atoms fallback)
 *
 * It also verifies that the composer system prompt carries rule #5 about
 * Style atoms in both locales, and that `hasCompleteAtoms` correctly
 * suppresses the atoms section when any core atom is blank.
 */

import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from "vitest";
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

vi.mock("@/lib/styles", async () => {
  const actual = await vi.importActual<Record<string, unknown>>("@/lib/styles");
  return {
    ...actual,
    getStyleBySlug: vi.fn((slug: string) =>
      (actual.getStyleBySlug as (s: string) => unknown)(slug)
    ),
  };
});

import { composeAgentCodePrompt } from "../prompt-composer";
import { buildAgentCodePrompt } from "../code-prompt";
import { requestAgentJson, isAgentModelConfigured } from "../provider";
import { getStyleBySlug } from "@/lib/styles";

const basePlanner: AgentPlannerResult = {
  ready: true,
  phase: "done",
  normalizedQuery: "portfolio showcase for independent designer",
  productType: "Portfolio",
  audience: "Designers",
  visualTone: "Expressive",
  styleSlug: "",
  mustHave: ["Gallery", "About"],
  constraints: [],
  followUpQuestion: "",
  suggestedOptions: [],
  reasoning: [],
  context: {
    targetAudience: "creative",
    primaryDevice: "desktop",
    brandMood: "bold",
  },
};

const projectKnowledge: AgentProjectKnowledgeContext = {
  items: [],
  counts: {
    promptTopic: 0,
    stylePrompt: 0,
    recipe: 0,
    templateExample: 0,
    componentPattern: 0,
    webGuideline: 0,
    reactGuideline: 0,
  },
};

function makeRecommendation(slug: string, name: string): SmartRecommendation {
  return {
    style: {
      item: { slug, name, philosophy: "p" },
      score: 80,
      reasons: [],
      alternatives: [],
    },
    colors: {
      item: {
        name: "palette",
        primary: "#111",
        secondary: "#eee",
        accent: "#f00",
        background: "#fff",
        text: "#000",
      },
      score: 80,
      reasons: [],
      alternatives: [],
    },
    typography: {
      item: { name: "Inter", heading: "Inter", body: "system-ui", mono: "mono" },
      score: 78,
      reasons: [],
      alternatives: [],
    },
    landingPattern: null,
    styleScores: [{ slug, score: 80, reasons: [] }],
    compatibility: {
      styleColorScore: 80,
      styleTypographyScore: 80,
      overallHarmony: 80,
    },
    contextAdjustments: [],
    summary: { confidence: 80, headline: "", keyDecisions: [] },
  } as unknown as SmartRecommendation;
}

type ComposerCall = { user: string; system: string };

async function captureComposerCall(
  slug: string,
  name: string,
  locale: "en" | "zh" = "en"
): Promise<ComposerCall> {
  vi.mocked(requestAgentJson).mockResolvedValueOnce({
    title: "t",
    prompt: "composed output body, long enough to pass schema validation without any trouble at all.",
  } as never);
  await composeAgentCodePrompt({
    locale,
    planner: basePlanner,
    smartRecommendation: makeRecommendation(slug, name),
    projectKnowledge,
  });
  const args = vi.mocked(requestAgentJson).mock.calls.at(-1)?.[0];
  if (!args) throw new Error("requestAgentJson was not called");
  return args as ComposerCall;
}

let actualGetStyleBySlug: (slug: string) => unknown;

beforeAll(async () => {
  const actual = await vi.importActual<Record<string, unknown>>("@/lib/styles");
  actualGetStyleBySlug = actual.getStyleBySlug as (s: string) => unknown;
});

describe("atoms vs aiRules payload comparison (Phase 3)", () => {
  beforeEach(() => {
    vi.mocked(requestAgentJson).mockReset();
    vi.mocked(isAgentModelConfigured).mockReturnValue(true);
    vi.mocked(getStyleBySlug).mockImplementation(
      (slug: string) => actualGetStyleBySlug(slug) as ReturnType<typeof getStyleBySlug>
    );
    delete process.env.AGENT_USE_COMPOSITION;
  });

  afterEach(() => {
    delete process.env.AGENT_USE_COMPOSITION;
  });

  describe("Group A: payload difference metrics", () => {
    it("neo-brutalist (atoms route) injects the 'Style atoms (highest priority)' section", async () => {
      const args = await captureComposerCall("neo-brutalist", "Neo-Brutalist");
      expect(args.user).toContain("Style atoms (highest priority)");
    });

    it("neo-brutalist payload contains all 5 core atom lines (philosophy/layout/motion/color/typography)", async () => {
      const args = await captureComposerCall("neo-brutalist", "Neo-Brutalist");
      expect(args.user).toMatch(/^- Philosophy: \S/m);
      expect(args.user).toMatch(/^- Layout: \S/m);
      expect(args.user).toMatch(/^- Motion: \S/m);
      expect(args.user).toMatch(/^- Color: \S/m);
      expect(args.user).toMatch(/^- Typography: \S/m);
    });

    it("minimalist-flat (aiRules route) does NOT inject the Style atoms section", async () => {
      const args = await captureComposerCall("minimalist-flat", "Minimalist Flat");
      expect(args.user).not.toContain("Style atoms (highest priority)");
      expect(args.user).not.toMatch(/^- Philosophy: /m);
      expect(args.user).not.toMatch(/^- Typography: /m);
    });

    it("atoms-route user payload length is significantly >= its corresponding base prompt", async () => {
      const recommendation = makeRecommendation("neo-brutalist", "Neo-Brutalist");
      const base = buildAgentCodePrompt({
        locale: "en",
        planner: basePlanner,
        smartRecommendation: recommendation,
        projectKnowledge,
      });
      const args = await captureComposerCall("neo-brutalist", "Neo-Brutalist");

      // Composer user payload wraps the full base prompt verbatim, so its length
      // must exceed the base prompt length by at least the atoms block (header
      // + 5 atom lines + optional forbiddens). 200 chars is a conservative floor.
      expect(args.user).toContain(base.prompt);
      expect(args.user.length).toBeGreaterThan(base.prompt.length);
      expect(args.user.length - base.prompt.length).toBeGreaterThanOrEqual(200);
    });
  });

  describe("Group B: composer system prompt rule #5 (atoms priority)", () => {
    it("English system prompt frames Style atoms as the HIGHEST-PRIORITY style source", async () => {
      const args = await captureComposerCall("minimalist-flat", "Minimalist Flat", "en");
      expect(args.system).toContain("Style atoms");
      expect(args.system).toContain("HIGHEST-PRIORITY");
    });

    it("Chinese system prompt frames 风格原子 as 最高优先级 style source", async () => {
      const args = await captureComposerCall("minimalist-flat", "Minimalist Flat", "zh");
      expect(args.system).toContain("风格原子");
      expect(args.system).toContain("最高优先级");
    });
  });

  describe("Group C: hasCompleteAtoms fallback correctness", () => {
    it("does NOT inject atoms section when any core atom field is blank (partial atoms)", async () => {
      const real = actualGetStyleBySlug("neo-brutalist") as {
        atoms?: { motion: { zh: string; en?: string } };
      } & Record<string, unknown>;
      expect(real).toBeDefined();
      expect(real.atoms).toBeDefined();

      // Simulate a style that carries incomplete atoms (motion.zh blank).
      const partialStyle = {
        ...real,
        atoms: {
          ...real.atoms,
          motion: { zh: "   " },
        },
      } as unknown as ReturnType<typeof getStyleBySlug>;

      vi.mocked(getStyleBySlug).mockImplementation(() => partialStyle);

      const args = await captureComposerCall("neo-brutalist", "Neo-Brutalist");
      expect(args.user).not.toContain("Style atoms (highest priority)");
      // None of the atom bullet lines should leak through.
      expect(args.user).not.toMatch(/^- Philosophy: /m);
      expect(args.user).not.toMatch(/^- Motion: /m);
    });

    it("does NOT inject atoms section when atoms is undefined altogether", async () => {
      const real = actualGetStyleBySlug("neo-brutalist") as Record<string, unknown>;
      const withoutAtoms = { ...real, atoms: undefined } as unknown as ReturnType<
        typeof getStyleBySlug
      >;

      vi.mocked(getStyleBySlug).mockImplementation(() => withoutAtoms);

      const args = await captureComposerCall("neo-brutalist", "Neo-Brutalist");
      expect(args.user).not.toContain("Style atoms (highest priority)");
    });
  });
});
