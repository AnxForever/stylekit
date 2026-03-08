import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Create Style",
  description:
    "Create a custom style or import style-extractor results, then reuse it in the generator.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.stylekit.top"}/create-style`,
  },
};

const StyleCreatorClient = dynamic(
  () =>
    import("@/components/style-creator/style-creator-client").then(
      (mod) => mod.StyleCreatorClient
    ),
  {
    loading: () => (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    ),
  }
);

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
