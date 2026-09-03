import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";
import { AdminCommunityReportsContent } from "./_content";

export const metadata: Metadata = {
  title: "社区举报 - StyleKit 管理后台",
  description: "处理读者对社区风格的举报，并在必要时下架内容。",
};

export default function AdminCommunityReportsPage() {
  return (
    <AdminPage
      title="社区举报"
      description="社区风格发布后由读者举报驱动的复审队列。支持受理并下架、驳回，或恢复已下架的风格。"
    >
      <AdminCommunityReportsContent />
    </AdminPage>
  );
}
