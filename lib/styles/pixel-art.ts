import { DesignStyle } from "./index";

export const pixelArt: DesignStyle = {
  slug: "pixel-art",
  name: "像素艺术风",
  nameEn: "Pixel Art",
  description:
    "复古 8-bit 像素游戏风格，无圆角、像素化边框、硬边阴影和鲜明的 8-bit 配色，适合游戏、复古应用和独立开发者项目。",
  cover: "/styles/pixel-art.svg",
  styleType: "visual",
  tags: ["retro", "expressive"],
  category: "retro",
  colors: {
    primary: "#1a1c2c",
    secondary: "#f4f4f4",
    accent: ["#ff004d", "#00e436", "#29adff", "#ffec27"],
  },
  keywords: ["像素", "8-bit", "复古", "游戏", "怀旧", "独立", "retro"],

  philosophy: `Pixel Art 是一种源于早期电子游戏的复古设计风格，通过像素化的视觉元素、硬边阴影和鲜明的 8-bit 配色，唤起对经典游戏的怀旧情感。

核心理念：
- 像素感：所有元素都呈现像素化的锐利边缘
- 硬边阴影：使用纯色偏移阴影模拟像素效果
- 8-bit 配色：使用经典游戏机的调色板
- 怀旧情感：唤起对经典游戏的美好回忆`,

  doList: [
    "使用无圆角 rounded-none",
    "使用粗边框 border-4",
    "使用硬边阴影 shadow-[4px_4px_0_color]",
    "使用 8-bit 调色板配色",
    "使用像素字体或等宽字体",
    "按钮按下时阴影消失并位移",
  ],

  dontList: [
    "禁止使用任何圆角",
    "禁止使用渐变",
    "禁止使用柔和阴影",
    "禁止使用过于复杂的颜色",
    "禁止使用细边框",
  ],

  components: {
    button: {
      name: "按钮",
      description: "像素风格按钮，带有硬边阴影和按下效果",
      code: `<button className="
  px-6 py-3
  bg-[#ff004d]
  border-4 border-[#1a1c2c]
  rounded-none
  text-white font-bold uppercase tracking-wider
  shadow-[4px_4px_0_#1a1c2c]
  hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#1a1c2c]
  active:translate-x-1 active:translate-y-1 active:shadow-none
  transition-all duration-100
">
  START
</button>`,
    },
    card: {
      name: "卡片",
      description: "像素风格卡片，硬边框和阴影",
      code: `<div className="
  p-6
  bg-white
  border-4 border-[#1a1c2c]
  rounded-none
  shadow-[4px_4px_0_#1a1c2c]
">
  <h3 className="text-xl font-bold uppercase text-[#1a1c2c] mb-2">
    LEVEL 1
  </h3>
  <p className="text-[#5f574f]">
    Welcome to the pixel world!
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "像素风格输入框",
      code: `<input
  type="text"
  placeholder="ENTER NAME..."
  className="
    w-full px-4 py-3
    bg-white
    border-4 border-[#1a1c2c]
    rounded-none
    text-[#1a1c2c] placeholder-[#8b8680]
    font-mono uppercase
    focus:outline-none focus:shadow-[inset_0_0_0_2px_#29adff]
    transition-all
  "
/>`,
    },
    nav: {
      name: "导航栏",
      description: "像素风格导航栏",
      code: `<nav className="
  px-6 py-4
  bg-[#1a1c2c]
  border-b-4 border-[#ff004d]
">
  <div className="max-w-4xl mx-auto flex items-center justify-between">
    <a href="/" className="text-white font-bold uppercase tracking-wider">
      PIXEL GAME
    </a>
    <div className="flex gap-6">
      <a href="#" className="text-[#29adff] hover:text-white font-bold uppercase text-sm transition-colors">
        PLAY
      </a>
      <a href="#" className="text-[#29adff] hover:text-white font-bold uppercase text-sm transition-colors">
        SCORES
      </a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区块",
      description: "像素风格 Hero 展示区域",
      code: `<section className="
  min-h-screen
  flex flex-col items-center justify-center
  bg-[#1a1c2c]
  px-6 py-20
">
  <h1 className="
    text-4xl md:text-6xl
    font-bold uppercase tracking-wider
    text-[#ffec27]
    mb-4
    animate-pulse
  ">
    PIXEL ART
  </h1>
  <p className="text-[#29adff] text-xl uppercase mb-8">
    PRESS START TO BEGIN
  </p>
  <button className="
    px-8 py-4
    bg-[#ff004d]
    border-4 border-white
    rounded-none
    text-white font-bold uppercase text-xl
    shadow-[6px_6px_0_#00e436]
    hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_#00e436]
    active:translate-x-2 active:translate-y-2 active:shadow-none
    transition-all duration-100
  ">
    START GAME
  </button>
</section>`,
    },
  },

  globalCss: `/* Pixel Art 全局样式 */

:root {
  --pixel-dark: #1a1c2c;
  --pixel-light: #f4f4f4;
  --pixel-red: #ff004d;
  --pixel-green: #00e436;
  --pixel-blue: #29adff;
  --pixel-yellow: #ffec27;
  --pixel-orange: #ffa300;
  --pixel-pink: #ff77a8;
  --pixel-purple: #7e2553;
}

/* 像素化渲染 */
.pixel-render {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

/* 像素字体（需要引入 Press Start 2P 字体） */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.pixel-font {
  font-family: 'Press Start 2P', monospace;
}

/* 像素边框 */
.pixel-border {
  border: 4px solid var(--pixel-dark);
  border-radius: 0;
}

/* 像素阴影 */
.pixel-shadow {
  box-shadow: 4px 4px 0 var(--pixel-dark);
}

/* 像素按钮效果 */
.pixel-button {
  border: 4px solid var(--pixel-dark);
  border-radius: 0;
  box-shadow: 4px 4px 0 var(--pixel-dark);
  transition: all 0.1s ease;
}

.pixel-button:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--pixel-dark);
}

.pixel-button:active {
  transform: translate(4px, 4px);
  box-shadow: none;
}

/* 像素闪烁动画 */
@keyframes pixel-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.pixel-blink {
  animation: pixel-blink 1s step-end infinite;
}`,

  aiRules: `你是一个 Pixel Art 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用任何圆角 rounded-*（必须 rounded-none）
- 使用渐变 bg-gradient-*
- 使用柔和阴影 shadow-lg, shadow-xl
- 使用细边框 border, border-2
- 使用非 8-bit 调色板的颜色

## 必须遵守

- 无圆角 rounded-none
- 粗边框 border-4 border-[#1a1c2c]
- 硬边阴影 shadow-[4px_4px_0_#1a1c2c]
- 8-bit 调色板配色
- 大写字母 uppercase
- 按钮按下效果

## 配色（PICO-8 调色板）

主色调：
- 深蓝黑: #1a1c2c
- 浅灰: #f4f4f4

强调色：
- 红色: #ff004d
- 绿色: #00e436
- 蓝色: #29adff
- 黄色: #ffec27
- 橙色: #ffa300
- 粉色: #ff77a8
- 紫色: #7e2553

## 阴影

标准阴影：shadow-[4px_4px_0_#1a1c2c]
悬停阴影：shadow-[2px_2px_0_#1a1c2c]
彩色阴影：shadow-[4px_4px_0_#ff004d]

## 按钮交互

正常：shadow-[4px_4px_0_#1a1c2c]
悬停：translate-x-1 translate-y-1 shadow-[2px_2px_0_#1a1c2c]
按下：translate-x-1 translate-y-1 shadow-none

## 自检

每次生成代码后检查：
1. 没有任何圆角
2. 使用粗边框 border-4
3. 使用硬边阴影
4. 配色来自 8-bit 调色板
5. 整体感觉复古像素化`,

  examplePrompts: [
    {
      title: "游戏主菜单",
      titleEn: "Game Main Menu",
      description: "像素风格游戏菜单",
      descriptionEn: "Pixel art game menu",
      prompt: `用 Pixel Art 风格创建一个游戏主菜单，要求：
1. 背景：深色 #1a1c2c
2. 标题：大号像素字体，黄色闪烁
3. 菜单项：START, OPTIONS, CREDITS
4. 按钮：红色背景，硬边阴影，按下效果
5. 装饰：像素化的星星或图案`,
    },
    {
      title: "得分排行榜",
      titleEn: "High Scores",
      description: "像素风格排行榜",
      descriptionEn: "Pixel art leaderboard",
      prompt: `用 Pixel Art 风格设计一个得分排行榜，要求：
1. 标题：HIGH SCORES，黄色大字
2. 列表：排名、玩家名、分数
3. 边框：粗像素边框
4. 配色：使用 8-bit 调色板
5. 底部：返回按钮`,
    },
  ],
};
