import { z } from "zod";
import type { Locale } from "@/lib/i18n/translations";
import { getStyleBySlug } from "@/lib/styles";
import { requestAgentJson, AgentProviderError } from "./provider";
import {
  runPlannerWithTools,
  PlannerToolLoopError,
  type PlannerToolLoopResult,
} from "./planner-with-tools";
import type { OnUsageCallback } from "./observability";
import type {
  AgentMessage,
  AgentPageContext,
  AgentPlannerResult,
  AgentToolTrace,
} from "./types";

/* =======================================================================
 * L5 Reflection Layer
 *
 * Design philosophy:
 *   1. Cheap first: heuristic `detectSuspiciousPlanner` short-circuits so
 *      ~80% of planner outputs skip reflection entirely.
 *   2. One-shot: if reflection says the planner output is bad, we retry the
 *      tool-calling loop ONCE with feedback — no infinite loops.
 *   3. Fail-safe: reflection errors (LLM unavailable, schema mismatch) must
 *      never block the turn; the original planner output wins by default.
 * ===================================================================== */

/** What the reflector LLM returns, validated via Zod. */
export interface ReflectionCheckResult {
  ok: boolean;
  severity: "none" | "low" | "medium" | "high";
  issues: string[];
  suggestedFix: string;
}

const reflectionSchema = z.object({
  ok: z.boolean(),
  severity: z.enum(["none", "low", "medium", "high"]).default("none"),
  issues: z.array(z.string().trim()).default([]),
  suggestedFix: z.string().trim().default(""),
});

/* ---------- Heuristic pre-filter (cheap) ---------- */

/**
 * Returns a short reason code if the planner output is suspicious enough to
 * warrant a reflection pass, or null to skip reflection.
 *
 * Keep rules tight: false positives cost real API calls.
 */
export function detectSuspiciousPlanner(
  planner: AgentPlannerResult
): string | null {
  if (planner.phase === "done" && !planner.ready) {
    return "done_phase_but_not_ready";
  }
  if (planner.phase === "feel" && !planner.styleSlug) {
    return "feel_phase_missing_styleSlug";
  }
  if (planner.styleSlug && !getStyleBySlug(planner.styleSlug)) {
    return "unknown_styleSlug";
  }
  if (
    !planner.ready &&
    planner.suggestedOptions.length > 0 &&
    planner.suggestedOptions.length < 2
  ) {
    return "too_few_suggested_options";
  }
  if (planner.suggestedOptions.length > 6) {
    return "too_many_suggested_options";
  }
  if (
    planner.phase !== "done" &&
    planner.phase !== "revise" &&
    planner.followUpQuestion.trim() === ""
  ) {
    return "empty_followup_question";
  }
  return null;
}

/* ---------- Reflection LLM call ---------- */

function buildReflectionPrompt(args: {
  planner: AgentPlannerResult;
  detectedReason: string;
  locale: Locale;
}): { system: string; user: string } {
  const { planner, detectedReason, locale } = args;
  const localeRule =
    locale === "zh"
      ? "请用简体中文回答 issues 和 suggestedFix。"
      : "Respond in English for issues and suggestedFix.";

  const system = [
    "You are a quality reviewer for StyleKit's website planning agent.",
    "Your job: given a planner result, judge whether it is coherent and well-grounded.",
    "",
    "Strict rules:",
    "- If the result is fine, return ok=true with severity='none' and empty issues.",
    "- If there are real problems, return ok=false with severity (low/medium/high), a list of specific issues, and one concrete suggestedFix sentence.",
    "- Be sparing: prefer ok=true when reasonable. False alarms waste retries.",
    "- Never invent facts; only reference what's in the planner result.",
    "",
    "Output JSON only (no markdown):",
    '{"ok": boolean, "severity": "none"|"low"|"medium"|"high", "issues": string[], "suggestedFix": string}',
    "",
    localeRule,
  ].join("\n");

  const user = JSON.stringify(
    {
      detectedReason,
      planner: {
        ready: planner.ready,
        phase: planner.phase,
        productType: planner.productType,
        audience: planner.audience,
        visualTone: planner.visualTone,
        styleSlug: planner.styleSlug,
        mustHave: planner.mustHave,
        constraints: planner.constraints,
        followUpQuestion: planner.followUpQuestion,
        suggestedOptionsCount: planner.suggestedOptions.length,
        suggestedOptions: planner.suggestedOptions,
      },
    },
    null,
    2
  );

  return { system, user };
}

