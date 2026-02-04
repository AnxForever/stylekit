import { DesignStyle } from "./index";

export const comicStyle: DesignStyle = {
  slug: "comic-style",
  name: "漫画风格",
  nameEn: "Comic Style",
  description:
    "灵感源自漫画书和日式漫画的设计风格，浓重的墨线边框、网点填充、对话气泡、动作线和分镜面板布局，充满故事感和视觉冲击力。",
  cover: "/styles/comic-style.svg",
  styleType: "visual",
  tags: ["expressive", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#1a1a1a",
    secondary: "#ffffff",
    accent: ["#ff3333", "#ffcc00", "#3366ff", "#33cc33"],
  },
  keywords: ["漫画", "manga", "网点", "对话气泡", "分镜", "动作线", "墨线"],

  philosophy: `Comic Style 是一种源自漫画书和日式漫画的设计风格，通过浓重的墨线边框、半调网点、对话气泡和动态线条，将界面变成生动的漫画面板。

核心理念：
- 墨线感：使用粗重的黑色边框勾勒元素轮廓
- 网点效果：使用 halftone dots 模拟漫画印刷质感
- 动态感：通过速度线和动作线表达能量与运动
- 叙事性：每个区块都像漫画的一帧，讲述故事`,

  doList: [
    "使用粗黑色边框 border-4 border-black 模拟墨线",
    "使用硬边阴影 shadow-[4px_4px_0_#000] 模拟印刷偏移",
    "使用对话气泡形状展示信息",
    "使用半调网点作为背景纹理",
    "文字使用大写粗体 uppercase font-black",
    "按钮使用夸张的悬停效果",
  ],

  dontList: [
    "禁止使用柔和阴影 shadow-lg",
    "禁止使用过细的边框 border",
    "禁止使用渐变作为主要视觉效果",
    "禁止使用过于正式的排版",
    "禁止缺少动态感和能量感",
  ],

  components: {
    button: {
      name: "按钮",
      description: "漫画风格按钮，粗墨线边框和硬阴影",
      code: `<button className="
  px-6 py-3
  bg-[#ff3333]
  border-4 border-black
  rounded-none
  text-white font-black uppercase tracking-wider
  shadow-[4px_4px_0_#000]
  hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#000]
  active:translate-x-1 active:translate-y-1 active:shadow-none
  transition-all duration-100
  relative
">
  <span className="relative z-10">CLICK!</span>
</button>`,
    },
    card: {
      name: "卡片",
      description: "漫画面板风格卡片",
      code: `<div className="
  p-6
  bg-white
  border-4 border-black
  rounded-none
  shadow-[6px_6px_0_#000]
  relative
">
  <div className="absolute -top-3 -right-3 bg-[#ffcc00] border-3 border-black px-3 py-1 font-black text-sm rotate-3">
    NEW!
  </div>
  <h3 className="text-xl font-black uppercase text-black mb-2">
    COMIC CARD
  </h3>
  <p className="text-gray-700 font-medium">
    A panel from the story!
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "漫画风格输入框",
      code: `<input
  type="text"
  placeholder="TYPE HERE..."
  className="
    w-full px-4 py-3
    bg-white
    border-4 border-black
    rounded-none
    text-black placeholder-gray-400
    font-bold uppercase
    focus:outline-none focus:shadow-[inset_0_0_0_2px_#ff3333]
    transition-all
  "
/>`,
    },
    nav: {
      name: "导航栏",
      description: "漫画风格导航栏",
      code: `<nav className="
  px-6 py-4
  bg-[#ffcc00]
  border-b-4 border-black
">
  <div className="max-w-4xl mx-auto flex items-center justify-between">
    <a href="/" className="text-black font-black uppercase tracking-wider text-xl">
      COMICS
    </a>
    <div className="flex gap-6">
      <a href="#" className="text-black hover:text-[#ff3333] font-black uppercase text-sm transition-colors">
        ISSUES
      </a>
      <a href="#" className="text-black hover:text-[#ff3333] font-black uppercase text-sm transition-colors">
        HEROES
      </a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区块",
      description: "漫画风格 Hero 展示区域",
      code: `<section className="
  min-h-screen
  flex flex-col items-center justify-center
  bg-white
  px-6 py-20
  relative
  overflow-hidden
">
  <div className="absolute inset-0 opacity-10"
    style={{
      backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
      backgroundSize: '8px 8px'
    }}
  />
  <h1 className="
    text-5xl md:text-7xl
    font-black uppercase tracking-tight
    text-black
    mb-4
    relative z-10
    [text-shadow:3px_3px_0_#ff3333,-3px_-3px_0_#3366ff]
  ">
    COMIC STYLE
  </h1>
  <p className="text-xl uppercase font-bold text-gray-700 mb-8 relative z-10">
    Every pixel tells a story
  </p>
  <button className="
    relative z-10
    px-8 py-4
    bg-[#ff3333]
    border-4 border-black
    rounded-none
    text-white font-black uppercase text-xl
    shadow-[6px_6px_0_#000]
    hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_#000]
    active:translate-x-2 active:translate-y-2 active:shadow-none
    transition-all duration-100
  ">
    READ NOW!
  </button>
</section>`,
    },
  },

  globalCss: `/* Comic Style 全局样式 */

:root {
  --comic-black: #1a1a1a;
  --comic-white: #ffffff;
  --comic-red: #ff3333;
  --comic-yellow: #ffcc00;
  --comic-blue: #3366ff;
  --comic-green: #33cc33;
}

/* 半调网点背景 */
.comic-halftone {
  background-image: radial-gradient(circle, var(--comic-black) 1px, transparent 1px);
  background-size: 6px 6px;
}

/* 对话气泡 */
.comic-bubble {
  position: relative;
  background: white;
  border: 4px solid var(--comic-black);
  border-radius: 24px;
  padding: 16px 20px;
}

.comic-bubble::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 30px;
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 20px solid var(--comic-black);
}

/* 动作线 */
.comic-speed-lines {
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 8px,
    rgba(0, 0, 0, 0.05) 8px,
    rgba(0, 0, 0, 0.05) 10px
  );
}

/* 漫画面板边框 */
.comic-panel {
  border: 4px solid var(--comic-black);
  box-shadow: 6px 6px 0 var(--comic-black);
}

/* 漫画文字效果 */
.comic-text {
  font-family: 'Comic Sans MS', 'Bangers', cursive, sans-serif;
  font-weight: 900;
  text-transform: uppercase;
}

/* 爆炸效果标签 */
.comic-burst {
  background: var(--comic-yellow);
  border: 3px solid var(--comic-black);
  transform: rotate(-3deg);
  font-weight: 900;
}`,

  aiRules: `你是一个 Comic Style 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用柔和阴影 shadow-lg, shadow-xl, shadow-md
- 使用细边框 border, border-2
- 使用渐变作为主背景 bg-gradient-*
- 使用圆角卡片 rounded-lg, rounded-xl
- 使用半透明/模糊效果 backdrop-blur

## 必须遵守

- 粗黑色边框 border-4 border-black
- 硬边阴影 shadow-[4px_4px_0_#000] 或 shadow-[6px_6px_0_#000]
- 无圆角 rounded-none（对话气泡除外）
- 大写加粗文字 uppercase font-black
- 对比鲜明的纯色配色
- 按钮按下效果（位移+阴影消失）

## 配色

主色调：
- 黑色: #1a1a1a (墨线)
- 白色: #ffffff (面板背景)

强调色：
- 红色: #ff3333 (动作、CTA)
- 黄色: #ffcc00 (标签、高亮)
- 蓝色: #3366ff (信息、链接)
- 绿色: #33cc33 (成功)

## 特殊效果

半调网点：background-image: radial-gradient(circle, #000 1px, transparent 1px)
对话气泡：border-4 border-black rounded-3xl + 三角尾部
动作线：repeating-linear-gradient
文字效果：text-shadow 多色偏移

## 自检

每次生成代码后检查：
1. 所有元素都有粗黑色边框
2. 使用硬边阴影而非柔和阴影
3. 文字大写加粗
4. 配色鲜明对比强烈
5. 整体感觉像漫画面板`,

  examplePrompts: [
    {
      title: "漫画英雄页面",
      titleEn: "Comic Hero Page",
      description: "漫画风格的英雄介绍页",
      descriptionEn: "Comic-style hero introduction page",
      prompt: `用 Comic Style 风格创建一个英雄介绍页，要求：
1. 使用漫画面板分镜布局
2. 粗墨线边框 border-4 border-black
3. 半调网点背景纹理
4. 对话气泡展示角色台词
5. 动作线表达能量和动态感
6. 鲜明的红黄蓝配色`,
    },
    {
      title: "漫画作品展示",
      titleEn: "Comic Portfolio",
      description: "漫画风格的作品集",
      descriptionEn: "Comic-style portfolio gallery",
      prompt: `用 Comic Style 风格设计一个作品展示页，要求：
1. 每个作品用漫画面板包裹
2. 粗黑色边框和硬边阴影
3. 黄色爆炸标签标注亮点
4. 悬停效果像翻漫画页
5. 半调网点作为背景纹理`,
    },
  ],
};
