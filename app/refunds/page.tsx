import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { canonicalizeEnglishMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = canonicalizeEnglishMetadata({
  title: "Refund Policy",
  description:
    "Refund terms for StyleKit's paid digital products, donations, and future subscriptions.",
}, "/refunds");

export default function RefundsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">Refunds</p>
            <h1 className="text-4xl md:text-5xl leading-tight mb-6">Refund Policy</h1>
            <p className="text-lg text-muted leading-relaxed max-w-3xl">
              Most of StyleKit is free and open source. This policy covers the paid
              digital products we may offer (such as template packs), voluntary
              support payments, and any future subscription plans.
            </p>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16 grid gap-8">
            <article>
              <h2 className="text-2xl mb-3">Digital products</h2>
              <p className="text-muted leading-relaxed">
                If a paid digital product does not work as described, or you are unable
                to access what you purchased, contact us within 14 days of the purchase
                and we will make it right — with a fix, a replacement, or a full refund.
                Because digital files cannot be returned, we may decline refund requests
                that show signs of abuse, such as repeated purchases and refunds of the
                same item after the content has been downloaded.
              </p>
            </article>
            <article>
              <h2 className="text-2xl mb-3">Immediate access to digital content</h2>
              <p className="text-muted leading-relaxed">
                When you buy a downloadable product, you get access to the full content
                immediately. By completing the purchase you consent to immediate
                delivery and acknowledge that, where local consumer law allows it, the
                standard withdrawal period for distance sales may no longer apply once
                delivery has begun. This never limits the 14-day quality guarantee
                above or any rights that your local law makes mandatory.
              </p>
            </article>
            <article>
              <h2 className="text-2xl mb-3">Subscriptions</h2>
              <p className="text-muted leading-relaxed">
                If we offer subscription plans, you can cancel at any time and keep
                access until the end of the paid period. We do not charge again after
                cancellation. Partial-period refunds are not provided unless required
                by law, except when a billing error on our side caused the charge.
              </p>
            </article>
            <article>
              <h2 className="text-2xl mb-3">Donations and support payments</h2>
              <p className="text-muted leading-relaxed">
                Voluntary support payments and tips are gifts that help cover servers,
                domains, and maintenance. They do not purchase a product or service and
                are non-refundable, except where a duplicate payment or a processing
                error occurred.
              </p>
            </article>
            <article>
              <h2 className="text-2xl mb-3">Orders handled by a payment partner</h2>
              <p className="text-muted leading-relaxed">
                Paid orders may be processed by a merchant-of-record partner (such as
                Paddle), which acts as the seller of record for the transaction. In
                that case refunds are issued through the partner's checkout and support
                flow, and their buyer terms apply alongside this policy. We will always
                help you route a request to the right place.
              </p>
            </article>
            <article>
              <h2 className="text-2xl mb-3">How to request a refund</h2>
              <p className="text-muted leading-relaxed">
                Reach out through the{" "}
                <LocalizedLink href="/contact" className="underline underline-offset-4 hover:text-foreground">
                  contact page
                </LocalizedLink>{" "}
                with your order reference and a short description of the problem. We
                aim to respond within 3 business days, and approved refunds are
                returned to the original payment method.
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
