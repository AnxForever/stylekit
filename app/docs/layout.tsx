import SiteDocument, { generateSiteMetadata } from "@/components/layout/site-document";
export { viewport } from "@/components/layout/site-document";
import type { Metadata } from "next";

const routeMetadata: Metadata = {
  title: "Documentation",
  description:
    "StyleKit documentation covering getting started, style systems, exports, AI workflows, and implementation guidance.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteDocument>{children}</SiteDocument>;
}

export async function generateMetadata(): Promise<Metadata> {
  return { ...await generateSiteMetadata(), ...routeMetadata };
}
