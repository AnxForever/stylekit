"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { getSessionId } from "@/lib/session";
import { useStyleRating } from "@/lib/swr";

interface StyleRatingProps {
  slug: string;
}

export function StyleRating({ slug }: StyleRatingProps) {
  const { data, mutate } = useStyleRating(slug);
  const [userRating, setUserRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const average = data?.averageRating ?? 0;
  const total = data?.totalRatings ?? 0;

  async function handleRate(rating: number) {
    if (submitting) return;
    setSubmitting(true);
    setUserRating(rating);

    const optimisticData = {
      averageRating: total > 0
        ? (average * total + rating) / (total + 1)
        : rating,
      totalRatings: total + 1,
    };
    mutate(optimisticData, { revalidate: false });

    try {
      await fetch(`/api/styles/${slug}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, sessionId: getSessionId() }),
      });
      await mutate();
    } catch {
      // silently fail – revalidate to restore server state
      await mutate();
    } finally {
      setSubmitting(false);
    }
  }

  const displayRating = hoveredStar || userRating;

  return (
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
  );
}
