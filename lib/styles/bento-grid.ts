import { DesignStyle } from "./index";

export const bentoGrid: DesignStyle = {
  slug: "bento-grid",
  name: "便当盒布局",
  nameEn: "Bento Grid",
  description:
    "灵感源于日式便当盒的不规则网格布局，通过大小不一的卡片组合创造视觉层次，常用于作品集和产品展示。",
  cover: "/styles/bento-grid.png",
  styleType: "layout",
  tags: ["modern", "responsive"],
  compatibleWith: ["glassmorphism", "neo-brutalist", "editorial", "neumorphism"],
  category: "modern",
  colors: {
    primary: "#18181b",
    secondary: "#fafafa",
    accent: ["#3b82f6", "#8b5cf6", "#ec4899", "#f97316"],
  },
  keywords: ["网格", "卡片", "不规则", "作品集", "现代"],

  philosophy: `Bento Grid（便当盒布局）是一种源于日式便当盒分隔设计的现代布局风格。通过不同尺寸的卡片在网格中的组合排列，创造出既有秩序又富有变化的视觉效果。

核心理念：
- 模块化：每个区块独立但相互关联
- 层次感：通过尺寸差异突出重点内容
- 留白：适当间隙让布局呼吸
- 响应式：在不同屏幕上优雅适配`,

  doList: [
    "使用 CSS Grid 布局 grid grid-cols-4",
    "卡片跨越多行或多列 col-span-2, row-span-2",
    "保持一致的间隙 gap-4 或 gap-6",
    "使用圆角 rounded-xl 或 rounded-2xl",
    "添加微妙阴影增加层次 shadow-sm hover:shadow-md",
    "大卡片放置主要内容，小卡片放置次要信息",
    "使用 aspect-ratio 保持卡片比例",
  ],

  dontList: [
    "禁止所有卡片大小相同（失去 Bento 特色）",
    "禁止间隙不一致",
    "禁止卡片过于拥挤无留白",
    "禁止忽略响应式适配",
    "禁止在卡片内堆砌过多内容",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Bento 风格的简洁按钮",
      code: `<button className="
  px-6 py-3
  bg-zinc-900 text-white
  rounded-xl
  font-medium
  hover:bg-zinc-800
  transition-colors
">
  Click me
</button>`,
    },
    card: {
      name: "卡片",
      description: "Bento Grid 中的基础卡片单元",
      code: `<div className="
  p-6
  bg-white
  rounded-2xl
  border border-zinc-100
  shadow-sm
  hover:shadow-md
  transition-shadow
">
  <div className="w-10 h-10 bg-blue-500 rounded-xl mb-4 flex items-center justify-center">
    <span className="text-white text-xl">*</span>
  </div>
  <h3 className="text-lg font-semibold text-zinc-900 mb-2">
    Feature Title
  </h3>
  <p className="text-zinc-600 text-sm">
    简短的功能描述文字
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "简洁的输入框样式",
      code: `<input
  type="text"
  placeholder="请输入..."
  className="
    w-full px-4 py-3
    bg-zinc-50
    border border-zinc-200
    rounded-xl
    text-zinc-900 placeholder-zinc-400
    focus:outline-none focus:ring-2 focus:ring-blue-500/20
    focus:border-blue-500
    transition-all
  "
/>`,
    },
    nav: {
      name: "导航栏",
      description: "简约的顶部导航",
      code: `<nav className="
  px-6 py-4
  border-b border-zinc-100
">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    <a href="/" className="text-xl font-bold text-zinc-900">
      Logo
    </a>
    <div className="flex items-center gap-8">
      <a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">
        Products
      </a>
      <a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">
        About
      </a>
      <button className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm">
        Get Started
      </button>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Bento Grid 布局",
      description: "完整的 Bento Grid 展示区域",
      code: `<section className="py-16 px-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-zinc-900 mb-8">
      Features
    </h2>

    <div className="grid grid-cols-4 gap-4">
      {/* 大卡片 - 跨2列2行 */}
      <div className="col-span-2 row-span-2 p-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl text-white">
        <h3 className="text-2xl font-bold mb-4">主要功能</h3>
        <p className="text-white/80">这是最重要的功能展示区域</p>
      </div>

      {/* 中卡片 */}
      <div className="col-span-2 p-6 bg-zinc-100 rounded-2xl">
        <h3 className="font-semibold mb-2">功能二</h3>
        <p className="text-zinc-600 text-sm">描述文字</p>
      </div>

      {/* 小卡片 */}
      <div className="p-6 bg-orange-100 rounded-2xl">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 12l1.5 1.5L12 7l6.5 6.5L20 12L12 2z"/></svg>
      </div>

      <div className="p-6 bg-green-100 rounded-2xl">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z"/></svg>
      </div>
    </div>
  </div>
</section>`,
    },
  },

  globalCss: `/* Bento Grid 全局样式 */

/* 基础 Grid 容器 */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
}

/* 卡片尺寸变体 */
.bento-lg {
  grid-column: span 2;
  grid-row: span 2;
}

.bento-wide {
  grid-column: span 2;
}

.bento-tall {
  grid-row: span 2;
}

/* 卡片悬停效果 */
.bento-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.bento-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}`,

  aiRules: `你是一个 Bento Grid 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 所有卡片大小相同（必须有尺寸变化）
- 忽略响应式适配
- 卡片之间间隙不一致
- 卡片内容过于拥挤
- 使用直角（需要圆角）

## 必须遵守

- 使用 CSS Grid: grid grid-cols-4
- 卡片跨越: col-span-2, row-span-2
- 一致间隙: gap-4 或 gap-6
- 圆角: rounded-xl, rounded-2xl, rounded-3xl
- 微妙阴影: shadow-sm hover:shadow-md
- 响应式: md:grid-cols-2, lg:grid-cols-4

## 布局规则

大卡片 (col-span-2 row-span-2):
- 放置主要内容或特色功能
- 可使用渐变背景
- 建议 1-2 个

中卡片 (col-span-2 或 row-span-2):
- 次要重要内容
- 建议 2-3 个

小卡片 (1x1):
- 图标、数字、标签等简短内容
- 填充剩余空间

## 配色建议

背景:
- 渐变: bg-gradient-to-br from-blue-500 to-purple-600
- 浅色: bg-zinc-50, bg-zinc-100
- 彩色: bg-orange-100, bg-green-100, bg-blue-100

文字:
- 主要: text-zinc-900
- 次要: text-zinc-600
- 白色: text-white (在深色背景上)

## 自检

每次生成代码后检查：
1. 有大小不一的卡片
2. 使用了 CSS Grid
3. 间隙一致
4. 有响应式处理
5. 圆角统一`,

  examplePrompts: [
    {
      title: "功能特性展示",
      titleEn: "Feature Showcase",
      description: "产品功能的 Bento 网格布局",
      descriptionEn: "Bento grid layout for product features",
      prompt: `用 Bento Grid 风格展示产品的 6 个核心功能，要求：
1. 使用 CSS Grid 创建不规则网格布局
2. 突出功能占据 col-span-2 或 row-span-2
3. 每个卡片包含：图标、标题、简短描述
4. 部分卡片使用强调色背景（如 sky-400）
5. 响应式：移动端单列，桌面端多列
所有卡片 rounded-2xl，统一 gap-4，hover 轻微上浮`,
    },
    {
      title: "个人主页",
      titleEn: "Personal Homepage",
      description: "个人信息和链接的 Bento 布局",
      descriptionEn: "Bento layout for personal info and links",
      prompt: `用 Bento Grid 风格创建一个个人主页，要求：
1. 大卡片：个人照片 + 简介
2. 社交链接：小方块卡片，各一个图标
3. 技能展示：横向长条卡片
4. 最新项目：中等大小卡片，带缩略图
5. 联系方式：底部全宽卡片
网格布局参考 Apple 风格，色彩柔和但有亮点`,
    },
    {
      title: "数据仪表盘",
      titleEn: "Data Dashboard",
      description: "数据统计卡片的网格布局",
      descriptionEn: "Grid layout for data statistics cards",
      prompt: `用 Bento Grid 风格设计一个数据仪表盘，要求：
1. 大卡片：主要图表（占 2x2）
2. 数据卡片：关键指标数字 + 趋势
3. 列表卡片：最近活动或待办事项
4. 小卡片：快捷操作按钮
5. 全宽卡片：时间线或进度条
使用 CSS Grid，深色卡片配亮色文字，浅色卡片配深色文字`,
    },
  ],
};
