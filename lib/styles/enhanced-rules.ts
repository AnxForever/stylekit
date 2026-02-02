// Enhanced AI Rules Generator
// Generates comprehensive, self-validating AI instructions

import type { DesignStyle } from "./index";
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
    generateSkeletonTemplates(style),
    generateSelfCheckList(tokens),
    generateExamplePrompts(style),
  ];

  if (format === "compact") {
    return [
      generateHeader(style),
      generateTokenDictionary(tokens),
      generateForbiddenRules(tokens),
      generateSelfCheckList(tokens),
    ].join("\n\n");
  }

  return sections.join("\n\n---\n\n");
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
悬停位移: ${tokens.interaction.hoverTranslate}
过渡动画: ${tokens.interaction.transition}
${tokens.interaction.active ? `按下状态: ${tokens.interaction.active}` : ""}
\`\`\`

### 字体
\`\`\`
标题: ${tokens.typography.heading}
正文: ${tokens.typography.body}
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
\`\`\``;
}

function generateForbiddenRules(tokens: StyleTokens): string {
  const forbiddenList = tokens.forbidden.classes
    .slice(0, 20)
    .map(cls => `- \`${cls}\``)
    .join("\n");

  const patternList = tokens.forbidden.patterns
    .map(p => `- 匹配 \`${p}\``)
    .join("\n");

  const reasonList = Object.entries(tokens.forbidden.reasons)
    .map(([cls, reason]) => `- \`${cls}\`: ${reason}`)
    .join("\n");

  return `## [FORBIDDEN] 绝对禁止

以下 class 在本风格中**绝对禁止使用**，生成时必须检查并避免：

### 禁止的 Class
${forbiddenList}

### 禁止的模式
${patternList}

### 禁止原因
${reasonList}

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
  return `## [COMPARE] 错误 vs 正确对比

### 按钮

[WRONG] **错误示例**（使用了圆角和模糊阴影）：
\`\`\`html
<button class="rounded-lg shadow-lg bg-blue-500 text-white px-4 py-2 hover:bg-blue-600">
  点击我
</button>
\`\`\`

[CORRECT] **正确示例**（使用硬边缘、无圆角、位移效果）：
\`\`\`html
<button class="${tokens.required.button.join(" ")} bg-[#ff006e] text-white px-4 py-2 md:px-6 md:py-3">
  点击我
</button>
\`\`\`

### 卡片

[WRONG] **错误示例**（使用了渐变和圆角）：
\`\`\`html
<div class="rounded-xl shadow-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-6">
  <h3 class="text-xl font-semibold">标题</h3>
</div>
\`\`\`

[CORRECT] **正确示例**（纯色背景、硬边缘阴影）：
\`\`\`html
<div class="${tokens.required.card.join(" ")} ${tokens.spacing.card}">
  <h3 class="${tokens.typography.heading} ${tokens.typography.sizes.h3}">标题</h3>
</div>
\`\`\`

### 输入框

[WRONG] **错误示例**（灰色边框、圆角）：
\`\`\`html
<input class="rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500" />
\`\`\`

[CORRECT] **正确示例**（黑色粗边框、聚焦阴影）：
\`\`\`html
<input class="${tokens.required.input.join(" ")} px-3 py-2 md:px-4 md:py-3" placeholder="请输入..." />
\`\`\``;
}

