import Link from "next/link";
import { HiOutlineCalendar, HiOutlineSparkles, HiOutlineDocumentText } from "react-icons/hi2";
import type { ContentItemMeta } from "@/lib/content";

function hrefFor(item: ContentItemMeta): string {
  return item.type === "artifact" ? `/ai/${item.slug}` : `/blog/${item.slug}`;
}

export function ContentCard({ item }: { item: ContentItemMeta }) {
  const isArtifact = item.type === "artifact";

  return (
    <Link
      href={hrefFor(item)}
      className="block glass-card p-6 group hover:border-azure/25"
    >
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span
          className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium ${
            isArtifact
              ? "bg-teal/15 text-teal-700"
              : "bg-azure-light text-azure"
          }`}
        >
          {isArtifact ? (
            <HiOutlineSparkles className="w-3 h-3" />
          ) : (
            <HiOutlineDocumentText className="w-3 h-3" />
          )}
          {isArtifact ? "Artifact" : "Article"}
        </span>
        {item.category && item.category !== "General" && (
          <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-mid">
            {item.category}
          </span>
        )}
        {item.publishedAt && (
          <span className="flex items-center gap-1.5 text-xs text-slate-mid/60 ml-auto">
            <HiOutlineCalendar className="w-3.5 h-3.5" />
            {new Date(item.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        )}
      </div>

      <h2 className="font-heading font-semibold text-xl text-slate-dark group-hover:text-azure transition-colors">
        {item.title}
      </h2>

      {item.excerpt && (
        <p className="mt-2 text-sm text-slate-mid leading-relaxed line-clamp-2">
          {item.excerpt}
        </p>
      )}

      <span className="mt-3 inline-block text-sm font-medium text-azure opacity-0 group-hover:opacity-100 transition-opacity">
        {isArtifact ? "Open artifact →" : "Read more →"}
      </span>
    </Link>
  );
}
