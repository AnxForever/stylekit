// Enhanced AI Rules Generator
// Generates comprehensive, self-validating AI instructions from each style's
// own tokens and rules. No visual treatment is hard-coded here.

import type { DesignStyle } from "./types";
import type { StyleTokens } from "./tokens";

interface EnhancedRulesOptions {
  style: DesignStyle;
  tokens: StyleTokens;
  format: "full" | "compact" | "claude-code" | "cursor";
}

export function generateEnhancedAIRules({ style, tokens, format }: EnhancedRulesOptions): string {
  const sections = [
    generateHeader(style),
    generateTokenDictionary(tokens),
    generateForbiddenRules(tokens),
    generateRequiredPatterns(tokens),
    generateBeforeAfterExamples(style, tokens),
    generateSkeletonTemplates(style, tokens),
    generateSelfCheckList(style, tokens),
    generateExamplePrompts(style),
  ];

  if (format === "compact") {
    return [
      generateHeader(style),
      generateTokenDictionary(tokens),
      generateForbiddenRules(tokens),
      generateSelfCheckList(style, tokens),
    ].join("\n\n");
  }

  return sections.filter(Boolean).join("\n\n---\n\n");
}

function generateHeader(style: DesignStyle): string {
  return `# ${style.nameEn} (${style.name}) Design System

> ${style.description}

## 核心理念

${style.philosophy}`;
}

function generateTokenDictionary(tokens: StyleTokens): string {
  return `## Token 字典（精确 Class 映射）

### 边框
\`\`\`
宽度: ${tokens.border.width}
颜色: ${tokens.border.color}
圆角: ${tokens.border.radius}
\`\`\`

### 阴影
\`\`\`
小:   ${tokens.shadow.sm}
中:   ${tokens.shadow.md}
大:   ${tokens.shadow.lg}
悬停: ${tokens.shadow.hover}
聚焦: ${tokens.shadow.focus}
\`\`\`

### 交互效果
\`\`\`
悬停位移: ${tokens.interaction.hoverTranslate ?? "（无）"}
悬停缩放: ${tokens.interaction.hoverScale ?? "（无）"}
悬停透明度: ${tokens.interaction.hoverOpacity ?? "（无）"}
过渡动画: ${tokens.interaction.transition}
${tokens.interaction.active ? `按下状态: ${tokens.interaction.active}` : ""}
\`\`\`

### 字体
\`\`\`
标题: ${tokens.typography.heading}
正文: ${tokens.typography.body}
${tokens.typography.mono ? `等宽: ${tokens.typography.mono}` : ""}
\`\`\`

### 字号
\`\`\`
Hero:  ${tokens.typography.sizes.hero}
H1:    ${tokens.typography.sizes.h1}
H2:    ${tokens.typography.sizes.h2}
H3:    ${tokens.typography.sizes.h3}
正文:  ${tokens.typography.sizes.body}
小字:  ${tokens.typography.sizes.small}
\`\`\`

### 间距
\`\`\`
Section: ${tokens.spacing.section}
容器:    ${tokens.spacing.container}
卡片:    ${tokens.spacing.card}
小间距:  ${tokens.spacing.gap.sm}
中间距:  ${tokens.spacing.gap.md}
大间距:  ${tokens.spacing.gap.lg}
\`\`\`

### 颜色角色
\`\`\`
背景主色: ${tokens.colors.background.primary}
背景辅色: ${tokens.colors.background.secondary}
背景强调色: ${tokens.colors.background.accent.join(", ") || "（无）"}
正文主色: ${tokens.colors.text.primary}
正文辅色: ${tokens.colors.text.secondary}
正文弱化色: ${tokens.colors.text.muted}
按钮主色: ${tokens.colors.button.primary}
按钮辅色: ${tokens.colors.button.secondary}
\`\`\``;
}

function generateForbiddenRules(tokens: StyleTokens): string {
  const forbiddenList = tokens.forbidden.classes
    .slice(0, 20)
    .map((cls) => `- \`${cls}\``)
    .join("\n");

  const patternList = tokens.forbidden.patterns
    .map((pattern) => `- 匹配 \`${pattern}\``)
    .join("\n");

  const reasonList = Object.entries(tokens.forbidden.reasons)
    .map(([cls, reason]) => `- \`${cls}\`: ${reason}`)
    .join("\n");

  return `## [FORBIDDEN] 绝对禁止

以下 class 在本风格中**绝对禁止使用**，生成时必须检查并避免：

### 禁止的 Class
${forbiddenList || "- （当前风格没有登记的禁止 class）"}

### 禁止的模式
${patternList || "- （当前风格没有登记的禁止模式）"}

### 禁止原因
${reasonList || "- 以当前风格的设计规则为准。"}

> WARNING: 如果你的代码中包含以上任何 class，必须立即替换。`;
}

