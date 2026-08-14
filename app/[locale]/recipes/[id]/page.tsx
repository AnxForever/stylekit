import Page, {
  generateMetadata as baseGenerateMetadata,
} from "@/app/recipes/[id]/page";
import { getAllRecipes } from "@/lib/styles/recipes";
import { isLocale, LOCALES } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getAllRecipes().map((recipe) => ({ locale, id: recipe.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const metadata = await baseGenerateMetadata({ params: Promise.resolve({ id }) });
  return isLocale(locale)
    ? localizeMetadata(metadata, locale, `/recipes/${id}`)
    : metadata;
}

export default Page;
