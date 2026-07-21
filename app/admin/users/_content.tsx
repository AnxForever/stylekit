"use client";

import {
  Fragment,
  useCallback,
  useDeferredValue,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
import {
  EMPEROR_TITLE_TOKEN,
  EARLY_USER_TITLE_TOKEN,
  normalizeTitleIconPathInput,
  SITE_OWNER_TITLE_TOKEN,
  USER_TITLE_ICON_PATH_MAX_LENGTH,
} from "@/lib/auth/user-title-policy";
import {
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Trash2,
} from "lucide-react";
import {
  AdminButton,
  AdminCountPill,
  AdminEmptyState,
  AdminErrorState,
  AdminInput,
  AdminLoadingState,
  AdminPagination,
  AdminPanel,
  AdminTableShell,
  AdminToolbar,
} from "@/components/admin/admin-ui";
import { useAdminUsers, type AdminUser } from "@/lib/swr";
import { getAvatarImageSrc } from "@/lib/avatar";

const PAGE_SIZE = 20;
const PRESET_TITLE_COLORS = [
  { value: "#d97706", label: "琥珀" },
  { value: "#dc2626", label: "赤红" },
  { value: "#7c3aed", label: "皇家紫" },
  { value: "#2563eb", label: "深蓝" },
  { value: "#0891b2", label: "青色" },
  { value: "#16a34a", label: "翠绿" },
  { value: "#be185d", label: "玫红" },
  { value: "#475569", label: "石板" },
] as const;

interface TitleDraft {
  customTitle: string;
  titleColor: string;
  titleIconPath: string;
  isOwner: boolean;
  titleEnabled: boolean;
}

const HEX_COLOR_RE = /^#[0-9a-f]{6}$/i;

function formatResolvedTitle(title: string | null): string | null {
  if (!title) {
    return null;
  }
  if (title === SITE_OWNER_TITLE_TOKEN) {
    return "秦始皇";
  }
  if (title === EMPEROR_TITLE_TOKEN) {
    return "秦始皇";
  }
  if (title === EARLY_USER_TITLE_TOKEN) {
    return "元老用户";
  }
  return title;
}

function getTitleBadgeClass(title: string | null): string {
  if (title === EMPEROR_TITLE_TOKEN) {
    return "border-amber-300/80 bg-amber-100 text-amber-800 dark:border-amber-700 dark:bg-amber-900/40 dark:text-amber-200";
  }
  if (title === EARLY_USER_TITLE_TOKEN) {
    return "border-sky-300/80 bg-sky-100 text-sky-800 dark:border-sky-700 dark:bg-sky-900/40 dark:text-sky-200";
  }
  if (title === SITE_OWNER_TITLE_TOKEN) {
    return "border-violet-300/80 bg-violet-100 text-violet-800 dark:border-violet-700 dark:bg-violet-900/40 dark:text-violet-200";
  }
  return "border-rose-300/80 bg-rose-100 text-rose-800 dark:border-rose-700 dark:bg-rose-900/40 dark:text-rose-200";
}

function normalizeHexColor(value: string | null | undefined): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  if (!HEX_COLOR_RE.test(trimmed)) {
    return null;
  }
  return trimmed.toLowerCase();
}

function pickBadgeTextColor(hex: string): string {
  const normalized = normalizeHexColor(hex);
  if (!normalized) {
    return "#111827";
  }

  const red = Number.parseInt(normalized.slice(1, 3), 16);
  const green = Number.parseInt(normalized.slice(3, 5), 16);
  const blue = Number.parseInt(normalized.slice(5, 7), 16);
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000;
  return luminance >= 155 ? "#111827" : "#f8fafc";
}

function buildCustomTitleBadgeStyle(titleColor: string | null | undefined): CSSProperties | undefined {
  const normalized = normalizeHexColor(titleColor);
  if (!normalized) {
    return undefined;
  }

  return {
    backgroundColor: normalized,
    borderColor: normalized,
    color: pickBadgeTextColor(normalized),
  };
}

