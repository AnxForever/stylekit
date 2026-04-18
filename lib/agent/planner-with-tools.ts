import type { Locale } from "@/lib/i18n/translations";
import {
  requestAgentWithTools,
  type AgentConversationMessage,
  type AgentToolTurnResult,
} from "./provider";
import { executeToolCall, parseToolArguments, type ToolExecutionTrace } from "./tools/executor";
import { toolRegistry } from "./tools";
import { finalizePlannerTool } from "./tools/finalize-planner";
import type { OnUsageCallback } from "./observability";
import type {
  AgentMessage,
  AgentPageContext,
  AgentPlannerResult,
  AgentConsultPhase,
} from "./types";
import type { AtomOverrides } from "./atom-overrides";
import { isEmptyOverrides } from "./atom-overrides";

/* ======================================================================
 * Phase A planner — replaces the old JSON-schema planner with a
 * tool-calling agent loop.
 *
 * Flow:
 *   1. Build messages (system + conversation + latest user + confirmedSlots)
 *   2. Loop up to MAX_ITER times:
 *        - Call requestAgentWithTools with [...searchTools, finalizePlannerTool]
 *        - If model calls finalize_planner_result → extract args, return
 *        - If model calls any search_* tool → execute, feed result back
 *        - If model returns end_turn without finalizing → force a retry
 *   3. If loop exhausts → throw (caller may fallback)
 * ==================================================================== */

const MAX_ITER = 5;

export interface PlannerToolLoopResult {
  planner: AgentPlannerResult;
  toolTraces: ToolExecutionTrace[];
  iterations: number;
  systemPrompt: string;
  userPrompt: string;
}

/* -------------------- Helpers -------------------- */

function detectPhase(messages: AgentMessage[]): AgentConsultPhase {
  const last = [...messages].reverse().find((m) => m.role === "assistant" && m.planner);
  return last?.planner?.phase ?? "goal";
}

function extractConfirmedSlots(messages: AgentMessage[]) {
  let productType = "";
  let audience = "";
  let visualTone = "";
  let styleSlug = "";
  let layoutHint = "";
  let motionHint = "";
  let colorHint = "";
  let typographyHint = "";
  let atomOverrides: AtomOverrides | undefined = undefined;
  for (const msg of messages) {
    if (msg.role === "assistant" && msg.planner) {
      if (msg.planner.productType) productType = msg.planner.productType;
      if (msg.planner.audience) audience = msg.planner.audience;
      if (msg.planner.visualTone) visualTone = msg.planner.visualTone;
      if (msg.planner.styleSlug) styleSlug = msg.planner.styleSlug;
      if (msg.planner.layoutHint) layoutHint = msg.planner.layoutHint;
      if (msg.planner.motionHint) motionHint = msg.planner.motionHint;
      if (msg.planner.colorHint) colorHint = msg.planner.colorHint;
      if (msg.planner.typographyHint) typographyHint = msg.planner.typographyHint;
      if (!isEmptyOverrides(msg.planner.atomOverrides)) {
        atomOverrides = msg.planner.atomOverrides;
      }
    }
  }
  return { productType, audience, visualTone, styleSlug, layoutHint, motionHint, colorHint, typographyHint, atomOverrides };
}

function formatConversation(messages: AgentMessage[], locale: Locale): string {
  return messages
    .slice(-12)
    .map((m) => {
      const role = m.role === "user" ? (locale === "zh" ? "用户" : "User") : locale === "zh" ? "助手" : "Assistant";
      return `${role}: ${m.content}`;
    })
    .join("\n");
}

/* -------------------- Prompt builders -------------------- */

