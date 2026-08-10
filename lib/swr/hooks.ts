"use client";

import useSWR from "swr";
import type { StyleMeta } from "@/lib/styles/meta";
import type { DashboardData, DashboardRange } from "@/lib/admin/analytics-dashboard";
import type {
  KnowledgeAdminPublicationsData,
  KnowledgeAdminResourcesData,
  KnowledgeAdminReviewsData,
} from "@/lib/knowledge";
import type { ProductValidationAdminData } from "@/lib/admin/product-validation";
import type { OperationsQueueItem } from "@/lib/admin/operations-queue";
import type { AdminSystemPreflightData } from "@/lib/admin/system-preflight";
import type { AdminAuditAction } from "@/lib/admin/audit-contract";
import type {
  AnalyticsBreakdown,
  AnalyticsBreakdownDimension,
  AnalyticsContent,
  AnalyticsEvents,
  AnalyticsOverview,
  AnalyticsRange,
  AnalyticsRegistrations,
} from "@/lib/admin/analytics-api-contract";

// ---------- Types ----------

interface TopStyle {
  slug: string;
  total: number;
}

interface TrendingData {
  top: TopStyle[];
}

interface Combination {
  pair: string[];
  count: number;
}

interface CombosData {
  combinations: Combination[];
}

interface RatingData {
  averageRating: number;
  totalRatings: number;
  userRating: number | null;
}

interface Comment {
  id: string;
  content: string;
  author_name: string;
  avatar_url: string | null;
  user_id: string | null;
  created_at: string;
  author_provider: "github" | "linuxdo" | "unknown";
  author_seq_id: number | null;
  author_title: string | null;
  author_title_color: string | null;
  author_title_icon_path: string | null;
}

interface CommentsData {
  comments: Comment[];
  total: number;
}

interface AdminAuditActor {
  type: "user" | "token" | "dev-bypass" | "password-session";
  id: string;
}

