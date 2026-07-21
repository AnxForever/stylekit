import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/auth/supabase-server";
import { styles } from "@/lib/styles";
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
  return <WorkspaceProjectEditor projectId={projectId} supportedStyles={[...WORKSPACE_SUPPORTED_STYLES]} styles={styles.map((style) => ({ slug: style.slug, name: style.name, nameEn: style.nameEn }))} />;
}
