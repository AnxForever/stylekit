import type { DesignStyle } from "./index";

export const dataDense: DesignStyle = {
  slug: "data-dense",
  name: "数据密集",
  nameEn: "Data Dense",
  description:
    "高密度后台管理面板风格，紧凑间距与小尺寸组件，优先展示数据表格与操作效率。",
  descriptionEn:
    "High-density admin panel style with compact spacing and small components. Prioritizes data tables and operational efficiency.",
  cover: "/styles/data-dense.svg",
  styleType: "visual",
  tags: ["modern", "minimal"],
  category: "modern",
  colors: {
    primary: "#ffffff",
    secondary: "#f8fafc",
    accent: ["#3b82f6", "#ef4444", "#22c55e", "#64748b"],
  },
  keywords: ["后台管理", "数据表格", "高密度", "管理面板", "运营", "admin"],

  philosophy: `Data Dense 是一种效率优先的管理界面设计语言。

核心理念：
- 信息密度最大化：在有限屏幕空间内展示最多有效信息
- 扫描效率：行高紧凑、对齐严格，支持快速垂直扫描
- 操作即时性：行内操作、快捷键、批量选择减少点击次数
- 状态可视化：颜色编码传递状态，无需阅读文字即可理解`,

  philosophyEn: `Data Dense is an efficiency-first admin interface design language.

Core principles:
- Maximum information density: Show the most useful data in limited screen space
- Scan efficiency: Compact line-height, strict alignment, fast vertical scanning
- Action immediacy: Inline actions, shortcuts, batch selection reduce clicks
- Status visualization: Color-coded states understood without reading text`,

  doList: [
    "使用白色 bg-white 搭配极浅蓝灰 bg-[#f8fafc] 交替行色",
    "表格行高紧凑 py-2 text-sm 或 text-xs",
    "状态标签使用颜色编码 bg-blue-50 text-blue-700 rounded px-1.5 py-0.5 text-xs",
    "按钮使用小尺寸 px-2.5 py-1 text-xs rounded",
    "间距统一使用 4px 递增：gap-1 gap-2 gap-3",
    "表头使用 text-xs uppercase tracking-wide text-[#64748b] font-medium",
    "使用 monospace 显示数字、ID、代码类数据",
    "分隔线使用 border-[#e2e8f0] 细线",
  ],

  doListEn: [
    "Use white bg-white with very light blue-gray bg-[#f8fafc] alternating rows",
    "Table rows use compact py-2 text-sm or text-xs",
    "Status badges use color coding bg-blue-50 text-blue-700 rounded px-1.5 py-0.5 text-xs",
    "Buttons use small size px-2.5 py-1 text-xs rounded",
    "Spacing uses 4px increments: gap-1 gap-2 gap-3",
    "Table headers use text-xs uppercase tracking-wide text-[#64748b] font-medium",
    "Use monospace for numbers, IDs, code-like data",
    "Dividers use border-[#e2e8f0] thin lines",
  ],

  dontList: [
    "禁止使用大间距 p-6 以上（浪费数据展示空间）",
    "禁止使用大圆角 rounded-xl 以上（占用像素）",
    "禁止使用大字号 text-lg 以上作为表格数据",
    "禁止使用装饰性渐变或阴影（增加视觉噪音）",
    "禁止隐藏重要操作在下拉菜单中（常用操作必须直接可见）",
    "禁止使用大面积空白（数据优先）",
  ],

  dontListEn: [
    "Never use large spacing p-6+ (wastes data display space)",
    "Never use large rounded-xl+ corners (wastes pixels)",
    "Never use large text-lg+ for table data",
    "Never use decorative gradients or heavy shadows (adds visual noise)",
    "Never hide important actions in dropdowns (frequent actions must be visible)",
    "Never use large whitespace areas (data comes first)",
  ],

  components: {
    button: {
      name: "操作按钮",
      description: "紧凑行内操作按钮",
      code: `<div className="flex items-center gap-1.5">
  <button className="px-2.5 py-1 text-xs font-medium bg-[#3b82f6] text-white rounded hover:bg-[#2563eb] transition-colors">Save</button>
  <button className="px-2.5 py-1 text-xs font-medium border border-[#e2e8f0] text-[#64748b] rounded hover:bg-[#f8fafc] transition-colors">Cancel</button>
  <button className="px-2.5 py-1 text-xs font-medium text-[#ef4444] hover:bg-red-50 rounded transition-colors">Delete</button>
</div>`,
    },
    card: {
      name: "统计卡片",
      description: "紧凑 KPI 指标卡",
      code: `<div className="flex gap-3">
  <div className="flex-1 bg-white border border-[#e2e8f0] rounded px-3 py-2.5">
    <p className="text-[10px] uppercase tracking-wide text-[#64748b] mb-0.5">Revenue</p>
    <p className="text-lg font-semibold text-[#1e293b] font-mono">$42,389</p>
    <p className="text-[10px] text-[#22c55e]">+12.5%</p>
  </div>
  <div className="flex-1 bg-white border border-[#e2e8f0] rounded px-3 py-2.5">
    <p className="text-[10px] uppercase tracking-wide text-[#64748b] mb-0.5">Orders</p>
    <p className="text-lg font-semibold text-[#1e293b] font-mono">1,284</p>
    <p className="text-[10px] text-[#ef4444]">-3.2%</p>
  </div>
  <div className="flex-1 bg-white border border-[#e2e8f0] rounded px-3 py-2.5">
    <p className="text-[10px] uppercase tracking-wide text-[#64748b] mb-0.5">Users</p>
    <p className="text-lg font-semibold text-[#1e293b] font-mono">8,921</p>
    <p className="text-[10px] text-[#22c55e]">+8.1%</p>
  </div>
</div>`,
    },
    input: {
      name: "过滤输入",
      description: "紧凑筛选输入框",
      code: `<input type="text" placeholder="Filter..." className="px-2.5 py-1.5 text-xs border border-[#e2e8f0] rounded bg-white text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] transition-colors w-48" />`,
    },
    nav: {
      name: "管理导航",
      description: "紧凑侧栏导航",
      code: `<nav className="w-48 bg-[#f8fafc] border-r border-[#e2e8f0] py-3 text-xs">
  <div className="px-3 mb-3">
    <p className="text-[10px] uppercase tracking-wide text-[#94a3b8] mb-2">Navigation</p>
  </div>
  <div className="space-y-0.5 px-1.5">
    <div className="px-2 py-1.5 rounded bg-[#3b82f6] text-white font-medium cursor-pointer">Dashboard</div>
    <div className="px-2 py-1.5 rounded text-[#64748b] hover:bg-white hover:text-[#1e293b] transition-colors cursor-pointer">Users</div>
    <div className="px-2 py-1.5 rounded text-[#64748b] hover:bg-white hover:text-[#1e293b] transition-colors cursor-pointer">Orders</div>
    <div className="px-2 py-1.5 rounded text-[#64748b] hover:bg-white hover:text-[#1e293b] transition-colors cursor-pointer">Products</div>
    <div className="px-2 py-1.5 rounded text-[#64748b] hover:bg-white hover:text-[#1e293b] transition-colors cursor-pointer">Settings</div>
  </div>
</nav>`,
    },
    hero: {
      name: "数据表格",
      description: "高密度数据表",
      code: `<div className="border border-[#e2e8f0] rounded overflow-hidden">
  <table className="w-full text-xs">
    <thead>
      <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
        <th className="text-left px-3 py-2 text-[10px] uppercase tracking-wide text-[#64748b] font-medium">ID</th>
        <th className="text-left px-3 py-2 text-[10px] uppercase tracking-wide text-[#64748b] font-medium">Name</th>
        <th className="text-left px-3 py-2 text-[10px] uppercase tracking-wide text-[#64748b] font-medium">Status</th>
        <th className="text-right px-3 py-2 text-[10px] uppercase tracking-wide text-[#64748b] font-medium">Amount</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-[#e2e8f0]">
      <tr className="hover:bg-[#f8fafc]">
        <td className="px-3 py-2 font-mono text-[#64748b]">#1042</td>
        <td className="px-3 py-2 text-[#1e293b]">Order Alpha</td>
        <td className="px-3 py-2"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 text-[10px]">Active</span></td>
        <td className="px-3 py-2 text-right font-mono text-[#1e293b]">$1,200</td>
      </tr>
      <tr className="hover:bg-[#f8fafc]">
        <td className="px-3 py-2 font-mono text-[#64748b]">#1041</td>
        <td className="px-3 py-2 text-[#1e293b]">Order Beta</td>
        <td className="px-3 py-2"><span className="px-1.5 py-0.5 rounded bg-yellow-50 text-yellow-700 text-[10px]">Pending</span></td>
        <td className="px-3 py-2 text-right font-mono text-[#1e293b]">$890</td>
      </tr>
    </tbody>
  </table>
</div>`,
    },
    footer: {
      name: "状态栏",
      description: "底部状态信息栏",
      code: `<footer className="flex items-center justify-between px-3 py-2 bg-[#f8fafc] border-t border-[#e2e8f0] text-[10px] text-[#94a3b8]">
  <span>Showing 1-50 of 1,284 results</span>
  <div className="flex items-center gap-1">
    <button className="px-2 py-0.5 rounded border border-[#e2e8f0] hover:bg-white transition-colors">Prev</button>
    <button className="px-2 py-0.5 rounded bg-[#3b82f6] text-white">1</button>
    <button className="px-2 py-0.5 rounded border border-[#e2e8f0] hover:bg-white transition-colors">2</button>
    <button className="px-2 py-0.5 rounded border border-[#e2e8f0] hover:bg-white transition-colors">3</button>
    <button className="px-2 py-0.5 rounded border border-[#e2e8f0] hover:bg-white transition-colors">Next</button>
  </div>
</footer>`,
    },
  },

  globalCss: `.data-dense-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.375rem;
  font-size: 0.625rem;
  border-radius: 0.25rem;
  font-weight: 500;
}
.data-dense-badge--success { background: #f0fdf4; color: #15803d; }
.data-dense-badge--warning { background: #fffbeb; color: #a16207; }
.data-dense-badge--error { background: #fef2f2; color: #b91c1c; }
.data-dense-badge--info { background: #eff6ff; color: #1d4ed8; }`,

  aiRules: `You are a Data Dense admin panel design expert.

## Absolute Rules
- Maximum information density: py-2 or less for table rows
- All text in tables must be text-sm or text-xs
- Numbers and IDs must use font-mono
- Status must be color-coded (green=active, yellow=pending, red=error, blue=info)
- Buttons must be small: px-2.5 py-1 text-xs
- Table headers must be uppercase text-[10px] tracking-wide

## Forbidden
- Large padding (p-6+)
- Large rounded corners (rounded-xl+)
- Decorative gradients or heavy shadows
- Large font sizes in data areas
- Hidden frequent actions in menus
- Large whitespace gaps

## Responsive
- Mobile: horizontal scroll for tables, stacked cards for KPIs
- Desktop: full table view with inline actions`,

  examplePrompts: [
    {
      title: "管理后台仪表盘",
      titleEn: "Admin Dashboard",
      description: "高密度后台面板，含 KPI 卡片、数据表格、筛选栏",
      descriptionEn: "Dense admin panel with KPI cards, data table, and filter toolbar",
      prompt: "Build a data-dense admin dashboard with 4 compact KPI cards at top, filter toolbar with search and dropdowns, dense data table with inline status badges and action buttons, and pagination footer.",
    },
  ],
};
