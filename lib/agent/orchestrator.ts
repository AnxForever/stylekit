import { z } from "zod";
import type { Locale } from "@/lib/i18n/translations";
import {
  getSmartRecommendation,
  searchKnowledge,
  type RecommendationContext,
} from "@/lib/knowledge";
import { AgentProviderError, requestAgentJson } from "./provider";
import { buildAgentCodePrompt } from "./code-prompt";
import { buildAgentProjectKnowledgeContext } from "./project-knowledge";
import { inferTemplateType, getLocalizedTemplateTypeLabel } from "./recommendations";
import { buildWorkflowSnapshot } from "./state-transition";
import { getStyleMetaBySlug } from "@/lib/styles/meta";
import type {
  AgentCodePrompt,
  AgentDecisionTraceItem,
  AgentMessage,
  AgentPageContext,
  AgentPlannerResult,
  AgentPromptSnapshot,
  AgentWorkflowSnapshot,
  AgentToolTrace,
} from "./types";

const plannerSchema = z.object({
  ready: z.boolean(),
  normalizedQuery: z.string().trim().min(1),
  productType: z.string().trim().default(""),
  audience: z.string().trim().default(""),
  visualTone: z.string().trim().default(""),
  mustHave: z.array(z.string().trim()).default([]),
  constraints: z.array(z.string().trim()).default([]),
  followUpQuestion: z.string().trim().default(""),
  reasoning: z.array(z.string().trim()).default([]),
  context: z.object({
    targetAudience: z.enum(["consumer", "enterprise", "developer", "creative"]).optional(),
    ageGroup: z.enum(["young", "adult", "senior", "all"]).optional(),
    techLevel: z.enum(["beginner", "intermediate", "advanced"]).optional(),
    primaryDevice: z.enum(["desktop", "mobile", "tablet", "all"]).optional(),
    screenDensity: z.enum(["low", "high", "retina"]).optional(),
    brandMood: z.enum(["playful", "professional", "luxury", "minimal", "bold"]).optional(),
    industry: z.string().trim().optional(),
    darkModePreferred: z.boolean().optional(),
    accessibilityPriority: z.boolean().optional(),
    performancePriority: z.boolean().optional(),
  }).default({}),
});

const responderSchema = z.object({
  assistantMessage: z.string().trim().min(1),
});

const DEV_AGENT_FALLBACK =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_DEV_MOCK_USER === "true";

function localizeDefaultFollowUp(locale: Locale): string {
  return locale === "zh"
    ? "先告诉我你的网站类型、目标用户，以及你更在意专业感、转化还是视觉冲击。"
    : "Start with the site type, target audience, and whether you care more about professionalism, conversion, or visual impact.";
}

function localize(locale: Locale, zh: string, en: string): string {
  return locale === "zh" ? zh : en;
}

function getLatestUserMessage(messages: AgentMessage[]): string {
  return [...messages].reverse().find((message) => message.role === "user")?.content.trim() ?? "";
}

function getSlotLabel(locale: Locale, slot: string): string {
  const labels: Record<string, { zh: string; en: string }> = {
    productType: { zh: "产品类型", en: "Product Type" },
    audience: { zh: "目标用户", en: "Audience" },
    visualTone: { zh: "视觉气质", en: "Visual Tone" },
    mustHave: { zh: "必须项", en: "Must-Haves" },
    constraints: { zh: "约束条件", en: "Constraints" },
  };

  const label = labels[slot];
  return label ? (locale === "zh" ? label.zh : label.en) : slot;
}

function getStyleName(locale: Locale, styleSlug: string): string {
  const meta = getStyleMetaBySlug(styleSlug);
  if (!meta) {
    return styleSlug;
  }

  return locale === "zh" ? meta.name : meta.nameEn;
}

function formatConversationForPrompt(messages: AgentMessage[], locale: Locale): string {
  return messages
    .slice(-12)
    .map((message) => {
      const roleLabel =
        message.role === "user"
          ? locale === "zh"
            ? "用户"
            : "User"
          : locale === "zh"
            ? "助手"
            : "Assistant";
      return `${roleLabel}: ${message.content}`;
    })
    .join("\n");
}

