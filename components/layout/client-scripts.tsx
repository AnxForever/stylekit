"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { BackNavigationRuntime } from "@/components/navigation/back-navigation-runtime";

const isVercel = Boolean(process.env.NEXT_PUBLIC_VERCEL);

const Analytics = isVercel
  ? dynamic(
      () => import("@vercel/analytics/react").then((m) => ({ default: m.Analytics })),
      { ssr: false }
    )
  : () => null;

const RegisterSW = dynamic(
  () => import("@/components/pwa/register-sw").then((m) => ({ default: m.RegisterSW })),
  { ssr: false }
);

export function ClientScripts() {
  return (
    <>
      <BackNavigationRuntime />
      <Analytics />
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      <RegisterSW />
    </>
  );
}
