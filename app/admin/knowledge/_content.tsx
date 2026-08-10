"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDashed,
  ExternalLink,
  FileSearch,
  GitBranch,
  LibraryBig,
  LockKeyhole,
  RefreshCw,
  Scale,
  Search,
  ShieldCheck,
  X,
  type LucideIcon,
} from "lucide-react";

import {
  AdminBadge,
  AdminButton,
  AdminCountPill,
  AdminEmptyState,
  AdminErrorState,
  AdminField,
  AdminInput,
  AdminLoadingState,
  AdminPanel,
  AdminSegmentedControl,
  AdminToolbar,
} from "@/components/admin/admin-ui";
import type { KnowledgeAdminResource } from "@/lib/knowledge";
import {
  useAdminKnowledgePublications,
  useAdminKnowledgeResources,
  useAdminKnowledgeReviews,
} from "@/lib/swr";

type ResourceFilter = "all" | "blocked" | "ready";
type ReviewAction = "approve" | "reject" | "request-changes";

const KIND_LABELS: Record<string, string> = {
  "component-library": "组件库",
  "design-to-code-tool": "设计转代码",
  "accessibility-guideline": "无障碍",
  animation: "动效",
  icon: "图标",
};

function kindLabel(kind: string): string {
  return KIND_LABELS[kind] ?? kind;
}

function resourceTone(resource: KnowledgeAdminResource): "success" | "warning" | "danger" {
  if (resource.approval.ok) return "success";
  if (resource.reviewStatus === "pending") return "warning";
  return "danger";
}

function resourceStatus(resource: KnowledgeAdminResource): string {
  if (resource.approval.ok) return "可进入审核";
  if (resource.reviewStatus === "pending") return "待补证据";
  return resource.reviewStatus;
}

