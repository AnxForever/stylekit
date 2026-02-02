// Prompt Builder - Generator
// Assembles complete prompts from config, style rules, and templates

import type { PromptConfig, PageType, TechStack, CompLib, InteractionLevel } from "./types";
import { pageTemplates } from "./templates";
import { getStyleBySlug } from "@/lib/styles";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { getArchetype, getArchetypesByCategory } from "@/lib/archetypes";
import { getStyleRecipes } from "@/lib/recipes";
import { generatePlanPromptInstructions } from "@/lib/schema/ui-plan";

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
  };
}

export function generatePrompt(config: PromptConfig): GeneratedPrompt {
  const style = getStyleBySlug(config.style);
  const tokens = getStyleTokens(config.style);
  const template = pageTemplates[config.pageType];

  if (!style) {
    throw new Error(`Style not found: ${config.style}`);
  }

  const header = generateHeader(style.name, style.nameEn, config);
  const techStack = generateTechStackSection(config);
  const pageStructure = generatePageStructure(config.pageType, config.interactionLevel);
  const designRules = generateDesignRules(style);
  const tokenSection = config.includeTokens && tokens ? generateTokenSection(tokens) : undefined;
  const examples = config.includeExamples ? generateExamplesSection(style) : undefined;
  const uiPlanSection = config.includeUIPlan ? generateUIPlanSection(config) : undefined;

  const sections = {
    header,
    techStack,
    pageStructure,
    designRules,
    ...(tokenSection && { tokens: tokenSection }),
    ...(examples && { examples }),
    ...(uiPlanSection && { uiPlan: uiPlanSection }),
  };

  const content = [
    header,
    techStack,
    pageStructure,
    designRules,
    tokenSection,
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
