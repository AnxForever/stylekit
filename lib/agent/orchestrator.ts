import { z } from "zod";
import type { Locale } from "@/lib/i18n/translations";
import {
  getSmartRecommendation,
  getDesignRecommendation,
  searchKnowledge,
  type RecommendationContext,
  type StackId,
} from "@/lib/knowledge";
import { AgentProviderError, requestAgentJson, requestAgentStream } from "./provider";
import { buildAgentCodePrompt } from "./code-prompt";
import { buildAgentProjectKnowledgeContext } from "./project-knowledge";
import { inferTemplateType, getLocalizedTemplateTypeLabel } from "./recommendations";
import { buildWorkflowSnapshot } from "./state-transition";
import { getStyleMetaBySlug } from "@/lib/styles/meta";
import { getStyleBySlug } from "@/lib/styles";
import { templateCatalog } from "@/lib/templates/catalog";
import { componentPatterns } from "@/lib/component-patterns";
import { promptTopics } from "@/lib/prompts/topics";
import type {
  AgentCodePrompt,
  AgentConsultPhase,
  AgentDecisionTraceItem,
  AgentMessage,
  AgentPageContext,
  AgentPlannerResult,
  AgentPromptSnapshot,
  AgentSuggestedOption,
  AgentWorkflowSnapshot,
  AgentToolTrace,
} from "./types";

/* ---------- Hardcoded option catalogs for phases 1-2 ---------- */

const GOAL_OPTIONS: Record<Locale, AgentSuggestedOption[]> = {
  zh: [
    { id: "portfolio", label: "作品集", description: "展示个人或团队的项目作品" },
    { id: "blog", label: "博客 / 内容站", description: "发布文章、教程或新闻" },
    { id: "saas", label: "SaaS / 产品首页", description: "软件产品的官网落地页" },
    { id: "ecommerce", label: "电商 / 商城", description: "展示和销售商品" },
    { id: "personal", label: "个人主页", description: "个人品牌或简历展示" },
    { id: "dashboard", label: "管理后台 / 仪表盘", description: "数据面板和管理界面" },
  ],
  en: [
    { id: "portfolio", label: "Portfolio", description: "Showcase projects and creative work" },
    { id: "blog", label: "Blog / Content", description: "Publish articles, tutorials, or news" },
    { id: "saas", label: "SaaS / Product", description: "Software product landing page" },
    { id: "ecommerce", label: "E-commerce", description: "Display and sell products" },
    { id: "personal", label: "Personal Site", description: "Personal brand or resume" },
    { id: "dashboard", label: "Dashboard / Admin", description: "Data panels and admin interfaces" },
  ],
};

const AUDIENCE_OPTIONS: Record<Locale, AgentSuggestedOption[]> = {
  zh: [
    { id: "developers", label: "开发者", description: "程序员、技术人员" },
    { id: "designers", label: "设计师", description: "UI/UX 设计师、创意工作者" },
    { id: "enterprise", label: "企业客户", description: "B2B 商业决策者" },
    { id: "consumers", label: "普通用户", description: "C 端消费者" },
    { id: "students", label: "学生 / 求职者", description: "在校学生或正在找工作的人" },
  ],
  en: [
    { id: "developers", label: "Developers", description: "Engineers and technical audience" },
    { id: "designers", label: "Designers", description: "UI/UX designers and creatives" },
    { id: "enterprise", label: "Enterprise", description: "B2B business decision makers" },
    { id: "consumers", label: "Consumers", description: "General public, end users" },
    { id: "students", label: "Students / Job seekers", description: "Students or people looking for work" },
  ],
};

/* ---------- Zod schemas ---------- */

const suggestedOptionSchema = z.object({
  id: z.string().trim().min(1),
  label: z.string().trim().min(1),
  description: z.string().trim().default(""),
});

const plannerSchema = z.object({
  ready: z.boolean(),
  phase: z.enum(["goal", "audience", "feel", "confirm", "revise", "done"]).default("goal"),
  normalizedQuery: z.string().trim().default(""),
  productType: z.string().trim().default(""),
  audience: z.string().trim().default(""),
  visualTone: z.string().trim().default(""),
  styleSlug: z.string().trim().default(""),
  mustHave: z.array(z.string().trim()).default([]),
  constraints: z.array(z.string().trim()).default([]),
  followUpQuestion: z.string().trim().default(""),
  suggestedOptions: z.array(suggestedOptionSchema).default([]),
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

/**
 * Normalize raw LLM JSON before schema validation.
 * Handles common model deviations:
 * - confirmedSlots object → flat productType/audience/visualTone fields
 * - Missing normalizedQuery → use followUpQuestion or fallback
 * - suggestedOptions without description → add empty description
 */
function normalizePlannerResponse(raw: Record<string, unknown>, userMessage: string): Record<string, unknown> {
  const out = { ...raw };

  /* Flatten confirmedSlots */
  if (out.confirmedSlots && typeof out.confirmedSlots === "object" && !Array.isArray(out.confirmedSlots)) {
    const slots = out.confirmedSlots as Record<string, unknown>;
    if (!out.productType && slots.productType) out.productType = slots.productType;
    if (!out.audience && slots.audience) out.audience = slots.audience;
    if (!out.visualTone && slots.visualTone) out.visualTone = slots.visualTone;
    if (!out.styleSlug && slots.styleSlug) out.styleSlug = slots.styleSlug;
    if (!out.mustHave && slots.mustHave) out.mustHave = slots.mustHave;
    if (!out.constraints && slots.constraints) out.constraints = slots.constraints;
  }

  /* Ensure normalizedQuery */
  if (!out.normalizedQuery || (typeof out.normalizedQuery === "string" && !out.normalizedQuery.trim())) {
    out.normalizedQuery = userMessage.trim().slice(0, 200) || "user query";
  }

  /* Patch suggestedOptions without description */
  if (Array.isArray(out.suggestedOptions)) {
    out.suggestedOptions = (out.suggestedOptions as Record<string, unknown>[]).map((opt) => ({
      ...opt,
      description: typeof opt.description === "string" ? opt.description : (typeof opt.label === "string" ? opt.label : ""),
    }));
  }

  return out;
}

const DEV_AGENT_FALLBACK =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_DEV_MOCK_USER === "true";

function warnFallback(context: string, error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  console.warn(`[agent] ${context}: LLM call failed, using dev fallback. Error: ${message}`);
}

/* ---------- P0-1: Agentic RAG — smart retrieval ---------- */

const CONFIRMATION_PATTERNS = /^(ok|okay|确认|好的|没问题|可以|yes|sure|go|looks good|lgtm|确认.*生成|开始生成)/i;
const SIMPLE_SELECTION_MAX_LENGTH = 60;

function isSubstantiveMessage(message: string): boolean {
  const trimmed = message.trim();
  if (!trimmed) return false;
  if (CONFIRMATION_PATTERNS.test(trimmed)) return false;
  if (trimmed.length <= SIMPLE_SELECTION_MAX_LENGTH && !trimmed.includes(" ") && !trimmed.includes("，")) return false;
  return true;
}

function shouldRetrieveKnowledge(phase: AgentConsultPhase, message: string): boolean {
  if (!isSubstantiveMessage(message)) return false;
  if (phase === "done") return false;
  if (phase === "confirm") return false;
  return true;
}

/* ---------- Locale helpers ---------- */

function localize(locale: Locale, zh: string, en: string): string {
  return locale === "zh" ? zh : en;
}

function getLatestUserMessage(messages: AgentMessage[]): string {
  return [...messages].reverse().find((message) => message.role === "user")?.content.trim() ?? "";
}

function getPhaseLabel(locale: Locale, phase: AgentConsultPhase): string {
  const labels: Record<AgentConsultPhase, { zh: string; en: string }> = {
    goal: { zh: "网站目标", en: "Site Goal" },
    audience: { zh: "目标受众", en: "Target Audience" },
    feel: { zh: "视觉感觉", en: "Visual Feel" },
    confirm: { zh: "确认需求", en: "Confirm Brief" },
    revise: { zh: "修改需求", en: "Revise Brief" },
    done: { zh: "生成完成", en: "Generation Complete" },
  };
  const label = labels[phase];
  return locale === "zh" ? label.zh : label.en;
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
          ? locale === "zh" ? "用户" : "User"
          : locale === "zh" ? "助手" : "Assistant";
      return `${roleLabel}: ${message.content}`;
    })
    .join("\n");
}

