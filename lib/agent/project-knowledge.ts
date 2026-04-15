import type { Locale } from "@/lib/i18n/translations";
import type { AgentPlannerResult } from "./types";
import { promptTopics } from "@/lib/prompts/topics";
import { getStyleRecipes } from "@/lib/recipes";
import { getStyleBySlug } from "@/lib/styles";
import { searchReactGuidelines } from "@/lib/knowledge/react-guidelines";
import { searchWebGuidelines } from "@/lib/knowledge/web-guidelines";
import { buildComponentPatternItems, buildTemplateExampleItems } from "./repo-knowledge";

export interface AgentProjectKnowledgeItem {
  id: string;
  type:
    | "promptTopic"
    | "stylePrompt"
    | "recipe"
    | "templateExample"
    | "componentPattern"
    | "webGuideline"
    | "reactGuideline";
  title: string;
  source: string;
  summary: string;
}

export interface AgentProjectKnowledgeContext {
  items: AgentProjectKnowledgeItem[];
  counts: Record<AgentProjectKnowledgeItem["type"], number>;
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

function truncate(value: string, max = 180): string {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) {
    return normalized;
  }

  return `${normalized.slice(0, max - 3)}...`;
}

function localize(locale: Locale, zh: string, en: string): string {
  return locale === "zh" ? zh : en;
}

function buildQueryText(
  planner: AgentPlannerResult,
  styleSlug: string
): string {
  return [
    planner.normalizedQuery,
    planner.productType,
    planner.audience,
    planner.visualTone,
    planner.mustHave.join(" "),
    planner.constraints.join(" "),
    planner.context.industry || "",
    styleSlug,
  ]
    .filter(Boolean)
    .join(" ");
}

