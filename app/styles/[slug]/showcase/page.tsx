import { notFound } from "next/navigation";
import dynamicImport from "next/dynamic";
import { resolveStyleBySlug } from "@/lib/styles/community-runtime";
import { buildShowcaseMetadata } from "./_metadata";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return buildShowcaseMetadata(slug, "en");
}

const ShowcaseContent = dynamicImport(() => import("./_content"), {
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
