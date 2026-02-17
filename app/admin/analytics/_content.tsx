"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Eye,
  Download,
  RefreshCw,
  ShieldCheck,
  Clock3,
} from "lucide-react";
import { useAdminAuditEvents, useAnalyticsDashboard } from "@/lib/swr";

type TimeRange = "7d" | "30d" | "all";

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");
  const { data, error, isLoading, mutate } = useAnalyticsDashboard(timeRange);
  const {
    data: auditData,
    error: auditError,
    isLoading: auditLoading,
    mutate: mutateAudit,
  } = useAdminAuditEvents(30);

  const maxDailyCount = useMemo(() => {
    if (!data || data.recentActivity.length === 0) return 0;
    return Math.max(...data.recentActivity.map((day) => day.count));
  }, [data]);

  if (isLoading) {
    return <p className="text-muted">Loading analytics...</p>;
  }

  if (error) {
    return (
      <div className="p-6 border border-red-300 bg-red-50 dark:bg-red-900/10 rounded-lg">
        <p className="text-red-600 dark:text-red-400">{error.message}</p>
        <button
          onClick={() => mutate()}
          className="mt-3 px-4 py-2 text-sm bg-foreground text-background rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(["7d", "30d", "all"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                timeRange === range
                  ? "bg-foreground text-background"
                  : "bg-muted/20 text-muted hover:text-foreground"
              }`}
            >
              {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "All Time"}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            void Promise.all([mutate(), mutateAudit()]);
          }}
          className="p-2 text-muted hover:text-foreground transition-colors"
          aria-label="Refresh data"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            icon: Eye,
            label: "Total Events",
            value: data.totalEvents.toLocaleString(),
          },
          {
            icon: BarChart3,
            label: "Styles Tracked",
            value: data.totalStyles.toString(),
          },
          {
            icon: TrendingUp,
            label: "Top Style Views",
            value: data.topStyles[0]?.count.toLocaleString() ?? "0",
          },
          {
            icon: Download,
            label: "Event Types",
            value: data.eventsByType.length.toString(),
          },
        ].map((card, i) => (
          <div
            key={i}
            className="p-6 border border-border rounded-lg"
          >
            <card.icon className="w-5 h-5 text-muted mb-3" />
            <p className="text-2xl font-bold">{card.value}</p>
            <p className="text-sm text-muted mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Top Styles */}
      <div className="border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Top 20 Styles</h2>
        {data.topStyles.length === 0 ? (
          <p className="text-muted text-sm">No style data yet.</p>
        ) : (
          <div className="space-y-3">
            {data.topStyles.slice(0, 20).map((style, i) => {
              const maxCount = data.topStyles[0]?.count || 1;
              const percentage = (style.count / maxCount) * 100;
              return (
                <div key={style.slug} className="flex items-center gap-3">
                  <span className="w-6 text-sm text-muted text-right">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{style.slug}</span>
                      <span className="text-sm text-muted">
                        {style.count.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-foreground/60 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Event Types Distribution */}
      <div className="border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Event Types</h2>
        {data.eventsByType.length === 0 ? (
          <p className="text-muted text-sm">No events recorded yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.eventsByType.map((event) => (
              <div
                key={event.type}
                className="p-4 bg-muted/10 rounded-lg"
              >
                <p className="text-sm text-muted">{event.type}</p>
                <p className="text-xl font-bold mt-1">
                  {event.count.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      {data.recentActivity.length > 0 && (
        <div className="border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Daily Activity</h2>
          <div className="flex items-end gap-1 h-32">
            {data.recentActivity.map((day) => {
              const height = maxDailyCount > 0 ? (day.count / maxDailyCount) * 100 : 0;
              return (
                <div
                  key={day.date}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <span className="text-xs text-muted">
                    {day.count > 0 ? day.count : ""}
                  </span>
                  <div
                    className="w-full bg-foreground/40 rounded-t transition-all"
                    style={{ height: `${Math.max(height, 2)}%` }}
                  />
                  <span className="text-[10px] text-muted">
                    {new Date(day.date).getDate()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Admin Actions</h2>
          <span className="text-xs text-muted">
            {auditData?.total ?? 0} events
          </span>
        </div>

        {auditLoading && <p className="text-sm text-muted">Loading audit logs...</p>}

        {!auditLoading && auditError && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {auditError.message}
          </p>
        )}

        {!auditLoading && !auditError && (auditData?.events.length ?? 0) === 0 && (
          <p className="text-sm text-muted">No admin audit events yet.</p>
        )}

        {!auditLoading && !auditError && (auditData?.events.length ?? 0) > 0 && (
          <div className="space-y-3">
            {(auditData?.events ?? []).map((event) => {
              const meta =
                event.metadata && typeof event.metadata === "object"
                  ? (event.metadata as Record<string, unknown>)
                  : null;
              const slug = typeof meta?.slug === "string" ? meta.slug : null;
              const noteProvided =
                typeof meta?.noteProvided === "boolean"
                  ? (meta.noteProvided ? "with note" : "without note")
                  : null;

              return (
                <div
                  key={event.id}
                  className="rounded-lg border border-border/60 bg-muted/5 px-4 py-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-medium text-foreground flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-muted" />
                      {formatAuditAction(event.action)}
                    </p>
                    <p className="text-xs text-muted flex items-center gap-1">
                      <Clock3 className="w-3.5 h-3.5" />
                      {new Date(event.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                    <span>Actor: {formatAuditActor(event.actor.type, event.actor.id)}</span>
                    <span>
                      Target: {event.targetType}{event.targetId ? ` (${event.targetId})` : ""}
                    </span>
                    {slug && <span>Slug: {slug}</span>}
                    {noteProvided && <span>Review note: {noteProvided}</span>}
                    {event.ipAddress && <span>IP: {event.ipAddress}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function formatAuditAction(action: string): string {
  if (action === "submission.approve") return "Submission Approved";
  if (action === "submission.reject") return "Submission Rejected";
  return action;
}

function formatAuditActor(type: string, id: string): string {
  if (type === "user") return `user:${id.slice(0, 8)}`;
  if (type === "token") return id;
  if (type === "dev-bypass") return "dev-bypass";
  return `${type}:${id}`;
}
