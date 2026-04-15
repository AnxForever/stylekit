import type { Locale } from "@/lib/i18n/translations";
import type { SmartRecommendation } from "@/lib/knowledge";
import { getStyleMetaBySlug } from "@/lib/styles/meta";
import { getStyleBySlug } from "@/lib/styles";
import {
  inferTemplateType,
  getLocalizedTemplateTypeLabel,
} from "./recommendations";
import type { AgentCodePrompt, AgentPlannerResult } from "./types";
import type { AgentProjectKnowledgeContext } from "./project-knowledge";

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

function buildVisualStyleSection(
  locale: Locale,
  styleName: string,
  smartRecommendation: SmartRecommendation,
  projectKnowledge: AgentProjectKnowledgeContext
): string {
  const reasons = smartRecommendation.style.reasons.slice(0, 2);
  const recipeItems = projectKnowledge.items.filter((item) => item.type === "recipe");
  const stylePromptItems = projectKnowledge.items.filter((item) => item.type === "stylePrompt");

  const lines: string[] = [
    localize(
      locale,
      `使用 ${styleName} 作为主视觉方向。`,
      `Use ${styleName} as the primary visual direction.`
    ),
  ];

  if (reasons.length > 0) {
    lines.push(
      localize(locale, "选择理由：", "Selection rationale:"),
      ...reasons.map((reason) => `- ${reason}`)
    );
  }

  if (stylePromptItems.length > 0) {
    lines.push(
      "",
      localize(locale, "风格提示词参考：", "Style prompt references:")
    );
    for (const item of stylePromptItems) {
      lines.push(`- ${item.title}: ${item.summary}`);
    }
  }

  if (recipeItems.length > 0) {
    lines.push(
      "",
      localize(locale, "组件配方：", "Component recipes:")
    );
    for (const item of recipeItems) {
      lines.push(`- ${item.title}: ${item.summary}`);
    }
  }

  return lines.join("\n");
}

function buildPageStructureSection(
  locale: Locale,
  templateType: string,
  smartRecommendation: SmartRecommendation
): string {
  const source = smartRecommendation.landingPattern?.item.sectionOrder;
  const sections = source && source.length > 0
    ? source.slice(0, 6)
    : getFallbackSections(templateType);

  const lines: string[] = [
    localize(
      locale,
      "按以下顺序组织页面区块：",
      "Organize the page with these sections in order:"
    ),
    ...sections.map((section, index) => `${index + 1}. ${section}`),
  ];

  return lines.join("\n");
}

function getFallbackSections(templateType: string): string[] {
  const catalog: Record<string, string[]> = {
    landing: ["Hero", "Core Features", "Social Proof", "CTA"],
    dashboard: ["Header Summary", "Primary KPIs", "Core Work Area", "Detailed Breakdown"],
    blog: ["Hero", "Featured Stories", "Article Feed", "Newsletter CTA"],
    portfolio: ["Hero", "Selected Work", "Process", "Contact CTA"],
    saas: ["Hero", "Feature Grid", "Use Cases", "Pricing CTA"],
    ecommerce: ["Hero", "Product Highlights", "Trust Signals", "Purchase CTA"],
    admin: ["Header Summary", "Primary Table", "Filters & Actions", "Detail Drawer"],
    docs: ["Hero", "Quick Start", "Reference Sections", "CTA"],
    messaging: ["Hero", "Conversation Preview", "Trust Signals", "Primary CTA"],
    education: ["Hero", "Course Outcomes", "Curriculum Overview", "Enrollment CTA"],
  };

  return catalog[templateType] ?? catalog.landing;
}

function buildComponentPatternsSection(
  locale: Locale,
  projectKnowledge: AgentProjectKnowledgeContext
): string {
  const templateItems = projectKnowledge.items.filter((item) => item.type === "templateExample");
  const patternItems = projectKnowledge.items.filter((item) => item.type === "componentPattern");
  const promptItems = projectKnowledge.items.filter((item) => item.type === "promptTopic");

  const lines: string[] = [];

  if (templateItems.length > 0) {
    lines.push(localize(locale, "模板参考：", "Template references:"));
    for (const item of templateItems) {
      lines.push(`- ${item.title}: ${item.summary}`);
    }
  }

  if (patternItems.length > 0) {
    if (lines.length > 0) lines.push("");
    lines.push(localize(locale, "组件模式：", "Component patterns:"));
    for (const item of patternItems) {
      lines.push(`- ${item.title}: ${item.summary}`);
    }
  }

  if (promptItems.length > 0) {
    if (lines.length > 0) lines.push("");
    lines.push(localize(locale, "提示词主题：", "Prompt topics:"));
    for (const item of promptItems) {
      lines.push(`- ${item.title}: ${item.summary}`);
    }
  }

  if (lines.length === 0) {
    lines.push(
      localize(
        locale,
        "使用标准的 React 组件拆分最佳实践。",
        "Use standard React component decomposition best practices."
      )
    );
  }

  return lines.join("\n");
}

