import { DesignStyle } from "./index";

export const darkMode: DesignStyle = {
  slug: "dark-mode",
  name: "暗黑模式",
  nameEn: "Dark Mode",
  description:
    "优雅的深色界面设计，低对比度层次、微妙的边框和高亮。适合开发工具、专业应用、深夜阅读模式。",
  cover: "/styles/dark-mode.svg",
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
    "卡片使用略浅的背景 bg-slate-800/50，hover 时提亮 hover:bg-slate-800",
    "边框使用低对比度 border-slate-700，hover 时照亮 hover:border-slate-500",
    "文字使用 text-slate-100 主要, text-slate-400 次要，group-hover 时次要文字提亮 group-hover:text-slate-300",
    "高亮色保持高饱和度 blue-500, green-500",
    "按钮使用内发光 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] 模拟暗色光源",
    "按钮必须有 active:scale-[0.98] 触觉按压确认",
    "所有可交互元素必须有 focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900",
    "卡片 hover 时 hover:-translate-y-0.5 + 深色外阴影上浮",
    "使用 rounded-lg 或 rounded-xl 圆角",
  ],

  dontList: [
    "禁止使用纯白文字 text-white（过于刺眼）",
    "禁止使用高对比度边框",
    "禁止使用纯黑背景 #000000（过于沉闷）",
    "禁止在深色背景上使用深色文字",
    "禁止高亮色使用过多",
    "禁止阴影使用浅色（深色背景上用浅色阴影无法体现层次）",
    "禁止按钮缺少 active:scale-[0.98]（按钮需要触觉确认，否则如同装饰）",
    "禁止 focus:ring 缺少 focus:ring-offset-slate-900（暗色背景上焦点环必须与元素分离才可见）",
  ],

  components: {
    button: {
      name: "按钮",
      description: "暗黑模式三态按钮：顶边内发光模拟光源，hover 时蓝光晕外溢，active:scale-[0.98] 触觉按压，focus:ring-offset-slate-900 确保暗底焦点环可见",
      code: `{/* Primary Button — inset glow physics */}
<button className="
  px-4 py-2
  bg-blue-600 text-white
  rounded-lg font-medium
  shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]
  hover:bg-blue-500
  hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_10px_rgba(59,130,246,0.3)]
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900
  active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]
  transition-all duration-200 ease-out
">
  Save Changes
</button>

{/* Secondary Button */}
<button className="
  px-4 py-2
  bg-slate-700 text-slate-200
  rounded-lg font-medium
  shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
  hover:bg-slate-600 hover:text-slate-100
  hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
  focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900
  active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]
  transition-all duration-200 ease-out
">
  Cancel
</button>

{/* Ghost Button */}
<button className="
  px-4 py-2
  text-slate-300
  rounded-lg font-medium
  hover:bg-white/5 hover:text-slate-100
  focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900
  active:scale-[0.98] active:bg-white/10
  transition-all duration-200 ease-out
">
  Learn More
</button>

{/* Danger Button */}
<button className="
  px-4 py-2
  bg-red-600/20 text-red-400
  border border-red-500/30
  rounded-lg font-medium
  hover:bg-red-600/30 hover:border-red-500/50 hover:text-red-300
  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900
  active:scale-[0.98]
  transition-all duration-200 ease-out
">
  Delete
</button>`,
    },
    card: {
      name: "卡片",
      description: "暗黑模式卡片：group-hover 时边框照亮、次要文字提亮，模拟光源靠近效果；hover:-translate-y-0.5 + 深色外阴影上浮",
      code: `<div className="
  group
  bg-slate-800/50 border border-slate-700
  rounded-xl p-6
  hover:bg-slate-800 hover:border-slate-500 hover:-translate-y-0.5
  hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]
  transition-all duration-300 ease-out
  cursor-pointer
">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center
      group-hover:bg-blue-600/30 transition-colors duration-200">
      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-slate-200 group-hover:text-white transition-colors duration-200">
      Feature Title
    </h3>
  </div>
  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-200">
    Description with comfortable contrast for night reading.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "暗黑模式输入框：聚焦时蓝色边框 + ring-offset-slate-900 确保焦点环可见",
      code: `<div className="space-y-1.5">
  <label className="block text-sm font-medium text-slate-300">Email</label>
  <input
    type="email"
    className="
      w-full px-3 py-2
      bg-slate-800 border border-slate-700
      rounded-lg text-slate-100
      placeholder:text-slate-500
      focus:outline-none focus:border-blue-500
      focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900
      transition-all duration-200
    "
    placeholder="you@example.com"
  />
</div>`,
    },
    nav: {
      name: "导航栏",
      description: "暗黑模式顶部导航，链接 hover 时提亮，CTA 按钮带内发光和触觉反馈",
      code: `<nav className="bg-slate-900 border-b border-slate-800 px-6 py-3">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    <span className="text-lg font-semibold text-slate-100">DevTools</span>
    <div className="flex items-center gap-6">
      <a href="#" className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors duration-200">Docs</a>
      <a href="#" className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors duration-200">API</a>
      <a href="#" className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors duration-200">Changelog</a>
    </div>
    <button className="
      px-4 py-2
      bg-blue-600 text-white text-sm
      rounded-lg font-medium
      shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]
      hover:bg-blue-500 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_10px_rgba(59,130,246,0.3)]
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900
      active:scale-[0.98]
      transition-all duration-200 ease-out
    ">
      Sign in
    </button>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区块",
      description: "暗黑模式 Hero：深色渐变背景，蓝色高亮强调字，双按钮 CTA 带完整三态交互",
      code: `<section className="bg-gradient-to-b from-slate-900 to-[#0f172a] py-24 px-4">
  <div className="max-w-4xl mx-auto text-center">
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 text-blue-400 rounded-full text-sm font-medium mb-6 border border-blue-500/20">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
      Now in beta
    </div>
    <h1 className="text-4xl md:text-6xl font-bold text-slate-100 tracking-tight mb-6 leading-tight">
      Built for developers<br />
      <span className="text-blue-400">who ship at night.</span>
    </h1>
    <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
      A professional toolkit optimized for low-light environments and extended coding sessions.
    </p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
      <button className="
        px-6 py-3
        bg-blue-600 text-white
        rounded-lg font-medium
        shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]
        hover:bg-blue-500 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_15px_rgba(59,130,246,0.4)]
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900
        active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]
        transition-all duration-200 ease-out
      ">
        Get started free
      </button>
      <button className="
        px-6 py-3
        bg-slate-800 text-slate-200
        border border-slate-700
        rounded-lg font-medium
        hover:bg-slate-700 hover:border-slate-600 hover:text-slate-100
        focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900
        active:scale-[0.98]
        transition-all duration-200 ease-out
      ">
        View demo
      </button>
    </div>
  </div>
</section>`,
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
- Card backgrounds: bg-slate-800/50 (semi-transparent) at rest, bg-slate-800 on hover
- Low contrast borders: border-slate-700 at rest, border-slate-500 on hover (border illumination)
- Text hierarchy: text-slate-100 (primary), text-slate-400 (secondary); secondary brightens to group-hover:text-slate-300
- Saturated accent colors: blue-500, green-500
- Inset top-edge glow on buttons: shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]
- Hover states: hover:bg-slate-800, hover:bg-white/5
- Standard rounded corners: rounded-lg, rounded-xl

