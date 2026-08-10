"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  RefreshCw,
  ShieldCheck,
  Upload,
} from "lucide-react";
import {
  AdminBadge,
  AdminButton,
  AdminErrorState,
  AdminField,
  AdminInput,
  AdminLoadingState,
  AdminPanel,
  AdminSection,
  AdminSelect,
} from "@/components/admin/admin-ui";
import {
  useAdminProductValidation,
  type ApiFetcherError,
  type ProductValidationAdminData,
} from "@/lib/swr";

type InterviewDraft = {
  interviewId: string;
  occurredAt: string;
  participantIdentityKey: string;
  icpStatus: "qualified" | "edge" | "not_qualified";
  primaryVariantId: "pack-29" | "pack-49" | "";
  contactVerificationMethod: "authenticated_account" | "verified_email" | "manual_interview";
  evidenceLogSha256: string;
  evidenceSource: "interview_notes" | "transcript" | "payment_provider" | "manual_reconciliation";
  priceAccepted: boolean;
  depositLinkRequested: boolean;
  checkoutStarted: boolean;
  nonRefundableDepositPaid: boolean;
  protocolDeviation: boolean;
  withdrawn: boolean;
};

function createInterviewDraft(): InterviewDraft {
  const stamp = new Date();
  const date = stamp.toISOString().slice(0, 10).replaceAll("-", "");
  return {
    interviewId: `INT-${date}-001`,
    occurredAt: toDateTimeInput(stamp.toISOString()),
    participantIdentityKey: "",
    icpStatus: "qualified",
    primaryVariantId: "",
    contactVerificationMethod: "manual_interview",
    evidenceLogSha256: "sha256:",
    evidenceSource: "interview_notes",
    priceAccepted: false,
    depositLinkRequested: false,
    checkoutStarted: false,
    nonRefundableDepositPaid: false,
    protocolDeviation: false,
    withdrawn: false,
  };
}

export function ProductValidationContent() {
  const { data, error, isLoading, isValidating, mutate } = useAdminProductValidation();
  const [draft, setDraft] = useState<InterviewDraft>(createInterviewDraft);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  if (isLoading && !data) return <AdminLoadingState label="正在读取实验证据…" />;
  if (error && !data) {
    const validationError = error as ApiFetcherError;
    if (validationError.code === "product_validation_migration_required") {
      return <ProductValidationMigrationState error={validationError} onRetry={() => void mutate()} />;
    }
    return <AdminErrorState message="产品验证数据暂时无法加载。" onRetry={() => void mutate()} />;
  }
  if (!data) return null;

  async function saveInterview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setNotice(null);
    try {
      const response = await fetch("/api/admin/product-validation/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...draft,
          occurredAt: new Date(draft.occurredAt).toISOString(),
          primaryVariantId: draft.primaryVariantId || null,
          consentRecorded: true,
        }),
      });
      const payload = (await response.json().catch(() => null)) as { error?: string; interviewId?: string } | null;
      if (!response.ok) throw new Error(payload?.error ?? "访谈证据保存失败。");
      setNotice(`已保存 ${payload?.interviewId ?? draft.interviewId}。`);
      setDraft(createInterviewDraft());
      await mutate();
    } catch (saveError) {
      setNotice(saveError instanceof Error ? saveError.message : "访谈证据保存失败。");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">
          {isValidating ? "正在刷新证据…" : `最后生成于 ${formatDate(data.generatedAt)}`}
        </p>
        <div className="flex flex-wrap gap-2">
          <AdminButton size="sm" onClick={() => void mutate()}>
            <RefreshCw className="h-3.5 w-3.5" />刷新
          </AdminButton>
          <AdminButton size="sm" onClick={() => { window.location.href = "/api/admin/product-validation/export"; }}>
            <Download className="h-3.5 w-3.5" />导出证据
          </AdminButton>
        </div>
      </div>

      <ReadinessBanner data={data} />
      <FunnelRail data={data} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <VariantTable data={data} />
        <EvidenceChecklist data={data} />
      </div>

      <InterviewForm
        draft={draft}
        saving={saving}
        notice={notice}
        onChange={(patch) => setDraft((current) => ({ ...current, ...patch }))}
        onSubmit={saveInterview}
      />
    </div>
  );
}

