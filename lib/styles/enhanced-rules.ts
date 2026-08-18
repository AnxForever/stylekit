// Enhanced AI Rules Generator
// Generates comprehensive, self-validating AI instructions from each style's
// own tokens and rules. No visual treatment is hard-coded here.

import type { DesignStyle } from "./types";
import type { StyleTokens } from "./tokens";

type RulesLocale = "zh" | "en";

interface EnhancedRulesOptions {
  style: DesignStyle;
  tokens: StyleTokens;
  format: "full" | "compact" | "claude-code" | "cursor";
  /**
   * Label language for the generated spec. Token values are Tailwind classes
   * and stay identical; only headings and labels change. English prompts used
   * to drop this whole spec because the prompt builder rejects CJK sources.
   */
  locale?: RulesLocale;
}

const LABELS = {
  zh: {
    philosophy: "核心理念",
    tokenDictionary: "Token 字典（精确 Class 映射）",
    border: "边框",
    width: "宽度",
    color: "颜色",
    radius: "圆角",
    shadow: "阴影",
    small: "小",
    medium: "中",
    large: "大",
    hover: "悬停",
    focus: "聚焦",
    interaction: "交互效果",
    hoverTranslate: "悬停位移",
    hoverScale: "悬停缩放",
    hoverOpacity: "悬停透明度",
    transition: "过渡动画",
    active: "按下状态",
    none: "（无）",
    fonts: "字体",
    heading: "标题",
    body: "正文",
    mono: "等宽",
    sizes: "字号",
    bodySize: "正文",
    smallSize: "小字",
    spacing: "间距",
    container: "容器",
    card: "卡片",
    gapSm: "小间距",
    gapMd: "中间距",
    gapLg: "大间距",
    colorRoles: "颜色角色",
    bgPrimary: "背景主色",
    bgSecondary: "背景辅色",
    bgAccent: "背景强调色",
    textPrimary: "正文主色",
    textSecondary: "正文辅色",
    textMuted: "正文弱化色",
    buttonPrimary: "按钮主色",
    buttonSecondary: "按钮辅色",
  },
  en: {
    philosophy: "Design Philosophy",
    tokenDictionary: "Token Dictionary (exact class mapping)",
    border: "Border",
    width: "Width",
    color: "Color",
    radius: "Radius",
    shadow: "Shadow",
    small: "sm",
    medium: "md",
    large: "lg",
    hover: "hover",
    focus: "focus",
    interaction: "Interaction",
    hoverTranslate: "Hover translate",
    hoverScale: "Hover scale",
    hoverOpacity: "Hover opacity",
    transition: "Transition",
    active: "Active",
    none: "(none)",
    fonts: "Typefaces",
    heading: "Heading",
    body: "Body",
    mono: "Mono",
    sizes: "Type scale",
    bodySize: "Body",
    smallSize: "Small",
    spacing: "Spacing",
    container: "Container",
    card: "Card",
    gapSm: "Gap sm",
    gapMd: "Gap md",
    gapLg: "Gap lg",
    colorRoles: "Color roles",
    bgPrimary: "Background primary",
    bgSecondary: "Background secondary",
    bgAccent: "Background accent",
    textPrimary: "Text primary",
    textSecondary: "Text secondary",
    textMuted: "Text muted",
    buttonPrimary: "Button primary",
    buttonSecondary: "Button secondary",
  },
} as const;

