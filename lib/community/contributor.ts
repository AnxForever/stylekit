/**
 * Contributor standing in the community catalog.
 *
 * Deliberately separate from `lib/auth/user-title-policy`: that module answers
 * "what does this account's badge say" (manual title > emperor > owner > early
 * user), which is site identity. This one answers "what has this person
 * contributed", which is earned and changes as they submit. Keeping them apart
 * means a contributor tier never overwrites a title an admin set by hand — the
 * two render side by side.
 */

import { getSupabaseAdmin } from "@/lib/supabase/server";

export interface ContributorStats {
  userId: string;
  /** Approved styles that are still publicly visible. */
  published: number;
  /** Approved styles promoted into the curated library. */
  promoted: number;
  /** Submissions still waiting on review. */
  pending: number;
}

export interface ContributorTier {
  id: "newcomer" | "contributor" | "trusted" | "curator";
  labelEn: string;
  labelZh: string;
  /**
   * Whether this tier may help review community reports. Not wired into any
   * permission check yet — the flag exists so the tier table stays the single
   * place that answers it when moderation opens up.
   */
  canReview: boolean;
}

/**
 * Thresholds are intentionally low. The catalog is young; a scale calibrated
 * for a mature community would leave every real contributor at the bottom
 * tier, which tells a reader nothing.
 */
const TIERS: readonly (ContributorTier & {
  minPublished: number;
  minPromoted: number;
})[] = [
  {
    id: "curator",
    labelEn: "Curator",
    labelZh: "策展人",
    canReview: true,
    minPublished: 5,
    minPromoted: 2,
  },
  {
    id: "trusted",
    labelEn: "Trusted contributor",
    labelZh: "资深贡献者",
    canReview: true,
    minPublished: 3,
    minPromoted: 1,
  },
  {
    id: "contributor",
    labelEn: "Contributor",
    labelZh: "贡献者",
    canReview: false,
    minPublished: 1,
    minPromoted: 0,
  },
  {
    id: "newcomer",
    labelEn: "Newcomer",
    labelZh: "新人",
    canReview: false,
    minPublished: 0,
    minPromoted: 0,
  },
];

export function resolveContributorTier(stats: ContributorStats): ContributorTier {
  const match =
    TIERS.find(
      (tier) =>
        stats.published >= tier.minPublished && stats.promoted >= tier.minPromoted,
    ) ?? TIERS[TIERS.length - 1];

  const { minPublished: _min, minPromoted: _minPromoted, ...tier } = match;
  void _min;
  void _minPromoted;
  return tier;
}

interface StatsRow {
  user_id: string | null;
  status: string;
  visibility?: string | null;
}

function tally(rows: StatsRow[], userId: string): ContributorStats {
  const stats: ContributorStats = { userId, published: 0, promoted: 0, pending: 0 };

  for (const row of rows) {
    if (row.status === "pending") {
      stats.pending += 1;
      continue;
    }
    if (row.status !== "approved") continue;
    // A hidden style still belongs to its author, but a takedown should not
    // keep counting toward standing.
    if (row.visibility === "hidden") continue;

    stats.published += 1;
    if (row.visibility === "promoted") stats.promoted += 1;
  }

  return stats;
}

export async function getContributorStats(
  userId: string,
): Promise<ContributorStats> {
  const empty: ContributorStats = { userId, published: 0, promoted: 0, pending: 0 };
  const sb = getSupabaseAdmin();
  if (!sb) return empty;

  const { data, error } = await sb
    .from("submissions")
    .select("user_id, status, visibility")
    .eq("user_id", userId);

  if (error || !data) return empty;
  return tally(data as StatsRow[], userId);
}

/**
 * Sequential id for one account, or null when it has none.
 *
 * Used to turn a byline into a link: the contributor page is addressed by seq
 * id, and an account that predates seq assignment simply renders unlinked.
 */
export async function getSeqIdForUser(userId: string): Promise<number | null> {
  const sb = getSupabaseAdmin();
  if (!sb) return null;

  const { data } = await sb
    .from("user_seq_ids")
    .select("seq_id")
    .eq("user_id", userId)
    .maybeSingle();

  const seqId = (data as { seq_id?: number } | null)?.seq_id;
  return typeof seqId === "number" && seqId > 0 ? seqId : null;
}

export interface ContributorProfile {
  userId: string;
  seqId: number | null;
  displayName: string;
  avatarUrl: string | null;
  stats: ContributorStats;
  tier: ContributorTier;
}

/**
 * Resolve a public contributor profile by sequential id.
 *
 * Addressed by seq id rather than uuid so a shared link never exposes the
 * account's primary key, and so the URL matches the identity readers already
 * see next to comments.
 */
export async function getContributorBySeqId(
  seqId: number,
): Promise<ContributorProfile | null> {
  const sb = getSupabaseAdmin();
  if (!sb) return null;

  const { data: seqRow } = await sb
    .from("user_seq_ids")
    .select("user_id")
    .eq("seq_id", seqId)
    .maybeSingle();

  const userId = (seqRow as { user_id?: string } | null)?.user_id;
  if (!userId) return null;

  const stats = await getContributorStats(userId);

  // The display name comes from the contributor's own submissions rather than
  // auth metadata: it is what already appears next to their published work, so
  // the profile cannot show a name readers have never seen.
  const { data: named } = await sb
    .from("submissions")
    .select("author_name, form_data")
    .eq("user_id", userId)
    .not("author_name", "is", null)
    .limit(1)
    .maybeSingle();

  const row = named as
    | { author_name?: string | null; form_data?: Record<string, unknown> }
    | null;
  const author = (row?.form_data?.__author ?? {}) as Record<string, unknown>;

  return {
    userId,
    seqId,
    displayName: row?.author_name?.trim() || "Contributor",
    avatarUrl:
      typeof author.avatarUrl === "string" && author.avatarUrl.trim()
        ? author.avatarUrl
        : null,
    stats,
    tier: resolveContributorTier(stats),
  };
}
