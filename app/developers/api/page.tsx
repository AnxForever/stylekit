import type { Metadata } from "next";
import ApiReferenceContent from "./_content";

export const metadata: Metadata = {
  title: "API Reference - StyleKit",
  description:
    "Complete REST API reference for StyleKit. Browse 40+ endpoints for styles, tokens, recipes, analytics, submissions, and more.",
  openGraph: {
    title: "API Reference - StyleKit",
    description:
      "Complete REST API reference for StyleKit with interactive endpoint documentation.",
  },
};

export default function ApiReferencePage() {
  return <ApiReferenceContent />;
}
