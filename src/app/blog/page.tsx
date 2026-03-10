import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { HiOutlineCalendar } from "react-icons/hi2";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jatinmadan.com";

export const metadata: Metadata = {
  title: "Blog — Jatin Madan",
  description:
    "Insights on Azure cloud architecture, identity security, AI platforms, and DevSecOps.",
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
  openGraph: {
    title: "Blog — Jatin Madan",
    description:
      "Insights on Azure cloud architecture, identity security, AI platforms, and DevSecOps.",
    url: `${baseUrl}/blog`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "Jatin Madan - Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Jatin Madan",
    description:
      "Insights on Azure cloud architecture, identity security, AI platforms, and DevSecOps.",
    images: [`${baseUrl}/og-image.svg`],
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20">
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-slate-dark section-heading">
          Blog
        </h1>
        <p className="mt-6 text-lg text-slate-mid max-w-xl">
          Insights on cloud architecture, identity security, AI platforms, and
          enterprise DevSecOps.
        </p>

        {posts.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-slate-mid">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="mt-12 space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block glass-card p-6 group hover:border-azure/25"
              >
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  {post.publishedAt && (
                    <span className="flex items-center gap-1.5 text-xs text-slate-mid/60">
                      <HiOutlineCalendar className="w-3.5 h-3.5" />
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  )}
                </div>

                <h2 className="font-heading font-semibold text-xl text-slate-dark group-hover:text-azure transition-colors">
                  {post.title}
                </h2>

                {post.excerpt && (
                  <p className="mt-2 text-sm text-slate-mid leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                )}

                <span className="mt-3 inline-block text-sm font-medium text-azure opacity-0 group-hover:opacity-100 transition-opacity">
                  Read more →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
