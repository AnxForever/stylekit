import type { ReactNode } from "react";
import { AdminSidebarProvider } from "@/components/admin/admin-sidebar-provider";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { DbStatusBanner } from "@/components/admin/db-status-banner";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminSidebarProvider>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body:has(.admin-shell) {
              padding-bottom: 0;
            }
            body:has(.admin-shell) > nav[aria-label="Mobile navigation"] {
              display: none;
            }
          `,
        }}
      />
      <div className="admin-shell min-h-screen bg-[var(--admin-canvas)] text-foreground">
        <AdminHeader />
        <div className="flex min-h-screen">
          <AdminSidebar />
          <main className="min-w-0 flex-1 lg:pl-72">
            <div className="mx-auto max-w-[1480px] px-3 py-4 sm:px-5 lg:px-7 lg:py-6">
              <DbStatusBanner />
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminSidebarProvider>
  );
}
