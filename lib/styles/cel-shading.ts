import type { DesignStyle } from "./types";

export const celShading: DesignStyle = {
  slug: "cel-shading",
  name: "赛璐璐动画风",
  nameEn: "Cel Shading",
  description:
    "模拟传统动画赛璐璃片的渲染风格，粗黑轮廓线、平面色块填充、无渐变阴影和鲜艳饱和色彩，充满卡通游戏的活力感。",
  descriptionEn:
    "A rendering style inspired by traditional cel animation, featuring bold black outlines, flat color fills, hard shadows without gradients, and vivid saturated colors full of cartoon and game energy.",
  cover: "/styles/cel-shading.jpg",
  styleType: "visual",
  tags: ["high-contrast"],
  category: "expressive",
  colors: {
    primary: "#1a1a2e",
    secondary: "#fafaf5",
    accent: ["#e63946", "#4ea8de", "#2ecc71", "#f1c40f"],
  },
  keywords: ["赛璐璐", "卡通", "轮廓线", "平面阴影", "动画", "游戏", "toon", "bold", "expressive", "vibrant"],

  philosophy: `赛璐璐动画风（Cel Shading / Toon Shading）模拟传统手绘动画的视觉效果。

核心理念：
- 粗黑轮廓：所有元素都有明确的3px黑色边框
- 平面色块：使用纯色填充，无渐变
- 硬阴影：阴影是实体位移，不是模糊
- 高饱和度：色彩鲜艳、对比强烈
- 游戏化 UI：按钮、卡片像游戏菜单一样生动有趣
- 动画抽帧感：交互极短促，模拟关键帧而非丝滑过渡

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Cel Shading (Toon Shading) simulates the visual effect of traditional hand-drawn animation.

Core principles:
- Bold black outlines: all elements have distinct 3px black borders
- Flat color fills: using solid colors with no gradients
- Hard shadows: shadows are solid offsets, not blurred
- High saturation: vivid colors with strong contrast
- Game-like UI: buttons and cards feel lively like game menus
- Frame-skipping feel: interactions are extremely brief, simulating keyframes rather than smooth transitions`,

  doList: [
    "所有元素使用3px粗黑边框 border-[3px] border-[#1a1a2e]",
    "硬阴影效果 shadow-[3px_3px_0_#1a1a2e]",
    "使用纯色填充，不使用渐变 bg-[#e63946]",
    "字体加粗 font-black uppercase",
    "点击交互：阴影缩小+位移 hover:translate-x-0.5",
    "高饱和度配色：红、蓝、绿、黄",
    "使用极短 duration-75，模拟动画抽帧感",
    "active 时 scale-x-110 scale-y-90 Squash & Stretch",
    "hover 时白色高光斜条纹扫过按钮",
  ],

  doListEn: [
    "Use 3px bold black borders on all elements border-[3px] border-[#1a1a2e]",
    "Hard shadow effect shadow-[3px_3px_0_#1a1a2e]",
    "Use solid color fills, no gradients bg-[#e63946]",
    "Bold fonts font-black uppercase",
    "Click interaction: shadow shrinks + offset hover:translate-x-0.5",
    "High-saturation palette: red, blue, green, yellow",
    "Use extremely short duration-75 to simulate animation frame-skipping",
    "On active, apply scale-x-110 scale-y-90 for Squash & Stretch",
    "On hover, a white highlight diagonal stripe sweeps across the button",
  ],

  dontList: [
    "禁止使用渐变色（保持平面色块）",
    "禁止使用模糊阴影 shadow-lg",
    "禁止使用细边框 border",
    "禁止使用低饱和度或灰色调",
    "禁止使用丝滑的 duration-300 以上过渡（太柔和）",
    "禁止使用 ease-in-out（卡通物理用 linear 或 ease-in）",
  ],

  dontListEn: [
    "Do not use gradient colors (maintain flat color fills)",
    "Do not use blurred shadows shadow-lg",
    "Do not use thin borders border",
    "Do not use low-saturation or grayish tones",
    "Do not use smooth transitions above duration-300 (too soft)",
    "Do not use ease-in-out (cartoon physics uses linear or ease-in)",
  ],

  components: {
    button: {
      name: "按钮",
      description: "赛璐璐按钮，抽帧感 + Squash & Stretch + 高光扫过",
      code: `<button className="
  group relative px-6 py-3
  bg-[#e63946] text-white
  font-black uppercase text-sm
  border-[3px] border-[#1a1a2e]
  shadow-[4px_4px_0_#1a1a2e]
  hover:bg-[#ff4d5a]
  hover:-translate-y-1
  hover:shadow-[6px_6px_0_#1a1a2e]
  active:scale-x-110 active:scale-y-90
  active:translate-x-1 active:translate-y-2
  active:shadow-none
  transition-all duration-75
  overflow-hidden
">
  <div className="absolute inset-0 w-8 bg-white/30 -skew-x-12 -translate-x-12 group-hover:translate-x-[200%] transition-transform duration-300 ease-linear" />
  <span className="relative z-10 block group-active:translate-y-0.5 transition-transform duration-75">Attack!</span>
</button>`,
    },
    card: {
      name: "卡片",
      description: "赛璐璐风卡片，悬停时阴影扩大",
      code: `<div className="
  p-6 bg-white
  border-[3px] border-[#1a1a2e]
  shadow-[4px_4px_0_#1a1a2e]
  hover:shadow-[6px_6px_0_#1a1a2e]
  hover:-translate-x-0.5 hover:-translate-y-0.5
  transition-all duration-75
">
  <h3 className="text-xl font-black text-[#1a1a2e] uppercase mb-2">Title</h3>
  <p className="font-bold text-[#1a1a2e]/60">Content</p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "赛璐璐风输入框，粗边框，聚焦时原色切换",
      code: `<input
  type="text"
  placeholder="Enter..."
  className="
    w-full px-4 py-2.5
    bg-[#fafaf5]
    border-[3px] border-[#1a1a2e]
    text-[#1a1a2e] font-bold
    placeholder-[#1a1a2e]/30
    focus:outline-none focus:border-[#e63946]
    focus:shadow-[3px_3px_0_#e63946]
    transition-all duration-75
  "
/>`,
    },
    nav: {
      name: "导航栏",
      description: "赛璐璐风导航，链接 hover 有打击感",
      code: `<nav className="
  px-6 py-4
  bg-[#fafaf5]
  border-b-[3px] border-[#1a1a2e]
">
  <div className="max-w-4xl mx-auto flex items-center justify-between">
    <span className="text-xl font-black uppercase text-[#1a1a2e] tracking-wider">TOON UI</span>
    <div className="flex gap-6">
      <a href="#" className="font-black uppercase text-sm text-[#1a1a2e] hover:text-[#e63946] hover:-translate-y-0.5 transition-all duration-75">Play</a>
      <a href="#" className="font-black uppercase text-sm text-[#1a1a2e] hover:text-[#4ea8de] hover:-translate-y-0.5 transition-all duration-75">About</a>
      <a href="#" className="font-black uppercase text-sm text-[#1a1a2e] hover:text-[#2ecc71] hover:-translate-y-0.5 transition-all duration-75">Shop</a>
    </div>
  </div>
</nav>`,
    },
  },

  examplePrompts: [
    {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 赛璐璐动画风风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Cel Shading style",
      prompt: `Create a SaaS landing page using Cel Shading style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 赛璐璐动画风风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Cel Shading style",
      prompt: `Create a portfolio showcase page using Cel Shading style with project grid, about section, contact form, and consistent visual language.`,
    },
  ],

  globalCss: `/* Cel Shading */
:root {
  --cel-bg: #fafaf5;
  --cel-ink: #1a1a2e;
  --cel-red: #e63946;
  --cel-blue: #4ea8de;
  --cel-green: #2ecc71;
  --cel-yellow: #f1c40f;
  --cel-purple: #9b59b6;
}

/* 高光扫过动画 */
.cel-shine {
  position: relative;
  overflow: hidden;
}

.cel-shine::after {
  content: '';
  position: absolute;
  top: 0;
  left: -2rem;
  width: 2rem;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  transform: skewX(-12deg);
  transition: transform 0.3s linear;
}

.cel-shine:hover::after {
  transform: skewX(-12deg) translateX(400%);
}

/* 硬击动画 */
.cel-impact:active {
  transform: scaleX(1.1) scaleY(0.9) translate(2px, 4px);
  box-shadow: none !important;
  transition-duration: 75ms;
}
@keyframes cel-shading-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes cel-shading-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.cel-shading-gradient {
  background: linear-gradient(135deg, #1a1a2e, #e63946);
}

.cel-shading-gradient-text {
  background: linear-gradient(135deg, #1a1a2e, #e63946);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cel-shading-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(26, 26, 46, 0.08);
}

.cel-shading-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.cel-shading-animate-in {
  animation: cel-shading-fade-in 0.5s ease-out both;
}`,

  aiRules: `You are designing in Cel Shading (Toon Shading) style.
- All elements MUST have 3px solid black borders: border-[3px] border-[#1a1a2e]
- Use hard offset shadows ONLY: shadow-[3px_3px_0_#1a1a2e] or shadow-[4px_4px_0_#1a1a2e]
- NO gradients, NO blur shadows, NO soft edges
- Flat saturated colors: #e63946, #4ea8de, #2ecc71, #f1c40f
- Text is always bold/black weight and uppercase
- Light background #fafaf5 with dark ink outlines
- Think "video game menu" or "cartoon UI"

## Animation & Interaction Rules

- Anime Physics: Use extremely short transitions (duration-75) to simulate 2D animation keyframes. Avoid silky smooth easing.
- Squash & Stretch: On :active, use cartoon physics — active:scale-x-110 active:scale-y-90 — combined with translate toward click direction.
- Zero-Blur Impact: On :active, hard shadow (shadow-[4px_4px_0_#1a1a2e]) must instantly snap to zero (active:shadow-none), creating a strong physical "hit" sensation.
- Toon Highlight: On hover, a white diagonal stripe (bg-white/30 -skew-x-12) sweeps across the button via translate-x from off-screen to [200%], simulating cel shading's hard specular highlight.
- Hover Lift: Elements can hover:-translate-y-1 with expanded shadow to "charge up" before clicking.`,

  aiRulesEn: `You are designing in Cel Shading (Toon Shading) style.
- All elements MUST have 3px solid black borders: border-[3px] border-[#1a1a2e]
- Use hard offset shadows ONLY: shadow-[3px_3px_0_#1a1a2e] or shadow-[4px_4px_0_#1a1a2e]
- NO gradients, NO blur shadows, NO soft edges
- Flat saturated colors: #e63946, #4ea8de, #2ecc71, #f1c40f
- Text is always bold/black weight and uppercase
- Light background #fafaf5 with dark ink outlines
- Think "video game menu" or "cartoon UI"

Animation & Interaction Rules:
- Anime Physics: Use extremely short transitions (duration-75) to simulate 2D animation keyframes. Avoid silky smooth easing.
- Squash & Stretch: On :active, use cartoon physics -- active:scale-x-110 active:scale-y-90 -- combined with translate toward click direction.
- Zero-Blur Impact: On :active, hard shadow must instantly snap to zero (active:shadow-none), creating a strong physical "hit" sensation.
- Toon Highlight: On hover, a white diagonal stripe (bg-white/30 -skew-x-12) sweeps across the button via translate-x from off-screen to [200%], simulating cel shading's hard specular highlight.
- Hover Lift: Elements can hover:-translate-y-1 with expanded shadow to "charge up" before clicking.`,

  variants: [
    {
      id: "cel-shading-warm",
      name: "赛璐璐动画风暖色版",
      nameEn: "Cel Shading Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#23172c",
        secondary: "#fbfbf6",
        accent: ["#c74906", "#7b98fa", "#24c8b3", "#92e00f"],
      },
    },
    {
      id: "cel-shading-cool",
      name: "赛璐璐动画风冷色版",
      nameEn: "Cel Shading Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#111d2b",
        secondary: "#e1e1dd",
        accent: ["#e0348d", "#35b4af", "#57c53d", "#ffa73f"],
      },
    },
  ],
};
