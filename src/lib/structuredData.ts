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
    jobTitle: "Cloud Solutions Architect",
    sameAs: [
      "https://github.com/jatinmadan",
      "https://linkedin.com/in/jatinmadan",
      "https://twitter.com/jatinmadan",
    ],
    description:
      "Azure Cloud Solutions Architect specializing in enterprise security, cloud infrastructure, and AI/ML solutions",
    skills: [
      "Azure",
      "Cloud Architecture",
      "Entra ID",
      "Security",
      "Azure Functions",
      "AI/ML",
      "Kubernetes",
      "DevOps",
    ],
  };
}

export function getWebsiteSchema(baseUrl: string): WebsiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jatin Madan - Cloud Solutions Architect",
    url: baseUrl,
    description:
      "Portfolio of Jatin Madan, Azure Cloud Solutions Architect",
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
