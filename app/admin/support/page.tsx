import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";
import { SponsorAcknowledgmentsContent } from "./_content";

export const metadata: Metadata = {
  title: "赞助公告 - StyleKit 管理后台",
  description: "上传赞助截图并更新公开鸣谢公告。",
  robots: { index: false, follow: false },
};

export default function AdminSupportPage() {
  return (
    <AdminPage
      eyebrow="Support publishing"
      title="赞助公告"
      description="上传一张收款截图，补充显示名称和金额后即可发布到支持页与首页感谢弹窗。"
    >
      <SponsorAcknowledgmentsContent />
    </AdminPage>
  );
}