function buildPlannerPrompt(
  locale: Locale,
  messages: AgentMessage[],
  pageContext?: AgentPageContext
): { system: string; user: string } {
  const localeInstruction =
    locale === "zh"
      ? "所有自然语言字段必须使用简体中文。"
      : "All natural language fields must be in English.";

  return {
    system: [
      "You are the intake planner for the StyleKit website agent.",
      "Your job is to decide whether the brief is specific enough to create a single-page planning direction.",
      "Extract the user's page brief into structured fields.",
      "If key information is missing, set ready=false and ask exactly one concise follow-up question.",
      "The five slots are: productType, audience, visualTone, mustHave, constraints.",
      "Treat constraints like accessibility, performance, brand restrictions, mobile-first, dark mode, or conversion goals as important.",
      "When enough information exists, set ready=true and provide a normalizedQuery suitable for page planning and design search.",
      "Return JSON only. Do not wrap in markdown.",
      localeInstruction,
    ].join(" "),
    user: JSON.stringify(
      {
        locale,
        pageContext: pageContext ?? {},
        conversation: formatConversationForPrompt(messages, locale),
      },
      null,
      2
    ),
  };
}

function serializeContext(context: RecommendationContext): string {
  return JSON.stringify(context, null, 2);
}

function buildPlannerPromptSummary(
  locale: Locale,
  messages: AgentMessage[],
  pageContext?: AgentPageContext
): string[] {
  const lastUserMessage =
    [...messages].reverse().find((message) => message.role === "user")?.content ?? "";
  const pageContextSummary = [pageContext?.path, pageContext?.styleSlug, pageContext?.templateSlug]
    .filter(Boolean)
    .join(" | ");

  return [
    locale === "zh"
      ? `最近对话轮次：${Math.min(messages.length, 12)}`
      : `Recent conversation turns: ${Math.min(messages.length, 12)}`,
    lastUserMessage
      ? locale === "zh"
        ? `最近一次用户输入：${lastUserMessage}`
        : `Latest user input: ${lastUserMessage}`
      : locale === "zh"
        ? "最近一次用户输入为空。"
        : "No latest user input was available.",
    pageContextSummary
      ? locale === "zh"
        ? `页面上下文：${pageContextSummary}`
        : `Page context: ${pageContextSummary}`
      : locale === "zh"
        ? "没有页面上下文。"
        : "No page context was attached.",
  ];
}

function buildResponderPromptSummary({
  locale,
  planner,
  codePrompt,
  toolTrace,
  projectKnowledge,
}: {
  locale: Locale;
  planner: AgentPlannerResult;
  codePrompt: AgentCodePrompt;
  toolTrace: AgentToolTrace[];
  projectKnowledge: ReturnType<typeof buildAgentProjectKnowledgeContext>;
}): string[] {
  return [
    locale === "zh"
      ? `规范化查询：${planner.normalizedQuery}`
      : `Normalized query: ${planner.normalizedQuery}`,
    locale === "zh"
      ? `生成提示词：${codePrompt.title}`
      : `Code prompt: ${codePrompt.title}`,
    locale === "zh"
      ? `项目知识命中数：${projectKnowledge.items.length}`
      : `Project knowledge hits: ${projectKnowledge.items.length}`,
    locale === "zh"
      ? `工具调用数：${toolTrace.length}`
      : `Tool calls: ${toolTrace.length}`,
  ];
}

