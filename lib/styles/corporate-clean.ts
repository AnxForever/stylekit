import { DesignStyle } from "./index";

export const corporateClean: DesignStyle = {
  slug: "corporate-clean",
  name: "企业简洁风",
  nameEn: "Corporate Clean",
  description:
    "专业简洁的企业风格，强调可读性、一致性和信任感。适合B2B SaaS、企业官网、后台管理系统。",
  cover: "/styles/corporate-clean.png",
  styleType: "visual",
  tags: ["minimal", "modern"],
  category: "minimal",
  colors: {
    primary: "#1e40af",
    secondary: "#f8fafc",
    accent: ["#3b82f6", "#64748b", "#10b981"],
  },
  keywords: ["企业", "专业", "简洁", "B2B", "SaaS", "后台", "Dashboard"],

  philosophy: `Corporate Clean 设计风格源于现代企业软件的设计语言，强调专业性、可信度和高效的信息传达。

核心理念：
- 专业可信：通过一致的视觉语言建立信任
- 信息层次：清晰的标题、正文、辅助信息层级
- 功能优先：设计服务于功能，不牺牲可用性
- 响应迅速：流畅的交互和即时的视觉反馈`,

  doList: [
    "使用 rounded-lg 或 rounded-xl 作为主要圆角",
    "按钮使用 shadow-sm 或 shadow 增加层次感",
    "主色使用蓝色系 (blue-600, blue-700) 传达专业感",
    "背景使用 bg-slate-50 或 bg-gray-50 的浅色调",
    "卡片使用 bg-white shadow-sm border border-gray-200",
    "使用 hover:shadow-md 为卡片添加悬停效果",
    "表格行使用 hover:bg-gray-50 的悬停高亮",
    "使用 focus:ring-2 focus:ring-blue-500 作为焦点状态",
  ],

  dontList: [
    "禁止使用过于鲜艳的颜色组合",
    "禁止使用 rounded-none 的尖锐边角",
    "禁止使用 shadow-2xl 等过重的阴影",
    "禁止使用渐变按钮（保持扁平设计）",
    "禁止在正文中使用花哨字体",
    "禁止元素间距过于紧凑",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Corporate 风格的按钮，专业可信",
      code: `// Primary Button
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-200 font-medium">
  Get Started
</button>

// Secondary Button
<button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200 font-medium">
  Learn More
</button>

// Ghost Button
<button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium">
  Cancel
</button>`,
    },
    card: {
      name: "卡片",
      description: "Corporate 风格的卡片，干净专业",
      code: `<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
      <Icon className="w-5 h-5 text-blue-600" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900">Feature Title</h3>
  </div>
  <p className="text-gray-600 leading-relaxed">
    Description of the feature with clear, professional language.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Corporate 风格的输入框",
      code: `<div className="space-y-1.5">
  <label className="block text-sm font-medium text-gray-700">Email Address</label>
  <input
    type="email"
    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
    placeholder="you@company.com"
  />
  <p className="text-xs text-gray-500">We'll never share your email.</p>
</div>`,
    },
  },

  globalCss: `/* Corporate Clean Global Styles */
@layer base {
  :root {
    --corporate-blue: 37 99 235;
    --corporate-gray: 100 116 139;
  }

  body {
    @apply bg-slate-50 text-gray-900 antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-semibold tracking-tight text-gray-900;
  }
}`,

  aiRules: `STYLE: Corporate Clean
TYPE: Professional Enterprise UI

MUST USE:
- rounded-lg or rounded-xl for components
- shadow-sm or shadow for cards/buttons
- Blue color palette (blue-500/600/700) for primary actions
- Gray palette (gray-50/100/200) for backgrounds and borders
- font-medium or font-semibold for interactive elements
- focus:ring-2 focus:ring-blue-500 for focus states

MUST AVOID:
- rounded-none (too harsh)
- shadow-2xl (too heavy)
- Gradient backgrounds on buttons
- Neon or overly bright colors
- Decorative fonts for body text

COLOR RULES:
- Primary: Blue (blue-600)
- Secondary: Slate/Gray (slate-100, gray-100)
- Success: Green (green-500)
- Warning: Amber (amber-500)
- Error: Red (red-500)

SPACING:
- Card padding: p-6
- Section padding: py-12 md:py-16
- Gap between elements: gap-4 or gap-6`,

  examplePrompts: [
    {
      title: "SaaS Dashboard",
      titleEn: "SaaS Dashboard",
      description: "生成企业级 SaaS 仪表板",
      descriptionEn: "Generate enterprise SaaS dashboard",
      prompt: `Create a SaaS dashboard using Corporate Clean style:
- Header with logo, search, and user menu
- Sidebar navigation with icons
- Main content area with metric cards
- Data table with pagination
- Use blue-600 for primary actions
- rounded-xl for cards, shadow-sm for depth`,
    },
  ],
};
