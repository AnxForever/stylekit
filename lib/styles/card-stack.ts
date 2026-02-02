import { DesignStyle } from "./index";

export const cardStack: DesignStyle = {
  slug: "card-stack",
  name: "卡片堆叠布局",
  nameEn: "Card Stack",
  description:
    "卡片前后重叠的立体布局，通过 Z 轴层叠和偏移创造深度感，适合轮播、步骤展示、卡组选择。",
  cover: "/styles/card-stack.png",
  styleType: "layout",
  tags: ["modern", "expressive"],
  compatibleWith: ["glassmorphism", "neumorphism", "soft-ui", "modern-gradient", "neo-brutalist"],
  category: "expressive",
  colors: {
    primary: "#1a1a2e",
    secondary: "#f0f0f5",
    accent: ["#6c5ce7", "#00cec9", "#fd79a8", "#ffeaa7"],
  },
  keywords: ["卡片", "堆叠", "立体", "层叠", "轮播", "3D"],

  philosophy: `Card Stack（卡片堆叠布局）是一种利用 Z 轴创造深度感的布局方式，多张卡片前后重叠，形成视觉层次。

核心理念：
- 深度感知：通过层叠暗示更多内容
- 焦点引导：最前面的卡片获得最多关注
- 交互预期：暗示可以翻阅或切换
- 空间节省：在有限空间展示多个选项`,

  doList: [
    "使用 transform 和 z-index 创建层叠效果",
    "后方卡片缩小和偏移 scale-95 translate-y-4",
    "添加渐进的透明度 opacity-80, opacity-60",
    "支持拖拽或点击切换卡片",
    "添加流畅的过渡动画 transition-all duration-300",
    "限制可见卡片数量（通常 3-5 张）",
    "提供视觉提示说明可以交互",
  ],

  dontList: [
    "禁止堆叠过多卡片导致混乱",
    "禁止卡片完全重叠看不出层次",
    "禁止忽略交互反馈",
    "禁止动画过于复杂影响性能",
    "禁止在移动端使用过于复杂的手势",
  ],

  components: {
    button: {
      name: "切换按钮",
      description: "用于切换卡片的导航按钮",
      code: `<div className="flex items-center gap-4">
  <button className="
    w-12 h-12
    flex items-center justify-center
    bg-white
    rounded-full
    shadow-lg
    hover:shadow-xl
    transition-shadow
  ">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
  <button className="
    w-12 h-12
    flex items-center justify-center
    bg-white
    rounded-full
    shadow-lg
    hover:shadow-xl
    transition-shadow
  ">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>`,
    },
    card: {
      name: "堆叠卡片",
      description: "可堆叠的基础卡片",
      code: `<div className="
  relative
  w-80
  p-8
  bg-white
  rounded-2xl
  shadow-xl
  transition-all duration-300
  hover:shadow-2xl
">
  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-6" />
  <h3 className="text-xl font-bold text-zinc-900 mb-3">
    Card Title
  </h3>
  <p className="text-zinc-600">
    This card can be stacked with others to create a layered effect.
  </p>
</div>`,
    },
    input: {
      name: "卡片搜索",
      description: "在卡片堆中搜索",
      code: `<div className="relative">
  <input
    type="text"
    placeholder="Search cards..."
    className="
      w-full px-5 py-3
      bg-white/80 backdrop-blur
      border border-zinc-200
      rounded-xl
      text-zinc-900
      placeholder-zinc-400
      focus:outline-none focus:ring-2 focus:ring-purple-500/30
      transition-all
    "
  />
  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
</div>`,
    },
    nav: {
      name: "卡片指示器",
      description: "显示当前卡片位置",
      code: `<nav className="flex items-center justify-center gap-2">
  <button className="w-2.5 h-2.5 rounded-full bg-purple-500 transition-all" />
  <button className="w-2 h-2 rounded-full bg-zinc-300 hover:bg-zinc-400 transition-all" />
  <button className="w-2 h-2 rounded-full bg-zinc-300 hover:bg-zinc-400 transition-all" />
  <button className="w-2 h-2 rounded-full bg-zinc-300 hover:bg-zinc-400 transition-all" />
</nav>`,
    },
    hero: {
      name: "卡片堆叠展示",
      description: "完整的卡片堆叠布局",
      code: `<section className="py-20 px-4 bg-gradient-to-br from-slate-900 to-slate-800">
  <div className="max-w-6xl mx-auto">
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
      <p className="text-slate-400">Swipe or click to browse options</p>
    </div>

    {/* Card Stack */}
    <div className="relative h-[400px] flex items-center justify-center">
      {/* Card 3 (Back) */}
      <div className="
        absolute
        w-80 p-8
        bg-white rounded-2xl shadow-lg
        transform scale-90 translate-y-8
        opacity-50
        z-10
      ">
        <div className="w-10 h-10 bg-amber-100 rounded-lg mb-4" />
        <h3 className="text-lg font-bold text-zinc-900">Enterprise</h3>
      </div>

      {/* Card 2 (Middle) */}
      <div className="
        absolute
        w-80 p-8
        bg-white rounded-2xl shadow-xl
        transform scale-95 translate-y-4
        opacity-75
        z-20
      ">
        <div className="w-10 h-10 bg-emerald-100 rounded-lg mb-4" />
        <h3 className="text-lg font-bold text-zinc-900">Professional</h3>
        <p className="text-zinc-600 text-sm mt-2">Most popular choice</p>
      </div>

      {/* Card 1 (Front) */}
      <div className="
        absolute
        w-80 p-8
        bg-white rounded-2xl shadow-2xl
        z-30
        hover:scale-105
        transition-transform duration-300
        cursor-pointer
      ">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4" />
        <h3 className="text-xl font-bold text-zinc-900 mb-2">Starter</h3>
        <p className="text-zinc-600 text-sm mb-4">Perfect for getting started</p>
        <div className="text-3xl font-bold text-zinc-900 mb-4">
          $9<span className="text-lg font-normal text-zinc-500">/mo</span>
        </div>
        <button className="w-full py-3 bg-zinc-900 text-white rounded-xl font-medium hover:bg-zinc-800 transition-colors">
          Get Started
        </button>
      </div>
    </div>

    {/* Navigation */}
    <div className="flex items-center justify-center gap-8 mt-8">
      <button className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="flex gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-white" />
        <div className="w-2 h-2 rounded-full bg-white/30" />
        <div className="w-2 h-2 rounded-full bg-white/30" />
      </div>
      <button className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</section>`,
    },
  },

  globalCss: `/* Card Stack Global Styles */

/* Stack container */
.card-stack {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
}

/* Base card in stack */
.card-stack-item {
  position: absolute;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Stack positions */
.card-stack-item:nth-child(1) {
  z-index: 30;
  transform: translateY(0) scale(1);
  opacity: 1;
}

.card-stack-item:nth-child(2) {
  z-index: 20;
  transform: translateY(16px) scale(0.95);
  opacity: 0.75;
}

.card-stack-item:nth-child(3) {
  z-index: 10;
  transform: translateY(32px) scale(0.9);
  opacity: 0.5;
}

.card-stack-item:nth-child(n+4) {
  z-index: 0;
  transform: translateY(48px) scale(0.85);
  opacity: 0;
  pointer-events: none;
}

/* Fan out on hover */
.card-stack:hover .card-stack-item:nth-child(1) {
  transform: translateY(-10px) scale(1);
}

.card-stack:hover .card-stack-item:nth-child(2) {
  transform: translateY(24px) scale(0.95);
}

.card-stack:hover .card-stack-item:nth-child(3) {
  transform: translateY(48px) scale(0.9);
}

/* Tinder-style swipe */
.card-stack-swipe .card-stack-item.swiping-left {
  transform: translateX(-100%) rotate(-10deg);
  opacity: 0;
}

.card-stack-swipe .card-stack-item.swiping-right {
  transform: translateX(100%) rotate(10deg);
  opacity: 0;
}

/* 3D rotation variant */
.card-stack-3d .card-stack-item:nth-child(2) {
  transform: translateY(16px) scale(0.95) rotateX(5deg);
}

.card-stack-3d .card-stack-item:nth-child(3) {
  transform: translateY(32px) scale(0.9) rotateX(10deg);
}`,

  aiRules: `You are a frontend expert specializing in Card Stack layout. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Do NOT stack too many visible cards (max 3-5)
- Do NOT overlap cards completely (need visual distinction)
- Do NOT forget interaction feedback
- Do NOT use overly complex animations
- Do NOT use complex gestures on mobile

## Must Follow

- Use transform for positioning: scale, translateY
- Use z-index for layering: z-30, z-20, z-10
- Progressive opacity: 100%, 75%, 50%
- Smooth transitions: transition-all duration-300
- Clear hover/active states
- Limit visible cards: 3-5 maximum

## Stack Structure

Container:
- relative position
- flex center alignment
- Fixed height for consistent layout

Cards (front to back):
- Card 1: z-30, scale-100, opacity-100
- Card 2: z-20, scale-95, translateY-4, opacity-75
- Card 3: z-10, scale-90, translateY-8, opacity-50
- Beyond: hidden or very faded

## Interactions

Hover:
- Front card lifts slightly
- Stack spreads out

Click/Tap:
- Current card moves to back
- Next card animates to front

Swipe (optional):
- Tinder-style left/right swipe
- Card rotates and fades out

## Animation

- Use cubic-bezier for smooth motion
- Card transitions: 300-400ms
- Consider spring physics for natural feel

## Self-Check

After generating code, verify:
1. Cards are visually layered
2. Front card is clearly prominent
3. Interaction works smoothly
4. Max 3-5 visible cards
5. Mobile-friendly touch targets`,

  examplePrompts: [
    {
      title: "定价方案选择",
      titleEn: "Pricing Plans",
      description: "堆叠展示不同定价方案",
      descriptionEn: "Stacked pricing plan cards",
      prompt: `Create pricing cards with stack layout:
1. 3 cards stacked: Starter, Pro, Enterprise
2. Front card fully visible with details
3. Back cards scaled down and offset
4. Click to bring card to front
5. Each card: plan name, price, features list, CTA
6. Smooth animation on card switch
7. Navigation arrows on sides
Dark gradient background, white cards`,
    },
    {
      title: "产品卡组",
      titleEn: "Product Cards",
      description: "类似 Tinder 的产品浏览",
      descriptionEn: "Tinder-like product browsing",
      prompt: `Create a Tinder-style product card stack:
1. Stack of product cards (5 cards, 3 visible)
2. Swipe right to like, left to pass
3. Each card: product image, name, price, rating
4. Swipe animation with rotation
5. Undo last action button
6. Match counter at top
7. Category tabs to filter
Fun, interactive, mobile-friendly design`,
    },
    {
      title: "步骤引导",
      titleEn: "Step Guide",
      description: "分步引导的卡片堆叠",
      descriptionEn: "Step-by-step guide cards",
      prompt: `Create an onboarding flow with card stack:
1. 4 step cards stacked
2. Current step card in front
3. Click Next to advance (card slides out)
4. Click Back to return (card slides in)
5. Progress indicator dots
6. Each card: step number, title, illustration, description
7. Final card has CTA button
Clean design with subtle animations`,
    },
  ],
};
