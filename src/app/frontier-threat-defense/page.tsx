import { Metadata } from "next";
import Script from "next/script";
import FtdNarrative from "@/components/FtdNarrative";
import {
  getBreadcrumbSchema,
  getCollectionPageSchema,
} from "@/lib/structuredData";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jatinmadan.com";

const title = "Frontier Threat Defense — Jatin Madan";
const description =
  "Frontier Threat Defense: an operating model and worked example for defending the enterprise against adversaries that attack at machine speed with AI — the kill chain, and the program that stops it.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Frontier Threat Defense",
    "AI security",
    "agentic AI threats",
    "AI kill chain",
    "machine-speed defense",
    "enterprise AI security program",
  ],
  alternates: { canonical: `${baseUrl}/frontier-threat-defense` },
  openGraph: {
    title,
    description,
    url: `${baseUrl}/frontier-threat-defense`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Frontier Threat Defense — Jatin Madan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${baseUrl}/og-image.png`],
  },
};

const featured = [
  {
    slug: "frontier-threat-defense-kill-chain",
    title: "The AI Attack Kill Chain",
  },
  {
    slug: "frontier-threat-defense-program-strategy",
    title: "The Program Strategy",
  },
];

export default function FrontierThreatDefensePage() {
  const collectionSchema = getCollectionPageSchema(
    baseUrl,
    "/frontier-threat-defense",
    title,
    description,
    featured.map((f) => ({
      title: f.title,
      url: `${baseUrl}/ai/${f.slug}`,
    }))
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Frontier Threat Defense", url: `${baseUrl}/frontier-threat-defense` },
  ]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <Script
        type="application/ld+json"
        id="ftd-collection-schema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Script
        type="application/ld+json"
        id="ftd-breadcrumb-schema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FtdNarrative />
    </div>
  );
}
