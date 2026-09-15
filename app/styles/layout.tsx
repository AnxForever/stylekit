import SiteDocument, { generateSiteMetadata } from "@/components/layout/site-document";
export { viewport } from "@/components/layout/site-document";
import type { ReactNode } from "react";
import { ShowcaseGalleryNav } from "@/components/showcase/showcase-gallery-nav";

export default function StylesLayout({ children }: { children: ReactNode }) {
  return (
    <SiteDocument>
      {children}
      <ShowcaseGalleryNav />
    </SiteDocument>
  );
}

export { generateSiteMetadata as generateMetadata };
