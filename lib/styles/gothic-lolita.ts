import { DesignStyle } from "./index";

export const gothicLolita: DesignStyle = {
  slug: "gothic-lolita",
  name: "哥特萝莉风",
  nameEn: "Gothic Lolita",
  description:
    "维多利亚蕾丝、黑色缎带、十字架与玫瑰的暗黑优雅，融合哥特式建筑装饰与洛丽塔精致细节的暗色浪漫美学。",
  cover: "/styles/gothic-lolita.svg",
  styleType: "visual",
  tags: ["expressive", "retro"],
  category: "expressive",
  colors: {
    primary: "#4a1a4a",
    secondary: "#8b1a2a",
    accent: ["#e5e5e5", "#1a1a1a", "#6b2d5b"],
  },
  keywords: ["哥特", "萝莉塔", "维多利亚", "蕾丝", "暗黑优雅", "玫瑰", "十字架"],

  philosophy: `Gothic Lolita（哥特萝莉）是一种融合维多利亚时代与哥特美学的视觉风格，起源于日本街头时尚。

核心理念：
- 暗黑优雅：黑色为主调，搭配深紫和血红点缀
- 精致细节：蕾丝花边、缎带蝴蝶结、十字架装饰
- 维多利亚风情：繁复的衬线字体、对称的装饰花纹
- 浪漫黑暗：玫瑰、烛台、哥特式拱门等元素`,

  doList: [
    "使用黑色深色为主背景",
    "搭配深紫 #4a1a4a 和血红 #8b1a2a 点缀",
    "使用装饰性衬线字体",
    "添加蕾丝花边、缎带等装饰元素",
    "使用哥特式对称花纹或十字架图案",
    "保持精致典雅的整体氛围",
  ],

  dontList: [
    "禁止使用明亮鲜艳的颜色",
    "禁止使用可爱卡通风格元素",
    "禁止使用现代极简设计",
    "禁止使用过于圆润的形状",
  ],

  components: {
    button: {
      name: "按钮",
      description: "哥特萝莉风格按钮",
      code: `<button className="
  px-8 py-4
  bg-[#4a1a4a]
  border border-[#8b1a2a]/60
  text-[#e5e5e5] font-serif tracking-wide
  shadow-[0_2px_8px_rgba(75,26,75,0.5)]
  hover:shadow-[0_4px_16px_rgba(139,26,42,0.5)]
  hover:border-[#8b1a2a]
  transition-all duration-300
">
  Enter
</button>`,
    },
    card: {
      name: "卡片",
      description: "哥特萝莉风格卡片",
      code: `<div className="
  p-8
  bg-[#0a0a0a]/90
  border border-[#4a1a4a]/50
  shadow-[0_4px_16px_rgba(74,26,74,0.4)]
">
  <h3 className="text-2xl font-serif text-[#e5e5e5] mb-3">
    Dark Elegance
  </h3>
  <p className="text-[#e5e5e5]/60 font-serif">
    A whisper of lace and shadow
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
- 哥特式拱门`,

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
  ],
};
