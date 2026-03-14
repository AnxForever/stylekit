import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AboutContent } from "@/components/about/about-content";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AboutContent />

      <Footer />
    </div>
  );
}
