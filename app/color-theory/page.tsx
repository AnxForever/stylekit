import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = { title: "Color Theory" };

export default function ColorTheoryPage() {
  permanentRedirect("https://anxforever.cn/blog/frontend-foundations-color-theory");
}
