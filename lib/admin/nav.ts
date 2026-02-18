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
  labelKey: string;
  icon: LucideIcon;
}

export const adminNavItems: AdminNavItem[] = [
  { href: "/admin/analytics", labelKey: "admin.nav.analytics", icon: BarChart3 },
  { href: "/admin/submissions", labelKey: "admin.nav.submissions", icon: FileText },
  { href: "/admin/comments", labelKey: "admin.nav.comments", icon: MessageSquare },
  { href: "/admin/ratings", labelKey: "admin.nav.ratings", icon: Star },
  { href: "/admin/styles", labelKey: "admin.nav.styles", icon: Palette },
  { href: "/admin/users", labelKey: "admin.nav.users", icon: Users },
  { href: "/admin/system", labelKey: "admin.nav.system", icon: Activity },
];
