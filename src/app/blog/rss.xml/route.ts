import { NextResponse } from "next/server";
import { getAllItems } from "@/lib/content";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jatinmadan.com";
  const items = await getAllItems();
  const lastBuildDate =
    items.length > 0
      ? new Date(items[0].publishedAt).toUTCString()
      : new Date().toUTCString();

  const rssContent = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Jatin Madan - Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Articles on Azure, cloud architecture, identity security, enterprise AI, and interactive AI artifacts</description>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    ${items
      .map((item) => {
        const path =
          item.type === "artifact"
            ? `/ai/${item.slug}`
            : `/blog/${item.slug}`;
        const categories = (item.tags && item.tags.length ? item.tags : [item.category])
          .filter(Boolean)
          .map((c) => `<category>${escapeXml(c)}</category>`)
          .join("");
        return `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${baseUrl}${path}</link>
      <guid isPermaLink="false">${baseUrl}${path}</guid>
      <pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate>
      <author>Jatin Madan</author>
      <description>${escapeXml(item.excerpt)}</description>
      ${categories}
    </item>
    `;
      })
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

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
