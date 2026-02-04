import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GeneratorWizard } from "@/components/generator/generator-wizard";
import { styles } from "@/lib/styles";

export const metadata: Metadata = {
  title: "模板生成器 - StyleKit",
  description: "选择风格和模板类型，一键生成完整的静态网站代码。",
};

export default function GeneratePage() {
  // Get only visual styles (not layout styles)
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
