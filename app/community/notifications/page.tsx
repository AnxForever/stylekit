import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { NotificationInbox } from "@/components/community/notification-inbox";
import { getRequestLocaleContext } from "@/lib/i18n/request";

export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getRequestLocaleContext();
  return {
    title: locale === "zh" ? "社区通知" : "Community notifications",
    robots: { index: false, follow: false },
  };
}

export default async function NotificationsPage() {
  const { locale } = await getRequestLocaleContext();
  const isZh = locale === "zh";
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <Breadcrumb items={[{ label: isZh ? "社区" : "Community", href: "/community" }, { label: isZh ? "通知" : "Notifications" }]} />
        <h1 className="mt-6 font-serif text-3xl">{isZh ? "社区通知" : "Community notifications"}</h1>
        <p className="mb-8 mt-3 text-sm leading-7 text-muted">{isZh ? "查看谁回复了你，回到原讨论继续交流。这里只发送站内通知。" : "See who replied and return to the conversation. These are in-app notifications only."}</p>
        <NotificationInbox />
      </main>
      <Footer compact />
    </div>
  );
}
