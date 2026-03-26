"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";

const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((m) => ({ default: m.Analytics })),
  { ssr: false }
);
const RegisterSW = dynamic(
  () => import("@/components/pwa/register-sw").then((m) => ({ default: m.RegisterSW })),
  { ssr: false }
);

export function ClientScripts() {
  return (
    <>
      <Analytics />
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      <RegisterSW />
    </>
  );
}
