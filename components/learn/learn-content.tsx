"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useI18n } from "@/lib/i18n/context";
import { ColorTheoryContent } from "@/components/color-theory/color-theory-content";
import { TypographyContent } from "@/components/typography/typography-content";
import { TypeScaleContent } from "@/components/type-scale/type-scale-content";
import { SpacingContent } from "@/components/spacing/spacing-content";
import { DesignPrinciplesContent } from "@/components/design-principles/design-principles-content";
import { VisualHierarchyContent } from "@/components/visual-hierarchy/visual-hierarchy-content";

interface Chapter {
  id: string;
  zh: string;
  en: string;
  Comp: ComponentType;
}

// System layer — the "why it looks good" foundations. Each chapter reuses the
// existing standalone content component verbatim; the standalone routes stay
// live for deep links, this page is the unified reading entry point.
const CHAPTERS: Chapter[] = [
  { id: "color-theory", zh: "色彩理论", en: "Color Theory", Comp: ColorTheoryContent },
  { id: "typography", zh: "字体配对", en: "Typography", Comp: TypographyContent },
  { id: "type-scale", zh: "字号阶梯", en: "Type Scale", Comp: TypeScaleContent },
  { id: "spacing", zh: "间距与网格", en: "Spacing & Grid", Comp: SpacingContent },
  { id: "design-principles", zh: "设计四原则", en: "Design Principles", Comp: DesignPrinciplesContent },
  { id: "visual-hierarchy", zh: "视觉层次", en: "Visual Hierarchy", Comp: VisualHierarchyContent },
];

export function LearnContent() {
  const { locale } = useI18n();
  const tx = (zh: string, en: string) => (locale === "zh" ? zh : en);
  const [active, setActive] = useState<string>(CHAPTERS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 },
    );
    for (const ch of CHAPTERS) {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  function jump(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div data-cursor-aura="off">
      {/* hero */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-14 md:py-20">
          <p className="text-xs uppercase tracking-[0.2em] text-muted mb-3">
            {tx("前端百科全书", "Frontend Encyclopedia")}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {tx("前端基础", "Frontend Foundations")}
          </h1>
          <p className="text-muted leading-relaxed max-w-2xl text-lg">
            {tx(
              "把「好看」拆开讲透——从色彩、字体、字号、间距，到设计原则与视觉层次。不只给你素材，更教你为什么。一页学完前端的视觉系统。",
              "Everything that makes interfaces look good, in one place — color, type, scale, spacing, design principles, and visual hierarchy. Not just the materials, but the why. The visual system of the front end, on a single page.",
            )}
          </p>
        </div>
      </header>

      <div className="max-w-[88rem] mx-auto px-4 md:px-8 lg:flex lg:gap-10 py-10">
        {/* left sticky chapter nav */}
        <aside className="hidden lg:block lg:w-52 shrink-0">
          <nav className="sticky top-24 space-y-1" aria-label={tx("章节导航", "Chapters")}>
            <p className="text-[0.7rem] uppercase tracking-wide text-muted/60 mb-3 px-3">
              {tx("目录", "Chapters")}
            </p>
            {CHAPTERS.map((ch, i) => (
              <button
                key={ch.id}
                onClick={() => jump(ch.id)}
                className={`block w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                  active === ch.id
                    ? "bg-foreground text-background font-medium"
                    : "text-muted hover:text-foreground hover:bg-muted/20"
                }`}
              >
                <span className="tabular-nums text-xs opacity-50 mr-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {tx(ch.zh, ch.en)}
              </button>
            ))}
          </nav>
        </aside>

        {/* right chapter stream — reuse existing content components verbatim */}
        <main className="flex-1 min-w-0 divide-y divide-border">
          {CHAPTERS.map((ch) => (
            <section key={ch.id} id={ch.id} className="scroll-mt-24">
              <ch.Comp />
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