function buildPromptTopicItems({
  locale,
  styleSlug,
  queryTokens,
}: {
  locale: Locale;
  styleSlug: string;
  queryTokens: string[];
}): AgentProjectKnowledgeItem[] {
  return promptTopics
    .map((topic) => {
      const title = locale === "zh" ? topic.titleZh : topic.titleEn;
      const description = locale === "zh" ? topic.descriptionZh : topic.descriptionEn;
      const intro = locale === "zh" ? topic.introZh : topic.introEn;
      const score =
        scoreOverlap(
          queryTokens,
          `${topic.slug} ${title} ${description} ${intro} ${topic.keywords.join(" ")}`
        ) +
        (topic.relatedStyleSlugs.includes(styleSlug) ? 6 : 0);

      return {
        topic,
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 2)
    .map(({ topic }) => {
      const title = locale === "zh" ? topic.titleZh : topic.titleEn;
      const description = locale === "zh" ? topic.descriptionZh : topic.descriptionEn;
      const topPrompt = topic.prompts[0];
      return {
        id: `prompt-topic-${topic.slug}`,
        type: "promptTopic",
        title,
        source: `/prompts/${topic.slug}`,
        summary: truncate(
          [
            description,
            topPrompt
              ? localize(
                  locale,
                  `示例提示词：${topPrompt.titleZh}。`,
                  `Example prompt: ${topPrompt.titleEn}.`
                )
              : "",
          ]
            .filter(Boolean)
            .join(" ")
        ),
      };
    });
}

function buildStylePromptItems({
  locale,
  planner,
  styleSlug,
  queryTokens,
}: {
  locale: Locale;
  planner: AgentPlannerResult;
  styleSlug: string;
  queryTokens: string[];
}): AgentProjectKnowledgeItem[] {
  const style = getStyleBySlug(styleSlug);
  if (!style?.examplePrompts?.length) {
    return [];
  }

  return style.examplePrompts
    .map((prompt, index) => {
      const title = locale === "zh" ? prompt.title : prompt.titleEn;
      const description = locale === "zh" ? prompt.description : prompt.descriptionEn;
      const promptBody =
        locale === "zh" ? prompt.prompt : prompt.promptEn || prompt.prompt;
      const score = scoreOverlap(
        queryTokens,
        `${title} ${description} ${promptBody} ${planner.normalizedQuery}`
      );

      return {
        prompt,
        index,
        score,
      };
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 2)
    .map(({ prompt, index }) => ({
      id: `style-prompt-${styleSlug}-${index + 1}`,
      type: "stylePrompt",
      title: locale === "zh" ? prompt.title : prompt.titleEn,
      source: `/styles/${styleSlug}`,
      summary: truncate(
        `${locale === "zh" ? prompt.description : prompt.descriptionEn} ${
          locale === "zh" ? prompt.prompt : prompt.promptEn || prompt.prompt
        }`,
        220
      ),
    }));
}

function buildRecipeItems({
  locale,
  styleSlug,
  queryTokens,
}: {
  locale: Locale;
  styleSlug: string;
  queryTokens: string[];
}): AgentProjectKnowledgeItem[] {
  const styleRecipes = getStyleRecipes(styleSlug);
  if (!styleRecipes) {
    return [];
  }

  return Object.values(styleRecipes.recipes)
    .map((recipe) => {
      const name = locale === "zh" ? recipe.nameZh : recipe.name;
      const score =
        scoreOverlap(
          queryTokens,
          `${recipe.id} ${name} ${recipe.description} ${recipe.slots
            .map((slot) => `${slot.id} ${slot.label} ${slot.labelZh}`)
            .join(" ")}`
        ) +
        (["hero", "card", "nav", "button", "table", "sidebar"].includes(recipe.id)
          ? 2
          : 0);

      return {
        recipe,
        score,
      };
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 4)
    .map(({ recipe }) => {
      const name = locale === "zh" ? recipe.nameZh : recipe.name;
      const slotSummary = recipe.slots
        .slice(0, 3)
        .map((slot) => (locale === "zh" ? slot.labelZh : slot.label))
        .join(", ");
      return {
        id: `recipe-${styleSlug}-${recipe.id}`,
        type: "recipe",
        title: `${name} (${recipe.id})`,
        source: `/styles/${styleSlug}/recipes`,
        summary: truncate(
          localize(
            locale,
            `${recipe.description} 关键 slots：${slotSummary || "无"}`,
            `${recipe.description} Key slots: ${slotSummary || "none"}`
          )
        ),
      };
    });
}

function buildGuidelineItems({
  locale,
  planner,
  queryText,
}: {
  locale: Locale;
  planner: AgentPlannerResult;
  queryText: string;
}): AgentProjectKnowledgeItem[] {
  const webQuery = [
    queryText,
    planner.context.accessibilityPriority ? "accessibility focus semantic" : "",
    planner.context.performancePriority ? "performance loading lazy focus-visible" : "",
    planner.context.primaryDevice === "mobile" ? "mobile touch target responsive" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const reactQuery = [
    queryText,
    planner.context.performancePriority ? "react performance bundle dynamic import" : "",
    planner.context.primaryDevice === "mobile" ? "client rendering responsive data table" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const webItems = searchWebGuidelines(webQuery, 2).map((item) => ({
    id: `web-guideline-${item.issue}`,
    type: "webGuideline" as const,
    title: item.issue,
    source: "web-guidelines",
    summary: truncate(
      localize(
        locale,
        `${item.description} 建议：${item.do}`,
        `${item.description} Do: ${item.do}`
      )
    ),
  }));

  const reactItems = searchReactGuidelines(reactQuery, 2).map((item) => ({
    id: `react-guideline-${item.issue}`,
    type: "reactGuideline" as const,
    title: item.issue,
    source: "react-guidelines",
    summary: truncate(
      localize(
        locale,
        `${item.description} 建议：${item.do}`,
        `${item.description} Do: ${item.do}`
      )
    ),
  }));

  return [...webItems, ...reactItems];
}

export function buildAgentProjectKnowledgeContext({
  locale,
  planner,
  styleSlug,
}: {
  locale: Locale;
  planner: AgentPlannerResult;
  styleSlug: string;
}): AgentProjectKnowledgeContext {
  const queryText = buildQueryText(planner, styleSlug);
  const queryTokens = tokenize(queryText);
  const items = [
    ...buildPromptTopicItems({ locale, styleSlug, queryTokens }),
    ...buildStylePromptItems({ locale, planner, styleSlug, queryTokens }),
    ...buildRecipeItems({ locale, styleSlug, queryTokens }),
    ...buildTemplateExampleItems({ locale, planner, styleSlug }),
    ...buildComponentPatternItems({ locale, planner, styleSlug }),
    ...buildGuidelineItems({ locale, planner, queryText }),
  ];

  return {
    items,
    counts: {
      promptTopic: items.filter((item) => item.type === "promptTopic").length,
      stylePrompt: items.filter((item) => item.type === "stylePrompt").length,
      recipe: items.filter((item) => item.type === "recipe").length,
      templateExample: items.filter((item) => item.type === "templateExample").length,
      componentPattern: items.filter((item) => item.type === "componentPattern").length,
      webGuideline: items.filter((item) => item.type === "webGuideline").length,
      reactGuideline: items.filter((item) => item.type === "reactGuideline").length,
    },
  };
}
