import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/auth/supabase-server";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { getStyleScenarios } from "@/lib/styles/scenarios";
import { WorkspaceProjectEditor } from "./_content";
import { WORKSPACE_SUPPORTED_STYLES } from "@/lib/workspace";

export const metadata: Metadata = {
  title: "编辑项目 | StyleKit 工作区",
  robots: { index: false, follow: false },
};

export default async function WorkspaceProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const user = await getServerUser();
  if (!user) redirect(`/login?next=/workspace/${(await params).projectId}`);
  const { projectId } = await params;
  const meta = getAllStylesMeta();
  return (
    <WorkspaceProjectEditor
      projectId={projectId}
      supportedStyles={[...WORKSPACE_SUPPORTED_STYLES]}
      styles={meta.map((style, index) => ({
        slug: style.slug,
        name: style.name,
        nameEn: style.nameEn,
        colors: style.colors,
        scenarios: getStyleScenarios(style),
        keywords: style.keywords.slice(0, 8),
        // The registry is append-ordered, so the tail is the newest batch.
        isNew: index >= meta.length - 6,
      }))}
    />
  );
}
