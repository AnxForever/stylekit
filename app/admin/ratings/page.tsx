import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";
import { AdminRatingsContent } from "./_content";

export const metadata: Metadata = {
  title: "评分管理 - StyleKit 管理后台",
  description: "监控和管理风格评分。",
};

export default function AdminRatingsPage() {
  return (
    <AdminPage
      title="评分管理"
      description="监控风格评分、查看分布模式，并删除可疑反馈。"
    >
      <AdminRatingsContent />
    </AdminPage>
  );
}
