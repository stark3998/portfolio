"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { HiOutlineShieldCheck, HiArrowTopRightOnSquare } from "react-icons/hi2";
import { GoLock } from "react-icons/go";
import { SiTerraform, SiPython } from "react-icons/si";
import { VscAzure, VscAzureDevops } from "react-icons/vsc";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { trackProjectView, trackFilter } from "@/lib/analytics";
import { ProjectCard, Project } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

const projects: Project[] = [
  {
    id: "cloud-assessment",
    title: "Cloud Assessment Tool",
    description:
      "Dynamic scanning tool that evaluates Azure tenant resources against NIST, CIS, and custom compliance frameworks. Generates automated reports for audit readiness.",
    detailedDescription:
      "Built a comprehensive scanning solution that automates Azure environment assessment against multiple compliance frameworks. The tool performs resource enumeration, policy analysis, and generates detailed audit reports with remediation recommendations. Handles large-scale multi-subscription Azure tenant assessments with real-time discovery and compliance scoring.",
    tags: ["Azure", "CIS", "NIST", "Compliance"],
    icon: HiOutlineShieldCheck,
    color: "azure",
    featured: true,
    github: "https://github.com/jatinmadan/cloud-assessment",
    demo: "https://demo.jatinmadan.com/cloud-assessment",
    metrics: {
      impact: "Scans 1000+ resources",
      performance: "Real-time analysis",
      scale: "Multi-tenant support",
    },
    fullTechStack: [
      "Azure",
      "Python",
      "Azure Resource Graph",
      "Compliance APIs",
      "Analytics",
    ],
  },
  {
    id: "cis-assessment",
    title: "CIS 1.5 Security Assessment",
    description:
      "Comprehensive assessment of Azure environments against CIS 1.5 benchmarks and Azure Security Benchmark v3, identifying gaps and remediation paths.",
    detailedDescription:
      "Developed an automated assessment framework that evaluates Azure security posture against CIS Microsoft Azure Foundations Benchmark v1.5. The tool provides detailed findings with severity ratings, remediation steps, and compliance mapping to Azure Security Benchmark v3 and industry standards.",
    tags: ["Security", "CIS", "Azure", "Governance"],
    icon: GoLock,
    color: "teal",
    featured: true,
    github: "https://github.com/jatinmadan/cis-assessment",
    metrics: {
      impact: "120+ benchmark controls",
      performance: "45-min full assessment",
      scale: "Enterprise deployments",
    },
    fullTechStack: [
      "CIS Benchmarks",
      "Azure Security",
      "PowerShell",
      "Azure Policies",
    ],
  },
  {
    id: "iam-automation",
    title: "IAM Automation Platform",
    description:
      "Automated Azure AD group-to-role mappings for PaaS databases and Kubernetes namespaces, implementing least privilege access at scale.",
    detailedDescription:
      "Engineered an IAM automation platform that manages identity mappings across Azure PaaS services and Kubernetes clusters. Features automated role provisioning, just-in-time access, and continuous compliance validation.",
    tags: ["Entra ID", "RBAC", "Kubernetes", "Automation"],
    icon: GoLock,
    color: "azure",
    github: "https://github.com/jatinmadan/iam-automation",
    demo: "https://demo.jatinmadan.com/iam-automation",
    metrics: {
      impact: "500+ identities managed",
      performance: "Sub-second provisioning",
      scale: "Multi-cloud support",
    },
    fullTechStack: [
      "Entra ID",
      "Kubernetes RBAC",
      "Azure SQL",
      "Cosmos DB",
      "REST APIs",
    ],
  },
  {
    id: "compliance-engine",
    title: "Compliance Framework Engine",
    description:
      "Process flow engine for governance & compliance in cloud migration with automated SOP generation and RACI segregation matrices.",
    detailedDescription:
      "Created a governance engine that automates compliance workflows for cloud migrations. Generates standard operating procedures, RACI matrices, and audit trails automatically based on organizational policies.",
    tags: ["Governance", "Azure", "Compliance", "Migration"],
    icon: VscAzure,
    color: "teal",
    metrics: {
      impact: "Reduces setup by 80%",
      performance: "Auto-generates SOPs",
      scale: "1000+ workload migrations",
    },
    fullTechStack: [
      "Azure",
      "Governance Framework",
      "Workflow Engine",
      "Audit Logging",
    ],
  },
  {
    id: "security-config",
    title: "Security Config Automation",
    description:
      "Desired-state configuration tooling ensuring continuous compliance across Azure resources with automated drift detection and remediation.",
    detailedDescription:
      "Implemented a continuous compliance system using Infrastructure as Code practices. Automatically detects deviations from desired state and applies remediation without manual intervention.",
    tags: ["Terraform", "IaC", "Azure", "Compliance"],
    icon: SiTerraform,
    color: "azure",
    github: "https://github.com/jatinmadan/security-config-automation",
    metrics: {
      impact: "100% compliance coverage",
      performance: "Remediation < 5 min",
      scale: "1000+ resources",
    },
    fullTechStack: [
      "Terraform",
      "Azure",
      "Desired State Configuration",
      "Policy Engine",
    ],
  },
  {
    id: "etl-analytics",
    title: "ETL Pipeline & Analytics Dashboard",
    description:
      "End-to-end ETL workflows using Azure PaaS services powering Power BI analytics dashboards for real-time business intelligence.",
    detailedDescription:
      "Developed comprehensive data pipelines that ingests from multiple sources, transforms at scale, and surfaces insights through interactive Power BI dashboards. Handles millions of records with sub-second query performance.",
    tags: ["Azure Data Factory", "Power BI", "ETL", "Analytics"],
    icon: SiPython,
    color: "teal",
    demo: "https://powerbi.jatinmadan.com/analytics-dashboard",
    metrics: {
      impact: "10M+ records/day",
      performance: "<1s query time",
      scale: "Real-time analytics",
    },
    fullTechStack: [
      "Azure Data Factory",
      "Power BI",
      "SQL Database",
      "Synapse Analytics",
      "Python",
    ],
  },
];

