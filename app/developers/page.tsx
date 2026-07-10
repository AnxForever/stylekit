import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DevelopersContent } from "@/components/developers/developers-content";

export const metadata: Metadata = {
  title: "StyleKit for Developers",
  description:
    "Install StyleKit themes through the shadcn registry and explore repository-local previews of the unpublished CLI and MCP packages.",
};

export default function DevelopersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <DevelopersContent />
      <Footer />
    </div>
  );
}
