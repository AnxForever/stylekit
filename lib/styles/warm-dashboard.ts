import { DesignStyle } from "./index";

export const warmDashboard: DesignStyle = {
  slug: "warm-dashboard",
  name: "暖色仪表盘",
  nameEn: "Warm Dashboard",
  description:
    "温暖柔和的仪表盘设计风格，采用珊瑚/赤陶色背景、奶油白卡片、柔和阴影，营造舒适专业的数据展示体验。",
  cover: "/styles/warm-dashboard.svg",
  styleType: "visual",
  tags: ["modern", "minimal"],
  category: "modern",
  colors: {
    primary: "#d4a088",
    secondary: "#faf8f5",
    accent: ["#4a9d9a", "#e8b86d", "#c17767", "#6b8e8e"],
  },
  keywords: ["暖色", "仪表盘", "珊瑚色", "赤陶", "奶油白", "数据可视化", "舒适"],

  philosophy: `Warm Dashboard（暖色仪表盘）是一种温暖、专业的界面设计风格，通过暖色调背景和柔和的卡片设计，让数据展示更加亲和友好。

核心理念：
- 温暖舒适：珊瑚/赤陶色背景传递温暖感
- 清晰层次：奶油白卡片在暖色背景上形成清晰对比
- 柔和触感：大圆角、漫射阴影营造柔软视觉
- 专业可读：深灰文字确保数据可读性
- 点缀色彩：青绿、金黄作为数据高亮和图表色`,

  doList: [
    "背景使用暖色调 bg-[#d4a088] 或 bg-[#c9967a]",
    "卡片使用奶油白 bg-[#faf8f5] 或 bg-white",
    "使用大圆角 rounded-2xl 或 rounded-3xl",
    "使用柔和漫射阴影 shadow-xl shadow-black/10",
    "图表使用青绿 #4a9d9a 和金黄 #e8b86d 配色",
    "文字使用深灰 text-gray-800 或 text-gray-600",
    "侧边栏使用半透明白色 bg-white/80 backdrop-blur",
    "数据高亮使用点缀色圆形背景",
  ],

  dontList: [
    "禁止使用冷色背景（蓝色、紫色）",
    "禁止使用纯黑文字 text-black",
    "禁止使用尖锐边角 rounded-none rounded-sm",
    "禁止使用硬边阴影",
    "禁止使用高饱和度霓虹色",
    "禁止使用粗边框 border-2 及以上",
  ],

  components: {
    button: {
      name: "按钮",
      description: "暖色仪表盘风格按钮，柔和圆角配合点缀色",
      code: `{/* 主按钮 - 青绿色 */}
<button className="
  px-5 py-2.5 md:px-6 md:py-3
  bg-[#4a9d9a] text-white
  rounded-xl
  shadow-lg shadow-[#4a9d9a]/25
  hover:shadow-xl hover:shadow-[#4a9d9a]/30
  hover:-translate-y-0.5
  transition-all duration-200
  font-medium text-sm md:text-base
">
  View Report
</button>

{/* 次按钮 - 奶油白 */}
<button className="
  px-5 py-2.5 md:px-6 md:py-3
  bg-white text-gray-700
  rounded-xl
  shadow-lg shadow-black/5
  hover:shadow-xl hover:-translate-y-0.5
  transition-all duration-200
  font-medium text-sm md:text-base
">
  Export
</button>

{/* 强调按钮 - 珊瑚色 */}
<button className="
  px-5 py-2.5 md:px-6 md:py-3
  bg-[#c17767] text-white
  rounded-xl
  shadow-lg shadow-[#c17767]/25
  hover:shadow-xl hover:-translate-y-0.5
  transition-all duration-200
  font-medium text-sm md:text-base
">
  Upgrade
</button>`,
    },
    card: {
      name: "卡片",
      description: "奶油白卡片，大圆角柔和阴影",
      code: `<div className="
  bg-[#faf8f5]
  rounded-2xl md:rounded-3xl
  shadow-xl shadow-black/8
  p-5 md:p-6 lg:p-8
  hover:shadow-2xl hover:-translate-y-1
  transition-all duration-300
">
  {/* 统计数据 */}
  <div className="flex items-center justify-between mb-4">
    <span className="text-gray-500 text-sm font-medium">Views</span>
    <span className="w-2 h-2 rounded-full bg-[#4a9d9a]" />
  </div>
  <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">27,6m</p>
  <p className="text-sm text-gray-400">+12% from last month</p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "柔和背景的输入框",
      code: `<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-600">Search</label>
  <input
    type="text"
    placeholder="Search reports..."
    className="
      w-full px-4 py-3
      bg-white
      border border-gray-200
      rounded-xl
      text-gray-800
      placeholder:text-gray-400
      focus:outline-none focus:ring-2 focus:ring-[#4a9d9a]/30
      focus:border-[#4a9d9a]
      transition-all duration-200
    "
  />
</div>`,
    },
    nav: {
      name: "侧边栏",
      description: "半透明白色侧边栏导航",
      code: `<aside className="
  w-60 h-screen
  bg-white/80 backdrop-blur-xl
  border-r border-gray-200/50
  p-6
  flex flex-col
">
  {/* Logo */}
  <div className="flex items-center gap-2 mb-8">
    <div className="w-8 h-8 bg-[#4a9d9a] rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-sm">C</span>
    </div>
    <span className="font-semibold text-gray-800">Crowz</span>
  </div>

  {/* Avatar */}
  <div className="text-center mb-8">
    <div className="w-20 h-20 rounded-full bg-[#d4a088] mx-auto mb-3 overflow-hidden">
      <img src="/avatar.jpg" alt="User" className="w-full h-full object-cover" />
    </div>
    <p className="font-semibold text-gray-800">Robert Grant</p>
    <p className="text-sm text-gray-500">Marketing Director</p>
  </div>

  {/* Navigation */}
  <nav className="flex-1">
    <a href="#" className="
      flex items-center gap-3 px-4 py-3
      bg-[#faf8f5] rounded-xl
      text-gray-800 font-medium
      mb-2
    ">
      <span className="w-2 h-2 rounded-full bg-[#c17767]" />
      Dashboard
    </a>
    <a href="#" className="
      flex items-center gap-3 px-4 py-3
      text-gray-500
      hover:bg-[#faf8f5] hover:text-gray-800
      rounded-xl
      transition-colors duration-200
    ">
      Insights
    </a>
    <a href="#" className="
      flex items-center gap-3 px-4 py-3
      text-gray-500
      hover:bg-[#faf8f5] hover:text-gray-800
      rounded-xl
      transition-colors duration-200
    ">
      Reports
    </a>
  </nav>
</aside>`,
    },
    hero: {
      name: "仪表盘主区域",
      description: "暖色背景的仪表盘主内容区",
      code: `<main className="
  flex-1
  bg-[#d4a088]
  p-6 md:p-8 lg:p-10
  min-h-screen
">
  {/* 标题栏 */}
  <div className="flex items-center justify-between mb-8">
    <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
    <div className="flex items-center gap-3">
      <button className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
        <Bell className="w-5 h-5" />
      </button>
      <button className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
        <Settings className="w-5 h-5" />
      </button>
    </div>
  </div>

  {/* 统计卡片网格 */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
    <div className="bg-[#faf8f5] rounded-2xl p-6 shadow-xl shadow-black/8">
      <p className="text-gray-500 text-sm mb-2">Views</p>
      <p className="text-3xl font-bold text-gray-800">27,6m</p>
    </div>
    <div className="bg-[#faf8f5] rounded-2xl p-6 shadow-xl shadow-black/8">
      <p className="text-gray-500 text-sm mb-2">Followers</p>
      <p className="text-3xl font-bold text-gray-800">219,3k</p>
    </div>
    <div className="bg-[#faf8f5] rounded-2xl p-6 shadow-xl shadow-black/8">
      <p className="text-gray-500 text-sm mb-2">Reposts</p>
      <p className="text-3xl font-bold text-gray-800">1,5k</p>
    </div>
  </div>

  {/* 主内容卡片 */}
  <div className="bg-[#faf8f5] rounded-3xl p-6 md:p-8 shadow-xl shadow-black/8">
    <h2 className="text-xl font-semibold text-gray-800 mb-6">Activity</h2>
    {/* 图表区域 */}
    <div className="h-64 flex items-end gap-2">
      {/* 简化的柱状图 */}
      <div className="flex-1 bg-[#e8b86d]/20 rounded-t-lg" style={{height: '40%'}} />
      <div className="flex-1 bg-[#e8b86d]/20 rounded-t-lg" style={{height: '60%'}} />
      <div className="flex-1 bg-[#e8b86d]/20 rounded-t-lg" style={{height: '45%'}} />
      <div className="flex-1 bg-[#e8b86d] rounded-t-lg" style={{height: '80%'}} />
      <div className="flex-1 bg-[#e8b86d]/20 rounded-t-lg" style={{height: '70%'}} />
    </div>
  </div>
</main>`,
    },
    footer: {
      name: "底部栏",
      description: "渠道统计底部卡片",
      code: `<div className="
  bg-gradient-to-r from-[#e8f4f4] to-[#f0f7f7]
  rounded-2xl md:rounded-3xl
  p-5 md:p-6
  shadow-lg shadow-black/5
">
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div>
      <h3 className="font-semibold text-gray-800 mb-1">Channels</h3>
      <p className="text-sm text-gray-500">Your channels statistics for 1 week period.</p>
    </div>
    <div className="flex flex-wrap gap-3">
      <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm">
        <div className="w-8 h-8 bg-[#ea4c89] rounded-lg flex items-center justify-center">
          <span className="text-white text-xs font-bold">Dr</span>
        </div>
        <div>
          <p className="text-xs text-gray-500">Dribbble</p>
          <p className="text-sm font-semibold text-[#4a9d9a]">+2%</p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm">
        <div className="w-8 h-8 bg-[#0057ff] rounded-lg flex items-center justify-center">
          <span className="text-white text-xs font-bold">Be</span>
        </div>
        <div>
          <p className="text-xs text-gray-500">Behance</p>
          <p className="text-sm font-semibold text-[#c17767]">-7%</p>
        </div>
      </div>
      <button className="bg-[#4a9d9a] text-white rounded-xl px-4 py-2 font-medium text-sm">
        Full Stats
      </button>
    </div>
  </div>
</div>`,
    },
  },

  globalCss: `/* Warm Dashboard 全局样式 */
:root {
  --warm-bg: #d4a088;
  --warm-bg-light: #e0b8a4;
  --warm-card: #faf8f5;
  --warm-teal: #4a9d9a;
  --warm-gold: #e8b86d;
  --warm-coral: #c17767;
  --warm-sage: #6b8e8e;
}

body {
  background: var(--warm-bg);
  color: #374151;
}

/* 卡片基础样式 */
.warm-card {
  background: var(--warm-card);
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08);
}

/* 侧边栏毛玻璃 */
.warm-sidebar {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* 数据高亮 */
.warm-highlight {
  color: var(--warm-teal);
}

.warm-highlight-negative {
  color: var(--warm-coral);
}

/* 图表颜色 */
.warm-chart-primary {
  fill: var(--warm-gold);
}

.warm-chart-secondary {
  fill: var(--warm-teal);
}`,

  aiRules: `你是一个 Warm Dashboard（暖色仪表盘）设计风格的前端开发专家。

## 核心特征

背景：
- 主背景：bg-[#d4a088] 珊瑚/赤陶色
- 可选变体：bg-[#c9967a] 更深、bg-[#e0b8a4] 更浅

卡片：
- 背景：bg-[#faf8f5] 奶油白 或 bg-white
- 圆角：rounded-2xl 或 rounded-3xl
- 阴影：shadow-xl shadow-black/8（柔和漫射）
- hover：hover:shadow-2xl hover:-translate-y-1

配色系统：
- 青绿（主要强调）：#4a9d9a - 用于主按钮、正向数据
- 金黄（图表主色）：#e8b86d - 用于图表、高亮
- 珊瑚（次要强调）：#c17767 - 用于负向数据、警告
- 灰绿（辅助）：#6b8e8e - 用于次要元素

文字：
- 标题：text-gray-800 font-semibold/bold
- 正文：text-gray-600
- 次要：text-gray-500 text-gray-400
- 暖背景上：text-white

## 布局

侧边栏：
- bg-white/80 backdrop-blur-xl
- 宽度 w-60
- 包含 logo、头像、导航

主区域：
- bg-[#d4a088] 暖色背景
- p-6 md:p-8 lg:p-10
- 统计卡片网格 + 图表卡片

## 禁止

- 冷色背景（蓝、紫、灰）
- 纯黑文字
- 尖锐边角
- 硬边阴影
- 霓虹色
- 粗边框`,

  examplePrompts: [
    {
      title: "社交媒体数据仪表盘",
      titleEn: "Social Media Analytics Dashboard",
      description: "展示粉丝、互动、增长等数据",
      descriptionEn: "Display followers, engagement, growth metrics",
      prompt: `用 Warm Dashboard 风格创建一个社交媒体分析仪表盘，要求：

## 布局
- 左侧：半透明白色侧边栏 bg-white/80 backdrop-blur-xl
- 右侧：珊瑚色主区域 bg-[#d4a088]

## 侧边栏
- Logo + 品牌名
- 用户头像（圆形，珊瑚色边框）
- 导航菜单：Dashboard、Insights、Reports、Comments、Channels
- 当前页高亮：bg-[#faf8f5] + 左侧小圆点

## 主区域
- 顶部：标题 + 通知/设置图标
- 统计卡片行（3列）：Views、Followers、Reposts
- 活动图表卡片：折线图，金黄色 #e8b86d
- Top Performers 列表
- 底部渠道统计条

## 数据可视化
- 正向数据：text-[#4a9d9a]
- 负向数据：text-[#c17767]
- 图表主色：#e8b86d`,
    },
    {
      title: "项目管理仪表盘",
      titleEn: "Project Management Dashboard",
      description: "任务进度、团队成员、截止日期",
      descriptionEn: "Task progress, team members, deadlines",
      prompt: `用 Warm Dashboard 风格创建一个项目管理仪表盘，要求：

## 背景
- 主区域：bg-[#d4a088]
- 卡片：bg-[#faf8f5] rounded-3xl shadow-xl

## 组件
1. 项目概览卡片：进度环形图、完成百分比
2. 任务列表：复选框、优先级标签、截止日期
3. 团队成员：头像堆叠、在线状态
4. 时间线：垂直时间轴、里程碑节点

## 配色
- 完成状态：#4a9d9a 青绿
- 进行中：#e8b86d 金黄
- 延期：#c17767 珊瑚
- 未开始：#9ca3af 灰色`,
    },
    {
      title: "财务数据仪表盘",
      titleEn: "Financial Dashboard",
      description: "收入支出、趋势图表、预算对比",
      descriptionEn: "Income expenses, trend charts, budget comparison",
      prompt: `用 Warm Dashboard 风格创建一个个人财务仪表盘，要求：

## 布局
- 珊瑚色背景 bg-[#d4a088]
- 奶油白卡片 bg-[#faf8f5]

## 数据卡片
1. 总资产卡片：大数字、增长趋势
2. 收入/支出对比：柱状图
3. 分类饼图：餐饮、交通、娱乐等
4. 近期交易列表：图标、金额、日期

## 配色规则
- 收入/正向：#4a9d9a
- 支出/负向：#c17767
- 图表填充：#e8b86d
- 次要数据：#6b8e8e`,
    },
  ],
};
