import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";
import { generateRss } from "@/lib/rss";
import { getSiteBaseUrl } from "@/lib/site-url";

const BASE_URL = getSiteBaseUrl();

export async function GET() {
  const posts = getAllPosts();

  const xml = generateRss({
    title: "StyleKit Blog",
    description:
      "Latest articles about UI design, AI-friendly design systems, and visual styles",
    link: `${BASE_URL}/en/blog`,
    selfUrl: `${BASE_URL}/feed.xml`,
    language: "en-us",
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      link: `${BASE_URL}/en/blog/${post.slug}`,
      pubDate: post.date,
      guid: `${BASE_URL}/en/blog/${post.slug}`,
      author: post.author,
    })),
  });

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
