import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jatinmadan.com";
  const blogDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".mdx"));

  const posts = files
    .map((file) => {
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const { data, content: bodyContent } = matter(content);
      const slug = file.replace(/\.mdx$/, "");

      return {
        slug,
        title: data.title,
        description: data.excerpt || data.description,
        date: data.date,
        author: data.author || "Jatin Madan",
        content: bodyContent.substring(0, 200),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rssContent = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Jatin Madan - Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Articles on Azure, Cloud Architecture, and Enterprise Solutions</description>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${post.title}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="false">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${post.author}</author>
      <description>${post.description}</description>
      <content:encoded><![CDATA[${post.content}...]]></content:encoded>
    </item>
    `
      )
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(rssContent, {
    headers: {
      "content-type": "application/rss+xml; charset=UTF-8",
      "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
