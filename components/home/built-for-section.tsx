"use client";

import { useI18n } from "@/lib/i18n/context";
import { RevealOnScroll } from "@/components/home/reveal-on-scroll";
import { cn } from "@/lib/utils";

interface Integration {
  name: string;
  icon: "tailwind" | "shadcn" | "figma" | "vscode" | "cursor" | "v0";
}

const integrations: Integration[] = [
  { name: "Tailwind CSS", icon: "tailwind" },
  { name: "shadcn/ui", icon: "shadcn" },
  { name: "Figma", icon: "figma" },
  { name: "VS Code", icon: "vscode" },
  { name: "Cursor", icon: "cursor" },
  { name: "v0", icon: "v0" },
];

function IntegrationIcon({ icon, className }: { icon: Integration["icon"]; className?: string }) {
  const base = cn("w-6 h-6 sm:w-7 sm:h-7", className);

  switch (icon) {
    case "tailwind":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
      );
    case "shadcn":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          <path d="M3.6 9h16.8" />
          <path d="M3.6 15h16.8" />
          <path d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9Z" />
        </svg>
      );
    case "figma":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 0" />
          <path d="M8.148 24c2.476 0 4.49-2.014 4.49-4.49v-4.49H8.148c-2.476 0-4.49 2.014-4.49 4.49S5.672 24 8.148 24zm0-7.51h3.117v3.019c0 1.665-1.354 3.019-3.019 3.019S5.13 21.174 5.13 19.51s1.354-3.019 3.019-3.019zm0 0" />
          <path d="M8.148 16.49h4.588V7.51H8.148c-2.476 0-4.49 2.014-4.49 4.49s2.014 4.49 4.49 4.49zm0-7.51h3.117v5.55H8.148c-1.665 0-3.019-1.354-3.019-3.019 0-1.665 1.354-2.53 3.019-2.53zm0 0" />
          <path d="M8.148 8.981h4.588V0H8.148C5.672 0 3.658 2.014 3.658 4.49s2.014 4.491 4.49 4.491zm0-7.51h3.117V7.51H8.148C6.483 7.51 5.13 6.156 5.13 4.49S6.483 1.471 8.148 1.471zm0 0" />
          <path d="M15.852 16.49c2.476 0 4.49-2.014 4.49-4.49s-2.014-4.49-4.49-4.49-4.49 2.014-4.49 4.49 2.014 4.49 4.49 4.49zm0-7.51c1.665 0 3.019 1.354 3.019 3.019s-1.354 3.019-3.019 3.019-3.019-1.354-3.019-3.019 1.354-3.019 3.019-3.019zm0 0" />
        </svg>
      );
    case "vscode":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.15 2.587L18.21.21a1.516 1.516 0 0 0-1.706.355L9.265 7.399 4.04 3.46a1.01 1.01 0 0 0-1.29.049L.378 5.76a1.01 1.01 0 0 0 0 1.48L4.3 11.5.378 15.76a1.01 1.01 0 0 0 0 1.48l2.372 2.25a1.01 1.01 0 0 0 1.29.05l5.224-3.94 7.24 6.834a1.516 1.516 0 0 0 1.706.355l4.94-2.377A1.516 1.516 0 0 0 24 18.96V4.04a1.516 1.516 0 0 0-.85-1.453zM17.5 17.54L10.1 11.5l7.4-6.04v12.08z" />
        </svg>
      );
    case "cursor":
      return (
        <span className={cn("font-semibold text-base sm:text-lg leading-none select-none", className)} aria-hidden="true">
          {"{ }"}
        </span>
      );
    case "v0":
      return (
        <span className={cn("font-semibold text-base sm:text-lg leading-none select-none", className)} aria-hidden="true">
          v0
        </span>
      );
  }
}

export function BuiltForSection() {
  const { t } = useI18n();

  return (
    <section className="border-b border-border" aria-label={t("home.builtFor.ariaLabel")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-10">
        <RevealOnScroll variant="soft">
          <p className="text-center text-[11px] tracking-[0.16em] uppercase text-muted mb-6">
            {t("home.builtFor.label")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 md:gap-12">
            {integrations.map((item, index) => (
              <RevealOnScroll
                key={item.name}
                variant="upSubtle"
                delayMs={60 + index * 50}
                disableDelayOnMobile
              >
                <div
                  className="flex flex-col items-center gap-2 text-muted/50 hover:text-foreground transition-colors duration-200 cursor-default"
                  title={item.name}
                >
                  <IntegrationIcon icon={item.icon} />
                  <span className="text-[10px] sm:text-[11px] tracking-wide">
                    {item.name}
                  </span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