const COMPARE_LABELS = {
  zh: {
    title: "错误 vs 正确对比",
    intro: "以下错误示例只代表“未经过当前风格适配的通用默认值”，不要把错误示例当成视觉建议。",
    button: "按钮",
    card: "卡片",
    input: "输入框",
    wrongButton: "**错误示例**（通用组件库默认样式，不要直接复制）：",
    rightButton: "**正确示例**（使用当前风格的 token）：",
    wrongCard: "**错误示例**（未经当前风格适配的通用卡片）：",
    rightCard: "**正确示例**（使用当前风格的 card token）：",
    wrongInput: "**错误示例**（未经当前风格适配的通用输入框）：",
    rightInput: "**正确示例**（使用当前风格的 input token）：",
    clickMe: "点击我",
  },
  en: {
    title: "wrong vs right",
    intro:
      "The wrong examples below stand for generic library defaults that were never adapted to this style. Do not read them as visual suggestions.",
    button: "Button",
    card: "Card",
    input: "Input",
    wrongButton: "**Wrong** (generic component library default, do not copy):",
    rightButton: "**Right** (uses this style's tokens):",
    wrongCard: "**Wrong** (generic card, not adapted to this style):",
    rightCard: "**Right** (uses this style's card tokens):",
    wrongInput: "**Wrong** (generic input, not adapted to this style):",
    rightInput: "**Right** (uses this style's input tokens):",
    clickMe: "Click me",
  },
} as const;

const SKELETON_LABELS = {
  zh: {
    title: "页面骨架模板",
    intro: "以下骨架只使用当前风格的 token。替换 `{PLACEHOLDER}` 时，不要移除或替换这些 token：",
    nav: "导航栏骨架",
    hero: "Hero 区块骨架",
    cardGrid: "卡片网格骨架",
    form: "表单输入骨架",
    footer: "页脚骨架",
  },
  en: {
    title: "page skeletons",
    intro:
      "These skeletons use this style's tokens only. Replace `{PLACEHOLDER}` values, but keep every token in place:",
    nav: "Navigation",
    hero: "Hero section",
    cardGrid: "Card grid",
    form: "Form input",
    footer: "Footer",
  },
} as const;

const CHECKLIST_LABELS = {
  zh: {
    title: "生成后自检清单",
    intro: "输出代码前，逐项验证当前风格的 token 和规则。如有违反，先修正再交付：",
    tokenCheck: "Token 检查",
    forbiddenCheck: "禁止项检查",
    ruleCheck: "风格规则检查",
    driftCheck: "风格漂移检查",
    deliveryCheck: "通用交付检查",
    buttonHas: "按钮包含：",
    cardHas: "卡片包含：",
    inputHas: "输入框包含：",
    notUsing: "没有使用",
    noForbidden: "没有使用当前风格禁止的 class 或模式",
    followRules: "遵循当前风格的核心规则",
    noViolation: "没有违反：",
    noConflict: "没有引入与当前风格冲突的默认样式",
    stillRecognizable: "结果仍然能够一眼识别为",
    deliveryItems: [
      "响应式布局在手机、平板和桌面下稳定，没有横向溢出",
      "所有交互元素有清晰焦点、可访问名称和 reduced-motion 方案",
      "文本对比度达到 WCAG AA，且没有用颜色单独传递状态",
    ],
  },
  en: {
    title: "post-generation self check",
    intro:
      "Before returning code, verify every token and rule below. Fix any violation before delivering:",
    tokenCheck: "Token check",
    forbiddenCheck: "Forbidden check",
    ruleCheck: "Style rule check",
    driftCheck: "Style drift check",
    deliveryCheck: "Delivery check",
    buttonHas: "Button includes:",
    cardHas: "Card includes:",
    inputHas: "Input includes:",
    notUsing: "Not using",
    noForbidden: "No class or pattern this style forbids",
    followRules: "Follows this style's core rules",
    noViolation: "Does not violate: ",
    noConflict: "No default styling that conflicts with this style",
    stillRecognizable: "The result is still recognizable at a glance as",
    deliveryItems: [
      "Responsive layout holds on phone, tablet and desktop with no horizontal overflow",
      "Every interactive element has a visible focus state, an accessible name and a reduced-motion path",
      "Text contrast meets WCAG AA and colour alone never carries state",
    ],
  },
} as const;

const CJK_PATTERN = /[\u3400-\u9fff]/g;

/**
 * The prompt builder rejects any English rule source that still carries CJK, so
 * an English spec has to drop Chinese-only content rather than pass it through.
 */
