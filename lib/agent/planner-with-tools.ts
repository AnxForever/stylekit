import type { Locale } from "@/lib/i18n/translations";
import {
  requestAgentWithTools,
  type AgentConversationMessage,
  type AgentToolTurnResult,
} from "./provider";
import { executeToolCall, type ToolExecutionTrace } from "./tools/executor";
import { toolRegistry } from "./tools";
import { finalizePlannerTool } from "./tools/finalize-planner";
import type { OnUsageCallback } from "./observability";
import type {
  AgentMessage,
  AgentPageContext,
  AgentPlannerResult,
  AgentConsultPhase,
} from "./types";

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
  for (const msg of messages) {
    if (msg.role === "assistant" && msg.planner) {
      if (msg.planner.productType) productType = msg.planner.productType;
      if (msg.planner.audience) audience = msg.planner.audience;
      if (msg.planner.visualTone) visualTone = msg.planner.visualTone;
      if (msg.planner.styleSlug) styleSlug = msg.planner.styleSlug;
    }
  }
  return { productType, audience, visualTone, styleSlug };
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
      "你是 StyleKit 的网页策划顾问。面向不懂设计的小白用户，通过 6 阶段引导收集需求。",
      "",
      "## 阶段流转",
      "goal → audience → feel → confirm → revise（可选）→ done",
      "",
      "## 每轮工作流",
      "1. 读 latest user message、confirmedSlots、previousPhase",
      "2. 如有需要，调用 search_* / get_* 工具检索知识（feel 阶段推荐调 search_styles，done 阶段推荐调 get_design_guidelines）",
      "3. 【必做】最后调用 finalize_planner_result 提交本轮结果。不调用它这一轮就白跑",
      "",
      "## 阶段规则",
      "- goal：问要做什么网站，提供 6 个网站类型选项，填入 productType",
      "- audience：问给谁看，提供 5 个受众选项，填入 audience",
      "- feel：先调 search_styles 获取推荐风格，基于结果生成 3-4 个通俗视觉方向选项。用户选后填入 visualTone 和 styleSlug",
      "- confirm：productType/audience/visualTone 齐全时进入。followUpQuestion 给出需求摘要，suggestedOptions 两项：'确认，开始生成' / '我想改一下'",
      "- revise：用户想改时进入。列出可改字段：网站类型/受众/视觉方向/全部重来",
      "- done：用户确认后进入。ready=true，styleSlug 保留不变，followUpQuestion 留空",
      "",
      "## 硬性规则",
      "- 禁止使用 emoji",
      "- 每轮只问 1 个问题",
      "- suggestedOptions 2-6 个",
      "- confirmedSlots 有值时，沿用不要覆盖（除非用户明确要改）",
      "- done 阶段必须保留 styleSlug",
    ].join("\n");
  }
  return [
    "You are StyleKit's website planning consultant. Guide non-designer users through a 6-phase consultation to build their brief.",
    "",
    "## Phase Flow",
    "goal → audience → feel → confirm → revise (optional) → done",
    "",
    "## Per-turn Workflow",
    "1. Read latest user message, confirmedSlots, previousPhase",
    "2. If helpful, call search_* / get_* tools (recommended: search_styles in feel phase, get_design_guidelines in done phase)",
    "3. [MANDATORY] End the turn by calling finalize_planner_result exactly once",
    "",
    "## Phase Rules",
    "- goal: ask site type with 6 options, fill productType",
    "- audience: ask target audience with 5 options, fill audience",
    "- feel: FIRST call search_styles, then produce 3-4 plain-language visual direction options. Fill visualTone and styleSlug",
    "- confirm: enter when productType/audience/visualTone all filled. followUpQuestion = brief summary. Two options: 'Looks good, generate' / 'I want to change something'",
    "- revise: enter when user wants changes. List changeable fields: site type / audience / visual / start over",
    "- done: enter after user confirms. ready=true, keep styleSlug unchanged, empty followUpQuestion",
    "",
    "## Hard Rules",
    "- Never use emoji",
    "- Only ONE question per turn",
    "- 2-6 suggestedOptions",
    "- Preserve confirmedSlots unless user explicitly changes them",
    "- In done phase, styleSlug must be retained",
  ].join("\n");
}

function buildUserPrompt(args: {
  locale: Locale;
  messages: AgentMessage[];
  pageContext?: AgentPageContext;
}): string {
  const { locale, messages, pageContext } = args;
  const previousPhase = detectPhase(messages);
  const confirmedSlots = extractConfirmedSlots(messages);
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
}): Promise<PlannerToolLoopResult> {
  const systemPrompt = buildSystemPrompt(args.locale);
  const userPrompt = buildUserPrompt(args);

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
      /* Extract and validate finalize args without executing the tool (its body is a no-op). */
      let parsed: unknown;
      try {
        parsed = JSON.parse(finalizeCall.argumentsJson || "{}");
      } catch {
        throw new PlannerToolLoopError(
          `finalize_planner_result arguments are not valid JSON: ${finalizeCall.argumentsJson.slice(0, 120)}`,
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
