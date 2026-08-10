"use client";

import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Clock3,
  Database,
  ExternalLink,
  FileCheck2,
  FlaskConical,
  HeartHandshake,
  Inbox,
  MessageSquare,
  Megaphone,
  RefreshCw,
  Server,
  ShieldAlert,
  Star,
  Users,
} from "lucide-react";
import {
  AdminBadge,
  AdminButton,
  AdminEmptyState,
  AdminErrorState,
  AdminLoadingState,
  AdminSection,
} from "@/components/admin/admin-ui";
import { useAdminOperations, type AdminOperationsData } from "@/lib/swr";

const DATE_FORMATTER = new Intl.DateTimeFormat("zh-CN", {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function OperationsDashboard() {
  const { data, error, isLoading, isValidating, mutate } = useAdminOperations();

  if (isLoading && !data) {
    return <AdminLoadingState label="正在读取运营信号..." />;
  }

  if (error && !data) {
    return (
      <AdminErrorState
        message="运营总览暂时无法加载。"
        onRetry={() => void mutate()}
      />
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">
          {isValidating ? "正在刷新信号…" : `更新于 ${formatDate(data.generatedAt)}`}
        </p>
        <AdminButton size="sm" onClick={() => void mutate()}>
          <RefreshCw className="h-4 w-4" />
          刷新
        </AdminButton>
      </div>

      <QueueRail data={data} />
      <ActionQueue data={data} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <RecentSignals data={data} />
        <SystemPulse data={data} />
      </div>

      <ActionDeck />
    </div>
  );
}

function ActionQueue({ data }: { data: AdminOperationsData }) {
  const items = data.queue.items;

  return (
    <AdminSection
      title="处理队列"
      description="按最近证据排列；每一项都带有直接处理入口。"
      badge={<AdminBadge tone={items.length > 0 ? "warning" : "success"}>{items.length} 条</AdminBadge>}
      actions={
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <Inbox className="h-3.5 w-3.5" />
          证据路径
        </span>
      }
    >
      {items.length === 0 ? (
        <div className="rounded-lg bg-[var(--admin-input)] px-4 py-5">
          <p className="text-sm font-medium">当前没有需要立即处理的事项</p>
          <p className="mt-1 text-xs leading-5 text-muted">新的赞助截图、投稿或互动出现后，会在这里按时间汇总。</p>
        </div>
      ) : (
        <div className="divide-y divide-[var(--admin-border-soft)] rounded-lg bg-[var(--admin-input)]">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex items-start gap-3 px-3 py-3 transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-[var(--admin-hover)] focus-visible:relative"
            >
              <span
                className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${queueToneClass(item.tone)}`}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="truncate text-sm font-medium">{item.title}</span>
                  <AdminBadge tone={item.tone}>{queueKindLabel(item.kind)}</AdminBadge>
                </span>
                <span className="mt-1 block truncate text-xs text-muted">{item.summary}</span>
                <span className="mt-1 block font-mono text-[11px] tabular-nums text-muted">
                  {formatDate(item.createdAt)}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-1 text-xs text-muted transition-colors group-hover:text-foreground">
                {item.actionLabel}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      )}
    </AdminSection>
  );
}

function QueueRail({ data }: { data: AdminOperationsData }) {
  const items = [
    {
      label: "投稿待审核",
      value: data.queue.pendingSubmissions,
      description: "社区提交等待处理",
      href: "/admin/submissions?status=pending",
      icon: FileCheck2,
      tone: "warning" as const,
    },
    {
      label: "知识库待复核",
      value: data.queue.pendingKnowledgeReviews,
      description: "资料需要确认来源与许可",
      href: "/admin/knowledge",
      icon: ShieldAlert,
      tone: "warning" as const,
    },
    {
      label: "未公开赞助",
      value: data.queue.unpublishedSupport,
      description: "截图已上传但尚未展示",
      href: "/admin/support",
      icon: HeartHandshake,
      tone: "success" as const,
    },
  ];

  return (
    <section aria-labelledby="operations-queue-title">
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
            下一步
          </p>
          <h2 id="operations-queue-title" className="mt-1 text-lg font-semibold">
            运营队列
          </h2>
        </div>
        <span className="text-xs text-muted">点击数字直接进入处理页</span>
      </div>
      <div className="grid overflow-hidden rounded-xl bg-[var(--admin-border-soft)] shadow-[var(--admin-shadow-border)] md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group bg-[var(--admin-panel)] p-5 transition-colors hover:bg-[var(--admin-hover)] focus-visible:relative"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--admin-input)] text-muted">
                <item.icon className="h-4 w-4" strokeWidth={1.7} />
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
            <p className="mt-5 text-sm font-medium">{item.label}</p>
            <p className="mt-1 text-xs text-muted">{item.description}</p>
            <div className="mt-5 flex items-end justify-between gap-3">
              <span className="font-mono text-3xl font-semibold tracking-[-0.05em] tabular-nums">
                {formatCount(item.value)}
              </span>
              <AdminBadge tone={item.tone}>
                {item.value == null ? "未接入" : item.value > 0 ? "需要关注" : "已清空"}
              </AdminBadge>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function RecentSignals({ data }: { data: AdminOperationsData }) {
  return (
    <AdminSection
      title="近期内容信号"
      description={`过去 ${data.windowDays} 天的互动，以及最近收到的赞助。`}
      actions={
        <Link href="/admin/analytics/content" className="text-xs text-muted hover:text-foreground">
          查看完整分析 <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" />
        </Link>
      }
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <SignalStat href="/admin/comments" icon={MessageSquare} label="新增评论" value={data.signals.recentComments} />
        <SignalStat href="/admin/ratings" icon={Star} label="新增评分" value={data.signals.recentRatings} />
        <SignalStat href="/admin/analytics/users" icon={Users} label="订阅者" value={data.signals.newsletterSubscribers} />
      </div>

      <div className="mt-6 border-t border-[var(--admin-border-soft)] pt-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-muted">最新赞助</p>
          <Link href="/admin/support" className="text-xs text-muted hover:text-foreground">
            管理鸣谢 <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" />
          </Link>
        </div>
        {data.latestSupport.length === 0 ? (
          <AdminEmptyState title="还没有可显示的赞助记录" description="上传一张截图后，记录会出现在这里。" />
        ) : (
          <div className="divide-y divide-[var(--admin-border-soft)]">
            {data.latestSupport.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.donor_label}</p>
                  <p className="mt-1 text-xs text-muted">{formatDate(item.donated_on)}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="font-mono text-sm tabular-nums text-foreground">
                    {item.amount ?? "—"}
                  </span>
                  <AdminBadge tone={item.published ? "success" : "warning"}>
                    {item.published ? "已发布" : "未公开"}
                  </AdminBadge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminSection>
  );
}

function SystemPulse({ data }: { data: AdminOperationsData }) {
  const databaseLabel = {
    connected: "数据库正常",
    degraded: "数据库异常",
    not_configured: "数据库未配置",
  }[data.database.status];
  const databaseTone = data.database.status === "connected" ? "success" : "warning";

  return (
    <AdminSection
      title="系统体温"
      description="只展示影响你继续操作的运行状态。"
      actions={<Link href="/admin/system" className="text-xs text-muted hover:text-foreground">系统详情 <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" /></Link>}
    >
      <div className="flex items-center gap-3 rounded-lg bg-[var(--admin-input)] px-3 py-3">
        <span className={`h-2.5 w-2.5 rounded-full ${data.database.status === "connected" ? "bg-[var(--admin-status-green)]" : "bg-[var(--admin-status-amber)]"}`} />
        <span className="text-sm font-medium">{databaseLabel}</span>
        <AdminBadge tone={databaseTone}>{data.database.status === "connected" ? "可用" : "检查"}</AdminBadge>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4">
        <PulseMetric icon={Server} label="Node" value={data.runtime.nodeVersion.replace(/^v/, "")} />
        <PulseMetric icon={Clock3} label="运行时间" value={formatUptime(data.runtime.uptime)} />
        <PulseMetric icon={Activity} label="内存 RSS" value={formatBytes(data.runtime.memoryRss)} />
        <PulseMetric icon={Database} label="已发布赞助" value={formatCount(data.signals.publishedSupport)} />
      </div>
      <div className="mt-5 border-t border-[var(--admin-border-soft)] pt-4">
        <p className="text-xs leading-5 text-muted">
          健康检查由生产服务器定时器持续监测；发现异常时优先查看系统详情和部署记录。
        </p>
      </div>
      <div className="mt-5 border-t border-[var(--admin-border-soft)] pt-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-muted">最近操作</p>
          <Link href="/admin/analytics/audit" className="text-xs text-muted hover:text-foreground">
            查看审计 <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" />
          </Link>
        </div>
        {data.recentAudit.length === 0 ? (
          <p className="text-xs text-muted">过去 7 天没有记录到后台操作。</p>
        ) : (
          <div className="space-y-3">
            {data.recentAudit.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-center justify-between gap-3 text-xs">
                <span className="truncate text-foreground">{formatAuditAction(event.action)}</span>
                <span className="shrink-0 font-mono tabular-nums text-muted">{formatDate(event.createdAt)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminSection>
  );
}

function ActionDeck() {
  const actions = [
    { href: "/admin/support", label: "上传赞助截图", description: "更新公开鸣谢", icon: HeartHandshake },
    { href: "/admin/content", label: "编辑站点公告", description: "更新全站内容", icon: Megaphone },
    { href: "/admin/submissions?status=pending", label: "审核投稿", description: "处理社区提交", icon: FileCheck2 },
    { href: "/admin/validation", label: "查看实验", description: "核对价格证据", icon: FlaskConical },
    { href: "/admin/analytics", label: "调查趋势", description: "进入数据分析", icon: Activity },
  ];

  return (
    <AdminSection title="常用操作" description="把最常用的下一步放在这里，减少在侧栏里寻找。">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {actions.map((action) => (
          <Link key={action.href} href={action.href} className="group flex items-center gap-3 rounded-lg bg-[var(--admin-input)] px-3 py-3 transition-colors hover:bg-[var(--admin-hover)]">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--admin-panel)] text-muted shadow-[var(--admin-shadow-border)]">
              <action.icon className="h-4 w-4" strokeWidth={1.7} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">{action.label}</span>
              <span className="mt-0.5 block truncate text-xs text-muted">{action.description}</span>
            </span>
            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </AdminSection>
  );
}

function SignalStat({ href, icon: Icon, label, value }: { href: string; icon: typeof Activity; label: string; value: number | null }) {
  return (
    <Link href={href} className="group rounded-lg bg-[var(--admin-input)] px-3 py-3 transition-colors hover:bg-[var(--admin-hover)]">
      <p className="flex items-center gap-2 text-xs text-muted"><Icon className="h-3.5 w-3.5" />{label}</p>
      <p className="mt-2 font-mono text-xl font-semibold tabular-nums group-hover:underline group-hover:underline-offset-4">{formatCount(value)}</p>
    </Link>
  );
}

function PulseMetric({ icon: Icon, label, value }: { icon: typeof Activity; label: string; value: string }) {
  return <div><p className="flex items-center gap-2 text-xs text-muted"><Icon className="h-3.5 w-3.5" />{label}</p><p className="mt-1 font-mono text-sm tabular-nums">{value}</p></div>;
}

function formatCount(value: number | null): string {
  return value == null ? "—" : value.toLocaleString("zh-CN");
}

function formatBytes(value: number): string {
  return `${(value / 1024 / 1024).toFixed(1)} MB`;
}

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (days > 0) return `${days}天 ${hours}小时`;
  if (hours > 0) return `${hours}小时 ${minutes}分`;
  return `${minutes}分钟`;
}

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "时间未知" : DATE_FORMATTER.format(date);
}

function formatAuditAction(action: string): string {
  const labels: Record<string, string> = {
    "submission.approve": "通过一条投稿",
    "submission.reject": "拒绝一条投稿",
    "submission.update": "编辑一条投稿",
    "submission.delete": "删除一条投稿",
    "comment.delete": "删除一条评论",
    "rating.delete": "删除一条评分",
    "support_acknowledgment.create": "新增赞助鸣谢",
    "support_acknowledgment.update": "更新赞助鸣谢",
    "support_acknowledgment.delete": "删除赞助鸣谢",
  };
  return labels[action] ?? action.replace(/[._]/g, " · ");
}

function queueKindLabel(kind: AdminOperationsData["queue"]["items"][number]["kind"]): string {
  const labels: Record<typeof kind, string> = {
    submission: "投稿",
    knowledge: "知识库",
    support: "赞助",
    comment: "评论",
    rating: "评分",
  };
  return labels[kind];
}

function queueToneClass(tone: AdminOperationsData["queue"]["items"][number]["tone"]): string {
  const classes: Record<typeof tone, string> = {
    warning: "bg-[var(--admin-status-amber)]",
    info: "bg-[var(--admin-status-blue)]",
    success: "bg-[var(--admin-status-green)]",
  };
  return classes[tone];
}
