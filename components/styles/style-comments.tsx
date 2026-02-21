"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, Send } from "lucide-react";
import { useStyleComments, type Comment } from "@/lib/swr";
import { useUser } from "@/lib/auth/use-user";
import { useI18n } from "@/lib/i18n/context";

interface StyleCommentsProps {
  slug: string;
}

const SITE_OWNER_TITLE_TOKEN = "__site_owner__";

export function StyleComments({ slug }: StyleCommentsProps) {
  const { t, locale } = useI18n();
  const { data, mutate } = useStyleComments(slug);
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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

    if (title === SITE_OWNER_TITLE_TOKEN) {
      return t("styleComments.titleSiteOwner");
    }

    return title;
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
            const commentTitle = getDisplayTitle(comment.author_title);
            const commentName = comment.author_name?.trim() || "User";
            const avatarFallback = commentName.charAt(0).toUpperCase();

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
                          <span className="inline-flex items-center rounded-full border border-border/70 bg-muted/30 px-2 py-0.5 text-[11px] leading-none text-foreground/80">
                            {commentTitle}
                          </span>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap mt-1 text-[11px] text-muted">
                        <span>
                          {getProviderLabel(comment.author_provider)}
                        </span>
                        {comment.author_seq_id ? (
                          <span>#{comment.author_seq_id}</span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-muted shrink-0">
                    {new Date(comment.created_at).toLocaleDateString(
                      locale === "zh" ? "zh-CN" : "en-US"
                    )}
                  </span>
                </div>
                <p className="text-foreground/80">{comment.content}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
