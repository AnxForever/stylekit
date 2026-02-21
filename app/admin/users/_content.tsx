"use client";

import { Fragment, useCallback, useDeferredValue, useState, type CSSProperties } from "react";
import Image from "next/image";
import {
  EMPEROR_TITLE_TOKEN,
  EARLY_USER_TITLE_TOKEN,
  SITE_OWNER_TITLE_TOKEN,
} from "@/lib/auth/user-title-policy";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useAdminUsers, type AdminUser } from "@/lib/swr";

const PAGE_SIZE = 20;

interface TitleDraft {
  customTitle: string;
  titleColor: string;
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

  const users = data?.users ?? [];
  const total = data?.total ?? 0;

  const usersById = new Map(users.map((user) => [user.userId, user]));

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
      fallback: Pick<AdminUser, "customTitle" | "titleColor" | "isOwner" | "titleEnabled">
    ) => {
      setTitleDrafts((prev) => {
        const current = prev[userId] ?? {
          customTitle: fallback.customTitle ?? "",
          titleColor: fallback.titleColor ?? "",
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
        isOwner: user.isOwner,
        titleEnabled: user.titleEnabled,
      };

      setSavingTitleUserId(user.userId);
      setTitleErrors((prev) => ({ ...prev, [user.userId]: "" }));
      try {
        const res = await fetch(`/api/admin/user-titles/${user.userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customTitle: draft.customTitle,
            titleColor: draft.titleColor,
            isOwner: draft.isOwner,
            titleEnabled: draft.titleEnabled,
          }),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error ?? "Failed to save title.");
        }

        await mutate();
      } catch (saveError) {
        const message =
          saveError instanceof Error ? saveError.message : "Failed to save title.";
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
          throw new Error(body?.error ?? "Failed to clear title rule.");
        }

        await mutate();
        setTitleDrafts((prev) => ({
          ...prev,
          [user.userId]: {
            customTitle: "",
            titleColor: "",
            isOwner: false,
            titleEnabled: true,
          },
        }));
      } catch (clearError) {
        const message =
          clearError instanceof Error ? clearError.message : "Failed to clear title rule.";
        setTitleErrors((prev) => ({ ...prev, [user.userId]: message }));
      } finally {
        setSavingTitleUserId(null);
      }
    },
    [mutate]
  );

  const handleDeleteContent = useCallback(
    async (userId: string, type: "comments" | "ratings") => {
      const confirmed = window.confirm(
        `Delete all ${type} for this user? This action cannot be undone.`
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
          throw new Error(body?.error ?? "Failed to delete content.");
        }

        await mutate();
      } catch {
        // Error is non-fatal for UI; SWR will reflect latest state on mutate
      } finally {
        setDeletingUserId(null);
      }
    },
    [mutate]
  );

  const hasPrev = offset > 0;
  const hasNext = offset + PAGE_SIZE < total;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by name, user ID, or title..."
          className="flex-1 px-4 py-2 border border-border rounded-md bg-background text-sm"
        />
        <button
          onClick={() => mutate()}
          className="p-2 border border-border rounded-md hover:bg-muted/10 transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {error && (
        <p className="mb-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
          Failed to load users.
        </p>
      )}

      {isLoading && <p className="text-muted">Loading users...</p>}

      {!isLoading && !error && users.length === 0 && (
        <p className="text-muted">No users found.</p>
      )}

      {!isLoading && users.length > 0 && (
        <div className="border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/5">
                <th className="text-left px-4 py-3 font-medium">User</th>
                <th className="text-left px-4 py-3 font-medium">User ID</th>
                <th className="text-left px-4 py-3 font-medium">Title</th>
                <th className="text-left px-4 py-3 font-medium">ID</th>
                <th className="text-right px-4 py-3 font-medium">Comments</th>
                <th className="text-right px-4 py-3 font-medium">Ratings</th>
                <th className="text-right px-4 py-3 font-medium">Favorites</th>
                <th className="text-right px-4 py-3 font-medium">Submissions</th>
                <th className="text-left px-4 py-3 font-medium">Last Active</th>
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
                  isOwner: user.isOwner,
                  titleEnabled: user.titleEnabled,
                };
                const titleError = titleErrors[user.userId] ?? "";
                const resolvedTitleLabel = formatResolvedTitle(user.resolvedTitle);
                const titleBadgeClass = getTitleBadgeClass(user.resolvedTitle);
                const titleBadgeStyle = buildCustomTitleBadgeStyle(user.titleColor);
                const draftTitleRaw = draft.customTitle.trim() || user.resolvedTitle;
                const draftTitleLabel =
                  formatResolvedTitle(draftTitleRaw) ?? "头衔预览";
                const draftBadgeClass = getTitleBadgeClass(draftTitleRaw);
                const draftBadgeStyle = buildCustomTitleBadgeStyle(draft.titleColor);
                const draftColorValue = normalizeHexColor(draft.titleColor) ?? "#e11d48";

                return (
                  <Fragment key={user.userId}>
                    <tr className="border-b border-border">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {user.avatarUrl ? (
                            <Image
                              src={user.avatarUrl}
                              alt=""
                              width={32}
                              height={32}
                              className="w-8 h-8 rounded-full"
                              unoptimized
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-muted/20 flex items-center justify-center text-xs text-muted">
                              {user.authorName?.charAt(0)?.toUpperCase() || "?"}
                            </div>
                          )}
                          <span className="font-medium">
                            {user.authorName || "Unknown"}
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
                            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${titleBadgeClass}`}
                            style={titleBadgeStyle}
                          >
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
                          onClick={() => handleToggleExpand(user)}
                          className="p-1 rounded hover:bg-muted/10 transition-colors"
                          title={isExpanded ? "Collapse" : "Expand"}
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
                      <tr className="border-b border-border">
                        <td colSpan={10} className="px-4 py-3 bg-muted/5">
                          <div className="space-y-3">
                            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.6fr_1fr_auto_auto_auto_auto] items-center">
                              <input
                                value={draft.customTitle}
                                onChange={(event) =>
                                  updateDraft(
                                    user.userId,
                                    { customTitle: event.target.value },
                                    usersById.get(user.userId) ?? user
                                  )
                                }
                                placeholder="Custom title (optional, max 24 chars)"
                                maxLength={24}
                                className="px-3 py-2 text-sm border border-border rounded-md bg-background"
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
                                  className="h-9 w-11 rounded border border-border bg-background"
                                  title="Title color"
                                />
                                <input
                                  value={draft.titleColor}
                                  onChange={(event) =>
                                    updateDraft(
                                      user.userId,
                                      { titleColor: event.target.value },
                                      usersById.get(user.userId) ?? user
                                    )
                                  }
                                  placeholder="#ff5a7a"
                                  maxLength={7}
                                  className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background font-mono"
                                />
                              </div>
                              <label className="inline-flex items-center gap-2 text-sm">
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
                              <label className="inline-flex items-center gap-2 text-sm">
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
                                Title Enabled
                              </label>
                              <button
                                disabled={isSavingTitle}
                                onClick={() => handleSaveTitle(user)}
                                className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted/10 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                              >
                                {isSavingTitle ? "Saving..." : "Save Title"}
                              </button>
                              <button
                                disabled={isSavingTitle}
                                onClick={() => handleClearTitleRule(user)}
                                className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted/10 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                              >
                                Clear Rule
                              </button>
                            </div>

                            <div>
                              <span
                                className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${draftBadgeClass}`}
                                style={draftBadgeStyle}
                              >
                                {draftTitleLabel}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <button
                                disabled={isDeleting}
                                onClick={() =>
                                  handleDeleteContent(user.userId, "comments")
                                }
                                className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-red-300 text-red-700 rounded-md hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/40 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete Comments
                              </button>
                              <button
                                disabled={isDeleting}
                                onClick={() =>
                                  handleDeleteContent(user.userId, "ratings")
                                }
                                className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-red-300 text-red-700 rounded-md hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/40 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete Ratings
                              </button>
                            </div>

                            {titleError ? (
                              <p className="text-xs text-red-500">{titleError}</p>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {total > PAGE_SIZE && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted">
            Showing {offset + 1}-{Math.min(offset + PAGE_SIZE, total)} of{" "}
            {total}
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={!hasPrev}
              onClick={() => setOffset((prev) => Math.max(0, prev - PAGE_SIZE))}
              className="p-2 border border-border rounded-md hover:bg-muted/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={!hasNext}
              onClick={() => setOffset((prev) => prev + PAGE_SIZE)}
              className="p-2 border border-border rounded-md hover:bg-muted/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
