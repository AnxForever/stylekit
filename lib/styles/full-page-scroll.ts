import { DesignStyle } from "./index";

export const fullPageScroll: DesignStyle = {
  slug: "full-page-scroll",
  name: "全屏滚动布局",
  nameEn: "Full Page Scroll",
  description:
    "每一屏占满整个视口的沉浸式滚动体验，通过滚动切换完整场景，适合品牌故事、产品介绍、作品集展示。",
  cover: "/styles/full-page-scroll.svg",
  styleType: "layout",
  tags: ["modern", "expressive"],
  compatibleWith: ["glassmorphism", "modern-gradient", "cyberpunk-neon", "minimalist-flat", "geometric-bold"],
  category: "expressive",
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    accent: ["#6366f1", "#ec4899", "#14b8a6", "#f59e0b"],
  },
  keywords: ["全屏", "滚动", "沉浸式", "场景", "品牌", "故事"],

  philosophy: `Full Page Scroll（全屏滚动布局）是一种将每个内容区块扩展到整个视口的布局方式，创造电影般的叙事体验。

核心理念：
- 沉浸体验：每一屏都是完整的视觉场景
- 叙事节奏：滚动即翻页，控制信息节奏
- 焦点集中：一次只展示一个核心信息
- 记忆深刻：场景化展示更易被记住`,

  doList: [
    "每个 section 设置 min-h-screen 或 h-screen",
    "使用 scroll-snap 实现平滑吸附 scroll-snap-type: y mandatory",
    "每屏内容垂直水平居中 flex items-center justify-center",
    "添加滚动指示器和页面导航点",
    "使用 CSS scroll-behavior: smooth",
    "考虑添加进入/离开动画",
    "提供跳过或快速导航选项",
  ],

  dontList: [
    "禁止内容超出单屏视口（需要滚动才能看完）",
    "禁止没有滚动提示（用户可能不知道往下滚）",
    "禁止动画过于复杂导致性能问题",
    "禁止锁定滚动时间过长",
    "禁止忽略移动端体验",
  ],

  components: {
    button: {
      name: "滚动提示按钮",
      description: "引导用户滚动的按钮",
      code: `<button className="
  absolute bottom-8 left-1/2 -translate-x-1/2
  flex flex-col items-center gap-2
  text-white/70 hover:text-white
  transition-colors
  animate-bounce
">
  <span className="text-sm uppercase tracking-widest">Scroll</span>
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
</button>`,
    },
    card: {
      name: "全屏内容卡片",
      description: "单屏展示的内容容器",
      code: `<section className="
  min-h-screen
  snap-start
  flex items-center justify-center
  p-8
  bg-gradient-to-br from-indigo-600 to-purple-700
">
  <div className="max-w-4xl text-center text-white">
    <span className="text-sm uppercase tracking-widest opacity-70 mb-4 block">
      Chapter 01
    </span>
    <h2 className="text-5xl lg:text-7xl font-bold mb-6">
      Section Title
    </h2>
    <p className="text-xl lg:text-2xl opacity-80 max-w-2xl mx-auto">
      This is a full-screen section that captures the entire viewport, creating an immersive experience.
    </p>
  </div>
</section>`,
    },
    input: {
      name: "联系表单",
      description: "全屏联系页面的表单",
      code: `<form className="w-full max-w-md space-y-6">
  <div>
    <input
      type="text"
      placeholder="Your Name"
      className="
        w-full px-0 py-4
        bg-transparent
        border-b border-white/30
        text-white text-lg
        placeholder-white/50
        focus:outline-none focus:border-white
        transition-colors
      "
    />
  </div>
  <div>
    <input
      type="email"
      placeholder="Your Email"
      className="
        w-full px-0 py-4
        bg-transparent
        border-b border-white/30
        text-white text-lg
        placeholder-white/50
        focus:outline-none focus:border-white
        transition-colors
      "
    />
  </div>
  <button className="
    w-full py-4 mt-8
    bg-white text-black
    font-semibold
    hover:bg-white/90
    transition-colors
  ">
    Send Message
  </button>
</form>`,
    },
    nav: {
      name: "页面导航点",
      description: "固定在侧边的页面指示器",
      code: `<nav className="
  fixed right-8 top-1/2 -translate-y-1/2 z-50
  flex flex-col gap-3
">
  <a href="#section-1" className="w-3 h-3 rounded-full bg-white opacity-100 transition-opacity" aria-label="Section 1" />
  <a href="#section-2" className="w-3 h-3 rounded-full bg-white opacity-30 hover:opacity-60 transition-opacity" aria-label="Section 2" />
  <a href="#section-3" className="w-3 h-3 rounded-full bg-white opacity-30 hover:opacity-60 transition-opacity" aria-label="Section 3" />
  <a href="#section-4" className="w-3 h-3 rounded-full bg-white opacity-30 hover:opacity-60 transition-opacity" aria-label="Section 4" />
</nav>`,
    },
    hero: {
      name: "全屏滚动页面",
      description: "完整的全屏滚动布局",
      code: `<main className="
  h-screen overflow-y-auto
  snap-y snap-mandatory
  scroll-smooth
">
  {/* Section 1 - Hero */}
  <section id="section-1" className="
    min-h-screen snap-start
    flex items-center justify-center
    bg-black text-white
    relative
  ">
    <div className="text-center">
      <h1 className="text-6xl lg:text-8xl font-bold mb-4">Welcome</h1>
      <p className="text-xl opacity-70">Scroll to explore</p>
    </div>
    <button className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </button>
  </section>

  {/* Section 2 - Feature */}
  <section id="section-2" className="
    min-h-screen snap-start
    flex items-center justify-center
    bg-gradient-to-br from-purple-600 to-pink-600 text-white
  ">
    <div className="max-w-4xl text-center px-8">
      <span className="text-sm uppercase tracking-widest opacity-70 mb-4 block">01</span>
      <h2 className="text-5xl lg:text-7xl font-bold mb-6">First Feature</h2>
      <p className="text-xl opacity-80">A compelling description of your first key feature.</p>
    </div>
  </section>

  {/* Section 3 - Feature */}
  <section id="section-3" className="
    min-h-screen snap-start
    flex items-center justify-center
    bg-gradient-to-br from-cyan-600 to-blue-600 text-white
  ">
    <div className="max-w-4xl text-center px-8">
      <span className="text-sm uppercase tracking-widest opacity-70 mb-4 block">02</span>
      <h2 className="text-5xl lg:text-7xl font-bold mb-6">Second Feature</h2>
      <p className="text-xl opacity-80">Another impressive feature description here.</p>
    </div>
  </section>

  {/* Section 4 - CTA */}
  <section id="section-4" className="
    min-h-screen snap-start
    flex items-center justify-center
    bg-zinc-900 text-white
  ">
    <div className="text-center px-8">
      <h2 className="text-5xl lg:text-6xl font-bold mb-8">Ready to Start?</h2>
      <button className="px-12 py-5 bg-white text-black font-semibold text-lg hover:bg-zinc-200 transition-colors">
        Get Started
      </button>
    </div>
  </section>

  {/* Navigation dots */}
  <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
    <a href="#section-1" className="w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-colors" />
    <a href="#section-2" className="w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-colors" />
    <a href="#section-3" className="w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-colors" />
    <a href="#section-4" className="w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-colors" />
  </nav>
</main>`,
    },
  },

  globalCss: `/* Full Page Scroll Global Styles */

/* Main container with snap scroll */
.fullpage-container {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

/* Each section */
.fullpage-section {
  min-height: 100vh;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Scroll indicator animation */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  50% {
    transform: translateY(10px) translateX(-50%);
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
}

/* Navigation dots */
.fullpage-nav {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.fullpage-nav-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: background 0.3s, transform 0.3s;
}

.fullpage-nav-dot:hover,
.fullpage-nav-dot.active {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.2);
}

/* Section entrance animations */
.fullpage-section [data-animate] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fullpage-section.in-view [data-animate] {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger children animations */
.fullpage-section.in-view [data-animate]:nth-child(1) { transition-delay: 0.1s; }
.fullpage-section.in-view [data-animate]:nth-child(2) { transition-delay: 0.2s; }
.fullpage-section.in-view [data-animate]:nth-child(3) { transition-delay: 0.3s; }
.fullpage-section.in-view [data-animate]:nth-child(4) { transition-delay: 0.4s; }`,

  aiRules: `You are a frontend expert specializing in Full Page Scroll layout. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Do NOT let content overflow beyond viewport height
- Do NOT omit scroll indicators
- Do NOT use heavy animations that hurt performance
- Do NOT lock scroll for too long
- Do NOT ignore mobile experience

## Must Follow

- Container: h-screen overflow-y-auto scroll-snap-type: y mandatory
- Sections: min-h-screen snap-start
- Content: centered with flex items-center justify-center
- Navigation: fixed dots on side
- Scroll indicator: at bottom of first section
- Smooth scrolling: scroll-behavior: smooth

## Section Structure

Each section:
- min-h-screen (full viewport height)
- snap-start (snap to section start)
- Content centered both ways
- Distinct background color/gradient
- Number indicator (01, 02, etc.)

## Navigation

Side dots:
- Fixed position on right side
- Vertical center aligned
- Click to scroll to section
- Active state indication

Scroll indicator:
- Bottom of first section
- Animated (bounce)
- Arrow down icon

## Responsive

Mobile:
- Same full-screen sections
- Navigation dots may hide or move
- Touch scroll friendly

Desktop:
- Full experience with all elements
- Keyboard navigation support

## Self-Check

After generating code, verify:
1. All sections are exactly viewport height
2. Scroll snapping works correctly
3. Navigation dots present
4. Scroll indicator visible
5. Content doesn't overflow`,

  examplePrompts: [
    {
      title: "品牌故事页",
      titleEn: "Brand Story Page",
      description: "讲述品牌历史的全屏滚动",
      descriptionEn: "Full page scroll for brand history",
      prompt: `Create a brand story page with full page scroll:
1. Container with scroll-snap-type: y mandatory
2. 5 sections, each min-h-screen with different gradient backgrounds
3. Section 1: Hero with brand name and tagline
4. Sections 2-4: Timeline moments with year, title, description
5. Section 5: CTA to explore more
6. Fixed navigation dots on right side
7. Scroll indicator on first section
Content centered, smooth transitions between sections`,
    },
    {
      title: "产品特性展示",
      titleEn: "Product Features",
      description: "一屏一特性的产品介绍",
      descriptionEn: "One feature per screen product intro",
      prompt: `Create a product features page with full page scroll:
1. 4 full-screen sections with scroll snap
2. Each section: feature icon, headline, description, visual
3. Alternating dark/light backgrounds
4. Section entrance animations (fade up)
5. Progress indicator showing current section
6. Final section with pricing CTA
7. Skip button to jump to end
Use bold typography, centered content`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "每个项目一屏的作品集",
      descriptionEn: "One project per screen portfolio",
      prompt: `Create a portfolio showcase with full page scroll:
1. Hero section with name and role
2. Each project in full-screen section
3. Project sections: large image, title, description, link
4. Different color schemes per project
5. Navigation dots with project names on hover
6. Final section with contact form
7. Smooth scroll between sections
Use dramatic visuals, minimal text`,
    },
  ],
};
