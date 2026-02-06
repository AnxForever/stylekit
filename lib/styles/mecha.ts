import { DesignStyle } from "./index";

export const mecha: DesignStyle = {
  slug: "mecha",
  name: "机甲风",
  nameEn: "Mecha",
  description:
    "灵感源自高达/EVA等机甲动画的设计风格，科技面板、警告标识、机械质感，军绿和深蓝底色搭配警告黄和危险红，充满工业力量感。",
  cover: "/styles/mecha.svg",
  styleType: "visual",
  tags: ["expressive", "modern", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#1a2744",
    secondary: "#4a5c3a",
    accent: ["#fbbf24", "#ef4444"],
  },
  keywords: ["机甲", "高达", "EVA", "科技面板", "警告", "工业", "军事"],

  philosophy: `Mecha（机甲风）是源自日本机甲动画（高达、EVA等）的设计美学，融合军事工业风和科幻面板界面。

核心理念：
- 装甲面板：模拟机甲外壳的分块面板设计
- 警告系统：黄色警告和红色危险的信号系统
- 军事工业：军绿、深蓝海军色的工业配色
- 技术标注：等宽字体的技术参数和编号标识`,

  doList: [
    "使用军绿、深蓝海军色为底色",
    "添加警告黄和危险红的强调色",
    "使用等宽字体和大写字母",
    "设计直角无圆角的面板元素",
    "添加技术标注和编号装饰",
    "使用硬边阴影和边框线条",
  ],

  dontList: [
    "禁止使用柔和的圆角设计",
    "禁止使用柔和的粉色或浅色调",
    "禁止使用花哨的渐变或毛玻璃效果",
    "禁止使用手写体或花体字",
  ],

  components: {
    button: {
      name: "按钮",
      description: "机甲风格按钮",
      code: `<button className="
  px-6 py-3
  bg-[#fbbf24] text-[#1a2744]
  font-mono font-bold uppercase tracking-widest
  rounded-none
  border-2 border-[#1a2744]
  shadow-[4px_4px_0px_#1a2744]
  hover:translate-x-[2px] hover:translate-y-[2px]
  hover:shadow-[2px_2px_0px_#1a2744]
  transition-all duration-200
">
  LAUNCH
</button>`,
    },
    card: {
      name: "卡片",
      description: "机甲风格卡片",
      code: `<div className="
  p-8
  bg-[#1a2744]
  rounded-none
  border-2 border-[#4a5c3a]
  shadow-[4px_4px_0px_rgba(251,191,36,0.3)]
">
  <div className="flex items-center gap-2 mb-3">
    <div className="w-3 h-3 bg-[#fbbf24]"></div>
    <span className="text-xs font-mono text-[#4a5c3a] uppercase tracking-widest">UNIT-01</span>
  </div>
  <h3 className="text-xl font-mono font-bold text-[#fbbf24] uppercase mb-2">
    ARMOR PANEL
  </h3>
  <p className="text-[#4a5c3a]/80 font-mono text-sm">
    Status: Operational
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "机甲风格输入框",
      code: `<input
  type="text"
  placeholder="ENTER COMMAND..."
  className="
    w-full px-4 py-3
    bg-[#1a2744]/80
    border-2 border-[#4a5c3a]
    rounded-none
    text-[#fbbf24] placeholder-[#4a5c3a]/60
    font-mono
    focus:border-[#fbbf24]
    focus:shadow-[0_0_8px_rgba(251,191,36,0.4)]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "机甲风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#1a2744]
  relative overflow-hidden
">
  {/* Grid lines */}
  <div className="absolute inset-0 bg-[linear-gradient(rgba(74,92,58,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(74,92,58,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />

  {/* Warning stripes */}
  <div className="absolute top-0 left-0 right-0 h-2 bg-repeating-linear-gradient(90deg,#fbbf24,#fbbf24_20px,#1a2744_20px,#1a2744_40px)" />

  <div className="relative z-10 text-center px-6">
    <div className="text-xs font-mono text-[#4a5c3a] uppercase tracking-[0.3em] mb-4">
      // SYSTEM ONLINE
    </div>
    <h1 className="text-6xl md:text-8xl font-mono font-bold text-[#fbbf24] uppercase mb-4">
      MECHA
    </h1>
    <p className="text-lg text-[#4a5c3a] font-mono uppercase tracking-wider mb-8">
      ARMOR CLASS // OPERATIONAL
    </p>
    <button className="
      px-10 py-4
      bg-[#ef4444] text-white
      font-mono font-bold uppercase tracking-widest
      rounded-none border-2 border-[#ef4444]
      shadow-[4px_4px_0px_#fbbf24]
      hover:translate-x-[2px] hover:translate-y-[2px]
      hover:shadow-[2px_2px_0px_#fbbf24]
      transition-all
    ">
      DEPLOY
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Mecha Global Styles */

:root {
  --mecha-navy: #1a2744;
  --mecha-green: #4a5c3a;
  --mecha-yellow: #fbbf24;
  --mecha-red: #ef4444;
}

/* Tech grid background */
.mecha-grid {
  background-image:
    linear-gradient(rgba(74, 92, 58, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(74, 92, 58, 0.15) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Warning stripe pattern */
.mecha-warning {
  background: repeating-linear-gradient(
    -45deg,
    var(--mecha-yellow),
    var(--mecha-yellow) 10px,
    var(--mecha-navy) 10px,
    var(--mecha-navy) 20px
  );
}

/* Panel border */
.mecha-panel {
  border: 2px solid var(--mecha-green);
  background: var(--mecha-navy);
  position: relative;
}
.mecha-panel::before {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  right: -4px;
  bottom: -4px;
  border: 1px solid rgba(251, 191, 36, 0.2);
  pointer-events: none;
}

/* Status indicator */
.mecha-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--mecha-green);
}
.mecha-status::before {
  content: "";
  width: 8px;
  height: 8px;
  background: var(--mecha-yellow);
}`,

  aiRules: `You are a Mecha design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Soft rounded corners (use rounded-none)
- Pastel or soft colors
- Glassmorphism or blur effects
- Handwritten or decorative fonts

## Must Follow

- Dark base colors: navy #1a2744, military green #4a5c3a
- Warning accents: yellow #fbbf24, red #ef4444
- Monospace fonts font-mono with uppercase tracking-widest
- No border radius rounded-none
- Hard-edge shadows shadow-[4px_4px_0px_color]
- Border-2 for panel edges

## Color Palette

Primary:
- Navy: #1a2744
- Military Green: #4a5c3a
- Warning Yellow: #fbbf24
- Danger Red: #ef4444

## Special Elements

- Tech grid backgrounds
- Warning stripe patterns
- Status indicators with square dots
- Technical annotations and unit numbers
- Panel borders with offset outlines`,

  examplePrompts: [
    {
      title: "机甲控制台",
      titleEn: "Mecha Control Panel",
      description: "机甲风格的控制面板界面",
      descriptionEn: "Mecha-style control panel interface",
      prompt: `Use Mecha style to create a control panel interface:
1. Background: dark navy with tech grid lines
2. Title: mono font in warning yellow
3. Cards: angular panels with green borders
4. Warning stripes and status indicators
5. Overall military-industrial mecha aesthetic`,
    },
  ],
};
