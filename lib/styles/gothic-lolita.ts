import type { DesignStyle } from "./types";

export const gothicLolita: DesignStyle = {
  slug: "gothic-lolita",
  name: "哥特萝莉风",
  nameEn: "Gothic Lolita",
  description:
    "维多利亚蕾丝、黑色缎带、十字架与玫瑰的暗黑优雅，融合哥特式建筑装饰与洛丽塔精致细节的暗色浪漫美学。",
  descriptionEn:
    "Victorian lace, black ribbons, crosses and roses in dark elegance -- a dark romantic aesthetic blending Gothic architectural ornamentation with Lolita's exquisite details.",
  cover: "/styles/gothic-lolita.svg",
  styleType: "visual",
  tags: ["retro"],
  category: "expressive",
  colors: {
    primary: "#4a1a4a",
    secondary: "#8b1a2a",
    accent: ["#e5e5e5", "#1a1a1a", "#6b2d5b", "#e5e5e5"],
  },
  keywords: ["哥特", "萝莉塔", "维多利亚", "蕾丝", "暗黑优雅", "玫瑰", "十字架", "expressive", "bold", "vibrant"],
  keywordsEn: ["gothic lolita", "lolita fashion", "Victorian lace", "Harajuku fashion", "dark elegance", "ornate frame", "rose motif", "vintage doll aesthetic", "dark feminine design", "gothic romance"],

  philosophy: `Gothic Lolita（哥特萝莉）是一种融合维多利亚时代与哥特美学的视觉风格，起源于日本街头时尚。

核心理念：
- 暗黑优雅：黑色为主调，搭配深紫和血红点缀
- 精致细节：蕾丝花边、缎带蝴蝶结、十字架装饰
- 维多利亚风情：繁复的衬线字体、对称的装饰花纹
- 浪漫黑暗：玫瑰、烛台、哥特式拱门等元素

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Gothic Lolita is a visual style blending Victorian-era and Gothic aesthetics, originating from Japanese street fashion.

Core principles:
- Dark elegance: Black as the main tone, accented with deep purple and blood red
- Exquisite details: Lace trim, ribbon bows, cross decorations
- Victorian charm: Elaborate serif fonts, symmetrical decorative patterns
- Romantic darkness: Roses, candelabras, Gothic arches, and other elements`,

  doList: [
    "使用黑色深色为主背景",
    "搭配深紫 #4a1a4a 和血红 #8b1a2a 点缀",
    "使用装饰性衬线字体",
    "添加蕾丝花边、缎带等装饰元素",
    "使用哥特式对称花纹或十字架图案",
    "保持精致典雅的整体氛围",
  ],

  doListEn: [
    "Use black and dark colors as main background",
    "Accent with deep purple #4a1a4a and blood red #8b1a2a",
    "Use decorative serif fonts",
    "Add lace trim, ribbon, and other decorative elements",
    "Use Gothic symmetrical patterns or cross motifs",
    "Maintain an exquisite and elegant overall atmosphere",
  ],

  dontList: [
    "禁止使用明亮鲜艳的颜色",
    "禁止使用可爱卡通风格元素",
    "禁止使用现代极简设计",
    "禁止使用过于圆润的形状",
  ],

  dontListEn: [
    "Do not use bright vivid colors",
    "Do not use cute cartoon-style elements",
    "Do not use modern minimalist design",
    "Do not use overly rounded shapes",
  ],

  components: {
    button: {
      name: "按钮",
      description: "哥特萝莉风格按钮",
      code: `<button className="
  px-8 py-4
  bg-[#0a0a0a]
  border border-[#4a1a4a]
  text-[#e5e5e5] font-serif tracking-[0.2em]
  shadow-[inset_0_0_10px_rgba(74,26,74,0.3)]
  hover:bg-[#1a0a1a]
  hover:border-[#8b1a2a]
  hover:text-white
  hover:shadow-[0_8px_24px_rgba(139,26,42,0.35),inset_0_0_12px_rgba(139,26,42,0.2)]
  active:scale-[0.98]
  active:shadow-[inset_0_0_24px_rgba(0,0,0,0.8)]
  transition-all duration-500 ease-in-out
">
  Unlock Secret
</button>`,
    },
    card: {
      name: "卡片",
      description: "哥特萝莉风格卡片",
      code: `<div className="
  group
  p-8
  bg-gradient-to-b from-[#1a0a1a] to-[#0a0a0a]
  border border-[#4a1a4a]/50
  shadow-[0_4px_16px_rgba(74,26,74,0.35)]
  hover:border-[#8b1a2a]/70
  hover:shadow-[0_10px_30px_rgba(139,26,42,0.25)]
  transition-all duration-700 ease-in-out
  relative overflow-hidden
">
  <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-[#e5e5e5]/20 transition-colors duration-500 group-hover:border-[#e5e5e5]/60" />
  <div className="absolute top-4 right-4 w-6 h-6 border-r border-t border-[#e5e5e5]/20 transition-colors duration-500 group-hover:border-[#e5e5e5]/60" />

  <div className="mb-6 flex justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-500">
    <div className="h-6 w-px bg-[#e5e5e5]/70 relative">
      <div className="absolute left-[-8px] top-1/2 h-px w-4 -translate-y-1/2 bg-[#e5e5e5]/70" />
    </div>
  </div>

  <h3 className="text-2xl font-serif text-[#e5e5e5] mb-3 tracking-widest text-center group-hover:drop-shadow-[0_0_8px_rgba(229,229,229,0.25)] transition-all duration-500">
    Dark Elegance
  </h3>
  <p className="text-[#e5e5e5]/60 font-serif text-center group-hover:text-[#e5e5e5]/85 transition-colors duration-500">
    A whisper of lace and shadow, wrapped in velvet moonlight.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "哥特萝莉风格输入框",
      code: `<input
  type="text"
  placeholder="Enter text..."
  className="
    w-full px-6 py-4
    bg-[#0a0a0a]/80
    border border-[#4a1a4a]/50
    text-[#e5e5e5] placeholder-[#4a1a4a]/60
    font-serif
    focus:border-[#8b1a2a]
    focus:shadow-[0_0_12px_rgba(139,26,42,0.4)]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "哥特萝莉风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-[#0a0a0a] via-[#1a0a1a] to-[#0a0a0a]
  relative overflow-hidden
">
  {/* Ornate border frame */}
  <div className="absolute inset-4 border border-[#4a1a4a]/30" />
  <div className="absolute inset-8 border border-[#8b1a2a]/20" />

  <div className="relative z-10 text-center px-6">
    <div className="w-16 h-0.5 bg-[#8b1a2a] mx-auto mb-6" />
    <h1 className="text-5xl md:text-7xl font-serif text-[#e5e5e5] mb-4 tracking-wider">
      Gothic Lolita
    </h1>
    <p className="text-lg text-[#e5e5e5]/60 font-serif mb-8">
      Dark elegance, Victorian grace
    </p>
    <div className="w-16 h-0.5 bg-[#8b1a2a] mx-auto" />
  </div>
</section>`,
    },
  },

  globalCss: `/* Gothic Lolita 全局样式 */

:root {
  --gl-black: #0a0a0a;
  --gl-purple: #4a1a4a;
  --gl-red: #8b1a2a;
  --gl-silver: #e5e5e5;
}

/* 蕾丝花边装饰 */
.gl-lace-border {
  border-image: repeating-linear-gradient(
    90deg,
    var(--gl-purple) 0px,
    var(--gl-purple) 4px,
    transparent 4px,
    transparent 8px
  ) 1;
}

/* 哥特十字架装饰 */
.gl-cross::before {
  content: "+";
  font-size: 1.2em;
  color: var(--gl-red);
  margin-right: 0.5em;
}

/* 玫瑰阴影 */
.gl-rose-shadow {
  box-shadow:
    0 4px 16px rgba(139, 26, 42, 0.3),
    inset 0 1px 0 rgba(229, 229, 229, 0.1);
}

/* 暗色渐变 */
.gl-dark-gradient {
  background: linear-gradient(
    to bottom,
    #0a0a0a 0%,
    #1a0a1a 50%,
    #0a0a0a 100%
  );
}
@keyframes gothic-lolita-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes gothic-lolita-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.gothic-lolita-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(74, 26, 74, 0.08);
}

.gothic-lolita-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.gothic-lolita-animate-in {
  animation: gothic-lolita-fade-in 0.5s ease-out both;
}

.gothic-lolita-focus { outline: 2px solid var(--gothic-lolita-primary, currentColor); outline-offset: 2px; }

/* Responsive utilities */
@media (prefers-reduced-motion: reduce) {
  .gothic-lolita-animate-in {
    animation: none;
  }
}

@media (min-width: 768px) {
  .gothic-lolita-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
}

/* Print styles */
@media print {
  .gothic-lolita-gradient,
  .gothic-lolita-frosted {
    background: none;
    backdrop-filter: none;
  }
}`,

  aiRules: `你是一个 Gothic Lolita 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用明亮鲜艳的颜色
- 使用可爱卡通风格
- 使用现代极简设计
- 使用圆角过大的形状
- 使用 emoji

## 必须遵守

- 黑色深色背景 bg-[#0a0a0a], bg-[#1a0a1a]
- 深紫点缀 border-[#4a1a4a], text-[#4a1a4a]
- 血红强调 border-[#8b1a2a], text-[#8b1a2a]
- 银白文字 text-[#e5e5e5]
- 衬线字体 font-serif
- 精致边框装饰

## 配色

主色调：
- 黑色: #0a0a0a
- 深紫: #4a1a4a
- 血红: #8b1a2a
- 银白: #e5e5e5

## 特殊元素

- 蕾丝花边图案
- 十字架装饰
- 玫瑰图案
- 对称装饰花纹
- 哥特式拱门

## Animation & Interaction Rules

- Velvet Depth: hover 以深紫/血红阴影的缓慢扩散为主，体现丝绒质感，避免轻浮弹跳。
- Lace Elegance: 交互时长建议 duration-500 到 700，使用 ease-in-out 保持精致与克制。
- Corset Press: active 使用轻微收束（scale-[0.98]）和内阴影加强，模拟束腰式阻尼反馈。
- Silver Whisper: 边框与文字可在 hover 中缓慢浮现银白微光，增强暗黑华丽层次。

## Layout & Spacing
- Section padding: py-16 md:py-24
- Card padding: p-6 md:p-8
- Gap between cards: gap-6 md:gap-8
- Max content width: max-w-6xl mx-auto

## Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Stack elements vertically on mobile (flex-col), row on desktop (md:flex-row)
- Reduce font sizes on mobile: text-3xl md:text-5xl for headings
- Touch-friendly targets: min 44px for interactive elements

## Self-Check Verification
After generating code, verify:
1. All interactive elements have hover/focus/active states
2. Color contrast meets WCAG 2.1 AA (4.5:1 for text)
3. Layout is responsive across breakpoints
4. Typography hierarchy is clear (h1 > h2 > h3 > body)
5. Spacing is consistent using the defined scale
6. All animations respect prefers-reduced-motion`,

  aiRulesEn: `You are a Gothic Lolita design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Bright vivid colors
- Cute cartoon style
- Modern minimalist design
- Overly large rounded shapes
- Emoji

## Must Follow

- Black dark backgrounds bg-[#0a0a0a], bg-[#1a0a1a]
- Deep purple accents border-[#4a1a4a], text-[#4a1a4a]
- Blood red emphasis border-[#8b1a2a], text-[#8b1a2a]
- Silver white text text-[#e5e5e5]
- Serif fonts font-serif
- Intricate border decorations

## Color Palette

Primary:
- Black: #0a0a0a
- Deep Purple: #4a1a4a
- Blood Red: #8b1a2a
- Silver White: #e5e5e5

## Special Elements

- Lace trim patterns
- Cross decorations
- Rose patterns
- Symmetrical decorative motifs
- Gothic arches

## Animation & Interaction Rules

- Velvet Depth: Hover focuses on slow expansion of deep purple/blood red shadows, conveying velvet texture -- avoid frivolous bouncing.
- Lace Elegance: Interaction duration should be duration-500 to 700, using ease-in-out to maintain refinement and restraint.
- Corset Press: Active uses slight constriction (scale-[0.98]) with enhanced inner shadow, simulating corset-like damped feedback.
- Silver Whisper: Borders and text may slowly reveal silver-white shimmer on hover, enhancing dark luxurious layering.`,

  examplePrompts: [
    {
      title: "暗色优雅落地页",
      titleEn: "Dark Elegant Landing Page",
      description: "维多利亚哥特风格的品牌落地页",
      descriptionEn: "Victorian gothic style brand landing page",
      prompt: `用 Gothic Lolita 风格创建一个暗色优雅的落地页，要求：
1. 背景：黑色深色渐变
2. 标题：装饰性衬线字体，银白色
3. 装饰：蕾丝花边边框和十字架图案
4. 按钮：深紫配血红边框
5. 整体暗色浪漫氛围`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 哥特萝莉风风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Gothic Lolita style",
      prompt: `Create a SaaS landing page using Gothic Lolita style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 哥特萝莉风风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Gothic Lolita style",
      prompt: `Create a portfolio showcase page using Gothic Lolita style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "gothic-lolita-warm",
      name: "哥特萝莉风暖色版",
      nameEn: "Gothic Lolita Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#571834",
        secondary: "#97313f",
        accent: ["#e5e5e5", "#1a1a1a", "#742d40"],
      },
    },
    {
      id: "gothic-lolita-cool",
      name: "哥特萝莉风冷色版",
      nameEn: "Gothic Lolita Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#341f57",
        secondary: "#7d1726",
        accent: ["#e5e5e5", "#1a1a1a", "#56316e"],
      },
    },
  ],
};
