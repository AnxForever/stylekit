"use client";

import { useEffect, useRef, useState } from "react";
import { PreviewContainer } from "../previews/_shared";

const items = [
  "Responsive Design",
  "Dark Mode Support",
  "Animation Library",
  "Component System",
];

export function ScrollRevealPreview() {
  return (
    <PreviewContainer bg="light">
      <div className="w-full max-w-sm h-[200px] overflow-y-auto rounded-lg border border-border bg-background">
        <div className="p-4 space-y-2">
          <p className="text-xs text-muted-foreground mb-4">Scroll down to reveal items</p>
          <div className="h-20" />
          {items.map((item) => (
            <RevealItem key={item} label={item} />
          ))}
          <div className="h-12" />
        </div>
      </div>
    </PreviewContainer>
  );
}

function RevealItem({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`p-3 rounded-md border border-border transition-all duration-500 ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
    >
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  );
}