/**
 * Run a single reflection pass on a planner result.
 * Returns `{ ok: true, severity: "none", ... }` on any failure so the caller
 * falls back safely to the original planner output.
 */
export async function runReflection(args: {
  planner: AgentPlannerResult;
  detectedReason: string;
  locale: Locale;
  onUsage?: OnUsageCallback;
}): Promise<ReflectionCheckResult> {
  const { system, user } = buildReflectionPrompt(args);
  try {
    const result = await requestAgentJson({
      schema: reflectionSchema,
      system,
      user,
      temperature: 0.1,
      onUsage: args.onUsage
        ? (event) => args.onUsage!({ ...event, purpose: "reflector" })
        : undefined,
    });
    return result;
  } catch (error) {
    /* Fail-safe: any reflector error → treat as "no issues found". */
    if (error instanceof AgentProviderError) {
      console.warn(`[reflector] provider error (${error.code}); skipping reflection`);
    } else {
      console.warn("[reflector] unknown error; skipping reflection", error);
    }
    return { ok: true, severity: "none", issues: [], suggestedFix: "" };
  }
}

/* ---------- Composed wrapper (orchestrator entry point) ---------- */

/**
 * Planner + optional reflection pass + optional one-shot retry.
 * Transparent replacement for `runPlannerWithTools` when AGENT_USE_REFLECTION=true.
 */
export async function runPlannerWithReflection(args: {
  locale: Locale;
  messages: AgentMessage[];
  pageContext?: AgentPageContext;
  onUsage?: OnUsageCallback;
}): Promise<PlannerToolLoopResult> {
  /* First pass */
  const first = await runPlannerWithTools(args);

  const suspiciousReason = detectSuspiciousPlanner(first.planner);
  if (!suspiciousReason) {
    /* 80%+ path: cheap heuristic says fine, skip LLM-based reflection */
    return first;
  }

  /* Heuristic flagged something — run LLM reflection */
  const reflection = await runReflection({
    planner: first.planner,
    detectedReason: suspiciousReason,
    locale: args.locale,
    onUsage: args.onUsage,
  });

  const reflectionTrace: AgentToolTrace = {
    tool: "reflection",
    ok: reflection.ok,
    meta: {
      suspiciousReason,
      severity: reflection.severity,
      issueCount: reflection.issues.length,
    },
  };

  if (reflection.ok) {
    /* Reflector approved after deeper look. Pass through. */
    return {
      ...first,
      toolTraces: [...first.toolTraces, reflectionTrace],
    };
  }

  /* Reflector found real issues — retry once with feedback */
  const feedbackMessage: AgentMessage = {
    id: `reflection-feedback-${Date.now()}`,
    role: "user",
    content: [
      "[INTERNAL_REVIEWER_FEEDBACK]",
      "The previous planner output had these issues:",
      ...reflection.issues.map((issue) => `- ${issue}`),
      "",
      reflection.suggestedFix
        ? `Suggested fix: ${reflection.suggestedFix}`
        : "Please regenerate the planner result addressing these issues.",
    ].join("\n"),
    createdAt: new Date().toISOString(),
    planner: null,
    codePrompt: null,
    toolTrace: [],
    promptSnapshot: null,
    decisionTrace: [],
  };

  try {
    const retry = await runPlannerWithTools({
      locale: args.locale,
      messages: [...args.messages, feedbackMessage],
      pageContext: args.pageContext,
      onUsage: args.onUsage,
    });
    return {
      planner: retry.planner,
      toolTraces: [
        ...first.toolTraces,
        reflectionTrace,
        ...retry.toolTraces,
        {
          tool: "reflection_retry",
          ok: true,
          meta: { originalIssues: reflection.issues.slice(0, 3) },
        },
      ],
      iterations: first.iterations + retry.iterations,
      systemPrompt: retry.systemPrompt,
      userPrompt: retry.userPrompt,
    };
  } catch (error) {
    /* Retry broke: keep first-pass result so the turn still completes */
    if (error instanceof PlannerToolLoopError) {
      console.warn(`[reflector] retry failed (${error.message}); keeping first-pass planner`);
    }
    return {
      ...first,
      toolTraces: [
        ...first.toolTraces,
        reflectionTrace,
        { tool: "reflection_retry", ok: false, meta: { reason: "retry_failed" } },
      ],
    };
  }
}
