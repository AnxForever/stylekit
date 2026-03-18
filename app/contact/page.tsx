import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Contact & Support",
  description:
    "Where to ask questions, report bugs, and follow up on public StyleKit support channels.",
};

const supportLinks = [
  {
    title: "GitHub Discussions",
    description: "Use for product questions, launch feedback, feature requests, and general support.",
    href: "https://github.com/AnxForever/stylekit/discussions",
    external: true,
  },
  {
    title: "GitHub Issues",
    description: "Use for reproducible bugs, broken links, data issues, or validation failures.",
    href: "https://github.com/AnxForever/stylekit/issues",
    external: true,
  },
  {
    title: "Repository",
    description: "Browse source, roadmap context, and recent changes before opening a thread.",
    href: "https://github.com/AnxForever/stylekit",
    external: true,
  },
  {
    title: "Newsletter",
    description: "Follow public updates and launch notes from any footer signup form on the site.",
    href: "/",
    external: false,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">Support</p>
            <h1 className="text-4xl md:text-5xl leading-tight mb-6">Contact & Support</h1>
            <p className="text-lg text-muted leading-relaxed max-w-3xl">
              StyleKit currently handles support through public channels. Use the path that best matches your question so launch issues and product feedback can be triaged quickly.
            </p>
          </div>
        </section>

        <section>
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16 grid gap-6">
            {supportLinks.map((link) => {
              const classes = "inline-flex items-center justify-between gap-4 border border-border p-6 hover:border-foreground transition-colors";
              const content = (
                <>
                  <div>
                    <h2 className="text-xl mb-2">{link.title}</h2>
                    <p className="text-sm text-muted leading-relaxed">{link.description}</p>
                  </div>
                  <span className="text-sm text-muted">Open</span>
                </>
              );

              return link.external ? (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes}
                >
                  {content}
                </a>
              ) : (
                <Link key={link.title} href={link.href} className={classes}>
                  {content}
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
