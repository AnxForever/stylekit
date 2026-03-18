import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "StyleKit documentation covering getting started, style systems, exports, AI workflows, and implementation guidance.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
