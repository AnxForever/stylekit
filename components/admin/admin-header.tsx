"use client";

import { Menu } from "lucide-react";
import { useAdminSidebar } from "./admin-sidebar-provider";

export function AdminHeader() {
  const { open, toggle } = useAdminSidebar();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 bg-[var(--admin-rail)] px-4 shadow-[0_1px_0_0_var(--admin-border-soft)] lg:hidden">
      <button
        id="admin-sidebar-toggle"
        onClick={toggle}
        className="flex h-10 w-10 items-center justify-center rounded-md text-muted transition-colors hover:bg-[var(--admin-hover)] hover:text-foreground"
        aria-label="切换侧边栏"
        aria-expanded={open}
        aria-controls="admin-sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>
      <div>
        <span className="block text-sm font-medium leading-5">StyleKit</span>
        <span className="block text-xs text-muted">管理后台</span>
      </div>
    </header>
  );
}
