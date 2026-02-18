"use client";

import { Menu } from "lucide-react";
import { useAdminSidebar } from "./admin-sidebar-provider";

export function AdminHeader() {
  const { toggle } = useAdminSidebar();

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background px-4 py-3 lg:hidden">
      <button
        onClick={toggle}
        className="p-1 text-muted hover:text-foreground"
        aria-label="Toggle sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>
      <span className="text-sm font-bold">Admin</span>
    </header>
  );
}
