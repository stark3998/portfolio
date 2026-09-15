import { getAllPosts, getPostBySlug } from "./blog";
import { artifacts, ArtifactManifestEntry } from "@content/artifacts";

export type ContentType = "article" | "artifact";
export type ContentSource = "cosmos" | "repo";

export interface ContentItemMeta {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  type: ContentType;
  source: ContentSource;
  /** For repo/external artifacts: URL of the standalone HTML document. */
  artifactUrl?: string;
  sourceUrl?: string;
}

export interface ContentItem extends ContentItemMeta {
  /** Inline HTML (Cosmos-hosted articles/artifacts). */
  htmlContent?: string;
}

const DEFAULT_CATEGORY = "General";

/** An item belongs to the AI section if it's an interactive artifact or AI-tagged. */
export function isAIItem(item: ContentItemMeta): boolean {
  if (item.type === "artifact") return true;
  if (item.category?.toLowerCase() === "ai") return true;
  return item.tags?.some((t) => t.toLowerCase() === "ai") ?? false;
}

function artifactToItem(entry: ArtifactManifestEntry): ContentItem {
  return {
    slug: entry.slug,
    title: entry.title,
    excerpt: entry.excerpt,
    publishedAt: entry.publishedAt,
    updatedAt: entry.updatedAt,
    category: "AI",
    tags: entry.tags?.length ? entry.tags : ["AI"],
    type: "artifact",
    source: "repo",
    artifactUrl: `/artifacts/${entry.file}`,
  };
}

function repoArtifacts(): ContentItem[] {
  return artifacts.map(artifactToItem);
}

function sortByDateDesc(items: ContentItem[]): ContentItem[] {
  return [...items].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/** All content: Cosmos posts + repo artifacts, newest first. */
export async function getAllItems(): Promise<ContentItem[]> {
  const posts = await getAllPosts();
  const cosmosItems: ContentItem[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt,
    category: p.category || DEFAULT_CATEGORY,
    tags: p.tags ?? [],
    type: p.type === "artifact" ? "artifact" : "article",
    source: "cosmos",
    sourceUrl: p.sourceUrl,
  }));

  return sortByDateDesc([...cosmosItems, ...repoArtifacts()]);
}

/** AI-only content for the /ai section. */
export async function getAIItems(): Promise<ContentItem[]> {
  const all = await getAllItems();
  return all.filter(isAIItem);
}

/** Distinct categories present across all content (for filter chips). */
export async function getCategories(): Promise<string[]> {
  const all = await getAllItems();
  const set = new Set(all.map((i) => i.category).filter(Boolean));
  return Array.from(set).sort();
}

/** A single item by slug, hydrated with inline HTML when Cosmos-hosted. */
export async function getItemBySlug(slug: string): Promise<ContentItem | null> {
  const repo = repoArtifacts().find((a) => a.slug === slug);
  if (repo) return repo;

  const post = await getPostBySlug(slug);
  if (!post) return null;

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    category: post.category || DEFAULT_CATEGORY,
    tags: post.tags ?? [],
    type: post.type === "artifact" ? "artifact" : "article",
    source: "cosmos",
    sourceUrl: post.sourceUrl,
    htmlContent: post.htmlContent,
  };
}

/** Slugs for static generation across all sources. */
export async function getAllSlugs(): Promise<string[]> {
  const all = await getAllItems();
  return all.map((i) => i.slug);
}
