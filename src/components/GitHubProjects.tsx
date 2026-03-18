"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiGithub } from "react-icons/si";
import {
  HiOutlineStar,
  HiArrowTopRightOnSquare,
  HiOutlineXMark,
  HiOutlineBookOpen,
} from "react-icons/hi2";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SectionWrapper from "./SectionWrapper";
import { type GitHubRepo, GITHUB_PROFILE_URL, languageColors } from "@/lib/github";

interface GitHubProjectsProps {
  repos: GitHubRepo[];
}

export default function GitHubProjects({ repos }: GitHubProjectsProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [expandedRepo, setExpandedRepo] = useState<GitHubRepo | null>(null);

  const languages = useMemo(() => {
    const langs = new Set(
      repos.map((r) => r.language).filter(Boolean) as string[]
    );
    return Array.from(langs).sort();
  }, [repos]);

  const filteredRepos = useMemo(() => {
    if (!selectedLanguage) return repos;
    return repos.filter((r) => r.language === selectedLanguage);
  }, [selectedLanguage, repos]);

  if (repos.length === 0) return null;

  return (
    <SectionWrapper id="github">
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-dark section-heading">
        Open Source & GitHub
      </h2>
      <p className="mt-4 text-slate-mid max-w-xl">
        Personal projects, experiments, and open-source contributions across
        security, ML, web development, and more.
      </p>

      {/* Language Filter */}
      <div className="mt-8">
        <p className="text-xs font-semibold text-slate-mid uppercase tracking-wider mb-3">
          Filter by Language
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedLanguage(null)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedLanguage === null
                ? "bg-azure text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All ({repos.length})
          </button>
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all inline-flex items-center gap-1.5 ${
                selectedLanguage === lang
                  ? "bg-azure text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{
                  backgroundColor: languageColors[lang] || "#8b8b8b",
                }}
              />
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Repo Grid */}
      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRepos.map((repo, index) => (
          <motion.div
            key={repo.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            className="glass-card p-5 flex flex-col group hover:ring-1 hover:ring-azure/30 transition-all cursor-pointer"
            onClick={() => setExpandedRepo(repo)}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <SiGithub className="w-4 h-4 text-slate-mid shrink-0" />
                <h3 className="font-heading font-semibold text-sm text-slate-dark group-hover:text-azure transition-colors truncate">
                  {repo.name}
                </h3>
              </div>
              {repo.readme && (
                <HiOutlineBookOpen className="w-3.5 h-3.5 text-slate-mid/50 group-hover:text-azure shrink-0 transition-colors" />
              )}
            </div>

            {/* Description */}
            <p className="mt-2 text-xs text-slate-mid leading-relaxed flex-1 line-clamp-2">
              {repo.description}
            </p>

            {/* Footer */}
            <div className="mt-3 flex items-center gap-3 pt-3 border-t border-azure/10">
              {repo.language && (
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-mid">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        languageColors[repo.language] || "#8b8b8b",
                    }}
                  />
                  {repo.language}
                </span>
              )}
              {repo.stars > 0 && (
                <span className="inline-flex items-center gap-1 text-xs text-slate-mid">
                  <HiOutlineStar className="w-3.5 h-3.5" />
                  {repo.stars}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Link */}
      <div className="mt-8 text-center">
        <a
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-dark text-white font-medium text-sm hover:bg-slate-800 transition-colors"
        >
          <SiGithub className="w-4 h-4" />
          View All on GitHub
          <HiArrowTopRightOnSquare className="w-4 h-4" />
        </a>
      </div>

      {/* README Modal */}
      <AnimatePresence>
        {expandedRepo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedRepo(null)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-azure/10"
            >
              {/* Modal Header */}
              <div className="sticky top-0 flex items-center justify-between p-6 border-b border-azure/10 bg-white/95 backdrop-blur-sm z-10">
                <div className="flex items-center gap-3 min-w-0">
                  <SiGithub className="w-5 h-5 text-slate-dark shrink-0" />
                  <h2 className="font-heading font-bold text-xl text-slate-dark truncate">
                    {expandedRepo.name}
                  </h2>
                  {expandedRepo.language && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-mid shrink-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            languageColors[expandedRepo.language] || "#8b8b8b",
                        }}
                      />
                      {expandedRepo.language}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setExpandedRepo(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <HiOutlineXMark className="w-5 h-5 text-slate-dark" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Description */}
                {expandedRepo.description && (
                  <p className="text-slate-mid leading-relaxed">
                    {expandedRepo.description}
                  </p>
                )}

                {/* README */}
                {expandedRepo.readme ? (
                  <div>
                    <h3 className="font-heading font-semibold text-sm text-slate-mid uppercase tracking-wider mb-3">
                      README
                    </h3>
                    <div className="prose prose-sm max-w-none prose-headings:font-heading prose-headings:text-slate-dark prose-a:text-azure hover:prose-a:text-azure-dark prose-code:text-sm prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-50 prose-pre:border prose-pre:border-slate-200 prose-img:rounded-lg prose-table:text-sm prose-th:bg-slate-50 prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {expandedRepo.readme}
                      </ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-mid/60 italic">
                    No README available for this repository.
                  </p>
                )}

                {/* CTA */}
                <div className="pt-4 border-t border-azure/10">
                  <a
                    href={expandedRepo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-dark text-white font-medium text-sm hover:bg-slate-800 transition-colors"
                  >
                    <SiGithub className="w-4 h-4" />
                    View on GitHub
                    <HiArrowTopRightOnSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
