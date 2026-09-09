"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

interface Role {
  period: string;
  title: string;
  location: string;
  description: string;
  highlights: string[];
  status: "current" | "completed";
  promotion?: boolean;
}

interface CompanyGroup {
  company: string;
  overallPeriod: string;
  roles: Role[];
}

const experience: CompanyGroup[] = [
  {
    company: "Deloitte",
    overallPeriod: "Jan 2020 — Present",
    roles: [
      {
        period: "Jun 2026 — Present",
        title: "Engineering Manager 2",
        location: "Seattle, WA",
        description:
          "Leading identity modernization, enterprise AI security governance, and cloud control engineering across Microsoft Entra, Azure, and agentic platforms.",
        highlights: [
          "Directed the Okta-to-Entra migration workstream for approximately 2,000 application instances, establishing Power BI and SharePoint reporting for executive visibility and delivery governance",
          "Spearheaded Microsoft Entra External ID rollout, orchestrating the migration of applications, users, and groups into a production-ready customer identity platform",
          "Designed Okta-to-Entra migration accelerators to copy applications, users, groups, and policies into Entra ID and Entra External ID tenants, reducing friction for IDP modernization programs",
          "Standardized SSO and user-flow patterns across SAML, OIDC, and native authentication workloads to reduce migration risk and accelerate onboarding",
          "Delivered critical External ID capabilities including JIT migration, native authentication, WAF, tenant monitoring, alerting, and MFA to strengthen security posture from day one",
          "Architected hybrid identity infrastructure with Application Proxy, Entra ID Connect, firewall, F5 load balancing, and DNS routing for secure and seamless application access",
          "Implemented domain hints and HRD policies that streamlined sign-in journeys and reduced user friction across migrated applications",
          "Built Azure Policy and AI configuration controls for Copilot Studio, Microsoft Foundry, Purview, Agent365, and Agent ID to improve enterprise AI governance and guardrail enforcement",
          "Designed an enterprise AI security and governance framework aligned to the OWASP Top 10 for Agentic Applications and MITRE ATLAS/ATT&CK, closing architecture gaps across agent identity, connector secrets, and human-in-the-loop controls",
          "Specified a six-agent, vendor-agnostic remediation pipeline (discovery correlation, risk-based prioritization, patch orchestration, remediation verification, continuous agentic pentest, machine-speed containment) sequenced across a 30/60/90-day rollout",
          "Deployed agentic solutions that automated client communication and project coordination workflows across Teams and Outlook",
          "Produced security gap assessments and remediation recommendations aligned to CIS, MCSB, and CISA, giving leadership a prioritized roadmap for posture improvement",
        ],
        status: "current",
        promotion: true,
      },
      {
        period: "Jan 2025 — Jun 2026",
        title: "Cloud Security Senior Consultant",
        location: "Seattle, WA",
        description:
          "Built multi-cloud security assessment and governance capabilities for cloud migration programs.",
        highlights: [
          "Engineered a multi-cloud security assessment capability that surfaced vulnerabilities and compliance gaps across tenant resources against NIST and CIS",
          "Defined cloud governance processes, operating procedures, and RACI models that gave migration programs clearer accountability and control boundaries",
        ],
        status: "completed",
        promotion: true,
      },
      {
        period: "Jun 2023 — Dec 2024",
        title: "Advisory Solution Advisor",
        location: "Gurugram, India",
        description:
          "Drove organizational IAM strategy development and led tabletop exercises for Microsoft Sentinel real-time alert response.",
        highlights: [
          "Built organizational IAM strategy frameworks to align identity governance with enterprise security objectives",
          "Led tabletop exercises for Microsoft Sentinel real-time alerts, improving incident response readiness and team coordination",
        ],
        status: "completed",
        promotion: true,
      },
      {
        period: "Jun 2022 — Jun 2023",
        title: "Advisory Associate Solution Advisor",
        location: "Gurugram, India",
        description:
          "Focused on identity modernization, controls assessment, and access automation across Azure platforms.",
        highlights: [
          "Automated IAM for PaaS databases and Kubernetes namespaces through Azure AD group-to-role mappings, improving consistency and least-privilege enforcement",
          "Performed Azure controls assessments against CIS 1.5 and Azure Security Benchmark v3, translating findings into actionable remediation priorities",
          "Supported client application migration to Azure Active Directory, helping modernize authentication and authorization patterns across the estate",
        ],
        status: "completed",
        promotion: true,
      },
      {
        period: "Aug 2020 — Jun 2022",
        title: "Advisory Analyst",
        location: "Hyderabad, India",
        description:
          "Delivered Azure automation, ETL reporting, tenant assessment tooling, and resource security controls.",
        highlights: [
          "Built ETL workflows with Azure services to power Power BI dashboards that improved client reporting and operational visibility",
          "Developed a dynamic Azure assessment tool that identified tenant-level security configuration and policy gaps at scale",
          "Contributed to application migrations toward Azure Active Directory to improve identity standardization and access governance",
          "Implemented automation to keep Azure resources aligned with required security baselines and reduce configuration drift",
        ],
        status: "completed",
        promotion: true,
      },
      {
        period: "Jan — Apr 2020",
        title: "Cyber Security Advisor Intern",
        location: "Hyderabad, India",
        description:
          "Built Azure security and compliance automation during an early cybersecurity internship.",
        highlights: [
          "Created ETL workflows with Azure Synapse and Azure SQL Server that enabled richer Power BI reporting and analysis",
          "Engineered an Azure DevOps extension to pre-scan Terraform templates for compliance, risk, and security issues before deployment",
          "Developed a proof of concept for workload migration aligned to China's data regulations, supporting early regulatory compliance planning",
        ],
        status: "completed",
      },
    ],
  },
  {
    company: "UC Irvine",
    overallPeriod: "Jan 2024 — Dec 2024",
    roles: [
      {
        period: "Jan 2024 — Dec 2024",
        title: "Data and Technology Fellow",
        location: "Irvine, CA",
        description:
          "Built an Apple Vision OS application enabling immersive remote development with SSH and VS Code Server.",
        highlights: [
          "Built a Vision OS application that enabled secure SSH connectivity to VS Code Servers inside an immersive developer environment",
          "Created a VR-native workflow that improved the accessibility and usability of remote development in spatial computing contexts",
          "Designed the SwiftUI experience to balance usability, responsiveness, and visual clarity for day-to-day developer tasks",
          "Integrated SSH libraries and executed end-to-end testing to raise connection reliability and overall application stability",
        ],
        status: "completed",
      },
    ],
  },
  {
    company: "ZS",
    overallPeriod: "Jun 2024 — Aug 2024",
    roles: [
      {
        period: "Jun 2024 — Aug 2024",
        title: "Business Technology Solutions Associate Consultant",
        location: "Philadelphia, PA",
        description:
          "Designed Azure data engineering foundations for scalable ETL, analytics, governance, and secrets management.",
        highlights: [
          "Converted 3,000 Parquet tables to Delta tables using Apache Spark and Databricks, leveraging Delta's ACID transactions and scalable metadata handling to enhance data management efficiency",
          "Built a custom Docker image for Databricks clusters with preinstalled packages, reducing cluster run time by 14% by eliminating runtime installations",
          "Established Azure Data Lake foundations that gave the client a secure and scalable storage layer for analytics workloads",
          "Built Azure Data Factory pipelines that reduced manual data movement and improved the consistency of transformation workflows",
          "Implemented Unity Catalog and Azure Key Vault to strengthen governance, secrets management, and audit readiness",
        ],
        status: "completed",
      },
    ],
  },
  {
    company: "Indian Institute of Technology, Bombay",
    overallPeriod: "Jul 2020 — Sep 2020",
    roles: [
      {
        period: "Jul 2020 — Sep 2020",
        title: "Azure Architect",
        location: "Mumbai, India",
        description:
          "Designed Azure-hosted collaboration and SSO solutions for IIT Bombay use cases.",
        highlights: [
          "Designed a video conferencing platform on Azure using Jitsi and BigBlueButton, combining VMSS, App Service, Storage Account, and Cosmos DB for scalable collaboration",
          "Created secure SSO API architecture for IIT Bombay applications using Azure App Service, Redis Cache, and Application Gateway",
          "Implemented CDN capabilities for deployed storage accounts to improve content delivery and end-user performance",
        ],
        status: "completed",
      },
    ],
  },
  {
    company: "Aam Aadmi Party",
    overallPeriod: "Jun 2019 — Aug 2019",
    roles: [
      {
        period: "Jun 2019 — Aug 2019",
        title: "Intern",
        location: "New Delhi, India",
        description:
          "Built data collection and preprocessing pipelines for citizen complaint analytics.",
        highlights: [
          "Built a social media scraping tool across Facebook, WhatsApp, and Twitter to support complaint analytics and Power BI reporting",
          "Created a preprocessing approach for bulk record updates using binning and partitioning to improve data handling efficiency",
        ],
        status: "completed",
      },
    ],
  },
  {
    company: "HPCL-Mittal Energy Limited",
    overallPeriod: "Apr 2018 — Jul 2018",
    roles: [
      {
        period: "Apr 2018 — Jul 2018",
        title: "Intern",
        location: "Punjab, India",
        description:
          "Supported SAP modernization and Azure deployment initiatives for enterprise workloads.",
        highlights: [
          "Supported deployment of SAP HANA and SAP BTP on Azure with customized modules aligned to organizational requirements",
        ],
        status: "completed",
      },
    ],
  },
];

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-dark section-heading">
        Experience
      </h2>

      <div className="mt-12 relative">
        {/* Pipeline line */}
        <div className="absolute left-[17px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-azure via-teal to-azure/20 hidden md:block" />

        <div className="space-y-10">
          {experience.map((group, groupIndex) => {
            const isMultiRole = group.roles.length > 1;
            const isCurrent = group.roles.some((r) => r.status === "current");

            return (
              <motion.div
                key={groupIndex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                className="relative flex gap-6"
              >
                {/* Pipeline node */}
                <div className="hidden md:flex flex-col items-center pt-1.5">
                  <div
                    className={`pipeline-node ${
                      isCurrent
                        ? "!bg-azure shadow-[0_0_12px_rgba(0,120,212,0.4)]"
                        : ""
                    }`}
                  />
                  {isMultiRole && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-azure/40 to-transparent mt-2" />
                  )}
                </div>

                {/* Card */}
                <div className="flex-1">
                  {isMultiRole ? (
                    /* Multi-role company — LinkedIn-style grouped layout */
                    <div className="glass-card p-6">
                      {/* Company header */}
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className="font-heading font-semibold text-lg text-slate-dark">
                          {group.company}
                        </h3>
                        {isCurrent && (
                          <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-mid mb-5">
                        {group.overallPeriod} · {group.roles.length} roles
                      </p>

                      {/* Roles sub-timeline */}
                      <div className="relative ml-2 border-l-2 border-azure/20 pl-6 space-y-6">
                        {group.roles.map((role, roleIndex) => (
                          <div key={roleIndex} className="relative">
                            {/* Sub-timeline node */}
                            <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border-2 border-azure bg-white flex items-center justify-center">
                              {role.status === "current" && (
                                <span className="w-1.5 h-1.5 rounded-full bg-azure" />
                              )}
                            </div>

                            {/* Promotion badge */}
                            {role.promotion && roleIndex > 0 && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5 mb-1.5">
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                                  />
                                </svg>
                                Promoted
                              </span>
                            )}

                            <div className="flex flex-wrap items-center gap-3 mb-0.5">
                              <span
                                className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                                  role.status === "current"
                                    ? "bg-azure-light text-azure"
                                    : "bg-slate-100 text-slate-mid"
                                }`}
                              >
                                {role.period}
                              </span>
                              <span className="text-xs text-slate-mid flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {role.location}
                              </span>
                            </div>

                            <h4 className="font-heading font-semibold text-base text-slate-dark mt-1">
                              {role.title}
                            </h4>
                            <p className="text-sm text-slate-mid mt-1">
                              {role.description}
                            </p>

                            <ul className="mt-2 space-y-1.5">
                              {role.highlights.map((h, i) => (
                                <li
                                  key={i}
                                  className="text-sm text-slate-mid flex items-start gap-2"
                                >
                                  <span className="w-1 h-1 rounded-full bg-azure mt-2 flex-shrink-0" />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Single-role company — standard card */
                    <div className="glass-card p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span
                          className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                            group.roles[0].status === "current"
                              ? "bg-azure-light text-azure"
                              : "bg-slate-100 text-slate-mid"
                          }`}
                        >
                          {group.roles[0].period}
                        </span>
                        {group.roles[0].status === "current" && (
                          <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Current
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading font-semibold text-lg text-slate-dark">
                        {group.roles[0].title}
                      </h3>
                      <p className="text-sm text-azure font-medium mt-0.5">
                        {group.company}
                      </p>
                      <p className="text-xs text-slate-mid mt-0.5 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {group.roles[0].location}
                      </p>
                      <p className="text-sm text-slate-mid mt-2">
                        {group.roles[0].description}
                      </p>

                      <ul className="mt-3 space-y-1.5">
                        {group.roles[0].highlights.map((h, i) => (
                          <li
                            key={i}
                            className="text-sm text-slate-mid flex items-start gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-azure mt-2 flex-shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
