import type { DesignStyle } from "./types";
import { comicStyleAtoms } from "./atoms/comic-style";

export const comicStyle: DesignStyle = {
  atoms: comicStyleAtoms,
  slug: "comic-style",
  name: "漫画风格",
  nameEn: "Comic Style",
  description:
    "灵感源自漫画书和日式漫画的设计风格，浓重的墨线边框、网点填充、对话气泡、动作线和分镜面板布局，充满故事感和视觉冲击力。",
  descriptionEn:
    "A design style inspired by comic books and manga, featuring heavy ink-line borders, halftone fills, speech bubbles, action lines, and panel layouts, full of narrative and visual impact.",
  cover: "/styles/comic-style.svg",
  styleType: "visual",
  tags: ["high-contrast"],
  category: "expressive",
  colors: {
    primary: "#1a1a1a",
    secondary: "#ffffff",
    accent: ["#ff3333", "#ffcc00", "#3366ff", "#33cc33"],
  },
  keywords: ["漫画", "manga", "网点", "对话气泡", "分镜", "动作线", "墨线", "expressive", "bold", "vibrant"],
  keywordsEn: ["comic style", "comic book ui", "manga", "halftone dots", "speech bubbles", "ink outlines", "comic panels", "action lines", "pop art comic", "Ben-Day dots"],

  philosophy: `Comic Style 是一种源自漫画书和日式漫画的设计风格，通过浓重的墨线边框、半调网点、对话气泡和动态线条，将界面变成生动的漫画面板。

核心理念：
- 墨线感：使用粗重的黑色边框勾勒元素轮廓
- 网点效果：使用 halftone dots 模拟漫画印刷质感
- 动态感：通过速度线和动作线表达能量与运动
- 叙事性：每个区块都像漫画的一帧，讲述故事
- 情绪爆发：交互要像 POW! BAM! 一样夸张有力

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Comic Style is a design style derived from comic books and manga, transforming interfaces into vivid comic panels through heavy ink-line borders, halftone dots, speech bubbles, and dynamic lines.

Core principles:
- Ink feel: Using thick black borders to outline element contours
- Halftone effect: Using halftone dots to simulate comic print texture
- Dynamism: Expressing energy and movement through speed lines and action lines
- Narrative: Each section is like a comic frame, telling a story
- Emotional burst: Interactions should be as exaggerated and powerful as POW! BAM!`,

  doList: [
    "使用粗黑色边框 border-4 border-black 模拟墨线",
    "使用硬边阴影 shadow-[4px_4px_0_#000] 模拟印刷偏移",
    "使用对话气泡形状展示信息",
    "使用半调网点作为背景纹理",
    "文字使用大写粗体 uppercase font-black",
    "按钮使用夸张的悬停效果",
    "hover 时 scale-110 + rotate(-3deg)，像漫画音效气泡弹出",
    "group-hover 时隐藏的 NEW! 标签从 scale-0 弹出 scale-100",
    "active 时阴影瞬间归零，制造墨水压迫感",
    "hover 时背景网点（radial-gradient）浮现（group-hover:opacity-20）",
  ],

  doListEn: [
    "Use thick black borders border-4 border-black to simulate ink lines",
    "Use hard-edge shadows shadow-[4px_4px_0_#000] to simulate print offset",
    "Use speech bubble shapes to display information",
    "Use halftone dots as background texture",
    "Text uses uppercase bold uppercase font-black",
    "Buttons use exaggerated hover effects",
    "Hover with scale-110 + rotate(-3deg), like comic sound effect bubbles popping out",
    "group-hover reveals hidden NEW! label from scale-0 to scale-100",
    "Active instantly zeroes out shadow, creating ink pressure feel",
    "Hover reveals background halftone dots (radial-gradient) (group-hover:opacity-20)",
  ],

  dontList: [
    "禁止使用柔和阴影 shadow-lg",
    "禁止使用过细的边框 border",
    "禁止使用渐变作为主要视觉效果",
    "禁止使用过于正式的排版",
    "禁止缺少动态感和能量感",
    "禁止使用圆角（rounded-lg, rounded-xl），对话气泡除外",
    "禁止使用过长的 duration（最长 duration-100）",
  ],

  dontListEn: [
    "Do NOT use soft shadows shadow-lg, shadow-xl, shadow-md",
    "Do NOT use thin borders border, border-2",
    "Do NOT use gradients as main visual effect",
    "Do NOT use overly formal typography",
    "Do NOT lack dynamism and energy",
    "Do NOT use rounded cards (rounded-lg, rounded-xl), except speech bubbles",
    "Do NOT use transition durations exceeding duration-100",
  ],

  components: {
    button: {
      name: "按钮",
      description: "漫画按钮，hover 夸张弹出 + 颜色翻转 + 网点浮现",
      code: `<button className="
  group relative px-8 py-3
  bg-[#ff3333]
  border-4 border-black
  rounded-none
  text-white font-black text-xl uppercase tracking-wider
  shadow-[6px_6px_0_#000]
  hover:scale-110 hover:-rotate-3
  hover:bg-[#ffcc00] hover:text-black
  hover:shadow-[10px_10px_0_#000]
  active:scale-95 active:rotate-2
  active:translate-x-2 active:translate-y-2
  active:shadow-none
  transition-all duration-100
  overflow-hidden cursor-crosshair
">
  <div className="absolute inset-0 bg-[radial-gradient(#000_20%,transparent_20%)] bg-[size:4px_4px] opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-100" />
  <span className="relative z-10 block">CLICK!</span>
</button>`,
    },
    card: {
      name: "卡片",
      description: "漫画面板卡片，hover 时 NEW! 标签弹出 + 阴影扩张",
      code: `<div className="
  group relative p-6
  bg-white
  border-4 border-black
  rounded-none
  shadow-[8px_8px_0_#000]
  hover:-translate-y-2 hover:-rotate-1
  hover:shadow-[16px_16px_0_#000]
  transition-all duration-100 ease-out
">
  <div className="absolute -top-4 -right-4 bg-[#ffcc00] border-[3px] border-black px-3 py-1 font-black text-sm transform rotate-6 scale-0 group-hover:scale-100 transition-transform duration-100 ease-out">
    NEW!
  </div>
  <h3 className="text-2xl font-black uppercase mb-3 border-b-4 border-black pb-2 group-hover:text-[#ff3333] transition-colors duration-100">
    Episode 1
  </h3>
  <p className="font-bold leading-tight">
    In a world where ordinary UI elements become extraordinary...
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "漫画风格输入框，聚焦时原色硬框",
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
    focus:outline-none focus:border-[#ff3333]
    focus:shadow-[4px_4px_0_#ff3333]
    transition-all duration-100
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
    <a href="/" className="text-black font-black uppercase tracking-wider text-xl hover:text-[#ff3333] hover:-rotate-2 transition-all duration-100">
      COMICS
    </a>
    <div className="flex gap-6">
      <a href="#" className="text-black hover:text-[#ff3333] hover:-translate-y-1 font-black uppercase text-sm transition-all duration-100">
        ISSUES
      </a>
      <a href="#" className="text-black hover:text-[#3366ff] hover:-translate-y-1 font-black uppercase text-sm transition-all duration-100">
        HEROES
      </a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区块",
      description: "漫画风格 Hero，网点背景 + 文字多色描边",
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
    group relative z-10
    px-8 py-4
    bg-[#ff3333]
    border-4 border-black
    rounded-none
    text-white font-black uppercase text-xl
    shadow-[6px_6px_0_#000]
    hover:scale-110 hover:-rotate-2
    hover:bg-[#ffcc00] hover:text-black
    hover:shadow-[10px_10px_0_#000]
    active:scale-95 active:translate-x-2 active:translate-y-2 active:shadow-none
    transition-all duration-100
    overflow-hidden cursor-crosshair
  ">
    <div className="absolute inset-0 bg-[radial-gradient(#000_20%,transparent_20%)] bg-[size:4px_4px] opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-100" />
    <span className="relative z-10">READ NOW!</span>
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

/* 爆炸效果标签 — hover 时弹出 */
.comic-burst {
  background: var(--comic-yellow);
  border: 3px solid var(--comic-black);
  font-weight: 900;
  transform: rotate(-3deg) scale(0);
  transition: transform 0.1s ease-out;
}

.group:hover .comic-burst {
  transform: rotate(-3deg) scale(1);
}

/* Pop-art 按钮弹出 */
.comic-pop {
  transition: all 0.1s ease-out;
  cursor: crosshair;
}

.comic-pop:hover {
  transform: scale(1.1) rotate(-3deg);
  box-shadow: 10px 10px 0 var(--comic-black);
}

.comic-pop:active {
  transform: scale(0.95) rotate(2deg) translate(4px, 4px);
  box-shadow: none;
}

.comic-style-filter { filter: brightness(1.05) contrast(1.02); }

.comic-style-focus { outline: 2px solid var(--comic-style-primary, currentColor); outline-offset: 2px; }`,

  aiRules: `你是一个 Comic Style 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用柔和阴影 shadow-lg, shadow-xl, shadow-md
- 使用细边框 border, border-2
- 使用渐变作为主背景 bg-gradient-*
- 使用圆角卡片 rounded-lg, rounded-xl（对话气泡除外）
- 使用半透明/模糊效果 backdrop-blur
- 使用超过 duration-100 的过渡时间

## 必须遵守

- 粗黑色边框 border-4 border-black
- 硬边阴影 shadow-[4px_4px_0_#000] 或 shadow-[6px_6px_0_#000]
- 无圆角 rounded-none（对话气泡除外）
- 大写加粗文字 uppercase font-black
- 对比鲜明的纯色配色
- 按钮按下效果（位移+阴影消失）

## Animation & Interaction Rules

- Pop-Art Explosion: 悬停时元素夸张弹出（hover:scale-110 hover:-rotate-3），像漫画音效气泡 POW! BAM! 一样爆发。同时颜色翻转（如 hover:bg-[#ffcc00] hover:text-black）强化戏剧感。
- Halftone Reveal: 按钮/卡片内有隐藏的半调网点背景（radial-gradient），通过 group-hover:opacity-10 浮现（注意：必须用 group-hover 而非 hover，因为该层有 pointer-events-none）。
- Heavy Ink: 点击时（active）硬阴影瞬间归零（active:shadow-none），配合 active:translate-x-2 active:translate-y-2，产生强烈的墨水压迫感。
- Badge Pop: 卡片 group-hover 时，隐藏的 NEW! 标签从 scale-0 瞬间弹出到 scale-100（transition-transform duration-100）。
- Shadow Amplification: hover 时硬阴影从 8px 扩大到 16px，配合 -translate-y-2，强化漫画"翻页"的物理感。

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

半调网点：background-image: radial-gradient(circle, #000 1px, transparent 1px) + bg-[size:4px_4px]
对话气泡：border-4 border-black rounded-3xl + 三角尾部伪元素
动作线：repeating-linear-gradient
文字效果：[text-shadow:3px_3px_0_#ff3333,-3px_-3px_0_#3366ff]

## 自检

每次生成代码后检查：
1. 所有元素都有粗黑色边框 border-4
2. 使用硬边阴影而非柔和阴影
3. 文字大写加粗
4. 按钮 hover 有 scale-110 + rotate(-3deg) 爆发感
5. 按钮 active 有 shadow-none 瞬间归零
6. 卡片内有 group-hover 触发的隐藏元素`,

  aiRulesEn: `You are a Comic Style design frontend development expert. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Using soft shadows shadow-lg, shadow-xl, shadow-md
- Using thin borders border, border-2
- Using gradients as main background bg-gradient-*
- Using rounded cards rounded-lg, rounded-xl (except speech bubbles)
- Using semi-transparent/blur effects backdrop-blur
- Using transition durations exceeding duration-100

## Must Follow

- Thick black borders border-4 border-black
- Hard-edge shadows shadow-[4px_4px_0_#000] or shadow-[6px_6px_0_#000]
- No border radii rounded-none (except speech bubbles)
- Uppercase bold text uppercase font-black
- High-contrast solid colors
- Button press effects (displacement + shadow disappears)

## Animation & Interaction Rules

- Pop-Art Explosion: Hover makes elements burst out exaggeratedly (hover:scale-110 hover:-rotate-3), like comic sound effect bubbles POW! BAM! exploding. Color inversion (e.g., hover:bg-[#ffcc00] hover:text-black) enhances drama.
- Halftone Reveal: Buttons/cards have hidden halftone dot backgrounds (radial-gradient), revealed via group-hover:opacity-10 (note: must use group-hover not hover, as the layer has pointer-events-none).
- Heavy Ink: On click (active), hard shadow instantly zeroes (active:shadow-none), paired with active:translate-x-2 active:translate-y-2, creating strong ink pressure feel.
- Badge Pop: Card group-hover reveals hidden NEW! label from scale-0 instantly to scale-100 (transition-transform duration-100).
- Shadow Amplification: Hover expands hard shadow from 8px to 16px, paired with -translate-y-2, enhancing comic "page flip" physical feel.

## Color Palette

Primary:
- Black: #1a1a1a (ink lines)
- White: #ffffff (panel background)

Accent colors:
- Red: #ff3333 (action, CTA)
- Yellow: #ffcc00 (labels, highlights)
- Blue: #3366ff (info, links)
- Green: #33cc33 (success)

## Special Effects

Halftone dots: background-image: radial-gradient(circle, #000 1px, transparent 1px) + bg-[size:4px_4px]
Speech bubbles: border-4 border-black rounded-3xl + triangle tail pseudo-element
Action lines: repeating-linear-gradient
Text effects: [text-shadow:3px_3px_0_#ff3333,-3px_-3px_0_#3366ff]

## Self-Check

After generating code, verify:
1. All elements have thick black borders border-4
2. Using hard-edge shadows not soft shadows
3. Text is uppercase bold
4. Button hover has scale-110 + rotate(-3deg) burst feel
5. Button active has shadow-none instant zeroing
6. Cards have group-hover triggered hidden elements`,

  examplePrompts: [
    {
      title: "漫画英雄页面",
      titleEn: "Comic Hero Page",
      description: "漫画风格的英雄介绍页",
      descriptionEn: "Comic-style hero introduction page",
      prompt: `用 Comic Style 风格创建一个英雄介绍页，要求：
1. 使用漫画面板分镜布局
2. 粗墨线边框 border-4 border-black
3. 半调网点背景纹理（radial-gradient，opacity-10）
4. 对话气泡展示角色台词
5. 动作线表达能量和动态感
6. 鲜明的红黄蓝配色
7. 按钮 hover 时 scale-110 rotate(-3deg) 弹出 + 颜色翻转`,
    },
    {
      title: "漫画作品展示",
      titleEn: "Comic Portfolio",
      description: "漫画风格的作品集",
      descriptionEn: "Comic-style portfolio gallery",
      prompt: `用 Comic Style 风格设计一个作品展示页，要求：
1. 每个作品用漫画面板包裹（border-4 border-black）
2. 粗黑色边框和硬边阴影（shadow-[8px_8px_0_#000]）
3. 卡片 group-hover 时黄色 NEW! 标签从 scale-0 弹出
4. hover 时卡片阴影从 8px 扩大到 16px + -translate-y-2
5. 半调网点作为背景纹理
6. 点击时 active:shadow-none 瞬间墨水压迫感`,
    },
  {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 漫画风格风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Comic Style style",
      prompt: `Create a portfolio showcase page using Comic Style style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "comic-style-warm",
      name: "漫画风格暖色版",
      nameEn: "Comic Style Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#1a1a1a",
        secondary: "#ffffff",
        accent: ["#d44700", "#94ec00", "#864dff", "#0bd178"],
      },
    },
    {
      id: "comic-style-cool",
      name: "漫画风格冷色版",
      nameEn: "Comic Style Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#1a1a1a",
        secondary: "#e6e6e6",
        accent: ["#ff2a89", "#ffab36", "#007fd1", "#78bb0b"],
      },
    },
  ],
};
