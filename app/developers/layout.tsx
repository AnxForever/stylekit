import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Tools",
  description:
    "Developer resources for StyleKit including the CLI, MCP server, API endpoints, and AI workflow integrations.",
};

export default function DevelopersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