function generateRequiredPatterns(tokens: StyleTokens): string {
  return `## [REQUIRED] 必须包含

### 按钮必须包含
\`\`\`
${tokens.required.button.join("\n")}
\`\`\`

### 卡片必须包含
\`\`\`
${tokens.required.card.join("\n")}
\`\`\`

### 输入框必须包含
\`\`\`
${tokens.required.input.join("\n")}
\`\`\``;
}

function generateBeforeAfterExamples(style: DesignStyle, tokens: StyleTokens): string {
  const buttonClasses = tokens.required.button.join(" ");
  const cardClasses = tokens.required.card.join(" ");
  const inputClasses = tokens.required.input.join(" ");
  const primaryButton = tokens.colors.button.primary;

  return `## [COMPARE] ${style.nameEn} 错误 vs 正确对比

以下错误示例只代表“未经过当前风格适配的通用默认值”，不要把错误示例当成视觉建议。

### 按钮

[WRONG] **错误示例**（通用组件库默认样式，不要直接复制）：
\`\`\`html
<button class="{GENERIC_LIBRARY_BUTTON_DEFAULT}">
  点击我
</button>
\`\`\`

[CORRECT] **正确示例**（使用 ${style.nameEn} 的 token）：
\`\`\`html
<button class="${buttonClasses} ${primaryButton}">
  点击我
</button>
\`\`\`

### 卡片

[WRONG] **错误示例**（未经当前风格适配的通用卡片）：
\`\`\`html
<div class="{GENERIC_LIBRARY_CARD_DEFAULT}">
  <h3>{TITLE}</h3>
</div>
\`\`\`

[CORRECT] **正确示例**（使用 ${style.nameEn} 的 card token）：
\`\`\`html
<div class="${cardClasses} ${tokens.spacing.card}">
  <h3 class="${tokens.typography.heading} ${tokens.typography.sizes.h3}">{TITLE}</h3>
</div>
\`\`\`

### 输入框

[WRONG] **错误示例**（未经当前风格适配的通用输入框）：
\`\`\`html
<input class="{GENERIC_LIBRARY_INPUT_DEFAULT}" />
\`\`\`

[CORRECT] **正确示例**（使用 ${style.nameEn} 的 input token）：
\`\`\`html
<input class="${inputClasses}" placeholder="{PLACEHOLDER}" />
\`\`\``;
}

