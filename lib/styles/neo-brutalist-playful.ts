import { DesignStyle } from "./index";

export const neoBrutalistPlayful: DesignStyle = {
  slug: "neo-brutalist-playful",
  name: "俏皮野兽派",
  nameEn: "Neo-Brutalist Playful",
  description:
    "Neo-Brutalist 的活泼版本。保留核心特征，加入更多色彩、旋转倾斜元素、emoji 和有趣的微交互，适合年轻化品牌。",
  cover: "/styles/neo-brutalist-playful.png",
  category: "expressive",
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    accent: ["#ff6b6b", "#4ecdc4", "#ffe66d", "#95e1d3", "#f38181"],
  },
  keywords: ["俏皮野兽派", "多彩", "倾斜元素", "emoji", "年轻化"],

  philosophy: `Neo-Brutalist Playful（俏皮野兽派）是原版 Neo-Brutalist 的活泼变体。在保持硬边缘、无圆角的结构基础上，通过以下方式增加趣味性：

特色元素：
- 元素轻微旋转 rotate-[-2deg] 或 rotate-[1deg]
- 多彩色块组合
- 适当使用 emoji 作为装饰
- 更活泼的 hover 动画（scale、bounce）
- 手写风格的装饰文字

适用场景：年轻化品牌、创意工作室、儿童产品、趣味应用`,

  doList: [
    "保持无圆角 rounded-none",
    "使用纯黑边框 border-4 border-black",
    "元素添加轻微旋转 rotate-[-2deg] rotate-[1deg]",
    "使用多种强调色，色彩丰富",
    "hover 可用 scale-105 放大效果",
    "适当使用 emoji 装饰 ✨ 🎨 ⚡",
    "阴影可使用彩色 shadow-[...rgba(255,107,107,1)]",
  ],

  dontList: [
    "禁止圆角",
    "禁止模糊阴影",
    "禁止渐变",
    "禁止旋转超过 3 度",
    "禁止过度使用 emoji",
    "禁止使用柔和的灰色",
  ],

  components: {
    button: {
      name: "按钮",
      description: "俏皮版 Brutal 按钮",
      code: `{/* 带旋转的主按钮 */}
<button className="
  bg-[#ff6b6b] text-white font-black
  px-6 py-3 md:px-8 md:py-4
  border-4 border-black
  shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
  hover:shadow-none
  hover:translate-x-[3px] hover:translate-y-[3px]
  hover:scale-105
  transition-all
  rotate-[-1deg]
  text-base md:text-lg
">
  点我呀 ✨
</button>

{/* 多彩按钮组 */}
<div className="flex gap-4">
  <button className="bg-[#4ecdc4] ...">Go! 🚀</button>
  <button className="bg-[#ffe66d] text-black ...">Yeah! 🎉</button>
</div>`,
    },
    card: {
      name: "卡片",
      description: "带旋转和彩色阴影的卡片",
      code: `<div className="
  bg-white
  border-4 border-black
  shadow-[8px_8px_0px_0px_rgba(78,205,196,1)]
  hover:shadow-[12px_12px_0px_0px_rgba(255,107,107,1)]
  hover:-translate-y-2 hover:scale-[1.02]
  transition-all duration-300
  p-6 md:p-8
  rotate-[1deg]
">
  <span className="text-3xl mb-4 block">🎨</span>
  <h3 className="font-black text-xl md:text-2xl mb-2">有趣的卡片</h3>
  <p className="font-mono text-sm md:text-base text-gray-700">
    带有轻微旋转和彩色阴影
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "俏皮风格的输入框",
      code: `<div className="relative">
  <input
    type="text"
    placeholder="输入点什么... 💭"
    className="
      w-full
      px-4 py-3 md:px-6 md:py-4
      border-4 border-black
      bg-[#ffe66d]
      font-mono text-base md:text-lg
      focus:outline-none
      focus:shadow-[6px_6px_0px_0px_rgba(78,205,196,1)]
      transition-all
      placeholder:text-gray-600
    "
  />
  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">✏️</span>
</div>`,
    },
    nav: {
      name: "导航栏",
      description: "俏皮风格的导航",
      code: `<nav className="
  bg-[#ffe66d]
  border-b-4 border-black
  px-4 md:px-8
  py-4 md:py-5
">
  <div className="flex items-center justify-between max-w-6xl mx-auto">
    <a href="/" className="
      font-black text-xl md:text-2xl
      bg-black text-white px-3 py-1
      rotate-[-2deg]
      hover:scale-110 transition-transform
    ">
      FUN ⚡
    </a>
    <div className="flex gap-3 md:gap-6">
      <a href="#" className="
        font-black text-sm md:text-base
        px-3 py-1 border-2 border-black
        hover:bg-[#ff6b6b] hover:text-white
        transition-colors
      ">
        首页 🏠
      </a>
      <a href="#" className="
        font-black text-sm md:text-base
        px-3 py-1 border-2 border-black
        hover:bg-[#4ecdc4]
        transition-colors
      ">
        关于 ℹ️
      </a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区块",
      description: "俏皮多彩的 Hero",
      code: `<section className="
  min-h-screen
  flex items-center
  px-4 md:px-8
  bg-[#4ecdc4]
  border-b-4 border-black
  overflow-hidden
">
  <div className="max-w-4xl mx-auto relative">
    {/* 装饰元素 */}
    <div className="absolute -top-10 -right-10 text-6xl rotate-12">🎨</div>
    <div className="absolute bottom-0 -left-16 text-5xl -rotate-12">⚡</div>

    <h1 className="
      font-black
      text-5xl md:text-7xl lg:text-9xl
      leading-none
      mb-6
      rotate-[-2deg]
    ">
      PLAY<br />
      <span className="text-white">FUL!</span>
    </h1>
    <p className="
      font-mono
      text-lg md:text-xl
      max-w-md
      mb-8
      rotate-[1deg]
    ">
      野兽派也可以很有趣 ✨
    </p>
    <div className="flex flex-wrap gap-4">
      <button className="
        bg-[#ff6b6b] text-white font-black
        px-8 py-4 border-4 border-black
        shadow-[6px_6px_0px_0px_black]
        hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]
        transition-all rotate-[-1deg]
      ">
        开始玩 🎮
      </button>
      <button className="
        bg-[#ffe66d] font-black
        px-8 py-4 border-4 border-black
        shadow-[6px_6px_0px_0px_black]
        hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]
        transition-all rotate-[1deg]
      ">
        看看吧 👀
      </button>
    </div>
  </div>
</section>`,
    },
  },

  globalCss: `/* Neo-Brutalist Playful 全局样式 */
:root {
  --playful-red: #ff6b6b;
  --playful-teal: #4ecdc4;
  --playful-yellow: #ffe66d;
  --playful-mint: #95e1d3;
  --playful-coral: #f38181;
}

body {
  background: white;
  color: black;
}

/* 标题 - 极粗 */
h1, h2, h3, h4, h5, h6 {
  font-weight: 900;
}

/* 选中文字 - 俏皮红 */
::selection {
  background: var(--playful-red);
  color: white;
}

/* 有趣的下划线 */
.fun-underline {
  text-decoration: underline;
  text-decoration-color: var(--playful-yellow);
  text-decoration-thickness: 4px;
  text-underline-offset: 4px;
}`,

  aiRules: `你是一个 Neo-Brutalist Playful（俏皮野兽派）设计风格的前端开发专家。这是 Neo-Brutalist 的活泼版本。

## 核心保留

- 无圆角 rounded-none
- 粗边框 border-4 border-black
- 硬边缘阴影
- hover 位移效果

## 俏皮元素

旋转：
- 元素添加轻微旋转 rotate-[-2deg] rotate-[1deg] rotate-[-1deg]
- 不超过 3 度

彩色阴影：
- shadow-[6px_6px_0px_0px_rgba(255,107,107,1)]
- shadow-[6px_6px_0px_0px_rgba(78,205,196,1)]
- hover 时阴影变色

配色（多彩）：
- 红色：#ff6b6b
- 青色：#4ecdc4
- 黄色：#ffe66d
- 薄荷：#95e1d3
- 珊瑚：#f38181

Emoji 使用：
- 可在按钮文字后加 emoji
- 可作为装饰元素
- 不过度使用

交互效果：
- hover:scale-105 放大
- hover:-translate-y-2 上浮
- transition-all duration-300

## 禁止

- 圆角
- 模糊阴影
- 渐变
- 灰暗配色`,
};
