"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { sanitizePreviewHtml, sanitizeCss } from "@/lib/security/sanitize-html";
import type { DesignStyle, ComponentTemplate } from "@/lib/styles";

// --- Inline hooks ---

function useInView(options: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, inView };
}

function RevealBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
// --- Preview HTML generation ---

const BLOCK_ELEMENTS =
  "div|span|p|h[1-6]|section|article|nav|aside|header|footer|main|ul|ol|li|button|label|blockquote|pre|code|form|fieldset|figure|figcaption|details|summary|a|strong|em|time|address";

function generatePreviewHTML(code: string): string {
  return code
    .replace(/className=/g, "class=")
    .replace(/\{`([^`]*)`\}/g, "$1")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(
      new RegExp(
        `<(${BLOCK_ELEMENTS})((?:[^>]|"[^"]*"|'[^']*')*?)\\s*\\/>`,
        "g"
      ),
      "<$1$2></$1>"
    )
    .trim();
}

// --- Main component ---

interface Props {
  style: DesignStyle;
}

export default function DynamicShowcaseContent({ style }: Props) {
  const components = style.components;
  const componentEntries = useMemo(() => {
    if (!components) return [];
    return Object.entries(components).filter(([, c]) => c.code);
  }, [components]);

  const allColors = [
    { name: "Primary", value: style.colors.primary },
    { name: "Secondary", value: style.colors.secondary },
    ...style.colors.accent.map((c, i) => ({
      name: `Accent ${i + 1}`,
      value: c,
    })),
  ];

  return (
    <div className="min-h-screen">
      {style.globalCss && (
        <style dangerouslySetInnerHTML={{ __html: sanitizeCss(style.globalCss) }} />
      )}
      {/* Hero */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: `linear-gradient(135deg, ${style.colors.primary}, ${style.colors.secondary})`,
          }}
        />
        <RevealBlock className="relative z-10">
          <p className="text-sm tracking-[0.2em] uppercase text-muted mb-4">
            StyleKit Showcase
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
            {style.name}
          </h1>
          {style.nameEn && style.nameEn !== style.name && (
            <p className="text-2xl md:text-3xl text-muted mb-6">
              {style.nameEn}
            </p>
          )}
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            {style.description}
          </p>
        </RevealBlock>
      </section>

      {/* Philosophy */}
      {style.philosophy && (
        <section className="px-6 md:px-12 py-16 md:py-24 max-w-4xl mx-auto">
          <RevealBlock>
            <p className="text-xs tracking-[0.2em] uppercase text-muted mb-6">
              Philosophy
            </p>
            <blockquote className="text-xl md:text-2xl leading-relaxed text-muted italic">
              {style.philosophy}
            </blockquote>
          </RevealBlock>
        </section>
      )}

      {/* Color Palette */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto">
        <RevealBlock>
          <p className="text-xs tracking-[0.2em] uppercase text-muted mb-8">
            Color Palette
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {allColors.map((color) => (
              <div key={color.value}>
                <div
                  className="aspect-square border border-border mb-3"
                  style={{ backgroundColor: color.value }}
                />
                <p className="text-xs text-muted">{color.name}</p>
                <p className="text-xs font-mono text-muted">{color.value}</p>
              </div>
            ))}
          </div>
        </RevealBlock>
      </section>
      {/* Components */}
      {componentEntries.map(([key, component], idx) => (
        <ComponentShowcaseSection
          key={key}
          component={component}
          index={idx}
        />
      ))}

      {/* Design Rules */}
      {((style.doList && style.doList.length > 0) ||
        (style.dontList && style.dontList.length > 0)) && (
        <section className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto">
          <RevealBlock>
            <p className="text-xs tracking-[0.2em] uppercase text-muted mb-8">
              Design Rules
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {style.doList && style.doList.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-4">
                    Do
                  </p>
                  <ul className="space-y-2">
                    {style.doList.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <span className="text-green-600 dark:text-green-400 mt-0.5 shrink-0">
                          &#10003;
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {style.dontList && style.dontList.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-4">
                    Don&apos;t
                  </p>
                  <ul className="space-y-2">
                    {style.dontList.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <span className="text-red-600 dark:text-red-400 mt-0.5 shrink-0">
                          &#10007;
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </RevealBlock>
        </section>
      )}

      {/* Back link */}
      <section className="px-6 md:px-12 py-12 max-w-7xl mx-auto text-center">
        <Link
          href={`/styles/${style.slug}`}
          className="text-sm underline underline-offset-4 hover:no-underline text-muted hover:text-foreground"
        >
          Back to {style.nameEn || style.name}
        </Link>
      </section>
    </div>
  );
}

function ComponentShowcaseSection({
  component,
  index,
}: {
  component: ComponentTemplate;
  index: number;
}) {
  const previewHtml = useMemo(() => {
    return sanitizePreviewHtml(
      component.preview || generatePreviewHTML(component.code)
    );
  }, [component]);

  return (
    <section className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto">
      <RevealBlock delay={index * 0.1}>
        <p className="text-xs tracking-[0.2em] uppercase text-muted mb-3">
          {component.name}
        </p>
        {component.description && (
          <p className="text-sm text-muted mb-6">{component.description}</p>
        )}
        <div className="border border-border">
          <div className="p-8 md:p-12 bg-white dark:bg-zinc-900 flex items-center justify-center min-h-[200px]">
            <div className="relative isolate w-full min-h-[200px] transform-gpu">
              <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
            </div>
          </div>
        </div>
      </RevealBlock>
    </section>
  );
}
