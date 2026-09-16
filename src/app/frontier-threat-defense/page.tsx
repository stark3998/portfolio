import Link from "next/link";
import { Metadata } from "next";
import Script from "next/script";
import {
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiArrowRight,
  HiOutlineBolt,
  HiOutlineMap,
  HiOutlineBeaker,
  HiOutlineChartBar,
} from "react-icons/hi2";
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

interface FeaturedArtifact {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
}

const featured: FeaturedArtifact[] = [
  {
    slug: "frontier-threat-defense-kill-chain",
    eyebrow: "The worked example",
    title: "The AI Attack Kill Chain",
    description:
      "A stage-by-stage anatomy of a real frontier-AI agent intrusion — roughly 700 autonomous agents, no human operator, two and a half days. Every weakness they used was ordinary.",
    points: [
      "Ten stages — and ten places to break the chain",
      "Six capabilities that cut across the whole attack",
      "The controls that held, and the ones that did not",
      "Every claim traced to a cited source",
    ],
  },
  {
    slug: "frontier-threat-defense-program-strategy",
    eyebrow: "The operating model",
    title: "The Program Strategy",
    description:
      "A full Frontier Threat Defense program: what belongs in scope, the controls and capabilities behind it, who owns each one, and the small set of metrics that prove it is working.",
    points: [
      "A scope test that decides what is in — and what is not",
      "The strategy architecture, by domain",
      "An executive metric set — seven measures, not fifteen",
      "Ownership, readiness, and the board ask",
    ],
  },
];

const pillars = [
  {
    icon: HiOutlineBolt,
    title: "Machine-speed adversaries",
    body: "Attacks now run as fleets of autonomous agents that move faster than human response. Defense has to be designed for that clock.",
  },
  {
    icon: HiOutlineMap,
    title: "Know the ground",
    body: "Map your own estate — identity, secrets, agents, data blast-radius — before an adversary maps it for you.",
  },
  {
    icon: HiOutlineBeaker,
    title: "Test and fix at speed",
    body: "Find your own attack paths and close them faster than they can be used, with continuous agentic red-teaming.",
  },
  {
    icon: HiOutlineChartBar,
    title: "Measure what matters",
    body: "A tight set of executive metrics tied to business enablement — readiness treated as risk, with named owners on the clock.",
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

      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Hero */}
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/15 text-teal-700 text-sm font-medium">
          <HiOutlineShieldCheck className="w-4 h-4" />
          Frontier Threat Defense
        </span>
        <h1 className="mt-4 font-heading font-bold text-3xl md:text-5xl text-slate-dark section-heading">
          Defending against adversaries that attack with AI
        </h1>
        <p className="mt-6 text-lg text-slate-mid leading-relaxed max-w-2xl">
          Frontier Threat Defense is an operating model for a new class of
          attacker — one that runs as a fleet of autonomous AI agents, moves at
          machine speed, and exploits ordinary weaknesses no human adversary had
          the patience to chain together. These two interactive artifacts define
          the threat and the program that answers it.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/ai/frontier-threat-defense-kill-chain"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-azure text-white hover:bg-azure-dark transition-colors"
          >
            <HiOutlineSparkles className="w-4 h-4" />
            Explore the kill chain
          </Link>
          <Link
            href="/ai/frontier-threat-defense-program-strategy"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-white/70 border border-azure/20 text-slate-dark hover:border-azure/40 transition-colors"
          >
            View the program strategy
            <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Pillars */}
        <div className="mt-16 grid sm:grid-cols-2 gap-5">
          {pillars.map((p) => (
            <div key={p.title} className="glass-card p-6">
              <div className="w-10 h-10 rounded-xl bg-teal/15 text-teal-700 flex items-center justify-center mb-3">
                <p.icon className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-slate-dark">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-slate-mid leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* Featured artifacts */}
        <h2 className="mt-20 font-heading font-bold text-2xl md:text-3xl text-slate-dark section-heading">
          The two artifacts
        </h2>
        <p className="mt-4 text-slate-mid max-w-2xl">
          Both are fully interactive documents — every claim is cited, and the
          technical detail sits one click away in the margins.
        </p>

        <div className="mt-8 space-y-6">
          {featured.map((f) => (
            <Link
              key={f.slug}
              href={`/ai/${f.slug}`}
              className="block glass-card p-7 group hover:border-azure/25"
            >
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium bg-teal/15 text-teal-700">
                <HiOutlineSparkles className="w-3 h-3" />
                {f.eyebrow}
              </span>
              <h3 className="mt-3 font-heading font-semibold text-xl md:text-2xl text-slate-dark group-hover:text-azure transition-colors">
                {f.title}
              </h3>
              <p className="mt-2 text-slate-mid leading-relaxed">
                {f.description}
              </p>
              <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2">
                {f.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-2 text-sm text-slate-mid"
                  >
                    <HiOutlineShieldCheck className="w-4 h-4 text-teal-700 mt-0.5 flex-shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-azure opacity-0 group-hover:opacity-100 transition-opacity">
                Open artifact
                <HiArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 glass-card p-6 border-l-4 border-l-teal/60">
          <p className="text-sm text-slate-mid leading-relaxed">
            These artifacts are generalized write-ups of client engagement work.
            All client-specific and confidential material has been removed; what
            remains is the reusable threat research and program framework.
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/ai"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-azure hover:text-azure-dark transition-colors"
          >
            See more in the AI Lab
            <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
