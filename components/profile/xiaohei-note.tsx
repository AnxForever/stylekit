"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import styles from "./xiaohei-note.module.css";

gsap.registerPlugin(useGSAP);

interface XiaoheiNoteProps {
  locale: "zh" | "en";
}

interface XiaoheiLoadingProps extends XiaoheiNoteProps {
  label?: string;
  detail?: string;
}

function XiaoheiArtwork({ compact = false }: { compact?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLSpanElement>(null);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const dots = dotRefs.current.filter(
        (dot): dot is HTMLSpanElement => Boolean(dot),
      );
      const timeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.3,
        defaults: { ease: "power2.inOut" },
      });

      timeline
        .to(artRef.current, { y: -2, rotation: -0.25, duration: 0.45 })
        .to(paperRef.current, { x: compact ? 44 : 30, rotation: 3, duration: 0.8 }, "-=0.1")
        .to(
          dots,
          {
            opacity: 1,
            scale: 1.2,
            stagger: 0.12,
            duration: 0.18,
            ease: "power1.out",
          },
          "-=0.55",
        )
        .to(artRef.current, { y: 0, rotation: 0, duration: 0.55 })
        .to(
          paperRef.current,
          { x: 0, rotation: -5, duration: 0.65, ease: "power2.in" },
          "-=0.4",
        )
        .to(dots, { opacity: 0.42, scale: 1, duration: 0.28 }, "-=0.4")
        .to({}, { duration: compact ? 0.7 : 1.1 });
    },
    { scope: rootRef, dependencies: [compact] },
  );

  return (
    <div
      ref={rootRef}
      className={`relative overflow-hidden ${compact ? "aspect-[3/2]" : "aspect-[3/2.1]"}`}
    >
      <div ref={artRef} className="absolute inset-0">
        <Image
          src="/profile/xiaohei-loading.webp"
          alt=""
          fill
          sizes={compact ? "(max-width: 1024px) 100vw, 240px" : "240px"}
          className="object-cover"
          priority={compact}
        />
      </div>
      <span ref={paperRef} aria-hidden="true" className={styles.paper} />
      <div className="pointer-events-none absolute inset-x-5 bottom-3 flex justify-between">
        {["#5b5cbe", "#e24c70", "#2f9c95", "#d69a3a"].map((color, index) => (
          <span
            key={color}
            ref={(element) => {
              dotRefs.current[index] = element;
            }}
            className="h-1.5 w-1.5 rounded-full opacity-40"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}

export function XiaoheiLoading({ locale, label, detail }: XiaoheiLoadingProps) {
  const isZh = locale === "zh";
  const loadingLabel = label ?? (isZh ? "小黑正在整理你的风格档案" : "Xiaohei is sorting your style archive");

  return (
    <div
      className="mx-auto flex w-full max-w-sm flex-col items-center px-6 py-16 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="w-full overflow-hidden rounded-2xl border border-border/70 bg-[#f8f5ee] p-3 shadow-[0_18px_48px_-32px_rgba(28,28,28,0.45)] dark:bg-[#171b1b]">
        <XiaoheiArtwork compact />
      </div>
      <p className="mt-5 text-sm text-foreground/70">
        {loadingLabel}
      </p>
      {detail ? <p className="mt-1 text-xs text-muted">{detail}</p> : null}
      <div className="mt-3 flex items-center gap-1.5" aria-hidden="true">
        <i className={`${styles.loadingDot} h-1.5 w-1.5 bg-[#5b5cbe]`} />
        <i className={`${styles.loadingDot} h-1.5 w-1.5 bg-[#e24c70] [animation-delay:180ms]`} />
        <i className={`${styles.loadingDot} h-1.5 w-1.5 bg-[#2f9c95] [animation-delay:360ms]`} />
        <i className={`${styles.loadingDot} h-1.5 w-1.5 bg-[#d69a3a] [animation-delay:540ms]`} />
      </div>
    </div>
  );
}
