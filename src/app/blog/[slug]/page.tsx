import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { HiArrowLeft, HiOutlineCalendar } from "react-icons/hi2";
import { Metadata } from "next";
import { getArticleSchema } from "@/lib/structuredData";
import Script from "next/script";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ShareButtons } from "@/components/ShareButtons";
import { TableOfContents } from "@/components/TableOfContents";

export const dynamic = "force-dynamic";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jatinmadan.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const postUrl = `${baseUrl}/blog/${slug}`;
  const ogImage = `${baseUrl}/og-image.svg`;

  return {
    title: `${post.title} — Jatin Madan`,
    description: post.excerpt,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["Jatin Madan"],
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
      description: post.excerpt,
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
    post.excerpt || "Read the full article",
    post.publishedAt,
    "Jatin Madan"
  );

  return (
    <div className="min-h-screen pt-24 pb-16">
      <ReadingProgress />
      <Script
        type="application/ld+json"
        id={`article-schema-${slug}`}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="w-full px-6 md:px-10 lg:px-16 grid lg:grid-cols-[3fr_1fr] gap-10">
        {/* Main Article */}
        <article className="min-w-0">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-azure hover:text-azure-dark transition-colors mb-8"
          >
            <HiArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {post.publishedAt && (
                <span className="flex items-center gap-1.5 text-sm text-slate-mid/60">
                  <HiOutlineCalendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>

            <h1 className="font-heading font-bold text-3xl md:text-4xl text-slate-dark leading-tight">
              {post.title}
            </h1>

            {/* Share Buttons */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <ShareButtons slug={slug} title={post.title} />
            </div>
          </header>

          <div
            className="blog-content prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.htmlContent }}
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
