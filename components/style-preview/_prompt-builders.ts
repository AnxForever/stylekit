import type { Locale } from "@/lib/i18n/translations";

/**
 * Locale-aware markdown builders used by AiImplementationPanel to
 * produce the three downloadable documents (Hard Prompt,
 * Design Spec, Creative Brief). Extracted so the panel itself
 * stays focused on tab UI / copy / download state rather than
 * being the place where ~190 lines of bilingual markdown templates
 * live.
 */

function bulletList(values: string[]): string {
  const items = values.map((value) => value.trim()).filter(Boolean);
  return items.length > 0 ? items.map((value) => `- ${value}`).join("\n") : "- (none)";
}

interface DesignSpecColors {
  primary: string;
  secondary: string;
  accent: string[];
}

/**
 * Layout and motion values read off the style's own tokens. Optional because
 * the panel is a client component and the token registry is server-side; when
 * absent the spec falls back to wording that holds for any style.
 */
export interface DesignSpecTokens {
  section?: string;
  container?: string;
  card?: string;
  gap?: string;
  radius?: string;
  transition?: string;
  hover?: string;
  active?: string;
  focus?: string;
}

interface BuildDesignSpecArgs {
  locale: Locale;
  styleName: string;
  styleSlug: string;
  description: string;
  philosophy: string;
  colors: DesignSpecColors;
  doList: string[];
  dontList: string[];
  keywords: string[];
  tokens?: DesignSpecTokens;
}

/**
 * Layout and motion sections used to be one hard-coded paragraph shipped to
 * every style. It described a brutalist temperament - no blur, no gradients,
 * press states that flatten, deliberate asymmetry - which contradicted the
 * roughly ninety styles built on gradients and the forty-seven built on glass.
 * Both sections now quote the style's own tokens, and fall back to the style's
 * own do/don't list rather than to someone else's taste.
 */
function buildLayoutRules(
  locale: Locale,
  tokens: DesignSpecTokens | undefined,
  doList: string[]
): string {
  const lines: string[] = [];
  if (tokens?.section) {
    lines.push(locale === "en" ? `Section rhythm: \`${tokens.section}\`` : `区块节奏：\`${tokens.section}\``);
  }
  if (tokens?.container) {
    lines.push(locale === "en" ? `Container padding: \`${tokens.container}\`` : `容器内边距：\`${tokens.container}\``);
  }
  if (tokens?.card) {
    lines.push(locale === "en" ? `Card padding: \`${tokens.card}\`` : `卡片内边距：\`${tokens.card}\``);
  }
  if (tokens?.gap) {
    lines.push(locale === "en" ? `Default gap: \`${tokens.gap}\`` : `默认间距：\`${tokens.gap}\``);
  }
  if (tokens?.radius) {
    lines.push(locale === "en" ? `Corner radius: \`${tokens.radius}\`` : `圆角：\`${tokens.radius}\``);
  }

  if (lines.length === 0) {
    const fallback = doList.slice(0, 4);
    if (fallback.length > 0) return bulletList(fallback);
    return locale === "en"
      ? "- Keep spacing, alignment, and hierarchy consistent with this style's own rules."
      : "- 间距、对齐和层级都按这个风格自己的规则保持一致。";
  }

  return bulletList(lines);
}

function buildMotionRules(
  locale: Locale,
  tokens: DesignSpecTokens | undefined,
  doList: string[]
): string {
  const lines: string[] = [];
  if (tokens?.transition) {
    lines.push(locale === "en" ? `Transition: \`${tokens.transition}\`` : `过渡：\`${tokens.transition}\``);
  }
  if (tokens?.hover) {
    lines.push(locale === "en" ? `Hover: \`${tokens.hover}\`` : `悬停：\`${tokens.hover}\``);
  }
  if (tokens?.active) {
    lines.push(locale === "en" ? `Active: \`${tokens.active}\`` : `按下：\`${tokens.active}\``);
  }
  if (tokens?.focus) {
    lines.push(locale === "en" ? `Focus: \`${tokens.focus}\`` : `聚焦：\`${tokens.focus}\``);
  }

  if (lines.length === 0) {
    const fallback = doList.filter((item) => /hover|focus|active|motion|animation|动效|悬停|交互/i.test(item));
    if (fallback.length > 0) return bulletList(fallback.slice(0, 4));
    return locale === "en"
      ? "- Use this style's own interaction tokens; do not import motion from another style."
      : "- 用这个风格自己的交互 token，不要从别的风格搬动效。";
  }

  return bulletList(lines);
}

/**
 * Build the Design Spec document — the QA / reference doc that
 * explains the rules behind the hard prompt. Returns a complete
 * Markdown string ready to download as `${slug}-design-spec.md`.
 */
