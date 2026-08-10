"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Mail, Menu, X } from "lucide-react";

import { TemplateButton } from "./template-button";
import { ARCHIVE_SITE } from "../_data";

type PageKey = "home" | "work" | "notes" | "about" | "contact" | "legal";

const NAV_ITEMS: Array<{ key: Exclude<PageKey, "home" | "contact">; label: string; href: string }> = [
  { key: "work", label: "WORK", href: "/templates/editorial-profile-archive/work" },
  { key: "notes", label: "NOTES", href: "/templates/editorial-profile-archive/notes" },
  { key: "about", label: "ABOUT", href: "/templates/editorial-profile-archive/about" },
];

export function TemplateChrome({ active, children }: { active: PageKey; children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden bg-[#f5f2ec] text-[#24231f]">
      <a href="#template-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:bg-[#24231f] focus:px-4 focus:py-3 focus:font-mono focus:text-[10px] focus:tracking-[0.12em] focus:text-[#f5f2ec]">SKIP TO CONTENT</a>
      <Link href="/templates" className="fixed right-4 top-3 z-[9999] border-b border-[#24231f]/35 bg-[#f5f2ec]/90 px-3 py-2 font-mono text-[10px] tracking-[0.12em] text-[#24231f]/65 no-underline backdrop-blur-sm transition-colors hover:text-[#24231f]">← TEMPLATES</Link>

      <header className="relative z-30 border-b border-[#24231f]/15 bg-[#f5f2ec]/95 backdrop-blur-sm">
        <nav aria-label="Primary navigation" className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <Link href="/templates/editorial-profile-archive" className="font-mono text-[11px] font-medium tracking-[0.2em] text-[#24231f] no-underline">
            STYLEKIT<span className="text-[#ef6b7a]">°</span>
          </Link>

          <div className="hidden items-center gap-7 sm:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                aria-current={active === item.key ? "page" : undefined}
                className={`font-mono text-[10px] tracking-[0.16em] no-underline transition-colors ${active === item.key ? "text-[#24231f]" : "text-[#24231f]/45 hover:text-[#24231f]"}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <TemplateButton href="/templates/editorial-profile-archive/contact" variant="outline">CONTACT</TemplateButton>
            </div>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center border border-[#24231f]/20 sm:hidden"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {menuOpen ? (
          <div className="border-t border-[#24231f]/15 px-5 py-5 sm:hidden">
            <div className="mx-auto grid max-w-[1240px] gap-1">
              {NAV_ITEMS.map((item) => (
                <Link key={item.key} href={item.href} onClick={() => setMenuOpen(false)} aria-current={active === item.key ? "page" : undefined} className="flex items-center justify-between border-b border-[#24231f]/10 py-4 font-mono text-[11px] tracking-[0.16em] text-[#24231f] no-underline">
                  {item.label}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
              <Link href="/templates/editorial-profile-archive/contact" onClick={() => setMenuOpen(false)} className="flex items-center justify-between py-4 font-mono text-[11px] tracking-[0.16em] text-[#5149cf] no-underline">
                CONTACT<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        ) : null}
      </header>

      <div id="template-content" tabIndex={-1}>{children}</div>

      <footer className="border-t border-[#24231f]/15 bg-[#ebe7dc]">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-14 sm:px-8 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-12 lg:py-20">
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-[#24231f]/45">EDITORIAL PROFILE ARCHIVE / 2026</p>
            <p className="mt-6 max-w-sm font-serif text-4xl leading-[0.9] tracking-[-0.05em]">A personal site with enough room for the work between the work.</p>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-[#24231f]/45">EXPLORE</p>
            <div className="mt-5 grid gap-3 text-sm">
              {NAV_ITEMS.map((item) => <Link key={item.key} href={item.href} className="text-[#24231f]/70 no-underline transition-colors hover:text-[#5149cf]">{item.label}</Link>)}
              <Link href="/templates/editorial-profile-archive/resume" className="text-[#24231f]/70 no-underline transition-colors hover:text-[#5149cf]">RESUME</Link>
              <Link href="/templates/editorial-profile-archive/contact" className="text-[#24231f]/70 no-underline transition-colors hover:text-[#5149cf]">CONTACT</Link>
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-[#24231f]/45">STAY IN TOUCH</p>
            <div className="mt-5 grid gap-3 text-sm">
              <a href={`mailto:${ARCHIVE_SITE.email}`} className="flex items-center gap-2 text-[#24231f]/70 no-underline hover:text-[#24231f]"><Mail className="h-3.5 w-3.5" aria-hidden="true" /> {ARCHIVE_SITE.email}</a>
              <a href={ARCHIVE_SITE.socials.github} className="flex items-center gap-2 text-[#24231f]/70 no-underline hover:text-[#24231f]"><Github className="h-3.5 w-3.5" aria-hidden="true" /> GitHub <ArrowUpRight className="h-3 w-3" aria-hidden="true" /></a>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 border-t border-[#24231f]/15 px-5 py-6 font-mono text-[9px] tracking-[0.14em] text-[#24231f]/45 sm:px-8 lg:px-12">
          <span>BUILT FOR PEOPLE WITH A POINT OF VIEW</span>
          <span className="flex gap-4"><Link href="/templates/editorial-profile-archive/privacy" className="no-underline hover:text-[#24231f]">PRIVACY</Link><Link href="/templates/editorial-profile-archive/terms" className="no-underline hover:text-[#24231f]">TERMS</Link><span>STYLEKIT / PERSONAL ARCHIVE</span></span>
        </div>
      </footer>
    </div>
  );
}
