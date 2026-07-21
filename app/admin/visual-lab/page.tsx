import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";
import { PremiumVisualLab } from "./_content";

export const metadata: Metadata = {
  title: "视觉实验室 - StyleKit 管理后台",
  description: "隔离验证 StyleKit 收费级图片叙事、动效层级和展示结构。",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminVisualLabPage() {
  return (
    <AdminPage
      eyebrow="收费级视觉研究"
      title="视觉实验室"
      description="只在隔离环境验证图片、动画和交互如何提高风格展示的付费感；不会修改现有卡片、公开页面或 135 个预览。"
    >
      <PremiumVisualLab />
    </AdminPage>
  );
}
