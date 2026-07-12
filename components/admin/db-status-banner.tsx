"use client";

import { useAdminSystem } from "@/lib/swr";

export function DbStatusBanner() {
  const { data, isLoading } = useAdminSystem();

  if (isLoading || !data) return null;

  const { supabaseConfigured } = data.environment;
  const { connected, tables } = data.database;

  if (supabaseConfigured && connected) return null;

  const missingEnvVars = !supabaseConfigured;
  const allTablesEmpty =
    connected && tables.length > 0 && tables.every((t) => t.rowCount === 0);

  return (
    <div className="mb-6 rounded-xl bg-[var(--admin-panel)] px-4 py-3 shadow-[var(--admin-shadow-border)]">
      <div className="flex items-start gap-3">
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--admin-status-amber)]" />
        <div className="space-y-1 text-sm">
          {missingEnvVars ? (
            <>
              <p className="font-medium text-foreground">
                数据库未连接
              </p>
              <p className="text-muted">
                缺少 Supabase 环境变量。请在生产环境配置中设置
                <code>NEXT_PUBLIC_SUPABASE_URL</code> 和{" "}
                <code>SUPABASE_SERVICE_ROLE_KEY</code>，然后重新部署或重启应用。
              </p>
            </>
          ) : allTablesEmpty ? (
            <>
              <p className="font-medium text-foreground">
                数据库已连接，但所有数据表均为空
              </p>
              <p className="text-muted">
                Supabase 已完成配置并成功连接，但所有数据表中都没有数据。请确认数据表已创建且包含数据。
              </p>
            </>
          ) : (
            <>
              <p className="font-medium text-foreground">
                数据库连接异常
              </p>
              <p className="text-muted">
                Supabase 已配置，但连接失败。请检查服务角色密钥是否正确，并确认 Supabase 项目可以访问。
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
