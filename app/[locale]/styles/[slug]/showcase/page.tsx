import Page, {
  generateMetadata as baseGenerateMetadata,
} from "@/app/styles/[slug]/showcase/page";
import { styles } from "@/lib/styles";
import { isLocale, LOCALES } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    styles.map((style) => ({
      locale,
      slug: style.slug,
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
    ? localizeMetadata(metadata, locale, `/styles/${slug}/showcase`)
    : metadata;
}

export default Page;
