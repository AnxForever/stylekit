import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CommunityContent } from "./_content";

export const metadata: Metadata = {
  title: "社区风格",
  description: "浏览已通过审核的社区投稿风格与作者署名。",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.stylekit.top"}/community`,
  },
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
