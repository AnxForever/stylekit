"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export function ShowcaseBackBar() {
  const pathname = usePathname();
  const router = useRouter();

  // Match /styles/{slug}/showcase or /styles/{slug}/showcase/
  const match = pathname.match(/^\/styles\/([^/]+)\/showcase\/?$/);
  if (!match) return null;

  const slug = match[1];

  const handleClick = () => {
    // Save current showcase scroll position
    sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());
    router.push(`/styles/${slug}`);
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Back to style details"
      className="fixed bottom-5 left-5 z-[9999] inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-black/65 backdrop-blur-md rounded-full hover:bg-black/80 transition-colors"
    >
      <ChevronLeft className="w-3.5 h-3.5" />
      Back
    </button>
  );
}