function serializeContext(context: RecommendationContext): string {
  return JSON.stringify(context, null, 2);
}

/* ---------- Knowledge context for each consultation phase ---------- */

interface PhaseKnowledgeContext {
  topStyles: Array<{ slug: string; name: string; description: string; score: number }>;
  matchedTemplates: Array<{ id: string; name: string; type: string; styleSlug: string; description: string }>;
  matchedPatterns: Array<{ id: string; name: string; family: string; summary: string }>;
  matchedPromptTopics: Array<{ slug: string; title: string; promptCount: number }>;
}

function extractPlannerHistory(messages: AgentMessage[]): {
  productType: string;
  audience: string;
  visualTone: string;
  styleSlug: string;
} {
  let productType = "";
  let audience = "";
  let visualTone = "";
  let styleSlug = "";

  for (const message of messages) {
    if (message.role === "assistant" && message.planner) {
      if (message.planner.productType) productType = message.planner.productType;
      if (message.planner.audience) audience = message.planner.audience;
      if (message.planner.visualTone) visualTone = message.planner.visualTone;
      if (message.planner.styleSlug) styleSlug = message.planner.styleSlug;
    }
  }

  return { productType, audience, visualTone, styleSlug };
}

function buildPhaseKnowledgeContext(
  locale: Locale,
  messages: AgentMessage[],
  latestUserMessage: string
): PhaseKnowledgeContext {
  const history = extractPlannerHistory(messages);
  const queryParts = [latestUserMessage, history.productType, history.audience, history.visualTone].filter(Boolean);
  const query = queryParts.join(" ") || "website";

  /* --- Styles --- */
  let topStyles: PhaseKnowledgeContext["topStyles"] = [];
  try {
    const rec = getSmartRecommendation(query, {
      targetAudience: history.audience.toLowerCase().includes("developer")
        ? "developer"
        : history.audience.toLowerCase().includes("enterprise") || history.audience.toLowerCase().includes("b2b")
          ? "enterprise"
          : undefined,
    });
    const main = rec.style.item;
    const mainStyle = getStyleBySlug(main.slug);
    topStyles = [
      {
        slug: main.slug,
        name: locale === "zh" ? (mainStyle?.name ?? main.slug) : (mainStyle?.nameEn ?? main.slug),
        description: (locale === "en" && mainStyle?.descriptionEn) ? mainStyle.descriptionEn : (mainStyle?.description ?? ""),
        score: rec.style.score,
      },
      ...rec.style.alternatives.slice(0, 3).map((alt) => {
        const s = getStyleBySlug(alt.slug);
        return {
          slug: alt.slug,
          name: locale === "zh" ? (s?.name ?? alt.slug) : (s?.nameEn ?? alt.slug),
          description: (locale === "en" && s?.descriptionEn) ? s.descriptionEn : (s?.description ?? ""),
          score: 0,
        };
      }),
    ];
  } catch {
    /* graceful fallback */
  }

  /* --- Templates --- */
  const templateTypeHint = inferTemplateType(query);
  const matchedTemplates = templateCatalog
    .filter((t) => {
      if (t.type === templateTypeHint) return true;
      const text = `${t.id} ${t.name.en} ${t.name.zh} ${t.description.en}`.toLowerCase();
      return queryParts.some((q) => text.includes(q.toLowerCase()));
    })
    .slice(0, 3)
    .map((t) => ({
      id: t.id,
      name: locale === "zh" ? t.name.zh : t.name.en,
      type: t.type,
      styleSlug: t.styleSlug,
      description: locale === "zh" ? t.description.zh : t.description.en,
    }));

  /* --- Component patterns --- */
  const queryLower = query.toLowerCase();
  const matchedPatterns = componentPatterns
    .filter((p) => {
      const text = `${p.id} ${p.name} ${p.nameZh} ${p.tags.join(" ")} ${p.family} ${p.summary}`.toLowerCase();
      return queryParts.some((q) => text.includes(q.toLowerCase().split(/\s+/)[0]));
    })
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      name: locale === "zh" ? p.nameZh : p.name,
      family: p.family,
      summary: locale === "zh" ? p.summaryZh : p.summary,
    }));

  /* --- Prompt topics --- */
  const matchedPromptTopics = promptTopics
    .filter((t) => {
      const text = `${t.slug} ${t.titleEn} ${t.titleZh} ${t.keywords.join(" ")}`.toLowerCase();
      return queryParts.some((q) => text.includes(q.toLowerCase().split(/\s+/)[0]));
    })
    .slice(0, 2)
    .map((t) => ({
      slug: t.slug,
      title: locale === "zh" ? t.titleZh : t.titleEn,
      promptCount: t.prompts.length,
    }));

  return { topStyles, matchedTemplates, matchedPatterns, matchedPromptTopics };
}

function formatKnowledgeForPrompt(locale: Locale, knowledge: PhaseKnowledgeContext): string {
  const sections: string[] = [];

  if (knowledge.topStyles.length > 0) {
    const header = locale === "zh" ? "知识库匹配的风格方向" : "Matched style directions from knowledge base";
    const items = knowledge.topStyles
      .map((s) => `  - ${s.name} (${s.slug}): ${s.description.slice(0, 100)}${s.description.length > 100 ? "..." : ""} [score: ${s.score}]`)
      .join("\n");
    sections.push(`${header}:\n${items}`);
  }

  if (knowledge.matchedTemplates.length > 0) {
    const header = locale === "zh" ? "知识库匹配的模板" : "Matched templates from knowledge base";
    const items = knowledge.matchedTemplates
      .map((t) => `  - ${t.name} (${t.type}, style: ${t.styleSlug}): ${t.description.slice(0, 80)}`)
      .join("\n");
    sections.push(`${header}:\n${items}`);
  }

  if (knowledge.matchedPatterns.length > 0) {
    const header = locale === "zh" ? "知识库匹配的 UI 组件模式" : "Matched UI component patterns";
    const items = knowledge.matchedPatterns
      .map((p) => `  - ${p.name} (${p.family}): ${p.summary.slice(0, 80)}`)
      .join("\n");
    sections.push(`${header}:\n${items}`);
  }

  if (knowledge.matchedPromptTopics.length > 0) {
    const header = locale === "zh" ? "知识库匹配的提示词主题" : "Matched prompt topics";
    const items = knowledge.matchedPromptTopics
      .map((t) => `  - ${t.title} (${t.promptCount} prompts)`)
      .join("\n");
    sections.push(`${header}:\n${items}`);
  }

  return sections.join("\n\n");
}

