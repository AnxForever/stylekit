import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StyleCreatorClient } from "@/components/style-creator/style-creator-client";

export const metadata: Metadata = {
  title: "Create Style - StyleKit",
  description:
    "Create a custom style or import style-extractor results, then reuse it in the generator.",
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

