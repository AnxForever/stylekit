"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ANALYTICS_EXCLUSION_STORAGE_KEY } from "@/lib/analytics/collection-policy";
import type {
  AnalyticsMeasurement,
  AnalyticsOverview,
} from "@/lib/admin/analytics-api-contract";
import { AdminButton, AdminPanel } from "@/components/admin/admin-ui";

const EXCLUSION_ENDPOINT = "/api/admin/analytics/exclusion";

const SOURCE_LABELS: Record<AnalyticsMeasurement["source"], string> = {
  umami_snapshot: "Umami 快照",
  umami_api: "Umami 实时 API",
  internal_events: "站内事件统计",
  legacy_snapshot: "历史统计快照",
};

const FRESHNESS_LABELS: Record<AnalyticsMeasurement["freshness"], string> = {
  current: "当前数据",
  cached: "缓存数据",
  stale: "过期缓存",
};

const VISITOR_METRIC_LABELS: Record<AnalyticsMeasurement["visitorMetric"], string> = {
  anonymous_identifiers: "匿名访客标识",
  tab_sessions: "标签页会话",
  unknown: "访客口径待核验",
};

const EXCLUSION_REASON_LABELS: Record<
  AnalyticsMeasurement["exclusions"][number]["reason"],
  string
> = {
  internal: "内部测试",
  automation: "自动化访问",
  non_production: "非生产环境",
};

type QualityStatus = AnalyticsOverview["quality"]["status"];

const QUALITY_STATUS_LABELS: Record<QualityStatus, string> = {
  complete: "结构完整",
  partial: "部分返回",
  truncated: "结果截断",
  stale: "缓存过期",
  unavailable: "不可用",
};

export function getVisitorMetricLabel(
  measurement?: AnalyticsMeasurement | null
): string {
  return measurement
    ? VISITOR_METRIC_LABELS[measurement.visitorMetric]
    : "访客口径待核验";
}

export function AnalyticsMeasurementNote({
  measurement,
  qualityStatus,
  showBreakdownSource,
}: {
  measurement?: AnalyticsMeasurement | null;
  qualityStatus?: QualityStatus;
  showBreakdownSource?: boolean;
}) {
  return (
    <AdminPanel className="p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,0.72fr)] lg:items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-medium text-foreground">数据来源与统计口径</h2>
            <StatusBadge>
              {measurement
                ? SOURCE_LABELS[measurement.source]
                : "来源待核验"}
            </StatusBadge>
            <StatusBadge>
              {measurement
                ? FRESHNESS_LABELS[measurement.freshness]
                : "新鲜度待核验"}
            </StatusBadge>
            {qualityStatus ? (
              <StatusBadge>数据质量：{QUALITY_STATUS_LABELS[qualityStatus]}</StatusBadge>
            ) : null}
            {measurement?.fallback ? <StatusBadge>回退来源</StatusBadge> : null}
          </div>

          <p className="mt-2 text-xs leading-5 text-muted">
            访客指标表示{getVisitorMetricLabel(measurement)}，不代表真人数量。数据源、缓存状态和过滤情况会随本次读取结果变化。
          </p>

          {measurement ? (
            <div className="mt-3 space-y-2 text-xs leading-5 text-muted">
              <p>
                访客统计口径：<span className="text-foreground">{getVisitorMetricLabel(measurement)}</span>
                {measurement.policyVersion
                  ? ` · 过滤规则 ${measurement.policyVersion}`
                  : " · 过滤规则版本待记录"}
              </p>
              <FilteringSummary measurement={measurement} />
              <HistorySummary measurement={measurement} />
              {showBreakdownSource ? (
                <p>
                  {measurement.source === "umami_snapshot"
                    ? "当前流量分项与总览使用同一 Umami 快照来源。"
                    : "流量分项可能来自独立来源；分项与总览不应直接相加或视为完全相同的口径。"}
                </p>
              ) : null}
            </div>
          ) : (
            <p className="mt-3 text-xs leading-5 text-[var(--admin-status-amber)]">
              当前接口未提供来源与口径元数据，因此不能据此判断访客识别方式、过滤是否生效或历史回填范围。
            </p>
          )}
          {showBreakdownSource && !measurement ? (
            <p className="mt-2 text-xs leading-5 text-[var(--admin-status-amber)]">
              流量分项与总览的来源关系待核验，分项与总览不应直接相加或视为完全相同的口径。
            </p>
          ) : null}
        </div>

        <AnalyticsExclusionControl />
      </div>
    </AdminPanel>
  );
}

function FilteringSummary({ measurement }: { measurement: AnalyticsMeasurement }) {
  if (measurement.filtering === "applied") {
    const exclusions = measurement.exclusions
      .filter((item) => item.pageViews > 0)
      .map(
        (item) =>
          `${EXCLUSION_REASON_LABELS[item.reason]} ${item.pageViews.toLocaleString("zh-CN")} 次`
      );
    const excludedPageViews = measurement.excludedPageViews;
    const rawPageViews = measurement.rawPageViews;

    return (
      <p>
        已应用访问过滤；报表按过滤后的统计值展示，原始记录仍保留。
        {rawPageViews == null
          ? "原始页面浏览总量待核验。"
          : `原始页面浏览 ${rawPageViews.toLocaleString("zh-CN")} 次。`}
        {excludedPageViews == null
          ? "已排除数量待核验。"
          : `已排除 ${excludedPageViews.toLocaleString("zh-CN")} 次页面浏览。`}
        {exclusions.length > 0 ? `分类：${exclusions.join("、")}。` : null}
      </p>
    );
  }

  if (measurement.filtering === "collection_only") {
    return (
      <p>
        过滤规则只用于新采集的访问；历史记录未按这套规则重算，历史总量仍可能包含此前的测试或自动化访问。
      </p>
    );
  }

  return (
    <p className="text-[var(--admin-status-amber)]">
      当前范围的访问过滤状态未核验，不能确认内部测试或自动化访问已从报表总量中排除。
    </p>
  );
}

