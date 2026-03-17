"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  rootMargin?: string;
  className?: string;
  /** Minimum height placeholder before content loads */
  minHeight?: string;
}

/**
 * Defers rendering of children until the element is near the viewport.
 * Uses IntersectionObserver with configurable rootMargin.
 */
export function LazySection({
  children,
  rootMargin = "200px",
  className,
  minHeight = "100px",
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}
