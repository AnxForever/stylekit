// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RevealOnScroll } from "@/components/home/reveal-on-scroll";

describe("RevealOnScroll", () => {
  it("keeps content visible before motion enhancement runs", () => {
    const { getByText } = render(
      <RevealOnScroll>
        <p>Readable without intersection</p>
      </RevealOnScroll>
    );

    const wrapper = getByText("Readable without intersection").parentElement;
    expect(wrapper).not.toHaveClass("opacity-0");
  });
});
