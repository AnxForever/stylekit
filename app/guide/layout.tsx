import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Getting Started Guide",
  description:
    "Learn how to use StyleKit: browse styles, export design tokens, generate AI prompts, and integrate with your development workflow.",
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
