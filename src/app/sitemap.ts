import { MetadataRoute } from "next";
import { getAllItems } from "@/lib/content";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jatinmadan.com";

  // Static pages
  const staticPages = [
    { url: "", changeFrequency: "weekly" as const, priority: 1 },
    { url: "/ai", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/frontier-threat-defense", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/blog", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/contact", changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  // Dynamic content pages (Cosmos posts + repo artifacts)
  const items = await getAllItems();

  const contentPages = items.map((item) => ({
    url: item.type === "artifact" ? `/ai/${item.slug}` : `/blog/${item.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    lastModified: item.updatedAt
      ? new Date(item.updatedAt)
      : new Date(item.publishedAt),
  }));

  return [
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page.url}`,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      lastModified: new Date(),
    })),
    ...contentPages.map((page) => ({
      url: `${baseUrl}${page.url}`,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      lastModified: page.lastModified,
    })),
  ];
}
