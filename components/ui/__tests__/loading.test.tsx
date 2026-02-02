import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Loading, LoadingOverlay } from "@/components/ui/loading";

describe("Loading Component", () => {
  it("renders with default props", () => {
    render(<Loading />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders with screen reader text", () => {
    render(<Loading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders with custom label", () => {
    render(<Loading label="加载中..." />);
    // Label appears in both visible span and sr-only, use getAllByText
    const labels = screen.getAllByText("加载中...");
    expect(labels.length).toBeGreaterThanOrEqual(1);
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<Loading size="sm" data-testid="loading" />);
    let svg = screen.getByTestId("loading").querySelector("svg");
    expect(svg).toHaveClass("h-4");
    expect(svg).toHaveClass("w-4");

    rerender(<Loading size="xl" data-testid="loading" />);
    svg = screen.getByTestId("loading").querySelector("svg");
    expect(svg).toHaveClass("h-12");
    expect(svg).toHaveClass("w-12");
  });

  it("renders with different colors", () => {
    const { rerender } = render(<Loading color="accent" data-testid="loading" />);
    let svg = screen.getByTestId("loading").querySelector("svg");
    expect(svg).toHaveClass("text-accent");

    rerender(<Loading color="muted" data-testid="loading" />);
    svg = screen.getByTestId("loading").querySelector("svg");
    expect(svg).toHaveClass("text-muted");
  });

  it("has spinning animation", () => {
    render(<Loading data-testid="loading" />);
    const svg = screen.getByTestId("loading").querySelector("svg");
    expect(svg).toHaveClass("animate-spin");
  });

  it("accepts custom className", () => {
    render(<Loading className="custom-class" data-testid="loading" />);
    expect(screen.getByTestId("loading")).toHaveClass("custom-class");
  });
});

describe("LoadingOverlay Component", () => {
  it("renders when visible is true", () => {
    render(<LoadingOverlay visible={true} data-testid="overlay" />);
    expect(screen.getByTestId("overlay")).toBeInTheDocument();
  });

  it("does not render when visible is false", () => {
    render(<LoadingOverlay visible={false} data-testid="overlay" />);
    expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();
  });

  it("renders with backdrop styling", () => {
    const { container } = render(<LoadingOverlay />);
    // The overlay wrapper is the first div child
    const overlay = container.firstChild as HTMLElement;
    expect(overlay).toHaveClass("absolute");
    expect(overlay).toHaveClass("backdrop-blur-sm");
  });
});
