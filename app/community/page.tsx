import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CommunityContent } from "./_content";

export const metadata: Metadata = {
  title: "Community - StyleKit",
  description:
    "Explore approved community style submissions with verified author attribution.",
};

interface CommunityPageProps {
  searchParams: Promise<{
    slug?: string | string[];
  }>;
}

export default async function CommunityPage({ searchParams }: CommunityPageProps) {
  const params = await searchParams;
  const rawSlug = params.slug;
  const initialSlug =
    typeof rawSlug === "string"
      ? rawSlug
      : Array.isArray(rawSlug)
        ? rawSlug[0] ?? ""
        : "";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CommunityContent key={initialSlug || "all"} initialSlug={initialSlug} />
      </main>
      <Footer />
    </div>
  );
}
