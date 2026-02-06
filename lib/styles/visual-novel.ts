import { DesignStyle } from "./index";

export const visualNovel: DesignStyle = {
  slug: "visual-novel",
  name: "视觉小说风",
  nameEn: "Visual Novel",
  description:
    "借鉴ADV视觉小说游戏UI的设计风格，半透明对话框面板、角色铭牌徽章、装饰性边角框线、分支选项按钮和存档界面，打造沉浸式交互故事体验。",
  cover: "/styles/visual-novel.svg",
  styleType: "visual",
  tags: ["modern", "expressive"],
  category: "modern",
  colors: {
    primary: "#4a5568",
    secondary: "#f7fafc",
    accent: ["#6366f1", "#ec4899", "#10b981"],
  },
  keywords: ["视觉小说", "ADV对话框", "铭牌", "立绘", "选项", "游戏UI", "交互故事", "装饰边角"],

  philosophy: `Visual Novel 风格源于日本ADV（Adventure）视觉小说游戏的UI设计，强调叙事沉浸感和角色互动。

核心理念：
- ADV对话框系统：底部固定半透明暗色面板，承载角色对话文字
- 角色铭牌徽章：对话框上方的彩色小标签，标识说话角色
- 装饰性边角框线：对话面板四角的L形装饰线条，营造精致画框感
- 分支选项按钮：居中排列的毛玻璃按钮，代表故事分支
- 场景氛围渲染：通过天空渐变、剪影、柔光营造时间和情感氛围
- 存档界面设计：带装饰边角的暗色面板，包含输入框和操作按钮`,

  doList: [
    "使用半透明暗色面板 bg-[#1a202c]/85 作为对话框",
    "使用半透明亮色面板 bg-white/70 作为信息卡片",
    "所有面板添加毛玻璃效果 backdrop-blur-md",
    "使用衬线字体 font-serif 用于叙事/对话文本",
    "使用无衬线字体 font-sans 用于UI标签和按钮",
    "添加角色铭牌徽章（彩色小标签 inline-block px-3 py-0.5 bg-[color] rounded-sm）",
    "对话面板添加L形装饰边角（border-l/t/r/b 组合）",
    "使用圆角 rounded-lg 保持柔和界面感",
  ],

  dontList: [
    "禁止使用粗重的野蛮主义边框（border-4+）",
    "禁止使用霓虹灯 RGB 分离阴影效果",
    "禁止使用像素艺术风格或等宽字体用于主内容",
    "禁止使用纯黑背景 bg-black",
    "禁止使用全大写加宽字距的终端风格文字",
    "禁止使用直角 rounded-none（除铭牌 rounded-sm 外）",
  ],

  components: {
    button: {
      name: "按钮",
      description: "视觉小说选项按钮，毛玻璃分支选择",
      code: `<button className="
  w-full px-6 py-4
  bg-white/50 backdrop-blur-sm
  text-[#4a5568] font-sans
  rounded-lg
  border border-[#6366f1]/25
  text-left
  hover:bg-[#6366f1]/10
  hover:border-[#6366f1]/40
  transition-all duration-300
  flex items-center justify-between group
">
  <span>Go to the rooftop to watch the sunset</span>
  <svg className="w-4 h-4 text-[#6366f1]/30 group-hover:text-[#6366f1]/60 group-hover:translate-x-1 transition-all" />
</button>`,
    },
    card: {
      name: "卡片",
      description: "ADV对话面板，带铭牌和装饰边角",
      code: `<div className="relative">
  <!-- Character nameplate badge -->
  <div className="absolute -top-3 left-6 inline-block px-4 py-1 bg-[#6366f1] rounded-sm z-10">
    <span className="text-white text-xs font-sans font-semibold">Sakura</span>
  </div>
  <div className="bg-[#1a202c]/85 backdrop-blur-md rounded-lg p-6 pt-8 border border-[#6366f1]/20 relative">
    <!-- Ornate corner decorations -->
    <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-[#6366f1]/30" />
    <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-[#6366f1]/30" />
    <p className="text-white/85 font-serif text-base leading-relaxed">
      "The cherry blossoms are beautiful this time of year..."
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "存档界面输入框，暗色毛玻璃风格",
      code: `<input
  type="text"
  placeholder="Enter your name..."
  className="
    w-full px-4 py-3
    bg-white/[0.06]
    border border-[#6366f1]/20
    rounded-lg
    text-white placeholder-white/25
    font-sans
    backdrop-blur-sm
    focus:border-[#6366f1]/50
    focus:shadow-[0_0_12px_#6366f120]
    focus:outline-none
    transition-all duration-300
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "ADV场景Hero，带天空渐变、角色剪影和底部对话面板",
      code: `<section className="min-h-[85vh] flex flex-col relative">
  <!-- Scene background with sky gradient -->
  <div className="flex-1 relative flex items-center justify-center px-6 pt-12"
    style={{ background: "linear-gradient(180deg, #4a6fa5 0%, #7b9cc7 40%, #c4a882 70%, #e8c19a 100%)" }}>
    <!-- Character silhouettes -->
    <div className="absolute bottom-0 left-[15%] w-40 h-72 bg-[#2d3748]/10 rounded-t-full" />
    <div className="absolute bottom-0 right-[18%] w-36 h-64 bg-[#2d3748]/[0.06] rounded-t-full" />
    <!-- Title floating in sky -->
    <div className="text-center relative z-10">
      <h1 className="text-5xl md:text-7xl font-serif text-white/90 drop-shadow-sm">Visual Novel</h1>
      <p className="text-white/50 font-sans text-sm tracking-[0.3em] uppercase">Interactive Storytelling</p>
    </div>
  </div>
  <!-- ADV dialogue panel at bottom -->
  <div className="bg-[#1a202c]/90 backdrop-blur-md border-t border-[#6366f1]/20 px-6 py-6 relative">
    <!-- Ornate corner decorations -->
    <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-[#6366f1]/40" />
    <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-[#6366f1]/40" />
    <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-[#6366f1]/40" />
    <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-[#6366f1]/40" />
    <div className="max-w-4xl mx-auto">
      <div className="inline-block px-4 py-1 bg-[#6366f1] rounded-sm mb-3">
        <span className="text-white text-sm font-sans font-semibold">Narrator</span>
      </div>
      <p className="text-white/85 font-serif text-lg leading-relaxed">
        "The story begins on a quiet spring morning..."
      </p>
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
  --vn-dark: #1a202c;
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

/* Ornate corner decoration frame */
.vn-ornate-frame {
  position: relative;
}
.vn-ornate-frame::before,
.vn-ornate-frame::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  pointer-events: none;
}
.vn-ornate-frame::before {
  top: 8px;
  left: 8px;
  border-left: 2px solid rgba(99, 102, 241, 0.4);
  border-top: 2px solid rgba(99, 102, 241, 0.4);
}
.vn-ornate-frame::after {
  top: 8px;
  right: 8px;
  border-right: 2px solid rgba(99, 102, 241, 0.4);
  border-top: 2px solid rgba(99, 102, 241, 0.4);
}

/* Character nameplate badge */
.vn-nameplate {
  display: inline-block;
  padding: 2px 12px;
  border-radius: 2px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
}

/* Choice button hover glow */
.vn-choice:hover {
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.15);
}

/* Scene gradient overlay */
.vn-scene-sunset {
  background: linear-gradient(180deg, #4a6fa5 0%, #7b9cc7 40%, #c4a882 70%, #e8c19a 100%);
}`,

  aiRules: `You are a Visual Novel design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Heavy brutalist borders (border-4+)
- Neon glow or RGB split shadow effects
- Pixel art style elements
- Harsh, highly saturated neon colors
- Monospace fonts for main content
- Pure black backgrounds
- Sharp edges without rounding (rounded-none)
- Terminal-style uppercase with tracking-widest

## Must Follow

- Dark dialog panels: bg-[#1a202c]/85 with backdrop-blur-md
- Light info panels: bg-white/70 with backdrop-blur-md
- Serif font for all narrative/dialog text (font-serif)
- Sans-serif font for UI elements (font-sans font-medium)
- Rounded corners: rounded-lg on all panels and buttons
- Soft shadows: shadow-sm, shadow-md
- Ornate L-shaped corner decorations on dialog panels
- Character nameplate badges: colored inline-block with rounded-sm

## Color Palette

Primary:
- Slate: #4a5568 (text, borders)
- Light BG: #f7fafc (page background)
- Dark Panel: #1a202c (dialog backgrounds at /85 or /90 opacity)
- Indigo: #6366f1 (primary accent, nameplates, borders)
- Pink: #ec4899 (secondary accent, alternate nameplates)
- Emerald: #10b981 (tertiary accent, alternate nameplates)

## Unique Elements

- ADV-format dialogue panel: dark semi-transparent panel fixed to bottom with ornate corner decorations and character nameplate
- Character nameplate badges: small colored rectangle positioned overlapping the card border (absolute -top-3 left-6)
- Ornate corner decorations: L-shaped border patterns (border-l + border-t) at panel corners
- Choice button grid: full-width frosted glass buttons with ChevronRight icon and left-aligned text
- Scene background: sky gradient with character silhouettes (rounded-t-full ellipse shapes)
- Save screen panel: dark panel with ornate corners, form inputs, and dual action buttons`,

  examplePrompts: [
    {
      title: "视觉小说对话页面",
      titleEn: "Visual Novel Dialog Page",
      description: "ADV格式的交互对话页面，带铭牌和装饰边角",
      descriptionEn: "ADV-format interactive dialog page with nameplate badges and ornate corners",
      prompt: `Use Visual Novel style to create an interactive story page:
1. Scene: full-screen sky gradient with character silhouettes at bottom
2. ADV dialog panel: semi-transparent dark panel at bottom with ornate L-shaped corner decorations
3. Character nameplate: colored badge above the dialog box text
4. Choice buttons: full-width frosted glass panels with hover glow and right arrow
5. Cards: scene chapter cards with header image area and nameplate badge overlapping the border
6. Form: save screen with ornate corner frame, dark backdrop, and dual-color labeled inputs`,
    },
  ],
};
