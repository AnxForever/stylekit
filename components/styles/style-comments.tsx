"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useSWRConfig } from "swr";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { COMMENT_MAX_LENGTH, COMMENTS_PAGE_SIZE, getStyleFeedbackLoginHref, getStyleCommentsKey } from "@/lib/community/comments";
import { Check, CornerDownRight, MessageSquare, Pencil, Reply, Send, Trash2, X } from "lucide-react";
import { useStyleComments, type Comment } from "@/lib/swr";
import { useUser } from "@/lib/auth/use-user";
import { getAvatarImageSrc } from "@/lib/avatar";
import { useI18n } from "@/lib/i18n/context";
import {
  EMPEROR_TITLE_TOKEN,
  EARLY_USER_TITLE_TOKEN,
  SITE_OWNER_TITLE_TOKEN,
} from "@/lib/auth/user-title-policy";

interface StyleCommentsProps {
  slug: string;
}

const COPY = {
  en: {
    writeLabel: "Your comment", post: "Post comment", posting: "Posting…",
    loading: "Loading comments…", loadFailed: "Comments could not be loaded.",
    retry: "Try again", empty: "No comments yet. Share what worked, or ask a specific question.",
    emptyPage: "No comments on this page. Go back to see earlier results.",
    next: "Next comments", previous: "Previous comments", pagination: "Comment pages",
    posted: "Comment posted.", updated: "Comment updated.", deleted: "Comment deleted.",
    editLabel: "Edit your comment",
    reply: "Reply", replyAction: "Post reply", replying: "Replying to", cancelReply: "Cancel reply",
    removed: "The original comment was removed.", viewAll: "View all comments", linked: "Linked comment",
    linkedMissing: "This comment is no longer available.", upgrade: "Replies are temporarily unavailable while the community is upgraded.",
  },
  zh: {
    writeLabel: "你的评论", post: "发布评论", posting: "正在发布…",
    loading: "正在加载评论…", loadFailed: "评论加载失败。",
    retry: "重试", empty: "还没有评论。分享使用体验，或提出一个具体问题吧。",
    emptyPage: "这一页暂无评论，返回上一页继续查看。",
    next: "下一页评论", previous: "上一页评论", pagination: "评论分页",
    posted: "评论已发布。", updated: "评论已更新。", deleted: "评论已删除。",
    editLabel: "编辑你的评论",
    reply: "回复", replyAction: "发布回复", replying: "正在回复", cancelReply: "取消回复",
    removed: "原评论已被删除。", viewAll: "查看全部评论", linked: "链接指向的评论",
    linkedMissing: "这条评论已不可用。", upgrade: "社区升级期间，回复暂时不可用。",
  },
} as const;

const HEX_COLOR_RE = /^#[0-9a-f]{6}$/i;
const SVG_PATH_RE = /^[MmLlHhVvCcSsQqTtAaZz0-9eE+.,\-\s]+$/;

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

function getTitleBadgeAppearance(
  title: string | null,
  titleColor: string | null | undefined
): { className: string; style?: CSSProperties } {
  const normalizedColor = normalizeHexColor(titleColor);
  if (!normalizedColor) {
    return { className: getTitleBadgeClass(title) };
  }

  return {
    className: "border",
    style: {
      backgroundColor: normalizedColor,
      borderColor: normalizedColor,
      color: pickBadgeTextColor(normalizedColor),
    },
  };
}

function normalizeTitleIconPath(value: string | null | undefined): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 2048) {
    return null;
  }

  if (!SVG_PATH_RE.test(trimmed)) {
    return null;
  }

  return trimmed;
}

function formatRelativeTime(iso: string, locale: string): string {
  const timestamp = new Date(iso).getTime();
  if (!Number.isFinite(timestamp)) return iso;
  const diffSeconds = Math.round((timestamp - Date.now()) / 1000);
  const absolute = Math.abs(diffSeconds);
  const rtf = new Intl.RelativeTimeFormat(locale === "zh" ? "zh-CN" : "en", {
    numeric: "auto",
  });
  if (absolute < 60) return locale === "zh" ? "刚刚" : "just now";
  if (absolute < 3600) return rtf.format(Math.round(diffSeconds / 60), "minute");
  if (absolute < 86400) return rtf.format(Math.round(diffSeconds / 3600), "hour");
  if (absolute < 86400 * 30) return rtf.format(Math.round(diffSeconds / 86400), "day");
  return new Date(iso).toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US");
}

