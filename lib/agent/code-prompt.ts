import type { Locale } from "@/lib/i18n/translations";
import type { SmartRecommendation, DesignRecommendation } from "@/lib/knowledge";
import { getStyleMetaBySlug } from "@/lib/styles/meta";
import { getStyleBySlug } from "@/lib/styles";
import { buildStyleCopyIdentity } from "@/lib/styles/style-copy-identity";
import {
  inferTemplateType,
  getLocalizedTemplateTypeLabel,
} from "./recommendations";
import type { AgentCodePrompt, AgentPlannerResult } from "./types";
import type { AgentProjectKnowledgeContext } from "./project-knowledge";
import type { DesignStyle, ExamplePrompt } from "@/lib/styles";

function getStyleName(styleSlug: string, locale: Locale): string {
  const meta = getStyleMetaBySlug(styleSlug);
  if (meta) {
    return locale === "zh" ? meta.name : meta.nameEn;
  }

  const style = getStyleBySlug(styleSlug);
  if (style) {
    return locale === "zh" ? style.name : style.nameEn;
  }

  return styleSlug;
}

function localize(locale: Locale, zh: string, en: string): string {
  return locale === "zh" ? zh : en;
}

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9\u4e00-\u9fa5]+/)
    .filter((token) => token.length >= 2);
}

function scoreOverlap(queryTokens: string[], text: string): number {
  if (queryTokens.length === 0) return 0;

  const haystack = text.toLowerCase();
  return queryTokens.reduce((score, token) => {
    if (!haystack.includes(token)) return score;
    return score + (token.length >= 5 ? 3 : 2);
  }, 0);
}

function pickPrimaryGoal(locale: Locale, planner: AgentPlannerResult): string {
  const normalized = `${planner.normalizedQuery} ${planner.constraints.join(" ")}`.toLowerCase();

  if (normalized.includes("转化") || normalized.includes("cta") || normalized.includes("signup")) {
    return localize(locale, "推动用户完成主要转化动作", "Drive the primary conversion action");
  }

  if (normalized.includes("作品集") || normalized.includes("portfolio")) {
    return localize(locale, "突出作品质量并建立专业可信度", "Showcase work quality and build credibility");
  }

  if (normalized.includes("dashboard") || normalized.includes("后台") || normalized.includes("admin")) {
    return localize(locale, "让高密度信息仍然清晰、可扫描、可操作", "Keep dense information readable, scannable, and actionable");
  }

  return localize(locale, "清晰传达产品价值并建立可信度", "Communicate the product value clearly and build trust");
}

function buildBriefSection(
  locale: Locale,
  pageType: string,
  audience: string,
  planner: AgentPlannerResult,
  templateLabel: string
): string {
  const lines = [
    `- ${localize(locale, "页面类型", "Page type")}: ${pageType}`,
    `- ${localize(locale, "目标用户", "Audience")}: ${audience}`,
    `- ${localize(locale, "模板方向", "Template direction")}: ${templateLabel}`,
    `- ${localize(locale, "页面目标", "Primary goal")}: ${pickPrimaryGoal(locale, planner)}`,
  ];

  if (planner.visualTone.trim()) {
    lines.push(`- ${localize(locale, "期望气质", "Desired tone")}: ${planner.visualTone}`);
  }

  return lines.join("\n");
}

function pickBestExamplePrompt(
  locale: Locale,
  style: DesignStyle | undefined,
  planner: AgentPlannerResult,
  templateLabel: string,
  pageType: string
): ExamplePrompt | null {
  if (!style?.examplePrompts?.length) {
    return null;
  }

  const queryTokens = tokenize(
    [
      planner.normalizedQuery,
      planner.productType,
      planner.audience,
      planner.visualTone,
      templateLabel,
      pageType,
      planner.mustHave.join(" "),
      planner.constraints.join(" "),
    ]
      .filter(Boolean)
      .join(" ")
  );

  return (
    style.examplePrompts
      .map((prompt) => {
        const title = locale === "zh" ? prompt.title : prompt.titleEn;
        const description = locale === "zh" ? prompt.description : prompt.descriptionEn;
        const content = locale === "en" && prompt.promptEn ? prompt.promptEn : prompt.prompt;

        return {
          prompt,
          score:
            scoreOverlap(queryTokens, `${title} ${description} ${content}`) +
            (content.toLowerCase().includes(templateLabel.toLowerCase()) ? 4 : 0),
        };
      })
      .sort((left, right) => right.score - left.score)[0]?.prompt ?? null
  );
}

