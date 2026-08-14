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
import { serializeJsonLd } from "@/lib/security/json-ld";
import { generateBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { getAlternateLocalePath } from "@/lib/i18n/routing";
import { getSiteBaseUrl } from "@/lib/site-url";

export const dynamicParams = false;

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
    title: `${recipe.name} - Design Recipe`,
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
  const { locale } = await getRequestLocaleContext();
  const baseUrl = getSiteBaseUrl();
  const recipeUrl = `${baseUrl}${getAlternateLocalePath(`/recipes/${id}`, locale)}`;
  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { name: locale === "zh" ? "首页" : "Home", url: `${baseUrl}${getAlternateLocalePath("/", locale)}` },
    { name: locale === "zh" ? "设计配方" : "Recipes", url: `${baseUrl}${getAlternateLocalePath("/recipes", locale)}` },
    { name: recipe.name, url: recipeUrl },
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
