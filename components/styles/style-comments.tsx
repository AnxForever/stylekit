"use client";

import { useCallback, useEffect, useState } from "react";
import { MessageSquare, Send } from "lucide-react";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("stylekit-session-id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("stylekit-session-id", id);
  }
  return id;
}

interface Comment {
  id: string;
  content: string;
  author_name: string;
  created_at: string;
}

interface StyleCommentsProps {
  slug: string;
}

export function StyleComments({ slug }: StyleCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState(0);
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/styles/${slug}/comments?limit=10`);
      const data = await res.json();
      setComments(data.comments ?? []);
      setTotal(data.total ?? 0);
    } catch {
      // silently fail
    }
  }, [slug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || submitting) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/styles/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content.trim(),
          authorName: authorName.trim() || "Anonymous",
          sessionId: getSessionId(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setContent("");
        setComments((prev) => [data.comment, ...prev]);
        setTotal((prev) => prev + 1);
      } else {
        setError(data.error || "Failed to post comment");
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
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Name (optional)"
            maxLength={50}
            className="w-32 px-3 py-2 text-sm border border-border rounded-md bg-background"
          />
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
                <span className="font-medium text-foreground">
                  {comment.author_name}
                </span>
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
