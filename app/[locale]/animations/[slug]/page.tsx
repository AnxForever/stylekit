import { animations, getAnimationBySlug } from "@/lib/animations";
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

  const animation = getAnimationBySlug(slug);
  if (!animation) return metadata;

  const isZh = locale === "zh";
  const name = isZh ? animation.name : animation.nameEn;
  const description = isZh
    ? `${animation.description}，包含可复制的实现片段与 Tailwind 工具类。`
    : `${animation.descriptionEn} Implementation snippets and Tailwind utility classes included.`;
  const localized = {
    ...metadata,
    title: isZh ? `${name} - CSS 动画模式` : `${name} - Animation Pattern`,
    description,
    openGraph: {
      ...(metadata.openGraph ?? {}),
      title: isZh ? `${name} 动画 - StyleKit` : `${name} Animation - StyleKit`,
      description,
    },
    twitter: {
      ...(metadata.twitter ?? {}),
      title: isZh ? `${name} 动画 - StyleKit` : `${name} Animation - StyleKit`,
      description,
    },
  };

  return isLocale(locale)
    ? localizeMetadata(localized, locale, `/animations/${slug}`)
    : metadata;
}

export default Page;
