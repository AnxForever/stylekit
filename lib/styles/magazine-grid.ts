import { DesignStyle } from "./index";

export const magazineGrid: DesignStyle = {
  slug: "magazine-grid",
  name: "杂志网格布局",
  nameEn: "Magazine Grid",
  description:
    "灵感来自印刷杂志的多栏网格布局，通过不同大小的内容块创造丰富的视觉层次，适合新闻、博客、内容聚合。",
  cover: "/styles/magazine-grid.png",
  styleType: "layout",
  tags: ["modern", "responsive"],
  compatibleWith: ["editorial", "minimalist-flat", "corporate-clean", "retro-vintage", "dark-mode"],
  category: "modern",
  colors: {
    primary: "#1a1a1a",
    secondary: "#fafafa",
    accent: ["#e63946", "#2a9d8f", "#e9c46a", "#264653"],
  },
  keywords: ["杂志", "多栏", "新闻", "博客", "内容", "网格"],

  philosophy: `Magazine Grid（杂志网格布局）借鉴传统印刷杂志的排版智慧，通过多栏和混合尺寸内容块创造专业的编辑效果。

核心理念：
- 视觉层级：大图抓眼球，小块填充细节
- 扫描友好：读者可快速浏览找到感兴趣的内容
- 空间节奏：大小交替创造阅读节奏
- 专业感：传递权威性和可信度`,

  doList: [
    "使用 CSS Grid 创建复杂网格 grid-template-areas",
    "特色内容使用更大的网格区域 col-span-2 row-span-2",
    "保持基线对齐和一致的间距",
    "使用不同大小的内容块创造层次",
    "移动端转为单列或简化网格",
    "添加清晰的分类标签和时间戳",
    "考虑广告位的预留空间",
  ],

  dontList: [
    "禁止所有内容块大小相同",
    "禁止忽略移动端布局适配",
    "禁止内容过于拥挤无留白",
    "禁止分类标签不一致",
    "禁止忽略图片裁切比例",
  ],

  components: {
    button: {
      name: "分类标签",
      description: "文章分类的标签按钮",
      code: `<span className="
  inline-block
  px-3 py-1
  text-xs font-semibold uppercase tracking-wider
  text-red-600
  bg-red-50
  rounded
">
  Technology
</span>`,
    },
    card: {
      name: "杂志文章卡片",
      description: "杂志风格的文章卡片",
      code: `<article className="group">
  <a href="#" className="block">
    <div className="relative overflow-hidden rounded-lg mb-4">
      <img
        src="/placeholder.jpg"
        alt="Article thumbnail"
        className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase bg-red-600 text-white rounded">
        Featured
      </span>
    </div>
    <div>
      <span className="text-xs font-semibold uppercase tracking-wider text-red-600 mb-2 block">
        Technology
      </span>
      <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-red-600 transition-colors">
        Article Title Goes Here
      </h3>
      <p className="text-zinc-600 text-sm mb-3 line-clamp-2">
        Brief excerpt of the article content that gives readers a preview...
      </p>
      <div className="flex items-center gap-3 text-sm text-zinc-500">
        <span>John Doe</span>
        <span>5 min read</span>
      </div>
    </div>
  </a>
</article>`,
    },
    input: {
      name: "搜索框",
      description: "杂志站点的搜索",
      code: `<div className="relative">
  <input
    type="text"
    placeholder="Search articles..."
    className="
      w-full px-4 py-3 pr-12
      bg-zinc-100
      border-0
      rounded-lg
      text-zinc-900
      placeholder-zinc-500
      focus:outline-none focus:ring-2 focus:ring-red-500/30
    "
  />
  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-zinc-500 hover:text-zinc-700">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </button>
</div>`,
    },
    nav: {
      name: "分类导航",
      description: "杂志分类导航栏",
      code: `<nav className="
  flex items-center gap-6
  border-b border-zinc-200
  overflow-x-auto
">
  <a href="#" className="
    py-4
    text-sm font-semibold uppercase tracking-wider
    text-red-600
    border-b-2 border-red-600
    whitespace-nowrap
  ">
    All
  </a>
  <a href="#" className="
    py-4
    text-sm font-semibold uppercase tracking-wider
    text-zinc-600
    hover:text-zinc-900
    border-b-2 border-transparent
    hover:border-zinc-300
    transition-colors
    whitespace-nowrap
  ">
    Technology
  </a>
  <a href="#" className="
    py-4
    text-sm font-semibold uppercase tracking-wider
    text-zinc-600
    hover:text-zinc-900
    border-b-2 border-transparent
    hover:border-zinc-300
    transition-colors
    whitespace-nowrap
  ">
    Business
  </a>
  <a href="#" className="
    py-4
    text-sm font-semibold uppercase tracking-wider
    text-zinc-600
    hover:text-zinc-900
    border-b-2 border-transparent
    hover:border-zinc-300
    transition-colors
    whitespace-nowrap
  ">
    Culture
  </a>
</nav>`,
    },
    hero: {
      name: "杂志网格布局",
      description: "完整的杂志风格布局",
      code: `<section className="py-8 px-4">
  <div className="max-w-7xl mx-auto">
    {/* Category Nav */}
    <nav className="flex items-center gap-6 border-b border-zinc-200 mb-8 overflow-x-auto">
      <a href="#" className="py-4 text-sm font-semibold uppercase tracking-wider text-red-600 border-b-2 border-red-600 whitespace-nowrap">All</a>
      <a href="#" className="py-4 text-sm font-semibold uppercase tracking-wider text-zinc-600 hover:text-zinc-900 whitespace-nowrap">Tech</a>
      <a href="#" className="py-4 text-sm font-semibold uppercase tracking-wider text-zinc-600 hover:text-zinc-900 whitespace-nowrap">Business</a>
      <a href="#" className="py-4 text-sm font-semibold uppercase tracking-wider text-zinc-600 hover:text-zinc-900 whitespace-nowrap">Culture</a>
    </nav>

    {/* Magazine Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Featured - Large */}
      <article className="md:col-span-2 lg:row-span-2 group">
        <a href="#" className="block h-full">
          <div className="relative h-full min-h-[300px] rounded-xl overflow-hidden">
            <img src="/placeholder.jpg" alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase bg-red-600 rounded mb-3">Featured</span>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">Main Featured Article Title</h2>
              <p className="text-white/80 mb-3 line-clamp-2">A compelling excerpt that draws readers in...</p>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <span>By John Doe</span>
                <span>10 min read</span>
              </div>
            </div>
          </div>
        </a>
      </article>

      {/* Regular articles */}
      <article className="group">
        <a href="#" className="block">
          <div className="rounded-lg overflow-hidden mb-3">
            <img src="/placeholder.jpg" alt="" className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Business</span>
          <h3 className="font-bold text-zinc-900 mt-1 group-hover:text-red-600 transition-colors">Secondary Article Title</h3>
        </a>
      </article>

      <article className="group">
        <a href="#" className="block">
          <div className="rounded-lg overflow-hidden mb-3">
            <img src="/placeholder.jpg" alt="" className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">Culture</span>
          <h3 className="font-bold text-zinc-900 mt-1 group-hover:text-red-600 transition-colors">Another Article Title Here</h3>
        </a>
      </article>

      <article className="group">
        <a href="#" className="block">
          <div className="rounded-lg overflow-hidden mb-3">
            <img src="/placeholder.jpg" alt="" className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">Tech</span>
          <h3 className="font-bold text-zinc-900 mt-1 group-hover:text-red-600 transition-colors">Tech News Article</h3>
        </a>
      </article>

      <article className="group">
        <a href="#" className="block">
          <div className="rounded-lg overflow-hidden mb-3">
            <img src="/placeholder.jpg" alt="" className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-600">Opinion</span>
          <h3 className="font-bold text-zinc-900 mt-1 group-hover:text-red-600 transition-colors">Opinion Piece Title</h3>
        </a>
      </article>
    </div>
  </div>
</section>`,
    },
  },

  globalCss: `/* Magazine Grid Global Styles */

/* Base magazine grid */
.magazine-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .magazine-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .magazine-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Featured item spans */
.magazine-featured {
  grid-column: span 2;
  grid-row: span 2;
}

@media (max-width: 767px) {
  .magazine-featured {
    grid-column: span 1;
    grid-row: span 1;
  }
}

/* Article card styles */
.magazine-article {
  position: relative;
}

.magazine-article img {
  transition: transform 0.3s ease;
}

.magazine-article:hover img {
  transform: scale(1.05);
}

/* Category tags */
.magazine-category {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.25rem;
}

/* Category colors */
.magazine-category-tech { color: #3b82f6; background: #eff6ff; }
.magazine-category-business { color: #10b981; background: #ecfdf5; }
.magazine-category-culture { color: #f59e0b; background: #fffbeb; }
.magazine-category-opinion { color: #8b5cf6; background: #f5f3ff; }
.magazine-category-featured { color: white; background: #dc2626; }

/* Line clamp for excerpts */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}`,

  aiRules: `You are a frontend expert specializing in Magazine Grid layout. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Do NOT make all content blocks same size
- Do NOT ignore mobile responsive layout
- Do NOT overcrowd content without whitespace
- Do NOT use inconsistent category styling
- Do NOT ignore image aspect ratios

## Must Follow

- Use CSS Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Featured content: col-span-2 row-span-2
- Consistent gaps: gap-6
- Category labels on all articles
- Image hover effects
- Line clamping for excerpts

## Grid Structure

Desktop (4 columns):
- Featured: 2x2 grid area
- Regular: 1x1 grid cells
- Mix large and small for variety

Tablet (2 columns):
- Featured: 2x1 or 1x2
- Regular: 1x1

Mobile (1 column):
- All items full width
- Stack vertically

## Article Card

Required elements:
1. Image with aspect ratio
2. Category label (colored)
3. Title (clamped)
4. Excerpt (optional, clamped)
5. Meta (author, date, read time)

## Category Colors

Use distinct colors per category:
- Tech: blue
- Business: green
- Culture: amber
- Opinion: purple
- Featured: red

## Self-Check

After generating code, verify:
1. Featured item is larger
2. Grid has visual variety
3. Categories are labeled
4. Mobile layout works
5. Images have proper ratios`,

  examplePrompts: [
    {
      title: "新闻首页",
      titleEn: "News Homepage",
      description: "新闻网站的杂志风格首页",
      descriptionEn: "Magazine style news homepage",
      prompt: `Create a news homepage with magazine grid:
1. 4-column grid on desktop, 2 on tablet, 1 on mobile
2. Featured story spanning 2x2 with image overlay
3. Regular articles in grid with thumbnail, category, title
4. Category tabs: All, Politics, Tech, Business, Sports
5. Breaking news banner at top
6. Load more button at bottom
7. Sidebar with trending stories (optional)
Clean, professional news design with red accent`,
    },
    {
      title: "博客列表",
      titleEn: "Blog Listing",
      description: "博客文章的杂志布局",
      descriptionEn: "Magazine layout for blog posts",
      prompt: `Create a blog listing with magazine grid:
1. Featured post with large image and gradient overlay
2. Regular posts in varied sizes (some 2-col wide)
3. Each post: image, category tag, title, excerpt, author
4. Mix of horizontal and vertical card layouts
5. Filter by category dropdown
6. Infinite scroll loading
7. Reading time indicator
Modern editorial style with serif headlines`,
    },
    {
      title: "内容聚合页",
      titleEn: "Content Hub",
      description: "多类型内容的聚合展示",
      descriptionEn: "Aggregated content display",
      prompt: `Create a content hub with magazine grid:
1. Mix of content types: articles, videos, podcasts
2. Video cards with play button overlay
3. Podcast cards with audio duration
4. Featured content section at top
5. "Editor's Picks" sidebar section
6. Newsletter signup card in grid
7. Trending topics tags
Multi-format content with clear type indicators`,
    },
  ],
};