function isCjkHeavy(value: string): boolean {
  const matches = value.match(CJK_PATTERN);
  if (!matches) return false;
  return matches.length / Math.max(value.length, 1) > 0.05;
}

function localeSafeList(list: string[] | undefined, locale: RulesLocale): string[] {
  if (!list) return [];
  if (locale !== "en") return list;
  return list.filter((item) => !isCjkHeavy(item));
}

export function generateEnhancedAIRules({
  style,
  tokens,
  format,
  locale = "zh",
}: EnhancedRulesOptions): string {
  const sections = [
    generateHeader(style, locale),
    generateTokenDictionary(tokens, locale),
    generateForbiddenRules(tokens, locale),
    generateRequiredPatterns(tokens, locale),
    generateBeforeAfterExamples(style, tokens, locale),
    generateSkeletonTemplates(style, tokens, locale),
    generateSelfCheckList(style, tokens, locale),
    generateExamplePrompts(style, locale),
  ];

  if (format === "compact") {
    return [
      generateHeader(style, locale),
      generateTokenDictionary(tokens, locale),
      generateForbiddenRules(tokens, locale),
      generateSelfCheckList(style, tokens, locale),
    ].join("\n\n");
  }

  return sections.filter(Boolean).join("\n\n---\n\n");
}

function generateHeader(style: DesignStyle, locale: RulesLocale): string {
  const labels = LABELS[locale];
  const title =
    locale === "en" ? `# ${style.nameEn} Design System` : `# ${style.nameEn} (${style.name}) Design System`;
  const description =
    locale === "en" ? style.descriptionEn || style.description : style.description;
  const rawPhilosophy =
    locale === "en" ? style.philosophyEn || style.philosophy : style.philosophy;
  const philosophy =
    locale === "en" && isCjkHeavy(rawPhilosophy) ? style.descriptionEn || "" : rawPhilosophy;

  return `${title}

> ${description}

## ${labels.philosophy}

${philosophy}`;
}

function generateTokenDictionary(tokens: StyleTokens, locale: RulesLocale): string {
  const labels = LABELS[locale];

  return `## ${labels.tokenDictionary}

### ${labels.border}
\`\`\`
${labels.width}: ${tokens.border.width}
${labels.color}: ${tokens.border.color}
${labels.radius}: ${tokens.border.radius}
\`\`\`

### ${labels.shadow}
\`\`\`
${labels.small}: ${tokens.shadow.sm}
${labels.medium}: ${tokens.shadow.md}
${labels.large}: ${tokens.shadow.lg}
${labels.hover}: ${tokens.shadow.hover}
${labels.focus}: ${tokens.shadow.focus}
\`\`\`

### ${labels.interaction}
\`\`\`
${labels.hoverTranslate}: ${tokens.interaction.hoverTranslate ?? labels.none}
${labels.hoverScale}: ${tokens.interaction.hoverScale ?? labels.none}
${labels.hoverOpacity}: ${tokens.interaction.hoverOpacity ?? labels.none}
${labels.transition}: ${tokens.interaction.transition}
${tokens.interaction.active ? `${labels.active}: ${tokens.interaction.active}` : ""}
\`\`\`

### ${labels.fonts}
\`\`\`
${labels.heading}: ${tokens.typography.heading}
${labels.body}: ${tokens.typography.body}
${tokens.typography.mono ? `${labels.mono}: ${tokens.typography.mono}` : ""}
\`\`\`

### ${labels.sizes}
\`\`\`
Hero: ${tokens.typography.sizes.hero}
H1: ${tokens.typography.sizes.h1}
H2: ${tokens.typography.sizes.h2}
H3: ${tokens.typography.sizes.h3}
${labels.bodySize}: ${tokens.typography.sizes.body}
${labels.smallSize}: ${tokens.typography.sizes.small}
\`\`\`

### ${labels.spacing}
\`\`\`
Section: ${tokens.spacing.section}
${labels.container}: ${tokens.spacing.container}
${labels.card}: ${tokens.spacing.card}
${labels.gapSm}: ${tokens.spacing.gap.sm}
${labels.gapMd}: ${tokens.spacing.gap.md}
${labels.gapLg}: ${tokens.spacing.gap.lg}
\`\`\`

### ${labels.colorRoles}
\`\`\`
${labels.bgPrimary}: ${tokens.colors.background.primary}
${labels.bgSecondary}: ${tokens.colors.background.secondary}
${labels.bgAccent}: ${tokens.colors.background.accent.join(", ") || labels.none}
${labels.textPrimary}: ${tokens.colors.text.primary}
${labels.textSecondary}: ${tokens.colors.text.secondary}
${labels.textMuted}: ${tokens.colors.text.muted}
${labels.buttonPrimary}: ${tokens.colors.button.primary}
${labels.buttonSecondary}: ${tokens.colors.button.secondary}
\`\`\``;
}