function getFallbackSections(templateType: string): string[] {
  const catalog: Record<string, string[]> = {
    landing: ["Hero", "Value Props", "Social Proof", "CTA"],
    dashboard: ["Header Summary", "KPI Row", "Primary Work Area", "Detailed Breakdown"],
    blog: ["Hero", "Featured Stories", "Article Feed", "Newsletter CTA"],
    portfolio: ["Hero", "Selected Work", "Process", "Contact CTA"],
    saas: ["Hero", "Feature Grid", "Use Cases", "Pricing", "CTA"],
    ecommerce: ["Hero", "Product Highlights", "Trust Signals", "Purchase CTA"],
    admin: ["Header Summary", "Filters", "Primary Table", "Detail Panel"],
    docs: ["Hero", "Quick Start", "Reference Sections", "CTA"],
    messaging: ["Hero", "Conversation Preview", "Trust Signals", "Primary CTA"],
    education: ["Hero", "Outcomes", "Curriculum", "Enrollment CTA"],
  };

  return catalog[templateType] ?? catalog.landing;
}

function buildSectionPlan(
  locale: Locale,
  templateType: string,
  smartRecommendation: SmartRecommendation
): string {
  const sections =
    smartRecommendation.landingPattern?.item.sectionOrder?.slice(0, 6) ??
    getFallbackSections(templateType);

  return sections
    .slice(0, 6)
    .map((section, index) => `${index + 1}. ${section}`)
    .join("\n");
}

function buildRequirementsSection(locale: Locale, planner: AgentPlannerResult): string {
  const lines: string[] = [];

  if (planner.mustHave.length > 0) {
    lines.push(...planner.mustHave.slice(0, 5).map((item) => `- ${localize(locale, "必须包含", "Must include")}: ${item}`));
  }

  if (planner.constraints.length > 0) {
    lines.push(...planner.constraints.slice(0, 5).map((item) => `- ${localize(locale, "约束条件", "Constraint")}: ${item}`));
  }

  if (planner.context.primaryDevice === "mobile") {
    lines.push(`- ${localize(locale, "移动端优先，交互目标尺寸不能过小", "Mobile-first with touch-safe targets")}`);
  }

  if (planner.context.accessibilityPriority) {
    lines.push(`- ${localize(locale, "确保对比度、焦点态和语义化结构达标", "Ensure contrast, focus states, and semantic structure are solid")}`);
  }

  if (planner.context.performancePriority) {
    lines.push(`- ${localize(locale, "避免高成本视觉效果，优先稳定渲染", "Avoid expensive visual effects and keep rendering stable")}`);
  }

  if (lines.length === 0) {
    lines.push(`- ${localize(locale, "保持清晰的信息层级、响应式布局和明确 CTA", "Keep hierarchy clear, layout responsive, and CTA obvious")}`);
  }

  return lines.join("\n");
}

