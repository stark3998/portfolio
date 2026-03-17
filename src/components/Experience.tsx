"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

interface TimelineItem {
  period: string;
  title: string;
  company: string;
  description: string;
  highlights: string[];
  status: "current" | "completed";
}

const timeline: TimelineItem[] = [
  {
    period: "Jan 2025 — Present",
    title: "Cloud Security Senior Consultant",
    company: "Deloitte",
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
      "Deployed agentic solutions that automated client communication and project coordination workflows across Teams and Outlook",
      "Produced security gap assessments and remediation recommendations aligned to CIS, MCSB, and CISA, giving leadership a prioritized roadmap for posture improvement",
    ],
    status: "current",
  },
  {
    period: "Jan 2024 — Dec 2024",
    title: "Data and Technology Fellow",
    company: "UC Irvine",
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
  {
    period: "Jun 2024 — Aug 2024",
    title: "Business Technology Solutions Associate Consultant",
    company: "ZS",
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
  {
    period: "Jun 2023 — Sep 2023",
    title: "Advisory Solution Advisor",
    company: "Deloitte",
    description:
      "Built multi-cloud security assessment and governance capabilities for cloud migration programs.",
    highlights: [
      "Engineered a multi-cloud security assessment capability that surfaced vulnerabilities and compliance gaps across tenant resources against NIST and CIS",
      "Defined cloud governance processes, operating procedures, and RACI models that gave migration programs clearer accountability and control boundaries",
    ],
    status: "completed",
  },
  {
    period: "Jun 2022 — Jun 2023",
    title: "Advisory Associate Solution Advisor",
    company: "Deloitte",
    description:
      "Focused on identity modernization, controls assessment, and access automation across Azure platforms.",
    highlights: [
      "Automated IAM for PaaS databases and Kubernetes namespaces through Azure AD group-to-role mappings, improving consistency and least-privilege enforcement",
      "Performed Azure controls assessments against CIS 1.5 and Azure Security Benchmark v3, translating findings into actionable remediation priorities",
      "Supported client application migration to Azure Active Directory, helping modernize authentication and authorization patterns across the estate",
    ],
    status: "completed",
  },
  {
    period: "Aug 2020 — Jun 2022",
    title: "Advisory Analyst",
    company: "Deloitte",
    description:
      "Delivered Azure automation, ETL reporting, tenant assessment tooling, and resource security controls.",
    highlights: [
      "Built ETL workflows with Azure services to power Power BI dashboards that improved client reporting and operational visibility",
      "Developed a dynamic Azure assessment tool that identified tenant-level security configuration and policy gaps at scale",
      "Contributed to application migrations toward Azure Active Directory to improve identity standardization and access governance",
      "Implemented automation to keep Azure resources aligned with required security baselines and reduce configuration drift",
    ],
    status: "completed",
  },
  {
    period: "Jul 2020 — Sep 2020",
    title: "Azure Architect",
    company: "Indian Institute of Technology, Bombay",
    description:
      "Designed Azure-hosted collaboration and SSO solutions for IIT Bombay use cases.",
    highlights: [
      "Designed a video conferencing platform on Azure using Jitsi and BigBlueButton, combining VMSS, App Service, Storage Account, and Cosmos DB for scalable collaboration",
      "Created secure SSO API architecture for IIT Bombay applications using Azure App Service, Redis Cache, and Application Gateway",
      "Implemented CDN capabilities for deployed storage accounts to improve content delivery and end-user performance",
    ],
    status: "completed",
  },
  {
    period: "Jan — Apr 2020",
    title: "Cyber Security Advisor",
    company: "Deloitte",
    description: "Built Azure security and compliance automation during an early cybersecurity internship.",
    highlights: [
      "Created ETL workflows with Azure Synapse and Azure SQL Server that enabled richer Power BI reporting and analysis",
      "Engineered an Azure DevOps extension to pre-scan Terraform templates for compliance, risk, and security issues before deployment",
      "Developed a proof of concept for workload migration aligned to China's data regulations, supporting early regulatory compliance planning",
    ],
    status: "completed",
  },
  {
    period: "Jun 2019 — Aug 2019",
    title: "Intern",
    company: "Aam Aadmi Party",
    description: "Built data collection and preprocessing pipelines for citizen complaint analytics.",
    highlights: [
      "Built a social media scraping tool across Facebook, WhatsApp, and Twitter to support complaint analytics and Power BI reporting",
      "Created a preprocessing approach for bulk record updates using binning and partitioning to improve data handling efficiency",
    ],
    status: "completed",
  },
  {
    period: "Apr 2018 — Jul 2018",
    title: "Intern",
    company: "HPCL-Mittal Energy Limited",
    description: "Supported SAP modernization and Azure deployment initiatives for enterprise workloads.",
    highlights: [
      "Supported deployment of SAP HANA and SAP BTP on Azure with customized modules aligned to organizational requirements",
    ],
    status: "completed",
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

        <div className="space-y-8">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex gap-6"
            >
              {/* Pipeline node */}
              <div className="hidden md:flex flex-col items-center pt-1.5">
                <div
                  className={`pipeline-node ${
                    item.status === "current"
                      ? "!bg-azure shadow-[0_0_12px_rgba(0,120,212,0.4)]"
                      : ""
                  }`}
                />
              </div>

              {/* Card */}
              <div className="glass-card p-6 flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span
                    className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                      item.status === "current"
                        ? "bg-azure-light text-azure"
                        : "bg-slate-100 text-slate-mid"
                    }`}
                  >
                    {item.period}
                  </span>
                  {item.status === "current" && (
                    <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Current
                    </span>
                  )}
                </div>

                <h3 className="font-heading font-semibold text-lg text-slate-dark">
                  {item.title}
                </h3>
                <p className="text-sm text-azure font-medium mt-0.5">
                  {item.company}
                </p>
                <p className="text-sm text-slate-mid mt-2">{item.description}</p>

                <ul className="mt-3 space-y-1.5">
                  {item.highlights.map((h, i) => (
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
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
