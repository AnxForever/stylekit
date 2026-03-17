import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Templates",
  description:
    "30+ production-ready page templates for SaaS landing, admin panel, e-commerce, portfolio, blog, dashboard, auth, and more. Preview and export with one click.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://stylekit.top"}/templates`,
  },
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