function buildImplementationSection(
  locale: Locale,
  projectKnowledge: AgentProjectKnowledgeContext
): string {
  const patternItems = projectKnowledge.items.filter((item) => item.type === "componentPattern");
  const templateItems = projectKnowledge.items.filter((item) => item.type === "templateExample");
  const reactItems = projectKnowledge.items.filter((item) => item.type === "reactGuideline");
  const webItems = projectKnowledge.items.filter((item) => item.type === "webGuideline");

  const lines = [
    `- ${localize(locale, "使用 React + Tailwind CSS v4", "Use React + Tailwind CSS v4")}`,
    `- ${localize(locale, "导出单个默认函数组件", "Export a single default function component")}`,
    `- ${localize(locale, "代码必须可直接用于生产，不要写 demo 感很强的占位实现", "Make it production-ready, not a throwaway demo")}`,
    `- ${localize(locale, "使用语义化 HTML，并补齐必要的 ARIA 属性", "Use semantic HTML with necessary ARIA attributes")}`,
    `- ${localize(locale, "文案要像真实产品页面，不要出现 lorem ipsum 或教学口吻", "Use realistic product copy, not lorem ipsum or tutorial copy")}`,
  ];

  if (templateItems.length > 0) {
    lines.push(
      `- ${localize(locale, "可参考这些现有模板的组织方式", "You can borrow structure from these existing templates")}: ${templateItems
        .slice(0, 2)
        .map((item) => item.title)
        .join(locale === "zh" ? "、" : ", ")}`
    );
  }

  if (patternItems.length > 0) {
    lines.push(
      `- ${localize(locale, "优先使用这些界面模式", "Prefer these UI patterns")}: ${patternItems
        .slice(0, 3)
        .map((item) => item.title)
        .join(locale === "zh" ? "、" : ", ")}`
    );
  }

  if (webItems.length > 0) {
    lines.push(
      ...webItems.slice(0, 2).map((item) => `- ${localize(locale, "可用性要求", "Usability note")}: ${item.title}`)
    );
  }

  if (reactItems.length > 0) {
    lines.push(
      ...reactItems.slice(0, 2).map((item) => `- ${localize(locale, "实现注意", "Implementation note")}: ${item.title}`)
    );
  }

  return lines.join("\n");
}

function buildReferenceExampleSection(
  locale: Locale,
  examplePrompt: ExamplePrompt | null
): string {
  if (!examplePrompt) {
    return localize(
      locale,
      "- 没有完全匹配的内置示例 prompt，请根据上面的需求自行组织页面。",
      "- There is no perfect built-in example prompt for this case, so organize the page from the brief above."
    );
  }

  const title = locale === "zh" ? examplePrompt.title : examplePrompt.titleEn;
  const description = locale === "zh" ? examplePrompt.description : examplePrompt.descriptionEn;
  const prompt = locale === "en" && examplePrompt.promptEn ? examplePrompt.promptEn : examplePrompt.prompt;

  return [
    `- ${localize(locale, "参考示例", "Reference example")}: ${title}`,
    `- ${localize(locale, "说明", "Why this is relevant")}: ${description}`,
    `- ${localize(locale, "用法", "How to use it")}: ${localize(
      locale,
      "只把它当作结构和语气参考，优先服从当前需求，不要原样照搬。",
      "Use it as structural and tonal inspiration only. Follow the current brief first instead of copying it literally."
    )}`,
    "",
    prompt,
  ].join("\n");
}