function generateSkeletonTemplates(style: DesignStyle, tokens: StyleTokens): string {
  const primaryBackground = tokens.colors.background.primary;
  const secondaryBackground = tokens.colors.background.secondary;
  const accentBackground = tokens.colors.background.accent[0] ?? primaryBackground;
  const primaryText = tokens.colors.text.primary;
  const secondaryText = tokens.colors.text.secondary;
  const buttonClasses = `${tokens.required.button.join(" ")} ${tokens.colors.button.primary}`;
  const cardClasses = `${tokens.required.card.join(" ")} ${tokens.spacing.card}`;
  const inputClasses = tokens.required.input.join(" ");

  return `## [TEMPLATES] ${style.nameEn} 页面骨架模板

以下骨架只使用当前风格的 token。替换 \`{PLACEHOLDER}\` 时，不要移除或替换这些 token：

### 导航栏骨架
\`\`\`html
<nav class="${primaryBackground} ${primaryText} ${tokens.border.width} ${tokens.border.color} ${tokens.spacing.container}">
  <div class="flex items-center justify-between max-w-6xl mx-auto ${tokens.spacing.gap.md}">
    <a href="/" class="${tokens.typography.heading} ${tokens.typography.sizes.h3}">
      {LOGO_TEXT}
    </a>
    <div class="flex ${tokens.spacing.gap.md} ${tokens.typography.body} ${tokens.typography.sizes.small}">
      {NAV_LINKS}
    </div>
  </div>
</nav>
\`\`\`

### Hero 区块骨架
\`\`\`html
<section class="${accentBackground} ${primaryText} ${tokens.spacing.section} ${tokens.spacing.container}">
  <div class="max-w-4xl mx-auto">
    <h1 class="${tokens.typography.heading} ${tokens.typography.sizes.hero}">
      {HEADLINE}
    </h1>
    <p class="${tokens.typography.body} ${tokens.typography.sizes.body} max-w-xl">
      {SUBHEADLINE}
    </p>
    <button class="${buttonClasses}">
      {CTA_TEXT}
    </button>
  </div>
</section>
\`\`\`

### 卡片网格骨架
\`\`\`html
<section class="${primaryBackground} ${primaryText} ${tokens.spacing.section} ${tokens.spacing.container}">
  <div class="max-w-6xl mx-auto">
    <h2 class="${tokens.typography.heading} ${tokens.typography.sizes.h2}">{SECTION_TITLE}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${tokens.spacing.gap.md}">
      <!-- Card template - repeat for each card -->
      <div class="${cardClasses}">
        <h3 class="${tokens.typography.heading} ${tokens.typography.sizes.h3}">{CARD_TITLE}</h3>
        <p class="${tokens.typography.body} ${tokens.typography.sizes.body} ${tokens.colors.text.muted}">{CARD_DESCRIPTION}</p>
      </div>
    </div>
  </div>
</section>
\`\`\`

### 表单输入骨架
\`\`\`html
<input class="${inputClasses}" placeholder="{PLACEHOLDER}" />
\`\`\`

### 页脚骨架
\`\`\`html
<footer class="${secondaryBackground} ${secondaryText} ${tokens.spacing.section} ${tokens.spacing.container}">
  <div class="max-w-6xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-3 ${tokens.spacing.gap.lg}">
      <div>
        <span class="${tokens.typography.heading} ${tokens.typography.sizes.h3}">{LOGO_TEXT}</span>
        <p class="${tokens.typography.body} ${tokens.typography.sizes.small}">{TAGLINE}</p>
      </div>
      <div>
        <h4 class="${tokens.typography.heading} ${tokens.typography.sizes.h3}">{COLUMN_TITLE}</h4>
        <ul class="${tokens.typography.body} ${tokens.typography.sizes.small}">
          {FOOTER_LINKS}
        </ul>
      </div>
    </div>
  </div>
</footer>
\`\`\``;
}

function generateSelfCheckList(style: DesignStyle, tokens: StyleTokens): string {
  const requiredChecks = [
    `按钮包含：\`${tokens.required.button.join(" ")}\``,
    `卡片包含：\`${tokens.required.card.join(" ")}\``,
    `输入框包含：\`${tokens.required.input.join(" ")}\``,
  ];
  const forbiddenChecks = tokens.forbidden.classes
    .slice(0, 8)
    .map((item) => `没有使用 \`${item}\``);
  const requiredStyleRules = style.doList.slice(0, 5);
  const forbiddenStyleRules = style.dontList.slice(0, 5);

  return `## [CHECKLIST] ${style.nameEn} 生成后自检清单

**输出代码前，逐项验证当前风格的 token 和规则。如有违反，先修正再交付：**

### Token 检查
${requiredChecks.map((item) => `- [ ] ${item}`).join("\n")}

### 禁止项检查
${forbiddenChecks.length > 0 ? forbiddenChecks.map((item) => `- [ ] ${item}`).join("\n") : "- [ ] 没有使用当前风格禁止的 class 或模式"}

### 风格规则检查
${requiredStyleRules.length > 0 ? requiredStyleRules.map((item) => `- [ ] ${item}`).join("\n") : "- [ ] 遵循当前风格的核心规则"}

### 风格漂移检查
${forbiddenStyleRules.length > 0 ? forbiddenStyleRules.map((item) => `- [ ] 没有违反：${item}`).join("\n") : "- [ ] 没有引入与当前风格冲突的默认样式"}

### 通用交付检查
- [ ] 响应式布局在手机、平板和桌面下稳定，没有横向溢出
- [ ] 所有交互元素有清晰焦点、可访问名称和 reduced-motion 方案
- [ ] 文本对比度达到 WCAG AA，且没有用颜色单独传递状态
- [ ] 结果仍然能够一眼识别为 ${style.nameEn}，没有混入其他风格的模板`;
}

function generateExamplePrompts(style: DesignStyle): string {
  if (!style.examplePrompts || style.examplePrompts.length === 0) {
    return "";
  }

  const promptList = style.examplePrompts
    .map((prompt, index) => `### ${index + 1}. ${prompt.title}\n\n${prompt.description}\n\n\`\`\`\n${prompt.prompt}\n\`\`\``)
    .join("\n\n");

  return `## [EXAMPLES] 示例 Prompt

${promptList}`;
}
