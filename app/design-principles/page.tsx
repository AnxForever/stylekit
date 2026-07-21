import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = { title: "Design Principles" };

export default function DesignPrinciplesPage() {
  permanentRedirect("https://anxforever.cn/blog/frontend-foundations-design-principles");
}
