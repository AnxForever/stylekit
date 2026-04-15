import { localizeHref } from "@/lib/i18n/routing";
import type { Locale } from "@/lib/i18n/translations";
import type { SmartRecommendation } from "@/lib/knowledge";
import { searchProducts } from "@/lib/knowledge/products";
import { getStyleBySlug } from "@/lib/styles";
import { getStyleMetaBySlug } from "@/lib/styles/meta";
import type { AgentPageContext, AgentRecommendation } from "./types";

export type TemplateType =
  | "landing"
  | "dashboard"
  | "blog"
  | "portfolio"
  | "saas"
  | "ecommerce"
  | "admin"
  | "docs"
  | "messaging"
  | "education";

export const templateTypeLabels: Record<TemplateType, { zh: string; en: string }> = {
  landing: { zh: "落地页", en: "Landing" },
  dashboard: { zh: "仪表盘", en: "Dashboard" },
  blog: { zh: "博客", en: "Blog" },
  portfolio: { zh: "作品集", en: "Portfolio" },
  saas: { zh: "SaaS", en: "SaaS" },
  ecommerce: { zh: "电商", en: "E-commerce" },
  admin: { zh: "管理后台", en: "Admin" },
  docs: { zh: "文档站", en: "Docs" },
  messaging: { zh: "消息/社交", en: "Messaging" },
  education: { zh: "教育", en: "Education" },
};

function getTopStyleName(styleSlug: string, locale: Locale): string {
  const meta = getStyleMetaBySlug(styleSlug);
  if (meta) {
    return locale === "zh" ? meta.name : meta.nameEn;
  }

  const style = getStyleBySlug(styleSlug);
  if (!style) {
    return styleSlug;
  }

  return locale === "zh" ? style.name : style.nameEn;
}

export function inferTemplateType(normalizedQuery: string): TemplateType {
  const q = normalizedQuery.toLowerCase();
  if (q.includes("admin")) return "admin";
  if (q.includes("dashboard") || q.includes("analytics") || q.includes("portal")) return "dashboard";
  if (q.includes("blog") || q.includes("media") || q.includes("news")) return "blog";
  if (q.includes("portfolio") || q.includes("resume") || q.includes("showcase")) return "portfolio";
  if (q.includes("doc") || q.includes("api")) return "docs";
  if (q.includes("chat") || q.includes("social") || q.includes("message")) return "messaging";
  if (q.includes("course") || q.includes("learn") || q.includes("education")) return "education";
  if (q.includes("e-commerce") || q.includes("ecommerce") || q.includes("shop") || q.includes("store")) {
    return "ecommerce";
  }
  if (q.includes("saas") || q.includes("software") || q.includes("b2b")) return "saas";
  return "landing";
}

export function getLocalizedTemplateTypeLabel(
  locale: Locale,
  templateType: TemplateType
): string {
  const label = templateTypeLabels[templateType];
  return locale === "zh" ? label.zh : label.en;
}

function localizeTitle(
  locale: Locale,
  zh: string,
  en: string
): string {
  return locale === "zh" ? zh : en;
}

function buildTemplateHref(
  locale: Locale,
  styleSlug: string,
  templateType: TemplateType
): string {
  const params = new URLSearchParams({
    type: templateType,
    style: styleSlug,
  });
  return localizeHref(`/templates?${params.toString()}`, locale);
}

function buildExploreCard(
  locale: Locale,
  styleSlug: string
): AgentRecommendation {
  return {
    id: `page-playground-${styleSlug}`,
    type: "page",
    href: localizeHref(`/playground?style=${encodeURIComponent(styleSlug)}`, locale),
    title: localizeTitle(locale, "在 Playground 中试用", "Open In Playground"),
    reason: localizeTitle(
      locale,
      "直接用这个风格进入实时预览和代码编辑。",
      "Jump straight into live preview and code editing with this style."
    ),
    confidence: 76,
  };
}

