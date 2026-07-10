import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { RecipeShowcase } from "@/components/recipes/recipe-showcase";
import { getAllRecipes } from "@/lib/styles/recipes";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { generateBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getSiteBaseUrl } from "@/lib/site-url";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { getAlternateLocalePath } from "@/lib/i18n/routing";

export const metadata: Metadata = {
  title: "Design Recipes - Ready-to-Use Style Combinations",
  description:
    "Curated combinations of visual styles, layouts, and animations optimized for specific use cases. SaaS, e-commerce, portfolio, blog, and more.",
  keywords: [
    "design recipes",
    "style combinations",
    "UI patterns",
    "SaaS design",
    "landing page templates",
    "design system",
  ],
};

export default async function RecipesPage() {
  const allRecipes = getAllRecipes();
  const BASE_URL = getSiteBaseUrl();
  const { locale } = await getRequestLocaleContext();

  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { name: locale === "zh" ? "首页" : "Home", url: `${BASE_URL}${getAlternateLocalePath("/", locale)}` },
    { name: locale === "zh" ? "设计配方" : "Recipes", url: `${BASE_URL}${getAlternateLocalePath("/recipes", locale)}` },
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Recipes" },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="relative py-16 md:py-24 border-b border-border overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium uppercase tracking-wider border border-border rounded-full bg-background/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Style + Layout + Animation
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-5">
              Design Recipes
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl mb-8 leading-relaxed">
              Curated combinations of visual styles, layouts, and animations.
              Each recipe is optimized for a specific use case and includes
              reasoning for why it works.
            </p>
            
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-2 px-4 py-2 border border-border bg-background/80 rounded-lg">
                <span className="w-5 h-5 rounded bg-gradient-to-br from-purple-500 to-pink-500" />
                <span className="font-medium">{allRecipes.length}</span>
                <span className="text-muted">Recipes</span>
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 border border-amber-500/30 bg-amber-500/5 rounded-lg">
                <span className="w-5 h-5 rounded bg-gradient-to-br from-amber-400 to-orange-500" />
                <span className="font-medium">{allRecipes.filter((r) => r.featured).length}</span>
                <span className="text-muted">Featured</span>
              </span>
            </div>
          </div>
        </section>

        {/* Recipe Showcase */}
        <RecipeShowcase variant="full" />
      </main>

      <Footer />
    </div>
  );
}
