"use client";

import { useCallback, useEffect, useState } from "react";
import { Star } from "lucide-react";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("stylekit-session-id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("stylekit-session-id", id);
  }
  return id;
}

interface StyleRatingProps {
  slug: string;
}

export function StyleRating({ slug }: StyleRatingProps) {
  const [average, setAverage] = useState(0);
  const [total, setTotal] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const fetchRating = useCallback(async () => {
    try {
      const res = await fetch(`/api/styles/${slug}/rate`);
      const data = await res.json();
      setAverage(data.averageRating ?? 0);
      setTotal(data.totalRatings ?? 0);
    } catch {
      // silently fail
    }
  }, [slug]);

  useEffect(() => {
    fetchRating();
  }, [fetchRating]);

  async function handleRate(rating: number) {
    if (submitting) return;
    setSubmitting(true);
    setUserRating(rating);

    try {
      const res = await fetch(`/api/styles/${slug}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, sessionId: getSessionId() }),
      });
      const data = await res.json();
      if (data.success) {
        setAverage(data.averageRating);
        setTotal(data.totalRatings);
      }
    } catch {
      // silently fail
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
          {average} ({total})
        </span>
      )}
    </div>
  );
}