function generateSkeletonTemplates(style: DesignStyle): string {
  return `## [TEMPLATES] 页面骨架模板

使用以下模板生成页面，只需替换 \`{PLACEHOLDER}\` 部分：

### 导航栏骨架
\`\`\`html
<nav class="bg-white border-b-2 md:border-b-4 border-black px-4 md:px-8 py-3 md:py-4">
  <div class="flex items-center justify-between max-w-6xl mx-auto">
    <a href="/" class="font-black text-xl md:text-2xl tracking-wider">
      {LOGO_TEXT}
    </a>
    <div class="flex gap-4 md:gap-8 font-mono text-sm md:text-base">
      {NAV_LINKS}
    </div>
  </div>
</nav>
\`\`\`

### Hero 区块骨架
\`\`\`html
<section class="min-h-[60vh] md:min-h-[80vh] flex items-center px-4 md:px-8 py-12 md:py-0 bg-{ACCENT_COLOR} border-b-2 md:border-b-4 border-black">
  <div class="max-w-4xl mx-auto">
    <h1 class="font-black text-4xl md:text-6xl lg:text-8xl leading-tight tracking-tight mb-4 md:mb-6">
      {HEADLINE}
    </h1>
    <p class="font-mono text-base md:text-xl max-w-xl mb-6 md:mb-8">
      {SUBHEADLINE}
    </p>
    <button class="bg-black text-white font-black px-6 py-3 md:px-8 md:py-4 border-2 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,0,110,1)] md:shadow-[8px_8px_0px_0px_rgba(255,0,110,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm md:text-base">
      {CTA_TEXT}
    </button>
  </div>
</section>
\`\`\`

### 卡片网格骨架
\`\`\`html
<section class="py-12 md:py-24 px-4 md:px-8">
  <div class="max-w-6xl mx-auto">
    <h2 class="font-black text-2xl md:text-4xl mb-8 md:mb-12">{SECTION_TITLE}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <!-- Card template - repeat for each card -->
      <div class="bg-white border-2 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6 hover:shadow-[4px_4px_0px_0px_rgba(255,0,110,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(255,0,110,1)] hover:-translate-y-1 transition-all">
        <h3 class="font-black text-lg md:text-xl mb-2">{CARD_TITLE}</h3>
        <p class="font-mono text-sm md:text-base text-gray-700">{CARD_DESCRIPTION}</p>
      </div>
    </div>
  </div>
</section>
\`\`\`

### 页脚骨架
\`\`\`html
<footer class="bg-black text-white py-12 md:py-16 px-4 md:px-8 border-t-2 md:border-t-4 border-black">
  <div class="max-w-6xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <span class="font-black text-xl md:text-2xl">{LOGO_TEXT}</span>
        <p class="font-mono text-sm mt-4 text-gray-400">{TAGLINE}</p>
      </div>
      <div>
        <h4 class="font-black text-lg mb-4">{COLUMN_TITLE}</h4>
        <ul class="space-y-2 font-mono text-sm text-gray-400">
          {FOOTER_LINKS}
        </ul>
      </div>
    </div>
  </div>
</footer>
\`\`\``;
}

function generateSelfCheckList(tokens: StyleTokens): string {
  return `## [CHECKLIST] 生成后自检清单

**在输出代码前，必须逐项验证以下每一条。如有违反，立即修正后再输出：**

### 1. 圆角检查
- [ ] 搜索代码中的 \`rounded-\`
- [ ] 确认只有 \`rounded-none\` 或无圆角
- [ ] 如果发现 \`rounded-lg\`、\`rounded-md\` 等，替换为 \`rounded-none\`

### 2. 阴影检查
- [ ] 搜索代码中的 \`shadow-\`
- [ ] 确认只使用 \`shadow-[Xpx_Xpx_0px_0px_rgba(...)]\` 格式
- [ ] 如果发现 \`shadow-lg\`、\`shadow-xl\` 等，替换为正确格式

### 3. 边框检查
- [ ] 搜索代码中的 \`border-\`
- [ ] 确认边框颜色是 \`border-black\`
- [ ] 如果发现 \`border-gray-*\`、\`border-slate-*\`，替换为 \`border-black\`

### 4. 交互检查
- [ ] 所有按钮都有 \`hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]\`
- [ ] 所有卡片都有 hover 效果（阴影变色或位移）
- [ ] 都包含 \`transition-all\`

### 5. 响应式检查
- [ ] 边框有 \`border-2 md:border-4\`
- [ ] 阴影有 \`shadow-[4px...] md:shadow-[8px...]\`
- [ ] 间距有 \`p-4 md:p-6\` 或类似的响应式值
- [ ] 字号有 \`text-sm md:text-base\` 或类似的响应式值

### 6. 字体检查
- [ ] 标题使用 \`font-black\`
- [ ] 正文使用 \`font-mono\`

> CRITICAL: **如果任何一项检查不通过，必须修正后重新生成代码。**`;
}

function generateExamplePrompts(style: DesignStyle): string {
  if (!style.examplePrompts || style.examplePrompts.length === 0) {
    return "";
  }

  const promptList = style.examplePrompts
    .map((p, i) => `### ${i + 1}. ${p.title}\n\n${p.description}\n\n\`\`\`\n${p.prompt}\n\`\`\``)
    .join("\n\n");

  return `## [EXAMPLES] 示例 Prompt

${promptList}`;
}
