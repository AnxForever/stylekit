import type { Metadata } from "next";
import { TemplateViewTracker } from "@/components/analytics/template-view-tracker";

export const metadata: Metadata = {
  title: "Page Templates",
  description:
    "30+ production-ready page templates for SaaS landing, admin panel, e-commerce, portfolio, blog, dashboard, auth, and more. Preview and export with one click.",
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TemplateViewTracker />
      {children}
    </>
  );
}
