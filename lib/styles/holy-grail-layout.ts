import { DesignStyle } from "./index";

export const holyGrailLayout: DesignStyle = {
  slug: "holy-grail-layout",
  name: "圣杯布局",
  nameEn: "Holy Grail Layout",
  description:
    "经典的三栏式网页布局，由固定页头、三列中间区域（左侧导航、主内容、右侧边栏）和固定页脚组成，是Web设计的基础布局范式。",
  cover: "/styles/holy-grail-layout.svg",
  styleType: "layout",
  tags: ["modern", "responsive"],
  compatibleWith: ["corporate-clean", "editorial", "notion-style", "minimalist-flat", "dark-mode"],
  category: "modern",
  colors: {
    primary: "#1e293b",
    secondary: "#f1f5f9",
    accent: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
  },
  keywords: ["三栏", "圣杯", "经典", "页头", "页脚", "侧边栏", "导航"],

  philosophy: `Holy Grail Layout 是Web设计中追求已久的经典布局方案，包含固定的页头页脚和三列中间内容区。这个名字来源于CSS布局早期实现这种布局的困难程度。

核心理念：
- 结构清晰：页头、三列内容、页脚五个区域各司其职
- 主内容优先：HTML 源码中主内容先于侧边栏，利于 SEO
- 等高列：三列无论内容多少都保持等高
- 灵活适配：侧边栏固定宽度，主内容区自适应`,

  doList: [
    "使用 CSS Grid 或 Flexbox 实现等高三列",
    "固定页头和页脚 sticky top-0 / sticky bottom-0",
    "主内容区 flex-1 自适应宽度",
    "左侧导航栏固定宽度 w-60 或 w-64",
    "右侧边栏固定宽度 w-64 或 w-72",
    "主内容在源码中先于侧边栏",
    "响应式折叠侧边栏",
  ],

  dontList: [
    "禁止三列高度不一致",
    "禁止主内容区域过窄",
    "禁止忽略响应式折叠",
    "禁止侧边栏宽度随内容变化",
    "禁止页头页脚不固定",
  ],

  components: {
    button: {
      name: "按钮",
      description: "圣杯布局中的通用按钮",
      code: `<button className="
  px-4 py-2
  bg-[#3b82f6] text-white
  rounded-lg
  font-medium text-sm
  hover:bg-[#2563eb]
  transition-colors
">
  Action
</button>`,
    },
    card: {
      name: "卡片",
      description: "主内容区的内容卡片",
      code: `<div className="
  p-6
  bg-white
  rounded-xl
  shadow-sm
  border border-gray-100
">
  <h3 className="text-lg font-semibold text-[#1e293b] mb-2">
    Content Card
  </h3>
  <p className="text-gray-600 text-sm leading-relaxed">
    Main content displayed in the center column of the holy grail layout.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "搜索输入框",
      code: `<input
  type="text"
  placeholder="Search..."
  className="
    w-full px-3 py-2
    bg-gray-50
    border border-gray-200
    rounded-lg
    text-sm text-[#1e293b] placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20
    focus:border-[#3b82f6]
    transition-all
  "
/>`,
    },
    hero: {
      name: "圣杯布局完整示例",
      description: "圣杯布局的完整页面结构",
      code: `<div className="min-h-screen flex flex-col bg-[#f1f5f9]">
  {/* 页头 */}
  <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
    <div className="px-6 py-3 flex items-center justify-between">
      <h1 className="text-lg font-bold text-[#1e293b]">Holy Grail</h1>
      <nav className="flex gap-4 text-sm text-gray-600">
        <a href="#" className="hover:text-[#1e293b]">Home</a>
        <a href="#" className="hover:text-[#1e293b]">Docs</a>
        <a href="#" className="hover:text-[#1e293b]">API</a>
      </nav>
    </div>
  </header>

  {/* 三列主体 */}
  <div className="flex-1 flex">
    {/* 左侧导航 */}
    <aside className="w-60 bg-white border-r border-gray-200 p-4 flex-shrink-0">
      <nav className="space-y-1">
        <a href="#" className="block px-3 py-2 text-sm bg-[#3b82f6]/10 text-[#3b82f6] rounded-lg font-medium">
          Dashboard
        </a>
        <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
          Projects
        </a>
        <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
          Settings
        </a>
      </nav>
    </aside>

    {/* 主内容区 */}
    <main className="flex-1 p-6">
      <h2 className="text-2xl font-bold text-[#1e293b] mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-medium text-gray-700 mb-1">Metric</h3>
          <p className="text-3xl font-bold text-[#1e293b]">1,234</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-medium text-gray-700 mb-1">Revenue</h3>
          <p className="text-3xl font-bold text-[#10b981]">$5,678</p>
        </div>
      </div>
    </main>

    {/* 右侧边栏 */}
    <aside className="w-64 bg-white border-l border-gray-200 p-4 flex-shrink-0">
      <h4 className="text-sm font-medium text-gray-500 mb-3">Activity</h4>
      <div className="space-y-3 text-sm text-gray-600">
        <div className="pb-3 border-b border-gray-100">New user signed up</div>
        <div className="pb-3 border-b border-gray-100">Order completed</div>
        <div>Invoice sent</div>
      </div>
    </aside>
  </div>

  {/* 页脚 */}
  <footer className="bg-white border-t border-gray-200">
    <div className="px-6 py-4 text-center text-sm text-gray-500">
      Holy Grail Layout - Header, 3 columns, Footer
    </div>
  </footer>
</div>`,
    },
  },

  globalCss: `/* Holy Grail Layout 全局样式 */

/* 圣杯布局容器 */
.holy-grail {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 页头 */
.holy-grail-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: white;
  border-bottom: 1px solid #e2e8f0;
}

/* 三列主体 */
.holy-grail-body {
  display: flex;
  flex: 1;
}

/* 左侧导航栏 */
.holy-grail-nav {
  width: 240px;
  flex-shrink: 0;
  background: white;
  border-right: 1px solid #e2e8f0;
  padding: 1rem;
}

/* 主内容区 */
.holy-grail-main {
  flex: 1;
  padding: 1.5rem;
  min-width: 0;
}

/* 右侧边栏 */
.holy-grail-aside {
  width: 256px;
  flex-shrink: 0;
  background: white;
  border-left: 1px solid #e2e8f0;
  padding: 1rem;
}

/* 页脚 */
.holy-grail-footer {
  background: white;
  border-top: 1px solid #e2e8f0;
  padding: 1rem 1.5rem;
  text-align: center;
}

/* 响应式 */
@media (max-width: 1024px) {
  .holy-grail-aside {
    display: none;
  }
}

@media (max-width: 768px) {
  .holy-grail-body {
    flex-direction: column;
  }
  .holy-grail-nav {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }
}`,

  aiRules: `你是一个 Holy Grail Layout 布局专家。生成的所有代码必须严格遵守以下约束：

## 布局结构

五个区域：
1. Header：固定顶部，品牌 + 导航
2. Left Sidebar：固定宽度，导航菜单
3. Main Content：自适应宽度，主内容
4. Right Sidebar：固定宽度，辅助信息
5. Footer：固定底部，版权信息

## 实现规则

- 使用 Flexbox：外层 flex flex-col min-h-screen
- 三列区域：flex flex-1
- 侧边栏：固定宽度 w-60 / w-64 flex-shrink-0
- 主内容：flex-1 min-w-0
- 页头：sticky top-0 z-50
- 等高列：三列自动等高

## 响应式

大屏幕（>1024px）：完整三列
中等屏幕（768-1024px）：隐藏右侧边栏
小屏幕（<768px）：所有列垂直堆叠

## 自检

1. 页头固定在顶部
2. 三列等高
3. 主内容区自适应
4. 侧边栏固定宽度
5. 页脚始终在底部
6. 响应式折叠正确`,

  examplePrompts: [
    {
      title: "管理后台",
      titleEn: "Admin Dashboard",
      description: "圣杯布局的管理后台",
      descriptionEn: "Holy grail admin dashboard",
      prompt: `用 Holy Grail Layout 设计一个管理后台，要求：
1. 页头：logo + 搜索框 + 用户头像
2. 左侧导航：图标 + 文字菜单项
3. 主内容：数据卡片 + 表格
4. 右侧边栏：通知列表 + 快捷操作
5. 页脚：版权信息
6. 页头 sticky 固定，三列等高
7. 响应式折叠侧边栏`,
    },
  ],
};
