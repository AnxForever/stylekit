import { DesignStyle } from "./index";

export const jrpg: DesignStyle = {
  slug: "jrpg",
  name: "日式RPG",
  nameEn: "JRPG",
  description:
    "经典日式 RPG 菜单与对话框美学，斜面边框、渐变背景、状态栏、华丽框架。适合游戏界面、互动叙事、奇幻风格产品。",
  cover: "/styles/jrpg.svg",
  styleType: "visual",
  tags: ["expressive", "retro"],
  category: "expressive",
  colors: {
    primary: "#1e40af",
    secondary: "#0f172a",
    accent: ["#fbbf24", "#f0f9ff", "#22c55e"],
  },
  keywords: ["RPG", "菜单", "属性", "道具栏", "奇幻", "对话框", "血条", "经验值"],

  philosophy: `JRPG 风格源自经典日式角色扮演游戏的菜单与 UI 设计，通过斜面边框、渐变背景和精致框架重现复古游戏体验。

核心理念：
- 斜面边框：使用内外阴影和渐变模拟立体按钮与面板
- 深色基底：深海军蓝背景搭配金色与水晶白高光
- 状态可视化：HP/MP/EXP 条形图直观展示数值
- 华丽装饰：边角纹饰和框架增强奇幻世界感`,

  doList: [
    "背景使用深海军蓝 bg-[#0f172a] 或 bg-slate-900",
    "使用 border-2 border-[#1e40af] 搭配内阴影模拟斜面效果",
    "金色高亮文字 text-[#fbbf24] 用于标题和重要信息",
    "使用渐变背景 bg-gradient-to-b from-blue-900 to-slate-900",
    "状态栏使用 bg-[#22c55e] 表示 HP，bg-blue-500 表示 MP",
    "卡片面板使用双层边框 ring-1 ring-blue-400/20 border-2 border-blue-800",
    "按钮使用内阴影 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] 模拟凸起",
  ],

  dontList: [
    "禁止使用极简扁平风格（无边框、无阴影）",
    "禁止使用白色或浅色背景",
    "禁止仅使用现代无衬线字体（需搭配衬线或像素字体）",
    "禁止使用圆角过大 rounded-full 的按钮",
    "禁止使用透明/无底色的面板",
    "禁止使用低对比度配色",
  ],

  components: {
    button: {
      name: "按钮",
      description: "RPG 风格的菜单按钮，斜面立体效果",
      code: `// RPG Primary Button
<button className="px-6 py-3 bg-gradient-to-b from-blue-700 to-blue-900 border-2 border-blue-500 rounded-md text-[#f0f9ff] font-bold tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_4px_rgba(0,0,0,0.5)] hover:from-blue-600 hover:to-blue-800 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-200">
  Attack
</button>

// RPG Gold Button
<button className="px-6 py-3 bg-gradient-to-b from-yellow-500 to-yellow-700 border-2 border-yellow-400 rounded-md text-slate-900 font-bold tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.5)] hover:from-yellow-400 hover:to-yellow-600 transition-all duration-200">
  Confirm
</button>

// RPG Outline Button
<button className="px-6 py-3 bg-slate-900/80 border-2 border-blue-400/60 rounded-md text-blue-300 font-bold tracking-wide shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:border-blue-300 hover:text-blue-200 hover:bg-slate-800/80 transition-all duration-200">
  Cancel
</button>`,
    },
    card: {
      name: "卡片",
      description: "RPG 菜单面板，双层边框装饰",
      code: `<div className="bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-blue-700 rounded-md p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)] ring-1 ring-blue-400/20 relative">
  {/* Corner decoration */}
  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#fbbf24] rounded-tl-sm" />
  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#fbbf24] rounded-tr-sm" />
  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#fbbf24] rounded-bl-sm" />
  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#fbbf24] rounded-br-sm" />

  <div className="relative">
    <div className="flex items-center gap-2 mb-4 border-b border-blue-700/50 pb-3">
      <h3 className="text-[#fbbf24] font-bold tracking-wide text-sm uppercase">Character Status</h3>
    </div>
    <div className="space-y-3">
      <div className="flex justify-between text-[#f0f9ff] text-sm">
        <span>HP</span>
        <span>234 / 500</span>
      </div>
      <div className="w-full h-3 bg-slate-950 rounded-sm border border-slate-600 overflow-hidden">
        <div className="h-full w-[47%] bg-gradient-to-r from-green-500 to-green-400 rounded-sm shadow-[0_0_6px_rgba(34,197,94,0.4)]" />
      </div>
    </div>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "RPG 风格的输入框，菜单选择样式",
      code: `<div className="space-y-2">
  <label className="block text-[#fbbf24] font-bold text-xs uppercase tracking-wider">Player Name</label>
  <div className="relative">
    <input
      type="text"
      className="w-full px-4 py-3 bg-slate-900 border-2 border-blue-700 rounded-md text-[#f0f9ff] placeholder:text-blue-300/30 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-all duration-200"
      placeholder="Enter your name..."
    />
    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#fbbf24] text-xs">|</div>
  </div>
</div>`,
    },
  },

  globalCss: `/* JRPG Global Styles */
@layer base {
  body {
    @apply bg-[#0f172a] text-[#f0f9ff] antialiased;
  }

  h1, h2, h3 {
    color: #fbbf24;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  ::selection {
    @apply bg-blue-700 text-white;
  }
}

@keyframes hp-pulse {
  0%, 100% { box-shadow: 0 0 4px rgba(34, 197, 94, 0.3); }
  50% { box-shadow: 0 0 8px rgba(34, 197, 94, 0.6); }
}`,

  aiRules: `STYLE: JRPG
TYPE: Classic Japanese RPG menu interface

MUST USE:
- Dark background: bg-[#0f172a] or bg-slate-900
- Beveled borders: border-2 with inset shadows
- Gold accent text: text-[#fbbf24]
- Crystal white text: text-[#f0f9ff]
- Gradient panels: bg-gradient-to-b from-slate-800 to-slate-900
- HP/MP bars with colored gradients
- Corner decorations on panels
- Shadow depth: shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]

MUST AVOID:
- White/light backgrounds
- Flat minimal design without borders
- Modern sans-serif only typography
- rounded-full buttons
- Transparent/borderless panels
- Low contrast color combinations

COLOR RULES:
- Primary: Royal Blue (#1e40af)
- Accent: Gold (#fbbf24)
- Background: Dark Navy (#0f172a)
- Text: Crystal White (#f0f9ff)
- HP: Green (#22c55e)
- MP: Blue (#3b82f6)
- Borders: Blue shades with glow

SPECIAL EFFECTS:
- Inset shadows for beveled/raised look
- Corner ornaments on panels
- Gradient overlays for depth
- Stat bar animations`,

  examplePrompts: [
    {
      title: "角色状态界面",
      titleEn: "Character Status Screen",
      description: "生成 RPG 风格角色属性面板",
      descriptionEn: "Generate RPG character status panel",
      prompt: `Create a character status screen using JRPG style:
- Dark navy background with gradient
- Character info panel with gold title and corner decorations
- HP/MP/EXP stat bars with colored gradients
- Equipment slots with beveled borders
- Action buttons with inset shadow depth
- Stats grid showing STR, DEF, INT, SPD values`,
    },
  ],
};