MUST AVOID:
- Pure white text (too harsh)
- High contrast borders
- Pure black background (#000000)
- Dark text on dark backgrounds
- Too many highlight colors
- Light-colored shadows (light shadows invisible on dark backgrounds)
- Buttons without active:scale-[0.98] (no tactile confirmation)
- focus:ring without focus:ring-offset-slate-900 (ring invisible on dark background)

COLOR HIERARCHY:
- Background: slate-900 (#0f172a)
- Surface: slate-800/50 → slate-800 on hover
- Border: slate-700 → slate-500 on hover
- Text primary: slate-100 → white on group-hover
- Text secondary: slate-400 → slate-300 on group-hover
- Accent: blue-500, green-500

TYPOGRAPHY:
- Headings: font-semibold text-slate-100
- Body: text-slate-300 or text-slate-400

## Animation & Interaction Rules

- Illumination Physics: On hover, borders brighten from slate-700 to slate-500 (hover:border-slate-500). This simulates a nearby light source illuminating the card's edge — NOT a background change. Combined with hover:bg-slate-800 (surface rises slightly), the effect is of a surface catching light.
- Text Light-Up: Secondary text (text-slate-400) transitions to group-hover:text-slate-300. Title text (text-slate-200) to group-hover:text-white. Use transition-colors duration-200. The card must use the group class.
- Inset Glow Button: Primary buttons use shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] at rest (top edge highlight simulating overhead light). On hover: shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_10px_rgba(59,130,246,0.3)] — glow intensifies and bleeds outward. On active: shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] — inset depression shadow simulates the button being physically pressed down.
- Tactile Confirmation: ALL buttons must use active:scale-[0.98]. The 2% scale reduction is the minimum signal that a press occurred. Without it, a dark button feels completely unresponsive.
- Focus Ring Visibility: ALWAYS pair focus:ring-2 with focus:ring-offset-2 focus:ring-offset-slate-900. Without ring-offset-slate-900, the ring merges with the dark background and becomes invisible — violating WCAG 2.1 AA.
- Card Elevation: hover:-translate-y-0.5 + hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] — the deep dark shadow reinforces the dark environment. Never use light-colored shadows on dark backgrounds.
- Easing: duration-200 ease-out for buttons and interactive controls. duration-300 ease-out for card-level transitions. Never exceed duration-300.

## Self-Check

After generating code, verify:
1. All buttons have active:scale-[0.98]
2. All focusable elements have focus:ring-2 focus:ring-{color}-500 focus:ring-offset-2 focus:ring-offset-slate-900
3. Cards use group class; text uses group-hover:text-* for light-up
4. Card hover: border brightens (hover:border-slate-500) + bg lightens (hover:bg-slate-800) + hover:-translate-y-0.5
5. Button shadows use inset for glow, deep dark for elevation
6. No light-colored shadows anywhere`,

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
