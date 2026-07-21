import type { StyleExperiencePack } from "@/lib/experience-packs/schema";
import { corporateCleanSaasPack } from "./corporate-clean-saas";

const packs = [corporateCleanSaasPack] as const;

export function listExperiencePacks(): StyleExperiencePack[] {
  return [...packs];
}

export function getExperiencePack(slug: string): StyleExperiencePack | undefined {
  const normalized = slug.replace(/\.json$/i, "").toLowerCase();
  return packs.find((pack) => pack.slug === normalized);
}

export { corporateCleanSaasPack };
