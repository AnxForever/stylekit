import { DesignStyle } from "./index";

export const dashboardLayout: DesignStyle = {
  slug: "dashboard-layout",
  name: "仪表盘布局",
  nameEn: "Dashboard Layout",
  description:
    "数据驱动的仪表盘布局，包含侧边导航、顶部工具栏、多模块数据面板和图表区域，适合后台管理系统、数据分析平台和监控面板。",
  cover: "/styles/dashboard-layout.svg",
  styleType: "layout",
  tags: ["modern", "responsive"],
  compatibleWith: ["corporate-clean", "dark-mode", "minimalist-flat", "fluent-design", "material-design"],
  category: "modern",
  colors: {
    primary: "#111827",
    secondary: "#f9fafb",
    accent: ["#6366f1", "#10b981", "#f59e0b", "#ef4444"],
  },
  keywords: ["仪表盘", "数据", "面板", "图表", "监控", "后台", "分析"],

  philosophy: `Dashboard Layout 是一种以数据展示为核心的布局方案，通过侧边导航、多模块数据面板和灵活的网格系统，让用户高效地监控和分析多维数据。

核心理念：
- 数据优先：所有布局决策服务于数据的高效展示
- 模块化：每个数据面板独立成模块，可灵活组合
- 密度控制：在信息密度和可读性之间取得平衡
- 实时性：布局支持数据的实时更新和刷新`,

  doList: [
    "使用深色侧边导航栏 bg-gray-900 w-64",
    "顶部工具栏包含搜索、通知和用户信息",
    "使用 CSS Grid 排列数据面板 grid grid-cols-4",
    "KPI 卡片使用大字号数字展示关键指标",
    "图表区域使用适当比例 aspect-video 或 aspect-square",
    "使用颜色编码区分数据状态（绿增红减）",
  ],

  dontList: [
    "禁止侧边栏和内容区比例失调",
    "禁止数据面板间距不一致",
    "禁止忽略加载状态和空状态",
    "禁止所有面板大小完全相同",
    "禁止使用过多的装饰性元素分散注意力",
  ],

  components: {
    button: {
      name: "按钮",
      description: "仪表盘中的操作按钮",
      code: `<button className="
  px-4 py-2
  bg-[#6366f1] text-white
  rounded-lg
  font-medium text-sm
  hover:bg-[#4f46e5]
  transition-colors
">
  Export Data
</button>`,
    },
    card: {
      name: "KPI 卡片",
      description: "关键指标展示卡片",
      code: `<div className="
  p-6
  bg-white
  rounded-xl
  shadow-sm
  border border-gray-100
">
  <div className="flex items-center justify-between mb-4">
    <span className="text-sm font-medium text-gray-500">Total Revenue</span>
    <span className="text-xs font-medium text-[#10b981] bg-[#10b981]/10 px-2 py-1 rounded-full">+12.5%</span>
  </div>
  <div className="text-3xl font-bold text-[#111827]">$48,230</div>
  <p className="text-sm text-gray-500 mt-1">vs. $42,890 last month</p>
</div>`,
    },
    input: {
      name: "搜索框",
      description: "仪表盘搜索输入框",
      code: `<div className="relative">
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
  <input
    type="text"
    placeholder="Search..."
    className="
      w-full pl-10 pr-4 py-2
      bg-gray-50
      border border-gray-200
      rounded-lg
      text-sm text-[#111827] placeholder-gray-400
      focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20
      focus:border-[#6366f1]
      transition-all
    "
  />
</div>`,
    },
    hero: {
      name: "仪表盘布局完整示例",
      description: "完整的仪表盘页面结构",
      code: `<div className="min-h-screen flex bg-[#f9fafb]">
  {/* 侧边导航 */}
  <aside className="w-64 bg-[#111827] text-white flex-shrink-0 flex flex-col">
    <div className="p-6">
      <h1 className="text-lg font-bold">Dashboard</h1>
    </div>
    <nav className="flex-1 px-3 space-y-1">
      <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-white/10 rounded-lg text-sm font-medium">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        Overview
      </a>
      <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        Analytics
      </a>
      <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        Settings
      </a>
    </nav>
  </aside>

  {/* 主区域 */}
  <div className="flex-1 flex flex-col min-w-0">
    {/* 顶部工具栏 */}
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-[#111827]">Overview</h2>
      <div className="flex items-center gap-4">
        <input type="text" placeholder="Search..." className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
        <div className="w-8 h-8 bg-[#6366f1] rounded-full" />
      </div>
    </header>

    {/* 内容区 */}
    <main className="flex-1 p-6">
      {/* KPI 卡片行 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500">Revenue</span>
          <div className="text-2xl font-bold text-[#111827] mt-1">$48.2K</div>
          <span className="text-xs text-[#10b981]">+12.5%</span>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500">Users</span>
          <div className="text-2xl font-bold text-[#111827] mt-1">2,420</div>
          <span className="text-xs text-[#10b981]">+5.2%</span>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500">Orders</span>
          <div className="text-2xl font-bold text-[#111827] mt-1">1,210</div>
          <span className="text-xs text-[#ef4444]">-2.1%</span>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500">Conversion</span>
          <div className="text-2xl font-bold text-[#111827] mt-1">3.6%</div>
          <span className="text-xs text-[#f59e0b]">+0.3%</span>
        </div>
      </div>

      {/* 图表区 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-medium text-[#111827] mb-4">Revenue Trend</h3>
          <div className="aspect-[2/1] bg-gray-50 rounded-lg" />
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-medium text-[#111827] mb-4">Distribution</h3>
          <div className="aspect-square bg-gray-50 rounded-lg" />
        </div>
      </div>
    </main>
  </div>
</div>`,
    },
  },

  globalCss: `/* Dashboard Layout 全局样式 */

/* 仪表盘容器 */
.dashboard {
  display: flex;
  min-height: 100vh;
}

/* 侧边导航 */
.dashboard-sidebar {
  width: 256px;
  background: #111827;
  color: white;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

/* 主区域 */
.dashboard-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* 顶部工具栏 */
.dashboard-toolbar {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 内容区 */
.dashboard-content {
  flex: 1;
  padding: 1.5rem;
  background: #f9fafb;
}

/* KPI 卡片网格 */
.dashboard-kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

/* 图表网格 */
.dashboard-chart-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
}

/* KPI 卡片 */
.dashboard-kpi {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid #f3f4f6;
}

/* 状态颜色 */
.dashboard-up { color: #10b981; }
.dashboard-down { color: #ef4444; }
.dashboard-neutral { color: #f59e0b; }

/* 响应式 */
@media (max-width: 1024px) {
  .dashboard-kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .dashboard-chart-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-sidebar {
    display: none;
  }
  .dashboard-kpi-grid {
    grid-template-columns: 1fr;
  }
}`,

  aiRules: `你是一个 Dashboard Layout 布局专家。生成的所有代码必须严格遵守以下约束：

## 布局结构

- 左侧：深色侧边导航栏 w-64 bg-gray-900
- 顶部：白色工具栏（搜索、通知、用户）
- 主体：KPI 卡片 + 图表面板 + 数据表格

## KPI 卡片

- 使用 grid grid-cols-4 排列
- 每个卡片包含：标签、数值、变化趋势
- 增长用绿色 text-green-500
- 下降用红色 text-red-500
- 平稳用黄色 text-yellow-500

## 图表区域

- 主图表占 2/3 宽度 col-span-2
- 辅助图表占 1/3 宽度
- 使用 aspect-ratio 保持比例

## 侧边导航

- 深色背景 bg-gray-900
- 当前页面高亮 bg-white/10
- 图标 + 文字菜单项
- 底部放置用户信息

## 响应式

大屏幕：侧边栏 + 4列KPI + 图表
中等屏幕：侧边栏 + 2列KPI
小屏幕：隐藏侧边栏 + 1列KPI

## 自检

1. 侧边导航深色固定
2. KPI卡片数据清晰
3. 图表区域比例适当
4. 状态颜色编码正确
5. 响应式适配完善`,

  examplePrompts: [
    {
      title: "电商仪表盘",
      titleEn: "E-commerce Dashboard",
      description: "电商数据分析仪表盘",
      descriptionEn: "E-commerce analytics dashboard",
      prompt: `用 Dashboard Layout 设计一个电商仪表盘，要求：
1. 侧边栏：概览、订单、商品、客户、分析、设置
2. KPI：总收入、订单数、平均客单价、退货率
3. 主图表：收入趋势折线图（占2/3宽）
4. 辅助图表：商品分类饼图
5. 底部：最近订单表格
6. 所有数字带增长/下降百分比
7. 响应式折叠侧边栏`,
    },
  ],
};
