import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { HiArrowLeft, HiOutlineCalendar, HiOutlineTag } from "react-icons/hi2";
import { Metadata } from "next";
import { getArticleSchema } from "@/lib/structuredData";
import Script from "next/script";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ShareButtons } from "@/components/ShareButtons";
import { TableOfContents } from "@/components/TableOfContents";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jatinmadan.com";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const postUrl = `${baseUrl}/blog/${slug}`;
  const ogImage = post.ogImage || `${baseUrl}/og-image.svg`;

  return {
    title: `${post.title} — Jatin Madan`,
    description: post.excerpt || post.description,
    keywords: post.keywords || [],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || post.description,
      url: postUrl,
      type: "article",
      publishedTime: post.date,
      authors: [post.author || "Jatin Madan"],
      tags: post.tags || [],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.description,
      images: [ogImage],
      creator: "@jatinmadan",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = getArticleSchema(
    baseUrl,
    slug,
    post.title,
    post.excerpt || post.description || "Read the full article",
    post.date,
    post.author || "Jatin Madan",
    post.ogImage
  );

  return (
    <div className="min-h-screen pt-24 pb-16">
      <ReadingProgress />
      <Script
        type="application/ld+json"
        id={`article-schema-${slug}`}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 grid lg:grid-cols-3 gap-8">
        {/* Main Article */}
        <article className="lg:col-span-2">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-azure hover:text-azure-dark transition-colors mb-8"
          >
            <HiArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {post.date && (
                <span className="flex items-center gap-1.5 text-sm text-slate-mid/60">
                  <HiOutlineCalendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
              {post.readingTime && (
                <span className="text-sm text-slate-mid/60">
                  {post.readingTime} min read
                </span>
              )}
            </div>

            <h1 className="font-heading font-bold text-3xl md:text-4xl text-slate-dark leading-tight">
              {post.title}
            </h1>

            {post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-azure-light/60 text-azure font-medium"
                  >
                    <HiOutlineTag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share Buttons */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <ShareButtons slug={slug} title={post.title} />
            </div>
          </header>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Table of Contents Sidebar */}
        <aside className="hidden lg:block">
          <TableOfContents />
        </aside>
      </div>
    </div>
  );
}
