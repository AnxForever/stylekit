"use client";

import { Heart, Eye, TrendingUp, Clock, Award, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

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
  const { locale } = useI18n();
  const isZh = locale === "zh";

  const statItems = [
    {
      icon: Award,
      label: isZh ? "社区风格" : "Community Styles",
      value: stats.totalSubmissions.toLocaleString(),
      gradient: "from-blue-500/20 to-indigo-500/20",
      iconColor: "text-blue-500",
    },
    {
      icon: Users,
      label: isZh ? "贡献者" : "Contributors",
      value: stats.totalCollaborators.toLocaleString(),
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-500",
    },
    {
      icon: Clock,
      label: isZh ? "本月新增" : "This Month",
      value: stats.recentSubmissions.toLocaleString(),
      gradient: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-500",
    },
  ];

  return (
    <div className="border-b border-border bg-gradient-to-b from-zinc-50/50 to-transparent dark:from-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {statItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${item.gradient} 
                  border border-border/50 p-5 transition-all hover:scale-[1.02] hover:shadow-lg`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-lg bg-background/80 ${item.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className="text-2xl font-bold tracking-tight mt-0.5">
                      {item.value}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Style */}
        {stats.topStyle && (
          <div className="relative overflow-hidden rounded-xl border border-border bg-background/80 backdrop-blur-sm p-5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full" />
            
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {isZh ? "本月精选" : "Featured This Month"}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold mb-3">{stats.topStyle.title}</h3>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted">
                  {isZh ? "作者：" : "by "}{stats.topStyle.author}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-rose-500">
                    <Heart className="w-4 h-4" />
                    <span className="font-medium">{stats.topStyle.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted">
                    <Eye className="w-4 h-4" />
                    <span>{stats.topStyle.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
