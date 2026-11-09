"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Check,
  ExternalLink,
  Eye,
  Megaphone,
  Save,
} from "lucide-react";
import Link from "next/link";
import {
  AdminBadge,
  AdminButton,
  AdminErrorState,
  AdminField,
  AdminInput,
  AdminLoadingState,
  AdminPanel,
  AdminSegmentedControl,
  AdminTextarea,
} from "@/components/admin/admin-ui";

type Locale = "zh-CN" | "en";

interface AnnouncementRecord {
  locale: Locale;
  enabled: boolean;
  title: string;
  body: string;
  cta_label: string | null;
  cta_href: string | null;
  starts_at: string | null;
  ends_at: string | null;
  updated_at: string | null;
}

interface FormState {
  enabled: boolean;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  startsAt: string;
  endsAt: string;
}

const EMPTY_FORM: Record<Locale, FormState> = {
  "zh-CN": {
    enabled: false,
    title: "",
    body: "",
    ctaLabel: "查看详情",
    ctaHref: "/zh/changelog",
    startsAt: "",
    endsAt: "",
  },
  en: {
    enabled: false,
    title: "",
    body: "",
    ctaLabel: "View details",
    ctaHref: "/en/changelog",
    startsAt: "",
    endsAt: "",
  },
};

export function SiteContentEditor() {
  const [locale, setLocale] = useState<Locale>("zh-CN");
  const [forms, setForms] = useState<Record<Locale, FormState>>(EMPTY_FORM);
  const [updatedAt, setUpdatedAt] = useState<Record<Locale, string | null>>({
    "zh-CN": null,
    en: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingLocale, setSavingLocale] = useState<Locale | null>(null);
  const [conflict, setConflict] = useState<{
    locale: Locale;
    latest: AnnouncementRecord | null;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const draftRevision = useRef<Record<Locale, number>>({ "zh-CN": 0, en: 0 });

  const load = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/site-announcement", {
        cache: "no-store",
        signal,
      });
      const payload = (await response.json().catch(() => null)) as
        | { announcements?: AnnouncementRecord[]; error?: string }
        | null;
      if (!response.ok) throw new Error(payload?.error ?? "加载内容失败。");

      const nextForms = { ...EMPTY_FORM };
      const nextUpdatedAt: Record<Locale, string | null> = {
        "zh-CN": null,
        en: null,
      };
      for (const record of payload?.announcements ?? []) {
        nextForms[record.locale] = toFormState(record);
        nextUpdatedAt[record.locale] = record.updated_at;
      }
      if (!signal?.aborted) {
        setForms(nextForms);
        setUpdatedAt(nextUpdatedAt);
        setConflict(null);
        draftRevision.current = {
          "zh-CN": draftRevision.current["zh-CN"] + 1,
          en: draftRevision.current.en + 1,
        };
      }
    } catch (err) {
      if (signal?.aborted) return;
      setError(err instanceof Error ? err.message : "加载内容失败。");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const form = forms[locale];
  const updateForm = (patch: Partial<FormState>) => {
    draftRevision.current[locale] += 1;
    setForms((current) => ({
      ...current,
      [locale]: { ...current[locale], ...patch },
    }));
    setNotice(null);
  };

  const save = async (options?: { expectedUpdatedAt: string | null }) => {
    const submittedLocale = locale;
    const submittedForm = { ...form };
    const submittedRevision = draftRevision.current[submittedLocale];
    const expectedRevision = options
      ? options.expectedUpdatedAt
      : updatedAt[submittedLocale];

    setSaving(true);
    setSavingLocale(submittedLocale);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch("/api/admin/site-announcement", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale: submittedLocale,
          enabled: submittedForm.enabled,
          title: submittedForm.title,
          body: submittedForm.body,
          ctaLabel: submittedForm.ctaLabel || null,
          ctaHref: submittedForm.ctaHref || null,
          startsAt: toIsoDate(submittedForm.startsAt),
          endsAt: toIsoDate(submittedForm.endsAt),
          expectedUpdatedAt: expectedRevision,
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        | {
            error?: string;
            announcement?: AnnouncementRecord;
            latestAnnouncement?: AnnouncementRecord | null;
          }
        | null;
      if (response.status === 409) {
        setConflict({
          locale: submittedLocale,
          latest: payload?.latestAnnouncement ?? null,
        });
        setError(payload?.error ?? "公告已被其他管理员更新。请检查服务器版本后再保存。");
        return;
      }
      if (!response.ok) throw new Error(payload?.error ?? "保存公告失败。");

      const savedAnnouncement = payload?.announcement;
      if (!savedAnnouncement) throw new Error("保存成功，但服务器没有返回公告版本。请重试读取后再编辑。");
      setUpdatedAt((current) => ({
        ...current,
        [submittedLocale]: savedAnnouncement.updated_at,
      }));
      setConflict((current) => current?.locale === submittedLocale ? null : current);
      const localeLabel = submittedLocale === "zh-CN" ? "中文" : "英文";
      const hasNewerEdits = draftRevision.current[submittedLocale] !== submittedRevision;
      setNotice(
        hasNewerEdits
          ? `${localeLabel}公告已保存；保存后继续编辑的内容仍未保存。`
          : `${localeLabel}公告已保存。`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存公告失败。");
    } finally {
      setSaving(false);
      setSavingLocale(null);
    }
  };

  const loadServerVersion = () => {
    if (!conflict || conflict.locale !== locale) return;
    const serverForm = conflict.latest ? toFormState(conflict.latest) : EMPTY_FORM[locale];
    setForms((current) => ({ ...current, [locale]: serverForm }));
    setUpdatedAt((current) => ({
      ...current,
      [locale]: conflict.latest?.updated_at ?? null,
    }));
    draftRevision.current[locale] += 1;
    setConflict(null);
    setError(null);
    setNotice("已载入服务器版本，本地草稿已替换。");
  };

  const overwriteServerVersion = () => {
    if (!conflict || conflict.locale !== locale) return;
    void save({ expectedUpdatedAt: conflict.latest?.updated_at ?? null });
  };

  if (loading) return <AdminLoadingState label="正在读取内容配置…" />;
  if (error && !form.title && !form.body) {
    return <AdminErrorState message={error} onRetry={() => void load()} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <AdminSegmentedControl<Locale>
          value={locale}
          onChange={(value) => {
            setLocale(value);
            setError(null);
            setNotice(null);
          }}
          ariaLabel="公告语言"
          options={[
            { value: "zh-CN", label: "中文公告" },
            { value: "en", label: "English" },
          ]}
        />
        <div className="flex items-center gap-3">
          {notice ? (
            <span className="flex items-center gap-1.5 text-xs text-[var(--admin-status-green)]">
              <Check className="h-3.5 w-3.5" />
              {notice}
            </span>
          ) : null}
          <AdminButton onClick={() => void save()} disabled={saving || !form.title.trim() || conflict?.locale === locale}>
            <Save className="h-4 w-4" />
            {saving
              ? savingLocale === locale
                ? "保存中…"
                : `${savingLocale === "zh-CN" ? "中文" : "英文"}公告保存中…`
              : "保存公告"}
          </AdminButton>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg bg-[color-mix(in_srgb,var(--admin-status-red)_10%,transparent)] px-4 py-3 text-sm text-[var(--admin-status-red)]" role="alert">
          {error}
        </div>
      ) : null}

      {conflict?.locale === locale ? (
        <AdminPanel className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            服务器版本已变化。当前草稿仍保留；你可以载入服务器版本，或明确选择用当前草稿覆盖。
          </p>
          <div className="flex shrink-0 flex-wrap gap-2">
            <AdminButton tone="ghost" onClick={loadServerVersion} disabled={saving}>
              载入服务器版本
            </AdminButton>
            <AdminButton onClick={overwriteServerVersion} disabled={saving || !form.title.trim()}>
              用当前草稿覆盖
            </AdminButton>
          </div>
        </AdminPanel>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <AdminPanel className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium">公告内容</p>
              <p className="mt-1 text-xs leading-5 text-muted">公告会显示在公开页面顶部，后台页面不会显示。</p>
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-xs text-muted">
              <input
                type="checkbox"
                checked={form.enabled}
                onChange={(event) => updateForm({ enabled: event.target.checked })}
                className="h-4 w-4 accent-[var(--admin-status-blue)]"
              />
              启用公告
            </label>
          </div>

          <div className="mt-6 space-y-5">
            <AdminField label="标题">
              <AdminInput
                value={form.title}
                onChange={(event) => updateForm({ title: event.target.value })}
                placeholder={locale === "zh-CN" ? "例如：本周更新已发布" : "For example: A new update is live"}
                maxLength={180}
              />
              <span className="text-right text-[11px] text-muted">{form.title.length}/180</span>
            </AdminField>
            <AdminField label="正文">
              <AdminTextarea
                value={form.body}
                onChange={(event) => updateForm({ body: event.target.value })}
                placeholder={locale === "zh-CN" ? "用一句话告诉访客发生了什么。" : "Tell visitors what changed in one sentence."}
                rows={5}
                maxLength={1000}
              />
              <span className="text-right text-[11px] text-muted">{form.body.length}/1000</span>
            </AdminField>
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="按钮文字（可选）">
                <AdminInput value={form.ctaLabel} onChange={(event) => updateForm({ ctaLabel: event.target.value })} maxLength={80} />
              </AdminField>
              <AdminField label="按钮链接（可选）">
                <AdminInput value={form.ctaHref} onChange={(event) => updateForm({ ctaHref: event.target.value })} placeholder="/zh/changelog" maxLength={500} />
              </AdminField>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="开始显示（可选）">
                <AdminInput type="datetime-local" value={form.startsAt} onChange={(event) => updateForm({ startsAt: event.target.value })} />
              </AdminField>
              <AdminField label="结束显示（可选）">
                <AdminInput type="datetime-local" value={form.endsAt} onChange={(event) => updateForm({ endsAt: event.target.value })} />
              </AdminField>
            </div>
          </div>
        </AdminPanel>

        <PreviewPanel locale={locale} form={form} />
      </div>

      <AdminPanel className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Megaphone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--admin-status-blue)]" />
          <div className="text-xs leading-5 text-muted">
            <p className="font-medium text-foreground">发布提示</p>
            <p className="mt-1">关闭公告不会删除内容；之后重新启用即可恢复。设置有效期可以提前安排公告自动上线和下线。</p>
          </div>
        </div>
      </AdminPanel>
    </div>
  );
}

