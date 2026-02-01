import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

describe("Alert Component", () => {
  it("renders with default props", () => {
    render(<Alert>Alert content</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Alert content")).toBeInTheDocument();
  });

  it("renders with default variant styling", () => {
    render(<Alert data-testid="alert" />);
    const alert = screen.getByTestId("alert");
    expect(alert).toHaveClass("bg-background");
    expect(alert).toHaveClass("border-border");
  });

  it("renders with info variant", () => {
    render(<Alert variant="info" data-testid="alert" />);
    const alert = screen.getByTestId("alert");
    expect(alert).toHaveClass("text-blue-600");
    expect(alert).toHaveClass("bg-blue-50");
  });

  it("renders with success variant", () => {
    render(<Alert variant="success" data-testid="alert" />);
    const alert = screen.getByTestId("alert");
    expect(alert).toHaveClass("text-green-600");
    expect(alert).toHaveClass("bg-green-50");
  });

  it("renders with warning variant", () => {
    render(<Alert variant="warning" data-testid="alert" />);
    const alert = screen.getByTestId("alert");
    expect(alert).toHaveClass("text-yellow-600");
    expect(alert).toHaveClass("bg-yellow-50");
  });

  it("renders with error variant", () => {
    render(<Alert variant="error" data-testid="alert" />);
    const alert = screen.getByTestId("alert");
    expect(alert).toHaveClass("text-red-600");
    expect(alert).toHaveClass("bg-red-50");
  });

  it("renders icon by default", () => {
    render(<Alert data-testid="alert">Content</Alert>);
    const alert = screen.getByTestId("alert");
    const icon = alert.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("hides icon when icon prop is false", () => {
    render(<Alert icon={false} data-testid="alert">Content</Alert>);
    const alert = screen.getByTestId("alert");
    const icon = alert.querySelector("svg");
    expect(icon).not.toBeInTheDocument();
  });

  it("accepts custom className", () => {
    render(<Alert className="custom-class" data-testid="alert" />);
    expect(screen.getByTestId("alert")).toHaveClass("custom-class");
  });
});

describe("AlertTitle Component", () => {
  it("renders as h5 element", () => {
    render(<AlertTitle>Title</AlertTitle>);
    expect(screen.getByRole("heading", { level: 5 })).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("applies font medium styling", () => {
    render(<AlertTitle data-testid="title">Title</AlertTitle>);
    expect(screen.getByTestId("title")).toHaveClass("font-medium");
  });
});

describe("AlertDescription Component", () => {
  it("renders with small text styling", () => {
    render(<AlertDescription data-testid="desc">Description</AlertDescription>);
    expect(screen.getByTestId("desc")).toHaveClass("text-sm");
  });
});
