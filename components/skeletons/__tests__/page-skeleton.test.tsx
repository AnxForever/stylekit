// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageSkeleton, type PageSkeletonVariant } from "@/components/skeletons/page-skeleton";

const VARIANTS: PageSkeletonVariant[] = [
  "showcase",
  "template",
  "article",
  "dashboard",
  "form",
];

describe("PageSkeleton", () => {
  it.each(VARIANTS)("renders variant '%s' with identifiable container", (variant) => {
    render(<PageSkeleton variant={variant} />);
    expect(
      screen.getByTestId(`page-skeleton-${variant}`),
    ).toBeInTheDocument();
  });

  it.each(VARIANTS)("variant '%s' includes pulsing placeholders", (variant) => {
    const { container } = render(<PageSkeleton variant={variant} />);
    expect(
      container.querySelectorAll(".animate-pulse").length,
    ).toBeGreaterThan(0);
  });

  it.each(VARIANTS)("variant '%s' renders a nav placeholder at the top", (variant) => {
    const { container } = render(<PageSkeleton variant={variant} />);
    expect(container.querySelector(".border-b.border-border")).not.toBeNull();
  });
});
