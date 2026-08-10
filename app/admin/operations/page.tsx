import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";
import { OperationsDashboard } from "./_content";

export const metadata: Metadata = {
  title: "运营总览 - StyleKit 管理后台",
  description: "查看 StyleKit 当前待办、内容信号和系统状态。",
  robots: { index: false, follow: false },
};

export default function AdminOperationsPage() {
  return (
    <AdminPage
      eyebrow="运营观察台"
      title="今天该处理什么？"
      description="先看待办和异常，再进入具体页面完成审核、发布或调查。"
    >
      <OperationsDashboard />
    </AdminPage>
  );
}
