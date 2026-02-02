// Prompt Builder - Generator
// Assembles complete prompts from config, style rules, and templates
// Enhanced with v0 three-element framework

import type {
  PromptConfig,
  PageType,
  TechStack,
  CompLib,
  InteractionLevel,
  TargetAudience,
  BrandMood,
  DesignPriority,
} from "./types";
import { pageTemplates } from "./templates";
import { getStyleBySlug } from "@/lib/styles";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { getArchetype, getArchetypesByCategory } from "@/lib/archetypes";
import { getStyleRecipes } from "@/lib/recipes";
import { generatePlanPromptInstructions } from "@/lib/schema/ui-plan";
import {
  getDesignRecommendation,
  searchUXGuidelines,
  searchStackGuidelines,
  type StackId,
  type DesignRecommendation,
  type UXGuideline,
  type StackGuideline,
} from "@/lib/knowledge";
import {
  gradients,
  getGradientsByCategory,
  recommendGradientsForStyle,
  type Gradient,
  type GradientCategory,
} from "@/lib/gradients";

interface GeneratedPrompt {
  content: string;
  sections: {
    header: string;
    techStack: string;
    pageStructure: string;
    designRules: string;
    tokens?: string;
    examples?: string;
    uiPlan?: string;
    productRecommendation?: string;
    uxGuidelines?: string;
    stackGuidelines?: string;
    typography?: string;
    colorPalette?: string;
    // v0 Framework sections
    productSurface?: string;
    contextOfUse?: string;
    constraints?: string;
    gradients?: string;
  };
}

export function generatePrompt(config: PromptConfig): GeneratedPrompt {
  const style = getStyleBySlug(config.style);
  const tokens = getStyleTokens(config.style);
  const template = pageTemplates[config.pageType];

  if (!style) {
    throw new Error(`Style not found: ${config.style}`);
  }

  // Get knowledge-based recommendation if product type specified
  const stackId = techStackToStackId(config.techStack);
  const recommendation = config.productType
    ? getDesignRecommendation(config.productType, { stackId })
    : null;

  const header = generateHeader(style.name, style.nameEn, config);
  const techStack = generateTechStackSection(config);
  const pageStructure = generatePageStructure(config.pageType, config.interactionLevel);
  const designRules = generateDesignRules(style);
  const tokenSection = config.includeTokens && tokens ? generateTokenSection(tokens) : undefined;
  const examples = config.includeExamples ? generateExamplesSection(style) : undefined;
  const uiPlanSection = config.includeUIPlan ? generateUIPlanSection(config) : undefined;

  // Knowledge-based sections
  const productRecommendation = recommendation
    ? generateProductRecommendationSection(recommendation)
    : undefined;
  const uxGuidelinesSection = config.includeUXGuidelines
    ? generateUXGuidelinesSection(config.pageType)
    : undefined;
  const stackGuidelinesSection =
    config.includeStackGuidelines && stackId
      ? generateStackGuidelinesSection(stackId, config.pageType)
      : undefined;
  const typographySection = recommendation?.typography
    ? generateTypographySection(recommendation)
    : undefined;
  const colorPaletteSection = recommendation?.colors
    ? generateColorPaletteSection(recommendation)
    : undefined;

  // v0 Framework sections
  const productSurfaceSection = config.productSurface
    ? generateProductSurfaceSection(config.productSurface)
    : undefined;
  const contextOfUseSection = config.contextOfUse
    ? generateContextOfUseSection(config.contextOfUse)
    : undefined;
  const constraintsSection = config.constraints
    ? generateConstraintsSection(config.constraints)
    : undefined;

  // Gradient section
  const gradientsSection = config.includeGradients
    ? generateGradientsSection(config.style, config.gradientCategory as GradientCategory | undefined)
    : undefined;

  const sections = {
    header,
    techStack,
    pageStructure,
    designRules,
    ...(tokenSection && { tokens: tokenSection }),
    ...(examples && { examples }),
    ...(uiPlanSection && { uiPlan: uiPlanSection }),
    ...(productRecommendation && { productRecommendation }),
    ...(uxGuidelinesSection && { uxGuidelines: uxGuidelinesSection }),
    ...(stackGuidelinesSection && { stackGuidelines: stackGuidelinesSection }),
    ...(typographySection && { typography: typographySection }),
    ...(colorPaletteSection && { colorPalette: colorPaletteSection }),
    ...(productSurfaceSection && { productSurface: productSurfaceSection }),
    ...(contextOfUseSection && { contextOfUse: contextOfUseSection }),
    ...(constraintsSection && { constraints: constraintsSection }),
    ...(gradientsSection && { gradients: gradientsSection }),
  };

  const content = [
    header,
    // v0 Framework sections first (if provided)
    productSurfaceSection,
    contextOfUseSection,
    constraintsSection,
    techStack,
    pageStructure,
    designRules,
    tokenSection,
    gradientsSection,
    productRecommendation,
    typographySection,
    colorPaletteSection,
    uxGuidelinesSection,
    stackGuidelinesSection,
    examples,
    uiPlanSection,
  ]
    .filter(Boolean)
    .join("\n\n---\n\n");

  return { content, sections };
}

