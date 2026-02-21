"use client";

import dynamic from "next/dynamic";

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
      <RegisterSW />
    </>
  );
}
