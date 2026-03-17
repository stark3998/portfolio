import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { hasCosmosConfig } from "@/lib/cosmos";
import { notFound } from "next/navigation";
import Link from "next/link";
import { HiArrowLeft, HiOutlineCalendar } from "react-icons/hi2";
import { Metadata } from "next";
import { getArticleSchema } from "@/lib/structuredData";
import Script from "next/script";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ShareButtons } from "@/components/ShareButtons";
import { TableOfContents } from "@/components/TableOfContents";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jatinmadan.com";
const localFallbackSlug = "__build-fallback__";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  if (posts.length === 0) {
    return [{ slug: localFallbackSlug }];
  }

  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === localFallbackSlug && !hasCosmosConfig()) {
    return {
      title: "Blog Preview Unavailable",
      description:
        "Blog content is not available in this local build because Azure Cosmos DB environment variables are not configured.",
      alternates: {
        canonical: `${baseUrl}/blog`,
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  }

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

  if (slug === localFallbackSlug && !hasCosmosConfig()) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <Script
          id="local-blog-fallback-redirect"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: 'window.location.replace("/blog")',
          }}
        />
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-azure hover:text-azure-dark transition-colors mb-8"
          >
            <HiArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <div className="glass-card p-8">
            <h1 className="font-heading font-bold text-3xl text-slate-dark">
              Blog Preview Unavailable
            </h1>
            <p className="mt-4 text-slate-mid leading-relaxed">
              Redirecting to the blog index. Configure `COSMOS_ENDPOINT`,
              `COSMOS_KEY`, and `COSMOS_DATABASE` to generate blog pages from
              published content during local builds.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
