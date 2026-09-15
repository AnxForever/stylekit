import { buildSiteMetadata } from "@/lib/seo/site-metadata";
import { getLocaleDocumentContext } from "@/lib/i18n/request";
import SiteDocument from "@/components/layout/site-document";
export { viewport } from "@/components/layout/site-document";
import type { Metadata } from "next";

const routeMetadata: Metadata = {
  title: "Getting Started Guide",
  description:
    "Learn how to use StyleKit: browse styles, export design tokens, generate AI prompts, and integrate with your development workflow.",
};

export default function GuideLayout({
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
