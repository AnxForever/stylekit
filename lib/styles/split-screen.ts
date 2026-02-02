import { DesignStyle } from "./index";

export const splitScreen: DesignStyle = {
  slug: "split-screen",
  name: "分屏布局",
  nameEn: "Split Screen",
  description:
    "左右对称或不对称的分屏布局，通过对比和平衡创造视觉张力，常用于产品展示、品牌故事、比较页面。",
  cover: "/styles/split-screen.png",
  styleType: "layout",
  tags: ["modern", "responsive"],
  compatibleWith: ["neo-brutalist", "minimalist-flat", "editorial", "modern-gradient", "geometric-bold"],
  category: "modern",
  colors: {
    primary: "#0f0f0f",
    secondary: "#ffffff",
    accent: ["#ff4757", "#2ed573", "#1e90ff", "#ffa502"],
  },
  keywords: ["分屏", "对比", "左右布局", "对称", "品牌", "展示"],

  philosophy: `Split Screen（分屏布局）是一种将视口分为两个或多个区域的布局方式，通过对比创造视觉张力和叙事效果。

核心理念：
- 对比强调：通过左右对比突出差异或联系
- 视觉平衡：即使不对称也保持视觉重量平衡
- 叙事引导：引导用户视线在两侧之间流动
- 空间利用：充分利用宽屏显示器的优势`,

  doList: [
    "使用 CSS Grid 或 Flexbox 实现分屏 grid grid-cols-2",
    "大屏幕保持分屏，小屏幕堆叠 lg:grid-cols-2 grid-cols-1",
    "使用对比色或互补内容",
    "一侧视觉元素，一侧文字内容",
    "保持两侧视觉重量平衡",
    "添加过渡动画增强体验",
    "考虑分屏滚动锁定效果",
  ],

  dontList: [
    "禁止两侧内容完全相同（无意义分屏）",
    "禁止移动端仍保持分屏（太窄）",
    "禁止两侧视觉重量严重失衡",
    "禁止忽略内容阅读顺序",
    "禁止分割线过于突兀",
  ],

  components: {
    button: {
      name: "按钮",
      description: "分屏布局中的对比按钮",
      code: `<div className="flex gap-4">
  <button className="
    px-8 py-4
    bg-black text-white
    font-semibold
    hover:bg-zinc-800
    transition-colors
  ">
    Left Option
  </button>
  <button className="
    px-8 py-4
    bg-white text-black
    border-2 border-black
    font-semibold
    hover:bg-zinc-100
    transition-colors
  ">
    Right Option
  </button>
</div>`,
    },
    card: {
      name: "分屏面板",
      description: "分屏布局中的内容面板",
      code: `<div className="
  h-full
  p-8 lg:p-16
  flex flex-col justify-center
">
  <span className="text-sm uppercase tracking-widest text-zinc-500 mb-4">
    Category
  </span>
  <h2 className="text-4xl lg:text-5xl font-bold mb-6">
    Panel Title
  </h2>
  <p className="text-lg text-zinc-600 mb-8 max-w-md">
    Detailed description text that explains the content of this panel section.
  </p>
  <button className="self-start px-8 py-4 bg-black text-white font-semibold">
    Learn More
  </button>
</div>`,
    },
    input: {
      name: "输入框",
      description: "分屏表单中的输入框",
      code: `<input
  type="email"
  placeholder="Enter your email"
  className="
    w-full px-6 py-4
    bg-transparent
    border-b-2 border-zinc-300
    text-lg
    placeholder-zinc-400
    focus:outline-none focus:border-black
    transition-colors
  "
/>`,
    },
    nav: {
      name: "分屏导航",
      description: "跨越分屏的固定导航",
      code: `<nav className="
  fixed top-0 left-0 right-0 z-50
  px-8 py-6
  flex items-center justify-between
  mix-blend-difference
">
  <a href="/" className="text-white text-xl font-bold">
    Logo
  </a>
  <div className="flex items-center gap-8">
    <a href="#" className="text-white hover:opacity-70 transition-opacity">About</a>
    <a href="#" className="text-white hover:opacity-70 transition-opacity">Work</a>
    <a href="#" className="text-white hover:opacity-70 transition-opacity">Contact</a>
  </div>
</nav>`,
    },
    hero: {
      name: "分屏英雄区",
      description: "完整的分屏布局展示",
      code: `<section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
  {/* Left Panel - Visual */}
  <div className="
    relative
    bg-black
    min-h-[50vh] lg:min-h-screen
    flex items-center justify-center
    overflow-hidden
  ">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 opacity-80" />
    <div className="relative z-10 text-center text-white p-8">
      <span className="text-8xl font-bold">01</span>
    </div>
  </div>

  {/* Right Panel - Content */}
  <div className="
    bg-white
    min-h-[50vh] lg:min-h-screen
    flex items-center
    p-8 lg:p-16
  ">
    <div className="max-w-lg">
      <span className="text-sm uppercase tracking-widest text-zinc-400 mb-4 block">
        Featured Project
      </span>
      <h1 className="text-4xl lg:text-6xl font-bold text-zinc-900 mb-6">
        Split Screen Layout
      </h1>
      <p className="text-xl text-zinc-600 mb-8">
        A powerful layout technique that divides the viewport into two contrasting sections, creating visual tension and narrative flow.
      </p>
      <div className="flex gap-4">
        <button className="px-8 py-4 bg-black text-white font-semibold hover:bg-zinc-800 transition-colors">
          View Project
        </button>
        <button className="px-8 py-4 border-2 border-black text-black font-semibold hover:bg-zinc-100 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  </div>
</section>`,
    },
  },

  globalCss: `/* Split Screen Global Styles */

/* Base split container */
.split-screen {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;
}

@media (min-width: 1024px) {
  .split-screen {
    grid-template-columns: 1fr 1fr;
  }
}

/* Ratio variants */
.split-screen-60-40 {
  grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
  .split-screen-60-40 {
    grid-template-columns: 60fr 40fr;
  }
}

.split-screen-40-60 {
  grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
  .split-screen-40-60 {
    grid-template-columns: 40fr 60fr;
  }
}

/* Panel styles */
.split-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
}

@media (min-width: 1024px) {
  .split-panel {
    padding: 4rem;
  }
}

/* Sticky scroll effect */
.split-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
}

/* Diagonal split */
.split-diagonal {
  clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
}

@media (min-width: 1024px) {
  .split-diagonal {
    clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
  }
}

/* Hover reveal effect */
.split-hover-left:hover ~ .split-hover-right {
  flex: 0.3;
}

.split-hover-right:hover {
  flex: 0.7;
}

.split-hover-left, .split-hover-right {
  flex: 0.5;
  transition: flex 0.5s ease;
}`,

  aiRules: `You are a frontend expert specializing in Split Screen layout. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Do NOT keep split layout on mobile (too narrow)
- Do NOT have identical content on both sides
- Do NOT create visual imbalance between panels
- Do NOT ignore content reading order
- Do NOT use harsh divider lines

## Must Follow

- Use CSS Grid: grid grid-cols-1 lg:grid-cols-2
- Mobile: stack vertically (grid-cols-1)
- Desktop: side by side (lg:grid-cols-2)
- Each panel: min-h-[50vh] on mobile, min-h-screen on desktop
- Balance visual weight between panels
- One side visual, one side content

## Layout Patterns

50/50 Split:
- grid-cols-1 lg:grid-cols-2
- Both panels equal width

60/40 Split:
- grid-cols-1 lg:grid-cols-[60fr_40fr]
- Emphasize one side

Sticky Split:
- One panel sticky (position: sticky, top: 0)
- Other panel scrolls

## Panel Content

Visual Panel:
- Full background image/color/video
- Minimal text overlay
- Center-aligned content

Content Panel:
- Ample padding (p-8 lg:p-16)
- Left-aligned text
- Clear hierarchy

## Responsive

Mobile: Stack vertically, visual panel first
Tablet: May start splitting at md:
Desktop: Full split with proper ratios

## Self-Check

After generating code, verify:
1. Mobile layout stacks properly
2. Panels have contrasting content
3. Visual balance maintained
4. Reading order makes sense
5. Transitions are smooth`,

  examplePrompts: [
    {
      title: "品牌展示页",
      titleEn: "Brand Showcase",
      description: "左侧视觉，右侧品牌故事",
      descriptionEn: "Visual on left, brand story on right",
      prompt: `Create a brand showcase page with split screen:
1. Left panel: Full-height gradient background with large brand logo
2. Right panel: Brand story with heading, paragraphs, and CTA
3. Mobile: Stack with visual panel first
4. Desktop: 50/50 split with min-h-screen
5. Navigation fixed at top with mix-blend-difference
6. Smooth scroll to next section
Use grid grid-cols-1 lg:grid-cols-2, contrasting colors`,
    },
    {
      title: "产品对比页",
      titleEn: "Product Comparison",
      description: "两种产品或方案的对比展示",
      descriptionEn: "Comparison of two products or options",
      prompt: `Create a product comparison split screen:
1. Left panel: Product A with dark background, white text
2. Right panel: Product B with light background, dark text
3. Each side: product image, features list, price, CTA
4. Hover effect: hovered side expands slightly
5. Mobile: Stack with A on top
6. Center divider with "VS" badge
Use contrasting colors, balanced visual weight`,
    },
    {
      title: "作品集项目页",
      titleEn: "Portfolio Project",
      description: "左侧项目图片，右侧项目详情",
      descriptionEn: "Project image on left, details on right",
      prompt: `Create a portfolio project page with split screen:
1. Left panel: Sticky full-height project image gallery
2. Right panel: Scrollable project details
3. Right content: title, description, tech stack, links
4. Image gallery with navigation dots
5. Mobile: Image at top, details below
6. Previous/Next project navigation at bottom
Use sticky positioning for image, smooth scroll for details`,
    },
  ],
};