function toCompactColorInput(value: string): string {
  return value.replace(/\s+/g, "");
}

function normalizeTitleIconPathForRender(value: string | null | undefined): string | null {
  const normalized = normalizeTitleIconPathInput(value);
  if (!normalized.ok) {
    return null;
  }
  return normalized.value;
}

export function AdminUsersContent() {
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [savingTitleUserId, setSavingTitleUserId] = useState<string | null>(null);
  const [titleDrafts, setTitleDrafts] = useState<Record<string, TitleDraft>>({});
  const [titleErrors, setTitleErrors] = useState<Record<string, string>>({});

  const deferredSearch = useDeferredValue(search);

  const { data, error, isLoading, mutate } = useAdminUsers({
    limit: PAGE_SIZE,
    offset,
    search: deferredSearch,
  });

  const users = useMemo(() => data?.users ?? [], [data?.users]);
  const total = data?.total ?? 0;

  const usersById = useMemo(
    () => new Map(users.map((user) => [user.userId, user])),
    [users]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setOffset(0);
    },
    []
  );

  const ensureDraft = useCallback((user: AdminUser) => {
    setTitleDrafts((prev) => {
      if (prev[user.userId]) {
        return prev;
      }

      return {
        ...prev,
        [user.userId]: {
          customTitle: user.customTitle ?? "",
          titleColor: user.titleColor ?? "",
          titleIconPath: user.titleIconPath ?? "",
          isOwner: user.isOwner,
          titleEnabled: user.titleEnabled,
        },
      };
    });
  }, []);

  const handleToggleExpand = useCallback(
    (user: AdminUser) => {
      setExpandedUserId((prev) => {
        if (prev === user.userId) {
          return null;
        }
        ensureDraft(user);
        return user.userId;
      });
      setTitleErrors((prev) => ({ ...prev, [user.userId]: "" }));
    },
    [ensureDraft]
  );

  const updateDraft = useCallback(
    (
      userId: string,
      patch: Partial<TitleDraft>,
      fallback: Pick<
        AdminUser,
        "customTitle" | "titleColor" | "titleIconPath" | "isOwner" | "titleEnabled"
      >
    ) => {
      setTitleDrafts((prev) => {
        const current = prev[userId] ?? {
          customTitle: fallback.customTitle ?? "",
          titleColor: fallback.titleColor ?? "",
          titleIconPath: fallback.titleIconPath ?? "",
          isOwner: fallback.isOwner,
          titleEnabled: fallback.titleEnabled,
        };

        return {
          ...prev,
          [userId]: {
            ...current,
            ...patch,
          },
        };
      });
    },
    []
  );

  const handleSaveTitle = useCallback(
    async (user: AdminUser) => {
      const draft = titleDrafts[user.userId] ?? {
        customTitle: user.customTitle ?? "",
        titleColor: user.titleColor ?? "",
        titleIconPath: user.titleIconPath ?? "",
        isOwner: user.isOwner,
        titleEnabled: user.titleEnabled,
      };
      const rawColor = draft.titleColor.trim();
      const normalizedColor = normalizeHexColor(rawColor);
      if (rawColor && !normalizedColor) {
        setTitleErrors((prev) => ({
          ...prev,
          [user.userId]: "颜色格式错误，请使用 #RRGGBB，例如 #ff5a7a。",
        }));
        return;
      }
      const normalizedTitleIconPath = normalizeTitleIconPathInput(
        draft.titleIconPath
      );
      if (!normalizedTitleIconPath.ok) {
        setTitleErrors((prev) => ({
          ...prev,
          [user.userId]:
            normalizedTitleIconPath.error ??
            "矢量图路径无效，请输入合法的 SVG Path 数据。",
        }));
        return;
      }

      setSavingTitleUserId(user.userId);
      setTitleErrors((prev) => ({ ...prev, [user.userId]: "" }));
      try {
        const res = await fetch(`/api/admin/user-titles/${user.userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customTitle: draft.customTitle,
            titleColor: normalizedColor ?? null,
            titleIconPath: normalizedTitleIconPath.value,
            isOwner: draft.isOwner,
            titleEnabled: draft.titleEnabled,
          }),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error ?? "保存头衔失败。");
        }

        await mutate();
      } catch (saveError) {
        const message =
          saveError instanceof Error ? saveError.message : "保存头衔失败。";
        setTitleErrors((prev) => ({ ...prev, [user.userId]: message }));
      } finally {
        setSavingTitleUserId(null);
      }
    },
    [mutate, titleDrafts]
  );

  const handleClearTitleRule = useCallback(
    async (user: AdminUser) => {
      setSavingTitleUserId(user.userId);
      setTitleErrors((prev) => ({ ...prev, [user.userId]: "" }));
      try {
        const res = await fetch(`/api/admin/user-titles/${user.userId}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error ?? "清除头衔规则失败。");
        }

        await mutate();
        setTitleDrafts((prev) => ({
          ...prev,
          [user.userId]: {
            customTitle: "",
            titleColor: "",
            titleIconPath: "",
            isOwner: false,
            titleEnabled: true,
          },
        }));
      } catch (clearError) {
        const message =
          clearError instanceof Error ? clearError.message : "清除头衔规则失败。";
        setTitleErrors((prev) => ({ ...prev, [user.userId]: message }));
      } finally {
        setSavingTitleUserId(null);
      }
    },
    [mutate]
  );

  const handleDeleteContent = useCallback(
    async (userId: string, type: "comments" | "ratings") => {
      const contentLabel = type === "comments" ? "评论" : "评分";
      const confirmed = window.confirm(
        `确定删除该用户的全部${contentLabel}吗？此操作无法撤销。`
      );
      if (!confirmed) return;

      setDeletingUserId(userId);
      try {
        const res = await fetch(`/api/admin/users/${userId}/content`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ types: [type] }),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error ?? "删除内容失败。");
        }

        await mutate();
      } catch (deleteError) {
        // The error is non-fatal for the UI flow (SWR will reflect
        // server truth on mutate), but we still want a console
        // breadcrumb so failures are visible during development
        // and post-mortem log analysis. A future iteration should
        // also surface this through a toast so the admin sees
        // the failure immediately.
        if (process.env.NODE_ENV !== "production") {
          console.warn("Admin: user delete request failed", deleteError);
        }
      } finally {
        setDeletingUserId(null);
      }
    },
    [mutate]
  );

  const hasPrev = offset > 0;
  const hasNext = offset + PAGE_SIZE < total;

  return (
    <div className="space-y-5">
      <AdminToolbar
        title="用户目录"
        description={`已收录 ${total.toLocaleString()} 位用户，搜索会自动更新表格。`}
        meta={<AdminCountPill>当前显示 {users.length} 位</AdminCountPill>}
        actions={
          <AdminButton
            onClick={() => mutate()}
            size="icon"
            aria-label="刷新用户列表"
          >
            <RefreshCw className="h-4 w-4" />
          </AdminButton>
        }
      >
        <AdminInput
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="按名称、用户 ID 或头衔搜索..."
          className="sm:max-w-md lg:w-96"
        />
      </AdminToolbar>

      {error && (
        <AdminErrorState message="加载用户失败。" onRetry={() => mutate()} />
      )}

      {isLoading && !data && <AdminLoadingState label="正在加载用户..." />}

      {!isLoading && !error && users.length === 0 && (
        <AdminEmptyState
          title="未找到用户"
          description="请尝试搜索其他名称、用户 ID 或头衔。"
        />
      )}

      {users.length > 0 && (
        <AdminTableShell>
            <thead>
              <tr>
                <th className="text-left px-4 py-3 font-medium">用户</th>
                <th className="text-left px-4 py-3 font-medium">用户 ID</th>
                <th className="text-left px-4 py-3 font-medium">头衔</th>
                <th className="text-left px-4 py-3 font-medium">编号</th>
                <th className="text-right px-4 py-3 font-medium">评论</th>
                <th className="text-right px-4 py-3 font-medium">评分</th>
                <th className="text-right px-4 py-3 font-medium">收藏</th>
                <th className="text-right px-4 py-3 font-medium">投稿</th>
                <th className="text-left px-4 py-3 font-medium">最近活跃</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const isExpanded = expandedUserId === user.userId;
                const isDeleting = deletingUserId === user.userId;
                const isSavingTitle = savingTitleUserId === user.userId;
                const draft = titleDrafts[user.userId] ?? {
                  customTitle: user.customTitle ?? "",
                  titleColor: user.titleColor ?? "",
                  titleIconPath: user.titleIconPath ?? "",
                  isOwner: user.isOwner,
                  titleEnabled: user.titleEnabled,
                };
                const titleError = titleErrors[user.userId] ?? "";
                const resolvedTitleLabel = formatResolvedTitle(user.resolvedTitle);
                const titleBadgeClass = getTitleBadgeClass(user.resolvedTitle);
                const titleBadgeStyle = buildCustomTitleBadgeStyle(user.titleColor);
                const titleIconPath = user.resolvedTitle
                  ? normalizeTitleIconPathForRender(user.titleIconPath)
                  : null;
                const draftTitleRaw = draft.customTitle.trim() || user.resolvedTitle;
                const draftTitleLabel =
                  formatResolvedTitle(draftTitleRaw) ?? "头衔预览";
                const draftBadgeClass = getTitleBadgeClass(draftTitleRaw);
                const draftBadgeStyle = buildCustomTitleBadgeStyle(draft.titleColor);
                const normalizedDraftColor = normalizeHexColor(draft.titleColor);
                const hasDraftColorInput = draft.titleColor.trim().length > 0;
                const isDraftColorInvalid =
                  hasDraftColorInput && !normalizedDraftColor;
                const draftColorValue = normalizedDraftColor ?? "#e11d48";
                const normalizedDraftIconPath = normalizeTitleIconPathInput(
                  draft.titleIconPath
                );
                const hasDraftIconInput = draft.titleIconPath.trim().length > 0;
                const isDraftIconInvalid =
                  hasDraftIconInput && !normalizedDraftIconPath.ok;
                const draftIconPath =
                  draftTitleRaw && normalizedDraftIconPath.ok
                    ? normalizedDraftIconPath.value
                    : null;

                return (
                  <Fragment key={user.userId}>
                    <tr className="transition-colors hover:bg-[var(--admin-input)]">
                      <td className="w-[15rem] max-w-[15rem] px-4 py-3">
                        <div className="flex min-w-0 items-center gap-3">
                          {getAvatarImageSrc(user.avatarUrl) ? (
                            <Image
                              src={getAvatarImageSrc(user.avatarUrl) ?? ""}
                              alt=""
                              width={32}
                              height={32}
                              className="h-8 w-8 shrink-0 rounded-full"
                              unoptimized
                            />
                          ) : (
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted/20 text-xs text-muted">
                              {user.authorName?.charAt(0)?.toUpperCase() || "?"}
                            </div>
                          )}
                          <span
                            className="min-w-0 truncate font-medium"
                            title={user.authorName || "未知用户"}
                          >
                            {user.authorName || "未知用户"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <code className="text-xs text-muted" title={user.userId}>
                          {user.userId.length > 12
                            ? `${user.userId.slice(0, 12)}...`
                            : user.userId}
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        {resolvedTitleLabel ? (
                          <span
                            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${titleBadgeClass}`}
                            style={titleBadgeStyle}
                          >
                            {titleIconPath ? (
                              <svg
                                viewBox="0 0 40 40"
                                className="h-3 w-3 fill-current"
                                aria-hidden="true"
                                focusable="false"
                              >
                                <path d={titleIconPath} />
                              </svg>
                            ) : null}
                            {resolvedTitleLabel}
                          </span>
                        ) : (
                          <span className="text-muted">--</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted">
                        {user.seqId ? `#${user.seqId}` : "--"}
                      </td>
                      <td className="text-right px-4 py-3">{user.commentCount}</td>
                      <td className="text-right px-4 py-3">{user.ratingCount}</td>
                      <td className="text-right px-4 py-3">{user.favoriteCount}</td>
                      <td className="text-right px-4 py-3">{user.submissionCount}</td>
                      <td className="px-4 py-3 text-muted">
                        {user.lastActive
                          ? new Date(user.lastActive).toLocaleDateString()
                          : "--"}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => handleToggleExpand(user)}
                          className="flex h-11 w-11 items-center justify-center rounded-md hover:bg-muted/10 transition-colors"
                          aria-expanded={isExpanded}
                          aria-label={`${isExpanded ? "收起" : "展开"}${user.authorName || user.userId}`}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td colSpan={10} className="bg-muted/5 px-4 py-4">
                          <div className="space-y-3">
                            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.6fr_1fr_auto_auto_auto_auto] items-center">
                              <AdminInput
                                value={draft.customTitle}
                                onChange={(event) =>
                                  updateDraft(
                                    user.userId,
                                    { customTitle: event.target.value },
                                    usersById.get(user.userId) ?? user
                                  )
                                }
                                placeholder="自定义头衔（可选，最多 24 个字符）"
                                maxLength={24}
                              />
                              <div className="flex items-center gap-2">
                                <input
                                  type="color"
                                  value={draftColorValue}
                                  onChange={(event) =>
                                    updateDraft(
                                      user.userId,
                                      { titleColor: event.target.value },
                                      usersById.get(user.userId) ?? user
                                    )
                                  }
                                  className="h-11 w-12 rounded-md border border-border bg-background"
                                  title="头衔颜色"
                                  aria-label="头衔颜色"
                                />
                                <AdminInput
                                  value={draft.titleColor}
                                  onChange={(event) =>
                                    updateDraft(
                                      user.userId,
                                      { titleColor: toCompactColorInput(event.target.value) },
                                      usersById.get(user.userId) ?? user
                                    )
                                  }
                                  placeholder="#ff5a7a"
                                  maxLength={7}
                                  className="w-full font-mono"
                                />
                                <AdminButton
                                  type="button"
                                  onClick={() =>
                                    updateDraft(
                                      user.userId,
                                      { titleColor: "" },
                                      usersById.get(user.userId) ?? user
                                    )
                                  }
                                  className="h-10 shrink-0 px-2.5 text-xs"
                                  title="清除颜色"
                                >
                                  清除
                                </AdminButton>
                              </div>
                              <div className="md:col-span-2 xl:col-span-2 flex items-center gap-2">
                                <AdminInput
                                  value={draft.titleIconPath}
                                  onChange={(event) =>
                                    updateDraft(
                                      user.userId,
                                      { titleIconPath: event.target.value },
                                      usersById.get(user.userId) ?? user
                                    )
                                  }
                                  placeholder="SVG 路径数据（可选）"
                                  maxLength={USER_TITLE_ICON_PATH_MAX_LENGTH}
                                  className="w-full font-mono"
                                />
                                <AdminButton
                                  type="button"
                                  onClick={() =>
                                    updateDraft(
                                      user.userId,
                                      { titleIconPath: "" },
                                      usersById.get(user.userId) ?? user
                                    )
                                  }
                                  className="h-10 shrink-0 px-2.5 text-xs"
                                  title="清除矢量图"
                                >
                                  清除
                                </AdminButton>
                              </div>
                              <div className="md:col-span-2 xl:col-span-2 flex flex-wrap items-center gap-2">
                                {PRESET_TITLE_COLORS.map((preset) => {
                                  const isSelected =
                                    normalizedDraftColor === preset.value;
                                  return (
                                    <button
                                      key={preset.value}
                                      type="button"
                                      onClick={() =>
                                        updateDraft(
                                          user.userId,
                                          { titleColor: preset.value },
                                          usersById.get(user.userId) ?? user
                                        )
                                      }
                                      className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3 text-[11px] transition-colors ${
                                        isSelected
                                          ? "border-foreground/30 bg-muted/20"
                                          : "border-border hover:bg-muted/10"
                                      }`}
                                      aria-pressed={isSelected}
                                      aria-label={`使用${preset.label}作为头衔颜色`}
                                    >
                                      <span
                                        className="inline-block h-3 w-3 rounded-full border border-black/15"
                                        style={{ backgroundColor: preset.value }}
                                      />
                                      {preset.label}
                                    </button>
                                  );
                                })}
                              </div>
                              <label className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-sm hover:bg-muted/10">
                                <input
                                  type="checkbox"
                                  checked={draft.isOwner}
                                  onChange={(event) =>
                                    updateDraft(
                                      user.userId,
                                      { isOwner: event.target.checked },
                                      usersById.get(user.userId) ?? user
                                    )
                                  }
                                />
                                秦始皇
                              </label>
                              <label className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-sm hover:bg-muted/10">
                                <input
                                  type="checkbox"
                                  checked={draft.titleEnabled}
                                  onChange={(event) =>
                                    updateDraft(
                                      user.userId,
                                      { titleEnabled: event.target.checked },
                                      usersById.get(user.userId) ?? user
                                    )
                                  }
                                />
                                启用头衔
                              </label>
                              <AdminButton
                                disabled={
                                  isSavingTitle || isDraftColorInvalid || isDraftIconInvalid
                                }
                                onClick={() => handleSaveTitle(user)}
                                tone="primary"
                              >
                                {isSavingTitle ? "正在保存..." : "保存头衔"}
                              </AdminButton>
                              <AdminButton
                                disabled={isSavingTitle}
                                onClick={() => handleClearTitleRule(user)}
                              >
                                清除规则
                              </AdminButton>
                            </div>

                            <AdminPanel className="bg-muted/5 p-3">
                              <span
                                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${draftBadgeClass}`}
                                style={draftBadgeStyle}
                              >
                                {draftIconPath ? (
                                  <svg
                                    viewBox="0 0 40 40"
                                    className="h-3.5 w-3.5 fill-current"
                                    aria-hidden="true"
                                    focusable="false"
                                  >
                                    <path d={draftIconPath} />
                                  </svg>
                                ) : null}
                                {draftTitleLabel}
                              </span>
                            </AdminPanel>

                            <div className="flex items-center gap-3">
                              <AdminButton
                                disabled={isDeleting}
                                onClick={() =>
                                  handleDeleteContent(user.userId, "comments")
                                }
                                tone="danger"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                删除评论
                              </AdminButton>
                              <AdminButton
                                disabled={isDeleting}
                                onClick={() =>
                                  handleDeleteContent(user.userId, "ratings")
                                }
                                tone="danger"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                删除评分
                              </AdminButton>
                            </div>

                            {titleError ? (
                              <p className="text-xs text-red-500">{titleError}</p>
                            ) : null}
                            {isDraftColorInvalid ? (
                              <p className="text-xs text-amber-600 dark:text-amber-300">
                                颜色值无效，请输入 `#RRGGBB`，例如 `#ff5a7a`。
                              </p>
                            ) : null}
                            {isDraftIconInvalid ? (
                              <p className="text-xs text-amber-600 dark:text-amber-300">
                                {normalizedDraftIconPath.error ??
                                  "矢量图路径无效，请使用 SVG path 数据。"}
                              </p>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
        </AdminTableShell>
      )}

      {total > PAGE_SIZE && (
        <AdminPagination
          page={Math.floor(offset / PAGE_SIZE) + 1}
          totalPages={Math.max(1, Math.ceil(total / PAGE_SIZE))}
          summary={`显示第 ${offset + 1}-${Math.min(offset + PAGE_SIZE, total)} 位，共 ${total} 位`}
          hasPrev={hasPrev}
          hasNext={hasNext}
          onPrev={() => setOffset((prev) => Math.max(0, prev - PAGE_SIZE))}
          onNext={() => setOffset((prev) => prev + PAGE_SIZE)}
        />
      )}
    </div>
  );
}
