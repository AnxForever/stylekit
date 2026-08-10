import type { Metadata } from "next";

import { AdminPage } from "@/components/admin/admin-page";
import { AdminKnowledgeContent } from "./_content";

export const metadata: Metadata = {
  title: "知识库审核 - StyleKit 管理后台",
  description: "审核外部前端资源的许可证、安全性、质量和生成器准入状态。",
  robots: { index: false, follow: false },
};

export default function AdminKnowledgePage() {
  return (
    <AdminPage
      eyebrow="Knowledge control plane"
      title="知识库审核台"
      description="把外部开源资源变成可追溯、可检索、可安全复用的 StyleKit 知识。当前页面先读取 Git manifest，发布动作仍受 Supabase 审核门禁控制。"
    >
      <AdminKnowledgeContent />
    </AdminPage>
  );
}
