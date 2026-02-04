import { DesignStyle } from "./index";

export const watercolorStyle: DesignStyle = {
  slug: "watercolor-style",
  name: "水彩画风",
  nameEn: "Watercolor Style",
  description:
    "灵感源自水彩画的设计风格，柔和的颜色渐变、模糊的边缘效果、纸张质感背景和流动的色彩扩散，传递艺术感与诗意。",
  cover: "/styles/watercolor-style.svg",
  styleType: "visual",
  tags: ["expressive", "minimal"],
  category: "expressive",
  colors: {
    primary: "#4a6fa5",
    secondary: "#faf8f5",
    accent: ["#e8a87c", "#85cdca", "#c38d94", "#d4a373"],
  },
  keywords: ["水彩", "渐变", "柔和", "纸张", "艺术", "流动", "诗意"],

  philosophy: `Watercolor Style 是一种模拟水彩画效果的设计风格，通过柔和的颜色渐变、模糊的边缘和流动的色彩扩散，为界面注入艺术气息和诗意感受。

核心理念：
- 流动感：颜色像水彩一样自然渗透和扩散
- 柔和边缘：没有硬朗的边界线，一切都柔和过渡
- 纸张质感：底层保留水彩纸的温暖纹理
- 透明叠加：水彩的半透明特性，颜色层层叠加`,

  doList: [
    "使用柔和的渐变 bg-gradient-to-* 模拟水彩渗透",
    "使用半透明色彩 opacity 或 rgba 模拟水彩透明",
    "使用大圆角 rounded-3xl 或 rounded-full 柔化边缘",
    "使用温暖的纸张色背景 bg-[#faf8f5]",
    "使用柔和的阴影 shadow-lg 配合低透明度",
    "使用衬线字体增加艺术感",
  ],

  dontList: [
    "禁止使用硬边框 border-4 border-black",
    "禁止使用硬边阴影 shadow-[px_px_0_color]",
    "禁止使用纯黑色背景",
    "禁止使用直角 rounded-none",
    "禁止使用过于饱和或刺眼的颜色",
  ],

  components: {
    button: {
      name: "按钮",
      description: "水彩风格按钮，柔和渐变和模糊边缘",
      code: `<button className="
  px-8 py-4
  bg-gradient-to-r from-[#4a6fa5]/80 to-[#85cdca]/80
  rounded-full
  text-white font-serif
  shadow-lg shadow-[#4a6fa5]/20
  hover:shadow-xl hover:shadow-[#4a6fa5]/30 hover:-translate-y-0.5
  transition-all duration-300
">
  Explore
</button>`,
    },
    card: {
      name: "卡片",
      description: "水彩画风格卡片",
      code: `<div className="
  p-8
  bg-gradient-to-br from-[#e8a87c]/20 via-white to-[#85cdca]/20
  rounded-3xl
  shadow-lg shadow-[#4a6fa5]/10
  border border-[#4a6fa5]/10
  backdrop-blur-sm
">
  <h3 className="text-xl font-serif text-[#4a6fa5] mb-3">
    Watercolor Card
  </h3>
  <p className="text-[#6b7280] leading-relaxed">
    Colors flowing like water on paper
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "水彩风格输入框",
      code: `<input
  type="text"
  placeholder="Write here..."
  className="
    w-full px-5 py-4
    bg-white/60
    border border-[#4a6fa5]/20
    rounded-2xl
    text-[#4a6fa5] placeholder-[#4a6fa5]/40
    font-serif
    focus:outline-none focus:border-[#4a6fa5]/40 focus:bg-white/80
    focus:shadow-lg focus:shadow-[#4a6fa5]/10
    transition-all duration-300
  "
/>`,
    },
    nav: {
      name: "导航栏",
      description: "水彩风格导航栏",
      code: `<nav className="
  px-6 py-4
  bg-gradient-to-r from-[#faf8f5] via-[#e8a87c]/10 to-[#85cdca]/10
  border-b border-[#4a6fa5]/10
">
  <div className="max-w-4xl mx-auto flex items-center justify-between">
    <a href="/" className="text-[#4a6fa5] font-serif text-xl italic">
      Aquarelle
    </a>
    <div className="flex gap-6">
      <a href="#" className="text-[#4a6fa5]/70 hover:text-[#4a6fa5] font-serif transition-colors">
        Gallery
      </a>
      <a href="#" className="text-[#4a6fa5]/70 hover:text-[#4a6fa5] font-serif transition-colors">
        About
      </a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区块",
      description: "水彩风格 Hero 展示区域",
      code: `<section className="
  min-h-screen
  flex flex-col items-center justify-center
  bg-[#faf8f5]
  px-6 py-20
  relative overflow-hidden
">
  <div className="absolute top-20 left-10 w-64 h-64 bg-[#e8a87c]/20 rounded-full blur-3xl" />
  <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#85cdca]/20 rounded-full blur-3xl" />
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c38d94]/10 rounded-full blur-3xl" />
  <h1 className="
    text-4xl md:text-6xl
    font-serif italic
    text-[#4a6fa5]
    mb-4
    relative z-10
  ">
    Watercolor Style
  </h1>
  <p className="text-xl font-serif text-[#6b7280] mb-8 relative z-10">
    Where colors dance and flow freely
  </p>
  <button className="
    relative z-10
    px-8 py-4
    bg-gradient-to-r from-[#4a6fa5]/80 to-[#85cdca]/80
    rounded-full
    text-white font-serif text-lg
    shadow-lg shadow-[#4a6fa5]/20
    hover:shadow-xl hover:shadow-[#4a6fa5]/30
    transition-all duration-300
  ">
    Begin Painting
  </button>
</section>`,
    },
  },

  globalCss: `/* Watercolor Style 全局样式 */

:root {
  --wc-blue: #4a6fa5;
  --wc-paper: #faf8f5;
  --wc-peach: #e8a87c;
  --wc-teal: #85cdca;
  --wc-rose: #c38d94;
  --wc-sand: #d4a373;
}

/* 水彩纸张背景 */
.wc-paper {
  background-color: var(--wc-paper);
}

/* 水彩晕染效果 */
.wc-wash {
  background: radial-gradient(ellipse at 30% 50%, rgba(232, 168, 124, 0.15) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 30%, rgba(133, 205, 202, 0.15) 0%, transparent 60%),
              radial-gradient(ellipse at 50% 80%, rgba(195, 141, 148, 0.1) 0%, transparent 60%);
}

/* 水彩边缘模糊 */
.wc-soft-edge {
  border-radius: 24px;
  box-shadow: 0 8px 30px rgba(74, 111, 165, 0.1);
}

/* 水彩文字 */
.wc-text {
  font-family: 'Georgia', 'Playfair Display', serif;
  font-style: italic;
  color: var(--wc-blue);
}

/* 水彩色块 */
.wc-swatch {
  border-radius: 50%;
  filter: blur(1px);
  opacity: 0.7;
}

/* 水彩卡片 */
.wc-card {
  background: linear-gradient(135deg, rgba(232, 168, 124, 0.15), white, rgba(133, 205, 202, 0.15));
  border-radius: 24px;
  border: 1px solid rgba(74, 111, 165, 0.1);
  box-shadow: 0 8px 30px rgba(74, 111, 165, 0.1);
}

/* 水彩分割线 */
.wc-divider {
  height: 2px;
  background: linear-gradient(to right, transparent, var(--wc-blue), transparent);
  opacity: 0.2;
}`,

  aiRules: `你是一个 Watercolor Style 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用硬边框 border-4 border-black
- 使用硬边阴影 shadow-[px_px_0_color]
- 使用纯黑色背景 bg-black
- 使用直角 rounded-none
- 使用过于饱和的颜色
- 使用粗体无衬线大写文字

## 必须遵守

- 纸张色背景 bg-[#faf8f5]
- 柔和渐变 bg-gradient-to-br 使用半透明色
- 大圆角 rounded-3xl 或 rounded-full
- 柔和阴影 shadow-lg 配合低透明度色彩
- 衬线斜体字体 font-serif italic
- 半透明色彩叠加效果

## 配色

主色调：
- 蓝灰: #4a6fa5 (文字和主要元素)
- 纸张: #faf8f5 (背景)

水彩色（半透明使用）：
- 蜜桃: #e8a87c
- 青绿: #85cdca
- 玫瑰: #c38d94
- 沙色: #d4a373

## 特殊效果

水彩晕染：使用多个 radial-gradient 叠加
色彩扩散：使用 blur-3xl 的大色块
柔和边缘：rounded-3xl + 低透明度边框
纸张纹理：暖色调背景 + 微妙纹理

## 自检

每次生成代码后检查：
1. 没有硬边框和直角
2. 使用柔和的渐变和半透明色
3. 背景是温暖的纸张色
4. 文字使用衬线斜体
5. 整体感觉像水彩画作品`,

  examplePrompts: [
    {
      title: "水彩画廊",
      titleEn: "Watercolor Gallery",
      description: "水彩风格的艺术画廊页面",
      descriptionEn: "Watercolor-style art gallery page",
      prompt: `用 Watercolor Style 风格创建一个艺术画廊页面，要求：
1. 温暖的纸张色背景 #faf8f5
2. 柔和的水彩渐变色块作为装饰
3. 作品卡片使用半透明渐变背景
4. 衬线斜体字体标题
5. 大圆角和柔和阴影
6. 背景使用 blur 模糊色块模拟水彩晕染`,
    },
    {
      title: "水彩个人主页",
      titleEn: "Watercolor Portfolio",
      description: "水彩画风格的个人介绍页",
      descriptionEn: "Watercolor-style personal page",
      prompt: `用 Watercolor Style 风格设计一个个人介绍页，要求：
1. 全屏背景使用多个水彩晕染色块
2. 文字浮在水彩色块之上
3. 导航使用柔和的半透明效果
4. 联系方式卡片使用水彩渐变背景
5. 整体色调温暖柔和，像一幅水彩画`,
    },
  ],
};
