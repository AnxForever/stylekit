import type { ReactNode } from "react";
import { ShowcaseGalleryNav } from "@/components/showcase/showcase-gallery-nav";

// Mirrors app/styles/layout.tsx: locale-prefixed showcase routes render
// through this tree (the root layout never runs for them), so the gallery
// nav must be mounted here as well.
export default function LocalizedStylesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ShowcaseGalleryNav />
    </>
  );
}
