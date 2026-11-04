// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DesignMarkdown } from "@/components/style-preview/design-md-content";

const DOCUMENT = [
  "# Apple Style — Style Reference",
  "> Quiet surfaces, precise type.",
  "## Colors",
  "| Name | Value | Role |",
  "|---|---|---|",
  "| Ink | `#111111` | Body text |",
  "```html",
  '<div class="card">Ink</div>',
  "```",
].join("\n");

describe("DesignMarkdown", () => {
  it("renders the document outline below the section heading", () => {
    render(<DesignMarkdown markdown={DOCUMENT} />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Apple Style — Style Reference" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 4, name: "Colors" })).toBeInTheDocument();
  });

  it("renders tables, code spans and fenced code", () => {
    render(<DesignMarkdown markdown={DOCUMENT} />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Value" })).toBeInTheDocument();
    expect(screen.getByText("#111111")).toBeInTheDocument();
    expect(screen.getByText('<div class="card">Ink</div>')).toBeInTheDocument();
  });

  it("renders bold labels as text rather than literal markers", () => {
    render(<DesignMarkdown markdown={"**Base unit:** `16px`"} />);

    expect(screen.getByText("Base unit:")).toBeInTheDocument();
    expect(screen.queryByText("**Base unit:**")).not.toBeInTheDocument();
  });
});
