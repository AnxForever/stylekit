import type { Metadata } from "next";
import { ChangelogClient } from "./changelog-client";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What is new in StyleKit. Version history and release notes.",
  openGraph: {
    title: "Changelog | StyleKit",
    description: "What is new in StyleKit. Version history and release notes.",
  },
};

export default function ChangelogPage() {
  return <ChangelogClient />;
}
