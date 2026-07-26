"use client";

import dynamic from "next/dynamic";

// ShowcaseTypographyRuntime renders null and only patches fonts inside a
// useEffect after hydration, so it can load as a lazy client-only chunk
// instead of joining the shared root-layout bundle on every page.
const ShowcaseTypographyRuntime = dynamic(
  () =>
    import("@/components/typography/showcase-typography-runtime").then(
      (m) => m.ShowcaseTypographyRuntime
    ),
  { ssr: false }
);

export function LazyShowcaseTypographyRuntime() {
  return <ShowcaseTypographyRuntime />;
}
