"use client";

import { motion } from "framer-motion";
import { HiArrowTopRightOnSquare, HiOutlineStar } from "react-icons/hi2";
import { SiGithub } from "react-icons/si";
import { trackProjectDetail } from "@/lib/analytics";

export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  tags: string[];
  icon: React.ComponentType<{ className?: string }>;
  color: "azure" | "teal";
  image?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
  metrics?: {
    impact?: string;
    performance?: string;
    scale?: string;
  };
  fullTechStack?: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onExpand: (project: Project) => void;
}

export function ProjectCard({ project, index, onExpand }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`glass-card p-6 flex flex-col group cursor-pointer relative overflow-hidden ${
        project.featured ? "lg:col-span-2 ring-1 ring-azure/30" : ""
      }`}
      onClick={() => {
        trackProjectDetail(project.title);
        onExpand(project);
      }}
    >
      {/* Featured Badge */}
      {project.featured && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider"
        >
          <HiOutlineStar className="w-3 h-3" />
          Featured
        </motion.div>
      )}

      {/* Project Image */}
      {project.image && (
        <div className="mb-4 -mx-6 -mt-6 h-32 bg-gradient-to-b from-azure/10 to-transparent overflow-hidden rounded-t-xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
          project.color === "azure"
            ? "bg-azure-light text-azure"
            : "bg-teal-light text-teal"
        }`}
      >
        <project.icon className="w-5 h-5" />
      </div>

      {/* Title */}
      <h3 className="font-heading font-semibold text-base text-slate-dark mb-2 group-hover:text-azure transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-mid leading-relaxed flex-1">
        {project.description}
      </p>

      {/* Metrics (if available) */}
      {project.metrics && (
        <div className="mt-3 space-y-1 text-xs text-slate-mid/70">
          {project.metrics.impact && (
            <p>
              <span className="font-semibold">Impact:</span> {project.metrics.impact}
            </p>
          )}
          {project.metrics.performance && (
            <p>
              <span className="font-semibold">Performance:</span>{" "}
              {project.metrics.performance}
            </p>
          )}
          {project.metrics.scale && (
            <p>
              <span className="font-semibold">Scale:</span> {project.metrics.scale}
            </p>
          )}
        </div>
      )}

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-azure-light/60 text-azure/80"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="mt-4 flex items-center gap-2 pt-4 border-t border-azure/10">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-medium text-slate-mid hover:text-azure transition-colors inline-flex items-center gap-1.5"
          >
            <SiGithub className="w-3.5 h-3.5" />
            View Code
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="ml-auto text-xs font-medium text-slate-mid hover:text-azure transition-colors inline-flex items-center gap-1.5"
          >
            Live Demo
            <HiArrowTopRightOnSquare className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