/* ---------- Detect current phase from conversation history ---------- */

function detectCurrentPhase(messages: AgentMessage[]): AgentConsultPhase {
  const lastAssistant = [...messages]
    .reverse()
    .find((message) => message.role === "assistant" && message.planner);

  if (!lastAssistant?.planner) {
    return "goal";
  }

  return lastAssistant.planner.phase;
}

/* ---------- Follow-up conversation after codePrompt generation ---------- */

function getExistingCodePrompt(messages: AgentMessage[]): AgentCodePrompt | null {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const msg = messages[i];
    if (msg.role === "assistant" && msg.codePrompt) {
      return msg.codePrompt;
    }
  }
  return null;
}

function buildFollowUpPrompt(
  locale: Locale,
  messages: AgentMessage[],
  codePrompt: AgentCodePrompt,
  latestUserMsg: string,
): { system: string; user: string } {
  const recentMessages = messages.slice(-6).map((m) => `${m.role}: ${m.content}`).join("\n");

  const system = locale === "zh"
    ? [
        "你是 StyleKit 的设计顾问。你刚刚帮用户完成了一次完整的需求收集并生成了代码提示词（codePrompt），现在用户想继续聊。",
        "",
        "身份设定：",
        "- 你是一个经验丰富的前端设计顾问，懂 CSS、动画、布局、配色、排版",
        "- 你了解 StyleKit 提供的 130+ 设计风格（如 glassmorphism、neo-brutalist、minimalist 等）",
        "- 你的建议具体、可操作，不说空话",
        "",
        "硬性规则：",
        "- 禁止使用 emoji，一个都不行",
        "- 禁止重新生成 codePrompt，方案已经确定了",
        "- 不要用 markdown 标题（#），用短段落和破折号列表即可",
        "- 回答控制在 3-5 句话以内，除非用户明确要求详细解释",
        "- 如果用户想修改方案，说清楚改哪里、怎么改，不要说\"可以考虑\"这种废话",
        "- 如果用户问的东西和当前方案无关，也正常回答，不要强行扯回来",
        "",
        "返回格式：JSON { \"assistantMessage\": \"你的回答\" }",
      ].join("\n")
    : [
        "You are a design consultant for StyleKit. You just helped the user complete a full requirements flow and generated a codePrompt. Now the user wants to continue chatting.",
        "",
        "Identity:",
        "- You are an experienced frontend design consultant who knows CSS, animations, layouts, color theory, and typography",
        "- You know StyleKit's 130+ design styles (glassmorphism, neo-brutalist, minimalist, etc.)",
        "- Your suggestions are specific and actionable, not vague",
        "",
        "Hard rules:",
        "- Never use emoji, not even one",
        "- Never regenerate the codePrompt, the plan is finalized",
        "- Do not use markdown headers (#), use short paragraphs and dash lists",
        "- Keep answers to 3-5 sentences unless the user explicitly asks for detail",
        "- If the user wants to modify the plan, say exactly what to change and how",
        "- If the user asks something unrelated to the current plan, answer normally",
        "",
        "Return format: JSON { \"assistantMessage\": \"your answer\" }",
      ].join("\n");

  const user = JSON.stringify({
    locale,
    question: latestUserMsg,
    existingPlan: {
      title: codePrompt.title,
      styleName: codePrompt.styleName,
      styleSlug: codePrompt.styleSlug,
      templateType: codePrompt.templateType,
    },
    recentMessages,
  });

  return { system, user };
}

/* ---------- Planner prompt (the core rewrite) ---------- */

