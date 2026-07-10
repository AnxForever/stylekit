import { getAllSlugs } from "@/lib/blog";
import Page, {
  generateMetadata as baseGenerateMetadata,
} from "@/app/blog/[slug]/page";
import { isLocale, LOCALES } from "@/lib/i18n/routing";
import { canonicalizeEnglishMetadata } from "@/lib/i18n/metadata";

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

  if (!isLocale(locale)) return metadata;

  return {
    ...canonicalizeEnglishMetadata(metadata, `/blog/${slug}`),
    ...(locale === "zh"
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}

export default Page;
