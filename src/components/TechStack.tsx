"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import {
  SiPython,
  SiJavascript,
  SiOpenjdk,
  SiPostgresql,
  SiTerraform,
  SiKubernetes,
  SiDocker,
  SiGit,
  SiJenkins,
  SiDjango,
  SiDotnet,
  SiSelenium,
  SiPandas,
  SiScikitlearn,
  SiApachespark,
  SiAmazonwebservices,
  SiOpencv,
  SiNumpy,
  SiGnubash,
  SiHtml5,
} from "react-icons/si";
import { VscAzure, VscAzureDevops } from "react-icons/vsc";
import { HiOutlineShieldCheck, HiOutlineCodeBracket, HiOutlineCommandLine, HiOutlineChartBar } from "react-icons/hi2";
import { GoLock } from "react-icons/go";

interface TechCategory {
  name: string;
  items: { name: string; icon: React.ComponentType<{ className?: string }> }[];
}

const stack: TechCategory[] = [
  {
    name: "Identity Platforms",
    items: [
      { name: "Entra ID", icon: HiOutlineShieldCheck },
      { name: "Entra External ID", icon: GoLock },
      { name: "Okta", icon: GoLock },
      { name: "Application Proxy", icon: GoLock },
      { name: "Entra ID Connect", icon: HiOutlineShieldCheck },
      { name: "SAML / OIDC", icon: HiOutlineCodeBracket },
      { name: "Home Realm Discovery", icon: HiOutlineCommandLine },
    ],
  },
  {
    name: "Security & Governance",
    items: [
      { name: "Azure Policy", icon: HiOutlineShieldCheck },
      { name: "CIS", icon: GoLock },
      { name: "MCSB", icon: HiOutlineShieldCheck },
      { name: "CISA", icon: GoLock },
      { name: "MFA Policies", icon: HiOutlineShieldCheck },
      { name: "WAF", icon: GoLock },
      { name: "RBAC", icon: HiOutlineShieldCheck },
      { name: "Purview", icon: HiOutlineChartBar },
    ],
  },
  {
    name: "AI Platforms",
    items: [
      { name: "Copilot Studio", icon: VscAzure },
      { name: "Microsoft Foundry", icon: VscAzure },
      { name: "Agent365", icon: HiOutlineCommandLine },
      { name: "Agent ID", icon: HiOutlineShieldCheck },
      { name: "Agentic Workflows", icon: HiOutlineCodeBracket },
    ],
  },
  {
    name: "Cloud & Infrastructure",
    items: [
      { name: "Azure", icon: VscAzure },
      { name: "AWS (S3, Lambda)", icon: SiAmazonwebservices },
      { name: "Terraform", icon: SiTerraform },
      { name: "Kubernetes", icon: SiKubernetes },
      { name: "Docker", icon: SiDocker },
      { name: "F5 Load Balancer", icon: HiOutlineCommandLine },
      { name: "DNS Routing", icon: HiOutlineCodeBracket },
    ],
  },
  {
    name: "Data & Reporting",
    items: [
      { name: "Power BI", icon: HiOutlineChartBar },
      { name: "Azure Data Factory", icon: VscAzure },
      { name: "Databricks", icon: VscAzure },
      { name: "PySpark", icon: SiApachespark },
      { name: "Azure Synapse", icon: VscAzure },
      { name: "Data Lake", icon: HiOutlineChartBar },
      { name: "Cosmos DB", icon: VscAzure },
      { name: "Redis Cache", icon: HiOutlineCommandLine },
      { name: "SharePoint", icon: HiOutlineChartBar },
      { name: "Azure SQL", icon: SiPostgresql },
    ],
  },
  {
    name: "DevSecOps & Automation",
    items: [
      { name: "Azure DevOps", icon: VscAzureDevops },
      { name: "Git", icon: SiGit },
      { name: "Jenkins", icon: SiJenkins },
      { name: "Python", icon: SiPython },
      { name: "PowerShell", icon: HiOutlineCommandLine },
      { name: "Security Automation", icon: HiOutlineShieldCheck },
      { name: "Teams Automation", icon: HiOutlineCommandLine },
      { name: "Outlook Automation", icon: HiOutlineCommandLine },
    ],
  },
  {
    name: "Languages",
    items: [
      { name: "Python", icon: SiPython },
      { name: "C#", icon: HiOutlineCodeBracket },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Java", icon: SiOpenjdk },
      { name: "SQL", icon: SiPostgresql },
      { name: "Bash", icon: SiGnubash },
      { name: "HTML", icon: SiHtml5 },
      { name: "YAML", icon: HiOutlineCodeBracket },
    ],
  },
  {
    name: "Frameworks & Libraries",
    items: [
      { name: "Django", icon: SiDjango },
      { name: "ASP.NET", icon: SiDotnet },
      { name: "Selenium", icon: SiSelenium },
      { name: "Pandas", icon: SiPandas },
      { name: "NumPy", icon: SiNumpy },
      { name: "OpenCV", icon: SiOpencv },
      { name: "Scikit-Learn", icon: SiScikitlearn },
      { name: "NLTK", icon: SiPython },
    ],
  },
];

export default function TechStack() {
  return (
    <SectionWrapper id="tech-stack">
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-dark section-heading">
        Tech Stack
      </h2>

      <p className="mt-4 text-slate-mid max-w-2xl">
        My stack is centered on identity modernization, enterprise AI
        governance, hybrid access, and the automation layers that make cloud
        security and agentic delivery programs operationally sustainable.
      </p>

      <div className="mt-10 space-y-6">
        {stack.map((category, catIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: catIndex * 0.06 }}
          >
            <h3 className="text-xs font-heading font-medium text-azure uppercase tracking-widest mb-3">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="glass-card px-3.5 py-2 flex items-center gap-2 hover:border-azure/25 transition-colors group"
                >
                  <item.icon className="w-4 h-4 text-azure/70 group-hover:text-azure transition-colors" />
                  <span className="text-sm font-medium text-slate-dark">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
