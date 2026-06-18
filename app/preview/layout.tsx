import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Responsive Preview - StyleKit",
  description:
    "Preview style showcases across desktop, tablet, and mobile viewports. Test responsive behavior of StyleKit design styles.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
