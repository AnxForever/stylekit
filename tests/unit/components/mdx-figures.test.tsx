// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import type { ComponentType, ReactNode } from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { GraphCompare } from "@/components/mdx/graph-compare/graph-compare";
import { Row } from "@/components/mdx/graph-frame/graph-frame";
import { mdxcnComponents, withMdxcn } from "@/components/mdx";

afterEach(cleanup);

type AnyComponent = ComponentType<{ children?: ReactNode }>;

function componentOf(name: string): AnyComponent {
  const components = withMdxcn(mdxcnComponents) as unknown as Record<string, AnyComponent>;
  return components[name];
}

describe("plain Markdown upgrades", () => {
  it("turns a GitHub alert blockquote into a framed callout", () => {
    const Blockquote = componentOf("blockquote");
    const { container } = render(
      <Blockquote>
        <p>{"[!WARNING] Careful\n\nBody text"}</p>
      </Blockquote>
    );

    const caption = container.querySelector("figcaption");
    expect(caption).not.toBeNull();
    expect(caption?.textContent).toContain("Careful");
    expect(container.textContent).toContain("Body text");
  });

  it("turns a console fence into a terminal", () => {
    const Pre = componentOf("pre");
    const { container } = render(
      <Pre>
        <code className="language-console">{"$ pnpm add lucide-react"}</code>
      </Pre>
    );

    expect(container.querySelector("figure")).not.toBeNull();
    expect(container.textContent).toContain("pnpm add lucide-react");
  });

  it("leaves an ordinary blockquote alone", () => {
    const Blockquote = componentOf("blockquote");
    const { container } = render(
      <Blockquote>
        <p>Just a quote.</p>
      </Blockquote>
    );

    expect(container.querySelector("figure")).toBeNull();
    expect(container.querySelector("blockquote")).not.toBeNull();
  });

  it("leaves a plain code fence alone", () => {
    const Pre = componentOf("pre");
    const { container } = render(
      <Pre>
        <code className="language-ts">{"const a = 1;"}</code>
      </Pre>
    );

    expect(container.querySelector("figure")).toBeNull();
    expect(container.querySelector("pre")).not.toBeNull();
  });
});

describe("figure chrome", () => {
  it("opts out of prose typography", () => {
    const { container } = render(
      <GraphCompare
        title="glass vs brutal"
        columns="Glassmorphism Neo-Brutalist"
        rows={[{ label: "corner radius", values: ["rounded-3xl", "rounded-none"] }]}
      />
    );

    const figure = container.querySelector("figure");
    expect(figure?.className).toContain("not-prose");
    expect(container.textContent).toContain("Glassmorphism");
    expect(container.textContent).toContain("rounded-none");
  });

  it("renders booleans as marks, not words", () => {
    const { container } = render(
      <GraphCompare
        columns="A B"
        rows={[{ label: "blur", values: [true, false] }]}
      />
    );

    const text = container.textContent ?? "";
    expect(text).toContain("✓");
    expect(text).not.toContain("true");
  });

  it("reads marker children whose type crossed the RSC boundary", () => {
    // Over the React Server Components boundary a client component's children
    // arrive with their `type` wrapped in `React.lazy`. The figure has to
    // resolve it to see the `Row` marker, or the rows silently disappear.
    const BoundaryRow = {
      $$typeof: Symbol.for("react.lazy"),
      _payload: Row,
      _init: (payload: unknown) => payload,
    } as unknown as ComponentType<{ label?: string; children?: ReactNode }>;

    const { container } = render(
      <GraphCompare title="glass vs brutal" columns="Glassmorphism Neo-Brutalist">
        <BoundaryRow label="corner radius">rounded-3xl rounded-none</BoundaryRow>
      </GraphCompare>
    );

    expect(container.querySelectorAll("li")).toHaveLength(1);
    expect(container.textContent).toContain("corner radius");
    expect(container.textContent).toContain("rounded-none");
  });
});
