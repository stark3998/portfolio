"use client";

import { motion } from "framer-motion";
import { HiOutlineLink } from "react-icons/hi2";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { trackBlogShare } from "@/lib/analytics";
import { useState } from "react";

interface ShareButtonsProps {
  slug: string;
  title: string;
  url?: string;
}

export function ShareButtons({ slug, title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const pageUrl =
    url || `${typeof window !== "undefined" ? window.location.href : ""} `;

  const handleShare = (platform: string) => {
    trackBlogShare(slug, platform);

    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(pageUrl)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          pageUrl
        )}`;
        break;
      case "copy":
        navigator.clipboard.writeText(pageUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=550,height=420");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-slate-mid uppercase tracking-wider">
        Share
      </span>
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleShare("twitter")}
          className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-sky-400 hover:text-white transition-colors"
          title="Share on Twitter"
        >
          <FaXTwitter className="w-4 h-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleShare("linkedin")}
          className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white transition-colors"
          title="Share on LinkedIn"
        >
          <FaLinkedinIn className="w-4 h-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleShare("copy")}
          className={`p-2 rounded-lg transition-colors ${
            copied
              ? "bg-teal text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
          title="Copy link"
        >
          <HiOutlineLink className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
