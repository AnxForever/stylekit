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
}

interface CommentsData {
  comments: Comment[];
  total: number;
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

export function useAnalyticsDashboard(range: "7d" | "30d" | "all" = "7d") {
  return useSWR<DashboardData>(`/api/analytics/dashboard?range=${range}`);
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

// Re-export types
export type {
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
};
