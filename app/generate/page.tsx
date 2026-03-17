import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { styles } from "@/lib/styles";

export const metadata: Metadata = {
  title: "模板生成器",
  description: "3 步完成：选风格、选模板、编辑内容并下载代码。",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://stylekit.top"}/generate`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

const GeneratorWizard = dynamic(
  () =>
    import("@/components/generator/generator-wizard").then(
      (mod) => mod.GeneratorWizard
    ),
  {
    loading: () => (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-muted-foreground">加载中...</div>
      </div>
    ),
  }
);

export default function GeneratePage() {
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
