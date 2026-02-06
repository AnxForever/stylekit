import { DesignStyle } from "./index";

export const japaneseFresh: DesignStyle = {
  slug: "japanese-fresh",
  name: "日系清新风",
  nameEn: "Japanese Fresh",
  description:
    "以淡雅配色、大面积留白和纤细线条为特征的日系清新设计，营造清新治愈、轻盈透气的视觉感受。",
  cover: "/styles/japanese-fresh.svg",
  styleType: "visual",
  tags: ["minimal", "modern"],
  category: "minimal",
  colors: {
    primary: "#64b5f6",
    secondary: "#fafaf8",
    accent: ["#98d8c8", "#ffb7c5", "#b8d4e3"],
  },
  keywords: ["日系", "清新", "淡雅", "轻量", "简约", "治愈", "生活"],

  philosophy: `Japanese Fresh 是一种追求清新、治愈感的日系设计美学，强调留白与呼吸感。

核心理念：
- 淡雅配色：使用低饱和度的柔和色彩
- 大面积留白：给内容充分的呼吸空间
- 纤细线条：轻盈的边框和分隔线
- 圆润柔和：适度的圆角，避免锐利感
- 治愈氛围：营造温暖舒适的视觉感受`,

  doList: [
    "使用米白色背景 (#fafaf8) 营造温暖基底",
    "运用低饱和度的淡雅色彩",
    "保持大面积留白和呼吸感",
    "使用纤细的边框和分隔线",
    "采用圆润无衬线字体，偏细字重",
    "使用柔和的小阴影增加层次",
  ],

  dontList: [
    "禁止使用粗边框 (border-2 及以上)",
    "禁止使用霓虹/高饱和度色彩",
    "禁止使用深色/黑色背景",
    "禁止使用粗暴的排版风格 (brutalist)",
    "禁止使用尖锐直角 (rounded-none/rounded-sm)",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Japanese Fresh 风格按钮",
      code: `<button className="
  px-6 py-2.5
  bg-[#64b5f6] text-white
  font-sans font-light tracking-wide
  rounded-lg
  border border-[#b8d4e3]/50
  shadow-sm
  hover:shadow-md hover:brightness-105
  transition-all duration-300
">
  Click
</button>`,
    },
    card: {
      name: "卡片",
      description: "Japanese Fresh 风格卡片",
      code: `<div className="
  p-7
  bg-white
  rounded-xl
  border border-[#e8e8e4]
  shadow-sm
  hover:shadow-md hover:-translate-y-0.5
  transition-all duration-300
">
  <h3 className="text-lg font-sans text-[#4a5568] mb-2">
    Card Title
  </h3>
  <p className="text-[#a0aec0] text-sm font-light">
    Gentle and simple
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Japanese Fresh 风格输入框",
      code: `<input
  type="text"
  placeholder="Please enter..."
  className="
    w-full px-4 py-2.5
    bg-white
    rounded-lg
    border border-[#e8e8e4]
    text-[#4a5568] placeholder-[#a0aec0]/60
    font-sans font-light
    focus:border-[#64b5f6]
    focus:shadow-[0_0_0_3px_rgba(100,181,246,0.1)]
    focus:outline-none
    transition-all duration-300
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "Japanese Fresh 风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#fafaf8]
  relative overflow-hidden
">
  <div className="relative z-10 text-center px-6 max-w-2xl">
    <h1 className="text-4xl md:text-6xl font-sans font-light text-[#4a5568] mb-4">
      Japanese Fresh
    </h1>
    <p className="text-lg text-[#a0aec0] font-light mb-10 leading-relaxed">
      Clean, gentle, and healing design
    </p>
    <button className="
      px-8 py-3
      bg-[#64b5f6] text-white
      font-sans font-light tracking-wide
      rounded-lg
      shadow-sm
      hover:shadow-md
      transition-all duration-300
    ">
      Explore
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Japanese Fresh Global Styles */

:root {
  --jf-sky: #64b5f6;
  --jf-rice: #fafaf8;
  --jf-mint: #98d8c8;
  --jf-pink: #ffb7c5;
  --jf-powder: #b8d4e3;
  --jf-text: #4a5568;
  --jf-muted: #a0aec0;
  --jf-border: #e8e8e4;
}

/* Soft focus ring */
.jf-focus-ring:focus {
  box-shadow: 0 0 0 3px rgba(100, 181, 246, 0.1);
  border-color: var(--jf-sky);
  outline: none;
}

/* Gentle divider */
.jf-divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--jf-border),
    transparent
  );
}

/* Light card shadow */
.jf-card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04),
              0 1px 2px rgba(0, 0, 0, 0.03);
}

/* Subtle gradient background */
.jf-bg-gradient {
  background: linear-gradient(
    180deg,
    #fafaf8 0%,
    #f5f5f0 100%
  );
}`,

  aiRules: `You are a Japanese Fresh design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Heavy borders (border-2 or thicker)
- Neon/high-saturation colors
- Dark/black backgrounds
- Brutalist styling (harsh, raw aesthetic)
- Sharp corners (rounded-none, rounded-sm)
- Bold heavy fonts (font-bold, font-black)

## Must Follow

- Rice-white background: bg-[#fafaf8] as primary surface
- Sky blue primary: #64b5f6 for key interactive elements
- Gentle rounded corners: rounded-lg or rounded-xl
- Light font weight: font-light or font-normal
- Subtle shadows: shadow-sm for elevation
- Thin borders: border with low opacity colors
- Ample white space and breathing room

## Color Palette

Primary:
- Sky Blue: #64b5f6
- Rice White: #fafaf8
- Mint Green: #98d8c8
- Gentle Pink: #ffb7c5
- Powder Blue: #b8d4e3
- Text: #4a5568
- Muted: #a0aec0
- Border: #e8e8e4

## Special Elements

- Subtle focus rings with color spread
- Gentle gradient dividers
- Lightweight card shadows
- Ample padding and margins
- Delicate line decorations`,

  examplePrompts: [
    {
      title: "日系清新博客",
      titleEn: "Japanese Fresh Blog",
      description: "清新淡雅的个人博客页面",
      descriptionEn: "Clean and gentle personal blog page",
      prompt: `Use Japanese Fresh style to create a personal blog page:
1. Background: rice-white (#fafaf8) with ample white space
2. Cards: white with thin borders and subtle shadows
3. Colors: sky blue accents, mint green highlights
4. Typography: light sans-serif, gentle sizing
5. Overall clean, healing, and breathable aesthetic`,
    },
  ],
};
