import { styles } from "@/lib/styles";
import Page, {
  generateMetadata as baseGenerateMetadata,
} from "@/app/styles/[slug]/page";
import { isLocale, LOCALES } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";
import type { Locale } from "@/lib/i18n/translations";

export const revalidate = 86400;

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
    ? localizeMetadata(metadata, locale, `/styles/${slug}`)
    : metadata;
}

export default async function LocaleStylePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const validLocale: Locale = isLocale(locale) ? locale : "en";
  return <Page params={Promise.resolve({ slug })} locale={validLocale} />;
}
