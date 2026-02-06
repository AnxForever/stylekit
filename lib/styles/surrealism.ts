import { DesignStyle } from "./index";

export const surrealism: DesignStyle = {
  slug: "surrealism",
  name: "超现实主义风",
  nameEn: "Surrealism",
  description:
    "灵感源自Dali等超现实主义大师，梦境般的场景构成、不合逻辑的空间关系、融化变形的形态和意想不到的色彩组合，营造神秘而引人入胜的视觉体验。",
  cover: "/styles/surrealism.svg",
  styleType: "visual",
  tags: ["expressive", "retro"],
  category: "expressive",
  colors: {
    primary: "#1a1a3e",
    secondary: "#f0ece4",
    accent: ["#d4a574", "#c38d94", "#4a3f6b"],
  },
  keywords: ["超现实", "梦境", "Dali", "融化", "不合逻辑", "潜意识", "奇幻"],

  philosophy: `Surrealism（超现实主义）是20世纪初的艺术运动，致力于释放潜意识的创造力，打破理性与非理性的界限。

核心理念：
- 梦境逻辑：超越现实的视觉叙事
- 意外并置：不相关元素的奇妙组合
- 变形流动：融化、扭曲的形态
- 潜意识探索：深层心理的视觉表达`,

  doList: [
    "使用午夜蓝和沙漠金的配色",
    "创造梦境般的柔和渐变",
    "使用意想不到的元素组合",
    "添加柔和的阴影营造深度",
    "使用衬线字体和斜体",
    "保持神秘而优雅的氛围",
  ],

  dontList: [
    "禁止使用过于明亮的纯色",
    "禁止使用严格对称的网格布局",
    "禁止使用现代简约的无装饰设计",
    "禁止使用刺眼的霓虹色彩",
  ],

  components: {
    button: {
      name: "按钮",
      description: "超现实主义风格按钮",
      code: `<button className="
  px-8 py-4
  bg-gradient-to-r from-[#1a1a3e] to-[#c38d94]
  text-[#f0ece4] font-serif italic tracking-wide
  border border-[#d4a574]/50
  rounded-lg shadow-lg
  hover:shadow-[0_8px_30px_rgba(195,141,148,0.4)]
  hover:scale-105
  transition-all duration-500
">
  Enter the Dream
</button>`,
    },
    card: {
      name: "卡片",
      description: "超现实主义风格卡片",
      code: `<div className="
  p-8
  bg-gradient-to-br from-[#f0ece4] to-[#f0ece4]/80
  border border-[#d4a574]/30
  rounded-2xl shadow-lg
">
  <h3 className="text-2xl font-serif italic text-[#1a1a3e] mb-3">
    The Persistence of Memory
  </h3>
  <p className="text-[#1a1a3e]/60 font-serif">
    Time melts in the desert of consciousness
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "超现实主义风格输入框",
      code: `<input
  type="text"
  placeholder="Whisper your dreams..."
  className="
    w-full px-6 py-4
    bg-[#f0ece4]
    border border-[#d4a574]/40
    rounded-lg
    text-[#1a1a3e] placeholder-[#c38d94]/50
    font-serif italic
    focus:border-[#c38d94]
    focus:shadow-[0_0_16px_rgba(195,141,148,0.3)]
    focus:outline-none
    transition-all duration-500
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "超现实主义风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-[#1a1a3e] via-[#2a2a5e] to-[#d4a574]/30
  relative overflow-hidden
">
  <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#d4a574]/20 blur-3xl" />
  <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-[#c38d94]/20 blur-3xl" />

  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-serif italic text-[#f0ece4] mb-6">
      Surrealism
    </h1>
    <p className="text-xl text-[#d4a574] font-serif italic mb-8">
      Beyond the threshold of consciousness
    </p>
    <button className="
      px-10 py-4
      bg-gradient-to-r from-[#c38d94] to-[#d4a574]
      text-[#1a1a3e] font-serif italic tracking-wide
      rounded-lg shadow-lg
      hover:shadow-[0_8px_30px_rgba(212,165,116,0.5)]
      transition-all duration-500
    ">
      Descend
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Surrealism 全局样式 */

:root {
  --sr-midnight: #1a1a3e;
  --sr-gold: #d4a574;
  --sr-rose: #c38d94;
  --sr-cream: #f0ece4;
}

/* 梦境模糊光晕 */
.sr-dream-glow {
  box-shadow:
    0 0 40px rgba(212, 165, 116, 0.2),
    0 0 80px rgba(195, 141, 148, 0.1);
}

/* 超现实渐变 */
.sr-gradient {
  background: linear-gradient(
    135deg,
    var(--sr-midnight) 0%,
    #2a2a5e 40%,
    var(--sr-rose) 70%,
    var(--sr-gold) 100%
  );
}

/* 融化效果 */
.sr-melt {
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}

/* 飘浮阴影 */
.sr-float-shadow {
  box-shadow:
    0 20px 60px rgba(26, 26, 62, 0.3),
    0 0 40px rgba(195, 141, 148, 0.15);
}`,

  aiRules: `你是一个 Surrealism 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用纯白色背景
- 使用严格对称的网格布局
- 使用明亮的霓虹色彩
- 使用过于规整的几何形状

## 必须遵守

- 午夜蓝 #1a1a3e 为深色基调
- 沙漠金 #d4a574 和玫瑰粉 #c38d94 为强调色
- 奶油白 #f0ece4 为浅色背景
- 使用 font-serif italic 营造梦幻感
- 柔和的渐变和模糊光晕效果

## 配色

主色调：
- 午夜蓝: #1a1a3e
- 沙漠金: #d4a574
- 玫瑰粉: #c38d94
- 奶油白: #f0ece4

## 特殊元素

- 模糊光晕背景装饰
- 非对称布局和有机形状
- 柔和的过渡动画 (duration-500)
- 意想不到的颜色渐变组合`,

  examplePrompts: [
    {
      title: "梦境画廊",
      titleEn: "Dreamscape Gallery",
      description: "超现实主义风格的艺术画廊",
      descriptionEn: "Surrealist art gallery",
      prompt: `用 Surrealism 风格创建一个梦境画廊页面，要求：
1. 背景：午夜蓝到沙漠金的渐变
2. 标题：衬线斜体，奶油白色
3. 卡片：圆角带光晕阴影
4. 添加模糊光球装饰
5. 整体梦境般的神秘氛围`,
    },
  ],
};
