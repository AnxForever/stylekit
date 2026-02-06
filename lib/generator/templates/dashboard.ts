/**
 * Dashboard Template Definition
 */

import type { TemplateDefinition } from "../types";

export const dashboardTemplate: TemplateDefinition = {
  type: "dashboard",
  name: "仪表盘",
  nameEn: "Dashboard",
  description: "包含侧边栏、KPI 卡片和图表面板的数据仪表盘模板",
  sections: [
    {
      id: "sidebar",
      name: "侧边导航",
      nameEn: "Sidebar Navigation",
      description: "仪表盘左侧导航栏",
      defaultEnabled: true,
      fields: [
        {
          id: "appName",
          label: "应用名称",
          labelEn: "App Name",
          type: "text",
          defaultValue: "Dashboard",
          placeholder: "输入应用名称",
        },
        {
          id: "navItems",
          label: "导航项（逗号分隔）",
          labelEn: "Nav Items (comma separated)",
          type: "text",
          defaultValue: "概览, 分析, 订单, 用户, 设置",
          placeholder: "如：概览, 分析, 订单",
        },
        {
          id: "activeItem",
          label: "当前激活项",
          labelEn: "Active Item",
          type: "text",
          defaultValue: "概览",
          placeholder: "当前激活的导航项",
        },
      ],
    },
    {
      id: "kpi",
      name: "KPI 指标",
      nameEn: "KPI Metrics",
      description: "关键业务指标卡片区域",
      defaultEnabled: true,
      fields: [
        {
          id: "sectionTitle",
          label: "区块标题",
          labelEn: "Section Title",
          type: "text",
          defaultValue: "数据概览",
          placeholder: "如：数据概览、关键指标",
        },
        {
          id: "kpi1Label",
          label: "指标1名称",
          labelEn: "KPI 1 Label",
          type: "text",
          defaultValue: "总收入",
          placeholder: "指标名称",
        },
        {
          id: "kpi1Value",
          label: "指标1数值",
          labelEn: "KPI 1 Value",
          type: "text",
          defaultValue: "$48,230",
          placeholder: "指标数值",
        },
        {
          id: "kpi1Change",
          label: "指标1变化",
          labelEn: "KPI 1 Change",
          type: "text",
          defaultValue: "+12.5%",
          placeholder: "如：+12.5%",
        },
        {
          id: "kpi2Label",
          label: "指标2名称",
          labelEn: "KPI 2 Label",
          type: "text",
          defaultValue: "用户数",
          placeholder: "指标名称",
        },
        {
          id: "kpi2Value",
          label: "指标2数值",
          labelEn: "KPI 2 Value",
          type: "text",
          defaultValue: "2,420",
          placeholder: "指标数值",
        },
        {
          id: "kpi2Change",
          label: "指标2变化",
          labelEn: "KPI 2 Change",
          type: "text",
          defaultValue: "+5.2%",
          placeholder: "如：+5.2%",
        },
        {
          id: "kpi3Label",
          label: "指标3名称",
          labelEn: "KPI 3 Label",
          type: "text",
          defaultValue: "订单量",
          placeholder: "指标名称",
        },
        {
          id: "kpi3Value",
          label: "指标3数值",
          labelEn: "KPI 3 Value",
          type: "text",
          defaultValue: "1,210",
          placeholder: "指标数值",
        },
        {
          id: "kpi3Change",
          label: "指标3变化",
          labelEn: "KPI 3 Change",
          type: "text",
          defaultValue: "-2.1%",
          placeholder: "如：-2.1%",
        },
        {
          id: "kpi4Label",
          label: "指标4名称",
          labelEn: "KPI 4 Label",
          type: "text",
          defaultValue: "转化率",
          placeholder: "指标名称",
        },
        {
          id: "kpi4Value",
          label: "指标4数值",
          labelEn: "KPI 4 Value",
          type: "text",
          defaultValue: "3.6%",
          placeholder: "指标数值",
        },
        {
          id: "kpi4Change",
          label: "指标4变化",
          labelEn: "KPI 4 Change",
          type: "text",
          defaultValue: "+0.3%",
          placeholder: "如：+0.3%",
        },
      ],
    },
    {
      id: "charts",
      name: "图表区域",
      nameEn: "Charts",
      description: "数据可视化图表区域",
      defaultEnabled: true,
      fields: [
        {
          id: "chartTitle",
          label: "图表标题",
          labelEn: "Chart Title",
          type: "text",
          defaultValue: "收入趋势",
          placeholder: "图表标题",
        },
        {
          id: "chartType",
          label: "图表类型",
          labelEn: "Chart Type",
          type: "text",
          defaultValue: "bar",
          placeholder: "如：bar, line, pie",
        },
      ],
    },
    {
      id: "table",
      name: "数据表格",
      nameEn: "Data Table",
      description: "数据展示表格",
      defaultEnabled: true,
      fields: [
        {
          id: "tableTitle",
          label: "表格标题",
          labelEn: "Table Title",
          type: "text",
          defaultValue: "最近订单",
          placeholder: "表格标题",
        },
        {
          id: "columns",
          label: "列名（逗号分隔）",
          labelEn: "Columns (comma separated)",
          type: "text",
          defaultValue: "订单号, 客户, 金额, 状态, 日期",
          placeholder: "如：订单号, 客户, 金额",
        },
        {
          id: "rowCount",
          label: "行数",
          labelEn: "Row Count",
          type: "text",
          defaultValue: "5",
          placeholder: "显示行数",
        },
      ],
    },
    {
      id: "footer",
      name: "页脚",
      nameEn: "Footer",
      description: "仪表盘底部信息",
      defaultEnabled: true,
      fields: [
        {
          id: "copyright",
          label: "版权信息",
          labelEn: "Copyright",
          type: "text",
          defaultValue: "2024 Dashboard. All rights reserved.",
          placeholder: "版权声明",
        },
        {
          id: "version",
          label: "版本号",
          labelEn: "Version",
          type: "text",
          defaultValue: "v1.0.0",
          placeholder: "如：v1.0.0",
        },
      ],
    },
  ],
};

