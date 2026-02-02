"use client";

import Link from "next/link";
import { Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShowcaseNavProps {
  /** Style slug (e.g., "neo-brutalist", "glassmorphism") */
  styleSlug: string;
  /** Display name for the style */
  styleName: string;
  /** Additional CSS classes for the nav container */
  className?: string;
  /** Additional CSS classes for buttons/links */
  linkClassName?: string;
  /** Additional CSS classes for the primary button */
  primaryButtonClassName?: string;
  /** Text color class for labels */
  labelClassName?: string;
  /** Children to render in the nav (logo override, etc.) */
  children?: React.ReactNode;
}

/**
 * Reusable navigation component for Showcase pages.
 * Each style can customize the visual appearance through className props.
 */
export function ShowcaseNav({
  styleSlug,
  styleName,
  className,
  linkClassName,
  primaryButtonClassName,
  labelClassName,
  children,
}: ShowcaseNavProps) {
  const docsHref = `/styles/${styleSlug}`;
  const previewHref = `/preview?url=/styles/${styleSlug}/showcase`;
  const showcaseHref = `/styles/${styleSlug}/showcase`;

  return (
    <nav className={cn("px-6 py-4", className)}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {children || (
          <Link href={showcaseHref} className="font-bold text-xl">
            {styleName}
          </Link>
        )}
        <div className="flex items-center gap-4">
          <span className={cn("text-sm", labelClassName)}>Live Showcase</span>
          <Link
            href={previewHref}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-sm border rounded-lg transition-colors",
              linkClassName
            )}
            title="响应式预览"
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">预览</span>
          </Link>
          <Link
            href={docsHref}
            className={cn(
              "px-4 py-2 rounded-lg text-sm transition-colors",
              primaryButtonClassName
            )}
          >
            查看文档 →
          </Link>
        </div>
      </div>
    </nav>
  );
}

interface ShowcaseFooterProps {
  /** Style slug for attribution */
  styleSlug: string;
  /** Style display name */
  styleName: string;
  /** Additional CSS classes */
  className?: string;
  /** Text color class */
  textClassName?: string;
}

/**
 * Reusable footer component for Showcase pages.
 */
export function ShowcaseFooter({
  styleName,
  className,
  textClassName,
}: ShowcaseFooterProps) {
  return (
    <footer className={cn("py-8 px-6", className)}>
      <div className="max-w-6xl mx-auto text-center">
        <p className={cn("text-sm", textClassName)}>
          {styleName} Showcase · Part of{" "}
          <Link href="/" className="hover:underline">
            StyleKit
          </Link>
        </p>
      </div>
    </footer>
  );
}

interface ShowcaseHeroProps {
  /** Badge/tag text (e.g., "玻璃拟态设计风格") */
  badge?: string;
  /** Main title */
  title: string;
  /** Subtitle/description */
  description: string;
  /** Container CSS classes */
  className?: string;
  /** Badge CSS classes */
  badgeClassName?: string;
  /** Title CSS classes */
  titleClassName?: string;
  /** Description CSS classes */
  descriptionClassName?: string;
  /** Optional CTA buttons */
  children?: React.ReactNode;
}

/**
 * Reusable hero section for Showcase pages.
 */
export function ShowcaseHero({
  badge,
  title,
  description,
  className,
  badgeClassName,
  titleClassName,
  descriptionClassName,
  children,
}: ShowcaseHeroProps) {
  return (
    <section className={cn("py-20 px-6", className)}>
      <div className="max-w-4xl mx-auto text-center">
        {badge && (
          <div className={cn("inline-block mb-6 px-4 py-2 rounded-full", badgeClassName)}>
            <span className="text-sm">{badge}</span>
          </div>
        )}
        <h1 className={cn("text-5xl md:text-7xl font-bold mb-6", titleClassName)}>
          {title}
        </h1>
        <p className={cn("text-xl max-w-2xl mx-auto mb-10", descriptionClassName)}>
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}

// ============================
// Color Palette Grid
// ============================
export interface ColorItem {
  name: string;
  hex: string;
  bg: string;
  border?: boolean;
}

interface ColorPaletteGridProps {
  colors: ColorItem[];
  cardClassName?: string;
  colorBlockClassName?: string;
  labelClassName?: string;
  hexClassName?: string;
}

/**
 * Reusable color palette grid for Showcase pages.
 */
export function ColorPaletteGrid({
  colors,
  cardClassName = "rounded-xl overflow-hidden border border-gray-200",
  colorBlockClassName = "h-20 md:h-24",
  labelClassName = "text-sm font-semibold",
  hexClassName = "text-xs opacity-60 font-mono",
}: ColorPaletteGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
      {colors.map((color) => (
        <div key={color.name} className={cardClassName}>
          <div className={cn(colorBlockClassName, color.bg, color.border && "border-b")} />
          <div className="p-3 md:p-4">
            <p className={labelClassName}>{color.name}</p>
            <p className={hexClassName}>{color.hex}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================
// Design Rules Grid
// ============================
interface DesignRulesGridProps {
  doList: string[];
  dontList: string[];
  containerClassName?: string;
  doTitleClassName?: string;
  dontTitleClassName?: string;
  itemClassName?: string;
  doTitle?: string;
  dontTitle?: string;
}

/**
 * Reusable design rules display for Showcase pages.
 */
export function DesignRulesGrid({
  doList,
  dontList,
  containerClassName = "grid md:grid-cols-2 gap-8",
  doTitleClassName = "text-lg font-semibold mb-4 text-green-600",
  dontTitleClassName = "text-lg font-semibold mb-4 text-red-600",
  itemClassName = "text-sm",
  doTitle = "Do",
  dontTitle = "Don't",
}: DesignRulesGridProps) {
  return (
    <div className={containerClassName}>
      <div>
        <h3 className={doTitleClassName}>{doTitle}</h3>
        <ul className="space-y-2">
          {doList.map((item, i) => (
            <li key={i} className={cn("flex gap-2", itemClassName)}>
              <span className="text-green-500 shrink-0">+</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className={dontTitleClassName}>{dontTitle}</h3>
        <ul className="space-y-2">
          {dontList.map((item, i) => (
            <li key={i} className={cn("flex gap-2", itemClassName)}>
              <span className="text-red-500 shrink-0">-</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ============================
// Section Wrapper
// ============================
interface ShowcaseSectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

/**
 * Reusable section wrapper for Showcase pages.
 */
export function ShowcaseSection({
  children,
  className = "py-16 md:py-24 px-4 md:px-8",
  title,
  subtitle,
  titleClassName = "text-2xl md:text-4xl font-bold mb-4",
  subtitleClassName = "mb-10 opacity-70",
}: ShowcaseSectionProps) {
  return (
    <section className={className}>
      <div className="max-w-6xl mx-auto">
        {title && <h2 className={titleClassName}>{title}</h2>}
        {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