function ProductValidationMigrationState({
  error,
  onRetry,
}: {
  error: ApiFetcherError;
  onRetry: () => void;
}) {
  return (
    <AdminPanel className="overflow-hidden" role="status">
      <div className="border-l-4 border-[var(--admin-status-red)] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--admin-status-red)]" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium">产品验证数据尚未接入</p>
              <AdminBadge tone="danger">需要迁移</AdminBadge>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              当前环境没有三张产品验证数据表，因此页面不会用空数据伪装成“尚未发生证据”。这只是状态提示，不会自动执行迁移。
            </p>
            {error.migration ? (
              <p className="mt-3 break-words font-mono text-xs leading-5 text-muted">
                {error.migration}
              </p>
            ) : null}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href="/admin/system"
                className="inline-flex h-10 items-center rounded-md bg-foreground px-3 text-sm text-background shadow-[var(--admin-shadow-border)] transition-colors hover:bg-[var(--admin-primary-hover)]"
              >
                查看发布前检查
              </Link>
              <button
                type="button"
                onClick={onRetry}
                className="text-sm text-muted underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
              >
                重新读取
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminPanel>
  );
}

function ReadinessBanner({ data }: { data: ProductValidationAdminData }) {
  const ready = data.readiness.status === "ready";
  return (
    <AdminPanel className="overflow-hidden">
      <div className={`flex flex-col gap-4 border-l-4 p-5 sm:flex-row sm:items-center sm:justify-between ${ready ? "border-[var(--admin-status-green)]" : "border-[var(--admin-status-amber)]"}`}>
        <div className="flex items-start gap-3">
          {ready ? <CheckCircle2 className="mt-0.5 h-5 w-5 text-[var(--admin-status-green)]" /> : <AlertTriangle className="mt-0.5 h-5 w-5 text-[var(--admin-status-amber)]" />}
          <div>
            <p className="text-sm font-medium">{ready ? "实验准入条件已满足" : "实验仍有阻断条件"}</p>
            <p className="mt-1 text-xs leading-5 text-muted">
              {data.experiment.id} · {data.experiment.offerVersion} · {lifecycleLabel(data.experiment.lifecycle)}
            </p>
          </div>
        </div>
        <AdminBadge tone={ready ? "success" : "warning"}>{ready ? "READY" : "BLOCKED"}</AdminBadge>
      </div>
    </AdminPanel>
  );
}