function buildDecisionTraceForIntake({
  locale,
  workflow,
  planner,
}: {
  locale: Locale;
  workflow: AgentWorkflowSnapshot;
  planner: AgentPlannerResult;
}): AgentDecisionTraceItem[] {
  const missingSlots = workflow.missingSlots.map((slot) => getSlotLabel(locale, slot));

  return [
    {
      type: "workflow",
      title: localize(locale, "继续停留在 Intake 阶段", "Stayed In Intake Mode"),
      summary: localize(
        locale,
        "这轮还不能出方案，因为 planner 判断关键槽位还不够完整。",
        "The agent did not generate a plan yet because the planner still sees key slots as incomplete."
      ),
      evidence: [
        localize(locale, `当前状态：${workflow.state}`, `Workflow state: ${workflow.state}`),
        localize(locale, `转移原因：${workflow.reason}`, `Transition reason: ${workflow.reason}`),
        missingSlots.length > 0
          ? localize(locale, `缺失槽位：${missingSlots.join("、")}`, `Missing slots: ${missingSlots.join(", ")}`)
          : localize(locale, "当前没有缺失槽位。", "No missing slots remain."),
      ],
    },
    {
      type: "follow_up",
      title: localize(locale, "继续追问", "Ask A Follow-Up"),
      summary: planner.followUpQuestion || localizeDefaultFollowUp(locale),
      evidence: [
        localize(locale, `规范化查询：${planner.normalizedQuery}`, `Normalized query: ${planner.normalizedQuery}`),
        localize(locale, `产品类型：${planner.productType || "-"}`, `Product type: ${planner.productType || "-"}`),
        localize(locale, `目标用户：${planner.audience || "-"}`, `Audience: ${planner.audience || "-"}`),
      ],
    },
  ];
}

function buildDecisionTraceForPlan({
  locale,
  workflow,
  codePrompt,
  toolTrace,
  smartRecommendation,
}: {
  locale: Locale;
  workflow: AgentWorkflowSnapshot;
  codePrompt: AgentCodePrompt;
  toolTrace: AgentToolTrace[];
  smartRecommendation: ReturnType<typeof getSmartRecommendation>;
}): AgentDecisionTraceItem[] {
  const styleSlug = smartRecommendation.style.item.slug;
  const styleName = getStyleName(locale, styleSlug);

  return [
    {
      type: "workflow",
      title: localize(locale, "进入提示词生成阶段", "Moved Into Prompt Generation"),
      summary: localize(
        locale,
        "这轮已经满足出方案条件，agent 从补信息切到生成 AI 编码提示词。",
        "This turn had enough information to move from intake into AI coding prompt generation."
      ),
      evidence: [
        localize(locale, `当前状态：${workflow.state}`, `Workflow state: ${workflow.state}`),
        localize(locale, `转移原因：${workflow.reason}`, `Transition reason: ${workflow.reason}`),
        localize(locale, `槽位完整度：5/5`, `Slot coverage: 5/5`),
      ],
    },
    {
      type: "style_selection",
      title: localize(locale, "选择主风格", "Select The Lead Style"),
      summary: localize(
        locale,
        `主风格定为 ${styleName}，因为它和当前需求的匹配分最高。`,
        `${styleName} became the lead style because it scored highest against the current brief.`
      ),
      evidence: [
        localize(locale, `风格分数：${smartRecommendation.style.score}`, `Style score: ${smartRecommendation.style.score}`),
        localize(locale, `总体置信度：${smartRecommendation.summary.confidence}`, `Overall confidence: ${smartRecommendation.summary.confidence}`),
        ...smartRecommendation.style.reasons.slice(0, 2).map((reason) =>
          localize(locale, `推荐理由：${reason}`, `Reason: ${reason}`)
        ),
      ],
    },
    {
      type: "template_selection",
      title: localize(locale, "确定模板方向", "Lock The Template Direction"),
      summary: localize(
        locale,
        `提示词基于 ${codePrompt.templateType} 模板方向生成。`,
        `The prompt was generated based on the ${codePrompt.templateType} template direction.`
      ),
      evidence: [
        localize(locale, `模板类型：${codePrompt.templateType}`, `Template type: ${codePrompt.templateType}`),
        localize(locale, `提示词标题：${codePrompt.title}`, `Prompt title: ${codePrompt.title}`),
      ],
    },
    {
      type: "next_step",
      title: localize(locale, "生成编码提示词", "Generate Coding Prompt"),
      summary: localize(
        locale,
        "AI 编码提示词已生成，用户可以直接复制到 ChatGPT、Cursor 或 Claude 中使用。",
        "The AI coding prompt has been generated and is ready to copy into ChatGPT, Cursor, or Claude."
      ),
      evidence: [
        localize(locale, `工具调用数：${toolTrace.length}`, `Tool calls: ${toolTrace.length}`),
        localize(locale, `提示词长度：${codePrompt.prompt.length} 字符`, `Prompt length: ${codePrompt.prompt.length} chars`),
      ],
    },
  ];
}