function generateForbiddenRules(tokens: StyleTokens, locale: RulesLocale): string {
  const forbiddenList = tokens.forbidden.classes
    .slice(0, 20)
    .map((cls) => `- \`${cls}\``)
    .join("\n");

  const matchLabel = locale === "en" ? "matches" : "匹配";
  const patternList = tokens.forbidden.patterns
    .map((pattern) => `- ${matchLabel} \`${pattern}\``)
    .join("\n");

  const reasonList = Object.entries(tokens.forbidden.reasons)
    .map(([cls, reason]) => `- \`${cls}\`: ${reason}`)
    .join("\n");

  if (locale === "en") {
    return `## [FORBIDDEN]

These classes are banned in this style. Check for them before returning code:

### Banned classes
${forbiddenList || "- (no banned classes registered for this style)"}

### Banned patterns
${patternList || "- (no banned patterns registered for this style)"}

### Why they are banned
${reasonList || "- Follow this style's own design rules."}

> WARNING: if your code contains any of the above, replace it before shipping.`;
  }

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

function generateRequiredPatterns(tokens: StyleTokens, locale: RulesLocale): string {
  if (locale === "en") {
    return `## [REQUIRED]

### Every button must include
\`\`\`
${tokens.required.button.join("\n")}
\`\`\`

### Every card must include
\`\`\`
${tokens.required.card.join("\n")}
\`\`\`

### Every input must include
\`\`\`
${tokens.required.input.join("\n")}
\`\`\``;
  }

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

function generateBeforeAfterExamples(
  style: DesignStyle,
  tokens: StyleTokens,
  locale: RulesLocale
): string {
  const t = COMPARE_LABELS[locale];
  const buttonClasses = tokens.required.button.join(" ");
  const cardClasses = tokens.required.card.join(" ");
  const inputClasses = tokens.required.input.join(" ");
  const primaryButton = tokens.colors.button.primary;

  return `## [COMPARE] ${style.nameEn} ${t.title}

${t.intro}

### ${t.button}

[WRONG] ${t.wrongButton}
\`\`\`html
<button class="{GENERIC_LIBRARY_BUTTON_DEFAULT}">
  ${t.clickMe}
</button>
\`\`\`

[CORRECT] ${t.rightButton}
\`\`\`html
<button class="${buttonClasses} ${primaryButton}">
  ${t.clickMe}
</button>
\`\`\`

### ${t.card}

[WRONG] ${t.wrongCard}
\`\`\`html
<div class="{GENERIC_LIBRARY_CARD_DEFAULT}">
  <h3>{TITLE}</h3>
</div>
\`\`\`

[CORRECT] ${t.rightCard}
\`\`\`html
<div class="${cardClasses} ${tokens.spacing.card}">
  <h3 class="${tokens.typography.heading} ${tokens.typography.sizes.h3}">{TITLE}</h3>
</div>
\`\`\`

### ${t.input}

[WRONG] ${t.wrongInput}
\`\`\`html
<input class="{GENERIC_LIBRARY_INPUT_DEFAULT}" />
\`\`\`

[CORRECT] ${t.rightInput}
\`\`\`html
<input class="${inputClasses}" placeholder="{PLACEHOLDER}" />
\`\`\``;
}

function generateSkeletonTemplates(
  style: DesignStyle,
  tokens: StyleTokens,
  locale: RulesLocale
): string {
  const t = SKELETON_LABELS[locale];
  const primaryBackground = tokens.colors.background.primary;
  const secondaryBackground = tokens.colors.background.secondary;
  const accentBackground = tokens.colors.background.accent[0] ?? primaryBackground;
  const primaryText = tokens.colors.text.primary;
  const secondaryText = tokens.colors.text.secondary;
  const buttonClasses = `${tokens.required.button.join(" ")} ${tokens.colors.button.primary}`;
  const cardClasses = `${tokens.required.card.join(" ")} ${tokens.spacing.card}`;
  const inputClasses = tokens.required.input.join(" ");

  return `## [TEMPLATES] ${style.nameEn} ${t.title}

${t.intro}

### ${t.nav}
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

### ${t.hero}
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

### ${t.cardGrid}
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

### ${t.form}
\`\`\`html
<input class="${inputClasses}" placeholder="{PLACEHOLDER}" />
\`\`\`

### ${t.footer}
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

function generateSelfCheckList(
  style: DesignStyle,
  tokens: StyleTokens,
  locale: RulesLocale
): string {
  const t = CHECKLIST_LABELS[locale];
  const requiredChecks = [
    `${t.buttonHas} \`${tokens.required.button.join(" ")}\``,
    `${t.cardHas} \`${tokens.required.card.join(" ")}\``,
    `${t.inputHas} \`${tokens.required.input.join(" ")}\``,
  ];
  const forbiddenChecks = tokens.forbidden.classes
    .slice(0, 8)
    .map((item) => `${t.notUsing} \`${item}\``);
  const doSource = localeSafeList(
    locale === "en" && style.doListEn?.length ? style.doListEn : style.doList,
    locale
  );
  const dontSource = localeSafeList(
    locale === "en" && style.dontListEn?.length ? style.dontListEn : style.dontList,
    locale
  );
  const requiredStyleRules = doSource.slice(0, 5);
  const forbiddenStyleRules = dontSource.slice(0, 5);

  return `## [CHECKLIST] ${style.nameEn} ${t.title}

**${t.intro}**

### ${t.tokenCheck}
${requiredChecks.map((item) => `- [ ] ${item}`).join("\n")}

### ${t.forbiddenCheck}
${forbiddenChecks.length > 0 ? forbiddenChecks.map((item) => `- [ ] ${item}`).join("\n") : `- [ ] ${t.noForbidden}`}

### ${t.ruleCheck}
${requiredStyleRules.length > 0 ? requiredStyleRules.map((item) => `- [ ] ${item}`).join("\n") : `- [ ] ${t.followRules}`}

### ${t.driftCheck}
${forbiddenStyleRules.length > 0 ? forbiddenStyleRules.map((item) => `- [ ] ${t.noViolation}${item}`).join("\n") : `- [ ] ${t.noConflict}`}

### ${t.deliveryCheck}
${t.deliveryItems.map((item) => `- [ ] ${item}`).join("\n")}
- [ ] ${t.stillRecognizable} ${style.nameEn}`;
}

function generateExamplePrompts(style: DesignStyle, locale: RulesLocale): string {
  if (!style.examplePrompts || style.examplePrompts.length === 0) {
    return "";
  }

  const usable = style.examplePrompts.filter(
    (prompt) =>
      locale !== "en" ||
      !isCjkHeavy(`${prompt.title}${prompt.description}${prompt.prompt}`)
  );

  if (usable.length === 0) return "";

  const promptList = usable
    .map((prompt, index) => `### ${index + 1}. ${prompt.title}\n\n${prompt.description}\n\n\`\`\`\n${prompt.prompt}\n\`\`\``)
    .join("\n\n");

  return `## [EXAMPLES] ${locale === "en" ? "Example prompts" : "示例 Prompt"}

${promptList}`;
}
