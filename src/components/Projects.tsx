"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { HiOutlineShieldCheck, HiArrowTopRightOnSquare } from "react-icons/hi2";
import { GoLock } from "react-icons/go";
import { SiTerraform, SiPython, SiTensorflow } from "react-icons/si";
import { VscAzure, VscAzureDevops } from "react-icons/vsc";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { trackProjectView, trackFilter } from "@/lib/analytics";
import { ProjectCard, Project } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

const projects: Project[] = [
  {
    id: "enterprise-ai-security-governance",
    title: "Enterprise AI Security & Governance Program",
    description:
      "Built an enterprise framework for securing agentic AI, aligned to the OWASP Top 10 for Agentic Applications (ASI01\u2013ASI10) and MITRE ATLAS/ATT&CK, closing architecture gaps across identity, secrets, supply-chain, and human-in-the-loop controls.",
    detailedDescription:
      "Led design of a client enterprise AI security and governance framework addressing agentic AI risk end-to-end. Mapped ten architecture gaps \u2014 agent identity & access, connector secrets management, skill/MCP supply-chain vetting, human-in-the-loop for high-risk actions, gateway DLP, data-classification-driven segmentation, orchestration hub governance, alert severity calibration, vendor/model risk criteria, and machine-speed disaster-recovery readiness \u2014 to Microsoft-native controls (Entra ID, Key Vault, Purview, Defender, Sentinel). Stood up a Frontier-Threat-Defense-style operating model borrowed from frontier AI labs (vendor capability watch, AI red-teaming, guardian-agent runtime oversight) inside the existing AI security function, and specified a six-agent, vendor-agnostic remediation pipeline (discovery correlation, risk-based prioritization, patch orchestration, remediation verification, continuous agentic pentest, machine-speed containment) sequenced across a 30/60/90-day rollout.",
    tags: ["AI Governance", "OWASP ASI", "Threat Defense", "Agentic Remediation"],
    icon: HiOutlineShieldCheck,
    color: "teal",
    featured: true,
    metrics: {
      impact: "10 controls mapped to Microsoft-native fixes",
      performance: "6-agent vendor-agnostic remediation pipeline",
      scale: "30/60/90-day enterprise rollout",
    },
    fullTechStack: [
      "OWASP ASI Taxonomy",
      "MITRE ATLAS / ATT&CK",
      "Microsoft Entra ID",
      "Azure Key Vault",
      "Microsoft Purview",
      "Microsoft Defender",
      "Microsoft Sentinel",
    ],
  },
  {
    id: "secops-multi-agent-fleet",
    title: "Microsoft SecOps Multi-Agent Fleet",
    description:
      "Built a 7-agent SecOps investigation fleet on the Microsoft Agent Framework and Azure AI Foundry Agent Service, detecting 17 MITRE ATLAS/OWASP-tagged AI-runtime and identity threats.",
    detailedDescription:
      "Designed an Orchestrator agent that delegates to six specialists (Triage, AI Runtime, Correlation, Threat Intel, Remediation, Quality) plus a standalone hypothesis-driven Hunt agent. The fleet fuses Microsoft Graph sign-in logs, Azure Log Analytics, Microsoft Sentinel, and Microsoft Defender XDR signals into markdown investigation reports streamed live over SSE, covering prompt injection, content-safety abuse, cost abuse, coordinated attacks, malicious models, and compromised accounts \u2014 every remediation recommendation is read-only and requires human approval.",
    tags: ["Agentic AI", "Microsoft Agent Framework", "Azure AI Foundry", "Threat Detection"],
    icon: HiOutlineShieldCheck,
    color: "azure",
    featured: false,
    github: "https://github.com/stark3998/Security-Agents-MS",
    metrics: {
      impact: "17 MITRE ATLAS / OWASP LLM-tagged detections",
      performance: "Live SSE investigation streaming",
      scale: "7-agent orchestrated fleet",
    },
    fullTechStack: [
      "Microsoft Agent Framework",
      "Azure AI Foundry Agent Service",
      "FastAPI",
      "React + Vite",
      "Microsoft Graph API",
      "Azure Log Analytics",
      "Microsoft Sentinel",
      "Microsoft Defender XDR",
    ],
  },
  {
    id: "entra-security-analytics",
    title: "Entra Security Analytics \u2014 M365 SIEM",
    description:
      "Built a self-hosted SIEM for Microsoft 365 tenants with 90 detection rules across 13 categories, plus AI-powered investigation and autonomous remediation.",
    detailedDescription:
      "Engineered a correlation rules engine collecting logs from Entra ID, Exchange Online, SharePoint, Power Platform, Microsoft Defender, Purview DLP, Intune, and Secure Score across 10 data collectors. Layered Azure AI Foundry (GPT-4o) on top for autonomous investigation and remediation planning, a Conditional Access policy visualizer with gap analysis, and PIM role monitoring, surfaced through a React risk-scoring dashboard.",
    tags: ["SIEM", "Detection Engineering", "Entra ID", "AI Remediation"],
    icon: HiOutlineShieldCheck,
    color: "teal",
    featured: false,
    github: "https://github.com/stark3998/Entra-Security-Analytics",
    metrics: {
      impact: "90 rules + 10 meta-rules across 13 categories",
      performance: "AI-driven investigation & remediation (GPT-4o)",
      scale: "10 Microsoft 365 data collectors",
    },
    fullTechStack: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "React",
      "Azure AI Foundry",
      "Entra ID",
      "Conditional Access",
      "PIM",
    ],
  },
  {
    id: "agents-log-monitor",
    title: "Agent Activity Log Monitor",
    description:
      "Built a real-time local monitor that normalizes and streams AI agent activity across Claude Code, Azure AI Foundry, and Copilot Studio into one live dashboard.",
    detailedDescription:
      "Implemented push (HTTP hooks) and pull (REST/OData) collectors that normalize events from Claude Code, Azure AI Foundry Agent Service, and Copilot Studio's Dataverse-backed transcripts into a shared schema, storing them in an embedded SQLite database and broadcasting them over WebSocket to a live browser UI, with an optional Electron desktop shell.",
    tags: ["Observability", "Agentic AI", "WebSocket"],
    icon: VscAzure,
    color: "azure",
    featured: false,
    github: "https://github.com/stark3998/Agents-Log-Monitor",
    metrics: {
      impact: "Unified visibility across 3 agent platforms",
      performance: "Real-time WebSocket streaming",
      scale: "Claude Code \u00b7 Foundry \u00b7 Copilot Studio",
    },
    fullTechStack: [
      "TypeScript",
      "Node.js",
      "Express",
      "SQLite",
      "WebSocket",
      "Electron",
    ],
  },
  {
    id: "personal-outlook-agent",
    title: "Personal Outlook Agent",
    description:
      "Built a local-first Outlook automation platform exposing mail, calendar, and an AI agent layer through three equal interfaces \u2014 MCP, REST, and CLI \u2014 sharing one service layer.",
    detailedDescription:
      "Built a cross-platform desktop Outlook automation service (AppleScript on macOS, COM on Windows) with an AI agent layer for summaries, action-item extraction, reply proposals, and meeting prep powered by Azure OpenAI / Microsoft Foundry. Every write or destructive action flows through a two-step prepare-then-confirm approval service, and email content is treated as untrusted data to guard against prompt injection. Shipped with 125 tests, 89% coverage, and a clean mypy --strict / ruff bar.",
    tags: ["MCP", "Agentic AI", "Automation"],
    icon: SiPython,
    color: "teal",
    featured: false,
    github: "https://github.com/stark3998/Personal-Outlook-Agent",
    metrics: {
      impact: "89% test coverage, mypy --strict clean",
      performance: "3 interfaces, 1 shared service layer",
      scale: "28-tool MCP catalog",
    },
    fullTechStack: [
      "Python 3.13",
      "FastMCP",
      "FastAPI",
      "Typer CLI",
      "Azure OpenAI",
      "Microsoft Foundry",
    ],
  },
  {
    id: "enterprise-ai-security-board",
    title: "Enterprise AI Security Board",
    description:
      "Built an internal enterprise AI portfolio and vendor intelligence platform giving AI program teams one place to manage use cases, inspect vendor capabilities, consult a security reference, and ask a streaming AI advisor questions about the portfolio.",
    detailedDescription:
      "Paired a React 18 + Vite frontend with a FastAPI backend, Azure Cosmos DB, Azure OpenAI chat, Foundry Agent Service, and Entra ID JWT validation. An asynchronous vendor scanner runs discovery, research, analysis, and upsert stages to keep a live vendor catalogue current, while a streaming chat advisor answers questions over the portfolio content in real time.",
    tags: ["Vendor Intelligence", "Multi-Agent Pipeline", "Cosmos DB"],
    icon: VscAzure,
    color: "azure",
    featured: false,
    metrics: {
      impact: "4-stage multi-agent vendor research pipeline",
      performance: "Streaming AI chat advisor (SSE)",
      scale: "Private / internal initiative",
    },
    fullTechStack: [
      "React",
      "FastAPI",
      "Azure Cosmos DB",
      "Azure OpenAI",
      "Azure AI Foundry Agent Service",
      "Bing Grounding",
      "Entra ID",
    ],
  },
  {
    id: "migration-accelerator",
    title: "Okta to Entra Migration Accelerator",
    description:
      "Built accelerator workflows that copy applications, users, groups, and policies from Okta into Entra ID or Entra External ID to simplify identity provider migration.",
    detailedDescription:
      "Designed a migration accelerator focused on reducing the manual effort and sequencing complexity of identity provider modernization. The accelerator standardized tenant discovery, mapped core identity objects, and enabled more repeatable migration outcomes by carrying applications, users, groups, and policies from Okta into target Entra environments.",
    tags: ["Okta", "Entra ID", "Migration Accelerator", "Identity"],
    icon: GoLock,
    color: "teal",
    featured: false,
    metrics: {
      impact: "Reduced migration effort",
      performance: "Accelerated tenant onboarding",
      scale: "Object and policy migration",
    },
    fullTechStack: [
      "Okta",
      "Microsoft Entra ID",
      "Microsoft Entra External ID",
      "Applications",
      "Users & Groups",
      "Policy Mapping",
    ],
  },
  {
    id: "identity-modernization",
    title: "Enterprise Identity Modernization Program",
    description:
      "Led a large-scale migration program moving approximately 2,000 application instances from Okta to Microsoft Entra ID with governance, reporting, and phased onboarding controls.",
    detailedDescription:
      "Established the migration operating model for a complex identity modernization program spanning application discovery, migration waves, stakeholder tracking, and executive reporting. The program standardized migration patterns for enterprise applications, introduced Power BI and SharePoint-driven visibility, and created a repeatable framework for onboarding workloads into Microsoft Entra ID with lower execution risk.",
    tags: ["Entra ID", "Identity Migration", "SSO", "Governance"],
    icon: HiOutlineShieldCheck,
    color: "azure",
    metrics: {
      impact: "~2,000 application instances",
      performance: "Executive reporting cadence",
      scale: "Enterprise migration factory",
    },
    fullTechStack: [
      "Microsoft Entra ID",
      "Power BI",
      "SharePoint",
      "SAML",
      "OIDC",
      "Migration Governance",
    ],
  },
  {
    id: "external-id-platform",
    title: "Entra External ID Platform",
    description:
      "Designed and deployed a customer identity platform on Microsoft Entra External ID with secure onboarding, JIT migration, native authentication, and tenant-level protections.",
    detailedDescription:
      "Built the core External ID capability set needed for enterprise-grade application migration, including user and group migration, native authentication flows, MFA policy design, WAF integration, monitoring, logging, and operational alerting. The result was a production-ready identity platform designed to absorb migrated workloads with stronger controls and a cleaner end-user experience.",
    tags: ["External ID", "CIAM", "MFA", "WAF"],
    icon: GoLock,
    color: "teal",
    metrics: {
      impact: "Production identity platform",
      performance: "Policy-driven onboarding",
      scale: "Multi-app migration readiness",
    },
    fullTechStack: [
      "Microsoft Entra External ID",
      "MFA",
      "JIT Migration",
      "Native Authentication",
      "Web Application Firewall",
      "Monitoring & Alerting",
    ],
  },
  {
    id: "hybrid-identity",
    title: "Hybrid Identity Access Architecture",
    description:
      "Architected secure hybrid access patterns using Application Proxy, Entra ID Connect, F5 load balancing, and DNS routing for seamless enterprise authentication.",
    detailedDescription:
      "Defined the hybrid identity control plane required to support migrated applications that still depended on on-premises connectivity and routing constraints. The architecture combined Application Proxy, Entra ID Connect, firewall boundaries, F5 load balancing, and DNS routing with domain hints and HRD policies to create secure access flows while reducing user friction during cutover.",
    tags: ["Hybrid Identity", "App Proxy", "HRD", "Networking"],
    icon: GoLock,
    color: "azure",
    metrics: {
      impact: "Seamless hybrid access",
      performance: "Reduced sign-in friction",
      scale: "Enterprise routing patterns",
    },
    fullTechStack: [
      "Entra ID",
      "Application Proxy",
      "Entra ID Connect",
      "F5 Load Balancer",
      "DNS Routing",
      "Home Realm Discovery",
    ],
  },
  {
    id: "cloud-assessment",
    title: "Cloud Security Assessment Engine",
    description:
      "Built a multi-cloud assessment capability that measures security posture against CIS, NIST, and client-specific control requirements.",
    detailedDescription:
      "Engineered a scalable assessment engine to evaluate tenant resources for control gaps, policy drift, and framework alignment. The solution supported cloud migration and remediation planning by providing structured findings, governance context, and a repeatable mechanism for tracking posture across subscriptions and environments.",
    tags: ["Cloud Security", "CIS", "NIST", "Assessment"],
    icon: VscAzure,
    color: "teal",
    metrics: {
      impact: "Framework-mapped findings",
      performance: "Repeatable assessments",
      scale: "Multi-environment coverage",
    },
    fullTechStack: [
      "Azure",
      "Python",
      "Azure Resource Graph",
      "CIS",
      "NIST",
      "Risk Reporting",
    ],
  },
  {
    id: "iam-automation",
    title: "IAM Automation & Least-Privilege Controls",
    description:
      "Automated identity-to-role mapping patterns for PaaS databases and Kubernetes namespaces to improve access consistency and least-privilege enforcement.",
    detailedDescription:
      "Developed automation patterns that mapped Azure AD groups to downstream roles across platform services, reducing manual access administration and making entitlement models more consistent. The solution helped support scalable provisioning, cleaner separation of duties, and stronger governance for privileged access across application and data platforms.",
    tags: ["IAM", "RBAC", "Kubernetes", "Automation"],
    icon: SiTerraform,
    color: "azure",
    metrics: {
      impact: "Consistent access models",
      performance: "Reduced manual provisioning",
      scale: "Cross-platform role mapping",
    },
    fullTechStack: [
      "Entra ID",
      "Azure AD Groups",
      "Azure SQL",
      "Kubernetes RBAC",
      "PowerShell",
    ],
  },
  {
    id: "security-reporting",
    title: "Security Reporting & Remediation Dashboard",
    description:
      "Built executive-ready reporting that translated control gaps, migration progress, and remediation priorities into actionable dashboards for stakeholders.",
    detailedDescription:
      "Designed reporting pipelines and dashboards that combined migration tracking, control findings, and remediation status into a single operating view. The solution supported program leadership with clearer prioritization, helped technical teams monitor execution, and improved communication across identity, security, and application stakeholders.",
    tags: ["Power BI", "Remediation", "Reporting", "Security"],
    icon: SiPython,
    color: "teal",
    metrics: {
      impact: "Leadership decision support",
      performance: "Near real-time visibility",
      scale: "Cross-workstream reporting",
    },
    fullTechStack: [
      "Power BI",
      "SharePoint",
      "Azure Data Factory",
      "Azure SQL",
      "Python",
      "Executive Reporting",
    ],
  },
  {
    id: "emergency-response-assist",
    title: "Emergency Response Assist (ERA)",
    description:
      "Developed an audio detection system using MFCC Feature Extraction and LSTM/CNN models, achieving 95.6% accuracy in identifying gunshot sounds for real-time emergency response.",
    detailedDescription:
      "Built an end-to-end audio classification pipeline for detecting gunshot sounds in real-time environments. The system used Mel-Frequency Cepstral Coefficient (MFCC) feature extraction combined with LSTM and CNN deep learning models to classify audio signals with 95.6% accuracy. Designed to enhance emergency response capabilities by enabling faster detection and alerting in critical situations.",
    tags: ["Deep Learning", "LSTM", "CNN", "Python"],
    icon: SiTensorflow,
    color: "teal",
    metrics: {
      impact: "95.6% detection accuracy",
      performance: "Real-time audio classification",
      scale: "MFCC + LSTM/CNN pipeline",
    },
    fullTechStack: [
      "Python",
      "MFCC Feature Extraction",
      "LSTM",
      "CNN",
      "NumPy",
      "Audio Signal Processing",
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

  const featuredProjects =
    sortBy === "featured"
      ? filteredProjects.filter((project) => project.featured)
      : [];
  const coreProjects =
    sortBy === "featured"
      ? filteredProjects.filter((project) => !project.featured)
      : filteredProjects;

  return (
    <SectionWrapper id="projects">
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-dark section-heading">
        Projects
      </h2>
      <p className="mt-4 text-slate-mid max-w-xl">
        Selected programs across identity modernization, enterprise AI
        governance, hybrid access, cloud security, and agentic automation.
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
            aria-label="Sort projects"
            title="Sort projects"
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
        <div className="mt-10">
          {sortBy === "featured" && featuredProjects.length > 0 && (
            <>
              <div className="mb-4 flex items-center gap-3">
                <span className="text-[11px] font-heading font-semibold uppercase tracking-[0.24em] text-azure">
                  Latest Initiatives
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-azure/30 to-transparent" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {featuredProjects.map((project, index) => (
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
            </>
          )}

          {sortBy === "featured" && coreProjects.length > 0 && (
            <>
              <div className="mt-10 mb-4 flex items-center gap-3">
                <span className="text-[11px] font-heading font-semibold uppercase tracking-[0.24em] text-slate-mid">
                  Core Programs
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-slate-300/70 to-transparent" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {coreProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={featuredProjects.length + index}
                    onExpand={(proj) => {
                      setSelectedProject(proj);
                      setIsModalOpen(true);
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {sortBy !== "featured" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {coreProjects.map((project, index) => (
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