/**
 * Generate HTML for dashboard sidebar navigation
 */
export function generateDashboardSidebarHtml(content: Record<string, string>): string {
  const appName = content.appName || "Dashboard";
  const navItemsStr = content.navItems || "概览, 分析, 订单, 用户, 设置";
  const activeItem = content.activeItem || "概览";

  const navItems = navItemsStr.split(",").map((item) => item.trim());

  const navItemElements = navItems
    .map((item) => {
      const isActive = item === activeItem;
      const activeClass = isActive ? " dashboard-nav-item--active" : "";
      return `        <a href="#" class="dashboard-nav-item${activeClass}">${item}</a>`;
    })
    .join("\n");

  return `
    <aside class="dashboard-sidebar">
      <div class="dashboard-sidebar-header">
        <h2 class="dashboard-app-name">${appName}</h2>
      </div>
      <nav class="dashboard-nav">
${navItemElements}
      </nav>
    </aside>
`;
}

/**
 * Generate HTML for dashboard KPI metrics section
 */
export function generateDashboardKpiHtml(content: Record<string, string>): string {
  const sectionTitle = content.sectionTitle || "数据概览";

  const kpis = [
    {
      label: content.kpi1Label || "总收入",
      value: content.kpi1Value || "$48,230",
      change: content.kpi1Change || "+12.5%",
    },
    {
      label: content.kpi2Label || "用户数",
      value: content.kpi2Value || "2,420",
      change: content.kpi2Change || "+5.2%",
    },
    {
      label: content.kpi3Label || "订单量",
      value: content.kpi3Value || "1,210",
      change: content.kpi3Change || "-2.1%",
    },
    {
      label: content.kpi4Label || "转化率",
      value: content.kpi4Value || "3.6%",
      change: content.kpi4Change || "+0.3%",
    },
  ];

  const kpiCards = kpis
    .map((kpi) => {
      const isPositive = kpi.change.startsWith("+");
      const changeClass = isPositive ? "dashboard-kpi-change--positive" : "dashboard-kpi-change--negative";
      return `
        <div class="dashboard-kpi-card">
          <span class="dashboard-kpi-label">${kpi.label}</span>
          <span class="dashboard-kpi-value">${kpi.value}</span>
          <span class="dashboard-kpi-change ${changeClass}">${kpi.change}</span>
        </div>`;
    })
    .join("\n");

  return `
      <section class="dashboard-kpi-section">
        <h2 class="dashboard-section-title">${sectionTitle}</h2>
        <div class="dashboard-kpi-grid">
${kpiCards}
        </div>
      </section>
`;
}

/**
 * Generate HTML for dashboard charts section
 */