function buildMotionDirectionSection(locale: Locale, styleSlug: string): string {
  const style = getStyleBySlug(styleSlug);
  if (!style) {
    return "";
  }

  const cues: string[] = [];
  const rules = locale === "en" ? (style.aiRulesEn || style.aiRules) : style.aiRules;
  const rulesLower = rules.toLowerCase();
  const cssLower = style.globalCss.toLowerCase();

  const hasKeyframes = cssLower.includes("@keyframes");
  const hasTransitions = rulesLower.includes("transition") || rulesLower.includes("duration-");
  const hasHoverScale = rulesLower.includes("hover:scale") || rulesLower.includes("hover:-translate-y");
  const hasReducedMotion = rulesLower.includes("prefers-reduced-motion");
  const hasForbiddenMotion = rulesLower.includes("forbidden") || rulesLower.includes("zero") && (rulesLower.includes("scale") || rulesLower.includes("translate"));
  const isSlowPace = rulesLower.includes("duration-500") || rulesLower.includes("duration-700") || rulesLower.includes("duration-1000");
  const isFastPace = rulesLower.includes("duration-100") || rulesLower.includes("duration-150") || rulesLower.includes("duration-200");

  if (hasKeyframes) {
    cues.push(localize(locale, "包含自定义关键帧动画", "Includes custom keyframe animations"));
  }

  if (hasForbiddenMotion) {
    cues.push(localize(locale, "严格限制位移和缩放动画", "Strictly restricts translate and scale animations"));
  } else if (hasHoverScale) {
    cues.push(localize(locale, "悬停交互带有微妙的缩放或位移效果", "Hover interactions include subtle scale or translate effects"));
  }

  if (isSlowPace) {
    cues.push(localize(locale, "动效节奏偏慢，营造沉稳氛围", "Slow-paced transitions for a calm, grounded feel"));
  } else if (isFastPace) {
    cues.push(localize(locale, "动效节奏快捷利落", "Quick, crisp transitions"));
  }

  if (hasTransitions && !hasKeyframes && !hasHoverScale) {
    cues.push(localize(locale, "仅使用基础过渡效果，无复杂动画", "Basic transitions only, no complex animations"));
  }

  if (hasReducedMotion) {
    cues.push(localize(locale, "尊重 prefers-reduced-motion 设置", "Respects prefers-reduced-motion"));
  }

  if (cues.length === 0) {
    cues.push(localize(locale, "使用微妙的入场过渡，避免滚动触发动画", "Subtle entrance transitions, no scroll-triggered animations"));
    cues.push(localize(locale, "所有动效应尊重 prefers-reduced-motion", "All motion should respect prefers-reduced-motion"));
  }

  return cues.map((c) => `- ${c}`).join("\n");
}

function buildStyleRulesBlock(locale: Locale, styleSlug: string): string {
  const style = getStyleBySlug(styleSlug);
  if (!style) {
    return "";
  }

  const styleName = locale === "zh" ? style.name : style.nameEn;
  const identity = buildStyleCopyIdentity({ styleName, styleSlug });
  const rules = locale === "en" ? (style.aiRulesEn || style.aiRules) : style.aiRules;
  const separator = localize(
    locale,
    `以上是具体页面需求，以下是 ${styleName} 风格的设计规则，请严格遵守，禁止风格漂移：`,
    `The requirements above define the page. The rules below define the ${styleName} style system. Follow them strictly with no style drift:`
  );

  return [identity, "", separator, "", rules.trim()].join("\n");
}

function buildDesignRecommendationSection(
  locale: Locale,
  designRec: DesignRecommendation | null
): string {
  if (!designRec) {
    return "";
  }

  const lines: string[] = [];

  if (designRec.colors) {
    lines.push(
      `- ${localize(locale, "推荐色彩方案", "Recommended color palette")}: ` +
      `primary=${designRec.colors.primary}, secondary=${designRec.colors.secondary}, ` +
      `CTA=${designRec.colors.cta}, bg=${designRec.colors.background}`
    );
  }

  if (designRec.typography) {
    lines.push(
      `- ${localize(locale, "推荐字体配对", "Recommended font pairing")}: ` +
      `${designRec.typography.headingFont} + ${designRec.typography.bodyFont} (${designRec.typography.category})`
    );
    if (designRec.typography.googleFontsUrl) {
      lines.push(`  Google Fonts: ${designRec.typography.googleFontsUrl}`);
    }
  }

  if (designRec.landingPattern) {
    lines.push(
      `- ${localize(locale, "推荐页面模式", "Recommended page pattern")}: ${designRec.landingPattern.name}`
    );
    if (designRec.landingPattern.sectionOrder.length > 0) {
      lines.push(
        `  ${localize(locale, "建议板块顺序", "Suggested section order")}: ${designRec.landingPattern.sectionOrder.slice(0, 6).join(" -> ")}`
      );
    }
  }

  if (designRec.uxGuidelines.length > 0) {
    lines.push(`- ${localize(locale, "关键 UX 指南", "Key UX guidelines")}:`);
    for (const ux of designRec.uxGuidelines.slice(0, 3)) {
      lines.push(`  - ${ux.issue}: ${ux.do}`);
    }
  }

  return lines.length > 0 ? lines.join("\n") : "";
}

