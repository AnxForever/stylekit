import { Suspense } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE_NAME,
  verifyAdminSessionCookieValue,
} from "@/lib/auth/admin-session";
import { AdminLoginContent } from "./_content";

export const metadata: Metadata = {
  title: "Admin sign in - StyleKit",
  description: "Sign in to the StyleKit admin console.",
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
    <Suspense>
      <AdminLoginContent />
    </Suspense>
  );
}
