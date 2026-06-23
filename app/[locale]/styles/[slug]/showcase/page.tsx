import Page from "@/app/styles/[slug]/showcase/page";
import { styles } from "@/lib/styles";
import { isLocale, LOCALES } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";
import { buildShowcaseMetadata } from "@/app/styles/[slug]/showcase/_metadata";

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
  const base = await buildShowcaseMetadata(
    slug,
    isLocale(locale) ? locale : "en"
  );

  return isLocale(locale)
    ? localizeMetadata(base, locale, `/styles/${slug}/showcase`)
    : base;
}

export default Page;