function HistorySummary({ measurement }: { measurement: AnalyticsMeasurement }) {
  const { history } = measurement;

  if (history.status === "mixed_legacy") {
    return (
      <p>
        本时间范围可能含有历史回填记录，原始数据已保留；回填范围和来源口径尚未完整核实。
        {history.cutoff
          ? `新口径采集起点：${formatDate(history.cutoff)}；不能据此认定该时间前的记录全部来自回填。`
          : "新旧口径切换时间待核验。"}
        {history.reportedImportedEvents == null
          ? "回填记录数未确认。"
          : `登记的回填事件数：${history.reportedImportedEvents.toLocaleString("zh-CN")}。`}
      </p>
    );
  }

  if (history.status === "outside_window") {
    return (
      <p>
        当前时间范围不包含历史回填区间。
        {history.cutoff ? `新口径采集起点：${formatDate(history.cutoff)}。` : null}
      </p>
    );
  }

  return (
    <p className="text-[var(--admin-status-amber)]">
      历史数据来源待核验，暂时无法确认本时间范围是否包含回填记录。
    </p>
  );
}

export function AnalyticsExclusionControl() {
  const [excluded, setExcluded] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    void fetch(EXCLUSION_ENDPOINT, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await readError(response));
        }
        const payload: unknown = await response.json();
        if (!payload || typeof payload !== "object" || !("excluded" in payload) || typeof payload.excluded !== "boolean") {
          throw new Error("无法读取本浏览器的排除状态。");
        }
        setExcluded(payload.excluded);
      })
      .catch((caught: unknown) => {
        if (!controller.signal.aborted) {
          setError(caught instanceof Error ? caught.message : "无法读取排除状态。");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  async function updateExclusion(nextExcluded: boolean) {
    setPending(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(EXCLUSION_ENDPOINT, {
        method: nextExcluded ? "POST" : "DELETE",
      });
      if (!response.ok) {
        throw new Error(await readError(response));
      }

      let localPreferenceUpdated = true;
      try {
        if (nextExcluded) {
          window.localStorage.setItem(ANALYTICS_EXCLUSION_STORAGE_KEY, "1");
        } else {
          window.localStorage.removeItem(ANALYTICS_EXCLUSION_STORAGE_KEY);
        }
      } catch {
        localPreferenceUpdated = false;
      }
      setExcluded(nextExcluded);
      setMessage(localPreferenceUpdated
        ? nextExcluded
          ? "本浏览器后续访问将从统计中排除，正在重新加载以停止当前页面的统计脚本。"
          : "已取消本浏览器的排除设置，正在重新加载。"
        : "服务器已保存排除状态，但浏览器存储不可用；正在重新加载页面。"
      );
      window.location.reload();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "保存排除设置失败。");
      setPending(false);
    }
  }

  return (
    <section
      className="rounded-lg bg-[var(--admin-input)] p-4 shadow-[var(--admin-shadow-border)]"
      aria-labelledby="analytics-browser-exclusion-title"
    >
      <h3 id="analytics-browser-exclusion-title" className="text-xs font-medium text-foreground">
        本浏览器测试访问
      </h3>
      <p className="mt-1 text-xs leading-5 text-muted" aria-live="polite">
        {loading
          ? "正在读取本浏览器设置…"
          : excluded === true
            ? "本浏览器已排除；此设置仅影响后续访问，历史记录保留。"
            : excluded === false
              ? "本浏览器当前仍参与统计。设置只影响后续访问，历史记录保留。"
              : "无法读取当前状态；你仍可为本浏览器启用排除。"}
      </p>
      {error ? (
        <p className="mt-2 text-xs text-[var(--admin-status-red)]" role="alert">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="mt-2 text-xs text-muted" role="status">
          {message}
        </p>
      ) : null}
      <AdminButton
        type="button"
        className="mt-3 w-full sm:w-auto"
        size="sm"
        disabled={loading || pending}
        onClick={() => void updateExclusion(excluded !== true)}
      >
        {pending
          ? "正在保存…"
          : excluded === true
            ? "取消本浏览器排除"
            : "排除本浏览器的测试访问"}
      </AdminButton>
    </section>
  );
}

function StatusBadge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-[var(--admin-input)] px-2 py-1 text-[10px] text-muted shadow-[var(--admin-shadow-border)]">
      {children}
    </span>
  );
}

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("zh-CN", { timeZone: "Asia/Shanghai" });
}

async function readError(response: Response): Promise<string> {
  try {
    const payload: unknown = await response.json();
    if (payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string") {
      return payload.error;
    }
  } catch {
    // Keep a stable user-facing message for non-JSON server failures.
  }
  return "保存本浏览器排除设置失败，请重试。";
}
