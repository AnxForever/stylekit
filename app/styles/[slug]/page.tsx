import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DisableAutoScroll } from "@/components/style-preview/disable-auto-scroll";
import { getStyleBySlug, styles } from "@/lib/styles";
import { getStyleTokens, hasStyleTokens } from "@/lib/styles/tokens-registry";
import { generateEnhancedAIRules } from "@/lib/styles/enhanced-rules";
import { StyleDetailContent } from "./_content";

// 生成静态参数
export function generateStaticParams() {
  return styles.map((style) => ({
    slug: style.slug,
  }));
}

// 动态 metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const style = getStyleBySlug(slug);
  if (!style) {
    return { title: "Style Not Found — StyleKit" };
  }
  return {
    title: `${style.name} (${style.nameEn}) — StyleKit`,
    description: style.description,
  };
}

export default async function StyleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const style = getStyleBySlug(slug);

  if (!style) {
    notFound();
  }

  // Pre-compute compatible styles for layout patterns
  const compatibleStyles =
    style.styleType === "layout" && style.compatibleWith
      ? style.compatibleWith
          .map((s) => getStyleBySlug(s))
          .filter((s): s is NonNullable<typeof s> => s !== undefined)
      : [];

  // Pre-compute compatible layouts for visual styles
  const compatibleLayouts =
    style.styleType === "visual"
      ? styles.filter(
          (s) => s.styleType === "layout" && s.compatibleWith?.includes(style.slug)
        )
      : [];

  // Pre-compute enhanced rules
  const enhancedRules = hasStyleTokens(slug)
    ? generateEnhancedAIRules({
        style,
        tokens: getStyleTokens(slug)!,
        format: "full",
      })
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <DisableAutoScroll>
        <main className="flex-1">
          <StyleDetailContent
            style={style}
            compatibleStyles={compatibleStyles}
            compatibleLayouts={compatibleLayouts}
            enhancedRules={enhancedRules}
          />
        </main>
      </DisableAutoScroll>

      <Footer />
    </div>
  );
}
