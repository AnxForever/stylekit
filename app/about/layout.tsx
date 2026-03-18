import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About StyleKit",
  description:
    "StyleKit is an open-source, AI-friendly design system toolkit with 120+ visual styles, design tokens, and component recipes for building consistent UI.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
