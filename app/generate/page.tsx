import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GeneratorWizard } from "@/components/generator/generator-wizard";
import { styles } from "@/lib/styles";

export const metadata: Metadata = {
  title: "模板生成器 - StyleKit",
  description: "三步完成：选择风格、选择模板、编辑内容并下载代码。",
};

export default function GeneratePage() {
  // Keep generator focused on visual style systems.
  const visualStyles = styles.filter((s) => s.styleType === "visual");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <GeneratorWizard styles={visualStyles} />
      </main>
      <Footer />
    </div>
  );
}
