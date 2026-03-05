"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineXMark, HiArrowTopRightOnSquare } from "react-icons/hi2";
import { SiGithub } from "react-icons/si";
import { Project } from "./ProjectCard";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-azure/10"
          >
            {/* Close Button */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-azure/10 bg-white/95 backdrop-blur-sm z-10">
              <h2 className="font-heading font-bold text-xl text-slate-dark">
                {project.title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <HiOutlineXMark className="w-5 h-5 text-slate-dark" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Image */}
              {project.image && (
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="font-heading font-semibold text-sm text-slate-mid uppercase tracking-wider mb-2">
                  Overview
                </h3>
                <p className="text-slate-dark leading-relaxed">
                  {project.detailedDescription || project.description}
                </p>
              </div>

              {/* Metrics */}
              {project.metrics && (
                <div>
                  <h3 className="font-heading font-semibold text-sm text-slate-mid uppercase tracking-wider mb-3">
                    Key Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {project.metrics.impact && (
                      <div className="p-3 rounded-lg bg-azure-light/30 border border-azure/20">
                        <p className="text-xs text-slate-mid/70 mb-1">Impact</p>
                        <p className="text-sm font-semibold text-slate-dark">
                          {project.metrics.impact}
                        </p>
                      </div>
                    )}
                    {project.metrics.performance && (
                      <div className="p-3 rounded-lg bg-teal-light/30 border border-teal/20">
                        <p className="text-xs text-slate-mid/70 mb-1">Performance</p>
                        <p className="text-sm font-semibold text-slate-dark">
                          {project.metrics.performance}
                        </p>
                      </div>
                    )}
                    {project.metrics.scale && (
                      <div className="p-3 rounded-lg bg-azure-light/30 border border-azure/20">
                        <p className="text-xs text-slate-mid/70 mb-1">Scale</p>
                        <p className="text-sm font-semibold text-slate-dark">
                          {project.metrics.scale}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              {project.fullTechStack && project.fullTechStack.length > 0 && (
                <div>
                  <h3 className="font-heading font-semibold text-sm text-slate-mid uppercase tracking-wider mb-3">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.fullTechStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              {(project.github || project.demo) && (
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-azure/10">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-dark text-white font-medium text-sm hover:bg-slate-800 transition-colors"
                    >
                      <SiGithub className="w-4 h-4" />
                      View on GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-azure text-white font-medium text-sm hover:bg-azure-dark transition-colors"
                    >
                      Live Demo
                      <HiArrowTopRightOnSquare className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
