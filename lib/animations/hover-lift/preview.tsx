"use client";

import { PreviewContainer } from "../previews/_shared";

const cards = [
  { title: "Design", description: "Create beautiful interfaces" },
  { title: "Develop", description: "Build robust applications" },
  { title: "Deploy", description: "Ship with confidence" },
];

export function HoverLiftPreview() {
  return (
    <PreviewContainer bg="light">
      <div className="flex gap-4 w-full max-w-lg">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex-1 rounded-lg border border-border bg-background p-4 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg cursor-pointer"
          >
            <h4 className="text-sm font-semibold text-foreground">
              {card.title}
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </PreviewContainer>
  );
}
