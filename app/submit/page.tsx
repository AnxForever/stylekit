import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { getServerUser } from "@/lib/auth/supabase-server";
import { MASTER_PROMPT, PROMPT_INPUT_CHECKLIST } from "@/lib/submission";
import { SubmitConsole } from "./_content";

export const metadata: Metadata = {
  title: "Submit a Style",
  description:
    "Generate a StyleKit style manifest with your AI assistant, check it against the review gates, and submit it for curation.",
  robots: { index: false, follow: true },
};

export default async function SubmitPage() {
  const { locale } = await getRequestLocaleContext();
  const user = await getServerUser();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <SubmitConsole
          locale={locale === "zh" ? "zh" : "en"}
          signedIn={Boolean(user)}
          masterPrompt={MASTER_PROMPT}
          checklist={[...PROMPT_INPUT_CHECKLIST]}
        />
      </main>
      <Footer />
    </div>
  );
}