function buildPlannerPrompt(
  locale: Locale,
  messages: AgentMessage[],
  knowledge: PhaseKnowledgeContext,
  pageContext?: AgentPageContext
): { system: string; user: string } {
  const localeInstruction =
    locale === "zh"
      ? "所有自然语言字段必须使用简体中文。"
      : "All natural language fields must be in English.";

  const previousPhase = detectCurrentPhase(messages);

  const goalOptionsList = GOAL_OPTIONS[locale]
    .map((option) => `  - ${option.label}: ${option.description}`)
    .join("\n");

  const audienceOptionsList = AUDIENCE_OPTIONS[locale]
    .map((option) => `  - ${option.label}: ${option.description}`)
    .join("\n");

  const system = locale === "zh"
    ? [
        "你是 StyleKit 的网页策划顾问。你的用户是不懂设计的小白，他们知道自己想做什么网站，但不知道该怎么描述设计需求。",
        "你的工作是通过友好的对话，一步一步帮用户理清网站方向。",
        "",
        "## 对话规则",
        "1. 每轮只问一个问题，不要一次问多个。",
        "2. 每个问题必须附带 2-6 个建议选项（suggestedOptions 数组），帮用户快速决策。",
        "3. 说人话，不要用专业术语。如果必须用到设计词汇，紧跟一个通俗解释。",
        "4. 语气友好、鼓励，像一个耐心的朋友在帮忙，不是在审问。",
        "5. 用户的回答可能很模糊或口语化，你需要理解意图并归纳到结构化字段中。",
        "6. 如果用户一开始就说了很多信息（比如同时提到了网站类型和受众），可以跳过已回答的阶段。",
        "7. 禁止使用 emoji，一个都不行。包括 followUpQuestion 和 suggestedOptions 的 label/description 中都不允许出现任何 emoji。",
        "",
        "## 四个阶段",
        "",
        "### 阶段 1: goal（网站目标）",
        "问用户要做什么类型的网站。",
        "预设选项：",
        goalOptionsList,
        "将答案填入 productType 字段。",
        "",
        "### 阶段 2: audience（目标受众）",
        "问这个网站主要给谁看。",
        "预设选项：",
        audienceOptionsList,
        "将答案填入 audience 字段。",
        "",
        "### 阶段 3: feel（视觉感觉）",
        "根据前面的回答和知识库推荐的风格方向，生成 3-4 个视觉方向选项。",
        "重要：用户消息里会附带知识库匹配的风格数据（topStyles），你必须基于这些真实风格来描述选项，不要凭空编造。",
        "每个选项的 id 应该使用知识库推荐的风格 slug，label 用通俗语言描述该风格的视觉感觉。",
        "不要直接问'你喜欢什么风格'，而是用通俗语言描述几种具体的感觉让用户选。",
        "比如：'干净利落，大量留白，像大公司官网' 或 '有冲击力，颜色大胆抢眼' 或 '温暖亲切，圆角柔和'。",
        "每个选项用一句用户能理解的话描述，不要用'极简主义'这类专业词。",
        "将答案填入 visualTone 字段。同时将用户选择的选项对应的风格 slug 填入 styleSlug 字段（即 suggestedOptions 中对应选项的 id）。",
        "同时根据前三个回答，自动推断 mustHave 和 constraints。",
        "",
        "### 阶段 4: confirm（确认）",
        "当 productType、audience、visualTone 全部填完后，进入此阶段。",
        "设置 ready=false，phase=confirm。",
        "在 followUpQuestion 中输出一段友好的需求确认摘要，列出目前确认的所有内容。",
        "如果知识库返回了匹配的模板（matchedTemplates）和组件模式（matchedPatterns），在摘要中顺带提及：'我们知识库里有 XX 模板和 XX 组件可以直接用'。",
        "suggestedOptions 给两个选项：一个是'确认，开始生成'，一个是'我想改一下'。",
        "",
        "### 阶段 5: revise（修改）",
        "当用户在 confirm 阶段表达修改意图（如'我想改一下'、'换个方向'、'不太满意'等），进入此阶段。",
        "设置 ready=false，phase=revise。",
        "在 followUpQuestion 中问用户想修改哪个部分。",
        "suggestedOptions 列出可修改的字段，例如：",
        "  - 修改网站类型（id: revise-goal）",
        "  - 修改目标受众（id: revise-audience）",
        "  - 修改视觉方向（id: revise-feel）",
        "  - 全部重来（id: revise-all）",
        "用户选择后，回到对应的 phase（goal/audience/feel）重新收集该字段，保留其他已确认字段不变。",
        "",
        "### 阶段 6: done",
        "用户确认后（回复确认/OK/没问题 等），设置 ready=true，phase=done。",
        "确保所有字段都已填充。styleSlug 必须保留之前 feel 阶段确认的值，不要清空。",
        "",
        "## 结构化快照",
        "用户消息中会包含 confirmedSlots 字段，这是之前对话中已确认的字段结构化快照。",
        "优先使用 confirmedSlots 中的值，不要从对话文本中重新提取已确认的字段。",
        "只有当用户在当前轮明确要求修改某个字段时，才覆盖 confirmedSlots 中的对应值。",
        "",
        "## 知识上下文",
        "用户消息中可能包含 knowledgeContext 字段，这是知识库的检索结果。",
        "在 feel 阶段，基于 topStyles 生成通俗的视觉方向选项。",
        "在 confirm 阶段，如果有 matchedTemplates 和 matchedPatterns，在摘要中提及。",
        "在 goal 和 audience 阶段，可以参考知识上下文补充你的回复，但不要照搬。",
        "",
        "## 输出格式",
        "返回 JSON，不要用 markdown 包裹。",
        localeInstruction,
      ].join("\n")
    : [
        "You are StyleKit's website planning consultant. Your users are non-designers who know what kind of site they want but don't know how to describe design requirements.",
        "Your job is to guide them step by step through a friendly conversation to clarify their website direction.",
        "",
        "## Conversation Rules",
        "1. Ask only ONE question per turn. Never ask multiple questions at once.",
        "2. Every question must include 2-6 suggested options (suggestedOptions array) to help users decide quickly.",
        "3. Use plain language. If you must use a design term, immediately follow it with a simple explanation.",
        "4. Be friendly and encouraging, like a patient friend helping out, not an interrogator.",
        "5. Users may give vague or casual answers. Understand their intent and map it to structured fields.",
        "6. If the user provides a lot of information upfront (e.g., mentions both site type and audience), skip already-answered phases.",
        "7. Never use emoji, not even one. This applies to followUpQuestion, suggestedOptions labels, and descriptions.",
        "",
        "## Four Phases",
        "",
        "### Phase 1: goal (Site Goal)",
        "Ask what type of website the user wants to build.",
        "Preset options:",
        goalOptionsList,
        "Fill the answer into productType.",
        "",
        "### Phase 2: audience (Target Audience)",
        "Ask who the website is mainly for.",
        "Preset options:",
        audienceOptionsList,
        "Fill the answer into audience.",
        "",
        "### Phase 3: feel (Visual Feel)",
        "Based on previous answers AND the style directions from the knowledge base (topStyles in user message), generate 3-4 visual direction options.",
        "IMPORTANT: The user message includes matched styles from the knowledge base (topStyles). You MUST base your options on these real styles, not invent them.",
        "Each option's id should use the knowledge base style slug, and the label should describe that style's feel in plain language.",
        "Don't just ask 'what style do you like'. Instead, describe specific feelings for the user to choose from.",
        "For example: 'Clean and sharp with lots of whitespace, like a big tech company' or 'Bold and impactful with vivid colors' or 'Warm and friendly with soft rounded corners'.",
        "Each option should be described in one sentence that a non-designer can understand.",
        "Fill the answer into visualTone. Also set styleSlug to the style slug of the chosen option (i.e. the id from the suggestedOptions the user selected).",
        "Also auto-infer mustHave and constraints from the three answers so far.",
        "",
        "### Phase 4: confirm",
        "When productType, audience, and visualTone are all filled, enter this phase.",
        "Set ready=false, phase=confirm.",
        "In followUpQuestion, output a friendly confirmation summary listing everything decided so far.",
        "If the knowledge base returned matched templates (matchedTemplates) and component patterns (matchedPatterns), mention them in the summary: 'Our library has XX templates and XX components you can use directly'.",
        "suggestedOptions should have two options: one for 'Looks good, generate!' and one for 'I want to change something'.",
        "",
        "### Phase 5: revise",
        "When the user expresses intent to change something during the confirm phase (e.g., 'I want to change', 'let me adjust', 'not quite right'), enter this phase.",
        "Set ready=false, phase=revise.",
        "In followUpQuestion, ask which part the user wants to change.",
        "suggestedOptions should list the changeable fields, e.g.:",
        "  - Change site type (id: revise-goal)",
        "  - Change target audience (id: revise-audience)",
        "  - Change visual direction (id: revise-feel)",
        "  - Start over (id: revise-all)",
        "After the user selects, go back to the corresponding phase (goal/audience/feel) to re-collect that field, keeping other confirmed fields unchanged.",
        "",
        "### Phase 6: done",
        "After the user confirms (replies with OK/confirm/looks good/etc.), set ready=true, phase=done.",
        "Ensure all fields are populated. styleSlug must retain the value from the feel phase, do not clear it.",
        "",
        "## Structured Snapshot",
        "The user message includes a confirmedSlots field — a structured snapshot of previously confirmed fields.",
        "Prefer values from confirmedSlots over re-extracting from conversation text.",
        "Only override a confirmedSlots value when the user explicitly requests a change in the current turn.",
        "",
        "## Knowledge Context",
        "The user message may include a knowledgeContext field with knowledge base retrieval results.",
        "In the feel phase, generate plain-language visual direction options based on topStyles.",
        "In the confirm phase, mention matchedTemplates and matchedPatterns if available.",
        "In the goal and audience phases, reference knowledge context to enrich your response, but don't copy verbatim.",
        "",
        "## Output Format",
        "Return JSON only. Do not wrap in markdown.",
        localeInstruction,
      ].join("\n");

  const knowledgeText = formatKnowledgeForPrompt(locale, knowledge);
  const confirmedSlots = extractPlannerHistory(messages);

  return {
    system,
    user: JSON.stringify(
      {
        locale,
        previousPhase,
        confirmedSlots,
        pageContext: pageContext ?? {},
        conversation: formatConversationForPrompt(messages, locale),
        knowledgeContext: knowledgeText || undefined,
        topStyles: knowledge.topStyles.length > 0 ? knowledge.topStyles : undefined,
        matchedTemplates: knowledge.matchedTemplates.length > 0 ? knowledge.matchedTemplates : undefined,
        matchedPatterns: knowledge.matchedPatterns.length > 0 ? knowledge.matchedPatterns : undefined,
      },
      null,
      2
    ),
  };
}

