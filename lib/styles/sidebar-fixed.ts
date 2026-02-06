import { DesignStyle } from "./index";

export const sidebarFixed: DesignStyle = {
  slug: "sidebar-fixed",
  name: "固定侧边栏布局",
  nameEn: "Fixed Sidebar",
  description:
    "固定位置的侧边导航栏与可滚动主内容区的应用布局，适合后台管理、文档站点、仪表盘、SaaS 应用。",
  cover: "/styles/sidebar-fixed.svg",
  styleType: "layout",
  tags: ["modern", "responsive"],
  compatibleWith: ["corporate-clean", "soft-ui", "dark-mode", "minimalist-flat", "neumorphism"],
  category: "modern",
  colors: {
    primary: "#1e293b",
    secondary: "#f8fafc",
    accent: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
  },
  keywords: ["侧边栏", "后台", "管理", "导航", "仪表盘", "应用"],

  philosophy: `Fixed Sidebar（固定侧边栏布局）是应用型界面的经典布局，提供持久可见的导航同时最大化内容展示空间。

核心理念：
- 导航常驻：重要入口始终可及
- 内容优先：主区域最大化利用
- 层级清晰：侧边栏体现信息架构
- 响应适配：小屏幕优雅收起`,

  doList: [
    "侧边栏使用 fixed 或 sticky 定位",
    "主内容区设置左边距 ml-64 或 pl-64",
    "移动端侧边栏可收起为抽屉或汉堡菜单",
    "提供展开/收起侧边栏的控制",
    "侧边栏宽度统一 w-64 (256px) 或 w-72 (288px)",
    "当前页面在侧边栏中高亮显示",
    "侧边栏可以包含品牌 logo、导航、用户信息",
  ],

  dontList: [
    "禁止侧边栏过宽影响主内容区",
    "禁止移动端仍保持展开侧边栏",
    "禁止忽略当前页面状态指示",
    "禁止导航层级过深难以操作",
    "禁止侧边栏内容溢出无滚动",
  ],

  components: {
    button: {
      name: "侧边栏按钮",
      description: "侧边栏中的操作按钮",
      code: `<button className="
  w-full
  flex items-center gap-3
  px-4 py-3
  text-left
  text-zinc-600
  rounded-lg
  hover:bg-zinc-100
  hover:text-zinc-900
  transition-colors
">
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
  <span>New Item</span>
</button>`,
    },
    card: {
      name: "内容卡片",
      description: "主内容区的卡片",
      code: `<div className="
  p-6
  bg-white
  rounded-xl
  border border-zinc-200
  shadow-sm
">
  <h3 className="text-lg font-semibold text-zinc-900 mb-2">
    Card Title
  </h3>
  <p className="text-zinc-600 text-sm">
    Content for the main area card.
  </p>
</div>`,
    },
    input: {
      name: "侧边栏搜索",
      description: "侧边栏中的搜索框",
      code: `<div className="relative">
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
  <input
    type="text"
    placeholder="Search..."
    className="
      w-full pl-9 pr-4 py-2
      bg-zinc-100
      border-0
      rounded-lg
      text-sm text-zinc-900
      placeholder-zinc-400
      focus:outline-none focus:ring-2 focus:ring-blue-500/30
    "
  />
</div>`,
    },
    nav: {
      name: "侧边导航",
      description: "侧边栏的导航菜单",
      code: `<nav className="space-y-1">
  <a href="#" className="
    flex items-center gap-3 px-4 py-3
    bg-blue-50 text-blue-600
    rounded-lg font-medium
  ">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
    Dashboard
  </a>
  <a href="#" className="
    flex items-center gap-3 px-4 py-3
    text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900
    rounded-lg transition-colors
  ">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
    Analytics
  </a>
  <a href="#" className="
    flex items-center gap-3 px-4 py-3
    text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900
    rounded-lg transition-colors
  ">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
    Users
  </a>
  <a href="#" className="
    flex items-center gap-3 px-4 py-3
    text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900
    rounded-lg transition-colors
  ">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    Settings
  </a>
</nav>`,
    },
    hero: {
      name: "固定侧边栏布局",
      description: "完整的侧边栏应用布局",
      code: `<div className="min-h-screen bg-zinc-50">
  {/* Sidebar */}
  <aside className="
    fixed top-0 left-0
    w-64 h-screen
    bg-white
    border-r border-zinc-200
    flex flex-col
    z-40
  ">
    {/* Logo */}
    <div className="p-6 border-b border-zinc-200">
      <span className="text-xl font-bold text-zinc-900">Logo</span>
    </div>

    {/* Search */}
    <div className="p-4">
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 bg-zinc-100 border-0 rounded-lg text-sm" />
      </div>
    </div>

    {/* Navigation */}
    <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
      <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        Dashboard
      </a>
      <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-100 rounded-lg">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z" /></svg>
        Analytics
      </a>
      <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-100 rounded-lg">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z" /></svg>
        Users
      </a>
    </nav>

    {/* User */}
    <div className="p-4 border-t border-zinc-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-zinc-200 rounded-full" />
        <div>
          <div className="font-medium text-zinc-900 text-sm">John Doe</div>
          <div className="text-zinc-500 text-xs">Admin</div>
        </div>
      </div>
    </div>
  </aside>

  {/* Main Content */}
  <main className="ml-64 p-8">
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
      <p className="text-zinc-600">Welcome back, John!</p>
    </div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="p-6 bg-white rounded-xl border border-zinc-200">
        <h3 className="font-semibold text-zinc-900 mb-2">Total Users</h3>
        <p className="text-3xl font-bold text-blue-600">12,345</p>
      </div>
      <div className="p-6 bg-white rounded-xl border border-zinc-200">
        <h3 className="font-semibold text-zinc-900 mb-2">Revenue</h3>
        <p className="text-3xl font-bold text-emerald-600">$45,678</p>
      </div>
      <div className="p-6 bg-white rounded-xl border border-zinc-200">
        <h3 className="font-semibold text-zinc-900 mb-2">Orders</h3>
        <p className="text-3xl font-bold text-amber-600">1,234</p>
      </div>
    </div>
  </main>
</div>`,
    },
  },

  globalCss: `/* Fixed Sidebar Global Styles */

/* Sidebar base */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 16rem; /* 256px */
  height: 100vh;
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  z-index: 40;
  transition: transform 0.3s ease;
}

/* Main content offset */
.main-content {
  margin-left: 16rem;
  min-height: 100vh;
}

/* Mobile sidebar hidden by default */
@media (max-width: 1024px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
  }
}

/* Sidebar overlay for mobile */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 30;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.sidebar-overlay.visible {
  opacity: 1;
  visibility: visible;
}

/* Collapsed sidebar variant */
.sidebar-collapsed {
  width: 4rem; /* 64px */
}

.sidebar-collapsed .sidebar-label {
  display: none;
}

.sidebar-collapsed + .main-content {
  margin-left: 4rem;
}

/* Navigation item active state */
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: #64748b;
  transition: all 0.2s;
}

.nav-item:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.nav-item.active {
  background: #eff6ff;
  color: #2563eb;
  font-weight: 500;
}`,

  aiRules: `You are a frontend expert specializing in Fixed Sidebar layout. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Do NOT make sidebar too wide (max 280px)
- Do NOT keep sidebar expanded on mobile
- Do NOT forget current page indicator
- Do NOT create overly deep navigation
- Do NOT ignore sidebar overflow scroll

## Must Follow

- Sidebar: fixed top-0 left-0 w-64 h-screen
- Main content: ml-64 (matches sidebar width)
- Mobile: sidebar hidden, hamburger menu trigger
- Active state: highlight current page
- Overflow: sidebar nav scrollable if needed

## Structure

Sidebar (top to bottom):
1. Logo/Brand area
2. Search (optional)
3. Main navigation (scrollable)
4. Secondary nav or settings
5. User profile/account

Main content:
- Left margin matches sidebar width
- Own scrolling context
- Header area for page title
- Content area below

## Responsive

Desktop (1024px+):
- Full sidebar visible
- Main content with left margin

Tablet/Mobile (< 1024px):
- Sidebar as off-canvas drawer
- Hamburger menu button
- Overlay when sidebar open
- Main content full width

## Navigation

- Group related items
- Use icons + labels
- Highlight active item
- Support nested items (accordion)
- Tooltips when collapsed

## Self-Check

After generating code, verify:
1. Sidebar is fixed position
2. Main content has correct margin
3. Mobile has hamburger menu
4. Current page is highlighted
5. Sidebar scrolls if content overflows`,

  examplePrompts: [
    {
      title: "管理后台",
      titleEn: "Admin Dashboard",
      description: "完整的后台管理布局",
      descriptionEn: "Complete admin dashboard layout",
      prompt: `Create an admin dashboard with fixed sidebar:
1. Fixed sidebar with logo, search, navigation, user
2. Navigation groups: Dashboard, Content, Users, Settings
3. Active page highlighted in nav
4. Main area with header and content grid
5. Mobile: hamburger menu, slide-out sidebar
6. Collapsible sidebar option (icons only)
7. User dropdown at bottom of sidebar
Professional look with blue accent color`,
    },
    {
      title: "文档站点",
      titleEn: "Documentation Site",
      description: "技术文档的侧边导航布局",
      descriptionEn: "Sidebar navigation for docs",
      prompt: `Create a documentation site with fixed sidebar:
1. Sidebar with doc sections (Getting Started, API, Examples)
2. Nested navigation with accordion expand
3. Search at top of sidebar
4. Main content area with article
5. Right sidebar with table of contents (optional)
6. Previous/Next article navigation at bottom
7. Mobile: slide-out sidebar menu
Clean minimal design focused on readability`,
    },
    {
      title: "SaaS 应用",
      titleEn: "SaaS Application",
      description: "SaaS 产品的应用框架",
      descriptionEn: "SaaS product application shell",
      prompt: `Create a SaaS application shell with fixed sidebar:
1. Sidebar with workspace switcher at top
2. Main nav: Home, Projects, Team, Reports
3. Secondary nav at bottom: Settings, Help
4. Notification badge on nav item
5. Main content with toolbar and data table
6. Mobile: slide-out navigation
7. Collapsible sidebar with keyboard shortcut hint
Modern SaaS aesthetic with subtle shadows`,
    },
  ],
};
