import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/auth/supabase-server";
import { styles } from "@/lib/styles";
import { WorkspaceHome } from "./_content";

export const metadata: Metadata = {
  title: "项目工作区 | StyleKit",
  description: "创建、保存和恢复你的 StyleKit 前端项目。",
  robots: { index: false, follow: false },
};

export default async function WorkspacePage() {
  const user = await getServerUser();
  if (!user) redirect("/login?next=/workspace");

  return (
    <WorkspaceHome
      styles={styles.map((style) => ({
        slug: style.slug,
        name: style.name,
        nameEn: style.nameEn,
      }))}
    />
  );
}
