"use client";

import { useState, type ComponentType } from "react";
import { useSearchParams } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import { TypographyContent } from "@/components/typography/typography-content";
import { GradientsContent } from "@/components/gradients/gradients-content";
import { ShadowsContent } from "@/components/shadows/shadows-content";
import { BackgroundsContent } from "@/components/backgrounds/backgrounds-content";

interface ResourceSection {
  id: string;
  zh: string;
  en: string;
  blurbZh: string;
  blurbEn: string;
  Comp: ComponentType;
}

// The copy-ready CSS asset libraries, unified behind one sidebar. Each section
// reuses its standalone content component verbatim; only the active section is
// mounted so a page with 150+ cards stays light. The former standalone routes
// (/typography, /gradients, /shadows, /backgrounds) now 301 here with ?tab=.
const SECTIONS: ResourceSection[] = [
  {
    id: "typography",
    zh: "字体配对",
    en: "Font Pairings",
    blurbZh: "精选开源 Google Fonts 配对，标题正文成套取用。",
    blurbEn: "Curated open-source Google Fonts pairings, ready to use as heading + body sets.",
    Comp: TypographyContent,
  },
  {
    id: "gradients",
    zh: "渐变",
    en: "Gradients",
    blurbZh: "预设 CSS 渐变，一键复制 CSS 或 Tailwind。",
    blurbEn: "Preset CSS gradients — copy CSS or Tailwind in one click.",
    Comp: GradientsContent,
  },
  {
    id: "shadows",
    zh: "阴影",
    en: "Shadows",
    blurbZh: "从柔和到硬朗、分层到发光的 box-shadow 预设。",
    blurbEn: "Box-shadow presets from soft to hard, layered to glow.",
    Comp: ShadowsContent,
  },
  {
    id: "backgrounds",
    zh: "背景纹理",
    en: "Backgrounds",
    blurbZh: "纯 CSS 与 SVG 背景纹理，网格、圆点、几何图案等。",
    blurbEn: "Pure-CSS and SVG background textures — grids, dots, geometric patterns.",
    Comp: BackgroundsContent,
  },
];

const VALID_IDS = new Set(SECTIONS.map((s) => s.id));

export function ResourcesContent() {
  const { locale } = useI18n();
  const tx = (zh: string, en: string) => (locale === "zh" ? zh : en);
  const searchParams = useSearchParams();
  const fromQuery = searchParams.get("tab");
  const fromHash =
    typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
  const requestedSection = [fromQuery, fromHash].find(
    (id): id is string => Boolean(id && VALID_IDS.has(id)),
  );
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  // Land on the right section from ?tab= (301 targets) or #hash (deep links).
  // A user click takes precedence for the rest of the current page session.
  const active = selectedSection ?? requestedSection ?? SECTIONS[0].id;

  const activeSection = SECTIONS.find((s) => s.id === active) ?? SECTIONS[0];
  const ActiveComp = activeSection.Comp;

  const selectSection = (id: string) => {
    setSelectedSection(id);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <div data-cursor-aura="off">
      {/* hero */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-14 md:py-20">
          <p className="text-xs uppercase tracking-[0.2em] text-muted mb-3">
            {tx("资源库", "Resource Library")}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {tx("设计资源", "Design Resources")}
          </h1>
          <p className="text-muted leading-relaxed max-w-2xl text-lg">
            {tx(
              "可直接取用的设计素材，集中在一处：字体配对、渐变、阴影与背景纹理。复制 CSS，或加入你的工具箱一键导出。",
              "Copy-ready design assets in one place: font pairings, gradients, shadows and background textures. Copy the CSS, or add them to your kit and export in one go.",
            )}
          </p>
        </div>
      </header>

      <div className="max-w-[88rem] mx-auto px-4 md:px-8 lg:flex lg:gap-10 py-10">
        {/* left sticky section nav */}
        <aside className="lg:w-56 shrink-0 mb-6 lg:mb-0">
          <nav
            className="lg:sticky lg:top-24 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible"
            aria-label={tx("资源分类", "Resource sections")}
          >
            <p className="hidden lg:block text-[0.7rem] uppercase tracking-wide text-muted/60 mb-3 px-3">
              {tx("分类", "Sections")}
            </p>
            {SECTIONS.map((section, i) => (
              <button
                key={section.id}
                onClick={() => selectSection(section.id)}
                aria-current={active === section.id ? "true" : undefined}
                className={`shrink-0 lg:block lg:w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                  active === section.id
                    ? "bg-foreground text-background font-medium"
                    : "text-muted hover:text-foreground hover:bg-muted/20"
                }`}
              >
                <span className="tabular-nums text-xs opacity-50 mr-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {tx(section.zh, section.en)}
              </button>
            ))}
          </nav>
        </aside>

        {/* active section — only one library is mounted at a time */}
        <main className="flex-1 min-w-0">
          <ActiveComp />
        </main>
      </div>
    </div>
  );
}