/* ---------- Prompt summaries ---------- */

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

/* ---------- Decision traces ---------- */

function buildDecisionTraceForConsulting({
  locale,
  workflow,
  planner,
}: {
  locale: Locale;
  workflow: AgentWorkflowSnapshot;
  planner: AgentPlannerResult;
}): AgentDecisionTraceItem[] {
  const phaseLabel = getPhaseLabel(locale, planner.phase);

  return [
    {
      type: "workflow",
      title: localize(locale, `引导阶段：${phaseLabel}`, `Consulting Phase: ${phaseLabel}`),
      summary: localize(
        locale,
        "正在通过对话帮用户理清网站方向，还没到生成阶段。",
        "Guiding the user through a conversation to clarify their website direction. Not ready to generate yet."
      ),
      evidence: [
        localize(locale, `当前阶段：${planner.phase}`, `Current phase: ${planner.phase}`),
        localize(locale, `当前状态：${workflow.state}`, `Workflow state: ${workflow.state}`),
        planner.productType
          ? localize(locale, `已确认网站类型：${planner.productType}`, `Site type: ${planner.productType}`)
          : localize(locale, "网站类型：待确认", "Site type: pending"),
        planner.audience
          ? localize(locale, `已确认受众：${planner.audience}`, `Audience: ${planner.audience}`)
          : localize(locale, "目标受众：待确认", "Audience: pending"),
      ],
    },
    {
      type: "follow_up",
      title: localize(locale, "继续引导", "Continue Guiding"),
      summary: planner.followUpQuestion || localize(locale, "请继续回答问题。", "Please continue answering."),
      evidence: planner.suggestedOptions.length > 0
        ? planner.suggestedOptions.map((option) =>
            localize(locale, `建议选项：${option.label}`, `Suggested: ${option.label}`)
          )
        : [localize(locale, "等待用户自由输入。", "Waiting for free-form user input.")],
    },
  ];
}

