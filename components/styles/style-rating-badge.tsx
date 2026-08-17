"use client";

import { Star } from "lucide-react";
import { useStyleRating } from "@/lib/swr";
import { useI18n } from "@/lib/i18n/context";

interface StyleRatingBadgeProps {
  slug: string;
}

/**
 * Compact rating chip for the detail-page header.
 *
 * The rating control itself sits in the feedback section far down the page, so
 * most visitors never discover it. This chip surfaces the current score next to
 * the other header badges and jumps to the control.
 *
 * It shares its SWR key with StyleRating, so it costs no extra request.
 */
export function StyleRatingBadge({ slug }: StyleRatingBadgeProps) {
  const { data } = useStyleRating(slug);
  const { t } = useI18n();

  const total = data?.totalRatings ?? 0;
  const average = data?.averageRating ?? 0;
  const hasRatings = total > 0;

  return (
    <a
      href="#style-feedback"
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border border-border bg-zinc-50 text-muted hover:bg-zinc-100 hover:text-foreground transition-colors"
      title={hasRatings ? t("rating.jumpToRatings") : t("rating.beFirst")}
    >
      <Star
        className={`w-3 h-3 ${hasRatings ? "text-yellow-500 fill-yellow-500" : ""}`}
        aria-hidden="true"
      />
      {hasRatings ? (
        <span>
          {average.toFixed(1)}
          <span className="ml-1 text-[11px]">({total})</span>
        </span>
      ) : (
        <span>{t("rating.rateThisStyle")}</span>
      )}
    </a>
  );
}
