import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { animations, getAnimationBySlug } from "@/lib/animations";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { applyRequestMetadata } from "@/lib/i18n/metadata";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { getSiteBaseUrl } from "@/lib/site-url";
import { AnimationDetailContent } from "./_content";

export function generateStaticParams() {
  return animations.map((a) => ({
    slug: a.slug,
  }));
}

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const animation = getAnimationBySlug(slug);
  if (!animation) {
    return { title: "Animation Not Found" };
  }

  const context = await getRequestLocaleContext();
  const isZh = context.locale === "zh";
  const BASE_URL = getSiteBaseUrl();
  const name = isZh ? animation.name : animation.nameEn;
  const description = isZh
    ? `${animation.description}，包含可复制的实现片段与 Tailwind 工具类。`
    : `${animation.descriptionEn} Implementation snippets and Tailwind utility classes included.`;

  return applyRequestMetadata({
    title: isZh ? `${name} - CSS 动画模式` : `${name} - Animation Pattern`,
    description,
    keywords: animation.keywords,
    openGraph: {
      title: isZh ? `${name} 动画 - StyleKit` : `${name} Animation - StyleKit`,
      description,
      type: "article",
      images: [
        {
          url: `${BASE_URL}/animations/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${name} animation preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isZh ? `${name} 动画 - StyleKit` : `${name} Animation - StyleKit`,
      description,
      images: [`${BASE_URL}/animations/${slug}/opengraph-image`],
    },
  }, context);
}

export default async function AnimationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const animation = getAnimationBySlug(slug);

  if (!animation) {
    notFound();
  }

  const context = await getRequestLocaleContext();
  const isZh = context.locale === "zh";
  const BASE_URL = getSiteBaseUrl();
  const name = isZh ? animation.name : animation.nameEn;
  const description = isZh ? animation.description : animation.descriptionEn;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: isZh ? `${name} 动画模式` : `${name} Animation Pattern`,
    description,
    url: context.canonicalUrl,
    step: animation.codeSnippets.map((snippet, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: snippet.label,
      text: `Add the ${snippet.label} code to your project`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isZh ? "首页" : "Home", item: `${BASE_URL}/${isZh ? "zh" : "en"}` },
      { "@type": "ListItem", position: 2, name: isZh ? "动画" : "Animations", item: `${BASE_URL}/${isZh ? "zh" : "en"}/animations` },
      { "@type": "ListItem", position: 3, name, item: context.canonicalUrl },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <Header />
      <div className="container mx-auto px-4 pt-4">
        <Breadcrumb
          items={[
            { label: isZh ? "首页" : "Home", href: "/" },
            { label: isZh ? "动画" : "Animations", href: "/animations" },
            { label: name },
          ]}
        />
      </div>
      <main className="flex-1">
        <AnimationDetailContent animation={animation} />
      </main>
      <Footer />
    </div>
  );
}
