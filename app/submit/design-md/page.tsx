import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DesignMdPasteForm } from "@/components/submit/design-md-paste-form";

export const metadata: Metadata = {
  title: "提交 DESIGN.md · StyleKit Community",
  description:
    "粘贴 Google Stitch 格式的 DESIGN.md 文档，分享你的设计系统，加入社区。",
  openGraph: {
    title: "Paste DESIGN.md · StyleKit Community",
    description:
      "Share your design system as a Google Stitch DESIGN.md document with the StyleKit community.",
  },
};

export default function SubmitDesignMdPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <DesignMdPasteForm />
      </main>
      <Footer />
    </div>
  );
}
