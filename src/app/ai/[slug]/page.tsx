import { getAllItems, getItemBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Script from "next/script";
import { ArtifactViewer } from "@/components/ArtifactViewer";
import {
  getCreativeWorkSchema,
  getBreadcrumbSchema,
} from "@/lib/structuredData";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jatinmadan.com";

export async function generateStaticParams() {
  const items = await getAllItems();
  const artifacts = items.filter((i) => i.type === "artifact");
  if (artifacts.length === 0) {
    // Always emit at least the built-in sample so the route builds.
    return [{ slug: "entra-migration-dashboard" }];
  }
  return artifacts.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getItemBySlug(slug);
  if (!item) return { title: "Artifact Not Found" };

  const url = `${baseUrl}/ai/${slug}`;

  return {
    title: `${item.title} — AI · Jatin Madan`,
    description: item.excerpt,
    keywords: item.tags,
    alternates: { canonical: url },
    openGraph: {
      title: item.title,
      description: item.excerpt,
      url,
      type: "article",
      publishedTime: item.publishedAt,
      authors: ["Jatin Madan"],
      images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630, alt: item.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.excerpt,
      images: [`${baseUrl}/og-image.png`],
    },
  };
}

export default async function ArtifactPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getItemBySlug(slug);

  if (!item || item.type !== "artifact") {
    notFound();
  }

  const creativeWorkSchema = getCreativeWorkSchema(
    baseUrl,
    slug,
    item.title,
    item.excerpt || "Interactive AI artifact",
    item.publishedAt,
    item.tags
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "AI", url: `${baseUrl}/ai` },
    { name: item.title, url: `${baseUrl}/ai/${slug}` },
  ]);

  return (
    <>
      <Script
        type="application/ld+json"
        id={`artifact-schema-${slug}`}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <Script
        type="application/ld+json"
        id={`artifact-breadcrumb-${slug}`}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ArtifactViewer
        title={item.title}
        src={item.artifactUrl}
        html={item.htmlContent}
      />
    </>
  );
}
