"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { useStyleRating } from "@/lib/swr";
import { useUser } from "@/lib/auth/use-user";
import { useI18n } from "@/lib/i18n/context";

interface StyleRatingProps {
  slug: string;
}

export function StyleRating({ slug }: StyleRatingProps) {
  const { data, mutate } = useStyleRating(slug);
  const { user } = useUser();
  const { t } = useI18n();
  const [userRating, setUserRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const average = data?.averageRating ?? 0;
  const total = data?.totalRatings ?? 0;
  const resolvedUserRating = data?.userRating ?? null;

  useEffect(() => {
    if (resolvedUserRating == null) {
      setUserRating(0);
      return;
    }

    if (
      typeof resolvedUserRating === "number" &&
      resolvedUserRating >= 1 &&
      resolvedUserRating <= 5
    ) {
      setUserRating(resolvedUserRating);
      return;
    }

    setUserRating(0);
  }, [resolvedUserRating, slug]);

  async function handleRate(rating: number) {
    if (submitting || !user) return;
    setSubmitting(true);
    setUserRating(rating);
    setError("");

    try {
      const res = await fetch(`/api/styles/${slug}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Failed to submit rating");
      }
      await mutate();
    } catch {
      setUserRating(0);
      setError("Failed to submit rating. Please try again.");
      await mutate();
    } finally {
      setSubmitting(false);
    }
  }

  const displayRating = hoveredStar || userRating;

  // Anonymous users: show read-only stars + sign-in link
  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="p-0.5">
              <Star
                className={`w-5 h-5 ${
                  star <= average
                    ? "text-yellow-500/40 fill-yellow-500/40"
                    : "text-muted"
                }`}
              />
            </span>
          ))}
        </div>
        {total > 0 && (
          <span className="text-sm text-muted">
            {average.toFixed(1)} ({total})
          </span>
        )}
        <Link
          href="/login"
          className="text-xs text-muted hover:text-foreground transition-colors underline"
        >
          {t("rating.signInToRate")}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRate(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              disabled={submitting}
              className="p-0.5 transition-transform hover:scale-110 disabled:opacity-50"
              aria-label={`Rate ${star} stars`}
            >
              <Star
                className={`w-5 h-5 transition-colors ${
                  star <= displayRating
                    ? "text-yellow-500 fill-yellow-500"
                    : star <= average
                      ? "text-yellow-500/40 fill-yellow-500/40"
                      : "text-muted"
                }`}
              />
            </button>
          ))}
        </div>
        {total > 0 && (
          <span className="text-sm text-muted">
            {average.toFixed(1)} ({total})
          </span>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
