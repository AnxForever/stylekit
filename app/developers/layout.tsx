import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Tools",
  description:
    "Developer resources for StyleKit including the CLI, MCP server, API endpoints, and AI workflow integrations.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.stylekit.top"}/developers`,
  },
};

export default function DevelopersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
