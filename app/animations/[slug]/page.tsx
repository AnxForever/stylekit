import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { animations, getAnimationBySlug } from "@/lib/animations";
import { serializeJsonLd } from "@/lib/security/json-ld";
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

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.stylekit.top";
  const url = `${BASE_URL}/animations/${slug}`;
  const description = `${animation.descriptionEn} CSS keyframes and Tailwind utility classes included.`;

  return {
    title: `${animation.nameEn} - CSS Animation Pattern`,
    description,
    keywords: animation.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${animation.nameEn} Animation - StyleKit`,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${animation.nameEn} Animation - StyleKit`,
      description,
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

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.stylekit.top";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `${animation.nameEn} CSS Animation`,
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
      <main className="flex-1">
        <AnimationDetailContent animation={animation} />
      </main>
      <Footer />
    </div>
  );
}
