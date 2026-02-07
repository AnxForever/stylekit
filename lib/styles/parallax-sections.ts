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
  ],

  dontList: [
    "禁止背景图片和内容对比度不足",
    "禁止区块高度不一致破坏节奏",
    "禁止过多视差层级造成性能问题",
    "禁止忽略移动端的视差降级处理",
    "禁止内容过于密集破坏焦点",
  ],

  components: {
    button: {
      name: "按钮",
      description: "带模糊背景的浮动按钮",
      code: `<button className="
  px-8 py-4
  bg-white/20 backdrop-blur-md
  text-white
  rounded-full
  font-medium
  border border-white/30
  hover:bg-white/30
  transition-all duration-300
">
  Explore More
</button>`,
    },
    card: {
      name: "内容卡片",
      description: "半透明背景的内容卡片",
      code: `<div className="
  p-8 md:p-12
  bg-white/90 backdrop-blur-sm
  rounded-2xl
  shadow-xl
  max-w-2xl
">
  <h3 className="text-3xl font-bold text-[#1e3a5f] mb-4">Section Title</h3>
  <p className="text-gray-600 leading-relaxed">
    Scroll to reveal more content. Each section creates a unique visual moment.
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
- 内容使用半透明背景 bg-white/90 backdrop-blur
- 导航使用 fixed + backdrop-blur-lg

## 禁止
- 使用 bg-scroll（破坏视差效果）
- 区块高度不一致
- 背景与内容对比度不足`,
};
