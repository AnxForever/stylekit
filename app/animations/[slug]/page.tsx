import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { animations, getAnimationBySlug } from "@/lib/animations";
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

  const BASE_URL = getSiteBaseUrl();
  const description = `${animation.descriptionEn} Implementation snippets and Tailwind utility classes included.`;

  return {
    title: `${animation.nameEn} - Animation Pattern`,
    description,
    keywords: animation.keywords,
    openGraph: {
      title: `${animation.nameEn} Animation - StyleKit`,
      description,
      type: "article",
      images: [
        {
          url: `${BASE_URL}/animations/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${animation.nameEn} animation preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${animation.nameEn} Animation - StyleKit`,
      description,
      images: [`${BASE_URL}/animations/${slug}/opengraph-image`],
    },
  };
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

  const BASE_URL = getSiteBaseUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `${animation.nameEn} Animation Pattern`,
    description: animation.descriptionEn,
    url: `${BASE_URL}/animations/${slug}`,
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
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Animations", item: `${BASE_URL}/animations` },
      { "@type": "ListItem", position: 3, name: animation.nameEn, item: `${BASE_URL}/animations/${slug}` },
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
            { label: "Home", href: "/" },
            { label: "Animations", href: "/animations" },
            { label: animation.nameEn },
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
