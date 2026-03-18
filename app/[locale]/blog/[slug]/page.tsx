import { getAllSlugs } from "@/lib/blog";
import Page, {
  generateMetadata as baseGenerateMetadata,
} from "@/app/blog/[slug]/page";
import { isLocale, LOCALES } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getAllSlugs().map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const metadata = await baseGenerateMetadata({
    params: Promise.resolve({ slug }),
  });

  return isLocale(locale)
    ? localizeMetadata(metadata, locale, `/blog/${slug}`)
    : metadata;
}

export default Page;
