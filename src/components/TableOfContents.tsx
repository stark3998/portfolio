"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from article
    const article = document.querySelector("article");
    if (!article) return;

    const headingElements = Array.from(
      article.querySelectorAll("h2, h3")
    ) as HTMLElement[];

    const extractedHeadings = headingElements.map((el, index) => {
      // Add ID if not present
      if (!el.id) {
        el.id = `heading-${index}`;
      }

      return {
        id: el.id,
        text: el.textContent || "",
        level: parseInt(el.tagName[1]),
      };
    });

    setHeadings(extractedHeadings);

    // Setup intersection observer for scroll-spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-10% 0% -60% 0%" }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  if (headings.length === 0) return null;

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="sticky top-20 p-4 rounded-lg bg-slate-50 border border-slate-200 max-h-[calc(100vh-120px)] overflow-y-auto"
    >
      <h4 className="font-heading font-semibold text-sm text-slate-dark mb-4">
        On This Page
      </h4>

      <nav className="space-y-2">
        {headings.map((heading) => (
          <motion.button
            key={heading.id}
            onClick={() => handleClick(heading.id)}
            className={`block text-left text-sm transition-colors ${
              activeId === heading.id
                ? "text-azure font-semibold"
                : "text-slate-mid hover:text-azure"
            }`}
            style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
            whileHover={{ x: 4 }}
          >
            {heading.text}
          </motion.button>
        ))}
      </nav>
    </motion.aside>
  );
}
