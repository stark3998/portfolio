import { getAllItems } from "@/lib/content";
import { ContentGrid } from "@/components/ContentGrid";
import { Metadata } from "next";

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
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630, alt: "Jatin Madan — Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Jatin Madan",
    description:
      "Insights on Azure cloud architecture, identity security, AI platforms, and DevSecOps.",
    images: [`${baseUrl}/og-image.png`],
  },
};

export default async function BlogPage() {
  const items = await getAllItems();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20">
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-slate-dark section-heading">
          Blog
        </h1>
        <p className="mt-6 text-lg text-slate-mid max-w-xl">
          Insights on cloud architecture, identity security, AI platforms, and
          enterprise DevSecOps — plus interactive AI artifacts.
        </p>

        <ContentGrid items={items} />
      </div>
    </div>
  );
}