interface AdminAuditEvent {
  id: string;
  action: string;
  targetType: string;
  targetId?: string;
  actor: AdminAuditActor;
  ipAddress: string | null;
  userAgent: string | null;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

interface AdminAuditData {
  events: AdminAuditEvent[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
  nextOffset: number | null;
}

export interface CatalogStylesData {
  total: number;
  styles: StyleMeta[];
}

// ---------- Hooks ----------

export function useTrendingStyles(count = 8) {
  return useSWR<TrendingData>(`/api/analytics?top=${count}`);
}

export function useCatalogStyles() {
  return useSWR<CatalogStylesData>("/api/styles", {
    dedupingInterval: 30_000,
    revalidateOnFocus: false,
  });
}

export function usePopularCombos() {
  return useSWR<CombosData>("/api/analytics?combinations=true");
}

export function useStyleRating(slug: string) {
  return useSWR<RatingData>(slug ? `/api/styles/${slug}/rate` : null);
}

export function useStyleComments(slug: string, limit = 10) {
  return useSWR<CommentsData>(
    slug ? `/api/styles/${slug}/comments?limit=${limit}` : null
  );
}

export function useAnalyticsDashboard(range: DashboardRange = "7d") {
  return useSWR<DashboardData>(`/api/admin/analytics?range=${range}`, {
    keepPreviousData: true,
    dedupingInterval: 15_000,
    revalidateOnFocus: false,
  });
}

export function useAnalyticsOverview(
  range: AnalyticsRange = "7d",
  fallbackData?: AnalyticsOverview
) {
  return useSWR<AnalyticsOverview>(`/api/admin/analytics/overview?range=${range}`, {
    fallbackData,
    keepPreviousData: true,
    dedupingInterval: 300_000,
    revalidateOnFocus: false,
  });
}

export function useAnalyticsBreakdown(
  range: AnalyticsRange,
  dimension: AnalyticsBreakdownDimension,
  limit = 10,
  fallbackData?: AnalyticsBreakdown
) {
  const params = new URLSearchParams({
    range,
    dimension,
    limit: String(limit),
  });
  return useSWR<AnalyticsBreakdown>(
    `/api/admin/analytics/breakdown?${params.toString()}`,
    {
      fallbackData,
      keepPreviousData: true,
      dedupingInterval: 300_000,
      revalidateOnFocus: false,
    }
  );
}

export function useAnalyticsRegistrations(
  range: AnalyticsRange,
  fallbackData?: AnalyticsRegistrations
) {
  return useSWR<AnalyticsRegistrations>(
    `/api/admin/analytics/registrations?range=${range}`,
    {
      fallbackData,
      keepPreviousData: true,
      dedupingInterval: 300_000,
      revalidateOnFocus: false,
    }
  );
}

export function useAnalyticsContent(
  range: AnalyticsRange,
  fallbackData?: AnalyticsContent
) {
  return useSWR<AnalyticsContent>(`/api/admin/analytics/content?range=${range}`, {
    fallbackData,
    keepPreviousData: true,
    dedupingInterval: 300_000,
    revalidateOnFocus: false,
  });
}

export function useAnalyticsEvents(range: AnalyticsRange, fallbackData?: AnalyticsEvents) {
  return useSWR<AnalyticsEvents>(`/api/admin/analytics/events?range=${range}`, {
    fallbackData,
    keepPreviousData: true,
    dedupingInterval: 300_000,
    revalidateOnFocus: false,
  });
}

interface AdminAuditQuery {
  limit?: number;
  offset?: number;
  action?: AdminAuditAction;
  days?: number | "all";
  search?: string;
}

export function useAdminAuditEvents(
  query: AdminAuditQuery = {},
  fallbackData?: AdminAuditData
) {
  const params = new URLSearchParams();
  params.set("limit", String(query.limit ?? 20));
  params.set("offset", String(query.offset ?? 0));
  if (query.action && query.action !== "all") {
    params.set("action", query.action);
  }
  if (typeof query.days === "number" && Number.isFinite(query.days) && query.days > 0) {
    params.set("days", String(Math.floor(query.days)));
  }
  if (typeof query.search === "string" && query.search.trim().length > 0) {
    params.set("search", query.search.trim());
  }

  return useSWR<AdminAuditData>(`/api/admin/audit?${params.toString()}`, {
    fallbackData,
    keepPreviousData: true,
    dedupingInterval: 10_000,
    revalidateOnFocus: false,
  });
}

// ---------- Profile ----------

interface ProfileComment {
  id: string;
  style_slug: string;
  content: string;
  created_at: string;
}

interface ProfileCommentsData {
  success: boolean;
  comments: ProfileComment[];
}

interface ProfileSubmission {
  id: string;
  slug: string;
  status: "pending" | "approved" | "rejected";
  submitted_at: string;
  name: string | null;
  name_en: string | null;
  description: string | null;
}

interface ProfileSubmissionsData {
  success: boolean;
  submissions: ProfileSubmission[];
}

interface ProfileRating {
  id: string;
  style_slug: string;
  rating: number;
  created_at: string;
}

interface ProfileRatingsData {
  success: boolean;
  ratings: ProfileRating[];
}

interface ProfileTitleData {
  success: boolean;
  title: string | null;
  titleColor: string | null;
  titleIconPath: string | null;
  seqId: number | null;
}

export function useProfileComments(userId: string | undefined) {
  return useSWR<ProfileCommentsData>(userId ? "/api/profile/comments" : null);
}

export function useProfileSubmissions(userId: string | undefined) {
  return useSWR<ProfileSubmissionsData>(userId ? "/api/profile/submissions" : null, {
    keepPreviousData: true,
    dedupingInterval: 10_000,
    revalidateOnFocus: false,
  });
}

export function useProfileRatings(userId: string | undefined) {
  return useSWR<ProfileRatingsData>(userId ? "/api/profile/ratings" : null);
}

export function useProfileTitle(userId: string | undefined) {
  return useSWR<ProfileTitleData>(userId ? "/api/profile/title" : null);
}

// ---------- Admin Comments ----------

interface AdminComment {
  id: string;
  style_slug: string;
  content: string;
  author_name: string;
  avatar_url: string | null;
  user_id: string | null;
  created_at: string;
}

interface AdminCommentsData {
  comments: AdminComment[];
  total: number;
  limit: number;
  offset: number;
}

interface AdminCommentsQuery {
  limit?: number;
  offset?: number;
  slug?: string;
  search?: string;
  from?: string;
  to?: string;
}

export function useAdminComments(query: AdminCommentsQuery = {}) {
  const params = new URLSearchParams();
  params.set("limit", String(query.limit ?? 20));
  params.set("offset", String(query.offset ?? 0));
  if (query.slug) params.set("slug", query.slug);
  if (query.search?.trim()) params.set("search", query.search.trim());
  if (query.from) params.set("from", query.from);
  if (query.to) params.set("to", query.to);

  return useSWR<AdminCommentsData>(`/api/admin/comments?${params.toString()}`, {
    keepPreviousData: true,
    dedupingInterval: 10_000,
    revalidateOnFocus: false,
  });
}

// ---------- Admin Users ----------

interface AdminUser {
  userId: string;
  authorName: string;
  avatarUrl: string | null;
  commentCount: number;
  ratingCount: number;
  favoriteCount: number;
  submissionCount: number;
  lastActive: string;
  seqId: number | null;
  customTitle: string | null;
  titleColor: string | null;
  titleIconPath: string | null;
  isOwner: boolean;
  titleEnabled: boolean;
  isEarlyUser: boolean;
  resolvedTitle: string | null;
}

interface AdminUsersData {
  users: AdminUser[];
  total: number;
  limit: number;
  offset: number;
}

interface AdminUsersQuery {
  limit?: number;
  offset?: number;
  search?: string;
}

export function useAdminUsers(query: AdminUsersQuery = {}) {
  const params = new URLSearchParams();
  params.set("limit", String(query.limit ?? 20));
  params.set("offset", String(query.offset ?? 0));
  if (query.search?.trim()) params.set("search", query.search.trim());

  return useSWR<AdminUsersData>(`/api/admin/users?${params.toString()}`, {
    dedupingInterval: 300_000,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    keepPreviousData: true,
  });
}

// ---------- Admin System ----------

interface AdminSystemEnvironment {
  nodeEnv: string;
  supabaseConfigured: boolean;
  adminTokenConfigured: boolean;
  adminUserIdsConfigured: boolean;
}

interface AdminSystemTable {
  name: string;
  rowCount: number;
}

interface AdminSystemDatabase {
  connected: boolean;
  tables: AdminSystemTable[];
}

interface AdminSystemRuntime {
  nodeVersion: string;
  uptime: number;
  memoryUsage: {
    rss: number;
    heapUsed: number;
    heapTotal: number;
  };
}

interface AdminSystemAudit {
  fileEventCount: number;
}

interface AdminSystemData {
  environment: AdminSystemEnvironment;
  database: AdminSystemDatabase;
  runtime: AdminSystemRuntime;
  audit: AdminSystemAudit;
}

export interface AdminOperationsData {
  generatedAt: string;
  windowDays: number;
  database: {
    status: "connected" | "degraded" | "not_configured";
  };
  queue: {
    pendingSubmissions: number | null;
    pendingKnowledgeReviews: number | null;
    unpublishedSupport: number | null;
    items: OperationsQueueItem[];
  };
  signals: {
    recentComments: number | null;
    recentRatings: number | null;
    newsletterSubscribers: number | null;
    publishedSupport: number | null;
  };
  latestSupport: Array<{
    id: string;
    donated_on: string;
    donor_label: string;
    amount: string | null;
    published: boolean;
  }>;
  recentAudit: Array<{
    id: string;
    action: string;
    targetType: string;
    targetId: string | null;
    createdAt: string;
  }>;
  runtime: {
    nodeVersion: string;
    uptime: number;
    memoryRss: number;
  };
}

export function useAdminSystem() {
  return useSWR<AdminSystemData>("/api/admin/system", {
    keepPreviousData: true,
    dedupingInterval: 15_000,
    revalidateOnFocus: false,
  });
}

export function useAdminSystemPreflight() {
  return useSWR<AdminSystemPreflightData>("/api/admin/system/preflight", {
    keepPreviousData: true,
    dedupingInterval: 15_000,
    revalidateOnFocus: false,
  });
}

export function useAdminOperations() {
  return useSWR<AdminOperationsData>("/api/admin/operations", {
    keepPreviousData: true,
    dedupingInterval: 15_000,
    revalidateOnFocus: false,
  });
}

export function useAdminProductValidation() {
  return useSWR<ProductValidationAdminData>("/api/admin/product-validation", {
    keepPreviousData: true,
    dedupingInterval: 15_000,
    revalidateOnFocus: false,
  });
}

export function useAdminKnowledgeResources() {
  return useSWR<KnowledgeAdminResourcesData>("/api/admin/knowledge/resources", {
    keepPreviousData: true,
    dedupingInterval: 15_000,
    revalidateOnFocus: false,
  });
}

export function useAdminKnowledgeReviews(resourceId: string | null) {
  return useSWR<KnowledgeAdminReviewsData>(
    resourceId ? `/api/admin/knowledge/reviews?resourceId=${encodeURIComponent(resourceId)}` : null,
    { keepPreviousData: true, dedupingInterval: 10_000, revalidateOnFocus: false },
  );
}

export function useAdminKnowledgePublications(resourceId: string | null) {
  return useSWR<KnowledgeAdminPublicationsData>(
    resourceId ? `/api/admin/knowledge/publications?resourceId=${encodeURIComponent(resourceId)}` : null,
    { keepPreviousData: true, dedupingInterval: 10_000, revalidateOnFocus: false },
  );
}

// ---------- Admin Styles ----------

interface AdminStyleStats {
  views: number;
  avgRating: number;
  totalRatings: number;
  totalComments: number;
  totalFavorites: number;
}

interface AdminStyle {
  slug: string;
  name: string;
  nameEn: string;
  category: string;
  tags: string[];
  colors: { primary: string; secondary: string; accent: string[] };
  stats: AdminStyleStats;
}

interface AdminStylesData {
  styles: AdminStyle[];
}

interface AdminStylesQuery {
  category?: string;
  sort?: string;
  order?: string;
  search?: string;
}

export function useAdminStyles(query: AdminStylesQuery = {}) {
  const params = new URLSearchParams();
  if (query.category) params.set("category", query.category);
  if (query.sort) params.set("sort", query.sort);
  if (query.order) params.set("order", query.order);
  if (query.search?.trim()) params.set("search", query.search.trim());

  const qs = params.toString();
  return useSWR<AdminStylesData>(`/api/admin/styles${qs ? `?${qs}` : ""}`, {
    keepPreviousData: true,
    dedupingInterval: 300_000,
    revalidateOnFocus: false,
  });
}

// ---------- Admin Ratings ----------

interface AdminRating {
  id: string;
  style_slug: string;
  rating: number;
  session_id: string | null;
  user_id: string | null;
  ip_address: string | null;
  created_at: string;
}

interface AdminRatingDistribution {
  rating: number;
  count: number;
}

interface AdminRatingsData {
  ratings: AdminRating[];
  total: number;
  limit: number;
  offset: number;
  distribution: AdminRatingDistribution[];
}

interface AdminRatingsQuery {
  limit?: number;
  offset?: number;
  slug?: string;
  rating?: number | null;
  anomalies?: boolean;
}

export function useAdminRatings(query: AdminRatingsQuery = {}) {
  const params = new URLSearchParams();
  params.set("limit", String(query.limit ?? 20));
  params.set("offset", String(query.offset ?? 0));
  if (query.slug) params.set("slug", query.slug);
  if (query.rating != null) params.set("rating", String(query.rating));
  if (query.anomalies) params.set("anomalies", "true");

  return useSWR<AdminRatingsData>(`/api/admin/ratings?${params.toString()}`, {
    keepPreviousData: true,
    dedupingInterval: 10_000,
    revalidateOnFocus: false,
  });
}

// Re-export types
export type {
  ProductValidationAdminData,
  KnowledgeAdminPublicationsData,
  KnowledgeAdminResourcesData,
  KnowledgeAdminReviewsData,
  TopStyle,
  TrendingData,
  Combination,
  CombosData,
  RatingData,
  Comment,
  CommentsData,
  DashboardData,
  AdminAuditActor,
  AdminAuditEvent,
  AdminAuditData,
  AdminAuditQuery,
  ProfileComment,
  ProfileCommentsData,
  ProfileSubmission,
  ProfileSubmissionsData,
  ProfileRating,
  ProfileRatingsData,
  ProfileTitleData,
  AdminComment,
  AdminCommentsData,
  AdminCommentsQuery,
  AdminUser,
  AdminUsersData,
  AdminUsersQuery,
  AdminSystemEnvironment,
  AdminSystemTable,
  AdminSystemDatabase,
  AdminSystemRuntime,
  AdminSystemAudit,
  AdminSystemData,
  AdminStyleStats,
  AdminStyle,
  AdminStylesData,
  AdminStylesQuery,
  AdminRating,
  AdminRatingDistribution,
  AdminRatingsData,
  AdminRatingsQuery,
};
