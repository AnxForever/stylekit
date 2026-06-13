"use client";

import { useMemo } from "react";
import {
  RefreshCw,
  CheckCircle,
  XCircle,
  Database,
  Server,
  Shield,
} from "lucide-react";
import Link from "next/link";
import {
  AdminButton,
  AdminCountPill,
  AdminErrorState,
  AdminLoadingState,
  AdminPanel,
  AdminTableShell,
  AdminToolbar,
} from "@/components/admin/admin-ui";
import { useAdminSystem } from "@/lib/swr";

function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const parts: string[] = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  parts.push(`${m}m`);
  return parts.join(" ");
}
function formatBytes(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function AdminSystemContent() {
  const { data, error, isLoading, mutate } = useAdminSystem();

  const uptimeDisplay = useMemo(() => {
    if (!data) return "";
    return formatUptime(data.runtime.uptime);
  }, [data]);

  const rssDisplay = useMemo(() => {
    if (!data) return "";
    return formatBytes(data.runtime.memoryUsage.rss);
  }, [data]);

  if (isLoading) {
    return <AdminLoadingState label="Loading system information..." />;
  }

  if (error) {
    return (
      <AdminErrorState message={error.message} onRetry={() => mutate()} />
    );
  }

  if (!data) return null;

  const envCards = [
    {
      label: "Node Env",
      value: data.environment.nodeEnv,
      configured: true,
    },
    {
      label: "Supabase",
      value: data.environment.supabaseConfigured ? "Configured" : "Not configured",
      configured: data.environment.supabaseConfigured,
    },
    {
      label: "Admin Token",
      value: data.environment.adminTokenConfigured ? "Configured" : "Not configured",
      configured: data.environment.adminTokenConfigured,
    },
    {
      label: "Admin Users",
      value: data.environment.adminUserIdsConfigured ? "Configured" : "Not configured",
      configured: data.environment.adminUserIdsConfigured,
    },
  ];

  return (
    <div className="space-y-6">
      <AdminToolbar
        title="System controls"
        description="Refresh environment status, database state, runtime metrics, and audit log counters."
        meta={<AdminCountPill>{data.environment.nodeEnv}</AdminCountPill>}
        actions={
          <AdminButton
            onClick={() => {
              mutate();
            }}
            aria-label="Refresh data"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </AdminButton>
        }
      />

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Shield className="w-5 h-5 text-muted" />
          Environment
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
            Database
          </h2>
        </div>
        {!data.database.connected ? (
          <AdminPanel className="p-6">
            <p className="text-muted text-sm">
              Not connected. Supabase is not configured.
            </p>
          </AdminPanel>
        ) : (
          <AdminTableShell>
              <thead>
                <tr className="border-b border-border bg-muted/10">
                  <th className="text-left px-4 py-3 font-medium text-muted">
                    Table Name
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-muted">
                    Row Count
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
                        : "Error"}
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
          Runtime
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <AdminPanel className="p-5">
            <p className="text-sm text-muted">Node Version</p>
            <p className="text-xl font-bold mt-1">{data.runtime.nodeVersion}</p>
          </AdminPanel>
          <AdminPanel className="p-5">
            <p className="text-sm text-muted">Uptime</p>
            <p className="text-xl font-bold mt-1">{uptimeDisplay}</p>
          </AdminPanel>
          <AdminPanel className="p-5">
            <p className="text-sm text-muted">Memory (RSS)</p>
            <p className="text-xl font-bold mt-1">{rssDisplay}</p>
          </AdminPanel>
        </div>
      </section>


      <section>
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-muted" />
          Audit Log
        </h2>
        <AdminPanel className="p-6">
          <p className="text-sm text-muted mb-1">File Event Count</p>
          <p className="text-2xl font-bold">
            {data.audit.fileEventCount.toLocaleString()}
          </p>
          <Link
            href="/admin/analytics"
            className="inline-block mt-3 text-sm text-muted hover:text-foreground underline underline-offset-2 transition-colors"
          >
            View analytics dashboard
          </Link>
        </AdminPanel>
      </section>
    </div>
  );
}