export function AdminKnowledgeContent() {
  const { data, error, isLoading, mutate } = useAdminKnowledgeResources();
  const [syncing, setSyncing] = useState(false);
  const [syncReport, setSyncReport] = useState<{ mode: string; storage: string; total: number; createPending: number; reReview: number } | null>(null);
  const [filter, setFilter] = useState<ResourceFilter>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<ReviewAction | null>(null);
  const [feedback, setFeedback] = useState<{ tone: "success" | "danger"; text: string } | null>(null);

  const resourceList = data?.resources;
  const resources = useMemo(() => resourceList ?? [], [resourceList]);
  const filteredResources = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return resources.filter((resource) => {
      if (filter === "blocked" && resource.approval.ok) return false;
      if (filter === "ready" && !resource.approval.ok) return false;
      if (!normalized) return true;
      return `${resource.name} ${resource.nameEn} ${resource.resourceKind} ${resource.knowledge.tags.join(" ")}`
        .toLowerCase()
        .includes(normalized);
    });
  }, [filter, query, resources]);

  useEffect(() => {
    if (!selectedId || !resources.some((resource) => resource.id === selectedId)) {
      setSelectedId(resources[0]?.id ?? null);
    }
  }, [resources, selectedId]);

  const selected = resources.find((resource) => resource.id === selectedId) ?? filteredResources[0] ?? null;
  const { data: reviewData, isLoading: reviewsLoading } = useAdminKnowledgeReviews(selected?.id ?? null);
  const { data: publicationData, isLoading: publicationsLoading } = useAdminKnowledgePublications(selected?.id ?? null);

  async function runSync(commit: boolean) {
    setSyncing(true);
    try {
      const response = await fetch("/api/admin/knowledge/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commit }),
      });
      const payload = await response.json().catch(() => null) as {
        mode?: string;
        storage?: string;
        plan?: { total?: number; counts?: { "create-pending"?: number; "re-review-required"?: number } };
        error?: string;
      } | null;
      if (!response.ok) throw new Error(payload?.error ?? `同步请求失败（${response.status}）`);
      setSyncReport({
        mode: payload?.mode ?? "unknown",
        storage: payload?.storage ?? (commit ? "configured" : "unconfigured"),
        total: payload?.plan?.total ?? 0,
        createPending: payload?.plan?.counts?.["create-pending"] ?? 0,
        reReview: payload?.plan?.counts?.["re-review-required"] ?? 0,
      });
    } catch (syncError) {
      setSyncReport(null);
      setFeedback({ tone: "danger", text: syncError instanceof Error ? syncError.message : "同步请求失败。" });
    } finally {
      setSyncing(false);
    }
  }

  async function handleReview(decision: ReviewAction) {
    if (!selected) return;
    setSubmitting(decision);
    setFeedback(null);
    try {
      const response = await fetch("/api/admin/knowledge/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceId: selected.id,
          decision,
          notes: decision === "approve" ? "Approved from the knowledge review desk." : "Needs another review pass.",
        }),
      });
      const payload = await response.json().catch(() => null) as { error?: string } | null;
      if (!response.ok) throw new Error(payload?.error ?? `审核请求失败（${response.status}）`);
      setFeedback({ tone: "success", text: "审核决定已记录到 Supabase。" });
      await mutate();
    } catch (reviewError) {
      setFeedback({ tone: "danger", text: reviewError instanceof Error ? reviewError.message : "审核请求失败。" });
    } finally {
      setSubmitting(null);
    }
  }

  if (isLoading) return <AdminLoadingState label="正在加载知识库候选资源…" />;
  if (error) return <AdminErrorState message="知识库候选资源加载失败。" onRetry={() => void mutate()} />;
  if (!data || resources.length === 0) return <AdminEmptyState title="暂无候选资源" description="先运行知识库清单同步，再回到这里进行审核。" />;

  return (
    <div className="mx-auto max-w-[1180px] space-y-7">
      <section className="relative overflow-hidden rounded-xl bg-[var(--admin-panel)] p-7 shadow-[var(--admin-shadow-medium)] sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[color-mix(in_srgb,var(--admin-status-amber)_11%,transparent)] blur-3xl" />
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-foreground text-background shadow-[var(--admin-shadow-border)]"><LibraryBig className="h-5 w-5" strokeWidth={1.7} /></div>
              <div><p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">Knowledge control plane</p><p className="mt-1 text-sm text-muted">Git manifest · 审核队列</p></div>
            </div>
            <h2 className="mt-8 text-3xl font-semibold leading-[1.08] tracking-[-0.05em] text-foreground sm:text-4xl">先证明它值得被复用，再让 AI 看见它。</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted">管理许可证、来源、安全扫描和质量证据。候选项目不会因为“看起来不错”就自动进入生成器。</p>
          </div>
          <div className="grid shrink-0 grid-cols-3 gap-7 border-t border-border/70 pt-5 lg:min-w-[300px] lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <Metric label="候选" value={data.counts.total} />
            <Metric label="待补证据" value={data.counts.blocked} accent />
            <Metric label="可审核" value={data.counts.ready} />
          </div>
        </div>
      </section>

      <AdminToolbar title="审核队列" description="批准只代表审核通过，发布仍需要单独的清单和发布事件。" meta={<AdminBadge tone="info"><GitBranch className="h-3 w-3" />git-manifests</AdminBadge>} actions={<div className="flex flex-wrap items-center gap-2"><AdminButton size="sm" disabled={syncing} onClick={() => void runSync(false)}>{syncing ? "检查中…" : "检查同步"}</AdminButton><AdminButton size="sm" tone="success" disabled={syncing} onClick={() => void runSync(true)}>写入 Supabase</AdminButton><AdminButton size="icon" onClick={() => void mutate()} aria-label="刷新知识库"><RefreshCw className="h-4 w-4" /></AdminButton></div>}>
        <div className="grid w-full gap-4 md:grid-cols-[180px_minmax(0,1fr)_auto] md:items-end">
          <AdminField label="筛选"><AdminSegmentedControl value={filter} onChange={setFilter} ariaLabel="筛选知识库资源" options={[{ value: "all", label: "全部" }, { value: "blocked", label: "待补证据" }, { value: "ready", label: "可审核" }]} /></AdminField>
          <AdminField label="搜索候选资源"><div className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" /><AdminInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="名称、标签或资源类型" className="pl-9" /></div></AdminField>
          <div className="flex h-10 items-center gap-2 text-xs text-muted"><CircleDashed className="h-3.5 w-3.5" />{filteredResources.length} 项匹配</div>
        </div>
      </AdminToolbar>

      {syncReport ? <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-lg border border-border/70 bg-[var(--admin-panel)] px-4 py-3 text-xs text-muted shadow-[var(--admin-shadow-small)]"><span className="font-medium text-foreground">同步计划已生成</span><span>{syncReport.mode === "dry-run" ? "dry-run" : "已提交"}</span><span>{syncReport.storage === "unconfigured" ? "Supabase 未配置" : "Supabase 已连接"}</span><span>{syncReport.total} 个 manifest</span><span>{syncReport.createPending} 个待入库</span>{syncReport.reReview > 0 ? <span className="text-[var(--admin-status-amber)]">{syncReport.reReview} 个需重新审核</span> : null}</div> : null}

      <div className="grid gap-7 xl:grid-cols-[340px_minmax(0,1fr)] xl:items-start">
        <AdminPanel className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-border/70 px-5 py-5"><div><p className="text-sm font-medium">候选清单</p><p className="mt-1 text-xs text-muted">可追溯的知识来源</p></div><AdminCountPill>{filteredResources.length}</AdminCountPill></div>
          <div className="max-h-[680px] overflow-y-auto divide-y divide-border/60">
            {filteredResources.map((resource) => (
              <button key={resource.id} type="button" onClick={() => { setSelectedId(resource.id); setFeedback(null); }} className={`group flex w-full items-start gap-3 px-5 py-5 text-left transition-colors ${selected?.id === resource.id ? "bg-[var(--admin-input)]" : "hover:bg-[var(--admin-input)]/60"}`}>
                <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${resource.approval.ok ? "bg-[var(--admin-status-green)]" : "bg-[var(--admin-status-amber)]"}`} />
                <span className="min-w-0 flex-1"><span className="flex items-center gap-2"><span className="truncate text-sm font-medium">{resource.name}</span><span className="truncate text-[11px] text-muted">{resourceStatus(resource)}</span></span><span className="mt-2 block truncate text-xs text-muted">{kindLabel(resource.resourceKind)} · {resource.license.spdx}</span></span>
                <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </AdminPanel>
        {selected ? <ResourceDetail resource={selected} reviews={reviewData?.reviews ?? []} reviewsLoading={reviewsLoading} publications={publicationData?.publications ?? []} publicationsLoading={publicationsLoading} feedback={feedback} submitting={submitting} onReview={handleReview} /> : null}
      </div>
    </div>
  );
}

function Metric({ label, value, accent = false }: { label: string; value: number; accent?: boolean }) {
  return <div><p className="text-[10px] uppercase tracking-[0.14em] text-muted">{label}</p><p className={`mt-2 font-mono text-2xl tabular-nums ${accent ? "text-[var(--admin-status-amber)]" : "text-foreground"}`}>{value.toString().padStart(2, "0")}</p></div>;
}

function ResourceDetail({ resource, reviews, reviewsLoading, publications, publicationsLoading, feedback, submitting, onReview }: { resource: KnowledgeAdminResource; reviews: Array<{ id: string; decision: string; notes: string | null; created_at: string }>; reviewsLoading: boolean; publications: Array<{ id: string; action: string; notes: string | null; created_at: string }>; publicationsLoading: boolean; feedback: { tone: "success" | "danger"; text: string } | null; submitting: ReviewAction | null; onReview: (decision: ReviewAction) => Promise<void> }) {
  const [showAllBlockers, setShowAllBlockers] = useState(false);
  const visibleBlockers = showAllBlockers ? resource.approval.blockers : resource.approval.blockers.slice(0, 4);
  const hiddenBlockers = resource.approval.blockers.length - visibleBlockers.length;

  return (
    <AdminPanel className="overflow-hidden shadow-[var(--admin-shadow-medium)]">
      <div className="px-6 py-7 sm:px-8 sm:py-8">
        <div className="flex flex-wrap items-start justify-between gap-5"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><AdminBadge tone={resourceTone(resource)}>{resourceStatus(resource)}</AdminBadge><AdminCountPill>{kindLabel(resource.resourceKind)}</AdminCountPill></div><h3 className="mt-4 truncate text-2xl font-semibold tracking-[-0.04em]">{resource.name}</h3><p className="mt-1.5 text-sm text-muted">{resource.nameEn} · <code className="font-mono text-xs">{resource.id}</code></p></div><a href={resource.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 rounded-md bg-[var(--admin-input)] px-3 text-xs text-muted shadow-[var(--admin-shadow-border)] transition-colors hover:text-foreground">查看来源 <ExternalLink className="h-3.5 w-3.5" /></a></div>
        <div className="mt-7 rounded-lg bg-[var(--admin-input)] px-4 py-4 text-sm leading-6 text-foreground/80">{resource.knowledge.summary}</div>
      </div>

      <div className="space-y-8 border-t border-border/70 px-6 py-7 sm:px-8 sm:py-8">
        <section><SectionHeading title="证据概览" description="先看最影响准入的三项事实。" /><div className="mt-4 grid gap-4 sm:grid-cols-3"><EvidenceCard icon={Scale} label="许可证" value={resource.license.spdx} detail={resource.license.commercialUse ? "可商业使用" : "商业使用待确认"} ok={resource.license.classification === "allowlisted"} /><EvidenceCard icon={ShieldCheck} label="安全" value={resource.security.secretScan} detail={`${resource.security.criticalFindings} 个 critical finding`} ok={resource.security.secretScan === "pass" && resource.security.criticalFindings === 0} /><EvidenceCard icon={FileSearch} label="质量" value={`${resource.quality.score}/100`} detail={resource.quality.runtimeVerified ? "已运行验证" : "尚未运行验证"} ok={resource.approval.ok} /></div></section>

        <section><SectionHeading title="审核阻塞项" description="所有阻塞项清零后，才可以记录 approve。" icon={<LockKeyhole className="h-4 w-4" />} />{resource.approval.blockers.length > 0 ? <div className="mt-4 space-y-3">{visibleBlockers.map((blocker) => <div key={blocker} className="flex items-start gap-3 rounded-md bg-[color-mix(in_srgb,var(--admin-status-amber)_9%,transparent)] px-3.5 py-3 text-xs leading-5 text-foreground"><AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--admin-status-amber)]" />{blocker}</div>)}{hiddenBlockers > 0 ? <button type="button" onClick={() => setShowAllBlockers(true)} className="inline-flex items-center gap-1.5 px-1 text-xs text-muted hover:text-foreground">显示其余 {hiddenBlockers} 个阻塞项<ChevronDown className="h-3.5 w-3.5" /></button> : null}</div> : <div className="mt-4 flex items-center gap-2 rounded-md bg-[color-mix(in_srgb,var(--admin-status-green)_9%,transparent)] px-3.5 py-3 text-xs text-foreground"><CheckCircle2 className="h-4 w-4 text-[var(--admin-status-green)]" />所有审核门禁已通过，可以记录 approve。</div>}</section>

        <section><SectionHeading title="来源与策略" description="这些字段会随资源进入检索和生成流程。" /><div className="mt-4 grid gap-4 rounded-lg border border-border/70 p-4 text-xs text-muted sm:grid-cols-2"><MetaRow icon={GitBranch} label="来源 ref" value={resource.sourceRef} /><MetaRow icon={Scale} label="许可证" value={resource.license.name} /><MetaRow icon={FileSearch} label="使用策略" value={resource.usagePolicy} /><MetaRow icon={LibraryBig} label="框架" value={resource.knowledge.frameworks.join(", ") || "未指定"} /></div></section>

        <section><SectionHeading title="审核历史" description="所有审核决定都会保留，不会覆盖之前的记录。" />{reviewsLoading ? <p className="mt-4 text-xs text-muted">正在加载审核历史…</p> : reviews.length > 0 ? <div className="mt-4 space-y-3">{reviews.slice(0, 4).map((review) => <div key={review.id} className="flex items-start justify-between gap-4 rounded-lg border border-border/70 px-4 py-3 text-xs"><div><p className="font-medium text-foreground">{review.decision}</p>{review.notes ? <p className="mt-1 leading-5 text-muted">{review.notes}</p> : null}</div><time className="shrink-0 text-muted" dateTime={review.created_at}>{new Date(review.created_at).toLocaleDateString()}</time></div>)}</div> : <div className="mt-4 rounded-lg border border-dashed border-border/80 px-4 py-4 text-xs leading-5 text-muted">暂无 Supabase 审核记录。当前资源仍以 Git manifest 为事实源。</div>}</section>

        <section><SectionHeading title="Publication history" description="Publication events are recorded here; the Git manifest remains the public source of truth." />{publicationsLoading ? <p className="mt-4 text-xs text-muted">Loading publication history...</p> : publications.length > 0 ? <div className="mt-4 space-y-3">{publications.slice(0, 4).map((publication) => <div key={publication.id} className="flex items-start justify-between gap-4 rounded-lg border border-border/70 px-4 py-3 text-xs"><div><p className="font-medium text-foreground">{publication.action}</p>{publication.notes ? <p className="mt-1 leading-5 text-muted">{publication.notes}</p> : null}</div><time className="shrink-0 text-muted" dateTime={publication.created_at}>{new Date(publication.created_at).toLocaleDateString()}</time></div>)}</div> : <div className="mt-4 rounded-lg border border-dashed border-border/80 px-4 py-4 text-xs leading-5 text-muted">No publication events yet. A manifest sync is required after every approved decision.</div>}</section>

        {feedback ? <div role="status" className={`rounded-md px-3.5 py-3 text-xs ${feedback.tone === "success" ? "bg-[color-mix(in_srgb,var(--admin-status-green)_9%,transparent)] text-[var(--admin-status-green)]" : "bg-[color-mix(in_srgb,var(--admin-status-red)_9%,transparent)] text-[var(--admin-status-red)]"}`}>{feedback.text}</div> : null}
        <div className="flex flex-wrap items-center gap-2 border-t border-border/70 pt-6"><AdminButton tone="success" disabled={!resource.approval.ok || submitting !== null} onClick={() => void onReview("approve")}><Check className="h-4 w-4" />{submitting === "approve" ? "记录中…" : "通过审核"}</AdminButton><AdminButton tone="danger" disabled={submitting !== null} onClick={() => void onReview("request-changes")}><AlertTriangle className="h-4 w-4" />{submitting === "request-changes" ? "记录中…" : "要求补充证据"}</AdminButton><AdminButton tone="ghost" disabled={submitting !== null} onClick={() => void onReview("reject")}><X className="h-4 w-4" />{submitting === "reject" ? "记录中…" : "驳回"}</AdminButton></div>
      </div>
    </AdminPanel>
  );
}

function SectionHeading({ title, description, icon }: { title: string; description: string; icon?: React.ReactNode }) {
  return <div className="flex items-start justify-between gap-3"><div><p className="flex items-center gap-2 text-sm font-medium">{title}{icon}</p><p className="mt-1 text-xs leading-5 text-muted">{description}</p></div></div>;
}

function EvidenceCard({ icon: Icon, label, value, detail, ok }: { icon: LucideIcon; label: string; value: string; detail: string; ok: boolean }) {
  return <div className="rounded-lg bg-[var(--admin-input)] p-4 shadow-[var(--admin-shadow-small)]"><div className="flex items-center justify-between gap-2 text-xs text-muted"><span className="flex items-center gap-1.5"><Icon className="h-3.5 w-3.5" />{label}</span>{ok ? <CheckCircle2 className="h-3.5 w-3.5 text-[var(--admin-status-green)]" /> : <AlertTriangle className="h-3.5 w-3.5 text-[var(--admin-status-amber)]" />}</div><p className="mt-4 font-mono text-sm text-foreground">{value}</p><p className="mt-1.5 text-[11px] text-muted">{detail}</p></div>;
}

function MetaRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return <div className="flex min-w-0 items-center gap-2"><Icon className="h-3.5 w-3.5 shrink-0 text-muted" /><span>{label}</span><span className="ml-auto max-w-[65%] truncate font-mono text-foreground/80">{value}</span></div>;
}
