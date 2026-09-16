"use client";

import { useEffect } from "react";
import Link from "next/link";
import { HiArrowLeft, HiArrowTopRightOnSquare } from "react-icons/hi2";

interface NativeArtifactProps {
  title: string;
  /** Scoped, re-themed stylesheet (under `.ftd-doc`). */
  css: string;
  /** Inner body content of the source document. */
  html: string;
  /** The document's own interaction scripts (tabs, modals, citations). */
  js: string;
  /** Citation data map, as a JSON string. */
  cite: string;
  /** URL of the original standalone HTML, for "open in new tab". */
  src?: string;
}

/**
 * Renders an FTD document natively inside the portfolio app (no iframe):
 * injects the scoped/re-themed stylesheet and citation data, mounts the body
 * content, and runs the document's own interaction scripts once after mount.
 */
export function NativeArtifact({ title, css, html, js, cite, src }: NativeArtifactProps) {
  useEffect(() => {
    try {
      // The source scripts are self-contained IIFEs that wire up tabs, modal
      // panels and citation popovers against the now-mounted DOM.
      new Function(js)();
    } catch (err) {
      console.error("FTD native init failed", err);
    }
    return () => {
      document.body.classList.remove("mdl-open");
    };
  }, [js]);

  return (
    <div className="pt-16">
      {/* Portfolio chrome */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 pt-6 flex flex-wrap items-center gap-3">
        <Link
          href="/ai"
          className="inline-flex items-center gap-1.5 text-sm text-azure hover:text-azure-dark transition-colors"
        >
          <HiArrowLeft className="w-4 h-4" />
          Back to AI
        </Link>
        <h1 className="font-heading font-semibold text-lg text-slate-dark truncate">
          {title}
        </h1>
        {src && (
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-white/70 border border-azure/15 text-slate-dark hover:border-azure/30 transition-colors"
          >
            <HiArrowTopRightOnSquare className="w-4 h-4" />
            Original document
          </a>
        )}
      </div>

      {/* Scoped, re-themed stylesheet */}
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Citation data consumed by the document's scripts */}
      <script
        type="application/json"
        id="citeData"
        dangerouslySetInnerHTML={{ __html: cite }}
      />

      {/* Document body, rendered natively */}
      <div className="ftd-doc" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
