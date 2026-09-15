import SiteDocument, { generateSiteMetadata } from "@/components/layout/site-document";
export { viewport } from "@/components/layout/site-document";
import type { Metadata } from "next";

const routeMetadata: Metadata = {
  title: "Responsive Preview - StyleKit",
  description:
    "Preview style showcases across desktop, tablet, and mobile viewports. Test responsive behavior of StyleKit design styles.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteDocument>{children}</SiteDocument>;
}

export async function generateMetadata(): Promise<Metadata> {
  return { ...await generateSiteMetadata(), ...routeMetadata };
}
