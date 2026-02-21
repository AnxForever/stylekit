"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, MessageSquare, Pencil, Send, Trash2, X } from "lucide-react";
import { useStyleComments, type Comment } from "@/lib/swr";
import { useUser } from "@/lib/auth/use-user";
import { useI18n } from "@/lib/i18n/context";
import {
  EMPEROR_TITLE_TOKEN,
  EARLY_USER_TITLE_TOKEN,
  SITE_OWNER_TITLE_TOKEN,
} from "@/lib/auth/user-title-policy";

interface StyleCommentsProps {
  slug: string;
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

export function StyleComments({ slug }: StyleCommentsProps) {
  const { t, locale } = useI18n();
  const { data, mutate } = useStyleComments(slug);
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [savingCommentId, setSavingCommentId] = useState<string | null>(null);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);

  const comments = data?.comments ?? [];
  const total = data?.total ?? 0;

  const userName = user?.user_metadata?.user_name ?? user?.user_metadata?.full_name ?? "";
  const userAvatar = user?.user_metadata?.avatar_url ?? "";

  const getProviderLabel = (provider: Comment["author_provider"] | undefined): string => {
    switch (provider) {
      case "github":
        return t("styleComments.providerGitHub");
      case "linuxdo":
        return t("styleComments.providerLinuxDo");
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
      return t("styleComments.titleSiteOwner");
    }

    if (title === EARLY_USER_TITLE_TOKEN) {
      return t("styleComments.titleEarlyUser");
    }

    return title;
  };

  const isOwnComment = (comment: Comment): boolean => {
    return Boolean(user?.id && comment.user_id && comment.user_id === user.id);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || submitting || !user) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/styles/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim() }),
      });
      const responseData = await res.json();
      if (responseData.success) {
        setContent("");
        const optimisticData = {
          comments: [responseData.comment as Comment, ...comments],
          total: total + 1,
        };
        await mutate(optimisticData, { revalidate: true });
      } else {
        setError(responseData.error || t("styleComments.postFailed"));
      }
    } catch {
      setError(t("styleComments.networkError"));
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(comment: Comment) {
    setError("");
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  }

  function cancelEdit() {
    setEditingCommentId(null);
    setEditingContent("");
    setError("");
  }

  async function saveEdit(comment: Comment) {
    if (!user || editingCommentId !== comment.id || !editingContent.trim()) {
      return;
    }

    setSavingCommentId(comment.id);
    setError("");

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
      };

      setEditingCommentId(null);
      setEditingContent("");
      await mutate(optimisticData, { revalidate: true });
    } catch {
      setError(t("styleComments.updateFailed"));
    } finally {
      setSavingCommentId(null);
    }
  }

  async function removeComment(comment: Comment) {
    if (!user) {
      return;
    }

    if (!window.confirm(t("styleComments.deleteConfirm"))) {
      return;
    }

    setDeletingCommentId(comment.id);
    setError("");

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
      };

      if (editingCommentId === comment.id) {
        setEditingCommentId(null);
        setEditingContent("");
      }

      await mutate(optimisticData, { revalidate: true });
    } catch {
      setError(t("styleComments.deleteFailed"));
    } finally {
      setDeletingCommentId(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted">
        <MessageSquare className="w-4 h-4" />
        <span>{total} {t("styleComments.countSuffix")}</span>
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-3">
            <div className="flex items-center gap-2 min-w-[128px]">
              {userAvatar ? (
                <Image
                  src={userAvatar}
                  alt={userName}
                  width={28}
                  height={28}
                  unoptimized
                  className="w-7 h-7 rounded-full"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-muted/30 flex items-center justify-center text-xs font-medium">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-sm font-medium text-foreground truncate">
                {userName}
              </span>
            </div>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={t("styleComments.placeholder")}
                maxLength={280}
                className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background"
              />
              <button
                type="submit"
                disabled={submitting || !content.trim()}
                className="px-3 py-2 bg-foreground text-background rounded-md text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
          {content.length > 0 && (
            <p className="text-xs text-muted text-right">{content.length}/280</p>
          )}
          {error && <p className="text-xs text-red-500">{error}</p>}
        </form>
      ) : (
        <div className="rounded-md border border-border bg-background/50 px-4 py-3 text-sm text-muted">
          {t("styleComments.signInPrompt")}
          {" "}
          <Link href="/login" className="underline hover:text-foreground">
            {t("styleComments.signInAction")}
          </Link>
        </div>
      )}

      {comments.length > 0 && (
        <div className="space-y-3 pt-2">
          {comments.map((comment) => {
            const rawTitle = comment.author_title;
            const commentTitle = getDisplayTitle(rawTitle);
            const commentName = comment.author_name?.trim() || "User";
            const avatarFallback = commentName.charAt(0).toUpperCase();
            const isOwner = isOwnComment(comment);
            const isEditing = editingCommentId === comment.id;
            const titleBadgeClass = getTitleBadgeClass(rawTitle);

            return (
              <div
                key={comment.id}
                className="p-3 border border-border rounded-md text-sm"
              >
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div className="flex items-start gap-2 min-w-0">
                    {comment.avatar_url ? (
                      <Image
                        src={comment.avatar_url}
                        alt={commentName}
                        width={24}
                        height={24}
                        unoptimized
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-muted/30 flex items-center justify-center text-[10px] font-semibold text-foreground/80">
                        {avatarFallback || "U"}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-foreground truncate max-w-[200px]">
                          {commentName}
                        </span>
                        {commentTitle ? (
                          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] leading-none ${titleBadgeClass}`}>
                            {commentTitle}
                          </span>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap mt-1 text-[11px] text-muted">
                        <span>{getProviderLabel(comment.author_provider)}</span>
                        {comment.author_seq_id ? (
                          <span>#{comment.author_seq_id}</span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted shrink-0">
                      {new Date(comment.created_at).toLocaleDateString(
                        locale === "zh" ? "zh-CN" : "en-US"
                      )}
                    </span>
                    {isOwner && !isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={() => startEdit(comment)}
                          className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted hover:text-foreground hover:bg-muted/10 transition-colors"
                        >
                          <Pencil className="w-3 h-3" />
                          {t("styleComments.edit")}
                        </button>
                        <button
                          type="button"
                          disabled={deletingCommentId === comment.id}
                          onClick={() => removeComment(comment)}
                          className="inline-flex items-center gap-1 rounded-md border border-red-300 px-2 py-1 text-xs text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/40 transition-colors disabled:opacity-60"
                        >
                          <Trash2 className="w-3 h-3" />
                          {t("styleComments.delete")}
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      maxLength={280}
                      className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background"
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted">{editingContent.length}/280</p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={savingCommentId === comment.id || !editingContent.trim()}
                          onClick={() => saveEdit(comment)}
                          className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs hover:bg-muted/10 transition-colors disabled:opacity-60"
                        >
                          <Check className="w-3 h-3" />
                          {t("styleComments.save")}
                        </button>
                        <button
                          type="button"
                          disabled={savingCommentId === comment.id}
                          onClick={cancelEdit}
                          className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs hover:bg-muted/10 transition-colors disabled:opacity-60"
                        >
                          <X className="w-3 h-3" />
                          {t("styleComments.cancel")}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-foreground/80">{comment.content}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
