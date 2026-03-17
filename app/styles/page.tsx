import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StylesContent } from "@/components/styles/styles-content";
import { type StyleType, type StyleTag } from "@/lib/styles/meta";
import { type StyleScenario, STYLE_SCENARIOS } from "@/lib/styles/scenarios";
import { listCatalogStylesMeta } from "@/lib/styles/community-runtime";

export const metadata: Metadata = {
  title: "Browse 130+ UI Design Styles & AI Prompts",
  description:
    "Explore 130+ curated visual styles with design tokens, component recipes, Tailwind-ready patterns, and AI UI prompt guidance for websites, dashboards, and landing pages.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.stylekit.top"}/styles`,
  },
};

type StyleSort = "recommended" | "name-asc" | "name-desc";

interface StylesPageProps {
  searchParams: Promise<{
    type?: string;
    tags?: string;
    fav?: string;
    sort?: string;
    q?: string;
    scenario?: string;
  }>;
}

export default async function StylesPage({ searchParams }: StylesPageProps) {
  const allStyles = await listCatalogStylesMeta();
  const params = await searchParams;

  // 解析 URL 参数作为初始值
  const initialType = (params.type as StyleType | "all") || "all";
  const initialTags = params.tags
    ? (params.tags.split(",") as StyleTag[])
    : [];
  const initialShowFavorites = params.fav === "1";
  const validSorts: StyleSort[] = ["recommended", "name-asc", "name-desc"];
  const initialSort: StyleSort = validSorts.includes(params.sort as StyleSort)
    ? (params.sort as StyleSort)
    : "recommended";
  const initialQuery = typeof params.q === "string" ? params.q : "";
  const initialScenario: StyleScenario | "all" = STYLE_SCENARIOS.includes(params.scenario as StyleScenario)
    ? (params.scenario as StyleScenario)
    : "all";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <StylesContent
          allStyles={allStyles}
          initialType={initialType}
          initialTags={initialTags}
          initialShowFavorites={initialShowFavorites}
          initialSort={initialSort}
          initialQuery={initialQuery}
          initialScenario={initialScenario}
        />
      </main>
      <Footer />
    </div>
  );
}
