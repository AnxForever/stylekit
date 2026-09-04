"use client";

import { useEffect, useState } from "react";
import { UserCheck, UserPlus } from "lucide-react";

/**
 * Follow control on a contributor page.
 *
 * The initial state is fetched client-side rather than rendered on the server:
 * the page itself is cacheable per contributor, but "do I follow this person"
 * differs per reader, and baking it into the page would make that cache
 * per-viewer for one small piece of UI.
 */

const COPY = {
  en: {
    follow: "Follow",
    following: "Following",
    unfollow: "Unfollow",
    signIn: "Sign in to follow",
    followers: (n: number) => `${n} ${n === 1 ? "follower" : "followers"}`,
  },
  zh: {
    follow: "关注",
    following: "已关注",
    unfollow: "取消关注",
    signIn: "登录后可关注",
    followers: (n: number) => `${n} 位关注者`,
  },
} as const;

export function FollowButton({
  seqId,
  locale,
  isSelf,
}: {
  seqId: number;
  locale: "en" | "zh";
  isSelf: boolean;
}) {
  const t = COPY[locale];
  const [followers, setFollowers] = useState<number | null>(null);
  const [following, setFollowing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [needsSignIn, setNeedsSignIn] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void fetch(`/api/community/follow?seqId=${seqId}`)
      .then((res) => res.json())
      .then((data: { followers?: number; following?: boolean }) => {
        if (cancelled) return;
        setFollowers(data.followers ?? 0);
        setFollowing(Boolean(data.following));
      })
      .catch(() => {
        if (!cancelled) setFollowers(0);
      });
    return () => {
      cancelled = true;
    };
  }, [seqId]);

  async function toggle() {
    setBusy(true);
    try {
      const res = await fetch("/api/community/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seqId, follow: !following }),
      });
      if (res.status === 401) {
        setNeedsSignIn(true);
        return;
      }
      const data = (await res.json()) as {
        success?: boolean;
        followers?: number;
        following?: boolean;
      };
      if (data.success) {
        setFollowers(data.followers ?? followers ?? 0);
        setFollowing(Boolean(data.following));
      }
    } catch {
      // Leaving the previous state in place is the honest outcome of a failed
      // toggle; the next click retries.
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {!isSelf ? (
        <button
          type="button"
          onClick={toggle}
          disabled={busy || needsSignIn}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors disabled:opacity-60 ${
            following
              ? "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              : "border-foreground bg-foreground text-background"
          }`}
        >
          {following ? (
            <UserCheck className="h-3.5 w-3.5" />
          ) : (
            <UserPlus className="h-3.5 w-3.5" />
          )}
          {needsSignIn
            ? t.signIn
            : following
              ? hovered
                ? t.unfollow
                : t.following
              : t.follow}
        </button>
      ) : null}

      {followers !== null ? (
        <span className="font-mono text-xs text-muted-foreground">
          {t.followers(followers)}
        </span>
      ) : null}
    </div>
  );
}
