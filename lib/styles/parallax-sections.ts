import { DesignStyle } from "./index";

export const parallaxSections: DesignStyle = {
  slug: "parallax-sections",
  name: "视差滚动",
  nameEn: "Parallax Sections",
  description:
    "通过固定背景和滚动内容创造深度视差效果的沉浸式布局，每个全屏区块都有独立的背景层，适合品牌故事、产品展示和沉浸式体验页面。",
  descriptionEn:
    "An immersive layout creating depth parallax effects through fixed backgrounds and scrolling content, with each full-screen section having its own background layer. Ideal for brand stories, product showcases, and immersive experience pages.",
  cover: "/styles/parallax-sections.svg",
  styleType: "layout",
  tags: ["modern", "expressive", "responsive"],
  compatibleWith: ["hero-fullscreen", "full-page-scroll", "editorial", "modern-gradient"],
  category: "modern",
  colors: {
    primary: "#1e3a5f",
    secondary: "#f8fafc",
    accent: ["#3b82f6", "#93c5fd", "#0ea5e9", "#c559f0"],
  },
  keywords: ["视差", "滚动", "深度", "层次", "沉浸", "固定背景", "全屏", "modern", "contemporary", "sleek"],

  philosophy: `Parallax Sections 通过背景与前景的差速滚动创造深度感，让用户在滚动中体验层次分明的视觉旅程。

核心理念：
- 深度层次：背景固定，内容滚动，创造三维空间感
- 沉浸体验：每个区块独立成景，像翻阅画册
- 节奏控制：通过全屏区块控制用户的浏览节奏
- 视觉焦点：每个区块突出一个主要信息点

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Parallax Sections creates depth through differential scrolling speeds between background and foreground, letting users experience a layered visual journey while scrolling.

Core principles:
- Depth layering: Fixed backgrounds with scrolling content create a three-dimensional spatial feel
- Immersive experience: Each section stands as its own scene, like flipping through a picture book
- Rhythm control: Full-screen sections control the user's browsing pace
- Visual focus: Each section highlights one primary information point`,

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

  doListEn: [
    "Use bg-fixed to create fixed background parallax effect",
    "Each section uses min-h-screen full-screen height",
    "Content areas use semi-transparent backgrounds bg-white/90 for readability",
    "Use sticky top-0 for sticky scroll effects",
    "Background images use bg-cover bg-center to maintain proportions",
    "Transition sections use gradient or blur effects",
    "Interactions prioritize opacity and blur changes to express depth of field, avoiding large displacement animations that cause dizziness",
    "Cards can add slow sweep light layers (Glass Glare) to enhance lens reflection feel",
    "Uniformly use longer easing duration-500/700 for cinematic narrative rhythm",
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

  dontListEn: [
    "No insufficient contrast between background images and content",
    "No inconsistent section heights that break rhythm",
    "No excessive parallax layers causing performance issues",
    "No ignoring mobile parallax degradation handling",
    "No overly dense content that breaks focus",
    "No large vertical card hover jumps (background already has displacement, foreground should be restrained)",
    "No short, abrupt animations (would break immersive narrative)",
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

  examplePrompts: [
    {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 视差滚动风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Parallax Sections style",
      prompt: `Create a SaaS landing page using Parallax Sections style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 视差滚动风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Parallax Sections style",
      prompt: `Create a portfolio showcase page using Parallax Sections style with project grid, about section, contact form, and consistent visual language.`,
    },
  ],

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
}
@keyframes parallax-sections-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes parallax-sections-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.parallax-sections-card {
  position: relative;
  overflow: hidden;
}

.parallax-sections-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(30, 58, 95, 0.05), transparent);
  pointer-events: none;
}

.parallax-sections-card:hover::before {
  opacity: 1;
}

.parallax-sections-gradient {
  background: linear-gradient(135deg, #1e3a5f, #3b82f6);
}

.parallax-sections-gradient-text {
  background: linear-gradient(135deg, #1e3a5f, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.parallax-sections-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(30, 58, 95, 0.08);
}

.parallax-sections-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.parallax-sections-animate-in {
  animation: parallax-sections-fade-in 0.5s ease-out both;
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
- Immersive Focus: active 反馈优先背景明暗变化，避免明显缩放破坏排版稳定。

## Layout & Spacing
- Section padding: py-16 md:py-24
- Card padding: p-6 md:p-8
- Gap between cards: gap-6 md:gap-8
- Max content width: max-w-6xl mx-auto

## Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Stack elements vertically on mobile (flex-col), row on desktop (md:flex-row)
- Reduce font sizes on mobile: text-3xl md:text-5xl for headings
- Touch-friendly targets: min 44px for interactive elements

## Self-Check Verification
After generating code, verify:
1. All interactive elements have hover/focus/active states
2. Color contrast meets WCAG 2.1 AA (4.5:1 for text)
3. Layout is responsive across breakpoints
4. Typography hierarchy is clear (h1 > h2 > h3 > body)
5. Spacing is consistent using the defined scale
6. All animations respect prefers-reduced-motion`,

  aiRulesEn: `You are a Parallax Sections layout expert. Generated code must follow:

## Layout Rules
- Each section uses min-h-screen full-screen height
- Backgrounds use bg-fixed bg-cover bg-center
- Content uses semi-transparent backgrounds (bg-white/90 or bg-black/40 depending on scene) with backdrop-blur
- Navigation uses fixed + backdrop-blur-lg

## Forbidden
- Using bg-scroll (breaks parallax effect)
- Inconsistent section heights
- Insufficient contrast between background and content

## Animation & Interaction Rules
- Decoupled Depth: Foreground cards avoid large Y-axis floating, prioritize opacity and blur to reinforce depth of field feedback.
- Glass Glare: Can use gradient sweep layers that slowly appear on hover, simulating lens reflection.
- Cinematic Slowness: Interaction rhythm uses duration-500 to 700, maintaining narrative continuity and immersion.
- Immersive Focus: Active feedback prioritizes background brightness changes, avoiding obvious scaling that breaks layout stability.`,

  variants: [
    {
      id: "parallax-sections-warm",
      name: "视差滚动暖色版",
      nameEn: "Parallax Sections Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#353266",
        secondary: "#f9fbfc",
        accent: ["#816cff", "#b8b9ff", "#4e8dff"],
      },
    },
    {
      id: "parallax-sections-cool",
      name: "视差滚动冷色版",
      nameEn: "Parallax Sections Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#0d414d",
        secondary: "#dfe1e3",
        accent: ["#0697c5", "#7ad0df", "#00b69e"],
      },
    },
  ],
};
