import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { RecipeDetailContent } from "./_content";
import {
  getAllRecipes,
  getRecipeById,
  resolveRecipeStyles,
} from "@/lib/styles/recipes";

export function generateStaticParams() {
  return getAllRecipes().map((recipe) => ({
    id: recipe.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const recipe = getRecipeById(id);

  if (!recipe) {
    return { title: "Recipe Not Found" };
  }

  return {
    title: `${recipe.name} - Design Recipe | StyleKit`,
    description: recipe.description,
    keywords: [
      recipe.name,
      recipe.visualStyle,
      recipe.layout,
      recipe.useCase,
      ...recipe.tags,
    ],
  };
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  const { visual, layout } = resolveRecipeStyles(recipe);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Recipes", href: "/recipes" },
              { label: recipe.name },
            ]}
          />
        </div>

        <RecipeDetailContent
          recipe={recipe}
          visualStyle={visual}
          layoutStyle={layout}
        />
      </main>

      <Footer />
    </div>
  );
}
