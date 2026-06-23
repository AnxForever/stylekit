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
}: BuildDesignSpecArgs): string {
  const accents = colors.accent.join(", ");

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
- Use direct, high-contrast hierarchy before decorative density.
- Keep sections scannable with strong dividers, clear alignment, and deliberate asymmetry.
- Preserve stable responsive dimensions for controls, cards, and preview surfaces.

## Component Rules
${bulletList(doList.slice(0, 8))}

## Interaction And Motion
- Hover states should feel immediate and physical.
- Active states should visibly compress or flatten the element.
- Avoid soft fades, blurry depth, or motion that changes layout unexpectedly.

## Accessibility
- Keep text contrast at WCAG AA or better.
- Preserve visible focus states on every interactive element.
- Maintain 44px mobile touch targets and respect reduced-motion preferences.

## Avoid
${bulletList(dontList.slice(0, 8))}

## Delivery Check
- The page should still be recognizable as ${styleName} after replacing sample content.
- Buttons, cards, inputs, empty states, errors, and loading states should share one visual language.
- No rounded-card, blurred-shadow, or gradient-heavy defaults should leak in from generic UI libraries.`;
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
- 先建立直接、高对比的信息层级，再考虑装饰密度。
- 区块需要易扫读：强分隔、明确对齐、可控的不对称。
- 控件、卡片、预览区域要有稳定的响应式尺寸，避免交互时跳动。

## 组件规则
${bulletList(doList.slice(0, 8))}

## 交互与动效
- Hover 反馈要即时、明确、有实体碰撞感。
- Active 状态要明显压平或压缩元素。
- 避免柔和淡入、模糊景深、以及会引发布局变化的动效。

## 可访问性
- 文字对比度保持 WCAG AA 或更高。
- 每个可交互元素都必须保留清晰键盘焦点。
- 移动端触控目标不低于 44px，并尊重 reduced-motion。

## 禁止项
${bulletList(dontList.slice(0, 8))}

## 交付检查
- 替换示例内容后，页面仍应一眼识别为 ${styleName}。
- 按钮、卡片、输入、空状态、错误、加载状态应共享同一套视觉语言。
- 不允许通用组件库的圆角卡片、模糊阴影、重渐变默认样式泄漏进来。`;
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