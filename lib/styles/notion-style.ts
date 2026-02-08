import { DesignStyle } from "./index";

export const notionStyle: DesignStyle = {
  slug: "notion-style",
  name: "Notion 风格",
  nameEn: "Notion Style",
  description:
    "极简清爽的文档工具风格，强调内容可读性和功能性，使用微妙的边框、柔和的悬停效果和清晰的文字层级。",
  cover: "/styles/notion-style.svg",
  styleType: "visual",
  tags: ["minimal"],
  category: "minimal",
  colors: {
    primary: "#37352f",
    secondary: "#ffffff",
    accent: ["#2eaadc", "#eb5757", "#0f7b6c"],
  },
  keywords: ["Notion", "文档", "极简", "清爽", "工具", "协作", "笔记"],

  philosophy: `Notion Style 是一种源于 Notion 应用的极简设计风格，强调内容的可读性和功能的直观性。通过微妙的视觉元素和清晰的层级结构，让用户专注于内容本身。

核心理念：
- 内容优先：设计服务于内容，不喧宾夺主
- 功能清晰：每个元素都有明确的功能目的
- 微妙交互：悬停和点击反馈轻柔自然
- 层级分明：通过字体大小和颜色区分信息层级`,

  doList: [
    "使用 Notion 标志性的米色背景 #f7f6f3",
    "使用微妙的边框 border-gray-200",
    "悬停效果使用浅灰背景 hover:bg-gray-100",
    "保持清晰的文字层级",
    "使用系统字体栈确保可读性",
    "图标使用简洁的线性风格",
  ],

  dontList: [
    "禁止使用大圆角 rounded-2xl 或更大",
    "禁止使用渐变背景",
    "禁止使用重阴影",
    "禁止使用过于鲜艳的颜色",
    "禁止过度装饰",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Notion 风格按钮，简洁实用",
      code: `<button className="
  px-3 py-1.5
  bg-white
  border border-gray-200
  rounded-md
  text-sm font-medium text-gray-700
  hover:bg-gray-100
  transition-colors duration-150
">
  Button
</button>`,
    },
    card: {
      name: "卡片",
      description: "Notion 风格卡片，简洁的内容容器",
      code: `<div className="
  p-4
  bg-white
  border border-gray-200
  rounded-lg
  shadow-sm
  hover:shadow-md
  transition-shadow
">
  <h3 className="text-lg font-semibold text-gray-900 mb-2">
    Page Title
  </h3>
  <p className="text-gray-600 text-sm">
    A simple description of the content
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Notion 风格输入框",
      code: `<input
  type="text"
  placeholder="Type something..."
  className="
    w-full px-3 py-2
    bg-white
    border border-gray-200
    rounded-md
    text-gray-900 placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-all
  "
/>`,
    },
    nav: {
      name: "侧边栏",
      description: "Notion 风格侧边导航",
      code: `<aside className="
  w-60 h-screen
  bg-[#f7f6f3]
  border-r border-gray-200
  p-3
">
  <div className="mb-4">
    <button className="w-full px-2 py-1.5 text-left text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors">
      Search
    </button>
  </div>
  <div className="space-y-1">
    <a href="#" className="block px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
      Getting Started
    </a>
    <a href="#" className="block px-2 py-1.5 text-sm text-gray-700 bg-gray-200 rounded-md">
      Quick Note
    </a>
    <a href="#" className="block px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
      Personal Home
    </a>
  </div>
</aside>`,
    },
    hero: {
      name: "页面标题",
      description: "Notion 风格页面标题区域",
      code: `<div className="max-w-3xl mx-auto px-6 py-12">
  <div className="mb-6">
    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 border border-gray-200">
      <div className="h-8 w-8 rounded-lg bg-white border border-gray-300 shadow-sm" />
    </div>
  </div>
  <h1 className="text-4xl font-bold text-gray-900 mb-4">
    Welcome to Notion Style
  </h1>
  <p className="text-lg text-gray-500">
    A clean and minimal design system for documentation and note-taking applications.
  </p>
</div>`,
    },
  },

  globalCss: `/* Notion Style 全局样式 */

:root {
  --notion-text: #37352f;
  --notion-text-gray: #9b9a97;
  --notion-bg: #ffffff;
  --notion-bg-gray: #f7f6f3;
  --notion-blue: #2eaadc;
  --notion-red: #eb5757;
  --notion-green: #0f7b6c;
  --notion-yellow: #dfab01;
  --notion-border: rgba(55, 53, 47, 0.09);
}

/* 基础文字样式 */
body {
  font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif;
  color: var(--notion-text);
  line-height: 1.5;
}

/* Notion 风格链接 */
.notion-link {
  color: var(--notion-text);
  text-decoration: underline;
  text-decoration-color: rgba(55, 53, 47, 0.4);
  text-underline-offset: 2px;
}

.notion-link:hover {
  text-decoration-color: var(--notion-text);
}

/* Notion 风格代码块 */
.notion-code {
  font-family: SFMono-Regular, Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace;
  font-size: 85%;
  background: rgba(135, 131, 120, 0.15);
  border-radius: 3px;
  padding: 0.2em 0.4em;
}

/* Notion 风格分割线 */
.notion-divider {
  border: none;
  border-top: 1px solid var(--notion-border);
  margin: 1rem 0;
}`,

  aiRules: `你是一个 Notion Style 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用大圆角 rounded-2xl, rounded-3xl, rounded-full
- 使用渐变背景 bg-gradient-*
- 使用重阴影 shadow-xl, shadow-2xl
- 使用过于鲜艳的颜色
- 过度装饰和动画

## 必须遵守

- 使用 Notion 米色背景 bg-[#f7f6f3]
- 微妙边框 border border-gray-200
- 小圆角 rounded-md 或 rounded-lg
- 轻柔悬停 hover:bg-gray-100
- 清晰的文字层级

## 配色

主色调：
- 文字: text-[#37352f] (Notion 深灰)
- 背景: bg-white, bg-[#f7f6f3]
- 边框: border-gray-200

强调色：
- 蓝色: text-[#2eaadc], bg-blue-50
- 红色: text-[#eb5757], bg-red-50
- 绿色: text-[#0f7b6c], bg-green-50
- 黄色: text-[#dfab01], bg-yellow-50

## 交互

- 悬停: hover:bg-gray-100 或 hover:bg-gray-200
- 选中: bg-gray-200
- 聚焦: focus:ring-2 focus:ring-blue-500

## 自检

每次生成代码后检查：
1. 没有使用渐变
2. 圆角适中（rounded-md 或 rounded-lg）
3. 阴影轻柔（shadow-sm 或 shadow-md）
4. 整体感觉简洁清爽`,

  examplePrompts: [
    {
      title: "文档页面",
      titleEn: "Documentation Page",
      description: "Notion 风格文档布局",
      descriptionEn: "Notion-style documentation layout",
      prompt: `用 Notion Style 创建一个文档页面，要求：
1. 左侧：固定侧边栏，米色背景，页面列表
2. 右侧：主内容区，白色背景
3. 标题：大号字体，可编辑感
4. 内容块：段落、列表、代码块
5. 悬停效果：微妙的背景色变化`,
    },
    {
      title: "任务看板",
      titleEn: "Task Board",
      description: "Notion 风格看板视图",
      descriptionEn: "Notion-style kanban board",
      prompt: `用 Notion Style 设计一个任务看板，要求：
1. 多列布局：To Do, In Progress, Done
2. 任务卡片：白色背景，微妙边框，小圆角
3. 拖拽指示：悬停时显示抓取光标
4. 添加按钮：简洁的 + 图标
5. 标签：彩色小标签（蓝、红、绿、黄）`,
    },
  ],
};