export function generateDashboardChartsHtml(content: Record<string, string>): string {
  const chartTitle = content.chartTitle || "收入趋势";
  const chartType = content.chartType || "bar";

  const barChart = `
          <div class="dashboard-chart-bars">
            <div class="dashboard-chart-bar" style="height: 40%;">
              <span class="dashboard-chart-bar-label">Jan</span>
            </div>
            <div class="dashboard-chart-bar" style="height: 65%;">
              <span class="dashboard-chart-bar-label">Feb</span>
            </div>
            <div class="dashboard-chart-bar" style="height: 50%;">
              <span class="dashboard-chart-bar-label">Mar</span>
            </div>
            <div class="dashboard-chart-bar" style="height: 75%;">
              <span class="dashboard-chart-bar-label">Apr</span>
            </div>
            <div class="dashboard-chart-bar" style="height: 60%;">
              <span class="dashboard-chart-bar-label">May</span>
            </div>
            <div class="dashboard-chart-bar" style="height: 85%;">
              <span class="dashboard-chart-bar-label">Jun</span>
            </div>
            <div class="dashboard-chart-bar" style="height: 70%;">
              <span class="dashboard-chart-bar-label">Jul</span>
            </div>
            <div class="dashboard-chart-bar" style="height: 90%;">
              <span class="dashboard-chart-bar-label">Aug</span>
            </div>
          </div>`;

  return `
      <section class="dashboard-chart-section">
        <div class="dashboard-chart-area">
          <h3 class="dashboard-chart-title">${chartTitle}</h3>
          <div class="dashboard-chart-container" data-chart-type="${chartType}">
${barChart}
          </div>
        </div>
      </section>
`;
}

/**
 * Generate HTML for dashboard data table section
 */
export function generateDashboardTableHtml(content: Record<string, string>): string {
  const tableTitle = content.tableTitle || "最近订单";
  const columnsStr = content.columns || "订单号, 客户, 金额, 状态, 日期";
  const rowCount = parseInt(content.rowCount || "5", 10);

  const columns = columnsStr.split(",").map((c) => c.trim());

  const headerCells = columns
    .map((col) => `<th class="dashboard-table-th">${col}</th>`)
    .join("\n              ");

  // Generate sample data rows
  const sampleData = [
    ["#1001", "张三", "$320.00", "已完成", "2024-01-15"],
    ["#1002", "李四", "$150.00", "处理中", "2024-01-14"],
    ["#1003", "王五", "$480.00", "已完成", "2024-01-13"],
    ["#1004", "赵六", "$220.00", "待支付", "2024-01-12"],
    ["#1005", "孙七", "$560.00", "已完成", "2024-01-11"],
    ["#1006", "周八", "$190.00", "处理中", "2024-01-10"],
    ["#1007", "吴九", "$340.00", "已完成", "2024-01-09"],
  ];

  const rows = sampleData
    .slice(0, rowCount)
    .map((row) => {
      const cells = columns
        .map((_, colIdx) => {
          const cellValue = row[colIdx] || "-";
          // Apply status styling for the status column
          if (colIdx === 3) {
            const statusClass =
              cellValue === "已完成"
                ? "dashboard-status--completed"
                : cellValue === "处理中"
                  ? "dashboard-status--processing"
                  : "dashboard-status--pending";
            return `<td class="dashboard-table-td"><span class="dashboard-status ${statusClass}">${cellValue}</span></td>`;
          }
          return `<td class="dashboard-table-td">${cellValue}</td>`;
        })
        .join("\n              ");
      return `            <tr class="dashboard-table-row">
              ${cells}
            </tr>`;
    })
    .join("\n");

  return `
      <section class="dashboard-table-section">
        <h3 class="dashboard-table-title">${tableTitle}</h3>
        <div class="dashboard-table-wrapper">
          <table class="dashboard-table">
            <thead>
            <tr>
              ${headerCells}
            </tr>
            </thead>
            <tbody>
${rows}
            </tbody>
          </table>
        </div>
      </section>
`;
}

/**
 * Generate HTML for dashboard footer
 */
export function generateDashboardFooterHtml(content: Record<string, string>): string {
  const copyright = content.copyright || "2024 Dashboard. All rights reserved.";
  const version = content.version || "v1.0.0";

  return `
      <footer class="dashboard-footer">
        <span class="dashboard-footer-copyright">${copyright}</span>
        <span class="dashboard-footer-version">${version}</span>
      </footer>
`;
}

/**
 * Generate section-specific CSS for dashboard
 */
