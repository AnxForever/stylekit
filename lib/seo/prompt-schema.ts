import type { Locale } from "@/lib/i18n/translations";
import type { PromptTopic } from "@/lib/prompts";
import { getAlternateLocalePath } from "@/lib/i18n/routing";
import { getSiteBaseUrl } from "@/lib/site-url";

export function generatePromptPageSchemas(
  topic: PromptTopic,
  locale: Locale,
  pathname: string
) {
  const baseUrl = getSiteBaseUrl();
  const canonicalUrl = `${baseUrl}${getAlternateLocalePath(pathname, locale)}`;
  const isZh = locale === "zh";

  return {
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      inLanguage: isZh ? "zh-CN" : "en",
      mainEntity: topic.faq.map((item) => ({
        "@type": "Question",
        name: isZh ? item.questionZh : item.questionEn,
        acceptedAnswer: {
          "@type": "Answer",
          text: isZh ? item.answerZh : item.answerEn,
        },
      })),
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: isZh ? "首页" : "Home",
          item: `${baseUrl}${getAlternateLocalePath("/", locale)}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: isZh ? "UI 提示词" : "UI Prompts",
          item: `${baseUrl}${getAlternateLocalePath("/ui-prompts", locale)}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: isZh ? topic.titleZh : topic.titleEn,
          item: canonicalUrl,
        },
      ],
    },
  };
}
