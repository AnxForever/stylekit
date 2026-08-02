import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginContent } from "./_content";

export const metadata: Metadata = {
  title: "Sign in - StyleKit",
  description: "Sign in to StyleKit with GitHub, Linux DO or email.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
