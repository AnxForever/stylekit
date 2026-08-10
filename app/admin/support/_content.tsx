"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  Eye,
  EyeOff,
  ImagePlus,
  Loader2,
  Pencil,
  RefreshCw,
  Save,
  Search,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import {
  AdminBadge,
  AdminButton,
  AdminEmptyState,
  AdminErrorState,
  AdminField,
  AdminInput,
  AdminLoadingState,
  AdminSection,
  AdminSelect,
} from "@/components/admin/admin-ui";

interface Acknowledgment {
  id: string;
  donated_on: string;
  donor_label: string;
  amount: string | null;
  receipt_path: string;
  receipt_alt: string | null;
  published: boolean;
  created_at: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function getTodayInputValue(): string {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${today.getFullYear()}-${month}-${day}`;
}

export function SponsorAcknowledgmentsContent() {
  const [items, setItems] = useState<Acknowledgment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [donorLabel, setDonorLabel] = useState("匿名支持者");
  const [amount, setAmount] = useState("");
  const [donatedOn, setDonatedOn] = useState(getTodayInputValue);
  const [publishImmediately, setPublishImmediately] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState({ donorLabel: "", amount: "" });
  const [savingEditId, setSavingEditId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [noticeTone, setNoticeTone] = useState<"success" | "error">("error");
  const [query, setQuery] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState<"all" | "published" | "unpublished">("all");
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchItems = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/support-acknowledgments", {
        cache: "no-store",
        signal,
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error ?? "加载赞助公告失败。");
      if (!signal?.aborted) setItems(payload.acknowledgments ?? []);
    } catch (err) {
      if (signal?.aborted) return;
      setError(err instanceof Error ? err.message : "加载赞助公告失败。");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void fetchItems(controller.signal);
    return () => controller.abort();
  }, [fetchItems]);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const publishedCount = useMemo(() => items.filter((item) => item.published).length, [items]);
  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return items.filter((item) => {
      if (visibilityFilter === "published" && !item.published) return false;
      if (visibilityFilter === "unpublished" && item.published) return false;
      if (!normalizedQuery) return true;
      return [item.donor_label, item.amount ?? "", item.donated_on]
        .join(" ")
        .toLocaleLowerCase()
        .includes(normalizedQuery);
    });
  }, [items, query, visibilityFilter]);
  const hasFilters = query.trim().length > 0 || visibilityFilter !== "all";

  function resetFileInput() {
    if (inputRef.current) inputRef.current.value = "";
  }

  function chooseFile(nextFile: File | null) {
    setNotice(null);
    if (!nextFile) {
      setFile(null);
      resetFileInput();
      return;
    }
    if (!ACCEPTED_TYPES.includes(nextFile.type)) {
      setFile(null);
      resetFileInput();
      setNoticeTone("error");
      setNotice("仅支持 JPG、PNG 或 WebP 图片。");
      return;
    }
    if (nextFile.size > MAX_FILE_SIZE) {
      setFile(null);
      resetFileInput();
      setNoticeTone("error");
      setNotice("图片大小不能超过 10MB。");
      return;
    }
    setFile(nextFile);
  }

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setNoticeTone("error");
      setNotice("请先选择一张收款截图。");
      return;
    }

    setUploading(true);
    setNotice(null);
    const formData = new FormData();
    formData.set("file", file);
    formData.set("donorLabel", donorLabel);
    formData.set("amount", amount);
    formData.set("donatedOn", donatedOn);
    formData.set("published", String(publishImmediately));

    try {
      const response = await fetch("/api/admin/support-acknowledgments", {
        method: "POST",
        body: formData,
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error ?? "发布赞助公告失败。");
      setFile(null);
      resetFileInput();
      setDonorLabel("匿名支持者");
      setAmount("");
      setPublishImmediately(true);
      setNoticeTone("success");
      setNotice("已发布。公开支持页和首页感谢弹窗会使用这条记录。");
      await fetchItems();
    } catch (err) {
      setNoticeTone("error");
      setNotice(err instanceof Error ? err.message : "发布赞助公告失败。");
    } finally {
      setUploading(false);
    }
  }

  async function togglePublished(item: Acknowledgment) {
    setBusyId(item.id);
    setNotice(null);
    try {
      const response = await fetch(`/api/admin/support-acknowledgments/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !item.published }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error ?? "更新发布状态失败。");
      setItems((current) =>
        current.map((candidate) =>
          candidate.id === item.id ? { ...candidate, published: !item.published } : candidate
        )
      );
    } catch (err) {
      setNoticeTone("error");
      setNotice(err instanceof Error ? err.message : "更新发布状态失败。");
    } finally {
      setBusyId(null);
    }
  }

  function beginEdit(item: Acknowledgment) {
    setEditingId(item.id);
    setEditDraft({ donorLabel: item.donor_label, amount: item.amount ?? "" });
    setNotice(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditDraft({ donorLabel: "", amount: "" });
  }

  async function saveEdit(item: Acknowledgment) {
    const donorLabel = editDraft.donorLabel.trim() || "匿名支持者";
    const amount = editDraft.amount.trim();
    setSavingEditId(item.id);
    setNotice(null);
    try {
      const response = await fetch(`/api/admin/support-acknowledgments/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donorLabel, amount }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error ?? "保存赞助信息失败。");
      setItems((current) =>
        current.map((candidate) =>
          candidate.id === item.id
            ? { ...candidate, donor_label: donorLabel, amount: amount || null }
            : candidate
        )
      );
      cancelEdit();
      setNoticeTone("success");
      setNotice("赞助显示信息已更新。");
    } catch (err) {
      setNoticeTone("error");
      setNotice(err instanceof Error ? err.message : "保存赞助信息失败。");
    } finally {
      setSavingEditId(null);
    }
  }

  async function removeItem(item: Acknowledgment) {
    if (!window.confirm("删除这条赞助公告？图片也会从 Storage 中移除。")) return;
    setBusyId(item.id);
    setNotice(null);
    try {
      const response = await fetch(`/api/admin/support-acknowledgments/${item.id}`, {
        method: "DELETE",
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error ?? "删除赞助公告失败。");
      setItems((current) => current.filter((candidate) => candidate.id !== item.id));
      if (payload?.warning) {
        setNoticeTone("error");
        setNotice(payload.warning);
      } else {
        setNoticeTone("success");
        setNotice("赞助公告和图片已删除。");
      }
    } catch (err) {
      setNoticeTone("error");
      setNotice(err instanceof Error ? err.message : "删除赞助公告失败。");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-6">
      <AdminSection
        title="发布一条新的赞助公告"
        description="上传后可以立即公开，也可以先保存为未公开记录，核对截图和金额后再发布。"
        badge={<AdminBadge tone="info">{publishedCount} 条正在展示</AdminBadge>}
      >
        <form onSubmit={handleUpload} className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
          <div>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={(event) => chooseFile(event.target.files?.[0] ?? null)}
            />
            <button
              type="button"
              className="group relative flex min-h-[320px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-[var(--admin-border-emphasis)] bg-[var(--admin-input)] p-6 text-center transition-colors hover:border-foreground hover:bg-[var(--admin-hover)]"
              onClick={() => inputRef.current?.click()}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                chooseFile(event.dataTransfer.files?.[0] ?? null);
              }}
            >
              {previewUrl ? (
                // Blob previews are local-only and cannot use Next's image loader.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt="待上传的赞助截图预览" className="max-h-[280px] max-w-full rounded-lg object-contain shadow-sm" />
              ) : (
                <>
                  <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--admin-panel)] text-muted shadow-[var(--admin-shadow-small)] transition-transform group-hover:-translate-y-1">
                    <ImagePlus className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <span className="text-sm font-medium text-foreground">拖入截图，或点击选择</span>
                  <span className="mt-2 text-xs leading-5 text-muted">JPG / PNG / WebP · 最大 10MB</span>
                </>
              )}
              {file ? (
                <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-md bg-black/70 px-3 py-2 text-left text-xs text-white">
                  <span className="min-w-0 truncate">{file.name}</span>
                  <span className="ml-3 shrink-0">重新选择</span>
                </span>
              ) : null}
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <AdminField label="赞助日期">
                <AdminInput type="date" value={donatedOn} onChange={(event) => setDonatedOn(event.target.value)} required />
              </AdminField>
              <AdminField label="显示名称">
                <AdminInput value={donorLabel} onChange={(event) => setDonorLabel(event.target.value)} placeholder="匿名支持者" maxLength={80} />
              </AdminField>
            </div>
            <AdminField label="金额（可选）">
              <AdminInput value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="例如 ¥66.66" maxLength={40} />
            </AdminField>
            <div className="rounded-lg border border-[var(--admin-border-soft)] bg-[var(--admin-input)] p-3 text-xs leading-5 text-muted">
              <p className="font-medium text-[var(--admin-text-secondary)]">发布后会发生什么？</p>
              <p className="mt-1">截图会上传到公开 Storage；只有公开记录会出现在支持页鸣谢名单和首页感谢弹窗。</p>
            </div>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-[var(--admin-border-soft)] bg-[var(--admin-input)] p-3 text-xs leading-5">
              <input
                type="checkbox"
                checked={publishImmediately}
                onChange={(event) => setPublishImmediately(event.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--admin-status-blue)]"
              />
              <span>
                <span className="block font-medium text-[var(--admin-text-secondary)]">上传后立即公开</span>
                <span className="mt-0.5 block text-muted">关闭后会保存到“未公开赞助”，不会出现在公开页面。</span>
              </span>
            </label>
            {notice ? <p className={`text-xs leading-5 ${noticeTone === "success" ? "text-[var(--admin-status-green)]" : "text-[var(--admin-status-red)]"}`} role="status">{notice}</p> : null}
            <AdminButton type="submit" tone="primary" disabled={uploading} className="w-full sm:w-auto sm:self-start">
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
              {uploading ? "正在上传…" : publishImmediately ? "上传并发布" : "上传为未公开"}
            </AdminButton>
          </div>
        </form>
      </AdminSection>

      {loading ? <AdminLoadingState label="正在读取赞助公告…" /> : null}
      {error ? <AdminErrorState message={error} onRetry={() => void fetchItems()} /> : null}
      {!loading && !error && items.length === 0 ? (
        <AdminEmptyState title="还没有赞助公告" description="上传第一张截图后，它会出现在这里。" />
      ) : null}
      {!loading && !error && items.length > 0 ? (
        <AdminSection
          title="现有公告"
          description="关闭发布只会从公开页面隐藏，不会删除图片；删除操作会同时清理 Storage 文件。"
          actions={
            <div className="flex flex-wrap gap-2">
              {hasFilters ? (
                <AdminButton
                  size="sm"
                  onClick={() => {
                    setQuery("");
                    setVisibilityFilter("all");
                  }}
                >
                  <X className="h-3.5 w-3.5" />清除筛选
                </AdminButton>
              ) : null}
              <AdminButton size="sm" onClick={() => void fetchItems()}><RefreshCw className="h-3.5 w-3.5" />刷新</AdminButton>
            </div>
          }
        >
          <div className="mb-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_180px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <AdminInput
                aria-label="搜索赞助公告"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索名称、金额或日期"
                className="pl-9"
              />
            </div>
            <AdminSelect
              aria-label="筛选赞助公告状态"
              value={visibilityFilter}
              onChange={(event) => setVisibilityFilter(event.target.value as typeof visibilityFilter)}
            >
              <option value="all">全部记录（{items.length}）</option>
              <option value="published">公开展示（{publishedCount}）</option>
              <option value="unpublished">未公开（{items.length - publishedCount}）</option>
            </AdminSelect>
          </div>
          {filteredItems.length === 0 ? (
            <AdminEmptyState
              title="没有匹配的赞助记录"
              description="换一个名称、金额或日期，或清除筛选条件。"
            />
          ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-xl bg-[var(--admin-input)] shadow-[var(--admin-shadow-border)]">
                <div className="relative aspect-[4/3] bg-white">
                  {/* Public Storage URLs may belong to a configured or legacy project host. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.receipt_path} alt={item.receipt_alt ?? `${item.donor_label} 的赞助截图`} className="h-full w-full object-contain" />
                  <div className="absolute left-3 top-3">
                    <AdminBadge tone={item.published ? "success" : "warning"}>
                      {item.published ? "公开展示" : "已隐藏"}
                    </AdminBadge>
                  </div>
                </div>
                <div className="space-y-3 p-4">
                  {editingId === item.id ? (
                    <div className="space-y-3">
                      <AdminField label="显示名称">
                        <AdminInput
                          value={editDraft.donorLabel}
                          onChange={(event) => setEditDraft((current) => ({ ...current, donorLabel: event.target.value }))}
                          maxLength={80}
                          autoFocus
                        />
                      </AdminField>
                      <AdminField label="金额（可选）">
                        <AdminInput
                          value={editDraft.amount}
                          onChange={(event) => setEditDraft((current) => ({ ...current, amount: event.target.value }))}
                          placeholder="例如 ¥66.66"
                          maxLength={40}
                        />
                      </AdminField>
                      <div className="flex gap-2">
                        <AdminButton size="sm" tone="primary" className="flex-1" disabled={savingEditId === item.id} onClick={() => void saveEdit(item)}>
                          {savingEditId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                          保存信息
                        </AdminButton>
                        <AdminButton size="sm" disabled={savingEditId === item.id} onClick={cancelEdit}>
                          <X className="h-3.5 w-3.5" />取消
                        </AdminButton>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">{item.donor_label}</p>
                          <p className="mt-1 font-mono text-[11px] text-muted">{item.donated_on}{item.amount ? ` · ${item.amount}` : ""}</p>
                        </div>
                        {busyId === item.id ? <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted" /> : null}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <AdminButton size="sm" className="flex-1" disabled={busyId === item.id} onClick={() => void togglePublished(item)}>
                          {item.published ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          {item.published ? "隐藏" : "发布"}
                        </AdminButton>
                        <AdminButton size="sm" disabled={busyId === item.id} onClick={() => beginEdit(item)}>
                          <Pencil className="h-3.5 w-3.5" />编辑
                        </AdminButton>
                        <AdminButton size="sm" tone="danger" disabled={busyId === item.id} onClick={() => void removeItem(item)}>
                          <Trash2 className="h-3.5 w-3.5" />删除
                        </AdminButton>
                      </div>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
          )}
        </AdminSection>
      ) : null}
    </div>
  );
}
