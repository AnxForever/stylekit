import { DesignStyle } from "./index";

export const appleStyle: DesignStyle = {
  slug: "apple-style",
  name: "Apple 风格",
  nameEn: "Apple Style",
  description:
    "极致简约的高端设计风格，大量留白、精致圆角、微妙阴影和 SF Pro 风格字体，传达高端科技产品的品质感。",
  cover: "/styles/apple-style.png",
  styleType: "visual",
  tags: ["minimal"],
  category: "minimal",
  colors: {
    primary: "#000000",
    secondary: "#f5f5f7",
    accent: ["#0071e3", "#34c759", "#ff3b30"],
  },
  keywords: ["Apple", "极简", "高端", "科技", "产品", "留白", "精致"],

  philosophy: `Apple Style 是一种源于 Apple 设计语言的极致简约风格，通过大量留白、精致的细节和克制的配色，传达高端科技产品的品质感和信任感。

核心理念：
- 极致简约：去除一切不必要的元素
- 大量留白：让内容呼吸，突出重点
- 精致细节：每个像素都经过精心设计
- 克制配色：黑白灰为主，蓝色点缀`,

  doList: [
    "使用大量留白，让内容呼吸",
    "使用 Apple 灰 #f5f5f7 作为背景",
    "使用 Apple 蓝 #0071e3 作为强调色",
    "使用精致的圆角 rounded-xl 或 rounded-2xl",
    "使用微妙的阴影",
    "使用 SF Pro 风格字体（-apple-system）",
  ],

  dontList: [
    "禁止使用过多颜色",
    "禁止使用渐变背景",
    "禁止使用重阴影",
    "禁止元素过于拥挤",
    "禁止使用花哨的装饰",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Apple 风格按钮，简洁精致",
      code: `<button className="
  px-6 py-3
  bg-[#0071e3]
  rounded-full
  text-white font-medium
  hover:bg-[#0077ed]
  transition-colors duration-200
">
  Buy
</button>`,
    },
    card: {
      name: "卡片",
      description: "Apple 风格产品卡片",
      code: `<div className="
  p-8
  bg-white
  rounded-2xl
  shadow-[0_4px_12px_rgba(0,0,0,0.08)]
  text-center
">
  <div className="w-48 h-48 mx-auto mb-6 bg-[#f5f5f7] rounded-2xl flex items-center justify-center">
    <span className="text-6xl text-gray-300">Product</span>
  </div>
  <h3 className="text-2xl font-semibold text-black mb-2">
    iPhone 15 Pro
  </h3>
  <p className="text-gray-500 mb-4">
    Titanium. So strong. So light. So Pro.
  </p>
  <p className="text-lg font-medium text-black">
    From $999
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Apple 风格输入框",
      code: `<input
  type="text"
  placeholder="Search"
  className="
    w-full px-4 py-3
    bg-[#f5f5f7]
    rounded-xl
    text-black placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-[#0071e3]
    transition-all
  "
/>`,
    },
    nav: {
      name: "导航栏",
      description: "Apple 风格导航栏",
      code: `<nav className="
  px-6 py-3
  bg-white/80
  backdrop-blur-xl
  border-b border-gray-200/50
">
  <div className="max-w-5xl mx-auto flex items-center justify-between">
    <a href="/" className="text-black">
      <svg className="w-5 h-5" viewBox="0 0 17 21" fill="currentColor">
        <path d="M8.5 0C5.5 0 3.5 2 3.5 5c0 2 1 3.5 2.5 4.5-1.5 1-2.5 3-2.5 5.5 0 3.5 2.5 6 6 6s6-2.5 6-6c0-2.5-1-4.5-2.5-5.5 1.5-1 2.5-2.5 2.5-4.5 0-3-2-5-5-5z"/>
      </svg>
    </a>
    <div className="flex items-center gap-8">
      <a href="#" className="text-xs text-black hover:text-gray-500 transition-colors">
        Store
      </a>
      <a href="#" className="text-xs text-black hover:text-gray-500 transition-colors">
        Mac
      </a>
      <a href="#" className="text-xs text-black hover:text-gray-500 transition-colors">
        iPhone
      </a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区块",
      description: "Apple 风格产品展示区域",
      code: `<section className="
  min-h-screen
  flex flex-col items-center justify-center
  bg-black
  text-white
  px-6 py-20
">
  <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-center mb-4">
    iPhone 15 Pro
  </h1>
  <h2 className="text-2xl md:text-3xl text-gray-400 font-medium text-center mb-8">
    Titanium. So strong. So light. So Pro.
  </h2>
  <div className="flex gap-6 mb-12">
    <a href="#" className="text-[#2997ff] hover:underline">
      Learn more &gt;
    </a>
    <a href="#" className="text-[#2997ff] hover:underline">
      Buy &gt;
    </a>
  </div>
  <div className="w-full max-w-4xl aspect-video bg-gray-900 rounded-3xl flex items-center justify-center">
    <span className="text-gray-600 text-2xl">Product Image</span>
  </div>
</section>`,
    },
  },

  globalCss: `/* Apple Style 全局样式 */

:root {
  --apple-black: #000000;
  --apple-white: #ffffff;
  --apple-gray: #f5f5f7;
  --apple-blue: #0071e3;
  --apple-blue-hover: #0077ed;
  --apple-green: #34c759;
  --apple-red: #ff3b30;
}

/* Apple 风格字体 */
body {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Apple 风格标题 */
.apple-headline {
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

/* Apple 风格链接 */
.apple-link {
  color: var(--apple-blue);
  text-decoration: none;
}

.apple-link:hover {
  text-decoration: underline;
}

/* Apple 风格按钮 */
.apple-button {
  background: var(--apple-blue);
  color: white;
  border-radius: 9999px;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.apple-button:hover {
  background: var(--apple-blue-hover);
}

/* Apple 风格卡片 */
.apple-card {
  background: white;
  border-radius: 18px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}`,

  aiRules: `你是一个 Apple Style 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用渐变背景
- 使用过多颜色（超过 3 种）
- 使用重阴影 shadow-xl, shadow-2xl
- 元素过于拥挤
- 使用花哨的装饰和动画

## 必须遵守

- 大量留白
- Apple 灰背景 bg-[#f5f5f7]
- Apple 蓝强调 text-[#0071e3], bg-[#0071e3]
- 精致圆角 rounded-xl, rounded-2xl, rounded-full
- 微妙阴影 shadow-[0_4px_12px_rgba(0,0,0,0.08)]
- SF Pro 风格字体

## 配色

主色调：
- 黑色: text-black, bg-black
- 白色: text-white, bg-white
- Apple 灰: bg-[#f5f5f7]

强调色：
- Apple 蓝: #0071e3
- Apple 绿: #34c759
- Apple 红: #ff3b30

## 字体

- 标题: font-semibold tracking-tight
- 正文: font-normal
- 链接: text-[#0071e3] hover:underline

## 布局

- 最大宽度: max-w-5xl 或 max-w-[980px]
- 大量留白: py-20, py-24
- 居中对齐: text-center, mx-auto

## 自检

每次生成代码后检查：
1. 留白足够大
2. 配色克制（黑白灰 + 蓝色点缀）
3. 没有渐变
4. 整体感觉高端简约`,

  examplePrompts: [
    {
      title: "产品展示页",
      titleEn: "Product Page",
      description: "Apple 风格产品介绍",
      descriptionEn: "Apple-style product showcase",
      prompt: `用 Apple Style 创建一个产品展示页面，要求：
1. Hero：全屏黑色背景，大标题居中，产品图片
2. 特性区：白色背景，大量留白，图文交替
3. 规格区：Apple 灰背景，简洁的参数列表
4. 购买区：价格、颜色选择、购买按钮
5. 整体：极简、高端、大量留白`,
    },
    {
      title: "服务页面",
      titleEn: "Services Page",
      description: "Apple 风格服务介绍",
      descriptionEn: "Apple-style services page",
      prompt: `用 Apple Style 设计一个服务介绍页面，要求：
1. 标题区：简洁有力的标题和副标题
2. 服务卡片：白色背景，圆角，微妙阴影
3. 定价区：清晰的价格对比
4. CTA：Apple 蓝按钮，圆角胶囊形状
5. 整体：专业、可信、简约`,
    },
  ],
};
