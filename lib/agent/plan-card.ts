import type { Locale } from "@/lib/i18n/translations";
import type { SmartRecommendation } from "@/lib/knowledge";
import { getStyleMetaBySlug } from "@/lib/styles/meta";
import { getStyleBySlug } from "@/lib/styles";
import {
  getLocalizedTemplateTypeLabel,
  inferTemplateType,
  type TemplateType,
} from "./recommendations";
import type {
  AgentPlanCard,
  AgentPlanSection,
  AgentPlannerResult,
  AgentRecommendation,
} from "./types";

const PERFORMANCE_HEAVY_STYLES = new Set([
  "glassmorphism",
  "neumorphism",
  "cyberpunk-neon",
  "holographic",
  "liquid-glass",
]);

const ACCESSIBILITY_RISK_STYLES = new Set([
  "glassmorphism",
  "neumorphism",
  "soft-ui",
  "holographic",
]);

function localize(locale: Locale, zh: string, en: string): string {
  return locale === "zh" ? zh : en;
}

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

function toSectionId(input: string, index: number): string {
  const normalized = input
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || `section-${index + 1}`;
}

function sectionPurpose(locale: Locale, sectionTitle: string): string {
  const value = sectionTitle.toLowerCase();

  if (value.includes("hero") || value.includes("hook")) {
    return localize(locale, "快速说明价值主张，并把用户带入主任务。", "Explain the value fast and point the visitor to the primary action.");
  }
  if (value.includes("feature") || value.includes("capabilit")) {
    return localize(locale, "展开核心能力，证明这个页面不是只有口号。", "Expand the core capabilities so the page feels concrete, not just aspirational.");
  }
  if (value.includes("testimonial") || value.includes("proof") || value.includes("case")) {
    return localize(locale, "补上可信度，降低用户的决策阻力。", "Add trust so the visitor has less friction before deciding.");
  }
  if (value.includes("pricing") || value.includes("plan")) {
    return localize(locale, "帮助用户理解方案差异，并推动转化。", "Clarify package differences and move the visitor toward conversion.");
  }
  if (value.includes("faq")) {
    return localize(locale, "提前回答异议，减少最后一步流失。", "Resolve objections before the final decision step.");
  }
  if (value.includes("contact") || value.includes("form") || value.includes("cta")) {
    return localize(locale, "把前面的认知沉淀成一个明确动作。", "Turn the previous context into a single clear action.");
  }
  if (value.includes("how it works") || value.includes("journey") || value.includes("process")) {
    return localize(locale, "让用户快速理解产品路径和使用成本。", "Help the visitor understand the flow and mental cost of using the product.");
  }
  if (value.includes("logo") || value.includes("integration")) {
    return localize(locale, "用熟悉的品牌或生态信息提升信任。", "Use familiar brands or ecosystem signals to strengthen trust.");
  }

  return localize(locale, "承担页面中的一个关键说明任务，支撑最终决策。", "Carry one key explanatory job on the page and support the final decision.");
}

