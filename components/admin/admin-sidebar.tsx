"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems } from "@/lib/admin/nav";
import { useAdminSidebar } from "./admin-sidebar-provider";
import { useI18n } from "@/lib/i18n/context";
import { useRouter } from "next/navigation";
import type { TranslationKey } from "@/lib/i18n/translations";
import { X, LogOut } from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const { open, close } = useAdminSidebar();
  const { t } = useI18n();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin-login");
    router.refresh();
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-60 border-r border-border bg-background transition-transform lg:static lg:translate-x-0 flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-border lg:py-6">
          <Link
            href="/admin/analytics"
            className="text-lg font-bold"
            onClick={close}
          >
            Admin
          </Link>
          <button
            onClick={close}
            className="p-1 text-muted hover:text-foreground lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-2 py-4 space-y-1 flex-1">
          {adminNavItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted hover:text-foreground hover:bg-muted/10"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {t(item.labelKey as TranslationKey)}
              </Link>
            );
          })}
        </nav>

        <div className="px-2 py-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm font-medium text-muted hover:text-foreground hover:bg-muted/10 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
