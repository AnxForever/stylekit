"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function ShowcaseBackBar() {
  const pathname = usePathname();
  const router = useRouter();

  const match = pathname.match(/^\/styles\/([^/]+)\/showcase\/?$/);
  if (!match) return null;

  const slug = match[1];

  const handleClick = () => {
    sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());
    router.push(`/styles/${slug}`);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
        <button
          onClick={handleClick}
          aria-label="Back to style details"
          className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 text-sm bg-black/60 text-white backdrop-blur-md rounded-full hover:bg-black/80 transition-colors shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">
            Back to {slug.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")}
          </span>
          <span className="sm:hidden">Back</span>
        </button>
      </div>
    </div>
  );
}
