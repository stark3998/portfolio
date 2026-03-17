export interface PersonSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  image: string;
  jobTitle: string;
  sameAs: string[];
  description: string;
  skills: string[];
}

export interface WebsiteSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  description: string;
  potentialAction: {
    "@type": string;
    target: {
      "@type": string;
      urlTemplate: string;
    };
    query_input: string;
  };
}

export interface ArticleSchema {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: {
    "@type": string;
    name: string;
    url: string;
  };
  publisher: {
    "@type": string;
    name: string;
    logo: {
      "@type": string;
      url: string;
    };
  };
  mainEntityOfPage: {
    "@type": string;
    "@id": string;
  };
}

export function getPersonSchema(
  baseUrl: string,
  ogImageUrl: string
): PersonSchema {
  return {
    "@context": "https://schema.org/",
    "@type": "Person",
    name: "Jatin Madan",
    url: baseUrl,
    image: ogImageUrl,
    jobTitle: "Cloud Security Senior Consultant",
    sameAs: [
      "https://github.com/stark3998",
      "https://www.linkedin.com/in/jatin39/",
      "https://twitter.com/jatumadan",
    ],
    description:
      "Cloud Security Senior Consultant specializing in Microsoft Entra, enterprise AI security governance, hybrid identity, Azure security architecture, and migration accelerators",
    skills: [
      "Azure",
      "Cloud Security",
      "Entra ID",
      "Entra External ID",
      "Identity Modernization",
      "Okta Migration",
      "Azure Policy",
      "Copilot Studio",
      "Microsoft Foundry",
      "Purview",
      "Agentic AI",
      "Hybrid Identity",
      "Power BI",
      "DevSecOps",
      "Compliance",
    ],
  };
}

export function getWebsiteSchema(baseUrl: string): WebsiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jatin Madan - Cloud Security Portfolio",
    url: baseUrl,
    description:
      "Portfolio of Jatin Madan, Cloud Security Senior Consultant focused on identity modernization, enterprise AI governance, and Azure security engineering",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
      },
      query_input: "required name=search_term_string",
    },
  };
}

export function getArticleSchema(
  baseUrl: string,
  slug: string,
  title: string,
  description: string,
  date: string,
  author: string = "Jatin Madan",
  ogImageUrl?: string
): ArticleSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: ogImageUrl || `${baseUrl}/og-image.svg`,
    datePublished: new Date(date).toISOString(),
    author: {
      "@type": "Person",
      name: author,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Jatin Madan",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/og-image.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${slug}`,
    },
  };
}
