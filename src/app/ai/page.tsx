import { getAIItems } from "@/lib/content";
import { ContentGrid } from "@/components/ContentGrid";
import { HiOutlineSparkles } from "react-icons/hi2";
import { Metadata } from "next";
import Script from "next/script";
import {
  getCollectionPageSchema,
  getBreadcrumbSchema,
} from "@/lib/structuredData";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jatinmadan.com";

export const metadata: Metadata = {
  title: "AI — Jatin Madan",
  description:
    "Interactive AI artifacts and writing on agentic systems, enterprise AI security, and Microsoft AI platforms.",
  alternates: {
    canonical: `${baseUrl}/ai`,
  },
  openGraph: {
    title: "AI — Jatin Madan",
    description:
      "Interactive AI artifacts and writing on agentic systems, enterprise AI security, and Microsoft AI platforms.",
    url: `${baseUrl}/ai`,
    type: "website",
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630, alt: "Jatin Madan — AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI — Jatin Madan",
    description:
      "Interactive AI artifacts and writing on agentic systems, enterprise AI security, and Microsoft AI platforms.",
    images: [`${baseUrl}/og-image.png`],
  },
};

export default async function AIPage() {
  const items = await getAIItems();

  const collectionSchema = getCollectionPageSchema(
    baseUrl,
    "/ai",
    "AI — Jatin Madan",
    "Interactive AI artifacts and writing on agentic systems, enterprise AI security, and Microsoft AI platforms.",
    items.map((item) => ({
      title: item.title,
      url:
        item.type === "artifact"
          ? `${baseUrl}/ai/${item.slug}`
          : `${baseUrl}/blog/${item.slug}`,
    }))
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "AI", url: `${baseUrl}/ai` },
  ]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Script
        type="application/ld+json"
        id="ai-collection-schema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Script
        type="application/ld+json"
        id="ai-breadcrumb-schema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/15 text-teal-700 text-sm font-medium">
            <HiOutlineSparkles className="w-4 h-4" />
            AI Lab
          </span>
        </div>
        <h1 className="mt-4 font-heading font-bold text-3xl md:text-4xl text-slate-dark section-heading">
          AI
        </h1>
        <p className="mt-6 text-lg text-slate-mid max-w-xl">
          Interactive AI artifacts I build for clients — dashboards, prototypes,
          and tools — alongside writing on agentic systems, enterprise AI
          security, and Microsoft AI platforms.
        </p>

        <ContentGrid
          items={items}
          emptyMessage="No AI artifacts published yet. Check back soon!"
        />
      </div>
    </div>
  );
}