type SortOption = "featured" | "recent" | "alphabetical";

export default function Projects() {
  useScrollTracking("projects", "projects");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract unique tags
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.tags))
  ).sort();

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = selectedFilter
      ? projects.filter((p) => p.tags.includes(selectedFilter))
      : projects;

    // Sort
    if (sortBy === "featured") {
      filtered = [...filtered].sort((a, b) => {
        if (a.featured === b.featured) return 0;
        return a.featured ? -1 : 1;
      });
    } else if (sortBy === "alphabetical") {
      filtered = [...filtered].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return filtered;
  }, [selectedFilter, sortBy]);

  const handleFilterChange = (tag: string | null) => {
    setSelectedFilter(tag);
    if (tag) {
      trackFilter("technology", tag);
    }
  };

  return (
    <SectionWrapper id="projects">
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-dark section-heading">
        Projects
      </h2>
      <p className="mt-4 text-slate-mid max-w-xl">
        Key cloud security and enterprise architecture projects delivered for
        Fortune 500 clients.
      </p>

      {/* Filter and Sort Controls */}
      <div className="mt-8 space-y-4">
        {/* Filter Tags */}
        <div>
          <p className="text-xs font-semibold text-slate-mid uppercase tracking-wider mb-3">
            Filter by Technology
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilterChange(null)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedFilter === null
                  ? "bg-azure text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All Projects
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleFilterChange(tag)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedFilter === tag
                    ? "bg-azure text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div>
          <p className="text-xs font-semibold text-slate-mid uppercase tracking-wider mb-3">
            Sort By
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-medium text-sm border border-slate-200 hover:border-azure/30 focus:outline-none focus:ring-2 focus:ring-azure/50 transition-all"
          >
            <option value="featured">Featured First</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="mt-12 text-center py-12">
          <p className="text-slate-mid">No projects found with selected filter</p>
        </div>
      ) : (
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onExpand={(proj) => {
                setSelectedProject(proj);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </SectionWrapper>
  );
}