function generateHeader(name: string, nameEn: string, config: PromptConfig): string {
  const pageTypeMap: Record<PageType, { zh: string; en: string }> = {
    landing: { zh: "着陆页", en: "Landing Page" },
    dashboard: { zh: "仪表盘", en: "Dashboard" },
    blog: { zh: "博客页", en: "Blog" },
    form: { zh: "表单页", en: "Form Page" },
    list: { zh: "列表页", en: "List Page" },
  };

  const pageType = pageTypeMap[config.pageType];

  return `# ${nameEn} ${pageType.en}

请生成一个 **${name}** 风格的 **${pageType.zh}** 页面。

严格遵循以下设计规范和技术要求。`;
}

function generateTechStackSection(config: PromptConfig): string {
  const techMap: Record<TechStack, string> = {
    nextjs: "Next.js 15 + App Router + TypeScript",
    react: "React 19 + Vite + TypeScript",
    vue: "Vue 3 + Vite + TypeScript + Composition API",
    vanilla: "原生 HTML + CSS (Tailwind CDN)",
  };

  const libMap: Record<CompLib, string> = {
    shadcn: "shadcn/ui (Radix primitives)",
    radix: "Radix UI primitives",
    headless: "Headless UI",
    none: "无组件库，原生实现",
  };

  return `## 技术栈要求

- **框架**: ${techMap[config.techStack]}
- **样式**: Tailwind CSS
- **组件库**: ${libMap[config.componentLib]}
- **交互等级**: ${config.interactionLevel === "minimal" ? "极简" : config.interactionLevel === "standard" ? "标准" : "丰富"}`;
}

function generatePageStructure(pageType: PageType, interactionLevel: InteractionLevel): string {
  const template = pageTemplates[pageType];

  const sectionList = template.sections.map((s, i) => `${i + 1}. ${s}`).join("\n");
  const componentList = template.components.join(", ");
  const interactionHint = template.interactionHints[interactionLevel];

  return `## 页面结构

### 需要的区块
${sectionList}

### 涉及的组件
${componentList}

### 交互要求
${interactionHint}`;
}

function generateDesignRules(style: {
  philosophy: string;
  doList: string[];
  dontList: string[];
  aiRules: string;
}): string {
  const doItems = style.doList.map((item) => `- [O] ${item}`).join("\n");
  const dontItems = style.dontList.map((item) => `- [X] ${item}`).join("\n");

  return `## 设计规范

### 设计哲学
${style.philosophy.split("\n\n")[0]}

### 必须做 (Do's)
${doItems}

### 禁止做 (Don'ts)
${dontItems}

### 完整风格指南
\`\`\`
${style.aiRules}
\`\`\``;
}

