import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Progress } from "@/components/ui/progress";

describe("Progress Component", () => {
  it("renders with default props", () => {
    render(<Progress value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<Progress value={50} size="sm" />);
    expect(screen.getByRole("progressbar")).toHaveClass("h-1");

    rerender(<Progress value={50} size="lg" />);
    expect(screen.getByRole("progressbar")).toHaveClass("h-4");
  });

  it("shows value when showValue is true", () => {
    render(<Progress value={65} showValue />);
    expect(screen.getByText("65%")).toBeInTheDocument();
  });

  it("hides value by default", () => {
    render(<Progress value={65} />);
    expect(screen.queryByText("65%")).not.toBeInTheDocument();
  });

  it("handles zero value", () => {
    render(<Progress value={0} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("handles full value", () => {
    render(<Progress value={100} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows percentage text for different values", () => {
    const { rerender } = render(<Progress value={0} showValue />);
    expect(screen.getByText("0%")).toBeInTheDocument();

    rerender(<Progress value={100} showValue />);
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("accepts custom className", () => {
    render(<Progress value={50} className="custom-class" />);
    expect(screen.getByRole("progressbar")).toHaveClass("custom-class");
  });
});