function buildSystemPrompt(locale: Locale): string {
  if (locale === "zh") {
    return [
      "你是 StyleKit 的网页策划顾问。面向不懂设计的小白用户，通过多阶段引导收集多维度需求。",
      "",
      "## 阶段流转",
      "goal → audience → feel → feel-layout → confirm → (可选 refine | revise) → done",
      "",
      "## 每轮工作流",
      "1. 读 latest user message、confirmedSlots、previousPhase",
      "2. 如有需要，调用 search_* / get_* 工具（feel 阶段建议调 search_styles）",
      "3. 【必做】最后调用 finalize_planner_result 提交本轮结果",
      "",
      "## 阶段规则",
      "- goal：问要做什么网站，提供 6 个网站类型选项，填入 productType",
      "- audience：问给谁看，提供 5 个受众选项，填入 audience",
      "- feel：先调 search_styles，基于结果生成 3-4 个通俗视觉方向选项。用户选后填入 visualTone 和 styleSlug，并进入 feel-layout",
      "- feel-layout：基于已选 styleSlug 与 productType，动态生成 3-4 个『布局方向』选项（例如：Z 型 hero、分栏 Grid、单列长篇、瀑布流等），每个选项描述该布局的视觉效果与适用场景。用户选后填入 layoutHint，进入 confirm",
      "- confirm：所有核心槽位齐全时进入。followUpQuestion 给出需求摘要；suggestedOptions 三项：'确认，开始生成' / '再细调动效配色字体' / '我想改核心需求'",
      "- refine：用户选『细调』时进入。一次性给出 2-3 组 chip 选择：动效方向（3-4 项，填 motionHint）、配色倾向（3-4 项，填 colorHint）、字体方向（3-4 项，填 typographyHint）。用户可跳过任意维度。收集完回到 confirm 或直接 done",
      "- revise：用户选『改核心需求』时进入。列出可改字段：网站类型/受众/视觉方向/布局/全部重来",
      "- done：用户确认后进入。ready=true，styleSlug 保留不变，已填 hint 字段保留，followUpQuestion 留空",
      "",
      "## 硬性规则",
      "- 禁止使用 emoji",
      "- 每轮只问 1 个维度的问题",
      "- suggestedOptions 2-6 个",
      "- confirmedSlots 有值时沿用，不要覆盖（除非用户明确改）",
      "- hint 字段（layoutHint/motionHint/colorHint/typographyHint）一经用户选定，后续阶段必须在 finalize 时原样回传",
      "- confirmedSlots.atomOverrides 一经出现就属于用户的 Blend UI 选择——后续每一轮 finalize 必须把同样的 atomOverrides 原样回传，不要自己新增、修改或删除任何维度",
      "- done 阶段必须保留 styleSlug 和所有已填 hint",
      "- 每个选项的 description 要用大白话说明视觉效果，不是术语堆砌",
    ].join("\n");
  }
  return [
    "You are StyleKit's website planning consultant. Guide non-designer users through a multi-phase consultation to build a multi-dimensional brief.",
    "",
    "## Phase Flow",
    "goal → audience → feel → feel-layout → confirm → (optional refine | revise) → done",
    "",
    "## Per-turn Workflow",
    "1. Read latest user message, confirmedSlots, previousPhase",
    "2. Call search_* / get_* tools if helpful (recommended: search_styles in feel phase)",
    "3. [MANDATORY] End the turn by calling finalize_planner_result exactly once",
    "",
    "## Phase Rules",
    "- goal: ask site type with 6 options, fill productType",
    "- audience: ask target audience with 5 options, fill audience",
    "- feel: FIRST call search_styles, then produce 3-4 plain-language visual direction options. Fill visualTone and styleSlug, then advance to feel-layout",
    "- feel-layout: based on chosen styleSlug + productType, DYNAMICALLY generate 3-4 layout direction options (e.g. 'Z-pattern hero', 'split grid', 'single-column editorial', 'bento masonry'). Each option's description explains the visual effect and use case. Fill layoutHint, then advance to confirm",
    "- confirm: enter when core slots are filled. followUpQuestion = brief summary. Three options: 'Looks good, generate' / 'Refine motion/color/type' / 'Change core requirements'",
    "- refine: enter when user picks 'Refine'. Provide 2-3 chip groups in a single turn: motion direction (3-4 options, fills motionHint), color preference (3-4 options, fills colorHint), typography direction (3-4 options, fills typographyHint). User may skip any dimension. After refine, go back to confirm or straight to done",
    "- revise: enter when user picks 'Change core'. List changeable fields: site type / audience / visual / layout / start over",
    "- done: enter after user confirms. ready=true, keep styleSlug unchanged, preserve all filled hints, empty followUpQuestion",
    "",
    "## Hard Rules",
    "- Never use emoji",
    "- Only ONE dimension per turn",
    "- 2-6 suggestedOptions",
    "- Preserve confirmedSlots unless user explicitly changes them",
    "- Hint fields (layoutHint/motionHint/colorHint/typographyHint) once chosen MUST be echoed back in every subsequent finalize call",
    "- confirmedSlots.atomOverrides, once present, reflects the user's Blend UI selections — in every subsequent finalize you MUST echo the same atomOverrides object verbatim; do not add, modify, or drop dimensions yourself",
    "- In done phase, styleSlug AND all filled hints must be retained",
    "- Each option's description must explain the visual effect in plain language, not jargon dumps",
  ].join("\n");
}

function buildUserPrompt(args: {
  locale: Locale;
  messages: AgentMessage[];
  pageContext?: AgentPageContext;
  incomingAtomOverrides?: AtomOverrides;
}): string {
  const { locale, messages, pageContext, incomingAtomOverrides } = args;
  const previousPhase = detectPhase(messages);
  const confirmedSlots = extractConfirmedSlots(messages);
  /* Freshly arrived UI overrides win over history; empty payload leaves history untouched. */
  if (!isEmptyOverrides(incomingAtomOverrides)) {
    confirmedSlots.atomOverrides = incomingAtomOverrides;
  }
  const latestUserMsg = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  return JSON.stringify(
    {
      locale,
      previousPhase,
      confirmedSlots,
      latestUserMessage: latestUserMsg,
      pageContext: pageContext ?? {},
      conversation: formatConversation(messages, locale),
    },
    null,
    2
  );
}

/* -------------------- Main loop -------------------- */