function generateTokenSection(tokens: {
  border: { width: string; color: string; radius: string };
  shadow: { sm: string; md: string; lg: string; hover: string };
  interaction: { hoverTranslate?: string; transition: string };
  typography: { heading: string; body: string };
  required: { button: string[]; card: string[]; input: string[] };
  forbidden: { classes: string[]; patterns: string[] };
}): string {
  return `## Token 字典（精确 Class 映射）

### 边框
- 宽度: \`${tokens.border.width}\`
- 颜色: \`${tokens.border.color}\`
- 圆角: \`${tokens.border.radius}\`

### 阴影
- 小: \`${tokens.shadow.sm}\`
- 中: \`${tokens.shadow.md}\`
- 大: \`${tokens.shadow.lg}\`
- 悬停: \`${tokens.shadow.hover}\`

### 交互
- 悬停位移: \`${tokens.interaction.hoverTranslate}\`
- 过渡: \`${tokens.interaction.transition}\`

### 字体
- 标题: \`${tokens.typography.heading}\`
- 正文: \`${tokens.typography.body}\`

### 组件必须 Class

**按钮:**
\`\`\`
${tokens.required.button.join("\n")}
\`\`\`

**卡片:**
\`\`\`
${tokens.required.card.join("\n")}
\`\`\`

**输入框:**
\`\`\`
${tokens.required.input.join("\n")}
\`\`\`

### 禁止使用的 Class
${tokens.forbidden.classes.slice(0, 10).map((c) => `\`${c}\``).join(", ")}

### 禁止的模式
${tokens.forbidden.patterns.map((p) => `\`${p}\``).join(", ")}`;
}

function generateExamplesSection(style: { components: Record<string, { code: string }> }): string {
  const button = style.components.button?.code || "";
  const card = style.components.card?.code || "";

  return `## 示例代码参考

### 按钮示例
\`\`\`html
${button}
\`\`\`

### 卡片示例
\`\`\`html
${card}
\`\`\``;
}

function generateUIPlanSection(config: PromptConfig): string {
  const archetype = config.archetypeId ? getArchetype(config.archetypeId) : null;
  const recipes = getStyleRecipes(config.style);

  // Get available archetypes for this page type
  const availableArchetypes = getArchetypesByCategory(config.pageType);

  // Get available recipes
  const recipeList = recipes
    ? Object.entries(recipes.recipes)
        .map(([id, r]) => `- \`${id}\`: ${Object.keys(r.variants).join(", ")}`)
        .join("\n")
    : "暂无配方定义";

  // Get archetype details if selected
  const archetypeDetails = archetype
    ? `
### 选定的布局原型: ${archetype.name}

${archetype.description}

**区块结构:**
${archetype.sections.map((s) => `- \`${s.id}\`: ${s.name} (${s.layout.type})`).join("\n")}

**响应式行为:**
- 移动端: ${archetype.responsive.mobile}
- 平板: ${archetype.responsive.tablet}
- 桌面: ${archetype.responsive.desktop}`
    : `
### 可用的布局原型

${availableArchetypes.map((a) => `- \`${a.id}\`: ${a.description}`).join("\n") || "暂无原型定义"}`;

  // Generate JSON schema instructions
  const schemaInstructions = generatePlanPromptInstructions();

  return `## 结构化输出要求 (UI Plan)

在生成代码之前，请先输出一个 JSON 格式的 UI Plan。这有助于确保生成的代码符合设计规范。

${schemaInstructions}

### 可用的组件配方

${recipeList}
${archetypeDetails}

### 输出流程

1. **第一步**: 输出 UI Plan JSON（以 \`\`\`json 包裹）
2. **第二步**: 根据 UI Plan 生成完整代码
3. **第三步**: 确保代码与 Plan 一致`;
}

// ============ KNOWLEDGE-BASED SECTION GENERATORS ============

/**
 * Map TechStack to StackId for knowledge lookup
 */
