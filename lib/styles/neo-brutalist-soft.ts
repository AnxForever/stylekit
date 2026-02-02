import { DesignStyle } from "./index";

export const neoBrutalistSoft: DesignStyle = {
  slug: "neo-brutalist-soft",
  name: "柔和野兽派",
  nameEn: "Neo-Brutalist Soft",
  description:
    "Neo-Brutalist 的温和版本。保留硬边缘阴影和无圆角特性，但使用更柔和的配色、较细的边框和更温和的对比度。",
  cover: "/styles/neo-brutalist-soft.png",
  category: "expressive",
  colors: {
    primary: "#1a1a1a",
    secondary: "#f5f5f5",
    accent: ["#f472b6", "#a3e635", "#38bdf8", "#fbbf24"],
  },
  keywords: ["柔和野兽派", "温和对比", "浅色阴影", "细边框", "淡彩"],

  philosophy: `Neo-Brutalist Soft（柔和野兽派）是原版 Neo-Brutalist 的温和变体。它保留了核心的结构特征——无圆角、硬边缘阴影、hover 位移效果——但通过以下方式软化了视觉冲击：

调整策略：
- 边框从 4px 减为 2px
- 阴影颜色使用灰色而非纯黑
- 配色使用柔和的马卡龙色调
- 对比度适度降低，更护眼

适用场景：需要野兽派风格但目标用户偏好温和视觉的产品`,

  doList: [
    "保持无圆角 rounded-none",
    "使用较细边框 border-2 border-gray-800（非纯黑）",
    "使用灰色阴影 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]",
    "配色使用柔和版本（如 pink-400 而非 #ff006e）",
    "hover 阴影消失 + 位移效果保留",
    "背景使用浅灰 bg-gray-50 而非纯白",
    "文字使用深灰 text-gray-800 而非纯黑",
  ],

  dontList: [
    "禁止圆角",
    "禁止模糊阴影 shadow-lg",
    "禁止纯黑边框 border-black",
    "禁止高饱和度的纯色",
    "禁止纯黑背景",
    "禁止渐变",
  ],

  components: {
    button: {
      name: "按钮",
      description: "柔和版 Brutal 按钮",
      code: `<button className="
  bg-pink-400 text-white font-bold
  px-4 py-2 md:px-6 md:py-3
  border-2 border-gray-800
  shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
  md:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]
  hover:shadow-none
  hover:translate-x-[2px] hover:translate-y-[2px]
  transition-all
  text-sm md:text-base
">
  柔和按钮
</button>

{/* 次要按钮 */}
<button className="
  bg-gray-50 text-gray-800 font-bold
  px-4 py-2 md:px-6 md:py-3
  border-2 border-gray-800
  shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]
  hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
  hover:bg-lime-300
  transition-all
">
  次要按钮
</button>`,
    },
    card: {
      name: "卡片",
      description: "柔和阴影的卡片",
      code: `<div className="
  bg-white
  border-2 border-gray-800
  shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]
  md:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)]
  hover:shadow-[6px_6px_0px_0px_rgba(244,114,182,0.4)]
  md:hover:shadow-[8px_8px_0px_0px_rgba(244,114,182,0.4)]
  hover:-translate-y-1
  transition-all duration-300
  p-4 md:p-6
">
  <h3 className="font-bold text-lg md:text-xl text-gray-800 mb-2">卡片标题</h3>
  <p className="font-mono text-sm md:text-base text-gray-600">
    柔和的卡片描述文字
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "柔和边框的输入框",
      code: `<input
  type="text"
  placeholder="请输入..."
  className="
    w-full
    px-3 py-2 md:px-4 md:py-3
    border-2 border-gray-800
    bg-gray-50
    font-mono text-sm md:text-base text-gray-800
    focus:outline-none
    focus:shadow-[4px_4px_0px_0px_rgba(56,189,248,0.3)]
    transition-shadow
    placeholder:text-gray-400
  "
/>`,
    },
    nav: {
      name: "导航栏",
      description: "柔和风格的导航",
      code: `<nav className="
  bg-gray-50
  border-b-2 border-gray-800
  px-4 md:px-8
  py-3 md:py-4
">
  <div className="flex items-center justify-between max-w-6xl mx-auto">
    <a href="/" className="font-bold text-lg md:text-xl text-gray-800">
      LOGO
    </a>
    <div className="flex gap-4 md:gap-8">
      <a href="#" className="font-mono text-sm md:text-base text-gray-600 hover:text-pink-500 transition-colors">
        首页
      </a>
      <a href="#" className="font-mono text-sm md:text-base text-gray-600 hover:text-pink-500 transition-colors">
        关于
      </a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区块",
      description: "柔和配色的 Hero",
      code: `<section className="
  min-h-[60vh] md:min-h-[80vh]
  flex items-center
  px-4 md:px-8
  py-12 md:py-0
  bg-lime-200
  border-b-2 border-gray-800
">
  <div className="max-w-4xl mx-auto">
    <h1 className="
      font-bold
      text-3xl md:text-5xl lg:text-7xl
      leading-tight
      text-gray-800
      mb-4 md:mb-6
    ">
      柔和的<br />
      野兽派
    </h1>
    <p className="
      font-mono
      text-base md:text-lg
      text-gray-700
      max-w-xl
      mb-6 md:mb-8
    ">
      保留结构，软化视觉
    </p>
    <button className="
      bg-gray-800 text-white font-bold
      px-6 py-3 md:px-8 md:py-4
      border-2 border-gray-800
      shadow-[4px_4px_0px_0px_rgba(244,114,182,0.5)]
      hover:shadow-none
      hover:translate-x-[2px] hover:translate-y-[2px]
      transition-all
    ">
      开始探索
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Neo-Brutalist Soft 全局样式 */
:root {
  --soft-pink: #f472b6;
  --soft-green: #a3e635;
  --soft-blue: #38bdf8;
  --soft-yellow: #fbbf24;
  --soft-bg: #f5f5f5;
  --soft-text: #1a1a1a;
  --soft-border: #1f2937;
}

body {
  background: var(--soft-bg);
  color: var(--soft-text);
}

/* 标题字体 - 粗体但非极黑 */
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  letter-spacing: -0.01em;
}

/* 正文字体 */
body {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

/* 选中文字 - 柔和粉色 */
::selection {
  background: var(--soft-pink);
  color: white;
}`,

  aiRules: `你是一个 Neo-Brutalist Soft（柔和野兽派）设计风格的前端开发专家。这是 Neo-Brutalist 的温和版本。

## 核心保留

- 无圆角 rounded-none
- 硬边缘阴影（但用灰色/半透明）
- hover 位移效果

## 调整规则

边框：
- 使用 border-2（非 border-4）
- 使用 border-gray-800（非 border-black）

阴影：
- 使用 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
- 彩色阴影用半透明：rgba(244,114,182,0.4)

配色：
- 背景：#f5f5f5（浅灰）
- 文字：#1a1a1a（深灰非纯黑）
- 粉色：#f472b6（pink-400）
- 绿色：#a3e635（lime-400）
- 蓝色：#38bdf8（sky-400）
- 黄色：#fbbf24（amber-400）

## 禁止

- 纯黑边框 border-black
- 纯黑阴影 rgba(0,0,0,1)
- 高饱和纯色
- 圆角
- 模糊阴影`,

  examplePrompts: [
    {
      title: "待办事项应用",
      titleEn: "Todo App",
      description: "柔和野兽派风格的任务管理",
      descriptionEn: "Soft brutalist task management",
      prompt: `用 Neo-Brutalist Soft 风格创建一个待办事项应用，要求：
1. 整体色调：柔和的灰色边框（zinc-300），淡粉/淡蓝/淡绿背景
2. 任务卡片：无圆角，浅色硬阴影，可拖拽
3. 添加按钮：柔和彩色背景，hover 时阴影消失 + 位移
4. 复选框：方形，选中时背景变为柔和强调色
5. 分类标签：不同柔和色区分
保持野兽派的硬边缘，但用柔和色彩降低视觉冲击`,
    },
    {
      title: "笔记应用",
      titleEn: "Notes App",
      description: "简洁的笔记记录界面",
      descriptionEn: "Clean note-taking interface",
      prompt: `用 Neo-Brutalist Soft 风格设计一个笔记应用，要求：
1. 侧边栏：笔记列表，每项有柔和色标签
2. 编辑区：大面积留白，无圆角边框
3. 工具栏：简洁图标按钮，hover 时柔和背景
4. 标签系统：柔和色彩的方形标签
5. 搜索框：zinc-300 边框，focus 时阴影出现
整体用柔和粉、蓝、绿、黄作为点缀色`,
    },
    {
      title: "个人博客",
      titleEn: "Personal Blog",
      description: "温和风格的博客主页",
      descriptionEn: "Gentle style blog homepage",
      prompt: `用 Neo-Brutalist Soft 风格创建一个个人博客，要求：
1. 导航：细灰边框，链接 hover 变柔和粉色
2. 文章卡片：白色背景，浅色硬阴影，hover 上浮
3. 标签：柔和彩色背景，无圆角
4. 侧边栏：关于我、归档、标签云
5. 页脚：简洁，细边框分隔
色彩：zinc-300 边框，强调用 pink-200, sky-200, lime-200`,
    },
  ],
};
