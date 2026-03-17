import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "StyleKit documentation covering getting started, style systems, exports, AI workflows, and implementation guidance.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://stylekit.top"}/docs`,
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
