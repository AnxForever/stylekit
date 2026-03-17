import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogListClient } from "./blog-list-client";

export const metadata: Metadata = {
  title: "Blog",
  description: "News, tutorials, and updates from the StyleKit team.",
  openGraph: {
    title: "Blog | StyleKit",
    description: "News, tutorials, and updates from the StyleKit team.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogListClient posts={posts} />;
}
