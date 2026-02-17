import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StylesContent } from "@/components/styles/styles-content";
import { getAllStylesMeta, type StyleType, type StyleTag } from "@/lib/styles/meta";

type StyleSort = "recommended" | "name-asc" | "name-desc";

interface StylesPageProps {
  searchParams: Promise<{
    type?: string;
    tags?: string;
    fav?: string;
    sort?: string;
  }>;
}

export default async function StylesPage({ searchParams }: StylesPageProps) {
  const allStyles = getAllStylesMeta();
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
        />
      </main>
      <Footer />
    </div>
  );
}
