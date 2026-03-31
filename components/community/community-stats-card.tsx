import { Heart, Eye, Share2, TrendingUp, Clock, Award } from "lucide-react";

export interface CommunityStats {
  totalSubmissions: number;
  totalCollaborators: number;
  recentSubmissions: number;
  topStyle: {
    title: string;
    author: string;
    likes: number;
    views: number;
  } | null;
}

interface CommunityStatsCardProps {
  stats: CommunityStats;
}

export function CommunityStatsCard({ stats }: CommunityStatsCardProps) {
  const statItems = [
    {
      icon: <Award className="w-5 h-5" />,
      label: "Total Styles",
      value: stats.totalSubmissions.toLocaleString(),
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: "Contributors",
      value: stats.totalCollaborators.toLocaleString(),
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "This Month",
      value: stats.recentSubmissions.toLocaleString(),
      color: "bg-green-500/10 text-green-600 dark:text-green-400",
    },
  ];

  return (
    <div className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {statItems.map((item, idx) => (
            <div
              key={idx}
              className={`${item.color} border border-current/20 rounded-lg p-4 flex items-center gap-3`}
            >
              {item.icon}
              <div>
                <div className="text-xs font-semibold opacity-70">{item.label}</div>
                <div className="text-2xl font-bold">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {stats.topStyle && (
          <div className="border border-border rounded-lg p-4 bg-background/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
              <TrendingUp className="w-4 h-4" />
              Featured This Month
            </div>
            <h3 className="text-lg font-semibold mb-3">{stats.topStyle.title}</h3>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted">by {stats.topStyle.author}</div>
              <div className="flex items-center gap-4 text-sm text-muted">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {stats.topStyle.likes}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {stats.topStyle.views}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