function buildCompareCard(
  locale: Locale,
  currentStyleSlug: string,
  nextStyleSlug: string
): AgentRecommendation {
  const currentName = getTopStyleName(currentStyleSlug, locale);
  const nextName = getTopStyleName(nextStyleSlug, locale);

  return {
    id: `page-compare-${currentStyleSlug}-${nextStyleSlug}`,
    type: "page",
    href: localizeHref(
      `/compare?a=${encodeURIComponent(currentStyleSlug)}&b=${encodeURIComponent(nextStyleSlug)}`,
      locale
    ),
    title: localizeTitle(locale, "对比当前风格", "Compare With Current Style"),
    reason: localizeTitle(
      locale,
      `把 ${currentName} 和 ${nextName} 放在一起看，能更快确认取舍。`,
      `Compare ${currentName} and ${nextName} side by side before committing.`
    ),
    confidence: 82,
  };
}

function buildBlendCard(
  locale: Locale,
  styleA: string,
  styleB: string
): AgentRecommendation {
  const first = getTopStyleName(styleA, locale);
  const second = getTopStyleName(styleB, locale);

  return {
    id: `page-blend-${styleA}-${styleB}`,
    type: "page",
    href: localizeHref(
      `/blend?a=${encodeURIComponent(styleA)}&b=${encodeURIComponent(styleB)}`,
      locale
    ),
    title: localizeTitle(locale, "混合两个方向", "Blend Two Directions"),
    reason: localizeTitle(
      locale,
      `如果你想保留 ${first} 的骨架，再吸收 ${second} 的气质，可以直接去 Blend 试。`,
      `If you want ${first} structure with some ${second} flavor, Blend is the fastest next step.`
    ),
    confidence: 74,
  };
}

export function buildAgentRecommendations({
  locale,
  normalizedQuery,
  smartRecommendation,
  pageContext,
}: {
  locale: Locale;
  normalizedQuery: string;
  smartRecommendation: SmartRecommendation;
  pageContext?: AgentPageContext;
}): AgentRecommendation[] {
  const styleSlug = smartRecommendation.style.item.slug;
  const styleName = getTopStyleName(styleSlug, locale);
  const product = searchProducts(normalizedQuery, 1)[0];
  const templateType = inferTemplateType(product?.type || normalizedQuery);
  const templateLabel = templateTypeLabels[templateType];
  const recommendations: AgentRecommendation[] = [
    {
      id: `style-${styleSlug}`,
      type: "style",
      slug: styleSlug,
      href: localizeHref(`/styles/${styleSlug}`, locale),
      title: styleName,
      reason: localizeTitle(
        locale,
        "这是当前需求下最稳的一档风格，适合先用它定视觉基调。",
        "This is the strongest overall visual match for the current brief."
      ),
      confidence: smartRecommendation.style.score,
    },
    {
      id: `template-${templateType}-${styleSlug}`,
      type: "template",
      slug: styleSlug,
      href: buildTemplateHref(locale, styleSlug, templateType),
      title: localizeTitle(
        locale,
        `${templateLabel.zh}模板集合`,
        `${templateLabel.en} Templates`
      ),
      reason: localizeTitle(
        locale,
        `先看带 ${styleName} 筛选的模板，会比从空白页开始更快收敛。`,
        `Start from templates filtered to ${styleName} instead of designing from a blank page.`
      ),
      confidence: Math.max(68, smartRecommendation.style.score - 6),
    },
  ];

  const currentStyleSlug = pageContext?.styleSlug?.trim();
  if (currentStyleSlug && currentStyleSlug !== styleSlug) {
    recommendations.push(buildCompareCard(locale, currentStyleSlug, styleSlug));
    return recommendations.slice(0, 3);
  }

  const altStyle = smartRecommendation.style.alternatives[0]?.slug;
  if (altStyle && altStyle !== styleSlug) {
    recommendations.push(buildBlendCard(locale, styleSlug, altStyle));
    return recommendations.slice(0, 3);
  }

  recommendations.push(buildExploreCard(locale, styleSlug));
  return recommendations.slice(0, 3);
}
