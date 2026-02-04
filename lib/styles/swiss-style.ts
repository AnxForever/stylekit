import { DesignStyle } from "./index";

export const swissStyle: DesignStyle = {
  slug: "swiss-style",
  name: "瑞士国际风格",
  nameEn: "Swiss International",
  description:
    "源于瑞士的理性主义设计风格，强调网格系统、无衬线字体、清晰层次和客观信息传达，是现代平面设计的基石。",
  cover: "/styles/swiss-style.svg",
  styleType: "visual",
  tags: ["modern", "minimal"],
  category: "modern",
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    accent: ["#ff0000", "#0057b8", "#ffcc00"],
  },
  keywords: ["瑞士", "国际主义", "网格", "Helvetica", "理性", "排版", "极简"],

  philosophy: `Swiss International Style（瑞士国际风格）是20世纪50年代在瑞士发展起来的设计运动，强调清晰、客观、理性的视觉传达。

核心理念：
- 网格系统：严格的数学网格控制布局
- 无衬线字体：Helvetica 等清晰易读的字体
- 负空间：大量留白增强可读性
- 客观传达：设计服务于信息，而非装饰`,

  doList: [
    "使用严格的网格系统",
    "选用 Helvetica 或类似的无衬线字体",
    "保持大量负空间",
    "使用黑白为主的配色",
    "文字左对齐，避免居中",
    "使用简洁的几何图形",
  ],

  dontList: [
    "禁止使用装饰性元素",
    "禁止使用衬线字体作为正文",
    "禁止过度装饰或渐变",
    "禁止打破网格系统",
  ],

  components: {
    button: {
      name: "按钮",
      description: "瑞士风格按钮",
      code: `<button className="
  px-6 py-3
  bg-black
  text-white text-sm font-medium uppercase tracking-[0.2em]
  hover:bg-red-600
  transition-colors duration-200
">
  Action
</button>`,
    },
    card: {
      name: "卡片",
      description: "瑞士风格卡片",
      code: `<div className="
  p-8
  bg-white
  border-l-4 border-black
">
  <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-2">
    Category
  </p>
  <h3 className="text-2xl font-bold text-black mb-4">
    Helvetica Neue
  </h3>
  <p className="text-gray-700 leading-relaxed">
    Clean, objective, rational design principles.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "瑞士风格输入框",
      code: `<div>
  <label className="block text-xs font-medium uppercase tracking-[0.2em] text-gray-500 mb-2">
    Email
  </label>
  <input
    type="text"
    placeholder="your@email.com"
    className="
      w-full px-0 py-2
      bg-transparent
      border-0 border-b-2 border-black
      text-black
      focus:outline-none focus:border-red-600
      transition-colors
    "
  />
</div>`,
    },
    hero: {
      name: "Hero 区块",
      description: "瑞士风格 Hero",
      code: `<section className="
  min-h-screen
  bg-white
  px-8 py-20
  grid grid-cols-12 gap-8
">
  <div className="col-span-8">
    <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-4">
      International Style
    </p>
    <h1 className="text-7xl md:text-9xl font-bold text-black leading-none mb-8">
      Swiss
      <br />
      Design
    </h1>
    <p className="text-xl text-gray-700 max-w-md leading-relaxed mb-8">
      The grid is the foundation. Typography is the voice. Clarity is the goal.
    </p>
    <button className="px-8 py-4 bg-black text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-red-600 transition-colors">
      Explore
    </button>
  </div>
  <div className="col-span-4 flex items-center justify-center">
    <div className="w-32 h-32 bg-red-600" />
  </div>
</section>`,
    },
  },

  globalCss: `/* Swiss International Style 全局样式 */

:root {
  --swiss-black: #000000;
  --swiss-white: #ffffff;
  --swiss-red: #ff0000;
  --swiss-blue: #0057b8;
}

/* 网格系统 */
.swiss-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

/* 标题样式 */
.swiss-heading {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 0.9;
}

/* 标签样式 */
.swiss-label {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #6b7280;
}

/* 左边框强调 */
.swiss-accent {
  border-left: 4px solid var(--swiss-black);
  padding-left: 1.5rem;
}`,

  aiRules: `你是一个 Swiss International Style 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用装饰性元素
- 使用衬线字体
- 过度装饰或渐变效果
- 打破网格系统

## 必须遵守

- 12列网格系统 grid-cols-12
- 无衬线字体 font-sans
- 大量留白 p-8, gap-8
- 黑白为主 bg-black, text-white, bg-white, text-black
- 红色强调 bg-red-600, text-red-600
- 大写标签 uppercase tracking-[0.2em]
- 左对齐文本

## 配色

仅使用：
- 黑色: #000000
- 白色: #ffffff
- 红色: #ff0000 (强调色)
- 蓝色: #0057b8 (可选强调)

## 排版

- 标题：超大字号、粗体、紧凑行高
- 标签：小号、大写、宽字距
- 正文：适中字号、充足行高`,

  examplePrompts: [
    {
      title: "设计工作室官网",
      titleEn: "Design Studio Website",
      description: "极简理性的设计工作室网站",
      descriptionEn: "Minimal rational design studio website",
      prompt: `用 Swiss International Style 创建一个设计工作室官网，要求：
1. 布局：严格的12列网格
2. 字体：无衬线字体，大标题
3. 配色：黑白为主，红色点缀
4. 大量留白
5. 简洁的几何装饰`,
    },
  ],
};
