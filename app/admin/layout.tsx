import type { ReactNode } from "react";
import { AdminSidebarProvider } from "@/components/admin/admin-sidebar-provider";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { DbStatusBanner } from "@/components/admin/db-status-banner";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminSidebarProvider>
      <div className="min-h-screen flex flex-col">
        <AdminHeader />
        <div className="flex flex-1">
          <AdminSidebar />
          <main className="flex-1 min-w-0">
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 md:py-12">
              <DbStatusBanner />
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminSidebarProvider>
  );
}
