import type { ReactNode } from "react";
import { ShowcaseBackBar } from "@/components/showcase/showcase-back-bar";

export default function StylesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ShowcaseBackBar />
    </>
  );
}
