// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ConstellationField, ShaderField } from "@/components/effects";

describe("WebGL effect components", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn((query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("keeps semantic content and static fallback under reduced motion", () => {
    const { getByLabelText, getByText } = render(
      <ShaderField label="Ambient signal">
        <h2>Content stays HTML</h2>
      </ShaderField>,
    );

    expect(getByLabelText("Ambient signal")).toBeInTheDocument();
    expect(getByText("Content stays HTML")).toBeInTheDocument();
    expect(getByLabelText("Ambient signal").querySelector("canvas")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("exposes the constellation as a labelled visual layer", () => {
    const { getByLabelText, getByText } = render(
      <ConstellationField label="Archive constellation">
        <p>Archive data</p>
      </ConstellationField>,
    );

    expect(getByLabelText("Archive constellation")).toBeInTheDocument();
    expect(getByText("Archive data")).toBeInTheDocument();
  });
});
