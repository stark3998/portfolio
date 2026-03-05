"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

export function AnalyticsProvider() {
  useEffect(() => {
    // Google Analytics 4 tag loader
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (gaId) {
      // Load Google Analytics script
      const script1 = document.createElement("script");
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script1);

      // Initialize GA4
      const script2 = document.createElement("script");
      script2.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `;
      document.head.appendChild(script2);
    }
  }, []);

  return <Analytics />;
}
