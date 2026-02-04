import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StyleCreatorClient } from "@/components/style-creator/style-creator-client";

export const metadata: Metadata = {
  title: "风格创建器 - StyleKit",
  description: "可视化创建自定义设计风格，保存后可在模板生成器中使用。",
};

export default function CreateStylePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <StyleCreatorClient />
      </main>
      <Footer />
    </div>
  );
}
