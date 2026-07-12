import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";
import { AdminCommentsContent } from "./_content";

export const metadata: Metadata = {
  title: "评论审核 - StyleKit 管理后台",
  description: "查看和管理所有风格下的用户评论。",
};

export default function AdminCommentsPage() {
  return (
    <AdminPage
      title="评论审核"
      description="查看、筛选并删除风格目录中的用户评论。"
    >
      <AdminCommentsContent />
    </AdminPage>
  );
}
