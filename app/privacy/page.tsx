import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How StyleKit handles analytics, newsletter subscriptions, and account-related data on the public site.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">Privacy</p>
            <h1 className="text-4xl md:text-5xl leading-tight mb-6">Privacy Policy</h1>
            <p className="text-lg text-muted leading-relaxed max-w-3xl">
              StyleKit collects a small amount of data to keep the public site usable, measure product interest, and support optional account and newsletter features.
            </p>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16 grid gap-8">
            <article>
              <h2 className="text-2xl mb-3">What we collect</h2>
              <p className="text-muted leading-relaxed">
                We may collect anonymous usage events, UTM campaign parameters, newsletter email addresses that you voluntarily submit, and basic profile data when you sign in with a supported identity provider.
              </p>
            </article>
            <article>
              <h2 className="text-2xl mb-3">How we use it</h2>
              <p className="text-muted leading-relaxed">
                We use this data to understand which pages and features are useful, improve style discovery flows, operate newsletter subscriptions, and support community features such as favorites, ratings, comments, and submissions.
              </p>
            </article>
            <article>
              <h2 className="text-2xl mb-3">Third-party services</h2>
              <p className="text-muted leading-relaxed">
                StyleKit relies on third-party infrastructure including Vercel Analytics, Supabase, and external sign-in providers. Those services may process data according to their own terms and privacy policies.
              </p>
            </article>
            <article>
              <h2 className="text-2xl mb-3">Your choices</h2>
              <p className="text-muted leading-relaxed">
                You can avoid newsletter signup, choose not to create an account, and clear locally stored preferences in your browser. If you need help with a newsletter subscription or public profile data, use the contact options on the support page.
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
