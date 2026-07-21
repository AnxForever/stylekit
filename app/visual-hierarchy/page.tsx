import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = { title: "Visual Hierarchy" };

export default function VisualHierarchyPage() {
  permanentRedirect("https://anxforever.cn/blog/frontend-foundations-visual-hierarchy");
}
