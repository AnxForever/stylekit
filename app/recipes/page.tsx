import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { RecipeShowcase } from "@/components/recipes/recipe-showcase";
import { getAllRecipes } from "@/lib/styles/recipes";

export const metadata: Metadata = {
  title: "Design Recipes - Ready-to-Use Style Combinations | StyleKit",
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

export default function RecipesPage() {
  const allRecipes = getAllRecipes();

  return (
    <div className="min-h-screen flex flex-col">
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
        <section className="py-12 md:py-20 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-4">
              Design Recipes
            </h1>
            <p className="text-xl text-muted max-w-2xl mb-8">
              Curated combinations of visual styles, layouts, and animations.
              Each recipe is optimized for a specific use case and includes
              reasoning for why it works.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted">
              <span className="px-3 py-1 border border-border">
                {allRecipes.length} Recipes
              </span>
              <span className="px-3 py-1 border border-border">
                {allRecipes.filter((r) => r.featured).length} Featured
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
