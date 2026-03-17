"use client";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Page transition wrapper.
 *
 * Previously started at opacity-0 and faded in after hydration, which added
 * ~200-400ms of Render Delay to LCP because the entire page was invisible
 * until JS executed. Now renders children immediately so the browser can
 * paint server-rendered HTML without waiting for client JS.
 */
export function PageTransition({ children }: PageTransitionProps) {
  return <>{children}</>;
}
