import { MetadataRoute } from "next";
import { getAllStylesMeta } from "@/lib/styles/meta";

// 更新为你的实际域名
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://stylekit.top";

export default function sitemap(): MetadataRoute.Sitemap {
  const styles = getAllStylesMeta();

  // 静态页面
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/styles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/generate`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/create-style`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/templates`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/developers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/guide`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/components`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // 风格详情页
  const stylePages: MetadataRoute.Sitemap = styles.map((style) => ({
    url: `${BASE_URL}/styles/${style.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 风格展示页
  const showcasePages: MetadataRoute.Sitemap = styles.map((style) => ({
    url: `${BASE_URL}/styles/${style.slug}/showcase`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // 模板页
  const templatePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/templates/brutal-landing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/templates/editorial-blog`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/templates/glass-landing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [...staticPages, ...stylePages, ...showcasePages, ...templatePages];
}
