import type { Locale } from "@/lib/i18n/translations";
import { componentPatterns } from "@/lib/component-patterns";
import { getStyleBySlug } from "@/lib/styles";
import { templateCatalog, type TemplateCatalogEntry } from "@/lib/templates/catalog";
import type { AgentPlannerResult } from "./types";
import type { AgentProjectKnowledgeItem } from "./project-knowledge";

function localize(locale: Locale, zh: string, en: string): string {
  return locale === "zh" ? zh : en;
}

function truncate(value: string, max = 180): string {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) {
    return normalized;
  }

  return `${normalized.slice(0, max - 3)}...`;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9\u4e00-\u9fa5]+/)
    .filter((part) => part.length >= 2);
}

function scoreOverlap(queryTokens: string[], text: string): number {
  if (queryTokens.length === 0) {
    return 0;
  }

  const haystack = text.toLowerCase();
  return queryTokens.reduce((score, token) => {
    if (!haystack.includes(token)) {
      return score;
    }

    return score + (token.length >= 5 ? 3 : 2);
  }, 0);
}

function inferTemplateTypeHints(planner: AgentPlannerResult): string[] {
  const haystack = [
    planner.normalizedQuery,
    planner.productType,
    planner.visualTone,
    planner.mustHave.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  const hints: string[] = [];
  const checks: Array<[string, string[]]> = [
    ["dashboard", ["dashboard", "analytics", "kpi", "metrics", "report", "admin"]],
    ["admin", ["admin", "back office", "operations", "crm", "settings", "management"]],
    ["landing", ["landing", "launch", "hero", "marketing", "campaign"]],
    ["saas", ["saas", "pricing", "subscription", "product"]],
    ["portfolio", ["portfolio", "showcase", "gallery", "resume"]],
    ["blog", ["blog", "editorial", "article", "content"]],
    ["docs", ["docs", "documentation", "api", "guide"]],
    ["ecommerce", ["ecommerce", "shop", "product page", "store"]],
    ["social", ["social", "feed", "community"]],
    ["messaging", ["chat", "messaging", "conversation"]],
    ["media", ["music", "audio", "media"]],
    ["lifestyle", ["travel", "recipe", "booking", "lifestyle"]],
    ["education", ["learning", "course", "education"]],
  ];

  for (const [type, keywords] of checks) {
    if (keywords.some((keyword) => haystack.includes(keyword))) {
      hints.push(type);
    }
  }

  return hints;
}

function formatTemplateTitle(locale: Locale, template: TemplateCatalogEntry): string {
  return `${locale === "zh" ? template.name.zh : template.name.en} (${template.type})`;
}

export function buildTemplateExampleItems({
  locale,
  planner,
  styleSlug,
}: {
  locale: Locale;
  planner: AgentPlannerResult;
  styleSlug: string;
}): AgentProjectKnowledgeItem[] {
  const queryTokens = tokenize(
    [
      planner.normalizedQuery,
      planner.productType,
      planner.audience,
      planner.visualTone,
      planner.mustHave.join(" "),
      planner.constraints.join(" "),
    ].join(" ")
  );
  const typeHints = inferTemplateTypeHints(planner);

  return templateCatalog
    .map((template) => {
      const style = getStyleBySlug(template.styleSlug);
      const score =
        scoreOverlap(
          queryTokens,
          [
            template.id,
            template.type,
            template.name.zh,
            template.name.en,
            template.description.zh,
            template.description.en,
            template.styleSlug,
            style?.name ?? "",
            style?.nameEn ?? "",
          ].join(" ")
        ) +
        (template.styleSlug === styleSlug ? 8 : 0) +
        (typeHints.includes(template.type) ? 6 : 0);

      return { template, score };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map(({ template }) => {
      const style = getStyleBySlug(template.styleSlug);
      return {
        id: `template-example-${template.id}`,
        type: "templateExample",
        title: formatTemplateTitle(locale, template),
        source: template.codePath,
        summary: truncate(
          localize(
            locale,
            `${template.description.zh} 路由：${template.href}。关联风格：${style?.name ?? template.styleSlug}。这是仓库里的真实模板实现。`,
            `${template.description.en} Route: ${template.href}. Related style: ${style?.nameEn ?? style?.name ?? template.styleSlug}. This is a real template implementation from the repo.`
          ),
          220
        ),
      } satisfies AgentProjectKnowledgeItem;
    });
}

export function buildComponentPatternItems({
  locale,
  planner,
  styleSlug,
}: {
  locale: Locale;
  planner: AgentPlannerResult;
  styleSlug: string;
}): AgentProjectKnowledgeItem[] {
  const queryTokens = tokenize(
    [
      planner.normalizedQuery,
      planner.mustHave.join(" "),
      planner.constraints.join(" "),
      planner.visualTone,
    ].join(" ")
  );

  return componentPatterns
    .map((pattern) => {
      const score =
        scoreOverlap(
          queryTokens,
          [
            pattern.id,
            pattern.family,
            pattern.category,
            pattern.name,
            pattern.nameZh,
            pattern.summary,
            pattern.summaryZh,
            pattern.useCase,
            pattern.useCaseZh,
            pattern.tags.join(" "),
            pattern.tagsZh.join(" "),
          ].join(" ")
        ) +
        (pattern.sourceStyleSlug === styleSlug ? 6 : 0) +
        (planner.mustHave.some((item) => pattern.summary.toLowerCase().includes(item.toLowerCase())) ? 4 : 0);

      return { pattern, score };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 4)
    .map(({ pattern }) => ({
      id: `component-pattern-${pattern.id}`,
      type: "componentPattern",
      title: locale === "zh" ? pattern.nameZh : pattern.name,
      source: "lib/component-patterns/index.ts",
      summary: truncate(
        localize(
          locale,
          `${pattern.summaryZh} 适用：${pattern.useCaseZh}。来源展示页：${pattern.sourceHref}`,
          `${pattern.summary} Best for: ${pattern.useCase}. Showcase source: ${pattern.sourceHref}`
        ),
        220
      ),
    }));
}
