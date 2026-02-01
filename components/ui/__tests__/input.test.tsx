import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "@/components/ui/input";

describe("Input Component", () => {
  it("renders with default props", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders with default variant", () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass("border");
    expect(input).toHaveClass("border-border");
  });

  it("renders with filled variant", () => {
    render(<Input variant="filled" data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass("bg-foreground/5");
  });

  it("renders with flushed variant", () => {
    render(<Input variant="flushed" data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass("border-b");
    expect(input).toHaveClass("rounded-none");
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<Input inputSize="sm" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveClass("h-8");
    expect(screen.getByTestId("input")).toHaveClass("text-xs");

    rerender(<Input inputSize="lg" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveClass("h-12");
    expect(screen.getByTestId("input")).toHaveClass("text-base");
  });

  it("shows error state", () => {
    render(<Input error data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveClass("border-red-500");
  });

  it("handles disabled state", () => {
    render(<Input disabled data-testid="input" />);
    expect(screen.getByTestId("input")).toBeDisabled();
  });

  it("accepts custom className", () => {
    render(<Input className="custom-class" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveClass("custom-class");
  });

  it("renders different input types", () => {
    render(<Input type="email" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveAttribute("type", "email");
  });
});
