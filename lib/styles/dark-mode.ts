import { DesignStyle } from "./index";

export const darkMode: DesignStyle = {
  slug: "dark-mode",
  name: "暗黑模式",
  nameEn: "Dark Mode",
  description:
    "优雅的深色界面设计，低对比度层次、微妙的边框和高亮。适合开发工具、专业应用、深夜阅读模式。",
  cover: "/styles/dark-mode.png",
  styleType: "visual",
  tags: ["modern", "minimal"],
  category: "modern",
  colors: {
    primary: "#3b82f6",
    secondary: "#0f172a",
    accent: ["#22c55e", "#f59e0b", "#ef4444"],
  },
  keywords: ["暗黑", "深色", "夜间", "开发", "专业", "护眼"],

  philosophy: `Dark Mode 设计强调在深色背景上创造舒适的阅读体验和清晰的信息层次。

核心理念：
- 护眼舒适：降低屏幕亮度，减少视觉疲劳
- 层次分明：通过灰度和透明度区分层级
- 高亮聚焦：使用高亮色引导用户注意力
- 专业氛围：传达技术感和专业感`,

  doList: [
    "使用深色背景 bg-slate-900, bg-gray-900, bg-[#0f172a]",
    "卡片使用略浅的背景 bg-slate-800, bg-gray-800",
    "边框使用低对比度 border-slate-700, border-white/10",
    "文字使用 text-slate-100 主要, text-slate-400 次要",
    "高亮色保持高饱和度 blue-500, green-500",
    "悬停使用 hover:bg-slate-700 或 hover:bg-white/5",
    "使用 rounded-lg 或 rounded-xl 圆角",
  ],

  dontList: [
    "禁止使用纯白文字 text-white（过于刺眼）",
    "禁止使用高对比度边框",
    "禁止使用纯黑背景 #000000（过于沉闷）",
    "禁止在深色背景上使用深色文字",
    "禁止高亮色使用过多",
    "禁止阴影使用浅色",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Dark Mode 风格的按钮",
      code: `// Primary Button
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200 font-medium">
  Save Changes
</button>

// Secondary Button
<button className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors duration-200 font-medium">
  Cancel
</button>

// Ghost Button
<button className="px-4 py-2 text-slate-300 hover:bg-white/5 rounded-lg transition-colors duration-200 font-medium">
  Learn More
</button>

// Danger Button
<button className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-colors duration-200 font-medium">
  Delete
</button>`,
    },
    card: {
      name: "卡片",
      description: "Dark Mode 风格的卡片",
      code: `<div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors duration-200">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
      <Icon className="w-5 h-5 text-blue-400" />
    </div>
    <h3 className="text-lg font-semibold text-slate-100">Feature Title</h3>
  </div>
  <p className="text-slate-400 leading-relaxed">
    Description with comfortable contrast for night reading.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Dark Mode 风格的输入框",
      code: `<div className="space-y-1.5">
  <label className="block text-sm font-medium text-slate-300">Email</label>
  <input
    type="email"
    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
    placeholder="you@example.com"
  />
</div>`,
    },
  },

  globalCss: `/* Dark Mode Global Styles */
@layer base {
  body {
    @apply bg-slate-900 text-slate-100 antialiased;
  }

  h1, h2, h3, h4 {
    @apply font-semibold text-slate-100;
  }

  ::selection {
    @apply bg-blue-600 text-white;
  }
}

/* Subtle glow for focus states */
.dark-focus-glow:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}`,

  aiRules: `STYLE: Dark Mode
TYPE: Professional dark interface design

MUST USE:
- Dark backgrounds: bg-slate-900, bg-gray-900, bg-[#0f172a]
- Card backgrounds: bg-slate-800 (one step lighter)
- Low contrast borders: border-slate-700, border-white/10
- Text hierarchy: text-slate-100 (primary), text-slate-400 (secondary)
- Saturated accent colors: blue-500, green-500
- Hover states: hover:bg-slate-700, hover:bg-white/5
- Standard rounded corners: rounded-lg, rounded-xl

MUST AVOID:
- Pure white text (too harsh)
- High contrast borders
- Pure black background (#000000)
- Dark text on dark backgrounds
- Too many highlight colors
- Light-colored shadows

COLOR HIERARCHY:
- Background: slate-900 (#0f172a)
- Surface: slate-800
- Border: slate-700 or white/10
- Text primary: slate-100
- Text secondary: slate-400
- Accent: blue-500, green-500

TYPOGRAPHY:
- Headings: font-semibold text-slate-100
- Body: text-slate-300 or text-slate-400`,

  examplePrompts: [
    {
      title: "开发者仪表板",
      titleEn: "Developer Dashboard",
      description: "生成暗色开发者仪表板",
      descriptionEn: "Generate dark mode developer dashboard",
      prompt: `Create a developer dashboard using Dark Mode style:
- Sidebar navigation with slate-800 background
- Main content on slate-900
- Metric cards with subtle borders
- Code blocks with syntax highlighting
- Status indicators with colored dots
- Blue accent for primary actions
- Comfortable contrast for long sessions`,
    },
  ],
};