function FunnelRail({ data }: { data: ProductValidationAdminData }) {
  const items = [
    ["合格访客", data.funnel.qualifiedVisitors, "先通过 ICP 资格"],
    ["完整曝光", data.funnel.offerExposures, "交付物与报价均已看到"],
    ["价格接受", data.funnel.priceAcceptances, "已验证的软意向"],
    ["合格访谈", data.funnel.qualifiedInterviews, "人工证据记录"],
  ] as const;
  return (
    <section aria-label="实验漏斗">
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">Evidence path</p>
          <h2 className="mt-1 text-lg font-semibold">证据漏斗</h2>
        </div>
        <p className="text-xs text-muted">最近证据：{data.latestEvidenceAt ? formatDate(data.latestEvidenceAt) : "暂无"}</p>
      </div>
      <div className="grid overflow-hidden rounded-xl bg-[var(--admin-border-soft)] shadow-[var(--admin-shadow-border)] sm:grid-cols-2 xl:grid-cols-4">
        {items.map(([label, value, description]) => (
          <div key={label} className="bg-[var(--admin-panel)] p-5">
            <p className="text-xs text-muted">{label}</p>
            <p className="mt-3 font-mono text-3xl font-semibold tracking-[-0.05em] tabular-nums">{value.toLocaleString("zh-CN")}</p>
            <p className="mt-2 text-xs leading-5 text-muted">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function VariantTable({ data }: { data: ProductValidationAdminData }) {
  return (
    <AdminSection title="价格分组" description="只展示去重后的合格参与者和证据数量，不展示身份明细。">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-[var(--admin-border-soft)] text-left text-xs text-muted">
              <th className="pb-3 font-medium">分组</th>
              <th className="pb-3 font-medium">价格</th>
              <th className="pb-3 text-right font-medium">合格访客</th>
              <th className="pb-3 text-right font-medium">完整曝光</th>
              <th className="pb-3 text-right font-medium">价格接受</th>
            </tr>
          </thead>
          <tbody>
            {data.experiment.variants.map((variant) => (
              <tr key={variant.id} className="border-b border-[var(--admin-border-soft)] last:border-0">
                <td className="py-4 font-mono text-xs">{variant.id}</td>
                <td className="py-4 font-mono">{formatMoney(variant.amountMinor, variant.currency)}</td>
                <td className="py-4 text-right tabular-nums">{variant.qualifiedVisitors}</td>
                <td className="py-4 text-right tabular-nums">{Math.min(variant.offerExposures, variant.priceExposures)}</td>
                <td className="py-4 text-right tabular-nums">{variant.priceAcceptances}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminSection>
  );
}

function EvidenceChecklist({ data }: { data: ProductValidationAdminData }) {
  return (
    <AdminSection title="准入检查" description="商业销售和真实结账仍由明确授权与独立证据控制。">
      <div className="space-y-3">
        {data.readiness.checks.map((check) => (
          <div key={check.id} className="flex items-start gap-3 text-xs leading-5">
            <StatusIcon status={check.status} />
            <span className="text-muted">{check.message}</span>
          </div>
        ))}
      </div>
    </AdminSection>
  );
}

function InterviewForm({
  draft,
  saving,
  notice,
  onChange,
  onSubmit,
}: {
  draft: InterviewDraft;
  saving: boolean;
  notice: string | null;
  onChange: (patch: Partial<InterviewDraft>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <AdminSection
      title="录入访谈证据"
      description="只录入已获得同意、可由证据文件哈希核验的结果；不要填写姓名、公司名或项目机密。"
      badge={<AdminBadge tone="info"><FileText className="mr-1 h-3 w-3" />人工证据</AdminBadge>}
    >
      <form onSubmit={onSubmit} className="grid gap-4 lg:grid-cols-3">
        <AdminField label="访谈编号">
          <AdminInput value={draft.interviewId} onChange={(event) => onChange({ interviewId: event.target.value })} pattern="INT-[0-9]{6}-[0-9]{3,6}" required />
        </AdminField>
        <AdminField label="发生时间">
          <AdminInput type="datetime-local" value={draft.occurredAt} onChange={(event) => onChange({ occurredAt: event.target.value })} required />
        </AdminField>
        <AdminField label="去标识参与者 Key">
          <AdminInput value={draft.participantIdentityKey} onChange={(event) => onChange({ participantIdentityKey: event.target.value })} placeholder="hmac:… 或 anon:…" required />
        </AdminField>
        <AdminField label="ICP 状态">
          <AdminSelect value={draft.icpStatus} onChange={(event) => onChange({ icpStatus: event.target.value as InterviewDraft["icpStatus"] })}>
            <option value="qualified">qualified</option>
            <option value="edge">edge</option>
            <option value="not_qualified">not_qualified</option>
          </AdminSelect>
        </AdminField>
        <AdminField label="价格分组（可选）">
          <AdminSelect value={draft.primaryVariantId} onChange={(event) => onChange({ primaryVariantId: event.target.value as InterviewDraft["primaryVariantId"] })}>
            <option value="">未指定</option>
            <option value="pack-29">pack-29</option>
            <option value="pack-49">pack-49</option>
          </AdminSelect>
        </AdminField>
        <AdminField label="联系方式核验">
          <AdminSelect value={draft.contactVerificationMethod} onChange={(event) => onChange({ contactVerificationMethod: event.target.value as InterviewDraft["contactVerificationMethod"] })}>
            <option value="manual_interview">manual_interview</option>
            <option value="authenticated_account">authenticated_account</option>
            <option value="verified_email">verified_email</option>
          </AdminSelect>
        </AdminField>
        <AdminField label="证据 SHA-256">
          <AdminInput className="lg:col-span-2" value={draft.evidenceLogSha256} onChange={(event) => onChange({ evidenceLogSha256: event.target.value })} placeholder="sha256:…" pattern="sha256:[0-9a-f]{64}" required />
        </AdminField>
        <AdminField label="证据来源">
          <AdminSelect value={draft.evidenceSource} onChange={(event) => onChange({ evidenceSource: event.target.value as InterviewDraft["evidenceSource"] })}>
            <option value="interview_notes">interview_notes</option>
            <option value="transcript">transcript</option>
            <option value="payment_provider">payment_provider</option>
            <option value="manual_reconciliation">manual_reconciliation</option>
          </AdminSelect>
        </AdminField>
        <div className="grid gap-2 sm:col-span-2 lg:col-span-3 sm:grid-cols-2 xl:grid-cols-4">
          <BooleanField label="接受当前价格" checked={draft.priceAccepted} onChange={(checked) => onChange({ priceAccepted: checked })} />
          <BooleanField label="索要订金链接" checked={draft.depositLinkRequested} onChange={(checked) => onChange({ depositLinkRequested: checked })} />
          <BooleanField label="开始结账" checked={draft.checkoutStarted} onChange={(checked) => onChange({ checkoutStarted: checked })} />
          <BooleanField label="已付不可退订金" checked={draft.nonRefundableDepositPaid} onChange={(checked) => onChange({ nonRefundableDepositPaid: checked })} />
          <BooleanField label="存在协议偏差" checked={draft.protocolDeviation} onChange={(checked) => onChange({ protocolDeviation: checked })} />
          <BooleanField label="参与者已退出" checked={draft.withdrawn} onChange={(checked) => onChange({ withdrawn: checked })} />
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:col-span-2 lg:col-span-3">
          <AdminButton type="submit" disabled={saving}>
            {saving ? <Clock3 className="h-4 w-4 animate-pulse" /> : <Upload className="h-4 w-4" />}
            {saving ? "保存中…" : "保存访谈证据"}
          </AdminButton>
          {notice ? <span className="text-xs text-muted" role="status">{notice}</span> : null}
        </div>
      </form>
    </AdminSection>
  );
}

function BooleanField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex min-h-10 items-center gap-2 rounded-md bg-[var(--admin-input)] px-3 text-xs text-muted shadow-[var(--admin-shadow-border)]">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 accent-[var(--admin-status-blue)]" />
      {label}
    </label>
  );
}

function StatusIcon({ status }: { status: "pass" | "blocked" | "pending" | "warning" }) {
  if (status === "pass") return <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--admin-status-green)]" />;
  if (status === "blocked") return <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--admin-status-red)]" />;
  return <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--admin-status-amber)]" />;
}

function formatMoney(amountMinor: number, currency: string) {
  return new Intl.NumberFormat("zh-CN", { style: "currency", currency, maximumFractionDigits: 0 }).format(amountMinor / 100);
}

function lifecycleLabel(value: ProductValidationAdminData["experiment"]["lifecycle"]) {
  return { planned: "计划阶段", collecting: "采集中", ended: "已结束" }[value];
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "时间未知" : new Intl.DateTimeFormat("zh-CN", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function toDateTimeInput(value: string) {
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}
