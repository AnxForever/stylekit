import { DesignStyle } from "./index";

export const impressionistOil: DesignStyle = {
  slug: "impressionist-oil",
  name: "油画印象派风",
  nameEn: "Impressionist Oil",
  description:
    "受莫奈、雷诺阿等印象派大师启发，大胆的笔触纹理、斑驳光影、点彩色彩和温暖的画布质感，呈现如油画般的浓郁视觉体验。",
  cover: "/styles/impressionist-oil.svg",
  styleType: "visual",
  tags: ["retro", "expressive"],
  category: "expressive",
  colors: {
    primary: "#e8a87c",
    secondary: "#f5f0e1",
    accent: ["#c0392b", "#2c3e50", "#1abc9c", "#f5d88a"],
  },
  keywords: [
    "油画",
    "印象派",
    "笔触",
    "光影",
    "莫奈",
    "色彩",
    "画布",
    "impasto",
  ],

  philosophy: `油画印象派风格汲取19世纪法国印象派绘画的精髓，强调光影变化和色彩的即兴表达。

核心理念：
- 斑驳光影：使用 multiple radial-gradient 叠加模拟阳光穿过树叶的斑驳效果
- 笔触纹理：通过 repeating-linear-gradient 以不同角度叠加创造画布上可见的笔触
- 厚涂堆叠：layered box-shadow（0_3px_0 色块 + blur shadow）模拟颜料的厚实体积感
- 画布质感：温暖的米白底色 #f5f0e1 配以 feTurbulence 织纹滤镜
- 色彩调和：暖橙 #e8a87c、朱红 #c0392b、深蓝 #2c3e50、青绿 #1abc9c、金光 #f5d88a`,

  doList: [
    "使用温暖的画布色 bg-[#f5f0e1] 作为背景",
    "按钮使用 linear-gradient 模拟颜料管挤出的渐变质感",
    "使用 layered box-shadow（实色底部 + 模糊扩散）模拟厚涂阴影",
    "卡片使用 repeating-linear-gradient 作为背景纹理模拟笔触方向",
    "添加 radial-gradient 光斑叠加模拟斑驳光影",
    "采用粗体衬线字体 font-serif font-bold 表达艺术感",
    "边角使用 rounded-lg 保持柔和的画布边缘",
  ],

  dontList: [
    "禁止使用纯平色块（应有纹理感和渐变）",
    "禁止使用锐利几何边角（rounded-none/rounded-sm）",
    "禁止使用霓虹色或荧光色",
    "禁止使用等宽字体（font-mono）",
    "禁止使用大写文字（uppercase）",
    "禁止使用像素级精确的偏移阴影（shadow-[Npx_Npx_0px]）",
  ],

  components: {
    button: {
      name: "按钮",
      description:
        "油画印象派颜料管按钮，使用 linear-gradient 填充和 layered box-shadow 厚涂阴影",
      code: `<button className="
  px-8 py-3.5
  text-[#2c3e50]
  font-serif font-bold tracking-wide
  rounded-lg
  hover:brightness-110
  active:translate-y-[2px]
  transition-all duration-300
"
  style={{
    background: "linear-gradient(135deg, #e8a87c 0%, #daa070 100%)",
    boxShadow: "0 4px 0 #c0392b, 0 6px 16px rgba(232,168,124,0.30)"
  }}
>
  Paint
</button>`,
    },
    card: {
      name: "卡片",
      description:
        "画布质感卡片，repeating-linear-gradient 笔触纹理和 radial-gradient 斑驳光斑",
      code: `<div className="
  relative p-8
  bg-[#f5f0e1]
  border border-[#e8a87c]/25
  rounded-lg
  transition-all duration-300
"
  style={{
    boxShadow: "0 3px 0 rgba(192,57,43,0.12), 0 8px 24px rgba(44,62,80,0.08)",
    backgroundImage: "repeating-linear-gradient(25deg, transparent, transparent 15px, rgba(232,168,124,0.02) 15px, transparent 16px)"
  }}
>
  <h3 className="text-2xl font-serif font-bold text-[#2c3e50] mb-3">
    Impression
  </h3>
  <p className="text-[#2c3e50]/50 font-serif leading-relaxed">
    Light dances across the canvas at golden hour
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "画布表面输入框，温暖的内阴影和衬线字体",
      code: `<input
  type="text"
  placeholder="Your brushstroke..."
  className="
    w-full px-5 py-3.5
    bg-[#f5f0e1]
    border-2 border-[#e8a87c]/25
    rounded-lg
    text-[#2c3e50] placeholder-[#2c3e50]/30
    font-serif
    focus:border-[#e8a87c]
    focus:outline-none
    transition-all duration-300
  "
  style={{ boxShadow: "inset 0 2px 4px rgba(44,62,80,0.04)" }}
/>`,
    },
    hero: {
      name: "Hero 区块",
      description:
        "画廊墙面英雄区域，画框边框和斑驳光影叠加",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#f5f0e1]
  relative overflow-hidden
">
  {/* Dappled light overlay */}
  <div className="absolute inset-0 pointer-events-none" style={{
    background: "radial-gradient(circle 80px at 20% 15%, rgba(245,216,138,0.08) 0%, transparent 100%), radial-gradient(circle 100px at 75% 20%, rgba(232,168,124,0.06) 0%, transparent 100%)"
  }} />
  {/* Canvas texture */}
  <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(44,62,80,0.03) 3px, transparent 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(44,62,80,0.02) 3px, transparent 4px)"
  }} />
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#e8a87c] leading-none mb-3">
      Impression
    </h1>
    <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2c3e50] mb-6">
      Soleil Levant
    </h2>
    <p className="text-lg text-[#2c3e50]/45 font-serif mb-10 max-w-xl mx-auto leading-relaxed">
      Bold brushstrokes capture the fleeting dance of light
    </p>
    <button className="
      px-10 py-4
      text-[#2c3e50]
      font-serif font-bold tracking-wide
      rounded-lg
      hover:brightness-110
      active:translate-y-[2px]
      transition-all duration-300
    "
      style={{
        background: "linear-gradient(135deg, #e8a87c 0%, #daa070 100%)",
        boxShadow: "0 4px 0 #c0392b, 0 6px 16px rgba(232,168,124,0.30)"
      }}
    >
      Enter Gallery
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
  --imp-gold: #f5d88a;
}

/* Canvas weave texture overlay */
.imp-canvas::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(44,62,80,0.03) 3px, transparent 4px),
    repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(44,62,80,0.02) 3px, transparent 4px);
  opacity: 0.04;
  pointer-events: none;
}

/* Dappled light overlay - scattered radial gradient spots */
.imp-dapple::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle 80px at 20% 15%, rgba(245,216,138,0.08) 0%, transparent 100%),
    radial-gradient(circle 100px at 45% 10%, rgba(232,168,124,0.06) 0%, transparent 100%),
    radial-gradient(circle 70px at 75% 20%, rgba(245,216,138,0.07) 0%, transparent 100%),
    radial-gradient(circle 90px at 90% 60%, rgba(232,168,124,0.05) 0%, transparent 100%);
  pointer-events: none;
}

/* Brushstroke texture as repeating-linear-gradient */
.imp-brushstroke {
  background-image: repeating-linear-gradient(
    25deg,
    transparent,
    transparent 15px,
    rgba(232,168,124,0.02) 15px,
    transparent 16px
  );
}

/* Brushstroke underline decoration */
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
  opacity: 0.5;
  border-radius: 50%;
  transform: rotate(-1deg);
}

/* Pointillism dot background */
.imp-dots {
  background-image:
    radial-gradient(circle, var(--imp-orange) 0.8px, transparent 0.8px),
    radial-gradient(circle, var(--imp-vermillion) 0.6px, transparent 0.6px);
  background-size: 12px 12px, 8px 8px;
  background-position: 0 0, 4px 4px;
  opacity: 0.06;
}`,

  aiRules: `You are an Impressionist Oil design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Flat solid fills without texture or gradient
- Sharp geometric edges (rounded-none, rounded-sm)
- Pixel-perfect offset shadows (shadow-[Npx_Npx_0px])
- Neon or fluorescent colors
- Monospace fonts (font-mono)
- Uppercase text (uppercase)
- Pure black backgrounds (bg-black)

## Must Follow

- Canvas cream background bg-[#f5f0e1]
- Warm orange #e8a87c as primary, use linear-gradient fills on buttons
- Serif fonts font-serif font-bold for all text
- Rounded corners rounded-lg
- Layered box-shadows: solid color base + blur shadow (e.g. 0 4px 0 #c0392b, 0 6px 16px rgba())
- Brushstroke texture via repeating-linear-gradient at angled degrees
- Dappled light via multiple radial-gradient overlays

## Color Palette

Primary:
- Warm Orange: #e8a87c
- Canvas Cream: #f5f0e1
- Vermillion Red: #c0392b
- Deep Blue: #2c3e50
- Turquoise Green: #1abc9c
- Golden Light: #f5d88a

## Unique Elements (Impressionist-Only)

1. Brushstroke texture: repeating-linear-gradient at 25-40deg angles with 0.02 opacity color stops
2. Dappled light: multiple radial-gradient(circle Npx at X% Y%, rgba(...,0.05-0.08)) scattered across surfaces
3. Impasto shadows: layered box-shadow with solid color base layer + blurred spread layer`,

  examplePrompts: [
    {
      title: "印象派画廊页面",
      titleEn: "Impressionist Gallery Page",
      description:
        "油画风格的艺术画廊展示，带有斑驳光影和笔触纹理",
      descriptionEn:
        "Art gallery with dappled light overlays, brushstroke textures, and impasto shadows",
      prompt: `Use Impressionist Oil style to create a gallery page:
1. Background: canvas cream #f5f0e1 with repeating-linear-gradient crosshatch texture overlay
2. Hero: painting frame border with inset box-shadow, multiple radial-gradient dappled light spots
3. Cards: repeating-linear-gradient brushstroke texture at varied angles, layered box-shadows
4. Buttons: linear-gradient fills with 0 4px 0 solid + blur shadow
5. Warm palette: #e8a87c, #c0392b, #2c3e50, #1abc9c, #f5d88a
6. Font: serif bold throughout`,
    },
  ],
};
