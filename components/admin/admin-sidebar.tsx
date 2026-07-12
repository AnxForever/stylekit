"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { X, LogOut } from "lucide-react";
import { adminNavItems } from "@/lib/admin/nav";
import { useAdminSidebar } from "./admin-sidebar-provider";

export function AdminSidebar() {
  const pathname = usePathname();
  const { open, close } = useAdminSidebar();
  const router = useRouter();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      document.getElementById("admin-sidebar-toggle")?.focus();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, close]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin-login");
    router.refresh();
  };

  return (
    <>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm lg:hidden"
          onClick={close}
          aria-label="关闭侧边栏"
        />
      ) : null}

      <aside
        id="admin-sidebar"
        aria-label="管理后台"
        className={`fixed left-0 top-0 z-50 flex h-full w-64 flex-col bg-[var(--admin-rail)] shadow-[1px_0_0_0_var(--admin-border-soft)] transition-[transform,visibility] duration-200 lg:visible lg:translate-x-0 ${
          open ? "visible translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 shadow-[0_1px_0_0_var(--admin-border-soft)]">
          <Link
            href="/admin/analytics"
            className="flex min-w-0 items-center gap-2.5 rounded-md px-1 py-1"
            onClick={close}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-foreground text-[13px] font-semibold text-background shadow-[var(--admin-shadow-border)]">
              S
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium leading-5">
                StyleKit
              </span>
              <span className="block text-xs text-muted">管理后台</span>
            </span>
          </Link>
          <button
            ref={closeButtonRef}
            onClick={close}
            className="rounded-md p-2 text-muted transition-colors hover:bg-[var(--admin-hover)] hover:text-foreground lg:hidden"
            aria-label="关闭侧边栏"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="管理后台导航" className="flex-1 space-y-1 px-3 py-4">
          {adminNavItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                aria-current={isActive ? "page" : undefined}
                className={`group flex h-9 items-center gap-3 rounded-md px-3 text-sm font-normal transition-colors ${
                  isActive
                    ? "bg-[var(--admin-hover)] text-foreground"
                    : "text-muted hover:bg-[var(--admin-hover)] hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 shadow-[0_-1px_0_0_var(--admin-border-soft)]">
          <button
            onClick={handleLogout}
            className="flex h-9 w-full items-center gap-3 rounded-md px-3 text-sm font-normal text-muted transition-colors hover:bg-[var(--admin-hover)] hover:text-foreground"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            退出登录
          </button>
        </div>
      </aside>
    </>
  );
}
