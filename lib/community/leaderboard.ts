import {
  TrendingUp,
  Clock,
  Heart,
  Zap,
  Sparkles,
  BarChart3,
} from "lucide-react";

export type SortMethod = "trending" | "recent" | "popular" | "hot";

export interface SortOption {
  value: SortMethod;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export const SORT_OPTIONS: SortOption[] = [
  {
    value: "trending",
    label: "Trending",
    icon: <TrendingUp className="w-4 h-4" />,
    description: "Most engagement this week",
  },
  {
    value: "recent",
    label: "Recent",
    icon: <Clock className="w-4 h-4" />,
    description: "Newest submissions first",
  },
  {
    value: "popular",
    label: "Popular",
    icon: <Heart className="w-4 h-4" />,
    description: "Most liked all-time",
  },
  {
    value: "hot",
    label: "Hot",
    icon: <Zap className="w-4 h-4" />,
    description: "Rapid growth momentum",
  },
];

export interface CommunityStyleWithStats {
  id: string;
  title: string;
  titleEn?: string;
  author: {
    handle: string;
    avatarUrl?: string;
    provider: string;
  };
  description?: string;
  cover?: string;
  submittedAt: string;
  likes: number;
  views: number;
  shares: number;
  trend: number; // percentage change this week
  category?: string;
  tags?: string[];
}

/**
 * Sort community styles based on the selected method
 */
export function sortCommunityStyles(
  styles: CommunityStyleWithStats[],
  method: SortMethod
): CommunityStyleWithStats[] {
  const now = Date.now();

  switch (method) {
    case "trending": {
      // Trending: recent + high engagement rate
      return [...styles].sort((a, b) => {
        const ageA = now - new Date(a.submittedAt).getTime();
        const ageB = now - new Date(b.submittedAt).getTime();
        const week = 7 * 24 * 60 * 60 * 1000;

        // Only consider recent submissions (within 2 weeks)
        const recentA = ageA < week * 2 ? 1 : 0;
        const recentB = ageB < week * 2 ? 1 : 0;

        if (recentA !== recentB) return recentB - recentA;

        // Score = engagement rate + trend
        const scoreA = (a.likes + a.shares * 2) / Math.max(a.views, 1) + a.trend / 100;
        const scoreB = (b.likes + b.shares * 2) / Math.max(b.views, 1) + b.trend / 100;
        return scoreB - scoreA;
      });
    }

    case "recent":
      return [...styles].sort(
        (a, b) =>
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );

    case "popular":
      return [...styles].sort((a, b) => {
        // Weighted: likes (weight: 3), shares (weight: 2), views (weight: 1)
        const scoreA = a.likes * 3 + a.shares * 2 + a.views;
        const scoreB = b.likes * 3 + b.shares * 2 + b.views;
        return scoreB - scoreA;
      });

    case "hot": {
      // Hot: high velocity growth
      return [...styles].sort((a, b) => {
        // Combine trend and engagement rate
        const trendA = a.trend;
        const trendB = b.trend;

        if (Math.abs(trendA - trendB) > 10) return trendB - trendA;

        // Fallback to engagement rate
        const engagementA = (a.likes + a.shares * 2) / Math.max(a.views, 1);
        const engagementB = (b.likes + b.shares * 2) / Math.max(b.views, 1);
        return engagementB - engagementA;
      });
    }

    default:
      return styles;
  }
}

/**
 * Calculate engagement metrics for display
 */
export function calculateEngagementBadge(
  style: CommunityStyleWithStats
): { label: string; color: string; icon: React.ReactNode } | null {
  const totalEngagement = style.likes + style.shares * 2;
  const engagementRate = totalEngagement / Math.max(style.views, 1);

  if (style.trend > 50) {
    return {
      label: "🔥 Hot",
      color: "bg-red-500/20 text-red-600 dark:text-red-400",
      icon: <Zap className="w-3 h-3" />,
    };
  }

  if (style.trend > 25) {
    return {
      label: "📈 Rising",
      color: "bg-orange-500/20 text-orange-600 dark:text-orange-400",
      icon: <TrendingUp className="w-3 h-3" />,
    };
  }

  if (engagementRate > 0.05 && style.likes > 10) {
    return {
      label: "⭐ Viral",
      color: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
      icon: <Sparkles className="w-3 h-3" />,
    };
  }

  return null;
}

/**
 * Format large numbers for display
 */
export function formatEngagementCount(count: number): string {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return count.toString();
}
