import SiteDocument, { generateSiteMetadata } from "@/components/layout/site-document";
export { viewport } from "@/components/layout/site-document";
import type { Metadata } from "next";
import { docsRouteMetadata } from "./metadata";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteDocument>{children}</SiteDocument>;
}

export async function generateMetadata(): Promise<Metadata> {
  return { ...await generateSiteMetadata(), ...docsRouteMetadata };
}
