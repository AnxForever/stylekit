import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asset Library",
  description:
    "Browse StyleKit image assets and reusable component assets for websites, dashboards, and product UI explorations.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.stylekit.top"}/assets`,
  },
};

export default function AssetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
