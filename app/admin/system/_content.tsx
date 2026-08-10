"use client";

import { useMemo } from "react";
import {
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ClipboardCheck,
  Database,
  Server,
  Shield,
} from "lucide-react";
import Link from "next/link";
import {
  AdminButton,
  AdminBadge,
  AdminCountPill,
  AdminErrorState,
  AdminLoadingState,
  AdminPanel,
  AdminTableShell,
  AdminToolbar,
} from "@/components/admin/admin-ui";
import { useAdminSystem, useAdminSystemPreflight } from "@/lib/swr";
import type { SystemPreflightStatus } from "@/lib/admin/system-preflight";

function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const parts: string[] = [];
  if (d > 0) parts.push(`${d} 天`);
  if (h > 0) parts.push(`${h} 小时`);
  parts.push(`${m} 分钟`);
  return parts.join(" ");
}
function formatBytes(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function AdminSystemContent() {
  const { data, error, isLoading, mutate } = useAdminSystem();
  const {
    data: preflightData,
    error: preflightError,
    isLoading: preflightLoading,
    mutate: mutatePreflight,
  } = useAdminSystemPreflight();

  const uptimeDisplay = useMemo(() => {
    if (!data) return "";
    return formatUptime(data.runtime.uptime);
  }, [data]);

  const rssDisplay = useMemo(() => {
    if (!data) return "";
    return formatBytes(data.runtime.memoryUsage.rss);
  }, [data]);

  if (isLoading) {
    return <AdminLoadingState label="正在加载系统信息..." />;
  }

  if (error) {
    return (
      <AdminErrorState message="加载系统信息失败，请重试。" onRetry={() => mutate()} />
    );
  }

  if (!data) return null;

  const envCards = [
    {
      label: "Node 环境",
      value: data.environment.nodeEnv,
      configured: true,
    },
    {
      label: "Supabase",
      value: data.environment.supabaseConfigured ? "已配置" : "未配置",
      configured: data.environment.supabaseConfigured,
    },
    {
      label: "管理员令牌",
      value: data.environment.adminTokenConfigured ? "已配置" : "未配置",
      configured: data.environment.adminTokenConfigured,
    },
    {
      label: "管理员用户",
      value: data.environment.adminUserIdsConfigured ? "已配置" : "未配置",
      configured: data.environment.adminUserIdsConfigured,
    },
  ];

  const preflightMeta: Record<
    SystemPreflightStatus,
    { label: string; tone: "success" | "warning" | "danger" }
  > = {
    ready: { label: "可继续验收", tone: "success" },
    warning: { label: "需要确认", tone: "warning" },
    blocked: { label: "当前阻断", tone: "danger" },
  };

  return (
    <div className="space-y-6">
      <AdminToolbar
        title="系统控制"
        description="刷新环境状态、数据库状态、运行时指标和审计日志计数。"
        meta={<AdminCountPill>{data.environment.nodeEnv}</AdminCountPill>}
        actions={
          <AdminButton
            onClick={() => {
              mutate();
              mutatePreflight();
            }}
            aria-label="刷新数据"
          >
            <RefreshCw className="w-4 h-4" />
            刷新
          </AdminButton>
        }
      />

      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <ClipboardCheck className="h-5 w-5 text-muted" />
            发布前检查
          </h2>
          {preflightData ? (
            <AdminBadge tone={preflightMeta[preflightData.overall].tone}>
              {preflightMeta[preflightData.overall].label}
            </AdminBadge>
          ) : null}
        </div>
        {preflightError ? (
          <AdminPanel className="p-5" role="alert">
            <p className="text-sm text-[var(--admin-status-red)]">
              发布预检加载失败，请刷新系统信息后重试。
            </p>
          </AdminPanel>
        ) : preflightLoading && !preflightData ? (
          <AdminPanel className="p-5">
            <p className="text-sm text-muted">正在检查认证、数据表和运维工具...</p>
          </AdminPanel>
        ) : preflightData ? (
          <AdminPanel className="divide-y divide-border/60 overflow-hidden">
            <div className="px-5 py-4">
              <p className="text-sm font-medium">
                这是只读闸门，不会执行迁移、上传或部署。
              </p>
              <p className="mt-1 text-xs leading-5 text-muted">
                绿色表示已验证，琥珀色表示需要人工确认，红色表示必需条件尚未满足。
              </p>
            </div>
            {preflightData.checks.map((check) => {
              const Icon =
                check.status === "ready"
                  ? CheckCircle
                  : check.status === "blocked"
                    ? XCircle
                    : AlertTriangle;
              const iconClass =
                check.status === "ready"
                  ? "text-[var(--admin-status-green)]"
                  : check.status === "blocked"
                    ? "text-[var(--admin-status-red)]"
                    : "text-[var(--admin-status-amber)]";
              return (
                <div key={check.id} className="grid gap-3 px-5 py-4 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.8fr)]">
                  <div className="flex min-w-0 gap-3">
                    <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconClass}`} />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium">{check.label}</p>
                        <span className="text-[11px] uppercase tracking-[0.12em] text-muted">
                          {check.severity === "required"
                            ? "required"
                            : check.severity === "manual"
                              ? "manual"
                              : "recommended"}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-muted">{check.summary}</p>
                      {check.migration ? (
                        <p className="mt-2 break-words font-mono text-[11px] leading-5 text-muted">
                          {check.migration}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="lg:border-l lg:border-border/60 lg:pl-5">
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
                      下一步
                    </p>
                    <p className="mt-1 text-sm leading-6 text-foreground/80">{check.nextStep}</p>
                  </div>
                </div>
              );
            })}
          </AdminPanel>
        ) : null}
      </section>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Shield className="w-5 h-5 text-muted" />
          环境
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {envCards.map((card) => (
            <AdminPanel key={card.label} className="flex items-start gap-3 p-5">
              {card.configured ? (
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
              )}
              <div>
                <p className="text-sm text-muted">{card.label}</p>
                <p className="text-base font-medium mt-1">{card.value}</p>
              </div>
            </AdminPanel>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Database className="w-5 h-5 text-muted" />
            数据库
          </h2>
        </div>
        {!data.database.connected ? (
          <AdminPanel className="p-6">
            <p className="text-muted text-sm">
              未连接。Supabase 尚未配置。
            </p>
          </AdminPanel>
        ) : (
          <AdminTableShell>
              <thead>
                <tr className="border-b border-border bg-muted/10">
                  <th className="text-left px-4 py-3 font-medium text-muted">
                    数据表名称
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-muted">
                    行数
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.database.tables.map((table) => (
                  <tr
                    key={table.name}
                    className="border-b border-border/60 last:border-b-0"
                  >
                    <td className="px-4 py-3 font-mono text-sm">
                      {table.name}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {table.rowCount >= 0
                        ? table.rowCount.toLocaleString()
                        : "错误"}
                    </td>
                  </tr>
                ))}
              </tbody>
          </AdminTableShell>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <Server className="w-5 h-5 text-muted" />
          运行时
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <AdminPanel className="p-5">
            <p className="text-sm text-muted">Node 版本</p>
            <p className="text-xl font-bold mt-1">{data.runtime.nodeVersion}</p>
          </AdminPanel>
          <AdminPanel className="p-5">
            <p className="text-sm text-muted">运行时间</p>
            <p className="text-xl font-bold mt-1">{uptimeDisplay}</p>
          </AdminPanel>
          <AdminPanel className="p-5">
            <p className="text-sm text-muted">内存（RSS）</p>
            <p className="text-xl font-bold mt-1">{rssDisplay}</p>
          </AdminPanel>
        </div>
      </section>


      <section>
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-muted" />
          审计日志
        </h2>
        <AdminPanel className="p-6">
          <p className="text-sm text-muted mb-1">文件事件数量</p>
          <p className="text-2xl font-bold">
            {data.audit.fileEventCount.toLocaleString()}
          </p>
          <Link
            href="/admin/analytics"
            className="inline-block mt-3 text-sm text-muted hover:text-foreground underline underline-offset-2 transition-colors"
          >
            查看数据分析面板
          </Link>
        </AdminPanel>
      </section>
    </div>
  );
}
