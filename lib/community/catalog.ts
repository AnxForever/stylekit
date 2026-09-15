import { cache } from "react";
import {
  listCommunityStylesMeta,
  type CommunityStyleMeta,
} from "@/lib/styles/community-runtime";

export type CommunityCatalogResult =
  | { status: "ready"; styles: CommunityStyleMeta[] }
  | { status: "unavailable"; styles: CommunityStyleMeta[] };

// Public callers share one read, including its failure state. A failed
// upstream read must not masquerade as a genuinely empty catalog.
export const getCommunityCatalog = cache(async (): Promise<CommunityCatalogResult> => {
  try {
    return { status: "ready", styles: await listCommunityStylesMeta() };
  } catch {
    return { status: "unavailable", styles: [] };
  }
});
