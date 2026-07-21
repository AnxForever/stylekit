import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { canonicalizeEnglishMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = canonicalizeEnglishMetadata({
  title: "Privacy Policy",
  description:
    "How StyleKit handles analytics, newsletter subscriptions, and account-related data on the public site.",
}, "/privacy");

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
            <article>
              <h2 className="text-2xl mb-3">Pack price research</h2>
              <p className="text-muted leading-relaxed">
                An isolated, noindex research page may test whether a narrowly defined audience accepts one server-assigned Pack price. With explicit research consent, we store only the necessary qualification answers, assigned price group, visibility evidence, and acceptance state. We do not ask for a company name, project code, customer information, or raw email in the analytics evidence store. A random first-party cookie is converted on the server into a keyed HMAC or anonymous identifier; although de-identified, it remains linkable research data and is handled as personal data.
              </p>
            </article>
            <article>
              <h2 className="text-2xl mb-3">Research retention and withdrawal</h2>
              <p className="text-muted leading-relaxed">
                Contact mappings, if introduced after separate approval, should be removed within 90 days after the experiment ends. De-identified research evidence is reviewed for deletion no later than 12 months after the experiment, while payment and tax records follow separate legal retention duties. On the research page you can withdraw this browser and delete its online research events. The minimal participant record remains marked as withdrawn so it cannot silently re-enter the sample; linked interview evidence is excluded. Clearing the browser cookie alone does not delete server evidence.
              </p>
            </article>
            <article>
              <h2 className="text-2xl mb-3">Research processors</h2>
              <p className="text-muted leading-relaxed">
                Vercel may deliver the page and process operational logs, while Supabase stores the restricted research records. Email or payment providers are not part of the current research flow; if they are later enabled, their role, data fields, and retention will be disclosed before verified contact or payment evidence is collected.
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
