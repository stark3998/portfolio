"use client";

import { useEffect, useState } from "react";

export interface FtdSection {
  id: string;
  index: string;
  label: string;
}

export default function FtdSectionNav({ sections }: { sections: FtdSection[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0% -70% 0%", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  return (
    <nav
      aria-label="Section navigation"
      className="hidden xl:flex xl:flex-col xl:justify-center sticky top-0 h-screen self-start"
    >
      <ul className="space-y-0.5">
        {sections.map((s) => {
          const active = activeId === s.id;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => handleClick(s.id)}
                aria-current={active ? "true" : undefined}
                className="group flex w-full items-center gap-2.5 rounded-md py-1.5 pr-2 text-left transition-colors"
              >
                <span
                  className={`flex-shrink-0 rounded-full transition-all duration-300 ${
                    active
                      ? "w-2.5 h-2.5 bg-azure ring-4 ring-azure/15"
                      : "w-2 h-2 bg-slate-300 group-hover:bg-slate-400"
                  }`}
                />
                <span className="font-mono text-[11px] text-slate-400">
                  {s.index}
                </span>
                <span
                  className={`text-sm transition-colors ${
                    active
                      ? "text-azure font-semibold"
                      : "text-slate-mid group-hover:text-slate-dark"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
