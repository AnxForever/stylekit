import { DesignStyle } from "./index";

export const masonryFlow: DesignStyle = {
  slug: "masonry-flow",
  name: "瀑布流布局",
  nameEn: "Masonry Flow",
  description:
    "Pinterest 风格的不等高卡片瀑布流布局，通过 CSS columns 或 masonry grid 实现自然流动的视觉效果，适合图片展示、作品集、社交媒体。",
  cover: "/styles/masonry-flow.png",
  styleType: "layout",
  tags: ["modern", "responsive"],
  compatibleWith: ["glassmorphism", "minimalist-flat", "soft-ui", "natural-organic", "editorial"],
  category: "modern",
  colors: {
    primary: "#1a1a2e",
    secondary: "#f5f5f5",
    accent: ["#e94560", "#16c79a", "#ffd460", "#7579e7"],
  },
  keywords: ["瀑布流", "Pinterest", "不等高", "图片墙", "作品集", "gallery"],

  philosophy: `Masonry Flow（瀑布流布局）是一种模仿砖墙砌筑方式的布局，卡片按列排列，高度不一，形成自然流动的视觉效果。

核心理念：
- 自然流动：内容高度由内容本身决定，无需强制等高
- 空间利用：最大化利用可视区域，减少留白浪费
- 视觉节奏：不规则高度创造有趣的视觉韵律
- 无限滚动：天然适合加载更多内容的交互模式`,

  doList: [
    "使用 CSS columns 实现简单瀑布流 columns-2 md:columns-3 lg:columns-4",
    "或使用 CSS Grid masonry（需浏览器支持）grid-rows-[masonry]",
    "卡片添加 break-inside-avoid 防止内容断裂",
    "统一卡片宽度，高度自适应内容",
    "保持列间距一致 gap-4 或 gap-6",
    "添加加载动画和懒加载图片",
    "响应式调整列数 columns-1 sm:columns-2 lg:columns-3",
  ],

  dontList: [
    "禁止强制所有卡片等高（失去瀑布流特色）",
    "禁止卡片宽度不一致",
    "禁止间距不统一",
    "禁止忽略图片加载状态",
    "禁止在小屏幕使用过多列数",
  ],

  components: {
    button: {
      name: "按钮",
      description: "瀑布流风格的简洁按钮",
      code: `<button className="
  px-5 py-2.5
  bg-zinc-900 text-white
  rounded-lg
  font-medium text-sm
  hover:bg-zinc-700
  transition-colors
">
  Load More
</button>`,
    },
    card: {
      name: "瀑布流卡片",
      description: "自适应高度的瀑布流卡片",
      code: `<div className="
  break-inside-avoid
  mb-4
  bg-white
  rounded-xl
  overflow-hidden
  shadow-sm
  hover:shadow-lg
  transition-shadow
  group
">
  <div className="relative overflow-hidden">
    <img
      src="/placeholder.jpg"
      alt="Card image"
      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
    />
  </div>
  <div className="p-4">
    <h3 className="font-semibold text-zinc-900 mb-1">
      Card Title
    </h3>
    <p className="text-zinc-500 text-sm">
      Description text that can be any length
    </p>
  </div>
</div>`,
    },
    input: {
      name: "搜索框",
      description: "瀑布流顶部的搜索框",
      code: `<div className="relative">
  <input
    type="text"
    placeholder="Search..."
    className="
      w-full pl-10 pr-4 py-3
      bg-zinc-100
      border-0
      rounded-full
      text-zinc-900 placeholder-zinc-400
      focus:outline-none focus:ring-2 focus:ring-zinc-900/10
      transition-all
    "
  />
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
</div>`,
    },
    nav: {
      name: "筛选导航",
      description: "瀑布流上方的分类筛选",
      code: `<nav className="flex items-center gap-2 overflow-x-auto pb-4">
  <button className="px-4 py-2 bg-zinc-900 text-white rounded-full text-sm font-medium whitespace-nowrap">
    All
  </button>
  <button className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors whitespace-nowrap">
    Photos
  </button>
  <button className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors whitespace-nowrap">
    Illustrations
  </button>
  <button className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors whitespace-nowrap">
    Videos
  </button>
</nav>`,
    },
    hero: {
      name: "瀑布流画廊",
      description: "完整的瀑布流布局展示",
      code: `<section className="py-8 px-4">
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-zinc-900 mb-4">Gallery</h1>
      <nav className="flex items-center gap-2 overflow-x-auto">
        <button className="px-4 py-2 bg-zinc-900 text-white rounded-full text-sm font-medium">All</button>
        <button className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium">Photos</button>
        <button className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium">Design</button>
      </nav>
    </div>

    {/* Masonry Grid */}
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
      {/* Card 1 - Tall */}
      <div className="break-inside-avoid mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-pink-400 to-purple-500 aspect-[3/4]">
        <div className="p-6 h-full flex flex-col justify-end text-white">
          <h3 className="font-bold text-lg">Featured Work</h3>
          <p className="text-white/80 text-sm">Creative direction</p>
        </div>
      </div>

      {/* Card 2 - Short */}
      <div className="break-inside-avoid mb-4 rounded-xl overflow-hidden bg-zinc-100 aspect-square">
        <div className="p-4 h-full flex items-center justify-center">
          <span className="text-4xl">01</span>
        </div>
      </div>

      {/* Card 3 - Medium */}
      <div className="break-inside-avoid mb-4 rounded-xl overflow-hidden bg-amber-100 aspect-[4/5]">
        <div className="p-6">
          <h3 className="font-semibold mb-2">Project Name</h3>
          <p className="text-zinc-600 text-sm">Brief description of the project</p>
        </div>
      </div>

      {/* Card 4 - Tall */}
      <div className="break-inside-avoid mb-4 rounded-xl overflow-hidden bg-emerald-500 aspect-[3/5]">
        <div className="p-6 text-white">
          <span className="text-sm uppercase tracking-wider">New</span>
        </div>
      </div>

      {/* More cards... */}
    </div>

    {/* Load More */}
    <div className="mt-8 text-center">
      <button className="px-8 py-3 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-700 transition-colors">
        Load More
      </button>
    </div>
  </div>
</section>`,
    },
  },

  globalCss: `/* Masonry Flow Global Styles */

/* CSS Columns based masonry */
.masonry-grid {
  columns: 1;
  column-gap: 1rem;
}

@media (min-width: 640px) {
  .masonry-grid {
    columns: 2;
  }
}

@media (min-width: 1024px) {
  .masonry-grid {
    columns: 3;
  }
}

@media (min-width: 1280px) {
  .masonry-grid {
    columns: 4;
  }
}

/* Prevent card breaking */
.masonry-item {
  break-inside: avoid;
  margin-bottom: 1rem;
}

/* Card hover effects */
.masonry-item {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.masonry-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

/* Image loading placeholder */
.masonry-item img {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Loaded state */
.masonry-item img.loaded {
  background: none;
  animation: none;
}`,

  aiRules: `You are a frontend expert specializing in Masonry Flow layout. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Do NOT make all cards the same height (defeats masonry purpose)
- Do NOT use inconsistent card widths
- Do NOT use inconsistent gaps
- Do NOT ignore image loading states
- Do NOT use too many columns on mobile

## Must Follow

- Use CSS columns: columns-2 md:columns-3 lg:columns-4
- Prevent break: break-inside-avoid on cards
- Consistent gap: gap-4 or column-gap equivalent
- Card widths: 100% of column
- Card heights: auto (content-driven)
- Responsive columns: reduce on smaller screens

## Layout Structure

Container:
- columns-1 sm:columns-2 lg:columns-3 xl:columns-4
- gap-4 (use column-gap and margin-bottom)

Card:
- break-inside-avoid
- mb-4 (margin bottom for spacing)
- rounded-xl overflow-hidden
- Full width within column

## Image Handling

- Always use aspect-ratio or height constraints
- Add loading="lazy" for performance
- Show placeholder during load
- Use object-cover for consistent fit

## Responsive

Mobile (< 640px): columns-1
Tablet (640px - 1024px): columns-2
Desktop (1024px+): columns-3 or columns-4

## Self-Check

After generating code, verify:
1. Cards have varying heights
2. Using break-inside-avoid
3. Consistent gaps
4. Images have aspect ratios
5. Responsive column count`,

  examplePrompts: [
    {
      title: "图片画廊",
      titleEn: "Photo Gallery",
      description: "Pinterest 风格的图片瀑布流",
      descriptionEn: "Pinterest-style photo masonry gallery",
      prompt: `Create a Pinterest-style photo gallery with masonry layout:
1. Use CSS columns for masonry: columns-2 md:columns-3 lg:columns-4
2. Cards with varying heights (aspect-[3/4], aspect-square, aspect-[4/5])
3. Each card: rounded-xl, overflow-hidden, shadow on hover
4. Image with lazy loading and hover scale effect
5. Optional overlay with title on hover
6. Filter tabs at top (All, Photos, Videos, etc.)
7. Load more button at bottom
All cards use break-inside-avoid, consistent gap-4`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "设计师作品集的瀑布流布局",
      descriptionEn: "Designer portfolio masonry layout",
      prompt: `Create a designer portfolio with masonry flow:
1. Masonry grid with columns-1 md:columns-2 lg:columns-3
2. Project cards with different aspect ratios
3. Each card shows: project image, title, category tag
4. Hover effect: reveal project description
5. Mix of image cards and text-only cards
6. Category filter navigation
7. Smooth scroll to load more projects
Cards use break-inside-avoid, rounded-2xl, elegant shadows`,
    },
    {
      title: "社交动态墙",
      titleEn: "Social Feed Wall",
      description: "社交媒体风格的内容流",
      descriptionEn: "Social media style content feed",
      prompt: `Create a social media feed with masonry layout:
1. Masonry columns: columns-1 sm:columns-2 lg:columns-3
2. Mixed content cards: text posts, images, quotes, links
3. Each card has: avatar, username, timestamp, content, reactions
4. Image posts have varying aspect ratios
5. Text posts auto-height based on content
6. Hover to show action buttons (like, comment, share)
7. Infinite scroll loading indicator
Use break-inside-avoid, rounded-xl cards, subtle shadows`,
    },
  ],
};