function buildResponderPrompt({
  locale,
  planner,
  codePrompt,
  projectKnowledge,
  pageContext,
  toolTrace,
}: {
  locale: Locale;
  planner: AgentPlannerResult;
  codePrompt: AgentCodePrompt;
  projectKnowledge: ReturnType<typeof buildAgentProjectKnowledgeContext>;
  pageContext?: AgentPageContext;
  toolTrace: AgentToolTrace[];
}): { system: string; user: string } {
  const localeInstruction =
    locale === "zh"
      ? "请用简体中文回答。简要总结页面方向和主风格选择，提醒用户可以在侧边栏复制 AI 编码提示词。避免长篇大论。"
      : "Respond in English. Briefly summarize the page direction and lead style choice, and remind the user they can copy the AI coding prompt from the sidebar. Keep it concise.";

  return {
    system: [
      "You are StyleKit's page planning agent.",
      "You are grounded only in the provided planner output, code prompt, project knowledge, and tool data.",
      "Be practical, explain tradeoffs, and keep the answer short.",
      "When the brief is ready, provide a concise summary of the page direction, the chosen style, and 1-2 key tradeoffs.",
      "Mention that a complete AI coding prompt has been generated and is available in the sidebar.",
      "Do not invent links or styles that are not provided.",
      "Return JSON only with assistantMessage.",
      localeInstruction,
    ].join(" "),
    user: JSON.stringify(
      {
        locale,
        pageContext: pageContext ?? {},
        planner,
        codePrompt: { title: codePrompt.title, styleName: codePrompt.styleName, templateType: codePrompt.templateType },
        projectKnowledge,
        toolTrace,
      },
      null,
      2
    ),
  };
}

function inferPlannerFallback(
  locale: Locale,
  messages: AgentMessage[],
  pageContext?: AgentPageContext
): AgentPlannerResult {
  const latestUserMessage = getLatestUserMessage(messages);
  const normalizedQuery =
    latestUserMessage || localize(locale, "单页设计咨询", "single page planning brief");
  const lowerInput = `${latestUserMessage} ${pageContext?.path ?? ""}`.toLowerCase();

  const productType =
    latestUserMessage.includes("首页") || lowerInput.includes("landing")
      ? localize(locale, "AI agent 产品首页", "AI agent landing page")
      : latestUserMessage.includes("后台") || lowerInput.includes("dashboard")
        ? localize(locale, "产品后台", "product dashboard")
        : localize(locale, "产品页面", "product page");

  const audience = latestUserMessage.includes("开发者")
    ? localize(locale, "开发者", "Developers")
    : latestUserMessage.includes("企业") || latestUserMessage.includes("B2B")
      ? localize(locale, "企业团队", "Enterprise teams")
      : localize(locale, "潜在客户", "Potential customers");

  const visualTone = latestUserMessage.includes("极简")
    ? localize(locale, "极简克制", "Minimal")
    : latestUserMessage.includes("高级") || latestUserMessage.includes("奢华")
      ? localize(locale, "高级质感", "Premium")
      : localize(locale, "专业科技感", "Professional and technical");

  const mustHave = [
    latestUserMessage.includes("功能") ? localize(locale, "功能亮点", "Feature highlights") : null,
    latestUserMessage.includes("案例") ? localize(locale, "客户案例", "Case studies") : null,
    latestUserMessage.includes("定价") ? localize(locale, "价格方案", "Pricing") : null,
    localize(locale, "明确 CTA", "Clear CTA"),
  ].filter((item): item is string => Boolean(item));

  const constraints = [
    latestUserMessage.includes("移动") ? localize(locale, "移动端优先", "Mobile first") : null,
    latestUserMessage.includes("无障碍") ? localize(locale, "无障碍优先", "Accessibility priority") : null,
    latestUserMessage.includes("性能") ? localize(locale, "性能优先", "Performance priority") : null,
  ].filter((item): item is string => Boolean(item));

  const ready = normalizedQuery.length >= 6;

  return {
    ready,
    normalizedQuery,
    productType: ready ? productType : "",
    audience: ready ? audience : "",
    visualTone: ready ? visualTone : "",
    mustHave,
    constraints,
    followUpQuestion: ready ? "" : localizeDefaultFollowUp(locale),
    reasoning: [
      localize(
        locale,
        "开发环境兜底：第三方模型未返回可解析 JSON，改用本地规则推断。",
        "Development fallback: the upstream model did not return parseable JSON, so local heuristics were used."
      ),
    ],
    context: {
      targetAudience: latestUserMessage.includes("开发者")
        ? "developer"
        : latestUserMessage.includes("企业") || latestUserMessage.includes("B2B")
          ? "enterprise"
          : "consumer",
      brandMood: latestUserMessage.includes("极简")
        ? "minimal"
        : latestUserMessage.includes("高级")
          ? "luxury"
          : "professional",
      primaryDevice: latestUserMessage.includes("移动") ? "mobile" : "desktop",
      accessibilityPriority: latestUserMessage.includes("无障碍"),
      performancePriority: latestUserMessage.includes("性能"),
    },
  };
}

