import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";
import { SiteContentEditor } from "./_content";

export const metadata: Metadata = {
  title: "内容中心 - StyleKit 管理后台",
  description: "直接管理 StyleKit 的全站公告内容。",
  robots: { index: false, follow: false },
};

export default function AdminContentPage() {
  return (
    <AdminPage
      eyebrow="Content operations"
      title="内容中心"
      description="先从公告开始：修改一次，中文和英文站点会分别使用对应内容。"
    >
      <SiteContentEditor />
    </AdminPage>
  );
}
