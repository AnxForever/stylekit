"use client";

import { PreviewContainer } from "./_shared";

export function UnderlineDrawPreview() {
  return (
    <PreviewContainer bg="light">
      <style>{`
        .underline-draw-demo {
          position: relative;
          display: inline-block;
        }
        .underline-draw-demo::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 2px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .underline-draw-demo:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      `}</style>
      <nav className="flex gap-6">
        {["Home", "About", "Blog", "Contact"].map((item) => (
          <span
            key={item}
            className="underline-draw-demo cursor-pointer text-sm text-foreground transition-colors hover:text-foreground/80"
          >
            {item}
          </span>
        ))}
      </nav>
    </PreviewContainer>
  );
}