function PreviewPanel({ locale, form }: { locale: Locale; form: FormState }) {
  const previewHref = form.ctaHref.trim() || (locale === "zh-CN" ? "/zh/changelog" : "/en/changelog");
  const previewLabel = form.ctaLabel.trim() || (locale === "zh-CN" ? "查看详情" : "View details");
  const previewTitle = form.title.trim() || (locale === "zh-CN" ? "公告标题会显示在这里" : "Announcement title appears here");

  return (
    <AdminPanel className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--admin-border-soft)] px-5 py-4">
        <div className="flex items-center gap-2"><Eye className="h-4 w-4 text-muted" /><p className="text-sm font-medium">实时预览</p></div>
        <AdminBadge tone={form.enabled ? "success" : "neutral"}>{form.enabled ? "已启用" : "已关闭"}</AdminBadge>
      </div>
      <div className="min-h-[260px] bg-[var(--admin-canvas)] p-5 sm:p-6">
        <div className="overflow-hidden rounded-lg bg-foreground text-background shadow-[var(--admin-shadow-medium)]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 text-sm font-medium">
            <span className="text-[10px] uppercase tracking-[0.16em] opacity-60">{locale === "zh-CN" ? "站点公告" : "Announcement"}</span>
            <span className="min-w-0 flex-1 truncate">{previewTitle}</span>
            <Link href={previewHref} className="shrink-0 underline underline-offset-2 opacity-80 hover:opacity-100">
              {previewLabel}
              <ExternalLink className="ml-1 inline h-3 w-3" />
            </Link>
          </div>
          {form.body.trim() ? <p className="border-t border-background/15 px-4 py-3 text-xs leading-5 opacity-75">{form.body}</p> : null}
        </div>
        <p className="mt-5 text-xs leading-5 text-muted">这是公开页面顶部横幅的缩略预览。</p>
      </div>
    </AdminPanel>
  );
}

function toFormState(record: AnnouncementRecord): FormState {
  return {
    enabled: record.enabled,
    title: record.title,
    body: record.body,
    ctaLabel: record.cta_label ?? "",
    ctaHref: record.cta_href ?? "",
    startsAt: toDateInput(record.starts_at),
    endsAt: toDateInput(record.ends_at),
  };
}

function toDateInput(value: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function toIsoDate(value: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}
