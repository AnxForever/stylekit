import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DocsContent } from "@/components/docs/docs-content";

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <DocsContent />

      <Footer />
    </div>
  );
}
