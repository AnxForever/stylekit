"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X, LogOut, Sparkles } from "lucide-react";
import { adminNavItems } from "@/lib/admin/nav";
import { useI18n } from "@/lib/i18n/context";
import type { TranslationKey } from "@/lib/i18n/translations";
import { useAdminSidebar } from "./admin-sidebar-provider";

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
      {open ? (
        <div
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm lg:hidden"
          onClick={close}
        />
      ) : null}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-[var(--admin-border-soft)] bg-[var(--admin-rail)] shadow-2xl shadow-black/10 backdrop-blur transition-transform lg:translate-x-0 lg:shadow-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--admin-border-soft)] px-4 py-4">
          <Link
            href="/admin/analytics"
            className="flex min-w-0 items-center gap-3"
            onClick={close}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--admin-border-soft)] bg-foreground text-background">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold leading-5">
                StyleKit
              </span>
              <span className="block text-xs text-muted">Admin console</span>
            </span>
          </Link>
          <button
            onClick={close}
            className="rounded-md p-2 text-muted transition-colors hover:bg-muted/10 hover:text-foreground lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {adminNavItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={`group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted hover:bg-muted/10 hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {t(item.labelKey as TranslationKey)}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[var(--admin-border-soft)] p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-muted/10 hover:text-foreground"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
