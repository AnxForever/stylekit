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
  | "ai-generated-website-fix"
  | "ai-web-design-tools"
  | "ai-ui-generator"
  | "ai-frontend-workflow"
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
  "ai-generated-website-fix": "AI generated website fix",
  "ai-web-design-tools": "AI web design tools",
  "ai-ui-generator": "AI UI generator",
  "ai-frontend-workflow": "AI frontend workflow",
  "avoid-ai-slop": "AI slop prevention",
  "claude-code-ui-design": "Claude Code",
  "codex-ui-design": "Codex",
};

function getPracticalCopy(
  key: Extract<AiIntentPageKey, "ai-generated-website-fix" | "ai-web-design-tools" | "ai-ui-generator" | "ai-frontend-workflow">,
  locale: Locale,
): AiIntentCopy {
  if (locale === "zh") {
    if (key === "ai-generated-website-fix") {
      return {
        title: "AI 生成网站不好看怎么办？前端 UI 修复清单",
        description: "AI 生成的网站不好看，通常不是代码问题，而是视觉方向、内容层级和组件状态不清楚。用这份前端 UI 修复清单逐项改进 AI 网页。",
        h1: "AI 生成网站不好看怎么办？",
        intro: "如果 AI 生成的网站看起来像模板，不要只让它‘再设计得好看一点’。先定位配色、排版、布局、内容和组件状态的问题，再用具体规则要求 AI 修改。",
        eyebrow: "FIX AI-GENERATED UI",
        primaryCta: "选择一个视觉风格",
        secondaryCta: "复制 UI 提示词",
        includedTitle: "AI 生成网页难看的 4 个常见原因",
        included: [
          { title: "只有形容词，没有规则", body: "modern、premium、科技感不能直接指导代码。AI 需要颜色、字体、间距、边框、阴影和圆角等可执行的值。" },
          { title: "首屏没有内容层级", body: "标题、说明、主动作和辅助信息没有优先级，页面就会变成卡片和按钮的堆叠。" },
          { title: "组件没有状态", body: "只描述默认状态，没有 hover、focus、loading、empty、error 和 disabled 状态，界面会显得像静态截图。" },
          { title: "没有禁止项", body: "不告诉 AI 不要使用蓝紫渐变、过度圆角、无意义图标或重复卡片，它通常会回到训练数据里的平均答案。" },
        ],
        workflowTitle: "一套可复用的 AI 网页修复流程",
        workflow: [
          "先截图或描述最明显的三个问题：视觉方向、信息层级和组件细节，不要笼统地说‘不好看’。",
          "从 StyleKit 选择一个风格，复制颜色、排版、间距、边框、阴影和禁止项，作为修改约束。",
          "让 AI 先改页面结构和内容层级，再改视觉 tokens，最后补齐交互状态和移动端布局。",
          "用真实内容、不同屏幕尺寸、键盘操作和空数据状态验收，确认修改不是只优化了首屏截图。",
        ],
        stylesTitle: "用 StyleKit 把‘不好看’变成可执行的修复规则",
        stylesBody: "StyleKit 的风格页提供设计 tokens、组件配方和 AI 规则。你可以把它们作为现有页面的改版约束，而不是让 AI 每轮重新猜一套视觉风格。",
        relatedTitle: "下一步从这里开始",
        related: [
          { label: "避免 AI Slop", href: "/avoid-ai-slop", body: "识别默认 AI UI 的视觉惯性，并加入反模板约束。" },
          { label: "AI 前端设计", href: "/ai-frontend-design", body: "把页面目标、组件边界和验收标准写进前端 brief。" },
          { label: "AI UI 生成器指南", href: "/ai-ui-generator", body: "了解如何让 AI 生成更完整、更一致的 UI 界面。" },
        ],
        faq: [
          { question: "为什么 AI 生成的网站总是很像？", answer: "因为需求通常只有行业、页面类型和几个形容词，没有规定具体视觉 tokens、内容层级、组件状态和禁止项。模型自然会回到常见的 SaaS 模板。" },
          { question: "应该重新生成整个网站吗？", answer: "通常不应该。先保留信息架构和真实内容，按页面结构、视觉 tokens、组件状态和响应式问题分阶段修复，结果更容易控制。" },
          { question: "StyleKit 能修复已有的 AI 网页吗？", answer: "可以。选择一个风格后，把它的 Hard Prompt、tokens 和禁止项放进改版上下文，让 AI 针对已有代码做可检查的修改。" },
        ],
      };
    }

    if (key === "ai-web-design-tools") {
      return {
        title: "AI 网页设计工具怎么选？从提示词到前端代码",
        description: "AI 网页设计工具选择指南：比较 AI 设计、网页生成、UI 提示词和 AI 编码工作流，帮助你从想法生成可维护的前端页面。",
        h1: "AI 网页设计工具怎么选？",
        intro: "不同 AI 网页设计工具解决的不是同一个问题。有的适合探索视觉方向，有的适合生成页面，有的适合把设计规则落实成 React 和 Tailwind 代码。先按工作阶段选择，才能避免工具越多结果越乱。",
        eyebrow: "AI WEB DESIGN TOOLS",
        primaryCta: "浏览网页设计风格",
        secondaryCta: "查看 AI 提示词库",
        includedTitle: "选择 AI 网页设计工具时看什么？",
        included: [
          { title: "能否控制视觉系统", body: "工具是否支持颜色、字体、间距、边框、圆角、阴影和动效规则，而不只是输入一句‘做得现代一点’。" },
          { title: "能否处理真实页面状态", body: "检查它是否能覆盖响应式布局、loading、empty、error、focus、disabled 和真实内容密度。" },
          { title: "能否进入代码工作流", body: "确认输出是否适合 React、Next.js、Tailwind CSS 或你的组件库，而不是只能得到一张无法维护的截图。" },
        ],
        workflowTitle: "AI 网页设计工具的 4 阶段工作流",
        workflow: [
          "用文字或参考图明确页面目标、用户和内容结构，先解决‘做什么’。",
          "用 StyleKit 选择视觉方向，确定颜色、字体、间距、组件和禁止项，解决‘看起来像什么’。",
          "用 AI 工具生成页面骨架和组件，再让 AI 按区块实现 React、Next.js 或 Tailwind 代码。",
          "在浏览器中用真实内容和移动端检查结果，回到代码中修复具体问题，而不是反复随机生成。",
        ],
        stylesTitle: "工具只是执行层，设计规则才是稳定性来源",
        stylesBody: "AI 网页设计工具容易把页面带回平均模板。StyleKit 把设计风格、tokens、组件规则和前端提示词放在一起，让不同工具共享同一套视觉上下文。",
        relatedTitle: "配套资源",
        related: [
          { label: "AI 前端工作流", href: "/ai-frontend-workflow", body: "从页面 brief 到 React、Next.js 和 Tailwind 实现。" },
          { label: "AI 生成网页修复", href: "/ai-generated-website-fix", body: "解决 AI 网页生成后常见的模板感和视觉漂移。" },
          { label: "Tailwind UI 提示词", href: "/tailwind-ui-prompts", body: "直接使用实现导向的 Tailwind CSS UI prompts。" },
        ],
        faq: [
          { question: "AI 网页设计工具和 AI 建站工具一样吗？", answer: "不完全一样。AI 建站工具强调快速得到完整站点；AI 网页设计工具还要解决视觉探索、页面结构、组件状态和后续代码实现。" },
          { question: "选择工具前要不要先选风格？", answer: "建议先确定一个可执行的视觉方向。没有风格规则时，不同工具会各自生成一套默认 UI，最终很难保持一致。" },
          { question: "StyleKit 是 AI 网页设计工具吗？", answer: "StyleKit 更像 AI 前端设计上下文和风格系统：提供风格、tokens、组件配方和提示词，配合你正在使用的 AI 设计或编码工具完成实现。" },
        ],
      };
    }

    if (key === "ai-ui-generator") {
      return {
        title: "AI 生成 UI 界面：从页面结构到可用前端",
        description: "学习如何用 AI 生成 UI 界面：先确定页面结构、视觉 tokens、组件状态和响应式规则，再生成更一致的 React、Next.js 和 Tailwind 前端。",
        h1: "AI 生成 UI 界面：不要只生成一张好看的图",
        intro: "AI 生成 UI 的关键不是让模型一次产出更多组件，而是让它理解页面任务、信息层级和交互状态。StyleKit 帮你把视觉方向变成可以直接交给 AI 的 UI 规则。",
        eyebrow: "AI UI GENERATION",
        primaryCta: "选择 UI 设计风格",
        secondaryCta: "复制 UI 提示词",
        includedTitle: "一份可用的 AI UI 生成需求包含什么？",
        included: [
          { title: "页面结构", body: "明确导航、首屏、内容区、主要动作、辅助信息和 footer 的关系，不让 AI 自由堆叠区块。" },
          { title: "设计 tokens", body: "给出颜色、字体层级、间距尺度、边框、阴影、圆角和暗色模式规则，让组件拥有统一语言。" },
          { title: "交互状态", body: "要求 AI 同时处理 hover、focus、active、loading、empty、error 和 disabled，避免只生成静态默认态。" },
        ],
        workflowTitle: "AI 生成 UI 的正确顺序",
        workflow: [
          "先写页面目标和用户任务，再列出页面区块与组件清单。",
          "从 StyleKit 选择风格，把具体 tokens 和禁止项加入 prompt。",
          "让 AI 先生成可访问的结构和内容，再实现视觉细节与动效。",
          "用真实数据、移动端断点和键盘操作验收，针对问题逐项修复。",
        ],
        stylesTitle: "让 UI 生成从平均答案变成有判断的界面",
        stylesBody: "StyleKit 提供 140+ 网页和 UI 风格，每个方向都有设计说明、组件规则和可导出的 AI 提示词，适合在 UI 生成前先锁定视觉语言。",
        relatedTitle: "继续生成更稳定的 UI",
        related: [
          { label: "AI 网页设计", href: "/ai-web-design", body: "从页面目标、视觉系统和实现约束开始。" },
          { label: "UI 提示词库", href: "/ui-prompts", body: "按落地页、仪表盘、暗色模式和 Tailwind UI 选择 prompts。" },
          { label: "AI 生成网页修复", href: "/ai-generated-website-fix", body: "修复 AI 生成 UI 的模板感、层级和状态缺失。" },
        ],
        faq: [
          { question: "AI 生成 UI 和 AI 生成网页有什么区别？", answer: "AI 生成网页通常关注完整页面，AI 生成 UI 更关注页面中的组件、状态、层级和可复用性。两者都需要先定义视觉系统，才能避免结果漂移。" },
          { question: "如何让 AI 生成的 UI 不像模板？", answer: "使用明确的风格、具体的 tokens、真实内容层级和禁止项，并要求 AI 输出完整交互状态，而不是只生成一组圆角卡片。" },
          { question: "AI 生成 UI 可以直接用于生产吗？", answer: "生成结果仍需要代码审查、响应式检查、可访问性检查和真实数据测试。StyleKit 的规则可以减少视觉漂移，但不能替代工程验收。" },
        ],
      };
    }

    return {
      title: "AI 前端工作流：从网页想法到 React 与 Tailwind",
      description: "一套 AI 前端工作流：从页面 brief、视觉风格和 UI 提示词开始，到 React、Next.js、Tailwind CSS 组件实现与质量验收。",
      h1: "AI 前端工作流：从想法到可维护代码",
      intro: "AI 前端开发的难点不是生成第一版代码，而是让页面在多轮修改后仍然保持结构清晰、视觉一致、响应式可用。把设计规则、组件边界和验收条件放进同一条工作流，结果会稳定很多。",
      eyebrow: "AI FRONTEND WORKFLOW",
      primaryCta: "开始 AI 前端设计",
      secondaryCta: "浏览前端提示词",
      includedTitle: "AI 前端工作流的 4 个核心输入",
      included: [
        { title: "产品与页面 brief", body: "写清用户、任务、内容优先级和主要转化动作，先决定页面为什么存在。" },
        { title: "视觉规则", body: "用 StyleKit 固定色板、字体、间距、边框、阴影、圆角和动效，不让每轮生成重新猜风格。" },
        { title: "组件与状态", body: "定义组件边界、数据结构、响应式规则和 loading、empty、error、focus 等状态。" },
        { title: "验收清单", body: "用真实内容、移动端、键盘操作、可访问性和视觉一致性逐项检查输出。" },
      ],
      workflowTitle: "推荐的 AI 前端开发顺序",
      workflow: [
        "先让 AI 总结页面目标、信息架构和组件树，确认它理解了需求。",
        "再提供 StyleKit 风格规则和技术约束，要求先完成结构与可访问性。",
        "按区块实现视觉细节，保持同一份 tokens 和组件状态规则，不要每轮推翻整个页面。",
        "用浏览器和真实数据验收，把问题拆成具体任务交给 AI 修复并复查。",
      ],
      stylesTitle: "AI 编程工具需要设计上下文，而不只是代码上下文",
      stylesBody: "代码工具能生成组件，但不一定知道页面应该保持什么视觉判断。StyleKit 将风格、tokens、组件配方和提示词组合成可复用的前端设计上下文。",
      relatedTitle: "工作流入口",
      related: [
        { label: "AI 前端设计", href: "/ai-frontend-design", body: "先定义页面目标、视觉系统和实现约束。" },
        { label: "AI 生成 UI", href: "/ai-ui-generator", body: "从结构、tokens 和状态开始生成可用 UI。" },
        { label: "AI 网页设计工具", href: "/ai-web-design-tools", body: "按探索、生成、编码和验收阶段选择工具。" },
      ],
      faq: [
        { question: "AI 前端工作流和直接让 AI 写代码有什么区别？", answer: "工作流会先固定页面目标、视觉规则、组件边界和验收标准，再分阶段实现。直接让 AI 写代码速度快，但更容易出现结构混乱、样式漂移和重复重写。" },
        { question: "应该一次让 AI 生成整个网站吗？", answer: "复杂网站不建议一次生成。先做信息架构和组件骨架，再按页面或区块实现，AI 更容易理解上下文，也更方便人工验收。" },
        { question: "哪些技术栈适合这套工作流？", answer: "React、Next.js、Tailwind CSS 和 shadcn/ui 都适合。关键不是固定技术栈，而是让设计 tokens、组件状态和验收规则可复用。" },
      ],
    };
  }

  if (key === "ai-generated-website-fix") {
    return {
      title: "Fix an AI-Generated Website That Looks Bad",
      description: "A practical checklist for fixing generic AI-generated websites with better hierarchy, visual tokens, component states, and responsive frontend rules.",
      h1: "How to fix an AI-generated website that looks bad",
      intro: "Do not ask the AI to make the page ‘prettier’. Diagnose hierarchy, visual direction, content, and component states, then apply explicit frontend rules.",
      eyebrow: "FIX AI-GENERATED UI",
      primaryCta: "Choose a visual style",
      secondaryCta: "Copy UI prompts",
      includedTitle: "Four common reasons AI websites look bad",
      included: [
        { title: "Adjectives without rules", body: "Modern and premium do not specify colors, typography, spacing, borders, shadows, or radii." },
        { title: "Weak first-viewport hierarchy", body: "The headline, primary action, supporting proof, and content structure have no clear priority." },
        { title: "Missing component states", body: "A static default state is not a production UI. Include hover, focus, loading, empty, error, and disabled states." },
        { title: "No avoid list", body: "Tell the AI which generic gradients, icons, card patterns, or spacing habits must not appear." },
      ],
      workflowTitle: "A repeatable AI website repair workflow",
      workflow: [
        "Name the three most visible problems instead of saying only that the page looks bad.",
        "Choose one StyleKit direction and add its tokens, component rules, and avoid list to the revision context.",
        "Fix structure and hierarchy first, then visual tokens, then interaction states and mobile behavior.",
        "Review real content, breakpoints, keyboard behavior, and empty data instead of judging only a hero screenshot.",
      ],
      stylesTitle: "Turn ‘bad’ into checkable frontend rules",
      stylesBody: "StyleKit provides design tokens, component recipes, and AI rules that can be used to revise existing code without asking the model to invent a new visual system every round.",
      relatedTitle: "Continue with StyleKit",
      related: [
        { label: "Avoid AI slop", href: "/avoid-ai-slop", body: "Recognize generic AI UI patterns and add anti-template constraints." },
        { label: "AI frontend design", href: "/ai-frontend-design", body: "Turn page intent, boundaries, and acceptance criteria into a brief." },
        { label: "AI UI generator guide", href: "/ai-ui-generator", body: "Generate interfaces from structure, tokens, and states." },
      ],
      faq: [
        { question: "Why do AI-generated websites look so similar?", answer: "The prompt usually describes only the industry and page type. Without visual tokens, hierarchy, component states, and avoid rules, the model falls back to common SaaS defaults." },
        { question: "Should I regenerate the whole site?", answer: "Usually no. Keep real content and information architecture, then repair structure, tokens, states, and responsive behavior in stages." },
        { question: "Can StyleKit fix an existing AI-generated site?", answer: "Yes. Copy a style’s hard prompt, tokens, and avoid rules into the revision context and ask the AI to make targeted changes to the existing code." },
      ],
    };
  }

  if (key === "ai-web-design-tools") {
    return {
      title: "How to Choose AI Web Design Tools",
      description: "Compare AI design, website generation, UI prompting, and AI coding workflows to move from a web idea to maintainable React and Tailwind frontend code.",
      h1: "How to choose AI web design tools",
      intro: "AI web design tools solve different stages of the same workflow. Choose by whether you need visual exploration, page generation, design constraints, or production frontend code.",
      eyebrow: "AI WEB DESIGN TOOLS",
      primaryCta: "Browse web design styles",
      secondaryCta: "Explore UI prompts",
      includedTitle: "What should an AI web design tool handle?",
      included: [
        { title: "Visual system control", body: "Can you specify colors, typography, spacing, borders, radii, shadows, and motion beyond a generic adjective?" },
        { title: "Real page states", body: "Can it handle responsive behavior, loading, empty, error, focus, disabled, and realistic content density?" },
        { title: "A path to code", body: "Can its output enter a React, Next.js, Tailwind, or component-library workflow instead of remaining a screenshot?" },
      ],
      workflowTitle: "A four-stage AI web design workflow",
      workflow: [
        "Define the page goal, audience, and content structure before choosing a tool.",
        "Choose a StyleKit direction and lock colors, typography, components, and avoid rules.",
        "Generate the page skeleton and implement it section by section in your frontend stack.",
        "Test real content and mobile behavior, then send targeted fixes back to the AI.",
      ],
      stylesTitle: "Tools are the execution layer; design rules create consistency",
      stylesBody: "StyleKit keeps visual direction, tokens, component recipes, and frontend prompts together so different AI tools can work from the same design context.",
      relatedTitle: "Related workflows",
      related: [
        { label: "AI frontend workflow", href: "/ai-frontend-workflow", body: "Move from page brief to React, Next.js, and Tailwind implementation." },
        { label: "Fix AI-generated websites", href: "/ai-generated-website-fix", body: "Repair generic output and visual drift after generation." },
        { label: "Tailwind UI prompts", href: "/tailwind-ui-prompts", body: "Use implementation-oriented prompts for Tailwind CSS UI." },
      ],
      faq: [
        { question: "Are AI web design tools and AI website builders the same?", answer: "Not exactly. Website builders emphasize getting a complete site quickly; web design workflows also cover visual exploration, structure, component states, and maintainable implementation." },
        { question: "Should I choose a visual style before choosing a tool?", answer: "Usually yes. Without explicit design rules, each tool invents its own default UI and the results are difficult to keep consistent." },
        { question: "Is StyleKit an AI web design tool?", answer: "StyleKit is a design context and style system for AI workflows. It provides styles, tokens, component recipes, and prompts that work alongside design and coding tools." },
      ],
    };
  }

  if (key === "ai-ui-generator") {
    return {
      title: "AI UI Generation: From Page Structure to Frontend",
      description: "Generate more usable UI with page structure, visual tokens, component states, and responsive rules for React, Next.js, and Tailwind frontend work.",
      h1: "AI UI generation: do not generate only a pretty screenshot",
      intro: "The quality of AI-generated UI depends on whether the model understands the page task, information hierarchy, and interaction states—not how many components it generates in one pass.",
      eyebrow: "AI UI GENERATION",
      primaryCta: "Choose a UI style",
      secondaryCta: "Copy UI prompts",
      includedTitle: "What belongs in a usable AI UI request?",
      included: [
        { title: "Page structure", body: "Define navigation, hero, content, primary action, supporting information, and footer relationships." },
        { title: "Design tokens", body: "Specify color, type hierarchy, spacing, borders, shadows, radii, and dark-mode behavior." },
        { title: "Interaction states", body: "Ask for hover, focus, active, loading, empty, error, and disabled states—not just the default view." },
      ],
      workflowTitle: "The right order for AI UI generation",
      workflow: [
        "Write the page goal and user task, then list sections and components.",
        "Choose one StyleKit direction and add concrete tokens and avoid rules.",
        "Have the AI build accessible structure and real content before visual details and motion.",
        "Review real data, mobile breakpoints, and keyboard behavior, then fix specific issues.",
      ],
      stylesTitle: "Move UI generation beyond the average answer",
      stylesBody: "StyleKit offers 140+ web and UI directions with design guidance, component rules, and exportable AI prompts for locking visual language before generation.",
      relatedTitle: "Generate more consistent UI",
      related: [
        { label: "AI web design", href: "/ai-web-design", body: "Start with page intent, visual systems, and implementation rules." },
        { label: "UI prompt library", href: "/ui-prompts", body: "Choose prompts for landing pages, dashboards, dark mode, and Tailwind UI." },
        { label: "Fix AI-generated websites", href: "/ai-generated-website-fix", body: "Repair hierarchy, states, and generic visual output." },
      ],
      faq: [
        { question: "What is the difference between AI UI generation and AI website generation?", answer: "AI website generation focuses on producing a complete page. AI UI generation focuses more closely on reusable components, states, hierarchy, and consistency." },
        { question: "How do I stop AI-generated UI from looking generic?", answer: "Use a clear style, concrete tokens, real content hierarchy, and an explicit avoid list. Require complete interaction states instead of a set of rounded default cards." },
        { question: "Can AI-generated UI go straight to production?", answer: "It still needs code review, responsive checks, accessibility checks, and real-data testing. Design rules reduce drift but do not replace engineering validation." },
      ],
    };
  }

  return {
    title: "AI Frontend Workflow: From Web Idea to React and Tailwind",
    description: "A practical AI frontend workflow from page brief and visual style to React, Next.js, Tailwind CSS components, and quality checks.",
    h1: "AI frontend workflow: from idea to maintainable code",
    intro: "The hard part of AI frontend development is not generating the first version. It is keeping structure, visual consistency, responsiveness, and maintainability through multiple rounds of changes.",
    eyebrow: "AI FRONTEND WORKFLOW",
    primaryCta: "Start AI frontend design",
    secondaryCta: "Browse frontend prompts",
    includedTitle: "Four inputs for an AI frontend workflow",
    included: [
      { title: "Product and page brief", body: "Define the user, task, content priorities, and primary action before writing components." },
      { title: "Visual rules", body: "Lock palette, type, spacing, borders, shadows, radii, and motion with StyleKit instead of re-deciding every round." },
      { title: "Components and states", body: "Define boundaries, data shape, responsive rules, and loading, empty, error, and focus states." },
      { title: "Acceptance checklist", body: "Review real content, mobile behavior, keyboard operation, accessibility, and visual consistency." },
    ],
    workflowTitle: "A recommended AI frontend development order",
    workflow: [
      "Ask the AI to summarize the page goal, information architecture, and component tree before implementation.",
      "Provide StyleKit rules and technical constraints, then build accessible structure first.",
      "Implement visual details section by section while reusing the same tokens and component states.",
      "Test in the browser with real data, split issues into targeted fixes, and review the result again.",
    ],
    stylesTitle: "AI coding tools need design context, not only code context",
    stylesBody: "AI can generate components without knowing the visual decisions they must preserve. StyleKit combines styles, tokens, component recipes, and prompts into reusable frontend design context.",
    relatedTitle: "Workflow entry points",
    related: [
      { label: "AI frontend design", href: "/ai-frontend-design", body: "Define page intent, visual systems, and implementation constraints." },
      { label: "AI UI generation", href: "/ai-ui-generator", body: "Generate usable UI from structure, tokens, and states." },
      { label: "AI web design tools", href: "/ai-web-design-tools", body: "Choose tools by exploration, generation, coding, and review stage." },
    ],
    faq: [
      { question: "How is an AI frontend workflow different from asking AI to write code?", answer: "It fixes the page goal, visual rules, component boundaries, and acceptance criteria before implementation, then delivers the page in reviewable stages." },
      { question: "Should AI generate the whole site at once?", answer: "For complex sites, no. Start with information architecture and a component skeleton, then implement pages or sections so the output is easier to review." },
      { question: "Which stacks work with this workflow?", answer: "React, Next.js, Tailwind CSS, and shadcn/ui all work well. The important part is making tokens, states, and acceptance rules reusable." },
    ],
  };
}

