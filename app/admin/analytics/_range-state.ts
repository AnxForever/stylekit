"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { AnalyticsRange } from "@/lib/admin/analytics-api-contract";

const VALID_RANGES = new Set<AnalyticsRange>(["24h", "7d", "30d", "90d"]);

export function useAnalyticsRangeState(defaultRange: AnalyticsRange = "7d") {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rawRange = searchParams.get("range") as AnalyticsRange | null;
  const range = rawRange && VALID_RANGES.has(rawRange) ? rawRange : defaultRange;

  const setRange = useCallback(
    (nextRange: AnalyticsRange) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("range", nextRange);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  return { range, setRange };
}

export function withAnalyticsRange(href: string, range: AnalyticsRange): string {
  const separator = href.includes("?") ? "&" : "?";
  return `${href}${separator}range=${range}`;
}
