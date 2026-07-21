"use client";

import { preload } from "swr";
import { fetcher } from "./fetcher";

const DATA_KEYS: Record<string, string[]> = {
  "/admin/styles": ["/api/admin/styles?sort=name&order=desc"],
  "/admin/users": ["/api/admin/users?limit=20&offset=0"],
  "/admin/comments": ["/api/admin/comments?limit=20&offset=0"],
  "/admin/ratings": ["/api/admin/ratings?limit=20&offset=0"],
  "/admin/system": ["/api/admin/system"],
};

export function prefetchAdminView(href: string) {
  return Promise.allSettled((DATA_KEYS[href] ?? []).map((key) => preload(key, fetcher)));
}

export function prefetchCommonAdminViews() {
  return Promise.allSettled([
    prefetchAdminView("/admin/styles"),
    prefetchAdminView("/admin/users"),
  ]);
}
