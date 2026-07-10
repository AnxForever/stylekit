import type { Metadata } from "next";
import { CURATED_STYLE_COUNT } from "@/lib/product/catalog-facts";

export const metadata: Metadata = {
  title: "About StyleKit",
  description:
    `StyleKit is an open-source, AI-friendly design system toolkit with ${CURATED_STYLE_COUNT} visual styles, design tokens, and component recipes for building consistent UI.`,
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