export function generateDashboardCss(): string {
  return `
/* Dashboard Layout */
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--color-background);
}

/* Dashboard Sidebar */
.dashboard-sidebar {
  width: 16rem;
  min-height: 100vh;
  background-color: #111827;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.dashboard-sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid #1f2937;
}

.dashboard-app-name {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.dashboard-nav {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.dashboard-nav-item {
  display: block;
  padding: 0.75rem 1.5rem;
  color: #9ca3af;
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: background-color 0.2s ease, color 0.2s ease;
}

.dashboard-nav-item:hover {
  background-color: #1f2937;
  color: #ffffff;
}

.dashboard-nav-item--active {
  background-color: var(--color-primary);
  color: #ffffff;
}

.dashboard-nav-item--active:hover {
  background-color: var(--color-primary);
}

/* Dashboard Main */
.dashboard-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.dashboard-content {
  flex: 1;
  padding: 2rem;
}

/* Dashboard Section Title */
.dashboard-section-title {
  font-size: var(--font-size-2xl);
  color: var(--color-foreground);
  margin-bottom: 1.5rem;
}

/* Dashboard KPI Grid */
.dashboard-kpi-section {
  margin-bottom: 2rem;
}

.dashboard-kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.dashboard-kpi-card {
  background-color: #ffffff;
  border: var(--border-width) solid var(--color-muted);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dashboard-kpi-label {
  font-size: var(--font-size-sm);
  color: var(--color-muted);
  font-weight: 500;
}

.dashboard-kpi-value {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-foreground);
}

.dashboard-kpi-change {
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.dashboard-kpi-change--positive {
  color: #16a34a;
}

.dashboard-kpi-change--negative {
  color: #dc2626;
}

/* Dashboard Chart Area */
.dashboard-chart-section {
  margin-bottom: 2rem;
}

.dashboard-chart-area {
  background-color: #ffffff;
  border: var(--border-width) solid var(--color-muted);
  border-radius: var(--border-radius);
  padding: 1.5rem;
}

.dashboard-chart-title {
  font-size: var(--font-size-lg);
  color: var(--color-foreground);
  margin-bottom: 1.5rem;
}

.dashboard-chart-container {
  height: 280px;
  position: relative;
}

.dashboard-chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 100%;
  padding: 0 0.5rem;
  gap: 0.75rem;
}

.dashboard-chart-bar {
  flex: 1;
  background: linear-gradient(180deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  position: relative;
  min-width: 24px;
  transition: opacity 0.2s ease;
}

.dashboard-chart-bar:hover {
  opacity: 0.85;
}

.dashboard-chart-bar-label {
  position: absolute;
  bottom: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: var(--font-size-xs);
  color: var(--color-muted);
  white-space: nowrap;
}

/* Dashboard Table */
.dashboard-table-section {
  margin-bottom: 2rem;
}

.dashboard-table-title {
  font-size: var(--font-size-lg);
  color: var(--color-foreground);
  margin-bottom: 1rem;
}

.dashboard-table-wrapper {
  background-color: #ffffff;
  border: var(--border-width) solid var(--color-muted);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.dashboard-table {
  width: 100%;
  border-collapse: collapse;
}

.dashboard-table-th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-muted);
  background-color: var(--color-secondary);
  border-bottom: var(--border-width) solid var(--color-muted);
}

.dashboard-table-td {
  padding: 0.75rem 1rem;
  font-size: var(--font-size-sm);
  color: var(--color-foreground);
  border-bottom: 1px solid var(--color-secondary);
}

.dashboard-table-row:last-child .dashboard-table-td {
  border-bottom: none;
}

.dashboard-table-row:hover {
  background-color: var(--color-secondary);
}

/* Status Badges */
.dashboard-status {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: var(--border-radius);
  font-size: var(--font-size-xs);
  font-weight: 500;
}

.dashboard-status--completed {
  background-color: #dcfce7;
  color: #16a34a;
}

.dashboard-status--processing {
  background-color: #dbeafe;
  color: #2563eb;
}

.dashboard-status--pending {
  background-color: #fef9c3;
  color: #ca8a04;
}

/* Dashboard Footer */
.dashboard-footer {
  padding: 1rem 2rem;
  border-top: var(--border-width) solid var(--color-muted);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-footer-copyright {
  font-size: var(--font-size-sm);
  color: var(--color-muted);
}

.dashboard-footer-version {
  font-size: var(--font-size-sm);
  color: var(--color-muted);
}

/* Responsive: 1024px - KPI goes 2-col */
@media (max-width: 1024px) {
  .dashboard-kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Responsive: 768px - Sidebar hides, KPI goes 1-col */
@media (max-width: 768px) {
  .dashboard-sidebar {
    display: none;
  }

  .dashboard-kpi-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-content {
    padding: 1rem;
  }

  .dashboard-footer {
    padding: 1rem;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
`;
}