export function buildDesignSpec({
  locale,
  styleName,
  styleSlug,
  description,
  philosophy,
  colors,
  doList,
  dontList,
  keywords,
  tokens,
}: BuildDesignSpecArgs): string {
  const accents = colors.accent.join(", ");
  const layoutRules = buildLayoutRules(locale, tokens, doList);
  const motionRules = buildMotionRules(locale, tokens, doList);

  if (locale === "en") {
    return `# ${styleName} Design Spec

style_slug: ${styleSlug}

## When To Use
- Before implementation, when the team needs one shared definition of the style.
- Before handing work to AI, so colors, layout, components, motion, and accessibility have clear boundaries.
- During review, when you need a checklist for whether the result still matches the style.

## How To Use
- Read Overview and Visual System first to understand the signature.
- Treat Layout Rules and Component Rules as implementation boundaries.
- Use Delivery Check before accepting generated UI or shipping changes.

## Overview
${description}

## Design Intent
${philosophy.split("\n\n")[0] ?? description}

## Visual System
- Primary: ${colors.primary}
- Secondary: ${colors.secondary}
- Accents: ${accents}
- Signature cues: ${keywords.slice(0, 8).join(", ")}

## Layout Rules
${layoutRules}

## Component Rules
${bulletList(doList.slice(0, 8))}

## Interaction And Motion
${motionRules}
- Motion must not shift layout or trap focus.

## Accessibility
- Keep text contrast at WCAG AA or better.
- Preserve visible focus states on every interactive element.
- Maintain 44px mobile touch targets and respect reduced-motion preferences.

## Avoid
${bulletList(dontList.slice(0, 8))}

## Delivery Check
- The page should still be recognizable as ${styleName} after replacing sample content.
- Buttons, cards, inputs, empty states, errors, and loading states should share one visual language.
- Nothing from the Avoid list above has leaked in from a generic UI library default.`;
  }

  return `# ${styleName} 设计规范

style_slug: ${styleSlug}

## 什么时候用
- 实现前需要统一团队或 AI 对这个风格的理解时使用。
- 把任务交给 AI 前，用它确定颜色、布局、组件、动效和可访问性的边界。
- 审核结果时，用它判断生成界面是否仍然属于这个风格。

## 怎么用
- 先读"概览"和"视觉系统"，理解这个风格的识别点。
- 把"布局规则"和"组件规则"当作实现边界。
- 交付前按"交付检查"逐条自检。

## 概览
${description}

## 设计意图
${philosophy.split("\n\n")[0] ?? description}

## 视觉系统
- Primary: ${colors.primary}
- Secondary: ${colors.secondary}
- Accents: ${accents}
- Signature cues: ${keywords.slice(0, 8).join("、")}

## 布局规则
${layoutRules}

## 组件规则
${bulletList(doList.slice(0, 8))}

## 交互与动效
${motionRules}
- 动效不得引发布局位移或抢走焦点。

## 可访问性
- 文字对比度保持 WCAG AA 或更高。
- 每个可交互元素都必须保留清晰键盘焦点。
- 移动端触控目标不低于 44px，并尊重 reduced-motion。

## 禁止项
${bulletList(dontList.slice(0, 8))}

## 交付检查
- 替换示例内容后，页面仍应一眼识别为 ${styleName}。
- 按钮、卡片、输入、空状态、错误、加载状态应共享同一套视觉语言。
- 上面"禁止项"里的任何一条都没有被通用组件库的默认样式带进来。`;
}

interface AddPromptPurposeArgs {
  locale: Locale;
  kind: "hard" | "creative";
  content: string;
}

/**
 * Prepend a "## When To Use" / "## How To Use" section to a prompt
 * produced by buildPromptPair, so the prompt is self-documenting
 * when the user copies or downloads it.
 */
export function addPromptPurpose({
  locale,
  kind,
  content,
}: AddPromptPurposeArgs): string {
  if (locale === "en") {
    const purpose =
      kind === "hard"
        ? "Use this when you want AI to generate code with strict style consistency. It is the safest default for production UI."
        : "Use this when you want AI to explore the direction more freely while keeping the core style identity.";
    const steps =
      kind === "hard"
        ? [
            "Copy the full prompt into ChatGPT, Claude, Cursor, or another coding assistant.",
            "Append the concrete product/page requirement after the prompt.",
            "After generation, check the forbidden rules and interaction states before accepting the output.",
          ]
        : [
            "Copy the brief into the AI tool when you are still exploring directions.",
            "Add the target page type, audience, and any reference constraints.",
            "Ask for 2-3 directions first, then switch to Hard Prompt once one direction is chosen.",
          ];
    const title = kind === "hard" ? "# Hard Prompt" : "# Creative Brief";
    return content.replace(
      /# (Hard Prompt|Soft Prompt)/,
      `${title}\n\n## When To Use\n${purpose}\n\n## How To Use\n${bulletList(steps)}`
    );
  }

  const purpose =
    kind === "hard"
      ? "当你希望 AI 严格按风格规则生成代码时使用。它是生产界面最稳的默认选择。"
      : "当你希望 AI 做方向探索、方案发散时使用。它保留核心风格识别度，但允许实现更灵活。";
  const steps =
    kind === "hard"
      ? [
          "把完整提示词复制到 ChatGPT、Claude、Cursor 或其他编码助手。",
          "在提示词后追加具体产品、页面或组件需求。",
          "生成后按禁止项和交互状态检查，确认没有风格漂移。",
        ]
      : [
          "还在探索方向时，把它复制到 AI 工具里。",
          "补充页面类型、目标用户和参考约束。",
          "先让 AI 给 2-3 个方向，确定方向后再用硬性提示词落地。",
        ];
  const title = kind === "hard" ? "# Hard Prompt" : "# Creative Brief";
  return content.replace(
    /# (Hard Prompt|Soft Prompt)/,
    `${title}\n\n## 什么时候用\n${purpose}\n\n## 怎么用\n${bulletList(steps)}`
  );
}