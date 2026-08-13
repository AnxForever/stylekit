import { animations, getAnimationBySlug } from "@/lib/animations";
import Page from "@/app/animations/[slug]/page";
import { isLocale, LOCALES } from "@/lib/i18n/routing";
import { getLocaleAlternates } from "@/lib/i18n/metadata";
import { getSiteBaseUrl } from "@/lib/site-url";

export const revalidate = 86400;
export const dynamicParams = false;

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
  const animation = getAnimationBySlug(slug);
  if (!animation || !isLocale(locale)) {
    return { title: "Animation Not Found" };
  }

  const isZh = locale === "zh";
  const name = isZh ? animation.name : animation.nameEn;
  const description = isZh
    ? `${animation.description}，包含可复制的实现片段与 Tailwind 工具类。`
    : `${animation.descriptionEn} Implementation snippets and Tailwind utility classes included.`;
  const baseUrl = getSiteBaseUrl();
  const canonical = `${baseUrl}/${locale}/animations/${slug}`;
  const image = `${baseUrl}/animations/${slug}/opengraph-image`;

  return {
    title: isZh ? `${name} - CSS 动画模式` : `${name} - Animation Pattern`,
    description,
    keywords: animation.keywords,
    alternates: {
      canonical,
      languages: getLocaleAlternates(`/animations/${slug}`),
    },
    openGraph: {
      title: isZh ? `${name} 动画 - StyleKit` : `${name} Animation - StyleKit`,
      description,
      url: canonical,
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: `${name} animation preview` }],
    },
    twitter: {
      card: "summary_large_image",
      title: isZh ? `${name} 动画 - StyleKit` : `${name} Animation - StyleKit`,
      description,
      images: [image],
    },
  };
}

export default Page;