function fallbackSections(locale: Locale, templateType: TemplateType): AgentPlanSection[] {
  const catalog: Record<TemplateType, string[]> = {
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

  return catalog[templateType].map((title, index) => ({
    id: toSectionId(title, index),
    title,
    purpose: sectionPurpose(locale, title),
  }));
}

function buildSections(
  locale: Locale,
  templateType: TemplateType,
  smartRecommendation: SmartRecommendation
): AgentPlanSection[] {
  const source = smartRecommendation.landingPattern?.item.sectionOrder;
  if (!source || source.length === 0) {
    return fallbackSections(locale, templateType);
  }

  return source.slice(0, 6).map((title, index) => ({
    id: toSectionId(title, index),
    title,
    purpose: sectionPurpose(locale, title),
  }));
}

function buildPrimaryAction(
  locale: Locale,
  planner: AgentPlannerResult,
  templateType: TemplateType
): string {
  const product = planner.productType || planner.normalizedQuery;

  if (planner.context.targetAudience === "enterprise") {
    return localize(
      locale,
      `预约演示，确认 ${product} 是否适合你的团队流程。`,
      `Book a demo to validate whether ${product} fits the team's workflow.`
    );
  }

  if (planner.context.targetAudience === "developer" || templateType === "docs") {
    return localize(
      locale,
      `直接进入快速开始，尽快跑通 ${product} 的第一步。`,
      `Jump into quick start and get the first ${product} workflow running fast.`
    );
  }

  if (templateType === "ecommerce") {
    return localize(
      locale,
      "直接进入主商品详情或购买流程。",
      "Move directly into the primary product detail or purchase flow."
    );
  }

  if (templateType === "portfolio") {
    return localize(
      locale,
      "优先引导用户查看代表作品，再进入联系动作。",
      "Drive visitors into selected work first, then into the contact action."
    );
  }

  return localize(
    locale,
    `先让用户理解 ${product} 的价值，再推动试用或咨询动作。`,
    `Help visitors understand the value of ${product} first, then move them into a trial or contact action.`
  );
}

function buildSecondaryAction(
  locale: Locale,
  planner: AgentPlannerResult,
  templateType: TemplateType
): string | null {
  if (planner.context.targetAudience === "enterprise") {
    return localize(
      locale,
      "给一个低承诺替代动作，例如查看案例或产品概览。",
      "Offer a lower-commitment fallback such as case studies or a product overview."
    );
  }

  if (templateType === "docs") {
    return localize(
      locale,
      "补一个查看 API 参考或示例项目的次级入口。",
      "Add a secondary path into API reference or example projects."
    );
  }

  if (templateType === "dashboard" || templateType === "admin") {
    return localize(
      locale,
      "补一个查看 demo 数据或角色视图的次级动作。",
      "Add a secondary path to demo data or role-based views."
    );
  }

  if (templateType === "portfolio" || templateType === "blog") {
    return localize(
      locale,
      "补一个浏览更多内容的次级入口，避免只有单一 CTA。",
      "Add a secondary path to browse more content so the page does not depend on one CTA."
    );
  }

  return localize(
    locale,
    "补一个低摩擦的了解动作，例如查看更多、查看案例或阅读说明。",
    "Add a low-friction learning action such as explore more, see examples, or read details."
  );
}

function buildContentPriorities(
  locale: Locale,
  planner: AgentPlannerResult,
  templateType: TemplateType
): string[] {
  const priorities: string[] = [
    localize(
      locale,
      `先用一句话讲清楚 ${planner.productType || planner.normalizedQuery} 的核心收益。`,
      `Lead with a one-line explanation of the core outcome behind ${planner.productType || planner.normalizedQuery}.`
    ),
  ];

  if (planner.mustHave.length > 0) {
    priorities.push(
      localize(
        locale,
        `尽早露出关键内容：${planner.mustHave.slice(0, 2).join("、")}。`,
        `Expose the critical content early: ${planner.mustHave.slice(0, 2).join(", ")}.`
      )
    );
  }

  if (templateType === "dashboard" || templateType === "admin") {
    priorities.push(
      localize(
        locale,
        "在主价值之后立刻展示关键指标或主工作区，不要先堆背景说明。",
        "After the value statement, show the primary KPI layer or work area immediately instead of leading with background copy."
      )
    );
  } else {
    priorities.push(
      localize(
        locale,
        "在主价值之后尽快补上证明材料，例如用例、案例或可信背书。",
        "After the core promise, add proof quickly through use cases, examples, or trust signals."
      )
    );
  }

  priorities.push(
    localize(
      locale,
      "CTA 前只保留足够支撑决策的信息，不要把所有细节都塞进首屏路径。",
      "Keep only decision-supporting information before the CTA instead of forcing every detail into the primary path."
    )
  );

  return priorities.slice(0, 4);
}

function buildTargetAudience(
  locale: Locale,
  planner: AgentPlannerResult
): string {
  if (planner.audience) {
    return planner.audience;
  }

  const audience = planner.context.targetAudience;
  if (!audience) {
    return localize(locale, "待进一步确认的核心用户", "Primary audience still needs confirmation");
  }

  const map: Record<typeof audience, { zh: string; en: string }> = {
    consumer: { zh: "消费型用户", en: "Consumer users" },
    enterprise: { zh: "企业决策者与团队用户", en: "Enterprise buyers and team users" },
    developer: { zh: "开发者用户", en: "Developer users" },
    creative: { zh: "创意从业者", en: "Creative professionals" },
  };

  return locale === "zh" ? map[audience].zh : map[audience].en;
}

function buildPageGoal(
  locale: Locale,
  planner: AgentPlannerResult
): string {
  const productType = planner.productType || planner.normalizedQuery;
  const audience = planner.audience || buildTargetAudience(locale, planner);

  return localize(
    locale,
    `为 ${audience} 快速建立对 ${productType} 的理解、信任和下一步动作。`,
    `Help ${audience} understand ${productType}, trust it quickly, and take the next step.`
  );
}

function buildVisualDirection(
  locale: Locale,
  styleSlug: string,
  smartRecommendation: SmartRecommendation
): string {
  const styleName = getStyleName(styleSlug, locale);
  const reason = smartRecommendation.style.reasons[0];

  if (!reason) {
    return localize(
      locale,
      `优先采用 ${styleName} 作为主视觉方向。`,
      `Use ${styleName} as the primary visual direction.`
    );
  }

  return localize(
    locale,
    `优先采用 ${styleName}，重点原因是：${reason}。`,
    `Use ${styleName} as the primary visual direction because ${reason}.`
  );
}

function buildConstraints(
  locale: Locale,
  planner: AgentPlannerResult
): string[] {
  const constraints = [...planner.constraints];

  if (planner.context.accessibilityPriority) {
    constraints.push(localize(locale, "优先保证可访问性与对比度可读性", "Prioritize accessibility and readable contrast"));
  }
  if (planner.context.performancePriority) {
    constraints.push(localize(locale, "控制视觉效果成本，避免页面过重", "Keep visual effects lightweight and performance-aware"));
  }
  if (planner.context.primaryDevice === "mobile") {
    constraints.push(localize(locale, "优先确保移动端布局与点击区域安全", "Treat mobile layout and touch targets as first-class constraints"));
  }
  if (planner.context.darkModePreferred) {
    constraints.push(localize(locale, "优先考虑深色体验的一致性", "Preserve a coherent dark-mode experience"));
  }

  return Array.from(new Set(constraints)).slice(0, 6);
}

function buildRisks(
  locale: Locale,
  planner: AgentPlannerResult,
  smartRecommendation: SmartRecommendation
): string[] {
  const styleSlug = smartRecommendation.style.item.slug;
  const styleName = getStyleName(styleSlug, locale);
  const risks: string[] = [];

  if (planner.context.accessibilityPriority && ACCESSIBILITY_RISK_STYLES.has(styleSlug)) {
    risks.push(
      localize(
        locale,
        `${styleName} 这类视觉方向容易在对比度、边界清晰度和焦点态上吃亏，需要额外校正。`,
        `${styleName} can weaken contrast, boundaries, and focus visibility, so it needs explicit accessibility correction.`
      )
    );
  }

  if (planner.context.performancePriority && PERFORMANCE_HEAVY_STYLES.has(styleSlug)) {
    risks.push(
      localize(
        locale,
        `${styleName} 的特效、模糊或层次感可能带来额外渲染成本。`,
        `${styleName} may introduce extra rendering cost through blur, depth, or visual effects.`
      )
    );
  }

  if (planner.context.primaryDevice === "mobile" && ["dashboard", "admin"].includes(inferTemplateType(planner.normalizedQuery))) {
    risks.push(
      localize(
        locale,
        "如果信息密度过高，移动端会先出问题，需要提前约束卡片数量和表格深度。",
        "If the information density gets too high, mobile will break first, so table depth and card count need early limits."
      )
    );
  }

  if (planner.mustHave.length >= 4) {
    risks.push(
      localize(
        locale,
        "当前必须项较多，首屏和主路径容易失焦，需要明确主次。",
        "There are many must-haves already, so the hero and primary flow can lose focus unless priorities stay explicit."
      )
    );
  }

  return risks.slice(0, 4);
}

function buildMobileNotes(
  locale: Locale,
  planner: AgentPlannerResult,
  templateType: TemplateType
): string[] {
  const notes: string[] = [
    localize(
      locale,
      "移动端首屏只保留一个主目标，避免首屏信息过满。",
      "Keep a single primary objective in the mobile hero so the first screen does not feel overloaded."
    ),
  ];

  if (templateType === "dashboard" || templateType === "admin") {
    notes.push(
      localize(
        locale,
        "高密度数据区优先拆成卡片、分段表格或详情抽屉，不要直接压缩成小字。",
        "Break dense data into cards, segmented tables, or detail drawers instead of shrinking everything into tiny text."
      )
    );
  } else {
    notes.push(
      localize(
        locale,
        "长段说明优先拆成短句、列表或折叠区，保证滚动节奏轻一点。",
        "Split longer explanations into short lines, lists, or collapsible groups so scrolling stays lighter."
      )
    );
  }

  if (planner.mustHave.length >= 4) {
    notes.push(
      localize(
        locale,
        "必须项较多时，优先区分首屏必显内容和下滑后再展开的内容。",
        "When must-haves pile up, separate what must be visible above the fold from what can unfold later."
      )
    );
  }

  if (planner.context.primaryDevice === "mobile") {
    notes.push(
      localize(
        locale,
        "按钮、筛选器和表单入口要按触控优先设计，避免过小点击区域。",
        "Design buttons, filters, and form entry points for touch first so tap targets stay safe."
      )
    );
  }

  return notes.slice(0, 4);
}

function buildMustInclude(
  locale: Locale,
  planner: AgentPlannerResult,
  templateType: TemplateType
): string[] {
  if (planner.mustHave.length > 0) {
    return planner.mustHave.slice(0, 6);
  }

  const fallbackByType: Record<TemplateType, string[]> = {
    landing: [localize(locale, "价值主张", "Value proposition"), localize(locale, "核心能力", "Core features"), localize(locale, "明确 CTA", "Clear CTA")],
    dashboard: [localize(locale, "关键指标", "Primary KPIs"), localize(locale, "主工作区", "Primary work area"), localize(locale, "筛选/操作入口", "Filters and actions")],
    blog: [localize(locale, "精选内容", "Featured content"), localize(locale, "文章列表", "Article feed"), localize(locale, "订阅入口", "Subscription CTA")],
    portfolio: [localize(locale, "代表作品", "Selected work"), localize(locale, "工作方式", "Process"), localize(locale, "联系入口", "Contact CTA")],
    saas: [localize(locale, "价值主张", "Value proposition"), localize(locale, "用例场景", "Use cases"), localize(locale, "定价/试用 CTA", "Pricing or trial CTA")],
    ecommerce: [localize(locale, "主产品卖点", "Product highlights"), localize(locale, "信任信息", "Trust signals"), localize(locale, "购买动作", "Purchase CTA")],
    admin: [localize(locale, "主要表格/列表", "Primary table or list"), localize(locale, "筛选操作", "Filters and actions"), localize(locale, "详情查看区", "Detail view")],
    docs: [localize(locale, "快速开始", "Quick start"), localize(locale, "核心文档入口", "Core references"), localize(locale, "下一步 CTA", "Next-step CTA")],
    messaging: [localize(locale, "对话预览", "Conversation preview"), localize(locale, "价值说明", "Value explanation"), localize(locale, "行动入口", "Primary CTA")],
    education: [localize(locale, "课程结果", "Learning outcomes"), localize(locale, "课程结构", "Curriculum structure"), localize(locale, "报名 CTA", "Enrollment CTA")],
  };

  return fallbackByType[templateType];
}

export function buildAgentPlanCard({
  locale,
  planner,
  smartRecommendation,
  recommendations,
}: {
  locale: Locale;
  planner: AgentPlannerResult;
  smartRecommendation: SmartRecommendation;
  recommendations: AgentRecommendation[];
}): AgentPlanCard {
  const templateType = inferTemplateType(planner.normalizedQuery);
  const styleSlug = smartRecommendation.style.item.slug;
  const nextStep = recommendations[0]?.title
    ? localize(
        locale,
        `先打开 ${recommendations[0].title}，按这张方案卡去验证方向。`,
        `Open ${recommendations[0].title} first and validate the direction against this plan card.`
      )
    : localize(locale, "先按这张方案卡确认方向，再进入下一步实现。", "Validate the direction against this plan card before moving into implementation.");

  return {
    pageType: planner.productType || planner.normalizedQuery,
    pageGoal: buildPageGoal(locale, planner),
    targetAudience: buildTargetAudience(locale, planner),
    visualDirection: buildVisualDirection(locale, styleSlug, smartRecommendation),
    templateType: getLocalizedTemplateTypeLabel(locale, templateType),
    primaryAction: buildPrimaryAction(locale, planner, templateType),
    secondaryAction: buildSecondaryAction(locale, planner, templateType),
    sections: buildSections(locale, templateType, smartRecommendation),
    contentPriorities: buildContentPriorities(locale, planner, templateType),
    mustInclude: buildMustInclude(locale, planner, templateType),
    constraints: buildConstraints(locale, planner),
    risks: buildRisks(locale, planner, smartRecommendation),
    mobileNotes: buildMobileNotes(locale, planner, templateType),
    nextStep,
  };
}
