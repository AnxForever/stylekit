import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DevelopersContent } from "@/components/developers/developers-content";

export const metadata: Metadata = {
  title: "For Developers — StyleKit",
  description:
    "Use StyleKit in your workflow: install any style's theme via the shadcn registry, an MCP server for AI editors (Claude, Cursor, Windsurf), or the CLI.",
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
