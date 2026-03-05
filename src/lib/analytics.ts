// Analytics utility for tracking events and page views
// Supports Google Analytics 4 and Microsoft Clarity

// Track custom events
export function trackEvent(eventName: string, parameters?: Record<string, any>) {
  if (typeof window === "undefined") return;

  try {
    // Google Analytics 4 - using gtag if available
    if ((window as any).gtag) {
      (window as any).gtag("event", eventName, parameters || {});
    }

    // Microsoft Clarity - custom tags
    if ((window as any).clarity) {
      (window as any).clarity("tag", eventName, parameters || {});
    }

    console.debug(`Event tracked: ${eventName}`, parameters);
  } catch (error) {
    console.error("Error tracking event:", error);
  }
}

// Track page views
export function trackPageView(pagePath: string, pageTitle?: string) {
  if (typeof window === "undefined") return;

  try {
    if ((window as any).gtag) {
      (window as any).gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: pagePath,
        page_title: pageTitle || document.title,
      });
    }
  } catch (error) {
    console.error("Error tracking page view:", error);
  }
}

// Track CTA clicks
export function trackCTAClick(
  location: string,
  action: string,
  metadata?: Record<string, any>
) {
  trackEvent("cta_click", {
    location,
    action,
    ...metadata,
  });
}

// Track project interactions
export function trackProjectView(
  projectTitle: string,
  position?: number,
  metadata?: Record<string, any>
) {
  trackEvent("project_view", {
    project_title: projectTitle,
    position: position || 0,
    ...metadata,
  });
}

// Track project detail modal opens
export function trackProjectDetail(
  projectTitle: string,
  metadata?: Record<string, any>
) {
  trackEvent("project_detail_view", {
    project_title: projectTitle,
    ...metadata,
  });
}

// Track blog reads
export function trackBlogRead(
  slug: string,
  title: string,
  readTime?: number,
  metadata?: Record<string, any>
) {
  trackEvent("blog_read", {
    slug,
    title,
    read_time: readTime || 0,
    ...metadata,
  });
}

// Track social link clicks
export function trackSocialClick(
  platform: string,
  location: string,
  metadata?: Record<string, any>
) {
  trackEvent("social_click", {
    platform,
    location,
    ...metadata,
  });
}

// Track certification clicks
export function trackCertificationClick(
  certTitle: string,
  metadata?: Record<string, any>
) {
  trackEvent("certification_click", {
    cert_title: certTitle,
    ...metadata,
  });
}

// Track external link clicks
export function trackExternalLink(
  url: string,
  type: string,
  metadata?: Record<string, any>
) {
  trackEvent("external_link", {
    url,
    type,
    ...metadata,
  });
}

// Track section visibility
export function trackSectionView(
  sectionId: string,
  sectionTitle?: string,
  metadata?: Record<string, any>
) {
  trackEvent("section_view", {
    section_id: sectionId,
    section_title: sectionTitle || sectionId,
    ...metadata,
  });
}

// Track filter usage
export function trackFilter(
  filterType: string,
  value: string,
  metadata?: Record<string, any>
) {
  trackEvent("filter_used", {
    filter_type: filterType,
    value,
    ...metadata,
  });
}

// Track code copied from blog
export function trackCodeCopy(language?: string, metadata?: Record<string, any>) {
  trackEvent("code_copied", {
    language: language || "unknown",
    ...metadata,
  });
}

// Track blog post sharing
export function trackBlogShare(
  slug: string,
  platform: string,
  metadata?: Record<string, any>
) {
  trackEvent("blog_shared", {
    slug,
    platform,
    ...metadata,
  });
}
