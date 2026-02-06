import { DesignStyle } from "./index";

export const impressionistOil: DesignStyle = {
  slug: "impressionist-oil",
  name: "油画印象派风",
  nameEn: "Impressionist Oil",
  description:
    "受莫奈、雷诺阿等印象派大师启发，大胆的笔触纹理、光影交织、点彩色彩和温暖的画布质感，呈现如油画般的浓郁视觉体验。",
  cover: "/styles/impressionist-oil.svg",
  styleType: "visual",
  tags: ["retro", "expressive"],
  category: "expressive",
  colors: {
    primary: "#e8a87c",
    secondary: "#f5f0e1",
    accent: ["#c0392b", "#2c3e50", "#1abc9c"],
  },
  keywords: ["油画", "印象派", "笔触", "光影", "莫奈", "色彩", "画布"],

  philosophy: `油画印象派风格汲取19世纪法国印象派绘画的精髓，强调光影变化和色彩的即兴表达。

核心理念：
- 光影交织：捕捉光线在不同时刻的变化，色彩随光影流动
- 大胆笔触：可见的笔触纹理，不追求平滑完美
- 点彩混色：小色块并置，在视觉上自然融合
- 画布质感：温暖的米白底色如同真实画布`,

  doList: [
    "使用温暖的画布色作为背景",
    "采用粗体衬线字体表达艺术感",
    "使用厚重的底部阴影模拟笔触堆叠",
    "色彩保持温暖色调为主",
    "使用微妙的纹理感增强画布质感",
    "边角使用适度圆润的 rounded-lg",
  ],

  dontList: [
    "禁止使用纯平色块（应有纹理感）",
    "禁止使用锐利的几何边缘",
    "禁止使用霓虹色或荧光色",
    "禁止使用等宽字体",
    "禁止使用像素级精确的边框",
  ],

  components: {
    button: {
      name: "按钮",
      description: "油画印象派风格按钮",
      code: `<button className="
  px-7 py-3.5
  bg-[#e8a87c] text-[#2c3e50]
  font-serif font-bold tracking-wide
  rounded-lg
  shadow-[0_3px_0_#c0392b,0_4px_12px_rgba(232,168,124,0.3)]
  hover:brightness-110
  hover:shadow-[0_4px_0_#c0392b,0_6px_16px_rgba(232,168,124,0.4)]
  active:translate-y-[2px] active:shadow-[0_1px_0_#c0392b]
  transition-all duration-300
">
  Canvas
</button>`,
    },
    card: {
      name: "卡片",
      description: "油画印象派风格卡片",
      code: `<div className="
  p-8
  bg-[#f5f0e1]
  border border-[#e8a87c]/30
  rounded-lg
  shadow-[0_2px_8px_rgba(44,62,80,0.1)]
">
  <h3 className="text-2xl font-serif font-bold text-[#2c3e50] mb-3">
    Impression
  </h3>
  <p className="text-[#2c3e50]/60 font-serif">
    Light dances across the canvas at golden hour
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "油画印象派风格输入框",
      code: `<input
  type="text"
  placeholder="Paint here..."
  className="
    w-full px-5 py-3
    bg-[#f5f0e1]
    border-2 border-[#e8a87c]/30
    rounded-lg
    text-[#2c3e50] placeholder-[#2c3e50]/40
    font-serif
    focus:border-[#e8a87c]
    focus:shadow-[0_0_0_3px_rgba(232,168,124,0.15)]
    focus:outline-none
    transition-all duration-300
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "油画印象派风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#f5f0e1]
  relative overflow-hidden
">
  <div className="relative z-10 text-center px-6">
    <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#e8a87c] mb-4">
      Impression
    </h1>
    <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2c3e50] mb-6">
      Soleil Levant
    </h2>
    <p className="text-lg text-[#2c3e50]/60 font-serif mb-8 max-w-xl mx-auto">
      Bold strokes of light and shadow on canvas
    </p>
    <button className="
      px-10 py-4
      bg-[#2c3e50] text-[#f5f0e1]
      font-serif font-bold tracking-wide
      rounded-lg
      shadow-[0_3px_0_#1abc9c,0_4px_12px_rgba(44,62,80,0.3)]
      hover:brightness-110
      transition-all duration-300
    ">
      Explore
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Impressionist Oil Global Styles */

:root {
  --imp-orange: #e8a87c;
  --imp-canvas: #f5f0e1;
  --imp-vermillion: #c0392b;
  --imp-blue: #2c3e50;
  --imp-turquoise: #1abc9c;
}

/* Canvas texture overlay */
.imp-canvas::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='canvas'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23canvas)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
}

/* Brushstroke underline */
.imp-stroke {
  position: relative;
  display: inline-block;
}
.imp-stroke::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: -5%;
  width: 110%;
  height: 6px;
  background: var(--imp-orange);
  opacity: 0.6;
  border-radius: 50%;
  transform: rotate(-1deg);
}

/* Pointillism dot background */
.imp-dots {
  background-image: radial-gradient(circle, var(--imp-orange) 0.8px, transparent 0.8px),
                    radial-gradient(circle, var(--imp-vermillion) 0.6px, transparent 0.6px);
  background-size: 12px 12px, 8px 8px;
  background-position: 0 0, 4px 4px;
  opacity: 0.06;
}`,

  aiRules: `You are an Impressionist Oil design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Flat solid colors without any texture or depth
- Sharp geometric edges or pixel-perfect borders
- Neon or fluorescent colors
- Monospace fonts (font-mono)
- Pixel-perfect offset shadows (shadow-[Npx_Npx_0px])

## Must Follow

- Canvas cream background bg-[#f5f0e1]
- Warm orange as primary color #e8a87c
- Serif fonts for artistic feel font-serif font-bold
- Layered shadows that simulate paint thickness
- Rounded corners rounded-lg
- Warm color palette throughout

## Color Palette

Primary:
- Warm Orange: #e8a87c
- Canvas Cream: #f5f0e1
- Vermillion Red: #c0392b
- Deep Blue: #2c3e50
- Turquoise Green: #1abc9c

## Special Elements

- Canvas texture overlays
- Brushstroke underlines and decorations
- Layered bottom shadows for impasto effect
- Pointillism dot patterns as backgrounds`,

  examplePrompts: [
    {
      title: "印象派画廊页面",
      titleEn: "Impressionist Gallery Page",
      description: "油画风格的艺术画廊展示",
      descriptionEn: "Art gallery showcase with impressionist painting aesthetic",
      prompt: `Use Impressionist Oil style to create a gallery page:
1. Background: canvas cream with subtle texture
2. Title: bold serif font with warm orange tones
3. Cards: layered shadows simulating paint thickness
4. Use warm color palette with vermillion and turquoise accents
5. Add brushstroke decorative elements`,
    },
  ],
};
