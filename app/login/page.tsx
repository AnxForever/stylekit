import { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LoginContent } from "./_content";

export const metadata: Metadata = {
  title: "Sign in - StyleKit",
  description: "Sign in to StyleKit with GitHub or Linux DO.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense>
          <LoginContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