function techStackToStackId(techStack: TechStack): StackId | undefined {
  const mapping: Record<TechStack, StackId | undefined> = {
    nextjs: "nextjs",
    react: "react",
    vue: "vue",
    vanilla: "html-tailwind",
  };
  return mapping[techStack];
}

/**
 * Generate product type recommendation section
 */
function generateProductRecommendationSection(
  recommendation: DesignRecommendation
): string {
  const { productType, reasoning, style, landingPattern } = recommendation;

  const lines = [`## 产品类型推荐 (${productType})`];

  if (reasoning) {
    lines.push(`
### 推荐模式
- **布局模式**: ${reasoning.recommendedPattern}
- **风格优先级**: ${reasoning.stylePriority.join(" > ")}
- **色彩情绪**: ${reasoning.colorMood}
- **字体情绪**: ${reasoning.typographyMood}
- **关键效果**: ${reasoning.keyEffects}

### 反模式 (避免)
${reasoning.antiPatterns.map((p) => `- [X] ${p}`).join("\n")}`);
  }

  if (landingPattern) {
    lines.push(`
### 推荐页面结构
${landingPattern.sectionOrder.map((s, i) => `${i + 1}. ${s}`).join("\n")}

- **CTA 位置**: ${landingPattern.primaryCtaPlacement}
- **色彩策略**: ${landingPattern.colorStrategy}
- **转化优化**: ${landingPattern.conversionOptimization}`);
  }

  return lines.join("\n");
}

/**
 * Generate UX guidelines section
 */
function generateUXGuidelinesSection(pageType: PageType): string {
  // Get relevant UX guidelines for the page type
  const queryMap: Record<PageType, string> = {
    landing: "conversion CTA scroll animation",
    dashboard: "data visualization navigation performance",
    blog: "reading typography scroll accessibility",
    form: "validation input error accessibility",
    list: "pagination loading virtualize filter",
  };

  const guidelines = searchUXGuidelines(queryMap[pageType] || "web interface", 5);

  if (guidelines.length === 0) return "";

  const guidelinesList = guidelines
    .map(
      (g: UXGuideline) => `
### ${g.category}: ${g.issue}
${g.description}

- **Do**: ${g.do}
- **Don't**: ${g.dont}

\`\`\`
// Good
${g.codeGood}

// Bad
${g.codeBad}
\`\`\``
    )
    .join("\n");

  return `## UX 指南

以下是针对 ${pageType} 页面的关键 UX 最佳实践:
${guidelinesList}`;
}

/**
 * Generate stack-specific guidelines section
 */
function generateStackGuidelinesSection(
  stackId: StackId,
  pageType: PageType
): string {
  // Get relevant stack guidelines
  const queryMap: Record<PageType, string> = {
    landing: "performance SEO rendering",
    dashboard: "state data fetching performance",
    blog: "SEO content routing",
    form: "validation state forms",
    list: "lists virtualization pagination",
  };

  const guidelines = searchStackGuidelines(
    stackId,
    queryMap[pageType] || "components",
    5
  );

  if (guidelines.length === 0) return "";

  const guidelinesList = guidelines
    .map(
      (g: StackGuideline) => `
### ${g.category}: ${g.guideline}
${g.description}

- **Do**: ${g.do}
- **Don't**: ${g.dont}

\`\`\`
// Good
${g.codeGood}

// Bad
${g.codeBad}
\`\`\`
${g.docsUrl ? `- [文档](${g.docsUrl})` : ""}`
    )
    .join("\n");

  return `## ${stackId.toUpperCase()} 编码指南

以下是针对该技术栈的关键最佳实践:
${guidelinesList}`;
}

/**
 * Generate typography recommendation section
 */