export function buildAgentCodePrompt({
  locale,
  planner,
  smartRecommendation,
  projectKnowledge,
  designRecommendation,
}: {
  locale: Locale;
  planner: AgentPlannerResult;
  smartRecommendation: SmartRecommendation;
  projectKnowledge: AgentProjectKnowledgeContext;
  designRecommendation?: DesignRecommendation | null;
}): AgentCodePrompt {
  const styleSlug = smartRecommendation.style.item.slug;
  const style = getStyleBySlug(styleSlug);
  const styleName = getStyleName(styleSlug, locale);
  const templateType = inferTemplateType(planner.normalizedQuery);
  const templateLabel = getLocalizedTemplateTypeLabel(locale, templateType);
  const pageType = planner.productType || planner.normalizedQuery;
  const audience = planner.audience || localize(locale, "目标用户", "target audience");
  const title = `${templateLabel} - ${styleName}`;
  const examplePrompt = pickBestExamplePrompt(locale, style, planner, templateLabel, pageType);

  const prompt = [
    buildStyleCopyIdentity({ styleName, styleSlug }),
    "",
    localize(
      locale,
      `请基于以下需求，为我生成一个可直接落地的 React 页面实现。`,
      "Generate a production-ready React page implementation from the brief below."
    ),
    "",
    `## ${localize(locale, "任务概述", "Build Brief")}`,
    buildBriefSection(locale, pageType, audience, planner, templateLabel),
    "",
    `## ${localize(locale, "页面结构", "Section Plan")}`,
    buildSectionPlan(locale, templateType, smartRecommendation),
    "",
    `## ${localize(locale, "功能与内容要求", "Feature & Content Requirements")}`,
    buildRequirementsSection(locale, planner),
    "",
    `## ${localize(locale, "实现要求", "Implementation Requirements")}`,
    buildImplementationSection(locale, projectKnowledge),
    "",
    designRecommendation ? `## ${localize(locale, "设计推荐参考", "Design Recommendations")}` : "",
    designRecommendation ? buildDesignRecommendationSection(locale, designRecommendation) : "",
    "",
    `## ${localize(locale, "参考示例 Prompt", "Reference Example Prompt")}`,
    buildReferenceExampleSection(locale, examplePrompt),
    "",
    `## ${localize(locale, "动效方向", "Motion Direction")}`,
    buildMotionDirectionSection(locale, styleSlug),
    "",
    `## ${localize(locale, "输出要求", "Output Contract")}`,
    localize(
      locale,
      [
        "- 输出完整组件代码，不要解释过程，不要写分析。",
        "- 不要输出设计分析、不要输出额外说明、不要输出伪代码。",
        "- 如果需要示例数据，请给出真实感较强的占位内容。",
        "- 最终结果必须同时满足页面需求和下面的风格规则。",
        "- 如果页面需求与参考示例冲突，以当前页面需求为准。",
      ].join("\n"),
      [
        "- Output the full component code directly, with no analysis or process explanation.",
        "- Do not include design analysis, extra commentary, or pseudocode.",
        "- If mock data is needed, use realistic placeholder content.",
        "- The final result must satisfy both the page requirements and the style rules below.",
        "- If the current brief conflicts with the reference example, prioritize the current brief.",
      ].join("\n")
    ),
    "",
    "---",
    "",
    buildStyleRulesBlock(locale, styleSlug),
  ]
    .filter(Boolean)
    .join("\n");

  return {
    title,
    prompt,
    styleName,
    styleSlug,
    templateType: templateLabel,
  };
}
