"use client";

import { useState } from "react";
import { UserCheck, UserPlus } from "lucide-react";

/**
 * Follow control on a contributor page.
 *
 * The server resolves the public follower total and the reader-specific
 * following state. Keeping those values as initial props avoids a loading
 * flash and, more importantly, prevents a second client request from
 * overwriting the server-rendered state during hydration.
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
  initialFollowers,
  initialFollowing,
}: {
  seqId: number;
  locale: "en" | "zh";
  isSelf: boolean;
  initialFollowers: number;
  initialFollowing: boolean;
}) {
  const t = COPY[locale];
  const [followers, setFollowers] = useState(initialFollowers);
  const [following, setFollowing] = useState(initialFollowing);
  const [busy, setBusy] = useState(false);
  const [needsSignIn, setNeedsSignIn] = useState(false);
  const [hovered, setHovered] = useState(false);

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
        setFollowers(data.followers ?? followers);
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

      <span className="font-mono text-xs text-muted-foreground">
        {t.followers(followers)}
      </span>
    </div>
  );
}
