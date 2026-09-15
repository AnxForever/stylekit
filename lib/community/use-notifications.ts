"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import type { CommunityNotificationPage } from "@/lib/community/notifications";

export function notificationKey(userId: string | undefined, cursor = "", limit = 20) {
  if (!userId) return null;
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.set("cursor", cursor);
  // The account ID partitions the client cache, not the transport URL. The
  // server determines the recipient from the authenticated session only.
  return [`/api/community/notifications?${params}`, userId] as const;
}

export function useCommunityNotifications(userId: string | undefined, cursor = "", limit = 20) {
  return useSWR<CommunityNotificationPage>(notificationKey(userId, cursor, limit),
    ([url]: readonly [string, string]) => fetcher<CommunityNotificationPage>(url), {
    refreshInterval: 60_000,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    revalidateOnFocus: true,
    dedupingInterval: 10_000,
    // Never retain another account's inbox while auth identity changes.
    keepPreviousData: false,
  });
}