function buildResponderFallback({
  locale,
  codePrompt,
}: {
  locale: Locale;
  codePrompt: AgentCodePrompt;
}): { assistantMessage: string } {
  return {
    assistantMessage:
      locale === "zh"
        ? [
            `**方向**：${codePrompt.templateType}，主风格 ${codePrompt.styleName}。`,
            `**提示词已生成**：在右侧边栏可以看到完整的 AI 编码提示词，点击复制后粘贴到 ChatGPT、Cursor 或 Claude 即可开始编码。`,
          ].join("")
        : [
            `**Direction**: ${codePrompt.templateType} with ${codePrompt.styleName} as the lead style.`,
            ` **Prompt ready**: Check the sidebar for the complete AI coding prompt. Copy and paste it into ChatGPT, Cursor, or Claude to start building.`,
          ].join(""),
  };
}

export async function runAgentTurn({
  locale,
  messages,
  pageContext,
}: {
  locale: Locale;
  messages: AgentMessage[];
  pageContext?: AgentPageContext;
}): Promise<{
  assistantMessage: string;
  followUpNeeded: boolean;
  workflowState: AgentWorkflowSnapshot["state"];
  workflow: AgentWorkflowSnapshot;
  planner: AgentPlannerResult;
  codePrompt: AgentCodePrompt | null;
  toolTrace: AgentToolTrace[];
  promptSnapshot: AgentPromptSnapshot;
  decisionTrace: AgentDecisionTraceItem[];
}> {
  const plannerPrompt = buildPlannerPrompt(locale, messages, pageContext);
  let plannerFallbackUsed = false;
  const planner = DEV_AGENT_FALLBACK
    ? (() => {
        plannerFallbackUsed = true;
        return inferPlannerFallback(locale, messages, pageContext);
      })()
    : await requestAgentJson({
        schema: plannerSchema,
        system: plannerPrompt.system,
        user: plannerPrompt.user,
        temperature: 0.1,
      }).catch((error) => {
        if (!DEV_AGENT_FALLBACK) {
          throw error;
        }
        plannerFallbackUsed = true;
        return inferPlannerFallback(locale, messages, pageContext);
      });
  const workflow = buildWorkflowSnapshot({ messages, planner });
  const plannerPromptSnapshot: AgentPromptSnapshot["planner"] = {
    system: plannerPrompt.system,
    user: plannerPrompt.user,
    summary: buildPlannerPromptSummary(locale, messages, pageContext),
  };

  if (!planner.ready) {
    const decisionTrace = buildDecisionTraceForIntake({
      locale,
      workflow,
      planner,
    });
    return {
      assistantMessage: planner.followUpQuestion || localizeDefaultFollowUp(locale),
      followUpNeeded: true,
      workflowState: workflow.state,
      workflow,
      planner,
      codePrompt: null,
      toolTrace: [],
      promptSnapshot: {
        planner: plannerPromptSnapshot,
        responder: null,
      },
      decisionTrace,
    };
  }

  const toolTrace: AgentToolTrace[] = [];

  if (plannerFallbackUsed) {
    toolTrace.push({
      tool: "devFallbackPlanner",
      ok: true,
      meta: {
        reason: "planner_schema_error",
      },
    });
  }

  const knowledgeResult = searchKnowledge(planner.normalizedQuery, undefined, 4);
  toolTrace.push({
    tool: "searchKnowledge",
    ok: true,
    meta: {
      domain: knowledgeResult.domain,
      count: knowledgeResult.count,
      query: planner.normalizedQuery,
    },
  });

  const smartRecommendation = getSmartRecommendation(
    planner.normalizedQuery,
    planner.context
  );
  toolTrace.push({
    tool: "getSmartRecommendation",
    ok: true,
    meta: {
      topStyle: smartRecommendation.style.item.slug,
      confidence: smartRecommendation.summary.confidence,
    },
  });

  const projectKnowledge = buildAgentProjectKnowledgeContext({
    locale,
    planner,
    styleSlug: smartRecommendation.style.item.slug,
  });
  toolTrace.push({
    tool: "searchProjectKnowledge",
    ok: true,
    meta: {
      counts: projectKnowledge.counts,
      selected: projectKnowledge.items.map((item) => ({
        type: item.type,
        title: item.title,
        source: item.source,
      })),
    },
  });

  const codePrompt = buildAgentCodePrompt({
    locale,
    planner,
    smartRecommendation,
    projectKnowledge,
  });

  const responderPrompt = buildResponderPrompt({
    locale,
    planner: {
      ...planner,
      context: planner.context,
      reasoning: [
        ...planner.reasoning,
        `knowledgeDomain=${knowledgeResult.domain}`,
        `topStyle=${smartRecommendation.style.item.slug}`,
        `topStyleScore=${smartRecommendation.style.score}`,
        `context=${serializeContext(planner.context)}`,
      ],
    },
    codePrompt,
    projectKnowledge,
    pageContext,
    toolTrace,
  });

  const response = DEV_AGENT_FALLBACK
    ? (() => {
        toolTrace.push({
          tool: "devFallbackResponder",
          ok: true,
          meta: {
            reason: "development_local_agent",
          },
        });
        return buildResponderFallback({ locale, codePrompt });
      })()
    : await requestAgentJson({
        schema: responderSchema,
        system: responderPrompt.system,
        user: responderPrompt.user,
        temperature: 0.3,
      }).catch((error) => {
        if (!DEV_AGENT_FALLBACK) {
          throw error;
        }

        toolTrace.push({
          tool: "devFallbackResponder",
          ok: true,
          meta: {
            reason:
              error instanceof AgentProviderError ? error.code : "responder_schema_error",
          },
        });
        return buildResponderFallback({ locale, codePrompt });
      });
  const decisionTrace = buildDecisionTraceForPlan({
    locale,
    workflow,
    codePrompt,
    toolTrace,
    smartRecommendation,
  });

  return {
    assistantMessage: response.assistantMessage,
    followUpNeeded: false,
    workflowState: workflow.state,
    workflow,
    planner,
    codePrompt,
    toolTrace,
    promptSnapshot: {
      planner: plannerPromptSnapshot,
      responder: {
        system: responderPrompt.system,
        user: responderPrompt.user,
        summary: buildResponderPromptSummary({
          locale,
          planner,
          codePrompt,
          toolTrace,
          projectKnowledge,
        }),
      },
    },
    decisionTrace,
  };
}