function getCopy(key: AiIntentPageKey, locale: Locale): AiIntentCopy {
  const isZh = locale === "zh";
  const tool = TOOL_LABELS[key];

  if (
    key === "ai-generated-website-fix" ||
    key === "ai-web-design-tools" ||
    key === "ai-ui-generator" ||
    key === "ai-frontend-workflow"
  ) {
    return getPracticalCopy(key, locale);
  }

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
          { label: "AI 网页设计工具", href: "/ai-web-design-tools", body: "按探索、生成、编码和验收阶段选择合适的工具。" },
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
          { label: "AI 前端工作流", href: "/ai-frontend-workflow", body: "从 brief、组件树到 React、Next.js 和 Tailwind 实现。" },
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
          { label: "AI 生成网页修复", href: "/ai-generated-website-fix", body: "解决 AI 网页生成后的模板感、层级和状态缺失。" },
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
        { label: "AI web design tools", href: "/ai-web-design-tools", body: "Choose tools by exploration, generation, coding, and review stage." },
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
        { label: "Fix AI-generated websites", href: "/ai-generated-website-fix", body: "Repair hierarchy, visual tokens, and component states after generation." },
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
        : key === "ai-generated-website-fix"
          ? ["AI 生成网站不好看", "AI 生成网页不好看怎么办", "AI 网站设计不好看", "AI 网页生成修复", "AI 前端设计规范"]
          : key === "ai-web-design-tools"
            ? ["AI 网页设计工具", "AI 网站设计工具", "AI 网页制作工具", "AI 网站生成器", "AI 做网页设计"]
            : key === "ai-ui-generator"
              ? ["AI 生成 UI", "AI 生成 UI 界面", "AI UI 生成器", "AI 界面设计", "AI UI 设计工具"]
              : key === "ai-frontend-workflow"
                ? ["AI 前端工作流", "AI 前端开发", "前端 AI 工作流", "前端 AI 编程工具", "AI 生成网页代码"]
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
