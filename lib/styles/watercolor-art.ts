import { DesignStyle } from "./index";

export const watercolorArt: DesignStyle = {
  slug: "watercolor-art",
  name: "水彩艺术风",
  nameEn: "Watercolor Art",
  description:
    "真实水彩画美学，有机的晕染边缘、颜料池化效果、纸张纹理叠加和植物水彩装饰，营造如同手绘水彩画般的自然有机视觉体验。",
  cover: "/styles/watercolor-art.svg",
  styleType: "visual",
  tags: ["expressive", "minimal"],
  category: "expressive",
  colors: {
    primary: "#d4a0a0",
    secondary: "#faf6f0",
    accent: ["#7bb8d4", "#8cc5a8", "#c3a0d4", "#e8c87a"],
  },
  keywords: ["水彩", "晕染", "透明", "纸张", "颜料", "池化", "植物", "有机"],

  philosophy: `水彩艺术风格追求真实水彩画的自然有机美学，强调颜料在湿纸上的流动、渗透和池化效果。

核心理念：
- 有机边缘：使用 SVG feTurbulence + feDisplacementMap 模拟真实的水彩渗透边缘
- 颜料池化：颜色在边缘处浓缩变深，中心区域保持透明层叠
- 纸张纹理：温暖的手工纸底色带有微妙的纤维纹理
- 植物装饰：叶片和花朵形态的水彩点缀增添自然气息
- 湿染技法：色彩在湿润表面自然扩散、融合、产生意外之美`,

  doList: [
    "使用超柔和的阴影和极低透明度（0.08-0.18）的边框",
    "背景使用纸张纹理叠加（feTurbulence grain overlay）",
    "按钮使用 radial-gradient 模拟颜料从中心向边缘池化",
    "卡片使用有机边角 rounded-3xl 和极淡的边框",
    "采用衬线字体（font-serif）配合宽松字距",
    "大量留白，让水彩元素有呼吸空间",
    "色彩始终保持透明感，避免实色填充",
  ],

  dontList: [
    "禁止使用锐利边角（rounded-none/rounded-sm）",
    "禁止使用硬边偏移阴影（shadow-[Npx_Npx_0px]）",
    "禁止使用粗边框（border-2 以上）",
    "禁止使用纯黑背景或高饱和度霓虹色",
    "禁止使用等宽字体（font-mono）",
    "禁止使用大写文字（uppercase）",
  ],

  components: {
    button: {
      name: "按钮",
      description: "水彩颜料池化按钮，使用径向渐变模拟颜料从中心扩散的效果",
      code: `<button className="
  px-8 py-3.5
  bg-[#d4a0a0] text-[#5a3e3e]
  font-serif font-medium tracking-wide
  rounded-2xl
  shadow-[0_4px_20px_rgba(212,160,160,0.25),inset_0_1px_0_rgba(255,255,255,0.15)]
  hover:scale-[1.02]
  hover:shadow-[0_6px_28px_rgba(212,160,160,0.30)]
  transition-all duration-500
">
  Paint
</button>`,
    },
    card: {
      name: "卡片",
      description: "纸张质感卡片，有机圆角和水彩渗透边缘阴影",
      code: `<div className="
  p-8
  bg-[#faf6f0]/80
  border border-[#d4a0a0]/15
  rounded-3xl
  shadow-[0_2px_20px_rgba(212,160,160,0.10)]
  hover:shadow-[0_8px_32px_rgba(212,160,160,0.18)]
  transition-all duration-500
">
  <h3 className="text-2xl font-serif font-semibold text-[#5a3e3e] mb-3">
    Wet-on-Wet
  </h3>
  <p className="text-[#5a3e3e]/45 font-serif leading-relaxed">
    Pigments flow and merge on damp paper
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "水彩风格输入框，纸张纹理背景和柔和的渗透聚焦效果",
      code: `<input
  type="text"
  placeholder="Type softly..."
  className="
    w-full px-5 py-3.5
    bg-[#faf6f0]
    border border-[#d4a0a0]/20
    rounded-2xl
    text-[#5a3e3e] placeholder-[#d4a0a0]/35
    font-serif
    focus:border-[#d4a0a0]/35
    focus:shadow-[0_0_0_3px_rgba(212,160,160,0.10)]
    focus:outline-none
    transition-all duration-500
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "水彩全幅英雄区域，有机形态的水彩渲染背景和流动排版",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#faf6f0]
  relative overflow-hidden
">
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-serif font-semibold text-[#d4a0a0] tracking-tight leading-none mb-4">
      Watercolor
    </h1>
    <h2 className="text-4xl md:text-6xl font-serif font-semibold text-[#7bb8d4]/70 mb-8">
      Art
    </h2>
    <p className="text-lg text-[#5a3e3e]/40 font-serif mb-12 max-w-xl mx-auto leading-relaxed">
      Pigments flow freely across warm paper
    </p>
    <button className="
      px-10 py-4
      bg-[#d4a0a0] text-[#5a3e3e]
      font-serif font-medium tracking-wide
      rounded-2xl
      shadow-[0_4px_24px_rgba(212,160,160,0.30)]
      hover:scale-[1.02]
      transition-all duration-500
    ">
      Explore
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Watercolor Art Global Styles */

:root {
  --wc-rose: #d4a0a0;
  --wc-paper: #faf6f0;
  --wc-cerulean: #7bb8d4;
  --wc-sage: #8cc5a8;
  --wc-lavender: #c3a0d4;
  --wc-ochre: #e8c87a;
  --wc-text: #5a3e3e;
}

/* Paper grain texture overlay */
.wc-paper::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence baseFrequency='0.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
}

/* Watercolor wash section background */
.wc-wash {
  position: relative;
  overflow: hidden;
}
.wc-wash::before {
  content: "";
  position: absolute;
  inset: -20%;
  background: radial-gradient(ellipse at 30% 50%, var(--wc-rose) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 30%, var(--wc-cerulean) 0%, transparent 50%);
  opacity: 0.06;
  pointer-events: none;
}

/* Organic bleeding edge border radius */
.wc-bleed {
  border-radius: 40% 60% 50% 50% / 50% 40% 60% 50%;
}

/* Botanical accent decoration */
.wc-botanical::before {
  content: "";
  position: absolute;
  width: 40px;
  height: 40px;
  background: var(--wc-sage);
  opacity: 0.12;
  border-radius: 0 100% 0 100%;
  filter: blur(4px);
}`,

  aiRules: `You are a Watercolor Art design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Sharp edges (rounded-none, rounded-sm)
- Hard offset shadows (shadow-[Npx_Npx_0px])
- Thick borders (border-2 or higher)
- Neon or highly saturated colors
- Monospace fonts (font-mono)
- Uppercase text (uppercase)
- Pure black backgrounds (bg-black)

## Must Follow

- Warm paper background bg-[#faf6f0]
- Rose pink as primary color #d4a0a0
- Serif fonts font-serif with generous tracking
- Soft organic corners rounded-2xl (buttons) / rounded-3xl (cards)
- Ultra-soft shadows using rgba with low opacity (0.08-0.18)
- Delicate borders with 15-25% opacity
- Radial gradient backgrounds for watercolor wash effects
- Generous whitespace throughout

## Color Palette

Primary:
- Rose Wash: #d4a0a0
- Warm Paper: #faf6f0
- Cerulean: #7bb8d4
- Sage Green: #8cc5a8
- Lavender Bloom: #c3a0d4
- Ochre Gold: #e8c87a
- Text: #5a3e3e

## Unique Elements

- Paper grain texture overlay (feTurbulence SVG filter)
- Radial gradient buttons simulating pigment pooling
- Watercolor wash section backgrounds (multiple radial-gradients)
- Botanical watercolor accent decorations (leaf/flower shapes)
- Organic blob-like border-radius values`,

  examplePrompts: [
    {
      title: "水彩艺术作品集",
      titleEn: "Watercolor Art Portfolio",
      description: "水彩风格的艺术作品展示页面，带有植物装饰和纸张纹理",
      descriptionEn:
        "Art portfolio with watercolor washes, botanical accents, and paper grain texture",
      prompt: `Use Watercolor Art style to create a portfolio page:
1. Background: warm paper #faf6f0 with grain texture overlay
2. Title: elegant serif font with rose pink tones
3. Cards: organic rounded-3xl corners with ultra-soft shadows
4. Use radial-gradient washes as section backgrounds
5. Add botanical leaf/flower decorations at organic positions
6. Maintain generous whitespace and breathing room
7. Buttons use radial-gradient for pigment pooling effect`,
    },
  ],
};
