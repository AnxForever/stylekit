import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/auth/supabase-server";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { getStyleScenarios } from "@/lib/styles/scenarios";
import { WorkspaceHome } from "./_content";

export const metadata: Metadata = {
  title: "项目工作区 | StyleKit",
  description: "创建、保存和恢复你的 StyleKit 前端项目。",
  robots: { index: false, follow: false },
};

export default async function WorkspacePage() {
  const user = await getServerUser();
  if (!user) redirect("/login?next=/workspace");

  const meta = getAllStylesMeta();
  return (
    <WorkspaceHome
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