export class PlannerToolLoopError extends Error {
  constructor(message: string, public readonly iterations: number, public readonly traces: ToolExecutionTrace[]) {
    super(message);
    this.name = "PlannerToolLoopError";
  }
}

export async function runPlannerWithTools(args: {
  locale: Locale;
  messages: AgentMessage[];
  pageContext?: AgentPageContext;
  onUsage?: OnUsageCallback;
  atomOverrides?: AtomOverrides;
}): Promise<PlannerToolLoopResult> {
  const systemPrompt = buildSystemPrompt(args.locale);
  const userPrompt = buildUserPrompt({
    locale: args.locale,
    messages: args.messages,
    pageContext: args.pageContext,
    incomingAtomOverrides: args.atomOverrides,
  });

  const allTools = [...Array.from(toolRegistry.values()), finalizePlannerTool];

  const conversation: AgentConversationMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];

  const traces: ToolExecutionTrace[] = [];
  let nudgeRetriesUsed = 0;
  const MAX_NUDGE_RETRIES = 1;

  for (let iteration = 0; iteration < MAX_ITER; iteration++) {
    const turn: AgentToolTurnResult = await requestAgentWithTools({
      messages: conversation,
      tools: allTools,
      temperature: 0.2,
      onUsage: args.onUsage
        ? (event) => args.onUsage!({ ...event, purpose: "planner" })
        : undefined,
    });

    /* Always echo the assistant message back to keep API conversation state valid */
    conversation.push(turn.rawAssistantMessage);

    /* Case A: model ended turn without any tool calls.
     * Give one nudge-retry (append a user hint) before giving up. */
    if (turn.stopReason === "end_turn" && turn.toolCalls.length === 0) {
      if (nudgeRetriesUsed < MAX_NUDGE_RETRIES) {
        nudgeRetriesUsed++;
        traces.push({
          tool: "nudgeRetry",
          ok: true,
          meta: { reason: "end_turn_without_finalize", attempt: nudgeRetriesUsed },
        });
        conversation.push({
          role: "user",
          content:
            "You ended the turn without calling finalize_planner_result. You MUST call finalize_planner_result now to submit the structured result for this turn. Do not return free-form text.",
        });
        continue;
      }
      throw new PlannerToolLoopError(
        "Model returned end_turn without calling finalize_planner_result (after nudge retry).",
        iteration + 1,
        traces
      );
    }

    /* Case B: one or more tool calls — check for finalize first */
    const finalizeCall = turn.toolCalls.find((call) => call.name === finalizePlannerTool.name);
    if (finalizeCall) {
      /* Extract and validate finalize args without executing the tool (its body is a no-op).
       * Uses double-decode-tolerant parser to handle proxies that over-stringify args. */
      let parsed: unknown;
      try {
        parsed = parseToolArguments(finalizeCall.argumentsJson);
      } catch (error) {
        throw new PlannerToolLoopError(
          `finalize_planner_result arguments are not valid JSON: ${
            error instanceof Error ? error.message : String(error)
          }`,
          iteration + 1,
          traces
        );
      }
      const validated = finalizePlannerTool.parameters.safeParse(parsed);
      if (!validated.success) {
        throw new PlannerToolLoopError(
          `finalize_planner_result schema error: ${validated.error.issues[0]?.message ?? "unknown"}`,
          iteration + 1,
          traces
        );
      }
      traces.push({ tool: finalizePlannerTool.name, ok: true, meta: { iterations: iteration + 1 } });

      const planner: AgentPlannerResult = {
        ready: validated.data.ready,
        phase: validated.data.phase,
        normalizedQuery: validated.data.normalizedQuery,
        productType: validated.data.productType,
        audience: validated.data.audience,
        visualTone: validated.data.visualTone,
        styleSlug: validated.data.styleSlug,
        mustHave: validated.data.mustHave,
        constraints: validated.data.constraints,
        followUpQuestion: validated.data.followUpQuestion,
        suggestedOptions: validated.data.suggestedOptions,
        reasoning: validated.data.reasoning,
        context: validated.data.context,
        layoutHint: validated.data.layoutHint || undefined,
        motionHint: validated.data.motionHint || undefined,
        colorHint: validated.data.colorHint || undefined,
        typographyHint: validated.data.typographyHint || undefined,
        atomOverrides: !isEmptyOverrides(validated.data.atomOverrides)
          ? (validated.data.atomOverrides as AtomOverrides)
          : undefined,
      };

      return {
        planner,
        toolTraces: traces,
        iterations: iteration + 1,
        systemPrompt,
        userPrompt,
      };
    }

    /* Case C: intermediate tool calls (search_* / get_*) — execute, append results */
    for (const call of turn.toolCalls) {
      const { result, trace } = await executeToolCall(call, toolRegistry);
      traces.push(trace);
      conversation.push({
        role: "tool",
        tool_call_id: call.id,
        content: JSON.stringify(result.ok ? result.data : { error: result.error }),
      });
    }
  }

  throw new PlannerToolLoopError(
    `Planner tool loop exhausted after ${MAX_ITER} iterations without finalize call.`,
    MAX_ITER,
    traces
  );
}
