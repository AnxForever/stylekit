import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Editorial Profile Archive",
  description: "An editorial personal website template for work, notes, and the ideas between them.",
};

export default function EditorialProfileArchiveLayout({ children }: { children: ReactNode }) {
  return children;
}