function buildDecisionTraceForConfirm({
  locale,
  workflow,
  planner,
}: {
  locale: Locale;
  workflow: AgentWorkflowSnapshot;
  planner: AgentPlannerResult;
}): AgentDecisionTraceItem[] {
  return [
    {
      type: "workflow",
      title: localize(locale, "等待用户确认需求", "Awaiting User Confirmation"),
      summary: localize(
        locale,
        "所有关键信息已收集完毕，正在等用户确认后再生成提示词。",
        "All key information has been gathered. Waiting for user confirmation before generating the prompt."
      ),
      evidence: [
        localize(locale, `网站类型：${planner.productType}`, `Site type: ${planner.productType}`),
        localize(locale, `目标受众：${planner.audience}`, `Audience: ${planner.audience}`),
        localize(locale, `视觉方向：${planner.visualTone}`, `Visual direction: ${planner.visualTone}`),
        localize(locale, `当前状态：${workflow.state}`, `Workflow state: ${workflow.state}`),
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
        "用户已确认需求，agent 开始生成 AI 编码提示词。",
        "The user confirmed the brief. The agent is now generating the AI coding prompt."
      ),
      evidence: [
        localize(locale, `当前状态：${workflow.state}`, `Workflow state: ${workflow.state}`),
        localize(locale, `转移原因：${workflow.reason}`, `Transition reason: ${workflow.reason}`),
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

/* ---------- Responder prompt (for final summary) ---------- */

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

/* ---------- Fallbacks ---------- */

function inferPlannerFallback(
  locale: Locale,
  messages: AgentMessage[],
  knowledge: PhaseKnowledgeContext,
  pageContext?: AgentPageContext
): AgentPlannerResult {
  const latestUserMessage = getLatestUserMessage(messages);
  const normalizedQuery =
    latestUserMessage || localize(locale, "单页设计咨询", "single page planning brief");
  const lowerInput = `${latestUserMessage} ${pageContext?.path ?? ""}`.toLowerCase();

  const previousPhase = detectCurrentPhase(messages);

  const productType =
    latestUserMessage.includes("首页") || lowerInput.includes("landing")
      ? localize(locale, "AI agent 产品首页", "AI agent landing page")
      : latestUserMessage.includes("后台") || lowerInput.includes("dashboard")
        ? localize(locale, "产品后台", "product dashboard")
        : latestUserMessage.includes("作品") || lowerInput.includes("portfolio")
          ? localize(locale, "作品集", "portfolio")
          : localize(locale, "产品页面", "product page");

  const audience = latestUserMessage.includes("开发者")
    ? localize(locale, "开发者", "Developers")
    : latestUserMessage.includes("企业") || latestUserMessage.includes("B2B")
      ? localize(locale, "企业团队", "Enterprise teams")
      : localize(locale, "潜在客户", "Potential customers");

  const visualTone = latestUserMessage.includes("极简")
    ? localize(locale, "干净利落，留白多", "Clean and sharp with lots of whitespace")
    : latestUserMessage.includes("高级") || latestUserMessage.includes("奢华")
      ? localize(locale, "高级质感，深色调", "Premium feel with dark tones")
      : localize(locale, "专业可信，稳重大气", "Professional and trustworthy");

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

  const hasGoal = productType.length > 0 && normalizedQuery.length >= 6;
  const hasAudience = audience.length > 0;
  const hasTone = visualTone.length > 0;

  let phase: AgentConsultPhase;
  let ready: boolean;
  let followUpQuestion: string;
  let suggestedOptions: AgentSuggestedOption[];

  if (!hasGoal || previousPhase === "goal") {
    phase = "goal";
    ready = false;
    followUpQuestion = localize(
      locale,
      "你好！我来帮你规划网站方向。先告诉我，你想做一个什么类型的网站？",
      "Hi! I'm here to help you plan your website. First, what kind of site do you want to build?"
    );
    suggestedOptions = GOAL_OPTIONS[locale];
  } else if (!hasAudience || previousPhase === "audience") {
    phase = "audience";
    ready = false;
    followUpQuestion = localize(
      locale,
      "不错！那这个网站主要是给谁看的？",
      "Great! Who is this website mainly for?"
    );
    suggestedOptions = AUDIENCE_OPTIONS[locale];
  } else if (!hasTone || previousPhase === "feel") {
    phase = "feel";
    ready = false;
    followUpQuestion = localize(
      locale,
      "你希望网站给人什么感觉？",
      "What feeling should the website give visitors?"
    );
    suggestedOptions = knowledge.topStyles.length > 0
      ? knowledge.topStyles.slice(0, 4).map((s) => ({
          id: s.slug,
          label: s.name,
          description: s.description.slice(0, 60) + (s.description.length > 60 ? "..." : ""),
        }))
      : [
          { id: "clean", label: localize(locale, "干净利落", "Clean & Sharp"), description: localize(locale, "大量留白，像 Stripe 那样", "Lots of whitespace, like Stripe") },
          { id: "bold", label: localize(locale, "大胆有冲击力", "Bold & Impactful"), description: localize(locale, "颜色鲜明，视觉抢眼", "Vivid colors, eye-catching") },
          { id: "warm", label: localize(locale, "温暖亲切", "Warm & Friendly"), description: localize(locale, "圆角柔和，配色温暖", "Soft rounded corners, warm palette") },
        ];
  } else {
    phase = "done";
    ready = true;
    followUpQuestion = "";
    suggestedOptions = [];
  }

  return {
    ready,
    phase,
    normalizedQuery,
    productType: hasGoal ? productType : "",
    audience: hasAudience ? audience : "",
    visualTone: hasTone ? visualTone : "",
    styleSlug: "",
    mustHave,
    constraints,
    followUpQuestion,
    suggestedOptions,
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

/* ---------- Default greeting ---------- */

function buildGreeting(locale: Locale): {
  message: string;
  options: AgentSuggestedOption[];
} {
  return {
    message: localize(
      locale,
      "你好！我是 StyleKit 的网页策划顾问，帮你一步步理清网站方向，最后生成可以直接用的 AI 编码提示词。\n\n先告诉我，你想做一个什么类型的网站？",
      "Hi! I'm StyleKit's website planning consultant. I'll help you figure out your site direction step by step, and generate a ready-to-use AI coding prompt at the end.\n\nFirst, what kind of website do you want to build?"
    ),
    options: GOAL_OPTIONS[locale],
  };
}

/* ---------- Main orchestrator ---------- */

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
  const latestUserMsg = getLatestUserMessage(messages);
  const previousPhase = detectCurrentPhase(messages);

  /* --- Follow-up conversation: skip planner when codePrompt already exists --- */
  const existingCodePrompt = previousPhase === "done" ? getExistingCodePrompt(messages) : null;
  if (previousPhase === "done" && existingCodePrompt) {
    const lastPlanner = [...messages].reverse().find((m) => m.role === "assistant" && m.planner)?.planner;
    const followUpPrompt = buildFollowUpPrompt(locale, messages, existingCodePrompt, latestUserMsg);
    const response = await requestAgentJson({
      schema: responderSchema,
      system: followUpPrompt.system,
      user: followUpPrompt.user,
      temperature: 0.3,
    });
    const planner: AgentPlannerResult = lastPlanner ?? {
      ready: true,
      phase: "done",
      normalizedQuery: "",
      productType: "",
      audience: "",
      visualTone: "",
      styleSlug: "",
      mustHave: [],
      constraints: [],
      followUpQuestion: "",
      suggestedOptions: [],
      reasoning: [],
      context: {},
    };
    const workflow = buildWorkflowSnapshot({ messages, planner });
    return {
      assistantMessage: response.assistantMessage,
      followUpNeeded: true,
      workflowState: workflow.state,
      workflow,
      planner,
      codePrompt: null,
      toolTrace: [{ tool: "followUpConversation", ok: true, meta: { existingStyle: existingCodePrompt.styleSlug } }],
      promptSnapshot: {
        planner: { system: "", user: "", summary: ["follow-up: planner skipped"] },
        responder: { system: followUpPrompt.system, user: followUpPrompt.user, summary: ["follow-up conversation"] },
      },
      decisionTrace: [],
    };
  }

  const needsRetrieval = shouldRetrieveKnowledge(previousPhase, latestUserMsg);
  const emptyKnowledge: PhaseKnowledgeContext = {
    topStyles: [],
    matchedTemplates: [],
    matchedPatterns: [],
    matchedPromptTopics: [],
  };
  const phaseKnowledge = needsRetrieval
    ? buildPhaseKnowledgeContext(locale, messages, latestUserMsg)
    : emptyKnowledge;
  const plannerPrompt = buildPlannerPrompt(locale, messages, phaseKnowledge, pageContext);
  let plannerFallbackUsed = false;
  const planner = await requestAgentJson({
    schema: plannerSchema,
    system: plannerPrompt.system,
    user: plannerPrompt.user,
    temperature: 0.2,
    normalize: (raw) => normalizePlannerResponse(raw, latestUserMsg),
  }).catch((error) => {
    if (!DEV_AGENT_FALLBACK) {
      throw error;
    }
    warnFallback("planner", error);
    plannerFallbackUsed = true;
    return inferPlannerFallback(locale, messages, phaseKnowledge, pageContext);
  });

  /* --- Guard: force done when user confirmed but LLM still returned confirm --- */
  if (
    previousPhase === "confirm" &&
    planner.phase === "confirm" &&
    !planner.ready &&
    CONFIRMATION_PATTERNS.test(latestUserMsg.trim())
  ) {
    planner.phase = "done";
    planner.ready = true;
  }

  const workflow = buildWorkflowSnapshot({ messages, planner });
  const plannerPromptSnapshot: AgentPromptSnapshot["planner"] = {
    system: plannerPrompt.system,
    user: plannerPrompt.user,
    summary: buildPlannerPromptSummary(locale, messages, pageContext),
  };

  /* --- Consulting phases (goal, audience, feel, revise) --- */
  if (planner.phase !== "done" && planner.phase !== "confirm" && !planner.ready) {
    const decisionTrace = buildDecisionTraceForConsulting({ locale, workflow, planner });
    const consultingToolTrace: AgentToolTrace[] = needsRetrieval
      ? [{ tool: "phaseKnowledgeRetrieval", ok: true, meta: { stylesFound: phaseKnowledge.topStyles.length, templatesFound: phaseKnowledge.matchedTemplates.length } }]
      : [{ tool: "phaseKnowledgeRetrieval", ok: true, meta: { skipped: true, reason: "simple response or phase skip" } }];
    return {
      assistantMessage: planner.followUpQuestion || buildGreeting(locale).message,
      followUpNeeded: true,
      workflowState: workflow.state,
      workflow,
      planner,
      codePrompt: null,
      toolTrace: consultingToolTrace,
      promptSnapshot: {
        planner: plannerPromptSnapshot,
        responder: null,
      },
      decisionTrace,
    };
  }

  /* --- Confirm phase: show summary, wait for user to say OK --- */
  if (planner.phase === "confirm" && !planner.ready) {
    const decisionTrace = buildDecisionTraceForConfirm({ locale, workflow, planner });
    const confirmToolTrace: AgentToolTrace[] = needsRetrieval
      ? [{ tool: "phaseKnowledgeRetrieval", ok: true, meta: { stylesFound: phaseKnowledge.topStyles.length, templatesFound: phaseKnowledge.matchedTemplates.length } }]
      : [{ tool: "phaseKnowledgeRetrieval", ok: true, meta: { skipped: true } }];
    return {
      assistantMessage: planner.followUpQuestion || localize(
        locale,
        "以上就是你的网站方向摘要，确认后我就开始生成提示词。",
        "Here's your website brief summary. Confirm and I'll generate the prompt."
      ),
      followUpNeeded: true,
      workflowState: workflow.state,
      workflow,
      planner,
      codePrompt: null,
      toolTrace: confirmToolTrace,
      promptSnapshot: {
        planner: plannerPromptSnapshot,
        responder: null,
      },
      decisionTrace,
    };
  }

  /* --- Done phase: generate the final code prompt --- */
  const toolTrace: AgentToolTrace[] = [];

  if (plannerFallbackUsed) {
    toolTrace.push({
      tool: "devFallbackPlanner",
      ok: true,
      meta: { reason: "planner_schema_error" },
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

  /* --- Override style with user's confirmed choice from feel phase --- */
  const confirmedStyleSlug = planner.styleSlug && getStyleBySlug(planner.styleSlug)
    ? planner.styleSlug
    : "";
  if (confirmedStyleSlug && confirmedStyleSlug !== smartRecommendation.style.item.slug) {
    const confirmedStyle = getStyleBySlug(confirmedStyleSlug)!;
    smartRecommendation.style.item = {
      slug: confirmedStyleSlug,
      name: locale === "zh" ? confirmedStyle.name : confirmedStyle.nameEn,
      philosophy: confirmedStyle.description,
    };
    smartRecommendation.style.reasons = [
      ...smartRecommendation.style.reasons,
      localize(locale, "用户在 feel 阶段明确选择了此风格", "User explicitly selected this style during the feel phase"),
    ];
  }

  toolTrace.push({
    tool: "getSmartRecommendation",
    ok: true,
    meta: {
      topStyle: smartRecommendation.style.item.slug,
      confidence: smartRecommendation.summary.confidence,
      userOverride: confirmedStyleSlug || undefined,
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

  let designRecommendation: ReturnType<typeof getDesignRecommendation> | null = null;
  try {
    designRecommendation = getDesignRecommendation(planner.normalizedQuery, {
      stackId: "nextjs" as StackId,
      maxGuidelines: 3,
    });
    toolTrace.push({
      tool: "getDesignRecommendation",
      ok: true,
      meta: {
        productType: designRecommendation.productType,
        hasColors: Boolean(designRecommendation.colors),
        hasTypography: Boolean(designRecommendation.typography),
        hasLandingPattern: Boolean(designRecommendation.landingPattern),
        uxGuidelineCount: designRecommendation.uxGuidelines.length,
      },
    });
  } catch {
    toolTrace.push({ tool: "getDesignRecommendation", ok: false });
  }

  const codePrompt = buildAgentCodePrompt({
    locale,
    planner,
    smartRecommendation,
    projectKnowledge,
    designRecommendation,
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

  const response = await requestAgentJson({
    schema: responderSchema,
    system: responderPrompt.system,
    user: responderPrompt.user,
    temperature: 0.3,
  }).catch((error) => {
    if (!DEV_AGENT_FALLBACK) {
      throw error;
    }
    warnFallback("runAgentTurn responder", error);
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

/* ---------- Streaming orchestrator (done-phase only) ---------- */

export type AgentTurnStreamingResult =
  | {
      streaming: false;
      assistantMessage: string;
      followUpNeeded: boolean;
      workflowState: AgentWorkflowSnapshot["state"];
      workflow: AgentWorkflowSnapshot;
      planner: AgentPlannerResult;
      codePrompt: AgentCodePrompt | null;
      suggestedOptions: AgentSuggestedOption[];
      toolTrace: AgentToolTrace[];
      promptSnapshot: AgentPromptSnapshot;
      decisionTrace: AgentDecisionTraceItem[];
    }
  | {
      streaming: true;
      stream: ReadableStream<string>;
      followUpNeeded: false;
      workflowState: AgentWorkflowSnapshot["state"];
      workflow: AgentWorkflowSnapshot;
      planner: AgentPlannerResult;
      codePrompt: AgentCodePrompt;
      suggestedOptions: AgentSuggestedOption[];
      toolTrace: AgentToolTrace[];
      promptSnapshot: AgentPromptSnapshot;
      decisionTrace: AgentDecisionTraceItem[];
    };

export async function runAgentTurnStreaming({
  locale,
  messages,
  pageContext,
}: {
  locale: Locale;
  messages: AgentMessage[];
  pageContext?: AgentPageContext;
}): Promise<AgentTurnStreamingResult> {
  const latestUserMsg = getLatestUserMessage(messages);
  const previousPhase = detectCurrentPhase(messages);

  /* --- Follow-up conversation: skip planner when codePrompt already exists --- */
  const existingCodePrompt = previousPhase === "done" ? getExistingCodePrompt(messages) : null;
  if (previousPhase === "done" && existingCodePrompt) {
    const lastPlanner = [...messages].reverse().find((m) => m.role === "assistant" && m.planner)?.planner;
    const followUpPrompt = buildFollowUpPrompt(locale, messages, existingCodePrompt, latestUserMsg);
    const response = await requestAgentJson({
      schema: responderSchema,
      system: followUpPrompt.system,
      user: followUpPrompt.user,
      temperature: 0.3,
    });
    const planner: AgentPlannerResult = lastPlanner ?? {
      ready: true,
      phase: "done",
      normalizedQuery: "",
      productType: "",
      audience: "",
      visualTone: "",
      styleSlug: "",
      mustHave: [],
      constraints: [],
      followUpQuestion: "",
      suggestedOptions: [],
      reasoning: [],
      context: {},
    };
    const workflow = buildWorkflowSnapshot({ messages, planner });
    return {
      streaming: false,
      assistantMessage: response.assistantMessage,
      followUpNeeded: true,
      workflowState: workflow.state,
      workflow,
      planner,
      codePrompt: null,
      suggestedOptions: [],
      toolTrace: [{ tool: "followUpConversation", ok: true, meta: { existingStyle: existingCodePrompt.styleSlug } }],
      promptSnapshot: {
        planner: { system: "", user: "", summary: ["follow-up: planner skipped"] },
        responder: { system: followUpPrompt.system, user: followUpPrompt.user, summary: ["follow-up conversation"] },
      },
      decisionTrace: [],
    };
  }

  const needsRetrieval = shouldRetrieveKnowledge(previousPhase, latestUserMsg);
  const emptyKnowledge: PhaseKnowledgeContext = {
    topStyles: [],
    matchedTemplates: [],
    matchedPatterns: [],
    matchedPromptTopics: [],
  };
  const phaseKnowledge = needsRetrieval
    ? buildPhaseKnowledgeContext(locale, messages, latestUserMsg)
    : emptyKnowledge;
  const plannerPrompt = buildPlannerPrompt(locale, messages, phaseKnowledge, pageContext);
  let plannerFallbackUsed = false;
  const planner = await requestAgentJson({
    schema: plannerSchema,
    system: plannerPrompt.system,
    user: plannerPrompt.user,
    temperature: 0.2,
    normalize: (raw) => normalizePlannerResponse(raw, latestUserMsg),
  }).catch((error) => {
    if (!DEV_AGENT_FALLBACK) {
      throw error;
    }
    warnFallback("planner", error);
    plannerFallbackUsed = true;
    return inferPlannerFallback(locale, messages, phaseKnowledge, pageContext);
  });

  /* --- Guard: force done when user confirmed but LLM still returned confirm --- */
  if (
    previousPhase === "confirm" &&
    planner.phase === "confirm" &&
    !planner.ready &&
    CONFIRMATION_PATTERNS.test(latestUserMsg.trim())
  ) {
    planner.phase = "done";
    planner.ready = true;
  }

  const workflow = buildWorkflowSnapshot({ messages, planner });
  const plannerPromptSnapshot: AgentPromptSnapshot["planner"] = {
    system: plannerPrompt.system,
    user: plannerPrompt.user,
    summary: buildPlannerPromptSummary(locale, messages, pageContext),
  };

  /* --- Consulting phases — return non-streaming --- */
  if (planner.phase !== "done" && planner.phase !== "confirm" && !planner.ready) {
    const decisionTrace = buildDecisionTraceForConsulting({ locale, workflow, planner });
    const consultingToolTrace: AgentToolTrace[] = needsRetrieval
      ? [{ tool: "phaseKnowledgeRetrieval", ok: true, meta: { stylesFound: phaseKnowledge.topStyles.length, templatesFound: phaseKnowledge.matchedTemplates.length } }]
      : [{ tool: "phaseKnowledgeRetrieval", ok: true, meta: { skipped: true, reason: "simple response or phase skip" } }];
    return {
      streaming: false,
      assistantMessage: planner.followUpQuestion || buildGreeting(locale).message,
      followUpNeeded: true,
      workflowState: workflow.state,
      workflow,
      planner,
      codePrompt: null,
      suggestedOptions: planner.suggestedOptions,
      toolTrace: consultingToolTrace,
      promptSnapshot: {
        planner: plannerPromptSnapshot,
        responder: null,
      },
      decisionTrace,
    };
  }

  /* --- Confirm phase — return non-streaming --- */
  if (planner.phase === "confirm" && !planner.ready) {
    const decisionTrace = buildDecisionTraceForConfirm({ locale, workflow, planner });
    const confirmToolTrace: AgentToolTrace[] = needsRetrieval
      ? [{ tool: "phaseKnowledgeRetrieval", ok: true, meta: { stylesFound: phaseKnowledge.topStyles.length, templatesFound: phaseKnowledge.matchedTemplates.length } }]
      : [{ tool: "phaseKnowledgeRetrieval", ok: true, meta: { skipped: true } }];
    return {
      streaming: false,
      assistantMessage: planner.followUpQuestion || localize(
        locale,
        "以上就是你的网站方向摘要，确认后我就开始生成提示词。",
        "Here's your website brief summary. Confirm and I'll generate the prompt."
      ),
      followUpNeeded: true,
      workflowState: workflow.state,
      workflow,
      planner,
      codePrompt: null,
      suggestedOptions: planner.suggestedOptions,
      toolTrace: confirmToolTrace,
      promptSnapshot: {
        planner: plannerPromptSnapshot,
        responder: null,
      },
      decisionTrace,
    };
  }

  /* --- Done phase: knowledge retrieval + code prompt + stream responder --- */
  const toolTrace: AgentToolTrace[] = [];

  if (plannerFallbackUsed) {
    toolTrace.push({
      tool: "devFallbackPlanner",
      ok: true,
      meta: { reason: "planner_schema_error" },
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

  /* --- Override style with user's confirmed choice from feel phase --- */
  const confirmedStyleSlug = planner.styleSlug && getStyleBySlug(planner.styleSlug)
    ? planner.styleSlug
    : "";
  if (confirmedStyleSlug && confirmedStyleSlug !== smartRecommendation.style.item.slug) {
    const confirmedStyle = getStyleBySlug(confirmedStyleSlug)!;
    smartRecommendation.style.item = {
      slug: confirmedStyleSlug,
      name: locale === "zh" ? confirmedStyle.name : confirmedStyle.nameEn,
      philosophy: confirmedStyle.description,
    };
    smartRecommendation.style.reasons = [
      ...smartRecommendation.style.reasons,
      localize(locale, "用户在 feel 阶段明确选择了此风格", "User explicitly selected this style during the feel phase"),
    ];
  }

  toolTrace.push({
    tool: "getSmartRecommendation",
    ok: true,
    meta: {
      topStyle: smartRecommendation.style.item.slug,
      confidence: smartRecommendation.summary.confidence,
      userOverride: confirmedStyleSlug || undefined,
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

  let designRecommendation: ReturnType<typeof getDesignRecommendation> | null = null;
  try {
    designRecommendation = getDesignRecommendation(planner.normalizedQuery, {
      stackId: "nextjs" as StackId,
      maxGuidelines: 3,
    });
    toolTrace.push({
      tool: "getDesignRecommendation",
      ok: true,
      meta: {
        productType: designRecommendation.productType,
        hasColors: Boolean(designRecommendation.colors),
        hasTypography: Boolean(designRecommendation.typography),
        hasLandingPattern: Boolean(designRecommendation.landingPattern),
        uxGuidelineCount: designRecommendation.uxGuidelines.length,
      },
    });
  } catch {
    toolTrace.push({ tool: "getDesignRecommendation", ok: false });
  }

  const codePrompt = buildAgentCodePrompt({
    locale,
    planner,
    smartRecommendation,
    projectKnowledge,
    designRecommendation,
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

  const decisionTrace = buildDecisionTraceForPlan({
    locale,
    workflow,
    codePrompt,
    toolTrace,
    smartRecommendation,
  });

  const promptSnapshot: AgentPromptSnapshot = {
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
  };

  /* Try streaming the responder, fall back in dev mode */
  try {
    const stream = await requestAgentStream({
      system: responderPrompt.system,
      user: responderPrompt.user,
      temperature: 0.3,
    });

    return {
      streaming: true,
      stream,
      followUpNeeded: false,
      workflowState: workflow.state,
      workflow,
      planner,
      codePrompt,
      suggestedOptions: [],
      toolTrace,
      promptSnapshot,
      decisionTrace,
    };
  } catch (error) {
    if (!DEV_AGENT_FALLBACK) {
      throw error;
    }
    warnFallback("runAgentTurnStreaming responder", error);
    toolTrace.push({
      tool: "devFallbackResponder",
      ok: true,
      meta: {
        reason: error instanceof AgentProviderError ? error.code : "responder_stream_error",
      },
    });
    const fallback = buildResponderFallback({ locale, codePrompt });
    return {
      streaming: false,
      assistantMessage: fallback.assistantMessage,
      followUpNeeded: false,
      workflowState: workflow.state,
      workflow,
      planner,
      codePrompt,
      suggestedOptions: [],
      toolTrace,
      promptSnapshot,
      decisionTrace,
    };
  }
}
