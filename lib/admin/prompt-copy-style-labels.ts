import "server-only";

import { listCommunityStylesMeta } from "@/lib/styles/community-runtime";
import { getAllStylesMeta } from "@/lib/styles/meta";
import type { PromptCopyStyleLabel } from "./prompt-copy-report";

const CACHE_TTL_MS = 5 * 60 * 1000;
let cachedLabels: { expiresAt: number; labels: PromptCopyStyleLabel[] } | null = null;
let pendingLoad: Promise<PromptCopyStyleLabel[]> | null = null;

export function getPromptCopyStyleLabels(): Promise<PromptCopyStyleLabel[]> {
  if (cachedLabels && cachedLabels.expiresAt > Date.now()) {
    return Promise.resolve(cachedLabels.labels);
  }
  if (pendingLoad) return pendingLoad;

  pendingLoad = loadStyleLabels();
  const currentLoad = pendingLoad;
  const clearPendingLoad = () => {
    if (pendingLoad === currentLoad) pendingLoad = null;
  };
  void currentLoad.then(clearPendingLoad, clearPendingLoad);
  return currentLoad;
}

async function loadStyleLabels(): Promise<PromptCopyStyleLabel[]> {
  const stylesBySlug = new Map(
    getAllStylesMeta().map((style) => [style.slug, {
      slug: style.slug,
      name: style.name,
      nameEn: style.nameEn,
    }]),
  );

  try {
    const communityStyles = await listCommunityStylesMeta();
    for (const style of communityStyles) {
      if (!stylesBySlug.has(style.slug)) {
        stylesBySlug.set(style.slug, {
          slug: style.slug,
          name: style.name,
          nameEn: style.nameEn,
        });
      }
    }
  } catch {
    // Static styles remain reportable when the community catalogue is unavailable.
  }

  const labels = [...stylesBySlug.values()];
  cachedLabels = { labels, expiresAt: Date.now() + CACHE_TTL_MS };
  return labels;
}
