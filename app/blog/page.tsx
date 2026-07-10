import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogListClient } from "./blog-list-client";
import { canonicalizeEnglishMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = canonicalizeEnglishMetadata({
  title: "Blog",
  description: "News, tutorials, and updates from the StyleKit team.",
  openGraph: {
    title: "Blog | StyleKit",
    description: "News, tutorials, and updates from the StyleKit team.",
  },
}, "/blog");

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogListClient posts={posts} />;
}
