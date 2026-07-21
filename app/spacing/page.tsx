import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = { title: "Spacing & Grid" };

export default function SpacingPage() {
  permanentRedirect("https://anxforever.cn/blog/frontend-foundations-spacing");
}
