import type { Metadata } from "next";
import ApiReferenceContent from "./_content";

export const metadata: Metadata = {
  title: "API Reference",
  description:
    "Complete REST API reference for StyleKit. Browse 40+ endpoints for styles, tokens, recipes, analytics, submissions, and more.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://stylekit.top"}/developers/api`,
  },
  openGraph: {
    title: "API Reference — StyleKit",
    description:
      "Complete REST API reference for StyleKit with interactive endpoint documentation.",
  },
};

export default function ApiReferencePage() {
  return <ApiReferenceContent />;
}
