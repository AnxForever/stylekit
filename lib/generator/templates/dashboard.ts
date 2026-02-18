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
          label: "Chart Type",
          labelEn: "Chart Type",
          type: "text",
          defaultValue: "bar",
          placeholder: "e.g. bar, line, pie",
        },
        {
          id: "chartSummary",
          label: "Chart Summary",
          labelEn: "Chart Summary",
          type: "textarea",
          defaultValue: "Track trend momentum and segment mix with a single visual.",
          placeholder: "Short explanation shown above chart area",
        },
        {
          id: "chartLabels",
          label: "Chart Labels (comma separated)",
          labelEn: "Chart Labels (comma separated)",
          type: "text",
          defaultValue: "Jan, Feb, Mar, Apr, May, Jun",
          placeholder: "e.g. Jan, Feb, Mar",
        },
        {
          id: "primarySeriesLabel",
          label: "Primary Series Label",
          labelEn: "Primary Series Label",
          type: "text",
          defaultValue: "Current",
          placeholder: "Label for primary metric",
        },
        {
          id: "primarySeriesValues",
          label: "Primary Series Values (comma separated)",
          labelEn: "Primary Series Values (comma separated)",
          type: "text",
          defaultValue: "42, 54, 61, 58, 72, 81",
          placeholder: "e.g. 42, 54, 61",
        },
        {
          id: "secondarySeriesLabel",
          label: "Secondary Series Label",
          labelEn: "Secondary Series Label",
          type: "text",
          defaultValue: "Target",
          placeholder: "Label for secondary metric",
        },
        {
          id: "secondarySeriesValues",
          label: "Secondary Series Values (comma separated)",
          labelEn: "Secondary Series Values (comma separated)",
          type: "text",
          defaultValue: "38, 46, 52, 56, 62, 68",
          placeholder: "e.g. 38, 46, 52",
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

function splitCommaList(value: string, fallback: string[]): string[] {
  const source = value.trim() ? value : fallback.join(", ");
  return source
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function parseSeriesValues(value: string, fallback: number[]): number[] {
  const source = value.trim() ? value : fallback.join(", ");
  const parsed = source
    .split(",")
    .map((item) => Number.parseFloat(item.trim()))
    .filter((item) => Number.isFinite(item));

  return parsed.length > 0 ? parsed : fallback;
}

function normalizeSeriesLength(values: number[], targetLength: number): number[] {
  if (targetLength <= 0) return [];
  if (values.length === targetLength) {
    return values.map((value) => Math.max(0, value));
  }

  const normalized = Array.from({ length: targetLength }, (_unused, index) => {
    if (values.length === 0) return 0;
    return values[index % values.length] ?? values[values.length - 1] ?? 0;
  });

  return normalized.map((value) => Math.max(0, value));
}

function clampRowCount(value: string): number {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return 5;
  return Math.min(20, Math.max(1, parsed));
}

function buildDashboardCellValue(column: string, rowIndex: number): string {
  const normalized = column.toLowerCase();
  const names = ["Avery Johnson", "Morgan Chen", "Riley Carter", "Jordan Kim", "Casey Patel"];
  const owners = ["Ops Team", "Growth Team", "Finance Team", "Platform Team", "CS Team"];
  const statuses = ["Completed", "Pending", "At Risk", "In Progress", "Blocked"];
  const priorities = ["Low", "Medium", "High", "Critical"];
  const dates = ["Mar 03, 2026", "Mar 02, 2026", "Mar 01, 2026", "Feb 28, 2026", "Feb 27, 2026"];
  const regions = ["US-East", "US-West", "EU-Central", "APAC-SG", "Global"];

  if (normalized.includes("id") || normalized.includes("order")) {
    return `#${(1200 + rowIndex).toString()}`;
  }
  if (normalized.includes("customer") || normalized.includes("account") || normalized.includes("name")) {
    return names[rowIndex % names.length];
  }
  if (normalized.includes("owner") || normalized.includes("team") || normalized.includes("csm")) {
    return owners[rowIndex % owners.length];
  }
  if (normalized.includes("status") || normalized.includes("health")) {
    return statuses[rowIndex % statuses.length];
  }
  if (normalized.includes("priority")) {
    return priorities[rowIndex % priorities.length];
  }
  if (normalized.includes("arr") || normalized.includes("revenue") || normalized.includes("amount")) {
    const value = 11000 + rowIndex * 1850;
    return `$${value.toLocaleString()}`;
  }
  if (normalized.includes("score")) {
    return `${88 - rowIndex * 4}`;
  }
  if (normalized.includes("date") || normalized.includes("time") || normalized.includes("updated")) {
    return dates[rowIndex % dates.length];
  }
  if (normalized.includes("region")) {
    return regions[rowIndex % regions.length];
  }

  return `Value ${rowIndex + 1}`;
}

function getStatusClass(value: string): string {
  const normalized = value.toLowerCase();
  if (
    normalized.includes("risk") ||
    normalized.includes("blocked") ||
    normalized.includes("critical")
  ) {
    return "dashboard-status--critical";
  }
  if (
    normalized.includes("pending") ||
    normalized.includes("progress") ||
    normalized.includes("review")
  ) {
    return "dashboard-status--pending";
  }
  return "dashboard-status--completed";
}

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
  const chartTitle = content.chartTitle || "Revenue trend";
  const rawChartType = (content.chartType || "bar").trim().toLowerCase();
  const chartType = rawChartType === "line" || rawChartType === "pie" ? rawChartType : "bar";
  const chartSummary = content.chartSummary || "Track momentum and compare execution against plan.";

  const labels = splitCommaList(content.chartLabels || "", ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]);
  const primarySeriesLabel = content.primarySeriesLabel || "Current";
  const secondarySeriesLabel = content.secondarySeriesLabel || "Target";

  const primarySeries = normalizeSeriesLength(
    parseSeriesValues(content.primarySeriesValues || "", [42, 54, 61, 58, 72, 81]),
    labels.length
  );
  const secondarySeries = normalizeSeriesLength(
    parseSeriesValues(content.secondarySeriesValues || "", [38, 46, 52, 56, 62, 68]),
    labels.length
  );

  const maxValue = Math.max(1, ...primarySeries, ...secondarySeries);
  const chartTypeLabel = chartType === "line"
    ? "Trend analysis"
    : chartType === "pie"
      ? "Segment distribution"
      : "Monthly comparison";

  const barGroups = labels
    .map((label, index) => {
      const primaryHeight = Math.max(8, Math.round((primarySeries[index] / maxValue) * 100));
      const secondaryHeight = Math.max(8, Math.round((secondarySeries[index] / maxValue) * 100));

      return `            <div class="dashboard-chart-group">
              <div class="dashboard-chart-group-bars">
                <span class="dashboard-chart-bar dashboard-chart-bar--secondary" style="height: ${secondaryHeight}%;" aria-label="${secondarySeriesLabel} ${secondarySeries[index]}"></span>
                <span class="dashboard-chart-bar dashboard-chart-bar--primary" style="height: ${primaryHeight}%;" aria-label="${primarySeriesLabel} ${primarySeries[index]}"></span>
              </div>
              <span class="dashboard-chart-xlabel">${label}</span>
            </div>`;
    })
    .join("\n");

  const horizontalStep = labels.length > 1 ? 304 / (labels.length - 1) : 0;
  const primaryLinePoints = primarySeries
    .map((value, index) => {
      const x = 8 + index * horizontalStep;
      const y = 128 - (value / maxValue) * 92;
      return `${Math.round(x)},${Math.round(y)}`;
    })
    .join(" ");
  const secondaryLinePoints = secondarySeries
    .map((value, index) => {
      const x = 8 + index * horizontalStep;
      const y = 128 - (value / maxValue) * 92;
      return `${Math.round(x)},${Math.round(y)}`;
    })
    .join(" ");

  const lineMarkers = primarySeries
    .map((value, index) => {
      if (!(index === 0 || index === primarySeries.length - 1 || index % 2 === 1)) {
        return "";
      }
      const x = 8 + index * horizontalStep;
      const y = 128 - (value / maxValue) * 92;
      return `              <circle cx="${Math.round(x)}" cy="${Math.round(y)}" r="3.5" fill="currentColor" />`;
    })
    .filter(Boolean)
    .join("\n");

  const lineAxisLabels = labels
    .map((label) => `            <span>${label}</span>`)
    .join("\n");

  const piePalette = ["var(--color-primary)", "var(--color-accent-1)", "var(--color-accent-2)", "var(--color-accent-3)"];
  const pieEntries = labels
    .map((label, index) => ({
      label,
      value: primarySeries[index] ?? 0,
    }))
    .filter((entry) => entry.value > 0)
    .slice(0, 4);
  if (pieEntries.length === 0) {
    pieEntries.push({ label: "Segment", value: 1 });
  }

  const pieTotal = pieEntries.reduce((sum, entry) => sum + entry.value, 0);
  let pieCursor = 0;
  const pieSegments = pieEntries.map((entry, index) => {
    const percent = (entry.value / pieTotal) * 100;
    const start = pieCursor;
    const end = pieCursor + percent;
    pieCursor = end;
    return {
      ...entry,
      percent,
      start,
      end,
      color: piePalette[index % piePalette.length],
    };
  });

  const pieGradient = pieSegments
    .map((segment) => `${segment.color} ${segment.start.toFixed(2)}% ${segment.end.toFixed(2)}%`)
    .join(", ");

  const pieLegend = pieSegments
    .map(
      (segment) => `            <div class="dashboard-pie-legend-item">
              <span class="dashboard-pie-legend-label">
                <span class="dashboard-pie-legend-dot" style="background-color: ${segment.color};"></span>
                ${segment.label}
              </span>
              <span class="dashboard-pie-legend-value">${Math.round(segment.percent)}%</span>
            </div>`
    )
    .join("\n");

  const latestValue = primarySeries[primarySeries.length - 1] ?? 0;
  const previousValue = primarySeries[primarySeries.length - 2] ?? latestValue;
  const deltaPercent = previousValue === 0 ? 0 : ((latestValue - previousValue) / previousValue) * 100;
  const deltaLabel = `${deltaPercent >= 0 ? "+" : ""}${deltaPercent.toFixed(1)}%`;
  const averageValue = primarySeries.reduce((sum, value) => sum + value, 0) / Math.max(1, primarySeries.length);
  const peakIndex = primarySeries.indexOf(Math.max(...primarySeries));
  const peakLabel = labels[peakIndex] || labels[labels.length - 1] || "n/a";

  const chartBody = chartType === "line"
    ? `          <div class="dashboard-line-chart">
            <svg viewBox="0 0 320 160" class="dashboard-line-chart-svg" aria-label="${chartTitle}">
              <line x1="8" y1="128" x2="312" y2="128" stroke="rgba(120,120,120,0.35)" stroke-width="1" />
              <line x1="8" y1="88" x2="312" y2="88" stroke="rgba(120,120,120,0.22)" stroke-width="1" />
              <line x1="8" y1="48" x2="312" y2="48" stroke="rgba(120,120,120,0.14)" stroke-width="1" />
              <polyline fill="none" stroke="rgba(120,120,120,0.6)" stroke-width="2" points="${secondaryLinePoints}" />
              <polyline fill="none" stroke="currentColor" stroke-width="3" points="${primaryLinePoints}" />
${lineMarkers}
            </svg>
            <div class="dashboard-line-axis">
${lineAxisLabels}
            </div>
          </div>`
    : chartType === "pie"
      ? `          <div class="dashboard-pie-layout">
            <div class="dashboard-pie-chart" style="background: conic-gradient(${pieGradient});">
              <span class="dashboard-pie-chart-core"></span>
            </div>
            <div class="dashboard-pie-legend">
${pieLegend}
            </div>
          </div>`
      : `          <div class="dashboard-chart-grid">
${barGroups}
          </div>`;

  return `
      <section class="dashboard-chart-section">
        <div class="dashboard-chart-header">
          <div>
            <h3 class="dashboard-chart-title">${chartTitle}</h3>
            <p class="dashboard-chart-summary">${chartSummary}</p>
          </div>
          <span class="dashboard-chart-type">${chartTypeLabel}</span>
        </div>
        <div class="dashboard-chart-card" data-chart-type="${chartType}">
${chartBody}
        </div>
        <div class="dashboard-chart-legend">
          <span class="dashboard-chart-legend-item"><span class="dashboard-legend-swatch dashboard-legend-swatch--primary"></span>${primarySeriesLabel}</span>
          <span class="dashboard-chart-legend-item"><span class="dashboard-legend-swatch dashboard-legend-swatch--secondary"></span>${secondarySeriesLabel}</span>
        </div>
        <div class="dashboard-chart-insights">
          <div class="dashboard-chart-insight">
            <span class="dashboard-chart-insight-label">Latest</span>
            <span class="dashboard-chart-insight-value">${latestValue.toFixed(1)}</span>
          </div>
          <div class="dashboard-chart-insight">
            <span class="dashboard-chart-insight-label">Period change</span>
            <span class="dashboard-chart-insight-value">${deltaLabel}</span>
          </div>
          <div class="dashboard-chart-insight">
            <span class="dashboard-chart-insight-label">Peak period</span>
            <span class="dashboard-chart-insight-value">${peakLabel} / ${averageValue.toFixed(1)} avg</span>
          </div>
        </div>
      </section>
`;
}

