"use client";

import { Menu } from "lucide-react";
import { useAdminSidebar } from "./admin-sidebar-provider";

export function AdminHeader() {
  const { toggle } = useAdminSidebar();

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-[var(--admin-border-soft)] bg-[var(--admin-rail)] px-4 py-3 backdrop-blur lg:hidden">
      <button
        onClick={toggle}
        className="flex h-11 w-11 items-center justify-center rounded-md text-muted transition-colors hover:bg-muted/10 hover:text-foreground"
        aria-label="Toggle sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>
      <div>
        <span className="block text-sm font-semibold leading-5">StyleKit</span>
        <span className="block text-xs text-muted">Admin console</span>
      </div>
    </header>
  );
}
