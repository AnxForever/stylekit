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
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-14">
              <div className="animate-pulse flex flex-col md:flex-row gap-8 md:gap-14">
                <div className="md:w-64 md:shrink-0 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-muted/20" />
                  <div className="h-6 w-36 bg-muted/20" />
                  <div className="h-3 w-28 bg-muted/20" />
                  <div className="h-3 w-32 bg-muted/20" />
                </div>
                <div className="flex-1 space-y-6">
                  <div className="h-8 w-full max-w-sm bg-muted/20" />
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="aspect-video bg-muted/10" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <ProfileContent allStyles={allStyles} />
        </Suspense>
      </main>
      <Footer compact />
    </div>
  );
}
