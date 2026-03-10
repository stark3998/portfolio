import { getContainer } from "./cosmos";

export interface BlogPostMeta {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  sourceUrl?: string;
  publishedAt: string;
  updatedAt?: string;
}

export interface BlogPost extends BlogPostMeta {
  htmlContent: string;
}

/**
 * Strip the full HTML document wrapper (doctype, html, head, style, body tags)
 * from Cosmos DB htmlContent, returning only the inner body content.
 */
function extractBodyContent(html: string): string {
  // Extract content between <body> and </body>
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    return bodyMatch[1].trim();
  }
  // If no <body> tag, strip any leading doctype/html/head/style blocks
  return html
    .replace(/<!DOCTYPE[^>]*>/i, "")
    .replace(/<html[^>]*>/i, "")
    .replace(/<\/html>/i, "")
    .replace(/<head>[\s\S]*?<\/head>/i, "")
    .replace(/<body[^>]*>/i, "")
    .replace(/<\/body>/i, "")
    .trim();
}

function isNotFoundError(err: unknown): boolean {
  if (typeof err !== "object" || err === null) return false;
  const code = (err as { code?: number | string }).code;
  return code === 404 || code === "NotFound";
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  try {
    const container = getContainer();
    const { resources } = await container.items
      .query<BlogPostMeta>({
        query:
          "SELECT c.id, c.slug, c.title, c.excerpt, c.sourceUrl, c.publishedAt, c.updatedAt FROM c ORDER BY c.publishedAt DESC OFFSET 0 LIMIT 50",
      })
      .fetchAll();

    return resources;
  } catch (err: unknown) {
    if (isNotFoundError(err)) {
      return [];
    }
    throw err;
  }
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  try {
    const container = getContainer();
    const { resource } = await container.item(slug, slug).read<BlogPost>();
    if (!resource) return null;
    resource.htmlContent = extractBodyContent(resource.htmlContent);
    return resource;
  } catch (err: unknown) {
    if (isNotFoundError(err)) {
      return null;
    }
    throw err;
  }
}
