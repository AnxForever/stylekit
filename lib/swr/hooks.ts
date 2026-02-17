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
};
