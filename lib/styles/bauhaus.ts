import type { DesignStyle } from "./types";
import { bauhausAtoms } from "./atoms";

export const bauhaus: DesignStyle = {
  atoms: bauhausAtoms,
  slug: "bauhaus",
  name: "包豪斯风格",
  nameEn: "Bauhaus",
  description:
    "德国包豪斯学派的设计理念，强调功能主义、几何形式和原色运用，形式追随功能的现代主义经典。",
  descriptionEn:
    "The design philosophy of the German Bauhaus school, emphasizing functionalism, geometric forms, and primary color usage -- a modernist classic where form follows function.",
  cover: "/styles/bauhaus.svg",
  styleType: "visual",
  tags: ["high-contrast"],
  category: "modern",
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    accent: ["#ff0000", "#ffcc00", "#0000ff", "#6c3b00"],
  },
  keywords: ["包豪斯", "功能主义", "几何", "原色", "现代主义", "极简", "modern", "contemporary", "sleek", "现代"],

  philosophy: `Bauhaus（包豪斯）是1919年在德国创立的设计学派，其核心理念"形式追随功能"深刻影响了现代设计。

核心理念：
- 功能主义：设计服务于功能，去除多余装饰
- 几何形式：圆形、方形、三角形的纯粹运用
- 原色运用：红、黄、蓝三原色 + 黑白
- 统一性：艺术与工艺的结合
- 机械精密：交互如精密仪器运转，短促有力

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Bauhaus is a design school founded in Germany in 1919, whose core principle "form follows function" profoundly influenced modern design.

Core principles:
- Functionalism: Design serves function, removing excess decoration
- Geometric forms: Pure use of circles, squares, and triangles
- Primary colors: Red, yellow, blue primaries + black and white
- Unity: The combination of art and craft
- Mechanical precision: Interactions operate like precision instruments, short and powerful`,

  doList: [
    "使用原色（红、黄、蓝）+ 黑白",
    "运用基础几何形状（圆、方、三角）",
    "保持简洁的功能性设计",
    "使用无衬线字体",
    "强调网格和对齐",
    "去除不必要的装饰",
    "使用极短的 duration-150 或 duration-200",
    "色彩交互为原色之间的硬切换，不用透明度渐变",
    "利用伪元素做几何色块的滑入/覆盖动画",
    "几何装饰元素在悬停时 scale 或 rotate",
  ],

  doListEn: [
    "Use primary colors (red, yellow, blue) + black and white",
    "Apply basic geometric shapes (circle, square, triangle)",
    "Maintain clean functional design",
    "Use sans-serif fonts",
    "Emphasize grid and alignment",
    "Remove unnecessary decoration",
    "Use very short duration-150 or duration-200",
    "Color interactions are hard switches between primaries, no opacity gradients",
    "Use pseudo-elements for geometric color block slide-in/overlay animations",
    "Geometric decorative elements scale or rotate on hover",
  ],

  dontList: [
    "禁止使用复杂的渐变",
    "禁止使用装饰性元素",
    "禁止使用衬线字体",
    "禁止使用非原色的复杂配色",
    "禁止使用柔和缓慢的 duration-500 以上过渡",
    "禁止使用 ease-in-out（使用 ease-out）",
    "禁止使用圆角（rounded-lg 等），仅允许 rounded-full 用于圆形",
  ],

  dontListEn: [
    "Do NOT use complex gradients",
    "Do NOT use decorative elements",
    "Do NOT use serif fonts",
    "Do NOT use complex non-primary color schemes",
    "Do NOT use soft slow duration-500+ transitions",
    "Do NOT use ease-in-out (use ease-out)",
    "Do NOT use border radii (rounded-lg etc.), only rounded-full for circles",
  ],

  components: {
    button: {
      name: "按钮",
      description: "包豪斯按钮，色块滑轨机制覆盖",
      code: `<button className="
  group relative px-8 py-4
  bg-red-600 text-white
  font-bold uppercase tracking-wider
  border-4 border-black
  overflow-hidden
  hover:text-black
  active:translate-y-1
  transition-all duration-150
">
  <span className="relative z-10">Action</span>
  <div className="absolute inset-0 bg-yellow-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out" />
</button>`,
    },
    card: {
      name: "卡片",
      description: "包豪斯卡片，几何装饰元素可动",
      code: `<div className="
  group relative p-8
  bg-white
  border-4 border-black
  hover:-translate-y-2
  hover:shadow-[8px_8px_0px_rgba(0,0,255,1)]
  transition-all duration-200 ease-out
">
  <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-400 rounded-full border-4 border-black group-hover:scale-125 transition-transform duration-200" />
  <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-blue-600 border-4 border-black group-hover:rotate-45 transition-transform duration-200" />
  <h3 className="text-2xl font-black text-black uppercase tracking-wider mb-4 group-hover:text-red-600 transition-colors duration-150">
    Form
  </h3>
  <p className="text-black font-bold">
    Follows function
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "包豪斯风格输入框，聚焦时原色切换",
      code: `<input
  type="text"
  placeholder="Type here"
  className="
    w-full px-6 py-4
    bg-white
    border-4 border-black
    text-black font-medium placeholder-gray-400
    focus:border-red-600
    focus:outline-none
    transition-colors duration-150
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "包豪斯 Hero，几何形状组合",
      code: `<section className="
  min-h-screen
  flex items-center
  bg-white
  relative overflow-hidden
">
  <div className="absolute top-20 right-20 w-48 h-48 bg-yellow-400 rounded-full hover:scale-110 transition-transform duration-200" />
  <div className="absolute bottom-20 right-40 w-32 h-32 bg-blue-600 hover:rotate-12 transition-transform duration-200" />
  <div className="absolute top-40 right-60 w-0 h-0 border-l-[60px] border-l-transparent border-b-[100px] border-b-red-600 border-r-[60px] border-r-transparent" />

  <div className="relative z-10 px-12 max-w-2xl">
    <h1 className="text-7xl md:text-9xl font-black text-black uppercase leading-none mb-8">
      BAU
      <br />
      HAUS
    </h1>
    <p className="text-xl text-gray-700 mb-8 max-w-md">
      Form follows function. Less is more.
    </p>
    <button className="
      group relative px-10 py-4
      bg-black text-white
      font-bold uppercase tracking-wider
      overflow-hidden
      hover:text-black
      transition-colors duration-150
    ">
      <span className="relative z-10">Explore</span>
      <div className="absolute inset-0 bg-red-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out" />
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Bauhaus 全局样式 */

:root {
  --bauhaus-red: #ff0000;
  --bauhaus-yellow: #ffcc00;
  --bauhaus-blue: #0000ff;
  --bauhaus-black: #000000;
  --bauhaus-white: #ffffff;
}

/* 原色类 */
.bauhaus-red { background-color: var(--bauhaus-red); }
.bauhaus-yellow { background-color: var(--bauhaus-yellow); }
.bauhaus-blue { background-color: var(--bauhaus-blue); }

/* 几何形状 */
.bauhaus-circle {
  border-radius: 50%;
}

.bauhaus-triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 86px solid var(--bauhaus-red);
}

/* 色块滑轨覆盖 */
.bauhaus-slide-reveal {
  position: relative;
  overflow: hidden;
}

.bauhaus-slide-reveal::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--bauhaus-yellow);
  transform: translateX(-100%);
  transition: transform 0.2s ease-out;
}

.bauhaus-slide-reveal:hover::after {
  transform: translateX(0);
}

/* 网格系统 */
.bauhaus-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}
@keyframes bauhaus-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bauhaus-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.bauhaus-gradient {
  background: linear-gradient(135deg, #000000, #ff0000);
}

.bauhaus-gradient-text {
  background: linear-gradient(135deg, #000000, #ff0000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.bauhaus-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(0, 0, 0, 0.08);
}

.bauhaus-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.bauhaus-animate-in {
  animation: bauhaus-fade-in 0.5s ease-out both;
}`,

  aiRules: `你是一个 Bauhaus 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用复杂的渐变效果
- 使用装饰性元素
- 使用衬线字体
- 使用非原色的复杂配色
- 使用柔和缓慢的 ease-in-out 或 duration-500 以上
- 使用圆角（rounded-lg, rounded-xl），仅 rounded-full 用于纯圆形

## 必须遵守

- 原色配色 bg-red-600, bg-yellow-400, bg-blue-600
- 黑白基础 bg-black, bg-white, text-black
- 粗边框 border-4 border-black
- 无衬线字体 font-bold, font-black
- 大写字母 uppercase
- 几何形状装饰

## Animation & Interaction Rules

- Structural Shifts: 动画展现"结构"，使用硬朗位移或大面积纯色相互覆盖。
- Mechanical Precision: 过渡时间短促有力 duration-150 或 duration-200，使用 ease-out。
- Primary Color Swaps: 交互时在红(#ff0000)、黄(#ffcc00)、蓝(#0000ff)、黑、白之间进行高对比度色彩翻转。
- Geometric Reveals: 利用伪元素（如 absolute inset-0 bg-yellow-400），在悬停时像滑轨一样从 -translate-x-full 滑入 translate-x-0，覆盖原色块。
- Geometric Animation: 几何装饰元素在悬停时 scale-125 或 rotate-45，体现机械运转感。

## 配色

仅使用：
- 红色: #ff0000, bg-red-600
- 黄色: #ffcc00, bg-yellow-400
- 蓝色: #0000ff, bg-blue-600
- 黑色: #000000, bg-black
- 白色: #ffffff, bg-white

## 几何元素

- 圆形 rounded-full
- 方形（无圆角）
- 三角形（用 border 实现）`,

  aiRulesEn: `You are a Bauhaus design style frontend development expert. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Using complex gradient effects
- Using decorative elements
- Using serif fonts
- Using complex non-primary color schemes
- Using soft slow ease-in-out or duration-500+
- Using border radii (rounded-lg, rounded-xl), only rounded-full for pure circles

## Must Follow

- Primary color scheme bg-red-600, bg-yellow-400, bg-blue-600
- Black and white base bg-black, bg-white, text-black
- Thick borders border-4 border-black
- Sans-serif fonts font-bold, font-black
- Uppercase letters uppercase
- Geometric shape decorations

## Animation & Interaction Rules

- Structural Shifts: Animations reveal "structure", using sharp displacement or large solid color overlays.
- Mechanical Precision: Transition times are short and powerful duration-150 or duration-200, using ease-out.
- Primary Color Swaps: Interactions flip between red(#ff0000), yellow(#ffcc00), blue(#0000ff), black, and white in high-contrast color inversions.
- Geometric Reveals: Use pseudo-elements (e.g., absolute inset-0 bg-yellow-400) that slide in like a rail from -translate-x-full to translate-x-0 on hover, covering the original color block.
- Geometric Animation: Geometric decorative elements scale-125 or rotate-45 on hover, expressing mechanical operation feel.

## Color Palette

Only use:
- Red: #ff0000, bg-red-600
- Yellow: #ffcc00, bg-yellow-400
- Blue: #0000ff, bg-blue-600
- Black: #000000, bg-black
- White: #ffffff, bg-white

## Geometric Elements

- Circle rounded-full
- Square (no border radii)
- Triangle (using border)`,

  examplePrompts: [
    {
      title: "设计学院官网",
      titleEn: "Design School Website",
      description: "现代主义设计学院网站",
      descriptionEn: "Modernist design school website",
      prompt: `用 Bauhaus 风格创建一个设计学院官网，要求：
1. 配色：仅使用红黄蓝 + 黑白
2. 几何装饰：圆形、方形、三角形，悬停时 scale/rotate
3. 按钮使用色块滑轨覆盖机制（伪元素 translate 动画）
4. 字体：粗体无衬线 + 大写
5. 布局：网格对齐
6. 所有交互 duration-150 到 200，ease-out
7. 去除所有装饰性元素`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 包豪斯风格风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Bauhaus style",
      prompt: `Create a SaaS landing page using Bauhaus style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 包豪斯风格风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Bauhaus style",
      prompt: `Create a portfolio showcase page using Bauhaus style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "bauhaus-warm",
      name: "包豪斯风格暖色版",
      nameEn: "Bauhaus Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#000000",
        secondary: "#ffffff",
        accent: ["#c91a00", "#94ec00", "#7900e8"],
      },
    },
    {
      id: "bauhaus-cool",
      name: "包豪斯风格冷色版",
      nameEn: "Bauhaus Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#000000",
        secondary: "#e6e6e6",
        accent: ["#ff006c", "#ffab36", "#0027d6"],
      },
    },
  ],
};
