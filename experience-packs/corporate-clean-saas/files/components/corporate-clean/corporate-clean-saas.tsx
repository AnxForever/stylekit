"use client";

import { useState } from "react";
import {
  accounts,
  dashboardSummary,
  funnel,
  metrics,
  revenueSeries,
  workspaceModes,
  type WorkspaceMode,
} from "../../lib/corporate-clean/data";
import styles from "./corporate-clean.module.css";

const navigation = ["经营概览", "客户账户", "收入分析", "产品采用", "风险队列"];
const themes = [
  { value: "light", label: "浅色" },
  { value: "dark", label: "深色" },
] as const;

type WorkspaceTheme = (typeof themes)[number]["value"];

export function CorporateCleanSaas() {
  const [mode, setMode] = useState<WorkspaceMode>("overview");
  const [theme, setTheme] = useState<WorkspaceTheme>("light");
  const [activeNav, setActiveNav] = useState(navigation[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={styles.appShell}
      data-theme={theme}
      data-pack-evidence="corporate-clean-saas"
    >
      <button
        type="button"
        className={styles.mobileBackdrop}
        data-open={sidebarOpen}
        aria-label="关闭导航"
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={styles.sidebar} data-open={sidebarOpen} aria-label="工作区导航">
        <div className={styles.brand}>
          <span className={styles.brandMark}>N</span>
          <div>
            <strong>Northstar</strong>
            <span>Revenue OS</span>
          </div>
        </div>

        <nav className={styles.navList}>
          <p>工作区</p>
          {navigation.map((item, index) => (
            <button
              key={item}
              type="button"
              aria-current={activeNav === item ? "page" : undefined}
              onClick={() => {
                setActiveNav(item);
                setSidebarOpen(false);
              }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarNote}>
          <span>数据同步</span>
          <strong>所有系统正常</strong>
          <p>最后同步于 2 分钟前</p>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <button
              type="button"
              className={styles.menuButton}
              aria-label="打开导航"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(true)}
            >
              <span />
              <span />
            </button>
            <div>
              <span>2026 年 7 月 11 日</span>
              <h1>{activeNav}</h1>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button type="button" className={styles.secondaryButton}>导出报告</button>
            <button type="button" className={styles.primaryButton}>创建分析</button>
          </div>
        </header>

        <section className={styles.stateToolbar} aria-label="界面状态预览">
          <div>
            <strong>交付状态覆盖</strong>
            <span>切换查看真实产品必须包含的关键状态</span>
          </div>
          <div className={styles.previewControls}>
            <div className={styles.themeControl} role="group" aria-label="选择界面主题">
              {themes.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  aria-pressed={theme === item.value}
                  onClick={() => setTheme(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className={styles.modeControl} role="group" aria-label="选择界面状态">
              {workspaceModes.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  aria-pressed={mode === item.value}
                  onClick={() => setMode(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.content}>
          <WorkspaceContent mode={mode} onRecover={() => setMode("overview")} />
        </div>
      </main>
    </div>
  );
}

function WorkspaceContent({
  mode,
  onRecover,
}: {
  mode: WorkspaceMode;
  onRecover: () => void;
}) {
  if (mode === "loading") return <LoadingState />;
  if (mode === "empty") return <EmptyState />;
  if (mode === "error") return <ErrorState onRecover={onRecover} />;

  return (
    <div className={styles.dashboard} data-success={mode === "success"}>
      {mode === "success" ? (
        <div className={styles.successBanner} role="status">
          <span>✓</span>
          <div>
            <strong>报告已生成</strong>
            <p>新的收入质量报告已保存，并通知了 3 位负责人。</p>
          </div>
          <button type="button">查看报告</button>
        </div>
      ) : null}

      <section className={styles.metricGrid} aria-label="关键经营指标">
        {metrics.map((metric) => (
          <article key={metric.label} className={styles.metricCard}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <p><em>{metric.change}</em>{metric.detail}</p>
          </article>
        ))}
      </section>

      <div className={styles.primaryGrid}>
        <section className={styles.panel} aria-labelledby="revenue-chart-title">
          <div className={styles.panelHeading}>
            <div>
              <span>收入质量</span>
              <h2 id="revenue-chart-title">经常收入趋势</h2>
            </div>
            <strong>{formatCompactCurrency(dashboardSummary.monthlyRevenue)}</strong>
          </div>
          <RevenueChart />
          <div className={styles.chartLegend}>
            <span><i /> 本周期</span>
            <span>目标 ¥260k</span>
          </div>
        </section>

        <section className={styles.panel} aria-labelledby="funnel-title">
          <div className={styles.panelHeading}>
            <div>
              <span>转化路径</span>
              <h2 id="funnel-title">从价格页到付费</h2>
            </div>
            <strong>{dashboardSummary.conversionRate.toFixed(1)}%</strong>
          </div>
          <div className={styles.funnelList}>
            {funnel.map((item) => (
              <div key={item.label}>
                <div>
                  <span>{item.label}</span>
                  <strong>{item.value.toLocaleString()}</strong>
                </div>
                <div className={styles.progressTrack}>
                  <span style={{ width: `${item.ratio}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className={styles.tablePanel} aria-labelledby="accounts-title">
        <div className={styles.panelHeading}>
          <div>
            <span>客户健康度</span>
            <h2 id="accounts-title">需要跟进的账户</h2>
          </div>
          <button type="button" className={styles.textButton}>查看全部 →</button>
        </div>
        <div className={styles.tableScroll}>
          <table>
            <thead>
              <tr>
                <th>公司</th>
                <th>方案</th>
                <th>健康度</th>
                <th>负责人</th>
                <th>月收入</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.company}>
                  <td><span className={styles.companyMark}>{account.company.slice(0, 1)}</span>{account.company}</td>
                  <td>{account.plan}</td>
                  <td><span className={styles.health} data-health={account.health}>{account.health}</span></td>
                  <td>{account.owner}</td>
                  <td>{account.mrr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function RevenueChart() {
  const width = 720;
  const height = 230;
  const min = Math.min(...revenueSeries) - 6;
  const max = Math.max(...revenueSeries) + 6;
  const points = revenueSeries.map((value, index) => {
    const x = (index / (revenueSeries.length - 1)) * width;
    const y = height - ((value - min) / (max - min)) * height;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const area = `M0,${height} L${points.join(" L")} L${width},${height} Z`;

  return (
    <svg className={styles.chart} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="过去十二周经常收入总体上升">
      <defs>
        <linearGradient id="corporate-clean-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.18" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((line) => (
        <line key={line} x1="0" x2={width} y1={(line / 3) * height} y2={(line / 3) * height} className={styles.gridLine} />
      ))}
      <path d={area} fill="url(#corporate-clean-area)" />
      <polyline
        points={points.join(" ")}
        pathLength="1"
        className={styles.chartLine}
        data-testid="revenue-chart-line"
      />
      {points.map((point, index) => {
        const [cx, cy] = point.split(",");
        return <circle key={point} cx={cx} cy={cy} r={index === points.length - 1 ? 5 : 2.5} className={styles.chartPoint} />;
      })}
    </svg>
  );
}

function formatCompactCurrency(value: number) {
  return `¥${(value / 1000).toFixed(1)}k`;
}

function LoadingState() {
  return (
    <div className={styles.loadingState} role="status" aria-label="正在加载经营数据">
      <div className={styles.loadingMetrics}>
        {Array.from({ length: 4 }, (_, index) => <span key={index} />)}
      </div>
      <div className={styles.loadingBody}><span /><span /></div>
      <p>正在同步经营数据…</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className={styles.centerState}>
      <span className={styles.stateIcon}>＋</span>
      <h2>还没有可分析的数据</h2>
      <p>连接账单或 CRM 数据后，这里会显示收入、转化和客户健康度。</p>
      <button type="button" className={styles.primaryButton}>连接数据源</button>
    </div>
  );
}

function ErrorState({ onRecover }: { onRecover: () => void }) {
  return (
    <div className={styles.centerState} role="alert">
      <span className={styles.stateIcon} data-error>!</span>
      <h2>暂时无法读取数据</h2>
      <p>同步服务没有响应。你的筛选条件已经保留，可以安全重试。</p>
      <button type="button" className={styles.primaryButton} onClick={onRecover}>重新加载</button>
    </div>
  );
}
