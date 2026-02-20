import { DesignStyle } from "./index";

export const parallaxSections: DesignStyle = {
  slug: "parallax-sections",
  name: "视差滚动",
  nameEn: "Parallax Sections",
  description:
    "通过固定背景和滚动内容创造深度视差效果的沉浸式布局，每个全屏区块都有独立的背景层，适合品牌故事、产品展示和沉浸式体验页面。",
  cover: "/styles/parallax-sections.svg",
  styleType: "layout",
  tags: ["modern", "expressive", "responsive"],
  compatibleWith: ["hero-fullscreen", "full-page-scroll", "editorial", "modern-gradient"],
  category: "modern",
  colors: {
    primary: "#1e3a5f",
    secondary: "#f8fafc",
    accent: ["#3b82f6", "#93c5fd", "#0ea5e9"],
  },
  keywords: ["视差", "滚动", "深度", "层次", "沉浸", "固定背景", "全屏"],

  philosophy: `Parallax Sections 通过背景与前景的差速滚动创造深度感，让用户在滚动中体验层次分明的视觉旅程。

核心理念：
- 深度层次：背景固定，内容滚动，创造三维空间感
- 沉浸体验：每个区块独立成景，像翻阅画册
- 节奏控制：通过全屏区块控制用户的浏览节奏
- 视觉焦点：每个区块突出一个主要信息点`,

  doList: [
    "使用 bg-fixed 创造固定背景视差效果",
    "每个区块使用 min-h-screen 全屏高度",
    "内容区使用半透明背景 bg-white/90 增强可读性",
    "使用 sticky top-0 创造粘性滚动效果",
    "背景图片使用 bg-cover bg-center 保证比例",
    "过渡区块使用渐变或模糊效果",
    "交互优先通过透明度和 blur 变化表达景深，避免大位移动画引发眩晕",
    "卡片可加入缓慢扫光层（Glass Glare）增强镜头反光感",
    "统一使用较长缓动 duration-500/700 营造电影式叙事节奏",
  ],

  dontList: [
    "禁止背景图片和内容对比度不足",
    "禁止区块高度不一致破坏节奏",
    "禁止过多视差层级造成性能问题",
    "禁止忽略移动端的视差降级处理",
    "禁止内容过于密集破坏焦点",
    "禁止卡片 hover 大幅上下跳动（背景已有位移，前景应克制）",
    "禁止短促急促动画（会破坏沉浸叙事）",
  ],

  components: {
    button: {
      name: "按钮",
      description: "带模糊背景的沉浸式按钮，强调玻璃态光学变化",
      code: `<button className="
  px-10 py-4
  bg-white/10 backdrop-blur-md
  text-white
  uppercase tracking-widest
  rounded-full
  font-medium
  border border-white/20
  hover:bg-white/30 hover:border-white/50
  hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]
  active:bg-white/5
  transition-all duration-500 ease-out
">
  Explore Story
</button>`,
    },
    card: {
      name: "内容卡片",
      description: "半透明背景内容卡片，强调景深与玻璃反光层",
      code: `<div className="
  group relative p-10 md:p-14
  bg-black/40 backdrop-blur-md
  rounded-2xl
  border border-white/10
  hover:bg-black/60 hover:border-white/30 hover:backdrop-blur-xl
  transition-all duration-700 ease-out
  max-w-2xl
  overflow-hidden
">
  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
  <h3 className="text-4xl font-light text-white mb-6 tracking-wide group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] transition-all duration-500">The Parallax View</h3>
  <p className="text-white/70 leading-relaxed text-lg font-light group-hover:text-white/90 transition-colors duration-500">
    Scroll to reveal layered storytelling. Foreground stays calm while background depth keeps moving.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "模糊背景的输入框",
      code: `<input
  type="email"
  className="
    w-full px-6 py-4
    bg-white/20 backdrop-blur-md
    text-white placeholder-white/60
    rounded-full
    border border-white/30
    focus:border-white/60 focus:outline-none
    transition-colors
  "
  placeholder="Enter your email"
/>`,
    },
    nav: {
      name: "浮动导航",
      description: "透明模糊背景的固定导航",
      code: `<nav className="
  fixed top-0 left-0 right-0 z-50
  px-8 py-4
  bg-white/10 backdrop-blur-lg
  border-b border-white/10
">
  <div className="flex items-center justify-between max-w-7xl mx-auto">
    <span className="text-xl font-bold text-white">PARALLAX</span>
    <div className="flex gap-8">
      <a href="#" className="text-white/80 hover:text-white transition-colors">Story</a>
      <a href="#" className="text-white/80 hover:text-white transition-colors">Features</a>
      <a href="#" className="text-white/80 hover:text-white transition-colors">Contact</a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "视差 Hero",
      description: "全屏固定背景的主视觉",
      code: `<div className="
  relative
  min-h-screen
  bg-fixed bg-cover bg-center
  flex flex-col items-center justify-center
" style={{ backgroundImage: 'url(/images/parallax-hero.jpg)' }}>
  <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a5f]/80 via-[#1e3a5f]/40 to-transparent" />
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
      Immersive<br/>Experience
    </h1>
    <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
      Scroll down to explore the depth of parallax
    </p>
    <div className="animate-bounce mt-12">
      <svg className="w-8 h-8 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </div>
</div>`,
    },
  },

  globalCss: `/* Parallax Sections 全局样式 */
.parallax-sections {
  --ps-primary: #1e3a5f;
  --ps-light: #93c5fd;
  --ps-accent: #3b82f6;
}

.parallax-section {
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}`,

  aiRules: `你是 Parallax Sections 布局专家。生成代码必须遵守：

## 布局规则
- 每个区块使用 min-h-screen 全屏高度
- 背景使用 bg-fixed bg-cover bg-center
- 内容使用半透明背景（场景可选 bg-white/90 或 bg-black/40）并配合 backdrop-blur
- 导航使用 fixed + backdrop-blur-lg

## 禁止
- 使用 bg-scroll（破坏视差效果）
- 区块高度不一致
- 背景与内容对比度不足

## Animation & Interaction Rules
- Decoupled Depth: 前景卡片避免大幅 Y 轴浮动，优先用透明度与 blur 强化景深反馈。
- Glass Glare: 可使用渐变扫光层在 hover 时缓慢浮现，模拟镜头反光。
- Cinematic Slowness: 交互节奏使用 duration-500 到 700，保持叙事连贯和沉浸感。
- Immersive Focus: active 反馈优先背景明暗变化，避免明显缩放破坏排版稳定。`,
};
