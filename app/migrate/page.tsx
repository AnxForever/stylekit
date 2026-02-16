import { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MigrateContent } from "./_content";

export const metadata: Metadata = {
  title: "Migrate Theme - StyleKit",
  description:
    "Import theme configurations from Material UI, Ant Design, or Chakra UI and convert them to StyleKit tokens.",
};

export default function MigratePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 md:py-12">
              <div className="animate-pulse space-y-6">
                <div className="h-8 w-48 bg-muted/20 rounded" />
                <div className="h-64 bg-muted/20 rounded" />
              </div>
            </div>
          }
        >
          <MigrateContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
