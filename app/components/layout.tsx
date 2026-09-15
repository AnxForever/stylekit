import { buildSiteMetadata } from "@/lib/seo/site-metadata";
import { getLocaleDocumentContext } from "@/lib/i18n/request";
import SiteDocument from "@/components/layout/site-document";
export { viewport } from "@/components/layout/site-document";
import type { Metadata } from "next";

const routeMetadata: Metadata = {
  title: "Component Library",
  description:
    "Browse 25+ accessible UI components built on Radix UI with Tailwind CSS. Preview buttons, cards, inputs, and more across multiple design styles.",
};

export default function ComponentsLayout({
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
