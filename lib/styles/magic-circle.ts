import { DesignStyle } from "./index";

export const magicCircle: DesignStyle = {
  slug: "magic-circle",
  name: "魔法阵风",
  nameEn: "Magic Circle",
  description:
    "几何魔法阵、神秘符文与光粒子效果的奇幻视觉风格，精密的同心圆纹样、金色辉光与深邃海军蓝底色营造神秘魔法氛围。",
  cover: "/styles/magic-circle.svg",
  styleType: "visual",
  tags: ["expressive", "modern"],
  category: "expressive",
  colors: {
    primary: "#1e1b4b",
    secondary: "#0f0e2e",
    accent: ["#fbbf24", "#e2e8f0", "#818cf8"],
  },
  keywords: ["魔法阵", "符文", "神秘", "奇幻", "光效", "几何", "魔法"],

  philosophy: `Magic Circle 汲取幻想与神秘学中几何魔法阵的灵感，将精密的几何图案与微妙的光效结合。

核心理念：
- 几何精密：同心圆、正多边形、对称图案构成的精确结构
- 金色辉光：金色作为主要强调色，象征魔力与神秘
- 深邃背景：深海军蓝和暗紫色营造神秘深邃的空间感
- 光粒子效果：微妙的发光效果暗示魔力的流动
- 优雅克制：用精致的细线条和淡雅光效取代粗犷的表现`,

  doList: [
    "使用深色海军蓝/暗紫背景",
    "添加金色辉光效果作为强调",
    "使用精细的边框线条",
    "采用几何对称构图",
    "使用优雅衬线字体作为标题",
    "保持整体色调的神秘与克制",
  ],

  dontList: [
    "禁止使用明亮霓虹色",
    "禁止使用粗犷的野兽派风格",
    "禁止使用像素风格元素",
    "禁止使用厚重边框",
    "禁止使用非正式/手写字体",
  ],

  components: {
    button: {
      name: "按钮",
      description: "魔法阵风格按钮",
      code: `<button className="
  px-6 py-3
  bg-[#1e1b4b] text-[#fbbf24]
  font-serif font-semibold tracking-wide
  border border-[#fbbf24]/30
  rounded-sm
  shadow-[0_0_20px_rgba(251,191,36,0.2)]
  hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]
  hover:border-[#fbbf24]/60
  transition-all duration-400
">
  Invoke
</button>`,
    },
    card: {
      name: "卡片",
      description: "魔法阵风格卡片",
      code: `<div className="
  p-8
  bg-[#0f0e2e]
  border border-[#fbbf24]/15
  rounded-sm
  shadow-[0_0_20px_rgba(251,191,36,0.15)]
  hover:shadow-[0_0_30px_rgba(251,191,36,0.25)]
  hover:border-[#fbbf24]/30
  transition-all duration-400
">
  <h3 className="text-2xl font-serif font-bold text-[#fbbf24] mb-3">
    Arcanum
  </h3>
  <p className="text-[#e2e8f0]/60 font-sans">
    Ancient geometries reveal hidden truths
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "魔法阵风格输入框",
      code: `<input
  type="text"
  placeholder="Enter rune..."
  className="
    w-full px-4 py-3
    bg-[#0f0e2e]
    border border-[#fbbf24]/15
    rounded-sm
    text-[#e2e8f0] placeholder-[#e2e8f0]/30
    font-sans
    focus:border-[#fbbf24]/50
    focus:shadow-[0_0_15px_rgba(251,191,36,0.2)]
    focus:outline-none
    transition-all duration-400
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "魔法阵风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#0f0e2e]
  relative overflow-hidden
">
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#fbbf24] mb-2
      [text-shadow:0_0_30px_rgba(251,191,36,0.4)]">
      ARCANE
    </h1>
    <h2 className="text-3xl md:text-5xl font-serif text-[#818cf8] mb-6
      [text-shadow:0_0_20px_rgba(129,140,248,0.3)]">
      CIRCLE
    </h2>
    <p className="text-xl text-[#e2e8f0]/50 font-sans mb-8">
      Where geometry reveals the secrets of magic
    </p>
    <button className="
      px-10 py-4
      bg-[#1e1b4b] text-[#fbbf24]
      font-serif font-semibold tracking-wide
      border border-[#fbbf24]/40
      rounded-sm
      shadow-[0_0_25px_rgba(251,191,36,0.3)]
      hover:shadow-[0_0_40px_rgba(251,191,36,0.5)]
      transition-all duration-400
    ">
      Begin Ritual
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Magic Circle Global Styles */

:root {
  --mc-navy: #1e1b4b;
  --mc-dark: #0f0e2e;
  --mc-gold: #fbbf24;
  --mc-silver: #e2e8f0;
  --mc-indigo: #818cf8;
}

/* Golden glow text */
.mc-gold-glow {
  text-shadow: 0 0 20px var(--mc-gold), 0 0 40px rgba(251, 191, 36, 0.2);
}

/* Rune circle decoration */
.mc-rune-circle {
  position: relative;
}
.mc-rune-circle::before {
  content: "";
  position: absolute;
  inset: -20px;
  border: 1px solid rgba(251, 191, 36, 0.1);
  border-radius: 50%;
  animation: mc-rotate 20s linear infinite;
}
.mc-rune-circle::after {
  content: "";
  position: absolute;
  inset: -40px;
  border: 1px dashed rgba(129, 140, 248, 0.08);
  border-radius: 50%;
  animation: mc-rotate 30s linear infinite reverse;
}

@keyframes mc-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Light particle shimmer */
.mc-shimmer {
  background-image: radial-gradient(
    circle at 50% 50%,
    rgba(251, 191, 36, 0.05) 0%,
    transparent 70%
  );
}`,

  aiRules: `You are a Magic Circle design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Bright neon colors
- Brutalist style elements
- Pixel art aesthetics
- Heavy/thick borders
- Informal/handwritten fonts
- Light backgrounds

## Must Follow

- Deep navy/dark backgrounds: bg-[#0f0e2e] or bg-[#1e1b4b]
- Gold accent glow: #fbbf24 with subtle shadow effects
- Elegant serif fonts for headings (font-serif)
- Thin elegant borders with low opacity: border border-[#fbbf24]/15
- Subtle glow shadows: shadow-[0_0_20px_rgba(251,191,36,0.2)]
- Rounded-sm only for border radius

## Color Palette

Primary:
- Deep Navy: #1e1b4b
- Dark Background: #0f0e2e
- Gold Glow: #fbbf24
- Silver White: #e2e8f0
- Mystic Indigo: #818cf8

## Special Elements

- Concentric circle decorations
- Subtle rotating rune patterns
- Golden glow particle effects
- Geometric symmetrical layouts`,

  examplePrompts: [
    {
      title: "魔法阵主题页面",
      titleEn: "Magic Circle Theme Page",
      description: "神秘几何与金色辉光的奇幻页面",
      descriptionEn: "Mystical geometry with golden glow fantasy page",
      prompt: `Use Magic Circle style to create a mystical dark-themed page:
1. Background: deep navy with subtle radial gold shimmer
2. Title: elegant serif with golden text-shadow glow
3. Cards: dark cards with thin gold borders and subtle glow
4. Use gold, silver, indigo as accent colors
5. Geometric symmetric layout with circle decorations`,
    },
  ],
};
