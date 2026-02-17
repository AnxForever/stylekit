"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageSquare, Send } from "lucide-react";
import { getSessionId } from "@/lib/session";
import { useStyleComments, type Comment } from "@/lib/swr";
import { useUser } from "@/lib/auth/use-user";

interface StyleCommentsProps {
  slug: string;
}

export function StyleComments({ slug }: StyleCommentsProps) {
  const { data, mutate } = useStyleComments(slug);
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const comments = data?.comments ?? [];
  const total = data?.total ?? 0;

  const userName = user?.user_metadata?.user_name ?? user?.user_metadata?.full_name ?? "";
  const userAvatar = user?.user_metadata?.avatar_url ?? "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || submitting) return;
    setSubmitting(true);
    setError("");

    const trimmedContent = content.trim();
    const trimmedAuthor = authorName.trim() || "Anonymous";

    const body: Record<string, string> = { content: trimmedContent };
    if (user) {
      // Logged-in: server extracts user info from auth cookie
    } else {
      body.authorName = trimmedAuthor;
      body.sessionId = getSessionId();
    }

    try {
      const res = await fetch(`/api/styles/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
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
        setError(responseData.error || "Failed to post comment");
      }
    } catch {
      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted">
        <MessageSquare className="w-4 h-4" />
        <span>{total} comments</span>
      </div>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-3">
          {user ? (
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
          ) : (
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Name (optional)"
              maxLength={50}
              className="w-32 px-3 py-2 text-sm border border-border rounded-md bg-background"
            />
          )}
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Leave a comment (max 280 chars)"
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

      {/* Comment list */}
      {comments.length > 0 && (
        <div className="space-y-3 pt-2">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-3 border border-border rounded-md text-sm"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  {comment.avatar_url ? (
                    <Image
                      src={comment.avatar_url}
                      alt={comment.author_name}
                      width={20}
                      height={20}
                      unoptimized
                      className="w-5 h-5 rounded-full"
                    />
                  ) : null}
                  <span className="font-medium text-foreground">
                    {comment.author_name}
                  </span>
                </div>
                <span className="text-xs text-muted">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-foreground/80">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
