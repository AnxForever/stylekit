import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";
import { AdminSystemContent } from "./_content";

export const metadata: Metadata = {
  title: "系统概况 - StyleKit 管理后台",
  description: "查看服务健康状态、数据库状态和运行时信息。",
};

export default function AdminSystemPage() {
  return (
    <AdminPage
      title="系统概况"
      description="检查服务健康状态、Supabase 连接、数据表状态、运行时信息和管理员配置。"
    >
      <AdminSystemContent />
    </AdminPage>
  );
}
