import { DesignStyle } from "./index";

export const artDeco: DesignStyle = {
  slug: "art-deco",
  name: "装饰艺术风格",
  nameEn: "Art Deco",
  description:
    "1920-30年代的奢华设计风格，几何对称图案、金色装饰、优雅线条和高端质感，传达精致与繁荣。",
  cover: "/styles/art-deco.svg",
  styleType: "visual",
  tags: ["retro", "expressive"],
  category: "retro",
  colors: {
    primary: "#d4af37",
    secondary: "#1a1a2e",
    accent: ["#c9a227", "#2d2d44", "#f5f5dc"],
  },
  keywords: ["装饰艺术", "奢华", "金色", "几何", "1920年代", "优雅", "高端"],

  philosophy: `Art Deco（装饰艺术）是1920-30年代流行的设计风格，融合了现代主义的几何形式与传统工艺的奢华感。

核心理念：
- 几何对称：放射状线条、重复几何图案
- 奢华感：金色、黑色、深蓝的高端配色
- 精致工艺：细腻的线条和装饰细节
- 现代与传统：机械时代美学与古典优雅的结合`,

  doList: [
    "使用金色和深色的高对比配色",
    "添加几何对称图案和放射状线条",
    "使用优雅的衬线字体",
    "添加金色边框和装饰线",
    "保持对称和平衡的布局",
    "使用细腻的线条装饰",
  ],

  dontList: [
    "禁止使用过于鲜艳的配色",
    "禁止使用不对称的混乱布局",
    "禁止使用过于现代的无衬线字体",
    "禁止省略装饰性元素",
  ],

  components: {
    button: {
      name: "按钮",
      description: "装饰艺术风格按钮",
      code: `<button className="
  px-10 py-4
  bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600
  text-black font-semibold uppercase tracking-[0.3em]
  border-2 border-yellow-400
  shadow-[0_0_20px_rgba(212,175,55,0.3)]
  hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]
  hover:bg-gradient-to-r hover:from-yellow-500 hover:via-yellow-400 hover:to-yellow-500
  transition-all duration-300
">
  Discover
</button>`,
    },
    card: {
      name: "卡片",
      description: "装饰艺术风格卡片",
      code: `<div className="
  relative p-8
  bg-gradient-to-b from-slate-900 to-slate-800
  border border-yellow-600/50
">
  {/* Corner decorations */}
  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-500" />
  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-yellow-500" />
  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-yellow-500" />
  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-500" />

  <h3 className="text-2xl font-serif text-yellow-500 text-center mb-4 tracking-wider">
    ELEGANCE
  </h3>
  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-4" />
  <p className="text-gray-400 text-center">
    Timeless sophistication
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "装饰艺术风格输入框",
      code: `<input
  type="text"
  placeholder="Enter your name..."
  className="
    w-full px-6 py-4
    bg-slate-900
    border border-yellow-600/50
    text-yellow-100 placeholder-yellow-600/50
    font-serif tracking-wider
    focus:border-yellow-500
    focus:shadow-[0_0_15px_rgba(212,175,55,0.2)]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "装饰艺术风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
  relative overflow-hidden
">
  {/* Radial lines decoration */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent origin-left"
          style={{ transform: \`rotate(\${i * 30}deg)\` }}
        />
      ))}
    </div>
  </div>

  <div className="relative z-10 text-center px-6">
    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
    <h1 className="text-5xl md:text-7xl font-serif text-yellow-500 mb-6 tracking-[0.2em]">
      ART DECO
    </h1>
    <p className="text-xl text-gray-400 mb-8 tracking-wider">
      The Golden Age of Design
    </p>
    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
    <button className="
      px-12 py-4
      bg-transparent
      border-2 border-yellow-500
      text-yellow-500 font-serif uppercase tracking-[0.3em]
      hover:bg-yellow-500 hover:text-slate-900
      transition-all duration-300
    ">
      Enter
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Art Deco 全局样式 */

:root {
  --deco-gold: #d4af37;
  --deco-dark: #1a1a2e;
  --deco-navy: #2d2d44;
  --deco-cream: #f5f5dc;
}

/* 金色渐变 */
.deco-gold {
  background: linear-gradient(135deg, #d4af37 0%, #f5d67a 50%, #d4af37 100%);
}

/* 放射状线条 */
.deco-sunburst {
  background-image: repeating-conic-gradient(
    from 0deg,
    transparent 0deg 15deg,
    rgba(212, 175, 55, 0.1) 15deg 30deg
  );
}

/* 几何边框 */
.deco-border {
  border: 1px solid var(--deco-gold);
  position: relative;
}

.deco-border::before,
.deco-border::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid var(--deco-gold);
}

.deco-border::before {
  top: -5px;
  left: -5px;
  border-right: none;
  border-bottom: none;
}

.deco-border::after {
  bottom: -5px;
  right: -5px;
  border-left: none;
  border-top: none;
}

/* 装饰分隔线 */
.deco-divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--deco-gold), transparent);
}`,

  aiRules: `你是一个 Art Deco 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用过于鲜艳的现代配色
- 使用不对称的混乱布局
- 使用圆润的现代字体
- 省略装饰性边框和线条

## 必须遵守

- 金色配色 text-yellow-500, border-yellow-500
- 深色背景 bg-slate-900, bg-slate-800
- 衬线字体 font-serif
- 宽字距 tracking-wider, tracking-[0.3em]
- 对称布局和居中对齐
- 几何装饰元素

## 配色

主色调：
- 金色: #d4af37, text-yellow-500, border-yellow-500
- 深蓝: #1a1a2e, bg-slate-900
- 海军蓝: #2d2d44, bg-slate-800
- 奶油色: #f5f5dc

## 装饰元素

- 角落装饰边框
- 放射状线条
- 渐变分隔线
- 几何图案`,

  examplePrompts: [
    {
      title: "奢侈品牌官网",
      titleEn: "Luxury Brand Website",
      description: "高端奢华的品牌网站",
      descriptionEn: "High-end luxury brand website",
      prompt: `用 Art Deco 风格创建一个奢侈品牌官网，要求：
1. 背景：深色渐变
2. 标题：金色衬线字体 + 宽字距
3. 装饰：放射状线条 + 角落边框
4. 按钮：金色边框 + 悬停填充
5. 整体对称优雅`,
    },
  ],
};
