import { DesignStyle } from "./index";

export const fPatternLayout: DesignStyle = {
  slug: "f-pattern-layout",
  name: "F型布局",
  nameEn: "F-Pattern Layout",
  description:
    "基于眼动追踪研究的F型扫描布局，用户视线从左上角开始，沿顶部水平扫描后向下移动，适合内容密集型页面、博客文章和新闻列表。",
  cover: "/styles/f-pattern-layout.svg",
  styleType: "layout",
  tags: ["modern", "responsive"],
  compatibleWith: ["editorial", "corporate-clean", "minimalist-flat", "notion-style", "swiss-style"],
  category: "modern",
  colors: {
    primary: "#1a1a2e",
    secondary: "#f8f9fa",
    accent: ["#e63946", "#457b9d", "#2a9d8f", "#e9c46a"],
  },
  keywords: ["F型", "眼动", "内容优先", "扫描", "阅读", "博客", "新闻"],

  philosophy: `F-Pattern Layout 基于尼尔森·诺曼集团的眼动追踪研究，用户浏览网页时视线呈 F 形移动：先水平扫描顶部内容，再向下移动后进行第二次水平扫描（较短），最后垂直向下浏览左侧。

核心理念：
- 内容优先级：最重要的内容放在顶部和左侧
- 视觉引导：通过层次和权重引导用户阅读路径
- 信息密度：适合文字密集型内容的高效排列
- 可扫描性：标题、摘要和正文形成清晰的层级`,

  doList: [
    "将最重要的内容放在页面顶部（第一条水平线）",
    "在左侧放置导航或关键信息（垂直线）",
    "使用清晰的标题层级 h1 > h2 > h3",
    "使用列表和分段增加可扫描性",
    "保持左对齐 text-left 符合阅读习惯",
    "使用 max-w-prose 限制行宽提升可读性",
  ],

  dontList: [
    "禁止将重要内容放在右下角",
    "禁止居中对齐大段文字",
    "禁止忽视内容的优先级排列",
    "禁止使用过长的无分段文字",
    "禁止在左侧留白过多",
  ],

  components: {
    button: {
      name: "按钮",
      description: "F型布局中的 CTA 按钮",
      code: `<button className="
  px-6 py-3
  bg-[#e63946] text-white
  rounded-lg
  font-medium
  hover:bg-[#c1121f]
  transition-colors
">
  Read More
</button>`,
    },
    card: {
      name: "卡片",
      description: "F型布局中的内容卡片",
      code: `<article className="
  flex gap-6 p-6
  bg-white
  border-b border-gray-100
  hover:bg-gray-50
  transition-colors
">
  <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0" />
  <div className="flex-1 min-w-0">
    <h3 className="text-lg font-semibold text-[#1a1a2e] mb-1 line-clamp-1">
      Article Title
    </h3>
    <p className="text-gray-600 text-sm line-clamp-2 mb-2">
      Brief summary of the article content...
    </p>
    <span className="text-xs text-gray-400">5 min read</span>
  </div>
</article>`,
    },
    input: {
      name: "输入框",
      description: "搜索输入框",
      code: `<input
  type="text"
  placeholder="Search articles..."
  className="
    w-full px-4 py-3
    bg-gray-50
    border border-gray-200
    rounded-lg
    text-[#1a1a2e] placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-[#457b9d]/20
    focus:border-[#457b9d]
    transition-all
  "
/>`,
    },
    hero: {
      name: "F型布局完整示例",
      description: "F型布局的完整页面结构",
      code: `<div className="min-h-screen bg-[#f8f9fa]">
  {/* 顶部横条 - F的第一笔 */}
  <header className="bg-white border-b border-gray-200">
    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-[#1a1a2e]">Logo</h1>
      <nav className="flex gap-6 text-sm text-gray-600">
        <a href="#" className="hover:text-[#1a1a2e]">Home</a>
        <a href="#" className="hover:text-[#1a1a2e]">Articles</a>
        <a href="#" className="hover:text-[#1a1a2e]">About</a>
      </nav>
    </div>
  </header>

  <div className="max-w-6xl mx-auto px-6 py-8">
    {/* 特色内容 - F的第二笔 */}
    <section className="mb-8">
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <span className="text-xs font-medium text-[#e63946] uppercase tracking-wider">Featured</span>
        <h2 className="text-3xl font-bold text-[#1a1a2e] mt-2 mb-4">Main Headline</h2>
        <p className="text-gray-600 max-w-prose">Summary text that appears along the first horizontal scan line...</p>
      </div>
    </section>

    <div className="flex gap-8">
      {/* 左侧内容列表 - F的竖线 */}
      <main className="flex-1">
        <article className="bg-white rounded-lg p-6 mb-4 shadow-sm">
          <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">Article Title</h3>
          <p className="text-gray-600 text-sm">Content preview...</p>
        </article>
      </main>

      {/* 右侧边栏 */}
      <aside className="w-64 flex-shrink-0">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h4 className="font-medium text-sm text-gray-500 mb-3">Trending</h4>
          <div className="text-sm text-[#1a1a2e]">Sidebar content</div>
        </div>
      </aside>
    </div>
  </div>
</div>`,
    },
  },

  globalCss: `/* F-Pattern Layout 全局样式 */

/* F型布局容器 */
.f-layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* 顶部扫描区（F的第一笔） */
.f-top-bar {
  width: 100%;
  padding: 2rem 0;
  border-bottom: 1px solid #e5e7eb;
}

/* 第二扫描区（F的第二笔，较短） */
.f-secondary {
  width: 75%;
  padding: 1.5rem 0;
}

/* 垂直扫描区（F的竖线） */
.f-vertical {
  display: flex;
  gap: 2rem;
}

.f-vertical-main {
  flex: 1;
}

.f-vertical-aside {
  width: 250px;
  flex-shrink: 0;
}

/* 内容优先级 */
.f-priority-high {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
}

.f-priority-medium {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
}

.f-priority-low {
  font-size: 0.875rem;
  color: #6b7280;
}

/* 响应式 */
@media (max-width: 768px) {
  .f-vertical {
    flex-direction: column;
  }
  .f-vertical-aside {
    width: 100%;
  }
  .f-secondary {
    width: 100%;
  }
}`,

  aiRules: `你是一个 F-Pattern Layout 布局专家。生成的所有代码必须严格遵守以下约束：

## 布局规则

- 页面顶部放置最重要的信息（logo、导航、特色内容）
- 第二行放置次重要的信息（分类、搜索）
- 左侧放置主内容区（文章列表）
- 右侧放置辅助内容（侧边栏）
- 所有文字左对齐 text-left

## 内容层级

第一层（顶部全宽）：
- 导航栏
- 特色文章/头条

第二层（次要水平区）：
- 分类标签
- 搜索栏

第三层（左侧垂直列表）：
- 文章列表
- 带缩略图的内容卡片

辅助区（右侧）：
- 热门推荐
- 标签云
- 广告位

## 响应式

桌面端：左主内容 + 右侧边栏
平板端：全宽主内容 + 折叠侧边栏
手机端：单列堆叠

## 自检

1. 最重要的内容在顶部和左上
2. 有清晰的标题层级
3. 文字左对齐
4. 内容可快速扫描
5. 响应式适配完善`,

  examplePrompts: [
    {
      title: "新闻列表页",
      titleEn: "News List Page",
      description: "F型布局的新闻列表",
      descriptionEn: "F-pattern news listing page",
      prompt: `用 F-Pattern Layout 设计一个新闻列表页，要求：
1. 顶部：logo + 导航 + 特色头条
2. 第二行：分类标签 + 搜索框
3. 左侧：文章列表（缩略图 + 标题 + 摘要）
4. 右侧：热门文章 + 标签云
5. 所有内容左对齐，优先级从上到下递减
6. 响应式：手机端单列显示`,
    },
  ],
};
