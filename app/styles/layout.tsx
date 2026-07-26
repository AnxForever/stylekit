import type { ReactNode } from "react";
import { ShowcaseGalleryNav } from "@/components/showcase/showcase-gallery-nav";

export default function StylesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ShowcaseGalleryNav />
    </>
  );
}
