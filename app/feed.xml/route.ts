import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";
import { generateRss } from "@/lib/rss";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://stylekit.top";

export async function GET() {
  const posts = getAllPosts();

  const xml = generateRss({
    title: "StyleKit Blog",
    description:
      "Latest articles about UI design, AI-friendly design systems, and visual styles",
    link: `${BASE_URL}/blog`,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      link: `${BASE_URL}/blog/${post.slug}`,
      pubDate: post.date,
      guid: `${BASE_URL}/blog/${post.slug}`,
    })),
  });

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
