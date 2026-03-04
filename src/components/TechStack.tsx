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
    name: "Languages",
    items: [
      { name: "Python", icon: SiPython },
      { name: "C#", icon: HiOutlineCodeBracket },
      { name: "PowerShell", icon: HiOutlineCommandLine },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Java", icon: SiOpenjdk },
      { name: "SQL", icon: SiPostgresql },
    ],
  },
  {
    name: "Cloud & IaC",
    items: [
      { name: "Azure", icon: VscAzure },
      { name: "Terraform", icon: SiTerraform },
      { name: "Kubernetes", icon: SiKubernetes },
      { name: "Docker", icon: SiDocker },
    ],
  },
  {
    name: "Identity",
    items: [
      { name: "Entra ID", icon: HiOutlineShieldCheck },
      { name: "Entra External ID", icon: GoLock },
    ],
  },
  {
    name: "AI & Copilot",
    items: [
      { name: "AI Foundry", icon: VscAzure },
      { name: "Copilot Studio", icon: VscAzure },
      { name: "MCP Servers", icon: VscAzure },
    ],
  },
  {
    name: "DevSecOps",
    items: [
      { name: "Azure DevOps", icon: VscAzureDevops },
      { name: "Git", icon: SiGit },
      { name: "Jenkins", icon: SiJenkins },
    ],
  },
  {
    name: "Data & ML",
    items: [
      { name: "Pandas", icon: SiPandas },
      { name: "Scikit-Learn", icon: SiScikitlearn },
      { name: "Power BI", icon: HiOutlineChartBar },
    ],
  },
  {
    name: "Frameworks",
    items: [
      { name: "Django", icon: SiDjango },
      { name: "ASP.NET", icon: SiDotnet },
      { name: "Selenium", icon: SiSelenium },
    ],
  },
];

export default function TechStack() {
  return (
    <SectionWrapper id="tech-stack">
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-dark section-heading">
        Tech Stack
      </h2>

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
