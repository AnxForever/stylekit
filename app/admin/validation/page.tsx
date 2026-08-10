import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";
import { ProductValidationContent } from "./_content";

export const metadata: Metadata = {
  title: "产品验证 - StyleKit 管理后台",
  description: "查看 StyleKit Pack 价格实验与访谈证据。",
  robots: { index: false, follow: false },
};

export default function AdminProductValidationPage() {
  return (
    <AdminPage
      eyebrow="EVIDENCE WORKBENCH"
      title="产品验证"
      description="查看 Pack 价格实验的真实证据、资格漏斗与当前准入状态。"
    >
      <ProductValidationContent />
    </AdminPage>
  );
}
