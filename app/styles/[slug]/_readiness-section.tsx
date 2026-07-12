import type {
  FrontendReadinessProfile,
  ReadinessSupport,
} from "@/lib/styles";
import type { Locale } from "@/lib/i18n/translations";

interface StyleReadinessSectionProps {
  readiness: FrontendReadinessProfile;
  locale: Locale;
}

function formatReadinessLabel(value: string, locale: Locale): string {
  if (locale === "zh") {
    const zhLabels: Record<string, string> = {
      active: "按下",
      button: "按钮",
      card: "卡片",
      complete: "完整",
      default: "默认",
      disabled: "禁用",
      empty: "空状态",
      "empty-state": "空状态",
      error: "错误",
      fallback: "通用",
      "focus-visible": "键盘焦点",
      form: "表单",
      hover: "悬停",
      input: "输入框",
      loading: "加载中",
      missing: "缺失",
      modal: "弹窗",
      partial: "部分",
      skeleton: "骨架屏",
      success: "成功",
      table: "表格",
      toast: "提示",
    };
    return zhLabels[value] ?? value;
  }

  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function supportClassName(support: ReadinessSupport): string {
  switch (support) {
    case "complete":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
    case "partial":
      return "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300";
    case "fallback":
      return "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300";
    case "missing":
      return "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300";
  }
}

function coverageClassName(value: number): string {
  if (value >= 85) return "text-emerald-700 dark:text-emerald-300";
  if (value >= 60) return "text-amber-700 dark:text-amber-300";
  return "text-rose-700 dark:text-rose-300";
}

export function StyleReadinessSection({
  readiness,
  locale,
}: StyleReadinessSectionProps) {
  const readinessMetrics = [
    {
      label: locale === "zh" ? "暗色模式" : "Dark Mode",
      value: readiness.coverage.darkMode,
      support: readiness.darkMode.support,
    },
    {
      label: locale === "zh" ? "组件状态" : "UI States",
      value: readiness.coverage.states,
      support: readiness.states.loading.support,
    },
    {
      label: locale === "zh" ? "动效规则" : "Motion",
      value: readiness.coverage.motion,
      support: readiness.motion.support,
    },
    {
      label: locale === "zh" ? "可访问性" : "A11y",
      value: readiness.coverage.accessibility,
      support: readiness.accessibility.support,
    },
    {
      label: locale === "zh" ? "性能代价" : "Performance",
      value: readiness.coverage.performance,
      support: readiness.performance.support,
    },
  ];
  const highlightedStates = [
    "hover",
    "focus-visible",
    "disabled",
    "loading",
    "empty",
    "error",
    "success",
  ] as const;
  const readinessGuidance = [
    ...(locale === "zh"
      ? [
          "暗色模式需要使用语义 tokens，不要直接把浅色主题反相。",
          "组件至少要覆盖悬停、键盘焦点、禁用、加载、空状态、错误和成功反馈。",
          "可访问性需要检查对比度、键盘导航、44px 点击区域和 reduced-motion。",
          "性能上避免动画改变布局；重 blur/shadow 的风格要控制层数和滚动区域。",
        ]
      : [
          readiness.darkMode.guidance[0],
          readiness.accessibility.guidance[0],
          readiness.performance.guidance[0],
        ]),
  ].filter((item): item is string => Boolean(item));

  return (
    <section id="frontend-readiness" className="border-b border-border scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {locale === "zh" ? "真实前端完成度" : "Frontend Readiness"}
            </p>
            <h2 className="text-2xl md:text-3xl mb-4">
              {locale === "zh" ? "暗色、状态、动效与可访问性覆盖" : "Dark Mode, States, Motion, and Accessibility"}
            </h2>
            <p className="text-muted max-w-2xl">
              {locale === "zh"
                ? "这层检查这个风格是否已经具备真实网站常见的主题、状态反馈、键盘可访问性和性能约束。"
                : "This layer tracks whether the style is ready for real websites: theme modes, state feedback, keyboard access, and performance constraints."}
            </p>
          </div>
          <div className="shrink-0 border border-border px-4 py-3">
            <p className="text-[10px] tracking-[0.16em] uppercase text-muted mb-1">
              {locale === "zh" ? "总体覆盖" : "Overall"}
            </p>
            <p className={`text-3xl ${coverageClassName(readiness.coverage.overall)}`}>
              {readiness.coverage.overall}%
            </p>
            <p className="mt-1 text-xs text-muted">
              {readiness.source === "curated"
                ? locale === "zh" ? "手工校准" : "Curated"
                : locale === "zh" ? "Fallback 规则" : "Fallback"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {readinessMetrics.map((metric) => (
            <article key={metric.label} className="border border-border p-4 bg-background">
              <p className="text-[10px] tracking-[0.16em] uppercase text-muted mb-2">
                {metric.label}
              </p>
              <div className="flex items-end justify-between gap-2">
                <p className={`text-2xl ${coverageClassName(metric.value)}`}>{metric.value}%</p>
                <span className={`text-[10px] px-2 py-1 border ${supportClassName(metric.support)}`}>
                  {formatReadinessLabel(metric.support, locale)}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="border border-border p-5">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="text-lg">
                {locale === "zh" ? "关键状态覆盖" : "Key State Coverage"}
              </h3>
              <span className="text-xs text-muted">
                {readiness.themeModes.join(" / ")}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {highlightedStates.map((state) => (
                <span
                  key={state}
                  className={`text-xs px-3 py-1.5 border ${supportClassName(readiness.states[state].support)}`}
                >
                  {formatReadinessLabel(state, locale)}
                </span>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(readiness.components).slice(0, 4).map(([component, item]) => (
                <div key={component} className="border border-border px-4 py-3">
                  <p className="text-sm mb-2">{formatReadinessLabel(component, locale)}</p>
                  <p className="text-xs text-muted leading-relaxed">
                    {item?.states
                      .slice(0, 5)
                      .map((state) => formatReadinessLabel(state, locale))
                      .join(" / ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border p-5">
            <h3 className="text-lg mb-4">
              {locale === "zh" ? "落地注意事项" : "Implementation Notes"}
            </h3>
            <ul className="space-y-3 text-sm text-muted leading-relaxed">
              {readinessGuidance.map((item) => (
                <li key={item} className="border-l border-border pl-3">
                  {item}
                </li>
              ))}
              {locale === "en" &&
                readiness.performance.costs.slice(0, 2).map((cost) => (
                  <li key={cost} className="border-l border-border pl-3">
                    {cost}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
