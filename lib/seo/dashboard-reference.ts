/** Source review date, not an automatically refreshed publication timestamp. */
export const DASHBOARD_REFERENCE_REVIEWED_AT = "2026-09-15";

export const DASHBOARD_PROMPT_CHECKLIST = [
  {
    en: "Name the user, their decision, and the dashboard's primary task.",
    zh: "说明目标用户、他们要做的决策，以及仪表盘的首要任务。",
  },
  {
    en: "List the real data fields and rank the KPIs by importance.",
    zh: "列出真实数据字段，并按重要性排列 KPI。",
  },
  {
    en: "Define desktop and mobile layout behavior instead of asking only for a responsive design.",
    zh: "分别说明桌面端和移动端布局变化，不要只写“响应式”。",
  },
  {
    en: "Specify filters, table actions, loading, empty, error, and permission states.",
    zh: "明确筛选、表格操作、加载、空内容、错误和权限状态。",
  },
  {
    en: "Require labels beyond color, keyboard focus, readable contrast, and chart or table alternatives.",
    zh: "要求颜色之外的文字标签、键盘焦点、可读对比度，以及图表或表格替代内容。",
  },
  {
    en: "Name the framework, component library, chart library, and expected output files.",
    zh: "写明框架、组件库、图表库和期望输出的文件。",
  },
] as const;

export const DASHBOARD_PROMPT_COMPARISON = {
  vague: {
    en: "Make a modern analytics dashboard with cards and charts.",
    zh: "做一个现代的数据分析仪表盘，要有卡片和图表。",
  },
  specific: {
    en: "Build a responsive subscription analytics dashboard for a growth manager using React, TypeScript, Tailwind CSS, and Recharts. Prioritize MRR, churn, trial conversion, and active accounts. On desktop use a collapsible sidebar and a 12-column content grid; on mobile use a top bar and stack the KPI cards. Add a date-range filter, comparison period, loading skeleton, empty state, API error state, keyboard-visible focus, text labels for every status color, and a data table that exposes the chart values. Return the page component, typed sample data, and a short verification checklist.",
    zh: "使用 React、TypeScript、Tailwind CSS 和 Recharts，为增长负责人构建响应式订阅分析仪表盘。优先展示 MRR、流失率、试用转化率和活跃账户。桌面端使用可折叠侧边栏与 12 列内容网格，移动端改为顶部栏并纵向排列 KPI 卡片。加入日期范围、对比周期、加载骨架、空状态、API 错误状态、清晰的键盘焦点；每种状态色都要配文字标签，并提供能读取图表数值的数据表。输出页面组件、带类型的示例数据和简短验收清单。",
  },
} as const;

export const DASHBOARD_SOURCES = [
  {
    href: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html",
    name: "W3C — WCAG 2.2 Contrast (Minimum)",
    en: "Normal text needs at least 4.5:1 contrast and large text at least 3:1. This check alone does not establish full accessibility conformance.",
    zh: "普通文字至少需要 4.5:1 对比度，大号文字至少需要 3:1；只通过这一项不代表整体满足无障碍标准。",
  },
  {
    href: "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html",
    name: "W3C — WCAG 2.2 Use of Color",
    en: "Color cannot be the only visual means of communicating status, actions, or distinctions.",
    zh: "不能只用颜色表达状态、操作或数据差异。",
  },
  {
    href: "https://www.w3.org/WAI/tutorials/tables/",
    name: "W3C WAI — Tables Tutorial",
    en: "Data tables need structural markup that connects headers with their cells.",
    zh: "数据表需要用结构化标记建立表头与数据单元格之间的关系。",
  },
] as const;
