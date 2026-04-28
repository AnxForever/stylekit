import type { Locale } from "@/lib/i18n/translations";
import { componentPatterns } from "@/lib/component-patterns";
import { reactGuidelines } from "@/lib/knowledge/react-guidelines";
import { webGuidelines } from "@/lib/knowledge/web-guidelines";
import { promptTopics } from "@/lib/prompts/topics";
import { getStyleRecipes } from "@/lib/recipes";
import { styles, type DesignStyle } from "@/lib/styles";
import { templateCatalog } from "@/lib/templates/catalog";
import type { RagDocumentChunk } from "./types";

const corpusCache = new Map<Locale, RagDocumentChunk[]>();

function compactText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function truncate(value: string, max = 280): string {
  const normalized = compactText(value);
  if (normalized.length <= max) {
    return normalized;
  }

  return `${normalized.slice(0, max - 3)}...`;
}

function localizedStyleName(style: DesignStyle, locale: Locale): string {
  return locale === "zh" ? style.name : style.nameEn;
}

function localizedStyleDescription(style: DesignStyle, locale: Locale): string {
  return locale === "en" && style.descriptionEn ? style.descriptionEn : style.description;
}

function localizedStylePhilosophy(style: DesignStyle, locale: Locale): string {
  return locale === "en" && style.philosophyEn ? style.philosophyEn : style.philosophy;
}

function localizedList(primary: string[] | undefined, secondary: string[] | undefined, locale: Locale): string[] {
  return locale === "en" && secondary && secondary.length > 0 ? secondary : (primary ?? []);
}

