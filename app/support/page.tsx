import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { localizeMetadata } from "@/lib/i18n/metadata";
import { ThankYouList } from "@/components/support/thank-you-list";
import { getPublishedThankYouEntries } from "@/lib/support/acknowledgments";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getRequestLocaleContext();
  return localizeMetadata(
    locale === "zh"
      ? {
          title: "支持 StyleKit",
          description:
            "扫码赞赏支持 StyleKit 的服务器、域名与持续维护，并查看赞助鸣谢。",
        }
      : {
          title: "Support StyleKit",
          description:
            "Support StyleKit's servers, domain and maintenance with a voluntary tip and see the acknowledgments.",
        },
    locale,
    "/support",
  );
}

/**
 * Legacy acknowledgment rows point at screenshots under `public/`. Skip rows
 * whose image is gone instead of publishing a broken tile; newer rows use
 * absolute Supabase Storage URLs and always render.
 */
function hasRenderableReceipt(src: string): boolean {
  if (/^https?:\/\//i.test(src)) return true;
  return existsSync(path.join(process.cwd(), "public", src.replace(/^\/+/, "")));
}

export default async function SupportPage() {
  const { locale } = await getRequestLocaleContext();
  const isZh = locale === "zh";
  const thankYouEntries = (await getPublishedThankYouEntries()).filter(
    (entry) => entry.receiptImage && hasRenderableReceipt(entry.receiptImage),
  );

  const qrCodes = [
    {
      src: "/support/wechat-qr.png",
      title: isZh ? "微信" : "WeChat Pay",
      hint: isZh ? "微信扫码赞赏" : "Scan with WeChat",
    },
    {
      src: "/support/alipay-qr.png",
      title: isZh ? "支付宝" : "Alipay",
      hint: isZh ? "支付宝扫码赞赏" : "Scan with Alipay",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="max-w-3xl mx-auto px-6 py-14 md:py-20">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {isZh ? "支持我们" : "Support"}
            </p>
            <h1 className="text-3xl md:text-5xl leading-tight mb-5">
              {isZh ? "支持 StyleKit" : "Support StyleKit"}
            </h1>
            <p className="text-base md:text-lg text-muted leading-relaxed">
              {isZh
                ? "StyleKit 免费且开源。自愿赞赏用于服务器、域名和持续维护，不设付费墙。"
                : "StyleKit is free and open source. Voluntary tips cover servers, domains and ongoing maintenance - nothing sits behind a paywall."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://github.com/AnxForever/stylekit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm text-muted hover:border-foreground hover:text-foreground transition-colors"
              >
                {isZh ? "GitHub 上点个 Star" : "Star on GitHub"}
              </a>
              <LocalizedLink
                href="/contact"
                className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm text-muted hover:border-foreground hover:text-foreground transition-colors"
              >
                {isZh ? "反馈与建议" : "Send feedback"}
              </LocalizedLink>
            </div>
          </div>
        </section>

        <section
          id="support-channels"
          className="scroll-mt-24 border-b border-border"
        >
          <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
            <h2 className="text-xl md:text-2xl mb-2">
              {isZh ? "国内赞赏" : "Support from China"}
            </h2>
            <p className="text-sm md:text-base text-muted leading-relaxed mb-8">
              {isZh
                ? "扫码即可，无论金额大小都非常感谢。"
                : "Scan with WeChat or Alipay - every bit is appreciated."}
            </p>
            <div className="grid grid-cols-2 gap-6 max-w-xl">
              {qrCodes.map((qr) => (
                <figure key={qr.src} className="border border-border p-4 text-center">
                  <Image
                    src={qr.src}
                    alt={qr.title}
                    width={800}
                    height={800}
                    className="w-full h-auto"
                    sizes="(max-width: 640px) 44vw, 280px"
                    unoptimized
                  />
                  <figcaption className="mt-3">
                    <p className="text-sm font-medium">{qr.title}</p>
                    <p className="text-xs text-muted mt-0.5">{qr.hint}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <ThankYouList entries={thankYouEntries} />
      </main>
      <Footer />
    </div>
  );
}
