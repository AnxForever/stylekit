import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { getRequestLocaleContext } from "@/lib/i18n/request";

// International card-payment support is being set up through a
// merchant-of-record (Paddle). A Ko-fi page is registered at
// https://ko-fi.com/anxforever but MUST NOT be linked here until a payout
// method (PayPal) is connected in Ko-fi - without it, visitor payments fail
// at the final step. Once connected and verified with a real test payment,
// set KOFI_URL to that address and the block switches to a live button.
const KOFI_URL = "";

export const metadata: Metadata = {
  title: "Support StyleKit",
  description:
    "Ways to support StyleKit's servers, domains, and ongoing maintenance - star the project, share it, or leave a voluntary tip.",
};

export default async function SupportPage() {
  const { locale } = await getRequestLocaleContext();
  const isZh = locale === "zh";

  const qrCodes = [
    {
      src: "/wechat-qr.png",
      title: isZh ? "微信" : "WeChat Pay",
      hint: isZh ? "微信扫码赞赏" : "Scan with WeChat",
    },
    {
      src: "/alipay-qr.jpg",
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
                ? "StyleKit 免费且开源。自愿的支持会用于服务器、域名和持续维护——不设任何付费墙。"
                : "StyleKit is free and open source. Voluntary support goes toward servers, domains, and ongoing maintenance - nothing sits behind a paywall."}
            </p>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
            <h2 className="text-xl md:text-2xl mb-2">
              {isZh ? "国际支持（银行卡）" : "International support (card)"}
            </h2>
            {KOFI_URL ? (
              <>
                <p className="text-sm md:text-base text-muted leading-relaxed mb-6">
                  {isZh
                    ? "海外用户可以通过 Ko-fi 用银行卡或 PayPal 支持我们。"
                    : "You can support StyleKit with a card or PayPal through Ko-fi."}
                </p>
                <a
                  href={KOFI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-foreground px-5 py-2.5 text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
                >
                  {isZh ? "在 Ko-fi 上支持" : "Support on Ko-fi"}
                </a>
              </>
            ) : (
              <p className="text-sm md:text-base text-muted leading-relaxed">
                {isZh
                  ? "面向海外用户的银行卡支持通道（经由 Paddle）正在开通中。在此之前，给项目一个 Star 就是最好的支持。"
                  : "A card-payment channel for international supporters (via Paddle as merchant of record) is being set up. Until it lands, starring the repository is the best way to help."}
              </p>
            )}
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

        <section className="border-b border-border">
          <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
            <h2 className="text-xl md:text-2xl mb-2">
              {isZh ? "国内赞赏" : "Support from China"}
            </h2>
            <p className="text-sm md:text-base text-muted leading-relaxed mb-8">
              {isZh
                ? "扫码即可，无论金额大小都非常感谢。"
                : "Scan with WeChat or Alipay - every bit is appreciated."}
            </p>
            <div className="grid grid-cols-2 gap-6 max-w-md">
              {qrCodes.map((qr) => (
                <figure key={qr.src} className="border border-border p-4 text-center">
                  <Image
                    src={qr.src}
                    alt={qr.title}
                    width={320}
                    height={320}
                    className="w-full h-auto"
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

        <section>
          <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
            <h2 className="text-xl md:text-2xl mb-4">
              {isZh ? "不花钱的支持方式" : "Free ways to help"}
            </h2>
            <ul className="grid gap-3 text-sm md:text-base text-muted leading-relaxed">
              <li>
                {isZh
                  ? "把 StyleKit 分享给会用到它的朋友或社区。"
                  : "Share StyleKit with a friend or community that would use it."}
              </li>
              <li>
                {isZh
                  ? "在 GitHub 提交问题反馈或风格建议。"
                  : "File issues or style suggestions on GitHub."}
              </li>
              <li>
                {isZh ? (
                  <>
                    购买相关说明见
                    <LocalizedLink href="/refunds" className="underline underline-offset-4 hover:text-foreground ml-1">
                      退款政策
                    </LocalizedLink>
                    。
                  </>
                ) : (
                  <>
                    Paid-product terms live in the
                    <LocalizedLink href="/refunds" className="underline underline-offset-4 hover:text-foreground ml-1">
                      refund policy
                    </LocalizedLink>
                    .
                  </>
                )}
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
