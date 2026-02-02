import { DesignStyle } from "./index";

export const heroFullscreen: DesignStyle = {
  slug: "hero-fullscreen",
  name: "全屏英雄区布局",
  nameEn: "Fullscreen Hero",
  description:
    "以全屏大图或视频为背景的英雄区布局，通过震撼的视觉效果抓住注意力，适合品牌展示、产品发布、活动宣传。",
  cover: "/styles/hero-fullscreen.png",
  styleType: "layout",
  tags: ["expressive", "modern"],
  compatibleWith: ["glassmorphism", "modern-gradient", "cyberpunk-neon", "minimalist-flat", "dark-mode"],
  category: "expressive",
  colors: {
    primary: "#ffffff",
    secondary: "#000000",
    accent: ["#ff6b6b", "#4ecdc4", "#ffe66d", "#6c5ce7"],
  },
  keywords: ["全屏", "英雄区", "大图", "视频", "品牌", "震撼"],

  philosophy: `Fullscreen Hero（全屏英雄区布局）是一种以视觉冲击力为核心的布局方式，用全屏图片或视频创造沉浸式第一印象。

核心理念：
- 第一印象：用震撼视觉立即抓住访客
- 品牌表达：通过图像传达品牌调性
- 聚焦核心：突出最重要的信息和行动
- 情感连接：通过视觉建立情感共鸣`,

  doList: [
    "使用 h-screen 或 min-h-screen 确保全屏",
    "图片使用 object-cover 保持比例填充",
    "添加渐变或半透明遮罩保证文字可读",
    "内容绝对定位或 flex 居中",
    "提供滚动提示引导用户往下看",
    "视频背景静音自动播放",
    "提供降级方案（图片替代视频）",
  ],

  dontList: [
    "禁止文字直接放在复杂背景上无遮罩",
    "禁止使用低质量或拉伸的图片",
    "禁止忽略移动端的适配",
    "禁止内容占据全部空间无留白",
    "禁止视频有声音自动播放",
  ],

  components: {
    button: {
      name: "英雄区按钮",
      description: "全屏英雄区中的 CTA 按钮",
      code: `<div className="flex flex-col sm:flex-row gap-4">
  <button className="
    px-8 py-4
    bg-white text-black
    font-semibold text-lg
    rounded-full
    hover:bg-white/90
    transition-colors
  ">
    Get Started
  </button>
  <button className="
    px-8 py-4
    bg-transparent text-white
    font-semibold text-lg
    rounded-full
    border-2 border-white
    hover:bg-white/10
    transition-colors
  ">
    Learn More
  </button>
</div>`,
    },
    card: {
      name: "特性卡片",
      description: "英雄区下方的特性展示卡片",
      code: `<div className="
  p-8
  bg-white/10 backdrop-blur-sm
  rounded-2xl
  border border-white/20
">
  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  </div>
  <h3 className="text-xl font-semibold text-white mb-2">
    Feature Title
  </h3>
  <p className="text-white/70">
    Brief description of the feature.
  </p>
</div>`,
    },
    input: {
      name: "邮箱订阅",
      description: "英雄区的邮箱收集表单",
      code: `<form className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
  <input
    type="email"
    placeholder="Enter your email"
    className="
      flex-1 px-6 py-4
      bg-white/10 backdrop-blur-sm
      border border-white/30
      rounded-full
      text-white placeholder-white/60
      focus:outline-none focus:ring-2 focus:ring-white/50
    "
  />
  <button className="
    px-8 py-4
    bg-white text-black
    font-semibold
    rounded-full
    hover:bg-white/90
    transition-colors
    whitespace-nowrap
  ">
    Subscribe
  </button>
</form>`,
    },
    nav: {
      name: "透明导航",
      description: "全屏英雄区顶部的透明导航",
      code: `<nav className="
  absolute top-0 left-0 right-0 z-50
  px-6 py-4
  flex items-center justify-between
">
  <a href="/" className="text-white text-2xl font-bold">
    Logo
  </a>
  <div className="hidden md:flex items-center gap-8">
    <a href="#" className="text-white/80 hover:text-white transition-colors">Features</a>
    <a href="#" className="text-white/80 hover:text-white transition-colors">Pricing</a>
    <a href="#" className="text-white/80 hover:text-white transition-colors">About</a>
    <button className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors">
      Sign Up
    </button>
  </div>
  <button className="md:hidden text-white">
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
</nav>`,
    },
    hero: {
      name: "全屏英雄区",
      description: "完整的全屏英雄区布局",
      code: `<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/hero-bg.jpg"
      alt=""
      className="w-full h-full object-cover"
    />
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/50" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
  </div>

  {/* Navigation */}
  <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between">
    <a href="/" className="text-white text-2xl font-bold">Logo</a>
    <div className="hidden md:flex items-center gap-8">
      <a href="#" className="text-white/80 hover:text-white">Features</a>
      <a href="#" className="text-white/80 hover:text-white">Pricing</a>
      <a href="#" className="text-white/80 hover:text-white">About</a>
      <button className="px-6 py-2 bg-white text-black rounded-full font-medium">Sign Up</button>
    </div>
  </nav>

  {/* Content */}
  <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
    <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
      Announcing our new product
    </span>
    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
      Build Something
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"> Amazing</span>
    </h1>
    <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto">
      The platform that helps you create incredible experiences your users will love.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="px-8 py-4 bg-white text-black font-semibold text-lg rounded-full hover:bg-white/90 transition-colors">
        Get Started Free
      </button>
      <button className="px-8 py-4 bg-transparent text-white font-semibold text-lg rounded-full border-2 border-white hover:bg-white/10 transition-colors">
        Watch Demo
      </button>
    </div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 animate-bounce">
    <span className="text-sm">Scroll to explore</span>
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  </div>
</section>`,
    },
  },

  globalCss: `/* Fullscreen Hero Global Styles */

/* Base hero container */
.hero-fullscreen {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Background image/video */
.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Video background */
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Overlay variations */
.hero-overlay {
  position: absolute;
  inset: 0;
}

.hero-overlay-dark {
  background: rgba(0, 0, 0, 0.5);
}

.hero-overlay-gradient {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
}

.hero-overlay-color {
  background: rgba(99, 102, 241, 0.7);
  mix-blend-mode: multiply;
}

/* Content container */
.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 1rem;
  max-width: 64rem;
}

/* Scroll indicator animation */
@keyframes hero-bounce {
  0%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  50% {
    transform: translateY(10px) translateX(-50%);
  }
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  animation: hero-bounce 2s infinite;
}

/* Parallax effect */
.hero-parallax {
  transform: translateZ(0);
  will-change: transform;
}

/* Ken Burns effect for images */
@keyframes kenburns {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}

.hero-kenburns .hero-bg {
  animation: kenburns 20s ease-out forwards;
}`,

  aiRules: `You are a frontend expert specializing in Fullscreen Hero layout. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Do NOT place text on busy backgrounds without overlay
- Do NOT use low-quality or stretched images
- Do NOT ignore mobile responsiveness
- Do NOT fill entire viewport with no breathing room
- Do NOT autoplay video with sound

## Must Follow

- Container: min-h-screen or h-screen
- Background: object-cover for images
- Overlay: gradient or solid for text readability
- Content: centered with max-width constraint
- Scroll indicator: at bottom of hero
- Navigation: absolute positioned, transparent

## Structure

Layers (bottom to top):
1. Background image/video (absolute, full cover)
2. Overlay (gradient or solid color)
3. Content (relative z-10, centered)
4. Navigation (absolute top)
5. Scroll indicator (absolute bottom)

## Background Options

Image:
- object-fit: cover
- Full viewport coverage
- High quality, relevant imagery

Video:
- Muted, autoplay, loop
- Fallback poster image
- Pause on mobile (optional)

Overlay types:
- Solid: bg-black/50
- Gradient: from-black/80 via-transparent to-black/30
- Color: bg-brand/70 mix-blend-multiply

## Content

- Badge/label (optional)
- Main headline (large, bold)
- Subheadline (medium)
- CTA buttons (prominent)
- Max-width container (4xl recommended)

## Responsive

Mobile:
- Smaller text sizes
- Stacked CTA buttons
- Simpler background (may hide video)

Desktop:
- Full visual impact
- Side-by-side buttons
- All animations enabled

## Self-Check

After generating code, verify:
1. Hero is full viewport height
2. Text is readable on background
3. Overlay provides contrast
4. Scroll indicator visible
5. Mobile layout works`,

  examplePrompts: [
    {
      title: "产品发布页",
      titleEn: "Product Launch",
      description: "新产品发布的震撼首屏",
      descriptionEn: "Impactful hero for product launch",
      prompt: `Create a product launch fullscreen hero:
1. Full viewport height with product image background
2. Dark gradient overlay for text contrast
3. Badge: "Announcing [Product Name]"
4. Large headline with gradient text highlight
5. Subheadline describing key benefit
6. Two CTAs: "Pre-order Now" and "Learn More"
7. Scroll indicator at bottom
8. Transparent navbar at top
Modern, tech-forward aesthetic`,
    },
    {
      title: "品牌故事",
      titleEn: "Brand Story",
      description: "品牌展示的全屏视觉",
      descriptionEn: "Fullscreen visual for brand",
      prompt: `Create a brand story fullscreen hero:
1. Video background (lifestyle footage) with muted autoplay
2. Subtle overlay with brand color tint
3. Centered brand logo (large)
4. Brand tagline below logo
5. Single CTA: "Explore Our Story"
6. Social links at bottom corners
7. Sound toggle button (optional)
Elegant, premium brand feel`,
    },
    {
      title: "活动宣传",
      titleEn: "Event Promotion",
      description: "活动或会议的宣传首屏",
      descriptionEn: "Event or conference promotion hero",
      prompt: `Create an event promotion fullscreen hero:
1. Event venue/crowd image as background
2. Strong dark overlay for readability
3. Event name in large display font
4. Date and location prominently shown
5. Countdown timer to event
6. CTA: "Register Now" with early bird badge
7. Speaker photos strip at bottom (optional)
Energetic, exciting event atmosphere`,
    },
  ],
};
