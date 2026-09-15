import { buildSiteMetadata } from "@/lib/seo/site-metadata";
import { getLocaleDocumentContext } from "@/lib/i18n/request";
import SiteDocument from "@/components/layout/site-document";
export { viewport } from "@/components/layout/site-document";
import type { Metadata } from "next";
import { CURATED_STYLE_COUNT } from "@/lib/product/catalog-facts";

const routeMetadata: Metadata = {
  title: "About StyleKit",
  description:
    `StyleKit is an open-source visual style library for AI-generated web interfaces. Browse ${CURATED_STYLE_COUNT} styles, then use design tokens, component recipes, Tailwind-ready constraints, and AI prompts in React projects.`,
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteDocument>{children}</SiteDocument>;
}

export const metadata: Metadata = {
  ...buildSiteMetadata(getLocaleDocumentContext("en")),
  ...routeMetadata,
};
