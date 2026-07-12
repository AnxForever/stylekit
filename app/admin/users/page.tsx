import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";
import { AdminUsersContent } from "./_content";

export const metadata: Metadata = {
  title: "用户管理 - StyleKit 管理后台",
  description: "查看用户活动并管理用户生成内容。",
};

export default function AdminUsersPage() {
  return (
    <AdminPage
      title="用户管理"
      description="搜索用户、查看活动统计、管理个人称号，并删除用户生成内容。"
    >
      <AdminUsersContent />
    </AdminPage>
  );
}
