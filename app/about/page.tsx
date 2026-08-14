import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AboutContent } from "@/components/about/about-content";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { generateAboutPageJsonLd } from "@/lib/seo/json-ld";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { CURATED_STYLE_COUNT } from "@/lib/product/catalog-facts";

export default async function AboutPage() {
  const { canonicalUrl, locale } = await getRequestLocaleContext();
  const description = locale === "zh"
    ? `StyleKit 是一个开源的 AI 网页视觉风格库，提供 ${CURATED_STYLE_COUNT} 种命名风格、设计 tokens、组件配方、Tailwind 约束和可复用提示词。`
    : `StyleKit is an open-source visual style library for AI-generated web interfaces with ${CURATED_STYLE_COUNT} named styles, design tokens, component recipes, Tailwind-ready constraints, and reusable prompts.`;
  const aboutJsonLd = generateAboutPageJsonLd({
    url: canonicalUrl,
    language: locale === "zh" ? "zh-CN" : "en",
    description,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(aboutJsonLd) }}
      />
      <Header />
      <AboutContent />

      <Footer />
    </div>
  );
}
