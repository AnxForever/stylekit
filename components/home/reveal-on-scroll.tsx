"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const revealVariants = {
  upStrong: "motion-safe:opacity-0 motion-safe:animate-home-reveal-up-strong",
  up: "motion-safe:opacity-0 motion-safe:animate-home-reveal-up",
  upSubtle: "motion-safe:opacity-0 motion-safe:animate-home-reveal-up-subtle",
  soft: "motion-safe:opacity-0 motion-safe:animate-home-reveal-soft",
} as const;

type RevealVariant = keyof typeof revealVariants;

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  variant?: RevealVariant;
  instant?: boolean;
  disableDelayOnMobile?: boolean;
}

export function RevealOnScroll({
  children,
  className,
  delayMs = 0,
  variant = "up",
  instant = false,
  disableDelayOnMobile = false,
}: RevealOnScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (instant) return;
    const element = elementRef.current;
    if (!element || isVisible) return;

    if (typeof window === "undefined") return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        setIsVisible(true);
        currentObserver.disconnect();
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [instant, isVisible]);

  const animationStyle: CSSProperties | undefined =
    !instant && delayMs > 0 ? { animationDelay: `${delayMs}ms` } : undefined;

  return (
    <div
      ref={elementRef}
      style={animationStyle}
      className={cn(
        className,
        disableDelayOnMobile && "home-reveal-mobile-no-delay",
        instant
          ? null
          : [
              "motion-reduce:opacity-100",
              isVisible ? revealVariants[variant] : "opacity-0",
            ]
      )}
    >
      {children}
    </div>
  );
}
