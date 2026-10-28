import type { Metadata } from "next";
import { generateMetadata as generateBaseMetadata } from "@/components/layout/legacy-root-layout";
export { default, viewport } from "@/components/layout/legacy-root-layout";

export async function generateMetadata(): Promise<Metadata> {
  return { ...await generateBaseMetadata(), robots: { index: false, follow: true } };
}
