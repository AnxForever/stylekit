import { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { ProfileContent } from "./_content";

export const metadata: Metadata = {
  title: "Profile - StyleKit",
  description:
    "View your StyleKit profile, favorites, and account information.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfilePage() {
  const allStyles = getAllStylesMeta();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1" data-cursor-aura="off">
        <Suspense
          fallback={
            <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16">
              <div className="animate-pulse">
                <div className="h-3 w-16 bg-muted/20 mb-8" />
                <div className="flex items-end gap-6">
                  <div className="w-24 h-24 rounded-full bg-muted/20" />
                  <div className="space-y-3">
                    <div className="h-9 w-56 bg-muted/20" />
                    <div className="h-4 w-40 bg-muted/20" />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-12">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-24 bg-muted/10" />
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="aspect-[4/3] bg-muted/10" />
                  ))}
                </div>
              </div>
            </div>
          }
        >
          <ProfileContent allStyles={allStyles} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