/**
 * Generate HTML for dashboard data table section
 */
export function generateDashboardTableHtml(content: Record<string, string>): string {
  const tableTitle = content.tableTitle || "Pipeline records";
  const columns = splitCommaList(content.columns || "", ["ID", "Customer", "Amount", "Status", "Date"]);
  const rowCount = clampRowCount(content.rowCount || "5");
  const tableMeta = `${rowCount} ${rowCount === 1 ? "row" : "rows"} shown - sorted by latest update`;

  const headerCells = columns
    .map((col) => `<th class="dashboard-table-th">${col}</th>`)
    .join("\n              ");

  const sampleData = Array.from({ length: rowCount }, (_unused, rowIndex) =>
    columns.map((column) => buildDashboardCellValue(column, rowIndex))
  );

  const rows = sampleData
    .map((row, rowIndex) => {
      const cells = row
        .map((cell, colIdx) => {
          const column = columns[colIdx]?.toLowerCase() || "";

          if (column.includes("status") || column.includes("health")) {
            return `<td class="dashboard-table-td"><span class="dashboard-status ${getStatusClass(cell)}">${cell}</span></td>`;
          }

          if (colIdx === 0) {
            return `<td class="dashboard-table-td dashboard-table-td--strong">${cell}</td>`;
          }

          return `<td class="dashboard-table-td">${cell}</td>`;
        })
        .join("\n              ");

      const rowToneClass = rowIndex % 2 === 1 ? " dashboard-table-row--alt" : "";
      return `            <tr class="dashboard-table-row${rowToneClass}">
              ${cells}
            </tr>`;
    })
    .join("\n");

  return `
      <section class="dashboard-table-section">
        <div class="dashboard-table-header">
          <div>
            <h3 class="dashboard-table-title">${tableTitle}</h3>
            <p class="dashboard-table-meta">${tableMeta}</p>
          </div>
          <button class="dashboard-table-action" type="button">Export CSV</button>
        </div>
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

.dashboard-chart-title {
  font-size: var(--font-size-lg);
  color: var(--color-foreground);
  margin: 0;
}

.dashboard-chart-summary {
  margin-top: 0.5rem;
  font-size: var(--font-size-sm);
  color: var(--color-muted);
  max-width: 52ch;
}

.dashboard-chart-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.dashboard-chart-type {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--color-muted);
  border-radius: var(--border-radius);
  padding: 0.25rem 0.55rem;
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-muted);
}

.dashboard-chart-card {
  background-color: #ffffff;
  border: var(--border-width) solid var(--color-muted);
  border-radius: var(--border-radius);
  padding: 1rem 1.25rem;
  min-height: 280px;
}

.dashboard-chart-grid {
  display: flex;
  align-items: flex-end;
  gap: 0.6rem;
  min-height: 230px;
}

.dashboard-chart-group {
  flex: 1;
  min-width: 44px;
  text-align: center;
}

.dashboard-chart-group-bars {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0.25rem;
  height: 210px;
}

.dashboard-chart-bar {
  width: 12px;
  background: linear-gradient(180deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  transition: opacity 0.2s ease;
}

.dashboard-chart-bar--secondary {
  opacity: 0.45;
}

.dashboard-chart-xlabel {
  display: block;
  margin-top: 0.55rem;
  font-size: var(--font-size-xs);
  color: var(--color-muted);
  white-space: nowrap;
}

.dashboard-line-chart-svg {
  width: 100%;
  height: 210px;
  color: var(--color-primary);
}

.dashboard-line-axis {
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: var(--font-size-xs);
  color: var(--color-muted);
}

.dashboard-pie-layout {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.dashboard-pie-chart {
  width: 146px;
  height: 146px;
  border-radius: 50%;
  position: relative;
  flex-shrink: 0;
}

.dashboard-pie-chart-core {
  position: absolute;
  inset: 22%;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid var(--color-muted);
}

.dashboard-pie-legend {
  flex: 1;
  display: grid;
  gap: 0.5rem;
}

.dashboard-pie-legend-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  font-size: var(--font-size-sm);
  color: var(--color-foreground);
}

.dashboard-pie-legend-label {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.dashboard-pie-legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
}

.dashboard-pie-legend-value {
  font-weight: 600;
}

.dashboard-chart-legend {
  margin-top: 0.85rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.dashboard-chart-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: var(--font-size-xs);
  color: var(--color-muted);
}

.dashboard-legend-swatch {
  width: 10px;
  height: 10px;
  border-radius: 999px;
}

.dashboard-legend-swatch--primary {
  background-color: var(--color-primary);
}

.dashboard-legend-swatch--secondary {
  background-color: var(--color-primary);
  opacity: 0.45;
}

.dashboard-chart-insights {
  margin-top: 0.9rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.65rem;
}

.dashboard-chart-insight {
  border: 1px solid var(--color-muted);
  border-radius: var(--border-radius);
  padding: 0.55rem 0.65rem;
}

.dashboard-chart-insight-label {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.dashboard-chart-insight-value {
  display: block;
  margin-top: 0.3rem;
  font-size: var(--font-size-sm);
  color: var(--color-foreground);
  font-weight: 600;
}

/* Dashboard Table */
.dashboard-table-section {
  margin-bottom: 2rem;
}

.dashboard-table-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.9rem;
}

.dashboard-table-title {
  font-size: var(--font-size-lg);
  color: var(--color-foreground);
  margin: 0;
}

.dashboard-table-meta {
  margin-top: 0.4rem;
  font-size: var(--font-size-xs);
  color: var(--color-muted);
}

.dashboard-table-action {
  border: 1px solid var(--color-muted);
  border-radius: var(--border-radius);
  background-color: transparent;
  padding: 0.35rem 0.65rem;
  font-size: var(--font-size-xs);
  color: var(--color-foreground);
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.dashboard-table-action:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
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

.dashboard-table-td--strong {
  font-weight: 600;
}

.dashboard-table-row--alt {
  background-color: rgba(148, 163, 184, 0.08);
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

.dashboard-status--pending {
  background-color: #fef3c7;
  color: #b45309;
}

.dashboard-status--critical {
  background-color: #fee2e2;
  color: #b91c1c;
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

  .dashboard-chart-insights {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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

  .dashboard-chart-header,
  .dashboard-table-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .dashboard-chart-card {
    padding: 0.9rem;
  }

  .dashboard-chart-grid {
    overflow-x: auto;
    padding-bottom: 0.25rem;
  }

  .dashboard-pie-layout {
    flex-direction: column;
    align-items: flex-start;
  }

  .dashboard-chart-insights {
    grid-template-columns: 1fr;
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
