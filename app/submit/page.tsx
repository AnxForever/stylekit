import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SubmitStyleForm } from "@/components/submit/submit-style-form";

export const metadata = {
  title: "提交风格 - StyleKit",
  description: "提交你发现的优质设计风格，一起丰富 StyleKit 风格集合。",
};

export default function SubmitPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <SubmitStyleForm />
      </main>
      <Footer />
    </div>
  );
}
