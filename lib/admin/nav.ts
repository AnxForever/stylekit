import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  FileText,
  MessageSquare,
  Star,
  Palette,
  Users,
  Activity,
} from "lucide-react";

export interface AdminNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const adminNavItems: AdminNavItem[] = [
  { href: "/admin/analytics", label: "数据分析", icon: BarChart3 },
  { href: "/admin/submissions", label: "投稿管理", icon: FileText },
  { href: "/admin/comments", label: "评论管理", icon: MessageSquare },
  { href: "/admin/ratings", label: "评分管理", icon: Star },
  { href: "/admin/styles", label: "风格总览", icon: Palette },
  { href: "/admin/users", label: "用户管理", icon: Users },
  { href: "/admin/system", label: "系统概况", icon: Activity },
];
