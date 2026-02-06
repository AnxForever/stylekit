import { DesignStyle } from "./index";

export const shoujoManga: DesignStyle = {
  slug: "shoujo-manga",
  name: "少女漫画风",
  nameEn: "Shoujo Manga",
  description:
    "少女漫画特有的浪漫美学，网点纹理背景、花朵框线装饰、缎带横幅标题、多角星闪光效果、蕾丝边框和爱心元素，以粉色主色调呈现梦幻柔美的视觉体验。",
  cover: "/styles/shoujo-manga.svg",
  styleType: "visual",
  tags: ["expressive", "retro"],
  category: "expressive",
  colors: {
    primary: "#ffb7c5",
    secondary: "#fff5f7",
    accent: ["#c4b5fd", "#fde68a", "#fecdd3"],
  },
  keywords: ["少女漫画", "樱花", "网点", "花框", "缎带", "闪光", "蕾丝", "爱心", "浪漫"],

  philosophy: `Shoujo Manga 风格源于日本少女漫画的经典视觉语言，以浪漫、梦幻、柔美为核心。

核心理念：
- 网点纹理：screentone dot pattern 作为面板和区域背景的标志性装饰
- 花朵框线：五瓣花作为面板边角装饰，营造画框感
- 缎带横幅：ribbon banner 作为章节标题和分割线
- 多角闪光：4/6/8-point sparkle star 星光效果，用金色呈现梦幻感
- 蕾丝边框：scalloped lace border 作为卡片顶部/底部装饰
- 漫画分格：asymmetric manga panel grid 模拟漫画页面排版
- 樱花飘落：cherry blossom petal 作为散点装饰元素`,

  doList: [
    "使用粉色系作为主色调（樱花粉 #ffb7c5）",
    "添加网点纹理背景 screentone（radial-gradient 实现圆点图案）",
    "使用花朵图标 Flower2 作为面板边角装饰",
    "使用缎带横幅（ribbon banner with clip-path tails）作为章节标题",
    "添加多角星闪光效果（金色 #fde68a 圆点带 glow shadow）",
    "使用蕾丝 scallop 边框（radial-gradient 实现波浪边缘）",
    "使用圆角设计（rounded-full 按钮, rounded-2xl 卡片, rounded-3xl 面板）",
    "保持浅色背景（珍珠白 #fff5f7, 白色 #ffffff）",
    "使用漫画分格的不对称网格排版（grid-cols-12 span 混合）",
  ],

  dontList: [
    "禁止使用深色或暗色调背景",
    "禁止使用尖角或锐利边角（rounded-none, rounded-sm）",
    "禁止使用野蛮主义风格的粗边框",
    "禁止使用等宽字体 font-mono",
    "禁止使用强烈的硬阴影或 RGB 分离阴影",
    "禁止使用纯黑背景或深灰背景",
  ],

  components: {
    button: {
      name: "按钮",
      description: "少女漫画风格药丸按钮，带粉色光晕阴影",
      code: `<button className="
  px-7 py-3
  bg-[#ffb7c5] text-white
  font-sans font-medium
  rounded-full
  shadow-[0_4px_15px_#ffb7c560]
  hover:scale-105
  hover:shadow-[0_6px_20px_#ffb7c580]
  transition-all duration-300
">
  Sakura
</button>`,
    },
    card: {
      name: "卡片",
      description: "漫画面板卡片，带网点纹理和花朵边角装饰",
      code: `<div className="
  relative overflow-hidden
  p-8
  bg-[#fff5f7]
  border-2 border-[#ffb7c5]/20
  rounded-2xl
  shadow-[0_4px_20px_#ffb7c520]
">
  <!-- Screentone dot pattern background -->
  <div className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: "radial-gradient(circle, #ffb7c5 0.6px, transparent 0.6px)",
      backgroundSize: "10px 10px",
      opacity: 0.06,
    }}
  />
  <div className="relative z-10">
    <h3 className="text-xl font-sans font-bold text-[#ffb7c5] mb-3">
      Sakura Card
    </h3>
    <p className="text-[#4a5568]/50 font-sans leading-relaxed">
      A gentle breeze carries cherry blossoms...
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "少女漫画风格药丸输入框，带粉色焦点光晕",
      code: `<input
  type="text"
  placeholder="Your name..."
  className="
    w-full px-5 py-3
    bg-[#fff5f7]
    border border-[#ffb7c5]/25
    rounded-full
    text-[#4a5568] placeholder-[#ffb7c5]/40
    font-sans
    focus:border-[#ffb7c5]
    focus:shadow-[0_0_12px_#ffb7c540]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "漫画风格 Hero，带花朵边角、网点背景和缎带横幅",
      code: `<section className="relative pt-16 pb-20 px-6">
  <div className="max-w-4xl mx-auto relative">
    <!-- Flower corner decorations (Lucide Flower2 icons) -->
    <div className="absolute -top-4 -left-4">
      <Flower2 className="w-8 h-8 text-[#ffb7c5]/40" />
    </div>
    <div className="absolute -top-4 -right-4">
      <Flower2 className="w-8 h-8 text-[#c4b5fd]/40" />
    </div>

    <!-- Panel with screentone -->
    <div className="relative border-2 border-[#ffb7c5]/20 rounded-3xl overflow-hidden bg-white/80 p-12 text-center">
      <!-- Screentone overlay -->
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffb7c5 0.6px, transparent 0.6px)",
          backgroundSize: "10px 10px",
          opacity: 0.08,
        }}
      />
      <div className="relative z-10">
        <h1 className="text-6xl md:text-8xl font-sans font-bold text-[#ffb7c5] mb-2">Shoujo</h1>
        <h2 className="text-4xl md:text-6xl font-sans font-bold text-[#c4b5fd] mb-6">Manga</h2>
        <p className="text-[#4a5568]/40 font-sans text-sm tracking-[0.3em] uppercase mb-10">
          Romantic Dream Aesthetic
        </p>
      </div>
    </div>
  </div>
</section>`,
    },
  },

  globalCss: `/* Shoujo Manga Global Styles */

:root {
  --shoujo-pink: #ffb7c5;
  --shoujo-pearl: #fff5f7;
  --shoujo-lavender: #c4b5fd;
  --shoujo-gold: #fde68a;
  --shoujo-rose: #fecdd3;
}

/* Screentone dot pattern overlay */
.shoujo-screentone::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, var(--shoujo-pink) 0.6px, transparent 0.6px);
  background-size: 10px 10px;
  opacity: 0.06;
  pointer-events: none;
}

/* Floating petals animation */
.shoujo-petals::before,
.shoujo-petals::after {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  background: var(--shoujo-pink);
  border-radius: 50% 0 50% 50%;
  opacity: 0.3;
  animation: shoujoFloat 6s ease-in-out infinite;
}
.shoujo-petals::after {
  width: 8px;
  height: 8px;
  animation-delay: -3s;
  animation-duration: 8s;
}
@keyframes shoujoFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

/* Sparkle star glow */
.shoujo-sparkle {
  position: relative;
}
.shoujo-sparkle::after {
  content: "";
  position: absolute;
  top: -4px;
  right: -4px;
  width: 8px;
  height: 8px;
  background: var(--shoujo-gold);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--shoujo-gold);
  animation: shoujoSparkle 2s ease-in-out infinite;
}
@keyframes shoujoSparkle {
  0%, 100% { opacity: 0.4; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* Ribbon banner with clip-path tails */
.shoujo-ribbon {
  position: relative;
  display: inline-block;
  padding: 4px 40px;
  background: rgba(255, 183, 197, 0.15);
  border-radius: 2px;
}
.shoujo-ribbon::before,
.shoujo-ribbon::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 12px;
}
.shoujo-ribbon::before {
  left: -12px;
  background: rgba(255, 183, 197, 0.1);
  clip-path: polygon(100% 0, 100% 100%, 0 50%);
}
.shoujo-ribbon::after {
  right: -12px;
  background: rgba(255, 183, 197, 0.1);
  clip-path: polygon(0 0, 0 100%, 100% 50%);
}

/* Lace scallop border */
.shoujo-lace {
  position: relative;
}
.shoujo-lace::before {
  content: "";
  position: absolute;
  top: -4px;
  left: 16px;
  right: 16px;
  height: 8px;
  background-image: radial-gradient(circle at 50% 100%, white 6px, transparent 6px),
    radial-gradient(circle at 50% 100%, var(--shoujo-pink) 7px, transparent 7px);
  background-size: 16px 8px;
  opacity: 0.3;
}

/* Soft glow */
.shoujo-glow {
  box-shadow: 0 0 20px rgba(255, 183, 197, 0.3);
}`,

  aiRules: `You are a Shoujo Manga design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Dark colors or dark backgrounds (bg-black, bg-gray-900, bg-slate-900)
- Sharp corners (rounded-sm, rounded-none)
- Brutalist style elements (thick borders border-4+, hard offset shadows)
- Monospace fonts (font-mono)
- RGB split shadows or neon glow effects
- CMY color scheme (cyan, magenta, yellow on black)

## Must Follow

- Pink-dominant palette: sakura pink #ffb7c5, pearl white #fff5f7
- Fully rounded elements: rounded-full (buttons), rounded-2xl (cards), rounded-3xl (panels)
- Soft sans-serif fonts: font-sans font-bold for headings, font-sans for body
- Gentle colored shadows: shadow-[0_4px_15px_color/opacity]
- Light backgrounds: bg-[#fff5f7] or bg-white/80
- Border width: border-2 for panels, border for inputs

## Color Palette

Primary:
- Sakura Pink: #ffb7c5 (main accent, buttons, borders)
- Pearl White: #fff5f7 (card backgrounds)
- Lavender Purple: #c4b5fd (secondary accent)
- Gold Sparkle: #fde68a (sparkle effects, decorative)
- Rose: #fecdd3 (tertiary, subtle accents)

## Unique Elements

- Screentone dot pattern: radial-gradient(circle, #ffb7c5 0.6px, transparent 0.6px) with 10px spacing at ~6% opacity
- Flower frame corners: Lucide Flower2 icons positioned at absolute corners of panels
- Ribbon banner titles: clip-path polygon tails with soft pink background for section headers
- Sparkle stars: gold #fde68a dots with glow shadow (shadow-[0_0_8px_#fde68a])
- Lace scallop borders: radial-gradient wave pattern at top/bottom of form cards
- Manga panel grid: asymmetric grid-cols-12 layout with col-span mixing for panel arrangement
- Cherry blossom petals: rotated rounded-[50%_0_50%_50%] divs as floating decorations`,

  examplePrompts: [
    {
      title: "少女漫画角色页",
      titleEn: "Shoujo Manga Character Page",
      description: "带网点纹理、花朵框线和缎带标题的浪漫风格页面",
      descriptionEn: "Romantic page with screentone texture, flower frame borders, and ribbon banner titles",
      prompt: `Use Shoujo Manga style to create a character profile page:
1. Background: soft pink-to-white gradient with screentone dot pattern overlay
2. Hero: manga panel frame with flower (Flower2) icons at corners and screentone bg
3. Section titles: ribbon banners with clip-path pointed tails
4. Cards: manga panel grid with asymmetric layout (grid-cols-12), screentone backgrounds
5. Form: love letter diary with lace scallop border at top and bottom
6. Decorations: scattered cherry blossom petals and gold sparkle star dots throughout
7. Buttons: pill-shaped (rounded-full) with pink glow shadows`,
    },
  ],
};
