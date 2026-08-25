/**
 * Artifact generation: one style → the adoption kit a project actually uses.
 *
 * A prompt is spent the moment it is pasted. The files that keep a style
 * enforced — IDE rules, shadcn theme, Tailwind preset, Figma tokens, the
 * agent skill — are what a team can adopt. Everything here comes from
 * stylekit-core; nothing is invented at runtime.
 */

import {
  generateStylePack,
  generateIdeConfig,
  getIdeConfigFilename,
  generateShadcnThemeCSS,
  generateTailwindPresetJS,
  generateFigmaTokens,
  generateCSSVariables,
  generateSkillPack,
  type StylePackFile,
} from "stylekit-core/export";
import { getStyleBySlug, getStyleTokens } from "stylekit-core/styles";
import {
  buildHardPrompt,
  buildPromptPair,
  type PromptContext,
} from "stylekit-core/prompt";
import type { StyleIntent } from "../planner/index.js";

export interface Artifact {
  /** Filename, including any directory the target tool expects. */
  name: string;
  /** File contents. */
  content: string;
  /** What this artifact is for, in one line. */
  purpose: string;
}

export class ArtifactError extends Error {
  constructor(public readonly slug: string) {
    super(`Style "${slug}" is not in the catalog.`);
    this.name = "ArtifactError";
  }
}

/** Maps the planner's brief into the shape buildHardPrompt consumes. */
export function intentToPromptContext(intent: StyleIntent): PromptContext {
  return {
    projectType: intent.projectType,
    brandPersonality: intent.brief.brandPersonality.join("、"),
    antiReferences: intent.brief.antiReferences.join("；"),
  };
}

export function generateArtifacts(slug: string, context?: PromptContext): Artifact[] {
  const style = getStyleBySlug(slug);
  if (!style) throw new ArtifactError(slug);

  const tokens = getStyleTokens(slug);
  const promptContext = context ?? { projectType: "", brandPersonality: "", antiReferences: "" };
  const promptInput = {
    styleName: style.name,
    styleSlug: style.slug,
    aiRules: style.aiRules,
    aiRulesEn: style.aiRulesEn,
    doList: style.doList,
    doListEn: style.doListEn,
    dontList: style.dontList,
    dontListEn: style.dontListEn,
    keywords: style.keywords,
    keywordsEn: style.keywordsEn,
  };

  const artifacts: Artifact[] = [
    {
      name: "stylekit/AI-PROMPT.md",
      content: buildHardPrompt(promptInput, "zh", promptContext),
      purpose: "交给 AI 编程助手的成品硬提示词（规则契约）",
    },
    {
      name: "stylekit/BRIEF.md",
      content: buildPromptPair(promptInput, "zh", promptContext).softPrompt,
      purpose: "给团队人看的风格简介（软提示词）",
    },
  ];

  // IDE rules: the files that keep the style enforced on every edit.
  const ideFormats = ["cursorrules", "claude-rules", "windsurf-rules", "generic"] as const;
  for (const format of ideFormats) {
    const rules = generateIdeConfig(slug, format);
    if (!rules) continue;
    artifacts.push({
      name: `stylekit/${getIdeConfigFilename(slug, format)}`,
      content: rules,
      purpose:
        format === "cursorrules"
          ? "Cursor 项目规则（写码时自动约束）"
          : format === "claude-rules"
            ? "Claude Code 项目规则（写码时自动约束）"
            : format === "windsurf-rules"
              ? "Windsurf 项目规则"
              : "通用 AI 规则（不限工具）",
    });
  }

  // Theme and token artifacts.
  artifacts.push(
    {
      name: "stylekit/theme/shadcn-theme.css",
      content: generateShadcnThemeCSS(style),
      purpose: "shadcn/ui 主题（CSS 变量）",
    },
    {
      name: "stylekit/theme/tailwind-preset.js",
      content: generateTailwindPresetJS(style, tokens),
      purpose: "Tailwind preset（import 即用）",
    },
    {
      name: "stylekit/theme/tokens.css",
      content: generateCSSVariables(style),
      purpose: "CSS 变量（任意框架可用）",
    },
    {
      name: "stylekit/theme/figma-tokens.json",
      content: JSON.stringify(generateFigmaTokens(style), null, 2),
      purpose: "Figma Tokens（导入 Figma 即用）",
    },
    {
      name: "stylekit/theme/global.css",
      content: style.globalCss || "",
      purpose: "风格全局样式（贴进项目根样式）",
    },
  );

  // The full pack (metadata, tokens, presets) as individual files.
  const pack: StylePackFile[] = generateStylePack(style, tokens, { version: "1.0.0" });
  for (const file of pack) {
    artifacts.push({
      name: `stylekit/pack/${file.name}`,
      content: file.content ?? "",
      purpose: file.description || "stylekit pack",
    });
  }

  // Agent skill: makes the style reusable as an installable skill.
  artifacts.push({
    name: "stylekit/skill/SKILL.md",
    content: generateSkillPack({
      style,
      tokens,
      includeRecipes: true,
      includeForbidden: true,
    }),
    purpose: "可安装的 Agent Skill（把风格装进任何 agent）",
  });

  // Component recipes as real code, ready to copy.
  for (const [component, template] of Object.entries(style.components)) {
    const code = typeof template === "string" ? template : (template as { code?: string }).code;
    if (typeof code !== "string" || !code.trim()) continue;
    artifacts.push({
      name: `stylekit/components/${component}.tsx`,
      content: code,
      purpose: `${component} 组件真实代码（复制即用）`,
    });
  }

  return artifacts;
}

/** Total content size, for the delivery card. */
export function artifactsSize(artifacts: Artifact[]): number {
  return artifacts.reduce((sum, artifact) => sum + artifact.content.length, 0);
}
