import { DesignStyle } from "./index";

export const bauhaus: DesignStyle = {
  slug: "bauhaus",
  name: "包豪斯风格",
  nameEn: "Bauhaus",
  description:
    "德国包豪斯学派的设计理念，强调功能主义、几何形式和原色运用，形式追随功能的现代主义经典。",
  cover: "/styles/bauhaus.svg",
  styleType: "visual",
  tags: ["modern", "minimal", "high-contrast"],
  category: "modern",
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    accent: ["#ff0000", "#ffcc00", "#0000ff"],
  },
  keywords: ["包豪斯", "功能主义", "几何", "原色", "现代主义", "极简"],

  philosophy: `Bauhaus（包豪斯）是1919年在德国创立的设计学派，其核心理念"形式追随功能"深刻影响了现代设计。

核心理念：
- 功能主义：设计服务于功能，去除多余装饰
- 几何形式：圆形、方形、三角形的纯粹运用
- 原色运用：红、黄、蓝三原色 + 黑白
- 统一性：艺术与工艺的结合`,

  doList: [
    "使用原色（红、黄、蓝）+ 黑白",
    "运用基础几何形状（圆、方、三角）",
    "保持简洁的功能性设计",
    "使用无衬线字体",
    "强调网格和对齐",
    "去除不必要的装饰",
  ],

  dontList: [
    "禁止使用复杂的渐变",
    "禁止使用装饰性元素",
    "禁止使用衬线字体",
    "禁止使用非原色的复杂配色",
  ],

  components: {
    button: {
      name: "按钮",
      description: "包豪斯风格按钮",
      code: `<button className="
  px-8 py-4
  bg-red-600
  text-white font-bold uppercase tracking-wider
  hover:bg-black
  transition-colors duration-200
">
  Action
</button>`,
    },
    card: {
      name: "卡片",
      description: "包豪斯风格卡片",
      code: `<div className="
  relative p-8
  bg-white
  border-4 border-black
">
  {/* Geometric decoration */}
  <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-400 rounded-full" />
  <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-blue-600" />

  <h3 className="text-2xl font-bold text-black uppercase tracking-wider mb-4">
    Form
  </h3>
  <p className="text-gray-700">
    Follows function
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "包豪斯风格输入框",
      code: `<input
  type="text"
  placeholder="Type here"
  className="
    w-full px-6 py-4
    bg-white
    border-4 border-black
    text-black font-medium placeholder-gray-400
    focus:border-red-600
    focus:outline-none
    transition-colors
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "包豪斯风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center
  bg-white
  relative overflow-hidden
">
  {/* Geometric shapes */}
  <div className="absolute top-20 right-20 w-48 h-48 bg-yellow-400 rounded-full" />
  <div className="absolute bottom-20 right-40 w-32 h-32 bg-blue-600" />
  <div className="absolute top-40 right-60 w-0 h-0 border-l-[60px] border-l-transparent border-b-[100px] border-b-red-600 border-r-[60px] border-r-transparent" />

  <div className="relative z-10 px-12 max-w-2xl">
    <h1 className="text-7xl md:text-9xl font-black text-black uppercase leading-none mb-8">
      BAU
      <br />
      HAUS
    </h1>
    <p className="text-xl text-gray-700 mb-8 max-w-md">
      Form follows function. Less is more.
    </p>
    <button className="
      px-10 py-4
      bg-black
      text-white font-bold uppercase tracking-wider
      hover:bg-red-600
      transition-colors
    ">
      Explore
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Bauhaus 全局样式 */

:root {
  --bauhaus-red: #ff0000;
  --bauhaus-yellow: #ffcc00;
  --bauhaus-blue: #0000ff;
  --bauhaus-black: #000000;
  --bauhaus-white: #ffffff;
}

/* 原色类 */
.bauhaus-red { background-color: var(--bauhaus-red); }
.bauhaus-yellow { background-color: var(--bauhaus-yellow); }
.bauhaus-blue { background-color: var(--bauhaus-blue); }

/* 几何形状 */
.bauhaus-circle {
  border-radius: 50%;
}

.bauhaus-triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 86px solid var(--bauhaus-red);
}

/* 网格系统 */
.bauhaus-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}`,

  aiRules: `你是一个 Bauhaus 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用复杂的渐变效果
- 使用装饰性元素
- 使用衬线字体
- 使用非原色的复杂配色

## 必须遵守

- 原色配色 bg-red-600, bg-yellow-400, bg-blue-600
- 黑白基础 bg-black, bg-white, text-black
- 粗边框 border-4 border-black
- 无衬线字体 font-bold, font-black
- 大写字母 uppercase
- 几何形状装饰

## 配色

仅使用：
- 红色: #ff0000, bg-red-600
- 黄色: #ffcc00, bg-yellow-400
- 蓝色: #0000ff, bg-blue-600
- 黑色: #000000, bg-black
- 白色: #ffffff, bg-white

## 几何元素

- 圆形 rounded-full
- 方形（无圆角）
- 三角形（用 border 实现）`,

  examplePrompts: [
    {
      title: "设计学院官网",
      titleEn: "Design School Website",
      description: "现代主义设计学院网站",
      descriptionEn: "Modernist design school website",
      prompt: `用 Bauhaus 风格创建一个设计学院官网，要求：
1. 配色：仅使用红黄蓝 + 黑白
2. 几何装饰：圆形、方形、三角形
3. 字体：粗体无衬线 + 大写
4. 布局：网格对齐
5. 去除所有装饰性元素`,
    },
  ],
};