function formatAbsoluteTime(iso: string, locale: string): string {
  return new Date(iso).toLocaleString(locale === "zh" ? "zh-CN" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function StyleComments({ slug }: StyleCommentsProps) {
  const { t, locale } = useI18n();
  const copy = COPY[locale];
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const focusedCommentId = searchParams.get("comment") || undefined;
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const scrolledCommentRef = useRef<string | undefined>(undefined);
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [page, setPage] = useState(0);
  const { data, mutate, error: loadError, isLoading } = useStyleComments(slug, COMMENTS_PAGE_SIZE, page * COMMENTS_PAGE_SIZE, focusedCommentId);
  const { mutate: mutateCache } = useSWRConfig();
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [savingCommentId, setSavingCommentId] = useState<string | null>(null);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);

  const comments = data?.comments ?? [];
  const total = data?.total ?? 0;

  useEffect(() => {
    if (!focusedCommentId) { scrolledCommentRef.current = undefined; return; }
    if (scrolledCommentRef.current === focusedCommentId || !data?.comments.some((comment) => comment.id === focusedCommentId)) return;
    const element = document.getElementById(`comment-${focusedCommentId}`);
    if (element) {
      scrolledCommentRef.current = focusedCommentId;
      element.focus({ preventScroll: true });
      element.scrollIntoView?.({ block: "start", behavior: "instant" });
    }
  }, [data?.comments, focusedCommentId]);

  const userName = user?.user_metadata?.user_name ?? user?.user_metadata?.full_name ?? "";
  const userAvatar = user?.user_metadata?.avatar_url ?? "";
  const userAvatarSrc = getAvatarImageSrc(userAvatar);
  const loginHref = getStyleFeedbackLoginHref(pathname, slug, locale, focusedCommentId);
  const repliesEnabled = data?.repliesEnabled === true;
  const busy = submitting || savingCommentId !== null || deletingCommentId !== null;

  const getProviderLabel = (provider: Comment["author_provider"] | undefined): string => {
    switch (provider) {
      case "google":
        return t("styleComments.providerGoogle");
      case "github":
        return t("styleComments.providerGitHub");
      case "linuxdo":
        return t("styleComments.providerLinuxDo");
      case "nodeloc":
        return t("styleComments.providerNodeLoc");
      default:
        return t("styleComments.providerUnknown");
    }
  };

  const getDisplayTitle = (title: string | null): string | null => {
    if (!title) {
      return null;
    }

    if (title === EMPEROR_TITLE_TOKEN) {
      return t("styleComments.titleEmperor");
    }

    if (title === SITE_OWNER_TITLE_TOKEN) {
      return t("styleComments.titleEmperor");
    }

    if (title === EARLY_USER_TITLE_TOKEN) {
      return t("styleComments.titleEarlyUser");
    }

    return title;
  };

  const isOwnComment = (comment: Comment): boolean => {
    return Boolean(user?.id && comment.user_id && comment.user_id === user.id);
  };

  function showAllComments() {
    const url = new URL(window.location.href);
    url.searchParams.delete("comment");
    url.hash = "style-feedback";
    window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
    setPage(0);
  }

  function focusComment(id: string) {
    const url = new URL(window.location.href);
    url.searchParams.set("comment", id);
    url.hash = `comment-${id}`;
    window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
    setPage(0);
  }

  function startReply(comment: Comment) {
    if (busy || editingCommentId !== null || !repliesEnabled) return;
    setReplyTo(comment);
    setError(""); setSuccess("");
    composerRef.current?.focus();
    composerRef.current?.scrollIntoView?.({ block: "center", behavior: "instant" });
  }

  function handleComposerKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || busy || editingCommentId !== null || !user) return;
    if (replyTo && !repliesEnabled) { setError(copy.upgrade); return; }
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/styles/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim(), ...(replyTo ? { replyToId: replyTo.id } : {}) }),
      });
      const responseData = await res.json();
      if (res.ok && responseData.success && responseData.comment) {
        setContent("");
        setReplyTo(null);
        setSuccess(copy.posted);
        if (page === 0 && !focusedCommentId) {
          const postedComment: Comment = {
            ...responseData.comment,
            reply_to: replyTo ? { id: replyTo.id, author_name: replyTo.author_name, content: replyTo.content } : null,
          };
          await mutate({
            comments: [postedComment, ...comments].slice(0, COMMENTS_PAGE_SIZE),
            total: total + 1,
            repliesEnabled,
          }, { revalidate: true });
        } else {
          // The composer can be used from any page; the new comment belongs
          // on the first page, not at the top of whichever page is open.
          await mutateCache(getStyleCommentsKey(slug), undefined, { revalidate: false });
          showAllComments();
        }
      } else {
        setError(responseData.code === "COMMUNITY_UPGRADE_REQUIRED" ? copy.upgrade : responseData.error || t("styleComments.postFailed"));
      }
    } catch {
      setError(t("styleComments.networkError"));
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(comment: Comment) {
    if (busy) return;
    setError("");
    setSuccess("");
    setReplyTo(null);
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  }

  function cancelEdit() {
    setEditingCommentId(null);
    setEditingContent("");
    setError("");
  }

  async function saveEdit(comment: Comment) {
    if (!user || busy || editingCommentId !== comment.id || !editingContent.trim()) {
      return;
    }

    setSavingCommentId(comment.id);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/styles/${slug}/comments/${comment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editingContent.trim() }),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok || !payload?.success) {
        setError(payload?.error ?? t("styleComments.updateFailed"));
        return;
      }

      const optimisticData = {
        comments: comments.map((item) =>
          item.id === comment.id
            ? {
                ...item,
                content: editingContent.trim(),
              }
            : item
        ),
        total,
        repliesEnabled,
      };

      setEditingCommentId(null);
      setEditingContent("");
      setSuccess(copy.updated);
      await mutate(optimisticData, { revalidate: true });
    } catch {
      setError(t("styleComments.updateFailed"));
    } finally {
      setSavingCommentId(null);
    }
  }

  async function removeComment(comment: Comment) {
    if (!user || busy) {
      return;
    }

    if (!window.confirm(t("styleComments.deleteConfirm"))) {
      return;
    }

    setDeletingCommentId(comment.id);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/styles/${slug}/comments/${comment.id}`, {
        method: "DELETE",
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok || !payload?.success) {
        setError(payload?.error ?? t("styleComments.deleteFailed"));
        return;
      }

      const optimisticData = {
        comments: comments.filter((item) => item.id !== comment.id),
        total: Math.max(total - 1, 0),
        repliesEnabled,
      };

      if (editingCommentId === comment.id) {
        setEditingCommentId(null);
        setEditingContent("");
      }

      setSuccess(copy.deleted);
      if (focusedCommentId) {
        await mutateCache(getStyleCommentsKey(slug), undefined, { revalidate: false });
        showAllComments();
      } else if (comments.length === 1 && page > 0) {
        const previousPage = page - 1;
        await mutateCache(getStyleCommentsKey(slug, COMMENTS_PAGE_SIZE, previousPage * COMMENTS_PAGE_SIZE), undefined, { revalidate: false });
        setPage(previousPage);
      } else {
        await mutate(optimisticData, { revalidate: true });
      }
    } catch {
      setError(t("styleComments.deleteFailed"));
    } finally {
      setDeletingCommentId(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-sm text-muted">
        <MessageSquare className="size-4" aria-hidden="true" />
        <span>
          {focusedCommentId
            ? copy.linked
            : data
              ? `${total} ${t("styleComments.countSuffix")}`
              : isLoading
                ? copy.loading
                : "—"}
        </span>
        {focusedCommentId ? (
          <button
            type="button"
            onClick={showAllComments}
            className="ml-auto min-h-9 text-xs underline underline-offset-4 hover:text-foreground"
          >
            {copy.viewAll}
          </button>
        ) : null}
      </div>

      {data?.repliesEnabled === false ? (
        <p className="text-xs leading-6 text-muted">{copy.upgrade}</p>
      ) : null}

      {user ? (
        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-border bg-background/50 transition-colors focus-within:border-foreground/40"
        >
          <div className="flex items-start gap-3 p-3">
            {userAvatarSrc ? (
              <Image
                src={userAvatarSrc}
                alt=""
                width={32}
                height={32}
                unoptimized
                className="size-8 shrink-0 rounded-full"
              />
            ) : (
              <div
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted/20 text-xs font-medium"
                aria-hidden="true"
              >
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="truncate font-medium">{userName}</span>
                {replyTo ? (
                  <span className="inline-flex max-w-full items-center gap-1 rounded-full bg-muted/10 px-2 py-0.5 text-[11px] text-muted">
                    <CornerDownRight className="size-3 shrink-0" aria-hidden="true" />
                    <span className="truncate">
                      {copy.replying} {replyTo.author_name}
                    </span>
                    <button
                      type="button"
                      onClick={() => setReplyTo(null)}
                      disabled={busy}
                      className="ml-1 shrink-0 underline underline-offset-2 hover:text-foreground"
                    >
                      {copy.cancelReply}
                    </button>
                  </span>
                ) : null}
              </div>
              <label htmlFor={`comment-content-${slug}`} className="sr-only">
                {copy.writeLabel}
              </label>
              <textarea
                ref={composerRef}
                id={`comment-content-${slug}`}
                value={content}
                onChange={(event) => setContent(event.target.value)}
                onKeyDown={handleComposerKeyDown}
                placeholder={t("styleComments.placeholder")}
                maxLength={COMMENT_MAX_LENGTH}
                rows={3}
                disabled={submitting}
                aria-describedby={`comment-count-${slug}`}
                className="block min-h-20 w-full resize-y bg-transparent text-sm leading-6 placeholder:text-muted focus:outline-none disabled:opacity-60"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-2">
                <p id={`comment-count-${slug}`} className="text-xs tabular-nums text-muted">
                  {content.length}/{COMMENT_MAX_LENGTH}
                  <span className="ml-2 hidden sm:inline">⌘/Ctrl + Enter</span>
                </p>
                <button
                  type="submit"
                  disabled={busy || editingCommentId !== null || !content.trim()}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-md bg-foreground px-3 text-xs font-medium text-background transition-opacity hover:opacity-85 disabled:opacity-50"
                >
                  <Send className="size-3.5" aria-hidden="true" />
                  {submitting ? copy.posting : replyTo ? copy.replyAction : copy.post}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-dashed border-border px-4 py-3 text-sm">
          <p className="text-muted">{t("styleComments.signInPrompt")}</p>
          <Link
            href={loginHref}
            className="inline-flex min-h-9 items-center rounded-md bg-foreground px-3 text-xs font-medium text-background transition-opacity hover:opacity-85"
          >
            {t("styleComments.signInAction")}
          </Link>
        </div>
      )}

      {error ? (
        <p role="alert" className="text-sm text-red-700 dark:text-red-300">
          {error}
        </p>
      ) : null}
      {success ? (
        <p role="status" aria-live="polite" className="text-sm text-muted">
          {success}
        </p>
      ) : null}

      {loadError ? (
        <div role="alert" className="flex flex-wrap items-center gap-3 rounded-md border border-border p-4 text-sm">
          <p>{copy.loadFailed}</p>
          <button
            type="button"
            onClick={() => void mutate()}
            className="min-h-9 px-2 underline underline-offset-4"
          >
            {copy.retry}
          </button>
        </div>
      ) : null}

      {isLoading ? (
        <div role="status" aria-label={copy.loading} className="space-y-4 border-t border-border py-3">
          <span className="sr-only">{copy.loading}</span>
          {[0, 1, 2].map((item) => (
            <div key={item} className="flex gap-3" aria-hidden="true">
              <div className="size-8 shrink-0 rounded-full bg-muted/15 motion-safe:animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-28 rounded bg-muted/15 motion-safe:animate-pulse" />
                <div className="h-3 w-full max-w-md rounded bg-muted/10 motion-safe:animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {!isLoading && !loadError && data && comments.length === 0 ? (
        <div className="border-y border-border py-8 text-sm leading-6 text-muted">
          <p>{focusedCommentId ? copy.linkedMissing : page === 0 ? copy.empty : copy.emptyPage}</p>
        </div>
      ) : null}

      {comments.length > 0 && (
        <ol className="divide-y divide-border border-y border-border">
          {comments.map((comment) => {
            const rawTitle = comment.author_title;
            const commentTitle = getDisplayTitle(rawTitle);
            const commentName = comment.author_name?.trim() || "User";
            const commentAvatarSrc = getAvatarImageSrc(comment.avatar_url);
            const avatarFallback = commentName.charAt(0).toUpperCase();
            const isOwner = isOwnComment(comment);
            const isEditing = editingCommentId === comment.id;
            const titleBadge = getTitleBadgeAppearance(rawTitle, comment.author_title_color);
            const iconPath = normalizeTitleIconPath(comment.author_title_icon_path);
            const providerLabel =
              comment.author_provider === "unknown"
                ? null
                : getProviderLabel(comment.author_provider);
            const relativeTime = formatRelativeTime(comment.created_at, locale);
            const absoluteTime = formatAbsoluteTime(comment.created_at, locale);

            return (
              <li
                key={comment.id}
                id={`comment-${comment.id}`}
                tabIndex={-1}
                className={`scroll-mt-28 focus:outline-none ${
                  focusedCommentId === comment.id ? "bg-muted/5" : ""
                }`}
              >
                <article className={`flex gap-3 py-4 ${comment.is_reply ? "pl-5 md:pl-8" : ""}`}>
                  {commentAvatarSrc ? (
                    <Image
                      src={commentAvatarSrc}
                      alt={commentName}
                      width={32}
                      height={32}
                      unoptimized
                      className="size-8 shrink-0 rounded-full"
                    />
                  ) : (
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted/30 text-[11px] font-semibold text-foreground/80">
                      {avatarFallback || "U"}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      {comment.author_seq_id && Number.isSafeInteger(comment.author_seq_id) && comment.author_seq_id > 0 ? (
                        <LocalizedLink
                          href={`/community/u/${comment.author_seq_id}`}
                          className="max-w-[200px] truncate text-sm font-medium text-foreground underline-offset-4 hover:underline"
                        >
                          {commentName}
                        </LocalizedLink>
                      ) : (
                        <span className="max-w-[200px] truncate text-sm font-medium text-foreground">
                          {commentName}
                        </span>
                      )}
                      {commentTitle ? (
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] leading-none ${titleBadge.className}`}
                          style={titleBadge.style}
                        >
                          {iconPath ? (
                            <svg viewBox="0 0 40 40" className="size-3 fill-current" aria-hidden="true" focusable="false">
                              <path d={iconPath} />
                            </svg>
                          ) : null}
                          {commentTitle}
                        </span>
                      ) : null}
                      {providerLabel ? (
                        <span className="text-[11px] text-muted">{providerLabel}</span>
                      ) : null}
                      <time
                        dateTime={comment.created_at}
                        title={absoluteTime}
                        className="ml-auto text-[11px] text-muted"
                      >
                        {relativeTime}
                      </time>
                    </div>

                    {isEditing ? (
                      <div className="mt-2 space-y-2">
                        <textarea
                          aria-label={copy.editLabel}
                          rows={3}
                          value={editingContent}
                          onChange={(event) => setEditingContent(event.target.value)}
                          maxLength={COMMENT_MAX_LENGTH}
                          disabled={savingCommentId === comment.id}
                          className="w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-sm leading-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                        />
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted">
                            {editingContent.length}/{COMMENT_MAX_LENGTH}
                          </p>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              disabled={savingCommentId === comment.id || !editingContent.trim()}
                              onClick={() => saveEdit(comment)}
                              className="inline-flex min-h-8 items-center gap-1 rounded-md border border-border px-2 text-xs transition-colors hover:bg-muted/10 disabled:opacity-60"
                            >
                              <Check className="size-3" />
                              {t("styleComments.save")}
                            </button>
                            <button
                              type="button"
                              disabled={savingCommentId === comment.id}
                              onClick={cancelEdit}
                              className="inline-flex min-h-8 items-center gap-1 rounded-md border border-border px-2 text-xs transition-colors hover:bg-muted/10 disabled:opacity-60"
                            >
                              <X className="size-3" />
                              {t("styleComments.cancel")}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-foreground/85">
                        {comment.content}
                      </p>
                    )}

                    {comment.is_reply ? (
                      comment.reply_to ? (
                        <button
                          type="button"
                          onClick={() => focusComment(comment.reply_to!.id)}
                          className="mt-1.5 flex max-w-full items-center gap-1 text-left text-xs text-muted hover:text-foreground"
                        >
                          <CornerDownRight className="size-3 shrink-0" aria-hidden="true" />
                          <span className="shrink-0 font-medium">{comment.reply_to.author_name}</span>
                          <span className="truncate">{comment.reply_to.content}</span>
                        </button>
                      ) : (
                        <p className="mt-1.5 text-xs text-muted">{copy.removed}</p>
                      )
                    ) : null}

                    {!isEditing ? (
                      <div className="-ml-1.5 mt-1 flex flex-wrap items-center gap-1">
                        {repliesEnabled ? (
                          user ? (
                            <button
                              type="button"
                              disabled={busy || editingCommentId !== null}
                              onClick={() => startReply(comment)}
                              className="inline-flex min-h-8 items-center gap-1 rounded-md px-1.5 text-xs text-muted transition-colors hover:text-foreground disabled:opacity-50"
                            >
                              <Reply className="size-3.5" aria-hidden="true" />
                              {copy.reply}
                            </button>
                          ) : (
                            <Link
                              href={getStyleFeedbackLoginHref(pathname, slug, locale, comment.id)}
                              className="inline-flex min-h-8 items-center gap-1 rounded-md px-1.5 text-xs text-muted underline-offset-4 hover:text-foreground hover:underline"
                            >
                              <Reply className="size-3.5" aria-hidden="true" />
                              {copy.reply}
                            </Link>
                          )
                        ) : null}
                        {isOwner ? (
                          <>
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => startEdit(comment)}
                              className="inline-flex min-h-8 items-center gap-1 rounded-md px-1.5 text-xs text-muted transition-colors hover:text-foreground disabled:opacity-60"
                            >
                              <Pencil className="size-3.5" aria-hidden="true" />
                              {t("styleComments.edit")}
                            </button>
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => removeComment(comment)}
                              className="inline-flex min-h-8 items-center gap-1 rounded-md px-1.5 text-xs text-muted transition-colors hover:text-red-600 disabled:opacity-60 dark:hover:text-red-400"
                            >
                              <Trash2 className="size-3.5" aria-hidden="true" />
                              {t("styleComments.delete")}
                            </button>
                          </>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      )}

      {!focusedCommentId && (total > COMMENTS_PAGE_SIZE || page > 0) ? (
        <nav
          aria-label={copy.pagination}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <button
            type="button"
            disabled={page === 0 || isLoading || busy || editingCommentId !== null}
            onClick={() => setPage((current) => Math.max(0, current - 1))}
            className="inline-flex min-h-9 items-center rounded-md border border-border px-3 text-xs transition-colors hover:border-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copy.previous}
          </button>
          <span role="status" aria-live="polite" className="text-xs tabular-nums text-muted">
            {locale === "zh" ? `第 ${page + 1} 页` : `Page ${page + 1}`}
          </span>
          <button
            type="button"
            disabled={
              isLoading ||
              busy ||
              editingCommentId !== null ||
              (page + 1) * COMMENTS_PAGE_SIZE >= total
            }
            onClick={() => setPage((current) => current + 1)}
            className="inline-flex min-h-9 items-center rounded-md border border-border px-3 text-xs transition-colors hover:border-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copy.next}
          </button>
        </nav>
      ) : null}
    </div>
  );
}
