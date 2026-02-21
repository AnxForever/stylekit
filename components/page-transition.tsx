"use client";

import { useEffect, useRef, useState } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Page transition wrapper.
 * Animates a fade-in only on the initial mount. Subsequent soft navigations
 * are instant to avoid a visible opacity flash on every route change.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const hasMounted = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (hasMounted.current) return;
    // First mount: animate in on next frame
    const timer = requestAnimationFrame(() => {
      hasMounted.current = true;
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div
      className={`transition-all duration-200 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      {children}
    </div>
  );
}
