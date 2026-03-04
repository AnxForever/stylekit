import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { resolveStyleBySlug } from "@/lib/styles/community-runtime";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://stylekit.top";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolved = await resolveStyleBySlug(slug);
  if (!resolved) return { title: "Not Found — StyleKit" };
  const style = resolved.style;
  const url = `${BASE_URL}/styles/${slug}/showcase`;
  const description = `Live demonstration of ${style.nameEn} design style with interactive components, color palettes, and typography.`;
  return {
    title: `${style.nameEn} Showcase — StyleKit`,
    description,
    keywords: [style.nameEn, "showcase", "design style", "UI components", "live demo"],
    alternates: { canonical: url },
    openGraph: {
      title: `${style.nameEn} Showcase — StyleKit`,
      description,
      url,
      siteName: "StyleKit",
      type: "website",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${style.nameEn} Showcase — StyleKit`,
      description,
    },
  };
}

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default async function DynamicShowcasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolved = await resolveStyleBySlug(slug);
  if (!resolved) notFound();

  const { style } = resolved;
  const hasComponents =
    style.components &&
    Object.values(style.components).some((c) => c.code);
  if (!hasComponents) notFound();

  return <ShowcaseContent style={style} />;
}
