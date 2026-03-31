export type SortMethod = "trending" | "recent" | "popular" | "hot";

export interface SortOptionDef {
  value: SortMethod;
  labelEn: string;
  labelZh: string;
  iconName: "TrendingUp" | "Clock" | "Heart" | "Zap";
  descriptionEn: string;
  descriptionZh: string;
}

// 纯数据定义，不包含 React 组件，适合 Server Component
export const SORT_OPTIONS_DEF: SortOptionDef[] = [
  {
    value: "trending",
    labelEn: "Trending",
    labelZh: "热门趋势",
    iconName: "TrendingUp",
    descriptionEn: "Most engagement this week",
    descriptionZh: "本周互动最多",
  },
  {
    value: "recent",
    labelEn: "Recent",
    labelZh: "最新发布",
    iconName: "Clock",
    descriptionEn: "Newest submissions first",
    descriptionZh: "按时间倒序",
  },
  {
    value: "popular",
    labelEn: "Popular",
    labelZh: "最受欢迎",
    iconName: "Heart",
    descriptionEn: "Most liked all-time",
    descriptionZh: "累计点赞最多",
  },
  {
    value: "hot",
    labelEn: "Hot",
    labelZh: "火速增长",
    iconName: "Zap",
    descriptionEn: "Rapid growth momentum",
    descriptionZh: "增长势头最猛",
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

export type BadgeType = "hot" | "rising" | "viral" | null;

export interface EngagementBadge {
  type: BadgeType;
  labelEn: string;
  labelZh: string;
  color: string;
  iconName: "Zap" | "TrendingUp" | "Sparkles";
}

/**
 * Calculate engagement metrics for display
 * Returns pure data without React components for Server Component compatibility
 */
export function calculateEngagementBadge(
  style: CommunityStyleWithStats
): EngagementBadge | null {
  const totalEngagement = style.likes + style.shares * 2;
  const engagementRate = totalEngagement / Math.max(style.views, 1);

  if (style.trend > 50) {
    return {
      type: "hot",
      labelEn: "Hot",
      labelZh: "火热",
      color: "bg-red-500/20 text-red-600 dark:text-red-400",
      iconName: "Zap",
    };
  }

  if (style.trend > 25) {
    return {
      type: "rising",
      labelEn: "Rising",
      labelZh: "上升中",
      color: "bg-orange-500/20 text-orange-600 dark:text-orange-400",
      iconName: "TrendingUp",
    };
  }

  if (engagementRate > 0.05 && style.likes > 10) {
    return {
      type: "viral",
      labelEn: "Viral",
      labelZh: "爆款",
      color: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
      iconName: "Sparkles",
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
