/**
 * Prompt Composer (Phase 1 of Compositional Prompt Generation)
 *
 * Instead of returning the raw template-filled prompt from `buildAgentCodePrompt`
 * (which concatenates `style.aiRules` verbatim), the composer takes the same
 * materials and asks the agent LLM to re-synthesize them into a single cohesive,
 * unique prompt. This produces per-request variation and avoids copy-paste style
 * rules leaking into every generation.
 *
 * Controlled by env `AGENT_USE_COMPOSITION` (default on). On failure or when
 * disabled, falls back to the deterministic `buildAgentCodePrompt` output.
 */

import { z } from "zod";
import type { Locale } from "@/lib/i18n/translations";
import type { SmartRecommendation, DesignRecommendation } from "@/lib/knowledge";
import type { AgentCodePrompt, AgentPlannerResult } from "./types";
import type { AgentProjectKnowledgeContext } from "./project-knowledge";
import type { OnUsageCallback } from "./observability";
import { buildAgentCodePrompt } from "./code-prompt";
import { requestAgentJson, isAgentModelConfigured } from "./provider";
import { getStyleBySlug } from "@/lib/styles";
import { hasCompleteAtoms, readAtom, type StyleAtoms } from "@/lib/styles/atoms";

const composedSchema = z.object({
  title: z.string().min(1),
  prompt: z.string().min(80),
});

function isCompositionEnabled(): boolean {
  const flag = process.env.AGENT_USE_COMPOSITION?.trim().toLowerCase();
  if (flag === "false" || flag === "0" || flag === "off") return false;
  return true;
}

function buildComposerSystemPrompt(locale: Locale): string {
  if (locale === "zh") {
    return [
      "你是 StyleKit 的「Prompt Composer」——一个专门把多维设计素材合成为单条高质量代码生成 prompt 的 AI。",
      "",
      "你会收到一份「素材包」，里面包含：页面需求、章节结构、实现要求、设计推荐、动效方向以及一套风格规则。",
      "你的任务：把它们**融会贯通**，重新组织为一段独一无二、逻辑自洽的 prompt，交给下游 coding agent 生成 React + Tailwind v4 页面。",
      "",
      "硬性规则：",
      "1. 不要整段复制素材中的句子，尤其不要把风格规则原文塞回输出——必须用自己的话重新表达。",
      "2. 保留所有具体事实：颜色 hex、字体名、章节顺序、必须包含项、约束、CTA 等一个都不能丢。",
      "3. 风格哲学要融进段落描述，而不是作为独立规则列表罗列。",
      "4. 如果素材包里提供了『多维度偏好』（布局/动效/配色/字体），**必须**把它们作为硬约束融进输出的相应段落，不能忽略。",
      "5. 如果素材包里提供了『风格原子』，**它是最高优先级的风格来源**——philosophy/layout/motion/color/typography 这些维度请以原子描述为准，其它风格规则仅作补充；forbiddens 视为不可违反的禁区。",
      "6. 输出语言与 locale 一致（当前：zh）。",
      "7. 不要写分析、不要写思考过程、不要 markdown 代码块围栏。",
      "",
      "输出严格 JSON：{\"title\": string, \"prompt\": string}。title 形如「模板类型 - 风格名」，prompt 是完整可直接喂给 coding agent 的长文本。",
    ].join("\n");
  }
  return [
    "You are StyleKit's Prompt Composer — an AI that synthesizes multi-dimensional design materials into a single high-quality code generation prompt.",
    "",
    "You will receive a \"materials pack\" containing: page brief, section plan, implementation notes, design recommendations, motion direction, and a set of style rules.",
    "Your job: weave them together into a unique, internally consistent prompt for a downstream coding agent generating a React + Tailwind v4 page.",
    "",
    "Hard rules:",
    "1. Do NOT copy sentences verbatim from the materials, especially the style rules — rephrase in your own voice.",
    "2. Preserve every concrete fact: hex colors, font names, section order, must-haves, constraints, CTAs — none may be dropped.",
    "3. Weave style philosophy into prose, do not list it as standalone rules.",
    "4. If the materials include 'Multi-dimensional preferences' (layout/motion/color/typography), you MUST integrate them as hard constraints in the corresponding sections — do not ignore.",
    "5. If the materials include 'Style atoms', treat them as the HIGHEST-PRIORITY style source — philosophy/layout/motion/color/typography must follow the atom descriptions; other style rules only supplement. Treat forbiddens as inviolable.",
    "6. Output language must match locale (current: en).",
    "7. No analysis, no chain-of-thought, no markdown code fences.",
    "",
    "Return strict JSON: {\"title\": string, \"prompt\": string}. title like \"<template type> - <style name>\"; prompt is a long text block ready to feed a coding agent.",
  ].join("\n");
}

