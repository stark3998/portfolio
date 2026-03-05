import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jatinmadan.com";

  // Static pages
  const staticPages = [
    { url: "", changeFrequency: "weekly" as const, priority: 1 },
    { url: "/blog", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/contact", changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  // Dynamic blog pages
  const blogDir = path.join(process.cwd(), "content/blog");
  const blogFiles = fs.readdirSync(blogDir).filter((file) => file.endsWith(".mdx"));

  const blogPages = blogFiles.map((file) => {
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      url: `/blog/${file.replace(/\.mdx$/, "")}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: data.date ? new Date(data.date) : new Date(),
    };
  });

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
