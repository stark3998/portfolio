"use client";

import {
  useState,
  useRef,
  useEffect,
  useId,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiChevronDown, HiOutlineDocumentText } from "react-icons/hi2";
import { ftdCitations, ftdSources } from "@/lib/ftdCitations";

/* ------------------------------------------------------------------ */
/* <Reveal> — shared scroll-in animation wrapper                       */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay: delay * 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* <Cite> — inline source chip(s) with an accessible popover           */
/* ------------------------------------------------------------------ */

function CiteChip({ id }: { id: string }) {
  const entry = ftdCitations[id];
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!entry) return null;
  const source = ftdSources[entry.code];

  return (
    <span ref={wrapRef} className="relative inline-block align-super">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Source: ${entry.code}`}
        className="ml-0.5 text-[10px] leading-none font-mono font-semibold text-azure hover:text-azure-dark border-b border-dotted border-azure/50 cursor-pointer"
      >
        {entry.code}
      </button>
      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            role="dialog"
            className="absolute left-0 top-full z-50 mt-1.5 block w-80 max-w-[80vw] rounded-xl border border-slate-200 bg-white p-4 text-left shadow-xl"
          >
            <span className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-azure/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-azure">
                {entry.code}
              </span>
              {source && (
                <span className="text-[11px] font-medium text-slate-dark">
                  {source.name}
                </span>
              )}
            </span>
            <span className="mt-2 block text-[11px] font-semibold text-slate-dark">
              {entry.title}
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-slate-mid">
              {entry.quote}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export function Cite({ ids }: { ids: string | string[] }) {
  const list = Array.isArray(ids) ? ids : [ids];
  return (
    <>
      {list.map((id) => (
        <CiteChip key={id} id={id} />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* <TechDetail> — expandable engineering-detail disclosure             */
/* ------------------------------------------------------------------ */

export function TechDetail({
  summary = "Technical detail",
  children,
}: {
  summary?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const regionId = useId();

  return (
    <div className="mt-4 border-t border-slate-200/70 pt-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={regionId}
        className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-teal-700 hover:text-azure transition-colors"
      >
        <HiOutlineDocumentText className="w-4 h-4" />
        {summary}
        <HiChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={regionId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-lg bg-slate-50/80 border border-slate-200/70 p-4 text-sm text-slate-mid leading-relaxed space-y-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
