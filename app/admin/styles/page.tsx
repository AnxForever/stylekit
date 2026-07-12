import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";
import { AdminStylesContent } from "./_content";

export const metadata: Metadata = {
  title: "风格总览 - StyleKit 管理后台",
  description: "查看所有风格的聚合互动指标。",
};

export default function AdminStylesPage() {
  return (
    <AdminPage
      title="风格总览"
      description="按浏览量、评分、评论、收藏和分类查看风格目录表现。"
    >
      <AdminStylesContent />
    </AdminPage>
  );
}