function buildConstraintsSection(
  locale: Locale,
  planner: AgentPlannerResult
): string {
  const constraints = [...planner.constraints];

  if (planner.context.accessibilityPriority) {
    constraints.push(localize(locale, "优先保证可访问性与对比度", "Prioritize accessibility and contrast"));
  }
  if (planner.context.performancePriority) {
    constraints.push(localize(locale, "控制视觉效果成本，保持轻量", "Keep visual effects lightweight"));
  }
  if (planner.context.primaryDevice === "mobile") {
    constraints.push(localize(locale, "移动端优先布局", "Mobile-first layout"));
  }
  if (planner.context.darkModePreferred) {
    constraints.push(localize(locale, "深色模式优先", "Dark mode preferred"));
  }

  if (planner.mustHave.length > 0) {
    constraints.push(
      localize(
        locale,
        `必须包含：${planner.mustHave.join("、")}`,
        `Must include: ${planner.mustHave.join(", ")}`
      )
    );
  }

  if (constraints.length === 0) {
    return localize(
      locale,
      "没有额外约束，保持标准的响应式和可访问性最佳实践。",
      "No extra constraints. Follow standard responsive and accessibility best practices."
    );
  }

  return constraints.map((constraint) => `- ${constraint}`).join("\n");
}

function buildGuidelinesSection(
  locale: Locale,
  projectKnowledge: AgentProjectKnowledgeContext
): string {
  const webItems = projectKnowledge.items.filter((item) => item.type === "webGuideline");
  const reactItems = projectKnowledge.items.filter((item) => item.type === "reactGuideline");

  const lines: string[] = [];

  if (webItems.length > 0) {
    lines.push(localize(locale, "Web 最佳实践：", "Web best practices:"));
    for (const item of webItems) {
      lines.push(`- ${item.title}: ${item.summary}`);
    }
  }

  if (reactItems.length > 0) {
    if (lines.length > 0) lines.push("");
    lines.push(localize(locale, "React 最佳实践：", "React best practices:"));
    for (const item of reactItems) {
      lines.push(`- ${item.title}: ${item.summary}`);
    }
  }

  if (lines.length === 0) {
    lines.push(
      localize(
        locale,
        "遵循 WCAG 2.2 可访问性标准和 React 性能优化最佳实践。",
        "Follow WCAG 2.2 accessibility standards and React performance best practices."
      )
    );
  }

  return lines.join("\n");
}

export function buildAgentCodePrompt({
  locale,
  planner,
  smartRecommendation,
  projectKnowledge,
}: {
  locale: Locale;
  planner: AgentPlannerResult;
  smartRecommendation: SmartRecommendation;
  projectKnowledge: AgentProjectKnowledgeContext;
}): AgentCodePrompt {
  const styleSlug = smartRecommendation.style.item.slug;
  const styleName = getStyleName(styleSlug, locale);
  const templateType = inferTemplateType(planner.normalizedQuery);
  const templateLabel = getLocalizedTemplateTypeLabel(locale, templateType);
  const pageType = planner.productType || planner.normalizedQuery;
  const audience = planner.audience || localize(locale, "目标用户", "target audience");

  const title = `${templateLabel} - ${styleName}`;

  const prompt = [
    localize(
      locale,
      `你正在为 ${audience} 构建一个 ${pageType}。`,
      `You are building a ${pageType} for ${audience}.`
    ),
    "",
    "## Visual Style",
    buildVisualStyleSection(locale, styleName, smartRecommendation, projectKnowledge),
    "",
    "## Page Structure",
    buildPageStructureSection(locale, templateType, smartRecommendation),
    "",
    "## Component Patterns",
    buildComponentPatternsSection(locale, projectKnowledge),
    "",
    "## Constraints",
    buildConstraintsSection(locale, planner),
    "",
    "## Guidelines",
    buildGuidelinesSection(locale, projectKnowledge),
    "",
    localize(
      locale,
      [
        "请生成一个完整的、可直接投入生产的 React 组件，使用 Tailwind CSS v4。",
        "导出一个单独的默认函数组件。",
        "包含响应式设计、语义化 HTML 和适当的 ARIA 属性。",
        "组件应该是自包含的，不依赖外部状态管理。",
      ].join("\n"),
      [
        "Generate a complete, production-ready React component using Tailwind CSS v4.",
        "Export a single default function component.",
        "Include responsive design, semantic HTML, and ARIA attributes where appropriate.",
        "The component should be self-contained with no external state management dependencies.",
      ].join("\n")
    ),
  ].join("\n");

  return {
    title,
    prompt,
    styleName,
    styleSlug,
    templateType: templateLabel,
  };
}
