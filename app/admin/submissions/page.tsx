import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";
import { SubmissionsReview } from "./_content";

export const metadata: Metadata = {
  title: "投稿审核 - StyleKit 管理后台",
  description: "审核和管理社区提交的风格。",
};

export default function AdminSubmissionsPage() {
  return (
    <AdminPage
      title="风格投稿"
      description="审核社区提交的风格、编辑元数据、归档通过的条目，或附带反馈后拒绝。"
    >
      <SubmissionsReview />
    </AdminPage>
  );
}
