import { DesignStyle } from "./index";

export const shoujoManga: DesignStyle = {
  slug: "shoujo-manga",
  name: "少女漫画风",
  nameEn: "Shoujo Manga",
  description:
    "少女漫画特有的浪漫美学，樱花花瓣装饰、闪光效果、柔和流线、爱心元素和粉色主色调，呈现梦幻柔美的视觉体验。",
  cover: "/styles/shoujo-manga.svg",
  styleType: "visual",
  tags: ["expressive", "retro"],
  category: "expressive",
  colors: {
    primary: "#ffb7c5",
    secondary: "#fff5f7",
    accent: ["#c4b5fd", "#fde68a", "#fecdd3"],
  },
  keywords: ["少女漫画", "樱花", "闪光", "花瓣", "爱心", "浪漫", "柔美"],

  philosophy: `Shoujo Manga 风格源于日本少女漫画的经典视觉语言，以浪漫、梦幻、柔美为核心。

核心理念：
- 樱花美学：花瓣飘落作为标志性装饰元素
- 闪光效果：星光和亮片营造梦幻氛围
- 柔和色调：以粉色系为主，搭配薰衣草紫和金色
- 圆润线条：一切边角都柔和圆润，拒绝锐利`,

  doList: [
    "使用粉色系作为主色调（樱花粉 #ffb7c5）",
    "添加花瓣、星光等装饰元素",
    "使用圆角设计（rounded-full, rounded-2xl）",
    "使用柔和的阴影和光晕效果",
    "使用圆润无衬线字体",
    "保持浅色/珍珠白背景（#fff5f7）",
  ],

  dontList: [
    "禁止使用深色或暗色调",
    "禁止使用尖角或锐利边角",
    "禁止使用野蛮主义风格",
    "禁止使用等宽字体",
    "禁止使用强烈的硬阴影",
  ],

  components: {
    button: {
      name: "按钮",
      description: "少女漫画风格按钮",
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
  Click
</button>`,
    },
    card: {
      name: "卡片",
      description: "少女漫画风格卡片",
      code: `<div className="
  p-8
  bg-[#fff5f7]
  border border-[#ffb7c5]/30
  rounded-2xl
  shadow-[0_4px_20px_#ffb7c520]
">
  <h3 className="text-xl font-sans font-medium text-[#ffb7c5] mb-3">
    Sakura Card
  </h3>
  <p className="text-[#4a5568]/60 font-sans leading-relaxed">
    A gentle breeze carries cherry blossoms...
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "少女漫画风格输入框",
      code: `<input
  type="text"
  placeholder="Your name..."
  className="
    w-full px-5 py-3
    bg-white
    border border-[#ffb7c5]/30
    rounded-full
    text-[#4a5568] placeholder-[#ffb7c5]/50
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
      description: "少女漫画风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-[#fff5f7] to-white
  relative overflow-hidden
">
  <div className="relative z-10 text-center px-6">
    <h1 className="text-5xl md:text-7xl font-sans font-bold text-[#ffb7c5] mb-4">
      Shoujo
    </h1>
    <p className="text-lg text-[#c4b5fd] font-sans mb-8">
      Where dreams bloom like cherry blossoms
    </p>
    <button className="
      px-10 py-4
      bg-[#ffb7c5] text-white
      font-sans font-medium
      rounded-full
      shadow-[0_4px_20px_#ffb7c560]
      hover:scale-105
      hover:shadow-[0_6px_25px_#ffb7c580]
      transition-all duration-300
    ">
      Begin Story
    </button>
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

/* Sparkle effect */
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
  box-shadow: 0 0 6px var(--shoujo-gold);
  animation: shoujoSparkle 2s ease-in-out infinite;
}
@keyframes shoujoSparkle {
  0%, 100% { opacity: 0.4; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* Soft glow */
.shoujo-glow {
  box-shadow: 0 0 20px rgba(255, 183, 197, 0.3);
}`,

  aiRules: `You are a Shoujo Manga design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Dark colors or dark backgrounds
- Sharp corners (rounded-sm, rounded-none)
- Brutalist style elements (thick borders, hard shadows)
- Monospace fonts
- Harsh drop shadows

## Must Follow

- Pink-dominant palette: sakura pink #ffb7c5, pearl white #fff5f7
- Fully rounded elements rounded-full or rounded-2xl
- Soft sans-serif fonts font-sans
- Gentle shadows shadow-[0_4px_15px_color/opacity]
- Light backgrounds bg-[#fff5f7] or white
- Decorative elements: petals, sparkles, hearts

## Color Palette

Primary:
- Sakura Pink: #ffb7c5
- Pearl White: #fff5f7
- Lavender Purple: #c4b5fd
- Gold Sparkle: #fde68a
- Rose: #fecdd3

## Special Elements

- Cherry blossom petal decorations
- Sparkle/star effects with gold
- Heart-shaped accents
- Soft gradient backgrounds
- Floating animation on decorative elements`,

  examplePrompts: [
    {
      title: "少女漫画角色页",
      titleEn: "Shoujo Manga Character Page",
      description: "浪漫梦幻风格的角色介绍页",
      descriptionEn: "Romantic dreamy character introduction page",
      prompt: `Use Shoujo Manga style to create a character profile page:
1. Background: soft pink to white gradient with floating petals
2. Profile card: rounded with pink border and gentle shadow
3. Buttons: pill-shaped with pink glow
4. Decorations: sparkles and cherry blossom petals
5. Overall dreamy, romantic shoujo manga aesthetic`,
    },
  ],
};
