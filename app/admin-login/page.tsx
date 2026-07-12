import { Suspense } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import {
  ADMIN_SESSION_COOKIE_NAME,
  verifyAdminSessionCookieValue,
} from "@/lib/auth/admin-session";
import { AdminLoginContent } from "./_content";

export const metadata: Metadata = {
  title: "管理后台登录 - StyleKit",
  description: "登录 StyleKit 管理后台。",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  if (await verifyAdminSessionCookieValue(sessionCookie)) {
    redirect("/admin/analytics");
  }

  return (
    <div className={`${GeistSans.variable} ${GeistMono.variable} admin-shell`}>
      <Suspense>
        <AdminLoginContent />
      </Suspense>
    </div>
  );
}
