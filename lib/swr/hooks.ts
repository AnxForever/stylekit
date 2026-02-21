"use client";

import useSWR from "swr";

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
}

interface CommentsData {
  comments: Comment[];
  total: number;
}

interface CommunityAuthor {
  handle: string;
  avatarUrl: string | null;
  provider: "github" | "linuxdo" | "unknown";
  userId: string | null;
}

interface CommunityFeedItem {
  id: string;
  slug: string;
  status: "approved";
  submittedAt: string;
  reviewedAt: string | null;
  title: string;
  titleEn: string | null;
  description: string | null;
  cover: string | null;
  author: CommunityAuthor;
}

interface CommunityFeedData {
  items: CommunityFeedItem[];
  total: number;
  limit: number;
  offset: number;
}

interface CommunityFeedQuery {
  limit?: number;
  offset?: number;
  slug?: string;
}

interface DashboardData {
  totalEvents: number;
  totalStyles: number;
  topStyles: { slug: string; count: number }[];
  eventsByType: { type: string; count: number }[];
  recentActivity: { date: string; count: number }[];
}

interface AdminAuditActor {
  type: "user" | "token" | "dev-bypass";
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

// ---------- Hooks ----------

export function useTrendingStyles(count = 8) {
  return useSWR<TrendingData>(`/api/analytics?top=${count}`);
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

export function useCommunityFeed(query: CommunityFeedQuery = {}) {
  const params = new URLSearchParams();
  params.set("limit", String(query.limit ?? 12));
  params.set("offset", String(query.offset ?? 0));
  if (query.slug?.trim()) {
    params.set("slug", query.slug.trim().toLowerCase());
  }
  return useSWR<CommunityFeedData>(`/api/community/feed?${params.toString()}`);
}

export function useAnalyticsDashboard(range: "7d" | "30d" | "all" = "7d") {
  return useSWR<DashboardData>(`/api/admin/analytics?range=${range}`);
}

interface AdminAuditQuery {
  limit?: number;
  offset?: number;
  action?: "submission.approve" | "submission.reject" | "all";
  days?: number | "all";
  search?: string;
}

export function useAdminAuditEvents(query: AdminAuditQuery = {}) {
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

  return useSWR<AdminAuditData>(`/api/admin/audit?${params.toString()}`);
}

export function useProfileComments(userId: string | undefined) {
  return useSWR<ProfileCommentsData>(userId ? "/api/profile/comments" : null);
}

export function useProfileSubmissions(userId: string | undefined) {
  return useSWR<ProfileSubmissionsData>(userId ? "/api/profile/submissions" : null);
}

export function useProfileRatings(userId: string | undefined) {
  return useSWR<ProfileRatingsData>(userId ? "/api/profile/ratings" : null);
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

  return useSWR<AdminCommentsData>(`/api/admin/comments?${params.toString()}`);
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
    refreshInterval: 10000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
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

export function useAdminSystem() {
  return useSWR<AdminSystemData>("/api/admin/system");
}

// ---------- Admin Generator Telemetry ----------

type AdminGeneratorEndpoint = "generate-style" | "generate-design-system";
type AdminGeneratorOutcome = "success" | "error";
type AdminGeneratorFallbackReason =
  | "network-error"
  | "invalid-payload"
  | "unexpected-status"
  | "not-modified-without-cache";
type AdminGeneratorGroupBy = "none" | "fallback-reason";

interface AdminGeneratorEvent {
  endpoint: AdminGeneratorEndpoint;
  outcome: AdminGeneratorOutcome;
  status: number;
  code?: string;
  durationMs: number;
  timestamp: string;
  clientHash: string;
}

interface AdminGeneratorEndpointMetrics {
  total: number;
  success: number;
  error: number;
  avgDurationMs: number;
  p95DurationMs: number;
}

interface AdminGeneratorDailyPoint {
  date: string;
  total: number;
  success: number;
  error: number;
  avgDurationMs: number;
  p95DurationMs: number;
  fallback: {
    total: number;
    network: number;
    invalidPayload: number;
    unexpectedStatus: number;
    notModifiedWithoutCache: number;
  };
}

interface AdminGeneratorGroups {
  fallbackReason: Array<{
    reason: AdminGeneratorFallbackReason;
    count: number;
  }>;
}

interface AdminGeneratorSummary {
  totalRequests: number;
  successCount: number;
  errorCount: number;
  successRate: number;
  avgDurationMs: number;
  p95DurationMs: number;
  byEndpoint: Record<AdminGeneratorEndpoint, AdminGeneratorEndpointMetrics>;
  topErrorCodes: Array<{ code: string; count: number }>;
  fallbackReports: {
    total: number;
    network: number;
    invalidPayload: number;
    unexpectedStatus: number;
    notModifiedWithoutCache: number;
  };
  daily: AdminGeneratorDailyPoint[];
}

interface AdminGeneratorTelemetryData {
  events: AdminGeneratorEvent[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
  nextOffset: number | null;
  groupBy: AdminGeneratorGroupBy;
  groups: AdminGeneratorGroups | null;
  summary: AdminGeneratorSummary;
}

interface AdminGeneratorTelemetryQuery {
  limit?: number;
  offset?: number;
  minutes?: number;
  trendDays?: number;
  endpoint?: AdminGeneratorEndpoint;
  outcome?: AdminGeneratorOutcome;
  code?: string;
  fallbackReason?: AdminGeneratorFallbackReason;
  groupBy?: AdminGeneratorGroupBy;
}

export function useAdminGeneratorTelemetry(query: AdminGeneratorTelemetryQuery = {}) {
  const params = new URLSearchParams();
  params.set("limit", String(query.limit ?? 20));
  params.set("offset", String(query.offset ?? 0));
  if (typeof query.minutes === "number" && Number.isFinite(query.minutes) && query.minutes > 0) {
    params.set("minutes", String(Math.floor(query.minutes)));
  }
  if (typeof query.trendDays === "number" && Number.isFinite(query.trendDays) && query.trendDays > 0) {
    params.set("trendDays", String(Math.floor(query.trendDays)));
  }
  if (query.endpoint) {
    params.set("endpoint", query.endpoint);
  }
  if (query.outcome) {
    params.set("outcome", query.outcome);
  }
  if (query.code?.trim()) {
    params.set("code", query.code.trim());
  }
  if (query.fallbackReason) {
    params.set("fallbackReason", query.fallbackReason);
  }
  if (query.groupBy && query.groupBy !== "none") {
    params.set("groupBy", query.groupBy);
  }

  return useSWR<AdminGeneratorTelemetryData>(`/api/admin/generator?${params.toString()}`);
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
  return useSWR<AdminStylesData>(`/api/admin/styles${qs ? `?${qs}` : ""}`);
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

  return useSWR<AdminRatingsData>(`/api/admin/ratings?${params.toString()}`);
}

// Re-export types
export type {
  TopStyle,
  TrendingData,
  Combination,
  CombosData,
  RatingData,
  Comment,
  CommentsData,
  CommunityAuthor,
  CommunityFeedItem,
  CommunityFeedData,
  CommunityFeedQuery,
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
  AdminGeneratorEndpoint,
  AdminGeneratorOutcome,
  AdminGeneratorFallbackReason,
  AdminGeneratorGroupBy,
  AdminGeneratorEvent,
  AdminGeneratorEndpointMetrics,
  AdminGeneratorDailyPoint,
  AdminGeneratorGroups,
  AdminGeneratorSummary,
  AdminGeneratorTelemetryData,
  AdminGeneratorTelemetryQuery,
  AdminStyleStats,
  AdminStyle,
  AdminStylesData,
  AdminStylesQuery,
  AdminRating,
  AdminRatingDistribution,
  AdminRatingsData,
  AdminRatingsQuery,
};
