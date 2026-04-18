import { z } from "zod";
import type { AgentTool } from "./types";

/**
 * The "Finalize Tool" pattern.
 *
 * Instead of asking the LLM to output a structured JSON in its content after
 * exploring with other tools, we define a special tool that the LLM must call
 * to "submit" the final planner result. This gives us:
 *   1. Zod-validated output shape
 *   2. Stable LLM behavior (writing tool args > writing free-form JSON)
 *   3. A clean termination signal for the tool loop
 *
 * Source: Anthropic's "Tool use best practices" (2024-2025).
 */

const planCardParamsSchema = z.object({
  ready: z
    .boolean()
    .describe("True only when phase='done' and all required slots are filled."),
  phase: z
    .enum(["goal", "audience", "feel", "feel-layout", "confirm", "revise", "refine", "done"])
    .describe("Current consultation phase to advance to."),
  normalizedQuery: z
    .string()
    .default("")
    .describe("Normalized short description of the user's intent (<=200 chars)."),
  productType: z.string().default("").describe("Site/product type, filled in goal phase."),
  audience: z.string().default("").describe("Target audience, filled in audience phase."),
  visualTone: z.string().default("").describe("Visual feel, filled in feel phase."),
  styleSlug: z
    .string()
    .default("")
    .describe("Exact StyleKit style slug. Required after user confirms a style in feel phase."),
  mustHave: z
    .array(z.string())
    .default([])
    .describe("Auto-inferred must-have page elements."),
  constraints: z
    .array(z.string())
    .default([])
    .describe("Auto-inferred hard constraints (mobile-first, a11y, perf, etc.)."),
  followUpQuestion: z
    .string()
    .default("")
    .describe("Natural-language question to ask the user. Empty when phase='done'."),
  suggestedOptions: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
        description: z.string().default(""),
      })
    )
    .default([])
    .describe("2-6 quick-pick options for the user. Empty when phase='done' or 'revise'."),
  reasoning: z
    .array(z.string())
    .default([])
    .describe("Short bullet points explaining key decisions made this turn."),
  context: z
    .object({
      targetAudience: z.enum(["consumer", "enterprise", "developer", "creative"]).optional(),
      brandMood: z.enum(["playful", "professional", "luxury", "minimal", "bold"]).optional(),
      primaryDevice: z.enum(["desktop", "mobile", "tablet", "all"]).optional(),
      accessibilityPriority: z.boolean().optional(),
      performancePriority: z.boolean().optional(),
    })
    .default({})
    .describe("Structured context for downstream tools like getDesignRecommendation."),
  /* Phase 2 multi-dimensional hints — optional, filled progressively. */
  layoutHint: z
    .string()
    .default("")
    .describe("Layout direction chosen in feel-layout phase (e.g. 'Z-pattern hero', 'split grid', 'editorial long-form'). Empty until user picks."),
  motionHint: z
    .string()
    .default("")
    .describe("Motion direction chosen in refine phase (e.g. 'subtle fades', 'playful spring', 'zero motion'). Empty when skipped."),
  colorHint: z
    .string()
    .default("")
    .describe("Color preference chosen in refine phase (e.g. 'warm sunset', 'cool mono', 'high-contrast neon'). Empty when skipped."),
  typographyHint: z
    .string()
    .default("")
    .describe("Typography direction chosen in refine phase (e.g. 'editorial serif', 'tight geometric sans'). Empty when skipped."),
  /* Phase 3.x: per-dimension atom source overrides for cross-style blending.
   * Each value is a source style slug. Absent keys fall through to base. */
  atomOverrides: z
    .object({
      philosophy: z.string().optional(),
      layout: z.string().optional(),
      motion: z.string().optional(),
      color: z.string().optional(),
      typography: z.string().optional(),
    })
    .partial()
    .optional()
    .describe(
      "Per-dimension atom source overrides from the Blend UI. Keys: philosophy/layout/motion/color/typography; values: source style slug. Echo the confirmedSlots.atomOverrides value as-is when present; do not invent or modify entries yourself."
    ),
});

export const finalizePlannerTool: AgentTool<typeof planCardParamsSchema> = {
  name: "finalize_planner_result",
  description:
    "Submit the final structured planner result for this turn. Call this tool exactly once AFTER you have gathered enough information from any search_* or get_* tools. The planner result determines which phase to advance to and what to ask the user next. This is a terminal tool — call it to end this turn.",
  parameters: planCardParamsSchema,
  execute: async (args) => {
    /* The orchestrator intercepts this call BEFORE executor runs it — this
     * body should never actually execute. Returning the args as data makes
     * it defensive in case of misuse. */
    return { finalized: true, result: args };
  },
};

export type PlannerFinalizeArgs = z.infer<typeof planCardParamsSchema>;
