import { DesignStyle } from "./index";

export const watercolorArt: DesignStyle = {
  slug: "watercolor-art",
  name: "水彩艺术风",
  nameEn: "Watercolor Art",
  description:
    "真实水彩画美学，柔和的水彩晕染、透明度叠加、纸张质感和艺术笔触，营造出如同水彩画作般的精致视觉体验。",
  cover: "/styles/watercolor-art.svg",
  styleType: "visual",
  tags: ["expressive", "minimal"],
  category: "expressive",
  colors: {
    primary: "#d4a0a0",
    secondary: "#faf8f5",
    accent: ["#87ceeb", "#98d8c8", "#c3b1e1"],
  },
  keywords: ["水彩", "晕染", "透明", "纸张", "艺术", "笔触", "留白"],

  philosophy: `水彩艺术风格追求真实水彩画的视觉美学，强调颜料在水中的自然流动和渗透效果。

核心理念：
- 透明叠加：色彩如水彩颜料般透明、叠加产生新的色调
- 晕染留白：颜色边缘自然渗透、模糊，保留大量留白
- 纸张质感：温暖的纸张底色和微妙的纹理
- 笔触痕迹：保留手工绘画的笔触感和有机线条`,

  doList: [
    "使用柔和、透明的颜色搭配",
    "保留大量留白空间",
    "使用圆润的边角和柔和的阴影",
    "采用衬线字体或优雅的无衬线字体",
    "颜色叠加使用透明度变化",
    "模拟水彩渗透和晕染效果",
  ],

  dontList: [
    "禁止使用锐利的边框和硬边阴影",
    "禁止使用霓虹色或高饱和度颜色",
    "禁止使用纯黑背景",
    "禁止使用等宽字体",
  ],

  components: {
    button: {
      name: "按钮",
      description: "水彩艺术风格按钮",
      code: `<button className="
  px-7 py-3
  bg-[#d4a0a0]/70 text-[#4a3535]
  font-serif font-medium tracking-wide
  rounded-xl
  shadow-[0_2px_12px_rgba(212,160,160,0.3)]
  hover:opacity-90
  hover:shadow-[0_4px_16px_rgba(212,160,160,0.4)]
  transition-all duration-300
">
  Watercolor
</button>`,
    },
    card: {
      name: "卡片",
      description: "水彩艺术风格卡片",
      code: `<div className="
  p-8
  bg-[#faf8f5]
  border border-[#d4a0a0]/20
  rounded-2xl
  shadow-[0_2px_16px_rgba(212,160,160,0.15)]
">
  <h3 className="text-2xl font-serif font-semibold text-[#4a3535] mb-3">
    Washed Tones
  </h3>
  <p className="text-[#4a3535]/60 font-serif">
    Soft colors bleeding into gentle paper
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "水彩艺术风格输入框",
      code: `<input
  type="text"
  placeholder="Type softly..."
  className="
    w-full px-5 py-3
    bg-[#faf8f5]
    border border-[#d4a0a0]/30
    rounded-xl
    text-[#4a3535] placeholder-[#d4a0a0]/50
    font-serif
    focus:border-[#d4a0a0]/60
    focus:shadow-[0_0_12px_rgba(212,160,160,0.2)]
    focus:outline-none
    transition-all duration-300
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "水彩艺术风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#faf8f5]
  relative overflow-hidden
">
  <div className="relative z-10 text-center px-6">
    <h1 className="text-5xl md:text-7xl font-serif font-semibold text-[#d4a0a0] mb-4">
      Watercolor
    </h1>
    <h2 className="text-3xl md:text-5xl font-serif text-[#87ceeb] mb-6">
      Art
    </h2>
    <p className="text-lg text-[#4a3535]/60 font-serif mb-8 max-w-xl mx-auto">
      Soft washes of color on warm paper
    </p>
    <button className="
      px-10 py-4
      bg-[#d4a0a0]/70 text-[#4a3535]
      font-serif font-medium tracking-wide
      rounded-xl
      shadow-[0_2px_16px_rgba(212,160,160,0.3)]
      hover:opacity-90
      transition-all duration-300
    ">
      Explore
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Watercolor Art Global Styles */

:root {
  --wc-blush: #d4a0a0;
  --wc-paper: #faf8f5;
  --wc-sky: #87ceeb;
  --wc-mint: #98d8c8;
  --wc-purple: #c3b1e1;
  --wc-text: #4a3535;
}

/* Paper texture overlay */
.wc-paper::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence baseFrequency='0.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
}

/* Watercolor wash effect */
.wc-wash {
  position: relative;
  overflow: hidden;
}
.wc-wash::before {
  content: "";
  position: absolute;
  inset: -20%;
  background: radial-gradient(ellipse at 30% 50%, var(--wc-blush) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 30%, var(--wc-sky) 0%, transparent 50%);
  opacity: 0.08;
  pointer-events: none;
}

/* Bleed edge */
.wc-bleed {
  border-radius: 40% 60% 50% 50% / 50% 40% 60% 50%;
}`,

  aiRules: `You are a Watercolor Art design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Sharp borders or hard-edge shadows (no shadow-[Npx_Npx_0px])
- Neon or highly saturated colors
- Hard shadows or offset shadows
- Monospace fonts (font-mono)
- Pure black background (bg-black)

## Must Follow

- Warm paper background bg-[#faf8f5]
- Blush pink as primary color #d4a0a0
- Serif fonts for elegance font-serif
- Soft, transparent shadows using rgba
- Rounded corners rounded-xl or rounded-2xl
- Generous whitespace and breathing room
- Colors with transparency (use /opacity notation)

## Color Palette

Primary:
- Blush Pink: #d4a0a0
- Warm Paper: #faf8f5
- Sky Blue: #87ceeb
- Mint Green: #98d8c8
- Watercolor Purple: #c3b1e1
- Text: #4a3535

## Special Elements

- Watercolor wash backgrounds (radial gradients with low opacity)
- Paper texture overlays
- Soft color bleeds at edges
- Generous letter-spacing and line-height`,

  examplePrompts: [
    {
      title: "水彩艺术作品集",
      titleEn: "Watercolor Art Portfolio",
      description: "水彩风格的艺术作品展示页面",
      descriptionEn: "Art portfolio page with watercolor painting aesthetic",
      prompt: `Use Watercolor Art style to create a portfolio page:
1. Background: warm paper white with subtle texture
2. Title: elegant serif font with blush pink tones
3. Cards: soft rounded corners with transparent wash shadows
4. Use watercolor transparency and color bleeding effects
5. Maintain generous whitespace throughout`,
    },
  ],
};
