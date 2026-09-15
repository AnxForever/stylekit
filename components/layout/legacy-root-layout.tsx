import type { ReactNode } from "react";
import SiteDocument from "@/components/layout/site-document";

export { generateSiteMetadata as generateMetadata, viewport } from "@/components/layout/site-document";

/** Shared document for unprefixed aliases and dynamic legacy route trees. */
export default function LegacyRootLayout({ children }: { children: ReactNode }) {
  return <SiteDocument>{children}</SiteDocument>;
}
