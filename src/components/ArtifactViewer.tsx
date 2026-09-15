"use client";

import Link from "next/link";
import {
  HiArrowLeft,
  HiArrowTopRightOnSquare,
} from "react-icons/hi2";

interface ArtifactViewerProps {
  title: string;
  /** URL of a standalone HTML document (repo-hosted artifacts). */
  src?: string;
  /** Inline HTML (Cosmos-hosted artifacts). */
  html?: string;
}

export function ArtifactViewer({ title, src, html }: ArtifactViewerProps) {
  return (
    <div className="pt-20 pb-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center gap-3 mb-4">
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
              Open in new tab
            </a>
          )}
        </div>

        <div className="glass-card overflow-hidden p-0">
          <iframe
            title={title}
            src={src}
            srcDoc={html}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads"
            className="w-full rounded-2xl bg-white"
            style={{ height: "calc(100vh - 11rem)", minHeight: "560px", border: "0" }}
          />
        </div>
      </div>
    </div>
  );
}
