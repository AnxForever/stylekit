import type { ReactElement, ReactNode } from "react";
import { Children, isValidElement } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TemplatesLayout, { generateMetadata } from "@/app/templates/layout";
import { TemplateDemoNotice } from "@/components/templates/template-demo-notice";

const requestState = vi.hoisted(() => ({
  locale: "en" as "en" | "zh",
  contentPath: "/templates/pricing-page",
}));

vi.mock("@/lib/i18n/request", () => ({
  getRequestLocaleContext: async () => requestState,
}));

vi.mock("@/lib/i18n/metadata", () => ({
  applyRequestMetadata: (metadata: unknown) => metadata,
}));

vi.mock("@/components/layout/site-document", () => ({
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid="site-document">{children}</div>
  ),
  generateSiteMetadata: async () => ({ title: "StyleKit" }),
  viewport: { width: "device-width" },
}));

vi.mock("@/components/analytics/template-view-tracker", () => ({
  TemplateViewTracker: () => null,
}));

function findDemoWrapper(children: ReactNode): ReactElement<Record<string, unknown>> | undefined {
  return Children.toArray(children).find((node): node is ReactElement<Record<string, unknown>> => {
    if (!isValidElement<Record<string, unknown>>(node)) return false;
    return Object.prototype.hasOwnProperty.call(node.props, "data-nosnippet");
  });
}

function containsDemoNotice(children: ReactNode): boolean {
  return Children.toArray(children).some(
    (node) => isValidElement(node) && node.type === TemplateDemoNotice
  );
}

describe("templates layout demo boundary", () => {
  beforeEach(() => {
    requestState.locale = "en";
    requestState.contentPath = "/templates/pricing-page";
  });

  it("labels template details and excludes their sample content from Google snippets", async () => {
    const sampleContent = <div data-testid="preview-content">Sample pricing details</div>;
    const tree = await TemplatesLayout({ children: sampleContent });
    const wrapper = findDemoWrapper(tree.props.children);

    expect(containsDemoNotice(tree.props.children)).toBe(true);
    expect(wrapper?.props.className).toBe("contents");
    expect(wrapper?.props.children).toBe(sampleContent);
  });

  it("leaves the template gallery outside the demo notice and snippet wrapper", async () => {
    requestState.contentPath = "/templates";

    const tree = await TemplatesLayout({ children: <div>Browse templates</div> });

    expect(containsDemoNotice(tree.props.children)).toBe(false);
    expect(findDemoWrapper(tree.props.children)).toBeUndefined();
  });

  it("adds a localized demo boundary to template metadata", async () => {
    requestState.locale = "zh";

    const metadata = await generateMetadata();

    expect(metadata.title).toContain("模板演示");
    expect(metadata.description).toContain("页面模板预览");
    expect(metadata.openGraph?.description).toContain("不代表 StyleKit");
    expect(metadata.twitter?.description).toContain("不代表 StyleKit");
  });
});