function slugify(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function buildStyleChunks(locale: Locale): RagDocumentChunk[] {
  return styles.flatMap((style) => {
    const title = localizedStyleName(style, locale);
    const description = localizedStyleDescription(style, locale);
    const philosophy = localizedStylePhilosophy(style, locale);
    const dos = localizedList(style.doList, style.doListEn, locale);
    const donts = localizedList(style.dontList, style.dontListEn, locale);
    const keywords = locale === "en" && style.keywordsEn?.length ? style.keywordsEn : style.keywords;
    const chunks: RagDocumentChunk[] = [
      {
        id: `style-overview-${style.slug}`,
        kind: "style",
        locale,
        title,
        section: locale === "zh" ? "风格总览" : "Style overview",
        href: `/styles/${style.slug}`,
        sourceLabel: title,
        sourcePath: `lib/styles/${style.slug}.ts`,
        summary: truncate(description),
        content: compactText([
          `${locale === "zh" ? "风格" : "Style"}: ${title}`,
          `${locale === "zh" ? "类别" : "Category"}: ${style.styleType}`,
          `${locale === "zh" ? "描述" : "Description"}: ${description}`,
          `${locale === "zh" ? "哲学" : "Philosophy"}: ${philosophy}`,
          `${locale === "zh" ? "关键词" : "Keywords"}: ${keywords.join(", ")}`,
        ].join("\n")),
        keywords: [style.slug, style.name, style.nameEn, ...(style.keywords ?? []), ...(style.keywordsEn ?? [])],
      },
    ];

    if (dos.length > 0 || donts.length > 0) {
      chunks.push({
        id: `style-rules-${style.slug}`,
        kind: "style",
        locale,
        title,
        section: locale === "zh" ? "适用与禁忌" : "Dos and don'ts",
        href: `/styles/${style.slug}`,
        sourceLabel: title,
        sourcePath: `lib/styles/${style.slug}.ts`,
        summary: truncate([
          dos[0] ? `${locale === "zh" ? "建议" : "Do"}: ${dos[0]}` : "",
          donts[0] ? `${locale === "zh" ? "避免" : "Avoid"}: ${donts[0]}` : "",
        ].filter(Boolean).join(" ")),
        content: compactText([
          `${locale === "zh" ? "风格" : "Style"}: ${title}`,
          dos.length > 0 ? `${locale === "zh" ? "建议" : "Dos"}: ${dos.join(" | ")}` : "",
          donts.length > 0 ? `${locale === "zh" ? "禁忌" : "Don'ts"}: ${donts.join(" | ")}` : "",
        ].filter(Boolean).join("\n")),
        keywords: [style.slug, ...(style.keywords ?? []), ...(style.keywordsEn ?? [])],
      });
    }

    for (const prompt of style.examplePrompts ?? []) {
      chunks.push({
        id: `style-prompt-${style.slug}-${slugify(prompt.titleEn)}`,
        kind: "stylePrompt",
        locale,
        title: locale === "zh" ? prompt.title : prompt.titleEn,
        section: locale === "zh" ? "示例提示词" : "Example prompt",
        href: `/styles/${style.slug}`,
        sourceLabel: title,
        sourcePath: `lib/styles/${style.slug}.ts`,
        summary: truncate(locale === "zh" ? prompt.description : prompt.descriptionEn),
        content: compactText([
          `${locale === "zh" ? "风格" : "Style"}: ${title}`,
          `${locale === "zh" ? "提示词标题" : "Prompt title"}: ${locale === "zh" ? prompt.title : prompt.titleEn}`,
          `${locale === "zh" ? "说明" : "Description"}: ${locale === "zh" ? prompt.description : prompt.descriptionEn}`,
          `${locale === "zh" ? "内容" : "Prompt"}: ${locale === "zh" ? prompt.prompt : prompt.promptEn || prompt.prompt}`,
        ].join("\n")),
        keywords: [style.slug, prompt.title, prompt.titleEn, ...(style.keywords ?? []), ...(style.keywordsEn ?? [])],
      });
    }

    const recipes = getStyleRecipes(style.slug);
    if (recipes) {
      for (const recipe of Object.values(recipes.recipes)) {
        chunks.push({
          id: `style-recipe-${style.slug}-${recipe.id}`,
          kind: "styleRecipe",
          locale,
          title: locale === "zh" ? recipe.nameZh : recipe.name,
          section: locale === "zh" ? "组件配方" : "Component recipe",
          href: `/styles/${style.slug}/recipes`,
          sourceLabel: title,
          sourcePath: `lib/recipes/${style.slug}.ts`,
          summary: truncate(recipe.description),
          content: compactText([
            `${locale === "zh" ? "风格" : "Style"}: ${title}`,
            `${locale === "zh" ? "组件" : "Component"}: ${locale === "zh" ? recipe.nameZh : recipe.name}`,
            `${locale === "zh" ? "描述" : "Description"}: ${recipe.description}`,
            `${locale === "zh" ? "可配置项" : "Parameters"}: ${recipe.parameters.map((item) => locale === "zh" ? item.labelZh : item.label).join(", ")}`,
            `${locale === "zh" ? "内容槽位" : "Slots"}: ${recipe.slots.map((item) => locale === "zh" ? item.labelZh : item.label).join(", ")}`,
          ].join("\n")),
          keywords: [style.slug, recipe.id, recipe.name, recipe.nameZh, ...(style.keywords ?? []), ...(style.keywordsEn ?? [])],
        });
      }
    }

    return chunks;
  });
}

function buildTemplateChunks(locale: Locale): RagDocumentChunk[] {
  return templateCatalog.map((template) => ({
    id: `template-${template.id}`,
    kind: "template",
    locale,
    title: locale === "zh" ? template.name.zh : template.name.en,
    section: locale === "zh" ? "模板" : "Template",
    href: template.href,
    sourceLabel: locale === "zh" ? template.name.zh : template.name.en,
    sourcePath: template.codePath,
    summary: truncate(locale === "zh" ? template.description.zh : template.description.en),
    content: compactText([
      `${locale === "zh" ? "模板" : "Template"}: ${locale === "zh" ? template.name.zh : template.name.en}`,
      `${locale === "zh" ? "类型" : "Type"}: ${template.type}`,
      `${locale === "zh" ? "风格" : "Style"}: ${template.styleSlug}`,
      `${locale === "zh" ? "说明" : "Description"}: ${locale === "zh" ? template.description.zh : template.description.en}`,
    ].join("\n")),
    keywords: [template.id, template.type, template.styleSlug, template.name.zh, template.name.en],
  }));
}

function buildComponentPatternChunks(locale: Locale): RagDocumentChunk[] {
  return componentPatterns.map((pattern) => ({
    id: `component-pattern-${pattern.id}`,
    kind: "componentPattern",
    locale,
    title: locale === "zh" ? pattern.nameZh : pattern.name,
    section: locale === "zh" ? "组件模式" : "Component pattern",
    href: pattern.sourceHref,
    sourceLabel: locale === "zh" ? pattern.nameZh : pattern.name,
    sourcePath: "lib/component-patterns/index.ts",
    summary: truncate(locale === "zh" ? pattern.summaryZh : pattern.summary),
    content: compactText([
      `${locale === "zh" ? "组件模式" : "Pattern"}: ${locale === "zh" ? pattern.nameZh : pattern.name}`,
      `${locale === "zh" ? "家族" : "Family"}: ${pattern.family}`,
      `${locale === "zh" ? "分类" : "Category"}: ${pattern.category}`,
      `${locale === "zh" ? "摘要" : "Summary"}: ${locale === "zh" ? pattern.summaryZh : pattern.summary}`,
      `${locale === "zh" ? "适用场景" : "Use case"}: ${locale === "zh" ? pattern.useCaseZh : pattern.useCase}`,
      `${locale === "zh" ? "来源风格" : "Source style"}: ${pattern.sourceStyleSlug}`,
    ].join("\n")),
    keywords: [pattern.id, pattern.family, pattern.category, pattern.name, pattern.nameZh, ...pattern.tags, ...pattern.tagsZh],
  }));
}

function buildPromptTopicChunks(locale: Locale): RagDocumentChunk[] {
  return promptTopics.flatMap((topic) => {
    const chunks: RagDocumentChunk[] = [
      {
        id: `prompt-topic-${topic.slug}`,
        kind: "promptTopic",
        locale,
        title: locale === "zh" ? topic.titleZh : topic.titleEn,
        section: locale === "zh" ? "提示词主题" : "Prompt topic",
        href: `/prompts/${topic.slug}`,
        sourceLabel: locale === "zh" ? topic.titleZh : topic.titleEn,
        sourcePath: "lib/prompts/topics.ts",
        summary: truncate(locale === "zh" ? topic.descriptionZh : topic.descriptionEn),
        content: compactText([
          `${locale === "zh" ? "主题" : "Topic"}: ${locale === "zh" ? topic.titleZh : topic.titleEn}`,
          `${locale === "zh" ? "说明" : "Description"}: ${locale === "zh" ? topic.descriptionZh : topic.descriptionEn}`,
          `${locale === "zh" ? "简介" : "Intro"}: ${locale === "zh" ? topic.introZh : topic.introEn}`,
          `${locale === "zh" ? "相关风格" : "Related styles"}: ${topic.relatedStyleSlugs.join(", ")}`,
        ].join("\n")),
        keywords: [topic.slug, topic.titleZh, topic.titleEn, ...topic.keywords, ...topic.relatedStyleSlugs],
      },
    ];

    for (const prompt of topic.prompts.slice(0, 3)) {
      chunks.push({
        id: `prompt-topic-example-${topic.slug}-${slugify(prompt.titleEn)}`,
        kind: "promptTopic",
        locale,
        title: locale === "zh" ? prompt.titleZh : prompt.titleEn,
        section: locale === "zh" ? "主题内提示词" : "Topic prompt",
        href: `/prompts/${topic.slug}`,
        sourceLabel: locale === "zh" ? topic.titleZh : topic.titleEn,
        sourcePath: "lib/prompts/topics.ts",
        summary: truncate(locale === "zh" ? topic.descriptionZh : topic.descriptionEn),
        content: compactText([
          `${locale === "zh" ? "主题" : "Topic"}: ${locale === "zh" ? topic.titleZh : topic.titleEn}`,
          `${locale === "zh" ? "提示词" : "Prompt"}: ${locale === "zh" ? prompt.titleZh : prompt.titleEn}`,
          `${locale === "zh" ? "工具" : "Tool"}: ${prompt.tool}`,
          `${locale === "zh" ? "内容" : "Prompt text"}: ${prompt.prompt}`,
        ].join("\n")),
        keywords: [topic.slug, prompt.titleZh, prompt.titleEn, prompt.tool, ...topic.relatedStyleSlugs],
      });
    }

    return chunks;
  });
}

function buildGuidelineChunks(locale: Locale): RagDocumentChunk[] {
  const webChunks = webGuidelines.map((guideline) => ({
    id: `web-guideline-${slugify(guideline.issue)}`,
    kind: "webGuideline" as const,
    locale,
    title: guideline.issue,
    section: locale === "zh" ? "Web 规范" : "Web guideline",
    sourceLabel: guideline.issue,
    sourcePath: "lib/knowledge/web-guidelines.ts",
    summary: truncate(`${guideline.description} ${guideline.do}`),
    content: compactText([
      `Issue: ${guideline.issue}`,
      `Category: ${guideline.category}`,
      `Description: ${guideline.description}`,
      `Do: ${guideline.do}`,
      `Don't: ${guideline.dont}`,
      `Severity: ${guideline.severity}`,
      `Keywords: ${guideline.keywords.join(", ")}`,
    ].join("\n")),
    keywords: [guideline.issue, guideline.category, guideline.platform, ...guideline.keywords],
  }));

  const reactChunks = reactGuidelines.map((guideline) => ({
    id: `react-guideline-${slugify(guideline.issue)}`,
    kind: "reactGuideline" as const,
    locale,
    title: guideline.issue,
    section: locale === "zh" ? "React 规范" : "React guideline",
    sourceLabel: guideline.issue,
    sourcePath: "lib/knowledge/react-guidelines.ts",
    summary: truncate(`${guideline.description} ${guideline.do}`),
    content: compactText([
      `Issue: ${guideline.issue}`,
      `Category: ${guideline.category}`,
      `Description: ${guideline.description}`,
      `Do: ${guideline.do}`,
      `Don't: ${guideline.dont}`,
      `Severity: ${guideline.severity}`,
      `Keywords: ${guideline.keywords.join(", ")}`,
    ].join("\n")),
    keywords: [guideline.issue, guideline.category, guideline.platform, ...guideline.keywords],
  }));

  return [...webChunks, ...reactChunks];
}

export function getStyleKitRagCorpus(locale: Locale): RagDocumentChunk[] {
  const cached = corpusCache.get(locale);
  if (cached) {
    return cached;
  }

  const corpus = [
    ...buildStyleChunks(locale),
    ...buildTemplateChunks(locale),
    ...buildComponentPatternChunks(locale),
    ...buildPromptTopicChunks(locale),
    ...buildGuidelineChunks(locale),
  ];

  corpusCache.set(locale, corpus);
  return corpus;
}
