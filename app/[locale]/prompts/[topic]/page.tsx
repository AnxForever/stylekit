import { getTopicBySlug, promptTopics } from "@/lib/prompts";
import Page, {
  generateMetadata as baseGenerateMetadata,
} from "@/app/prompts/[topic]/page";
import { isLocale, LOCALES } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export const revalidate = 86400;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    promptTopics.map((topic) => ({
      locale,
      topic: topic.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}) {
  const { locale, topic } = await params;
  const metadata = await baseGenerateMetadata({
    params: Promise.resolve({ topic }),
  });

  if (!isLocale(locale)) return metadata;
  const promptTopic = getTopicBySlug(topic);
  const localized = locale === "zh" && promptTopic
    ? {
        ...metadata,
        title: promptTopic.titleZh,
        description: promptTopic.descriptionZh,
        openGraph: {
          ...(metadata.openGraph ?? {}),
          title: `${promptTopic.titleZh} | StyleKit`,
          description: promptTopic.descriptionZh,
        },
      }
    : metadata;

  return localizeMetadata(localized, locale, `/prompts/${topic}`);
}

export default Page;
