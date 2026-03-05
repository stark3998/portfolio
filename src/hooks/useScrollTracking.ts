"use client";

import { useEffect } from "react";
import { trackSectionView } from "@/lib/analytics";

export function useScrollTracking(sectionId: string, sectionTitle?: string) {
  useEffect(() => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Section is visible - track the view
          trackSectionView(sectionId, sectionTitle || sectionId);
          // Optionally, stop observing after first view
          // observer.unobserve(element);
        }
      },
      {
        threshold: 0.25, // Fire when 25% of section is visible
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [sectionId, sectionTitle]);
}
