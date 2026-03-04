import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Component Library",
  description:
    "Browse 25+ accessible UI components built on Radix UI with Tailwind CSS. Preview buttons, cards, inputs, and more across multiple design styles.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.stylekit.top"}/components`,
  },
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
