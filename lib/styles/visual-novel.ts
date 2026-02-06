import { DesignStyle } from "./index";

export const visualNovel: DesignStyle = {
  slug: "visual-novel",
  name: "视觉小说风",
  nameEn: "Visual Novel",
  description:
    "借鉴视觉小说游戏UI的设计风格，半透明对话框、角色立绘、选项按钮和文字动画，打造沉浸式交互故事体验。",
  cover: "/styles/visual-novel.svg",
  styleType: "visual",
  tags: ["modern", "expressive"],
  category: "modern",
  colors: {
    primary: "#4a5568",
    secondary: "#f7fafc",
    accent: ["#6366f1", "#ec4899", "#10b981"],
  },
  keywords: ["视觉小说", "对话框", "立绘", "选项", "游戏UI", "交互故事"],

  philosophy: `Visual Novel 风格源于日本视觉小说游戏的UI设计，强调叙事沉浸感和角色互动。

核心理念：
- 对话框系统：半透明面板承载文字叙述
- 角色立绘：人物形象作为视觉焦点
- 选项交互：清晰的分支选择按钮
- 氛围渲染：通过背景、光影营造情感氛围`,

  doList: [
    "使用半透明面板作为内容容器",
    "保持干净的无衬线字体用于UI元素",
    "使用衬线字体用于叙事文本",
    "添加柔和的模糊背景效果（backdrop-blur）",
    "使用圆角边框（rounded-lg）",
    "保持优雅的配色方案（靛蓝、粉色、翡翠绿）",
  ],

  dontList: [
    "禁止使用粗重的野蛮主义边框",
    "禁止使用霓虹灯发光效果",
    "禁止使用像素艺术风格",
    "禁止使用过于鲜艳的高饱和色彩",
  ],

  components: {
    button: {
      name: "按钮",
      description: "视觉小说选项按钮",
      code: `<button className="
  px-6 py-3
  bg-[#6366f1] text-white
  font-sans font-medium
  rounded-lg
  border border-[#6366f1]/20
  shadow-sm
  hover:bg-[#6366f1]/90
  hover:shadow-md
  transition-all duration-300
">
  Continue
</button>`,
    },
    card: {
      name: "卡片",
      description: "视觉小说对话面板",
      code: `<div className="
  p-8
  bg-white/70
  border border-[#4a5568]/10
  rounded-lg
  backdrop-blur-md
  shadow-sm
">
  <h3 className="text-xl font-serif text-[#4a5568] mb-3">
    Chapter 1: The Beginning
  </h3>
  <p className="text-[#4a5568]/70 font-sans leading-relaxed">
    The cherry blossoms danced in the spring breeze...
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "视觉小说输入框",
      code: `<input
  type="text"
  placeholder="Enter your name..."
  className="
    w-full px-4 py-3
    bg-white/70
    border border-[#4a5568]/20
    rounded-lg
    text-[#4a5568] placeholder-[#4a5568]/40
    font-sans
    backdrop-blur-sm
    focus:border-[#6366f1]/50
    focus:shadow-[0_0_12px_#6366f120]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "视觉小说 Hero",
      code: `<section className="
  min-h-screen
  flex items-end justify-center
  bg-gradient-to-b from-[#e0e7ff] to-[#f7fafc]
  relative overflow-hidden
  pb-20
">
  <div className="relative z-10 w-full max-w-3xl mx-auto px-6">
    <div className="bg-[#1a202c]/80 backdrop-blur-md rounded-lg p-8 border border-[#6366f1]/20">
      <p className="text-sm text-[#6366f1] font-sans mb-2">Narrator</p>
      <p className="text-white/90 font-serif text-lg leading-relaxed">
        The story begins on a quiet spring morning...
      </p>
    </div>
    <div className="flex gap-3 mt-4">
      <button className="flex-1 px-6 py-3 bg-white/60 backdrop-blur-sm text-[#4a5568] font-sans rounded-lg border border-[#6366f1]/30 hover:bg-[#6366f1]/10 transition-all">
        Explore the garden
      </button>
      <button className="flex-1 px-6 py-3 bg-white/60 backdrop-blur-sm text-[#4a5568] font-sans rounded-lg border border-[#6366f1]/30 hover:bg-[#6366f1]/10 transition-all">
        Stay inside
      </button>
    </div>
  </div>
</section>`,
    },
  },

  globalCss: `/* Visual Novel Global Styles */

:root {
  --vn-slate: #4a5568;
  --vn-light: #f7fafc;
  --vn-indigo: #6366f1;
  --vn-pink: #ec4899;
  --vn-emerald: #10b981;
}

/* Dialog box fade-in */
.vn-dialog {
  animation: vnFadeUp 0.5s ease-out;
}
@keyframes vnFadeUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Text typewriter effect */
.vn-typewriter {
  overflow: hidden;
  border-right: 2px solid var(--vn-indigo);
  white-space: nowrap;
  animation: vnType 3s steps(40, end), vnBlink 0.75s step-end infinite;
}
@keyframes vnType {
  from { width: 0; }
  to { width: 100%; }
}
@keyframes vnBlink {
  from, to { border-color: transparent; }
  50% { border-color: var(--vn-indigo); }
}

/* Choice button hover glow */
.vn-choice:hover {
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.15);
}

/* Character portrait frame */
.vn-portrait {
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}`,

  aiRules: `You are a Visual Novel design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Heavy brutalist borders (border-4+)
- Neon glow effects
- Pixel art style elements
- Harsh, highly saturated neon colors
- Monospace fonts for main content

## Must Follow

- Semi-transparent panels bg-white/70 or bg-[#1a202c]/80
- Backdrop blur backdrop-blur-md
- Clean sans-serif for UI, serif for narrative text
- Rounded corners rounded-lg
- Soft shadows shadow-sm
- Elegant palette: indigo #6366f1, pink #ec4899, emerald #10b981

## Color Palette

Primary:
- Slate: #4a5568
- Light BG: #f7fafc
- Indigo: #6366f1
- Pink: #ec4899
- Emerald: #10b981

## Special Elements

- Dialog boxes with semi-transparent backgrounds
- Choice buttons with hover highlights
- Character name labels above dialog
- Typewriter text animation
- Soft gradient backgrounds`,

  examplePrompts: [
    {
      title: "视觉小说对话页面",
      titleEn: "Visual Novel Dialog Page",
      description: "游戏风格的交互对话页面",
      descriptionEn: "Game-style interactive dialog page",
      prompt: `Use Visual Novel style to create an interactive story page:
1. Background: soft gradient from light indigo to white
2. Dialog panel: semi-transparent dark panel at bottom
3. Choice buttons: frosted glass with hover glow
4. Character name displayed above dialog
5. Overall visual novel game UI aesthetic`,
    },
  ],
};
