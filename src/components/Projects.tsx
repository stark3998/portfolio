"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { HiOutlineShieldCheck, HiArrowTopRightOnSquare } from "react-icons/hi2";
import { GoLock } from "react-icons/go";
import { SiTerraform, SiPython } from "react-icons/si";
import { VscAzure, VscAzureDevops } from "react-icons/vsc";

interface Project {
  title: string;
  description: string;
  tags: string[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const projects: Project[] = [
  {
    title: "Cloud Assessment Tool",
    description:
      "Dynamic scanning tool that evaluates Azure tenant resources against NIST, CIS, and custom compliance frameworks. Generates automated reports for audit readiness.",
    tags: ["Azure", "Python", "CIS", "NIST", "Compliance"],
    icon: HiOutlineShieldCheck,
    color: "azure",
  },
  {
    title: "CIS 1.5 Security Assessment",
    description:
      "Comprehensive assessment of Azure environments against CIS 1.5 benchmarks and Azure Security Benchmark v3, identifying gaps and remediation paths.",
    tags: ["Security", "CIS 1.5", "Azure", "Governance"],
    icon: GoLock,
    color: "teal",
  },
  {
    title: "IAM Automation Platform",
    description:
      "Automated Azure AD group-to-role mappings for PaaS databases and Kubernetes namespaces, implementing least privilege access at scale.",
    tags: ["Entra ID", "RBAC", "Kubernetes", "Automation"],
    icon: GoLock,
    color: "azure",
  },
  {
    title: "Compliance Framework Engine",
    description:
      "Process flow engine for governance & compliance in cloud migration with automated SOP generation and RACI segregation matrices.",
    tags: ["Governance", "Azure", "Compliance", "Migration"],
    icon: VscAzure,
    color: "teal",
  },
  {
    title: "Security Config Automation",
    description:
      "Desired-state configuration tooling ensuring continuous compliance across Azure resources with automated drift detection and remediation.",
    tags: ["Terraform", "DSC", "Azure", "IaC"],
    icon: SiTerraform,
    color: "azure",
  },
  {
    title: "ETL Pipeline & Analytics Dashboard",
    description:
      "End-to-end ETL workflows using Azure PaaS services powering Power BI analytics dashboards for real-time business intelligence.",
    tags: ["Azure Data Factory", "Power BI", "Python", "ETL"],
    icon: SiPython,
    color: "teal",
  },
];

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-dark section-heading">
        Projects
      </h2>
      <p className="mt-4 text-slate-mid max-w-xl">
        Key cloud security and enterprise architecture projects delivered for
        Fortune 500 clients.
      </p>

      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="glass-card p-6 flex flex-col group"
          >
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

            <h3 className="font-heading font-semibold text-base text-slate-dark mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-slate-mid leading-relaxed flex-1">
              {project.description}
            </p>

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
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
