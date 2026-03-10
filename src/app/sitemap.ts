import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jatinmadan.com";

  // Static pages
  const staticPages = [
    { url: "", changeFrequency: "weekly" as const, priority: 1 },
    { url: "/blog", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/contact", changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  // Dynamic blog pages from Cosmos DB
  const posts = await getAllPosts();

  const blogPages = posts.map((post) => ({
    url: `/blog/${post.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    lastModified: post.updatedAt
      ? new Date(post.updatedAt)
      : new Date(post.publishedAt),
  }));

  return [
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page.url}`,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      lastModified: new Date(),
    })),
    ...blogPages.map((page) => ({
      url: `${baseUrl}${page.url}`,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      lastModified: page.lastModified,
    })),
  ];
}