function generateTypographySection(
  recommendation: DesignRecommendation
): string {
  const { typography } = recommendation;
  if (!typography) return "";

  return `## 推荐字体搭配

### ${typography.name}
- **标题字体**: ${typography.headingFont}
- **正文字体**: ${typography.bodyFont}
- **风格关键词**: ${typography.mood.join(", ")}
- **最适合**: ${typography.bestFor.join(", ")}

### Google Fonts 导入
\`\`\`css
${typography.cssImport}
\`\`\`

### Tailwind 配置
\`\`\`js
// tailwind.config.js
theme: {
  extend: {
    ${typography.tailwindConfig}
  }
}
\`\`\`

${typography.notes ? `> ${typography.notes}` : ""}`;
}

/**
 * Generate color palette section
 */
function generateColorPaletteSection(
  recommendation: DesignRecommendation
): string {
  const { colors } = recommendation;
  if (!colors) return "";

  return `## 推荐色彩方案

针对 **${colors.productType}** 类型产品的色彩搭配:

| 用途 | 颜色代码 |
|------|----------|
| 主色 (Primary) | \`${colors.primary}\` |
| 辅色 (Secondary) | \`${colors.secondary}\` |
| CTA 按钮 | \`${colors.cta}\` |
| 背景色 | \`${colors.background}\` |
| 文字色 | \`${colors.text}\` |
| 边框色 | \`${colors.border}\` |

### Tailwind CSS 变量
\`\`\`css
:root {
  --primary: ${colors.primary};
  --secondary: ${colors.secondary};
  --cta: ${colors.cta};
  --background: ${colors.background};
  --foreground: ${colors.text};
  --border: ${colors.border};
}
\`\`\`

> ${colors.notes}`;
}

// ============ V0 FRAMEWORK SECTION GENERATORS ============

/**
 * Generate Product Surface section (v0 Framework Element 1)
 * Specifies exact components, data, and features
 */
function generateProductSurfaceSection(
  productSurface: NonNullable<PromptConfig["productSurface"]>
): string {
  const lines = [`## Product Surface (产品表面)`];

  lines.push(`
> 明确指定组件、数据和功能需求，避免模糊描述。`);

  if (productSurface.features && productSurface.features.length > 0) {
    lines.push(`
### 功能需求
${productSurface.features.map((f) => `- ${f}`).join("\n")}`);
  }

  if (productSurface.dataTypes && productSurface.dataTypes.length > 0) {
    lines.push(`
### 数据展示类型
${productSurface.dataTypes.map((d) => `- ${d}`).join("\n")}`);
  }

  if (productSurface.userActions && productSurface.userActions.length > 0) {
    lines.push(`
### 核心用户操作
${productSurface.userActions.map((a) => `- ${a}`).join("\n")}`);
  }

  return lines.join("\n");
}

/**
 * Generate Context of Use section (v0 Framework Element 2)
 * Defines who uses it, when, and what decisions they're making
 */
function generateContextOfUseSection(
  contextOfUse: NonNullable<PromptConfig["contextOfUse"]>
): string {
  const audienceLabels: Record<TargetAudience, string> = {
    consumer: "消费者 (B2C)",
    enterprise: "企业用户 (B2B)",
    developer: "开发者",
    creative: "创意工作者",
    general: "通用",
  };

  const deviceLabels: Record<string, string> = {
    mobile: "移动端优先",
    desktop: "桌面端优先",
    both: "响应式 (同等重要)",
  };

  const lines = [`## Context of Use (使用场景)`];

  lines.push(`
> 定义用户群体、使用场景和决策点，帮助 AI 做出更智能的 UX 决策。`);

  if (contextOfUse.targetAudience) {
    lines.push(`
### 目标受众
**${audienceLabels[contextOfUse.targetAudience]}**`);
  }

  if (contextOfUse.useCase) {
    lines.push(`
### 使用场景
${contextOfUse.useCase}`);
  }

  if (contextOfUse.userDecisions && contextOfUse.userDecisions.length > 0) {
    lines.push(`
### 用户决策点
用户在此页面需要做出的关键决策：
${contextOfUse.userDecisions.map((d) => `- ${d}`).join("\n")}`);
  }

  if (contextOfUse.devicePriority) {
    lines.push(`
### 设备优先级
**${deviceLabels[contextOfUse.devicePriority]}**`);
  }

  return lines.join("\n");
}

