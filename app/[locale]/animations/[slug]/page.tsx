import { animations } from "@/lib/animations";
import Page, {
  generateMetadata as baseGenerateMetadata,
} from "@/app/animations/[slug]/page";
import { isLocale, LOCALES } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export const revalidate = 86400;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    animations.map((animation) => ({
      locale,
      slug: animation.slug,
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
    ? localizeMetadata(metadata, locale, `/animations/${slug}`)
    : metadata;
}

export default Page;
