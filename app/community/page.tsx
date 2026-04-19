import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CommunityContent } from "./_content";

export const metadata: Metadata = {
  title: "社区风格 · StyleKit Community",
  description: "浏览已通过审核的社区投稿风格、design.md 文档与作者署名。",
  openGraph: {
    title: "StyleKit Community",
    description: "Curated community-submitted design styles and design.md documents.",
  },
};

interface CommunityPageProps {
  searchParams: Promise<{
    slug?: string | string[];
    offset?: string | string[];
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
  const rawOffset = params.offset;
  const offsetValue =
    typeof rawOffset === "string"
      ? rawOffset
      : Array.isArray(rawOffset)
        ? rawOffset[0] ?? "0"
        : "0";
  const parsedOffset = Number.parseInt(offsetValue, 10);
  const initialOffset = Number.isFinite(parsedOffset) && parsedOffset >= 0 ? parsedOffset : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CommunityContent
          key={`${initialSlug || "all"}:${initialOffset}`}
          initialSlug={initialSlug}
          initialOffset={initialOffset}
        />
      </main>
      <Footer />
    </div>
  );
}
