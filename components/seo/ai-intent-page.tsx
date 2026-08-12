import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { generateBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import {
  getAlternateLocalePath,
  getBaseUrl,
  isLocale,
} from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";
import type { Locale } from "@/lib/i18n/translations";

export type AiIntentPageKey =
  | "ai-ui-design"
  | "ai-web-design"
  | "ai-frontend-design"
  | "avoid-ai-slop"
  | "claude-code-ui-design"
  | "codex-ui-design";

interface AiIntentCopy {
  title: string;
  description: string;
  h1: string;
  intro: string;
  eyebrow: string;
  primaryCta: string;
  secondaryCta: string;
  includedTitle: string;
  included: Array<{ title: string; body: string }>;
  workflowTitle: string;
  workflow: string[];
  stylesTitle: string;
  stylesBody: string;
  relatedTitle: string;
  related: Array<{ label: string; href: string; body: string }>;
  faq: Array<{ question: string; answer: string }>;
}

const TOOL_LABELS: Record<AiIntentPageKey, string> = {
  "ai-ui-design": "AI coding tools",
  "ai-web-design": "AI web design",
  "ai-frontend-design": "AI frontend design",
  "avoid-ai-slop": "AI slop prevention",
  "claude-code-ui-design": "Claude Code",
  "codex-ui-design": "Codex",
};

function getCopy(key: AiIntentPageKey, locale: Locale): AiIntentCopy {
  const isZh = locale === "zh";
  const tool = TOOL_LABELS[key];

  if (isZh) {
    if (key === "ai-web-design") {
      return {
        title: "AI 网页设计与前端 UI 生成指南",
        description: "学习如何用 AI 做网页设计和前端 UI：先定义页面目标与视觉系统，再生成可维护、响应式、可访问的 React 和 Tailwind 界面。",
        h1: "AI 网页设计：让 AI 生成真正能用的前端",
        intro: "AI 可以快速生成页面，但默认结果往往缺少层次、状态和明确的视觉方向。StyleKit 把网页设计需求拆成风格、tokens、组件和验收规则，帮助你把想法变成更稳定的前端提示词。",
        eyebrow: "AI WEB DESIGN WORKFLOW",
        primaryCta: "选择网页设计风格",
        secondaryCta: "浏览前端提示词",
        includedTitle: "一份好的 AI 网页设计 brief 应该包含什么？",
        included: [
          { title: "页面目标", body: "说明用户是谁、页面要完成什么任务，以及首屏需要传达的核心信息。" },
          { title: "视觉系统", body: "明确色板、字体层级、间距、边框、圆角、阴影和动效强度，避免只说‘高级’或‘现代’。" },
          { title: "实现约束", body: "补上组件结构、响应式规则、加载与空状态、键盘操作和可访问性验收条件。" },
        ],
        workflowTitle: "从想法到 AI 前端的 4 个步骤",
        workflow: [
          "先写清页面目标、目标用户和内容层级，再决定使用落地页、仪表盘、作品集还是应用界面结构。",
          "从 StyleKit 选择一个视觉方向，把颜色、字体、间距、组件和禁止项加入 brief。",
          "让 AI 先输出页面结构和组件清单，再分区实现，不要一开始就要求生成一整个复杂网站。",
        ],
        stylesTitle: "用具体视觉语言控制 AI 输出",
        stylesBody: "AI 网页设计的质量取决于输入是否可执行。StyleKit 的风格页提供设计 tokens、组件配方和前端提示词，让视觉判断变成 AI 可以遵循的规则。",
        relatedTitle: "继续使用 StyleKit",
        related: [
          { label: "AI UI 设计入口", href: "/ai-ui-design", body: "了解如何把风格约束交给 ChatGPT、Claude Code 或 Codex。" },
          { label: "AI 前端设计", href: "/ai-frontend-design", body: "把页面目标、组件边界和实现约束交给 AI 前端工作流。" },
          { label: "UI 提示词库", href: "/ui-prompts", body: "按落地页、仪表盘、Tailwind UI 和暗色模式选择提示词。" },
          { label: "Tailwind UI 提示词", href: "/tailwind-ui-prompts", body: "把设计规则落到 React、Next.js 和 Tailwind CSS 实现。" },
        ],
        faq: [
          { question: "AI 网页设计和 AI 网站生成有什么区别？", answer: "AI 网站生成通常强调快速产出完整页面；AI 网页设计更关注页面目标、视觉系统、组件一致性和后续可维护性。StyleKit 主要解决后者。" },
          { question: "为什么 AI 生成的网页经常看起来很像？", answer: "因为提示词通常只描述行业和页面类型，没有规定视觉方向、内容层级、组件状态和禁止项。明确的设计约束能减少默认模板感。" },
          { question: "StyleKit 能配合哪些 AI 编码工具？", answer: "StyleKit 的输出是通用的设计 tokens、组件规则和前端提示词，可以作为 ChatGPT、Claude Code、Codex 等工具的上下文。" },
        ],
      };
    }

    if (key === "ai-frontend-design") {
      return {
        title: "AI 前端设计与 AI 网页生成工作流",
        description: "围绕 AI 前端设计、AI 前端开发和 AI 生成网页代码建立可复用工作流：用 StyleKit 约束页面结构、视觉系统、组件状态与响应式实现。",
        h1: "AI 前端设计：让 AI 生成可维护的网页代码",
        intro: "AI 能生成代码，不代表它理解了你的页面。StyleKit 把 AI 前端设计拆成页面目标、视觉 tokens、组件边界和验收标准，帮助你从‘做一个好看的网页’变成一份 AI 真正能执行的前端 brief。",
        eyebrow: "AI FRONTEND DESIGN WORKFLOW",
        primaryCta: "选择前端设计风格",
        secondaryCta: "获取前端提示词",
        includedTitle: "AI 前端设计 brief 应该写清楚什么？",
        included: [
          { title: "页面与用户任务", body: "说明用户是谁、页面要解决什么问题、首屏主动作是什么，以及不同设备上的内容优先级。" },
          { title: "视觉与组件规则", body: "给出颜色、字体、间距、圆角、边框、阴影、组件状态和禁止项，避免 AI 回到默认模板。" },
          { title: "代码与体验约束", body: "明确 React、Next.js、Tailwind CSS、响应式断点、键盘操作、加载状态和空状态等实现要求。" },
        ],
        workflowTitle: "从 AI 网页想法到前端代码的 4 步",
        workflow: [
          "先描述页面目标、目标用户和内容层级，再决定是落地页、仪表盘、作品集还是产品界面。",
          "从 StyleKit 选择一个视觉方向，把设计 tokens、组件配方和必须避免的默认样式加入提示词。",
          "让 AI 先输出信息架构、页面区块和组件清单，再逐块生成代码，不要一次性生成无法验收的整站。",
          "最后检查移动端、交互状态、可访问性、真实内容密度和组件一致性，再要求 AI 修复具体问题。",
        ],
        stylesTitle: "前端 AI 工作流的关键是可执行的设计语言",
        stylesBody: "‘高级’‘现代’和‘有科技感’不能直接约束代码。StyleKit 的风格页把设计方向转换成颜色、排版、布局、组件和交互规则，让 AI 生成的网页更容易保持一致。",
        relatedTitle: "继续使用 StyleKit",
        related: [
          { label: "AI 网页设计", href: "/ai-web-design", body: "从页面目标和视觉系统开始组织 AI 网页设计需求。" },
          { label: "AI UI 设计", href: "/ai-ui-design", body: "为 ChatGPT、Claude Code 和 Codex 选择可复用的 UI 设计约束。" },
          { label: "UI 提示词库", href: "/ui-prompts", body: "按网页、仪表盘、落地页和 Tailwind UI 复制前端提示词。" },
        ],
        faq: [
          { question: "AI 前端设计和 AI 建站有什么区别？", answer: "AI 建站更强调快速生成一个完整网站；AI 前端设计还要处理页面目标、组件边界、视觉系统、交互状态、响应式和后续维护。StyleKit 主要帮助你完成后者。" },
          { question: "为什么 AI 生成的网页代码经常看起来一样？", answer: "因为提示词只写了行业和页面类型，没有写清视觉规则、内容层级、组件状态和禁止项。明确的设计 tokens 和验收条件能显著减少模板化结果。" },
          { question: "StyleKit 可以配合哪些前端 AI 工具？", answer: "StyleKit 的设计 tokens、组件规则和提示词可以作为 ChatGPT、Claude Code、Codex 以及其他 AI 前端工具的上下文，不绑定单一模型。" },
        ],
      };
    }

    if (key === "avoid-ai-slop") {
      return {
        title: "避免 AI Slop：AI 前端界面设计规范与提示词",
        description: "解决 AI 生成界面千篇一律的问题：用具体的网页风格、设计 tokens、组件状态和验收清单，生成不像模板的前端 UI。",
        h1: "避免 AI Slop：让 AI 生成的前端不像模板",
        intro: "所谓 AI slop，通常不是代码不能运行，而是每个页面都像同一套默认 SaaS 模板：蓝紫渐变、圆角卡片、无意义的图标和缺少内容层级。StyleKit 帮你把‘不要普通’改写成可执行的设计规则。",
        eyebrow: "ANTI-AI-SLOP UI SYSTEM",
        primaryCta: "浏览独特 UI 风格",
        secondaryCta: "获取反模板提示词",
        includedTitle: "AI Slop 通常从哪里产生？",
        included: [
          { title: "模糊的视觉要求", body: "只说 modern、clean 或 premium，AI 只能回到训练数据中最常见的平均答案。" },
          { title: "没有内容层级", body: "页面先堆卡片和按钮，却没有先决定叙事顺序、信息密度和真正的主要动作。" },
          { title: "没有反向验收", body: "不告诉 AI 哪些默认元素不能出现，也没有检查移动端、焦点状态和空数据状态。" },
        ],
        workflowTitle: "一次 AI UI 迭代的反模板流程",
        workflow: [
          "先指出当前页面最像 AI 默认模板的 3 个地方：配色、布局、字体或组件处理。",
          "选择一个明确风格，并写出必须使用的 tokens、组件状态和必须避免的视觉惯性。",
          "让 AI 逐区重构，再用内容层级、响应式、可访问性和一致性清单验收，而不是只看首屏截图。",
        ],
        stylesTitle: "不要只说‘有设计感’，要给 AI 一套可检查的规则",
        stylesBody: "StyleKit 的风格库覆盖极简、编辑、野兽派、瑞士、复古、玻璃拟态等不同方向。每个方向都可以转换成颜色、排版、布局、组件和交互约束。",
        relatedTitle: "用这些页面摆脱默认 AI UI",
        related: [
          { label: "AI 网页设计", href: "/ai-web-design", body: "从页面目标和视觉系统开始组织 AI 前端 brief。" },
          { label: "AI 前端设计", href: "/ai-frontend-design", body: "把 AI 生成网页代码拆成可维护、可验收的组件工作流。" },
          { label: "UI 设计风格库", href: "/styles", body: "选择一个有明确视觉语言的风格，而不是继续堆形容词。" },
          { label: "UI 提示词库", href: "/ui-prompts", body: "直接复制页面结构、组件状态和实现约束。" },
        ],
        faq: [
          { question: "什么是 AI slop？", answer: "AI slop 通常指大量生成、缺少独特判断和内容价值的 AI 产物。在前端里常表现为相同的渐变、圆角卡片、默认字体、装饰性图标和没有真实信息层级的页面。" },
          { question: "如何让 AI 生成的 UI 更有设计感？", answer: "不要只要求‘好看’。选择一个明确风格，规定色彩与排版，说明内容层级和组件状态，再加入‘不要出现什么’的反向约束。" },
          { question: "反 AI Slop 提示词适合什么工具？", answer: "适合 ChatGPT、Claude Code、Codex 等能生成或修改前端代码的工具。提示词本身不绑定某个模型，关键是设计规则足够具体。" },
        ],
      };
    }

    const toolName = key === "ai-ui-design" ? "AI 编码工具" : tool;
    return {
      title: key === "ai-ui-design"
        ? "AI UI 设计风格与前端提示词"
        : `${tool} UI 设计风格与提示词`,
      description: key === "ai-ui-design"
        ? "为 ChatGPT、Claude Code 和 Codex 选择网页 UI 风格，获取设计 tokens、组件约束和可直接改写的前端提示词。"
        : `为 ${tool} 准备更稳定的网页 UI 生成 brief：从 StyleKit 选择视觉风格、设计 tokens、组件配方和可复制的前端提示词。`,
      h1: key === "ai-ui-design"
        ? "AI UI 设计：先选风格，再让 AI 写界面"
        : `${tool} UI 设计风格与前端提示词`,
      intro: key === "ai-ui-design"
        ? "StyleKit 把视觉方向翻译成 AI 能执行的约束：色板、字体、间距、圆角、阴影、交互和响应式规则。你可以先选风格，再把同一份 brief 交给不同的 AI 编码工具。"
        : `${toolName} 负责生成代码，StyleKit 负责把“看起来像什么”说清楚。先锁定风格和页面场景，再给 ${tool} 明确的 tokens、组件边界、状态和验收标准。`,
      eyebrow: "AI-FIRST DESIGN WORKFLOW",
      primaryCta: "浏览 UI 设计风格",
      secondaryCta: "查看 UI 提示词",
      includedTitle: "一份可执行的 UI 设计 brief 包含什么？",
      included: [
        { title: "视觉规则", body: "颜色、字体层级、间距基线、圆角、边框、阴影和明暗模式，不只是一句风格形容词。" },
        { title: "组件约束", body: "把导航、卡片、按钮、表单、表格和空状态写成可复用的组件行为，减少 AI 每次自由发挥。" },
        { title: "验收条件", body: "补上响应式断点、可访问性、交互状态和不能出现的元素，让生成结果更接近你的目标。" },
      ],
      workflowTitle: `用 ${toolName} 开始一个项目的顺序`,
      workflow: [
        "先从风格目录选择一个视觉方向，并打开它的颜色、tokens 和组件说明。",
        "把页面目标、用户、内容结构和风格约束合并成一段 brief，不要只说“做得高级一点”。",
        `让 ${toolName} 先搭建信息架构和组件骨架，再逐块实现视觉效果，最后用移动端和键盘操作验收。`,
      ],
      stylesTitle: "从风格约束开始，而不是从随机灵感开始",
      stylesBody: "每个风格页面都可以作为 AI 的上下文来源。选择一个方向后，再按页面场景调整密度和组件，而不是把多个互相冲突的风格词堆在同一个 prompt 里。",
      relatedTitle: "继续深入",
      related: [
        { label: "UI 提示词库", href: "/ui-prompts", body: "按页面类型和视觉主题寻找可复制的前端 prompt。" },
        { label: "Tailwind UI 提示词", href: "/tailwind-ui-prompts", body: "把风格约束落到 Tailwind CSS 类名和组件结构。" },
        { label: "开发者资源", href: "/developers", body: "查看 shadcn registry、tokens 和适合 React 项目的资源。" },
      ],
      faq: [
        { question: `${toolName} 能直接使用 StyleKit 吗？`, answer: `可以把 StyleKit 页面中的设计规则和提示词复制到 ${toolName} 的上下文中使用。StyleKit 不依赖某一个模型，重点是让设计约束可读、可复用、可验证。` },
        { question: "为什么只写一个风格名称不够？", answer: "“玻璃拟态”或“极简”只能表达方向，不能约束实现。颜色、字体、间距、组件状态和响应式规则越具体，AI 越不容易生成一套换个页面就崩掉的界面。" },
        { question: "StyleKit 适合什么项目？", answer: "适合落地页、SaaS、仪表盘、作品集、后台和组件库等需要统一视觉语言的网页项目，尤其适合在 AI 辅助编码时作为设计上下文。" },
      ],
    };
  }

  return {
    ...(key === "ai-web-design" ? {
      title: "AI Web Design & Frontend UI Generation Guide",
      description: "Learn how to use AI for web design and frontend UI: define page goals and a visual system first, then generate maintainable, responsive React and Tailwind interfaces.",
      h1: "AI web design: make the AI generate a usable frontend",
      intro: "AI can generate a page quickly, but default output often lacks hierarchy, states, and a clear visual point of view. StyleKit turns web design requirements into style, tokens, components, and acceptance rules you can reuse in frontend prompts.",
      eyebrow: "AI WEB DESIGN WORKFLOW",
      primaryCta: "Choose a web design style",
      secondaryCta: "Browse frontend prompts",
      includedTitle: "What belongs in a good AI web design brief?",
      included: [
        { title: "Page intent", body: "Define the audience, the job the page must do, and the message the first viewport needs to communicate." },
        { title: "Visual system", body: "Specify palette, type hierarchy, spacing, borders, radii, shadows, and motion instead of saying only ‘modern’ or ‘premium’." },
        { title: "Implementation rules", body: "Add component structure, responsive behavior, loading and empty states, keyboard behavior, and accessibility checks." },
      ],
      workflowTitle: "A four-step AI frontend workflow",
      workflow: [
        "Write the page goal, audience, and content hierarchy before choosing a landing page, dashboard, portfolio, or app structure.",
        "Choose one StyleKit direction and add its colors, type, spacing, components, and avoid list to the brief.",
        "Ask the AI to outline the page structure and component list first, then implement sections instead of generating a complex site in one shot.",
      ],
      stylesTitle: "Control AI output with specific visual language",
      stylesBody: "AI web design quality depends on whether the input can be executed. StyleKit provides design tokens, component recipes, and frontend prompt guidance that turn visual judgment into rules an AI can follow.",
      relatedTitle: "Continue with StyleKit",
      related: [
        { label: "AI UI design hub", href: "/ai-ui-design", body: "Learn how to give style constraints to ChatGPT, Claude Code, or Codex." },
        { label: "AI frontend design", href: "/ai-frontend-design", body: "Turn page intent, component boundaries, and implementation rules into an AI workflow." },
        { label: "UI prompt library", href: "/ui-prompts", body: "Choose prompts for landing pages, dashboards, Tailwind UI, and dark mode." },
        { label: "Tailwind UI prompts", href: "/tailwind-ui-prompts", body: "Translate design rules into React, Next.js, and Tailwind CSS implementation." },
      ],
      faq: [
        { question: "What is the difference between AI web design and an AI website generator?", answer: "AI website generators emphasize producing a complete page quickly. AI web design focuses on page intent, visual systems, component consistency, and maintainability. StyleKit is built for the latter." },
        { question: "Why do AI-generated websites often look the same?", answer: "Prompts usually describe only the industry and page type, so the model falls back to common defaults. Explicit visual direction, hierarchy, component states, and avoid rules reduce that template effect." },
        { question: "Which AI coding tools work with StyleKit?", answer: "StyleKit outputs general design tokens, component rules, and frontend prompts that can be used as context with ChatGPT, Claude Code, Codex, and other code-generating tools." },
      ],
    } : key === "ai-frontend-design" ? {
      title: "AI Frontend Design & Web Code Generation Workflow",
      description: "Build a practical AI frontend workflow with page intent, visual systems, component constraints, and responsive React or Tailwind implementation rules.",
      h1: "AI frontend design: generate web code you can maintain",
      intro: "AI can generate code without understanding the page. StyleKit turns frontend design into page intent, visual tokens, component boundaries, and acceptance criteria that AI coding tools can execute and reuse.",
      eyebrow: "AI FRONTEND DESIGN WORKFLOW",
      primaryCta: "Choose a frontend design style",
      secondaryCta: "Get frontend prompts",
      includedTitle: "What belongs in an AI frontend design brief?",
      included: [
        { title: "Page and user task", body: "Define the audience, the problem the page solves, the primary action, and content priorities across devices." },
        { title: "Visual and component rules", body: "Specify colors, type, spacing, radii, borders, shadows, component states, and defaults to avoid." },
        { title: "Code and experience constraints", body: "State the React, Next.js, Tailwind CSS, responsive, keyboard, loading, and empty-state requirements." },
      ],
      workflowTitle: "From an AI web idea to frontend code",
      workflow: [
        "Describe the page goal, audience, and content hierarchy before choosing a landing page, dashboard, portfolio, or product interface.",
        "Choose one StyleKit direction and add its design tokens, component recipes, and avoid list to the prompt.",
        "Ask the AI to outline information architecture, sections, and components first, then implement the page in reviewable parts.",
        "Verify mobile behavior, interaction states, accessibility, content density, and component consistency before requesting targeted fixes.",
      ],
      stylesTitle: "Make frontend AI workflows use executable design language",
      stylesBody: "Words like premium, modern, and futuristic do not constrain code. StyleKit translates a visual direction into color, type, layout, component, and interaction rules that AI can follow.",
      relatedTitle: "Continue with StyleKit",
      related: [
        { label: "AI web design", href: "/ai-web-design", body: "Organize AI web design requests around page intent and a visual system." },
        { label: "AI UI design", href: "/ai-ui-design", body: "Choose reusable UI constraints for ChatGPT, Claude Code, and Codex." },
        { label: "UI prompt library", href: "/ui-prompts", body: "Copy frontend prompts for websites, dashboards, landing pages, and Tailwind UI." },
      ],
      faq: [
        { question: "What is the difference between AI frontend design and an AI website builder?", answer: "AI website builders emphasize producing a complete website quickly. AI frontend design also covers page intent, component boundaries, visual systems, interaction states, responsive behavior, and maintainability." },
        { question: "Why does AI-generated frontend code look so similar?", answer: "Prompts often mention only the industry and page type. Explicit visual rules, content hierarchy, component states, and avoid constraints reduce the default template effect." },
        { question: "Which AI frontend tools can use StyleKit?", answer: "StyleKit tokens, component rules, and prompts can be used as context with ChatGPT, Claude Code, Codex, and other AI coding tools." },
      ],
    } : key === "avoid-ai-slop" ? {
      title: "Avoid AI Slop: Frontend UI Design Rules & Prompts",
      description: "Stop AI-generated interfaces from looking generic. Use specific web styles, design tokens, component states, and acceptance checks to create frontend UI with a point of view.",
      h1: "Avoid AI slop: make AI-generated frontend UI feel intentional",
      intro: "AI slop is rarely about broken code. It is the default SaaS look: blue-purple gradients, rounded cards, decorative icons, and no content hierarchy. StyleKit turns ‘make it less generic’ into concrete design rules an AI can execute.",
      eyebrow: "ANTI-AI-SLOP UI SYSTEM",
      primaryCta: "Browse distinctive UI styles",
      secondaryCta: "Get anti-template prompts",
      includedTitle: "Where does AI slop come from?",
      included: [
        { title: "Vague visual direction", body: "Words like modern, clean, or premium leave the AI with the most common average answer from its training data." },
        { title: "No content hierarchy", body: "The page starts stacking cards and buttons before deciding the narrative order, information density, and primary action." },
        { title: "No reverse checklist", body: "The prompt does not say which defaults must not appear, or check mobile, focus, and empty-data states." },
      ],
      workflowTitle: "An anti-template workflow for one UI iteration",
      workflow: [
        "Name the three places where the current page feels most generic: palette, layout, typography, or component treatment.",
        "Choose one clear style and specify the tokens, component states, and visual defaults that must be avoided.",
        "Refactor section by section, then verify hierarchy, responsive behavior, accessibility, and consistency instead of judging only the hero screenshot.",
      ],
      stylesTitle: "Do not say ‘make it distinctive’; give the AI checkable rules",
      stylesBody: "StyleKit covers minimal, editorial, neo-brutalist, Swiss, retro, glassmorphic, and other directions. Each can be translated into color, type, layout, component, and interaction constraints.",
      relatedTitle: "Use these pages to escape default AI UI",
      related: [
        { label: "AI web design", href: "/ai-web-design", body: "Organize an AI frontend brief around page intent and a visual system." },
        { label: "AI frontend design", href: "/ai-frontend-design", body: "Turn AI-generated web code into a reviewable, maintainable frontend workflow." },
        { label: "UI design styles", href: "/styles", body: "Choose a direction with a real visual language instead of stacking adjectives." },
        { label: "UI prompt library", href: "/ui-prompts", body: "Copy page structure, component states, and implementation constraints." },
      ],
      faq: [
        { question: "What is AI slop?", answer: "AI slop describes high-volume AI output with little distinctive judgment or useful content. In frontend UI it often looks like the same gradients, rounded cards, default fonts, decorative icons, and weak information hierarchy." },
        { question: "How do I make AI-generated UI more distinctive?", answer: "Do not ask only for something beautiful. Choose a clear style, specify color and type, explain the content hierarchy and component states, then add constraints describing what must not appear." },
        { question: "Which tools can use anti-AI-slop prompts?", answer: "They work with code-generating tools such as ChatGPT, Claude Code, and Codex. The prompt is model-agnostic; the important part is that the design rules are specific." },
      ],
    } : {
      title: "AI UI Design Styles & Frontend Prompts",
      description: "Choose web UI styles for ChatGPT, Claude Code, and Codex. Get design tokens, component constraints, and reusable frontend prompts for consistent interfaces.",
      h1: "AI UI design: choose the style before the AI writes the interface",
      intro: "StyleKit turns visual direction into constraints an AI coding tool can execute: palette, typography, spacing, radii, shadows, interaction, and responsive rules. Choose a style first, then reuse the same brief across different coding tools.",
      eyebrow: "AI-FIRST DESIGN WORKFLOW",
      primaryCta: "Browse UI design styles",
      secondaryCta: "Explore UI prompts",
      includedTitle: "What belongs in an executable UI design brief?",
      included: [
        { title: "Visual rules", body: "Palette, type scale, spacing baseline, radii, borders, shadows, and light/dark behavior—not just an adjective like modern." },
        { title: "Component constraints", body: "Describe navigation, cards, buttons, forms, tables, and empty states as reusable behavior so the AI has fewer chances to drift." },
        { title: "Acceptance criteria", body: "Add responsive breakpoints, accessibility, interaction states, and things to avoid so the result has a measurable target." },
      ],
      workflowTitle: "A practical AI coding workflow",
      workflow: [
        "Choose one visual direction from the style catalog and open its colors, tokens, and component guidance.",
        "Combine the page goal, audience, content structure, and style constraints into one brief instead of asking for something merely ‘premium’.",
        "Build the information architecture and component skeleton first, then implement visual details and verify mobile and keyboard behavior.",
      ],
      stylesTitle: "Start with constraints, not random inspiration",
      stylesBody: "Each style page can become context for an AI coding session. Pick one direction, then adapt density and components to the page scenario instead of stacking conflicting style adjectives into one prompt.",
      relatedTitle: "Continue exploring",
      related: [
        { label: "UI prompt library", href: "/ui-prompts", body: "Find reusable frontend prompts by page type and visual theme." },
        { label: "Tailwind UI prompts", href: "/tailwind-ui-prompts", body: "Translate style constraints into Tailwind CSS classes and component structure." },
        { label: "Developer resources", href: "/developers", body: "Explore the shadcn registry, tokens, and React-oriented resources." },
      ],
      faq: [
        { question: "Can AI coding tools use StyleKit directly?", answer: "Copy the design rules and prompt guidance from StyleKit into your coding context. StyleKit is not tied to one model; its purpose is to make design constraints readable, reusable, and testable." },
        { question: "Why is a style name alone not enough?", answer: "A style name expresses a direction, not an implementation. Specific colors, type, spacing, component states, and responsive rules make the output less likely to drift from page to page." },
        { question: "What projects is StyleKit useful for?", answer: "Landing pages, SaaS products, dashboards, portfolios, admin tools, and component libraries that need a consistent visual language—especially when AI assists with implementation." },
      ],
    }),
    ...(key === "ai-web-design" || key === "ai-frontend-design" || key === "avoid-ai-slop" ? {} : {
    title: key === "ai-ui-design"
      ? "AI UI Design Styles & Frontend Prompts"
      : `${tool} UI Design Styles & Prompts`,
    description: key === "ai-ui-design"
      ? "Choose web UI styles for ChatGPT, Claude Code, and Codex. Get design tokens, component constraints, and reusable frontend prompts for consistent interfaces."
      : `Create more consistent web interfaces with ${tool}: choose a StyleKit direction, then use its design tokens, component recipes, and frontend prompt constraints.`,
    h1: key === "ai-ui-design"
      ? "AI UI design: choose the style before the AI writes the interface"
      : `${tool} UI design styles and frontend prompts`,
    intro: key === "ai-ui-design"
      ? "StyleKit turns visual direction into constraints an AI coding tool can execute: palette, typography, spacing, radii, shadows, interaction, and responsive rules. Choose a style first, then reuse the same brief across different coding tools."
      : `${tool} can generate the code; StyleKit helps define what the interface should feel like. Lock the style and page intent first, then give ${tool} explicit tokens, component boundaries, states, and acceptance criteria.`,
    eyebrow: "AI-FIRST DESIGN WORKFLOW",
    primaryCta: "Browse UI design styles",
    secondaryCta: "Explore UI prompts",
    includedTitle: "What belongs in an executable UI design brief?",
    included: [
      { title: "Visual rules", body: "Palette, type scale, spacing baseline, radii, borders, shadows, and light/dark behavior—not just an adjective like modern." },
      { title: "Component constraints", body: "Describe navigation, cards, buttons, forms, tables, and empty states as reusable behavior so the AI has fewer chances to drift." },
      { title: "Acceptance criteria", body: "Add responsive breakpoints, accessibility, interaction states, and things to avoid so the result has a measurable target." },
    ],
    workflowTitle: `A practical ${tool} workflow`,
    workflow: [
      "Choose one visual direction from the style catalog and open its colors, tokens, and component guidance.",
      "Combine the page goal, audience, content structure, and style constraints into one brief instead of asking for something merely ‘premium’.",
      `Ask ${tool} to build the information architecture and component skeleton first, then implement visual details and verify mobile and keyboard behavior.`,
    ],
    stylesTitle: "Start with constraints, not random inspiration",
    stylesBody: "Each style page can become context for an AI coding session. Pick one direction, then adapt density and components to the page scenario instead of stacking conflicting style adjectives into one prompt.",
    relatedTitle: "Continue exploring",
    related: [
      { label: "UI prompt library", href: "/ui-prompts", body: "Find reusable frontend prompts by page type and visual theme." },
      { label: "Tailwind UI prompts", href: "/tailwind-ui-prompts", body: "Translate style constraints into Tailwind CSS classes and component structure." },
      { label: "Developer resources", href: "/developers", body: "Explore the shadcn registry, tokens, and React-oriented resources." },
    ],
    faq: [
      { question: `Can ${tool} use StyleKit directly?`, answer: `Copy the design rules and prompt guidance from StyleKit into your ${tool} context. StyleKit is not tied to one model; its purpose is to make design constraints readable, reusable, and testable.` },
      { question: "Why is a style name alone not enough?", answer: "‘Glassmorphism’ or ‘minimal’ expresses a direction, not an implementation. Specific colors, type, spacing, component states, and responsive rules make the output less likely to drift from page to page." },
      { question: "What projects is StyleKit useful for?", answer: "Landing pages, SaaS products, dashboards, portfolios, admin tools, and component libraries that need a consistent visual language—especially when AI assists with implementation." },
    ],
    }),
  };
}

export function getAiIntentMetadata(
  key: AiIntentPageKey,
  locale: string,
): Metadata {
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const copy = getCopy(key, resolvedLocale);
  const keywords = resolvedLocale === "zh"
    ? key === "ai-web-design"
      ? ["AI 网页设计", "AI 生成网页", "AI 网页设计工具", "AI 网站设计", "网页设计提示词", "AI 前端 UI"]
      : key === "ai-frontend-design"
        ? ["AI 前端设计", "AI 前端开发", "前端 AI 工作流", "前端 AI 编程工具", "AI 生成网页代码", "AI 网站制作工具"]
        : key === "avoid-ai-slop"
          ? ["AI 生成网站不好看", "AI 生成网页不好看怎么办", "避免 AI 味", "AI 前端设计规范", "AI UI 提示词"]
          : ["AI UI 设计", "AI UI 提示词", "网页设计提示词", "AI 界面设计", "前端提示词", "设计 tokens"]
    : [
        "AI UI design",
        "frontend prompts",
        "web design styles",
        TOOL_LABELS[key],
        "design tokens",
        "Tailwind CSS",
      ];
  return localizeMetadata(
    {
      title: copy.title,
      description: copy.description,
      keywords,
      openGraph: {
        title: `${copy.title} | StyleKit`,
        description: copy.description,
        type: "website",
      },
    },
    resolvedLocale,
    `/${key}`,
  );
}

function getStyleName(style: ReturnType<typeof getAllStylesMeta>[number], locale: Locale) {
  return locale === "zh" ? style.name : style.nameEn;
}

export function AiIntentPage({
  keyName,
  locale: rawLocale,
}: {
  keyName: AiIntentPageKey;
  locale: string;
}) {
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const copy = getCopy(keyName, locale);
  const baseUrl = getBaseUrl();
  const pagePath = `/${keyName}`;
  const pageUrl = `${baseUrl}${getAlternateLocalePath(pagePath, locale)}`;
  const styles = getAllStylesMeta().slice(0, 6);
  const breadcrumbHome = locale === "zh" ? "首页" : "Home";
  const breadcrumbCurrent = keyName === "ai-ui-design"
    ? locale === "zh" ? "AI UI 设计" : "AI UI Design"
    : copy.h1;
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: breadcrumbHome, url: `${baseUrl}${getAlternateLocalePath("/", locale)}` },
    { name: breadcrumbCurrent, url: pageUrl },
  ]);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  const linkFor = (href: string) => getAlternateLocalePath(href, locale);

  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} />
      <Header />
      <div className="container mx-auto px-4 pt-4">
        <Breadcrumb items={[{ label: breadcrumbHome, href: "/" }, { label: breadcrumbCurrent }]} />
      </div>
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 md:px-12 md:pt-20">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-muted">{copy.eyebrow}</p>
          <div className="max-w-4xl">
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">{copy.h1}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted md:text-xl">{copy.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={linkFor("/styles")} className="inline-flex min-h-12 items-center border border-foreground bg-foreground px-5 text-sm text-background transition-opacity hover:opacity-80">{copy.primaryCta}</Link>
              <Link href={linkFor("/ui-prompts")} className="inline-flex min-h-12 items-center border border-border px-5 text-sm transition-colors hover:border-foreground">{copy.secondaryCta}</Link>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted/5">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:px-12 md:py-20">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{copy.includedTitle}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {copy.included.map((item, index) => (
                <article key={item.title} className="border border-border bg-background p-6">
                  <p className="text-xs tracking-[0.18em] text-muted">0{index + 1}</p>
                  <h3 className="mt-8 text-lg font-medium">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:px-12 md:py-20">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{copy.workflowTitle}</h2>
            <ol className="mt-8 space-y-6">
              {copy.workflow.map((step, index) => (
                <li key={step} className="flex gap-4 border-b border-border pb-6">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-foreground text-xs">{index + 1}</span>
                  <p className="text-sm leading-7 text-muted">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="border border-border bg-foreground p-6 text-background md:p-8">
            <p className="text-xs uppercase tracking-[0.18em] opacity-60">Prompt skeleton</p>
            <pre className="mt-6 whitespace-pre-wrap font-mono text-sm leading-7">{`Build a ${keyName === "ai-ui-design" ? "responsive web page" : `${TOOL_LABELS[keyName]} interface`} using one StyleKit visual direction.\n\nInclude:\n- explicit colors, typography, spacing, radii, and shadows\n- reusable components with hover, focus, loading, and empty states\n- responsive behavior and keyboard-accessible controls\n- a short list of visual choices that must not drift`}</pre>
          </div>
        </section>

        <section className="border-y border-border bg-muted/5">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:px-12 md:py-20">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{copy.stylesTitle}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{copy.stylesBody}</p>
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
              {styles.map((style) => (
                <Link key={style.slug} href={linkFor(`/styles/${style.slug}`)} className="group border border-border bg-background p-4 transition-colors hover:border-foreground">
                  <p className="text-sm font-medium group-hover:underline">{getStyleName(style, locale)}</p>
                  <p className="mt-2 line-clamp-3 text-xs leading-6 text-muted">{locale === "zh" ? style.description : style.descriptionEn}</p>
                </Link>
              ))}
            </div>
            <Link href={linkFor("/styles")} className="mt-6 inline-flex text-sm underline underline-offset-4">{copy.primaryCta} →</Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:px-12 md:py-20">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{copy.relatedTitle}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {copy.related.map((item) => (
              <Link key={item.href} href={linkFor(item.href)} className="border border-border p-6 transition-colors hover:border-foreground">
                <h3 className="font-medium">{item.label} →</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 md:px-12">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">FAQ</h2>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {copy.faq.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="cursor-pointer list-none pr-8 text-base font-medium marker:hidden">{item.question}</summary>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
