"use client";

import { useMemo, useState } from "react";
import { ContentCard } from "./ContentCard";
import type { ContentItemMeta } from "@/lib/content";

interface ContentGridProps {
  items: ContentItemMeta[];
  showFilters?: boolean;
  emptyMessage?: string;
}

const ALL = "All";

export function ContentGrid({
  items,
  showFilters = true,
  emptyMessage = "No posts yet. Check back soon!",
}: ContentGridProps) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.category && set.add(i.category));
    return [ALL, ...Array.from(set).sort()];
  }, [items]);

  const [active, setActive] = useState(ALL);

  const filtered = useMemo(
    () => (active === ALL ? items : items.filter((i) => i.category === active)),
    [items, active]
  );

  if (items.length === 0) {
    return (
      <div className="mt-16 text-center">
        <p className="text-slate-mid">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      {showFilters && categories.length > 2 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                active === cat
                  ? "bg-azure text-white"
                  : "bg-white/60 text-slate-mid border border-azure/15 hover:border-azure/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {filtered.map((item) => (
          <ContentCard key={`${item.type}:${item.slug}`} item={item} />
        ))}
      </div>
    </>
  );
}
