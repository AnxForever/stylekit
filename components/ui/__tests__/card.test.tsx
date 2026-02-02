import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

describe("Card Component", () => {
  it("renders with default props", () => {
    render(<Card data-testid="card">Card content</Card>);
    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders with default variant", () => {
    render(<Card data-testid="card" />);
    const card = screen.getByTestId("card");
    expect(card).toHaveClass("border");
    expect(card).toHaveClass("border-border");
  });

  it("renders with elevated variant", () => {
    render(<Card variant="elevated" data-testid="card" />);
    expect(screen.getByTestId("card")).toHaveClass("shadow-lg");
  });

  it("renders with ghost variant", () => {
    render(<Card variant="ghost" data-testid="card" />);
    const card = screen.getByTestId("card");
    expect(card).not.toHaveClass("border");
    expect(card).not.toHaveClass("shadow-lg");
  });

  it("renders with different padding sizes", () => {
    const { rerender } = render(<Card padding="sm" data-testid="card" />);
    expect(screen.getByTestId("card")).toHaveClass("p-4");

    rerender(<Card padding="lg" data-testid="card" />);
    expect(screen.getByTestId("card")).toHaveClass("p-8");

    rerender(<Card padding="none" data-testid="card" />);
    const card = screen.getByTestId("card");
    expect(card).not.toHaveClass("p-4");
    expect(card).not.toHaveClass("p-6");
    expect(card).not.toHaveClass("p-8");
  });

  it("accepts custom className", () => {
    render(<Card className="custom-class" data-testid="card" />);
    expect(screen.getByTestId("card")).toHaveClass("custom-class");
  });
});

describe("CardHeader Component", () => {
  it("renders children", () => {
    render(<CardHeader>Header content</CardHeader>);
    expect(screen.getByText("Header content")).toBeInTheDocument();
  });

  it("applies flex column layout", () => {
    render(<CardHeader data-testid="header" />);
    expect(screen.getByTestId("header")).toHaveClass("flex");
    expect(screen.getByTestId("header")).toHaveClass("flex-col");
  });
});

describe("CardTitle Component", () => {
  it("renders as h3 element", () => {
    render(<CardTitle>Title</CardTitle>);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("applies serif font styling", () => {
    render(<CardTitle data-testid="title">Title</CardTitle>);
    expect(screen.getByTestId("title")).toHaveClass("font-serif");
  });
});

describe("CardDescription Component", () => {
  it("renders with muted text styling", () => {
    render(<CardDescription data-testid="desc">Description</CardDescription>);
    expect(screen.getByTestId("desc")).toHaveClass("text-sm");
    expect(screen.getByTestId("desc")).toHaveClass("text-muted");
  });
});

describe("CardContent Component", () => {
  it("renders children with padding", () => {
    render(<CardContent data-testid="content">Content</CardContent>);
    expect(screen.getByTestId("content")).toHaveClass("pt-4");
  });
});

describe("CardFooter Component", () => {
  it("renders with flex layout", () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>);
    expect(screen.getByTestId("footer")).toHaveClass("flex");
    expect(screen.getByTestId("footer")).toHaveClass("items-center");
  });
});