/**
 * Generate Constraints & Taste section (v0 Framework Element 3)
 * Sets style preferences, platform requirements, and design parameters
 */
function generateConstraintsSection(
  constraints: NonNullable<PromptConfig["constraints"]>
): string {
  const moodLabels: Record<BrandMood, { zh: string; desc: string }> = {
    professional: { zh: "专业稳重", desc: "适合 B2B、金融、法律" },
    playful: { zh: "活泼有趣", desc: "适合社交、游戏、儿童" },
    luxurious: { zh: "高端奢华", desc: "适合奢侈品、高端服务" },
    minimal: { zh: "极简现代", desc: "适合科技、工具、效率" },
    bold: { zh: "大胆前卫", desc: "适合创意、艺术、潮流" },
    friendly: { zh: "亲切友好", desc: "适合社区、教育、健康" },
    trustworthy: { zh: "可信赖", desc: "适合医疗、政府、安全" },
  };

  const priorityLabels: Record<DesignPriority, string> = {
    conversion: "转化优先 - 优化 CTA、减少干扰、清晰路径",
    readability: "可读性优先 - 清晰排版、合适行高、对比度",
    "visual-impact": "视觉冲击优先 - 大胆色彩、动画效果、独特布局",
    accessibility: "无障碍优先 - WCAG 2.1 AA、键盘导航、屏幕阅读器",
    performance: "性能优先 - 最小 JS、懒加载、骨架屏",
  };

  const lines = [`## Constraints & Taste (约束与品味)`];

  lines.push(`
> 设置风格偏好和设计参数，确保输出符合品牌要求。`);

  if (constraints.brandMood) {
    const mood = moodLabels[constraints.brandMood];
    lines.push(`
### 品牌调性
**${mood.zh}** - ${mood.desc}`);
  }

  if (constraints.designPriority) {
    lines.push(`
### 设计优先级
**${priorityLabels[constraints.designPriority]}**`);
  }

  if (constraints.mustHave && constraints.mustHave.length > 0) {
    lines.push(`
### 必须包含
${constraints.mustHave.map((m) => `- [O] ${m}`).join("\n")}`);
  }

  if (constraints.mustNotHave && constraints.mustNotHave.length > 0) {
    lines.push(`
### 禁止包含
${constraints.mustNotHave.map((m) => `- [X] ${m}`).join("\n")}`);
  }

  if (constraints.references && constraints.references.length > 0) {
    lines.push(`
### 参考风格
${constraints.references.map((r) => `- ${r}`).join("\n")}`);
  }

  return lines.join("\n");
}

// ============ GRADIENT SECTION GENERATOR ============

/**
 * Generate gradients section with recommended or filtered gradients
 */
function generateGradientsSection(
  styleSlug: string,
  category?: GradientCategory
): string {
  const selectedGradients = category
    ? getGradientsByCategory(category)
    : recommendGradientsForStyle(styleSlug);

  if (selectedGradients.length === 0) {
    return "";
  }

  const gradientsList = selectedGradients
    .slice(0, 6)
    .map(
      (g) => `
### ${g.nameZh} (${g.name})
- **颜色**: ${g.colors.join(" -> ")}
- **角度**: ${g.angle}deg
- **情绪**: ${g.mood.join(", ")}

**CSS:**
\`\`\`css
background: ${g.css};
\`\`\`

**Tailwind:**
\`\`\`html
<div class="${g.tailwind}">...</div>
\`\`\``
    )
    .join("\n");

  return `## 推荐渐变色

以下渐变色与当前风格搭配良好：
${gradientsList}

### 使用建议
- 用于 Hero 区域背景
- 用于 CTA 按钮
- 用于卡片装饰元素
- 避免在文字背景大面积使用（影响可读性）`;
}
