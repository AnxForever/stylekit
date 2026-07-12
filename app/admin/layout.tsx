import type { ReactNode } from "react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
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
            body:has(.admin-shell) [data-site-announcement] {
              display: none;
            }
            body:has(.admin-shell) [role="banner"].z-50 {
              display: none;
            }
          `,
        }}
      />
      <div
        className={`${GeistSans.variable} ${GeistMono.variable} admin-shell min-h-screen bg-[var(--admin-canvas)] text-[var(--admin-text-primary)]`}
      >
        <AdminHeader />
        <div className="flex min-h-screen">
          <AdminSidebar />
          <main className="min-w-0 flex-1 lg:pl-64">
            <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
              <DbStatusBanner />
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminSidebarProvider>
  );
}