function buildAtomsSection(atoms: StyleAtoms, locale: Locale): string[] {
  const header = locale === "zh" ? "## 风格原子（最高优先级）" : "## Style atoms (highest priority)";
  const labels = locale === "zh"
    ? { philosophy: "哲学", layout: "布局", motion: "动效", color: "配色", typography: "字体", forbiddens: "禁区" }
    : { philosophy: "Philosophy", layout: "Layout", motion: "Motion", color: "Color", typography: "Typography", forbiddens: "Forbiddens" };

  const lines = [
    header,
    `- ${labels.philosophy}: ${readAtom(atoms.philosophy, locale)}`,
    `- ${labels.layout}: ${readAtom(atoms.layout, locale)}`,
    `- ${labels.motion}: ${readAtom(atoms.motion, locale)}`,
    `- ${labels.color}: ${readAtom(atoms.color, locale)}`,
    `- ${labels.typography}: ${readAtom(atoms.typography, locale)}`,
  ];

  if (atoms.forbiddens && atoms.forbiddens.length > 0) {
    lines.push(`- ${labels.forbiddens}:`);
    for (const f of atoms.forbiddens) {
      lines.push(`  - ${readAtom(f, locale)}`);
    }
  }

  return lines;
}

function buildComposerUserPayload(
  base: AgentCodePrompt,
  locale: Locale,
  planner: AgentPlannerResult,
  atoms: StyleAtoms | undefined
): string {
  const header = locale === "zh" ? "## 素材包（请合成）" : "## Materials (compose these)";
  const noteHeader = locale === "zh" ? "## 元信息" : "## Meta";
  const hintsHeader = locale === "zh" ? "## 多维度偏好（必须融入输出）" : "## Multi-dimensional preferences (must be woven in)";

  const hints: string[] = [];
  if (planner.layoutHint?.trim()) {
    hints.push(`- ${locale === "zh" ? "布局方向" : "Layout"}: ${planner.layoutHint}`);
  }
  if (planner.motionHint?.trim()) {
    hints.push(`- ${locale === "zh" ? "动效方向" : "Motion"}: ${planner.motionHint}`);
  }
  if (planner.colorHint?.trim()) {
    hints.push(`- ${locale === "zh" ? "配色倾向" : "Color"}: ${planner.colorHint}`);
  }
  if (planner.typographyHint?.trim()) {
    hints.push(`- ${locale === "zh" ? "字体方向" : "Typography"}: ${planner.typographyHint}`);
  }

  const sections = [
    noteHeader,
    `- locale: ${locale}`,
    `- styleName: ${base.styleName}`,
    `- styleSlug: ${base.styleSlug}`,
    `- templateType: ${base.templateType}`,
    `- fallbackTitle: ${base.title}`,
  ];

  if (atoms) {
    sections.push("", ...buildAtomsSection(atoms, locale));
  }

  if (hints.length > 0) {
    sections.push("", hintsHeader, ...hints);
  }

  sections.push("", header, base.prompt);
  return sections.join("\n");
}

export async function composeAgentCodePrompt(params: {
  locale: Locale;
  planner: AgentPlannerResult;
  smartRecommendation: SmartRecommendation;
  projectKnowledge: AgentProjectKnowledgeContext;
  designRecommendation?: DesignRecommendation | null;
  onUsage?: OnUsageCallback;
}): Promise<AgentCodePrompt> {
  const base = buildAgentCodePrompt(params);

  if (!isCompositionEnabled() || !isAgentModelConfigured()) {
    return base;
  }

  const style = getStyleBySlug(base.styleSlug);
  const rawAtoms = style?.atoms;
  const atoms: StyleAtoms | undefined = hasCompleteAtoms(rawAtoms) ? rawAtoms : undefined;

  try {
    const composed = await requestAgentJson({
      schema: composedSchema,
      system: buildComposerSystemPrompt(params.locale),
      user: buildComposerUserPayload(base, params.locale, params.planner, atoms),
      temperature: 0.7,
      onUsage: params.onUsage,
    });

    return {
      title: composed.title || base.title,
      prompt: composed.prompt,
      styleName: base.styleName,
      styleSlug: base.styleSlug,
      templateType: base.templateType,
    };
  } catch {
    /* Composer is best-effort; fall back to deterministic template on any failure. */
    return base;
  }
}
