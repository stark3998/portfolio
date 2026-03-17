import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPersonSchema, getWebsiteSchema } from "@/lib/structuredData";
import Script from "next/script";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jatinmadan.com";
const ogImageUrl = `${baseUrl}/og-image.svg`;

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jatin Madan — Cloud Security Senior Consultant",
  description:
    "Portfolio of Jatin Madan — Cloud Security Senior Consultant specializing in Microsoft Entra, enterprise AI security governance, hybrid identity, and Azure security architecture.",
  keywords: [
    "Azure",
    "Cloud Security",
    "Entra ID",
    "External ID",
    "Identity Modernization",
    "Azure Policy",
    "Copilot Studio",
    "Microsoft Foundry",
    "Purview",
    "Agentic AI",
    "Microsoft Certified",
    "DevSecOps",
    "MFA",
  ],
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jatin Madan — Cloud Security Senior Consultant",
    description:
      "Portfolio of Jatin Madan — Cloud Security Senior Consultant specializing in Microsoft Entra, enterprise AI security governance, hybrid identity, and Azure security architecture.",
    url: baseUrl,
    siteName: "Jatin Madan",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Jatin Madan - Cloud Security Senior Consultant",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jatin Madan — Cloud Security Senior Consultant",
    description:
      "Portfolio of Jatin Madan — Cloud Security Senior Consultant specializing in Microsoft Entra, enterprise AI security governance, hybrid identity, and Azure security architecture.",
    images: [ogImageUrl],
    creator: "@jatinmadan",
  },
  creator: "Jatin Madan",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = getPersonSchema(baseUrl, ogImageUrl);
  const websiteSchema = getWebsiteSchema(baseUrl);

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#0078D4" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="alternate" type="application/rss+xml" href="/blog/rss.xml" title="Jatin Madan - Blog RSS Feed" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${jetbrainsMono.variable} ${inter.variable} antialiased blueprint-grid`}
      >
        {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
          <Script
            id="clarity-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
              `,
            }}
          />
        )}
        <AnalyticsProvider />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
