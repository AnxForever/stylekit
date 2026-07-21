import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = { title: "Type Scale" };

export default function TypeScalePage() {
  permanentRedirect("https://anxforever.cn/blog/frontend-foundations-type-scale");
}
