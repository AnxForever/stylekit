import type { Metadata } from "next";
import { CURATED_STYLE_COUNT } from "@/lib/product/catalog-facts";

export const metadata: Metadata = {
  title: "About StyleKit",
  description:
    `StyleKit is an open-source visual style library for AI-generated web interfaces. Browse ${CURATED_STYLE_COUNT} styles, then use design tokens, component recipes, Tailwind-ready constraints, and AI prompts in React projects.`,
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
