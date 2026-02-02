import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StylesContent } from "@/components/styles/styles-content";
import { getAllStylesMeta, type StyleType, type StyleTag } from "@/lib/styles/meta";

interface StylesPageProps {
  searchParams: Promise<{
    type?: string;
    tags?: string;
    fav?: string;
  }>;
}

export default async function StylesPage({ searchParams }: StylesPageProps) {
  const allStyles = getAllStylesMeta();
  const params = await searchParams;

  // Parse filter params from URL
  const activeType = (params.type as StyleType | "all") || "all";
  const activeTags = params.tags
    ? (params.tags.split(",") as StyleTag[])
    : [];
  const showFavorites = params.fav === "1";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <StylesContent
          allStyles={allStyles}
          activeType={activeType}
          activeTags={activeTags}
          showFavorites={showFavorites}
        />
      </main>
      <Footer />
    </div>
  );
}
